import {
  Area,
  AreaChart,
  CartesianGrid,
  ReferenceDot,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { MonthRow, Snapshot } from "@/lib/api";
import { catInfo, CatIcon } from "@/lib/categories";
import { cn, day, money, shortDay } from "@/lib/format";

const css = (v: string, a = 1) => `rgb(var(--${v}) / ${a})`;

/** Projected balance through the next pay cycle, with bills, paydays and the low point marked. */
export function ForecastChart({ s }: { s: Snapshot }) {
  const pts = s.forecast.points;
  const low = pts.reduce((a, b) => (b.balance < a.balance ? b : a), pts[0]);
  const danger = low.balance < Math.max(50, s.savings_buffer * 0.5);
  return (
    <div className="h-[280px] w-full">
      <ResponsiveContainer>
        <AreaChart
          data={pts}
          margin={{ top: 18, right: 12, bottom: 0, left: 0 }}
        >
          <defs>
            <linearGradient id="fc" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor={css("forest")} stopOpacity={0.28} />
              <stop
                offset="100%"
                stopColor={css("forest")}
                stopOpacity={0.02}
              />
            </linearGradient>
          </defs>
          <CartesianGrid
            vertical={false}
            stroke={css("line")}
            strokeDasharray="3 4"
          />
          <XAxis
            dataKey="date"
            tickFormatter={shortDay}
            tick={{ fill: css("faint"), fontSize: 12 }}
            axisLine={false}
            tickLine={false}
            interval="preserveStartEnd"
            minTickGap={28}
          />
          <YAxis
            tickFormatter={(v) => money(v, true)}
            tick={{ fill: css("faint"), fontSize: 12 }}
            axisLine={false}
            tickLine={false}
            width={64}
          />
          <Tooltip
            cursor={{ stroke: css("muted", 0.4) }}
            content={({ active, payload }) => {
              if (!active || !payload?.length) return null;
              const p = payload[0]
                .payload as Snapshot["forecast"]["points"][number];
              return (
                <div className="rounded-xl border border-line bg-surface px-3 py-2 text-[0.85rem] shadow-lift">
                  <div className="font-semibold">{day(p.date)}</div>
                  <div className="num">Balance about {money(p.balance)}</div>
                  {p.bill ? (
                    <div className="num text-berry">Bills −{money(p.bill)}</div>
                  ) : null}
                  {p.income ? (
                    <div className="num text-forest">
                      Pay +{money(p.income)}
                    </div>
                  ) : null}
                </div>
              );
            }}
          />
          <ReferenceLine
            x={s.next_payday}
            stroke={css("marigold")}
            strokeDasharray="4 4"
            label={{
              value: "Payday",
              position: "top",
              fill: css("marigold"),
              fontSize: 12,
              fontWeight: 600,
            }}
          />
          {s.savings_buffer > 0 && (
            <ReferenceLine
              y={s.savings_buffer}
              stroke={css("muted", 0.5)}
              strokeDasharray="2 5"
            />
          )}
          <Area
            type="monotone"
            dataKey="balance"
            stroke={css("forest")}
            strokeWidth={2.4}
            fill="url(#fc)"
          />
          <ReferenceDot
            x={low.date}
            y={low.balance}
            r={5}
            fill={danger ? css("berry") : css("ink")}
            stroke={css("surface")}
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

/** This month so far vs. the same days last month, one row per category. */
export function MonthBars({
  rows,
  lastLabel,
}: {
  rows: MonthRow[];
  lastLabel: string;
}) {
  const visible = rows
    .filter((r) => r.this_month > 0 || r.last_month_same_days > 0)
    .slice(0, 7);
  const max = Math.max(
    1,
    ...visible.flatMap((r) => [r.this_month, r.last_month_same_days]),
  );
  return (
    <ul className="space-y-3.5">
      {visible.map((r) => {
        const c = catInfo(r.category);
        const up = r.change > 0.5;
        return (
          <li key={r.category} className="flex items-center gap-3">
            <CatIcon id={r.category} size={16} />
            <div className="min-w-0 flex-1">
              <div className="flex items-baseline justify-between gap-2">
                <span className="truncate text-[0.92rem] font-medium">
                  {c.label}
                </span>
                <span className="num text-[0.92rem] font-semibold">
                  {money(r.this_month)}
                </span>
              </div>
              <div
                className="relative mt-1.5 h-2 rounded-full bg-sunken"
                aria-hidden
              >
                <div
                  className="absolute inset-y-0 left-0 rounded-full"
                  style={{
                    width: `${(r.this_month / max) * 100}%`,
                    background: c.hue,
                  }}
                />
                <div
                  className="absolute -top-1 h-4 w-0.5 rounded bg-ink/60"
                  style={{
                    left: `calc(${(r.last_month_same_days / max) * 100}% - 1px)`,
                  }}
                  title={`${lastLabel}: ${money(r.last_month_same_days)}`}
                />
              </div>
              <div
                className={cn(
                  "num mt-1 text-[0.78rem]",
                  up
                    ? "text-berry"
                    : r.change < -0.5
                      ? "text-forest"
                      : "text-muted",
                )}
              >
                {r.last_month_same_days < 1
                  ? `New this month (nothing by now in ${lastLabel})`
                  : Math.abs(r.change) <= 0.5
                    ? `Same as ${lastLabel}`
                    : `${money(Math.abs(r.change))} ${up ? "more" : "less"} than by now in ${lastLabel} (${money(r.last_month_same_days)})`}
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
