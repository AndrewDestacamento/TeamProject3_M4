import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  Archive,
  ArrowRight,
  Check,
  Download,
  FileSpreadsheet,
  Loader2,
  Lock,
  PencilLine,
  Sparkles,
  Trash2,
  UploadCloud,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";
import { api } from "@/lib/api";
import { useChat } from "@/lib/chat";
import { Section } from "@/components/Bits";
import { describeSchedule } from "@/components/Cards";
import { CatIcon } from "@/lib/categories";
import { cn, day, money } from "@/lib/format";

type Preview = Awaited<ReturnType<typeof api.importPreview>>;

function Uploader() {
  const qc = useQueryClient();
  const { data: accts } = useQuery({
    queryKey: ["accounts"],
    queryFn: api.accounts,
  });
  const activeAcc = accts?.accounts.find((a) => a.id === accts.active);
  const canMerge = activeAcc?.kind === "personal";
  const [target, setTarget] = useState<"new" | "active">("active");
  const nav = useNavigate();
  const { reset } = useChat();
  const input = useRef<HTMLInputElement>(null);
  const [drag, setDrag] = useState(false);
  const [preview, setPreview] = useState<Preview | null>(null);
  const [name, setName] = useState("My checking");
  const [balance, setBalance] = useState("");
  const [stage, setStage] = useState<
    "idle" | "reading" | "ready" | "importing" | "done"
  >("idle");
  const [result, setResult] = useState<Awaited<
    ReturnType<typeof api.importCommit>
  > | null>(null);

  const read = async (file: File) => {
    setStage("reading");
    try {
      const p = await api.importPreview(file);
      setPreview(p);
      setBalance(p.balance !== null ? String(p.balance) : "");
      setStage("ready");
    } catch (e) {
      toast.error((e as Error).message);
      setStage("idle");
    }
  };

  const commit = async () => {
    if (!preview) return;
    const bal = Number(balance.replace(/[$,]/g, ""));
    if (!balance.trim() || Number.isNaN(bal)) {
      toast.error(
        "Enter your current balance so BudgetWise can work out what's safe to spend.",
      );
      return;
    }
    setStage("importing");
    try {
      const r = await api.importCommit(
        preview.token,
        name.trim() || "My checking",
        bal,
        canMerge ? target : "new",
      );
      setResult(r);
      setStage("done");
      reset();
      await qc.invalidateQueries();
    } catch (e) {
      toast.error((e as Error).message);
      setStage("ready");
    }
  };

  if (stage === "done" && result) {
    const h = result.how_categorized;
    return (
      <div className="space-y-4 animate-rise">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-forest-soft text-forest">
            <Check size={20} />
          </span>
          <p className="font-display text-[1.2rem] font-bold">
            Imported {result.transactions} transactions in {result.seconds}s
          </p>
        </div>
        <ul className="num space-y-1 text-[0.93rem] text-muted">
          {result.duplicates_skipped > 0 && (
            <li>
              <span className="font-semibold text-ink">
                {result.duplicates_skipped}
              </span>{" "}
              were already saved from an earlier file, so they were skipped
            </li>
          )}
          {result.estimates_replaced > 0 && (
            <li>
              <span className="font-semibold text-ink">
                {result.estimates_replaced}
              </span>{" "}
              estimates you logged were replaced by exact bank rows
            </li>
          )}
          <li>
            <span className="font-semibold text-ink">{h.rules}</span> sorted
            instantly by store-name rules
          </li>
          {h.memory > 0 && (
            <li>
              <span className="font-semibold text-ink">{h.memory}</span> sorted
              from stores you've corrected before
            </li>
          )}
          <li>
            <span className="font-semibold text-ink">{h.ai}</span> sorted by the
            Categorizer agent ({result.merchants_sent_to_ai} store names sent,
            nothing else)
          </li>
          {h.unknown > 0 && (
            <li>
              <span className="font-semibold text-ink">{h.unknown}</span> left
              as Other. You can fix them on the Spending page.
            </li>
          )}
        </ul>
        <div className="flex flex-wrap gap-2">
          <button className="btn-primary" onClick={() => nav("/")}>
            See my numbers
          </button>
          <button
            className="btn-ghost"
            onClick={() => {
              setStage("idle");
              setPreview(null);
              setResult(null);
            }}
          >
            Upload another file
          </button>
        </div>
      </div>
    );
  }

  if ((stage === "ready" || stage === "importing") && preview) {
    const d = preview.detected;
    return (
      <div className="space-y-5 animate-rise">
        <div className="flex items-start gap-3">
          <FileSpreadsheet className="mt-0.5 text-forest" size={22} />
          <div>
            <p className="font-semibold">
              {d.rows} transactions from {day(String(d.first_date))} to{" "}
              {day(String(d.last_date))}
            </p>
            <p className="text-[0.88rem] text-muted">
              Found columns: date “{String(d.date)}”, description “
              {String(d.description)}”, amount “{String(d.amount)}”
              {d.balance ? `, balance “${d.balance}”` : ""}.
              {Number(d.skipped) > 0 &&
                ` Skipped ${d.skipped} rows that weren't transactions.`}
            </p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-xl border border-line">
          <table className="num w-full text-[0.85rem]">
            <tbody className="divide-y divide-line">
              {preview.sample.map((r, i) => (
                <tr key={i}>
                  <td className="whitespace-nowrap px-3 py-2 text-muted">
                    {day(r.date)}
                  </td>
                  <td className="px-3 py-2">{r.description}</td>
                  <td
                    className={cn(
                      "whitespace-nowrap px-3 py-2 text-right font-semibold",
                      r.amount > 0 && "text-forest",
                    )}
                  >
                    {money(r.amount)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {canMerge && (
          <div
            className="flex flex-wrap gap-2"
            role="radiogroup"
            aria-label="Where to add this file"
          >
            {(
              [
                ["active", `Add to ${activeAcc?.name}`],
                ["new", "Make a new account"],
              ] as const
            ).map(([v, l]) => (
              <button
                key={v}
                role="radio"
                aria-checked={target === v}
                onClick={() => setTarget(v)}
                className={cn(
                  "chip border px-3.5 py-1.5 text-[0.9rem]",
                  target === v
                    ? "border-forest bg-forest-soft text-forest"
                    : "border-line text-muted",
                )}
              >
                {target === v && <Check size={14} />}
                {l}
              </button>
            ))}
          </div>
        )}
        <div className="grid gap-4 sm:grid-cols-2">
          {(!canMerge || target === "new") && (
            <label className="block">
              <span className="mb-1.5 block text-[0.9rem] font-medium">
                Name this account
              </span>
              <input
                className="field"
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={40}
              />
            </label>
          )}
          <label className="block">
            <span className="mb-1.5 block text-[0.9rem] font-medium">
              Available money right now
            </span>
            <input
              className="field num"
              inputMode="decimal"
              value={balance}
              onChange={(e) => setBalance(e.target.value)}
              placeholder="e.g. 842.17"
            />
            <span className="mt-1 block text-[0.8rem] text-muted">
              {preview.balance !== null
                ? "Taken from your file. Change it if it's different today."
                : "Check your banking app and type it in."}
            </span>
          </label>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            className="btn-primary"
            onClick={commit}
            disabled={stage === "importing"}
          >
            {stage === "importing" ? (
              <>
                <Loader2 size={18} className="animate-spin" /> Sorting your
                transactions
              </>
            ) : (
              "Import and sort transactions"
            )}
          </button>
          <button
            className="btn-ghost"
            onClick={() => {
              setStage("idle");
              setPreview(null);
            }}
            disabled={stage === "importing"}
          >
            Choose a different file
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <button
        onClick={() => input.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setDrag(true);
        }}
        onDragLeave={() => setDrag(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDrag(false);
          const f = e.dataTransfer.files[0];
          if (f) void read(f);
        }}
        className={cn(
          "flex w-full flex-col items-center gap-2 rounded-2xl border-2 border-dashed border-line px-6 py-10 text-center hover:border-forest/50",
          drag && "border-forest bg-forest-soft/40",
        )}
      >
        {stage === "reading" ? (
          <Loader2 size={30} className="animate-spin text-forest" />
        ) : (
          <UploadCloud size={30} className="text-forest" />
        )}
        <span className="font-display text-[1.15rem] font-bold">
          {stage === "reading"
            ? "Reading your file"
            : "Drop your bank's CSV here, or click to choose it"}
        </span>
        <span className="max-w-md text-[0.88rem] text-muted">
          Works with exports from Chase, Bank of America, Capital One, Wells
          Fargo and most other banks. Two or three months works best.
        </span>
      </button>
      <input
        ref={input}
        type="file"
        accept=".csv,text/csv"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) void read(f);
          e.target.value = "";
        }}
      />
      <div className="flex flex-wrap items-center justify-between gap-3 text-[0.85rem] text-muted">
        <span className="flex items-center gap-2">
          <Lock size={15} /> Your file stays on this computer. Account numbers
          are masked, and only unknown store names are sent to the AI.
        </span>
        <a
          href="/api/sample-csv"
          className="inline-flex items-center gap-1.5 font-medium text-forest hover:underline"
        >
          <Download size={15} /> Sample file to try
        </a>
      </div>
    </div>
  );
}

function SettingsForm() {
  const qc = useQueryClient();
  const nav = useNavigate();
  const { data: snap } = useQuery({
    queryKey: ["snapshot"],
    queryFn: api.snapshot,
  });
  const { data: settings } = useQuery({
    queryKey: ["settings"],
    queryFn: api.settings,
  });
  const { data: devLogs } = useQuery({
    queryKey: ["development-logs"],
    queryFn: api.developmentLogs,
  });
  const [archiving, setArchiving] = useState(false);
  const [f, setF] = useState<Record<string, string>>({});
  useEffect(() => {
    if (!settings) return;
    const g = (settings.goal ?? {}) as Record<string, unknown>;
    setF({
      balance:
        settings.current_balance != null
          ? Number(settings.current_balance).toFixed(2)
          : "",
      buffer:
        settings.savings_buffer != null
          ? Number(settings.savings_buffer).toFixed(2)
          : "",
      payday: String(settings.next_payday ?? ""),
      goalName: String(g.name ?? ""),
      goalTarget: String(g.target ?? ""),
      goalSaved: String(g.saved ?? ""),
      goalDeadline: String(g.deadline ?? ""),
      useCase: String(settings.use_case ?? ""),
    });
  }, [settings]);
  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setF((x) => ({ ...x, [k]: e.target.value }));
  const removeSchedule = async (id: string) => {
    await api.deleteSchedule(id);
    await qc.invalidateQueries();
    toast.success("Removed");
  };

  const save = async () => {
    const body: Record<string, unknown> = { use_case: f.useCase.trim() };
    if (f.balance.trim()) body.current_balance = Number(f.balance);
    if (f.buffer.trim()) body.savings_buffer = Number(f.buffer);
    if (f.payday) body.next_payday = f.payday;
    else body.clear_payday = true;
    if (f.goalName && f.goalTarget && f.goalDeadline) {
      body.goal = {
        name: f.goalName,
        target: Number(f.goalTarget),
        saved: Number(f.goalSaved || 0),
        deadline: f.goalDeadline,
      };
    }
    try {
      await api.saveSettings(body);
      await qc.invalidateQueries();
      toast.success("Saved. Your numbers are updated.");
    } catch (e) {
      toast.error((e as Error).message);
    }
  };

  const archiveLogs = async () => {
    setArchiving(true);
    try {
      const result = await api.archiveDevelopmentLogs();
      await qc.invalidateQueries({ queryKey: ["development-logs"] });
      if (result.archived)
        toast.success(
          `Archived ${result.archived.turns} conversation turns to ${result.archived.filename}`,
        );
      else toast.info("There are no active conversation logs to archive yet.");
    } catch (e) {
      toast.error((e as Error).message);
    } finally {
      setArchiving(false);
    }
  };

  const replayWelcome = async () => {
    await api.saveSettings({ welcome_seen: false });
    await qc.invalidateQueries({ queryKey: ["conversation"] });
    nav("/");
  };

  const told = settings?.schedules ?? [];
  return (
    <div className="space-y-5">
      {snap?.account.kind === "personal" && (
        <div className="flex flex-col gap-3 rounded-2xl border border-line bg-sunken/45 p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex gap-3">
            <Sparkles className="mt-0.5 shrink-0 text-forest" size={20} />
            <div>
              <p className="font-semibold">BudgetWise introduction</p>
              <p className="mt-0.5 text-[0.84rem] text-muted">
                Review the two short screens explaining goals, natural-language
                tracking, imports, and privacy choices.
              </p>
            </div>
          </div>
          <button
            className="btn-ghost shrink-0 text-sm"
            onClick={() => void replayWelcome()}
          >
            Replay introduction
          </button>
        </div>
      )}
      <label className="block">
        <span className="mb-1.5 block text-[0.9rem] font-medium">
          What should BudgetWise help you with?
        </span>
        <input
          className="field"
          value={f.useCase ?? ""}
          onChange={set("useCase")}
          placeholder="For example: help me cut back on eating out"
        />
        <span className="mt-1 block text-[0.8rem] text-muted">
          Optional. You can change this as your priorities change.
        </span>
      </label>
      {told.length > 0 && (
        <div>
          <p className="mb-2 font-medium">Bills and pay you told BudgetWise</p>
          <ul className="divide-y divide-line rounded-2xl border border-line">
            {told.map((x) => (
              <li key={x.id} className="flex items-center gap-3 px-4 py-2.5">
                <CatIcon
                  id={x.kind === "income" ? "income" : (x.category ?? "other")}
                  size={14}
                />
                <span className="num min-w-0 flex-1 text-[0.93rem]">
                  <span className="font-medium">
                    {x.kind === "income" ? "Pay schedule" : x.name}
                  </span>
                  <span className="text-muted">: {describeSchedule(x)}</span>
                </span>
                <button
                  onClick={() => removeSchedule(x.id)}
                  className="rounded-lg p-1.5 text-faint hover:bg-sunken hover:text-berry"
                  aria-label={`Remove ${x.name}`}
                >
                  <X size={15} />
                </button>
              </li>
            ))}
          </ul>
          <p className="mt-1.5 text-[0.82rem] text-muted">
            To change one, just tell BudgetWise, e.g. “rent is $750 now”.
          </p>
        </div>
      )}
      <div className="grid gap-4 sm:grid-cols-3">
        <label>
          <span className="mb-1.5 block text-[0.9rem] font-medium">
            Available money
          </span>
          <input
            className="field num"
            inputMode="decimal"
            value={f.balance ?? ""}
            onChange={set("balance")}
          />
          <span className="mt-1 block text-[0.8rem] text-muted">
            The checking or cash pool you want this plan to use
          </span>
        </label>
        <label>
          <span className="mb-1.5 block text-[0.9rem] font-medium">
            Cushion to keep
          </span>
          <input
            className="field num"
            inputMode="decimal"
            value={f.buffer ?? ""}
            onChange={set("buffer")}
          />
          <span className="mt-1 block text-[0.8rem] text-muted">
            Never counted as spendable
          </span>
        </label>
        <label>
          <span className="mb-1.5 block text-[0.9rem] font-medium">
            Next payday
          </span>
          <input
            className="field"
            type="date"
            value={f.payday ?? ""}
            onChange={set("payday")}
          />
          <span className="mt-1 block text-[0.8rem] text-muted">
            {snap
              ? `Leave empty to use the detected date (${day(snap.income.next_payday)})`
              : " "}
          </span>
        </label>
      </div>
      <div id="goals" className="grid scroll-mt-6 gap-4 sm:grid-cols-4">
        <label className="sm:col-span-1">
          <span className="mb-1.5 block text-[0.9rem] font-medium">
            Savings goal
          </span>
          <input
            className="field"
            value={f.goalName ?? ""}
            onChange={set("goalName")}
            placeholder="Emergency fund"
          />
        </label>
        <label>
          <span className="mb-1.5 block text-[0.9rem] font-medium">Target</span>
          <input
            className="field num"
            inputMode="decimal"
            value={f.goalTarget ?? ""}
            onChange={set("goalTarget")}
          />
        </label>
        <label>
          <span className="mb-1.5 block text-[0.9rem] font-medium">
            Saved so far
          </span>
          <input
            className="field num"
            inputMode="decimal"
            value={f.goalSaved ?? ""}
            onChange={set("goalSaved")}
          />
        </label>
        <label>
          <span className="mb-1.5 block text-[0.9rem] font-medium">By</span>
          <input
            className="field"
            type="date"
            value={f.goalDeadline ?? ""}
            onChange={set("goalDeadline")}
          />
        </label>
      </div>
      {devLogs?.enabled && (
        <div className="rounded-2xl border border-marigold/30 bg-marigold-soft/45 p-4 sm:flex sm:items-center sm:justify-between sm:gap-5">
          <div className="flex gap-3">
            <Archive className="mt-0.5 shrink-0 text-marigold" size={20} />
            <div>
              <p className="font-semibold">
                Development conversation logging is on
              </p>
              <p className="mt-1 text-[0.84rem] text-muted">
                Logs can contain conversation and financial text from every
                local workspace. Archiving moves the complete active log to a
                timestamped file and starts a new one with the next message.
              </p>
              <p className="num mt-1.5 break-all text-[0.76rem] text-faint">
                Active file: {devLogs.active_path}
              </p>
            </div>
          </div>
          <button
            className="btn-ghost mt-3 shrink-0 sm:mt-0"
            onClick={archiveLogs}
            disabled={archiving || !devLogs.has_active_log}
          >
            {archiving ? (
              <Loader2 size={17} className="animate-spin" />
            ) : (
              <Archive size={17} />
            )}
            {devLogs.has_active_log
              ? "Archive current log"
              : "No active log yet"}
          </button>
        </div>
      )}
      <button className="btn-primary" onClick={save}>
        Save changes
      </button>
    </div>
  );
}

export default function Accounts() {
  const qc = useQueryClient();
  const { reset } = useChat();
  const { data } = useQuery({ queryKey: ["accounts"], queryFn: api.accounts });
  const active = data?.accounts.find((a) => a.id === data.active);

  useEffect(() => {
    if (window.location.hash === "#upload")
      document.getElementById("upload")?.scrollIntoView({ behavior: "smooth" });
  }, []);
  const remove = async () => {
    if (!active) return;
    await api.deleteAccount(active.id);
    reset();
    await qc.invalidateQueries();
    toast.success(
      active.kind === "demo"
        ? "Demo reset to its original data"
        : "Account deleted from this computer",
    );
  };

  return (
    <div className="space-y-8">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-forest/75">
          Your workspace
        </p>
        <h1 className="mt-1 text-[2rem] font-bold leading-tight">
          Settings & accounts
        </h1>
        <p className="mt-1 max-w-2xl text-muted">
          Review and update the information BudgetWise uses for your current
          workspace. Sample profiles are available separately under View
          example.
        </p>
      </div>

      {active && (
        <Section
          title={`Financial settings for ${active.name}`}
          aside={
            active.kind === "demo" ? "Example mode" : "Saved on this computer"
          }
        >
          <SettingsForm />
        </Section>
      )}

      <div className="grid gap-6 lg:grid-cols-[1fr_1.6fr]">
        <Section title="Add details in your own words">
          <div className="flex h-full flex-col">
            <PencilLine className="text-forest" />
            <p className="mt-2 flex-1 text-[0.93rem] text-muted">
              Add or correct income, bills, balances, and goals
              conversationally. Every question is optional.
            </p>
            <Link to="/" className="btn-primary mt-4 self-start">
              Continue with BudgetWise <ArrowRight size={17} />
            </Link>
          </div>
        </Section>
        <div id="upload" className="scroll-mt-24">
          <Section title="Use your bank's CSV">
            <Uploader />
          </Section>
        </div>
      </div>

      {active && (
        <Section
          title="Workspace data controls"
          aside="This action cannot be undone"
        >
          <p className="mb-3 max-w-2xl text-sm text-muted">
            Your conversation can be cleared separately without removing saved
            financial records. Deleting this workspace removes its saved
            settings and activity from this computer.
          </p>
          <button
            onClick={remove}
            className="btn-ghost text-berry hover:text-berry"
          >
            <Trash2 size={16} />{" "}
            {active.kind === "demo"
              ? `Reset ${active.name}'s demo`
              : `Delete ${active.name} from this computer`}
          </button>
        </Section>
      )}
    </div>
  );
}
