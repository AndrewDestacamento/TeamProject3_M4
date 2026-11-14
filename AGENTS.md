# AGENTS.md: handoff notes for AI coding assistants (Codex, Copilot, Claude) and new teammates

Read this file first. It explains what this project is, how it got here, how the code is organized,
the rules that keep it correct, and what is left to do. The course requirements are summarized in
[docs/PROJECT_GUIDE.md](docs/PROJECT_GUIDE.md). User-facing setup is in [README.md](README.md).

## 1. The project in one paragraph
**BudgetWise AI** is Team 3's semester project for **CEN 4930 AI Agent Studio** (FGCU, Fall 2026,
Dr. Vinod Kumar Ahuja). Team: Edward (Ed) Figueroa, Andrew Destacamento, Jose Reyes Chairez.
Problem: people with irregular income (students, part-time and gig workers, freelancers) can see
their balance but can't tell **how much they can safely spend today**, whether they'll run short
before payday, or what to change this week. BudgetWise answers that. Users either upload their
bank's CSV or just type things like "spent about $20 on food" or "I get paid every 2 weeks but it
changes". A team of AI agents explains the numbers, saves what the user says and builds a weekly plan.
**Python computes every dollar amount; the language model never does money math.**

The course follows the book *AI Agents in Action* (Micheal Lanham) and the instructor's repo
`vinodkahuja/AI-Agent-Workflows` (chapter_02 ... chapter_12). Match its style: OpenAI Agents SDK,
NRP-hosted open models, MCP tool servers, plain explanatory comments.

## 2. Milestone history (what each one delivered)
| Milestone | Repo | What was built |
|---|---|---|
| M1 (Sep 2) | (PDF only) | Team charter, 5 user interviews (students and part-time/gig workers with irregular pay), Jobs-to-be-Done map, problem statement, model stack choice: **NRP open LLMs** |
| M2 (Sep 23) | `erFig/TeamProject3_M2` | Single BudgetWise agent + MCP server (safe-to-spend, spending by category, income variability) on fake data; architecture diagram; competitive landscape, TAM/SAM, Business Model Canvas |
| M3 (Oct 28) | `erFig/TeamProject3_M3` | Two agents (**Analyst** with ReAct -> handoff -> **Planner** with chain-of-thought), ChromaDB knowledge base of budgeting guides (Penn State Extension, CFPB), plan memory, 3 guardrails (input scope/privacy, handoff payload, output grounding), 10 live test cases, cost model (GPT-4.1 mini pricing; break-even about 113 subscribers at $2.99/month), user-testing plan. M3 docs are archived in `docs/m3/`. The M3 command-line version took minutes per answer. |
| **M4 (due Nov 18)** | `erFig/TeamProject3_M4`, branch **`m4-upgrade`** | This branch: a real web app (FastAPI + React), five agents, SQLite ledger, natural-language logging, CSV import for most banks, fast streamed answers. See sections 3-6. |
| Final pitch (Nov 23) | same | 10-minute pitch + **live demo on a prompt the panel picks** (unseen). The app must be fast and handle unexpected questions gracefully. |

## 3. Branch and git rules (important)
- `main` of `TeamProject3_M4` = the **M3 code exactly as submitted** (21 commits). Leave it alone for now:
  teammates may branch from `main` to try their own designs.
- All M4 work happens on **`m4-upgrade`** (or a feature branch off it). Do not merge into `main`
  unless Ed asks.
- Small, focused commits with clear messages. The M4 rubric requires the commit history to show the
  changes were made after the M3 submission, so never rewrite or backdate history.
- Never commit `.env`, `data/workspace/` (real user money data), `chroma_db/`, `venv/` or `frontend/node_modules/`.
- `frontend/dist/` **is** committed on purpose so the app runs without Node. Rebuild and commit it
  whenever you change `frontend/src/`.

## 4. How to run, test and build
```powershell
python -m venv venv; venv\Scripts\activate          # Windows (Mac/Linux: source venv/bin/activate)
python -m pip install -r requirements.txt
copy .env.example .env                              # then paste the NRP token
uvicorn app:app --port 8000                         # open http://localhost:8000
```
- **Restart uvicorn after any Python change.** The browser loads the new `frontend/dist` on refresh,
  but the Python code stays in memory until restart (a stale server shows "—" for new fields).
- Do **not** use `uvicorn --reload` on Windows: it switches to an event loop that can't start the
  MCP stdio subprocess.
- Tests (no model calls): `python -m pytest`. Currently **99 pass**. Keep them passing
  and add tests for any money-math change.
- Frontend (Node 18+): `cd frontend && npm install && npm run dev` (port 5173, proxies /api to 8000),
  then `npm run build` before committing.
- Terminal version of the same agents: `python agent.py "Can I afford a $60 dinner?"`, `python agent.py --plan`.
- Pin "today" for repeatable runs: `BUDGETWISE_TODAY=2026-11-10`. Use a throwaway data folder with
  `BUDGETWISE_WORKSPACE=<path>`.
- Model: NRP OpenAI-compatible endpoint (`NRP_BASE_URL`, `NRP_API_KEY` in `.env`), default model
  `gpt-oss` (fastest tool-calling model in our timing tests; qwen3 and qwen3-small were about 4x slower).
  Override with `BUDGETWISE_MODEL`.

## 5. Architecture
```
Browser (React, frontend/)  --HTTP + Server-Sent Events-->  app.py (FastAPI)
  app.py lifespan: warms ChromaDB, starts the MCP tool server ONCE (mcp_server.py over stdio)
  /api/chat -> conversation controller -> budgetwise/agents.py BudgetWiseTeam.chat():
     1. Restore saved history and handle guided quick replies when possible (no model call)
     2. Input guardrail (guardrails.py: off-topic, card/account numbers, prompt injection)
     3. Router (CODE, regex, no model call): greeting | plan | afford | log | analyst
     4a. log     -> Bookkeeper agent (budgetwise/bookkeeper.py, function tools that WRITE to SQLite)
     4b. afford  -> finance.can_afford() (math) -> instant verdict text -> Analyst adds one tip
     4c. plan    -> Planner agent (calls build_weekly_plan via MCP) -> Critic agent scores 1-10,
                    code approves at >= 7, otherwise one revision
     4d. analyst -> Analyst agent (ReAct, MCP read tools: search_transactions, get_spending_by_category,
                    check_affordability, get_income_details, search_budget_knowledge)
     5. Grounding guardrail: every $ amount in a reply must appear in the facts/tool results
        (whole-dollar rounding allowed); otherwise retry once, then fall back to calculated numbers
  Uploads: budgetwise/importer.py reads any bank CSV -> keyword rules -> merchant cache ->
           Categorizer agent for unknown store names only -> store.import_rows() merges into the ledger
```
**Five agents:** Analyst (ReAct Q&A), Planner (chain-of-thought weekly plan), Critic (evaluation, Ch 7),
Bookkeeper (natural-language logging, with Undo), Categorizer (labels unknown merchants on upload).
Each agent gets only its own tools (allowlist). The Bookkeeper's tools receive the account from the
app's run context, never from the model.

### Files
| Path | What it is |
|---|---|
| `app.py` | FastAPI server: REST + SSE endpoints, serves `frontend/dist` |
| `budgetwise/finance.py` | **The money engine.** `snapshot()` computes everything the UI and agents use: safe-to-spend, daily amounts, bills, paydays, forecast, month comparison, insights, goal, last-plan check. Also `can_afford`, `build_weekly_plan`, `check_last_plan`, `search_transactions`, `compact_snapshot` (smaller copy for agent prompts) |
| `budgetwise/store.py` | SQLite ledger at `data/workspace/budgetwise.db`: accounts, transactions, schedules, balances, plans, checkins, overrides, merchant_cache |
| `budgetwise/agents.py` | Router, Analyst, Planner, Critic, Categorizer, streaming, grounding retry, conversation memory |
| `budgetwise/bookkeeper.py` | Bookkeeper agent + tools: log_spending, log_income, set_bill, set_pay_schedule, set_balance, set_savings_goal, set_typical_weekly_spending, fix_last_entry, undo_last |
| `budgetwise/conversation.py` | Guided conversation state, quick replies, persistent history, question progression and loop prevention |
| `budgetwise/devlog.py` | Opt-in private JSONL logs for development and consented test conversations |
| `budgetwise/importer.py` | Bank CSV reader (header names or headerless; Amount or Debit/Credit columns; masks long digit runs) |
| `budgetwise/categories.py` | Category list and keyword rules; merchant name cleanup |
| `budgetwise/knowledge.py` | ChromaDB search over `knowledge/*.md` (keyword fallback if Chroma fails) |
| `mcp_server.py` | MCP tool server (FastMCP), thin wrappers over finance.py |
| `guardrails.py` | Deterministic checks: input scope/privacy/injection, grounding, sanitizing |
| `agent.py` | Terminal client for the same agent team |
| `frontend/src/pages/` | Home conversation, Activity, Plan, Settings/accounts, Setup and separate example profiles |
| `frontend/src/components/` | Shared layout, charts, cards, loading states and reusable interface elements |
| `data/personas/*.json` | Demo people Maya, Jordan, Priya (dates stored as "days ago", so the demo never goes stale). Regenerate with `python scripts/make_demo_data.py` |
| `data/samples/sample_chase_checking.csv` | Sample bank export for testing uploads |
| `tests/test_budgetwise.py`, `tests/test_guardrails.py` | Unit tests (no model calls) |
| `docs/m3/` | M3 architecture diagram, test cases and results (archived) |

## 6. The money rules (do not break these)
1. **The model never does arithmetic.** Every number shown or said comes from `finance.py`.
   Agents receive numbers in the FACTS JSON or from tools and must copy them exactly; the grounding
   guardrail enforces it.
2. Money is stored in SQLite as **integer cents**; `store.cents()` / `store.dollars()` convert.
3. **Available money** is the MVP's one planning pool. Each transaction records a payment method and
   `affects_balance`. Debit/checking purchases and deposited income move it; credit-card and separate-cash
   activity still count as spending/income history but do not move it. A transaction dated before the latest
   balance statement is already included and must not be counted twice. CSV rows never move the balance on
   their own (the bank balance already includes them).
4. **Safe to spend** uses a 30-day cash-flow check: current balance + conservative expected paychecks -
   recurring bills - usual living costs after the current payday - savings cushion. A short pay window
   never turns the whole balance into one day's allowance.
5. **Daily amount** is computed from the **start of today**, because today's spending has already left the
   balance, and is spread across at least 14 days: `safe_per_day = (safe_to_spend_total + spent_today) / safe_to_spend_window_days`;
   `left_today = safe_per_day - spent_today`;
   `per_day_after_today = (safe_to_spend_total - max(left_today, 0)) / (safe_to_spend_window_days - 1)`.
   (This was a real double-counting bug, now covered by `test_todays_spending_is_counted_once`.)
6. Paychecks are planned **conservatively** (25th percentile of recent paychecks; 85% if the user says
   "it changes"; the low end of a stated range).
7. **Estimates** (`approx=1`, e.g. "about $40") are replaced by exact bank rows when a CSV covering
   those dates is imported. Re-importing the same file skips duplicates.
8. Things the user **told** us (`schedules` table: bills, pay schedule) win over what is detected.
9. Every write from one chat message shares a `batch_id`, so one **Undo** removes all of it.
10. Weekly balance confirmation creates a new balance anchor. Weekly goal contributions add to cumulative
    saved progress and recalculate the remaining pace; they are not income or spending transactions.

## 7. UI and writing conventions
- Home is a conversation-first workspace with a compact right-hand summary for the active goal,
  safe-to-spend readiness, saved facts and the most useful current insight. The composer follows new
  messages automatically but lets a user scroll up without being pulled back down.
- Setup is optional and conversational: ask one purposeful question at a time, never repeat a declined
  question, and stop guided setup after enough context. Users can log any fact or ask for advice at any time.
- Settings edits the current workspace; View example is a separate route for the fake profiles.
- Tokens are CSS variables in `frontend/src/index.css` (forest green, marigold, berry; light and dark).
  Fonts: Bricolage Grotesque (headings and numbers), Figtree (body). Icons: lucide-react. Charts: Recharts.
- Plain, friendly, specific wording. Avoid jargon, ALL-CAPS labels and filler.
- Ed prefers simple, very clear explanations.

## 8. What is left for M4 (due Wed Nov 18) and the final pitch (Mon Nov 23)
- [ ] **Evaluation run (M4 Part 1):** a runner that executes 10 test cases against the live agents and
  writes a CSV/Markdown file with: test id, input, expected output, actual output, pass/fail, **critic
  agent score**, plus the overall pass rate and a failure analysis. The M3 cases are in
  `docs/m3/test_cases.md`. Update them for M4 (include logging, affordability, plan, an out-of-scope
  question and a prompt-injection attempt). Also measure latency per case (M3 took minutes; M4 is
  usually 2-15 s). Put results in `tests/results/`.
- [x] **Updated architecture diagram** for M4 (guided conversation, five agents, router, SQLite ledger,
  MCP, CSV pipeline and guardrails) in `docs/ARCHITECTURE.md`.
- [ ] **README CHANGES section:** keep it current; each change needs a reason and its measured effect.
- [ ] **User testing (5 external testers)** is run by the team. The app should be easy for a stranger:
  Setup without a file, demo personas, CSV upload.
- [ ] **Final pitch readiness:** handle unseen prompts gracefully, keep answers fast, record a backup video.
- Nice to have: Docker / docker-compose (Ch 8), Phoenix tracing (Ch 7-8), editing a saved entry inline.

## 9. Known limitations
- NRP response time varies (usually 2-5 s; plans about 11-15 s; sometimes 25 s+). After 45 s an agent
  falls back to calculated numbers.
- Recurring-bill detection needs at least two payments on a regular schedule.
- One user per computer (local SQLite); no login or live bank connection (Plaid would be next).
- The input guardrail uses keywords, so it can over-block ("sales tax") or miss rephrased questions.
- Estimates are only as accurate as the user's guess until a bank file replaces them.
