import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  BadgeCheck,
  CalendarCheck2,
  Check,
  Landmark,
  PiggyBank,
  Target,
  Undo2,
  Utensils,
  Wallet,
} from "lucide-react";
import {
  api,
  type Afford,
  type Plan,
  type Saved,
  type Schedule,
} from "@/lib/api";
import { catInfo, CatIcon } from "@/lib/categories";
import { cn, day, money } from "@/lib/format";

const EVERY: Record<string, string> = {
  monthly: "monthly",
  weekly: "every week",
  biweekly: "every 2 weeks",
  twice_monthly: "twice a month",
  once: "once",
};
const ordinal = (n: number) =>
  `${n}${["th", "st", "nd", "rd"][((n % 100) - 20) % 10] || ["th", "st", "nd", "rd"][n % 100] || "th"}`;

export function describeSchedule(s: Schedule) {
  if (s.kind === "income") {
    const amt =
      s.low && s.high
        ? `${money(s.low, true)} to ${money(s.high, true)}`
        : s.amount
          ? `about ${money(s.amount, true)}`
          : "amount not set";
    return `Paid ${EVERY[s.every] ?? s.every}, ${amt}${s.varies ? " (it changes)" : ""}${s.next_date ? `, next on ${day(s.next_date)}` : ""}`;
  }
  const when = s.day_of_month
    ? `on the ${ordinal(s.day_of_month)}`
    : s.next_date
      ? `next on ${day(s.next_date)}`
      : "";
  return `${money(s.amount ?? 0)} ${EVERY[s.every] ?? s.every} ${when}`.trim();
}

/** What the Bookkeeper just saved, with one-tap Undo (human in the loop). */
export function SavedCard({
  s,
  compact = false,
}: {
  s: Saved;
  compact?: boolean;
}) {
  const qc = useQueryClient();
  const [undone, setUndone] = useState(false);
  const undo = async () => {
    await api.undo(s.batch_id);
    setUndone(true);
    await qc.invalidateQueries();
    toast.success("Undone. Nothing from that message is saved.");
  };
  const todayIso = new Date().toISOString().slice(0, 10);
  return (
    <div
      className={cn(
        "rounded-2xl border bg-surface",
        undone ? "border-line opacity-60" : "border-forest/35",
      )}
    >
      <div className="flex items-center justify-between gap-3 px-4 pt-3">
        <p className="flex items-center gap-2 font-semibold">
          <span
            className={cn(
              "grid h-6 w-6 place-items-center rounded-full",
              undone
                ? "bg-sunken text-muted"
                : "bg-forest text-white dark:text-canvas",
            )}
          >
            {undone ? <Undo2 size={13} /> : <Check size={14} strokeWidth={3} />}
          </span>
          {undone ? "Undone" : "Saved"}
        </p>
        {!undone && (
          <button
            onClick={undo}
            className="btn-ghost px-2.5 py-1 text-[0.85rem]"
          >
            <Undo2 size={15} /> Undo
          </button>
        )}
      </div>
      <ul
        className={cn(
          "num space-y-1.5 px-4 py-3 text-[0.92rem]",
          undone && "line-through",
        )}
      >
        {s.transactions.map((t) => (
          <li key={t.id} className="flex items-center gap-2.5">
            <CatIcon id={t.category} size={14} />
            <span className="min-w-0 flex-1 truncate">
              {t.description}
              {t.date !== todayIso && (
                <span className="text-muted">, {day(t.date)}</span>
              )}
            </span>
            {t.approx && (
              <span className="chip bg-marigold-soft px-2 py-0.5 text-[0.72rem] text-marigold">
                estimate
              </span>
            )}
            <span
              className={cn("font-semibold", t.amount > 0 && "text-forest")}
            >
              {t.amount > 0 ? "+" : "−"}
              {money(Math.abs(t.amount))}
            </span>
          </li>
        ))}
        {s.schedules.map((x) => (
          <li key={x.id} className="flex items-center gap-2.5">
            {x.kind === "income" ? (
              <span className="grid h-[30px] w-[30px] place-items-center rounded-xl bg-forest-soft text-forest">
                <Wallet size={15} />
              </span>
            ) : (
              <CatIcon id={x.category ?? "other"} size={14} />
            )}
            <span className="min-w-0 flex-1">
              <span className="font-medium">
                {x.kind === "income" ? "Pay schedule" : x.name}
              </span>
              <span className="text-muted">: {describeSchedule(x)}</span>
            </span>
          </li>
        ))}
        {s.balances.map((b, i) => (
          <li key={i} className="flex items-center gap-2.5">
            <span className="grid h-[30px] w-[30px] place-items-center rounded-xl bg-sunken text-muted">
              <Landmark size={15} />
            </span>
            <span className="flex-1">Balance right now</span>
            <span className="font-semibold">{money(b.balance)}</span>
          </li>
        ))}
        {s.typical_weekly_spend ? (
          <li className="flex items-center gap-2.5">
            <span className="grid h-[30px] w-[30px] place-items-center rounded-xl bg-sunken text-muted">
              <Wallet size={15} />
            </span>
            <span className="flex-1">Usual everyday spending</span>
            <span className="font-semibold">
              {money(s.typical_weekly_spend)} a week
            </span>
          </li>
        ) : null}
        {s.goal && (
          <li className="flex items-center gap-2.5">
            <span className="grid h-[30px] w-[30px] place-items-center rounded-xl bg-marigold-soft text-marigold">
              <Target size={15} />
            </span>
            <span className="flex-1">
              Goal: {s.goal.name}, {money(s.goal.target, true)} by{" "}
              {day(s.goal.deadline)}
            </span>
          </li>
        )}
      </ul>
      {!compact && !undone && s.has_balance && (
        <p className="num border-t border-line px-4 py-2.5 text-[0.85rem] text-muted">
          Safe to spend now:{" "}
          <span className="font-semibold text-ink">
            {money(s.safe_per_day)} a day
          </span>{" "}
          until payday ({day(s.next_payday)})
        </p>
      )}
    </div>
  );
}

const VERDICT = {
  yes: {
    label: "Fits your budget",
    cls: "border-forest/40 bg-forest-soft/50",
    text: "text-forest",
  },
  tight: {
    label: "Possible, but tight",
    cls: "border-marigold/50 bg-marigold-soft/50",
    text: "text-marigold",
  },
  no: {
    label: "Not before payday",
    cls: "border-berry/40 bg-berry-soft/50",
    text: "text-berry",
  },
};

/** Before/after view of a purchase, straight from the affordability math. */
export function AffordCard({ a }: { a: Afford }) {
  const v = VERDICT[a.verdict];
  return (
    <div className={cn("rounded-2xl border p-4", v.cls)}>
      <div className="flex items-baseline justify-between gap-3">
        <p className={cn("font-display text-[1.1rem] font-bold", v.text)}>
          {v.label}
        </p>
        <p className="num font-display text-[1.1rem] font-bold">
          {money(a.amount)}
        </p>
      </div>
      <div className="num mt-3 grid grid-cols-2 gap-3 text-[0.88rem]">
        <div className="rounded-xl bg-surface/80 p-3">
          <p className="text-muted">Daily amount now</p>
          <p className="font-display text-[1.2rem] font-bold">
            {money(a.per_day_before)}
          </p>
        </div>
        <div className="rounded-xl bg-surface/80 p-3">
          <p className="text-muted">If you buy it</p>
          <p className={cn("font-display text-[1.2rem] font-bold", v.text)}>
            {money(a.per_day_after)}
          </p>
        </div>
      </div>
      <p className="num mt-3 text-[0.82rem] text-muted">
        {a.days_until_payday} days until payday ({day(a.next_payday)}). You
        usually spend {money(a.typical_daily_spending)} a day.
      </p>
    </div>
  );
}

/** The weekly plan: limits first, reasons second, the Critic's review last. */
export function PlanCard({
  p,
  compact = false,
}: {
  p: Plan;
  compact?: boolean;
}) {
  const focus = catInfo(p.focus_category);
  return (
    <div className="rounded-2xl border border-line bg-surface">
      <div className="p-5">
        <p className="text-[0.85rem] text-muted">
          {day(p.week_start)} to {day(p.week_end)}
        </p>
        <p className="mt-1 font-display text-[1.3rem] font-bold leading-snug">
          {p.headline}
        </p>
      </div>
      <div className="num grid border-y border-line sm:grid-cols-3">
        <div className="flex items-center gap-3 p-4 sm:border-r sm:border-line">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-forest-soft text-forest">
            <CalendarCheck2 size={20} />
          </span>
          <div>
            <p className="text-[0.8rem] text-muted">Daily limit</p>
            <p className="font-display text-[1.25rem] font-bold">
              {money(p.daily_limit)}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 border-t border-line p-4 sm:border-r sm:border-t-0">
          <CatIcon id={p.focus_category} size={18} />
          <div>
            <p className="text-[0.8rem] text-muted">
              {p.focus_label || focus.label} cap
            </p>
            <p className="font-display text-[1.25rem] font-bold">
              {money(p.focus_category_cap)}
            </p>
            <p className="text-[0.75rem] text-faint">
              usually {money(p.focus_weekly_average)}/week
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 border-t border-line p-4 sm:border-t-0">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-marigold-soft text-marigold">
            <PiggyBank size={20} />
          </span>
          <div>
            <p className="text-[0.8rem] text-muted">Save this week</p>
            <p className="font-display text-[1.25rem] font-bold">
              {money(p.save_this_week)}
            </p>
            {p.goal_name && (
              <p className="text-[0.75rem] text-faint">
                {p.on_track_for_goal ? "on pace for" : "toward"} {p.goal_name}
              </p>
            )}
          </div>
        </div>
      </div>
      {!compact && (
        <div className="space-y-4 p-5">
          <div>
            <p className="mb-2 font-semibold">Why this plan</p>
            <ul className="num space-y-1.5 text-[0.93rem] text-muted">
              {p.why.map((w, i) => (
                <li key={i} className="flex gap-2">
                  <Target size={15} className="mt-1 shrink-0 text-forest" />
                  {w}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl bg-sunken p-4">
            <p className="flex items-center gap-2 font-semibold">
              <Utensils size={16} className="text-marigold" /> Do this today
            </p>
            <p className="num mt-1 text-[0.93rem]">{p.today_action}</p>
          </div>
        </div>
      )}
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-line px-5 py-3 text-[0.83rem] text-muted">
        <span className="flex items-center gap-1.5 font-semibold text-ink">
          <BadgeCheck size={16} className="text-forest" /> Critic score{" "}
          {p.critic.score}/10
        </span>
        <span>
          {p.attempts > 1
            ? "Revised once after review."
            : "Approved on the first draft."}
        </span>
        {p.tip_source && (
          <span>
            Guidance: {p.tip_source.replace(".md", "").replaceAll("_", " ")}
          </span>
        )}
      </div>
    </div>
  );
}
