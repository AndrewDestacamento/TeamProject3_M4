"""BudgetWise unit tests: no model calls and no network. Run with:  python -m pytest

They cover the money engine (every number the app shows), the CSV importer, the
categorizer rules, the code router, and the MCP server over the real protocol.
The date is pinned so the demo personas always produce the same numbers.
"""

import asyncio
import json
import sys
from datetime import date, timedelta
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
def test_first_run_creates_blank_personal_workspace_and_examples_stay_opt_in():
    account_id = store.ensure_default_personal()
    assert not store.is_demo(account_id)
    assert store.active_account_id() == account_id
    assert store.load_transactions(account_id) == []
    assert finance.snapshot(account_id)["setup_needed"] is True

    store.set_active_account("demo-maya")
    assert store.ensure_default_personal() == "demo-maya"  # migration runs only once


def test_optional_onboarding_purpose_can_be_saved_without_money_details():
    account_id = store.ensure_default_personal()
    store.save_settings(account_id, {"onboarding_complete": True, "use_case": "Track everyday spending"})
    snapshot = finance.snapshot(account_id)
    assert snapshot["setup_needed"] is False
    assert snapshot["use_case"] == "Track everyday spending"


@pytest.mark.parametrize("acc", ["demo-maya", "demo-jordan", "demo-priya"])
def test_safe_to_spend_adds_up(acc):
    s = finance.snapshot(acc)
    expected = round(s["balance"] - s["bills_before_payday_total"] - s["held_back_for_next_cycle"] - s["savings_buffer"], 2)
    assert s["cash_surplus_after_living_costs"] == expected
    assert s["safe_per_day"] == round((s["safe_to_spend_total"] + s["spent_today"]) / s["safe_to_spend_window_days"], 2)
    assert s["left_today"] == round(s["safe_per_day"] - s["spent_today"], 2)


def test_maya_is_amber_and_payday_is_detected():
    s = finance.snapshot("demo-maya")
    assert s["status"] == "red"  # her 30-day forecast is negative at her usual spending pace
    assert s["goal"]["fits"] is False
    assert any("−$" in i["detail"] for i in s["insights"] if i["id"] == "low_balance")
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
    s = finance.snapshot("demo-priya")
    assert finance.can_afford("demo-priya", 5)["verdict"] == "yes"
    assert finance.can_afford("demo-maya", 30)["verdict"] == "no"
    big = finance.can_afford("demo-priya", s["safe_to_spend_total"] + 1)
    assert big["verdict"] == "no" and big["safe_to_spend_after"] < 0


def test_weekly_plan_math():
    p = finance.build_weekly_plan("demo-maya", 0, "dining", 20)
    assert p["daily_limit"] == round(p["weekly_spending_allowance"] / 7, 2)
    assert p["weekly_spending_allowance"] <= p["weekly_safe_to_spend"]
    assert p["weekly_spending_allowance"] <= round(finance.snapshot("demo-maya")["typical_daily_spending"] * 7, 2)
    assert p["focus_category_cap"] <= 55.0            # never looser than last week's $55 cap (M3 bug fix)


def test_weekly_plan_rejects_bad_input():
    assert "error" in finance.build_weekly_plan("demo-maya", -5, "dining", 20)
    assert "error" in finance.build_weekly_plan("demo-maya", 10, "rent", 20)
    assert "error" in finance.build_weekly_plan("demo-maya", 10, "dining", 90)


def test_saved_plan_is_checked_next_week(monkeypatch):
    plan = finance.build_weekly_plan("demo-maya", 0, "dining", 20)
    store.save_plan("demo-maya", plan)
    assert finance.check_last_plan("demo-maya") is None  # your own plan replaces the sample one, and isn't finished yet
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
    assert afford["verdict"] == "no"


# ---------------------------------------------------------------- the ledger: logging, balance, undo, CSV merge (M4)
def _new_account():
    acc = store.create_account("Test person")
    store.set_balance(acc, 410, batch_id="b-balance")
    return acc


def test_logged_spending_moves_the_balance_and_undo_restores_it():
    acc = _new_account()
    store.add_transactions(acc, [{"date": TODAY, "description": "Food", "amount": -20, "category": "dining", "approx": True}],
                           source="chat", batch_id="b1")
    assert store.current_balance(acc) == 390.0
    assert finance.snapshot(acc)["estimates"] == {"count": 1, "total": 20.0}
    store.undo_batch(acc, "b1")
    assert store.current_balance(acc) == 410.0


def test_told_pay_schedule_and_bills_drive_safe_to_spend():
    acc = _new_account()
    store.add_schedule(acc, "income", "Paycheck", "biweekly", amount=600, varies=True, next_date="2026-11-13")
    store.add_schedule(acc, "bill", "Rent", "monthly", amount=725, day_of_month=1, category="housing")
    store.add_schedule(acc, "bill", "Phone", "monthly", amount=45, day_of_month=12, category="utilities")
    s = finance.snapshot(acc)
    assert s["next_payday"] == "2026-11-13" and s["days_until_payday"] == 3
    assert [b["name"] for b in s["bills_before_payday"]] == ["Phone"]
    assert s["expected_next_paycheck"] == 510.0          # "it changes" -> plan with 85%
    assert s["safe_to_spend_total"] == round(410 - 45 - s["held_back_for_next_cycle"] - s["savings_buffer"], 2)


def test_nearby_payday_does_not_turn_rent_money_into_a_huge_weekly_plan():
    acc = store.create_account("Near payday")
    store.add_transactions(acc, [{"date": TODAY, "description": "Lunch", "amount": -10, "category": "dining"}],
                           source="chat", batch_id="spend")
    store.set_balance(acc, 1160, batch_id="balance")
    store.add_schedule(acc, "income", "Paycheck", "biweekly", amount=700, next_date="2026-11-11")
    store.add_schedule(acc, "bill", "Rent", "monthly", amount=1000, day_of_month=1, category="housing")
    store.save_settings(acc, {"bills_reviewed": True, "typical_weekly_spend": 280})

    snap = finance.snapshot(acc)
    plan = finance.build_weekly_plan(acc, 0, "dining", 20)

    assert snap["days_until_payday"] == 1
    assert snap["planning_horizon_days"] == 30
    assert snap["safe_per_day"] < 100
    assert snap["left_today"] < 100
    concert = finance.can_afford(acc, 300)
    assert concert["verdict"] == "tight"
    assert concert["over_today"] is True
    assert plan["daily_limit"] <= 40  # the $280 typical week caps the general plan
    assert plan["focus_category"] == "other"  # one lunch is not treated as a spending habit
    assert plan["focus_label"] == "Everyday spending"


def test_held_back_insight_never_claims_smaller_bills_exceed_larger_income():
    snap = finance.snapshot("demo-jordan")
    # Reproduce the wording bug: a reserve can still be needed for living costs even
    # when expected income is larger than the bills after payday.
    snap["next_cycle"] = {**snap["next_cycle"], "bills_total": 1000.0, "expected_income": 2100.0}
    held = next((item for item in finance.insights(
        snap, store.load_transactions("demo-jordan"), date.fromisoformat(TODAY)) if item["id"] == "held_back"), None)
    assert held is not None
    assert "more than" not in held["detail"]
    assert "$1,000.00" in held["detail"]


def test_ten_day_pay_window_also_reserves_living_costs_and_uses_fourteen_day_view():
    acc = store.create_account("Ten days to payday")
    store.set_balance(acc, 1160, batch_id="balance")
    store.add_schedule(acc, "income", "Paycheck", "biweekly", amount=700, next_date="2026-11-20")
    store.add_schedule(acc, "bill", "Rent", "monthly", amount=1000, day_of_month=1, category="housing")
    store.save_settings(acc, {"bills_reviewed": True, "typical_weekly_spend": 280})
    snap = finance.snapshot(acc)
    assert snap["days_until_payday"] == 10
    assert snap["safe_to_spend_window_days"] == 14
    assert snap["safe_per_day"] < 100


def test_weekly_plan_works_from_typical_week_without_any_purchase_history():
    acc = store.create_account("Estimate only")
    store.set_balance(acc, 1160, batch_id="balance")
    store.add_schedule(acc, "income", "Paycheck", "biweekly", amount=700, next_date="2026-11-11")
    store.add_schedule(acc, "bill", "Rent", "monthly", amount=1000, day_of_month=1, category="housing")
    store.save_settings(acc, {"bills_reviewed": True, "typical_weekly_spend": 280})
    plan = finance.build_weekly_plan(acc, 0, "dining", 20)
    assert "error" not in plan
    assert plan["focus_category"] == "other"
    assert plan["focus_label"] == "Everyday spending"
    assert plan["weekly_spending_allowance"] <= 280
    assert plan["daily_limit"] <= 40


def test_one_purchase_is_not_enough_to_claim_usual_spending_is_known():
    acc = _new_account()
    store.add_schedule(acc, "income", "Paycheck", "biweekly", amount=600, next_date="2026-11-13")
    store.save_settings(acc, {"bills_reviewed": True})
    store.add_transactions(acc, [{"date": TODAY, "description": "Coffee", "amount": -5, "category": "dining"}],
                           source="chat", batch_id="one")

    snap = finance.snapshot(acc)
    assert snap["readiness"]["spending_history_days"] == 1
    assert "spending" in snap["readiness"]["missing"]
    assert snap["typical_daily_spending"] == 0

    rows = [{"date": f"2026-11-{day:02d}", "description": "Daily purchase", "amount": -5, "category": "dining"}
            for day in range(4, 10)]
    store.add_transactions(acc, rows, source="chat", batch_id="week")
    snap = finance.snapshot(acc)
    assert snap["readiness"]["spending_history_days"] == 7
    assert "spending" not in snap["readiness"]["missing"]


def test_goal_cutting_insight_requires_a_real_pattern_not_one_purchase():
    acc = _new_account()
    store.save_settings(acc, {"goal": {"name": "Trip", "target": 500, "saved": 0, "saved_known": True,
                                              "deadline": "2026-12-31"}})
    store.add_transactions(acc, [{"date": TODAY, "description": "Lunch", "amount": -40,
                                  "category": "dining"}], source="chat", batch_id="one")
    assert not any(i["id"] == "goal_opportunity" for i in finance.snapshot(acc)["insights"])
    for days_ago in range(1, 7):
        day = (date.fromisoformat(TODAY) - timedelta(days=days_ago)).isoformat()
        store.add_transactions(acc, [{"date": day, "description": "Coffee", "amount": -10,
                                      "category": "dining"}], source="chat", batch_id=f"d{days_ago}")
    insight = next(i for i in finance.snapshot(acc)["insights"] if i["id"] == "goal_opportunity")
    assert "Dining & coffee" in insight["detail"] and "there" not in insight["detail"]


def test_goal_stays_at_starter_pace_when_pay_schedule_has_no_amount():
    acc = _new_account()
    store.add_schedule(acc, "income", "Paycheck", "biweekly", varies=True, next_date="2026-11-13")
    store.save_settings(acc, {"goal": {"name": "Trip", "target": 500, "saved": 0,
                                               "saved_known": True, "deadline": "2026-12-13"}})
    snap = finance.snapshot(acc)
    assert "income" in snap["readiness"]["missing"]
    assert snap["goal"]["plan_level"] == "starter"
    assert snap["goal"]["fits"] is None


def test_same_bill_name_updates_instead_of_duplicating():
    acc = _new_account()
    store.add_schedule(acc, "bill", "Rent", "monthly", amount=725, day_of_month=1)
    store.add_schedule(acc, "bill", "rent", "monthly", amount=750, day_of_month=1)
    assert [(b["name"], b["amount"]) for b in store.schedules(acc, "bill")] == [("rent", 750.0)]


def test_csv_import_merges_skips_duplicates_and_replaces_estimates():
    acc = _new_account()
    store.add_transactions(acc, [{"date": "2026-11-09", "description": "Food", "amount": -20, "category": "dining", "approx": True}],
                           source="chat", batch_id="b1")
    rows = [{"date": "2026-11-09", "description": "CHIPOTLE 2291", "amount": -18.43, "category": "dining"},
            {"date": "2026-11-08", "description": "PUBLIX #1432", "amount": -42.10, "category": "groceries"}]
    first = store.import_rows(acc, rows, balance=500.0, balance_as_of=TODAY)
    assert first == {"added": 2, "duplicates_skipped": 0, "estimates_replaced": 1, "first_date": "2026-11-08", "last_date": "2026-11-09"}
    again = store.import_rows(acc, rows, balance=500.0, balance_as_of=TODAY)
    assert again["added"] == 0 and again["duplicates_skipped"] == 2
    txns = store.load_transactions(acc)
    assert [t["description"] for t in txns] == ["CHIPOTLE 2291", "PUBLIX #1432"]   # the $20 estimate is gone
    assert store.current_balance(acc) == 500.0


def test_router_sends_statements_to_the_bookkeeper():
    for msg in ["I spent about $20 on food", "I made $300 this week", "rent is $725 on the 1st",
                "I want to save $300 by December 10",
                "I get paid every 2 weeks but it changes", "that was groceries actually", "undo that"]:
        assert route(msg)[0] == "log", msg
    for msg in ["How much did I spend on food?", "Where did my money go this month?"]:
        assert route(msg)[0] == "analyst", msg


def _tool(tool, ctx, args: dict) -> str:
    from agents.tool_context import ToolContext
    tc = ToolContext(context=ctx, tool_name=tool.name, tool_call_id="t", tool_arguments=json.dumps(args))
    return asyncio.run(tool.on_invoke_tool(tc, json.dumps(args)))


def test_bookkeeper_tools_spread_validate_and_fix():
    from datetime import date
    from budgetwise import bookkeeper as bk
    acc = _new_account()
    ctx = bk.BookContext(acc, "b-chat-1", date(2026, 11, 10))
    out = _tool(bk.log_spending, ctx, {"items": [{"amount": 40, "what": "gas", "spread_over_days": 2, "approximate": True}]})
    assert "Saved 2" in out
    rows = store.batch_summary(acc, "b-chat-1")["transactions"]
    assert sorted(t["date"] for t in rows) == ["2026-11-09", "2026-11-10"] and all(t["amount"] == -20.0 for t in rows)
    assert all(t["category"] == "transport" for t in rows)
    assert "future" in _tool(bk.log_spending, ctx, {"items": [{"amount": 5, "what": "coffee", "date": "2026-11-20"}]})
    assert "Not saved" in _tool(bk.set_bill, ctx, {"name": "Rent", "amount": 725, "every": "monthly"})  # no due day -> ask
    ctx2 = bk.BookContext(acc, "b-chat-2", date(2026, 11, 10))
    assert "Updated 2" in _tool(bk.fix_last_entry, ctx2, {"category": "groceries"})
    assert {t["category"] for t in store.batch_summary(acc, "b-chat-1")["transactions"]} == {"groceries"}


def test_bookkeeper_agent_can_only_stage_spending_until_user_selects_payment_source():
    from budgetwise import bookkeeper as bk
    acc = _new_account()
    ctx = bk.BookContext(acc, "stage-only", date(2026, 11, 10))
    exposed = {tool.name for tool in bk.TOOLS}
    assert bk.prepare_spending.name in exposed
    assert bk.log_spending.name not in exposed
    result = _tool(bk.prepare_spending, ctx, {"items": [{"amount": 30, "what": "Target"}]})
    assert "no transaction was saved yet" in result
    assert store.load_transactions(acc) == []
    pending = store.load_settings(acc)["pending_money_event"]
    assert pending["kind"] == "payment_source"
    assert pending["items"][0]["amount"] == 30


def test_goal_starts_with_verified_pace_and_one_next_question():
    from datetime import date
    from budgetwise import bookkeeper as bk
    acc = _new_account()
    ctx = bk.BookContext(acc, "b-goal", date(2026, 11, 10))
    assert "Saved goal" in _tool(bk.set_savings_goal, ctx, {"name": "Trip", "target": 300, "deadline": "2026-12-10"})
    goal = finance.snapshot(acc)["goal"]
    assert goal["needed_per_day"] == 10.0
    assert goal["needed_per_week"] == 70.0
    assert goal["plan_level"] == "starter"
    assert goal["fits"] is None
    assert goal["missing"][0] == "saved_so_far"
    assert "already saved" in goal["next_question"]
    assert "$70.00 a week" in finance.goal_coach_text(finance.snapshot(acc))
    ctx2 = bk.BookContext(acc, "b-goal-2", date(2026, 11, 10))
    assert "Updated goal" in _tool(bk.update_savings_goal, ctx2, {"name": "Orlando trip"})
    renamed = finance.snapshot(acc)["goal"]
    assert renamed["name"] == "Orlando trip"
    assert renamed["target"] == 300.0 and renamed["deadline"] == "2026-12-10"
    empty = store.create_account("No balance yet")
    assert finance.compact_snapshot(finance.snapshot(empty))["balance_known"] is False


def test_todays_spending_is_counted_once():
    # The balance already has today's spending taken out, so the daily amount starts from the
    # START of today (safe + spent today). Fixed after testing with Maya's demo.
    s = finance.snapshot("demo-maya")
    start_of_day = s["safe_to_spend_total"] + s["spent_today"]
    assert s["safe_per_day"] == round(start_of_day / s["safe_to_spend_window_days"], 2)
    assert s["left_today"] == round(s["safe_per_day"] - s["spent_today"], 2)
    store.add_transactions("demo-maya", [{"date": TODAY, "description": "Groceries and gas", "amount": -40,
                                          "category": "groceries"}], source="chat", batch_id="b40")
    after = finance.snapshot("demo-maya")
    assert after["safe_per_day"] == s["safe_per_day"]                 # logging $40 doesn't shrink today's budget
    assert after["left_today"] == round(s["left_today"] - 40, 2)      # it only comes out of what's left today
    assert after["per_day_after_today"] == round(after["safe_to_spend_total"] / (s["safe_to_spend_window_days"] - 1), 2)
