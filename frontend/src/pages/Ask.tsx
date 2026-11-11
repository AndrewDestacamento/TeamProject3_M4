import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Link } from "react-router-dom";
import { ArrowUp, ChevronDown, RotateCcw, Timer } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { useChat, type ChatMessage } from "@/lib/chat";
import AgentTimeline from "@/components/AgentTimeline";
import { AffordCard, PlanCard, SavedCard } from "@/components/Cards";
import { SUGGESTIONS } from "@/components/Bits";
import { cn, money } from "@/lib/format";

function Assistant({ m }: { m: ChatMessage }) {
  const [open, setOpen] = useState(false);
  const showSteps = m.pending || open;
  return (
    <div className="max-w-[680px] space-y-3">
      {m.afford && <AffordCard a={m.afford} />}
      {m.saved && <SavedCard s={m.saved} />}
      {m.plan && (
        <div className="space-y-2">
          <PlanCard p={m.plan} compact />
          <Link to="/plan" className="btn-quiet text-[0.9rem]">Open the full plan to start it</Link>
        </div>
      )}
      {(m.text || m.pending) && (
        <div className="prose-chat num text-[1rem] leading-relaxed">
          {m.text ? <ReactMarkdown remarkPlugins={[remarkGfm]}>{m.text}</ReactMarkdown> : (
            <span className="inline-flex gap-1 py-2" aria-label="Working">
              {[0, 1, 2].map((i) => <span key={i} className="h-2 w-2 animate-pulseDot rounded-full bg-forest" style={{ animationDelay: `${i * 0.18}s` }} />)}
            </span>
          )}
        </div>
      )}
      {m.error && <p className="text-[0.9rem] text-berry">Something went wrong: {m.error}. Try asking again.</p>}
      {m.timeline.length > 0 && (
        <div>
          {!m.pending && (
            <button onClick={() => setOpen((o) => !o)} className="flex items-center gap-1.5 text-[0.83rem] font-medium text-muted hover:text-ink">
              <ChevronDown size={15} className={cn("transition-transform", open && "rotate-180")} />
              How I got this answer
              {m.elapsed !== undefined && <span className="ml-1 inline-flex items-center gap-1 text-faint"><Timer size={13} />{m.elapsed.toFixed(1)}s</span>}
            </button>
          )}
          {showSteps && <AgentTimeline items={m.timeline} className="mt-3" />}
        </div>
      )}
    </div>
  );
}

export default function Ask() {
  const { messages, send, busy, reset } = useChat();
  const [q, setQ] = useState("");
  const end = useRef<HTMLDivElement>(null);
  const { data: s } = useQuery({ queryKey: ["snapshot"], queryFn: api.snapshot });
  useEffect(() => { end.current?.scrollIntoView({ behavior: "smooth", block: "end" }); }, [messages]);

  const submit = (text: string) => {
    if (!text.trim() || busy) return;
    void send(text);
    setQ("");
  };

  return (
    <div className="mx-auto flex min-h-[calc(100vh-11rem)] max-w-3xl flex-col lg:min-h-[calc(100vh-5rem)]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-[1.9rem] font-bold leading-tight">Ask BudgetWise</h1>
          <p className="mt-1 text-muted">Tell me your goal, spending, income or bills in your own words. I'll organize what you share, ask one useful question at a time, and verify every calculated amount.</p>
          <p className="mt-2 text-[0.82rem] text-faint">Share only what you're comfortable sharing. Every question is optional, estimates are fine, and saved information can be corrected or undone.</p>
        </div>
        {messages.length > 0 && (
          <button onClick={reset} className="btn-ghost shrink-0 text-[0.9rem]"><RotateCcw size={16} /> New chat</button>
        )}
      </div>

      <div className="flex-1 space-y-7 py-8">
        {messages.length === 0 && (
          <div className="rounded-3xl border border-dashed border-line p-6 sm:p-8">
            <p className="font-display text-[1.25rem] font-bold">
              {s ? <>You have <span className="num text-forest">{money(s.safe_per_day)}</span> a day to spend until payday. What would you like to know?</> : "What would you like to know?"}
            </p>
            <div className="mt-5 grid gap-2 sm:grid-cols-2">
              {[...SUGGESTIONS, "Make me a plan for this week", "I spent about $20 on food today"].map((x) => (
                <button key={x} onClick={() => submit(x)}
                  className="rounded-2xl border border-line bg-surface px-4 py-3 text-left text-[0.95rem] hover:border-forest/40">
                  {x}
                </button>
              ))}
            </div>
          </div>
        )}
        {messages.map((m) => m.role === "user" ? (
          <div key={m.id} className="flex justify-end">
            <p className="max-w-[80%] rounded-2xl rounded-br-md bg-forest px-4 py-2.5 text-white dark:text-canvas">{m.text}</p>
          </div>
        ) : (
          <div key={m.id} className="flex gap-3">
            <svg width="32" height="32" viewBox="0 0 64 64" className="mt-1 shrink-0" aria-hidden>
              <rect width="64" height="64" rx="18" fill="rgb(var(--forest))" />
              <path d="M14 40c8 0 10-16 18-16s10 10 18 10" stroke="rgb(var(--marigold))" strokeWidth="6" fill="none" strokeLinecap="round" />
              <circle cx="50" cy="34" r="5" fill="#fff" />
            </svg>
            <Assistant m={m} />
          </div>
        ))}
        <div ref={end} />
      </div>

      <form onSubmit={(e) => { e.preventDefault(); submit(q); }}
        className="sticky bottom-20 z-10 rounded-2xl border border-line bg-surface p-2 shadow-lift lg:bottom-6">
        <div className="flex items-end gap-2">
          <textarea value={q} onChange={(e) => setQ(e.target.value)} rows={1} placeholder="Ask a question, or tell me what you spent…"
            onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); submit(q); } }}
            className="max-h-40 min-h-[44px] flex-1 resize-none bg-transparent px-3 py-2.5 text-[1rem] outline-none placeholder:text-faint"
            aria-label="Your question" />
          <button type="submit" disabled={busy || !q.trim()} aria-label="Send"
            className="grid h-11 w-11 place-items-center rounded-xl bg-forest text-white disabled:opacity-40 dark:text-canvas">
            <ArrowUp size={20} />
          </button>
        </div>
      </form>
    </div>
  );
}
