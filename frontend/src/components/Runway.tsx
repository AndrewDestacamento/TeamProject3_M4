import { Banknote } from "lucide-react";
import type { Snapshot } from "@/lib/api";
import { cn, dayNum, money, weekday } from "@/lib/format";

/** The signature element: one tile per day from today to payday, with bills and paychecks
 *  marked where they land. It answers "how much today, and what's coming?" at a glance. */
export default function Runway({ s }: { s: Snapshot }) {
  const days = s.forecast.points
    .filter((p) => p.date <= s.next_payday)
    .slice(0, 15);
  const billsByDay = new Map<string, { name: string; amount: number }[]>();
  for (const b of s.upcoming_bills) {
    if (b.next_due <= s.next_payday)
      billsByDay.set(b.next_due, [...(billsByDay.get(b.next_due) ?? []), b]);
  }
  const usedPct =
    s.safe_per_day > 0
      ? Math.min(100, (s.spent_today / s.safe_per_day) * 100)
      : 100;
  const over = s.left_today < 0;

  return (
    <div className="relative">
      <div
        className="-mx-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0"
        role="list"
        aria-label="Days until payday"
      >
        <div className="flex min-w-max gap-2">
          {days.map((p, i) => {
            const isToday = i === 0;
            const isPayday = p.date === s.next_payday;
            const bills = billsByDay.get(p.date) ?? [];
            return (
              <div
                key={p.date}
                role="listitem"
                className={cn(
                  "flex w-[118px] flex-col rounded-2xl border px-3 pb-3 pt-2.5",
                  isToday
                    ? "border-forest/50 bg-surface shadow-lift"
                    : "border-line bg-surface/70",
                  isPayday && "border-marigold/60 bg-marigold-soft/60",
                )}
              >
                <div className="flex items-baseline justify-between">
                  <span
                    className={cn(
                      "text-[0.82rem] font-semibold",
                      isToday ? "text-forest" : "text-muted",
                    )}
                  >
                    {isToday ? "Today" : weekday(p.date)}
                  </span>
                  <span className="num text-[0.8rem] text-faint">
                    {dayNum(p.date)}
                  </span>
                </div>

                {isPayday ? (
                  <div className="mt-2 flex-1">
                    <div className="flex items-center gap-1.5 font-display text-[1.05rem] font-bold text-ink">
                      <Banknote size={17} className="text-marigold" /> Payday
                    </div>
                    {s.expected_next_paycheck && (
                      <div className="num text-[0.8rem] text-muted">
                        about {money(s.expected_next_paycheck, true)}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="mt-2 flex-1">
                    <div
                      className={cn(
                        "num font-display text-[1.05rem] font-bold",
                        isToday && over ? "text-berry" : "text-ink",
                      )}
                    >
                      {isToday
                        ? money(s.left_today)
                        : money(s.per_day_after_today)}
                    </div>
                    <div className="text-[0.78rem] text-muted">
                      {isToday
                        ? over
                          ? "over today"
                          : "left today"
                        : "to spend"}
                    </div>
                    {isToday && (
                      <div
                        className="mt-2 h-1.5 overflow-hidden rounded-full bg-sunken"
                        aria-hidden
                      >
                        <div
                          className={cn(
                            "h-full rounded-full",
                            over ? "bg-berry" : "bg-forest",
                          )}
                          style={{ width: `${usedPct}%` }}
                        />
                      </div>
                    )}
                  </div>
                )}

                {bills.length > 0 && (
                  <div className="mt-2 space-y-1">
                    {bills.slice(0, 2).map((b) => (
                      <div
                        key={b.name}
                        className="truncate rounded-lg bg-sunken px-2 py-1 text-[0.74rem] text-muted"
                        title={`${b.name} ${money(b.amount)} (already set aside)`}
                      >
                        <span className="num font-semibold text-ink">
                          {money(b.amount, true)}
                        </span>{" "}
                        {b.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
