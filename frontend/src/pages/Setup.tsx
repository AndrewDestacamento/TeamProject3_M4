import { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { api } from "@/lib/api";
import { useChat } from "@/lib/chat";
import { logText, type LogResult } from "@/lib/log";
import { SavedCard } from "@/components/Cards";
import { Logo } from "@/components/Layout";
import { cn } from "@/lib/format";

// Setup without a bank file: five plain questions, answered in your own words.
// Each answer goes to the Bookkeeper agent, which saves it (and asks back if something is missing).
const STEPS = [
  { q: "How much money is in your checking account right now?", ex: "About $410",
    hint: "Setup question: the user's current account balance" },
  { q: "How do you get paid?", ex: "Every 2 weeks, around $600 but it changes. Next payday is Friday.",
    hint: "Setup question: the user's pay schedule (how often, about how much, next payday)" },
  { q: "What bills do you pay?", ex: "Rent $725 on the 1st, phone $45 on the 12th, Spotify $11.99 on the 20th",
    hint: "Setup question: list of recurring bills; save each one with set_bill" },
  { q: "About how much do you spend on everyday things in a normal week?", ex: "Food, gas, going out. Maybe $150",
    hint: "Setup question: typical weekly everyday spending; use set_typical_weekly_spending" },
  { q: "Are you saving for anything?", ex: "A laptop, $1,200 by March. I have $200 so far.",
    hint: "Setup question: a savings goal (optional)" },
];

interface Turn { step: number; answer: string; result: LogResult }

export default function Setup() {
  const nav = useNavigate();
  const qc = useQueryClient();
  const [params] = useSearchParams();
  const { reset } = useChat();
  const { data: accounts } = useQuery({ queryKey: ["accounts"], queryFn: api.accounts });
  const active = accounts?.accounts.find((a) => a.id === accounts.active);
  const needsAccount = params.get("new") === "1" || active?.kind === "demo";
  const [name, setName] = useState("My money");
  const [created, setCreated] = useState(false);
  const [step, setStep] = useState(0);
  const [turns, setTurns] = useState<Turn[]>([]);
  const [answer, setAnswer] = useState("");
  const [busy, setBusy] = useState(false);
  const end = useRef<HTMLDivElement>(null);
  useEffect(() => { end.current?.scrollIntoView({ behavior: "smooth", block: "end" }); }, [turns, step]);

  const start = async () => {
    await api.newAccount(name.trim() || "My money");
    reset();
    await qc.invalidateQueries();
    setCreated(true);
  };

  const send = async () => {
    const text = answer.trim();
    if (!text || busy) return;
    setBusy(true);
    const r = await logText(text, { contextHint: STEPS[step].hint });
    setBusy(false);
    setTurns((t) => [...t, { step, answer: text, result: r }]);
    setAnswer("");
    if (r.saved) setStep((s) => s + 1);  // a follow-up question keeps us on the same step
    await qc.invalidateQueries();
  };
  const skip = () => setStep((s) => s + 1);
  const finished = step >= STEPS.length;

  if (needsAccount && !created) {
    return (
      <div className="mx-auto max-w-xl space-y-6 pt-4">
        <Logo />
        <div>
          <h1 className="text-[2rem] font-bold leading-tight">Start without a bank file</h1>
          <p className="mt-2 text-muted">Answer five quick questions in your own words. You can add a bank CSV later for exact numbers, and anything you tell BudgetWise is kept.</p>
        </div>
        <label className="block">
          <span className="mb-1.5 block font-medium">What should we call this account?</span>
          <input className="field" value={name} onChange={(e) => setName(e.target.value)} maxLength={40} autoFocus />
        </label>
        <button onClick={start} className="btn-primary">Start setup <ArrowRight size={18} /></button>
      </div>
    );
  }

  return (
    <div className="mx-auto flex min-h-[calc(100vh-11rem)] max-w-2xl flex-col lg:min-h-[calc(100vh-5rem)]">
      <div>
        <h1 className="text-[1.9rem] font-bold leading-tight">Set up {active?.name ?? "your account"}</h1>
        <div className="mt-3 flex gap-1.5" aria-label={`Question ${Math.min(step + 1, STEPS.length)} of ${STEPS.length}`}>
          {STEPS.map((_, i) => (
            <span key={i} className={cn("h-1.5 flex-1 rounded-full", i < step ? "bg-forest" : i === step ? "bg-forest/40" : "bg-sunken")} />
          ))}
        </div>
      </div>

      <div className="flex-1 space-y-6 py-8">
        {turns.map((t, i) => (
          <div key={i} className="space-y-3">
            <p className="font-display text-[1.1rem] font-bold">{STEPS[t.step].q}</p>
            <div className="flex justify-end"><p className="max-w-[85%] rounded-2xl rounded-br-md bg-forest px-4 py-2.5 text-white dark:text-canvas">{t.answer}</p></div>
            {t.result.text && <p className="num text-muted">{t.result.text.replace(/\*\*/g, "")}</p>}
            {t.result.saved && <SavedCard s={t.result.saved} compact />}
          </div>
        ))}

        {!finished ? (
          <div className="space-y-3 animate-rise" key={step}>
            {!turns.some((t) => t.step === step) && <p className="font-display text-[1.25rem] font-bold">{STEPS[step].q}</p>}
            <p className="text-[0.9rem] text-muted">For example: “{STEPS[step].ex}”</p>
          </div>
        ) : (
          <div className="rounded-3xl border border-forest/30 bg-forest-soft/40 p-6 animate-rise">
            <p className="flex items-center gap-2 font-display text-[1.3rem] font-bold"><Check className="text-forest" /> You're set up</p>
            <p className="mt-2 text-muted">From here, just tell BudgetWise what you spend and earn, like “spent $12 on lunch”. It will also ask you each day.</p>
            <button onClick={() => nav("/")} className="btn-primary mt-4">See what's safe to spend <ArrowRight size={18} /></button>
          </div>
        )}
        <div ref={end} />
      </div>

      {!finished && (
        <form onSubmit={(e) => { e.preventDefault(); void send(); }}
          className="sticky bottom-20 z-10 rounded-2xl border border-line bg-surface p-2 shadow-lift lg:bottom-6">
          <div className="flex items-center gap-2">
            <input value={answer} onChange={(e) => setAnswer(e.target.value)} placeholder="Type your answer…" autoFocus
              className="h-11 flex-1 bg-transparent px-3 text-[1rem] outline-none placeholder:text-faint" aria-label="Your answer" />
            <button type="button" onClick={skip} className="btn-ghost px-3 text-[0.9rem]">{step === STEPS.length - 1 ? "No, I'm done" : "Skip"}</button>
            <button type="submit" disabled={busy || !answer.trim()} className="btn-primary h-11 px-4">
              {busy ? <Loader2 size={18} className="animate-spin" /> : "Save"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
