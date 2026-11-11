import { Link } from "react-router-dom";
import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ArrowRight, CalendarDays, CheckCircle2, CircleDollarSign, ClipboardCheck, Info, Lightbulb, PlusCircle, Sparkles, Upload, WalletCards } from "lucide-react";
import { api, type Plan, type Snapshot } from "@/lib/api";
import { BillList, GoalMeter, InsightList, Section, Skeleton } from "@/components/Bits";
import { CheckIns } from "@/components/Logging";
import Runway from "@/components/Runway";
import InlineChat from "@/components/InlineChat";
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

function EmptyHome({ s }: { s: Snapshot }) {
  const tracked = s.spending_last_30_days.reduce((sum, row) => sum + row.amount, 0);
  const started = tracked > 0 || s.told.length > 0;
  return (
    <div className="mx-auto max-w-4xl py-4 sm:py-8">
      <span className="chip bg-forest-soft text-forest"><Sparkles size={14} /> Your personal workspace</span>
      <h1 className="mt-5 text-[2.35rem] font-extrabold leading-tight sm:text-[3.25rem]">{started ? "Your update is saved. Add context when you're ready." : "Start with anything you know."}</h1>
      <p className="mt-3 max-w-2xl text-[1.05rem] text-muted">{started ? <>BudgetWise is tracking what you share{s.spending_last_30_days.length ? <>—including {money(tracked)} of recent spending</> : null}. To calculate what is safe to spend, it needs your current balance next.</> : <>No forms are required, {s.account.name}. Tell BudgetWise one thing now and add the rest whenever you want.</>}</p>
      {s.use_case && s.use_case !== "Flexible money help" && <p className="mt-4 inline-flex rounded-full bg-marigold-soft px-3 py-1.5 text-[0.85rem] font-medium">Your focus: {s.use_case}</p>}
      <div className="mt-7"><InlineChat placeholder={started ? "Try: ‘I have about $500 in checking’" : "Try: ‘I want to save $500 for a trip in two months’"} /></div>
      <p className="mt-2 text-[0.82rem] text-muted">Share only what you're comfortable sharing. Estimates are fine, every question is optional, and you can correct or undo anything later.</p>
      <div className="mt-7 grid gap-3 sm:grid-cols-3">
        <Link to="/ask" className="panel p-5 transition hover:border-forest/40"><CircleDollarSign className="text-forest" /><h2 className="mt-3 font-bold">Add current balance</h2><p className="mt-1 text-[0.88rem] text-muted">An estimate is enough to start useful calculations.</p></Link>
        <Link to="/accounts#upload" className="panel p-5 transition hover:border-forest/40"><Upload className="text-forest" /><h2 className="mt-3 font-bold">Import a bank CSV</h2><p className="mt-1 text-[0.88rem] text-muted">Use exact transactions when you're ready.</p></Link>
        <Link to="/ask" className="panel p-5 transition hover:border-forest/40"><Sparkles className="text-marigold" /><h2 className="mt-3 font-bold">Set a savings goal</h2><p className="mt-1 text-[0.88rem] text-muted">Get a starter daily and weekly target immediately.</p></Link>
      </div>
      <div className="mt-4 flex flex-wrap gap-3 text-[0.85rem]"><Link to="/setup" className="text-forest hover:underline">Answer optional prompts</Link><span className="text-line">·</span><Link to="/accounts#examples" className="text-forest hover:underline">View a separate example</Link></div>
    </div>
  );
}

function GoalHome({ s, plan }: { s: Snapshot; plan: Plan | null | undefined }) {
  const g = s.goal!;
  const insights = s.balance_info.as_of ? s.insights : s.insights.filter((i) => !["short", "low_balance", "held_back", "goal_pace", "goal_ok"].includes(i.id));
  const incomeText = s.income.pay_every_days ? `About every ${s.income.pay_every_days} days` : s.income.sources.length ? "Income history found" : "Not added yet";
  const billText = s.upcoming_bills.length ? `${s.upcoming_bills.length} upcoming` : "Not added yet";
  const historyText = s.spending_last_30_days.length ? `${s.spending_last_30_days.length} categories tracked` : "Keep logging or import a CSV";
  return (
    <div className="mx-auto max-w-[1180px] space-y-5">
      <header className="flex flex-wrap items-end justify-between gap-4 pt-1">
        <div><span className="chip bg-forest-soft text-forest"><Sparkles size={14} /> {g.plan_level === "starter" ? "Starter target" : g.plan_level === "estimated" ? "Estimated plan" : "Personalized plan"}</span><h1 className="mt-3 text-[2.15rem] font-extrabold leading-tight sm:text-[2.8rem]">{g.name}</h1><p className="mt-1 text-muted">Your active savings goal · due {day(g.deadline)}</p></div>
        <Link to="/goals" className="btn-quiet">Edit goal</Link>
      </header>

      <section className="panel overflow-hidden p-5 sm:p-7">
        <div className="grid gap-6 lg:grid-cols-[1.35fr_1fr] lg:divide-x lg:divide-line">
          <div className="lg:pr-7">
            <div className="flex items-end justify-between gap-4"><div><p className="text-[0.85rem] text-muted">Saved so far</p><p className="num font-display text-[2.7rem] font-extrabold leading-none text-forest">{money(g.saved, true)} <span className="text-[1rem] font-semibold text-muted">of {money(g.target, true)}</span></p></div><p className="num text-[0.9rem] font-semibold">{g.percent}%</p></div>
            <div className="mt-4 h-3 overflow-hidden rounded-full bg-sunken" role="progressbar" aria-valuenow={g.percent} aria-valuemin={0} aria-valuemax={100}><div className="h-full rounded-full bg-forest" style={{ width: `${Math.min(g.percent, 100)}%` }} /></div>
            <p className="mt-3 text-[0.88rem] text-muted">{money(g.remaining)} remaining · {g.weeks_left} weeks left</p>
          </div>
          <div className="grid grid-cols-3 gap-3 lg:pl-7">
            <Pace label="Each day" value={money(g.needed_per_day)} />
            <Pace label="Each week" value={money(g.needed_per_week)} />
            <Pace label="Each month" value={money(g.needed_per_month)} />
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-marigold/30 bg-marigold-soft/45 p-5 sm:p-6">
        <div className="flex items-start gap-3"><Lightbulb className="mt-0.5 shrink-0 text-marigold" /><div className="min-w-0 flex-1"><p className="font-display text-[1.15rem] font-bold">Your next useful step</p><p className="mt-1 text-[1rem]">{g.next_question || "I have enough information to help you build this week's plan."}</p><p className="mt-2 text-[0.84rem] text-muted">Answer below, import transactions, or skip it and add information later.</p></div></div>
      </section>

      <InlineChat placeholder={g.next_question || "Tell BudgetWise what changed…"} />
      <p className="-mt-3 text-[0.8rem] text-muted">Share only what you're comfortable sharing. Estimates are fine, and every saved change can be corrected or undone.</p>

      <div className="grid gap-4 md:grid-cols-2">
        <section className="panel p-5 sm:p-6"><h2 className="text-[1.1rem] font-bold">What BudgetWise knows</h2><dl className="mt-4 divide-y divide-line text-[0.9rem]"><Known label="Current balance" value={s.balance_info.as_of ? money(s.balance) : "Not added yet"} /><Known label="Income" value={incomeText} /><Known label="Bills" value={billText} /><Known label="Spending history" value={historyText} /></dl><div className="mt-4 flex flex-wrap gap-2"><Link to="/setup" className="btn-quiet text-[0.85rem]">Add details</Link><Link to="/accounts#upload" className="btn-ghost text-[0.85rem]"><Upload size={16} /> Import CSV</Link></div></section>
        <section className="panel p-5 sm:p-6"><h2 className="text-[1.1rem] font-bold">This week's direction</h2>{plan ? <div className="mt-3"><p className="font-semibold">{plan.headline}</p><p className="mt-2 text-[0.9rem] text-muted">{plan.today_action}</p><Link to="/plan" className="btn-primary mt-4 text-[0.85rem]">Open your plan</Link></div> : s.balance_info.as_of && (s.income.sources.length || s.income.pay_every_days) ? <div className="mt-3"><p className="text-[0.9rem] text-muted">BudgetWise can now turn your goal into a weekly spending and saving plan.</p><Link to="/plan?new=1" className="btn-primary mt-4 text-[0.85rem]"><CalendarDays size={17} /> Build my plan</Link></div> : <div className="mt-3"><p className="text-[0.9rem] text-muted">Your {money(g.needed_per_week)} weekly target is a starting pace. Add your balance and income before BudgetWise recommends spending limits.</p><Link to="/setup" className="btn-quiet mt-4 text-[0.85rem]">Personalize this target</Link></div>}</section>
      </div>

      {insights.length > 0 && <Section title="Opportunities from your data"><InsightList items={insights.slice(0, 3)} /></Section>}
    </div>
  );
}

function Pace({ label, value }: { label: string; value: string }) { return <div className="rounded-xl bg-sunken/65 p-3 text-center"><p className="text-[0.75rem] text-muted">{label}</p><p className="num mt-1 font-display text-[1.15rem] font-bold">{value}</p></div>; }
function Known({ label, value }: { label: string; value: string }) { return <div className="flex items-center justify-between gap-4 py-2.5"><dt className="text-muted">{label}</dt><dd className="text-right font-medium">{value}</dd></div>; }

export default function Today() {
  const { data: s, isLoading, error } = useQuery({ queryKey: ["snapshot"], queryFn: api.snapshot });
  const { data: plans } = useQuery({ queryKey: ["plans"], queryFn: api.plans });
  if (error) return <p className="panel p-6 text-berry">Couldn't load your numbers: {(error as Error).message}. Is the server running?</p>;
  if (isLoading || !s) return <div className="space-y-6"><Skeleton className="h-24" /><Skeleton className="h-28" /><Skeleton className="h-44" /></div>;
  if (s.setup_needed) return <FirstWelcome name={s.account.name} />;
  if (s.account.kind === "personal" && !s.goal && !s.balance_info.as_of) return <EmptyHome s={s} />;

  const plan = plans?.current;
  if (s.goal) return <GoalHome s={s} plan={plan} />;
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

      <InlineChat placeholder="Tell me anything — ‘I spent about $40 on groceries’" />

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
