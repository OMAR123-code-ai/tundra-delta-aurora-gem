import { createFileRoute, Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { ShopShell } from "@/components/shop/shop-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useDbs } from "@/lib/store";
import { useHydrated } from "@/lib/use-hydrated";
import { formatCfa } from "@/lib/format";

export const Route = createFileRoute("/boutique/$id")({
  component: ProductPage,
});

function ProductPage() {
  const { id } = Route.useParams();
  const hydrated = useHydrated();
  const products = useDbs((s) => s.products);
  const addToCart = useDbs((s) => s.addToCart);
  const product = products.find((p) => p.slug === id || p.id === id);

  if (!product) {
    return (
      <ShopShell>
        <p className="px-4 py-20 text-center text-sm text-muted-foreground">
          {hydrated ? "Produit introuvable." : "Chargement…"}
        </p>
      </ShopShell>
    );
  }

  return (
    <ShopShell>
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 lg:grid-cols-2">
        <img
          src={product.image}
          alt={product.name}
          className="w-full rounded-xl object-cover"
        />
        <div>
          <p className="text-xs uppercase tracking-widest text-muted-foreground">{product.category}</p>
          <h1 className="mt-2 font-display text-3xl font-semibold">{product.name}</h1>
          <p className="mt-3 text-sm text-muted-foreground">{product.description}</p>
          <p className="mt-6 font-display text-3xl font-semibold tabular-nums">{formatCfa(product.price)}</p>
          <div className="mt-3">
            {product.stock > 0 ? (
              <Badge variant="success">{product.stock} en stock</Badge>
            ) : (
              <Badge variant="danger">Épuisé</Badge>
            )}
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            <Button
              disabled={product.stock <= 0}
              onClick={() => {
                addToCart(product.id);
                toast.success("Ajouté au panier");
              }}
            >
              Ajouter au panier
            </Button>
            <Button asChild variant="outline">
              <Link to="/panier">Voir le panier</Link>
            </Button>
          </div>
        </div>
      </div>
    </ShopShell>
  );
}
