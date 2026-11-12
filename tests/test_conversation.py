"""Regression tests for the first-use journey; no model or real user data."""
import asyncio
from datetime import date

import pytest
from budgetwise import conversation, finance, store


@pytest.fixture(autouse=True)
def isolated(tmp_path, monkeypatch):
    monkeypatch.setenv("BUDGETWISE_TODAY", "2026-11-11")
    monkeypatch.setattr(store, "WORKSPACE", tmp_path)
    monkeypatch.setattr(store, "ACCOUNTS_DIR", tmp_path / "accounts")


def say(account, text):
    result = asyncio.run(conversation.quick_reply(text, account))
    assert result is not None, text
    answer, saved = result
    conversation.remember(account, text, answer, saved)
    return answer, saved


def test_goal_balance_and_zero_savings_are_distinct_and_persistent():
    account = store.ensure_default_personal()
    assert conversation.state(account)["question"] is None
    answer, saved = say(account, "I want to save $200 this week")
    assert saved["goal"]["target"] == 200
    snap = finance.snapshot(account)
    assert snap["goal"]["deadline"] == "2026-11-15"
    assert snap["goal"]["pace_unit"] == "day"
    assert snap["goal"]["pace_amount"] == 50
    assert not snap["goal"]["saved_known"]
    say(account, "I have $500 in my account currently")
    assert conversation.state(account)["question_key"] == "saved"
    assert finance.snapshot(account)["balance"] == 500
    assert finance.snapshot(account)["goal"]["saved"] == 0
    answer, _ = say(account, "Nothing yet")
    assert "$0.00" in answer
    assert finance.snapshot(account)["goal"]["saved_known"]
    assert conversation.state(account)["question_key"] == "payday"
    say(account, "Friday")
    assert finance.snapshot(account)["next_payday"] == "2026-11-13"
    assert conversation.state(account)["question_key"] == "income"
    assert len(conversation.state(account)["history"]) == 8
    other = store.create_account("Other tester")
    assert conversation.state(other)["history"] == []
    assert finance.snapshot(other)["goal"] is None


def test_unknown_data_never_supports_affordability_or_spending_plan():
    account = store.ensure_default_personal()
    say(account, "I have $500 in my account")
    assert finance.can_afford(account, 100)["verdict"] == "unknown"
    assert "error" in finance.build_weekly_plan(account, 20, "dining")
    facts = finance.compact_snapshot(finance.snapshot(account))
    assert facts["next_payday"] is None
    assert "safe_per_day" not in facts
    assert "forecast_lowest_balance" not in facts
    assert not finance.snapshot(account)["insights"]


def test_skipping_does_not_invent_facts_and_does_not_repeat_question():
    account = store.ensure_default_personal()
    say(account, "I want to save 500 dollars in two months for Orlando trip")
    say(account, "Skip for now")
    assert conversation.state(account)["question_key"] == "balance"
    assert not finance.snapshot(account)["goal"]["saved_known"]
    assert "saved" in conversation.state(account)["skipped"]
    say(account, "Skip for now")
    say(account, "My pay varies")
    assert conversation.state(account)["question_key"] == "income"
    assert not finance.snapshot(account)["readiness"]["payday_known"]


def test_expense_with_relative_date_is_saved_once_and_undoable():
    account = store.ensure_default_personal()
    say(account, "I have $500")
    _, saved = say(account, "Yesterday I spent about $40 on gas and groceries")
    rows = store.load_transactions(account)
    assert len(rows) == 1 and rows[0]["amount"] == -40
    assert str(rows[0]["date"]) == "2026-11-10"
    assert rows[0]["approx"]
    assert finance.snapshot(account)["balance"] == 460
    store.undo_batch(account, saved["batch_id"])
    assert finance.snapshot(account)["balance"] == 500


def test_fast_path_does_not_guess_ambiguous_or_multiple_statements():
    account = store.ensure_default_personal()
    for text in ("I have $500 but $100 is my roommate's", "I want to save $500 in two months and spent $20 today", "I spent $40 on gas and $20 on food"):
        assert asyncio.run(conversation.quick_reply(text, account)) is None
    assert not store.load_transactions(account)
    assert not finance.snapshot(account)["balance_info"]["as_of"]


def test_readiness_requires_bill_review_not_only_one_saved_bill():
    account = store.ensure_default_personal()
    say(account, "I have $500")
    store.add_schedule(account, "income", "Paycheck", "biweekly", amount=600, next_date="2026-11-13")
    store.add_schedule(account, "bill", "Phone", "monthly", amount=30, day_of_month=12)
    store.save_settings(account, {"typical_weekly_spend": 100})
    assert finance.snapshot(account)["readiness"]["missing"] == ["bills"]
    say(account, "That's all my bills")
    assert finance.snapshot(account)["readiness"]["ready"]


def test_calendar_months_and_week_pace_are_calculated_in_python():
    assert conversation.relative_date("in one month", date(2026, 1, 31)) == date(2026, 2, 28)
    account = store.ensure_default_personal()
    say(account, "I want to save $500 in four weeks")
    g = finance.snapshot(account)["goal"]
    assert g["pace_unit"] == "week" and g["pace_amount"] == 125


def test_help_and_privacy_never_create_money_records():
    account = store.ensure_default_personal()
    assert "model provider" in say(account, "Privacy")[0]
    assert "CSV" in say(account, "What can you do?")[0]
    assert not store.load_transactions(account)
    assert finance.snapshot(account)["goal"] is None
