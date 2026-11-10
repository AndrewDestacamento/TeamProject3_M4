import { BadgeCheck, BookOpen, Calculator, CalendarDays, Check, GitFork, Loader2, LineChart, RotateCcw, ShieldAlert, ShieldCheck, Shield, Wrench, X, type LucideIcon } from "lucide-react";
import type { TimelineItem } from "@/lib/chat";
import { cn } from "@/lib/format";

const WHO: Record<string, { icon: LucideIcon; role: string }> = {
  Guardrail: { icon: Shield, role: "Safety check" },
  Router: { icon: GitFork, role: "Router" },
  Analyst: { icon: LineChart, role: "Analyst agent" },
  Planner: { icon: CalendarDays, role: "Planner agent" },
  Critic: { icon: BadgeCheck, role: "Critic agent" },
  Knowledge: { icon: BookOpen, role: "Guide library" },
  "Money engine": { icon: Calculator, role: "Money engine" },
  Grounding: { icon: ShieldCheck, role: "Number check" },
};

function StatusIcon({ status }: { status: string }) {
  if (status === "running") return <Loader2 size={14} className="animate-spin text-forest" />;
  if (status === "error" || status === "fail" || status === "blocked") return <X size={14} className="text-berry" />;
  if (status === "revise" || status === "retry") return <RotateCcw size={14} className="text-marigold" />;
  return <Check size={14} className="text-forest" />;
}

/** Shows which agent did what, live: the multi-agent system made visible. */
export default function AgentTimeline({ items, className = "" }: { items: TimelineItem[]; className?: string }) {
  if (!items.length) return null;
  return (
    <ol className={cn("relative space-y-2 border-l-2 border-line pl-4", className)}>
      {items.map((t) => {
        const who = t.kind === "tool" ? { icon: Wrench, role: `${t.who} used a tool` } : WHO[t.who] ?? { icon: ShieldAlert, role: t.who };
        const Icon = who.icon;
        return (
          <li key={t.key} className="relative animate-rise">
            <span className={cn("absolute -left-[27px] top-0.5 grid h-5 w-5 place-items-center rounded-full border-2 bg-surface",
              t.status === "running" ? "border-forest" : "border-line")}>
              <StatusIcon status={t.status} />
            </span>
            <div className="flex items-start gap-2 text-[0.85rem]">
              <Icon size={15} className="mt-[3px] shrink-0 text-muted" />
              <p className="leading-snug">
                <span className="font-semibold text-ink">{who.role}</span>
                <span className="num text-muted">{t.label ? `: ${t.label}` : ""}</span>
              </p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
