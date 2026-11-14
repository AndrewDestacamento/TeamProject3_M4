"""BudgetWise in the terminal: the same agent team as the web app, without the browser.

    python agent.py "Can I afford a $60 dinner on Friday?"
    python agent.py --plan                      # build this week's plan (Planner -> Critic)
    python agent.py --account demo-jordan "Will I run short before payday?"
    python agent.py                             # chat mode (type 'exit' to quit)

It prints every step as it happens (guardrail, router, agent, tool calls, grounding check),
like the step logs in the course's chapter 4 and 5 examples. For the full app, run:
    uvicorn app:app --port 8000
"""

import argparse
import asyncio
import json
import uuid
from pathlib import Path

from dotenv import load_dotenv

load_dotenv(Path(__file__).with_name(".env"))

from budgetwise import store  # noqa: E402
from budgetwise.agents import MODEL, BudgetWiseTeam  # noqa: E402

GREY, GREEN, YELLOW, RESET = "\033[90m", "\033[32m", "\033[33m", "\033[0m"


def show(ev: dict, quiet: bool) -> None:
    if quiet:
        return
    if ev["type"] == "step":
        print(f"{GREY}  [{ev['agent']}] {ev['status']}: {ev['detail']}{RESET}")
    elif ev["type"] == "tool":
        if ev["status"] == "running":
            print(
                f"{GREY}  [{ev['agent']}] Action: {ev['name']}({json.dumps(ev.get('args', {}))}){RESET}"
            )
        else:
            print(f"{GREY}  [{ev['agent']}] Observation: {ev.get('summary')}{RESET}")
    elif ev["type"] == "check":
        print(f"{GREY}  [{ev['name']}] {ev['status']}: {ev['detail']}{RESET}")


async def ask(team: BudgetWiseTeam, question: str, sid: str, quiet: bool) -> None:
    answer = ""
    async for ev in team.chat(question, sid):
        if ev["type"] == "done":
            answer = ev["answer"]
            print(
                f"\n{GREEN}BudgetWise:{RESET} {answer}\n{GREY}({ev['elapsed']}s, route: {ev['intent']}){RESET}\n"
            )
        elif ev["type"] == "card" and ev["kind"] == "plan":
            print_plan(ev["data"])
        else:
            show(ev, quiet)


def print_plan(p: dict) -> None:
    print(f"\n{YELLOW}Weekly plan ({p['week_start']} to {p['week_end']}){RESET}")
    print(
        f"  Daily limit: ${p['daily_limit']:,.2f}   {p['focus_label']} cap: ${p['focus_category_cap']:,.2f}   Save: ${p['save_this_week']:,.2f}"
    )
    print(f"  {p['headline']}")
    for w in p["why"]:
        print(f"   - {w}")
    print(f"  Today: {p['today_action']}")
    print(
        f"  Critic: {p['critic']['score']}/10, {p['critic']['verdict']} ({p['critic']['feedback']})"
    )


async def main() -> None:
    ap = argparse.ArgumentParser(description="BudgetWise agent team in the terminal")
    ap.add_argument("question", nargs="*")
    ap.add_argument("--plan", action="store_true", help="build this week's plan")
    ap.add_argument(
        "--account", help="account id, e.g. demo-maya, demo-jordan, demo-priya"
    )
    ap.add_argument("--quiet", action="store_true", help="hide the step log")
    args = ap.parse_args()
    if args.account:
        store.set_active_account(args.account)

    team = BudgetWiseTeam()
    await team.start()
    print(
        f"{GREY}BudgetWise · model {MODEL} · account {store.active_account_id()}{RESET}"
    )
    try:
        sid = uuid.uuid4().hex
        if args.plan:
            async for ev in team.make_plan():
                if ev["type"] == "plan":
                    print_plan(ev["plan"])
                else:
                    show(ev, args.quiet)
        elif args.question:
            await ask(team, " ".join(args.question), sid, args.quiet)
        else:
            print("Ask about your money (type 'exit' to quit).")
            while True:
                try:
                    q = input("> ").strip()
                except (EOFError, KeyboardInterrupt):
                    break
                if q.lower() in ("exit", "quit"):
                    break
                if q:
                    await ask(team, q, sid, args.quiet)
    finally:
        await team.stop()


if __name__ == "__main__":
    asyncio.run(main())
