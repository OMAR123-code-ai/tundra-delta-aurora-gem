import { useMemo } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { format, subDays } from "date-fns";
import { fr } from "date-fns/locale";
import { PageHeader } from "@/components/page-header";
import { SalesChart } from "@/components/sales-chart";
import { ProductThumb } from "@/components/product-thumb";
import { useDbs } from "@/lib/store";
import { formatCfa, formatInt } from "@/lib/format";

export const Route = createFileRoute("/_admin/analytics")({
  component: AnalyticsPage,
});

export function AnalyticsPage() {
  const orders = useDbs((s) => s.orders);
  const products = useDbs((s) => s.products);
  const visitors = useDbs((s) => s.visitors);

  const paid = orders.filter((o) => o.paymentStatus === "reussi" && o.status !== "annulee");
  const revenue = paid.reduce((n, o) => n + o.amount, 0);
  const byCat = useMemo(() => {
    const map = new Map<string, number>();
    for (const p of products) map.set(p.category, (map.get(p.category) ?? 0) + p.revenue);
    return [...map.entries()];
  }, [products]);

  const series = Array.from({ length: 14 }, (_, i) => {
    const d = subDays(new Date(), 13 - i);
    const key = d.toISOString().slice(0, 10);
    const value = paid
      .filter((o) => o.date.slice(0, 10) === key)
      .reduce((n, o) => n + o.amount, 0);
    return { label: format(d, "d MMM", { locale: fr }), value };
  });

  return (
    <div>
      <PageHeader
        title="Rapports & Analytics"
        description="Pilotez le chiffre, le mix catégorie et les best-sellers."
      />
      <div className="mb-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Stat label="CA 14 jours" value={formatCfa(revenue)} />
        <Stat label="Commandes payées" value={formatInt(paid.length)} />
        <Stat label="Visiteurs" value={formatInt(visitors)} />
        <Stat
          label="Conversion"
          value={`${((paid.length / Math.max(visitors, 1)) * 100).toLocaleString("fr-FR", { maximumFractionDigits: 1 })}%`}
        />
      </div>
      <div className="grid gap-3 lg:grid-cols-3">
        <section className="dbs-panel p-5 lg:col-span-2">
          <h2 className="mb-3 text-sm font-semibold">Ventes</h2>
          <SalesChart data={series} />
        </section>
        <section className="dbs-panel p-5">
          <h2 className="mb-3 text-sm font-semibold">Par catégorie</h2>
          <ul className="space-y-3">
            {byCat.map(([name, value]) => (
              <li key={name} className="flex items-center justify-between text-sm">
                <span>{name}</span>
                <span className="tabular-nums">{formatCfa(value)}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
      <section className="dbs-panel mt-3 p-5">
        <h2 className="mb-4 text-sm font-semibold">Best-sellers</h2>
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[...products]
            .sort((a, b) => b.sold - a.sold)
            .slice(0, 4)
            .map((p) => (
              <li key={p.id} className="flex items-center gap-3">
                <ProductThumb src={p.image} alt={p.name} />
                <div>
                  <p className="text-sm font-medium">{p.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {formatInt(p.sold)} · {formatCfa(p.revenue)}
                  </p>
                </div>
              </li>
            ))}
        </ul>
      </section>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="dbs-panel p-4">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="mt-2 font-display text-xl font-semibold tabular-nums">{value}</p>
    </div>
  );
}
