import { Badge } from "@/components/ui/badge";
import type { OrderStatus, PaymentStatus, ProductStatus } from "@/lib/types";

const productMap = {
  "en-ligne": { label: "En ligne", variant: "success" as const },
  "en-attente": { label: "En attente", variant: "warning" as const },
  epuise: { label: "Épuisé", variant: "danger" as const },
};

const orderMap = {
  "en-cours": { label: "En cours", variant: "warning" as const },
  expediee: { label: "Expédiée", variant: "info" as const },
  livree: { label: "Livrée", variant: "success" as const },
  annulee: { label: "Annulée", variant: "muted" as const },
};

const payMap = {
  reussi: { label: "Réussi", variant: "success" as const },
  "en-attente": { label: "En attente", variant: "warning" as const },
  echec: { label: "Échec", variant: "danger" as const },
};

export function ProductStatusBadge({ status }: { status: ProductStatus }) {
  const m = productMap[status];
  return <Badge variant={m.variant}>{m.label}</Badge>;
}

export function OrderStatusBadge({ status }: { status: OrderStatus }) {
  const m = orderMap[status];
  return <Badge variant={m.variant}>{m.label}</Badge>;
}

export function PaymentStatusBadge({ status }: { status: PaymentStatus }) {
  const m = payMap[status];
  return <Badge variant={m.variant}>{m.label}</Badge>;
}
