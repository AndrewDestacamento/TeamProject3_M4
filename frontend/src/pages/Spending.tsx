import { useMemo, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import * as Dropdown from "@radix-ui/react-dropdown-menu";
import { toast } from "sonner";
import { Check, Search, Trash2, X } from "lucide-react";
import { api, type Txn } from "@/lib/api";
import { CAT, catInfo, CatIcon } from "@/lib/categories";
import { Section, Skeleton } from "@/components/Bits";
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
      toast.success(r.changed > 1 ? `Moved ${r.changed} ${t.merchant} transactions to ${catInfo(category).label}` : `Moved to ${catInfo(category).label}`);
      await qc.invalidateQueries();
    } catch (e) {
      toast.error((e as Error).message);
    }
  };
  const c = catInfo(t.category);
  return (
    <Dropdown.Root>
      <Dropdown.Trigger className="chip max-w-[11rem] border border-line bg-surface text-muted hover:border-forest/40 hover:text-ink" aria-label={`Category: ${c.label}. Change`}>
        <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: c.hue }} />
        <span className="truncate">{c.label}</span>
      </Dropdown.Trigger>
      <Dropdown.Portal>
        <Dropdown.Content align="end" sideOffset={6} className="z-50 max-h-80 w-60 overflow-y-auto rounded-2xl border border-line bg-surface p-1.5 shadow-lift">
          <Dropdown.Label className="px-3 pb-1 pt-2 text-[0.8rem] text-muted">Applies to every {t.merchant} transaction</Dropdown.Label>
          {Object.entries(CAT).map(([id, info]) => (
            <Dropdown.Item key={id} onSelect={() => change(id)}
              className="flex cursor-pointer items-center gap-2.5 rounded-xl px-3 py-1.5 text-[0.9rem] outline-none data-[highlighted]:bg-sunken">
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: info.hue }} />
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
    <button onClick={del} className="rounded-lg p-1.5 text-faint hover:bg-sunken hover:text-berry" aria-label={`Delete ${t.merchant}`}>
      <Trash2 size={15} />
    </button>
  );
}

export default function Spending() {
  const { data, isLoading } = useQuery({ queryKey: ["transactions"], queryFn: api.transactions });
  const { data: snap } = useQuery({ queryKey: ["snapshot"], queryFn: api.snapshot });
  const [period, setPeriod] = useState("month");
  const [cat, setCat] = useState<string | null>(null);
  const [q, setQ] = useState("");

  const asOf = snap?.as_of ?? new Date().toISOString().slice(0, 10);
  const inRange = useMemo(() => (data?.transactions ?? []).filter((t) => inPeriod(t, period, asOf)), [data, period, asOf]);
  const byCat = useMemo(() => {
    const m = new Map<string, number>();
    for (const t of inRange) if (t.amount < 0 && t.category !== "transfer") m.set(t.category, (m.get(t.category) ?? 0) - t.amount);
    return [...m.entries()].sort((a, b) => b[1] - a[1]);
  }, [inRange]);
  const spent = byCat.reduce((a, [, v]) => a + v, 0);
  const income = inRange.filter((t) => t.category === "income").reduce((a, t) => a + t.amount, 0);
  const shown = inRange.filter((t) => (!cat || t.category === cat) &&
    (!q || `${t.merchant} ${t.description}`.toLowerCase().includes(q.toLowerCase())));
  const groups = useMemo(() => {
    const g = new Map<string, Txn[]>();
    for (const t of shown) g.set(t.date, [...(g.get(t.date) ?? []), t]);
    return [...g.entries()];
  }, [shown]);

  return (
    <div className="space-y-7">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-[2rem] font-bold leading-tight">Spending</h1>
          <p className="mt-1 text-muted">Everything from your bank file plus everything you told BudgetWise, sorted automatically. Change a category and it remembers that store.</p>
        </div>
        <div className="flex rounded-xl bg-sunken p-1" role="tablist" aria-label="Time period">
          {PERIODS.map((p) => (
            <button key={p.id} role="tab" aria-selected={period === p.id} onClick={() => setPeriod(p.id)}
              className={cn("rounded-lg px-3 py-1.5 text-[0.88rem] font-medium text-muted", period === p.id && "bg-surface text-ink shadow-sm")}>
              {p.label}
            </button>
          ))}
        </div>
      </div>

      <Section title="Add something" aside="Type it the way you'd text a friend">
        <LogBox placeholder="e.g. $12 lunch and $30 gas yesterday, or I made $300 in tips this week" />
      </Section>

      {/* Summary: totals plus one bar made of every category */}
      <section className="panel p-5 sm:p-6">
        <div className="num flex flex-wrap gap-x-10 gap-y-3">
          <div><p className="text-[0.88rem] text-muted">Spent</p><p className="font-display text-[1.9rem] font-bold">{money(spent)}</p></div>
          <div><p className="text-[0.88rem] text-muted">Came in</p><p className="font-display text-[1.9rem] font-bold text-forest">{money(income)}</p></div>
          <div><p className="text-[0.88rem] text-muted">Transactions</p><p className="font-display text-[1.9rem] font-bold">{inRange.length}</p></div>
        </div>
        {spent > 0 && (
          <div className="mt-5 flex h-3.5 overflow-hidden rounded-full bg-sunken" aria-hidden>
            {byCat.map(([c, v]) => <div key={c} style={{ width: `${(v / spent) * 100}%`, background: catInfo(c).hue }} title={`${catInfo(c).label}: ${money(v)}`} />)}
          </div>
        )}
        <div className="mt-4 flex flex-wrap gap-2">
          {byCat.map(([c, v]) => (
            <button key={c} onClick={() => setCat(cat === c ? null : c)} aria-pressed={cat === c}
              className={cn("chip border border-line bg-surface text-muted hover:text-ink", cat === c && "border-ink/40 bg-sunken text-ink")}>
              <span className="h-2 w-2 rounded-full" style={{ background: catInfo(c).hue }} />
              {catInfo(c).label} <span className="num font-semibold text-ink">{money(v, true)}</span>
            </button>
          ))}
          {cat && <button onClick={() => setCat(null)} className="chip text-muted hover:text-ink"><X size={14} /> Clear filter</button>}
        </div>
      </section>

      <div className="relative max-w-md">
        <Search size={18} className="pointer-events-none absolute left-3.5 top-3 text-faint" />
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search stores, like Starbucks" className="field pl-10" aria-label="Search transactions" />
      </div>

      {isLoading ? (
        <div className="space-y-3">{Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-14" />)}</div>
      ) : groups.length === 0 ? (
        <p className="panel p-6 text-muted">No transactions match. Try a different period, category or search.</p>
      ) : (
        <div className="panel divide-y divide-line">
          {groups.map(([date, rows]) => (
            <div key={date}>
              <div className="flex items-center justify-between bg-sunken/50 px-5 py-2 text-[0.85rem] font-medium text-muted">
                <span>{date === asOf ? "Today" : day(date)}</span>
                <span className="num">{money(rows.filter((r) => r.amount < 0 && r.category !== "transfer").reduce((a, r) => a - r.amount, 0))}</span>
              </div>
              <ul>
                {rows.map((t) => (
                  <li key={t.id} className="flex items-center gap-3 px-5 py-3">
                    <CatIcon id={t.category} size={16} />
                    <div className="min-w-0 flex-1">
                      <p className="flex items-center gap-2 truncate font-medium leading-tight">
                        <span className="truncate">{t.merchant}</span>
                        {t.approx && <span className="chip shrink-0 bg-marigold-soft px-2 py-0.5 text-[0.7rem] text-marigold">estimate</span>}
                      </p>
                      <p className="truncate text-[0.78rem] text-faint">
                        {t.source === "chat" ? "You told BudgetWise" : t.source === "checkin" ? "Daily check-in" : t.description}
                      </p>
                    </div>
                    <div className="hidden sm:block"><CategoryPicker t={t} /></div>
                    <DeleteEntry t={t} />
                    <p className={cn("num w-24 text-right font-semibold", t.amount > 0 && "text-forest")}>
                      {t.amount > 0 ? "+" : "−"}{money(Math.abs(t.amount))}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
