import { i as __toESM } from "./_runtime.mjs";
import { u as require_react } from "./_libs/@floating-ui/react-dom+[...].mjs";
import { m as require_jsx_runtime } from "./_libs/@radix-ui/react-checkbox+[...].mjs";
import { l as rehydrateStore, n as cn, o as formatDateLong, t as Button, u as useDbs } from "./_ssr/store-DJZ3SnuM.mjs";
import { b as Link, g as Outlet, p as useRouterState, x as useNavigate } from "./_libs/@tanstack/react-router+[...].mjs";
import { E as Headset, F as Bell, N as ChartColumn, P as Bot, S as Menu, T as LayoutDashboard, _ as Search, a as Truck, d as Store, f as Sparkles, g as Settings, m as ShoppingBag, n as Wallet, p as ShoppingCart, r as Users, t as X, u as Tags, v as Plug, w as LayoutGrid, x as Package } from "./_libs/lucide-react.mjs";
import { a as DialogOverlay, c as DialogTrigger, n as DialogClose, o as DialogPortal, r as DialogContent, t as Dialog } from "./_libs/@radix-ui/react-dialog+[...].mjs";
import { _ as Input, a as DropdownMenuContent, c as DropdownMenuSeparator, i as DropdownMenu, l as DropdownMenuTrigger, o as DropdownMenuItem, s as DropdownMenuLabel } from "./_ssr/router-2ZBdqfEB.mjs";
import { t as DbsLogo } from "./_ssr/logo-Bm9S5KJm.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_admin-DeTJE0sK.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var adminNav = [
	{
		to: "/",
		label: "Tableau de bord",
		icon: LayoutDashboard
	},
	{
		to: "/produits",
		label: "Produits",
		icon: Package
	},
	{
		to: "/produits-gagnants",
		label: "Produits gagnants",
		icon: Sparkles
	},
	{
		to: "/catalogue",
		label: "Catalogue",
		icon: LayoutGrid
	},
	{
		to: "/regles-prix",
		label: "Règles de prix",
		icon: Tags
	},
	{
		to: "/commandes",
		label: "Commandes",
		icon: ShoppingCart
	},
	{
		to: "/clients",
		label: "Clients",
		icon: Users
	},
	{
		to: "/fournisseurs",
		label: "Fournisseurs",
		icon: Truck
	},
	{
		to: "/payment",
		label: "DBS Payment",
		icon: Wallet
	},
	{
		to: "/ia",
		label: "IA & Automatisations",
		icon: Bot
	},
	{
		to: "/integrations",
		label: "API & Intégrations",
		icon: Plug
	},
	{
		to: "/analytics",
		label: "Rapports & Analytics",
		icon: ChartColumn
	},
	{
		to: "/parametres",
		label: "Paramètres",
		icon: Settings
	}
];
var assistNav = {
	to: "/assistance",
	label: "Assistance",
	icon: Headset
};
function NavLink({ to, label, icon: Icon, onNavigate }) {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const active = to === "/" ? pathname === "/" : pathname === to || pathname.startsWith(`${to}/`);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to,
		onClick: onNavigate,
		className: cn("flex h-10 items-center gap-2.5 rounded-md px-3 text-sm font-medium transition-colors duration-[var(--motion-quick)]", active ? "bg-primary text-primary-foreground" : "text-sidebar-foreground hover:bg-accent hover:text-foreground"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "truncate",
			children: label
		})]
	});
}
function Sidebar({ onNavigate }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
		className: "flex h-full flex-col bg-sidebar px-3 py-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "px-2 pb-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DbsLogo, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "flex min-h-0 flex-1 flex-col gap-0.5 overflow-y-auto pr-1",
				children: adminNav.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavLink, {
					...item,
					onNavigate
				}, item.to))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "pt-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavLink, {
					...assistNav,
					onNavigate
				})
			})
		]
	});
}
var Sheet = Dialog;
var SheetTrigger = DialogTrigger;
function SheetContent({ className, children, side = "left", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, { className: "fixed inset-0 z-50 bg-background/70 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
		className: cn("fixed z-50 flex h-full w-[min(20rem,92vw)] flex-col bg-sidebar text-sidebar-foreground shadow-[var(--shadow-border)] data-[state=open]:animate-in data-[state=closed]:animate-out", side === "left" ? "inset-y-0 left-0 data-[state=open]:slide-in-from-left data-[state=closed]:slide-out-to-left" : "inset-y-0 right-0 data-[state=open]:slide-in-from-right data-[state=closed]:slide-out-to-right", className),
		...props,
		children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogClose, {
			className: "absolute right-3 top-3 grid size-8 place-items-center rounded-md text-muted-foreground hover:bg-accent hover:text-foreground",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "sr-only",
				children: "Fermer"
			})]
		})]
	})] });
}
function Topbar() {
	const [query, setQuery] = (0, import_react.useState)("");
	const [open, setOpen] = (0, import_react.useState)(false);
	const navigate = useNavigate();
	const products = useDbs((s) => s.products);
	const orders = useDbs((s) => s.orders);
	const customers = useDbs((s) => s.customers);
	const lowStock = products.filter((p) => p.stock <= 3).length;
	const pendingPay = orders.filter((o) => o.paymentStatus === "en-attente").length;
	const newOrders = orders.filter((o) => o.status === "en-cours").length;
	const hits = (0, import_react.useMemo)(() => {
		const q = query.trim().toLowerCase();
		if (q.length < 2) return [];
		const p = products.filter((x) => x.name.toLowerCase().includes(q)).slice(0, 4).map((x) => ({
			type: "Produit",
			label: x.name,
			to: "/produits"
		}));
		const o = orders.filter((x) => x.id.toLowerCase().includes(q) || x.customerName.toLowerCase().includes(q)).slice(0, 3).map((x) => ({
			type: "Commande",
			label: `${x.id} · ${x.customerName}`,
			to: "/commandes"
		}));
		const c = customers.filter((x) => x.name.toLowerCase().includes(q)).slice(0, 3).map((x) => ({
			type: "Client",
			label: x.name,
			to: "/clients"
		}));
		return [
			...p,
			...o,
			...c
		];
	}, [
		query,
		products,
		orders,
		customers
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border bg-background/90 px-4 backdrop-blur-md lg:px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sheet, {
				open,
				onOpenChange: setOpen,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTrigger, {
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "icon",
						className: "lg:hidden",
						"aria-label": "Menu",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, {})
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetContent, {
					side: "left",
					className: "p-0",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sidebar, { onNavigate: () => setOpen(false) })
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative min-w-0 flex-1",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: query,
						onChange: (e) => setQuery(e.target.value),
						placeholder: "Rechercher un produit, une commande, un client…",
						className: "h-10 pl-9",
						"aria-label": "Recherche"
					}),
					hits.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute top-11 z-40 w-full overflow-hidden rounded-lg bg-popover shadow-[var(--shadow-border)]",
						children: hits.map((hit) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							className: "flex w-full items-center justify-between px-3 py-2.5 text-left text-sm hover:bg-accent",
							onClick: () => {
								navigate({ to: hit.to });
								setQuery("");
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: hit.label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs text-muted-foreground",
								children: hit.type
							})]
						}, hit.type + hit.label))
					}) : null
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "hidden text-right text-xs text-muted-foreground xl:block",
				children: ["Aujourd’hui", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "mt-0.5 block font-medium text-foreground",
					children: formatDateLong()
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenu, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuTrigger, {
				asChild: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "ghost",
					size: "icon",
					className: "relative",
					"aria-label": "Notifications",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, {}), lowStock + pendingPay > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute right-1.5 top-1.5 size-2 rounded-full bg-danger" }) : null]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuContent, {
				align: "end",
				className: "w-72",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuLabel, { children: "Alertes" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuSeparator, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
						className: "flex-col items-start gap-0.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
							"Stock faible (",
							lowStock,
							" produits)"
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs text-muted-foreground",
							children: "Réapprovisionner le catalogue"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
						className: "flex-col items-start gap-0.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
							"Nouvelles commandes (",
							newOrders,
							")"
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs text-muted-foreground",
							children: "À préparer aujourd’hui"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
						className: "flex-col items-start gap-0.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
							"Paiements en attente (",
							pendingPay,
							")"
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs text-muted-foreground",
							children: "DBS Payment"
						})]
					})
				]
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				variant: "outline",
				size: "sm",
				className: "hidden sm:inline-flex",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/boutique",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Store, { className: "size-4" }), "Voir la boutique"]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid size-9 place-items-center rounded-full bg-primary font-display text-xs font-semibold text-primary-foreground",
					children: "AD"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "hidden leading-tight md:block",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-medium",
						children: "Admin DBS"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground",
						children: "Administrateur"
					})]
				})]
			})
		]
	});
}
function MobileDock() {
	const count = useDbs((s) => s.cart).reduce((n, c) => n + c.qty, 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
		className: "fixed inset-x-0 bottom-0 z-30 grid grid-cols-4 border-t border-border bg-background/95 px-2 py-2 backdrop-blur-md lg:hidden",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/",
				className: "grid place-items-center gap-1 py-1 text-xs text-muted-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingBag, { className: "size-4" }), "Accueil"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/produits",
				className: "grid place-items-center gap-1 py-1 text-xs text-muted-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "size-4" }), "Produits"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/commandes",
				className: "grid place-items-center gap-1 py-1 text-xs text-muted-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { className: "size-4" }), "Commandes"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/boutique",
				className: "relative grid place-items-center gap-1 py-1 text-xs text-muted-foreground",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Store, { className: "size-4" }),
					"Boutique",
					count > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "absolute right-4 top-0 rounded-full bg-primary px-1.5 text-[10px] font-semibold text-primary-foreground",
						children: count
					}) : null
				]
			})
		]
	});
}
function AppShell({ children }) {
	(0, import_react.useEffect)(() => {
		rehydrateStore();
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-background text-foreground",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-y-0 left-0 z-20 hidden w-60 border-r border-border lg:block",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sidebar, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "lg:pl-60",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Topbar, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
					className: "px-4 py-5 pb-24 lg:px-6 lg:pb-8",
					children
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MobileDock, {})
		]
	});
}
function AdminLayout() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) });
}
//#endregion
export { AdminLayout as component };
