import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { m as require_jsx_runtime } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { i as formatCfa, n as cn, t as Button, u as useDbs } from "./store-DJZ3SnuM.mjs";
import { J as notFound, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { A as CircleCheck } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as Route } from "./router-2ZBdqfEB.mjs";
import { n as DbsMark } from "./logo-Bm9S5KJm.mjs";
import { t as ShopShell } from "./shop-shell-CnbXGlcY.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/paiement._orderId-B78wQ6Bk.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function PayPage() {
	const { orderId } = Route.useParams();
	const orders = useDbs((s) => s.orders);
	const methods = useDbs((s) => s.paymentMethods);
	const payOrder = useDbs((s) => s.payOrder);
	const order = orders.find((o) => o.id === orderId);
	const enabled = methods.filter((m) => m.enabled);
	const [method, setMethod] = (0, import_react.useState)(order?.paymentMethod ?? enabled[0]?.name ?? "Orange Money");
	const [busy, setBusy] = (0, import_react.useState)(false);
	if (!order) throw notFound();
	const paid = order.paymentStatus === "reussi";
	async function confirm() {
		setBusy(true);
		await new Promise((r) => setTimeout(r, 800));
		payOrder(order.id, true);
		setBusy(false);
		toast.success("Paiement confirmé");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShopShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mx-auto flex max-w-md flex-col items-center px-4 py-12",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "dbs-panel w-full p-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col items-center text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DbsMark, { className: "size-16" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary",
						children: "Paiement sécurisé DBS"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
						className: "mt-2 font-display text-xl font-semibold",
						children: ["Commande ", order.id]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted-foreground",
						children: "Montant"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-3xl font-semibold tabular-nums",
						children: formatCfa(order.amount)
					})
				]
			}), paid ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 flex flex-col items-center gap-3 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-10 text-success" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-medium",
						children: "Paiement reçu"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm text-muted-foreground",
						children: [
							"Merci ",
							order.customerName,
							". Votre commande est en cours de préparation."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						className: "mt-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/boutique",
							children: "Retour à la boutique"
						})
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6 space-y-2",
				children: enabled.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => setMethod(m.name),
					className: cn("flex w-full items-center justify-between rounded-lg border px-3 py-3 text-sm", method === m.name ? "border-primary bg-primary/10" : "border-border"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: m.name }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("size-3 rounded-full", m.tone === "orange" && "bg-pay-orange", m.tone === "moov" && "bg-pay-moov", m.tone === "wave" && "bg-pay-wave", m.tone === "card" && "bg-info", m.tone === "bank" && "bg-muted-foreground") })]
				}, m.id))
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				className: "mt-6 w-full",
				disabled: busy,
				onClick: () => void confirm(),
				children: busy ? "Traitement…" : "Payer maintenant"
			})] })]
		})
	}) });
}
//#endregion
export { PayPage as component };
