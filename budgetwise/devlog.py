"""Opt-in structured conversation logs for local development and user testing.

Enable with BUDGETWISE_DEV_LOG_CONVERSATIONS=1. Logs stay inside the git-ignored
workspace and may contain financial conversation text, so never publish them.
"""

from __future__ import annotations

import hashlib
import json
import os
import re
import threading
from datetime import datetime
from pathlib import Path

from . import store

_LOCK = threading.Lock()


def enabled() -> bool:
    return os.getenv("BUDGETWISE_DEV_LOG_CONVERSATIONS", "").strip().lower() in {
        "1",
        "true",
        "yes",
        "on",
    }


def path() -> Path:
    override = os.getenv("BUDGETWISE_DEV_LOG_PATH")
    return Path(override) if override else store.WORKSPACE / "dev_conversations.jsonl"


def display_path(target: Path | None = None) -> str:
    """A user-facing path without exposing more of the computer than necessary."""
    target = target or path()
    try:
        return str(target.relative_to(store.ROOT)).replace("\\", "/")
    except ValueError:
        return str(target)


def archive_current() -> dict | None:
    """Atomically move the entire active JSONL log into a timestamped local archive.

    The next logged turn recreates the active file. This intentionally archives every
    workspace/session in the file so the UI never implies account-specific deletion.
    """
    if not enabled():
        raise RuntimeError("Development conversation logging is not enabled")
    source = path()
    with _LOCK:
        if not source.exists() or source.stat().st_size == 0:
            return None
        archive_dir = source.parent / "log_archive"
        archive_dir.mkdir(parents=True, exist_ok=True)
        stamp = datetime.now().strftime("%Y-%m-%d_%H%M%S")
        target = archive_dir / f"{source.stem}_{stamp}{source.suffix}"
        counter = 2
        while target.exists():
            target = archive_dir / f"{source.stem}_{stamp}_{counter}{source.suffix}"
            counter += 1
        source.replace(target)
        turns = sum(1 for line in target.open("r", encoding="utf-8") if line.strip())
        return {
            "path": display_path(target),
            "filename": target.name,
            "turns": turns,
            "bytes": target.stat().st_size,
        }


def _safe_text(value: str) -> str:
    text = re.sub(r"\b(?:\d[ -]?){12,19}\b", "[REDACTED ACCOUNT NUMBER]", str(value))
    text = re.sub(r"\b\d{3}-\d{2}-\d{4}\b", "[REDACTED SSN]", text)
    return text[:4000]


def _saved_shape(saved: dict | None) -> dict:
    if not saved:
        return {"count": 0, "kinds": []}
    kinds = [key for key in ("transactions", "schedules", "balances") if saved.get(key)]
    if saved.get("goal"):
        kinds.append("goal")
    if saved.get("typical_weekly_spend") is not None:
        kinds.append("typical_spending")
    return {
        "count": saved.get("count", 0),
        "kinds": kinds,
        "batch_id": saved.get("batch_id"),
    }


def log_turn(
    *,
    account: str,
    session_id: str,
    message: str,
    answer: str,
    handler: str,
    intent: str | None,
    elapsed: float,
    before: dict,
    after: dict,
    readiness_before: dict,
    readiness_after: dict,
    saved: dict | None = None,
    blocked: str | None = None,
    error_reason: str | None = None,
) -> None:
    """Append one self-contained JSON event. Logging must never break the app."""
    if not enabled():
        return
    event = {
        "version": 1,
        "timestamp": store.now(),
        "session_id": session_id,
        "account": hashlib.sha256(account.encode("utf-8")).hexdigest()[:12],
        "message": _safe_text(message),
        "answer": _safe_text(answer),
        "handler": handler,
        "intent": intent,
        "elapsed_seconds": round(float(elapsed), 3),
        "blocked": blocked,
        "error_reason": _safe_text(error_reason) if error_reason else None,
        "saved": _saved_shape(saved),
        "question_before": {
            "key": before.get("question_key"),
            "text": before.get("question"),
        },
        "question_after": {
            "key": after.get("question_key"),
            "text": after.get("question"),
        },
        "statuses_before": before.get("statuses", {}),
        "statuses_after": after.get("statuses", {}),
        "readiness_before": {
            "ready": readiness_before.get("ready"),
            "missing": readiness_before.get("missing", []),
        },
        "readiness_after": {
            "ready": readiness_after.get("ready"),
            "missing": readiness_after.get("missing", []),
        },
    }
    try:
        target = path()
        target.parent.mkdir(parents=True, exist_ok=True)
        with _LOCK, target.open("a", encoding="utf-8") as handle:
            handle.write(json.dumps(event, ensure_ascii=False, default=str) + "\n")
    except OSError:
        pass
