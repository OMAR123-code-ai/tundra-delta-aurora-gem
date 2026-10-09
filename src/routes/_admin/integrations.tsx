import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { PageHeader } from "@/components/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useDbs } from "@/lib/store";

export const Route = createFileRoute("/_admin/integrations")({
  component: IntegrationsPage,
});

export function IntegrationsPage() {
  const integrations = useDbs((s) => s.integrations);
  const apiKeys = useDbs((s) => s.apiKeys);
  const setApiKey = useDbs((s) => s.setApiKey);

  return (
    <div>
      <PageHeader
        title="Paramètres & Intégrations"
        description="État réel des connecteurs disponibles dans cette version de démonstration."
      />
      <Tabs defaultValue="apps">
        <TabsList>
          <TabsTrigger value="apps">Général</TabsTrigger>
          <TabsTrigger value="keys">API & Tokens</TabsTrigger>
          <TabsTrigger value="pay">Paiement</TabsTrigger>
        </TabsList>
        <TabsContent value="apps" className="grid gap-3 lg:grid-cols-2">
          {integrations.map((integration) => (
            <article key={integration.id} className="dbs-panel flex items-center justify-between gap-3 p-5">
              <div>
                <h2 className="font-semibold">{integration.name}</h2>
                <p className="text-sm text-muted-foreground">{integration.blurb}</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  La connexion automatique n’est pas implémentée dans cette démo.
                </p>
              </div>
              <Badge variant="warning">Non connecté</Badge>
            </article>
          ))}
        </TabsContent>
        <TabsContent value="keys">
          <div className="dbs-panel grid max-w-xl gap-4 p-5">
            <p className="text-sm text-amber-800 dark:text-amber-200">
              Démonstration uniquement : n’entrez pas de vraies clés API. Les champs ci-dessous
              restent en mémoire pendant cette session et ne sont ni envoyés à un service ni
              enregistrés dans la sauvegarde locale.
            </p>
            <div className="grid gap-1.5">
              <Label htmlFor="shopify">Shopify API Secret (facultatif)</Label>
              <Input id="shopify" type="password" autoComplete="off" value={apiKeys.shopify}
                onChange={(e) => setApiKey("shopify", e.target.value)} />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="gemini">Gemini API Key (facultatif)</Label>
              <Input id="gemini" type="password" autoComplete="off" value={apiKeys.gemini}
                onChange={(e) => setApiKey("gemini", e.target.value)} />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="dbs">DBS Payment Key (facultatif)</Label>
              <Input id="dbs" type="password" autoComplete="off" placeholder="Clé de test uniquement"
                value={apiKeys.dbsPay} onChange={(e) => setApiKey("dbsPay", e.target.value)} />
            </div>
            <Button className="w-fit"
              onClick={() => toast.success("Valeurs conservées en mémoire pour cette session uniquement")}>
              Garder pour cette session
            </Button>
          </div>
        </TabsContent>
        <TabsContent value="pay">
          <div className="dbs-panel space-y-2 p-5 text-sm text-muted-foreground">
            <Badge variant="warning">Paiements simulés</Badge>
            <p>
              Aucun prestataire de paiement n’est connecté. Les commandes et confirmations de
              paiement sont des données de démonstration ; aucun encaissement réel n’est effectué.
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
