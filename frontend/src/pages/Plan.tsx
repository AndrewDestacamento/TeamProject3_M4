import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { CalendarDays, Check, RefreshCw, X } from "lucide-react";
import { api, stream, type LastPlan, type Plan } from "@/lib/api";
import { applyEvent, type TimelineItem } from "@/lib/chat";
import AgentTimeline from "@/components/AgentTimeline";
import { PlanCard } from "@/components/Cards";
import { Section, Skeleton } from "@/components/Bits";
import { catInfo } from "@/lib/categories";
import { cn, day, money } from "@/lib/format";

function Meter({ label, value, limit, note }: { label: string; value: number; limit: number; note?: string }) {
  const pct = limit > 0 ? Math.min(100, (value / limit) * 100) : 100;
  const over = value > limit;
  return (
    <div>
      <div className="num flex items-baseline justify-between gap-2 text-[0.92rem]">
        <span className="font-medium">{label}</span>
        <span><span className={cn("font-semibold", over ? "text-berry" : "text-ink")}>{money(value)}</span> <span className="text-muted">of {money(limit)}</span></span>
      </div>
      <div className="mt-1.5 h-2.5 overflow-hidden rounded-full bg-sunken">
        <div className={cn("h-full rounded-full", over ? "bg-berry" : "bg-forest")} style={{ width: `${pct}%` }} />
      </div>
      {note && <p className="mt-1 text-[0.8rem] text-muted">{note}</p>}
    </div>
  );
}

function CheckIn({ lp }: { lp: LastPlan }) {
  return (
    <Section title="How last week went" aside={`Week of ${day(lp.week_start)}`}>
      <div className="flex items-start gap-3">
        <span className={cn("grid h-9 w-9 shrink-0 place-items-center rounded-xl", lp.stuck_to_plan ? "bg-forest-soft text-forest" : "bg-marigold-soft text-marigold")}>
          {lp.stuck_to_plan ? <Check size={18} /> : <X size={18} />}
        </span>
        <p className="num">{lp.stuck_to_plan ? "You stuck to the plan. Nice work." : "The plan slipped a bit, which is normal. This week's plan takes it into account."}</p>
      </div>
      <div className="mt-5 space-y-4">
        <Meter label="Average spending per day" value={lp.actual_daily_average} limit={lp.daily_limit} />
        <Meter label={`${catInfo(lp.focus_category).label} for the week`} value={lp.actual_focus_spent} limit={lp.focus_category_cap} />
      </div>
    </Section>
  );
}

export default function PlanPage() {
  const qc = useQueryClient();
  const [params, setParams] = useSearchParams();
  const { data, isLoading } = useQuery({ queryKey: ["plans"], queryFn: api.plans });
  const { data: draft } = useQuery<Plan | null>({ queryKey: ["draftPlan"], queryFn: () => null, staleTime: Infinity, initialData: null });
  const [timeline, setTimeline] = useState<TimelineItem[]>([]);
  const [working, setWorking] = useState(false);
  const [elapsed, setElapsed] = useState<number | null>(null);
  const started = useRef(false);

  const generate = async () => {
    setWorking(true);
    setTimeline([]);
    setElapsed(null);
    qc.setQueryData(["draftPlan"], null);
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
    if (params.get("new") && !started.current) {
      started.current = true;
      setParams({}, { replace: true });
      void generate();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
    <div className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-[2rem] font-bold leading-tight">Weekly plan</h1>
          <p className="mt-1 max-w-xl text-muted">The Planner picks a daily limit, one category to cap and a savings amount. The Critic reviews it before you see it, and nothing is saved until you start it.</p>
        </div>
        <button onClick={generate} disabled={working} className={current || draft ? "btn-quiet" : "btn-primary"}>
          {working ? <RefreshCw size={18} className="animate-spin" /> : <CalendarDays size={18} />}
          {working ? "Building your plan" : current || draft ? "Make a new plan" : "Make this week's plan"}
        </button>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.45fr_1fr]">
        <div className="space-y-6">
          {working && !draft && (
            <div className="panel space-y-4 p-6"><Skeleton className="h-5 w-48" /><Skeleton className="h-8 w-4/5" /><Skeleton className="h-24 w-full" /><Skeleton className="h-16 w-full" /></div>
          )}
          {draft && (
            <div className="space-y-3 animate-rise">
              <PlanCard p={draft} />
              <div className="flex flex-wrap gap-2">
                <button onClick={accept} className="btn-primary"><Check size={18} /> Start this plan</button>
                <button onClick={generate} disabled={working} className="btn-ghost"><RefreshCw size={16} /> Try a different plan</button>
              </div>
            </div>
          )}
          {!draft && !working && current && (
            <div className="space-y-4">
              <PlanCard p={current} />
              {progress && (
                <Section title="So far this week" aside={`Day ${Math.min(progress.days_in, 7)} of 7`}>
                  <div className="space-y-4">
                    <Meter label="Everyday spending" value={progress.flexible_spent} limit={progress.allowance_so_far}
                      note={`Your limit so far is ${money(current.daily_limit)} × ${Math.min(progress.days_in, 7)} days.`} />
                    <Meter label={`${catInfo(current.focus_category).label} this week`} value={progress.focus_spent} limit={progress.focus_cap} />
                  </div>
                </Section>
              )}
            </div>
          )}
          {!draft && !working && !current && !isLoading && (
            <div className="rounded-3xl border border-dashed border-line p-8">
              <p className="font-display text-[1.3rem] font-bold">No plan for this week yet</p>
              <p className="mt-2 max-w-lg text-muted">It takes about ten seconds. You'll see each agent working on the right, and you can try again if the plan doesn't feel right.</p>
              <button onClick={generate} className="btn-primary mt-5"><CalendarDays size={18} /> Make this week's plan</button>
            </div>
          )}
        </div>

        <div className="space-y-6">
          {(working || timeline.length > 0) && (
            <Section title="Agents at work" aside={elapsed !== null ? `${elapsed.toFixed(1)}s` : working ? "working" : undefined}>
              <AgentTimeline items={timeline} />
            </Section>
          )}
          {data?.last_week && <CheckIn lp={data.last_week} />}
          {data && data.history.length > 0 && (
            <Section title="Past plans">
              <ul className="divide-y divide-line">
                {data.history.slice(0, 5).map((p) => (
                  <li key={p.week_start} className="num flex items-center justify-between gap-3 py-2.5 text-[0.92rem]">
                    <span>Week of {day(p.week_start)}</span>
                    <span className="text-muted">{money(p.daily_limit)}/day, {catInfo(p.focus_category).label.toLowerCase()} cap {money(p.focus_category_cap, true)}</span>
                  </li>
                ))}
              </ul>
            </Section>
          )}
        </div>
      </div>
    </div>
  );
}
