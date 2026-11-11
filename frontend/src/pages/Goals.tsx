import { useQuery } from "@tanstack/react-query";
import { CalendarDays, Target } from "lucide-react";
import { api } from "@/lib/api";
import { GoalMeter, Skeleton } from "@/components/Bits";
import InlineChat from "@/components/InlineChat";
import { day, money } from "@/lib/format";

export default function Goals() {
  const { data: s, isLoading } = useQuery({ queryKey: ["snapshot"], queryFn: api.snapshot });
  if (isLoading || !s) return <Skeleton className="h-64" />;
  const g = s.goal;
  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <header><p className="text-[0.85rem] font-semibold text-forest">SAVINGS GOAL</p><h1 className="mt-1 text-[2.2rem] font-extrabold">{g ? g.name : "Choose something to work toward"}</h1><p className="mt-2 max-w-2xl text-muted">{g ? "One active goal keeps the plan focused. Update it anytime in your own words." : "A goal is optional. If you add one, BudgetWise will calculate a starting pace and improve the plan as you share more."}</p></header>
      {g ? <section className="panel p-6"><GoalMeter g={g} /><div className="mt-5 grid gap-3 sm:grid-cols-3"><Stat label="Remaining" value={money(g.remaining)} /><Stat label="Weekly pace" value={money(g.needed_per_week)} /><Stat label="Deadline" value={day(g.deadline)} /></div><div className="mt-5 rounded-2xl bg-marigold-soft/50 p-4"><p className="font-semibold">Next useful step</p><p className="mt-1 text-[0.9rem] text-muted">{g.next_question || "Your goal has enough context for a personalized weekly plan."}</p></div></section> : <section className="rounded-2xl border border-dashed border-line p-6"><Target className="text-forest" /><p className="mt-3 font-display text-[1.2rem] font-bold">Try a simple sentence</p><p className="mt-1 text-muted">“I want to save $500 for a trip in two months.” A name is optional and can be changed later.</p></section>}
      <InlineChat placeholder={g ? "Try: ‘Rename my goal Orlando trip’ or ‘Change my goal deadline to March 1’" : "Try: ‘I want to save $500 in two months’"} />
      {g && <p className="flex items-center gap-2 text-[0.85rem] text-muted"><CalendarDays size={16} /> Current target: {money(g.needed_per_day)} a day until {day(g.deadline)}.</p>}
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) { return <div className="rounded-xl bg-sunken/65 p-3"><p className="text-[0.75rem] text-muted">{label}</p><p className="num mt-1 font-display text-[1.1rem] font-bold">{value}</p></div>; }
