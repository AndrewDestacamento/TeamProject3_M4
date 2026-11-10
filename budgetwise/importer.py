"""Read a bank's CSV export, whatever bank it came from.

Every bank names its columns differently (Chase: "Posting Date", Bank of America:
"Running Bal.", Capital One: separate "Debit" and "Credit" columns, Wells Fargo: no
header at all). This module finds the date, description, amount and balance columns
by their names, or by their contents when there is no header row.

Privacy (Chapter 8, "name the assets you protect"): long digit runs such as account or
card numbers are masked before anything is stored or shown to a model.
"""

from __future__ import annotations

import csv
import io
import re
from datetime import date, datetime

DATE_NAMES = ["posting date", "posted date", "transaction date", "trans. date", "trans date", "date"]
DESC_NAMES = ["description", "payee", "merchant", "name", "memo", "transaction description", "details"]
AMOUNT_NAMES = ["amount", "transaction amount", "amount (usd)"]
DEBIT_NAMES = ["debit", "withdrawal", "withdrawals", "debit amount", "money out"]
CREDIT_NAMES = ["credit", "deposit", "deposits", "credit amount", "money in"]
BALANCE_NAMES = ["balance", "running bal.", "running balance", "available balance"]
DATE_FORMATS = ["%m/%d/%Y", "%Y-%m-%d", "%m/%d/%y", "%m-%d-%Y", "%Y/%m/%d", "%b %d, %Y", "%d %b %Y"]
MAX_ROWS = 5000


class ImportError_(ValueError):
    """A friendly message for the person uploading the file."""


def _parse_date(text: str) -> date | None:
    text = (text or "").strip()
    for fmt in DATE_FORMATS:
        try:
            return datetime.strptime(text, fmt).date()
        except ValueError:
            continue
    return None


def _parse_amount(text: str) -> float | None:
    text = (text or "").strip().replace("$", "").replace(",", "")
    if not text:
        return None
    negative = text.startswith("(") and text.endswith(")")
    text = text.strip("()")
    try:
        value = float(text)
    except ValueError:
        return None
    return -value if negative else value


def mask_numbers(text: str) -> str:
    """Hide account/card/reference numbers (6+ digits) but keep store numbers readable."""
    return re.sub(r"\d{6,}", lambda m: "••" + m.group()[-2:], str(text)).strip()


def _find(headers: list[str], names: list[str]) -> int | None:
    lowered = [h.strip().lower() for h in headers]
    for name in names:  # exact names first, in priority order
        if name in lowered:
            return lowered.index(name)
    for name in names:
        for i, h in enumerate(lowered):
            if name in h:
                return i
    return None


def parse_csv(raw: bytes) -> dict:
    """Return {"transactions": [...], "detected": {...}, "balance": float|None}."""
    try:
        text = raw.decode("utf-8-sig")
    except UnicodeDecodeError:
        text = raw.decode("latin-1")
    rows = [r for r in csv.reader(io.StringIO(text)) if any(c.strip() for c in r)]
    if len(rows) < 2:
        raise ImportError_("That file looks empty. Export at least a month of transactions as CSV and try again.")

    has_header = _parse_date(rows[0][0]) is None and not any(_parse_date(c) for c in rows[0])
    if has_header:
        headers, body = rows[0], rows[1:]
        i_date = _find(headers, DATE_NAMES)
        i_desc = _find(headers, DESC_NAMES)
        if i_desc is not None and headers[i_desc].strip().lower() == "details" and _find(headers, ["description"]) is not None:
            i_desc = _find(headers, ["description"])
        i_amt = _find(headers, AMOUNT_NAMES)
        i_debit = _find(headers, DEBIT_NAMES) if i_amt is None else None
        i_credit = _find(headers, CREDIT_NAMES) if i_amt is None else None
        i_bal = _find(headers, BALANCE_NAMES)
    else:  # no header (e.g. Wells Fargo): guess from the first rows' contents
        headers, body = [f"column {i + 1}" for i in range(len(rows[0]))], rows
        sample = body[:20]
        ncol = len(rows[0])
        def share(i, fn):
            vals = [r[i] for r in sample if i < len(r)]
            return sum(1 for v in vals if fn(v)) / max(len(vals), 1)
        i_date = next((i for i in range(ncol) if share(i, lambda v: _parse_date(v) is not None) > 0.8), None)
        numeric = [i for i in range(ncol) if i != i_date and share(i, lambda v: _parse_amount(v) is not None) > 0.8]
        i_amt = numeric[0] if numeric else None
        i_bal = None
        i_debit = i_credit = None
        texty = [i for i in range(ncol) if i not in (i_date, *numeric)]
        i_desc = max(texty, key=lambda i: sum(len(r[i]) for r in sample if i < len(r))) if texty else None

    if i_date is None or i_desc is None or (i_amt is None and i_debit is None):
        raise ImportError_("Couldn't find the date, description and amount columns. "
                           "Please export a CSV with columns like Date, Description and Amount.")

    out, skipped, balance = [], 0, None
    for n, r in enumerate(body[:MAX_ROWS]):
        def cell(i):
            return r[i] if i is not None and i < len(r) else ""
        d = _parse_date(cell(i_date))
        if i_amt is not None:
            amt = _parse_amount(cell(i_amt))
        else:
            debit, credit = _parse_amount(cell(i_debit)), _parse_amount(cell(i_credit))
            amt = (credit or 0.0) - abs(debit or 0.0) if (debit is not None or credit is not None) else None
        desc = mask_numbers(cell(i_desc))
        if d is None or amt is None or not desc:
            skipped += 1
            continue
        if balance is None and i_bal is not None:
            balance = _parse_amount(cell(i_bal))  # bank exports list the newest row first...
        out.append({"date": d, "description": desc[:120], "amount": round(amt, 2), "row": n})
    if not out:
        raise ImportError_("No transactions could be read from that file.")

    # ...but not all of them. If the file is oldest-first, the balance is on the last row.
    if i_bal is not None and out and out[0]["date"] < out[-1]["date"]:
        balance = _parse_amount(body[out[-1]["row"]][i_bal]) if i_bal < len(body[out[-1]["row"]]) else balance

    # Some banks list spending as positive numbers with no sign at all.
    if i_amt is not None and all(t["amount"] >= 0 for t in out):
        from .categories import rule_category
        for t in out:
            if rule_category(t["description"], t["amount"]) != "income":
                t["amount"] = -t["amount"]

    dates = [t["date"] for t in out]
    return {
        "transactions": out,
        "balance": balance,
        "detected": {
            "has_header": has_header,
            "date": headers[i_date],
            "description": headers[i_desc],
            "amount": headers[i_amt] if i_amt is not None else f"{headers[i_debit]} / {headers[i_credit]}",
            "balance": headers[i_bal] if i_bal is not None else None,
            "rows": len(out), "skipped": skipped,
            "first_date": min(dates).isoformat(), "last_date": max(dates).isoformat(),
        },
    }
