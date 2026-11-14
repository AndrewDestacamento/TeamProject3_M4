"""Regression tests for the first-use journey; no model or real user data."""
import asyncio
import json
from datetime import date

import pytest
from budgetwise import conversation, devlog, finance, store
from budgetwise.agents import _no_write_text, _partial_afford_text, _saved_text


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


def guided_say(account, text):
    """Exercise the same bounded-guidance completion step used by /api/chat."""
    before = conversation.state(account)
    answer, saved = say(account, text)
    transition = conversation.complete_guided_turn(account, before, bool(saved))
    return answer, saved, transition


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


def test_welcome_is_once_per_personal_workspace_and_never_shown_for_demo():
    account = store.ensure_default_personal()
    assert conversation.state(account)["welcome_seen"] is False
    store.save_settings(account, {"welcome_seen": True})
    assert conversation.state(account)["welcome_seen"] is True

    assert conversation.state("demo-maya")["welcome_seen"] is True


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
    assert conversation.state(account)["question_key"] is None
    assert not finance.snapshot(account)["goal"]["saved_known"]
    assert "saved" in conversation.state(account)["skipped"]
    assert not finance.snapshot(account)["readiness"]["payday_known"]


def test_expense_with_relative_date_is_saved_once_and_undoable():
    account = store.ensure_default_personal()
    say(account, "I have $500")
    answer, saved = say(account, "Yesterday I spent about $40 on gas and groceries")
    assert saved is None and "purchase details" in answer
    assert conversation.state(account)["question"] == "How did you pay for that?"
    answer, saved = say(account, "Paid from available money")
    rows = store.load_transactions(account)
    assert len(rows) == 1 and rows[0]["amount"] == -40
    assert str(rows[0]["date"]) == "2026-11-10"
    assert rows[0]["approx"]
    # A balance confirmed today already includes a purchase from yesterday.
    assert finance.snapshot(account)["balance"] == 500
    assert "before your latest balance check" in answer
    store.undo_batch(account, saved["batch_id"])
    assert finance.snapshot(account)["balance"] == 500


def test_fast_path_does_not_guess_ambiguous_or_multiple_statements():
    account = store.ensure_default_personal()
    for text in ("I have $500 but $100 is my roommate's", "I want to save $500 in two months and spent $20 today"):
        assert asyncio.run(conversation.quick_reply(text, account)) is None
    assert not store.load_transactions(account)
    assert not finance.snapshot(account)["balance_info"]["as_of"]


@pytest.mark.parametrize("text,names", [
    ("I spent $25 on lunch and $40 on gas", {"Lunch", "Gas"}),
    ("I spent 60 at Target and 15 on Chipotle", {"Target", "Chipotle"}),
])
def test_multiple_purchases_are_all_saved_and_confirmed(text, names):
    account = store.ensure_default_personal()
    store.save_settings(account, {"default_payment_method": "available_money"})
    answer, saved = say(account, text)
    assert saved["count"] == 2
    assert {t["description"] for t in saved["transactions"]} == names
    assert all(name in answer for name in names)


def test_payment_source_controls_available_money_and_is_remembered():
    account = store.ensure_default_personal()
    say(account, "I have $500")
    assert "purchase details" in say(account, "I just spent $20 on lunch")[0]
    assert conversation.state(account)["question"] == "How did you pay for that?"
    answer, saved = say(account, "Put it on a credit card")
    assert saved["transactions"][0]["payment_method"] == "credit_card"
    assert finance.snapshot(account)["balance"] == 500
    assert "not changed" in answer
    _, saved = say(account, "I spent $10 on coffee today")
    assert saved["transactions"][0]["payment_method"] == "credit_card"
    assert finance.snapshot(account)["balance"] == 500


@pytest.mark.parametrize("reply,method,expected_balance", [
    ("Checking account", "available_money", 475),
    ("My debit card", "available_money", 475),
    ("Credit card", "credit_card", 500),
    ("I paid cash", "cash_other", 500),
])
def test_payment_source_accepts_natural_short_answers(reply, method, expected_balance):
    account = store.ensure_default_personal()
    say(account, "I have $500")
    say(account, "I spent $25 on lunch today")
    answer, saved = say(account, reply)
    assert saved is not None
    assert saved["transactions"][0]["payment_method"] == method
    assert finance.snapshot(account)["balance"] == expected_balance
    assert conversation.state(account)["question_key"] != "payment_source"


def test_short_weekly_amount_is_saved_even_after_guided_setup_pauses():
    account = store.ensure_default_personal()
    store.save_settings(account, {"conversation_started": True, "conversation_guidance_paused": True})
    answer, saved = say(account, "about $280 a week")
    assert saved is not None
    assert store.load_settings(account)["typical_weekly_spend"] == 280
    assert "280.00" in answer


def test_agent_confirmation_names_every_purchase_in_one_message():
    account = store.ensure_default_personal()
    store.save_settings(account, {"default_payment_method": "available_money"})
    _, saved = say(account, "I spent $25 on lunch and $40 on gas")
    confirmation = _saved_text(saved)
    assert "$25.00 for Lunch" in confirmation
    assert "$40.00 for Gas" in confirmation


def test_model_cannot_claim_a_purchase_was_saved_without_a_database_write():
    false_claim = "Got it—your $30 Target purchase came straight out of your debit card."
    answer = _no_write_text(false_claim)
    assert "didn’t save anything" in answer
    assert "came straight out" not in answer


@pytest.mark.parametrize("message,expected", [
    ("spent 25 on lunch and 40 on gas today", [(25, "Lunch"), (40, "Gas")]),
    ("spent $30 at target", [(30, "Target")]),
    ("I spent 30 dollars at target", [(30, "Target")]),
    ("bought coffee for 6", [(6, "Coffee")]),
    ("spent 30 at target", [(30, "Target")]),
])
def test_common_purchase_phrasings_share_one_pending_payment_flow(message, expected):
    account = store.ensure_default_personal()
    say(account, "I have $500")
    answer, saved = say(account, message)
    assert saved is None
    assert "purchase details" in answer
    assert conversation.state(account)["question_key"] == "payment_source"
    assert store.load_transactions(account) == []

    answer, saved = say(account, "with my debit card")
    assert saved is not None
    actual = [(abs(t["amount"]), t["description"]) for t in saved["transactions"]]
    assert sorted(actual) == sorted(expected)
    assert all(description in answer for _, description in expected)
    assert conversation.state(account)["question_key"] != "payment_source"


def test_received_money_requires_deposit_confirmation():
    account = store.ensure_default_personal()
    say(account, "I have $100")
    answer, saved = say(account, "I recieved 40 dollars for my birthday today")
    assert saved is None and "income details" in answer
    assert "available balance" in conversation.state(account)["question"]
    answer, saved = say(account, "Yes, add it to available money")
    assert saved["transactions"][0]["amount"] == 40
    assert finance.snapshot(account)["balance"] == 140


def test_ambiguous_past_bill_asks_paid_or_due_without_double_counting():
    account = store.ensure_default_personal()
    say(account, "I have $179")
    answer, saved = say(account, "I had a cellphone bill of 30 dollars 3 days ago")
    assert saved is None and "bill details" in answer
    assert "paid, or is it still due" in conversation.state(account)["question"]
    answer, saved = say(account, "Paid from available money")
    assert saved["transactions"][0]["amount"] == -30
    assert finance.snapshot(account)["balance"] == 179
    assert "before your latest balance check" in answer


def test_unsaved_model_claim_is_replaced():
    answer = conversation.safe_unsaved_answer("Got it—recorded $40 birthday money.")
    assert "didn’t change your records" in answer


def test_weekly_balance_and_goal_checkins_are_purposeful_and_cumulative():
    account = store.ensure_default_personal()
    store.set_balance(account, 500, as_of="2026-11-01")
    store.save_settings(account, {"conversation_started": True, "conversation_guidance_paused": True})
    state = conversation.state(account)
    assert state["question_key"] == "balance_check"
    say(account, "Yes, that's close")
    assert store.balance_note(account)["as_of"] == "2026-11-11"

    say(account, "I want to save $300 in two months")
    settings = store.load_settings(account)
    goal = dict(settings["goal"])
    goal["saved"], goal["saved_known"] = 100, True
    goal["last_checkin"] = "2026-11-01"
    store.save_settings(account, {"goal": goal, "conversation_guidance_paused": True})
    assert conversation.state(account)["question_key"] == "goal_checkin"
    say(account, "I saved 25 dollars")
    assert finance.snapshot(account)["goal"]["saved"] == 125


def test_partial_affordability_uses_known_balance_without_claiming_safety():
    account = store.ensure_default_personal()
    say(account, "I have $100")
    result = finance.can_afford(account, 30, what="dinner")
    assert result["verdict"] == "unknown"
    assert result["balance"] == 100
    assert result["remaining_balance"] == 70
    answer = _partial_afford_text(result)
    assert "$30.00 would leave $70.00" in answer
    assert "payday, income, bills, spending" not in answer


def test_confirmations_repeat_schedule_details_and_only_mention_goals_when_present():
    from budgetwise import bookkeeper as bk
    from agents.tool_context import ToolContext

    account = store.ensure_default_personal()
    ctx = bk.BookContext(account, "details", date(2026, 11, 11))
    bill_call = ToolContext(context=ctx, tool_name=bk.set_bill.name, tool_call_id="bill",
                            tool_arguments=json.dumps({"name": "Rent", "amount": 1000, "every": "monthly", "day_of_month": 1}))
    asyncio.run(bk.set_bill.on_invoke_tool(bill_call, bill_call.tool_arguments))
    answer = conversation.confirmation(store.batch_summary(account, "details"))
    assert "Rent" in answer and "$1,000.00 monthly on the 1st" in answer

    balance_ctx = bk.BookContext(account, "balance-only", date(2026, 11, 11))
    balance_call = ToolContext(context=balance_ctx, tool_name=bk.set_balance.name, tool_call_id="balance",
                               tool_arguments=json.dumps({"amount": 100}))
    asyncio.run(bk.set_balance.on_invoke_tool(balance_call, balance_call.tool_arguments))
    answer = conversation.confirmation(store.batch_summary(account, "balance-only"))
    assert "set aside for your goal" not in answer


def test_saved_pay_frequency_is_not_asked_for_again():
    account = store.ensure_default_personal()
    store.set_balance(account, 500)
    store.add_schedule(account, "income", "Paycheck", "biweekly", next_date="2026-11-13", varies=True)
    store.save_settings(account, {"conversation_started": True})
    state = conversation.state(account)
    assert state["question_key"] == "income"
    assert state["question"] == "About how much is a typical paycheck? A range is fine."


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


def test_starter_plan_is_immediate_and_honest_with_minimal_information():
    account = store.ensure_default_personal()
    say(account, "I want to save $500 in four weeks for a trip")
    answer, saved = say(account, "Give me a starter plan")
    assert saved is None
    assert "$125.00 per week" in answer
    assert "not a safe-to-spend amount" in answer
    assert "income" in answer and "bills" in answer


def test_goal_name_named_date_and_saved_confirmation_are_natural():
    account = store.ensure_default_personal()
    answer, saved = say(account, "I want to save $500 by december 13 for an orlando trip")
    assert saved["goal"]["name"] == "Orlando trip"
    assert saved["goal"]["deadline"] == "2026-12-13"
    assert "Orlando trip" in answer
    answer, _ = say(account, "Nothing yet")
    assert "Set aside for this goal: **$0.00**" in answer
    assert "Goal saved" not in answer


def test_split_goal_answer_with_month_never_needs_a_model_call():
    account = store.ensure_default_personal()
    answer, saved = say(account, "Save for something")
    assert saved is None and "how much" in answer
    assert store.load_settings(account)["conversation_pending_intent"] == "goal"
    answer, saved = say(account, "300 dollars by December")
    assert saved["goal"]["target"] == 300
    assert saved["goal"]["deadline"] == "2026-12-31"
    assert "end of December" in answer
    assert store.load_settings(account).get("conversation_pending_intent") is None


def test_split_goal_only_asks_for_the_one_missing_detail():
    account = store.ensure_default_personal()
    say(account, "Save for something")
    answer, saved = say(account, "$300")
    assert saved is None
    assert "When would you like" in answer
    answer, saved = say(account, "300 for a trip by December")
    assert saved["goal"]["name"] == "Trip"


def test_complete_goal_with_month_uses_same_fast_month_end_rule():
    account = store.ensure_default_personal()
    answer, saved = say(account, "I want to save $500 by December")
    assert saved["goal"]["deadline"] == "2026-12-31"
    assert "end of December" in answer


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
    assert "without asking again" in answer
    assert conversation.state(account)["question_key"] is None


@pytest.mark.parametrize("reply", [
    "I will let you know my bills",
    "I meant I will let you know my bills later on or as I get them",
    "I'll add them as they come up",
    "I’ll add bills as they come up",
])
def test_bill_deferral_is_understood_in_different_word_orders(reply):
    account = store.ensure_default_personal()
    store.set_balance(account, 500)
    store.add_schedule(account, "income", "Paycheck", "biweekly", amount=600, next_date="2026-11-13")
    store.save_settings(account, {"conversation_started": True, "typical_weekly_spend": 100})
    state = conversation.state(account)
    assert state["question_key"] == "bills"
    assert state["choices"] == ["I’ll add bills as they come up", "I don’t have regular bills"]
    answer, _ = say(account, reply)
    assert "without asking again" in answer
    state = conversation.state(account)
    assert state["question_key"] is None
    assert state["statuses"]["bills"] == "deferred"


def test_no_regular_bills_is_clear_and_completes_bill_review():
    account = store.ensure_default_personal()
    store.set_balance(account, 500)
    store.add_schedule(account, "income", "Paycheck", "biweekly", amount=600, next_date="2026-11-13")
    store.save_settings(account, {"conversation_started": True, "typical_weekly_spend": 100})
    answer, _ = say(account, "I don't have regular bills")
    assert "won’t plan for regular bills" in answer
    assert store.load_settings(account)["bills_reviewed"]
    assert "bills" not in finance.snapshot(account)["readiness"]["missing"]


def test_pay_statement_with_frequency_is_left_for_bookkeeper_to_save():
    account = store.ensure_default_personal()
    say(account, "I want to save $200 this week")
    say(account, "Nothing yet")
    say(account, "I have $500")
    assert conversation.state(account)["question_key"] == "payday"
    message = "I get paid every two weeks but the amount changes so I will let you know"
    assert asyncio.run(conversation.quick_reply(message, account)) is None


def test_guided_setup_stops_after_three_purposeful_answers():
    account = store.ensure_default_personal()
    guided_say(account, "I want to save $500 in two months for a trip")
    guided_say(account, "Nothing yet")
    guided_say(account, "I have $100 in my account")
    _, _, transition = guided_say(account, "Friday")
    assert transition == conversation.TRANSITION
    assert conversation.state(account)["question_key"] is None
    settings = store.load_settings(account)
    assert settings["conversation_question_streak"] == 3
    assert settings["conversation_guidance_paused"]
    assert conversation.state(account)["guidance_complete"] is True
    assert "more useful" in transition


@pytest.mark.parametrize("reply", ["I'm not sure", "not right now", "maybe later", "I prefer not to share"])
def test_uncertainty_gracefully_ends_setup_instead_of_switching_topics(reply):
    account = store.ensure_default_personal()
    say(account, "I want to save $500 in two months for a trip")
    answer, _ = say(account, reply)
    assert "add it later" in answer.lower() or "enough setup" in answer.lower()
    state = conversation.state(account)
    assert state["question_key"] is None
    assert state["statuses"]["saved"] == "unknown"


def test_ignored_question_is_not_repeated_and_setup_can_be_resumed():
    account = store.ensure_default_personal()
    say(account, "I want to save $500 in two months for a trip")
    before = conversation.state(account)
    answer, saved = say(account, "Hello")
    transition = conversation.complete_guided_turn(account, before, bool(saved))
    assert "spending" in answer
    assert transition == conversation.TRANSITION
    assert conversation.state(account)["question_key"] is None
    say(account, "continue setup")
    assert conversation.state(account)["question_key"] == "saved"


def test_only_one_clarification_is_allowed_for_each_topic():
    account = store.ensure_default_personal()
    say(account, "I want to save $500 in two months for a trip")
    assert conversation.set_clarification(account, "saved") == conversation.CLARIFICATIONS["saved"]
    assert conversation.state(account)["question_key"] == "clarification"
    assert conversation.set_clarification(account, "saved") is None
    assert conversation.state(account)["question_key"] is None


def test_opt_in_development_log_is_structured_local_and_redacted(monkeypatch):
    monkeypatch.setenv("BUDGETWISE_DEV_LOG_CONVERSATIONS", "1")
    account = store.ensure_default_personal()
    before = conversation.state(account)
    readiness = finance.snapshot(account)["readiness"]
    devlog.log_turn(account=account, session_id="test-session", message="card 4111111111111111 balance $100",
                    answer="Saved $100", handler="quick", intent="guided", elapsed=0.012,
                    before=before, after=before, readiness_before=readiness, readiness_after=readiness,
                    error_reason="Model timeout")
    rows = [json.loads(line) for line in devlog.path().read_text(encoding="utf-8").splitlines()]
    assert rows[0]["session_id"] == "test-session"
    assert rows[0]["handler"] == "quick"
    assert "4111111111111111" not in rows[0]["message"]
    assert rows[0]["account"] != account
    assert rows[0]["error_reason"] == "Model timeout"


def test_development_log_archive_moves_all_turns_and_starts_clean(monkeypatch):
    monkeypatch.setenv("BUDGETWISE_DEV_LOG_CONVERSATIONS", "1")
    account = store.ensure_default_personal()
    before = conversation.state(account)
    readiness = finance.snapshot(account)["readiness"]
    for session in ("first", "second"):
        devlog.log_turn(account=account, session_id=session, message="test", answer="ok", handler="quick",
                        intent="guided", elapsed=0.01, before=before, after=before,
                        readiness_before=readiness, readiness_after=readiness)
    active = devlog.path()
    archived = devlog.archive_current()
    assert archived and archived["turns"] == 2
    assert not active.exists()
    target = store.ROOT / archived["path"]
    assert target.exists() and len(target.read_text(encoding="utf-8").splitlines()) == 2

    devlog.log_turn(account=account, session_id="third", message="new", answer="ok", handler="quick",
                    intent="guided", elapsed=0.01, before=before, after=before,
                    readiness_before=readiness, readiness_after=readiness)
    assert active.exists() and len(active.read_text(encoding="utf-8").splitlines()) == 1
