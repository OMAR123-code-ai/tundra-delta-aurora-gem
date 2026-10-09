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
  const toggleIntegration = useDbs((s) => s.toggleIntegration);
  const apiKeys = useDbs((s) => s.apiKeys);
  const setApiKey = useDbs((s) => s.setApiKey);

  return (
    <div>
      <PageHeader
        title="Paramètres & Intégrations"
        description="Configurez votre boutique et vos services externes."
      />
      <Tabs defaultValue="apps">
        <TabsList>
          <TabsTrigger value="apps">Général</TabsTrigger>
          <TabsTrigger value="keys">API & Tokens</TabsTrigger>
          <TabsTrigger value="pay">Paiement</TabsTrigger>
        </TabsList>
        <TabsContent value="apps" className="grid gap-3 lg:grid-cols-2">
          {integrations.map((i) => (
            <article key={i.id} className="dbs-panel flex items-center justify-between gap-3 p-5">
              <div>
                <h2 className="font-semibold">{i.name}</h2>
                <p className="text-sm text-muted-foreground">{i.blurb}</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={i.connected ? "success" : "warning"}>
                  {i.connected ? "Connecté" : "Configuration requise"}
                </Badge>
                <Button
                  size="sm"
                  variant={i.connected ? "outline" : "default"}
                  onClick={() => {
                    toggleIntegration(i.id);
                    toast.success(
                      i.connected ? `${i.name} déconnecté` : `${i.name} connecté`,
                    );
                  }}
                >
                  {i.connected ? "Déconnecter" : "Connecter"}
                </Button>
              </div>
            </article>
          ))}
        </TabsContent>
        <TabsContent value="keys">
          <div className="dbs-panel grid max-w-xl gap-4 p-5">
            <div className="grid gap-1.5">
              <Label htmlFor="shopify">Shopify API Secret</Label>
              <Input
                id="shopify"
                value={apiKeys.shopify}
                onChange={(e) => setApiKey("shopify", e.target.value)}
              />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="gemini">Gemini API Key</Label>
              <Input
                id="gemini"
                value={apiKeys.gemini}
                onChange={(e) => setApiKey("gemini", e.target.value)}
              />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="dbs">DBS Payment Key</Label>
              <Input
                id="dbs"
                placeholder="pk_live_…"
                value={apiKeys.dbsPay}
                onChange={(e) => setApiKey("dbsPay", e.target.value)}
              />
            </div>
            <Button
              className="w-fit"
              onClick={() => toast.success("Clés enregistrées localement")}
            >
              Sauvegarder
            </Button>
          </div>
        </TabsContent>
        <TabsContent value="pay">
          <div className="dbs-panel p-5 text-sm text-muted-foreground">
            Reliez DBS Payment pour encaisser Orange Money, Moov Money et Wave depuis la boutique
            publique.
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
