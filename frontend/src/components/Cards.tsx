import { BadgeCheck, CalendarCheck2, PiggyBank, Target, Utensils } from "lucide-react";
import type { Afford, Plan } from "@/lib/api";
import { catInfo, CatIcon } from "@/lib/categories";
import { cn, day, money } from "@/lib/format";

const VERDICT = {
  yes: { label: "Fits your budget", cls: "border-forest/40 bg-forest-soft/50", text: "text-forest" },
  tight: { label: "Possible, but tight", cls: "border-marigold/50 bg-marigold-soft/50", text: "text-marigold" },
  no: { label: "Not before payday", cls: "border-berry/40 bg-berry-soft/50", text: "text-berry" },
};

/** Before/after view of a purchase, straight from the affordability math. */
export function AffordCard({ a }: { a: Afford }) {
  const v = VERDICT[a.verdict];
  return (
    <div className={cn("rounded-2xl border p-4", v.cls)}>
      <div className="flex items-baseline justify-between gap-3">
        <p className={cn("font-display text-[1.1rem] font-bold", v.text)}>{v.label}</p>
        <p className="num font-display text-[1.1rem] font-bold">{money(a.amount)}</p>
      </div>
      <div className="num mt-3 grid grid-cols-2 gap-3 text-[0.88rem]">
        <div className="rounded-xl bg-surface/80 p-3">
          <p className="text-muted">Per day now</p>
          <p className="font-display text-[1.2rem] font-bold">{money(a.per_day_before)}</p>
        </div>
        <div className="rounded-xl bg-surface/80 p-3">
          <p className="text-muted">Per day after</p>
          <p className={cn("font-display text-[1.2rem] font-bold", v.text)}>{money(a.per_day_after)}</p>
        </div>
      </div>
      <p className="num mt-3 text-[0.82rem] text-muted">
        {a.days_until_payday} days until payday ({day(a.next_payday)}). You usually spend {money(a.typical_daily_spending)} a day.
      </p>
    </div>
  );
}

/** The weekly plan: limits first, reasons second, the Critic's review last. */
export function PlanCard({ p, compact = false }: { p: Plan; compact?: boolean }) {
  const focus = catInfo(p.focus_category);
  return (
    <div className="rounded-2xl border border-line bg-surface">
      <div className="p-5">
        <p className="text-[0.85rem] text-muted">{day(p.week_start)} to {day(p.week_end)}</p>
        <p className="mt-1 font-display text-[1.3rem] font-bold leading-snug">{p.headline}</p>
      </div>
      <div className="num grid border-y border-line sm:grid-cols-3">
        <div className="flex items-center gap-3 p-4 sm:border-r sm:border-line">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-forest-soft text-forest"><CalendarCheck2 size={20} /></span>
          <div><p className="text-[0.8rem] text-muted">Daily limit</p><p className="font-display text-[1.25rem] font-bold">{money(p.daily_limit)}</p></div>
        </div>
        <div className="flex items-center gap-3 border-t border-line p-4 sm:border-r sm:border-t-0">
          <CatIcon id={p.focus_category} size={18} />
          <div><p className="text-[0.8rem] text-muted">{focus.label} cap</p><p className="font-display text-[1.25rem] font-bold">{money(p.focus_category_cap)}</p>
            <p className="text-[0.75rem] text-faint">usually {money(p.focus_weekly_average)}/week</p></div>
        </div>
        <div className="flex items-center gap-3 border-t border-line p-4 sm:border-t-0">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-marigold-soft text-marigold"><PiggyBank size={20} /></span>
          <div><p className="text-[0.8rem] text-muted">Save this week</p><p className="font-display text-[1.25rem] font-bold">{money(p.save_this_week)}</p>
            {p.goal_name && <p className="text-[0.75rem] text-faint">{p.on_track_for_goal ? "on pace for" : "toward"} {p.goal_name}</p>}</div>
        </div>
      </div>
      {!compact && (
        <div className="space-y-4 p-5">
          <div>
            <p className="mb-2 font-semibold">Why this plan</p>
            <ul className="num space-y-1.5 text-[0.93rem] text-muted">
              {p.why.map((w, i) => (
                <li key={i} className="flex gap-2"><Target size={15} className="mt-1 shrink-0 text-forest" />{w}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl bg-sunken p-4">
            <p className="flex items-center gap-2 font-semibold"><Utensils size={16} className="text-marigold" /> Do this today</p>
            <p className="num mt-1 text-[0.93rem]">{p.today_action}</p>
          </div>
        </div>
      )}
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-line px-5 py-3 text-[0.83rem] text-muted">
        <span className="flex items-center gap-1.5 font-semibold text-ink"><BadgeCheck size={16} className="text-forest" /> Critic score {p.critic.score}/10</span>
        <span>{p.attempts > 1 ? "Revised once after review." : "Approved on the first draft."}</span>
        {p.tip_source && <span>Guidance: {p.tip_source.replace(".md", "").replaceAll("_", " ")}</span>}
      </div>
    </div>
  );
}
