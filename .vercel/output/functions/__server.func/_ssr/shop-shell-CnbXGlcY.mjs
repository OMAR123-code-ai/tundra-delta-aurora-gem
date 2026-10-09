import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { m as require_jsx_runtime } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { l as rehydrateStore, s as formatInt, t as Button, u as useDbs } from "./store-DJZ3SnuM.mjs";
import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { C as Lock, D as Headphones, a as Truck, d as Store, f as Sparkles, h as ShieldCheck, k as Clock } from "../_libs/lucide-react.mjs";
import { t as DbsLogo } from "./logo-Bm9S5KJm.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/shop-shell-CnbXGlcY.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ShopShell({ children }) {
	const count = useDbs((s) => s.cart).reduce((n, c) => n + c.qty, 0);
	const settings = useDbs((s) => s.settings);
	(0, import_react.useEffect)(() => {
		rehydrateStore();
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-background text-foreground",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
				className: "sticky top-0 z-30 border-b border-border bg-background/90 backdrop-blur-md",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/boutique",
							className: "min-w-0",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DbsLogo, {})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
							className: "hidden items-center gap-6 text-sm text-muted-foreground md:flex",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/boutique",
									className: "hover:text-foreground",
									children: "Boutique"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/panier",
									className: "hover:text-foreground",
									children: "Panier"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/",
									className: "hover:text-foreground",
									children: "Espace admin"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								variant: "outline",
								size: "sm",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/panier",
									children: ["Panier", count > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "rounded-full bg-primary px-1.5 text-xs font-semibold text-primary-foreground",
										children: formatInt(count)
									}) : null]
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								size: "sm",
								className: "hidden sm:inline-flex",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Store, { className: "size-4" }), "Admin"]
								})
							})]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", { children }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
				className: "mt-16 border-t border-border bg-sidebar",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto grid max-w-6xl gap-6 px-4 py-10 sm:grid-cols-2 lg:grid-cols-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "lg:col-span-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DbsLogo, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 max-w-sm text-sm text-muted-foreground",
							children: settings.tagline
						})]
					}), [
						{
							icon: ShieldCheck,
							label: "Produits de qualité"
						},
						{
							icon: Truck,
							label: "Livraison rapide"
						},
						{
							icon: Lock,
							label: "Paiement sécurisé"
						},
						{
							icon: Headphones,
							label: "Assistance 24/7"
						},
						{
							icon: Sparkles,
							label: "IA au service de votre boutique"
						},
						{
							icon: Clock,
							label: "Suivi en temps réel"
						}
					].slice(0, 4).map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start gap-2 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(item.icon, { className: "mt-0.5 size-4 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: item.label })]
					}, item.label))]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "border-t border-border",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-4 text-xs text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
							"© ",
							(/* @__PURE__ */ new Date()).getFullYear(),
							" Digital Business Store"
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "https://wa.me/225070000000",
							className: "inline-flex h-9 items-center gap-2 rounded-full bg-whatsapp px-3 font-medium text-background",
							children: "WhatsApp"
						})]
					})
				})]
			})
		]
	});
}
//#endregion
export { ShopShell as t };
