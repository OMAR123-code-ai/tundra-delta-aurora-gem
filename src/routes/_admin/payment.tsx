import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/page-header";
import { PaymentStatusBadge } from "@/components/status-badge";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useDbs } from "@/lib/store";
import { formatCfa, formatDate, formatInt } from "@/lib/format";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_admin/payment")({
  component: PaymentPage,
});

const tones: Record<string, string> = {
  orange: "bg-pay-orange",
  moov: "bg-pay-moov",
  wave: "bg-pay-wave",
  card: "bg-info",
  bank: "bg-muted-foreground",
};

export function PaymentPage() {
  const orders = useDbs((s) => s.orders);
  const methods = useDbs((s) => s.paymentMethods);
  const togglePayment = useDbs((s) => s.togglePayment);
  const paid = orders.filter((o) => o.paymentStatus === "reussi");
  const pending = orders.filter((o) => o.paymentStatus === "en-attente");
  const failed = orders.filter((o) => o.paymentStatus === "echec");
  const total = paid.reduce((n, o) => n + o.amount, 0);
  const rate = orders.length ? (paid.length / orders.length) * 100 : 0;

  return (
    <div>
      <PageHeader
        title="DBS Payment"
        description="Gérez vos paiements et suivez vos transactions."
        actions={<Badge variant="success">Système opérationnel</Badge>}
      />
      <div className="mb-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Stat label="Total des transactions" value={formatCfa(total)} />
        <Stat
          label="Paiements réussis"
          value={`${rate.toLocaleString("fr-FR", { maximumFractionDigits: 1 })}%`}
        />
        <Stat label="En attente" value={formatInt(pending.length)} />
        <Stat label="Échecs" value={formatInt(failed.length)} />
      </div>
      <Tabs defaultValue="tx">
        <TabsList>
          <TabsTrigger value="tx">Transactions</TabsTrigger>
          <TabsTrigger value="methods">Moyens de paiement</TabsTrigger>
          <TabsTrigger value="params">Paramètres</TabsTrigger>
        </TabsList>
        <TabsContent value="tx">
          <div className="dbs-panel overflow-x-auto p-0">
            <table className="dbs-table w-full min-w-[720px] text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="px-4 py-3 text-left">Réf.</th>
                  <th className="px-2 py-3 text-left">Commande</th>
                  <th className="px-2 py-3 text-left">Client</th>
                  <th className="px-2 py-3 text-left">Moyen</th>
                  <th className="px-2 py-3 text-left">Montant</th>
                  <th className="px-2 py-3 text-left">Statut</th>
                  <th className="px-4 py-3 text-left">Date</th>
                </tr>
              </thead>
              <tbody>
                {orders.slice(0, 12).map((o) => (
                  <tr key={o.id} className="border-b border-border last:border-0">
                    <td className="px-4 py-3 font-medium">TXN-{o.id.replace("DBS-", "")}</td>
                    <td className="px-2 py-3">{o.id}</td>
                    <td className="px-2 py-3">{o.customerName}</td>
                    <td className="px-2 py-3">{o.paymentMethod}</td>
                    <td className="px-2 py-3 tabular-nums">{formatCfa(o.amount)}</td>
                    <td className="px-2 py-3">
                      <PaymentStatusBadge status={o.paymentStatus} />
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{formatDate(o.date)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>
        <TabsContent value="methods">
          <div className="dbs-panel divide-y divide-border p-0">
            {methods.map((m) => (
              <div key={m.id} className="flex items-center justify-between gap-3 px-5 py-4">
                <div className="flex items-center gap-3">
                  <span className={cn("size-8 rounded-full", tones[m.tone])} />
                  <div>
                    <p className="font-medium">{m.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {m.enabled ? "Accepté sur la boutique" : "Désactivé"}
                    </p>
                  </div>
                </div>
                <Switch checked={m.enabled} onCheckedChange={() => togglePayment(m.id)} />
              </div>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="params">
          <div className="dbs-panel p-5 text-sm text-muted-foreground">
            Les encaissements Orange Money, Moov Money et Wave sont routés par DBS Payment. Activez
            la clé API dans Intégrations pour passer en production.
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="dbs-panel p-4">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="mt-2 font-display text-xl font-semibold tabular-nums sm:text-2xl">{value}</p>
    </div>
  );
}
