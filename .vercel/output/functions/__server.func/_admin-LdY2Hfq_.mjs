import { i as __toESM } from "./_runtime.mjs";
import { u as require_react } from "./_libs/@floating-ui/react-dom+[...].mjs";
import { m as require_jsx_runtime } from "./_libs/@radix-ui/react-checkbox+[...].mjs";
import { i as format, r as subDays, t as fr } from "./_libs/date-fns.mjs";
import { c as formatPct, i as formatCfa, n as cn, s as formatInt, t as Button, u as useDbs } from "./_ssr/store-DJZ3SnuM.mjs";
import { b as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { I as Banknote, L as ArrowUpRight, c as TrendingDown, d as Store, n as Wallet, p as ShoppingCart, r as Users, s as TrendingUp } from "./_libs/lucide-react.mjs";
import { d as SelectContent, f as SelectItem, m as SelectValue, p as SelectTrigger, u as Select, v as ProductThumb, y as SalesChart } from "./_ssr/router-2ZBdqfEB.mjs";
import { n as DbsMark } from "./_ssr/logo-Bm9S5KJm.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_admin-LdY2Hfq_.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function KpiCard({ label, value, delta, icon: Icon }) {
	const up = delta >= 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "dbs-panel p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start justify-between gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground",
					children: label
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "grid size-9 place-items-center rounded-full bg-primary/10 text-primary",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4" })
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 font-display text-xl font-semibold tabular-nums tracking-tight sm:text-2xl",
				children: value
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: cn("mt-1 flex items-center gap-1 text-xs tabular-nums", up ? "text-success" : "text-danger"),
				children: [up ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { className: "size-3.5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingDown, { className: "size-3.5" }), formatPct(delta)]
			})
		]
	});
}
function deltaPct(curr, prev) {
	if (prev === 0) return curr > 0 ? 100 : 0;
	return (curr - prev) / prev * 100;
}
function DashboardPage() {
	const [range, setRange] = (0, import_react.useState)("7");
	const products = useDbs((s) => s.products);
	const orders = useDbs((s) => s.orders);
	const visitors = useDbs((s) => s.visitors);
	const days = Number(range);
	const stats = (0, import_react.useMemo)(() => {
		const now = Date.now();
		const cut = now - days * 864e5;
		const prevCut = now - days * 2 * 864e5;
		const paid = (from, to) => orders.filter((o) => {
			const t = new Date(o.date).getTime();
			return o.paymentStatus === "reussi" && o.status !== "annulee" && t >= from && t < to;
		});
		const curr = paid(cut, now);
		const prev = paid(prevCut, cut);
		const sum = (xs) => xs.reduce((n, o) => n + o.amount, 0);
		const revenue = sum(curr);
		const count = curr.length;
		const series = Array.from({ length: days }, (_, i) => {
			const d = subDays(/* @__PURE__ */ new Date(), days - 1 - i);
			const key = d.toISOString().slice(0, 10);
			const value = orders.filter((o) => o.paymentStatus === "reussi" && o.status !== "annulee" && o.date.slice(0, 10) === key).reduce((n, o) => n + o.amount, 0);
			return {
				label: format(d, "d MMM", { locale: fr }),
				value
			};
		});
		return {
			revenue,
			revenueDelta: deltaPct(revenue, sum(prev)),
			count,
			countDelta: deltaPct(count, prev.length),
			avg: count ? revenue / count : 0,
			avgDelta: deltaPct(count ? revenue / count : 0, prev.length ? sum(prev) / prev.length : 0),
			conversion: visitors ? count / visitors * 100 : 0,
			series
		};
	}, [
		orders,
		days,
		visitors
	]);
	const top = [...products].sort((a, b) => b.revenue - a.revenue).slice(0, 5);
	const lowStock = products.filter((p) => p.stock <= 3).length;
	const pending = orders.filter((o) => o.paymentStatus === "en-attente").length;
	const open = orders.filter((o) => o.status === "en-cours").length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-2xl font-semibold tracking-tight",
					children: "Bonjour, Admin DBS"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground",
					children: "Voici un aperçu de votre boutique aujourd’hui."
				})] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 gap-3 xl:grid-cols-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
						label: "Chiffre d’affaires",
						value: formatCfa(stats.revenue),
						delta: stats.revenueDelta,
						icon: Banknote
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
						label: "Commandes",
						value: formatInt(stats.count),
						delta: stats.countDelta,
						icon: ShoppingCart
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
						label: "Visiteurs",
						value: formatInt(visitors),
						delta: 15.2,
						icon: Users
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
						label: "Taux de conversion",
						value: `${stats.conversion.toLocaleString("fr-FR", { maximumFractionDigits: 1 })}%`,
						delta: .7,
						icon: ArrowUpRight
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
						label: "Panier moyen",
						value: formatCfa(stats.avg),
						delta: stats.avgDelta,
						icon: Wallet
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3 xl:grid-cols-12",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "dbs-panel p-5 xl:col-span-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-3 flex items-center justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-sm font-semibold",
								children: "Évolution des ventes"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								value: range,
								onValueChange: setRange,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
									className: "h-8 w-40 text-xs",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: "7",
										children: "7 derniers jours"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: "14",
										children: "14 jours"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: "30",
										children: "30 jours"
									})
								] })]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SalesChart, { data: stats.series })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "dbs-panel p-5 xl:col-span-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mb-4 text-sm font-semibold",
							children: "Top produits"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "space-y-3",
							children: top.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex items-center gap-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductThumb, {
										src: p.image,
										alt: p.name
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "min-w-0 flex-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "truncate text-sm font-medium",
											children: p.name
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "text-xs text-muted-foreground",
											children: [formatInt(p.sold), " ventes"]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm font-medium tabular-nums",
										children: formatCfa(p.revenue)
									})
								]
							}, p.id))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-3 xl:col-span-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							className: "dbs-panel flex flex-col items-start gap-3 bg-[radial-gradient(circle_at_top_right,rgba(232,184,74,0.16),transparent_55%)] p-5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DbsMark, { className: "size-12" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-display text-sm font-semibold uppercase tracking-wide text-primary",
									children: "L’innovation au service de votre quotidien"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									asChild: true,
									size: "sm",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
										to: "/boutique",
										children: ["Gérer ma boutique", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Store, { className: "size-4" })]
									})
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							className: "dbs-panel p-5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "mb-3 text-sm font-semibold",
								children: "Alertes"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
								className: "space-y-2.5 text-sm",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertRow, {
										tone: "danger",
										label: `Stock faible (${lowStock} produits)`,
										to: "/produits"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertRow, {
										tone: "info",
										label: `Nouvelles commandes (${open})`,
										to: "/commandes"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertRow, {
										tone: "warning",
										label: `Paiements en attente (${pending})`,
										to: "/payment"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertRow, {
										tone: "danger",
										label: "Erreur API (1)",
										to: "/integrations"
									})
								]
							})]
						})]
					})
				]
			})
		]
	});
}
function AlertRow({ tone, label, to }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to,
		className: "flex items-center gap-2 text-muted-foreground hover:text-foreground",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("size-2 rounded-full", tone === "danger" && "bg-danger", tone === "info" && "bg-info", tone === "warning" && "bg-warning") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "flex-1",
			children: label
		})]
	});
}
//#endregion
export { DashboardPage as component };
