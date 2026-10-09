import {
  BarChart3,
  Bot,
  Headset,
  LayoutDashboard,
  LayoutGrid,
  Package,
  Plug,
  Settings,
  ShoppingCart,
  Sparkles,
  Tags,
  Truck,
  Users,
  Wallet,
  type LucideIcon,
} from "lucide-react";

export type NavItem = {
  to: string;
  label: string;
  icon: LucideIcon;
};

export const adminNav: NavItem[] = [
  { to: "/", label: "Tableau de bord", icon: LayoutDashboard },
  { to: "/produits", label: "Produits", icon: Package },
  { to: "/produits-gagnants", label: "Produits gagnants", icon: Sparkles },
  { to: "/catalogue", label: "Catalogue", icon: LayoutGrid },
  { to: "/regles-prix", label: "Règles de prix", icon: Tags },
  { to: "/commandes", label: "Commandes", icon: ShoppingCart },
  { to: "/clients", label: "Clients", icon: Users },
  { to: "/fournisseurs", label: "Fournisseurs", icon: Truck },
  { to: "/payment", label: "DBS Payment", icon: Wallet },
  { to: "/ia", label: "IA & Automatisations", icon: Bot },
  { to: "/integrations", label: "API & Intégrations", icon: Plug },
  { to: "/analytics", label: "Rapports & Analytics", icon: BarChart3 },
  { to: "/parametres", label: "Paramètres", icon: Settings },
];

export const assistNav: NavItem = {
  to: "/assistance",
  label: "Assistance",
  icon: Headset,
};
