import { useState, type FormEvent } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { ShopShell } from "@/components/shop/shop-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDbs } from "@/lib/store";
import { formatCfa } from "@/lib/format";

export const Route = createFileRoute("/panier")({
  component: CartPage,
});

function CartPage() {
  const cart = useDbs((s) => s.cart);
  const products = useDbs((s) => s.products);
  const methods = useDbs((s) => s.paymentMethods);
  const setCartQty = useDbs((s) => s.setCartQty);
  const removeFromCart = useDbs((s) => s.removeFromCart);
  const checkout = useDbs((s) => s.checkout);
  const navigate = useNavigate();
  const enabled = methods.filter((m) => m.enabled);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("Abidjan");
  const [method, setMethod] = useState(enabled[0]?.name ?? "Orange Money");

  const lines = cart
    .map((c) => {
      const product = products.find((p) => p.id === c.productId);
      if (!product) return null;
      return { ...c, product };
    })
    .filter((x): x is NonNullable<typeof x> => Boolean(x));
  const total = lines.reduce((n, l) => n + l.product.price * l.qty, 0);

  function submit(e: FormEvent) {
    e.preventDefault();
    if (!lines.length) return;
    const id = checkout({ name, phone, city, method });
    if (!id) return;
    toast.success("Commande créée");
    void navigate({ to: "/paiement/$orderId", params: { orderId: id } });
  }

  return (
    <ShopShell>
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 lg:grid-cols-[1fr_360px]">
        <section>
          <h1 className="font-display text-2xl font-semibold">Panier</h1>
          {lines.length === 0 ? (
            <p className="mt-6 text-sm text-muted-foreground">
              Votre panier est vide.{" "}
              <Link to="/boutique" className="text-primary">
                Continuer les achats
              </Link>
            </p>
          ) : (
            <ul className="mt-6 space-y-3">
              {lines.map((l) => (
                <li key={l.productId} className="dbs-panel flex items-center gap-3 p-3">
                  <img src={l.product.image} alt="" className="size-16 rounded-md object-cover" />
                  <div className="min-w-0 flex-1">
                    <p className="font-medium">{l.product.name}</p>
                    <p className="text-sm tabular-nums text-muted-foreground">
                      {formatCfa(l.product.price)}
                    </p>
                  </div>
                  <Input
                    type="number"
                    min={1}
                    value={l.qty}
                    className="w-16"
                    onChange={(e) => setCartQty(l.productId, Number(e.target.value))}
                  />
                  <Button variant="ghost" size="sm" onClick={() => removeFromCart(l.productId)}>
                    Retirer
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </section>
        <form className="dbs-panel h-fit space-y-3 p-5" onSubmit={submit}>
          <h2 className="font-semibold">Paiement</h2>
          <p className="text-2xl font-display font-semibold tabular-nums">{formatCfa(total)}</p>
          <div className="grid gap-1.5">
            <Label htmlFor="cname">Nom</Label>
            <Input id="cname" required value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="cphone">Téléphone</Label>
            <Input id="cphone" required value={phone} onChange={(e) => setPhone(e.target.value)} />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="ccity">Ville</Label>
            <Input id="ccity" required value={city} onChange={(e) => setCity(e.target.value)} />
          </div>
          <div className="grid gap-1.5">
            <Label>Moyen de paiement</Label>
            <Select value={method} onValueChange={setMethod}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {enabled.map((m) => (
                  <SelectItem key={m.id} value={m.name}>
                    {m.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button type="submit" className="w-full" disabled={!lines.length}>
            Payer maintenant
          </Button>
        </form>
      </div>
    </ShopShell>
  );
}
