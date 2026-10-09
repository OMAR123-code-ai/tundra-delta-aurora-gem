import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { m as require_jsx_runtime } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { i as formatCfa, n as cn, t as Button, u as useDbs } from "./store-DJZ3SnuM.mjs";
import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as DbsMark } from "./logo-Bm9S5KJm.mjs";
import { t as ShopShell } from "./shop-shell-CnbXGlcY.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/boutique-K_d16j7B.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var cats = [
	"Tous",
	"Électronique",
	"Accessoires",
	"Vêtements"
];
function BoutiquePage() {
	const products = useDbs((s) => s.products);
	const addToCart = useDbs((s) => s.addToCart);
	const bumpVisitors = useDbs((s) => s.bumpVisitors);
	const settings = useDbs((s) => s.settings);
	const [cat, setCat] = (0, import_react.useState)("Tous");
	const rows = products.filter((p) => p.status !== "en-attente").filter((p) => cat === "Tous" || p.category === cat);
	(0, import_react.useEffect)(() => {
		bumpVisitors();
	}, [bumpVisitors]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ShopShell, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "border-b border-border bg-[radial-gradient(circle_at_top,rgba(232,184,74,0.16),transparent_50%)]",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex max-w-6xl flex-col items-start gap-5 px-4 py-12 sm:py-16",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DbsMark, { className: "size-14" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-semibold uppercase tracking-[0.22em] text-primary",
					children: "Digital Business Store"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "max-w-xl font-display text-3xl font-semibold tracking-tight sm:text-5xl",
					children: settings.tagline
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "max-w-lg text-sm text-muted-foreground sm:text-base",
					children: "Électronique, accessoires et essentials — payez en Orange Money, Moov Money ou Wave."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "#catalogue",
						children: "Voir le catalogue"
					})
				})
			]
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id: "catalogue",
		className: "mx-auto max-w-6xl px-4 py-10",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mb-6 flex flex-wrap gap-2",
			children: cats.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => setCat(c),
				className: cn("h-9 rounded-full px-4 text-sm", cat === c ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"),
				children: c
			}, c))
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
			children: rows.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: "dbs-panel overflow-hidden p-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/boutique/$id",
					params: { id: p.slug },
					className: "block",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: p.image,
						alt: p.name,
						className: "aspect-square w-full rounded-lg object-cover"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-2 p-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground",
							children: p.category
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/boutique/$id",
							params: { id: p.slug },
							className: "font-medium hover:text-primary",
							children: p.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-lg font-semibold tabular-nums",
							children: formatCfa(p.price)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							className: "w-full",
							disabled: p.stock <= 0,
							onClick: () => {
								addToCart(p.id);
								toast.success(`${p.name} ajouté au panier`);
							},
							children: p.stock <= 0 ? "Épuisé" : "Ajouter au panier"
						})
					]
				})]
			}, p.id))
		})]
	})] });
}
//#endregion
export { BoutiquePage as component };
