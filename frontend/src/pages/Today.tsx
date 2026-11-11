import { Link } from "react-router-dom";
import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ArrowRight, CalendarDays, CheckCircle2, CircleDollarSign, ClipboardCheck, Info, Lightbulb, PlusCircle, Sparkles, Upload, WalletCards } from "lucide-react";
import { api } from "@/lib/api";
import { AskBox, BillList, GoalMeter, InsightList, Section, Skeleton } from "@/components/Bits";
import { CheckIns } from "@/components/Logging";
import Runway from "@/components/Runway";
import { day, longDay, money } from "@/lib/format";

const ACTIONS = [
  { to: "/ask", icon: PlusCircle, title: "Add money activity", text: "Log a purchase, bill, or income in seconds." },
  { to: "/accounts#upload", icon: Upload, title: "Import transactions", text: "Upload a statement from your bank." },
  { to: "/ask", icon: Sparkles, title: "Ask for advice", text: "Get personalized guidance for your situation." },
];

const PURPOSES = [
  "Know what I can safely spend",
  "Track everyday spending",
  "Cut back on extra spending",
  "Plan around changing income",
  "Save toward a goal",
  "Track everything",
];

function FirstWelcome({ name }: { name: string }) {
  const qc = useQueryClient();
  const [custom, setCustom] = useState("");
  const [busy, setBusy] = useState(false);
  const finish = async (use_case: string) => {
    if (busy) return;
    setBusy(true);
    await api.saveSettings({ onboarding_complete: true, use_case: use_case || "Flexible money help" });
    await qc.invalidateQueries();
    setBusy(false);
  };
  return (
    <div className="mx-auto max-w-3xl py-6 sm:py-12">
      <span className="chip bg-forest-soft text-forest"><Sparkles size={14} /> Welcome to BudgetWise</span>
      <h1 className="mt-5 text-[2.25rem] font-extrabold leading-tight sm:text-[3rem]">What would you like help with?</h1>
      <p className="mt-3 max-w-2xl text-[1.05rem] text-muted">Choose one if it helps, or skip it. You can tell BudgetWise anything about your money whenever you want and change this later.</p>
      <div className="mt-7 grid gap-3 sm:grid-cols-2">
        {PURPOSES.map((purpose) => <button key={purpose} disabled={busy} onClick={() => void finish(purpose)} className="panel flex items-center justify-between p-4 text-left font-semibold transition hover:border-forest/40 hover:bg-forest-soft/20">{purpose}<ArrowRight size={17} className="text-forest" /></button>)}
      </div>
      <form onSubmit={(e) => { e.preventDefault(); void finish(custom.trim()); }} className="mt-3 flex gap-2">
        <input className="field h-12" value={custom} onChange={(e) => setCustom(e.target.value)} placeholder="Or describe it in your own words…" aria-label="What you want help with" />
        <button disabled={busy || !custom.trim()} className="btn-primary shrink-0">Continue</button>
      </form>
      <button disabled={busy} onClick={() => void finish("")} className="btn-ghost mt-4">Skip for now</button>
      <p className="mt-8 text-[0.85rem] text-faint">This starts a blank personal workspace for {name}. Example profiles are available separately.</p>
    </div>
  );
}

function EmptyHome({ name, useCase }: { name: string; useCase: string | null }) {
  return (
    <div className="mx-auto max-w-4xl py-4 sm:py-8">
      <span className="chip bg-forest-soft text-forest"><Sparkles size={14} /> Your personal workspace</span>
      <h1 className="mt-5 text-[2.35rem] font-extrabold leading-tight sm:text-[3.25rem]">Start with anything you know.</h1>
      <p className="mt-3 max-w-2xl text-[1.05rem] text-muted">No forms are required, {name}. Tell BudgetWise one thing now and add the rest whenever you want. Estimates are okay, and you can correct or undo anything later.</p>
      {useCase && useCase !== "Flexible money help" && <p className="mt-4 inline-flex rounded-full bg-marigold-soft px-3 py-1.5 text-[0.85rem] font-medium">Your focus: {useCase}</p>}
      <div className="home-command mt-7"><Sparkles className="shrink-0 text-forest" size={23} /><div className="min-w-0 flex-1"><AskBox placeholder="Try: ‘I have about $500’ or ‘Yesterday I spent $40 on gas and groceries’" suggestions={[]} /></div></div>
      <p className="mt-2 text-[0.82rem] text-muted">You can add spending, income, bills, balances, goals, or simply ask a question.</p>
      <div className="mt-7 grid gap-3 sm:grid-cols-3">
        <Link to="/setup" className="panel p-5 transition hover:border-forest/40"><ClipboardCheck className="text-forest" /><h2 className="mt-3 font-bold">Answer a few prompts</h2><p className="mt-1 text-[0.88rem] text-muted">Optional questions, and every one can be skipped.</p></Link>
        <Link to="/accounts#upload" className="panel p-5 transition hover:border-forest/40"><Upload className="text-forest" /><h2 className="mt-3 font-bold">Import a bank CSV</h2><p className="mt-1 text-[0.88rem] text-muted">Use exact transactions when you're ready.</p></Link>
        <Link to="/accounts#examples" className="panel p-5 transition hover:border-forest/40"><Sparkles className="text-marigold" /><h2 className="mt-3 font-bold">View an example</h2><p className="mt-1 text-[0.88rem] text-muted">See a filled-in BudgetWise without mixing its data with yours.</p></Link>
      </div>
    </div>
  );
}

export default function Today() {
  const { data: s, isLoading, error } = useQuery({ queryKey: ["snapshot"], queryFn: api.snapshot });
  const { data: plans } = useQuery({ queryKey: ["plans"], queryFn: api.plans });
  if (error) return <p className="panel p-6 text-berry">Couldn't load your numbers: {(error as Error).message}. Is the server running?</p>;
  if (isLoading || !s) return <div className="space-y-6"><Skeleton className="h-24" /><Skeleton className="h-28" /><Skeleton className="h-44" /></div>;
  if (s.setup_needed) return <FirstWelcome name={s.account.name} />;
  if (s.account.kind === "personal" && !s.balance_info.as_of && !s.told.length && s.estimates.count === 0) return <EmptyHome name={s.account.name} useCase={s.use_case} />;

  const plan = plans?.current;
  const safeToday = Math.max(s.left_today, 0);
  const insight = s.insights[0]?.detail || `You can spend about ${money(safeToday, true)} today and still keep your upcoming bills and cushion covered.`;
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "morning" : hour < 18 ? "afternoon" : "evening";

  return (
    <div className="mx-auto max-w-[1280px] space-y-6">
      {s.data_is_old && <div className="flex items-start gap-3 rounded-2xl bg-marigold-soft px-4 py-3 text-[0.92rem]"><Info size={18} className="mt-0.5 shrink-0 text-marigold" /><span>Your uploaded file ends on {day(s.as_of)}. Upload a newer statement for today's picture.</span></div>}

      <header className="pt-1">
        <div className="flex items-center gap-2.5 font-display text-[1.2rem] font-bold"><span className="text-marigold">☀</span> Good {greeting}, {s.account.name}</div>
        <h1 className="mt-2 text-[2.25rem] font-extrabold leading-[1.05] tracking-[-0.035em] sm:text-[3.15rem]">Let's make your money feel simpler<span className="text-marigold">.</span></h1>
      </header>

      <div className="home-command"><Sparkles className="shrink-0 text-forest" size={23} /><div className="min-w-0 flex-1"><AskBox placeholder="Tell me anything — ‘I spent about $40 on groceries’" suggestions={[]} /></div></div>

      <div className="grid gap-3 md:grid-cols-3">
        {ACTIONS.map(({ to, icon: Icon, title, text }) => <Link key={title} to={to} className="group panel flex min-h-[108px] items-start gap-4 p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-forest/35 hover:shadow-lift"><Icon size={27} className="mt-0.5 shrink-0 text-forest" /><div className="min-w-0 flex-1"><h2 className="text-[1.05rem] font-bold">{title}</h2><p className="mt-1 text-[0.9rem] leading-snug text-muted">{text}</p></div><ArrowRight size={18} className="mt-2 text-faint transition group-hover:translate-x-0.5 group-hover:text-forest" /></Link>)}
      </div>

      <section className="setup-banner">
        <div className="flex items-center gap-4"><span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-surface text-forest"><ClipboardCheck size={27} /></span><div><h2 className="text-[1.2rem] font-bold">Get your plan in 3 minutes</h2><p className="text-[0.88rem] text-muted">A quick setup helps BudgetWise give you the right numbers, even with an irregular income.</p></div></div>
        <div className="hidden items-center gap-2 xl:flex" aria-label="Setup progress">{["Current balance", "Income & bills", "Your goal"].map((label, i) => <div key={label} className="flex items-center gap-2">{i > 0 && <span className="h-px w-7 bg-line" />}<span className="flex flex-col items-center text-center text-[0.75rem] font-medium leading-tight"><span className={`mb-1 grid h-7 w-7 place-items-center rounded-full border ${i === 0 ? "border-forest bg-forest text-white" : "border-line bg-surface"}`}>{i + 1}</span>{label}</span></div>)}</div>
        <Link to="/setup" className="btn bg-marigold px-6 text-ink hover:bg-marigold/90">{s.setup_needed ? "Start setup" : "Review setup"}</Link>
      </section>

      <div className="grid gap-4 lg:grid-cols-[1.7fr_1fr]">
        <section className="panel p-5 sm:p-6"><div className="grid gap-5 sm:grid-cols-[1.1fr_1fr] sm:divide-x sm:divide-line"><div><div className="flex items-center gap-2 font-display text-[1.05rem] font-bold"><WalletCards size={22} className="text-forest" /> Safe to spend</div><div className="num mt-2 font-display text-[3.6rem] font-extrabold leading-none tracking-[-0.045em] text-forest">{money(safeToday, true)}<span className="ml-2 text-[1.5rem] tracking-tight text-ink">today</span></div><p className="mt-3 text-[0.88rem] text-muted">That keeps you on track until your next payday.</p></div><div className="space-y-3 sm:pl-6"><Summary icon={CalendarDays} label="Next payday" value={`${day(s.next_payday)} (${s.days_until_payday} ${s.days_until_payday === 1 ? "day" : "days"})`} /><Summary icon={CircleDollarSign} label="Safe until payday" value={money(s.safe_to_spend_total)} /><Summary icon={CheckCircle2} label={`${s.days_until_payday}-day runway`} value={s.status === "green" ? "On track" : s.status === "amber" ? "Go easy" : "Hold off"} /></div></div></section>
        <section className="rounded-2xl border border-marigold/25 bg-marigold-soft/45 p-5 sm:p-6"><div className="flex items-center gap-2 font-display text-[1.05rem] font-bold"><Lightbulb size={22} className="text-marigold" /> AI insight</div><p className="mt-4 num leading-relaxed">{insight}</p><Link to="/ask" className="mt-4 inline-flex items-center gap-1.5 text-[0.88rem] font-semibold text-forest hover:underline">Ask a follow-up <ArrowRight size={15} /></Link></section>
      </div>

      <details className="group panel overflow-hidden"><summary className="cursor-pointer list-none p-5 font-display text-[1.05rem] font-bold">Keep today accurate <span className="float-right text-muted group-open:hidden">+</span></summary><div className="border-t border-line p-5"><CheckIns s={s} /></div></details>
      <details className="group panel overflow-hidden"><summary className="cursor-pointer list-none p-5 font-display text-[1.05rem] font-bold">See your full money picture <span className="float-right text-muted group-open:hidden">+</span></summary><div className="space-y-6 border-t border-line p-5"><Runway s={s} /><div className="grid gap-6 md:grid-cols-2"><Section title="Coming up"><BillList bills={s.upcoming_bills} limit={4} /></Section><Section title="This week's plan">{plan ? <p className="num">Spend up to <strong>{money(plan.daily_limit)}</strong> a day and keep {plan.focus_label?.toLowerCase()} under <strong>{money(plan.focus_category_cap)}</strong>.</p> : <Link to="/plan?new=1" className="btn-primary"><CalendarDays size={18} /> Make a plan</Link>}</Section></div>{s.insights.length > 0 && <Section title="Worth knowing"><InsightList items={s.insights} /></Section>}{s.goal && <Section title="Savings goal"><GoalMeter g={s.goal} /></Section>}<p className="text-[0.8rem] text-faint">Numbers updated {longDay(s.as_of)}.</p></div></details>
    </div>
  );
}

function Summary({ icon: Icon, label, value }: { icon: typeof CalendarDays; label: string; value: string }) {
  return <div className="flex items-start gap-3"><Icon size={19} className="mt-0.5 shrink-0 text-forest" /><div><p className="text-[0.78rem] text-muted">{label}</p><p className="num font-semibold leading-tight">{value}</p></div></div>;
}
