import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Plus, Sparkles, TrendingDown, TrendingUp } from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/components/page-header";
import { ProductThumb } from "@/components/product-thumb";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useDbs } from "@/lib/store";
import { formatCfa, formatInt } from "@/lib/format";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_admin/produits-gagnants")({
  component: WinningPage,
});

export function WinningPage() {
  const products = useDbs((s) => s.products);
  const runAiScan = useDbs((s) => s.runAiScan);
  const setProductStatus = useDbs((s) => s.setProductStatus);
  const [busy, setBusy] = useState(false);
  const ranked = [...products].sort((a, b) => b.aiScore - a.aiScore);
  const revenue = products.reduce((n, p) => n + p.revenue, 0);
  const avg = products.length
    ? Math.round(products.reduce((n, p) => n + p.aiScore, 0) / products.length)
    : 0;

  async function analyze() {
    setBusy(true);
    await new Promise((r) => setTimeout(r, 900));
    runAiScan();
    setBusy(false);
    toast.success("Analyse IA terminée");
  }

  return (
    <div>
      <PageHeader
        title="Produits gagnants (IA)"
        description="Découvrez les produits les plus performants grâce à l’analyse IA."
        actions={
          <Button onClick={() => void analyze()} disabled={busy}>
            <Sparkles className="size-4" />
            {busy ? "Analyse…" : "Lancer l’analyse IA"}
          </Button>
        }
      />

      <div className="mb-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Stat label="Produits analysés" value={formatInt(products.length)} />
        <Stat label="Score moyen" value={`${avg}`} hint="+2 cette semaine" />
        <Stat label="Taux de succès" value={`${avg > 70 ? 86 : 72}%`} />
        <Stat label="Revenus estimés" value={formatCfa(revenue)} />
      </div>

      <Tabs defaultValue="list">
        <TabsList>
          <TabsTrigger value="list">Produits gagnants</TabsTrigger>
          <TabsTrigger value="ai">Analyse IA</TabsTrigger>
          <TabsTrigger value="hist">Historique</TabsTrigger>
        </TabsList>
        <TabsContent value="list">
          <div className="dbs-panel overflow-x-auto p-0">
            <table className="dbs-table w-full min-w-[760px] text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="px-4 py-3 text-left">Produit</th>
                  <th className="px-2 py-3 text-left">Score IA</th>
                  <th className="px-2 py-3 text-left">Tendance</th>
                  <th className="px-2 py-3 text-left">Potentiel</th>
                  <th className="px-4 py-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {ranked.map((p) => (
                  <tr key={p.id} className="border-b border-border last:border-0">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <ProductThumb src={p.image} alt={p.name} />
                        <span className="font-medium">{p.name}</span>
                      </div>
                    </td>
                    <td className="px-2 py-3">
                      <span
                        className={cn(
                          "inline-flex min-w-10 justify-center rounded-full px-2 py-0.5 text-xs font-semibold tabular-nums",
                          p.aiScore >= 85
                            ? "bg-success/15 text-success"
                            : p.aiScore >= 70
                              ? "bg-primary/15 text-primary"
                              : "bg-accent text-muted-foreground",
                        )}
                      >
                        {p.aiScore}
                      </span>
                    </td>
                    <td className="px-2 py-3">
                      <span className="inline-flex items-center gap-1 text-xs">
                        {p.trend === "down" ? (
                          <TrendingDown className="size-3.5 text-danger" />
                        ) : (
                          <TrendingUp className="size-3.5 text-success" />
                        )}
                        {p.trend === "up" ? "En hausse" : p.trend === "down" ? "En baisse" : "Stable"}
                      </span>
                    </td>
                    <td className="px-2 py-3">
                      <Badge
                        variant={
                          p.potential === "très élevé"
                            ? "success"
                            : p.potential === "élevé"
                              ? "default"
                              : "muted"
                        }
                      >
                        {p.potential.charAt(0).toUpperCase() + p.potential.slice(1)}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Button
                        size="sm"
                        onClick={() => {
                          setProductStatus(p.id, "en-ligne");
                          toast.success(`${p.name} mis en avant`);
                        }}
                      >
                        <Plus className="size-3.5" />
                        Ajouter
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>
        <TabsContent value="ai">
          <div className="dbs-panel space-y-3 p-5 text-sm text-muted-foreground">
            <p>
              Le score combine vélocité des ventes, marge réelle et disponibilité stock. Un score
              supérieur à 85 indique un produit à pousser en campagne.
            </p>
            <Button asChild variant="outline" size="sm">
              <Link to="/regles-prix">Ajuster les règles de prix</Link>
            </Button>
          </div>
        </TabsContent>
        <TabsContent value="hist">
          <div className="dbs-panel p-5 text-sm text-muted-foreground">
            Dernière analyse : aujourd’hui. Les scores se recalculent à chaque lancement.
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function Stat({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <div className="dbs-panel p-4">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="mt-2 font-display text-2xl font-semibold tabular-nums">{value}</p>
      {hint ? <p className="mt-1 text-xs text-success">{hint}</p> : null}
    </div>
  );
}
