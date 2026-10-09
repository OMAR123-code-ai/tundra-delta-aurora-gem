import { useEffect, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDesc,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input, Textarea } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Category, Product, ProductStatus } from "@/lib/types";

const IMAGES = [
  "/products/smartphone.jpg",
  "/products/earbuds.jpg",
  "/products/watch.jpg",
  "/products/tshirt.jpg",
  "/products/backpack.jpg",
  "/products/laptop.jpg",
  "/products/headphones.jpg",
  "/products/sneakers.jpg",
];

const empty = {
  name: "",
  category: "Électronique" as Category,
  price: 9990,
  cost: 4000,
  stock: 10,
  status: "en-ligne" as ProductStatus,
  image: IMAGES[0],
  description: "",
  slug: "",
};

export function ProductDialog({
  open,
  onOpenChange,
  product,
  onSave,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  product: Product | null;
  onSave: (input: Omit<Product, "id" | "sold" | "revenue" | "aiScore" | "trend" | "potential">) => void;
}) {
  const [form, setForm] = useState(empty);

  useEffect(() => {
    if (product) {
      setForm({
        name: product.name,
        category: product.category,
        price: product.price,
        cost: product.cost,
        stock: product.stock,
        status: product.status,
        image: product.image,
        description: product.description,
        slug: product.slug,
      });
    } else {
      setForm(empty);
    }
  }, [product, open]);

  function submit(e: FormEvent) {
    e.preventDefault();
    const slug =
      form.slug ||
      form.name
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
    onSave({ ...form, slug });
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{product ? "Modifier le produit" : "Ajouter un produit"}</DialogTitle>
          <DialogDesc>Le catalogue se synchronise avec la boutique publique.</DialogDesc>
        </DialogHeader>
        <form onSubmit={submit} className="grid gap-3">
          <div className="grid gap-1.5">
            <Label htmlFor="pname">Nom</Label>
            <Input
              id="pname"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="grid gap-1.5">
              <Label>Catégorie</Label>
              <Select
                value={form.category}
                onValueChange={(v) => setForm({ ...form, category: v as Category })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Électronique">Électronique</SelectItem>
                  <SelectItem value="Accessoires">Accessoires</SelectItem>
                  <SelectItem value="Vêtements">Vêtements</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-1.5">
              <Label>Statut</Label>
              <Select
                value={form.status}
                onValueChange={(v) => setForm({ ...form, status: v as ProductStatus })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en-ligne">En ligne</SelectItem>
                  <SelectItem value="en-attente">En attente</SelectItem>
                  <SelectItem value="epuise">Épuisé</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div className="grid gap-1.5">
              <Label htmlFor="price">Prix</Label>
              <Input
                id="price"
                type="number"
                min={0}
                value={form.price}
                onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
              />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="cost">Coût</Label>
              <Input
                id="cost"
                type="number"
                min={0}
                value={form.cost}
                onChange={(e) => setForm({ ...form, cost: Number(e.target.value) })}
              />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="stock">Stock</Label>
              <Input
                id="stock"
                type="number"
                min={0}
                value={form.stock}
                onChange={(e) => setForm({ ...form, stock: Number(e.target.value) })}
              />
            </div>
          </div>
          <div className="grid gap-1.5">
            <Label>Visuel</Label>
            <div className="grid grid-cols-8 gap-1.5">
              {IMAGES.map((src) => (
                <button
                  key={src}
                  type="button"
                  onClick={() => setForm({ ...form, image: src })}
                  className={`overflow-hidden rounded-md ring-offset-background ${
                    form.image === src ? "ring-2 ring-primary" : "opacity-70 hover:opacity-100"
                  }`}
                >
                  <img src={src} alt="" className="aspect-square w-full object-cover" />
                </button>
              ))}
            </div>
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="desc">Description</Label>
            <Textarea
              id="desc"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
          </div>
          <div className="mt-2 flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Annuler
            </Button>
            <Button type="submit">Enregistrer</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
