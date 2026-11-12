import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import ReactMarkdown from "react-markdown";
import { ArrowUpRight, CalendarDays, Check, Coins, Loader2, Send, Target, Upload, Wallet } from "lucide-react";
import { api, type Snapshot } from "@/lib/api";
import { useChat } from "@/lib/chat";
import { Skeleton } from "@/components/Bits";
import { day, money } from "@/lib/format";

function Avatar() {
  return <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-forest text-white"><ArrowUpRight size={23} /></span>;
}

export function GoalSummary({ s }: { s: Snapshot }) {
  const g = s.goal;
  const qc = useQueryClient();
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const save = async (form: HTMLFormElement) => {
    const data = new FormData(form);
    setSaving(true); setError("");
    try {
      await api.saveSettings({ goal: { name: data.get("name"), target: Number(data.get("target")), deadline: data.get("deadline"), saved: Number(data.get("saved") || 0), saved_known: data.get("saved") !== "" } });
      await qc.invalidateQueries(); setEditing(false);
    } catch (e) { setError((e as Error).message); }
    finally { setSaving(false); }
  };
  return <section className="panel border-t-[3px] border-t-forest p-5 shadow-sm sm:p-6">
    <div className="flex items-center justify-between gap-3"><h2 className="text-[1.4rem] font-bold">Your next milestone</h2>{g && <button onClick={() => setEditing(!editing)} className="text-sm font-semibold text-forest underline">{editing ? "Cancel" : "Edit"}</button>}</div>
    {editing && g ? <form onSubmit={(e) => { e.preventDefault(); void save(e.currentTarget); }} className="mt-4 space-y-3">
      <label className="block text-sm">Goal name<input name="name" className="field mt-1" defaultValue={g.name} required maxLength={40} /></label>
      <label className="block text-sm">Target amount ($)<input name="target" type="number" min="0.01" step="0.01" className="field mt-1" defaultValue={g.target} required /></label>
      <label className="block text-sm">Deadline<input name="deadline" type="date" min={s.as_of} className="field mt-1" defaultValue={g.deadline} required /></label>
      <label className="block text-sm">Already set aside ($)<input name="saved" type="number" min="0" step="0.01" className="field mt-1" defaultValue={g.saved_known ? g.saved : ""} placeholder="Leave blank if unknown" /></label>
      {error && <p role="alert" className="text-sm text-berry">{error}</p>}<button disabled={saving} className="btn-primary w-full">{saving ? "Saving…" : "Save changes"}</button>
    </form> : g ? <div className="mt-4">
      <p className="text-sm text-muted">{g.name}</p>
      <p className="num mt-2 font-display text-[2.3rem] font-bold leading-tight text-forest">{g.saved_known ? money(g.saved, true) : "—"} <span className="text-[1.3rem]">of {money(g.target, true)}</span></p>
      {!g.saved_known && <p className="mt-1 text-sm text-muted">Amount already set aside hasn’t been added.</p>}
      <div className="mt-5 h-2 overflow-hidden rounded-full bg-line/65" role="progressbar" aria-label="Goal savings" aria-valuemin={0} aria-valuemax={100} aria-valuenow={g.saved_known ? Math.min(g.percent, 100) : 0}><div className="h-full rounded-full bg-forest" style={{ width: `${g.saved_known ? Math.min(g.percent, 100) : 0}%` }} /></div>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-sm"><span className="flex items-center gap-2"><CalendarDays size={17} className="text-forest" /> By {day(g.deadline)}</span><span className="flex items-center gap-2 font-semibold"><Coins size={17} className="text-forest" />{money(g.pace_amount)} / {g.pace_unit}</span></div>
      <div className="mt-5 border-t border-line pt-4"><span className="rounded-full bg-marigold-soft px-2.5 py-1 text-xs font-semibold">{g.remaining === 0 ? "Goal reached" : g.days_remaining === 0 ? "Deadline reached" : "Starter pace"}</span><p className="mt-3 text-sm leading-relaxed text-muted">{g.remaining === 0 ? "You’ve recorded enough savings for this goal. Edit it when you’re ready for your next one." : g.days_remaining === 0 ? "There’s still money to set aside. Edit your deadline to choose a new pace." : !g.saved_known ? "This pace assumes you’re starting from zero. Add what you’ve saved to update it." : "This is a saving target, not a spending allowance. Add income and bills to check what fits."}</p></div>
    </div> : <div className="py-5"><Target size={28} className="text-forest" /><h3 className="mt-3 text-lg font-semibold">What are you working toward?</h3><p className="mt-2 text-sm leading-relaxed text-muted">A trip, a little breathing room, or something else. Tell me an amount and a date, and your goal will appear here.</p><p className="mt-3 text-sm text-muted">Goals are optional. You can just track your spending.</p></div>}
  </section>;
}

export default function Today() {
  const { data: s, error } = useQuery({ queryKey: ["snapshot"], queryFn: api.snapshot });
  const { data: guide } = useQuery({ queryKey: ["conversation", s?.account.id], queryFn: api.conversation, enabled: !!s });
  const { messages, busy, send } = useChat();
  const qc = useQueryClient();
  const [draft, setDraft] = useState("");
  const [dateOpen, setDateOpen] = useState(false);
  const [undoError, setUndoError] = useState("");
  const [undone, setUndone] = useState<string[]>([]);
  const scroller = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLInputElement>(null);
  useEffect(() => { scroller.current?.scrollTo({ top: scroller.current.scrollHeight, behavior: "smooth" }); }, [messages, guide?.question]);
  const submit = (text: string) => { if (!text.trim() || busy) return; setDraft(""); setDateOpen(false); void send(text); };
  const undo = async (batch: string) => {
    try { await api.undo(batch); setUndone((old) => [...old, batch]); await qc.invalidateQueries(); }
    catch (e) { setUndoError((e as Error).message); }
  };
  if (error) return <p role="alert" className="panel p-6">Couldn’t load your workspace. Please refresh to try again.</p>;
  if (!s) return <Skeleton className="h-96" />;
  const g = s.goal;
  return <div className="grid gap-7 lg:grid-cols-[minmax(0,1.65fr)_minmax(310px,1fr)] xl:gap-10">
    <section className="flex min-w-0 flex-col lg:h-[calc(100dvh-148px)] lg:min-h-[570px]">
      <header className="pb-6"><h1 className="text-[2.25rem] font-extrabold leading-tight tracking-tight sm:text-[2.8rem]">Hi, I’m BudgetWise.</h1><p className="mt-1 text-lg sm:text-xl">Let’s reach your goals, one step at a time.</p><p className="mt-3 text-sm text-muted">Your AI budgeting assistant</p></header>
      <div ref={scroller} className="min-h-[240px] flex-1 space-y-5 overflow-y-auto overscroll-contain py-2 pr-2" aria-live="polite" aria-label="Conversation">
        {messages.length === 0 && <div className="flex items-start gap-3"><Avatar /><div className="max-w-xl"><p className="leading-relaxed">I can help you save for something, understand your spending, and keep track of bills and income. Start with anything you know.</p><p className="mt-2 text-sm text-muted">You can skip questions and add or correct details anytime.</p><div className="mt-4 flex flex-wrap gap-2"><button className="btn-primary text-sm" onClick={() => submit("Save for something")}>Save for something</button><button className="btn-quiet text-sm" onClick={() => submit("Track spending")}>Track spending</button><button className="btn-ghost text-sm" onClick={() => submit("What can you do?")}>What can you do?</button></div></div></div>}
        {messages.map((m) => m.role === "user" ? <div key={m.id} className="flex justify-end pl-10"><p className="max-w-[85%] rounded-2xl rounded-br-md bg-forest px-4 py-3 text-white">{m.text}</p></div> : <div key={m.id} className="flex items-start gap-3"><Avatar /><div className="min-w-0 max-w-[90%]">
          <div className="prose-chat rounded-2xl bg-sunken px-4 py-3 text-[0.96rem] leading-relaxed">{m.pending && !m.text ? <span className="flex items-center gap-2 text-muted"><Loader2 size={16} className="animate-spin" /> Working on your message…</span> : <ReactMarkdown>{m.text}</ReactMarkdown>}</div>
          {m.saved?.count ? <div className="mt-2 flex items-center gap-3 text-xs text-muted"><span className="flex items-center gap-1"><Check size={13} />{undone.includes(m.saved.batch_id) ? "Undone" : "Saved to your workspace"}</span><button disabled={busy || undone.includes(m.saved.batch_id)} onClick={() => void undo(m.saved!.batch_id)} className="font-semibold text-forest underline disabled:opacity-40">Undo</button><button disabled={busy} onClick={() => { setDraft("Actually, "); input.current?.focus(); }} className="font-semibold text-forest underline">Correct</button></div> : null}
          {m.error && <p role="alert" className="mt-2 text-sm text-berry">{m.error} Check your saved information before trying again.</p>}
        </div></div>)}
        {!busy && guide?.question && <div className="flex items-start gap-3 pt-2"><Avatar /><div className="min-w-0 flex-1"><p className="rounded-2xl bg-forest-soft px-4 py-3 font-semibold">{guide.question}</p><div className="mt-3 flex flex-wrap gap-2">
          {guide.question_key === "payday" && <button className="btn-primary text-sm" onClick={() => setDateOpen(!dateOpen)}><CalendarDays size={16} /> Choose a date</button>}
          {guide.choices.map((c) => <button key={c} className="btn border border-line bg-surface px-3 py-2 text-sm" onClick={() => submit(c)}>{c}</button>)}
        </div>{dateOpen && <label className="mt-3 block text-sm">Next payday<input aria-label="Next payday" type="date" min={s.as_of} className="field mt-1 max-w-xs" onChange={(e) => { if (e.target.value) submit(e.target.value); }} /></label>}</div></div>}
      </div>
      <div className="mt-5 bg-canvas pt-2"><form onSubmit={(e) => { e.preventDefault(); submit(draft); }} className="flex items-center gap-3 rounded-2xl border border-line bg-surface p-2 shadow-sm"><Link to="/accounts#upload" aria-label="Import transactions" className="border-r border-line px-3 py-2 text-forest"><Upload size={22} /></Link><input ref={input} aria-label="Message BudgetWise" className="min-w-0 flex-1 bg-transparent py-3 text-base outline-none" placeholder="Tell me anything, or ask a question…" value={draft} maxLength={1000} onChange={(e) => setDraft(e.target.value)} /><button disabled={busy || !draft.trim()} className="btn-primary px-3" aria-label="Send message">{busy ? <Loader2 size={19} className="animate-spin" /> : <Send size={19} />}</button></form><p className="mt-2 text-xs text-muted">Add spending, income or bills anytime. Estimates are welcome. <button onClick={() => submit("Privacy")} className="underline">About privacy</button></p>{undoError && <p role="alert" className="text-sm text-berry">{undoError}</p>}</div>
    </section>
    <aside className="min-w-0 space-y-4 rounded-3xl bg-sunken/60 p-3 lg:max-h-[calc(100dvh-148px)] lg:overflow-y-auto lg:p-5">
      <GoalSummary s={s} />
      <section className="panel p-5 shadow-sm sm:p-6"><h2 className="text-[1.4rem] font-bold">What you’ve shared</h2><dl className="mt-3 divide-y divide-line text-sm">
        <Fact icon={Target} name="Goal" value={g ? `${money(g.target, true)} by ${day(g.deadline)}` : "Not added"} />
        <Fact icon={Coins} name="Set aside" value={g?.saved_known ? money(g.saved) : "Not added"} />
        <Fact icon={Wallet} name="Balance" value={!s.readiness.missing.includes("balance") ? money(s.balance) : "Not added"} />
        <Fact icon={CalendarDays} name="Next payday" value={s.readiness.payday_known ? day(s.next_payday) : "Not added"} />
      </dl><Link to="/accounts#upload" className="mt-4 flex items-center gap-2 border-t border-line pt-4 font-semibold text-forest"><Upload size={18} /> Import transactions</Link></section>
      {s.insights.length > 0 && <section className="panel p-5"><h2 className="font-bold">From your activity</h2><p className="mt-2 text-sm leading-relaxed text-muted">{s.insights[0].detail}</p><Link to="/spending" className="mt-3 inline-block text-sm font-semibold text-forest">Review activity →</Link></section>}
      <p className="px-2 text-xs leading-relaxed text-muted">Share only what you choose. Your plan becomes more useful as you add information.</p>
    </aside>
  </div>;
}

function Fact({ icon: Icon, name, value }: { icon: typeof Target; name: string; value: string }) {
  return <div className="flex items-start gap-3 py-3.5"><Icon size={19} className="shrink-0 text-forest" /><dt className="font-semibold">{name}:</dt><dd className="min-w-0">{value}</dd></div>;
}
