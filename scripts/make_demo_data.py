"""Generate the FAKE demo data: three personas with irregular income, plus a sample bank CSV.

    python scripts/make_demo_data.py

Persona files store dates as "days ago" so the demo always looks current: the app
turns them into real dates for today when it loads them (budgetwise/store.py).
Descriptions look like real bank statement lines so the categorizer has real work to do.
None of this is real financial information.
"""

import csv
import json
import random
import sys
from datetime import date, timedelta
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT))
from budgetwise.categories import rule_category  # noqa: E402

OUT = ROOT / "data" / "personas"
DAYS = 120


class Builder:
    def __init__(self, pid: str, seed: int):
        self.pid, self.rng, self.rows = pid, random.Random(seed), []

    def add(self, days_ago: int, desc: str, amount: float, category: str | None = None):
        if 0 <= days_ago < DAYS:
            cat = category or rule_category(desc, amount) or "other"
            self.rows.append({"days_ago": days_ago, "description": desc, "amount": round(amount, 2), "category": cat})

    def every(self, first_days_ago: int, step: int, desc, amount, jitter=0.0, category=None):
        d = first_days_ago
        while d < DAYS:
            amt = amount() if callable(amount) else amount
            if jitter:
                amt = amt * (1 + self.rng.uniform(-jitter, jitter))
            self.add(d, desc() if callable(desc) else desc, amt, category)
            d += step

    def sprinkle(self, per_week: float, choices, low, high, start=1, boost_recent=1.0):
        """Day-to-day purchases spread evenly with a little randomness (today is added by hand).
        boost_recent > 1 makes the last ~10 days busier."""
        acc = self.rng.random()
        for d in range(start, DAYS):
            acc += per_week / 7 * (boost_recent if d < 10 else 1.0) * self.rng.uniform(0.6, 1.4)
            while acc >= 1:
                acc -= 1
                self.add(d, self.rng.choice(choices), -self.rng.uniform(low, high))

    def done(self, **meta) -> dict:
        self.rows.sort(key=lambda r: (r["days_ago"], r["description"]))
        for i, r in enumerate(self.rows):
            r["id"] = f"{self.pid}-{i:04d}"
        return {**meta, "transactions": [{k: r[k] for k in ("id", "days_ago", "description", "amount", "category")} for r in self.rows]}


def maya() -> dict:
    b = Builder("maya", 11)
    r = b.rng
    b.every(8, 14, "STARBUCKS CORP PAYROLL DIR DEP", lambda: r.choice([486.20, 512.75, 558.40, 603.10, 641.85, 579.30]))
    b.every(4, 30, "VENMO CASHOUT", lambda: r.uniform(35, 80), category="other")
    b.every(9, 30, "ZELLE PAYMENT TO RIVERSIDE APTS RENT", -725.00, category="housing")
    b.every(27, 30, "MINT MOBILE 800-683-7392", -45.00)
    b.every(25, 30, "SPOTIFY USA", -11.99)
    b.every(18, 30, "NETFLIX.COM", -15.49)
    b.every(13, 30, "PLANET FITNESS CLUB FEES", -24.99)
    b.every(21, 30, "APPLE.COM/BILL ICLOUD", -2.99)
    b.every(6, 30, "FPL ELECTRIC BILL PAYMENT", lambda: -r.uniform(48, 71))
    b.sprinkle(1.2, ["PUBLIX #1432 FORT MYERS FL", "ALDI 72031 FORT MYERS", "TRADER JOE'S #712"], 28, 74)
    b.sprinkle(3.2, ["STARBUCKS STORE 08821", "CHIPOTLE 2291", "DOORDASH*TACO BELL", "CHICK-FIL-A #03312", "UBER *EATS PENDING", "PANERA BREAD #601", "DUNKIN #348812", "SQ *GOLDEN BOBA TEA"], 6, 31, boost_recent=1.9)
    b.sprinkle(0.9, ["WAWA 5232", "SHELL OIL 57442365", "RACETRAC 2471"], 22, 44)
    b.sprinkle(0.8, ["AMAZON.COM*RT4KL2", "TARGET 00021455", "SHEIN.COM", "TJ MAXX #1188"], 12, 58)
    b.sprinkle(0.35, ["AMC THEATRES 2231", "STEAMGAMES.COM", "TICKETMASTER", "TOPGOLF FORT MYERS"], 14, 46)
    b.add(0, "STARBUCKS STORE 08821", -6.45)
    b.add(0, "PUBLIX #1432 FORT MYERS FL", -18.32)
    b.add(44, "FGCU BOOKSTORE", -164.20)
    b.add(3, "TICKETMASTER", -96.50)
    return b.done(
        id="maya", name="Maya", emoji="☕",
        tagline="Student · part-time barista",
        description="College junior who works 15-25 hours a week at a coffee shop. Her paycheck changes with her hours, rent is split with a roommate, and dining out creeps up fast.",
        settings={"current_balance": 296.40, "savings_buffer": 75.0,
                  "goal": {"name": "Spring textbooks fund", "target": 400.0, "saved": 135.0, "deadline_days": 63}},
        plan_history=[{"start_days_ago": 7, "daily_limit": 32.0, "focus_category": "dining", "focus_category_cap": 55.0,
                       "save_this_week": 20.0, "summary": "Keep spending under $32/day, cap dining at $55, save $20."}],
    )


def jordan() -> dict:
    b = Builder("jordan", 22)
    r = b.rng
    b.every(3, 7, "UBER DRIVER PAYOUT", lambda: r.uniform(205, 545))
    b.every(5, 7, "DOORDASH DASHER PAYOUT", lambda: r.uniform(85, 265))
    b.every(26, 30, "ONLINE PAYMENT PALM GROVE APARTMENT RENT", -1150.00, category="housing")
    b.every(20, 30, "CAPITAL ONE AUTO LOAN PMT", -289.00, category="debt_payment")
    b.every(15, 30, "GEICO AUTO INSURANCE", -142.36)
    b.every(24, 30, "T-MOBILE AUTOPAY", -60.00)
    b.every(11, 30, "SPOTIFY USA", -11.99)
    b.every(2, 30, "CHATGPT SUBSCRIPTION OPENAI", -20.00)
    b.every(16, 30, "YOUTUBE PREMIUM GOOGLE", -13.99)
    b.every(7, 30, "DUKE ENERGY PAYMENT", lambda: -r.uniform(82, 118))
    b.sprinkle(2.6, ["SHELL OIL 57442365", "RACETRAC 2471", "CIRCLE K 2711", "WAWA 5232", "SUNPASS*ACC 9921"], 18, 52)
    b.sprinkle(1.1, ["WALMART SUPERCENTER #1871", "ALDI 72031 FORT MYERS", "COSTCO WHSE #1032"], 35, 115)
    b.sprinkle(2.4, ["MCDONALD'S F12345", "WENDYS #11293", "TACO BELL #032211", "POPEYES 12091", "DUNKIN #348812", "CULVERS OF CAPE CORAL", "WINGSTOP 1123"], 7, 24)
    b.sprinkle(0.5, ["AMAZON.COM*RT4KL2", "AUTOZONE #4412", "BEST BUY 00001234", "WALMART.COM"], 15, 90)
    b.sprinkle(0.25, ["AMC THEATRES 2231", "DAVE & BUSTERS #133", "XBOX GAME PASS"], 15, 40)
    b.add(1, "JIFFY LUBE #1422", -89.99, "transport")
    b.add(0, "SHELL OIL 57442365", -41.20)
    return b.done(
        id="jordan", name="Jordan", emoji="🚗",
        tagline="Rideshare & delivery driver",
        description="Full-time gig worker who drives for Uber and delivers for DoorDash. Pay lands every week but the amount swings a lot, and rent plus car costs are big fixed bills.",
        settings={"current_balance": 1742.15, "savings_buffer": 150.0,
                  "goal": {"name": "Emergency fund", "target": 1000.0, "saved": 260.0, "deadline_days": 90}},
        plan_history=[{"start_days_ago": 7, "daily_limit": 45.0, "focus_category": "dining", "focus_category_cap": 70.0,
                       "save_this_week": 40.0, "summary": "Keep spending under $45/day, cap fast food at $70, save $40."}],
    )


def priya() -> dict:
    b = Builder("priya", 33)
    r = b.rng
    for d, amt in [(6, 1850.00), (19, 640.00), (33, 2275.00), (47, 980.00), (61, 1420.00), (78, 2400.00), (92, 760.00), (106, 1650.00), (118, 1200.00)]:
        b.add(d, "STRIPE TRANSFER ST-K8J2 PRIYA DESIGN", amt)
    b.every(12, 30, "PAYPAL TRANSFER IN UPWORK", lambda: r.uniform(180, 420))
    b.every(19, 30, "SEACREST PROPERTY MGMT RENT", -980.00, category="housing")
    b.every(9, 30, "FPL ELECTRIC BILL PAYMENT", lambda: -r.uniform(92, 141))
    b.every(14, 30, "XFINITY INTERNET", -65.00)
    b.every(22, 30, "ADOBE *CREATIVE CLOUD", -59.99)
    b.every(5, 30, "FIGMA MONTHLY", -15.00)
    b.every(28, 30, "FLORIDA BLUE INSURANCE PREMIUM", -212.40)
    b.every(17, 30, "NELNET STUDENT LOAN PMT", -183.00)
    b.every(10, 30, "HULU 877-8244858", -9.99)
    b.every(3, 30, "LA FITNESS MONTHLY DUES", -39.99)
    b.sprinkle(1.0, ["WHOLE FOODS MKT 10552", "PUBLIX #1432 FORT MYERS FL", "TRADER JOE'S #712"], 45, 120)
    b.sprinkle(2.2, ["SWEETGREEN NAPLES", "STARBUCKS STORE 08821", "SUSHI TOMI", "UBER *EATS PENDING", "TST* HOPS N GRAIN", "SQ *BREW HAUS COFFEE", "SHAKE SHACK 1882"], 9, 48, boost_recent=1.5)
    b.sprinkle(0.9, ["UBER *TRIP HELP.UBER.COM", "SHELL OIL 57442365", "PARKMOBILE NAPLES"], 9, 38)
    b.sprinkle(1.0, ["AMAZON.COM*RT4KL2", "TARGET 00021455", "ETSY.COM", "SEPHORA #1122", "HOME DEPOT #6331"], 15, 95)
    b.sprinkle(0.3, ["AMC THEATRES 2231", "EVENTBRITE*ART WALK", "TICKETMASTER"], 18, 70)
    b.add(2, "BEST BUY 00001234", -249.99)
    b.add(0, "SQ *BREW HAUS COFFEE", -5.75)
    return b.done(
        id="priya", name="Priya", emoji="🎨",
        tagline="Freelance graphic designer",
        description="Self-employed designer paid by clients whenever invoices clear, from $600 to $2,400 at a time. Some months are great, some are thin, and the bills don't wait.",
        settings={"current_balance": 2386.70, "savings_buffer": 300.0,
                  "goal": {"name": "New laptop", "target": 1400.0, "saved": 520.0, "deadline_days": 75}},
        plan_history=[{"start_days_ago": 7, "daily_limit": 60.0, "focus_category": "dining", "focus_category_cap": 90.0,
                       "save_this_week": 60.0, "summary": "Keep spending under $60/day, cap dining at $90, save $60."}],
    )


def sample_csv(path: Path) -> None:
    """A Chase-style checking export for trying the upload screen. Several lines on purpose
    match no keyword rule ("SQ *", "TST*", "PY *"), so the Categorizer agent has to label them."""
    rng = random.Random(44)
    end = date(2026, 11, 10)
    rows = []

    def add(d: date, desc: str, amt: float):
        rows.append((d, desc, round(amt, 2)))

    for i in range(0, 95, 14):
        add(end - timedelta(days=4 + i), "TARGET CORP PAYROLL PPD ID: 1041224023", rng.choice([612.40, 655.10, 702.85, 588.90]))
    for i in range(0, 95, 30):
        add(end - timedelta(days=12 + i), "ZELLE PAYMENT TO OAK HOLLOW RENT 1928374", -690.00)
        add(end - timedelta(days=21 + i), "VERIZON WIRELESS PAYMENTS", -55.00)
        add(end - timedelta(days=17 + i), "NETFLIX.COM 866-579-7172 CA", -15.49)
        add(end - timedelta(days=9 + i), "PY *FGCU PARKING SERVICES", -32.00)
    merchants = [("SQ *GOLDEN BOBA TEA", 6, 12), ("TST* HOPS N GRAIN", 18, 44), ("CHIPOTLE 2291", 9, 16),
                 ("PUBLIX #1432 FORT MYERS FL", 25, 80), ("WAWA 5232", 25, 45), ("AMAZON.COM*RT4KL2", 12, 60),
                 ("SQ *CORNER BARBERSHOP", 25, 35), ("VENMO PAYMENT 1023432", 15, 40), ("KAVA CULTURE CAPE CORAL", 8, 14)]
    for d in range(95):
        for _ in range(rng.choice([0, 1, 1, 2])):
            m, lo, hi = rng.choice(merchants)
            add(end - timedelta(days=d), m, -rng.uniform(lo, hi))
    rows.sort(key=lambda r: r[0], reverse=True)
    balance = 912.37
    with path.open("w", newline="", encoding="utf-8") as f:
        w = csv.writer(f)
        w.writerow(["Details", "Posting Date", "Description", "Amount", "Type", "Balance", "Check or Slip #"])
        for d, desc, amt in rows:
            w.writerow(["CREDIT" if amt > 0 else "DEBIT", d.strftime("%m/%d/%Y"), desc, f"{amt:.2f}",
                        "ACH_CREDIT" if amt > 0 else "DEBIT_CARD", f"{balance:.2f}", ""])
            balance = round(balance - amt, 2)


if __name__ == "__main__":
    OUT.mkdir(parents=True, exist_ok=True)
    for order, build in enumerate((maya, jordan, priya)):
        p = {**build(), "order": order}
        (OUT / f"{p['id']}.json").write_text(json.dumps(p, indent=1), encoding="utf-8")
        print(f"{p['id']}: {len(p['transactions'])} transactions")
    sample = ROOT / "data" / "samples" / "sample_chase_checking.csv"
    sample.parent.mkdir(parents=True, exist_ok=True)
    sample_csv(sample)
    print("sample CSV:", sample.relative_to(ROOT))
