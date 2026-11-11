"""Where BudgetWise keeps the user's data: one SQLite database on the user's own computer.

    data/workspace/budgetwise.db      (git-ignored, so real money data is never committed)

Why SQLite: many small entries arrive from chat ("spent $20 on food"), CSV uploads and
check-ins, and each one must save safely and be undoable. SQLite ships with Python, needs
no setup, and lets several processes (the web app and the MCP tool server) read it safely.
Money is stored as whole cents (2000 = $20.00) so sums never pick up rounding errors.
All the math still happens in Python, in budgetwise/finance.py.

Tables
  accounts       one row per person/account, with settings (goal, cushion, payday override) as JSON
  transactions   the ledger: every purchase and deposit, from a CSV, chat, a check-in or setup.
                 approx=1 marks an estimate ("about $40"). Exact bank rows from a later CSV
                 replace estimates for the same dates (replaced_by), so nothing is counted twice.
  schedules      things the user TOLD us: "rent is $725 on the 1st", "paid every 2 weeks".
                 These take priority over what is detected from transactions.
  balances       balance statements ("I have $410", a CSV's ending balance). The current balance
                 is the latest statement plus everything logged after it.
  plans          saved weekly plans (memory for next week's check-in)
  checkins       answers to "What did you spend today?"
  overrides      category fixes for demo transactions
  merchant_cache Categorizer answers, reused for every future upload
  state          which account is active

Every write made for one chat message shares a batch id, so one Undo removes all of it.

Demo people (data/personas/*.json) are not copied into the database: their transactions are
read from the file with dates relative to today, so the demo never goes stale. Anything a user
adds to a demo account (chat logs, bills, balance updates) IS saved in the database on top.
"""

from __future__ import annotations

import json
import os
import re
import sqlite3
import uuid
from contextlib import closing
from datetime import date, datetime, timedelta
from pathlib import Path

from .categories import CATEGORIES, merchant_key, pretty_merchant

ROOT = Path(__file__).resolve().parent.parent
DATA_DIR = ROOT / "data"
PERSONA_DIR = DATA_DIR / "personas"
WORKSPACE = Path(os.getenv("BUDGETWISE_WORKSPACE", DATA_DIR / "workspace"))
ACCOUNTS_DIR = WORKSPACE / "accounts"  # kept for compatibility; no longer used for data

SCHEMA = """
CREATE TABLE IF NOT EXISTS accounts (
  id TEXT PRIMARY KEY, name TEXT NOT NULL, kind TEXT NOT NULL, emoji TEXT, tagline TEXT,
  settings TEXT NOT NULL DEFAULT '{}', created_at TEXT NOT NULL);
CREATE TABLE IF NOT EXISTS transactions (
  id TEXT PRIMARY KEY, account_id TEXT NOT NULL, date TEXT NOT NULL, description TEXT NOT NULL,
  merchant TEXT, amount_cents INTEGER NOT NULL, category TEXT NOT NULL, source TEXT NOT NULL,
  approx INTEGER NOT NULL DEFAULT 0, note TEXT, batch_id TEXT, created_at TEXT NOT NULL,
  replaced_by TEXT, deleted INTEGER NOT NULL DEFAULT 0);
CREATE INDEX IF NOT EXISTS tx_account_date ON transactions(account_id, date);
CREATE TABLE IF NOT EXISTS schedules (
  id TEXT PRIMARY KEY, account_id TEXT NOT NULL, kind TEXT NOT NULL, name TEXT NOT NULL,
  amount_cents INTEGER, low_cents INTEGER, high_cents INTEGER, every TEXT NOT NULL,
  day_of_month INTEGER, next_date TEXT, category TEXT, varies INTEGER NOT NULL DEFAULT 0,
  batch_id TEXT, created_at TEXT NOT NULL, deleted INTEGER NOT NULL DEFAULT 0);
CREATE TABLE IF NOT EXISTS balances (
  id TEXT PRIMARY KEY, account_id TEXT NOT NULL, balance_cents INTEGER NOT NULL, as_of TEXT NOT NULL,
  source TEXT NOT NULL, batch_id TEXT, created_at TEXT NOT NULL, deleted INTEGER NOT NULL DEFAULT 0);
CREATE TABLE IF NOT EXISTS plans (
  account_id TEXT NOT NULL, week_start TEXT NOT NULL, data TEXT NOT NULL, created_at TEXT NOT NULL,
  PRIMARY KEY (account_id, week_start));
CREATE TABLE IF NOT EXISTS checkins (
  account_id TEXT NOT NULL, date TEXT NOT NULL, kind TEXT NOT NULL, answer TEXT, created_at TEXT NOT NULL,
  PRIMARY KEY (account_id, date, kind));
CREATE TABLE IF NOT EXISTS overrides (account_id TEXT NOT NULL, txn_id TEXT NOT NULL, category TEXT NOT NULL,
  PRIMARY KEY (account_id, txn_id));
CREATE TABLE IF NOT EXISTS merchant_cache (merchant_key TEXT PRIMARY KEY, category TEXT NOT NULL);
CREATE TABLE IF NOT EXISTS state (key TEXT PRIMARY KEY, value TEXT);
"""

LOGGED_SOURCES = ("chat", "checkin", "setup")  # entries the user told us about (they move the balance)


def today() -> date:
    """Today's date. BUDGETWISE_TODAY=2026-11-10 pins it for repeatable tests."""
    pinned = os.getenv("BUDGETWISE_TODAY")
    return date.fromisoformat(pinned) if pinned else date.today()


def now() -> str:
    return datetime.now().strftime("%Y-%m-%dT%H:%M:%S.%f")


def cents(x: float) -> int:
    return int(round(float(x) * 100))


def dollars(c: int | None) -> float | None:
    return None if c is None else round(c / 100, 2)


def new_id(prefix: str = "") -> str:
    return prefix + uuid.uuid4().hex[:12]


# ------------------------------------------------------------------ connection
_ready: set[str] = set()


def db() -> sqlite3.Connection:
    """Open the database (creating tables the first time). One short-lived connection per use."""
    path = WORKSPACE / "budgetwise.db"
    path.parent.mkdir(parents=True, exist_ok=True)
    con = sqlite3.connect(path, timeout=15)
    con.row_factory = sqlite3.Row
    key = str(path)
    if key not in _ready:
        con.execute("PRAGMA journal_mode=WAL")
        con.executescript(SCHEMA)
        con.commit()
        _ready.add(key)
    return con


def _q(sql: str, args=()) -> list[sqlite3.Row]:
    with closing(db()) as con:
        return con.execute(sql, args).fetchall()


def _x(sql: str, args=()) -> None:
    with closing(db()) as con:
        con.execute(sql, args)
        con.commit()


def _xmany(sql: str, rows) -> None:
    with closing(db()) as con:
        con.executemany(sql, rows)
        con.commit()


# ------------------------------------------------------------------ demo personas
def _read_json(path: Path, default):
    try:
        return json.loads(path.read_text(encoding="utf-8"))
    except (FileNotFoundError, json.JSONDecodeError):
        return default


def list_personas() -> list[dict]:
    out = []
    for path in PERSONA_DIR.glob("*.json"):
        p = _read_json(path, {})
        out.append({k: p.get(k) for k in ("id", "name", "tagline", "description", "emoji", "order")})
    return sorted(out, key=lambda p: (p.get("order") or 0, p["id"]))


def _persona(persona_id: str) -> dict | None:
    if not re.fullmatch(r"[a-z0-9_-]+", persona_id or ""):
        return None
    return _read_json(PERSONA_DIR / f"{persona_id}.json", None)


def is_demo(account_id: str) -> bool:
    return account_id.startswith("demo-")


# ------------------------------------------------------------------ accounts
def active_account_id() -> str:
    rows = _q("SELECT value FROM state WHERE key='active_account'")
    acc = rows[0]["value"] if rows else None
    if acc and account_exists(acc):
        return acc
    personas = list_personas()
    return f"demo-{personas[0]['id']}" if personas else "demo-maya"


def ensure_default_personal() -> str:
    """Create/select one real workspace once, keeping examples opt-in.

    The marker makes this a one-time migration: after it runs, choosing a demo stays
    chosen until the user explicitly returns to their own account.
    """
    marker = _q("SELECT value FROM state WHERE key='personal_default_v1'")
    if marker:
        return active_account_id()
    personal = _q("SELECT id FROM accounts WHERE kind='personal' ORDER BY created_at LIMIT 1")
    account_id = personal[0]["id"] if personal else create_account("My Budget")
    set_active_account(account_id)
    _x("INSERT INTO state(key, value) VALUES('personal_default_v1', 'done')")
    return account_id


def set_active_account(account_id: str) -> None:
    if not account_exists(account_id):
        raise ValueError(f"unknown account {account_id}")
    _x("INSERT INTO state(key, value) VALUES('active_account', ?) ON CONFLICT(key) DO UPDATE SET value=excluded.value", (account_id,))


def account_exists(account_id: str) -> bool:
    if is_demo(account_id):
        return _persona(account_id[5:]) is not None
    return bool(_q("SELECT 1 FROM accounts WHERE id=?", (account_id,)))


def list_accounts() -> list[dict]:
    accounts = [{"id": f"demo-{p['id']}", "name": p["name"], "kind": "demo", "tagline": p["tagline"], "emoji": p["emoji"]}
                for p in list_personas()]
    for r in _q("SELECT * FROM accounts WHERE kind='personal' ORDER BY created_at"):
        accounts.append({"id": r["id"], "name": r["name"], "kind": "personal", "tagline": r["tagline"] or "Your money", "emoji": r["emoji"] or "🏦"})
    return accounts


def create_account(name: str, tagline: str = "Your money", emoji: str = "🏦") -> str:
    base = re.sub(r"[^a-z0-9]+", "-", name.lower()).strip("-")[:24] or "my-account"
    account_id, n = base, 2
    while account_exists(account_id) or account_id.startswith("demo"):
        account_id, n = f"{base}-{n}", n + 1
    settings = {"savings_buffer": 100.0, "goal": None}
    _x("INSERT INTO accounts(id, name, kind, emoji, tagline, settings, created_at) VALUES(?,?,?,?,?,?,?)",
       (account_id, name.strip()[:40] or "My money", "personal", emoji, tagline, json.dumps(settings), now()))
    return account_id


def delete_account(account_id: str) -> None:
    """Personal account: delete everything. Demo account: remove the user's additions (reset)."""
    with closing(db()) as con:
        for table in ("transactions", "schedules", "balances", "plans", "checkins", "overrides"):
            con.execute(f"DELETE FROM {table} WHERE account_id=?", (account_id,))  # noqa: S608 (fixed table names)
        con.execute("DELETE FROM accounts WHERE id=?", (account_id,))
        con.commit()


def load_settings(account_id: str) -> dict:
    """Settings: persona defaults (demo) or the account row, plus anything the user changed."""
    base: dict = {}
    if is_demo(account_id):
        p = _persona(account_id[5:]) or {}
        base = json.loads(json.dumps(p.get("settings", {})))
        base["name"] = p.get("name")
        g = base.get("goal")
        if g and "deadline_days" in g:
            g["deadline"] = (today() + timedelta(days=g.pop("deadline_days"))).isoformat()
        base.pop("current_balance", None)
        saved = _q("SELECT settings FROM accounts WHERE id=?", (account_id,))
        if saved:
            base.update(json.loads(saved[0]["settings"]))
    else:
        r = _q("SELECT * FROM accounts WHERE id=?", (account_id,))
        if r:
            base = json.loads(r[0]["settings"])
            base["name"] = r[0]["name"]
    base.setdefault("savings_buffer", 100.0)
    base.setdefault("goal", None)
    base["current_balance"] = current_balance(account_id)
    return base


def save_settings(account_id: str, changes: dict) -> dict:
    changes = dict(changes)
    if "current_balance" in changes:  # a balance change is a balance statement, not a setting
        set_balance(account_id, changes.pop("current_balance"), source="settings")
    changes.pop("name", None)
    if is_demo(account_id) and not _q("SELECT 1 FROM accounts WHERE id=?", (account_id,)):
        _x("INSERT INTO accounts(id, name, kind, settings, created_at) VALUES(?,?,?,?,?)",
           (account_id, account_id, "demo-overlay", "{}", now()))
    rows = _q("SELECT settings FROM accounts WHERE id=?", (account_id,))
    current = json.loads(rows[0]["settings"]) if rows else {}
    current.update(changes)
    _x("UPDATE accounts SET settings=? WHERE id=?", (json.dumps(current), account_id))
    return load_settings(account_id)


# ------------------------------------------------------------------ balance
def set_balance(account_id: str, amount: float, source: str = "chat", batch_id: str | None = None,
                as_of: str | None = None) -> None:
    _x("INSERT INTO balances(id, account_id, balance_cents, as_of, source, batch_id, created_at) VALUES(?,?,?,?,?,?,?)",
       (new_id("b"), account_id, cents(amount), as_of or today().isoformat(), source, batch_id, now()))


def current_balance(account_id: str) -> float:
    """Latest balance statement, plus every entry the user logged after it.
    An entry counts if it was logged after the statement, or is dated after the statement's day."""
    rows = _q("SELECT * FROM balances WHERE account_id=? AND deleted=0 ORDER BY created_at DESC LIMIT 1", (account_id,))
    if rows:
        anchor_c, as_of, created = rows[0]["balance_cents"], rows[0]["as_of"], rows[0]["created_at"]
    elif is_demo(account_id):
        p = _persona(account_id[5:]) or {}
        anchor_c, as_of, created = cents(p.get("settings", {}).get("current_balance", 0)), today().isoformat(), "0"
    else:
        anchor_c, as_of, created = 0, "0000-00-00", "0"
    placeholders = ",".join("?" * len(LOGGED_SOURCES))
    moved = _q(f"""SELECT COALESCE(SUM(amount_cents), 0) AS s FROM transactions
                   WHERE account_id=? AND deleted=0 AND replaced_by IS NULL AND source IN ({placeholders})
                   AND (created_at > ? OR date > ?)""", (account_id, *LOGGED_SOURCES, created, as_of))[0]["s"]
    return dollars(anchor_c + moved)


def balance_note(account_id: str) -> dict:
    rows = _q("SELECT * FROM balances WHERE account_id=? AND deleted=0 ORDER BY created_at DESC LIMIT 1", (account_id,))
    if not rows:
        return {"as_of": None, "source": "demo" if is_demo(account_id) else None}
    return {"as_of": rows[0]["as_of"], "source": rows[0]["source"]}


# ------------------------------------------------------------------ transactions
def _row_to_txn(r) -> dict:
    return {"id": r["id"], "date": r["date"], "description": r["description"], "merchant": r["merchant"],
            "amount": dollars(r["amount_cents"]), "category": r["category"], "source": r["source"],
            "approx": bool(r["approx"]), "batch_id": r["batch_id"]}


def load_transactions(account_id: str) -> list[dict]:
    """The whole ledger for an account, newest first, with category fixes applied.
    Each row: id, date (date), description, merchant, merchant_key, amount (+in/-out), category,
    source (csv | chat | checkin | setup | demo), approx (True for estimates)."""
    rows: list[dict] = []
    if is_demo(account_id):
        p = _persona(account_id[5:]) or {"transactions": []}
        t0 = today()
        rows = [{**t, "date": (t0 - timedelta(days=t["days_ago"])).isoformat(), "source": "demo", "approx": False,
                 "merchant": None, "batch_id": None} for t in p["transactions"]]
    rows += [_row_to_txn(r) for r in _q(
        "SELECT * FROM transactions WHERE account_id=? AND deleted=0 AND replaced_by IS NULL", (account_id,))]
    overrides = {r["txn_id"]: r["category"] for r in _q("SELECT txn_id, category FROM overrides WHERE account_id=?", (account_id,))}
    out = []
    for t in rows:
        cat = overrides.get(t["id"], t.get("category") or "other")
        out.append({
            "id": t["id"], "date": date.fromisoformat(t["date"]), "description": t["description"],
            "merchant": t.get("merchant") or pretty_merchant(t["description"]),
            "merchant_key": merchant_key(t["description"]), "amount": round(float(t["amount"]), 2),
            "category": cat if cat in CATEGORIES else "other", "source": t.get("source", "csv"),
            "approx": bool(t.get("approx")), "batch_id": t.get("batch_id"),
        })
    out.sort(key=lambda r: (r["date"], r["id"]), reverse=True)
    return out


def add_transactions(account_id: str, entries: list[dict], source: str, batch_id: str | None = None) -> list[dict]:
    """Save entries: each {date, description, amount, category, approx?, merchant?, note?}."""
    created = now()
    rows = []
    for e in entries:
        tid = new_id("t")
        rows.append((tid, account_id, e["date"], e["description"][:120], e.get("merchant"), cents(e["amount"]),
                     e["category"], source, 1 if e.get("approx") else 0, e.get("note"), batch_id, created))
    _xmany("""INSERT INTO transactions(id, account_id, date, description, merchant, amount_cents, category, source,
              approx, note, batch_id, created_at) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)""", rows)
    return [{"id": r[0], "date": r[2], "description": r[3], "amount": dollars(r[5]), "category": r[6], "approx": bool(r[8])}
            for r in rows]


def update_transaction(account_id: str, txn_id: str, **changes) -> None:
    allowed = {"category": "category", "amount": "amount_cents", "date": "date", "description": "description"}
    sets, args = [], []
    for k, v in changes.items():
        if k in allowed and v is not None:
            sets.append(f"{allowed[k]}=?")
            args.append(cents(v) if k == "amount" else v)
    if sets:
        _x(f"UPDATE transactions SET {', '.join(sets)} WHERE id=? AND account_id=?", (*args, txn_id, account_id))  # noqa: S608


def delete_transaction(account_id: str, txn_id: str) -> bool:
    rows = _q("SELECT 1 FROM transactions WHERE id=? AND account_id=?", (txn_id, account_id))
    if not rows:
        return False
    _x("UPDATE transactions SET deleted=1 WHERE id=? AND account_id=?", (txn_id, account_id))
    return True


def last_batch(account_id: str) -> str | None:
    rows = _q("""SELECT batch_id, MAX(created_at) AS c FROM (
                   SELECT batch_id, created_at FROM transactions WHERE account_id=? AND deleted=0 AND batch_id IS NOT NULL
                   UNION ALL SELECT batch_id, created_at FROM schedules WHERE account_id=? AND deleted=0 AND batch_id IS NOT NULL
                   UNION ALL SELECT batch_id, created_at FROM balances WHERE account_id=? AND deleted=0 AND batch_id IS NOT NULL)
                 GROUP BY batch_id ORDER BY c DESC LIMIT 1""", (account_id, account_id, account_id))
    return rows[0]["batch_id"] if rows else None


def undo_batch(account_id: str, batch_id: str) -> int:
    """Remove everything saved for one chat message (transactions, bills/pay schedules, balance updates)."""
    n = 0
    with closing(db()) as con:
        for table in ("transactions", "schedules", "balances"):
            cur = con.execute(f"UPDATE {table} SET deleted=1 WHERE account_id=? AND batch_id=? AND deleted=0",  # noqa: S608
                              (account_id, batch_id))
            n += cur.rowcount
        cur = con.execute("SELECT settings FROM accounts WHERE id=?", (account_id,)).fetchone()
        if cur:  # a goal set in this batch is removed too
            s = json.loads(cur["settings"])
            changed = False
            if (s.get("goal") or {}).get("batch_id") == batch_id:
                s["goal"] = s.get("previous_goal")
                changed = True
            if s.get("typical_batch") == batch_id:
                s["typical_weekly_spend"], s["typical_batch"] = s.get("previous_typical"), None
                changed = True
            if changed:
                con.execute("UPDATE accounts SET settings=? WHERE id=?", (json.dumps(s), account_id))
                n += 1
        con.commit()
    return n


def batch_summary(account_id: str, batch_id: str) -> dict:
    """What one chat message saved (for the confirmation card)."""
    txns = [_row_to_txn(r) for r in _q("SELECT * FROM transactions WHERE account_id=? AND batch_id=? AND deleted=0 ORDER BY date DESC",
                                        (account_id, batch_id))]
    scheds = [schedule_dict(r) for r in _q("SELECT * FROM schedules WHERE account_id=? AND batch_id=? AND deleted=0", (account_id, batch_id))]
    bals = [{"balance": dollars(r["balance_cents"]), "as_of": r["as_of"]}
            for r in _q("SELECT * FROM balances WHERE account_id=? AND batch_id=? AND deleted=0", (account_id, batch_id))]
    goal, typical = None, None
    r = _q("SELECT settings FROM accounts WHERE id=?", (account_id,))
    if r:
        st = json.loads(r[0]["settings"])
        g = st.get("goal") or {}
        if g.get("batch_id") == batch_id:
            goal = {k: g.get(k) for k in ("name", "target", "saved", "deadline")}
        if st.get("typical_batch") == batch_id:
            typical = st.get("typical_weekly_spend")
    return {"batch_id": batch_id, "transactions": txns, "schedules": scheds, "balances": bals, "goal": goal,
            "typical_weekly_spend": typical,
            "count": len(txns) + len(scheds) + len(bals) + (1 if goal else 0) + (1 if typical else 0)}


def set_category(account_id: str, txn_id: str, category: str, apply_to_merchant: bool = True) -> int:
    """Fix a category from the UI. By default every transaction from the same merchant changes too,
    and the merchant cache learns it for future uploads."""
    if category not in CATEGORIES:
        raise ValueError(f"unknown category {category}")
    txns = load_transactions(account_id)
    target = next((t for t in txns if t["id"] == txn_id), None)
    if not target:
        raise ValueError("transaction not found")
    hits = [t for t in txns if t["id"] == txn_id or (apply_to_merchant and t["merchant_key"] == target["merchant_key"]
                                                     and t["source"] in ("csv", "demo"))]
    db_ids = [t["id"] for t in hits if t["source"] != "demo"]
    demo_ids = [t["id"] for t in hits if t["source"] == "demo"]
    if db_ids:
        _xmany("UPDATE transactions SET category=? WHERE id=? AND account_id=?", [(category, i, account_id) for i in db_ids])
    if demo_ids:
        _xmany("INSERT INTO overrides(account_id, txn_id, category) VALUES(?,?,?) "
               "ON CONFLICT(account_id, txn_id) DO UPDATE SET category=excluded.category",
               [(account_id, i, category) for i in demo_ids])
    if apply_to_merchant and target["source"] in ("csv", "demo"):
        cache_merchants({target["merchant_key"]: category})
    return len(hits)


# ------------------------------------------------------------------ CSV import (merge into an account)
def import_rows(account_id: str, rows: list[dict], balance: float | None, balance_as_of: str | None) -> dict:
    """Add a bank file's rows to an account.
    - Rows already imported before (same date, amount and description) are skipped.
    - Estimates the user logged for dates the file covers are replaced by the exact bank rows.
    - The file's ending balance (or the one the user typed) becomes the new balance statement."""
    batch = new_id("csv")
    existing = {(r["date"], r["amount_cents"], r["description"]) for r in _q(
        "SELECT date, amount_cents, description FROM transactions WHERE account_id=? AND deleted=0 AND source='csv'", (account_id,))}
    fresh = [r for r in rows if (r["date"], cents(r["amount"]), r["description"][:120]) not in existing]
    add_transactions(account_id, fresh, source="csv", batch_id=batch)
    first, last = min(r["date"] for r in rows), max(r["date"] for r in rows)
    replaced = _q(f"""SELECT COUNT(*) AS n FROM transactions WHERE account_id=? AND deleted=0 AND replaced_by IS NULL
                     AND source IN ({",".join("?" * len(LOGGED_SOURCES))}) AND approx=1 AND date BETWEEN ? AND ?""",
                  (account_id, *LOGGED_SOURCES, first, last))[0]["n"]
    _x(f"""UPDATE transactions SET replaced_by=? WHERE account_id=? AND deleted=0 AND replaced_by IS NULL
          AND source IN ({",".join("?" * len(LOGGED_SOURCES))}) AND approx=1 AND date BETWEEN ? AND ?""",
       (batch, account_id, *LOGGED_SOURCES, first, last))
    if balance is not None:
        set_balance(account_id, balance, source="csv", batch_id=None, as_of=balance_as_of or last)
    return {"added": len(fresh), "duplicates_skipped": len(rows) - len(fresh), "estimates_replaced": replaced,
            "first_date": first, "last_date": last}


# ------------------------------------------------------------------ schedules (what the user told us)
def schedule_dict(r) -> dict:
    return {"id": r["id"], "kind": r["kind"], "name": r["name"], "amount": dollars(r["amount_cents"]),
            "low": dollars(r["low_cents"]), "high": dollars(r["high_cents"]), "every": r["every"],
            "day_of_month": r["day_of_month"], "next_date": r["next_date"], "category": r["category"],
            "varies": bool(r["varies"]), "batch_id": r["batch_id"]}


def add_schedule(account_id: str, kind: str, name: str, every: str, amount: float | None = None,
                 low: float | None = None, high: float | None = None, day_of_month: int | None = None,
                 next_date: str | None = None, category: str | None = None, varies: bool = False,
                 batch_id: str | None = None) -> dict:
    """Save a bill or pay schedule. A new pay schedule replaces the old one; a bill with the same
    name replaces the old bill (so "actually rent is $750" just updates it)."""
    with closing(db()) as con:
        if kind == "income":
            con.execute("UPDATE schedules SET deleted=1 WHERE account_id=? AND kind='income' AND deleted=0", (account_id,))
        else:
            con.execute("UPDATE schedules SET deleted=1 WHERE account_id=? AND kind='bill' AND deleted=0 AND lower(name)=lower(?)",
                        (account_id, name))
        sid = new_id("s")
        con.execute("""INSERT INTO schedules(id, account_id, kind, name, amount_cents, low_cents, high_cents, every,
                       day_of_month, next_date, category, varies, batch_id, created_at) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?)""",
                    (sid, account_id, kind, name[:60], None if amount is None else cents(amount),
                     None if low is None else cents(low), None if high is None else cents(high), every,
                     day_of_month, next_date, category, 1 if varies else 0, batch_id, now()))
        con.commit()
    return schedule_dict(_q("SELECT * FROM schedules WHERE id=?", (sid,))[0])


def schedules(account_id: str, kind: str | None = None) -> list[dict]:
    sql, args = "SELECT * FROM schedules WHERE account_id=? AND deleted=0", [account_id]
    if kind:
        sql += " AND kind=?"
        args.append(kind)
    return [schedule_dict(r) for r in _q(sql + " ORDER BY created_at", args)]


def delete_schedule(account_id: str, schedule_id: str) -> None:
    _x("UPDATE schedules SET deleted=1 WHERE id=? AND account_id=?", (schedule_id, account_id))


# ------------------------------------------------------------------ check-ins
def checkin_done(account_id: str, kind: str, on: str | None = None) -> bool:
    return bool(_q("SELECT 1 FROM checkins WHERE account_id=? AND date=? AND kind=?", (account_id, on or today().isoformat(), kind)))


def record_checkin(account_id: str, kind: str, answer: str) -> None:
    _x("INSERT INTO checkins(account_id, date, kind, answer, created_at) VALUES(?,?,?,?,?) "
       "ON CONFLICT(account_id, date, kind) DO UPDATE SET answer=excluded.answer",
       (account_id, today().isoformat(), kind, answer[:200], now()))


def logged_since(account_id: str, since: str, sources=LOGGED_SOURCES) -> list[dict]:
    ph = ",".join("?" * len(sources))
    return [_row_to_txn(r) for r in _q(f"""SELECT * FROM transactions WHERE account_id=? AND deleted=0 AND replaced_by IS NULL
                                           AND source IN ({ph}) AND date >= ?""", (account_id, *sources, since))]


# ------------------------------------------------------------------ merchant cache
def merchant_cache() -> dict:
    return {r["merchant_key"]: r["category"] for r in _q("SELECT * FROM merchant_cache")}


def cache_merchants(mapping: dict) -> None:
    _xmany("INSERT INTO merchant_cache(merchant_key, category) VALUES(?,?) "
           "ON CONFLICT(merchant_key) DO UPDATE SET category=excluded.category", list(mapping.items()))


# ------------------------------------------------------------------ plan memory
def load_plans(account_id: str) -> list[dict]:
    """Saved weekly plans, oldest first. Demo accounts come with one earlier plan so the
    first check-in has something to compare against."""
    plans = [json.loads(r["data"]) for r in _q("SELECT data FROM plans WHERE account_id=? ORDER BY week_start", (account_id,))]
    if is_demo(account_id) and not plans:  # the sample earlier plan, until the user saves their own
        p = _persona(account_id[5:]) or {}
        for seed in p.get("plan_history", []):
            plan = dict(seed)
            plan["week_start"] = (today() - timedelta(days=plan.pop("start_days_ago"))).isoformat()
            if not any(x["week_start"] == plan["week_start"] for x in plans):
                plans.append(plan)
        plans.sort(key=lambda x: x["week_start"])
    return plans


def save_plan(account_id: str, plan: dict) -> None:
    _x("INSERT INTO plans(account_id, week_start, data, created_at) VALUES(?,?,?,?) "
       "ON CONFLICT(account_id, week_start) DO UPDATE SET data=excluded.data, created_at=excluded.created_at",
       (account_id, plan["week_start"], json.dumps(plan), now()))

