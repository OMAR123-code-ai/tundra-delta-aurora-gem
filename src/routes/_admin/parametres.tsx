import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDbs } from "@/lib/store";

export const Route = createFileRoute("/_admin/parametres")({
  component: SettingsPage,
});

export function SettingsPage() {
  const settings = useDbs((s) => s.settings);
  const setSettings = useDbs((s) => s.setSettings);
  const resetDemo = useDbs((s) => s.resetDemo);
  const snapshot = useDbs((s) => ({
    products: s.products,
    orders: s.orders,
    customers: s.customers,
    settings: s.settings,
  }));

  function exportJson() {
    const blob = new Blob([JSON.stringify(snapshot, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "dbs-sauvegarde.json";
    a.click();
    // Revoke after the browser has had a chance to start the download.
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    toast.success("Sauvegarde exportée");
  }

  return (
    <div>
      <PageHeader
        title="Paramètres"
        description="Identité de la boutique, sauvegarde et réinitialisation."
      />
      <div className="grid gap-4 lg:grid-cols-2">
        <form
          className="dbs-panel grid gap-3 p-5"
          onSubmit={(e) => {
            e.preventDefault();
            toast.success("Boutique mise à jour");
          }}
        >
          <h2 className="font-semibold">Général</h2>
          <div className="grid gap-1.5">
            <Label htmlFor="sname">Nom</Label>
            <Input
              id="sname"
              value={settings.name}
              onChange={(e) => setSettings({ name: e.target.value })}
            />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="stag">Slogan</Label>
            <Input
              id="stag"
              value={settings.tagline}
              onChange={(e) => setSettings({ tagline: e.target.value })}
            />
          </div>
          <div className="grid gap-1.5 sm:grid-cols-2 sm:gap-3">
            <div className="grid gap-1.5">
              <Label htmlFor="semail">Email</Label>
              <Input
                id="semail"
                value={settings.email}
                onChange={(e) => setSettings({ email: e.target.value })}
              />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="sphone">Téléphone</Label>
              <Input
                id="sphone"
                value={settings.phone}
                onChange={(e) => setSettings({ phone: e.target.value })}
              />
            </div>
          </div>
          <div className="grid gap-1.5 sm:grid-cols-2 sm:gap-3">
            <div className="grid gap-1.5">
              <Label htmlFor="scity">Ville</Label>
              <Input
                id="scity"
                value={settings.city}
                onChange={(e) => setSettings({ city: e.target.value })}
              />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="scur">Devise</Label>
              <Input id="scur" value={settings.currency} readOnly />
            </div>
          </div>
          <Button type="submit" className="mt-2 w-fit">
            Enregistrer
          </Button>
        </form>
        <div className="dbs-panel space-y-4 p-5">
          <h2 className="font-semibold">Sauvegarde</h2>
          <p className="text-sm text-muted-foreground">
            Exportez un JSON de votre catalogue, commandes et clients, ou réinitialisez la démo.
          </p>
          <div className="flex flex-wrap gap-2">
            <Button onClick={exportJson}>Exporter</Button>
            <Button
              variant="outline"
              onClick={() => {
                resetDemo();
                toast.success("Boutique réinitialisée");
              }}
            >
              Réinitialiser la démo
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
