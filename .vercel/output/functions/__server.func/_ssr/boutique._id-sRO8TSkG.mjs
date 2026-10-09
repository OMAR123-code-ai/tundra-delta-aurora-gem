import { m as require_jsx_runtime } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { i as formatCfa, t as Button, u as useDbs } from "./store-DJZ3SnuM.mjs";
import { J as notFound, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { h as Badge, r as Route$1 } from "./router-2ZBdqfEB.mjs";
import { t as ShopShell } from "./shop-shell-CnbXGlcY.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/boutique._id-sRO8TSkG.js
var import_jsx_runtime = require_jsx_runtime();
function ProductPage() {
	const { id } = Route$1.useParams();
	const products = useDbs((s) => s.products);
	const addToCart = useDbs((s) => s.addToCart);
	const product = products.find((p) => p.slug === id || p.id === id);
	if (!product) throw notFound();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShopShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto grid max-w-6xl gap-8 px-4 py-10 lg:grid-cols-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src: product.image,
			alt: product.name,
			className: "w-full rounded-xl object-cover"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs uppercase tracking-widest text-muted-foreground",
				children: product.category
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 font-display text-3xl font-semibold",
				children: product.name
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-sm text-muted-foreground",
				children: product.description
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-6 font-display text-3xl font-semibold tabular-nums",
				children: formatCfa(product.price)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3",
				children: product.stock > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
					variant: "success",
					children: [product.stock, " en stock"]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
					variant: "danger",
					children: "Épuisé"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 flex flex-wrap gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					disabled: product.stock <= 0,
					onClick: () => {
						addToCart(product.id);
						toast.success("Ajouté au panier");
					},
					children: "Ajouter au panier"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					variant: "outline",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/panier",
						children: "Voir le panier"
					})
				})]
			})
		] })]
	}) });
}
//#endregion
export { ProductPage as component };
