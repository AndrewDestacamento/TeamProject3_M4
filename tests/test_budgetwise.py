"""BudgetWise unit tests: no model calls and no network. Run with:  python -m pytest

They cover the money engine (every number the app shows), the CSV importer, the
categorizer rules, the code router, and the MCP server over the real protocol.
The date is pinned so the demo personas always produce the same numbers.
"""

import asyncio
import json
import sys
from pathlib import Path

import pytest

ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT))

from budgetwise import finance, importer, store  # noqa: E402
from budgetwise.agents import route  # noqa: E402
from budgetwise.categories import merchant_key, pretty_merchant, rule_category  # noqa: E402

TODAY = "2026-11-10"


@pytest.fixture(autouse=True)
def isolated(tmp_path, monkeypatch):
    """Each test gets an empty workspace and the same 'today'."""
    monkeypatch.setenv("BUDGETWISE_TODAY", TODAY)
    monkeypatch.setattr(store, "WORKSPACE", tmp_path)
    monkeypatch.setattr(store, "ACCOUNTS_DIR", tmp_path / "accounts")


# ---------------------------------------------------------------- the snapshot math
@pytest.mark.parametrize("acc", ["demo-maya", "demo-jordan", "demo-priya"])
def test_safe_to_spend_adds_up(acc):
    s = finance.snapshot(acc)
    expected = round(s["balance"] - s["bills_before_payday_total"] - s["held_back_for_next_cycle"] - s["savings_buffer"], 2)
    assert s["safe_to_spend_total"] == expected
    assert s["safe_per_day"] == round(expected / s["days_until_payday"], 2)
    assert s["left_today"] == round(s["safe_per_day"] - s["spent_today"], 2)


def test_maya_is_amber_and_payday_is_detected():
    s = finance.snapshot("demo-maya")
    assert s["status"] == "amber"
    assert s["next_payday"] == "2026-11-16"          # biweekly paycheck, last one 8 days ago
    assert s["income"]["pay_every_days"] == 14
    assert [b["name"] for b in s["bills_before_payday"]] == ["Mint Mobile", "Spotify"]


def test_jordan_holds_back_rent_due_after_a_small_payout():
    s = finance.snapshot("demo-jordan")
    rent = next(b for b in s["upcoming_bills"] if "Apartment" in b["name"])
    assert rent["next_due"] > s["next_payday"]        # rent lands after payday...
    assert s["held_back_for_next_cycle"] > 1000       # ...so most of it is held back now
    assert any(i["id"] == "held_back" for i in s["insights"])


def test_recurring_bills_are_found_but_groceries_are_not():
    s = finance.snapshot("demo-priya")
    names = {b["name"] for b in s["upcoming_bills"]}
    assert {"Adobe Creative Cloud", "Seacrest Property Mgmt", "Xfinity Internet"} <= names
    assert not any(b["category"] == "groceries" for b in s["upcoming_bills"])


def test_forecast_covers_today_through_next_cycle():
    s = finance.snapshot("demo-maya")
    pts = s["forecast"]["points"]
    assert pts[0]["date"] == TODAY and pts[0]["balance"] == s["balance"]
    assert any(p["payday"] for p in pts)
    assert s["forecast"]["lowest"] == min(p["balance"] for p in pts)


def test_month_comparison_is_like_for_like():
    m = finance.snapshot("demo-maya")["month"]
    assert m["days_compared"] == 10
    assert m["this_month_label"] == "November" and m["last_month_label"] == "October"


# ---------------------------------------------------------------- actions
def test_can_afford_verdicts():
    s = finance.snapshot("demo-maya")
    assert finance.can_afford("demo-maya", 5)["verdict"] == "yes"
    assert finance.can_afford("demo-maya", 60)["verdict"] == "tight"
    big = finance.can_afford("demo-maya", s["safe_to_spend_total"] + 1)
    assert big["verdict"] == "no" and big["safe_to_spend_after"] < 0


def test_weekly_plan_math():
    p = finance.build_weekly_plan("demo-maya", 20, "dining", 20)
    assert p["daily_limit"] == round(p["weekly_spending_allowance"] / 7, 2)
    assert p["weekly_spending_allowance"] == round(p["weekly_safe_to_spend"] - 20, 2)
    assert p["focus_category_cap"] <= 55.0            # never looser than last week's $55 cap (M3 bug fix)


def test_weekly_plan_rejects_bad_input():
    assert "error" in finance.build_weekly_plan("demo-maya", -5, "dining", 20)
    assert "error" in finance.build_weekly_plan("demo-maya", 10, "rent", 20)
    assert "error" in finance.build_weekly_plan("demo-maya", 10, "dining", 90)


def test_saved_plan_is_checked_next_week(monkeypatch):
    plan = finance.build_weekly_plan("demo-maya", 20, "dining", 20)
    store.save_plan("demo-maya", plan)
    assert finance.check_last_plan("demo-maya")["week_start"] == "2026-11-03"  # today's plan isn't finished yet
    monkeypatch.setenv("BUDGETWISE_TODAY", "2026-11-18")
    assert finance.check_last_plan("demo-maya")["week_start"] == TODAY


def test_search_transactions():
    r = finance.search_transactions("demo-maya", query="starbucks", days=30)
    assert r["matches"] > 0 and all("Starbucks" in t["merchant"] for t in r["transactions"])


# ---------------------------------------------------------------- categories and import
def test_rules_and_merchant_names():
    assert rule_category("STARBUCKS STORE 08821", -6.45) == "dining"
    assert rule_category("TARGET CORP PAYROLL PPD ID: 1041224023", 612.40) == "income"
    assert rule_category("SQ *GOLDEN BOBA TEA", -7.00) is None      # left for the Categorizer agent
    assert merchant_key("STARBUCKS STORE 1234") == merchant_key("STARBUCKS STORE 99")
    assert pretty_merchant("UBER *EATS PENDING") == "Uber Eats"


def test_import_chase_sample():
    parsed = importer.parse_csv((ROOT / "data/samples/sample_chase_checking.csv").read_bytes())
    d = parsed["detected"]
    assert d["date"] == "Posting Date" and d["description"] == "Description" and d["amount"] == "Amount"
    assert parsed["balance"] == 912.37
    assert d["rows"] > 100


def test_import_debit_credit_columns_and_masking():
    csv_text = b"Transaction Date,Description,Debit,Credit\n11/01/2026,ACME PAYROLL 123456789,,500.00\n11/02/2026,PUBLIX #1432,42.10,\n"
    parsed = importer.parse_csv(csv_text)
    amounts = [t["amount"] for t in parsed["transactions"]]
    assert amounts == [500.0, -42.1]
    assert "123456789" not in parsed["transactions"][0]["description"]


def test_import_headerless_file():
    csv_text = b'"11/01/2026","-12.50","*","","CHIPOTLE 2291"\n"11/02/2026","700.00","*","","DIRECT DEP EMPLOYER"\n'
    parsed = importer.parse_csv(csv_text)
    assert [t["description"] for t in parsed["transactions"]] == ["CHIPOTLE 2291", "DIRECT DEP EMPLOYER"]


def test_import_rejects_unreadable_file():
    with pytest.raises(importer.ImportError_):
        importer.parse_csv(b"hello\nworld\n")


# ---------------------------------------------------------------- router (code, not a model)
@pytest.mark.parametrize("msg,intent", [
    ("hi", "greeting"),
    ("Make me a plan for this week", "plan"),
    ("Can I afford a $60 dinner on Friday?", "afford"),
    ("could I buy a 45 dollars jacket", "afford"),
    ("Where did my money go this month?", "analyst"),
    ("can I afford it", "analyst"),  # no amount -> the Analyst asks or explains
])
def test_router(msg, intent):
    assert route(msg)[0] == intent


def test_router_reads_the_amount():
    assert route("Can I afford a $1,250.50 laptop?")[1]["amount"] == 1250.50


# ---------------------------------------------------------------- the MCP server, over the real protocol
def test_mcp_server_lists_and_runs_tools(tmp_path):
    from mcp import ClientSession, StdioServerParameters
    from mcp.client.stdio import stdio_client

    async def run():
        import os
        env = {**os.environ, "BUDGETWISE_TODAY": TODAY, "BUDGETWISE_WORKSPACE": str(tmp_path)}
        params = StdioServerParameters(command=sys.executable, args=[str(ROOT / "mcp_server.py")], env=env, cwd=str(ROOT))
        async with stdio_client(params) as (r, w), ClientSession(r, w) as session:
            await session.initialize()
            names = {t.name for t in (await session.list_tools()).tools}
            res = await session.call_tool("check_affordability", {"amount": 60})
            return names, json.loads(res.content[0].text)

    names, afford = asyncio.run(run())
    assert names == {"search_transactions", "get_spending_by_category", "check_affordability",
                     "get_income_details", "build_weekly_plan", "search_budget_knowledge"}
    assert afford["verdict"] == "tight"
