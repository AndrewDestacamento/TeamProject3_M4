"""BudgetWise MCP tool server (Chapter 3: tools live in their own server, not inside the agent).

The agents reach these tools over MCP (stdio). app.py starts this server once when the
web app starts and keeps it running, so tool calls are fast (no cold start per question).

Every tool is a thin wrapper around budgetwise/finance.py, where all the money math is done
in Python. The model chooses which tool to call and with what arguments; it never does the
arithmetic itself. Tools always work on the account that is active in the app.

Tools (kept to a small set on purpose: Chapter 4, "the token-overhead math is real")
  search_transactions        find specific purchases ("How much did I spend at Starbucks?")
  get_spending_by_category   spending per category for any number of days
  check_affordability        "Can I afford $80?" with the before/after numbers
  get_income_details         paycheck sources, rhythm, swings and the next expected paychecks
  build_weekly_plan          the math for a 7-day plan (Planner only)
  search_budget_knowledge    cited budgeting guidance from the ChromaDB knowledge base

Run it by itself to inspect it:  mcp dev mcp_server.py
"""

from datetime import date, timedelta

from mcp.server.fastmcp import FastMCP

from budgetwise import finance, knowledge, store
from budgetwise.categories import label

mcp = FastMCP("BudgetWise")


@mcp.tool()
def search_transactions(query: str = "", category: str = "", days: int = 30) -> dict:
    """Find transactions by merchant name and/or category in the last N days (max 120).
    Returns the matching purchases and the total spent. Use it for questions about a
    specific store or category, e.g. query="starbucks" or category="dining".
    Categories: groceries, dining, transport, shopping, entertainment, subscriptions,
    health, personal, housing, utilities, insurance, debt_payment, education, fees, other.
    """
    return finance.search_transactions(None, query=query, category=category, days=days)


@mcp.tool()
def get_spending_by_category(days: int = 30) -> dict:
    """Total spending per category over the last N days (1-120), largest first."""
    days = max(1, min(int(days), 120))
    account = store.active_account_id()
    txns = store.load_transactions(account)
    as_of = date.fromisoformat(finance.snapshot(account)["as_of"])
    spent = finance.spending_by_category(txns, as_of - timedelta(days=days - 1), as_of)
    return {
        "days": days,
        "from": (as_of - timedelta(days=days - 1)).isoformat(),
        "to": as_of.isoformat(),
        "total": round(sum(spent.values()), 2),
        "by_category": [
            {"category": c, "label": label(c), "amount": v} for c, v in spent.items()
        ],
    }


@mcp.tool()
def check_affordability(amount: float, what: str = "") -> dict:
    """Check whether a purchase of `amount` dollars fits before the next payday.
    Returns verdict (yes / tight / no), safe-to-spend before and after, and the new daily amount.
    """
    return finance.can_afford(None, amount, what=what)


@mcp.tool()
def get_income_details() -> dict:
    """Paycheck sources, how often they arrive, how much monthly income swings, and the
    conservative amounts of the next expected paychecks."""
    snap = finance.snapshot()
    inc = snap["income"]
    return {
        k: inc[k]
        for k in (
            "sources",
            "monthly",
            "average_monthly",
            "lowest_month",
            "swing_percent",
            "irregular",
            "next_payday",
            "next_payday_confidence",
            "projected_income",
        )
    }


@mcp.tool()
def build_weekly_plan(
    save_this_week: float, focus_category: str, cut_percent: int = 20
) -> dict:
    """Do the math for a 7-day spending plan. You choose the strategy; this calculates every number.
    save_this_week: dollars to move toward the savings goal this week (0 or more).
    focus_category: ONE flexible category to cap this week (e.g. "dining").
    cut_percent: how far below its recent weekly average to cap that category (0-50).
    Returns the daily limit, the category cap, money freed by the cut and goal pace."""
    return finance.build_weekly_plan(None, save_this_week, focus_category, cut_percent)


@mcp.tool()
def search_budget_knowledge(query: str, top_k: int = 2) -> dict:
    """Search the budgeting guide library (Penn State Extension and CFPB advice) for passages
    about a strategy, e.g. "irregular income baseline" or "cutting dining out". Cite the source.
    """
    return knowledge.search(query, top_k=top_k)


if __name__ == "__main__":
    mcp.run()  # stdio transport
