import { TrendingDown, TrendingUp, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatPct } from "@/lib/format";

export function KpiCard({
  label,
  value,
  delta,
  icon: Icon,
}: {
  label: string;
  value: string;
  delta: number;
  icon: LucideIcon;
}) {
  const up = delta >= 0;
  return (
    <div className="dbs-panel p-4">
      <div className="flex items-start justify-between gap-2">
        <p className="text-sm text-muted-foreground">{label}</p>
        <span className="grid size-9 place-items-center rounded-full bg-primary/10 text-primary">
          <Icon className="size-4" />
        </span>
      </div>
      <p className="mt-2 font-display text-xl font-semibold tabular-nums tracking-tight sm:text-2xl">
        {value}
      </p>
      <p
        className={cn(
          "mt-1 flex items-center gap-1 text-xs tabular-nums",
          up ? "text-success" : "text-danger",
        )}
      >
        {up ? <TrendingUp className="size-3.5" /> : <TrendingDown className="size-3.5" />}
        {formatPct(delta)}
      </p>
    </div>
  );
}
