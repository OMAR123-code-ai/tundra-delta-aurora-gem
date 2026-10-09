import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { MoreHorizontal, Pencil, Plus, Trash2, Upload } from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/components/page-header";
import { ProductDialog } from "@/components/product-dialog";
import { ProductThumb } from "@/components/product-thumb";
import { ProductStatusBadge } from "@/components/status-badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDbs } from "@/lib/store";
import { formatCfa, formatInt } from "@/lib/format";
import type { Product, ProductStatus } from "@/lib/types";

export const Route = createFileRoute("/_admin/produits")({
  component: ProduitsPage,
});

export function ProduitsPage() {
  const products = useDbs((s) => s.products);
  const addProduct = useDbs((s) => s.addProduct);
  const updateProduct = useDbs((s) => s.updateProduct);
  const deleteProduct = useDbs((s) => s.deleteProduct);
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("all");
  const [status, setStatus] = useState("all");
  const [sort, setSort] = useState("name");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);
  const perPage = 8;

  const online = products.filter((p) => p.status === "en-ligne").length;
  const wait = products.filter((p) => p.status === "en-attente").length;
  const out = products.filter((p) => p.status === "epuise").length;

  const filtered = useMemo(() => {
    let rows = products.filter((p) => {
      const matchQ = p.name.toLowerCase().includes(q.toLowerCase());
      const matchC = cat === "all" || p.category === cat;
      const matchS = status === "all" || p.status === status;
      return matchQ && matchC && matchS;
    });
    rows = [...rows].sort((a, b) => {
      if (sort === "price") return b.price - a.price;
      if (sort === "stock") return b.stock - a.stock;
      return a.name.localeCompare(b.name, "fr");
    });
    return rows;
  }, [products, q, cat, status, sort]);

  const pages = Math.max(1, Math.ceil(filtered.length / perPage));
  const slice = filtered.slice((page - 1) * perPage, page * perPage);
  const allChecked = slice.length > 0 && slice.every((p) => selected.includes(p.id));

  function save(input: Omit<Product, "id" | "sold" | "revenue" | "aiScore" | "trend" | "potential">) {
    if (editing) {
      updateProduct(editing.id, input);
      toast.success("Produit mis à jour");
    } else {
      addProduct(input);
      toast.success("Produit ajouté au catalogue");
    }
    setEditing(null);
  }

  return (
    <div>
      <PageHeader
        title="Gestion des produits"
        description="Gérez votre catalogue et synchronisez-le avec la boutique."
        actions={
          <>
            <Button
              variant="outline"
              onClick={() => toast.success("Catalogue Shopify synchronisé")}
            >
              <Upload className="size-4" />
              Importer
            </Button>
            <Button
              onClick={() => {
                setEditing(null);
                setOpen(true);
              }}
            >
              <Plus className="size-4" />
              Ajouter un produit
            </Button>
          </>
        }
      />

      <div className="mb-4 flex flex-wrap gap-2 text-sm">
        <TabChip active={status === "all"} label={`Tous (${products.length})`} onClick={() => setStatus("all")} />
        <TabChip
          active={status === "en-ligne"}
          label={`En ligne (${online})`}
          onClick={() => setStatus("en-ligne")}
        />
        <TabChip
          active={status === "en-attente"}
          label={`En attente (${wait})`}
          onClick={() => setStatus("en-attente")}
        />
        <TabChip
          active={status === "epuise"}
          label={`Épuisé (${out})`}
          onClick={() => setStatus("epuise")}
        />
      </div>

      <div className="mb-4 flex flex-col gap-2 sm:flex-row">
        <Input
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            setPage(1);
          }}
          placeholder="Rechercher…"
          className="sm:max-w-xs"
        />
        <Select
          value={cat}
          onValueChange={(v) => {
            setCat(v);
            setPage(1);
          }}
        >
          <SelectTrigger className="sm:w-44">
            <SelectValue placeholder="Catégorie" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Catégorie</SelectItem>
            <SelectItem value="Électronique">Électronique</SelectItem>
            <SelectItem value="Accessoires">Accessoires</SelectItem>
            <SelectItem value="Vêtements">Vêtements</SelectItem>
          </SelectContent>
        </Select>
        <Select
          value={status}
          onValueChange={(v) => {
            setStatus(v);
            setPage(1);
          }}
        >
          <SelectTrigger className="sm:w-40">
            <SelectValue placeholder="Statut" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Statut</SelectItem>
            <SelectItem value="en-ligne">En ligne</SelectItem>
            <SelectItem value="en-attente">En attente</SelectItem>
            <SelectItem value="epuise">Épuisé</SelectItem>
          </SelectContent>
        </Select>
        <Select value={sort} onValueChange={setSort}>
          <SelectTrigger className="sm:w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="name">Trier par nom</SelectItem>
            <SelectItem value="price">Prix</SelectItem>
            <SelectItem value="stock">Stock</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {selected.length > 0 ? (
        <div className="mb-3 flex items-center gap-2 rounded-lg bg-secondary px-3 py-2 text-sm">
          {selected.length} sélectionné{selected.length > 1 ? "s" : ""}
          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              selected.forEach((id) => deleteProduct(id));
              setSelected([]);
              toast.success("Produits supprimés");
            }}
          >
            Supprimer
          </Button>
        </div>
      ) : null}

      <div className="dbs-panel overflow-x-auto p-0">
        <table className="dbs-table w-full min-w-[720px] text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="px-4 py-3">
                <Checkbox
                  checked={allChecked}
                  onCheckedChange={(v) =>
                    setSelected(v ? slice.map((p) => p.id) : selected.filter((id) => !slice.some((p) => p.id === id)))
                  }
                  aria-label="Tout sélectionner"
                />
              </th>
              <th className="px-2 py-3 text-left">Produit</th>
              <th className="px-2 py-3 text-left">Prix</th>
              <th className="px-2 py-3 text-left">Stock</th>
              <th className="px-2 py-3 text-left">Statut</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {slice.map((p) => (
              <tr key={p.id} className="border-b border-border last:border-0">
                <td className="px-4 py-3">
                  <Checkbox
                    checked={selected.includes(p.id)}
                    onCheckedChange={(v) =>
                      setSelected((s) => (v ? [...s, p.id] : s.filter((id) => id !== p.id)))
                    }
                    aria-label={p.name}
                  />
                </td>
                <td className="px-2 py-3">
                  <div className="flex items-center gap-3">
                    <ProductThumb src={p.image} alt={p.name} />
                    <div>
                      <p className="font-medium">{p.name}</p>
                      <p className="text-xs text-muted-foreground">{p.category}</p>
                    </div>
                  </div>
                </td>
                <td className="px-2 py-3 tabular-nums">{formatCfa(p.price)}</td>
                <td className="px-2 py-3 tabular-nums">{formatInt(p.stock)}</td>
                <td className="px-2 py-3">
                  <ProductStatusBadge status={p.status as ProductStatus} />
                </td>
                <td className="px-4 py-3 text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon-sm" aria-label="Actions">
                        <MoreHorizontal />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onSelect={() => {
                          setEditing(p);
                          setOpen(true);
                        }}
                      >
                        <Pencil className="size-4" />
                        Modifier
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onSelect={() => {
                          deleteProduct(p.id);
                          toast.success("Produit supprimé");
                        }}
                      >
                        <Trash2 className="size-4" />
                        Supprimer
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
        <p>
          {filtered.length} produit{filtered.length > 1 ? "s" : ""} · page {page}/{pages}
        </p>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>
            Précédent
          </Button>
          <Button variant="outline" size="sm" disabled={page >= pages} onClick={() => setPage((p) => p + 1)}>
            Suivant
          </Button>
        </div>
      </div>

      <ProductDialog open={open} onOpenChange={setOpen} product={editing} onSave={save} />
    </div>
  );
}

function TabChip({
  label,
  onClick,
  active,
}: {
  label: string;
  onClick: () => void;
  active: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full px-3 py-1 text-sm ${
        active ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"
      }`}
    >
      {label}
    </button>
  );
}
