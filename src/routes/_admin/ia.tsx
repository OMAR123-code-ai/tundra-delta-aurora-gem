import { createFileRoute, Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useDbs } from "@/lib/store";

export const Route = createFileRoute("/_admin/ia")({
  component: IaPage,
});

export function IaPage() {
  const automations = useDbs((s) => s.automations);
  const setAutomations = useDbs((s) => s.setAutomations);
  const runAiScan = useDbs((s) => s.runAiScan);

  function toggle<K extends keyof typeof automations>(key: K, label: string) {
    setAutomations({ [key]: !automations[key] });
    toast.success(`${label} ${!automations[key] ? "activé" : "désactivé"}`);
  }

  return (
    <div>
      <PageHeader
        title="IA & Automatisations"
        description="Outils locaux de démonstration : les règles et scores sont calculés dans le navigateur, sans fournisseur IA connecté."
        actions={
          <Button
            onClick={() => {
              runAiScan();
              toast.success("Calcul local des scores terminé");
            }}
          >
            Lancer un scan
          </Button>
        }
      />
      <div className="grid gap-3 lg:grid-cols-2">
        <Row
          title="Revalorisation automatique"
          desc="Ajuste les prix selon les règles IA et la marge minimale."
          checked={automations.autoPrice}
          onChange={() => toggle("autoPrice", "Revalorisation")}
        />
        <Row
          title="Alertes de stock"
          desc="Prévenez-vous dès qu’un SKU tombe sous 3 unités."
          checked={automations.stockAlerts}
          onChange={() => toggle("stockAlerts", "Alertes de stock")}
        />
        <Row
          title="Scan produits gagnants"
          desc="Recalcule les scores chaque nuit."
          checked={automations.winScan}
          onChange={() => toggle("winScan", "Scan gagnants")}
        />
        <Row
          title="Notifications de commandes"
          desc="Push immédiat à chaque nouvelle vente."
          checked={automations.orderNotify}
          onChange={() => toggle("orderNotify", "Notifications")}
        />
      </div>
      <div className="mt-4">
        <Button asChild variant="outline">
          <Link to="/produits-gagnants">Voir les produits gagnants</Link>
        </Button>
      </div>
    </div>
  );
}

function Row({
  title,
  desc,
  checked,
  onChange,
}: {
  title: string;
  desc: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <div className="dbs-panel flex items-start justify-between gap-4 p-5">
      <div>
        <h2 className="font-semibold">{title}</h2>
        <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
      </div>
      <Switch checked={checked} onCheckedChange={onChange} />
    </div>
  );
}
