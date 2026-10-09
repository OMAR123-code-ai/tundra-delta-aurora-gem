import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/page-header";
import { Badge } from "@/components/ui/badge";
import { useDbs } from "@/lib/store";

export const Route = createFileRoute("/_admin/fournisseurs")({
  component: SuppliersPage,
});

export function SuppliersPage() {
  const suppliers = useDbs((s) => s.suppliers);
  return (
    <div>
      <PageHeader
        title="Fournisseurs"
        description="Partenaires d’approvisionnement de Digital Business Store."
      />
      <div className="grid gap-3 md:grid-cols-2">
        {suppliers.map((s) => (
          <article key={s.id} className="dbs-panel p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="font-semibold">{s.name}</h2>
                <p className="text-sm text-muted-foreground">{s.contact}</p>
              </div>
              <Badge variant={s.status === "actif" ? "success" : "muted"}>
                {s.status === "actif" ? "Actif" : "Inactif"}
              </Badge>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">{s.email}</p>
            <p className="mt-1 text-sm">
              {s.products} produit{s.products > 1 ? "s" : ""} rattaché{s.products > 1 ? "s" : ""}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}
