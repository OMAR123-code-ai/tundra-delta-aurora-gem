import type { ReactNode } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { computePrice } from "@/lib/pricing";
import { useDbs } from "@/lib/store";
import { formatCfa } from "@/lib/format";

export const Route = createFileRoute("/_admin/regles-prix")({
  component: PriceRulesPage,
});

export function PriceRulesPage() {
  const rules = useDbs((s) => s.priceRules);
  const setPriceRules = useDbs((s) => s.setPriceRules);
  const preview = computePrice(rules);

  function num(key: keyof typeof rules, value: string) {
    const n = Number(value);
    if (Number.isNaN(n)) return;
    setPriceRules({ [key]: n });
  }

  return (
    <div>
      <PageHeader
        title="Règles de prix IA"
        description="Configurez vos règles de tarification et laissez l’IA optimiser vos prix."
      />
      <Tabs defaultValue="base">
        <TabsList>
          <TabsTrigger value="base">Paramètres de base</TabsTrigger>
          <TabsTrigger value="marge">Marge & bénéfices</TabsTrigger>
          <TabsTrigger value="frais">Frais & coûts</TabsTrigger>
          <TabsTrigger value="psycho">Arrondi & psychologie</TabsTrigger>
        </TabsList>
        <TabsContent value="base" className="grid gap-4 lg:grid-cols-2">
          <div className="dbs-panel space-y-4 p-5">
            <h2 className="text-sm font-semibold">Paramètres de base</h2>
            <Field label="Prix fournisseur">
              <Input
                type="number"
                min={0}
                value={rules.supplierPrice}
                onChange={(e) => num("supplierPrice", e.target.value)}
              />
            </Field>
            <Field label="Majoration d’achat (%)">
              <Input
                type="number"
                min={0}
                value={rules.buyMarkupPct}
                onChange={(e) => num("buyMarkupPct", e.target.value)}
              />
            </Field>
            <Field label="Marge (%)">
              <Input
                type="number"
                min={0}
                value={rules.marginPct}
                onChange={(e) => num("marginPct", e.target.value)}
              />
            </Field>
            <Field label="Marge minimale (%)">
              <Input
                type="number"
                min={0}
                value={rules.minMarginPct}
                onChange={(e) => num("minMarginPct", e.target.value)}
              />
            </Field>
          </div>
          <Preview preview={preview} onSave={() => toast.success("Règles de prix enregistrées")} />
        </TabsContent>
        <TabsContent value="marge" className="grid gap-4 lg:grid-cols-2">
          <div className="dbs-panel space-y-4 p-5">
            <p className="text-sm text-muted-foreground">
              La marge s’applique sur le prix fournisseur. En dessous de la marge minimale, le prix
              suggéré est recalé.
            </p>
            <Field label="Marge (%)">
              <Input
                type="number"
                value={rules.marginPct}
                onChange={(e) => num("marginPct", e.target.value)}
              />
            </Field>
          </div>
          <Preview preview={preview} onSave={() => toast.success("Marges enregistrées")} />
        </TabsContent>
        <TabsContent value="frais" className="grid gap-4 lg:grid-cols-2">
          <div className="dbs-panel space-y-4 p-5">
            <Field label="Frais de livraison (%)">
              <Input
                type="number"
                value={rules.deliveryPct}
                onChange={(e) => num("deliveryPct", e.target.value)}
              />
            </Field>
            <Field label="Taxes (%)">
              <Input type="number" value={rules.taxPct} onChange={(e) => num("taxPct", e.target.value)} />
            </Field>
            <Field label="Frais de transaction">
              <Input
                type="number"
                value={rules.transactionFee}
                onChange={(e) => num("transactionFee", e.target.value)}
              />
            </Field>
          </div>
          <Preview preview={preview} onSave={() => toast.success("Frais enregistrés")} />
        </TabsContent>
        <TabsContent value="psycho" className="grid gap-4 lg:grid-cols-2">
          <div className="dbs-panel space-y-4 p-5">
            <div className="flex items-center justify-between gap-3">
              <Label>Prix psychologique</Label>
              <Switch
                checked={rules.psychological}
                onCheckedChange={(v) => setPriceRules({ psychological: v })}
              />
            </div>
            <Field label="Seuil (ex. 990)">
              <Input
                type="number"
                value={rules.psychoEnding}
                onChange={(e) => num("psychoEnding", e.target.value)}
              />
            </Field>
          </div>
          <Preview preview={preview} onSave={() => toast.success("Arrondi enregistré")} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="grid gap-1.5">
      <Label>{label}</Label>
      {children}
    </div>
  );
}

function Preview({
  preview,
  onSave,
}: {
  preview: ReturnType<typeof computePrice>;
  onSave: () => void;
}) {
  return (
    <div className="dbs-panel p-5">
      <h2 className="mb-4 text-sm font-semibold">Aperçu de prix</h2>
      <dl className="space-y-3 text-sm">
        <Row k="Prix fournisseur" v={formatCfa(preview.supplier)} />
        <Row k="Prix d’achat" v={formatCfa(preview.purchase)} />
        <Row k="Marge" v={formatCfa(preview.margin)} />
        <Row k="Frais & taxes" v={formatCfa(preview.fees)} />
      </dl>
      <div className="mt-5 rounded-lg bg-secondary p-4">
        <p className="text-xs text-muted-foreground">Prix de vente suggéré</p>
        <p className="font-display text-2xl font-semibold tabular-nums text-primary">
          {formatCfa(preview.suggested)}
        </p>
      </div>
      <Button className="mt-4 w-full" onClick={onSave}>
        Enregistrer
      </Button>
    </div>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-center justify-between">
      <dt className="text-muted-foreground">{k}</dt>
      <dd className="tabular-nums">{v}</dd>
    </div>
  );
}
