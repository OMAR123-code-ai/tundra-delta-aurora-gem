import { useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { DbsMark } from "@/components/brand/logo";
import { ShopShell } from "@/components/shop/shop-shell";
import { Button } from "@/components/ui/button";
import { useDbs } from "@/lib/store";
import { useHydrated } from "@/lib/use-hydrated";
import { formatCfa } from "@/lib/format";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/paiement/$orderId")({
  component: PayPage,
});

function PayPage() {
  const { orderId } = Route.useParams();
  const hydrated = useHydrated();
  const orders = useDbs((s) => s.orders);
  const methods = useDbs((s) => s.paymentMethods);
  const payOrder = useDbs((s) => s.payOrder);
  const order = orders.find((o) => o.id === orderId);
  const enabled = methods.filter((m) => m.enabled);
  const [method, setMethod] = useState(order?.paymentMethod ?? enabled[0]?.name ?? "Orange Money");
  const [busy, setBusy] = useState(false);

  if (!order) {
    if (!hydrated) {
      return (
        <ShopShell>
          <p className="px-4 py-20 text-center text-sm text-muted-foreground">
            Chargement du paiement…
          </p>
        </ShopShell>
      );
    }
    throw notFound();
  }

  const paid = order.paymentStatus === "reussi";

  async function confirm() {
    setBusy(true);
    await new Promise((r) => setTimeout(r, 800));
    payOrder(orderId, true);
    setBusy(false);
    toast.success("Paiement confirmé");
  }

  return (
    <ShopShell>
      <div className="mx-auto flex max-w-md flex-col items-center px-4 py-12">
        <div className="dbs-panel w-full p-6">
          <div className="flex flex-col items-center text-center">
            <DbsMark className="size-16" />
            <p className="mt-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Paiement sécurisé DBS
            </p>
            <h1 className="mt-2 font-display text-xl font-semibold">Commande {order.id}</h1>
            <p className="mt-1 text-sm text-muted-foreground">Montant</p>
            <p className="font-display text-3xl font-semibold tabular-nums">{formatCfa(order.amount)}</p>
          </div>

          {paid ? (
            <div className="mt-6 flex flex-col items-center gap-3 text-center">
              <CheckCircle2 className="size-10 text-success" />
              <p className="font-medium">Paiement reçu</p>
              <p className="text-sm text-muted-foreground">
                Merci {order.customerName}. Votre commande est en cours de préparation.
              </p>
              <Button asChild className="mt-2">
                <Link to="/boutique">Retour à la boutique</Link>
              </Button>
            </div>
          ) : (
            <>
              <div className="mt-6 space-y-2">
                {enabled.map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setMethod(m.name)}
                    className={cn(
                      "flex w-full items-center justify-between rounded-lg border px-3 py-3 text-sm",
                      method === m.name ? "border-primary bg-primary/10" : "border-border",
                    )}
                  >
                    <span>{m.name}</span>
                    <span
                      className={cn(
                        "size-3 rounded-full",
                        m.tone === "orange" && "bg-pay-orange",
                        m.tone === "moov" && "bg-pay-moov",
                        m.tone === "wave" && "bg-pay-wave",
                        m.tone === "card" && "bg-info",
                        m.tone === "bank" && "bg-muted-foreground",
                      )}
                    />
                  </button>
                ))}
              </div>
              <Button className="mt-6 w-full" disabled={busy} onClick={() => void confirm()}>
                {busy ? "Traitement…" : "Payer maintenant"}
              </Button>
            </>
          )}
        </div>
      </div>
    </ShopShell>
  );
}
