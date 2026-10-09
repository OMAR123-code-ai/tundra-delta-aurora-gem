import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowUpRight,
  Banknote,
  ShoppingCart,
  Store,
  Users,
  Wallet,
} from "lucide-react";
import { format, subDays } from "date-fns";
import { fr } from "date-fns/locale";
import { useMemo, useState } from "react";
import { KpiCard } from "@/components/kpi-card";
import { SalesChart } from "@/components/sales-chart";
import { ProductThumb } from "@/components/product-thumb";
import { DbsMark } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useDbs } from "@/lib/store";
import { formatCfa, formatInt } from "@/lib/format";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_admin/")({
  component: DashboardPage,
});

function deltaPct(curr: number, prev: number) {
  if (prev === 0) return curr > 0 ? 100 : 0;
  return ((curr - prev) / prev) * 100;
}

function DashboardPage() {
  const [range, setRange] = useState("7");
  const products = useDbs((s) => s.products);
  const orders = useDbs((s) => s.orders);
  const visitors = useDbs((s) => s.visitors);
  const days = Number(range);

  const stats = useMemo(() => {
    const now = Date.now();
    const cut = now - days * 86400000;
    const prevCut = now - days * 2 * 86400000;
    const paid = (from: number, to: number) =>
      orders.filter((o) => {
        const t = new Date(o.date).getTime();
        return o.paymentStatus === "reussi" && o.status !== "annulee" && t >= from && t < to;
      });
    const curr = paid(cut, now);
    const prev = paid(prevCut, cut);
    const sum = (xs: typeof curr) => xs.reduce((n, o) => n + o.amount, 0);
    const revenue = sum(curr);
    const count = curr.length;
    const series = Array.from({ length: days }, (_, i) => {
      const d = subDays(new Date(), days - 1 - i);
      const key = d.toISOString().slice(0, 10);
      const value = orders
        .filter(
          (o) =>
            o.paymentStatus === "reussi" &&
            o.status !== "annulee" &&
            o.date.slice(0, 10) === key,
        )
        .reduce((n, o) => n + o.amount, 0);
      return { label: format(d, "d MMM", { locale: fr }), value };
    });
    return {
      revenue,
      revenueDelta: deltaPct(revenue, sum(prev)),
      count,
      countDelta: deltaPct(count, prev.length),
      avg: count ? revenue / count : 0,
      avgDelta: deltaPct(count ? revenue / count : 0, prev.length ? sum(prev) / prev.length : 0),
      conversion: visitors ? (count / visitors) * 100 : 0,
      series,
    };
  }, [orders, days, visitors]);

  const top = [...products].sort((a, b) => b.revenue - a.revenue).slice(0, 5);
  const lowStock = products.filter((p) => p.stock <= 3).length;
  const pending = orders.filter((o) => o.paymentStatus === "en-attente").length;
  const open = orders.filter((o) => o.status === "en-cours").length;

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold tracking-tight">Bonjour, Admin DBS</h1>
          <p className="text-sm text-muted-foreground">
            Voici un aperçu de votre boutique aujourd’hui.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 xl:grid-cols-5">
        <KpiCard
          label="Chiffre d’affaires"
          value={formatCfa(stats.revenue)}
          delta={stats.revenueDelta}
          icon={Banknote}
        />
        <KpiCard label="Commandes" value={formatInt(stats.count)} delta={stats.countDelta} icon={ShoppingCart} />
        <KpiCard label="Visiteurs" value={formatInt(visitors)} delta={15.2} icon={Users} />
        <KpiCard
          label="Taux de conversion"
          value={`${stats.conversion.toLocaleString("fr-FR", { maximumFractionDigits: 1 })}%`}
          delta={0.7}
          icon={ArrowUpRight}
        />
        <KpiCard
          label="Panier moyen"
          value={formatCfa(stats.avg)}
          delta={stats.avgDelta}
          icon={Wallet}
        />
      </div>

      <div className="grid gap-3 xl:grid-cols-12">
        <section className="dbs-panel p-5 xl:col-span-6">
          <div className="mb-3 flex items-center justify-between gap-3">
            <h2 className="text-sm font-semibold">Évolution des ventes</h2>
            <Select value={range} onValueChange={setRange}>
              <SelectTrigger className="h-8 w-40 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7">7 derniers jours</SelectItem>
                <SelectItem value="14">14 jours</SelectItem>
                <SelectItem value="30">30 jours</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <SalesChart data={stats.series} />
        </section>

        <section className="dbs-panel p-5 xl:col-span-3">
          <h2 className="mb-4 text-sm font-semibold">Top produits</h2>
          <ul className="space-y-3">
            {top.map((p) => (
              <li key={p.id} className="flex items-center gap-3">
                <ProductThumb src={p.image} alt={p.name} />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{p.name}</p>
                  <p className="text-xs text-muted-foreground">{formatInt(p.sold)} ventes</p>
                </div>
                <p className="text-sm font-medium tabular-nums">{formatCfa(p.revenue)}</p>
              </li>
            ))}
          </ul>
        </section>

        <div className="grid gap-3 xl:col-span-3">
          <section className="dbs-panel flex flex-col items-start gap-3 bg-[radial-gradient(circle_at_top_right,rgba(232,184,74,0.16),transparent_55%)] p-5">
            <DbsMark className="size-12" />
            <p className="font-display text-sm font-semibold uppercase tracking-wide text-primary">
              L’innovation au service de votre quotidien
            </p>
            <Button asChild size="sm">
              <Link to="/boutique">
                Gérer ma boutique
                <Store className="size-4" />
              </Link>
            </Button>
          </section>
          <section className="dbs-panel p-5">
            <h2 className="mb-3 text-sm font-semibold">Alertes</h2>
            <ul className="space-y-2.5 text-sm">
              <AlertRow tone="danger" label={`Stock faible (${lowStock} produits)`} to="/produits" />
              <AlertRow tone="info" label={`Nouvelles commandes (${open})`} to="/commandes" />
              <AlertRow tone="warning" label={`Paiements en attente (${pending})`} to="/payment" />
              <AlertRow tone="danger" label="Erreur API (1)" to="/integrations" />
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}

function AlertRow({
  tone,
  label,
  to,
}: {
  tone: "danger" | "info" | "warning";
  label: string;
  to: "/produits" | "/commandes" | "/payment" | "/integrations";
}) {
  return (
    <Link to={to} className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
      <span
        className={cn(
          "size-2 rounded-full",
          tone === "danger" && "bg-danger",
          tone === "info" && "bg-info",
          tone === "warning" && "bg-warning",
        )}
      />
      <span className="flex-1">{label}</span>
    </Link>
  );
}
