import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { Check } from "lucide-react";
import { toast } from "sonner";
import { Section } from "@/components/Bits";
import { api } from "@/lib/api";
import { useChat } from "@/lib/chat";
import { cn } from "@/lib/format";

export default function Examples() {
  const qc = useQueryClient();
  const nav = useNavigate();
  const { reset } = useChat();
  const { data } = useQuery({ queryKey: ["accounts"], queryFn: api.accounts });

  const view = async (id: string) => {
    await api.setActive(id);
    reset(false);
    await qc.invalidateQueries();
    toast.success(
      "Example opened. Your personal information remains separate.",
    );
    nav("/");
  };

  return (
    <div className="space-y-6">
      <header>
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-forest/75">
          Sample data only
        </p>
        <h1 className="mt-1 text-[2rem] font-bold leading-tight">
          Example profiles
        </h1>
        <p className="mt-1 max-w-3xl text-muted">
          Explore a filled-in BudgetWise workspace without changing or mixing it
          with your information. A banner will clearly identify example mode.
        </p>
      </header>
      <Section
        title="Choose a financial situation to explore"
        aside="Separate from your workspace"
      >
        <div className="grid gap-4 md:grid-cols-3">
          {data?.personas.map((p) => {
            const id = `demo-${p.id}`;
            const on = data.active === id;
            return (
              <article
                key={p.id}
                className={cn(
                  "flex flex-col rounded-2xl border p-5",
                  on ? "border-forest/50 bg-forest-soft/40" : "border-line",
                )}
              >
                <div className="flex items-center gap-3">
                  <span className="grid h-12 w-12 place-items-center rounded-full bg-sunken text-2xl">
                    {p.emoji}
                  </span>
                  <div>
                    <h2 className="font-display text-lg font-bold leading-tight">
                      {p.name}
                    </h2>
                    <p className="text-sm text-muted">{p.tagline}</p>
                  </div>
                </div>
                <p className="mt-4 flex-1 text-[0.93rem] leading-relaxed text-muted">
                  {p.description}
                </p>
                <button
                  onClick={() => void view(id)}
                  disabled={on}
                  className={cn("mt-5", on ? "btn-quiet" : "btn-primary")}
                >
                  {on ? (
                    <>
                      <Check size={17} /> Viewing example
                    </>
                  ) : (
                    `View ${p.name}'s example`
                  )}
                </button>
              </article>
            );
          })}
        </div>
      </Section>
    </div>
  );
}
