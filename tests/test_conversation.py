"""Regression tests for the first-use journey; no model or real user data."""
import asyncio
import json
from datetime import date

import pytest
from budgetwise import conversation, devlog, finance, store


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


def test_goal_name_named_date_and_saved_confirmation_are_natural():
    account = store.ensure_default_personal()
    answer, saved = say(account, "I want to save $500 by december 13 for an orlando trip")
    assert saved["goal"]["name"] == "Orlando trip"
    assert saved["goal"]["deadline"] == "2026-12-13"
    assert "Orlando trip" in answer
    answer, _ = say(account, "Nothing yet")
    assert "Set aside for this goal: **$0.00**" in answer
    assert "Goal saved" not in answer


def test_deferred_bill_clarification_is_not_immediately_repeated():
    account = store.ensure_default_personal()
    store.set_balance(account, 500)
    store.add_schedule(account, "income", "Paycheck", "biweekly", amount=600, next_date="2026-11-13")
    store.save_settings(account, {"conversation_started": True, "typical_weekly_spend": 100,
                                  "pending_clarification": "What are the amount and due date?",
                                  "pending_clarification_key": "bills"})
    assert conversation.state(account)["question_key"] == "clarification"
    say(account, "Skip for now")
    state = conversation.state(account)
    assert state["question_key"] is None
    assert state["statuses"]["bills"] == "deferred"


def test_natural_defer_language_marks_bill_topic_without_model_call():
    account = store.ensure_default_personal()
    store.set_balance(account, 500)
    store.add_schedule(account, "income", "Paycheck", "biweekly", amount=600, next_date="2026-11-13")
    store.save_settings(account, {"conversation_started": True, "typical_weekly_spend": 100})
    assert conversation.state(account)["question_key"] == "bills"
    answer, _ = say(account, "my bills vary i will let you know when it happens")
    assert "won’t ask for bill details again" in answer
    assert conversation.state(account)["question_key"] is None


def test_pay_statement_with_frequency_is_left_for_bookkeeper_to_save():
    account = store.ensure_default_personal()
    say(account, "I want to save $200 this week")
    say(account, "Nothing yet")
    say(account, "I have $500")
    assert conversation.state(account)["question_key"] == "payday"
    message = "I get paid every two weeks but the amount changes so I will let you know"
    assert asyncio.run(conversation.quick_reply(message, account)) is None


def test_opt_in_development_log_is_structured_local_and_redacted(monkeypatch):
    monkeypatch.setenv("BUDGETWISE_DEV_LOG_CONVERSATIONS", "1")
    account = store.ensure_default_personal()
    before = conversation.state(account)
    readiness = finance.snapshot(account)["readiness"]
    devlog.log_turn(account=account, session_id="test-session", message="card 4111111111111111 balance $100",
                    answer="Saved $100", handler="quick", intent="guided", elapsed=0.012,
                    before=before, after=before, readiness_before=readiness, readiness_after=readiness)
    rows = [json.loads(line) for line in devlog.path().read_text(encoding="utf-8").splitlines()]
    assert rows[0]["session_id"] == "test-session"
    assert rows[0]["handler"] == "quick"
    assert "4111111111111111" not in rows[0]["message"]
    assert rows[0]["account"] != account
