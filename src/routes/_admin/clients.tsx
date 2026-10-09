import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/page-header";
import { Input } from "@/components/ui/input";
import { useDbs } from "@/lib/store";
import { formatCfa, formatInt } from "@/lib/format";

export const Route = createFileRoute("/_admin/clients")({
  component: ClientsPage,
});

export function ClientsPage() {
  const customers = useDbs((s) => s.customers);
  const [q, setQ] = useState("");
  const rows = useMemo(
    () =>
      customers.filter(
        (c) =>
          c.name.toLowerCase().includes(q.toLowerCase()) ||
          c.city.toLowerCase().includes(q.toLowerCase()) ||
          c.phone.includes(q),
      ),
    [customers, q],
  );

  return (
    <div>
      <PageHeader
        title="Clients"
        description="Annuaire de votre boutique — commandes et panier cumulé."
      />
      <Input
        value={q}
        placeholder="Rechercher un client…"
        onChange={(e) => setQ(e.target.value)}
        className="mb-4 max-w-md"
      />
      <div className="dbs-panel overflow-x-auto p-0">
        <table className="dbs-table w-full min-w-[700px] text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="px-4 py-3 text-left">Client</th>
              <th className="px-2 py-3 text-left">Téléphone</th>
              <th className="px-2 py-3 text-left">Ville</th>
              <th className="px-2 py-3 text-left">Commandes</th>
              <th className="px-4 py-3 text-right">Dépensé</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((c) => (
              <tr key={c.id} className="border-b border-border last:border-0">
                <td className="px-4 py-3">
                  <p className="font-medium">{c.name}</p>
                  <p className="text-xs text-muted-foreground">{c.email}</p>
                </td>
                <td className="px-2 py-3 tabular-nums">{c.phone}</td>
                <td className="px-2 py-3">{c.city}</td>
                <td className="px-2 py-3 tabular-nums">{formatInt(c.orders)}</td>
                <td className="px-4 py-3 text-right tabular-nums">{formatCfa(c.spent)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
