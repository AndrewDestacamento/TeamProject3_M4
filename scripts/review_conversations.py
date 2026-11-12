"""Summarize opt-in development conversation logs without external dependencies."""
from __future__ import annotations

import argparse
import json
import statistics
import sys
from collections import Counter
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT))

from budgetwise import devlog


def main() -> None:
    parser = argparse.ArgumentParser(description="Review BudgetWise development conversations")
    parser.add_argument("--path", type=Path, default=devlog.path())
    parser.add_argument("--recent", type=int, default=12)
    args = parser.parse_args()
    if not args.path.exists():
        print(f"No conversation log found at {args.path}")
        print("Set BUDGETWISE_DEV_LOG_CONVERSATIONS=1, restart the app, and try a conversation.")
        return
    rows = []
    for line in args.path.read_text(encoding="utf-8").splitlines():
        try:
            rows.append(json.loads(line))
        except json.JSONDecodeError:
            continue
    if not rows:
        print("The log exists but has no readable turns.")
        return
    elapsed = [float(row.get("elapsed_seconds", 0)) for row in rows]
    handlers = Counter(row.get("handler", "unknown") for row in rows)
    intents = Counter(row.get("intent") or "unknown" for row in rows)
    repeated = [row for row in rows if row.get("question_before", {}).get("key") and
                row.get("question_before", {}).get("key") == row.get("question_after", {}).get("key")]
    print(f"Turns: {len(rows)} across {len({row.get('session_id') for row in rows})} session(s)")
    print(f"Handlers: {dict(handlers)}")
    print(f"Intents: {dict(intents)}")
    print(f"Latency: average {statistics.mean(elapsed):.2f}s, slowest {max(elapsed):.2f}s")
    print(f"Guardrail blocks: {sum(bool(row.get('blocked')) for row in rows)}")
    print(f"Same guided question before/after: {len(repeated)} turn(s) (review these; some are valid clarifications)")
    print("\nRecent turns:")
    for row in rows[-args.recent:]:
        before = row.get("question_before", {}).get("key") or "—"
        after = row.get("question_after", {}).get("key") or "—"
        message = str(row.get("message", "")).replace("\n", " ")[:75]
        print(f"- {row.get('elapsed_seconds', 0):>6}s | {row.get('handler', '?'):<5} | {before:>13} → {after:<13} | {message}")


if __name__ == "__main__":
    main()
