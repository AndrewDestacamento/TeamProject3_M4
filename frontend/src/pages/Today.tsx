import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, CalendarDays, Info, PencilLine, Upload } from "lucide-react";
import { api } from "@/lib/api";
import Runway from "@/components/Runway";
import { ForecastChart, MonthBars } from "@/components/Charts";
import { AskBox, BillList, GoalMeter, InsightList, Section, Skeleton, StatusChip } from "@/components/Bits";
import { CheckIns, LogBox } from "@/components/Logging";
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
  const tone = s.status === "red" || over ? "text-berry" : s.status === "amber" ? "text-marigold" : "text-forest";
  const plan = plans?.current;
  const FIXED = new Set(["housing", "utilities", "insurance", "debt_payment", "education", "subscriptions", "transfer", "income"]);
  const flexRows = s.month.categories.filter((r) => !FIXED.has(r.category));

  return (
    <div className="space-y-8">
      {s.data_is_old && (
        <div className="flex items-start gap-3 rounded-2xl bg-marigold-soft px-4 py-3 text-[0.92rem]">
          <Info size={18} className="mt-0.5 shrink-0 text-marigold" />
          <span>Your uploaded file ends on {day(s.as_of)}, so these numbers are as of that day. Upload a newer export for today's picture.</span>
        </div>
      )}

      {/* Hero: the one question everyone asks */}
      <section className="grid gap-8 lg:grid-cols-[1fr_320px] lg:items-end">
        <div>
          <div className="flex flex-wrap items-center gap-3 text-muted">
            <span className="font-medium">{longDay(s.as_of)}</span>
            <StatusChip status={over ? "red" : s.status} />
          </div>
          <h1 className="mt-3 text-[2rem] font-bold leading-[1.1] sm:text-[2.6rem]">
            {over ? "You're over today's amount by" : "You can spend"}
          </h1>
          <div className="mt-1 text-[4.2rem] leading-none sm:text-[5.6rem]">
            <BigMoney value={Math.abs(s.left_today)} tone={tone} />
            <span className="ml-3 align-middle font-display text-[1.5rem] font-semibold text-muted sm:text-[1.9rem]">{over ? "" : "more today"}</span>
          </div>
          <p className="num mt-4 max-w-xl text-[1.05rem] text-muted">
            That's from <span className="font-semibold text-ink">{money(s.safe_per_day)} a day</span> until payday on{" "}
            <span className="font-semibold text-ink">{day(s.next_payday)}</span>
            {s.spent_today > 0 ? <>. You've spent {money(s.spent_today)} so far today.</> : <>. Nothing spent yet today.</>}
          </p>
          {s.estimates.count > 0 && (
            <p className="num mt-2 text-[0.88rem] text-faint">
              Includes {money(s.estimates.total)} of estimates you logged.{" "}
              <Link to="/accounts#upload" className="font-medium text-forest hover:underline">Upload a bank file</Link> for exact numbers.
            </p>
          )}
        </div>

        <dl className="num grid grid-cols-2 gap-x-6 gap-y-4 rounded-2xl bg-sunken/70 p-5 text-[0.92rem]">
          <div><dt className="text-muted">In your account</dt><dd className="font-display text-[1.25rem] font-bold">{money(s.balance)}</dd></div>
          <div><dt className="text-muted">Safe until payday</dt><dd className="font-display text-[1.25rem] font-bold">{money(s.safe_to_spend_total)}</dd></div>
          <div><dt className="text-muted">Bills before payday</dt><dd className="font-semibold">{money(s.bills_before_payday_total)}</dd></div>
          <div><dt className="text-muted">{s.held_back_for_next_cycle > 0 ? "Held for bills + cushion" : "Cushion kept aside"}</dt>
            <dd className="font-semibold">{money(s.held_back_for_next_cycle > 0 ? s.held_back_for_next_cycle + s.savings_buffer : s.savings_buffer)}</dd></div>
        </dl>
      </section>

      <CheckIns s={s} />

      <Runway s={s} />

      <div className="grid gap-6 lg:grid-cols-[1.15fr_1fr]">
        <div className="space-y-6">
          <Section title="Tell BudgetWise" aside="Spent or earned something? Say it how you'd text it">
            <LogBox placeholder="e.g. spent about $20 on food, or got paid $612" />
          </Section>
          <Section title="Ask BudgetWise" aside="Answers in seconds, using your real numbers">
            <AskBox />
          </Section>
          <Section title="Worth knowing">
            <InsightList items={s.insights} />
          </Section>
        </div>
        <div className="space-y-6">
          <Section title="This week's plan">
            {plan ? (
              <div className="space-y-3">
                <p className="num text-[1.05rem]">
                  Spend up to <span className="font-display text-[1.3rem] font-bold text-forest">{money(plan.daily_limit)}</span> a day, keep{" "}
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
                    : "Get a daily limit, one category to cap, and a savings amount for the next 7 days."}
                </p>
                <Link to="/plan?new=1" className="btn-primary"><CalendarDays size={18} /> Make this week's plan</Link>
              </div>
            )}
          </Section>
          {s.goal && (
            <Section title="Savings goal">
              <GoalMeter g={s.goal} />
            </Section>
          )}
          <Section title="Coming up" aside={s.subscriptions.count ? `Subscriptions: ${money(s.subscriptions.monthly_total)}/mo` : undefined}>
            <BillList bills={s.upcoming_bills} limit={5} />
          </Section>
        </div>
      </div>

      <div className="grid items-start gap-6 lg:grid-cols-[1.3fr_1fr]">
        <Section title="Where your balance is heading"
          aside={<span className="num">Lowest: {money(s.forecast.lowest)} on {day(s.forecast.lowest_date)}</span>}>
          <ForecastChart s={s} />
          <p className="num mt-3 text-[0.85rem] text-muted">
            Assumes your usual {money(s.forecast.assumes_daily_spending)} a day, every predicted bill, and conservative paychecks.
          </p>
        </Section>
        <Section title={`Everyday spending in ${s.month.this_month_label}`}
          aside={<span className="num">{money(flexRows.reduce((a, r) => a + r.this_month, 0))} so far</span>}>
          <MonthBars rows={flexRows} lastLabel={s.month.last_month_label} />
          <p className="mt-4 text-[0.82rem] text-muted">The dark tick shows where you were by this date last month. Rent and bills are left out.</p>
        </Section>
      </div>
    </div>
  );
}
