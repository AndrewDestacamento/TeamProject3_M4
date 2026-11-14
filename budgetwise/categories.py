"""Spending categories and the fast, rule-based part of categorization.

Chapter 4's "cost ladder": use the cheapest check first. Most bank descriptions
("STARBUCKS STORE 1234", "UBER *TRIP") can be labeled with a simple keyword rule,
which is free and instant. Only the descriptions no rule matches are sent to the
Categorizer agent (see budgetwise/agents.py), and its answers are cached so the
same merchant never costs a second model call.
"""

import re

# id -> (label shown in the UI, kind)
# kind: "income", "fixed" (bills you must pay), "flexible" (day-to-day choices),
#       "transfer" (money moving between your own accounts, ignored in spending)
CATEGORIES: dict[str, tuple[str, str]] = {
    "income": ("Income", "income"),
    "housing": ("Rent & housing", "fixed"),
    "utilities": ("Utilities & phone", "fixed"),
    "insurance": ("Insurance", "fixed"),
    "debt_payment": ("Loans & cards", "fixed"),
    "education": ("Education", "fixed"),
    "groceries": ("Groceries", "flexible"),
    "dining": ("Dining & coffee", "flexible"),
    "transport": ("Gas & transport", "flexible"),
    "shopping": ("Shopping", "flexible"),
    "entertainment": ("Entertainment", "flexible"),
    "subscriptions": ("Subscriptions", "flexible"),
    "health": ("Health & fitness", "flexible"),
    "personal": ("Personal care", "flexible"),
    "fees": ("Bank fees", "flexible"),
    "transfer": ("Transfers", "transfer"),
    "other": ("Other", "flexible"),
}

CATEGORY_IDS = list(CATEGORIES)
FLEXIBLE = {c for c, (_, kind) in CATEGORIES.items() if kind == "flexible"}
FIXED = {c for c, (_, kind) in CATEGORIES.items() if kind == "fixed"}


def label(category: str) -> str:
    return CATEGORIES.get(category, ("Other", "flexible"))[0]


# Keyword rules, checked in order. Each pattern is matched against the cleaned,
# upper-case description. Order matters: income and transfers first.
RULES: list[tuple[str, str]] = [
    # income
    (r"PAYROLL|DIRECT DEP|DIR DEP|SALARY|PAYCHECK", "income"),
    (
        r"UBER.*(PAYOUT|EARNINGS)|LYFT.*(PAYOUT|EARNINGS)|DOORDASH.*(PAYOUT|DASHER)|INSTACART.*(PAYOUT|SHOPPER)",
        "income",
    ),
    (r"STRIPE TRANSFER|PAYPAL TRANSFER IN|UPWORK|FIVERR", "income"),
    # transfers between own accounts / to savings
    (r"TRANSFER TO SAV|TRANSFER FROM SAV|ONLINE TRANSFER|TO SAVINGS", "transfer"),
    # housing and bills
    (r"\bRENT\b|APARTMENT|PROPERTY MGMT|LEASING", "housing"),
    (
        r"FPL|DUKE ENERGY|ELECTRIC|WATER UTIL|UTILITIES|GAS COMPANY|XFINITY|COMCAST|SPECTRUM|AT&T|ATT\b|VERIZON|T-MOBILE|TMOBILE|CRICKET|MINT MOBILE",
        "utilities",
    ),
    (r"GEICO|PROGRESSIVE|STATE FARM|ALLSTATE|INSURANCE|LEMONADE", "insurance"),
    (
        r"STUDENT LOAN|NAVIENT|NELNET|SALLIE MAE|MOHELA|AUTO LOAN|CAR PAYMENT|CAPITAL ONE.*PMT|CREDIT CARD PMT|CARD PAYMENT|DISCOVER.*PMT",
        "debt_payment",
    ),
    (r"TUITION|BOOKSTORE|CHEGG|PEARSON|MCGRAW|FGCU|UNIVERSITY|COLLEGE", "education"),
    # subscriptions (before shopping so "AMAZON PRIME" is a subscription)
    (
        r"NETFLIX|SPOTIFY|HULU|DISNEY\+|DISNEYPLUS|HBO|MAX\.COM|YOUTUBE PREMIUM|APPLE\.COM/BILL|ICLOUD|AMAZON PRIME|PRIME VIDEO|PARAMOUNT|PEACOCK|ADOBE|FIGMA|CANVA|CHATGPT|OPENAI|AUDIBLE|PLAYSTATION|XBOX|NINTENDO",
        "subscriptions",
    ),
    (r"PLANET FITNESS|LA FITNESS|GYM|ORANGETHEORY|CRUNCH", "health"),
    # day-to-day
    (
        r"PUBLIX|WALMART GROCERY|WAL-MART.*GROC|ALDI|KROGER|TRADER JOE|WHOLE FOODS|WINN-DIXIE|SAFEWAY|COSTCO|SPROUTS|INSTACART(?!.*PAYOUT)|FOOD LION|H-E-B|HEB\b",
        "groceries",
    ),
    (
        r"STARBUCKS|DUNKIN|CHIPOTLE|MCDONALD|CHICK-FIL-A|CHICK FIL A|TACO BELL|WENDY|BURGER|SUBWAY|PANERA|DOMINO|PIZZA|DOORDASH|UBER \*?EATS|UBEREATS|GRUBHUB|POSTMATES|RESTAURANT|CAFE|COFFEE|GRILL|SUSHI|BAR &|TAVERN|PANDA EXPRESS|WINGSTOP|SWEETGREEN|SHAKE SHACK|FIVE GUYS|CULVER|POPEYES|KFC|ARBY|SONIC DRIVE",
        "dining",
    ),
    (
        r"SHELL|EXXON|MOBIL|CHEVRON|SUNOCO|WAWA|RACETRAC|CIRCLE K|SPEEDWAY|BP#|BP \d|MARATHON|7-ELEVEN|CITGO|UBER \*?TRIP|LYFT \*?RIDE|LYFT\b(?!.*PAYOUT)|PARKING|TOLL|SUNPASS|E-ZPASS|TRANSIT|METRO",
        "transport",
    ),
    (
        r"CVS|WALGREENS|PHARMACY|DOCTOR|MEDICAL|DENTAL|CLINIC|HOSPITAL|URGENT CARE",
        "health",
    ),
    (r"GREAT CLIPS|SUPERCUTS|SALON|BARBER|ULTA|SEPHORA", "personal"),
    (
        r"AMAZON|AMZN|TARGET|WALMART|WAL-MART|BEST BUY|SHEIN|TEMU|ETSY|EBAY|NIKE|OLD NAVY|TJ ?MAXX|ROSS|MARSHALLS|HOME DEPOT|LOWE'S|LOWES|IKEA|APPLE STORE",
        "shopping",
    ),
    (
        r"AMC|REGAL|CINEMA|TICKETMASTER|STUBHUB|EVENTBRITE|STEAM|BOWLING|TOPGOLF|CONCERT|DAVE & BUSTER",
        "entertainment",
    ),
    (r"OVERDRAFT|NSF FEE|MONTHLY SERVICE FEE|ATM FEE|LATE FEE|SERVICE CHARGE", "fees"),
    # plain words people type in chat ("$20 on food", "gas", "groceries")
    (r"\bGROCER", "groceries"),
    (
        r"\b(FOOD|LUNCH|DINNER|BREAKFAST|BRUNCH|COFFEE|TAKEOUT|TAKE OUT|DRINKS|SNACKS?|PIZZA|FAST FOOD)\b",
        "dining",
    ),
    (r"\b(GAS|FUEL|PARKING|BUS|TRAIN|RIDE|RIDES|TOLLS?)\b", "transport"),
    (r"\b(CLOTHES|SHOES|OUTFIT)\b", "shopping"),
    (r"\b(MOVIES?|CONCERT|GAMES?|BOWLING|TICKETS?)\b", "entertainment"),
    (r"\b(HAIRCUT|NAILS)\b", "personal"),
    (r"\b(MEDICINE|MEDS|DOCTOR|COPAY|PRESCRIPTION)\b", "health"),
]
_COMPILED = [(re.compile(p), c) for p, c in RULES]


def clean_description(raw: str) -> str:
    """Upper-case, collapse spaces, drop long digit runs (card/store numbers)."""
    text = str(raw).upper()
    text = re.sub(r"\b\d{5,}\b", " ", text)  # card fragments, reference numbers
    text = re.sub(r"\s+", " ", text).strip()
    return text


_PREFIXES = re.compile(
    r"^(ZELLE PAYMENT TO|ZELLE PAYMENT FROM|ONLINE PAYMENT|PAYMENT TO|POS DEBIT|POS PURCHASE|DEBIT CARD PURCHASE|"
    r"PURCHASE AUTHORIZED ON \S+|RECURRING PAYMENT|ACH DEBIT|ACH CREDIT|CHECKCARD \S+|SQ \*|SQ\*|TST\* ?|PY \*|PP\*|SP \*)\s*"
)
_ACRONYMS = {
    "FPL",
    "AMC",
    "CVS",
    "ATM",
    "LA",
    "TJ",
    "BP",
    "USA",
    "HBO",
    "AT&T",
    "FGCU",
    "AMZN",
    "KFC",
    "UPS",
}


def merchant_key(raw: str) -> str:
    """A short, stable key for grouping the same merchant ("STARBUCKS STORE 1234 FT MYERS"
    and "STARBUCKS STORE 99" both become "STARBUCKS STORE")."""
    text = clean_description(raw)
    text = _PREFIXES.sub("", text)
    text = re.sub(r"#\s*\S*", " ", text)  # "#1234"
    text = text.replace("*", " ")  # "UBER *EATS" -> "UBER EATS"
    text = re.sub(r"\S*\d\S*", " ", text)  # anything containing digits
    text = re.sub(r"\b(FL|GA|CA|NY|TX|USA|US|INC|LLC|CO|CORP|COM|THE)\b", " ", text)
    words = [w for w in re.split(r"[^A-Z&'+-]+", text) if len(w) > 1]
    return " ".join(words[:3]) or clean_description(raw)[:20]


_NOISE = {
    "DIR",
    "DEP",
    "PPD",
    "ID",
    "PAYMENT",
    "PAYMENTS",
    "PMT",
    "AUTOPAY",
    "BILL",
    "STORE",
    "PENDING",
    "ONLINE",
    "WHSE",
    "SUPERCENTER",
}


def pretty_merchant(raw: str) -> str:
    """Readable merchant name for the UI ("STARBUCKS STORE 1234" -> "Starbucks")."""
    words = [w for w in merchant_key(raw).split() if w not in _NOISE] or merchant_key(
        raw
    ).split()
    return " ".join(w if w in _ACRONYMS else w.capitalize() for w in words)


def rule_category(description: str, amount: float) -> str | None:
    """Category from the keyword rules, or None when no rule matches."""
    text = clean_description(description)
    for pattern, category in _COMPILED:
        if pattern.search(text):
            if category == "income" and amount < 0:
                continue  # e.g. "DOORDASH" spending, not a payout
            if category != "income" and category != "transfer" and amount > 0:
                return "other"  # refunds/credits are not spending
            return category
    if amount > 0:
        return "income" if amount >= 100 else "other"
    return None
