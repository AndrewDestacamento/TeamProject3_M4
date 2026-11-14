import { useEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  CalendarDays,
  Check,
  ChevronDown,
  ReceiptText,
  RefreshCw,
  Target,
  X,
} from "lucide-react";
import {
  api,
  stream,
  type LastPlan,
  type Plan,
  type Snapshot,
} from "@/lib/api";
import { applyEvent, type TimelineItem } from "@/lib/chat";
import AgentTimeline from "@/components/AgentTimeline";
import { PlanCard } from "@/components/Cards";
import { Section, Skeleton } from "@/components/Bits";
import { catInfo } from "@/lib/categories";
import { cn, day, money } from "@/lib/format";

function Meter({
  label,
  value,
  limit,
  note,
}: {
  label: string;
  value: number;
  limit: number;
  note?: string;
}) {
  const pct = limit > 0 ? Math.min(100, (value / limit) * 100) : 100;
  const over = value > limit;
  return (
    <div>
      <div className="num flex items-baseline justify-between gap-2 text-[0.92rem]">
        <span className="font-medium">{label}</span>
        <span>
          <span
            className={cn("font-semibold", over ? "text-berry" : "text-ink")}
          >
            {money(value)}
          </span>{" "}
          <span className="text-muted">of {money(limit)}</span>
        </span>
      </div>
      <div className="mt-1.5 h-2.5 overflow-hidden rounded-full bg-sunken">
        <div
          className={cn("h-full rounded-full", over ? "bg-berry" : "bg-forest")}
          style={{ width: `${pct}%` }}
        />
      </div>
      {note && <p className="mt-1 text-[0.8rem] text-muted">{note}</p>}
    </div>
  );
}

function CheckIn({ lp }: { lp: LastPlan }) {
  return (
    <Section title="How last week went" aside={`Week of ${day(lp.week_start)}`}>
      <div className="flex items-start gap-3">
        <span
          className={cn(
            "grid h-9 w-9 shrink-0 place-items-center rounded-xl",
            lp.stuck_to_plan
              ? "bg-forest-soft text-forest"
              : "bg-marigold-soft text-marigold",
          )}
        >
          {lp.stuck_to_plan ? <Check size={18} /> : <X size={18} />}
        </span>
        <p className="num">
          {lp.stuck_to_plan
            ? "You stuck to the plan. Nice work."
            : "The plan slipped a bit, which is normal. This week's plan takes it into account."}
        </p>
      </div>
      <div className="mt-5 space-y-4">
        <Meter
          label="Average spending per day"
          value={lp.actual_daily_average}
          limit={lp.daily_limit}
        />
        <Meter
          label={`${catInfo(lp.focus_category).label} for the week`}
          value={lp.actual_focus_spent}
          limit={lp.focus_category_cap}
        />
      </div>
    </Section>
  );
}

function GoalOverview({ s }: { s: Snapshot }) {
  const g = s.goal;
  return (
    <section className="rounded-3xl border border-line bg-surface p-5 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-forest">
          <Target size={19} />
          <h2 className="font-bold">Savings goal</h2>
        </div>
        <Link
          to="/accounts#goals"
          className="text-sm font-semibold text-forest underline"
        >
          Edit
        </Link>
      </div>
      {g ? (
        <>
          <div className="mt-4 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-sm text-muted">{g.name}</p>
              <p className="num font-display text-[1.8rem] font-bold text-forest">
                {g.saved_known ? money(g.saved, true) : "—"}{" "}
                <span className="text-base text-ink">
                  of {money(g.target, true)}
                </span>
              </p>
            </div>
            <div className="text-right">
              <p className="num font-semibold">
                {money(g.needed_per_week)} / week
              </p>
              <p className="text-xs text-muted">until {day(g.deadline)}</p>
            </div>
          </div>
          <div className="mt-3 h-2 overflow-hidden rounded-full bg-sunken">
            <div
              className="h-full rounded-full bg-forest"
              style={{
                width: `${g.saved_known ? Math.min(g.percent, 100) : 0}%`,
              }}
            />
          </div>
          <p className="mt-3 text-xs leading-relaxed text-muted">
            {g.plan_level === "personalized"
              ? g.fits
                ? "This pace fits the information you’ve shared."
                : "This pace needs adjustment based on the information you’ve shared."
              : "This is a starting pace. It becomes more realistic as you add income, bills, and spending."}
          </p>
        </>
      ) : (
        <>
          <p className="mt-4 font-semibold">No savings goal yet</p>
          <p className="mt-1 text-sm text-muted">
            A goal is optional, but it gives each weekly plan a clear
            destination.
          </p>
          <Link to="/" className="btn-primary mt-4 text-sm">
            Set a goal on Home
          </Link>
        </>
      )}
    </section>
  );
}

function UpcomingOverview({ s }: { s: Snapshot }) {
  const bills = s.upcoming_bills.slice(0, 3);
  const total = s.upcoming_bills.reduce((sum, b) => sum + b.amount, 0);
  return (
    <section className="rounded-3xl border border-line bg-surface p-5 shadow-sm">
      <div className="flex items-center gap-2 text-forest">
        <ReceiptText size={19} />
        <h2 className="font-bold">Coming up</h2>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2">
        <div className="rounded-xl bg-sunken/65 p-3">
          <p className="text-xs text-muted">Upcoming bills</p>
          <p className="num mt-0.5 font-bold">{money(total)}</p>
        </div>
        <div className="rounded-xl bg-sunken/65 p-3">
          <p className="text-xs text-muted">Next payday</p>
          <p className="mt-0.5 font-bold">
            {s.readiness.payday_known ? day(s.next_payday) : "Not added"}
          </p>
        </div>
      </div>
      {bills.length ? (
        <ul className="mt-3 divide-y divide-line">
          {bills.map((b) => (
            <li
              key={`${b.name}-${b.next_due}`}
              className="flex items-center justify-between gap-4 py-2 text-sm"
            >
              <span className="min-w-0 truncate">
                {b.name}
                <span className="ml-2 text-xs text-muted">
                  {day(b.next_due)}
                </span>
              </span>
              <strong className="num shrink-0">{money(b.amount)}</strong>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-3 text-sm text-muted">
          No upcoming bills recorded yet.
        </p>
      )}
    </section>
  );
}

export default function PlanPage() {
  const qc = useQueryClient();
  const [params, setParams] = useSearchParams();
  const { data, isLoading } = useQuery({
    queryKey: ["plans"],
    queryFn: api.plans,
  });
  const { data: snapshot } = useQuery({
    queryKey: ["snapshot"],
    queryFn: api.snapshot,
  });
  const { data: draft } = useQuery<Plan | null>({
    queryKey: ["draftPlan"],
    queryFn: () => null,
    staleTime: Infinity,
    initialData: null,
  });
  const [timeline, setTimeline] = useState<TimelineItem[]>([]);
  const [working, setWorking] = useState(false);
  const [elapsed, setElapsed] = useState<number | null>(null);
  const started = useRef(false);
  const planArea = useRef<HTMLDivElement>(null);

  const generate = async () => {
    setWorking(true);
    setTimeline([]);
    setElapsed(null);
    qc.setQueryData(["draftPlan"], null);
    window.requestAnimationFrame(() =>
      planArea.current?.scrollIntoView({ behavior: "smooth", block: "start" }),
    );
    try {
      await stream("/api/plan/generate", {}, (ev) => {
        if (ev.type === "plan") qc.setQueryData(["draftPlan"], ev.plan);
        else if (ev.type === "done") setElapsed(ev.elapsed);
        else if (ev.type === "error") toast.error(ev.message);
        else setTimeline((t) => applyEvent(t, ev));
      });
    } catch (e) {
      toast.error(`Couldn't build a plan: ${(e as Error).message}`);
    } finally {
      setWorking(false);
    }
  };

  useEffect(() => {
    if (params.get("new") && !started.current && snapshot?.readiness.ready) {
      started.current = true;
      setParams({}, { replace: true });
      void generate();
    }
  }, [snapshot]); // eslint-disable-line react-hooks/exhaustive-deps

  const accept = async () => {
    if (!draft) return;
    await api.acceptPlan(draft);
    qc.setQueryData(["draftPlan"], null);
    await qc.invalidateQueries({ queryKey: ["plans"] });
    await qc.invalidateQueries({ queryKey: ["snapshot"] });
    toast.success("Plan started. BudgetWise will check in on it next week.");
  };

  const current = data?.current;
  const progress = data?.progress;

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-forest/75">
            Your next seven days
          </p>
          <h1 className="mt-1 text-[2rem] font-bold leading-tight">
            Weekly plan
          </h1>
          <p className="mt-1 max-w-2xl text-muted">
            A practical spending and saving plan built from what you’ve shared.
          </p>
        </div>
      </div>
      <div ref={planArea} className="scroll-mt-24">
        {working && !draft && (
          <section className="rounded-3xl border border-forest/20 bg-surface p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-forest-soft text-forest">
                <RefreshCw size={19} className="animate-spin" />
              </span>
              <div>
                <h2 className="font-bold">Building your weekly plan</h2>
                <p className="text-sm text-muted">
                  Checking your goal, spending, income, and upcoming
                  commitments.
                </p>
              </div>
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              <Skeleton className="h-20" />
              <Skeleton className="h-20" />
              <Skeleton className="h-20" />
            </div>
          </section>
        )}
        {draft && (
          <div className="space-y-3 animate-rise">
            <PlanCard p={draft} />
            <div className="flex flex-wrap gap-2">
              <button onClick={accept} className="btn-primary">
                <Check size={18} /> Start this plan
              </button>
              <button
                onClick={generate}
                disabled={working}
                className="btn-ghost"
              >
                <RefreshCw size={16} /> Try a different plan
              </button>
            </div>
          </div>
        )}
        {!draft && !working && current && (
          <div className="space-y-4">
            <PlanCard p={current} />
            <button onClick={generate} className="btn-quiet">
              <RefreshCw size={16} /> Make a new plan
            </button>
            {progress && (
              <Section
                title="Progress this week"
                aside={`Day ${Math.min(progress.days_in, 7)} of 7`}
              >
                <div className="grid gap-5 md:grid-cols-2">
                  <Meter
                    label="Everyday spending"
                    value={progress.flexible_spent}
                    limit={progress.allowance_so_far}
                    note={`Your limit so far is ${money(current.daily_limit)} × ${Math.min(progress.days_in, 7)} days.`}
                  />
                  <Meter
                    label={`${catInfo(current.focus_category).label} this week`}
                    value={progress.focus_spent}
                    limit={progress.focus_cap}
                  />
                </div>
              </Section>
            )}
          </div>
        )}
        {!draft &&
          !working &&
          !current &&
          !isLoading &&
          snapshot?.readiness.ready && (
            <section className="rounded-3xl border border-forest/20 bg-gradient-to-r from-forest-soft/70 to-surface p-6 shadow-sm">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-xl font-bold">
                    Turn your information into a weekly plan
                  </h2>
                  <p className="mt-1 max-w-2xl text-sm text-muted">
                    Get a daily spending target, one category to watch, and an
                    amount to put toward your goal.
                  </p>
                </div>
                <button onClick={generate} className="btn-primary shrink-0">
                  <CalendarDays size={18} /> Make this week’s plan
                </button>
              </div>
            </section>
          )}
      </div>

      {snapshot && !snapshot.readiness.ready && (
        <div className="rounded-2xl border border-forest/15 bg-forest-soft/55 p-4">
          <h2 className="font-bold">A plan needs a little more context</h2>
          <p className="mt-1 text-sm text-muted">
            Add {snapshot.readiness.missing.join(", ")} when you’re comfortable.
            Your savings-goal pace is still available below.
          </p>
          <Link
            to="/"
            className="mt-2 inline-block text-sm font-semibold text-forest underline"
          >
            Continue on Home
          </Link>
        </div>
      )}

      {snapshot && (
        <div className="grid gap-4 md:grid-cols-2">
          <GoalOverview s={snapshot} />
          <UpcomingOverview s={snapshot} />
        </div>
      )}

      {(data?.last_week || (data && data.history.length > 0)) && (
        <div className="grid gap-4 lg:grid-cols-2">
          {data?.last_week && <CheckIn lp={data.last_week} />}
          {data && data.history.length > 0 && (
            <Section title="Past plans">
              <ul className="divide-y divide-line">
                {data.history.slice(0, 4).map((p) => (
                  <li
                    key={p.week_start}
                    className="num flex items-center justify-between gap-3 py-2.5 text-[0.9rem]"
                  >
                    <span>Week of {day(p.week_start)}</span>
                    <span className="text-right text-muted">
                      {money(p.daily_limit)}/day ·{" "}
                      {catInfo(p.focus_category).label} cap{" "}
                      {money(p.focus_category_cap, true)}
                    </span>
                  </li>
                ))}
              </ul>
            </Section>
          )}
        </div>
      )}

      {(working || timeline.length > 0) && (
        <details className="group rounded-2xl border border-line bg-surface">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-5 py-4">
            <span className="flex items-center gap-2 font-semibold">
              <ChevronDown
                size={18}
                className="transition-transform group-open:rotate-180"
              />{" "}
              How this plan was created
            </span>
            <span className="text-sm text-muted">
              {elapsed !== null
                ? `${elapsed.toFixed(1)}s`
                : working
                  ? "Working…"
                  : "Agent details"}
            </span>
          </summary>
          <div className="border-t border-line px-5 py-4">
            <AgentTimeline items={timeline} />
          </div>
        </details>
      )}
    </div>
  );
}
