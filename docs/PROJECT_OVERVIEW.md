# BudgetWise M4 project overview

This is the short handoff for teammates. Use the root [README](../README.md) for setup commands and
[ARCHITECTURE.md](ARCHITECTURE.md) for the current system diagram.

## Purpose

BudgetWise helps people with irregular income work toward a savings goal without requiring a complete
traditional budget first. A user can share only what they are comfortable sharing and add information over
time.

Users can:

- create a savings goal and see the amount needed per day or week;
- type spending, income, bills, pay schedules, and balance updates in normal language;
- import a bank CSV for a more complete transaction history;
- see organized activity, spending patterns, upcoming bills, and safe-to-spend guidance;
- generate a practical seven-day plan and track progress;
- correct or undo information they previously entered.

A goal is encouraged but optional. Without one, BudgetWise can still organize activity and explain spending
patterns. Every question in the setup conversation can be skipped.

## Why this is more than a normal chatbot

A normal chat loses structure and can invent arithmetic. BudgetWise maintains a persistent, correctable
SQLite workspace containing goals, transactions, bills, pay schedules, balances, and accepted plans.
Language models interpret natural language and write explanations, but deterministic Python code calculates
every dollar amount. Grounding checks prevent unverified financial numbers from being shown.

## What changed from M3

| M3                                                   | M4 prototype                                                                |
| ---------------------------------------------------- | --------------------------------------------------------------------------- |
| Command-line demonstration using fixed sample data   | React and FastAPI application usable with personal or isolated example data |
| Analyst and Planner agents                           | Analyst, Planner, Critic, Bookkeeper, and Categorizer agents                |
| JSON-style memory and one sample CSV                 | SQLite ledger, natural-language updates, Undo, and broad CSV import support |
| Slow model-led handoffs and routing                  | Deterministic router and quick replies for common inputs                    |
| Plans were generated but not reviewed in the product | Critic scores plans; the user chooses whether to start one                  |
| Limited protection around generated numbers          | Python money engine plus output grounding for every displayed amount        |
| No polished first-use journey                        | Optional two-screen introduction and bounded conversational setup           |
| No practical development conversation review         | Opt-in structured logs, review script, and timestamped local archives       |

## Agent responsibilities

- **Bookkeeper:** saves natural-language spending, income, bills, pay, balances, and goals.
- **Analyst:** answers questions using saved data and read-only tools.
- **Planner:** selects a weekly strategy; Python calculates the authoritative limits.
- **Critic:** reviews a plan for grounding, realism, and clear actions.
- **Categorizer:** labels unfamiliar merchant names during CSV import.

See [ARCHITECTURE.md](ARCHITECTURE.md) for tool access and the request flow.

## Development testing and conversation logs

The automated regression suite makes no live model calls:

```powershell
.\venv\Scripts\python.exe -m pytest
```

Conversation logging is **off by default** because test messages can contain financial information. To enable
it for development or a consented user test, add this line to the local `.env` and restart the server:

```ini
BUDGETWISE_DEV_LOG_CONVERSATIONS=1
```

Logs are written to `data/workspace/dev_conversations.jsonl`. This directory is ignored by Git. When logging
is enabled, Settings shows **Archive current log**, which moves the complete active file to
`data/workspace/log_archive/` and starts a clean file with the next message.

Review the active log:

```powershell
.\venv\Scripts\python.exe scripts\review_conversations.py
```

Review an archived log:

```powershell
.\venv\Scripts\python.exe scripts\review_conversations.py --path data\workspace\log_archive\dev_conversations_TIMESTAMP.jsonl
```

Never commit or share a development log without the tester's consent. The application data, logs, `.env`,
and uploaded financial records stay local and are excluded from Git.

## Prototype boundaries

- One local personal workspace per installation; there is no login or cloud synchronization.
- Bank data is imported manually through CSV; there is no live bank connection.
- Recurring-bill detection needs multiple transactions with a regular pattern.
- Advice improves as more information is added, but users can always omit details.
- Model response time depends on the NRP service; deterministic inputs remain fast.
