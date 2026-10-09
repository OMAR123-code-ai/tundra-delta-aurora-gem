import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { DbsMark } from "@/components/brand/logo";
import { ShopShell } from "@/components/shop/shop-shell";
import { Button } from "@/components/ui/button";
import { useDbs } from "@/lib/store";
import { formatCfa } from "@/lib/format";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export const Route = createFileRoute("/boutique")({
  component: BoutiquePage,
});

const cats = ["Tous", "Électronique", "Accessoires", "Vêtements"] as const;

function BoutiquePage() {
  const products = useDbs((s) => s.products);
  const addToCart = useDbs((s) => s.addToCart);
  const bumpVisitors = useDbs((s) => s.bumpVisitors);
  const settings = useDbs((s) => s.settings);
  const [cat, setCat] = useState<(typeof cats)[number]>("Tous");
  const live = products.filter((p) => p.status !== "en-attente");
  const rows = live.filter((p) => cat === "Tous" || p.category === cat);

  useEffect(() => {
    bumpVisitors();
  }, [bumpVisitors]);

  return (
    <ShopShell>
      <section className="border-b border-border bg-[radial-gradient(circle_at_top,rgba(232,184,74,0.16),transparent_50%)]">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-4 px-4 py-8 sm:py-10">
          <DbsMark className="size-12" />
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
            Digital Business Store
          </p>
          <h1 className="max-w-xl font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            {settings.tagline}
          </h1>
          <p className="max-w-lg text-sm text-muted-foreground sm:text-base">
            Électronique, accessoires et essentials — payez en Orange Money, Moov Money ou Wave.
          </p>
          <Button asChild>
            <a href="#catalogue">Voir le catalogue</a>
          </Button>
        </div>
      </section>
      <section id="catalogue" className="mx-auto max-w-6xl px-4 py-8">
        <div className="mb-6 flex flex-wrap gap-2">
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
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {rows.map((p) => (
            <article key={p.id} className="dbs-panel overflow-hidden p-2">
              <Link to="/boutique/$id" params={{ id: p.slug }} className="block">
                <img
                  src={p.image}
                  alt={p.name}
                  className="aspect-square w-full rounded-lg object-cover"
                />
              </Link>
              <div className="space-y-2 p-3">
                <p className="text-xs text-muted-foreground">{p.category}</p>
                <Link to="/boutique/$id" params={{ id: p.slug }} className="font-medium hover:text-primary">
                  {p.name}
                </Link>
                <p className="font-display text-lg font-semibold tabular-nums">{formatCfa(p.price)}</p>
                <Button
                  className="w-full"
                  disabled={p.stock <= 0}
                  onClick={() => {
                    addToCart(p.id);
                    toast.success(`${p.name} ajouté au panier`);
                  }}
                >
                  {p.stock <= 0 ? "Épuisé" : "Ajouter au panier"}
                </Button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </ShopShell>
  );
}
