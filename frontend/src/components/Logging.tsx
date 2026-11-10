import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { ArrowUp, Loader2, Sun, Undo2, Wallet } from "lucide-react";
import { api, type Snapshot } from "@/lib/api";
import { logText, type LogResult } from "@/lib/log";
import { SavedCard } from "@/components/Cards";
import { cn, money } from "@/lib/format";

/** A one-line box that sends what you type to the Bookkeeper agent and shows what it saved. */
export function LogBox({ placeholder = "e.g. spent about $20 on food", checkin, contextHint, onDone, autoFocus = false, compactCard = false }: {
  placeholder?: string; checkin?: "spend" | "income"; contextHint?: string; autoFocus?: boolean; compactCard?: boolean;
  onDone?: (r: LogResult) => void;
}) {
  const qc = useQueryClient();
  const [q, setQ] = useState("");
  const [busy, setBusy] = useState(false);
  const [reply, setReply] = useState<LogResult | null>(null);
  const [live, setLive] = useState("");

  const submit = async () => {
    const text = q.trim();
    if (!text || busy) return;
    setBusy(true);
    setReply(null);
    setLive("");
    const r = await logText(text, { checkin, contextHint }, setLive);
    setBusy(false);
    setReply(r);
    if (r.error) toast.error(r.error);
    if (r.saved) setQ("");
    await qc.invalidateQueries();
    onDone?.(r);
  };

  return (
    <div className="space-y-3">
      <form onSubmit={(e) => { e.preventDefault(); void submit(); }} className="relative">
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder={placeholder} autoFocus={autoFocus}
          className="field h-12 pr-12" aria-label="Tell BudgetWise what you spent or earned" />
        <button type="submit" disabled={busy || !q.trim()} aria-label="Save"
          className="absolute right-1.5 top-1.5 grid h-9 w-9 place-items-center rounded-lg bg-forest text-white disabled:opacity-40 dark:text-canvas">
          {busy ? <Loader2 size={18} className="animate-spin" /> : <ArrowUp size={18} />}
        </button>
      </form>
      {(busy || reply) && (
        <div className="space-y-2 animate-rise">
          {(live || reply?.text) && <p className="num text-[0.93rem] text-muted">{(reply?.text || live).replace(/\*\*/g, "")}</p>}
          {reply?.saved && <SavedCard s={reply.saved} compact={compactCard} />}
        </div>
      )}
    </div>
  );
}

const CHIPS = [10, 25, 50];

/** BudgetWise asks: "What did you spend today?" and, for weekly earners, "What did you make this week?" */
export function CheckIns({ s }: { s: Snapshot }) {
  const qc = useQueryClient();
  const [done, setDone] = useState<{ kind: string; text: string; batch: string | null } | null>(null);
  const [typing, setTyping] = useState<"spend" | "income" | null>(null);

  if (!s.checkins.spend_today && !s.checkins.income_week && !done) return null;

  const tap = async (kind: "spend" | "income", amount: number | null) => {
    const r = await api.checkin(kind, amount);
    setDone({ kind, batch: r.batch_id, text: amount ? `Saved about ${money(amount)} for today. You have ${money(r.left_today)} left today.`
      : kind === "spend" ? "Nice, a no-spend day. Saved." : "Got it. Nothing new this week." });
    await qc.invalidateQueries();
  };
  const undo = async () => {
    if (done?.batch) await api.undo(done.batch);
    setDone(null);
    await qc.invalidateQueries();
  };

  if (done && !typing) {
    return (
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-forest/30 bg-forest-soft/40 px-5 py-3.5 animate-rise">
        <p className="num">{done.text}</p>
        {done.batch && <button onClick={undo} className="btn-ghost px-2.5 py-1 text-[0.85rem]"><Undo2 size={15} /> Undo</button>}
      </div>
    );
  }

  const kind: "spend" | "income" = s.checkins.spend_today ? "spend" : "income";
  const Icon = kind === "spend" ? Sun : Wallet;
  return (
    <section className="rounded-2xl border border-line bg-surface p-5">
      <div className="flex items-start gap-3">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-marigold-soft text-marigold"><Icon size={20} /></span>
        <div className="min-w-0 flex-1">
          <p className="font-display text-[1.15rem] font-bold">{kind === "spend" ? "What did you spend today?" : "What did you make this week?"}</p>
          <p className="text-[0.88rem] text-muted">
            {kind === "spend" ? "A quick guess keeps today's number right between bank uploads." : "Tips, payouts, side gigs. A rough total is fine."}
          </p>
          {typing === kind ? (
            <div className="mt-3">
              <LogBox autoFocus checkin={kind} compactCard
                placeholder={kind === "spend" ? "e.g. $12 lunch and $30 gas" : "e.g. $320 from Uber and $45 in tips"}
                onDone={(r) => { if (r.saved) { setTyping(null); setDone({ kind, batch: null, text: r.text || "Saved." }); } }} />
            </div>
          ) : (
            <div className="mt-3 flex flex-wrap gap-2">
              <button onClick={() => tap(kind, null)} className="chip border border-line bg-surface px-3.5 py-1.5 text-[0.9rem] hover:border-forest/40">
                {kind === "spend" ? "Nothing" : "Nothing this week"}
              </button>
              {kind === "spend" && CHIPS.map((c) => (
                <button key={c} onClick={() => tap("spend", c)} className="chip num border border-line bg-surface px-3.5 py-1.5 text-[0.9rem] hover:border-forest/40">
                  About {money(c, true)}
                </button>
              ))}
              <button onClick={() => setTyping(kind)} className={cn("chip px-3.5 py-1.5 text-[0.9rem] font-semibold text-forest hover:bg-forest-soft")}>
                Type it
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
