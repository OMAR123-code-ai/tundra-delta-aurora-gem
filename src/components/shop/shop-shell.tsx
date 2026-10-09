import { useEffect, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import {
  Clock,
  Headphones,
  Lock,
  ShieldCheck,
  Sparkles,
  Store,
  Truck,
} from "lucide-react";
import { DbsLogo } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";
import { rehydrateStore, useDbs } from "@/lib/store";
import { formatInt } from "@/lib/format";

export function ShopShell({ children }: { children: ReactNode }) {
  const cart = useDbs((s) => s.cart);
  const count = cart.reduce((n, c) => n + c.qty, 0);
  const settings = useDbs((s) => s.settings);

  useEffect(() => {
    rehydrateStore();
  }, []);

  return (
    <div className="min-h-dvh bg-background text-foreground">
      <header className="sticky top-0 z-30 border-b border-border bg-background/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4">
          <Link to="/boutique" className="min-w-0">
            <DbsLogo />
          </Link>
          <nav className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
            <Link to="/boutique" className="hover:text-foreground">
              Boutique
            </Link>
            <Link to="/panier" className="hover:text-foreground">
              Panier
            </Link>
            <Link to="/" className="hover:text-foreground">
              Espace admin
            </Link>
          </nav>
          <div className="flex items-center gap-2">
            <Button asChild variant="outline" size="sm">
              <Link to="/panier">
                Panier
                {count > 0 ? (
                  <span className="rounded-full bg-primary px-1.5 text-xs font-semibold text-primary-foreground">
                    {formatInt(count)}
                  </span>
                ) : null}
              </Link>
            </Button>
            <Button asChild size="sm" className="hidden sm:inline-flex">
              <Link to="/">
                <Store className="size-4" />
                Admin
              </Link>
            </Button>
          </div>
        </div>
      </header>
      <main>{children}</main>
      <footer className="mt-16 border-t border-border bg-sidebar">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 py-10 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <DbsLogo />
            <p className="mt-3 max-w-sm text-sm text-muted-foreground">{settings.tagline}</p>
          </div>
          {[
            { icon: ShieldCheck, label: "Produits de qualité" },
            { icon: Truck, label: "Livraison rapide" },
            { icon: Lock, label: "Paiement sécurisé" },
            { icon: Headphones, label: "Assistance 24/7" },
            { icon: Sparkles, label: "IA au service de votre boutique" },
            { icon: Clock, label: "Suivi en temps réel" },
          ].slice(0, 4).map((item) => (
            <div key={item.label} className="flex items-start gap-2 text-sm">
              <item.icon className="mt-0.5 size-4 text-primary" />
              <span>{item.label}</span>
            </div>
          ))}
        </div>
        <div className="border-t border-border">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-4 text-xs text-muted-foreground">
            <p>© {new Date().getFullYear()} Digital Business Store</p>
            <a
              href="https://wa.me/225070000000"
              className="inline-flex h-9 items-center gap-2 rounded-full bg-whatsapp px-3 font-medium text-background"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
