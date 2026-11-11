import { useEffect, useState } from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import * as Dropdown from "@radix-ui/react-dropdown-menu";
import { CalendarDays, ChevronsUpDown, Check, Moon, Sun, Upload, MessageCircle, ReceiptText, House, Settings2, PencilLine, Target, Sparkles } from "lucide-react";
import { api } from "@/lib/api";
import { useChat } from "@/lib/chat";
import { cn } from "@/lib/format";

const NAV = [
  { to: "/", label: "Home", icon: House, end: true },
  { to: "/spending", label: "Activity", icon: ReceiptText },
  { to: "/plan", label: "Plan", icon: CalendarDays },
  { to: "/goals", label: "Goals", icon: Target },
  { to: "/ask", label: "Ask BudgetWise", short: "Ask", icon: MessageCircle },
];

export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <svg width="30" height="30" viewBox="0 0 64 64" aria-hidden>
        <rect width="64" height="64" rx="18" fill="rgb(var(--forest))" />
        <path d="M14 40c8 0 10-16 18-16s10 10 18 10" stroke="rgb(var(--marigold))" strokeWidth="6" fill="none" strokeLinecap="round" />
        <circle cx="50" cy="34" r="5" fill="#fff" />
      </svg>
      <span className="font-display text-[1.28rem] font-bold tracking-tight">BudgetWise</span>
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
  const { reset } = useChat();
  const { data } = useQuery({ queryKey: ["accounts"], queryFn: api.accounts });
  const active = data?.accounts.find((a) => a.id === data.active);

  const pick = async (id: string) => {
    await api.setActive(id);
    reset();
    await qc.invalidateQueries();
  };

  return (
    <Dropdown.Root>
      <Dropdown.Trigger
        className={cn(
          "flex w-full items-center gap-3 rounded-xl border border-line bg-surface px-3 py-2.5 text-left hover:bg-sunken",
          compact && "w-auto border-0 bg-transparent px-2 py-1.5",
        )}
        aria-label="Switch account"
      >
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-sunken text-lg">{active?.emoji ?? "👤"}</span>
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
          <Dropdown.Item onSelect={() => nav("/accounts#examples")}
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
    reset();
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
    <div className="min-h-screen lg:grid lg:grid-cols-[250px_1fr]">
      {/* Desktop rail */}
      <aside className="sidebar-dark sticky top-0 hidden h-screen flex-col gap-6 px-4 py-6 lg:flex">
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
      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-line bg-canvas/90 px-4 py-2.5 backdrop-blur lg:hidden">
        <Logo />
        <div className="flex items-center gap-1">
          <AccountSwitcher compact />
          <button onClick={toggle} className="btn-ghost p-2" aria-label={dark ? "Light mode" : "Dark mode"}><ThemeIcon size={18} /></button>
        </div>
      </header>

      <main className="min-w-0 px-4 pb-28 pt-5 sm:px-6 lg:px-9 lg:pb-12 lg:pt-7">
        <div className="mx-auto max-w-[1280px]">
          <DemoNotice />
          <Outlet />
        </div>
      </main>

      {/* Mobile tab bar */}
      <nav className="fixed inset-x-0 bottom-0 z-30 grid border-t border-line bg-surface/95 pb-[env(safe-area-inset-bottom)] backdrop-blur lg:hidden" style={{ gridTemplateColumns: `repeat(${NAV.length}, minmax(0, 1fr))` }} aria-label="Main">
        {NAV.map(({ to, label, short, icon: Icon, end }) => (
          <NavLink key={to} to={to} end={end}
            className={({ isActive }) => cn("flex flex-col items-center gap-0.5 py-2.5 text-[0.72rem] font-medium text-muted", isActive && "text-forest")}>
            <Icon size={21} strokeWidth={2.1} /> {short ?? label.split(" ")[0]}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
