"""The BudgetWise money engine: every dollar figure the app shows is computed here.

This keeps the rule from M2 and M3: the language model never does money math.
The agents read these results (through the MCP tools or the snapshot) and explain them.
Everything here is plain Python, so the dashboard loads instantly with no model call.

Main entry points
  snapshot(account_id)          the full picture used by the dashboard and the agents
  can_afford(account_id, ...)   "Can I afford $80 on Friday?"
  build_weekly_plan(...)        the math behind a weekly plan
  check_last_plan(account_id)   did the user stick to last week's plan?
  search_transactions(...)      find specific spending
"""

from __future__ import annotations

import statistics
from collections import defaultdict
from datetime import date, timedelta

from . import store
from .categories import CATEGORIES, FIXED, FLEXIBLE, label

BILL_CATEGORIES = FIXED | {"subscriptions", "health"}  # things that recur on a schedule


def _r(x: float) -> float:
    return round(float(x) + 0.0, 2)


def _as_of(txns: list[dict]) -> tuple[date, bool]:
    """The analysis date. Usually today; for an old uploaded statement, its last date."""
    t0 = store.today()
    if not txns:
        return t0, False
    newest = max(t["date"] for t in txns)
    if (t0 - newest).days > 10:
        return newest, True
    return t0, False


# ------------------------------------------------------------------ spending
def spending_by_category(txns, start: date, end: date) -> dict[str, float]:
    """Money spent per category between start and end (inclusive). Transfers excluded."""
    out: dict[str, float] = defaultdict(float)
    for t in txns:
        if start <= t["date"] <= end and t["amount"] < 0 and t["category"] not in ("transfer", "income"):
            out[t["category"]] += -t["amount"]
    return {k: _r(v) for k, v in sorted(out.items(), key=lambda kv: -kv[1])}


def _flex_daily_average(txns, as_of: date, days: int = 30) -> float:
    spent = spending_by_category(txns, as_of - timedelta(days=days - 1), as_of)
    return _r(sum(v for k, v in spent.items() if k in FLEXIBLE and k != "subscriptions") / days)


def month_comparison(txns, as_of: date) -> dict:
    """This month so far vs. the same days of last month (a fair, like-for-like comparison)."""
    this_start = as_of.replace(day=1)
    last_end_full = this_start - timedelta(days=1)
    last_start = last_end_full.replace(day=1)
    last_same_day = last_start + timedelta(days=min(as_of.day, last_end_full.day) - 1)
    this_m = spending_by_category(txns, this_start, as_of)
    last_m = spending_by_category(txns, last_start, last_same_day)
    last_full = spending_by_category(txns, last_start, last_end_full)
    cats = sorted(set(this_m) | set(last_m), key=lambda c: -(this_m.get(c, 0) + last_m.get(c, 0)))
    rows = []
    for c in cats:
        a, b = this_m.get(c, 0.0), last_m.get(c, 0.0)
        rows.append({
            "category": c, "label": label(c), "this_month": a, "last_month_same_days": b,
            "change": _r(a - b), "change_pct": round(100 * (a - b) / b) if b >= 1 else None,
        })
    return {
        "this_month_label": as_of.strftime("%B"),
        "last_month_label": last_start.strftime("%B"),
        "days_compared": as_of.day,
        "this_month_total": _r(sum(this_m.values())),
        "last_month_same_days_total": _r(sum(last_m.values())),
        "last_month_full_total": _r(sum(last_full.values())),
        "categories": rows,
    }


# ------------------------------------------------------------------ income and payday
def _cadence(dates: list[date]) -> float | None:
    if len(dates) < 2:
        return None
    ds = sorted(dates)
    gaps = [(b - a).days for a, b in zip(ds, ds[1:]) if (b - a).days > 0]
    return statistics.median(gaps) if gaps else None


def income_summary(txns, as_of: date, settings: dict) -> dict:
    """Detect paychecks, how often they arrive, how much they swing, and the next payday."""
    window = [t for t in txns if t["category"] == "income" and t["amount"] > 0 and t["date"] > as_of - timedelta(days=120)]
    by_source: dict[str, list[dict]] = defaultdict(list)
    for t in window:
        by_source[t["merchant_key"]].append(t)
    sources = []
    for key, rows in by_source.items():
        dates = [r["date"] for r in rows]
        amounts = [r["amount"] for r in rows]
        cad = _cadence(dates)
        sources.append({
            "key": key, "source": rows[0]["merchant"], "count": len(rows), "total": _r(sum(amounts)),
            "average": _r(statistics.mean(amounts)), "lowest": _r(min(amounts)), "highest": _r(max(amounts)),
            "every_days": round(cad) if cad else None, "last_date": max(dates),
        })
    sources.sort(key=lambda s: -s["total"])

    # monthly totals for the last 3 complete months
    months = []
    y, m = as_of.year, as_of.month
    for _ in range(3):
        m -= 1
        if m == 0:
            y, m = y - 1, 12
        total = sum(t["amount"] for t in window if t["date"].year == y and t["date"].month == m)
        months.append({"month": date(y, m, 1).strftime("%b %Y"), "income": _r(total)})
    months.reverse()
    vals = [x["income"] for x in months if x["income"] > 0] or [0.0]
    avg = statistics.mean(vals)
    swing_pct = round(100 * (max(vals) - min(vals)) / avg) if avg else 0

    # next payday: user override first, else the main source's rhythm
    main = sources[0] if sources else None
    next_payday, confidence = None, "low"
    if settings.get("next_payday"):
        try:
            next_payday = date.fromisoformat(settings["next_payday"])
            confidence = "set by you"
        except ValueError:
            pass

    # projected paychecks for the next ~5 weeks, from every source with a steady rhythm.
    # Amounts are conservative (25th percentile of recent payments), as the knowledge
    # base advises for irregular income.
    projected = []
    for s in sources:
        if not s["every_days"] or s["count"] < 3:
            continue
        recent = sorted(r["amount"] for r in sorted(by_source[s["key"]], key=lambda r: r["date"])[-6:])
        conservative = _r(recent[0] if len(recent) < 4 else statistics.quantiles(recent, n=4)[0])
        step = max(s["every_days"], 1)
        d = s["last_date"] + timedelta(days=step)
        while d <= as_of:
            d += timedelta(days=step)
        if s is main and next_payday is None:
            next_payday = d
            confidence = "high" if s["count"] >= 4 else "medium"
        while d <= as_of + timedelta(days=40):
            projected.append({"date": d.isoformat(), "amount": conservative, "source": s["source"]})
            d += timedelta(days=step)
    projected.sort(key=lambda x: x["date"])
    if not next_payday:
        next_payday = as_of + timedelta(days=14)
    expected = next((p["amount"] for p in projected if p["date"] == next_payday.isoformat()), None)
    if expected is None and projected:
        expected = projected[0]["amount"]
    return {
        "sources": [{**{k: v for k, v in s.items() if k != "key"}, "last_date": s["last_date"].isoformat()} for s in sources[:4]],
        "monthly": months,
        "average_monthly": _r(avg),
        "lowest_month": _r(min(vals)),
        "swing_percent": swing_pct,
        "irregular": swing_pct >= 25 or (main is not None and (main["every_days"] or 99) < 10),
        "next_payday": next_payday.isoformat(),
        "next_payday_confidence": confidence,
        "expected_next_paycheck": expected,
        "projected_income": projected,
        "main_source": main["source"] if main else None,
        "pay_every_days": main["every_days"] if main else None,
    }


# ------------------------------------------------------------------ recurring bills
def recurring_bills(txns, as_of: date, settings: dict) -> list[dict]:
    """Find bills and subscriptions that repeat on a schedule (rent, phone, Netflix...)
    and predict the next due date. User-added bills from settings are included too."""
    groups: dict[str, list[dict]] = defaultdict(list)
    for t in txns:
        if t["amount"] < 0 and t["category"] in BILL_CATEGORIES and t["date"] > as_of - timedelta(days=100):
            groups[t["merchant_key"]].append(t)
    bills = []
    for key, rows in groups.items():
        if len(rows) < 2:
            continue
        cad = _cadence([r["date"] for r in rows])
        if not cad:
            continue
        if 25 <= cad <= 35:
            every = 30
        elif 12 <= cad <= 16:
            every = 14
        elif 6 <= cad <= 8:
            every = 7
        else:
            continue
        amounts = [-r["amount"] for r in rows]
        mean = statistics.mean(amounts)
        if mean <= 0 or (statistics.pstdev(amounts) / mean) > 0.35:
            continue
        last = max(rows, key=lambda r: r["date"])
        if every == 30:  # same day next month
            nxt = _add_month(last["date"])
            while nxt <= as_of:
                nxt = _add_month(nxt)
        else:
            nxt = last["date"] + timedelta(days=every)
            while nxt <= as_of:
                nxt += timedelta(days=every)
        bills.append({
            "name": last["merchant"], "amount": _r(-last["amount"]), "average": _r(mean),
            "category": last["category"], "every": {30: "monthly", 14: "every 2 weeks", 7: "weekly"}[every],
            "next_due": nxt.isoformat(), "days_until": (nxt - as_of).days, "source": "detected",
            "monthly_cost": _r(mean * 30 / every),
        })
    for b in settings.get("bills", []):
        try:
            due = date.fromisoformat(b["due_date"])
        except (KeyError, ValueError):
            continue
        if due >= as_of:
            bills.append({"name": b["name"], "amount": _r(b["amount"]), "average": _r(b["amount"]),
                          "category": b.get("category", "other"), "every": "once", "next_due": due.isoformat(),
                          "days_until": (due - as_of).days, "source": "added by you", "monthly_cost": 0.0})
    bills.sort(key=lambda b: b["next_due"])
    return bills


def _add_month(d: date) -> date:
    y, m = (d.year + 1, 1) if d.month == 12 else (d.year, d.month + 1)
    for day in (d.day, 30, 29, 28):
        try:
            return date(y, m, day)
        except ValueError:
            continue
    return date(y, m, 28)


# ------------------------------------------------------------------ the snapshot
def snapshot(account_id: str | None = None) -> dict:
    """Everything the dashboard and the agents need, computed in one pass."""
    account_id = account_id or store.active_account_id()
    settings = store.load_settings(account_id)
    txns = store.load_transactions(account_id)
    as_of, stale = _as_of(txns)
    balance = _r(settings.get("current_balance", 0.0))
    buffer = _r(settings.get("savings_buffer", 100.0))

    income = income_summary(txns, as_of, settings)
    payday = date.fromisoformat(income["next_payday"])
    days_left = max((payday - as_of).days, 1)
    bills = recurring_bills(txns, as_of, settings)
    bills_before = [b for b in bills if b["next_due"] <= payday.isoformat()]
    bills_total = _r(sum(b["amount"] for b in bills_before))

    # Look one pay cycle past payday too: if the bills in that cycle are bigger than the
    # paychecks expected in it, hold back the difference now (e.g. rent due the day after
    # a small payout). This keeps "safe to spend" honest for irregular income.
    cycle = min(max(income["pay_every_days"] or 14, 7), 31)
    cycle_end = payday + timedelta(days=cycle)
    next_cycle_bills = [b for b in bills if payday.isoformat() < b["next_due"] <= cycle_end.isoformat()]
    next_cycle_bills_total = _r(sum(b["amount"] for b in next_cycle_bills))
    next_cycle_income = _r(sum(p["amount"] for p in income["projected_income"]
                               if payday.isoformat() <= p["date"] < cycle_end.isoformat()))
    reserve = _r(max(next_cycle_bills_total - next_cycle_income, 0.0))
    safe_total = _r(balance - bills_total - reserve - buffer)
    per_day = _r(safe_total / days_left)
    spent_today = _r(sum(-t["amount"] for t in txns if t["date"] == as_of and t["amount"] < 0 and t["category"] in FLEXIBLE))
    left_today = _r(per_day - spent_today)
    typical_daily = _flex_daily_average(txns, as_of)
    if safe_total <= 0:
        status = "red"
    elif per_day >= typical_daily * 0.9:
        status = "green"
    elif per_day >= typical_daily * 0.6:
        status = "amber"
    else:
        status = "red"

    forecast = balance_forecast(balance, bills, as_of, payday, cycle_end, typical_daily, income["projected_income"])
    month = month_comparison(txns, as_of)
    last30 = spending_by_category(txns, as_of - timedelta(days=29), as_of)
    subs = [b for b in bills if b["category"] == "subscriptions"]
    goal = goal_progress(settings, as_of, safe_total, days_left)
    last_plan = check_last_plan(account_id, txns=txns, as_of=as_of)

    snap = {
        "account": {"id": account_id, "name": settings.get("name"), "kind": "demo" if account_id.startswith("demo-") else "uploaded"},
        "as_of": as_of.isoformat(),
        "data_is_old": stale,
        "balance": balance,
        "savings_buffer": buffer,
        "next_payday": payday.isoformat(),
        "days_until_payday": days_left,
        "expected_next_paycheck": income.get("expected_next_paycheck"),
        "bills_before_payday": bills_before,
        "bills_before_payday_total": bills_total,
        "next_cycle": {"ends": cycle_end.isoformat(), "bills": next_cycle_bills, "bills_total": next_cycle_bills_total,
                       "expected_income": next_cycle_income, "held_back": reserve},
        "held_back_for_next_cycle": reserve,
        "safe_to_spend_total": safe_total,
        "safe_per_day": per_day,
        "spent_today": spent_today,
        "left_today": left_today,
        "typical_daily_spending": typical_daily,
        "status": status,
        "income": income,
        "upcoming_bills": bills[:12],
        "subscriptions": {"count": len(subs), "monthly_total": _r(sum(s["monthly_cost"] for s in subs)), "items": subs},
        "spending_last_30_days": [{"category": c, "label": label(c), "amount": v} for c, v in last30.items()],
        "month": month,
        "forecast": forecast,
        "goal": goal,
        "last_plan": last_plan,
    }
    snap["insights"] = insights(snap, txns, as_of)
    return snap


def balance_forecast(balance, bills, as_of: date, payday: date, end: date, daily_spend: float, projected_income) -> dict:
    """Day-by-day balance projection from today through the next pay cycle:
    usual daily spending, every predicted bill, and every expected (conservative) paycheck."""
    due: dict[str, float] = defaultdict(float)
    for b in bills:
        due[b["next_due"]] += b["amount"]
    pay: dict[str, float] = defaultdict(float)
    for p in projected_income:
        pay[p["date"]] += p["amount"]
    points, bal = [], balance
    low, low_day = balance, as_of
    d = as_of
    while d <= end:
        iso = d.isoformat()
        if d > as_of:
            bal -= daily_spend
        bal = bal - due.get(iso, 0.0) + pay.get(iso, 0.0)
        if bal < low:
            low, low_day = bal, d
        points.append({"date": iso, "balance": _r(bal), "bill": _r(due[iso]) if iso in due else None,
                       "income": _r(pay[iso]) if iso in pay else None, "payday": d == payday})
        d += timedelta(days=1)
    return {"points": points, "lowest_before_payday": _r(min([p["balance"] for p in points if p["date"] <= payday.isoformat()] or [balance])),
            "lowest": _r(low), "lowest_date": low_day.isoformat(),
            "assumes_daily_spending": daily_spend}


def goal_progress(settings: dict, as_of: date, safe_total: float, days_left: int) -> dict | None:
    g = settings.get("goal")
    if not g:
        return None
    deadline = date.fromisoformat(g["deadline"])
    days_to_deadline = max((deadline - as_of).days, 1)
    remaining = _r(max(g["target"] - g.get("saved", 0.0), 0.0))
    per_week = _r(remaining * 7 / days_to_deadline)
    weekly_safe = _r(safe_total * 7 / days_left)
    return {
        "name": g["name"], "target": _r(g["target"]), "saved": _r(g.get("saved", 0.0)), "remaining": remaining,
        "percent": round(100 * g.get("saved", 0.0) / g["target"]) if g["target"] else 0,
        "deadline": g["deadline"], "weeks_left": round(days_to_deadline / 7, 1),
        "needed_per_week": per_week, "weekly_safe_to_spend": weekly_safe,
        "fits": per_week <= max(weekly_safe, 0),
    }


# ------------------------------------------------------------------ insights (no model needed)
def insights(snap: dict, txns, as_of: date) -> list[dict]:
    """Short, specific observations for the dashboard, most important first."""
    out = []
    f = snap["forecast"]
    if snap["safe_to_spend_total"] < 0:
        out.append({"id": "short", "severity": "high", "icon": "alert",
                    "title": "Bills are bigger than your balance",
                    "detail": f"Bills due before payday (${snap['bills_before_payday_total']:,.2f}) plus your ${snap['savings_buffer']:,.2f} cushion are more than your ${snap['balance']:,.2f} balance."})
    elif f["lowest"] < max(50.0, snap["savings_buffer"] * 0.5):
        out.append({"id": "low_balance", "severity": "high", "icon": "alert",
                    "title": "Your balance may run low soon",
                    "detail": f"At your usual pace it could drop to ${f['lowest']:,.2f} around {_nice(f['lowest_date'])}."})
    if snap["held_back_for_next_cycle"] > 0:
        nc = snap["next_cycle"]
        out.append({"id": "held_back", "severity": "medium", "icon": "shield",
                    "title": f"${nc['held_back']:,.2f} set aside for bills after payday",
                    "detail": f"Bills of ${nc['bills_total']:,.2f} are due soon after payday, more than the ${nc['expected_income']:,.2f} you're likely to earn by then."})
    for row in snap["month"]["categories"]:
        if row["category"] in FLEXIBLE and row["change"] >= 25 and (row["change_pct"] or 100) >= 25:
            title = (f"{row['label']} is up {row['change_pct']}% this month" if row["change_pct"] is not None
                     else f"{row['label']} is new this month")
            out.append({"id": f"up_{row['category']}", "severity": "medium", "icon": "trending-up",
                        "title": title,
                        "detail": f"${row['this_month']:,.2f} so far vs ${row['last_month_same_days']:,.2f} by this point in {snap['month']['last_month_label']}.",
                        "category": row["category"]})
            break
    soon = [b for b in snap["subscriptions"]["items"] if b["days_until"] <= 7]
    if soon:
        names = ", ".join(b["name"] for b in soon[:3])
        out.append({"id": "subs_soon", "severity": "low", "icon": "repeat",
                    "title": f"{len(soon)} subscription{'s renew' if len(soon) > 1 else ' renews'} this week",
                    "detail": f"{names}: ${sum(b['amount'] for b in soon):,.2f} total."})
    if snap["subscriptions"]["count"] >= 3:
        out.append({"id": "subs_total", "severity": "low", "icon": "repeat",
                    "title": f"Subscriptions cost about ${snap['subscriptions']['monthly_total']:,.2f} a month",
                    "detail": f"{snap['subscriptions']['count']} recurring services. Cancelling one you rarely use is the easiest saving."})
    g = snap["goal"]
    if g and not g["fits"] and g["remaining"] > 0:
        out.append({"id": "goal_pace", "severity": "medium", "icon": "target",
                    "title": f"{g['name']} needs ${g['needed_per_week']:,.2f} a week",
                    "detail": f"That is more than this week's safe-to-spend of ${max(g['weekly_safe_to_spend'], 0):,.2f}. A weekly plan can help you get closer."})
    elif g and g["remaining"] > 0:
        out.append({"id": "goal_ok", "severity": "good", "icon": "target",
                    "title": f"{g['name']} is within reach",
                    "detail": f"Saving ${g['needed_per_week']:,.2f} a week gets you there by {_nice(g['deadline'])}."})
    # unusually large purchase in the last 7 days
    by_cat: dict[str, list[float]] = defaultdict(list)
    for t in txns:
        if t["amount"] < 0 and t["category"] in FLEXIBLE and t["date"] > as_of - timedelta(days=90):
            by_cat[t["category"]].append(-t["amount"])
    for t in txns:
        if t["date"] > as_of - timedelta(days=7) and t["amount"] < 0 and t["category"] in FLEXIBLE:
            vals = by_cat[t["category"]]
            if len(vals) >= 5 and -t["amount"] >= 3 * statistics.median(vals) and -t["amount"] >= 40:
                out.append({"id": f"big_{t['id']}", "severity": "low", "icon": "receipt",
                            "title": f"Bigger than usual: {t['merchant']}",
                            "detail": f"${-t['amount']:,.2f} on {_nice(t['date'].isoformat())}, about {round(-t['amount'] / statistics.median(vals))}x your typical {label(t['category']).lower()} purchase."})
                break
    if snap["income"]["irregular"]:
        out.append({"id": "irregular", "severity": "low", "icon": "wave",
                    "title": "Your income changes from check to check",
                    "detail": f"Monthly income swung {snap['income']['swing_percent']}% over 3 months, so BudgetWise plans with your lower months (${snap['income']['lowest_month']:,.2f})."})
    lp = snap.get("last_plan")
    if lp and lp.get("stuck_to_plan"):
        out.append({"id": "plan_win", "severity": "good", "icon": "check",
                    "title": "You stuck to last week's plan", "detail": lp["summary"]})
    return out[:6]


def _nice(iso: str) -> str:
    d = date.fromisoformat(iso)
    return d.strftime("%a %b ") + str(d.day)


# ------------------------------------------------------------------ actions
def can_afford(account_id: str | None, amount: float, when: str | None = None, what: str = "") -> dict:
    """Would this purchase still leave enough money until payday?"""
    snap = snapshot(account_id)
    amount = _r(abs(float(amount)))
    after_total = _r(snap["safe_to_spend_total"] - amount)
    days = snap["days_until_payday"]
    after_per_day = _r(after_total / days)
    typical = snap["typical_daily_spending"]
    low_after = _r(snap["forecast"]["lowest"] - amount)
    if after_total < 0:
        verdict, reason = "no", "It would use money already needed for bills and your cushion."
    elif after_per_day < typical * 0.6:
        verdict, reason = "tight", "You could, but the rest of the days until payday would be very tight."
    else:
        verdict, reason = "yes", "It fits within your safe-to-spend money."
    return {
        "item": what or "this purchase", "amount": amount, "verdict": verdict, "reason": reason,
        "safe_to_spend_before": snap["safe_to_spend_total"], "safe_to_spend_after": after_total,
        "per_day_before": snap["safe_per_day"], "per_day_after": after_per_day,
        "days_until_payday": days, "next_payday": snap["next_payday"],
        "typical_daily_spending": typical, "lowest_balance_after": low_after,
        "goal_needed_per_week": snap["goal"]["needed_per_week"] if snap["goal"] else None,
    }


def build_weekly_plan(account_id: str | None, save_this_week: float, focus_category: str, cut_percent: int = 20) -> dict:
    """The math for a 7-day plan. The Planner agent chooses the strategy; this computes every number.
    Fix from M3: the focus cap is never looser than last week's cap for the same category."""
    account_id = account_id or store.active_account_id()
    snap = snapshot(account_id)
    txns = store.load_transactions(account_id)
    as_of = date.fromisoformat(snap["as_of"])
    weekly_safe = _r(snap["safe_to_spend_total"] * 7 / snap["days_until_payday"])
    if weekly_safe <= 0:
        return {"error": "Nothing is safe to spend before payday, so focus on covering bills first."}
    try:
        save_this_week = _r(save_this_week)
        cut_percent = int(cut_percent)
    except (TypeError, ValueError):
        return {"error": "save_this_week must be a number and cut_percent a whole number"}
    if not 0 <= save_this_week <= weekly_safe:
        return {"error": f"save_this_week must be between 0 and {weekly_safe} (this week's safe-to-spend)"}
    if not 0 <= cut_percent <= 50:
        return {"error": "cut_percent must be between 0 and 50"}
    last30 = spending_by_category(txns, as_of - timedelta(days=29), as_of)
    focus = str(focus_category).strip().lower()
    options = [c for c in last30 if c in FLEXIBLE]
    if focus not in options:
        return {"error": f"focus_category must be one of: {', '.join(options)}"}
    allowance = _r(weekly_safe - save_this_week)
    weekly_avg = _r(last30[focus] * 7 / 30)
    cap = _r(weekly_avg * (100 - cut_percent) / 100)
    prev = next((p for p in reversed(store.load_plans(account_id)) if p.get("focus_category") == focus), None)
    capped_by_last = False
    if prev and prev.get("focus_category_cap") is not None and cap > prev["focus_category_cap"]:
        cap, capped_by_last = _r(prev["focus_category_cap"]), True
    g = snap["goal"]
    return {
        "week_start": as_of.isoformat(), "week_end": (as_of + timedelta(days=6)).isoformat(),
        "weekly_safe_to_spend": weekly_safe, "save_this_week": save_this_week,
        "weekly_spending_allowance": allowance, "daily_limit": _r(allowance / 7),
        "focus_category": focus, "focus_label": label(focus), "focus_weekly_average": weekly_avg,
        "cut_percent": cut_percent, "focus_category_cap": cap, "freed_up_by_cut": _r(weekly_avg - cap),
        "cap_kept_at_last_week": capped_by_last,
        "goal_name": g["name"] if g else None, "goal_needed_per_week": g["needed_per_week"] if g else None,
        "on_track_for_goal": (save_this_week + 0.005 >= g["needed_per_week"]) if g else None,
    }


def check_last_plan(account_id: str | None, txns=None, as_of: date | None = None) -> dict | None:
    """Compare the most recent finished plan with what was actually spent."""
    account_id = account_id or store.active_account_id()
    txns = txns if txns is not None else store.load_transactions(account_id)
    as_of = as_of or _as_of(txns)[0]
    plans = [p for p in store.load_plans(account_id) if date.fromisoformat(p["week_start"]) < as_of]
    if not plans:
        return None
    plan = plans[-1]
    start = date.fromisoformat(plan["week_start"])
    end = min(start + timedelta(days=6), as_of - timedelta(days=1))
    days = (end - start).days + 1
    if days < 1:
        return None
    spent = spending_by_category(txns, start, end)
    flex = _r(sum(v for k, v in spent.items() if k in FLEXIBLE and k != "subscriptions"))
    avg = _r(flex / days)
    focus_spent = spent.get(plan["focus_category"], 0.0)
    ok_daily = avg <= plan["daily_limit"]
    ok_focus = focus_spent <= plan["focus_category_cap"]
    summary = (f"You averaged ${avg:,.2f}/day vs a ${plan['daily_limit']:,.2f} limit, and spent "
               f"${focus_spent:,.2f} on {label(plan['focus_category']).lower()} vs a ${plan['focus_category_cap']:,.2f} cap.")
    return {
        "week_start": plan["week_start"], "days_checked": days, "daily_limit": plan["daily_limit"],
        "actual_daily_average": avg, "focus_category": plan["focus_category"],
        "focus_category_cap": plan["focus_category_cap"], "actual_focus_spent": _r(focus_spent),
        "planned_savings": plan.get("save_this_week"), "stuck_to_daily_limit": ok_daily,
        "stuck_to_focus_cap": ok_focus, "stuck_to_plan": ok_daily and ok_focus, "summary": summary,
    }


def search_transactions(account_id: str | None, query: str = "", category: str = "", days: int = 30, limit: int = 15) -> dict:
    """Find transactions by merchant text and/or category over the last N days."""
    account_id = account_id or store.active_account_id()
    txns = store.load_transactions(account_id)
    as_of = _as_of(txns)[0]
    days = max(1, min(int(days), 120))
    q = (query or "").strip().upper()
    cat = (category or "").strip().lower()
    rows = [t for t in txns if t["date"] > as_of - timedelta(days=days)
            and (not q or q in t["description"].upper() or q in t["merchant"].upper())
            and (not cat or t["category"] == cat)]
    spent = _r(sum(-t["amount"] for t in rows if t["amount"] < 0))
    return {
        "query": query, "category": cat or None, "days": days, "matches": len(rows), "total_spent": spent,
        "transactions": [{"date": t["date"].isoformat(), "merchant": t["merchant"], "amount": t["amount"],
                          "category": t["category"]} for t in rows[:limit]],
    }


def compact_snapshot(snap: dict) -> dict:
    """A smaller version of the snapshot for the agents' context (fewer tokens = faster).
    Dates are written out with the weekday ("Sun Nov 15") so the model never has to work them out."""
    m = snap["month"]
    return _friendly_dates({
        "today": snap["as_of"],
        "balance": snap["balance"],
        "next_payday": snap["next_payday"],
        "days_until_payday": snap["days_until_payday"],
        "expected_next_paycheck": snap["expected_next_paycheck"],
        "bills_before_payday": [{"name": b["name"], "amount": b["amount"], "due": b["next_due"]} for b in snap["bills_before_payday"]],
        "bills_before_payday_total": snap["bills_before_payday_total"],
        "savings_cushion": snap["savings_buffer"],
        "safe_to_spend_total": snap["safe_to_spend_total"],
        "safe_per_day": snap["safe_per_day"],
        "spent_today": snap["spent_today"],
        "left_today": snap["left_today"],
        "typical_daily_spending": snap["typical_daily_spending"],
        "held_back_for_bills_after_payday": snap["held_back_for_next_cycle"],
        "next_cycle_bills_total": snap["next_cycle"]["bills_total"],
        "next_cycle_expected_income": snap["next_cycle"]["expected_income"],
        "forecast_lowest_balance": snap["forecast"]["lowest"],
        "forecast_lowest_date": snap["forecast"]["lowest_date"],
        "spending_last_30_days": {r["category"]: r["amount"] for r in snap["spending_last_30_days"][:8]},
        "this_month_vs_last": {
            "this_month_total_so_far": m["this_month_total"],
            "last_month_same_days_total": m["last_month_same_days_total"],
            "by_category": [{k: r[k] for k in ("category", "this_month", "last_month_same_days", "change")} for r in m["categories"][:6]],
        },
        "subscriptions_monthly_total": snap["subscriptions"]["monthly_total"],
        "subscriptions": [{"name": s["name"], "amount": s["amount"], "next": s["next_due"]} for s in snap["subscriptions"]["items"]],
        "income": {k: snap["income"][k] for k in ("average_monthly", "lowest_month", "swing_percent", "irregular", "main_source", "pay_every_days")},
        "goal": snap["goal"],
        "last_week_plan_check": snap["last_plan"],
    })


_ISO = __import__("re").compile(r"^\d{4}-\d{2}-\d{2}$")


def _friendly_dates(obj):
    if isinstance(obj, dict):
        return {k: _friendly_dates(v) for k, v in obj.items()}
    if isinstance(obj, list):
        return [_friendly_dates(v) for v in obj]
    if isinstance(obj, str) and _ISO.match(obj):
        d = date.fromisoformat(obj)
        return d.strftime("%a %b ") + str(d.day) + (f" {d.year}" if d.year != store.today().year else "")
    return obj
