"""Where BudgetWise keeps the user's data: plain JSON files under data/workspace/.

Everything stays on the user's own machine (Chapter 8: name the assets you protect).
data/workspace/ is git-ignored, so real bank data is never committed.

Layout
  data/workspace/state.json                  which account is active
  data/workspace/merchant_cache.json         Categorizer answers, reused forever
  data/workspace/accounts/<id>/account.json  settings: balance, goal, buffer, payday override
  data/workspace/accounts/<id>/transactions.json   (uploaded accounts only)
  data/workspace/accounts/<id>/overrides.json      category fixes made in the UI
  data/workspace/accounts/<id>/plans.json          saved weekly plans (memory)

Demo accounts are read from data/personas/<id>.json every time. Their dates are stored
as "days ago" and turned into real dates for today, so the demo never goes stale.
"""

import json
import os
import re
import threading
from datetime import date, timedelta
from pathlib import Path

from .categories import CATEGORIES, merchant_key, pretty_merchant

ROOT = Path(__file__).resolve().parent.parent
DATA_DIR = ROOT / "data"
PERSONA_DIR = DATA_DIR / "personas"
WORKSPACE = Path(os.getenv("BUDGETWISE_WORKSPACE", DATA_DIR / "workspace"))
ACCOUNTS_DIR = WORKSPACE / "accounts"
_lock = threading.Lock()


def today() -> date:
    """Today's date. BUDGETWISE_TODAY=2026-11-10 pins it for repeatable tests."""
    pinned = os.getenv("BUDGETWISE_TODAY")
    return date.fromisoformat(pinned) if pinned else date.today()


# ------------------------------------------------------------------ tiny JSON helpers
def _read(path: Path, default):
    try:
        return json.loads(path.read_text(encoding="utf-8"))
    except (FileNotFoundError, json.JSONDecodeError):
        return default


def _write(path: Path, data) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    tmp = path.with_suffix(path.suffix + ".tmp")
    with _lock:
        tmp.write_text(json.dumps(data, indent=2), encoding="utf-8")
        tmp.replace(path)


# ------------------------------------------------------------------ demo personas
def list_personas() -> list[dict]:
    out = []
    for path in PERSONA_DIR.glob("*.json"):
        p = _read(path, {})
        out.append({k: p.get(k) for k in ("id", "name", "tagline", "description", "emoji", "order")})
    return sorted(out, key=lambda p: (p.get("order") or 0, p["id"]))


def _persona(persona_id: str) -> dict | None:
    if not re.fullmatch(r"[a-z0-9_-]+", persona_id or ""):
        return None
    return _read(PERSONA_DIR / f"{persona_id}.json", None)


# ------------------------------------------------------------------ accounts
def _account_dir(account_id: str) -> Path:
    if not re.fullmatch(r"[a-z0-9_-]+", account_id or ""):
        raise ValueError("bad account id")
    return ACCOUNTS_DIR / account_id


def active_account_id() -> str:
    state = _read(WORKSPACE / "state.json", {})
    acc = state.get("active_account")
    if acc and (account_exists(acc)):
        return acc
    personas = list_personas()
    return f"demo-{personas[0]['id']}" if personas else "demo-maya"


def set_active_account(account_id: str) -> None:
    if not account_exists(account_id):
        raise ValueError(f"unknown account {account_id}")
    _write(WORKSPACE / "state.json", {"active_account": account_id})


def account_exists(account_id: str) -> bool:
    if account_id.startswith("demo-"):
        return _persona(account_id[5:]) is not None
    try:
        return (_account_dir(account_id) / "account.json").exists()
    except ValueError:
        return False


def list_accounts() -> list[dict]:
    accounts = [
        {"id": f"demo-{p['id']}", "name": p["name"], "kind": "demo", "tagline": p["tagline"], "emoji": p["emoji"]}
        for p in list_personas()
    ]
    if ACCOUNTS_DIR.exists():
        for d in sorted(ACCOUNTS_DIR.iterdir()):
            acc = _read(d / "account.json", None)
            if acc and not d.name.startswith("demo-"):
                accounts.append({"id": d.name, "name": acc.get("name", d.name), "kind": "uploaded",
                                 "tagline": acc.get("tagline", "Your uploaded bank data"), "emoji": "🏦"})
    return accounts


def load_settings(account_id: str) -> dict:
    """Account settings. Demo accounts start from the persona file; edits are saved on top."""
    base = {}
    if account_id.startswith("demo-"):
        p = _persona(account_id[5:]) or {}
        base = json.loads(json.dumps(p.get("settings", {})))
        base["name"] = p.get("name")
        g = base.get("goal")
        if g and "deadline_days" in g:  # relative deadline -> real date
            g["deadline"] = (today() + timedelta(days=g.pop("deadline_days"))).isoformat()
    saved = _read(_account_dir(account_id) / "account.json", {})
    base.update(saved)
    base.setdefault("savings_buffer", 100.0)
    base.setdefault("bills", [])
    return base


def save_settings(account_id: str, changes: dict) -> dict:
    path = _account_dir(account_id) / "account.json"
    current = _read(path, {})
    current.update(changes)
    _write(path, current)
    return load_settings(account_id)


def create_uploaded_account(name: str, transactions: list[dict], balance: float) -> str:
    base = re.sub(r"[^a-z0-9]+", "-", name.lower()).strip("-")[:24] or "my-account"
    account_id, n = base, 2
    while account_exists(account_id) or account_id.startswith("demo"):
        account_id, n = f"{base}-{n}", n + 1
    _write(_account_dir(account_id) / "account.json", {
        "name": name, "current_balance": round(float(balance), 2), "savings_buffer": 100.0,
        "goal": None, "bills": [], "tagline": "Your uploaded bank data",
    })
    _write(_account_dir(account_id) / "transactions.json", transactions)
    return account_id


def delete_account(account_id: str) -> None:
    import shutil
    if account_id.startswith("demo-"):
        shutil.rmtree(_account_dir(account_id), ignore_errors=True)  # resets the demo edits
        return
    shutil.rmtree(_account_dir(account_id), ignore_errors=True)


# ------------------------------------------------------------------ transactions
def load_transactions(account_id: str) -> list[dict]:
    """All transactions for an account, newest first, with category overrides applied.
    Each row: id, date (date), description, merchant, amount (+in / -out), category."""
    if account_id.startswith("demo-"):
        p = _persona(account_id[5:]) or {"transactions": []}
        t0 = today()
        rows = [
            {**t, "date": (t0 - timedelta(days=t["days_ago"])).isoformat()}
            for t in p["transactions"]
        ]
    else:
        rows = _read(_account_dir(account_id) / "transactions.json", [])
    overrides = _read(_account_dir(account_id) / "overrides.json", {})
    out = []
    for t in rows:
        cat = overrides.get(t["id"], t.get("category") or "other")
        out.append({
            "id": t["id"],
            "date": date.fromisoformat(t["date"]),
            "description": t["description"],
            "merchant": t.get("merchant") or pretty_merchant(t["description"]),
            "merchant_key": merchant_key(t["description"]),
            "amount": round(float(t["amount"]), 2),
            "category": cat if cat in CATEGORIES else "other",
        })
    out.sort(key=lambda r: (r["date"], r["id"]), reverse=True)
    return out


def set_category(account_id: str, txn_id: str, category: str, apply_to_merchant: bool = True) -> int:
    """Fix a category from the UI. By default every transaction from the same merchant
    changes too, and the merchant cache learns it for future uploads."""
    if category not in CATEGORIES:
        raise ValueError(f"unknown category {category}")
    txns = load_transactions(account_id)
    target = next((t for t in txns if t["id"] == txn_id), None)
    if not target:
        raise ValueError("transaction not found")
    path = _account_dir(account_id) / "overrides.json"
    overrides = _read(path, {})
    changed = 0
    for t in txns:
        if t["id"] == txn_id or (apply_to_merchant and t["merchant_key"] == target["merchant_key"]):
            overrides[t["id"]] = category
            changed += 1
    _write(path, overrides)
    if apply_to_merchant:
        cache_merchants({target["merchant_key"]: category})
    return changed


# ------------------------------------------------------------------ merchant cache
def merchant_cache() -> dict:
    return _read(WORKSPACE / "merchant_cache.json", {})


def cache_merchants(mapping: dict) -> None:
    cache = merchant_cache()
    cache.update(mapping)
    _write(WORKSPACE / "merchant_cache.json", cache)


# ------------------------------------------------------------------ plan memory
def load_plans(account_id: str) -> list[dict]:
    """Saved weekly plans, oldest first. Demo accounts come with one earlier plan so the
    first check-in has something to compare against."""
    path = _account_dir(account_id) / "plans.json"
    plans = _read(path, None)
    if plans is None:
        plans = []
        if account_id.startswith("demo-"):
            p = _persona(account_id[5:]) or {}
            for seed in p.get("plan_history", []):
                plan = dict(seed)
                plan["week_start"] = (today() - timedelta(days=plan.pop("start_days_ago"))).isoformat()
                plans.append(plan)
    return plans


def save_plan(account_id: str, plan: dict) -> None:
    plans = load_plans(account_id)
    plans = [p for p in plans if p.get("week_start") != plan.get("week_start")]
    plans.append(plan)
    _write(_account_dir(account_id) / "plans.json", plans[-20:])
