import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import * as Dialog from "@radix-ui/react-dialog";
import ReactMarkdown from "react-markdown";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  Check,
  Coins,
  History,
  Loader2,
  Send,
  ShieldCheck,
  Sparkles,
  Target,
  Upload,
  Wallet,
  X,
} from "lucide-react";
import { api, type Plan, type Saved, type Snapshot } from "@/lib/api";
import { useChat } from "@/lib/chat";
import { Skeleton } from "@/components/Bits";
import { PlanCard } from "@/components/Cards";
import { day, money } from "@/lib/format";

function Avatar() {
  return (
    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-forest text-white">
      <ArrowUpRight size={23} />
    </span>
  );
}

type HistoryEntry = {
  role: "user" | "assistant";
  text: string;
  saved?: Saved;
  plan?: Plan;
};

function ConversationHistory({
  history,
  onNewChat,
}: {
  history: HistoryEntry[];
  onNewChat: () => void;
}) {
  if (!history.length) return null;
  return (
    <Dialog.Root>
      <Dialog.Trigger className="btn-ghost px-0 text-sm">
        <History size={16} /> View conversation history
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-ink/35 backdrop-blur-sm" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 flex max-h-[82vh] w-[min(680px,calc(100vw-2rem))] -translate-x-1/2 -translate-y-1/2 flex-col rounded-3xl border border-line bg-surface p-5 shadow-lift sm:p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <Dialog.Title className="text-xl font-bold">
                Conversation history
              </Dialog.Title>
              <Dialog.Description className="mt-1 text-sm text-muted">
                Your financial records stay saved even if you start a new chat.
              </Dialog.Description>
            </div>
            <Dialog.Close
              className="grid h-9 w-9 place-items-center rounded-full hover:bg-sunken"
              aria-label="Close history"
            >
              <X size={18} />
            </Dialog.Close>
          </div>
          <div className="mt-5 space-y-3 overflow-y-auto pr-1">
            {history.map((m, i) =>
              m.role === "user" ? (
                <div key={i} className="flex justify-end">
                  <p className="max-w-[85%] rounded-2xl rounded-br-md bg-forest px-3 py-2 text-sm text-white">
                    {m.text}
                  </p>
                </div>
              ) : (
                <div
                  key={i}
                  className="rounded-2xl bg-sunken px-3 py-2 text-sm leading-relaxed"
                >
                  <ReactMarkdown>{m.text}</ReactMarkdown>
                </div>
              ),
            )}
          </div>
          <div className="mt-5 flex items-center justify-between gap-3 border-t border-line pt-4">
            <p className="text-xs text-muted">
              Showing the most recent saved conversation.
            </p>
            <Dialog.Close onClick={onNewChat} className="btn-quiet text-sm">
              Start a new chat
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function WelcomeGuide({
  onDone,
  onGoal,
  onActivity,
  onImport,
}: {
  onDone: () => Promise<void>;
  onGoal: () => Promise<void>;
  onActivity: () => Promise<void>;
  onImport: () => Promise<void>;
}) {
  const [step, setStep] = useState(1);
  const [open, setOpen] = useState(true);
  const content = useRef<HTMLDivElement>(null);
  const finish = async (action?: () => Promise<void>) => {
    setOpen(false);
    await onDone();
    await action?.();
  };
  return (
    <Dialog.Root
      open={open}
      onOpenChange={(next) => {
        if (!next) void finish();
      }}
    >
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-ink/40 backdrop-blur-sm" />
        <Dialog.Content
          ref={content}
          className="fixed left-1/2 top-1/2 z-50 max-h-[calc(100vh-1rem)] w-[min(620px,calc(100vw-1.5rem))] -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-[1.75rem] border border-line bg-surface p-5 shadow-lift sm:p-7"
        >
          <div className="flex items-center justify-between gap-4">
            <span className="rounded-full bg-forest-soft px-3 py-1 text-xs font-bold text-forest">
              A quick introduction · {step} of 2
            </span>
            <button
              onClick={() => void finish()}
              className="grid h-9 w-9 place-items-center rounded-full hover:bg-sunken"
              aria-label="Skip introduction"
            >
              <X size={18} />
            </button>
          </div>
          {step === 1 ? (
            <div className="mt-5">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-marigold-soft text-forest">
                <Target size={25} />
              </span>
              <Dialog.Title className="mt-4 text-2xl font-extrabold leading-tight sm:text-[1.8rem]">
                Make progress toward what matters.
              </Dialog.Title>
              <Dialog.Description className="mt-3 text-[1rem] leading-relaxed text-muted">
                Set a savings goal and BudgetWise will help you build a
                realistic path toward it, track your progress, and adjust your
                guidance as things change.
              </Dialog.Description>
              <div className="mt-4 flex gap-3 rounded-2xl bg-sunken p-3.5">
                <ShieldCheck
                  className="mt-0.5 shrink-0 text-forest"
                  size={20}
                />
                <p className="text-sm leading-relaxed">
                  <strong>Share only what you choose.</strong> Every question is
                  optional, and you can add, correct, or remove information
                  anytime.
                </p>
              </div>
              <div className="mt-6 flex items-center justify-between gap-3">
                <button
                  onClick={() => void finish()}
                  className="btn-ghost text-sm"
                >
                  Skip
                </button>
                <button
                  onClick={() => {
                    setStep(2);
                    window.requestAnimationFrame(() =>
                      content.current?.scrollTo({ top: 0 }),
                    );
                  }}
                  className="btn-primary"
                >
                  Next <ArrowRight size={17} />
                </button>
              </div>
            </div>
          ) : (
            <div className="mt-5">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-forest-soft text-forest">
                <Sparkles size={25} />
              </span>
              <Dialog.Title className="mt-4 text-2xl font-extrabold leading-tight sm:text-[1.8rem]">
                Start with anything you know.
              </Dialog.Title>
              <Dialog.Description className="mt-3 text-[1rem] leading-relaxed text-muted">
                Describe spending, income, or bills naturally—like “I spent $20
                on lunch”—or import a bank CSV. Estimates and details from
                earlier days are welcome.
              </Dialog.Description>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                A goal is optional. BudgetWise can still organize your activity,
                explain spending patterns, and offer advice as it learns more.
              </p>
              <div className="mt-6 grid gap-2 sm:grid-cols-2">
                <button
                  onClick={() => void finish(onGoal)}
                  className="btn-primary justify-center"
                >
                  Set a savings goal
                </button>
                <button
                  onClick={() => void finish(onActivity)}
                  className="btn-quiet justify-center"
                >
                  Log money activity
                </button>
                <button
                  onClick={() => void finish(onImport)}
                  className="btn-ghost justify-center sm:col-span-2"
                >
                  <Upload size={17} /> Import transactions
                </button>
              </div>
              <button
                onClick={() => void finish()}
                className="mx-auto mt-4 block text-sm font-semibold text-muted underline"
              >
                I’ll start on my own
              </button>
            </div>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function ReadyToUse({
  goal,
  submit,
  startActivity,
}: {
  goal: boolean;
  submit: (text: string) => void;
  startActivity: () => void;
}) {
  return (
    <div className="flex items-start gap-3 pt-2">
      <Avatar />
      <div className="min-w-0 max-w-2xl flex-1 rounded-2xl border border-forest/15 bg-surface p-4 shadow-sm">
        <div className="flex items-center gap-2 text-forest">
          <Check size={18} />
          <h2 className="font-bold">Your workspace is ready</h2>
        </div>
        <p className="mt-2 text-[0.94rem] leading-relaxed">
          Keep me updated in your own words whenever money comes in, goes out,
          or a bill changes. I’ll organize it, track your progress, and make the
          advice more useful over time.
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {goal && (
            <button
              className="btn-primary text-sm"
              onClick={() => submit("Give me a starter plan")}
            >
              See my goal plan
            </button>
          )}
          <button
            className={goal ? "btn-quiet text-sm" : "btn-primary text-sm"}
            onClick={startActivity}
          >
            Log money activity
          </button>
          <Link to="/accounts#upload" className="btn-ghost text-sm">
            <Upload size={16} /> Import a CSV
          </Link>
        </div>
      </div>
    </div>
  );
}

function ResumeSummary({
  s,
  history,
  submit,
  startLogging,
  onNewChat,
}: {
  s: Snapshot;
  history: HistoryEntry[];
  submit: (text: string) => void;
  startLogging: () => void;
  onNewChat: () => void;
}) {
  const g = s.goal;
  return (
    <div className="flex items-start gap-3">
      <Avatar />
      <div className="min-w-0 max-w-2xl flex-1 rounded-2xl border border-forest/15 bg-surface p-4 shadow-sm sm:p-5">
        <div className="flex items-center gap-2 text-forest">
          <Sparkles size={18} />
          <h2 className="font-bold">Here’s where we left off</h2>
        </div>
        {g ? (
          <div className="mt-3 space-y-2 text-[0.95rem] leading-relaxed">
            <p>
              You’re working toward{" "}
              <strong>
                {money(g.target, true)} for {g.name}
              </strong>{" "}
              by <strong>{day(g.deadline)}</strong>.
            </p>
            <p>
              {g.saved_known ? (
                <>
                  You’ve set aside <strong>{money(g.saved)}</strong>, and your
                  current target is{" "}
                  <strong>
                    {money(g.pace_amount)} per {g.pace_unit}
                  </strong>
                  .
                </>
              ) : (
                <>
                  Your current starting target is{" "}
                  <strong>
                    {money(g.pace_amount)} per {g.pace_unit}
                  </strong>
                  . You haven’t added an amount already set aside.
                </>
              )}
            </p>
            <p className="text-muted">
              {g.plan_level === "personalized"
                ? "This uses the income, bills, and spending you’ve shared."
                : "This is a starting target. I’ll make it more realistic as you share spending, income, or bills."}
            </p>
          </div>
        ) : (
          <div className="mt-3 space-y-2 text-[0.95rem] leading-relaxed">
            <p>
              Your workspace is ready
              {s.balance_info.as_of ? (
                <>
                  {" "}
                  with a recorded balance of <strong>{money(s.balance)}</strong>
                </>
              ) : null}
              .
            </p>
            <p className="text-muted">
              Share spending, income, or bills whenever they happen. I’ll
              organize them and explain what they mean.
            </p>
          </div>
        )}
        <p className="mt-3 text-sm">
          Tell me anything whenever it happens, or choose a place to continue:
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {g && (
            <button
              className="btn-primary text-sm"
              onClick={() => submit("Give me a starter plan")}
            >
              Give me a starter plan
            </button>
          )}
          <button
            className={g ? "btn-quiet text-sm" : "btn-primary text-sm"}
            onClick={startLogging}
          >
            Log spending or income
          </button>
          <Link to="/accounts#upload" className="btn-ghost text-sm">
            <Upload size={16} /> Import transactions
          </Link>
        </div>
        <div className="mt-3">
          <ConversationHistory history={history} onNewChat={onNewChat} />
        </div>
      </div>
    </div>
  );
}

export function GoalSummary({
  s,
  embedded = false,
}: {
  s: Snapshot;
  embedded?: boolean;
}) {
  const g = s.goal;
  const paceLabel = !g
    ? ""
    : g.remaining === 0
      ? "Goal reached"
      : g.days_remaining === 0
        ? "Deadline reached"
        : g.plan_level === "personalized"
          ? g.fits
            ? "Personalized pace"
            : "Needs adjustment"
          : g.plan_level === "estimated"
            ? "Estimated pace"
            : "Starter pace";
  const paceHelp = !g
    ? ""
    : g.remaining === 0
      ? "You’ve recorded enough savings for this goal. Edit it when you’re ready for your next one."
      : g.days_remaining === 0
        ? "There’s still money to set aside. Edit your deadline to choose a new pace."
        : !g.saved_known
          ? "This starts from zero until you add what you’ve already saved."
          : g.plan_level === "personalized"
            ? g.fits
              ? "This pace fits the income, bills and spending you’ve shared."
              : "The current pace does not comfortably fit yet. Ask BudgetWise to adjust the plan."
            : g.plan_level === "estimated"
              ? "This uses the information you’ve shared so far. More spending history will sharpen it."
              : "This is a starting target. Add income and bills whenever you want to check what fits.";
  const qc = useQueryClient();
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const save = async (form: HTMLFormElement) => {
    const data = new FormData(form);
    setSaving(true);
    setError("");
    try {
      await api.saveSettings({
        goal: {
          name: data.get("name"),
          target: Number(data.get("target")),
          deadline: data.get("deadline"),
          saved: Number(data.get("saved") || 0),
          saved_known: data.get("saved") !== "",
        },
      });
      await qc.invalidateQueries();
      setEditing(false);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setSaving(false);
    }
  };
  return (
    <section
      className={
        embedded
          ? "p-3.5 sm:p-4"
          : "panel border-t-[3px] border-t-forest p-5 shadow-sm sm:p-6"
      }
    >
      <div className="flex items-center justify-between gap-3">
        <h2
          className={
            embedded ? "text-[1.12rem] font-bold" : "text-[1.25rem] font-bold"
          }
        >
          Your next milestone
        </h2>
        {g && (
          <button
            onClick={() => setEditing(!editing)}
            className="text-sm font-semibold text-forest underline"
          >
            {editing ? "Cancel" : "Edit"}
          </button>
        )}
      </div>
      {editing && g ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            void save(e.currentTarget);
          }}
          className="mt-3 space-y-2.5"
        >
          <label className="block text-sm">
            Goal name
            <input
              name="name"
              className="field mt-1"
              defaultValue={g.name}
              required
              maxLength={40}
            />
          </label>
          <label className="block text-sm">
            Target amount ($)
            <input
              name="target"
              type="number"
              min="0.01"
              step="0.01"
              className="field mt-1"
              defaultValue={g.target}
              required
            />
          </label>
          <label className="block text-sm">
            Deadline
            <input
              name="deadline"
              type="date"
              min={s.as_of}
              className="field mt-1"
              defaultValue={g.deadline}
              required
            />
          </label>
          <label className="block text-sm">
            Already set aside ($)
            <input
              name="saved"
              type="number"
              min="0"
              step="0.01"
              className="field mt-1"
              defaultValue={g.saved_known ? g.saved : ""}
              placeholder="Leave blank if unknown"
            />
          </label>
          {error && (
            <p role="alert" className="text-sm text-berry">
              {error}
            </p>
          )}
          <button disabled={saving} className="btn-primary w-full">
            {saving ? "Saving…" : "Save changes"}
          </button>
        </form>
      ) : g ? (
        <div className={embedded ? "mt-2" : "mt-3"}>
          <p className="text-sm text-muted">{g.name}</p>
          <p
            className={`num mt-0.5 font-display font-bold leading-tight text-forest ${embedded ? "text-[1.7rem]" : "text-[2rem]"}`}
          >
            {g.saved_known ? money(g.saved, true) : "—"}{" "}
            <span className="text-[1.05rem]">of {money(g.target, true)}</span>
          </p>
          {!g.saved_known && (
            <p className="mt-1 text-sm text-muted">
              Amount already set aside hasn’t been added.
            </p>
          )}
          <div
            className={
              embedded
                ? "mt-2 h-1.5 overflow-hidden rounded-full bg-line/65"
                : "mt-3 h-1.5 overflow-hidden rounded-full bg-line/65"
            }
            role="progressbar"
            aria-label="Goal savings"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={g.saved_known ? Math.min(g.percent, 100) : 0}
          >
            <div
              className="h-full rounded-full bg-forest"
              style={{
                width: `${g.saved_known ? Math.min(g.percent, 100) : 0}%`,
              }}
            />
          </div>
          <div
            className={
              embedded
                ? "mt-2 flex flex-wrap items-center justify-between gap-2 text-sm"
                : "mt-3 flex flex-wrap items-center justify-between gap-3 text-sm"
            }
          >
            <span className="flex items-center gap-2">
              <CalendarDays size={17} className="text-forest" /> By{" "}
              {day(g.deadline)}
            </span>
            <span className="flex items-center gap-2 font-semibold">
              <Coins size={17} className="text-forest" />
              {money(g.pace_amount)} / {g.pace_unit}
            </span>
          </div>
          {!embedded && (
            <div className="mt-3 flex items-start gap-3 border-t border-line pt-3">
              <span className="shrink-0 rounded-full bg-marigold-soft px-2.5 py-1 text-xs font-semibold">
                {paceLabel}
              </span>
              <p className="text-xs leading-relaxed text-muted">{paceHelp}</p>
            </div>
          )}
        </div>
      ) : (
        <div className={embedded ? "py-2" : "py-5"}>
          <Target size={embedded ? 24 : 28} className="text-forest" />
          <h3 className="mt-2 text-lg font-semibold">
            What are you working toward?
          </h3>
          <p className="mt-1 text-sm leading-relaxed text-muted">
            A trip, a little breathing room, or something else. Tell me an
            amount and a date, and your goal will appear here.
          </p>
          <p className="mt-2 text-sm text-muted">
            Goals are optional. You can just track your spending.
          </p>
        </div>
      )}
    </section>
  );
}

export default function Today() {
  const { data: s, error } = useQuery({
    queryKey: ["snapshot"],
    queryFn: api.snapshot,
  });
  const { data: guide } = useQuery({
    queryKey: ["conversation", s?.account.id],
    queryFn: api.conversation,
    enabled: !!s,
  });
  const { messages, busy, send, reset } = useChat();
  const qc = useQueryClient();
  const navigate = useNavigate();
  const [draft, setDraft] = useState("");
  const [dateOpen, setDateOpen] = useState(false);
  const [undoError, setUndoError] = useState("");
  const [undone, setUndone] = useState<string[]>([]);
  const input = useRef<HTMLInputElement>(null);
  const conversationEnd = useRef<HTMLDivElement>(null);
  const followLatest = useRef(true);
  const automaticScroll = useRef(false);
  const [showLatest, setShowLatest] = useState(false);
  const scrollToLatest = (behavior: ScrollBehavior = "smooth") => {
    followLatest.current = true;
    setShowLatest(false);
    automaticScroll.current = true;
    conversationEnd.current?.scrollIntoView({ block: "end", behavior });
    window.setTimeout(
      () => {
        automaticScroll.current = false;
      },
      behavior === "smooth" ? 650 : 0,
    );
  };
  useEffect(() => {
    const onScroll = () => {
      if (automaticScroll.current) return;
      const distance =
        document.documentElement.scrollHeight -
        (window.scrollY + window.innerHeight);
      const nearLatest = distance < 150;
      followLatest.current = nearLatest;
      setShowLatest(!nearLatest && messages.length > 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [messages.length]);
  const latestText = messages.at(-1)?.text;
  useEffect(() => {
    if (!messages.length || !followLatest.current) return;
    const frame = window.requestAnimationFrame(() => scrollToLatest("smooth"));
    return () => window.cancelAnimationFrame(frame);
  }, [messages.length, latestText, guide?.question]); // eslint-disable-line react-hooks/exhaustive-deps
  const submit = (text: string) => {
    if (!text.trim() || busy) return;
    followLatest.current = true;
    setShowLatest(false);
    setDraft("");
    setDateOpen(false);
    void send(text);
  };
  const undo = async (batch: string) => {
    try {
      await api.undo(batch);
      setUndone((old) => [...old, batch]);
      await qc.invalidateQueries();
    } catch (e) {
      setUndoError((e as Error).message);
    }
  };
  const markWelcomeSeen = async () => {
    await api.saveSettings({ welcome_seen: true });
    await qc.invalidateQueries({ queryKey: ["conversation", s?.account.id] });
  };
  if (error)
    return (
      <p role="alert" className="panel p-6">
        Couldn’t load your workspace. Please refresh to try again.
      </p>
    );
  if (!s) return <Skeleton className="h-96" />;
  const g = s.goal;
  const hasWorkspace = Boolean(
    g ||
    s.balance_info.as_of ||
    s.told.length ||
    s.estimates.count ||
    s.spending_last_30_days.length,
  );
  const history = (guide?.history || []) as HistoryEntry[];
  const showReady = Boolean(
    guide?.guidance_complete &&
    messages.at(-1)?.role === "assistant" &&
    messages.at(-1)?.text.includes("That’s enough to get started"),
  );
  return (
    <>
      <div className="home-workspace grid items-start gap-5 lg:grid-cols-[minmax(0,1.58fr)_minmax(340px,0.92fr)] xl:gap-7">
        <section className="flex min-w-0 flex-col">
          <header className="pb-3">
            <p className="mb-1 text-xs font-bold uppercase tracking-[0.14em] text-forest/75">
              {hasWorkspace
                ? "Your current money picture"
                : "Your money, one step at a time"}
            </p>
            <h1 className="text-[2rem] font-extrabold leading-tight tracking-tight sm:text-[2.35rem]">
              {hasWorkspace ? "Welcome back." : "Hi, I’m BudgetWise."}
            </h1>
            <p className="mt-0.5 text-base sm:text-lg">
              {hasWorkspace
                ? "Let’s continue from what you’ve already shared."
                : "Let’s make your next money decision simpler."}
            </p>
          </header>
          <div
            className="min-h-[205px] space-y-3 py-2"
            aria-live="polite"
            aria-label="Conversation"
          >
            {messages.length === 0 &&
              (hasWorkspace ? (
                <ResumeSummary
                  s={s}
                  history={history}
                  submit={submit}
                  startLogging={() => {
                    setDraft("I spent ");
                    input.current?.focus();
                  }}
                  onNewChat={() => reset()}
                />
              ) : (
                <div className="flex items-start gap-3">
                  <Avatar />
                  <div className="max-w-xl">
                    <p className="leading-relaxed">
                      I can help you save for something, understand your
                      spending, and keep track of bills and income. Start with
                      anything you know.
                    </p>
                    <p className="mt-2 text-sm text-muted">
                      You can skip questions and add or correct details anytime.
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      <button
                        className="btn-primary text-sm"
                        onClick={() => submit("Save for something")}
                      >
                        Save for something
                      </button>
                      <button
                        className="btn-quiet text-sm"
                        onClick={() => submit("Track spending")}
                      >
                        Track spending
                      </button>
                      <button
                        className="btn-ghost text-sm"
                        onClick={() => submit("What can you do?")}
                      >
                        What can you do?
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            {messages.map((m) =>
              m.role === "user" ? (
                <div key={m.id} className="flex justify-end pl-10">
                  <p className="max-w-[85%] rounded-2xl rounded-br-md bg-forest px-4 py-3 text-white">
                    {m.text}
                  </p>
                </div>
              ) : (
                <div key={m.id} className="flex items-start gap-3">
                  <Avatar />
                  <div className="min-w-0 max-w-[90%]">
                    <div className="prose-chat rounded-2xl bg-sunken px-4 py-3 text-[0.96rem] leading-relaxed">
                      {m.pending && !m.text ? (
                        <span className="flex items-center gap-2 text-muted">
                          <Loader2 size={16} className="animate-spin" />
                          Organizing what you shared…
                        </span>
                      ) : (
                        <ReactMarkdown>{m.text}</ReactMarkdown>
                      )}
                    </div>
                    {m.plan && (
                      <div className="mt-3">
                        <PlanCard p={m.plan} compact />
                        <Link
                          to="/plan"
                          className="btn-primary mt-3 w-full justify-center"
                        >
                          Review and start this plan
                        </Link>
                      </div>
                    )}
                    {m.saved?.count ? (
                      <div className="mt-2 flex items-center gap-3 text-xs text-muted">
                        <span className="flex items-center gap-1">
                          <Check size={13} />
                          {undone.includes(m.saved.batch_id)
                            ? "Undone"
                            : "Saved to your workspace"}
                        </span>
                        <button
                          disabled={busy || undone.includes(m.saved.batch_id)}
                          onClick={() => void undo(m.saved!.batch_id)}
                          className="font-semibold text-forest underline disabled:opacity-40"
                        >
                          Undo
                        </button>
                        <button
                          disabled={busy}
                          onClick={() => {
                            setDraft("Actually, ");
                            input.current?.focus();
                          }}
                          className="font-semibold text-forest underline"
                        >
                          Correct
                        </button>
                      </div>
                    ) : null}
                    {m.error && (
                      <p role="alert" className="mt-2 text-sm text-berry">
                        {m.error} Check your saved information before trying
                        again.
                      </p>
                    )}
                  </div>
                </div>
              ),
            )}
            {!busy && guide?.question && (
              <div className="flex items-start gap-3 pt-2">
                <Avatar />
                <div className="min-w-0 flex-1">
                  <p className="rounded-2xl bg-forest-soft px-4 py-3 font-semibold">
                    {guide.question}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {guide.question_key === "payday" && (
                      <button
                        className="btn-primary text-sm"
                        onClick={() => setDateOpen(!dateOpen)}
                      >
                        <CalendarDays size={16} /> Choose a date
                      </button>
                    )}
                    {guide.choices.map((c) => (
                      <button
                        key={c}
                        className="btn border border-line bg-surface px-3 py-2 text-sm"
                        onClick={() => submit(c)}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                  {dateOpen && (
                    <label className="mt-3 block text-sm">
                      Next payday
                      <input
                        aria-label="Next payday"
                        type="date"
                        min={s.as_of}
                        className="field mt-1 max-w-xs"
                        onChange={(e) => {
                          if (e.target.value) submit(e.target.value);
                        }}
                      />
                    </label>
                  )}
                </div>
              </div>
            )}
            {!busy && showReady && (
              <ReadyToUse
                goal={Boolean(g)}
                submit={submit}
                startActivity={() => {
                  setDraft("Today I spent ");
                  input.current?.focus();
                }}
              />
            )}
            <div
              ref={conversationEnd}
              className="h-px scroll-mb-40"
              aria-hidden
            />
          </div>
          <div className="home-composer sticky bottom-[72px] z-10 mt-4 rounded-2xl bg-canvas/95 pt-2 backdrop-blur md:bottom-3">
            {showLatest && (
              <button
                onClick={() => scrollToLatest()}
                className="absolute -top-10 left-1/2 flex -translate-x-1/2 items-center gap-1 rounded-full border border-line bg-surface px-3 py-1.5 text-xs font-semibold text-forest shadow-sm"
              >
                <ArrowDown size={14} /> Jump to latest
              </button>
            )}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                submit(draft);
              }}
              className="flex items-center gap-2 rounded-2xl border border-forest/30 bg-surface p-2 shadow-md sm:gap-3"
            >
              <Link
                to="/accounts#upload"
                aria-label="Import transactions"
                className="border-r border-line px-2 py-2 text-forest sm:px-3"
              >
                <Upload size={22} />
              </Link>
              <input
                ref={input}
                aria-label="Message BudgetWise"
                className="min-w-0 flex-1 bg-transparent py-3 text-base outline-none"
                placeholder="Tell me anything, or ask a question…"
                value={draft}
                maxLength={1000}
                onChange={(e) => setDraft(e.target.value)}
              />
              <button
                disabled={busy || !draft.trim()}
                className="btn-primary px-3"
                aria-label="Send message"
              >
                {busy ? (
                  <Loader2 size={19} className="animate-spin" />
                ) : (
                  <Send size={19} />
                )}
              </button>
            </form>
            <p className="mt-2 text-xs text-muted">
              Add spending, income or bills anytime. Estimates are welcome.{" "}
              <button onClick={() => submit("Privacy")} className="underline">
                About privacy
              </button>
            </p>
            {undoError && (
              <p role="alert" className="text-sm text-berry">
                {undoError}
              </p>
            )}
          </div>
        </section>
        <aside className="home-summary min-w-0 overflow-hidden rounded-3xl border border-line bg-surface lg:sticky lg:top-[84px]">
          <GoalSummary s={s} embedded />
          <section className="border-t border-line px-4 py-2.5">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-[0.7rem] font-semibold uppercase tracking-wide text-muted">
                  Safe to spend today
                </p>
                {s.readiness.ready ? (
                  <p className="num mt-0.5 text-xl font-bold text-forest">
                    {money(Math.max(s.left_today, 0))}
                  </p>
                ) : (
                  <p className="mt-0.5 font-semibold">Not calculated yet</p>
                )}
              </div>
              <Wallet className="text-forest" size={22} />
            </div>
            <p className="mt-1 text-xs leading-snug text-muted">
              {s.readiness.ready
                ? s.left_today <= 0 && s.spent_today > 0
                  ? `You’ve already logged ${money(s.spent_today)} today, using today’s ${money(s.safe_per_day)} amount.`
                  : `Known bills and your cushion are protected across the next ${s.planning_horizon_days} days.`
                : `Add ${s.readiness.missing.join(", ")} when you’re ready for a reliable amount.`}
            </p>
          </section>
          <section className="border-t border-line px-4 pb-3 pt-2.5">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-[1.02rem] font-bold">What you’ve shared</h2>
              <span className="text-[0.7rem] text-muted">
                Add or correct anytime
              </span>
            </div>
            <dl className="mt-1.5 grid grid-cols-2 gap-1.5 text-sm">
              <Fact
                icon={Target}
                name="Goal"
                value={
                  g
                    ? `${money(g.target, true)} by ${day(g.deadline)}`
                    : "Not added"
                }
              />
              <Fact
                icon={Coins}
                name="Set aside"
                value={g?.saved_known ? money(g.saved) : "Not added"}
              />
              <Fact
                icon={Wallet}
                name="Available money"
                value={
                  !s.readiness.missing.includes("balance")
                    ? money(s.balance)
                    : "Not added"
                }
              />
              <Fact
                icon={CalendarDays}
                name="Next payday"
                value={
                  s.readiness.payday_known ? day(s.next_payday) : "Not added"
                }
              />
            </dl>
            <Link
              to="/accounts#upload"
              className="mt-2 flex items-center justify-center gap-2 rounded-xl border border-line bg-sunken/55 px-3 py-1.5 text-sm font-semibold text-forest"
            >
              <Upload size={16} /> Import transactions
            </Link>
          </section>
          {s.insights.length > 0 && (
            <section className="border-t border-line bg-forest-soft/45 px-4 py-2.5">
              <h2 className="text-sm font-bold">From your activity</h2>
              <p className="mt-0.5 text-xs leading-snug text-muted">
                {s.insights[0].detail}
              </p>
              <Link
                to="/spending"
                className="mt-1 inline-block text-xs font-semibold text-forest"
              >
                Review activity →
              </Link>
            </section>
          )}
          <p className="border-t border-line px-4 py-2 text-[0.7rem] leading-snug text-muted">
            Share only what you choose. Your plan improves as you add
            information.
          </p>
        </aside>
      </div>
      {guide && !guide.welcome_seen && s.account.kind === "personal" && (
        <WelcomeGuide
          onDone={markWelcomeSeen}
          onGoal={async () => {
            submit("Save for something");
          }}
          onActivity={async () => {
            setDraft("Today I spent ");
            window.setTimeout(() => input.current?.focus(), 50);
          }}
          onImport={async () => {
            navigate("/accounts#upload");
          }}
        />
      )}
    </>
  );
}

function Fact({
  icon: Icon,
  name,
  value,
}: {
  icon: typeof Target;
  name: string;
  value: string;
}) {
  return (
    <div className="rounded-xl bg-sunken/60 p-2">
      <div className="flex items-center gap-1.5">
        <Icon size={15} className="shrink-0 text-forest" />
        <dt className="text-[0.7rem] font-semibold text-muted">{name}</dt>
      </div>
      <dd
        className="mt-0.5 truncate text-[0.86rem] font-semibold"
        title={value}
      >
        {value}
      </dd>
    </div>
  );
}
