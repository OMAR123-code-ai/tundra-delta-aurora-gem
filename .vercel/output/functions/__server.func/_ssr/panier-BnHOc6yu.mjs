import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { m as require_jsx_runtime } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { i as formatCfa, t as Button, u as useDbs } from "./store-DJZ3SnuM.mjs";
import { b as Link, x as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { _ as Input, d as SelectContent, f as SelectItem, g as Label, m as SelectValue, p as SelectTrigger, u as Select } from "./router-2ZBdqfEB.mjs";
import { t as ShopShell } from "./shop-shell-CnbXGlcY.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/panier-BnHOc6yu.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function CartPage() {
	const cart = useDbs((s) => s.cart);
	const products = useDbs((s) => s.products);
	const methods = useDbs((s) => s.paymentMethods);
	const setCartQty = useDbs((s) => s.setCartQty);
	const removeFromCart = useDbs((s) => s.removeFromCart);
	const checkout = useDbs((s) => s.checkout);
	const navigate = useNavigate();
	const enabled = methods.filter((m) => m.enabled);
	const [name, setName] = (0, import_react.useState)("");
	const [phone, setPhone] = (0, import_react.useState)("");
	const [city, setCity] = (0, import_react.useState)("Abidjan");
	const [method, setMethod] = (0, import_react.useState)(enabled[0]?.name ?? "Orange Money");
	const lines = cart.map((c) => {
		const product = products.find((p) => p.id === c.productId);
		if (!product) return null;
		return {
			...c,
			product
		};
	}).filter((x) => Boolean(x));
	const total = lines.reduce((n, l) => n + l.product.price * l.qty, 0);
	function submit(e) {
		e.preventDefault();
		if (!lines.length) return;
		const id = checkout({
			name,
			phone,
			city,
			method
		});
		toast.success("Commande créée");
		navigate({
			to: "/paiement/$orderId",
			params: { orderId: id }
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShopShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto grid max-w-6xl gap-8 px-4 py-10 lg:grid-cols-[1fr_360px]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-display text-2xl font-semibold",
			children: "Panier"
		}), lines.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-6 text-sm text-muted-foreground",
			children: [
				"Votre panier est vide.",
				" ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/boutique",
					className: "text-primary",
					children: "Continuer les achats"
				})
			]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-6 space-y-3",
			children: lines.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "dbs-panel flex items-center gap-3 p-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: l.product.image,
						alt: "",
						className: "size-16 rounded-md object-cover"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-medium",
							children: l.product.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm tabular-nums text-muted-foreground",
							children: formatCfa(l.product.price)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						type: "number",
						min: 1,
						value: l.qty,
						className: "w-16",
						onChange: (e) => setCartQty(l.productId, Number(e.target.value))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "sm",
						onClick: () => removeFromCart(l.productId),
						children: "Retirer"
					})
				]
			}, l.productId))
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			className: "dbs-panel h-fit space-y-3 p-5",
			onSubmit: submit,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-semibold",
					children: "Paiement"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-2xl font-display font-semibold tabular-nums",
					children: formatCfa(total)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "cname",
						children: "Nom"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "cname",
						required: true,
						value: name,
						onChange: (e) => setName(e.target.value)
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "cphone",
						children: "Téléphone"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "cphone",
						required: true,
						value: phone,
						onChange: (e) => setPhone(e.target.value)
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "ccity",
						children: "Ville"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "ccity",
						required: true,
						value: city,
						onChange: (e) => setCity(e.target.value)
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Moyen de paiement" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
						value: method,
						onValueChange: setMethod,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: enabled.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: m.name,
							children: m.name
						}, m.id)) })]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					className: "w-full",
					disabled: !lines.length,
					children: "Payer maintenant"
				})
			]
		})]
	}) });
}
//#endregion
export { CartPage as component };
