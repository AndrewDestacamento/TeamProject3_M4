import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, CalendarDays, Info, PencilLine, Upload } from "lucide-react";
import { api } from "@/lib/api";
import Runway from "@/components/Runway";
import { ForecastChart, MonthBars } from "@/components/Charts";
import { BillList, GoalMeter, InsightList, Section, Skeleton, StatusChip } from "@/components/Bits";
import { CheckIns } from "@/components/Logging";
import { cn, day, longDay, money, moneyParts } from "@/lib/format";

function BigMoney({ value, tone }: { value: number; tone: string }) {
  const p = moneyParts(value);
  return (
    <span className={cn("num font-display font-extrabold tracking-[-0.035em]", tone)}>
      {p.sign}{p.whole}<span className="text-[0.55em] align-[0.62em] tracking-normal">{p.cents}</span>
    </span>
  );
}

export default function Today() {
  const { data: s, isLoading, error } = useQuery({ queryKey: ["snapshot"], queryFn: api.snapshot });
  const { data: plans } = useQuery({ queryKey: ["plans"], queryFn: api.plans });

  if (error) return <p className="panel p-6 text-berry">Couldn't load your numbers: {(error as Error).message}. Is the server running?</p>;
  if (isLoading || !s) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-6 w-56" /><Skeleton className="h-24 w-full max-w-xl" /><Skeleton className="h-36 w-full" />
        <div className="grid gap-6 lg:grid-cols-2"><Skeleton className="h-72" /><Skeleton className="h-72" /></div>
      </div>
    );
  }

  if (s.setup_needed) {
    return (
      <div className="mx-auto max-w-2xl space-y-6 pt-6">
        <h1 className="text-[2.2rem] font-bold leading-tight">Let's set up {s.account.name}</h1>
        <p className="text-[1.05rem] text-muted">BudgetWise needs a little information to work out what's safe to spend. Pick whichever is easier.</p>
        <div className="grid gap-3 sm:grid-cols-2">
          <Link to="/setup" className="panel flex flex-col gap-2 p-5 hover:border-forest/40">
            <PencilLine className="text-forest" /><span className="font-display text-[1.15rem] font-bold">Answer 5 quick questions</span>
            <span className="text-[0.9rem] text-muted">Your balance, how you get paid, your bills. In your own words.</span>
            <span className="mt-1 inline-flex items-center gap-1 font-semibold text-forest">Start <ArrowRight size={16} /></span>
          </Link>
          <Link to="/accounts#upload" className="panel flex flex-col gap-2 p-5 hover:border-forest/40">
            <Upload className="text-forest" /><span className="font-display text-[1.15rem] font-bold">Upload a bank CSV</span>
            <span className="text-[0.9rem] text-muted">Exact numbers from your bank's export. Bills and paydays are found for you.</span>
            <span className="mt-1 inline-flex items-center gap-1 font-semibold text-forest">Upload <ArrowRight size={16} /></span>
          </Link>
        </div>
      </div>
    );
  }

  const over = s.left_today < 0;
  const noMoney = s.safe_to_spend_total <= 0 && s.left_today <= 0;
  const tone = noMoney || over ? "text-berry" : s.status === "amber" ? "text-marigold" : "text-forest";
  const plan = plans?.current;
  const FIXED = new Set(["housing", "utilities", "insurance", "debt_payment", "education", "subscriptions", "transfer", "income"]);
  const flexRows = s.month.categories.filter((r) => !FIXED.has(r.category));
  const daysAfter = Math.max(s.days_until_payday - 1, 0);
  const heldBack = s.held_back_for_next_cycle + s.savings_buffer;

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      {s.data_is_old && (
        <div className="flex items-start gap-3 rounded-2xl bg-marigold-soft px-4 py-3 text-[0.92rem]">
          <Info size={18} className="mt-0.5 shrink-0 text-marigold" />
          <span>Your uploaded file ends on {day(s.as_of)}, so these numbers are as of that day. Upload a newer export for today's picture.</span>
        </div>
      )}

      {/* 1. The one number that matters */}
      <section>
        <div className="flex flex-wrap items-center gap-3 text-muted">
          <span className="font-medium">{longDay(s.as_of)}</span>
          <StatusChip status={noMoney || over ? "red" : s.status} />
        </div>
        <h1 className="mt-3 text-[2rem] font-bold leading-[1.1] sm:text-[2.4rem]">
          {noMoney ? "Nothing left to spend until payday" : over ? "You're over today by" : "You can spend"}
        </h1>
        {!noMoney && (
          <div className="mt-1 text-[4rem] leading-none sm:text-[5.2rem]">
            <BigMoney value={Math.abs(s.left_today)} tone={tone} />
            {!over && <span className="ml-3 align-middle font-display text-[1.5rem] font-semibold text-muted sm:text-[1.8rem]">today</span>}
          </div>
        )}
        <p className="num mt-4 max-w-2xl text-[1.1rem] text-muted">
          {daysAfter === 0 ? (
            <>Payday is <span className="font-semibold text-ink">tomorrow</span>{s.expected_next_paycheck ? <> (about {money(s.expected_next_paycheck, true)})</> : null}.</>
          ) : noMoney ? (
            <>Your bills and cushion need what's in your account until payday on <span className="font-semibold text-ink">{day(s.next_payday)}</span>. Try to skip extra spending.</>
          ) : over ? (
            <>That's okay. To stay on track, spend about <span className="font-semibold text-ink">{money(s.per_day_after_today)} a day</span> for the next {daysAfter} {daysAfter === 1 ? "day" : "days"} until payday on <span className="font-semibold text-ink">{day(s.next_payday)}</span>.</>
          ) : (
            <>Then about <span className="font-semibold text-ink">{money(s.per_day_after_today)} a day</span> for the next {daysAfter} {daysAfter === 1 ? "day" : "days"} until payday on <span className="font-semibold text-ink">{day(s.next_payday)}</span>.</>
          )}
          {s.spent_today > 0 && <> You've spent {money(s.spent_today)} today.</>}
        </p>

        <details className="group mt-3 max-w-md">
          <summary className="cursor-pointer list-none text-[0.92rem] font-medium text-forest hover:underline">How is this worked out?</summary>
          <dl className="num mt-3 space-y-1.5 rounded-2xl bg-sunken/70 p-4 text-[0.92rem]">
            <div className="flex justify-between"><dt className="text-muted">In your account</dt><dd>{money(s.balance)}</dd></div>
            <div className="flex justify-between"><dt className="text-muted">Bills before payday</dt><dd>&minus; {money(s.bills_before_payday_total)}</dd></div>
            <div className="flex justify-between"><dt className="text-muted">{s.held_back_for_next_cycle > 0 ? "Kept for later bills + cushion" : "Cushion kept aside"}</dt><dd>&minus; {money(heldBack)}</dd></div>
            <div className="flex justify-between border-t border-line pt-1.5 font-semibold"><dt>Safe to spend until payday</dt><dd>{money(s.safe_to_spend_total)}</dd></div>
            <p className="pt-2 text-[0.85rem] text-muted">
              Today started with {money(s.safe_per_day)} to spend ({money(s.safe_to_spend_total + s.spent_today)} spread over {s.days_until_payday} {s.days_until_payday === 1 ? "day" : "days"}).
              {daysAfter > 0 && <> The rest is split evenly over the next {daysAfter} {daysAfter === 1 ? "day" : "days"}.</>}
            </p>
          </dl>
        </details>
        {s.estimates.count > 0 && (
          <p className="num mt-2 text-[0.85rem] text-faint">
            Includes {money(s.estimates.total)} of estimates you logged.{" "}
            <Link to="/accounts#upload" className="font-medium text-forest hover:underline">Upload a bank file</Link> for exact numbers.
          </p>
        )}
      </section>

      {/* 2. Tell it what you spent */}
      <CheckIns s={s} />

      {/* 3. The days until payday */}
      <Runway s={s} />

      {/* 4. What's coming */}
      <div className="grid gap-6 md:grid-cols-2">
        <Section title="Coming up" aside={s.subscriptions.count ? `Subscriptions: ${money(s.subscriptions.monthly_total)}/mo` : undefined}>
          <BillList bills={s.upcoming_bills} limit={4} />
        </Section>
        <Section title="This week's plan">
          {plan ? (
            <div className="space-y-3">
              <p className="num text-[1.02rem]">
                Spend up to <span className="font-display text-[1.25rem] font-bold text-forest">{money(plan.daily_limit)}</span> a day, keep{" "}
                {plan.focus_label?.toLowerCase()} under <span className="font-semibold">{money(plan.focus_category_cap)}</span>
                {plan.save_this_week > 0 && <>, and save <span className="font-semibold">{money(plan.save_this_week)}</span></>}.
              </p>
              <Link to="/plan" className="btn-quiet">See how you're doing</Link>
            </div>
          ) : (
            <div className="space-y-3">
              <p className="text-muted">
                {s.last_plan
                  ? `Last week: ${s.last_plan.stuck_to_plan ? "you stuck to your plan." : "the plan slipped a little."} Ready for a fresh one?`
                  : "Get a daily limit and a savings amount for the next 7 days."}
              </p>
              <Link to="/plan?new=1" className="btn-primary"><CalendarDays size={18} /> Make a plan</Link>
            </div>
          )}
        </Section>
      </div>

      {/* 5. Everything else, out of the way */}
      <details className="panel group p-5 sm:p-6">
        <summary className="cursor-pointer list-none font-display text-[1.1rem] font-bold">
          More: tips, trends and your balance ahead <span className="text-muted group-open:hidden">+</span>
        </summary>
        <div className="mt-5 space-y-6">
          {s.insights.length > 0 && (<div><h3 className="mb-3 font-bold">Worth knowing</h3><InsightList items={s.insights} /></div>)}
          {s.goal && (<div><h3 className="mb-3 font-bold">Savings goal</h3><GoalMeter g={s.goal} /></div>)}
          <div>
            <h3 className="mb-1 font-bold">Where your balance is heading</h3>
            <p className="num mb-3 text-[0.85rem] text-muted">Lowest: {money(s.forecast.lowest)} on {day(s.forecast.lowest_date)}. Assumes your usual {money(s.forecast.assumes_daily_spending)} a day.</p>
            <ForecastChart s={s} />
          </div>
          <div>
            <h3 className="mb-1 font-bold">Everyday spending in {s.month.this_month_label}</h3>
            <p className="num mb-3 text-[0.85rem] text-muted">{money(flexRows.reduce((a, r) => a + r.this_month, 0))} so far. The dark tick is where you were by this date last month.</p>
            <MonthBars rows={flexRows} lastLabel={s.month.last_month_label} />
          </div>
        </div>
      </details>
    </div>
  );
}
