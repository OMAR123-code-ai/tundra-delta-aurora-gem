import { useEffect, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { formatCfa } from "@/lib/format";

export function SalesChart({
  data,
}: {
  data: { label: string; value: number }[];
}) {
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  if (!ready) {
    return <div className="h-56 rounded-lg bg-secondary/60" />;
  }
  return (
    <ResponsiveContainer width="100%" height={224}>
      <AreaChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="salesFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--color-primary)" stopOpacity={0.38} />
            <stop offset="100%" stopColor="var(--color-primary)" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="label"
          tick={{ fill: "var(--color-muted-foreground)", fontSize: 11 }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tick={{ fill: "var(--color-muted-foreground)", fontSize: 11 }}
          axisLine={false}
          tickLine={false}
          tickFormatter={(v: number) =>
            v >= 1000000 ? `${Math.round(v / 100000) / 10}M` : `${Math.round(v / 1000)}k`
          }
          width={36}
        />
        <Tooltip
          contentStyle={{
            background: "var(--color-popover)",
            border: "1px solid var(--color-border)",
            borderRadius: 12,
            color: "var(--color-foreground)",
          }}
          formatter={(value) => formatCfa(Number(value ?? 0))}
        />
        <Area
          type="monotone"
          dataKey="value"
          stroke="var(--color-primary)"
          strokeWidth={2.4}
          fill="url(#salesFill)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
