import { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import * as Dropdown from "@radix-ui/react-dropdown-menu";
import { CalendarDays, ChevronsUpDown, Check, Moon, Sun, Upload, ReceiptText, House, Settings2, PencilLine, Sparkles } from "lucide-react";
import { api } from "@/lib/api";
import { useChat } from "@/lib/chat";
import { cn } from "@/lib/format";

const NAV = [
  { to: "/", label: "Home", icon: House, end: true },
  { to: "/spending", label: "Activity", icon: ReceiptText },
  { to: "/plan", label: "Plan", icon: CalendarDays },
];

export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <svg className="brand-mark" width="27" height="27" viewBox="0 0 64 64" aria-hidden>
        <path className="brand-mark-primary" d="M5 48 24 28 36 38 57 12" stroke="rgb(var(--forest))" strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M43 12h14v14" stroke="rgb(var(--marigold))" strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span className="hidden font-display text-[1.18rem] font-bold tracking-tight min-[360px]:inline">BudgetWise</span>
    </span>
  );
}

function useTheme() {
  const [dark, setDark] = useState(() => document.documentElement.classList.contains("dark"));
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    try { localStorage.setItem("bw-theme", dark ? "dark" : "light"); } catch { /* private mode */ }
  }, [dark]);
  return { dark, toggle: () => setDark((d) => !d) };
}

function AccountSwitcher({ compact = false }: { compact?: boolean }) {
  const qc = useQueryClient();
  const nav = useNavigate();
  const { reset, busy } = useChat();
  const { data } = useQuery({ queryKey: ["accounts"], queryFn: api.accounts });
  const active = data?.accounts.find((a) => a.id === data.active);

  const pick = async (id: string) => {
    await api.setActive(id);
    reset(false);
    await qc.invalidateQueries();
  };

  return (
    <Dropdown.Root>
      <Dropdown.Trigger
        disabled={busy}
        className={cn(
          "flex w-full items-center gap-3 rounded-xl border border-line bg-surface px-3 py-2.5 text-left hover:bg-sunken",
          compact && "w-auto border-0 bg-transparent px-2 py-1.5",
        )}
        aria-label="Switch account"
      >
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-forest-soft text-sm font-bold text-forest">{active?.kind === "demo" ? active.emoji : "MW"}</span>
        {compact && <span className="hidden text-sm font-medium xl:inline">{active?.kind === "demo" ? active.name : "My workspace"}</span>}
        {!compact && (
          <span className="min-w-0 flex-1">
            <span className="block truncate font-semibold leading-tight">{active?.name ?? "Loading"}</span>
            <span className="block truncate text-[0.8rem] text-muted">{active?.kind === "demo" ? `Demo: ${active.tagline}` : "Your account"}</span>
          </span>
        )}
        <ChevronsUpDown size={16} className="shrink-0 text-faint" />
      </Dropdown.Trigger>
      <Dropdown.Portal>
        <Dropdown.Content sideOffset={8} align="start"
          className="z-50 w-72 rounded-2xl border border-line bg-surface p-1.5 shadow-lift animate-rise">
          <Dropdown.Label className="px-3 pb-1 pt-2 text-[0.8rem] text-muted">Your workspace</Dropdown.Label>
          {data?.accounts.filter((a) => a.kind === "personal").map((a) => (
            <Dropdown.Item key={a.id} onSelect={() => pick(a.id)}
              className="flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2 outline-none data-[highlighted]:bg-sunken">
              <span className="text-lg">{a.emoji}</span>
              <span className="flex-1 font-medium">{a.name}</span>
              {a.id === data.active && <Check size={16} className="text-forest" />}
            </Dropdown.Item>
          ))}
          <Dropdown.Separator className="my-1.5 h-px bg-line" />
          <Dropdown.Item onSelect={() => nav("/examples")}
            className="flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2 font-medium outline-none data-[highlighted]:bg-sunken">
            <Sparkles size={18} className="text-marigold" /> View example profiles
          </Dropdown.Item>
          <Dropdown.Item onSelect={() => nav("/accounts")}
            className="flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2 font-medium outline-none data-[highlighted]:bg-sunken">
            <Settings2 size={18} /> Settings and accounts
          </Dropdown.Item>
          <Dropdown.Item onSelect={() => nav("/accounts#upload")}
            className="flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2 font-medium text-forest outline-none data-[highlighted]:bg-sunken">
            <Upload size={18} /> Add your bank's CSV
          </Dropdown.Item>
          <Dropdown.Item onSelect={() => nav("/setup?new=1")}
            className="flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2 font-medium text-forest outline-none data-[highlighted]:bg-sunken">
            <PencilLine size={18} /> Start without a file
          </Dropdown.Item>
        </Dropdown.Content>
      </Dropdown.Portal>
    </Dropdown.Root>
  );
}

function DemoNotice() {
  const qc = useQueryClient();
  const { reset } = useChat();
  const { data } = useQuery({ queryKey: ["accounts"], queryFn: api.accounts });
  const active = data?.accounts.find((a) => a.id === data.active);
  const mine = data?.accounts.find((a) => a.kind === "personal");
  if (active?.kind !== "demo" || !mine) return null;
  const leave = async () => {
    await api.setActive(mine.id);
    reset(false);
    await qc.invalidateQueries();
  };
  return <div className="sticky top-3 z-20 mb-5 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-marigold/35 bg-marigold-soft px-4 py-3 text-[0.9rem] shadow-sm"><span><strong>Example mode:</strong> You're viewing {active.name}'s sample data. Nothing here is part of your personal workspace.</span><button onClick={() => void leave()} className="btn bg-surface px-3 py-1.5 text-[0.85rem] text-ink hover:bg-sunken">Return to my workspace</button></div>;
}

export default function Layout() {
  const { dark, toggle } = useTheme();
  const loc = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [loc.pathname]);
  const ThemeIcon = dark ? Sun : Moon;

  return (
    <div className="min-h-screen">
      {/* Desktop rail */}
      <aside className="hidden">
        <Logo className="px-2" />
        <AccountSwitcher />
        <nav className="flex flex-col gap-1" aria-label="Main">
          {NAV.map(({ to, label, icon: Icon, end }) => (
            <NavLink key={to} to={to} end={end}
              className={({ isActive }) => cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 font-medium text-muted hover:bg-sunken hover:text-ink",
                isActive && "bg-forest-soft text-forest hover:bg-forest-soft hover:text-forest",
              )}>
              <Icon size={19} strokeWidth={2.1} /> {label}
            </NavLink>
          ))}
        </nav>
        <div className="mt-auto space-y-3">
          <button onClick={toggle} className="btn-ghost w-full justify-start px-3">
            <ThemeIcon size={18} /> {dark ? "Light mode" : "Dark mode"}
          </button>
        </div>
      </aside>

      {/* Mobile top bar */}
      <header className="brand-header sticky top-0 z-30 flex min-h-[64px] items-center justify-between gap-2 border-b border-white/10 px-3 py-2 text-white shadow-sm min-[360px]:gap-4 min-[360px]:px-4 sm:px-8">
        <Logo />
        <nav className="hidden items-center gap-3 md:flex" aria-label="Main">
          {NAV.map(({ to, label, end }) => <NavLink key={to} to={to} end={end} className={({ isActive }) => cn("rounded-xl px-4 py-2 text-sm font-semibold transition-colors", isActive ? "bg-white/16 text-white" : "text-white/80 hover:bg-white/10 hover:text-white")}>{label}</NavLink>)}
        </nav>
        <div className="flex items-center gap-1">
          <Link to="/examples" className="btn-ghost hidden text-sm lg:inline-flex">View example</Link>
          <Link to="/accounts" className="btn-ghost hidden text-sm sm:inline-flex"><Settings2 size={17} /> Settings</Link>
          <AccountSwitcher compact />
          <button onClick={toggle} className="btn-ghost p-2" aria-label={dark ? "Light mode" : "Dark mode"}><ThemeIcon size={18} /></button>
        </div>
      </header>

      <main className="min-w-0 px-4 pb-24 pt-4 sm:px-8 md:pb-3 lg:pt-5">
        <div className="mx-auto max-w-[1480px]">
          <DemoNotice />
          <Outlet />
        </div>
      </main>

      {/* Mobile tab bar */}
      <nav className="fixed inset-x-0 bottom-0 z-30 grid border-t border-line bg-surface/95 pb-[env(safe-area-inset-bottom)] backdrop-blur md:hidden" style={{ gridTemplateColumns: `repeat(${NAV.length}, minmax(0, 1fr))` }} aria-label="Main">
        {NAV.map(({ to, label, icon: Icon, end }) => (
          <NavLink key={to} to={to} end={end}
            className={({ isActive }) => cn("flex flex-col items-center gap-0.5 py-2.5 text-[0.72rem] font-medium text-muted", isActive && "text-forest")}>
            <Icon size={21} strokeWidth={2.1} /> {label}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
