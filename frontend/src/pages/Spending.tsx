import { useMemo, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import * as Dropdown from "@radix-ui/react-dropdown-menu";
import { toast } from "sonner";
import {
  ArrowDownRight,
  ArrowUpRight,
  Check,
  CircleDollarSign,
  Search,
  Sparkles,
  Trash2,
  X,
} from "lucide-react";
import { api, type Txn } from "@/lib/api";
import { CAT, catInfo, CatIcon } from "@/lib/categories";
import { Skeleton } from "@/components/Bits";
import { LogBox } from "@/components/Logging";
import { cn, day, money } from "@/lib/format";

const PERIODS = [
  { id: "month", label: "This month" },
  { id: "30", label: "Last 30 days" },
  { id: "90", label: "Last 90 days" },
];

function inPeriod(t: Txn, period: string, asOf: string) {
  if (period === "month") return t.date.slice(0, 7) === asOf.slice(0, 7);
  const days = Number(period);
  const d = new Date(asOf);
  d.setDate(d.getDate() - days + 1);
  return t.date >= d.toISOString().slice(0, 10);
}

function CategoryPicker({ t }: { t: Txn }) {
  const qc = useQueryClient();
  const change = async (category: string) => {
    if (category === t.category) return;
    try {
      const r = await api.setCategory(t.id, category);
      toast.success(
        r.changed > 1
          ? `Moved ${r.changed} ${t.merchant} transactions to ${catInfo(category).label}`
          : `Moved to ${catInfo(category).label}`,
      );
      await qc.invalidateQueries();
    } catch (e) {
      toast.error((e as Error).message);
    }
  };
  const c = catInfo(t.category);
  return (
    <Dropdown.Root>
      <Dropdown.Trigger
        className="chip max-w-[11rem] border border-line bg-surface text-muted hover:border-forest/40 hover:text-ink"
        aria-label={`Category: ${c.label}. Change`}
      >
        <span
          className="h-2 w-2 shrink-0 rounded-full"
          style={{ background: c.hue }}
        />
        <span className="truncate">{c.label}</span>
      </Dropdown.Trigger>
      <Dropdown.Portal>
        <Dropdown.Content
          align="end"
          sideOffset={6}
          className="z-50 max-h-80 w-60 overflow-y-auto rounded-2xl border border-line bg-surface p-1.5 shadow-lift"
        >
          <Dropdown.Label className="px-3 pb-1 pt-2 text-[0.8rem] text-muted">
            Applies to every {t.merchant} transaction
          </Dropdown.Label>
          {Object.entries(CAT).map(([id, info]) => (
            <Dropdown.Item
              key={id}
              onSelect={() => change(id)}
              className="flex cursor-pointer items-center gap-2.5 rounded-xl px-3 py-1.5 text-[0.9rem] outline-none data-[highlighted]:bg-sunken"
            >
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ background: info.hue }}
              />
              <span className="flex-1">{info.label}</span>
              {id === t.category && <Check size={15} className="text-forest" />}
            </Dropdown.Item>
          ))}
        </Dropdown.Content>
      </Dropdown.Portal>
    </Dropdown.Root>
  );
}

function DeleteEntry({ t }: { t: Txn }) {
  const qc = useQueryClient();
  if (!["chat", "checkin", "setup"].includes(t.source)) return null;
  const del = async () => {
    await api.deleteTxn(t.id);
    toast.success("Entry deleted");
    await qc.invalidateQueries();
  };
  return (
    <button
      onClick={del}
      className="rounded-lg p-1.5 text-faint hover:bg-sunken hover:text-berry"
      aria-label={`Delete ${t.merchant}`}
    >
      <Trash2 size={15} />
    </button>
  );
}

export default function Spending() {
  const { data, isLoading } = useQuery({
    queryKey: ["transactions"],
    queryFn: api.transactions,
  });
  const { data: snap } = useQuery({
    queryKey: ["snapshot"],
    queryFn: api.snapshot,
  });
  const [period, setPeriod] = useState("month");
  const [cat, setCat] = useState<string | null>(null);
  const [q, setQ] = useState("");

  const asOf = snap?.as_of ?? new Date().toISOString().slice(0, 10);
  const inRange = useMemo(
    () => (data?.transactions ?? []).filter((t) => inPeriod(t, period, asOf)),
    [data, period, asOf],
  );
  const byCat = useMemo(() => {
    const m = new Map<string, number>();
    for (const t of inRange)
      if (t.amount < 0 && t.category !== "transfer")
        m.set(t.category, (m.get(t.category) ?? 0) - t.amount);
    return [...m.entries()].sort((a, b) => b[1] - a[1]);
  }, [inRange]);
  const spent = byCat.reduce((a, [, v]) => a + v, 0);
  const income = inRange
    .filter((t) => t.category === "income")
    .reduce((a, t) => a + t.amount, 0);
  const shown = inRange.filter(
    (t) =>
      (!cat || t.category === cat) &&
      (!q ||
        `${t.merchant} ${t.description}`
          .toLowerCase()
          .includes(q.toLowerCase())),
  );
  const groups = useMemo(() => {
    const g = new Map<string, Txn[]>();
    for (const t of shown) g.set(t.date, [...(g.get(t.date) ?? []), t]);
    return [...g.entries()];
  }, [shown]);
  const topCategory = byCat[0];
  const net = income - spent;
  const insight = snap?.insights[0];

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-forest/75">
            Your money activity
          </p>
          <h1 className="mt-1 text-[2rem] font-bold leading-tight">Activity</h1>
          <p className="mt-1 max-w-2xl text-muted">
            See what came in, where money went, and what deserves attention.
          </p>
        </div>
        <div
          className="flex rounded-xl bg-sunken p-1"
          role="tablist"
          aria-label="Time period"
        >
          {PERIODS.map((p) => (
            <button
              key={p.id}
              role="tab"
              aria-selected={period === p.id}
              onClick={() => setPeriod(p.id)}
              className={cn(
                "rounded-lg px-3 py-1.5 text-[0.88rem] font-medium text-muted",
                period === p.id && "bg-surface text-ink shadow-sm",
              )}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1.55fr)_minmax(280px,0.75fr)]">
        <section className="overflow-hidden rounded-3xl border border-line bg-surface shadow-sm">
          <div className="grid divide-y divide-line sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            <div className="p-5">
              <div className="flex items-center gap-2 text-sm text-muted">
                <ArrowDownRight size={17} className="text-berry" /> Spent
              </div>
              <p className="num mt-1 font-display text-[1.8rem] font-bold">
                {money(spent)}
              </p>
            </div>
            <div className="p-5">
              <div className="flex items-center gap-2 text-sm text-muted">
                <ArrowUpRight size={17} className="text-forest" /> Came in
              </div>
              <p className="num mt-1 font-display text-[1.8rem] font-bold text-forest">
                {money(income)}
              </p>
            </div>
            <div className="p-5">
              <div className="flex items-center gap-2 text-sm text-muted">
                <CircleDollarSign size={17} /> Net activity
              </div>
              <p
                className={cn(
                  "num mt-1 font-display text-[1.8rem] font-bold",
                  net >= 0 ? "text-forest" : "text-berry",
                )}
              >
                {net >= 0 ? "+" : "−"}
                {money(Math.abs(net))}
              </p>
            </div>
          </div>
          <div className="border-t border-line px-5 py-4">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-semibold">Where spending went</p>
              <p className="num text-xs text-muted">
                {inRange.length} transactions
              </p>
            </div>
            {spent > 0 ? (
              <>
                <div
                  className="mt-3 flex h-3 overflow-hidden rounded-full bg-sunken"
                  aria-label="Spending by category"
                >
                  {byCat.map(([c, v]) => (
                    <div
                      key={c}
                      style={{
                        width: `${(v / spent) * 100}%`,
                        background: catInfo(c).hue,
                      }}
                      title={`${catInfo(c).label}: ${money(v)}`}
                    />
                  ))}
                </div>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {byCat.slice(0, 5).map(([c, v]) => (
                    <button
                      key={c}
                      onClick={() => setCat(cat === c ? null : c)}
                      aria-pressed={cat === c}
                      className={cn(
                        "chip border border-line bg-surface text-muted hover:text-ink",
                        cat === c && "border-forest bg-forest-soft text-forest",
                      )}
                    >
                      <span
                        className="h-2 w-2 rounded-full"
                        style={{ background: catInfo(c).hue }}
                      />
                      {catInfo(c).label}{" "}
                      <span className="num font-semibold text-ink">
                        {money(v, true)}
                      </span>
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <p className="mt-2 text-sm text-muted">
                Add activity or import transactions to see a breakdown.
              </p>
            )}
          </div>
        </section>

        <section className="rounded-3xl border border-forest/20 bg-gradient-to-br from-forest-soft/70 to-surface p-5 shadow-sm">
          <div className="flex items-center gap-2 text-forest">
            <Sparkles size={19} />
            <h2 className="font-bold">Worth noticing</h2>
          </div>
          {insight ? (
            <>
              <p className="mt-4 text-lg font-bold leading-snug">
                {insight.title}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {insight.detail}
              </p>
            </>
          ) : topCategory ? (
            <>
              <p className="mt-4 text-lg font-bold leading-snug">
                {catInfo(topCategory[0]).label} is your largest category
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                It accounts for {Math.round((topCategory[1] / spent) * 100)}% of
                spending in this period. Keep logging activity and BudgetWise
                will identify more useful patterns.
              </p>
            </>
          ) : (
            <>
              <p className="mt-4 text-lg font-bold">
                Your insights will appear here
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                About a week of activity or a bank CSV gives BudgetWise enough
                context to spot patterns.
              </p>
            </>
          )}
        </section>
      </div>

      <section className="rounded-2xl border border-line bg-surface p-4 shadow-sm sm:flex sm:items-start sm:gap-5">
        <div className="mb-3 shrink-0 sm:mb-0 sm:w-48">
          <p className="font-bold">Add money activity</p>
          <p className="mt-0.5 text-xs text-muted">
            Write it naturally. Estimates are fine.
          </p>
        </div>
        <div className="min-w-0 flex-1">
          <LogBox placeholder="e.g. $12 lunch and $30 gas yesterday, or I made $300 in tips" />
        </div>
      </section>

      <section className="overflow-hidden rounded-3xl border border-line bg-surface shadow-sm">
        <div className="flex flex-col gap-3 border-b border-line p-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
          <div>
            <h2 className="text-lg font-bold">Transactions</h2>
            <p className="text-xs text-muted">
              Correct a category once and BudgetWise remembers that store.
            </p>
          </div>
          <div className="relative w-full sm:max-w-sm">
            <Search
              size={17}
              className="pointer-events-none absolute left-3.5 top-3 text-faint"
            />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search stores"
              className="field py-2 pl-10"
              aria-label="Search transactions"
            />
          </div>
        </div>
        {cat && (
          <div className="flex items-center gap-2 border-b border-line bg-forest-soft/35 px-5 py-2 text-sm">
            <span>Showing {catInfo(cat).label}</span>
            <button
              onClick={() => setCat(null)}
              className="chip text-forest hover:bg-forest-soft"
            >
              <X size={14} /> Clear
            </button>
          </div>
        )}

        {isLoading ? (
          <div className="space-y-3 p-5">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-14" />
            ))}
          </div>
        ) : groups.length === 0 ? (
          <p className="p-6 text-muted">
            No transactions match. Try a different period, category or search.
          </p>
        ) : (
          <div className="divide-y divide-line">
            {groups.map(([date, rows]) => (
              <div key={date}>
                <div className="flex items-center justify-between bg-sunken/50 px-5 py-2 text-[0.85rem] font-medium text-muted">
                  <span>{date === asOf ? "Today" : day(date)}</span>
                  <span className="num">
                    {money(
                      rows
                        .filter(
                          (r) => r.amount < 0 && r.category !== "transfer",
                        )
                        .reduce((a, r) => a - r.amount, 0),
                    )}
                  </span>
                </div>
                <ul>
                  {rows.map((t) => (
                    <li
                      key={t.id}
                      className="flex items-center gap-3 px-5 py-3"
                    >
                      <CatIcon id={t.category} size={16} />
                      <div className="min-w-0 flex-1">
                        <p className="flex items-center gap-2 truncate font-medium leading-tight">
                          <span className="truncate">{t.merchant}</span>
                          {t.approx && (
                            <span className="chip shrink-0 bg-marigold-soft px-2 py-0.5 text-[0.7rem] text-marigold">
                              estimate
                            </span>
                          )}
                        </p>
                        <p className="truncate text-[0.78rem] text-faint">
                          {t.source === "chat"
                            ? "You told BudgetWise"
                            : t.source === "checkin"
                              ? "Daily check-in"
                              : t.description}
                          {t.source === "chat" &&
                            ` · ${t.payment_method === "available_money" ? "Available money" : t.payment_method === "credit_card" ? "Credit card" : "Separate money"}`}
                        </p>
                      </div>
                      <div className="hidden sm:block">
                        <CategoryPicker t={t} />
                      </div>
                      <DeleteEntry t={t} />
                      <p
                        className={cn(
                          "num w-24 text-right font-semibold",
                          t.amount > 0 && "text-forest",
                        )}
                      >
                        {t.amount > 0 ? "+" : "−"}
                        {money(Math.abs(t.amount))}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
