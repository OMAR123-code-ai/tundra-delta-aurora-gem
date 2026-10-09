import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/page-header";
import { OrderStatusBadge } from "@/components/status-badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDbs } from "@/lib/store";
import { formatCfa, formatDate } from "@/lib/format";
import type { OrderStatus } from "@/lib/types";
import { toast } from "sonner";

export const Route = createFileRoute("/_admin/commandes")({
  component: OrdersPage,
});

const statuses: { id: "all" | OrderStatus; label: string }[] = [
  { id: "all", label: "Toutes" },
  { id: "en-cours", label: "En cours" },
  { id: "expediee", label: "Expédiées" },
  { id: "livree", label: "Livrées" },
  { id: "annulee", label: "Annulées" },
];

export function OrdersPage() {
  const orders = useDbs((s) => s.orders);
  const updateOrderStatus = useDbs((s) => s.updateOrderStatus);
  const [q, setQ] = useState("");
  const [status, setStatus] = useState<"all" | OrderStatus>("all");
  const [page, setPage] = useState(1);
  const perPage = 10;

  const filtered = useMemo(() => {
    return orders.filter((o) => {
      const match =
        o.id.toLowerCase().includes(q.toLowerCase()) ||
        o.customerName.toLowerCase().includes(q.toLowerCase());
      return match && (status === "all" || o.status === status);
    });
  }, [orders, q, status]);

  const pages = Math.max(1, Math.ceil(filtered.length / perPage));
  const slice = filtered.slice((page - 1) * perPage, page * perPage);

  return (
    <div>
      <PageHeader
        title="Commandes"
        description="Suivez et gérez toutes vos commandes en temps réel."
      />
      <div className="mb-4 flex flex-wrap gap-2">
        {statuses.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => {
              setStatus(s.id);
              setPage(1);
            }}
            className={`h-9 rounded-full px-4 text-sm ${
              status === s.id
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-muted-foreground"
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>
      <Input
        value={q}
        onChange={(e) => {
          setQ(e.target.value);
          setPage(1);
        }}
        placeholder="Rechercher une commande…"
        className="mb-4 max-w-md"
      />
      <div className="dbs-panel overflow-x-auto p-0">
        <table className="dbs-table w-full min-w-[800px] text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="px-4 py-3 text-left">Commande</th>
              <th className="px-2 py-3 text-left">Client</th>
              <th className="px-2 py-3 text-left">Date</th>
              <th className="px-2 py-3 text-left">Montant</th>
              <th className="px-2 py-3 text-left">Statut</th>
              <th className="px-4 py-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {slice.map((o) => (
              <tr key={o.id} className="border-b border-border last:border-0">
                <td className="px-4 py-3 font-medium">{o.id}</td>
                <td className="px-2 py-3">{o.customerName}</td>
                <td className="px-2 py-3 text-muted-foreground">{formatDate(o.date)}</td>
                <td className="px-2 py-3 tabular-nums">{formatCfa(o.amount)}</td>
                <td className="px-2 py-3">
                  <OrderStatusBadge status={o.status} />
                </td>
                <td className="px-4 py-3 text-right">
                  <Select
                    value={o.status}
                    onValueChange={(v) => {
                      updateOrderStatus(o.id, v as OrderStatus);
                      toast.success(`${o.id} · statut mis à jour`);
                    }}
                  >
                    <SelectTrigger className="ml-auto h-8 w-36">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en-cours">En cours</SelectItem>
                      <SelectItem value="expediee">Expédiée</SelectItem>
                      <SelectItem value="livree">Livrée</SelectItem>
                      <SelectItem value="annulee">Annulée</SelectItem>
                    </SelectContent>
                  </Select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex justify-end gap-2">
        <Button variant="outline" size="sm" disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>
          Précédent
        </Button>
        <Button
          variant="outline"
          size="sm"
          disabled={page >= pages}
          onClick={() => setPage((p) => p + 1)}
        >
          Suivant
        </Button>
      </div>
    </div>
  );
}
