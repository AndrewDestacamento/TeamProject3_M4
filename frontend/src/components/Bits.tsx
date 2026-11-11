import { useState, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { AlertTriangle, CheckCircle2, Receipt, Repeat, Shield, Target, TrendingUp, Waves, ArrowUp, type LucideIcon } from "lucide-react";
import type { Bill, Goal, Insight, Status } from "@/lib/api";
import { CatIcon } from "@/lib/categories";
import { useChat } from "@/lib/chat";
import { cn, day, money, relativeDays } from "@/lib/format";

export function Section({ title, aside, children, className = "" }: { title: string; aside?: ReactNode; children: ReactNode; className?: string }) {
  return (
    <section className={cn("panel p-5 sm:p-6", className)}>
      <div className="mb-4 flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-3">
        <h2 className="text-[1.15rem] font-bold">{title}</h2>
        {aside && <div className="text-[0.85rem] text-muted">{aside}</div>}
      </div>
      {children}
    </section>
  );
}

export function Skeleton({ className = "" }: { className?: string }) {
  return <div className={cn("animate-pulse rounded-xl bg-sunken", className)} />;
}

export const STATUS: Record<Status, { label: string; cls: string; dot: string }> = {
  green: { label: "On track", cls: "bg-forest-soft text-forest", dot: "bg-forest" },
  amber: { label: "Go easy", cls: "bg-marigold-soft text-marigold", dot: "bg-marigold" },
  red: { label: "Hold off", cls: "bg-berry-soft text-berry", dot: "bg-berry" },
};

export function StatusChip({ status }: { status: Status }) {
  const s = STATUS[status];
  return <span className={cn("chip", s.cls)}><span className={cn("h-2 w-2 rounded-full", s.dot)} />{s.label}</span>;
}

const ICONS: Record<string, LucideIcon> = {
  alert: AlertTriangle, "trending-up": TrendingUp, repeat: Repeat, target: Target, receipt: Receipt,
  wave: Waves, check: CheckCircle2, shield: Shield,
};
const TONE: Record<Insight["severity"], string> = {
  high: "text-berry bg-berry-soft", medium: "text-marigold bg-marigold-soft", low: "text-sky bg-sky/10", good: "text-forest bg-forest-soft",
};

export function InsightList({ items }: { items: Insight[] }) {
  if (!items.length) return <p className="text-muted">Nothing unusual right now. Your spending looks steady.</p>;
  return (
    <ul className="divide-y divide-line">
      {items.map((i) => {
        const Icon = ICONS[i.icon] ?? AlertTriangle;
        return (
          <li key={i.id} className="flex gap-3.5 py-3.5 first:pt-0 last:pb-0">
            <span className={cn("mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-xl", TONE[i.severity])}><Icon size={18} /></span>
            <div>
              <p className="font-semibold leading-snug">{i.title}</p>
              <p className="num mt-0.5 text-[0.9rem] text-muted">{i.detail}</p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export function BillList({ bills, limit = 6 }: { bills: Bill[]; limit?: number }) {
  if (!bills.length) return <p className="text-muted">No repeating bills found yet. Upload a few months of transactions to detect them.</p>;
  return (
    <ul className="space-y-1">
      {bills.slice(0, limit).map((b) => (
        <li key={b.name + b.next_due} className="flex items-center gap-3 rounded-xl px-1 py-2">
          <CatIcon id={b.category} size={16} />
          <div className="min-w-0 flex-1">
            <p className="truncate font-medium leading-tight">{b.name}</p>
            <p className="text-[0.8rem] text-muted">{day(b.next_due)}, {relativeDays(b.days_until)}</p>
          </div>
          <div className="text-right">
            <p className="num font-semibold leading-tight">{money(b.amount)}</p>
            <p className="text-[0.75rem] text-faint">{b.every}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}

export function GoalMeter({ g }: { g: Goal }) {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-2">
        <p className="font-semibold">{g.name}</p>
        <p className="num text-[0.9rem] text-muted">{money(g.saved, true)} of {money(g.target, true)}</p>
      </div>
      <div className="mt-2 h-3 overflow-hidden rounded-full bg-sunken" role="progressbar" aria-valuenow={g.percent} aria-valuemin={0} aria-valuemax={100}>
        <div className="h-full rounded-full bg-forest" style={{ width: `${Math.min(g.percent, 100)}%` }} />
      </div>
      <p className="num mt-2 text-[0.88rem] text-muted">
        Save <span className="font-semibold text-ink">{money(g.needed_per_week)} a week</span> to reach it by {day(g.deadline)}.
      </p>
    </div>
  );
}

export const SUGGESTIONS = [
  "Can I afford a $60 dinner on Friday?",
  "Where did my money go this month?",
  "Will I run short before payday?",
  "How much do I spend on subscriptions?",
];

export function AskBox({ placeholder = "Ask anything about your money", suggestions = SUGGESTIONS, autoFocus = false, stay = false }:
  { placeholder?: string; suggestions?: string[]; autoFocus?: boolean; stay?: boolean }) {
  const [q, setQ] = useState("");
  const nav = useNavigate();
  const { send, busy } = useChat();
  const go = (text: string) => {
    if (!text.trim()) return;
    if (!stay) nav("/ask");
    void send(text);
    setQ("");
  };
  return (
    <div>
      <form onSubmit={(e) => { e.preventDefault(); go(q); }} className="relative">
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder={placeholder} autoFocus={autoFocus}
          className="field h-12 pr-12 text-[1rem]" aria-label="Ask BudgetWise" />
        <button type="submit" disabled={busy || !q.trim()} aria-label="Send"
          className="absolute right-1.5 top-1.5 grid h-9 w-9 place-items-center rounded-lg bg-forest text-white disabled:opacity-40 dark:text-canvas">
          <ArrowUp size={18} />
        </button>
      </form>
      <div className="mt-3 flex flex-wrap gap-2">
        {suggestions.map((s) => (
          <button key={s} onClick={() => go(s)} disabled={busy}
            className="rounded-full border border-line bg-surface px-3 py-1.5 text-[0.85rem] text-muted hover:border-forest/40 hover:text-ink">
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}
