"""Persistent guided conversation. Explicit answers use code; open language uses agents.

The question is application state, never an instruction supplied by the browser.
Money changes use the same validated Bookkeeper tools as the agent.
"""
import calendar
import json
import re
from datetime import date, timedelta

from agents.tool_context import ToolContext
from . import bookkeeper, finance, store

QUESTIONS = {
    "saved": ("Have you set anything aside for this goal already?", ["Nothing yet", "Skip for now"]),
    "balance": ("About how much is in your account right now?", ["Skip for now"]),
    "payday": ("When do you next get paid?", ["My pay varies", "Skip for now"]),
    "income": ("How often do you get paid, and about how much? A range is fine.", ["Skip for now"]),
    "bills": ("Tell me a regular bill, its amount, and when it’s due—or add bills later as they come up.",
              ["I’ll add bills as they come up", "I don’t have regular bills"]),
    "spending": ("About how much do you spend on everyday things in a typical week?", ["Skip for now"]),
}

DEFERRED = {"deferred", "unknown", "not_applicable"}
MAX_GUIDED_ANSWERS = 3
TRANSITION = ("That’s enough setup for now. You can log spending, income or bills, "
              "or ask a question anytime.")
CLARIFICATIONS = {
    "saved": "A rough amount already saved is enough, or say ‘skip for now.’",
    "balance": "A rough account balance is enough, or say ‘skip for now.’",
    "payday": "A date or day of the week is enough, or say ‘skip for now.’",
    "income": "A rough paycheck amount or range is enough, or say ‘skip for now.’",
    "bills": "Share one bill with its amount and due date, or say ‘skip for now.’",
    "spending": "A rough weekly spending estimate is enough, or say ‘skip for now.’",
}


def _statuses(settings: dict) -> dict[str, str]:
    """Per-topic answer state. Keep the old skipped list readable for existing workspaces."""
    statuses = dict(settings.get("conversation_status", {}))
    for key in settings.get("conversation_skipped", []):
        statuses.setdefault(key, "deferred")
    return statuses


def _defer(account: str, key: str | None, status: str = "deferred") -> None:
    if not key:
        return
    settings = store.load_settings(account)
    statuses = _statuses(settings)
    statuses[key] = status
    skipped = sorted(set(settings.get("conversation_skipped", [])) | {key})
    store.save_settings(account, {"conversation_status": statuses, "conversation_skipped": skipped,
                                  "pending_clarification": None, "pending_clarification_key": None})


def _topic(current: dict) -> str | None:
    return current.get("clarification_for") if current.get("question_key") == "clarification" else current.get("question_key")


def pause_guidance(account: str, key: str | None = None, status: str = "deferred") -> None:
    """End the optional setup sequence without pretending missing information is known."""
    if key:
        _defer(account, key, status)
    store.save_settings(account, {"conversation_guidance_paused": True,
                                  "pending_clarification": None, "pending_clarification_key": None})


def resume_guidance(account: str) -> None:
    store.save_settings(account, {"conversation_guidance_paused": False,
                                  "conversation_question_streak": 0,
                                  "pending_clarification": None, "pending_clarification_key": None})


def set_clarification(account: str, key: str | None) -> str | None:
    """Allow one focused clarification per topic, never a model-selected topic switch."""
    if not key or key not in CLARIFICATIONS:
        return None
    settings = store.load_settings(account)
    counts = dict(settings.get("conversation_clarifications", {}))
    if int(counts.get(key, 0)) >= 1:
        pause_guidance(account, key, "unknown")
        return None
    counts[key] = 1
    question = CLARIFICATIONS[key]
    store.save_settings(account, {"conversation_clarifications": counts,
                                  "pending_clarification": question,
                                  "pending_clarification_key": key})
    return question


def complete_guided_turn(account: str, before: dict, saved: bool = False) -> str:
    """Advance bounded setup or stop when a reply did not resolve the active topic."""
    topic = _topic(before)
    if not topic or store.load_settings(account).get("conversation_guidance_paused"):
        return ""
    after = state(account)
    after_topic = _topic(after)
    if after_topic == topic:
        # A useful partial save should be kept, but the app must not demand the
        # missing part again immediately. Other topic changes pause setup too.
        pause_guidance(account, topic if saved else None, "deferred")
        return TRANSITION
    settings = store.load_settings(account)
    streak = int(settings.get("conversation_question_streak", 0)) + 1
    paused = streak >= MAX_GUIDED_ANSWERS
    store.save_settings(account, {"conversation_question_streak": streak,
                                  "conversation_guidance_paused": paused})
    return TRANSITION if paused else ""


def state(account=None):
    account = account or store.active_account_id()
    settings = store.load_settings(account)
    snap = finance.snapshot(account)
    statuses = _statuses(settings)
    skipped = sorted(k for k, value in statuses.items() if value in DEFERRED)
    missing = (["saved"] if snap["goal"] and not snap["goal"]["saved_known"] else []) + snap["readiness"]["missing"]
    active = (snap["goal"] or settings.get("conversation_started")) and not settings.get("conversation_guidance_paused")
    key = next((k for k in missing if k not in skipped), None) if active else None
    question, choices = QUESTIONS[key] if key else (None, [])
    if key == "income" and any(s["kind"] == "income" and s.get("every") for s in snap.get("told", [])):
        question, choices = "About how much is a typical paycheck? A range is fine.", ["Skip for now"]
    clarification_for = settings.get("pending_clarification_key") or key
    if settings.get("pending_clarification") and active:
        key, question, choices = "clarification", settings["pending_clarification"], ["Skip for now"]
    return {"question_key": key, "question": question, "choices": choices,
            "history": settings.get("conversation_history", []), "skipped": skipped, "statuses": statuses,
            "clarification_for": clarification_for}


def remember(account, message, answer, saved=None, plan=None):
    saved = json.loads(json.dumps(saved, default=str)) if saved else None
    plan = json.loads(json.dumps(plan, default=str)) if plan else None
    history = store.load_settings(account).get("conversation_history", [])
    history += [{"role": "user", "text": message},
                {"role": "assistant", "text": answer, "saved": saved, "plan": plan}]
    store.save_settings(account, {"conversation_history": history[-40:]})


def starter_plan(account: str) -> str:
    """Useful, verified first steps that do not pretend missing data is known."""
    snap = finance.snapshot(account)
    goal = snap.get("goal")
    if not goal:
        return ("You don’t need a savings goal to start. Log spending and income as they happen, "
                "and I’ll organize them and look for patterns. Once I have about a week of activity—or "
                "a bank CSV—I can give more specific spending advice.")
    pace = (f"**Starting target:** set aside about **${goal['needed_per_week']:,.2f} per week** "
            f"(${goal['needed_per_day']:,.2f} per day on average) toward **{goal['name']}**.")
    if goal["plan_level"] == "personalized":
        fit = ("That pace fits the income, bills, and spending you’ve shared."
               if goal.get("fits") else "That pace looks tight with the information you’ve shared, so ask me to adjust it before committing.")
        return f"{pace}\n\n{fit} Keep logging changes and I’ll update the plan."
    return (f"{pace}\n\nThis is a goal pace, not a safe-to-spend amount yet. Share purchases, income, "
            "or bills whenever they happen, and I’ll make it more realistic without requiring every detail up front.")


def relative_date(value, today):
    text = value.strip().lower()
    if text == "this week":
        return today + timedelta(days=(6 - today.weekday()) or 7)
    if text in ("today", "tomorrow"):
        return today + timedelta(days=int(text == "tomorrow"))
    try:
        return date.fromisoformat(text)
    except ValueError:
        pass
    months = {name.lower(): i for i, name in enumerate(calendar.month_name) if name}
    named = re.fullmatch(r"([a-z]+) (\d{1,2})(?:,? (\d{4}))?", text)
    if named and named[1] in months:
        year = int(named[3]) if named[3] else today.year
        try:
            result = date(year, months[named[1]], int(named[2]))
        except ValueError:
            return None
        if not named[3] and result <= today:
            result = result.replace(year=year + 1)
        return result
    words = {"a": 1, "one": 1, "two": 2, "three": 3, "four": 4, "six": 6}
    m = re.fullmatch(r"(?:in )?(\d+|a|one|two|three|four|six) (days?|weeks?|months?)", text)
    if m:
        n = words.get(m[1], int(m[1]) if m[1].isdigit() else 1)
        if n > 120:
            return None
        if m[2].startswith("month"):
            month = today.month - 1 + n
            year, month = today.year + month // 12, month % 12 + 1
            return date(year, month, min(today.day, calendar.monthrange(year, month)[1]))
        return today + timedelta(days=n * (7 if m[2].startswith("week") else 1))
    weekdays = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]
    if text in weekdays:
        return today + timedelta(days=(weekdays.index(text) - today.weekday()) % 7 or 7)
    return None


def _goal_parts(text: str, today: date) -> tuple[float, str, date] | None:
    """Parse common complete goal sentences without losing the name or date."""
    amount = r"\$?((?:\d{1,3}(?:,\d{3})+|\d+)(?:\.\d{1,2})?)(?: dollars)?"
    match = re.fullmatch(r"(?:i (?:want|need|would like) to |i'm trying to )save " + amount + r"(?: (.+))?", text)
    if not match or not match[2]:
        return None
    rest = match[2].strip()
    name, deadline_text = "Savings goal", ""
    if rest.startswith("by "):
        body = rest[3:]
        deadline_text, separator, trailing_name = body.partition(" for ")
        if separator:
            name = trailing_name
    elif rest.startswith("in ") or rest == "this week":
        timing = re.fullmatch(r"((?:in )?(?:\d+|a|one|two|three|four|six) (?:days?|weeks?|months?)|this week)(?: for (.+))?", rest)
        if not timing:
            return None
        deadline_text, name = timing[1], timing[2] or name
    elif rest.startswith("for "):
        body = rest[4:]
        if " by " in body:
            name, deadline_text = body.rsplit(" by ", 1)
        elif " in " in body:
            name, tail = body.rsplit(" in ", 1)
            deadline_text = "in " + tail
        else:
            return None
    else:
        return None
    deadline = relative_date(deadline_text, today)
    if not deadline:
        return None
    name = re.sub(r"^(?:a|an|the)\s+", "", name.strip(), flags=re.I) or "Savings goal"
    return float(match[1].replace(",", "")), name, deadline


def _multiple_expenses(text: str) -> list[dict]:
    """Parse common multi-purchase sentences so no item depends on model attention."""
    low = text.strip().lower().replace("’", "'")
    if not re.search(r"\b(spent|paid|bought)\b", low):
        return []
    pattern = re.compile(
        r"(?:about\s+|around\s+)?\$?((?:\d{1,3}(?:,\d{3})+|\d+)(?:\.\d{1,2})?)"
        r"(?:\s+dollars?)?\s+(?:on\s+|at\s+|for\s+)?(.+?)"
        r"(?=\s+(?:and|,)\s+(?:about\s+|around\s+)?\$?\d|$)", re.I)
    items = []
    for match in pattern.finditer(low):
        what = re.sub(r"\s+(?:today|yesterday)$", "", match[2]).strip(" ,.!?")
        if what:
            items.append({"amount": float(match[1].replace(",", "")), "what": what,
                          "days_ago": 1 if "yesterday" in low else 0,
                          "approximate": bool(re.search(r"\b(about|around|roughly|like)\b", low))})
    return items if len(items) >= 2 else []


async def quick_reply(message, account):
    """Only match unambiguous complete inputs; everything else goes to a specialist."""
    text = message.strip().rstrip(".! ")
    low = text.lower().replace("’", "'")
    current = state(account)
    key = current["question_key"]
    settings = store.load_settings(account)
    if low in ("continue setup", "resume setup", "ask me the setup questions"):
        resume_guidance(account)
        return "Okay. I’ll ask one useful question at a time, and you can stop whenever you want.", None
    if low in ("skip", "skip for now"):
        underlying = current.get("clarification_for") if key == "clarification" else key
        pause_guidance(account, underlying or key)
        return "Of course. Add it whenever you’re ready. " + TRANSITION, None
    if low in ("what can you do?", "what can you do", "help", "hi", "hello", "how does this work?", "how does this work"):
        return "I can track spending, income and bills, help you work toward a savings goal, and explain patterns in a bank CSV. Tell me one thing to start. Questions are optional, and you can correct or undo saved entries.", None
    if re.fullmatch(r"(?:what about |tell me about )?privacy\??|(?:is my data private|where is my data stored|what happens to my data)\??", low):
        return "Your records are stored in this app’s local database. When you use AI, your message and relevant financial context are sent to the configured model provider. Share only what you choose; don’t include passwords or full account numbers. This prototype has no individual logins, so use sample data on a shared installation.", None
    if low in ("save for something", "save toward a goal"):
        return "What would you like to save for, how much, and by when? For example: ‘I want to save $500 for a trip in two months.’", None
    if low in ("track spending", "understand my spending"):
        return "Tell me a purchase, like ‘Yesterday I spent $5 on coffee’, or import a bank CSV. I’ll keep your activity organized. You don’t need a savings goal.", None
    if low in ("give me a starter plan", "show me a starter plan", "starter plan"):
        return starter_plan(account), None
    uncertain = re.fullmatch(
        r"(?:i(?:'m| am) )?(?:not sure|unsure)|i (?:don't|do not) know|no idea|"
        r"not right now|maybe later|later|i(?:'ll| will) (?:add|tell you)(?: that)? later|"
        r"i (?:would )?rather not say|i prefer not to (?:say|share)|i do not want to (?:say|share)", low)
    if uncertain and key:
        underlying = current.get("clarification_for") if key == "clarification" else key
        pause_guidance(account, underlying, "unknown")
        if underlying == "spending":
            lead = "That’s okay. Log purchases as they happen, and I’ll learn your spending pattern over time."
        else:
            lead = "That’s okay. I’ll leave that unknown, and you can add it later if you want."
        return lead + " " + TRANSITION, None
    pay_deferred = re.search(r"\b(?:pay|paycheck|income|amount)\b.*\b(?:varies|changes|don't know|do not know|not sure|let you know)\b", low)
    has_pay_details = re.search(r"\b(?:every (?:one|two|three|four|\d+) weeks?|weekly|biweekly|monthly|\$?\d+)\b", low)
    if (low in ("my pay varies", "i don't know", "not sure") or (pay_deferred and not has_pay_details)) and key in ("payday", "income"):
        pause_guidance(account, key, "unknown")
        return "That’s okay. I’ll leave that unknown. You can add a date or an expected pay range whenever you know it. " + TRANSITION, None
    bill_topic = current.get("clarification_for") if key == "clarification" else key
    bill_deferral_words = re.search(
        r"\b(?:let you know|later|as i get them|as they come(?: up)?|when they come(?: up)?|"
        r"add (?:them|bills?) as (?:i get|they come)|bills? (?:vary|varies|change|changes))\b", low)
    bills_deferred = bill_topic == "bills" and bill_deferral_words and not re.search(r"\$?\d", low)
    if bills_deferred:
        pause_guidance(account, "bills", "deferred")
        return "Got it. Add bills whenever they come up, and I’ll keep track of them without asking again now. " + TRANSITION, None
    if low in ("that's all my bills", "i have no bills", "i don't have regular bills"):
        if low in ("i have no bills", "i don't have regular bills") and any(s["kind"] == "bill" for s in store.schedules(account)):
            return "You have saved bills already. Review them in Settings before confirming that you have none.", None
        store.save_settings(account, {"bills_reviewed": True})
        return "Got it. I won’t plan for regular bills unless you add one later.", None

    batch = store.new_id("chat-")
    tool, args = None, None
    amount = r"\$?((?:\d{1,3}(?:,\d{3})+|\d+)(?:\.\d{1,2})?)(?: dollars)?"
    goal = _goal_parts(low, store.today())
    balance = re.fullmatch(r"(?:i have|i've got|my balance is) (?:about )?" + amount + r"(?: (?:in my (?:bank )?account|in checking))?(?: (?:currently|right now|today))?", low)
    number = re.fullmatch(amount, low)
    expense = re.fullmatch(r"(?:(yesterday|today) )?i spent (about )?" + amount + r" on ([a-z &'-]+?)(?: (today|yesterday))?", low)
    multiple_expenses = _multiple_expenses(low)
    if goal:
        if settings.get("goal"):
            return "You already have an active goal. To change it, say ‘Change my goal to…’ or use Edit on your goal card.", None
        tool, args = bookkeeper.set_savings_goal, {"target": goal[0], "deadline": goal[2].isoformat(), "name": goal[1]}
    elif balance:
        tool, args = bookkeeper.set_balance, {"amount": float(balance[1].replace(",", ""))}
    elif multiple_expenses:
        tool, args = bookkeeper.log_spending, {"items": multiple_expenses}
    elif expense:
        tool, args = bookkeeper.log_spending, {"items": [{"amount": float(expense[3].replace(",", "")), "what": expense[4], "days_ago": 1 if "yesterday" in (expense[1], expense[5]) else 0, "approximate": bool(expense[2])}]}
    elif key == "saved" and (number or low in ("none", "nothing", "nothing yet", "i haven't saved anything yet", "i havent saved anything yet")):
        tool, args = bookkeeper.update_savings_goal, {"saved_so_far": float(number[1].replace(",", "")) if number else 0}
    elif key == "balance" and number:
        tool, args = bookkeeper.set_balance, {"amount": float(number[1].replace(",", ""))}
    elif key == "spending" and number:
        tool, args = bookkeeper.set_typical_weekly_spending, {"amount": float(number[1].replace(",", ""))}
    elif key == "payday":
        payday = relative_date(low, store.today())
        if payday and payday >= store.today():
            store.save_settings(account, {"next_payday": payday.isoformat(), "conversation_started": True})
            return f"Next payday saved: {finance._nice(payday.isoformat())}. You can change it in Settings.", None
    if tool:
        ctx = ToolContext(context=bookkeeper.BookContext(account_id=account, batch_id=batch, today=store.today()), tool_name=tool.name, tool_call_id=batch, tool_arguments=json.dumps(args))
        result = await tool.on_invoke_tool(ctx, json.dumps(args))
        summary = store.batch_summary(account, batch)
        if summary["count"]:
            store.save_settings(account, {"conversation_started": True, "pending_clarification": None,
                                          "pending_clarification_key": None})
            return confirmation(summary), summary
        return str(result), None
    return None


def confirmation(summary):
    parts = []
    for balance in summary.get("balances", []):
        extra = " This is separate from money set aside for your goal." if summary.get("has_active_goal") else ""
        parts.append(f"Current balance updated to **${balance['balance']:,.2f}**.{extra}")
    for t in summary.get("transactions", []):
        parts.append(f"Recorded {'income' if t['amount'] > 0 else 'spending'}: **${abs(t['amount']):,.2f}** · {t['description']} · {finance._nice(str(t['date']))}.")
    for s in summary.get("schedules", []):
        every = {"weekly": "every week", "biweekly": "every two weeks", "twice_monthly": "twice a month",
                 "monthly": "monthly", "once": "once"}.get(s["every"], s["every"])
        if s["kind"] == "income":
            amount = (f"${s['low']:,.2f}–${s['high']:,.2f}" if s.get("low") is not None and s.get("high") is not None
                      else f"about ${s['amount']:,.2f}" if s.get("amount") is not None else "amount not added")
            when = f", next on {finance._nice(s['next_date'])}" if s.get("next_date") else ""
            parts.append(f"Pay schedule saved: **{every}, {amount}{when}**.")
        else:
            if s.get("day_of_month"):
                n = int(s["day_of_month"])
                suffix = "th" if 10 <= n % 100 <= 20 else {1: "st", 2: "nd", 3: "rd"}.get(n % 10, "th")
                when = f" on the {n}{suffix}"
            else:
                when = f", next on {finance._nice(s['next_date'])}" if s.get("next_date") else ""
            parts.append(f"{s['name']} saved: **${s['amount']:,.2f} {every}{when}**.")
    if summary.get("goal"):
        g = summary["goal"]
        if summary.get("goal_action") != "saved_amount":
            parts.append(f"Goal saved: **{g['name']} · ${g['target']:,.2f} by {finance._nice(g['deadline'])}**.")
        if g.get("saved_known"):
            parts.append(f"Set aside for this goal: **${g['saved']:,.2f}**.")
    if summary.get("typical_weekly_spend") is not None:
        parts.append(f"Usual weekly spending saved: **${summary['typical_weekly_spend']:,.2f}**.")
    return "\n\n".join(parts) or "Your update is saved."
