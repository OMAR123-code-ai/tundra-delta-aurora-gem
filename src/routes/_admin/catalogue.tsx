import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/page-header";
import { ProductThumb } from "@/components/product-thumb";
import { ProductStatusBadge } from "@/components/status-badge";
import { Button } from "@/components/ui/button";
import { useDbs } from "@/lib/store";
import { formatCfa } from "@/lib/format";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_admin/catalogue")({
  component: CataloguePage,
});

const cats = ["Tous", "Électronique", "Accessoires", "Vêtements"] as const;

export function CataloguePage() {
  const products = useDbs((s) => s.products);
  const [cat, setCat] = useState<(typeof cats)[number]>("Tous");
  const rows = products.filter((p) => cat === "Tous" || p.category === cat);

  return (
    <div>
      <PageHeader
        title="Catalogue"
        description="Vue vitrine de vos produits, telle que vos clients la voient."
        actions={
          <Button asChild variant="outline">
            <Link to="/boutique">Ouvrir la boutique</Link>
          </Button>
        }
      />
      <div className="mb-5 flex flex-wrap gap-2">
        {cats.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setCat(c)}
            className={cn(
              "h-9 rounded-full px-4 text-sm",
              cat === c ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground",
            )}
          >
            {c}
          </button>
        ))}
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {rows.map((p) => (
          <article key={p.id} className="dbs-panel overflow-hidden p-2">
            <ProductThumb src={p.image} alt={p.name} className="aspect-square h-auto w-full rounded-lg" />
            <div className="space-y-2 p-3">
              <div className="flex items-start justify-between gap-2">
                <h2 className="text-sm font-semibold">{p.name}</h2>
                <ProductStatusBadge status={p.status} />
              </div>
              <p className="text-xs text-muted-foreground">{p.category}</p>
              <p className="font-display text-base font-semibold tabular-nums">{formatCfa(p.price)}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
