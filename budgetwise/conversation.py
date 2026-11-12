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
    "bills": ("What bills should we plan around? Tell me an amount and when it’s due.", ["That’s all my bills", "I have no bills", "Skip for now"]),
    "spending": ("About how much do you spend on everyday things in a typical week?", ["Skip for now"]),
}


def state(account=None):
    account = account or store.active_account_id()
    settings = store.load_settings(account)
    snap = finance.snapshot(account)
    skipped = settings.get("conversation_skipped", [])
    missing = (["saved"] if snap["goal"] and not snap["goal"]["saved_known"] else []) + snap["readiness"]["missing"]
    key = next((k for k in missing if k not in skipped), None) if snap["goal"] or settings.get("conversation_started") else None
    question, choices = QUESTIONS[key] if key else (None, [])
    if settings.get("pending_clarification"):
        key, question, choices = "clarification", settings["pending_clarification"], ["Skip for now"]
    return {"question_key": key, "question": question, "choices": choices,
            "history": settings.get("conversation_history", []), "skipped": skipped}


def remember(account, message, answer, saved=None):
    saved = json.loads(json.dumps(saved, default=str)) if saved else None
    history = store.load_settings(account).get("conversation_history", [])
    history += [{"role": "user", "text": message}, {"role": "assistant", "text": answer, "saved": saved}]
    store.save_settings(account, {"conversation_history": history[-40:]})


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


async def quick_reply(message, account):
    """Only match unambiguous complete inputs; everything else goes to a specialist."""
    text = message.strip().rstrip(".! ")
    low = text.lower().replace("’", "'")
    current = state(account)
    key = current["question_key"]
    settings = store.load_settings(account)
    if low in ("skip", "skip for now"):
        store.save_settings(account, {"pending_clarification": None, "conversation_skipped": list(set(current["skipped"] + ([key] if key else [])))})
        return "Of course. You can add that anytime, or tell me something else.", None
    if low in ("what can you do?", "what can you do", "help", "hi", "hello", "how does this work?", "how does this work"):
        return "I can track spending, income and bills, help you work toward a savings goal, and explain patterns in a bank CSV. Tell me one thing to start. Questions are optional, and you can correct or undo saved entries.", None
    if re.fullmatch(r"(?:what about |tell me about )?privacy\??|(?:is my data private|where is my data stored|what happens to my data)\??", low):
        return "Your records are stored in this app’s local database. When you use AI, your message and relevant financial context are sent to the configured model provider. Share only what you choose; don’t include passwords or full account numbers. This prototype has no individual logins, so use sample data on a shared installation.", None
    if low in ("save for something", "save toward a goal"):
        return "What would you like to save for, how much, and by when? For example: ‘I want to save $500 for a trip in two months.’", None
    if low in ("track spending", "understand my spending"):
        return "Tell me a purchase, like ‘Yesterday I spent $5 on coffee’, or import a bank CSV. I’ll keep your activity organized. You don’t need a savings goal.", None
    if low in ("my pay varies", "i don't know", "not sure") and key in ("payday", "income"):
        store.save_settings(account, {"conversation_skipped": list(set(current["skipped"] + [key]))})
        return "That’s okay. I’ll leave that unknown. You can add a date or an expected pay range whenever you know it.", None
    if low in ("that's all my bills", "i have no bills"):
        if low == "i have no bills" and any(s["kind"] == "bill" for s in store.schedules(account)):
            return "You have saved bills already. Review them in Settings before confirming that you have none.", None
        store.save_settings(account, {"bills_reviewed": True})
        return "Your bill review is saved. Add any changes whenever they come up.", None

    batch = store.new_id("chat-")
    tool, args = None, None
    amount = r"\$?((?:\d{1,3}(?:,\d{3})+|\d+)(?:\.\d{1,2})?)(?: dollars)?"
    goal = re.fullmatch(r"(?:i (?:want|need|would like) to |i'm trying to )save " + amount + r"(?: for (.+?))? (this week|in .+?)(?: for (.+))?", low)
    balance = re.fullmatch(r"(?:i have|i've got|my balance is) (?:about )?" + amount + r"(?: (?:in my (?:bank )?account|in checking))?(?: (?:currently|right now|today))?", low)
    number = re.fullmatch(amount, low)
    expense = re.fullmatch(r"(?:(yesterday|today) )?i spent (about )?" + amount + r" on ([a-z &'-]+?)(?: (today|yesterday))?", low)
    if goal and relative_date(goal[3], store.today()):
        if settings.get("goal"):
            return "You already have an active goal. To change it, say ‘Change my goal to…’ or use Edit on your goal card.", None
        tool, args = bookkeeper.set_savings_goal, {"target": float(goal[1].replace(",", "")), "deadline": relative_date(goal[3], store.today()).isoformat(), "name": goal[2] or goal[4] or "Savings goal"}
    elif balance:
        tool, args = bookkeeper.set_balance, {"amount": float(balance[1].replace(",", ""))}
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
            store.save_settings(account, {"conversation_started": True, "pending_clarification": None})
            return confirmation(summary), summary
        return str(result), None
    return None


def confirmation(summary):
    parts = []
    for balance in summary.get("balances", []):
        parts.append(f"Current balance updated to **${balance['balance']:,.2f}**. This is separate from money set aside for your goal.")
    for t in summary.get("transactions", []):
        parts.append(f"Recorded {'income' if t['amount'] > 0 else 'spending'}: **${abs(t['amount']):,.2f}** · {t['description']} · {finance._nice(str(t['date']))}.")
    for s in summary.get("schedules", []):
        parts.append(f"Saved {s['name']}. You can review the details in Settings.")
    if summary.get("goal"):
        g = summary["goal"]
        parts.append(f"Goal saved: **{g['name']} · ${g['target']:,.2f} by {finance._nice(g['deadline'])}**.")
        if g.get("saved_known"):
            parts.append(f"Set aside for this goal: **${g['saved']:,.2f}**.")
    if summary.get("typical_weekly_spend") is not None:
        parts.append(f"Usual weekly spending saved: **${summary['typical_weekly_spend']:,.2f}**.")
    return "\n\n".join(parts) or "Your update is saved."
