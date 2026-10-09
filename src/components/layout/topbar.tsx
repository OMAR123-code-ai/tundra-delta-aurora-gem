import { useMemo, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Bell, Menu, Search, ShoppingBag, Store } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Sidebar } from "@/components/layout/sidebar";
import { useDbs } from "@/lib/store";
import { formatCfa, formatDateLong } from "@/lib/format";

export function Topbar() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const products = useDbs((s) => s.products);
  const orders = useDbs((s) => s.orders);
  const customers = useDbs((s) => s.customers);

  const lowStock = products.filter((p) => p.stock <= 3).length;
  const pendingPay = orders.filter((o) => o.paymentStatus === "en-attente").length;
  const newOrders = orders.filter((o) => o.status === "en-cours").length;

  const hits = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q.length < 2) return [];
    const p = products
      .filter((x) => x.name.toLowerCase().includes(q))
      .slice(0, 4)
      .map((x) => ({ type: "Produit", label: x.name, to: "/produits" as const }));
    const o = orders
      .filter(
        (x) =>
          x.id.toLowerCase().includes(q) || x.customerName.toLowerCase().includes(q),
      )
      .slice(0, 3)
      .map((x) => ({ type: "Commande", label: `${x.id} · ${x.customerName}`, to: "/commandes" as const }));
    const c = customers
      .filter((x) => x.name.toLowerCase().includes(q))
      .slice(0, 3)
      .map((x) => ({ type: "Client", label: x.name, to: "/clients" as const }));
    return [...p, ...o, ...c];
  }, [query, products, orders, customers]);

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border bg-background/90 px-4 backdrop-blur-md lg:px-6">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Menu">
            <Menu />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0">
          <Sidebar onNavigate={() => setOpen(false)} />
        </SheetContent>
      </Sheet>

      <div className="relative min-w-0 flex-1">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Rechercher un produit, une commande, un client…"
          className="h-10 pl-9"
          aria-label="Recherche"
        />
        {hits.length > 0 ? (
          <div className="absolute top-11 z-40 w-full overflow-hidden rounded-lg bg-popover shadow-[var(--shadow-border)]">
            {hits.map((hit) => (
              <button
                key={hit.type + hit.label}
                className="flex w-full items-center justify-between px-3 py-2.5 text-left text-sm hover:bg-accent"
                onClick={() => {
                  void navigate({ to: hit.to });
                  setQuery("");
                }}
              >
                <span>{hit.label}</span>
                <span className="text-xs text-muted-foreground">{hit.type}</span>
              </button>
            ))}
          </div>
        ) : null}
      </div>

      <p className="hidden text-right text-xs text-muted-foreground xl:block">
        Aujourd’hui
        <span className="mt-0.5 block font-medium text-foreground">{formatDateLong()}</span>
      </p>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="relative" aria-label="Notifications">
            <Bell />
            {lowStock + pendingPay > 0 ? (
              <span className="absolute right-1.5 top-1.5 size-2 rounded-full bg-danger" />
            ) : null}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-72">
          <DropdownMenuLabel>Alertes</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="flex-col items-start gap-0.5">
            <span>Stock faible ({lowStock} produits)</span>
            <span className="text-xs text-muted-foreground">Réapprovisionner le catalogue</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="flex-col items-start gap-0.5">
            <span>Nouvelles commandes ({newOrders})</span>
            <span className="text-xs text-muted-foreground">À préparer aujourd’hui</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="flex-col items-start gap-0.5">
            <span>Paiements en attente ({pendingPay})</span>
            <span className="text-xs text-muted-foreground">DBS Payment</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Button asChild variant="outline" size="sm" className="hidden sm:inline-flex">
        <Link to="/boutique">
          <Store className="size-4" />
          Voir la boutique
        </Link>
      </Button>

      <div className="flex items-center gap-2">
        <div className="grid size-9 place-items-center rounded-full bg-primary font-display text-xs font-semibold text-primary-foreground">
          AD
        </div>
        <div className="hidden leading-tight md:block">
          <p className="text-sm font-medium">Admin DBS</p>
          <p className="text-xs text-muted-foreground">Administrateur</p>
        </div>
      </div>
    </header>
  );
}

export function MobileDock() {
  const cart = useDbs((s) => s.cart);
  const count = cart.reduce((n, c) => n + c.qty, 0);
  return (
    <nav className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-4 border-t border-border bg-background/95 px-2 py-2 backdrop-blur-md lg:hidden">
      <Link to="/" className="grid place-items-center gap-1 py-1 text-xs text-muted-foreground">
        <ShoppingBag className="size-4" />
        Accueil
      </Link>
      <Link to="/produits" className="grid place-items-center gap-1 py-1 text-xs text-muted-foreground">
        <Search className="size-4" />
        Produits
      </Link>
      <Link to="/commandes" className="grid place-items-center gap-1 py-1 text-xs text-muted-foreground">
        <Bell className="size-4" />
        Commandes
      </Link>
      <Link to="/boutique" className="relative grid place-items-center gap-1 py-1 text-xs text-muted-foreground">
        <Store className="size-4" />
        Boutique
        {count > 0 ? (
          <span className="absolute right-4 top-0 rounded-full bg-primary px-1.5 text-[10px] font-semibold text-primary-foreground">
            {count}
          </span>
        ) : null}
      </Link>
    </nav>
  );
}
