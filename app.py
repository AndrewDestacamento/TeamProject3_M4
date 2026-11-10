"""BudgetWise web app: FastAPI backend + React frontend (Chapter 8: hosting an agent through an API).

    uvicorn app:app --port 8000        then open http://localhost:8000

Same pattern as the course's chapter_08 web apps:
  - lifespan= starts the MCP tool server ONCE and keeps it running for every request
  - the browser only talks to this server; the NRP API key never leaves the backend
  - answers stream back as Server-Sent Events (Chapter 8, "HTTP + SSE" wire), so the page
    shows each agent step and the answer word by word instead of a long blank wait

The React app in frontend/ is built into frontend/dist and served from here, so one
command runs everything.
"""

import asyncio
import json
import time
import uuid
from contextlib import asynccontextmanager
from pathlib import Path

from dotenv import load_dotenv

load_dotenv(Path(__file__).with_name(".env"))

from fastapi import FastAPI, File, HTTPException, UploadFile  # noqa: E402
from fastapi.responses import FileResponse, JSONResponse, StreamingResponse  # noqa: E402
from fastapi.staticfiles import StaticFiles  # noqa: E402
from pydantic import BaseModel, Field  # noqa: E402

from budgetwise import finance, importer, knowledge, store  # noqa: E402
from budgetwise.agents import MODEL, BudgetWiseTeam  # noqa: E402
from budgetwise.categories import CATEGORIES, FLEXIBLE, merchant_key, rule_category  # noqa: E402

ROOT = Path(__file__).resolve().parent
DIST = ROOT / "frontend" / "dist"
team = BudgetWiseTeam()


@asynccontextmanager
async def lifespan(app: FastAPI):
    t0 = time.perf_counter()
    kb = await asyncio.to_thread(knowledge.warm_up)  # load the embedding model before the first question
    await team.start()
    print(f"[BudgetWise] ready in {time.perf_counter() - t0:.1f}s · model={MODEL} · knowledge={kb}")
    yield
    await team.stop()


app = FastAPI(title="BudgetWise API", version="4.0.0", lifespan=lifespan)


def sse(events):
    """Wrap an async generator of dicts as a Server-Sent Events stream."""
    async def gen():
        try:
            async for ev in events:
                yield f"data: {json.dumps(ev, default=str)}\n\n"
        except Exception as e:  # noqa: BLE001
            yield f"data: {json.dumps({'type': 'error', 'message': str(e)[:200]})}\n\n"
    return StreamingResponse(gen(), media_type="text/event-stream",
                             headers={"Cache-Control": "no-cache", "X-Accel-Buffering": "no"})


# ------------------------------------------------------------------ accounts and dashboard
@app.get("/api/health")
def health():
    return {"ok": True, "model": MODEL, "agents_ready": team.ready}


@app.get("/api/accounts")
def accounts():
    return {"active": store.active_account_id(), "accounts": store.list_accounts(), "personas": store.list_personas()}


class ActiveIn(BaseModel):
    id: str


@app.post("/api/accounts/active")
def set_active(body: ActiveIn):
    try:
        store.set_active_account(body.id)
    except ValueError as e:
        raise HTTPException(404, str(e))
    return {"active": body.id}


@app.delete("/api/accounts/{account_id}")
def delete_account(account_id: str):
    store.delete_account(account_id)
    if store.active_account_id() == account_id:
        store.set_active_account(store.list_accounts()[0]["id"])
    return {"ok": True, "active": store.active_account_id()}


@app.get("/api/snapshot")
def snapshot():
    return finance.snapshot()


@app.get("/api/categories")
def categories():
    return [{"id": c, "label": lbl, "kind": kind} for c, (lbl, kind) in CATEGORIES.items()]


@app.get("/api/transactions")
def transactions():
    acc = store.active_account_id()
    rows = store.load_transactions(acc)
    return {"account": acc, "transactions": [{**t, "date": t["date"].isoformat()} for t in rows]}


class CategoryIn(BaseModel):
    category: str
    apply_to_merchant: bool = True


@app.patch("/api/transactions/{txn_id}")
def update_category(txn_id: str, body: CategoryIn):
    try:
        changed = store.set_category(store.active_account_id(), txn_id, body.category, body.apply_to_merchant)
    except ValueError as e:
        raise HTTPException(400, str(e))
    return {"changed": changed}


@app.delete("/api/transactions/{txn_id}")
def delete_txn(txn_id: str):
    if not store.delete_transaction(store.active_account_id(), txn_id):
        raise HTTPException(404, "Only entries you added (not demo or bank rows) can be deleted here.")
    return {"ok": True}


class SettingsIn(BaseModel):
    current_balance: float | None = None
    savings_buffer: float | None = Field(None, ge=0)
    next_payday: str | None = None
    goal: dict | None = None
    clear_payday: bool = False


@app.get("/api/settings")
def get_settings():
    acc = store.active_account_id()
    return {**store.load_settings(acc), "schedules": store.schedules(acc)}


@app.delete("/api/schedules/{schedule_id}")
def delete_schedule(schedule_id: str):
    store.delete_schedule(store.active_account_id(), schedule_id)
    return {"ok": True}


class NewAccountIn(BaseModel):
    name: str = Field("My money", max_length=40)


@app.post("/api/accounts/new")
def new_account(body: NewAccountIn):
    """Start without a bank file: an empty account the setup chat fills in."""
    acc = store.create_account(body.name or "My money")
    store.set_active_account(acc)
    return {"id": acc}


class UndoIn(BaseModel):
    batch_id: str


@app.post("/api/undo")
def undo(body: UndoIn):
    n = store.undo_batch(store.active_account_id(), body.batch_id)
    return {"removed": n}


class CheckinIn(BaseModel):
    kind: str = Field(..., pattern="^(spend|income)$")
    amount: float | None = Field(None, ge=0, le=25000)


@app.post("/api/checkin")
def checkin(body: CheckinIn):
    """One-tap check-in answers ("Nothing", "About $10"). Typed answers go through /api/chat instead."""
    acc = store.active_account_id()
    batch = None
    if body.amount:
        batch = store.new_id("chk-")
        entry = {"date": store.today().isoformat(), "amount": body.amount if body.kind == "income" else -body.amount,
                 "description": "Income (check-in)" if body.kind == "income" else "Everyday spending (check-in)",
                 "category": "income" if body.kind == "income" else "other", "approx": True}
        store.add_transactions(acc, [entry], source="checkin", batch_id=batch)
    store.record_checkin(acc, body.kind, "nothing" if not body.amount else f"about {body.amount}")
    snap = finance.snapshot(acc)
    return {"batch_id": batch, "left_today": snap["left_today"], "safe_per_day": snap["safe_per_day"]}


@app.patch("/api/settings")
def patch_settings(body: SettingsIn):
    changes = {k: v for k, v in body.model_dump().items() if v is not None and k != "clear_payday"}
    if body.clear_payday:
        changes["next_payday"] = None
    if "goal" in changes:
        g = changes["goal"]
        try:
            changes["goal"] = {"name": str(g["name"])[:40], "target": float(g["target"]),
                               "saved": float(g.get("saved", 0)), "deadline": str(g["deadline"])}
        except (KeyError, TypeError, ValueError):
            raise HTTPException(400, "goal needs name, target, saved and deadline")
    return store.save_settings(store.active_account_id(), changes)


# ------------------------------------------------------------------ CSV import
PENDING_IMPORTS: dict[str, dict] = {}


@app.get("/api/sample-csv")
def sample_csv():
    return FileResponse(ROOT / "data" / "samples" / "sample_chase_checking.csv", media_type="text/csv",
                        filename="sample_chase_checking.csv")


@app.post("/api/import/preview")
async def import_preview(file: UploadFile = File(...)):
    raw = await file.read()
    if len(raw) > 5_000_000:
        raise HTTPException(413, "That file is too big. Export up to a few months of transactions.")
    try:
        parsed = importer.parse_csv(raw)
    except importer.ImportError_ as e:
        raise HTTPException(400, str(e))
    token = uuid.uuid4().hex
    PENDING_IMPORTS[token] = {"parsed": parsed, "filename": file.filename, "at": time.time()}
    sample = [{"date": t["date"].isoformat(), "description": t["description"], "amount": t["amount"]}
              for t in parsed["transactions"][:6]]
    return {"token": token, "detected": parsed["detected"], "balance": parsed["balance"], "sample": sample}


class CommitIn(BaseModel):
    token: str
    name: str = Field("My bank account", max_length=40)
    balance: float
    target: str = Field("new", pattern="^(new|active)$")


@app.post("/api/import/commit")
async def import_commit(body: CommitIn):
    pending = PENDING_IMPORTS.pop(body.token, None)
    if not pending:
        raise HTTPException(400, "This upload expired. Please choose the file again.")
    t0 = time.perf_counter()
    txns = pending["parsed"]["transactions"]
    cache = store.merchant_cache()
    stats = {"rules": 0, "memory": 0, "ai": 0, "unknown": 0}
    unknown: dict[str, str] = {}
    labeled = []
    for i, t in enumerate(txns):
        key = merchant_key(t["description"])
        cat = rule_category(t["description"], t["amount"])
        how = "rules"
        if cat is None and key in cache:
            cat, how = cache[key], "memory"
        if cat is None:
            unknown.setdefault(key, t["description"])
        labeled.append({"date": t["date"].isoformat(), "description": t["description"],
                        "amount": t["amount"], "category": cat, "_key": key, "_how": how})
    ai = await team.categorize(unknown) if unknown else {}
    if ai:
        store.cache_merchants(ai)
    for t in labeled:
        if t["category"] is None:
            t["category"] = ai.get(t["_key"], "other")
            t["_how"] = "ai" if t["_key"] in ai else "unknown"
        stats[t["_how"]] += 1
        t.pop("_key")
        t.pop("_how")
    active = store.active_account_id()
    if body.target == "active" and not store.is_demo(active):
        account_id = active
    else:
        account_id = store.create_account(body.name, tagline="Your bank data")
    merged = store.import_rows(account_id, labeled, body.balance, store.today().isoformat())
    store.set_active_account(account_id)
    return {"account": account_id, "transactions": len(labeled), "merchants_sent_to_ai": len(unknown),
            "how_categorized": stats, "seconds": round(time.perf_counter() - t0, 1), **merged}


# ------------------------------------------------------------------ chat and plans (streamed)
class ChatIn(BaseModel):
    message: str = Field(..., min_length=1, max_length=1000)
    session_id: str | None = None
    mode: str | None = Field(None, pattern="^log$")      # "log": send straight to the Bookkeeper
    checkin: str | None = Field(None, pattern="^(spend|income)$")
    context_hint: str | None = Field(None, max_length=200)  # e.g. the setup question being answered


@app.post("/api/chat")
async def chat(body: ChatIn):
    sid = body.session_id or uuid.uuid4().hex

    async def events():
        yield {"type": "session", "session_id": sid}
        async for ev in team.chat(body.message, sid, mode=body.mode, checkin=body.checkin, context_hint=body.context_hint):
            yield ev
    return sse(events())


@app.post("/api/chat/reset")
def chat_reset(session_id: str):
    team.memory.reset(session_id)
    return {"ok": True}


@app.post("/api/plan/generate")
async def plan_generate():
    async def events():
        t0 = time.perf_counter()
        async for ev in team.make_plan():
            yield ev
        yield {"type": "done", "elapsed": round(time.perf_counter() - t0, 2)}
    return sse(events())


class AcceptIn(BaseModel):
    plan: dict


@app.post("/api/plan/accept")
def plan_accept(body: AcceptIn):
    """Human-in-the-loop (Chapter 8): a plan is only saved when the user chooses to start it."""
    p = body.plan
    keep = ["week_start", "week_end", "daily_limit", "focus_category", "focus_label", "focus_category_cap",
            "focus_weekly_average", "cut_percent", "freed_up_by_cut", "weekly_safe_to_spend", "save_this_week",
            "weekly_spending_allowance", "goal_name", "goal_needed_per_week", "on_track_for_goal",
            "headline", "why", "today_action", "tip_source", "critic", "attempts"]
    plan = {k: p.get(k) for k in keep}
    if plan["focus_category"] not in FLEXIBLE or not isinstance(plan["daily_limit"], (int, float)):
        raise HTTPException(400, "That plan is incomplete.")
    plan["accepted_at"] = time.strftime("%Y-%m-%dT%H:%M:%S")
    store.save_plan(store.active_account_id(), plan)
    return {"ok": True}


@app.get("/api/plans")
def plans():
    acc = store.active_account_id()
    snap = finance.snapshot(acc)
    history = store.load_plans(acc)
    as_of = finance.date.fromisoformat(snap["as_of"])
    current = next((p for p in reversed(history)
                    if finance.date.fromisoformat(p["week_start"]) <= as_of <= finance.date.fromisoformat(p["week_start"]) + finance.timedelta(days=6)), None)
    progress = None
    if current:
        start = finance.date.fromisoformat(current["week_start"])
        txns = store.load_transactions(acc)
        spent = finance.spending_by_category(txns, start, as_of)
        flex = round(sum(v for k, v in spent.items() if k in FLEXIBLE and k != "subscriptions"), 2)
        days_in = (as_of - start).days + 1
        progress = {"days_in": days_in, "flexible_spent": flex, "allowance_so_far": round(current["daily_limit"] * days_in, 2),
                    "focus_spent": spent.get(current["focus_category"], 0.0), "focus_cap": current["focus_category_cap"]}
    return {"current": current, "progress": progress, "last_week": snap["last_plan"], "history": list(reversed(history))[:8]}


# ------------------------------------------------------------------ the React app
if DIST.exists():
    app.mount("/assets", StaticFiles(directory=DIST / "assets"), name="assets")


@app.get("/{path:path}")
def spa(path: str):
    if path.startswith("api/"):
        return JSONResponse({"detail": "Not found"}, status_code=404)
    target = DIST / path
    if path and target.is_file():
        return FileResponse(target)
    index = DIST / "index.html"
    if index.exists():
        return FileResponse(index)
    return JSONResponse({"detail": "Frontend not built. Run: cd frontend && npm install && npm run build"}, status_code=503)
