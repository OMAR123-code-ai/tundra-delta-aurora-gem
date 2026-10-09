import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { m as require_jsx_runtime, n as CheckboxIndicator, t as Checkbox$1 } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { i as format, r as subDays, t as fr } from "../_libs/date-fns.mjs";
import { a as formatDate, i as formatCfa, n as cn, r as computePrice, s as formatInt, t as Button, u as useDbs } from "./store-DJZ3SnuM.mjs";
import { S as useRouter, _ as lazyRouteComponent, b as Link, d as Scripts, f as HeadContent, g as Outlet, h as createRouter, v as createFileRoute, y as createRootRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { M as Check, O as Ellipsis, b as Pencil, c as TrendingDown, f as Sparkles, i as Upload, j as ChevronDown, l as Trash2, o as TriangleAlert, s as TrendingUp, t as X, y as Plus } from "../_libs/lucide-react.mjs";
import { a as union, i as string, n as number, r as object, t as literal } from "../_libs/zod.mjs";
import { a as DialogOverlay, i as DialogDescription, n as DialogClose, o as DialogPortal, r as DialogContent$1, s as DialogTitle$1, t as Dialog$1 } from "../_libs/@radix-ui/react-dialog+[...].mjs";
import { a as Root2, i as Portal2, n as Item2, o as Separator2, r as Label2, s as Trigger, t as Content2 } from "../_libs/@radix-ui/react-dropdown-menu+[...].mjs";
import { a as SelectItemIndicator, c as SelectTrigger$1, i as SelectItem$1, l as SelectValue$1, n as SelectContent$1, o as SelectItemText, r as SelectIcon, s as SelectPortal, t as Select$1, u as SelectViewport } from "../_libs/@radix-ui/react-select+[...].mjs";
import { t as Provider } from "../_libs/radix-ui__react-tooltip.mjs";
import { n as toast, t as Toaster } from "../_libs/sonner.mjs";
import { a as CartesianGrid, i as Area, n as YAxis, o as ResponsiveContainer, r as XAxis, s as Tooltip, t as AreaChart } from "../_libs/recharts+[...].mjs";
import { n as SwitchThumb, t as Switch$1 } from "../_libs/radix-ui__react-switch.mjs";
import { i as Trigger$1, n as List, r as Root2$1, t as Content } from "../_libs/radix-ui__react-tabs.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-2ZBdqfEB.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
var FALLBACK_MESSAGE = "An unexpected error occurred. Try reloading the page.";
function errorMessage(error) {
	if (error instanceof Error && error.message) return error.message;
	if (typeof error === "string" && error) return error;
	return FALLBACK_MESSAGE;
}
function AppErrorComponent({ error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-screen flex-col items-center justify-center gap-3 px-6 text-center bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-red-500",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
					className: "size-10",
					strokeWidth: 2
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-lg font-semibold",
				children: "Something went wrong"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm break-words text-zinc-500 dark:text-zinc-400",
				children: errorMessage(error)
			})
		]
	});
}
/**
* App-wide client provider mounted once near the root (in `src/routes/__root.tsx`):
*
*   <AuthProvider><Outlet /></AuthProvider>
*
* Better Auth's React client (`@/lib/auth/client`) needs NO context provider —
* its `useSession()` works standalone — so this is a passthrough today. It's
* kept as the single, stable mount point for any future client-side providers
* (e.g. a toast or theme provider) without churning the root shell.
*/
function AuthProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
var CONNECTOR_TOKEN_READY_EVENT = "grok:connector-token-ready";
function isGrokEmbedderOrigin(origin) {
	try {
		const url = new URL(origin);
		if (url.protocol !== "https:" && url.protocol !== "http:") return false;
		const host = url.hostname.toLowerCase();
		if (host === "grok.com" || host.endsWith(".grok.com")) return true;
		if (host === "localhost" || host === "127.0.0.1" || host === "[::1]") return true;
		return false;
	} catch {
		return false;
	}
}
function isSandboxPreviewGuestHost(hostname) {
	const host = hostname.toLowerCase();
	return host === "grok-sandbox.com" || host.endsWith(".grok-sandbox.com");
}
function isRemintPreviewPair(guestHost, parentHost) {
	const guest = guestHost.toLowerCase();
	const parent = parentHost.toLowerCase();
	const i = guest.indexOf(".preview.");
	if (i <= 0) return false;
	const label = guest.slice(0, i);
	const rest = guest.slice(i + 9);
	if (label.includes(".") || !rest.includes(".")) return false;
	return parent === rest || parent === `grok.${rest}`;
}
function resolveParentEmbedderOrigin(parentIsSelf, referrer, ancestorOrigin, guestHostname = "") {
	if (parentIsSelf) return null;
	for (const candidate of [referrer, ancestorOrigin ?? ""].filter(Boolean)) try {
		const url = new URL(candidate.includes("://") ? candidate : `https://${candidate}`);
		if (url.protocol !== "https:" && url.protocol !== "http:") continue;
		if (isGrokEmbedderOrigin(url.origin)) return url.origin;
		if (isSandboxPreviewGuestHost(guestHostname) || isRemintPreviewPair(guestHostname, url.hostname)) return url.origin;
	} catch {}
	return null;
}
/**
* Guest side of the grok-web ↔ sandbox preview postMessage bridge.
*
* Activates only when this page is framed by an allowlisted Grok embedder.
* Top-level runs (download/export, local `npm run dev`, deployed sites) noop.
*/
var PREVIEW_BRIDGE_CHANNEL = "grok-preview-bridge";
var EnvelopeSchema = object({
	channel: literal(PREVIEW_BRIDGE_CHANNEL),
	version: number().int().positive(),
	type: string().min(1)
});
var HelloSchema = EnvelopeSchema.extend({ type: literal("hello") });
var NavigateSchema = EnvelopeSchema.extend({
	type: literal("navigate"),
	path: string().min(1)
});
var HistorySchema = EnvelopeSchema.extend({
	type: literal("history"),
	delta: union([literal(-1), literal(1)])
});
var ConnectorTokenReadySchema = EnvelopeSchema.extend({ type: literal("connector-token-ready") });
function isSafeBridgePath(path) {
	if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return false;
	try {
		return new URL(path, "https://preview.invalid").origin === "https://preview.invalid";
	} catch {
		return false;
	}
}
/**
* Origin of the Grok embedder framing this page, or null when the page runs
* top-level (download/export, local `npm run dev`, deployed sites) or under a
* non-Grok parent. Client-only; null during SSR.
*/
function resolveCurrentEmbedderOrigin() {
	if (typeof window === "undefined") return null;
	const ancestorOrigin = typeof location.ancestorOrigins !== "undefined" && location.ancestorOrigins.length > 0 ? location.ancestorOrigins[0] : null;
	return resolveParentEmbedderOrigin(window.parent === window, document.referrer, ancestorOrigin, window.location.hostname);
}
/**
* Install host↔guest messaging. Returns a dispose function.
* Noops (returns a no-op dispose) when not embedded under a Grok parent.
*/
function installPreviewHostBridge(options = {}) {
	const parentOrigin = resolveCurrentEmbedderOrigin();
	if (parentOrigin === null) return () => {};
	const ROOT_STATE_KEY = "__grokPreviewBridgeRoot";
	const originalPushState = window.history.pushState.bind(window.history);
	const originalReplaceState = window.history.replaceState.bind(window.history);
	const isAtHistoryRoot = () => {
		const state = window.history.state;
		return Boolean(state && typeof state === "object" && state[ROOT_STATE_KEY] === true);
	};
	try {
		const current = window.history.state;
		if (!(current !== null && typeof current === "object" && Object.prototype.hasOwnProperty.call(current, ROOT_STATE_KEY))) {
			const isRoot = window.history.length <= 1;
			originalReplaceState(current && typeof current === "object" ? {
				...current,
				[ROOT_STATE_KEY]: isRoot
			} : { [ROOT_STATE_KEY]: isRoot }, "", window.location.href);
		}
	} catch {}
	const post = (message) => {
		window.parent.postMessage(message, parentOrigin);
	};
	const reportLocation = () => {
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "location",
			path: window.location.pathname || "/",
			search: window.location.search,
			hash: window.location.hash
		});
	};
	const reportRoutes = () => {
		const paths = options.getRoutePaths?.() ?? [];
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "routes",
			paths
		});
	};
	const defaultNavigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		try {
			const url = new URL(path, window.location.origin);
			if (url.origin !== window.location.origin) return;
			const next = `${url.pathname}${url.search}${url.hash}`;
			window.history.pushState(window.history.state, "", next);
			window.dispatchEvent(new PopStateEvent("popstate", { state: window.history.state }));
		} catch {}
	};
	const navigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		if (options.navigate) {
			options.navigate(path);
			return;
		}
		defaultNavigate(path);
	};
	const announce = () => {
		reportLocation();
		reportRoutes();
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "ready"
		});
	};
	const onHello = (data) => {
		if (!HelloSchema.safeParse(data).success) return;
		announce();
	};
	const onNavigate = (data) => {
		const parsed = NavigateSchema.safeParse(data);
		if (!parsed.success) return;
		navigate(parsed.data.path);
		queueMicrotask(reportLocation);
	};
	const onHistory = (data) => {
		const parsed = HistorySchema.safeParse(data);
		if (!parsed.success) return;
		if (parsed.data.delta === -1 && isAtHistoryRoot()) return;
		window.history.go(parsed.data.delta);
	};
	const onConnectorTokenReady = (data) => {
		if (!ConnectorTokenReadySchema.safeParse(data).success) return;
		window.dispatchEvent(new Event(CONNECTOR_TOKEN_READY_EVENT));
	};
	const hostMessageHandlers = /* @__PURE__ */ new Map([
		["hello", onHello],
		["navigate", onNavigate],
		["history", onHistory],
		["connector-token-ready", onConnectorTokenReady]
	]);
	const onMessage = (event) => {
		if (event.source !== window.parent) return;
		if (event.origin !== parentOrigin) return;
		const envelope = EnvelopeSchema.safeParse(event.data);
		if (!envelope.success || envelope.data.version !== 1) return;
		hostMessageHandlers.get(envelope.data.type)?.(event.data);
	};
	const onPopState = () => {
		reportLocation();
	};
	const onHashChange = () => {
		reportLocation();
	};
	window.history.pushState = (data, unused, url) => {
		const next = data && typeof data === "object" ? {
			...data,
			[ROOT_STATE_KEY]: false
		} : data;
		originalPushState(next, unused, url);
		reportLocation();
	};
	window.history.replaceState = (data, unused, url) => {
		const next = isAtHistoryRoot() ? {
			...data && typeof data === "object" ? data : {},
			[ROOT_STATE_KEY]: true
		} : data;
		originalReplaceState(next, unused, url);
		reportLocation();
	};
	window.addEventListener("message", onMessage);
	window.addEventListener("popstate", onPopState);
	window.addEventListener("hashchange", onHashChange);
	announce();
	return () => {
		window.removeEventListener("message", onMessage);
		window.removeEventListener("popstate", onPopState);
		window.removeEventListener("hashchange", onHashChange);
		window.history.pushState = originalPushState;
		window.history.replaceState = originalReplaceState;
	};
}
/** Collect static path patterns from a TanStack route tree (best-effort). */
function collectRoutePathsFromTree(routeTree) {
	const paths = /* @__PURE__ */ new Set();
	const walk = (node) => {
		if (!node || typeof node !== "object") return;
		const record = node;
		const full = typeof record.fullPath === "string" ? record.fullPath : typeof record.path === "string" ? record.path : null;
		if (full !== null && full !== "") paths.add(full.startsWith("/") ? full : `/${full}`);
		else if (full === "") paths.add("/");
		const children = record.children;
		if (Array.isArray(children)) for (const child of children) walk(child);
		else if (children && typeof children === "object") for (const child of Object.values(children)) walk(child);
	};
	walk(routeTree);
	return [...paths];
}
/**
* Mount once in `__root.tsx` so the Grok preview chrome can drive navigation
* (and later receive registered routes). Noops when the app is not embedded.
*/
function PreviewHostBridge() {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		return installPreviewHostBridge({
			navigate: (path) => {
				router.history.push(path);
			},
			getRoutePaths: () => collectRoutePathsFromTree(router.routeTree)
		});
	}, [router]);
	return null;
}
function TooltipProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Provider, {
		delayDuration: 200,
		children
	});
}
var styles_default = "/assets/styles-IDChBKM_.css";
var APP_NAME = "Digital Business Store";
var Route$19 = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: APP_NAME },
			{
				name: "theme-color",
				content: "#070B14"
			},
			{
				name: "description",
				content: "Digital Business Store — pilotez votre boutique : produits, commandes, paiements mobiles et IA."
			}
		],
		links: [
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/favicon.svg"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "manifest",
				href: "/__grok/manifest.webmanifest"
			},
			{
				rel: "apple-touch-icon",
				href: "/__grok/icon-180.png"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap"
			}
		]
	}),
	notFoundComponent: NotFound,
	component: RootDocument
});
function NotFound() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "grid min-h-dvh place-items-center bg-background px-6 text-foreground",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-2xl font-semibold",
					children: "Page introuvable"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Ce lien n’existe pas dans DBS."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						children: "Retour au tableau de bord"
					})
				})
			]
		})
	});
}
function RootDocument() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "fr",
		className: "antialiased",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewHostBridge, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) }) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
				theme: "dark",
				position: "top-right"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
		] })]
	});
}
var $$splitComponentImporter$5 = () => import("../_admin-DeTJE0sK.mjs");
var Route$18 = createFileRoute("/_admin")({ component: lazyRouteComponent($$splitComponentImporter$5, "component") });
var $$splitComponentImporter$4 = () => import("./boutique-K_d16j7B.mjs");
var Route$17 = createFileRoute("/boutique")({ component: lazyRouteComponent($$splitComponentImporter$4, "component") });
var $$splitComponentImporter$3 = () => import("./panier-BnHOc6yu.mjs");
var Route$16 = createFileRoute("/panier")({ component: lazyRouteComponent($$splitComponentImporter$3, "component") });
var $$splitComponentImporter$2 = () => import("../_admin-LdY2Hfq_.mjs");
var Route$15 = createFileRoute("/_admin/")({ component: lazyRouteComponent($$splitComponentImporter$2, "component") });
function PageHeader({ title, description, actions }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-display text-xl font-semibold tracking-tight sm:text-2xl",
			children: title
		}), description ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-sm text-muted-foreground",
			children: description
		}) : null] }), actions ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex flex-wrap items-center gap-2",
			children: actions
		}) : null]
	});
}
function SalesChart({ data }) {
	const [ready, setReady] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => setReady(true), []);
	if (!ready) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-56 rounded-lg bg-secondary/60" });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
		width: "100%",
		height: 224,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AreaChart, {
			data,
			margin: {
				top: 8,
				right: 8,
				left: 0,
				bottom: 0
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
					id: "salesFill",
					x1: "0",
					y1: "0",
					x2: "0",
					y2: "1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
						offset: "0%",
						stopColor: "var(--color-primary)",
						stopOpacity: .38
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
						offset: "100%",
						stopColor: "var(--color-primary)",
						stopOpacity: 0
					})]
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, { vertical: false }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
					dataKey: "label",
					tick: {
						fill: "var(--color-muted-foreground)",
						fontSize: 11
					},
					axisLine: false,
					tickLine: false
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
					tick: {
						fill: "var(--color-muted-foreground)",
						fontSize: 11
					},
					axisLine: false,
					tickLine: false,
					tickFormatter: (v) => v >= 1e6 ? `${Math.round(v / 1e5) / 10}M` : `${Math.round(v / 1e3)}k`,
					width: 36
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
					contentStyle: {
						background: "var(--color-popover)",
						border: "1px solid var(--color-border)",
						borderRadius: 12,
						color: "var(--color-foreground)"
					},
					formatter: (value) => formatCfa(Number(value ?? 0))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
					type: "monotone",
					dataKey: "value",
					stroke: "var(--color-primary)",
					strokeWidth: 2.4,
					fill: "url(#salesFill)"
				})
			]
		})
	});
}
function ProductThumb({ src, alt, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
		src,
		alt,
		className: cn("size-10 rounded-lg object-cover bg-secondary", className)
	});
}
var Route$14 = createFileRoute("/_admin/analytics")({ component: AnalyticsPage });
function AnalyticsPage() {
	const orders = useDbs((s) => s.orders);
	const products = useDbs((s) => s.products);
	const visitors = useDbs((s) => s.visitors);
	const paid = orders.filter((o) => o.paymentStatus === "reussi" && o.status !== "annulee");
	const revenue = paid.reduce((n, o) => n + o.amount, 0);
	const byCat = (0, import_react.useMemo)(() => {
		const map = /* @__PURE__ */ new Map();
		for (const p of products) map.set(p.category, (map.get(p.category) ?? 0) + p.revenue);
		return [...map.entries()];
	}, [products]);
	const series = Array.from({ length: 14 }, (_, i) => {
		const d = subDays(/* @__PURE__ */ new Date(), 13 - i);
		const key = d.toISOString().slice(0, 10);
		const value = paid.filter((o) => o.date.slice(0, 10) === key).reduce((n, o) => n + o.amount, 0);
		return {
			label: format(d, "d MMM", { locale: fr }),
			value
		};
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "Rapports & Analytics",
			description: "Pilotez le chiffre, le mix catégorie et les best-sellers."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-4 grid grid-cols-2 gap-3 lg:grid-cols-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat$2, {
					label: "CA 14 jours",
					value: formatCfa(revenue)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat$2, {
					label: "Commandes payées",
					value: formatInt(paid.length)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat$2, {
					label: "Visiteurs",
					value: formatInt(visitors)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat$2, {
					label: "Conversion",
					value: `${(paid.length / Math.max(visitors, 1) * 100).toLocaleString("fr-FR", { maximumFractionDigits: 1 })}%`
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-3 lg:grid-cols-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "dbs-panel p-5 lg:col-span-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mb-3 text-sm font-semibold",
					children: "Ventes"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SalesChart, { data: series })]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "dbs-panel p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mb-3 text-sm font-semibold",
					children: "Par catégorie"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "space-y-3",
					children: byCat.map(([name, value]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex items-center justify-between text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: name }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "tabular-nums",
							children: formatCfa(value)
						})]
					}, name))
				})]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "dbs-panel mt-3 p-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mb-4 text-sm font-semibold",
				children: "Best-sellers"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-4",
				children: [...products].sort((a, b) => b.sold - a.sold).slice(0, 4).map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductThumb, {
						src: p.image,
						alt: p.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-medium",
						children: p.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs text-muted-foreground",
						children: [
							formatInt(p.sold),
							" · ",
							formatCfa(p.revenue)
						]
					})] })]
				}, p.id))
			})]
		})
	] });
}
function Stat$2({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "dbs-panel p-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 font-display text-xl font-semibold tabular-nums",
			children: value
		})]
	});
}
function Input({ className, type, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		type,
		className: cn("flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground transition-[box-shadow,border-color] duration-[var(--motion-quick)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50", className),
		...props
	});
}
function Textarea({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
		className: cn("flex min-h-24 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring", className),
		...props
	});
}
function Label({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
		className: cn("text-xs font-medium text-muted-foreground", className),
		...props
	});
}
var Route$13 = createFileRoute("/_admin/assistance")({ component: AssistPage });
var faqs = [
	{
		q: "Comment synchroniser Shopify ?",
		a: "Ouvrez API & Intégrations, collez votre secret Shopify puis cliquez sur Connecter."
	},
	{
		q: "Quels moyens de paiement sont disponibles ?",
		a: "Orange Money, Moov Money, Wave, carte bancaire et virement — activables dans DBS Payment."
	},
	{
		q: "Comment l’IA calcule-t-elle le score ?",
		a: "Vélocité des ventes, marge réelle et stock. Lancez une analyse depuis Produits gagnants."
	}
];
function AssistPage() {
	const addTicket = useDbs((s) => s.addTicket);
	const tickets = useDbs((s) => s.tickets);
	const [subject, setSubject] = (0, import_react.useState)("");
	const [message, setMessage] = (0, import_react.useState)("");
	function submit(e) {
		e.preventDefault();
		addTicket(subject, message);
		setSubject("");
		setMessage("");
		toast.success("Ticket envoyé à l’assistance");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		title: "Assistance",
		description: "FAQ, tickets et contact 24/7 pour Digital Business Store."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-4 lg:grid-cols-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "space-y-3",
			children: faqs.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
				className: "dbs-panel p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("summary", {
					className: "cursor-pointer font-medium",
					children: f.q
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: f.a
				})]
			}, f.q))
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			className: "dbs-panel grid gap-3 p-5",
			onSubmit: submit,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-semibold",
					children: "Nouveau ticket"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "sub",
						children: "Sujet"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "sub",
						required: true,
						value: subject,
						onChange: (e) => setSubject(e.target.value)
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "msg",
						children: "Message"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
						id: "msg",
						required: true,
						value: message,
						onChange: (e) => setMessage(e.target.value)
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					className: "w-fit",
					children: "Envoyer"
				}),
				tickets.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-2 space-y-2 text-sm",
					children: tickets.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "rounded-md bg-secondary px-3 py-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-medium",
							children: t.subject
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-muted-foreground",
							children: [
								formatDate(t.date),
								" · ",
								t.status
							]
						})]
					}, t.id))
				}) : null
			]
		})]
	})] });
}
var badgeVariants = cva("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium", {
	variants: { variant: {
		default: "bg-primary/15 text-primary",
		success: "bg-success/15 text-success",
		danger: "bg-danger/15 text-danger",
		warning: "bg-warning/15 text-warning",
		info: "bg-info/15 text-info",
		muted: "bg-accent text-muted-foreground"
	} },
	defaultVariants: { variant: "default" }
});
function Badge({ className, variant, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn(badgeVariants({ variant }), className),
		...props
	});
}
var productMap = {
	"en-ligne": {
		label: "En ligne",
		variant: "success"
	},
	"en-attente": {
		label: "En attente",
		variant: "warning"
	},
	epuise: {
		label: "Épuisé",
		variant: "danger"
	}
};
var orderMap = {
	"en-cours": {
		label: "En cours",
		variant: "warning"
	},
	expediee: {
		label: "Expédiée",
		variant: "info"
	},
	livree: {
		label: "Livrée",
		variant: "success"
	},
	annulee: {
		label: "Annulée",
		variant: "muted"
	}
};
var payMap = {
	reussi: {
		label: "Réussi",
		variant: "success"
	},
	"en-attente": {
		label: "En attente",
		variant: "warning"
	},
	echec: {
		label: "Échec",
		variant: "danger"
	}
};
function ProductStatusBadge({ status }) {
	const m = productMap[status];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
		variant: m.variant,
		children: m.label
	});
}
function OrderStatusBadge({ status }) {
	const m = orderMap[status];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
		variant: m.variant,
		children: m.label
	});
}
function PaymentStatusBadge({ status }) {
	const m = payMap[status];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
		variant: m.variant,
		children: m.label
	});
}
var Route$12 = createFileRoute("/_admin/catalogue")({ component: CataloguePage });
var cats = [
	"Tous",
	"Électronique",
	"Accessoires",
	"Vêtements"
];
function CataloguePage() {
	const products = useDbs((s) => s.products);
	const [cat, setCat] = (0, import_react.useState)("Tous");
	const rows = products.filter((p) => cat === "Tous" || p.category === cat);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "Catalogue",
			description: "Vue vitrine de vos produits, telle que vos clients la voient.",
			actions: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				variant: "outline",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/boutique",
					children: "Ouvrir la boutique"
				})
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mb-5 flex flex-wrap gap-2",
			children: cats.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => setCat(c),
				className: cn("h-9 rounded-full px-4 text-sm", cat === c ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"),
				children: c
			}, c))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-4 sm:grid-cols-2 xl:grid-cols-4",
			children: rows.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: "dbs-panel overflow-hidden p-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductThumb, {
					src: p.image,
					alt: p.name,
					className: "aspect-square h-auto w-full rounded-lg"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-2 p-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start justify-between gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-sm font-semibold",
								children: p.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductStatusBadge, { status: p.status })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground",
							children: p.category
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-base font-semibold tabular-nums",
							children: formatCfa(p.price)
						})
					]
				})]
			}, p.id))
		})
	] });
}
var Route$11 = createFileRoute("/_admin/clients")({ component: ClientsPage });
function ClientsPage() {
	const customers = useDbs((s) => s.customers);
	const [q, setQ] = (0, import_react.useState)("");
	const rows = (0, import_react.useMemo)(() => customers.filter((c) => c.name.toLowerCase().includes(q.toLowerCase()) || c.city.toLowerCase().includes(q.toLowerCase()) || c.phone.includes(q)), [customers, q]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "Clients",
			description: "Annuaire de votre boutique — commandes et panier cumulé."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
			value: q,
			placeholder: "Rechercher un client…",
			onChange: (e) => setQ(e.target.value),
			className: "mb-4 max-w-md"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "dbs-panel overflow-x-auto p-0",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
				className: "dbs-table w-full min-w-[700px] text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
					className: "border-b border-border",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-4 py-3 text-left",
							children: "Client"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-2 py-3 text-left",
							children: "Téléphone"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-2 py-3 text-left",
							children: "Ville"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-2 py-3 text-left",
							children: "Commandes"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-4 py-3 text-right",
							children: "Dépensé"
						})
					]
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: rows.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
					className: "border-b border-border last:border-0",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
							className: "px-4 py-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-medium",
								children: c.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground",
								children: c.email
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-2 py-3 tabular-nums",
							children: c.phone
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-2 py-3",
							children: c.city
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-2 py-3 tabular-nums",
							children: formatInt(c.orders)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-4 py-3 text-right tabular-nums",
							children: formatCfa(c.spent)
						})
					]
				}, c.id)) })]
			})
		})
	] });
}
var Select = Select$1;
var SelectValue = SelectValue$1;
function SelectTrigger({ className, children, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectTrigger$1, {
		className: cn("flex h-10 w-full items-center justify-between gap-2 rounded-md border border-input bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1", className),
		...props,
		children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectIcon, {
			asChild: true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "size-4 text-muted-foreground" })
		})]
	});
}
function SelectContent({ className, children, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectPortal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent$1, {
		className: cn("relative z-50 min-w-32 overflow-hidden rounded-lg bg-popover text-popover-foreground shadow-[var(--shadow-border)]", className),
		position: "popper",
		sideOffset: 6,
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectViewport, {
			className: "p-1",
			children
		})
	}) });
}
function SelectItem({ className, children, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectItem$1, {
		className: cn("relative flex cursor-pointer select-none items-center rounded-md py-2 pl-8 pr-3 text-sm outline-none data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground", className),
		...props,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "absolute left-2 flex size-4 items-center justify-center",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItemIndicator, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-3.5 text-primary" }) })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItemText, { children })]
	});
}
var Route$10 = createFileRoute("/_admin/commandes")({ component: OrdersPage });
var statuses = [
	{
		id: "all",
		label: "Toutes"
	},
	{
		id: "en-cours",
		label: "En cours"
	},
	{
		id: "expediee",
		label: "Expédiées"
	},
	{
		id: "livree",
		label: "Livrées"
	},
	{
		id: "annulee",
		label: "Annulées"
	}
];
function OrdersPage() {
	const orders = useDbs((s) => s.orders);
	const updateOrderStatus = useDbs((s) => s.updateOrderStatus);
	const [q, setQ] = (0, import_react.useState)("");
	const [status, setStatus] = (0, import_react.useState)("all");
	const [page, setPage] = (0, import_react.useState)(1);
	const perPage = 10;
	const filtered = (0, import_react.useMemo)(() => {
		return orders.filter((o) => {
			return (o.id.toLowerCase().includes(q.toLowerCase()) || o.customerName.toLowerCase().includes(q.toLowerCase())) && (status === "all" || o.status === status);
		});
	}, [
		orders,
		q,
		status
	]);
	const pages = Math.max(1, Math.ceil(filtered.length / perPage));
	const slice = filtered.slice((page - 1) * perPage, page * perPage);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "Commandes",
			description: "Suivez et gérez toutes vos commandes en temps réel."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mb-4 flex flex-wrap gap-2",
			children: statuses.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => {
					setStatus(s.id);
					setPage(1);
				},
				className: `h-9 rounded-full px-4 text-sm ${status === s.id ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"}`,
				children: s.label
			}, s.id))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
			value: q,
			onChange: (e) => {
				setQ(e.target.value);
				setPage(1);
			},
			placeholder: "Rechercher une commande…",
			className: "mb-4 max-w-md"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "dbs-panel overflow-x-auto p-0",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
				className: "dbs-table w-full min-w-[800px] text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
					className: "border-b border-border",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-4 py-3 text-left",
							children: "Commande"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-2 py-3 text-left",
							children: "Client"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-2 py-3 text-left",
							children: "Date"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-2 py-3 text-left",
							children: "Montant"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-2 py-3 text-left",
							children: "Statut"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-4 py-3 text-right",
							children: "Action"
						})
					]
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: slice.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
					className: "border-b border-border last:border-0",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-4 py-3 font-medium",
							children: o.id
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-2 py-3",
							children: o.customerName
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-2 py-3 text-muted-foreground",
							children: formatDate(o.date)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-2 py-3 tabular-nums",
							children: formatCfa(o.amount)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-2 py-3",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OrderStatusBadge, { status: o.status })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-4 py-3 text-right",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								value: o.status,
								onValueChange: (v) => {
									updateOrderStatus(o.id, v);
									toast.success(`${o.id} · statut mis à jour`);
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
									className: "ml-auto h-8 w-36",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: "en-cours",
										children: "En cours"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: "expediee",
										children: "Expédiée"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: "livree",
										children: "Livrée"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: "annulee",
										children: "Annulée"
									})
								] })]
							})
						})
					]
				}, o.id)) })]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-4 flex justify-end gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "outline",
				size: "sm",
				disabled: page <= 1,
				onClick: () => setPage((p) => p - 1),
				children: "Précédent"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "outline",
				size: "sm",
				disabled: page >= pages,
				onClick: () => setPage((p) => p + 1),
				children: "Suivant"
			})]
		})
	] });
}
var Route$9 = createFileRoute("/_admin/fournisseurs")({ component: SuppliersPage });
function SuppliersPage() {
	const suppliers = useDbs((s) => s.suppliers);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		title: "Fournisseurs",
		description: "Partenaires d’approvisionnement de Digital Business Store."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid gap-3 md:grid-cols-2",
		children: suppliers.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
			className: "dbs-panel p-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-semibold",
						children: s.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground",
						children: s.contact
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						variant: s.status === "actif" ? "success" : "muted",
						children: s.status === "actif" ? "Actif" : "Inactif"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sm text-muted-foreground",
					children: s.email
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 text-sm",
					children: [
						s.products,
						" produit",
						s.products > 1 ? "s" : "",
						" rattaché",
						s.products > 1 ? "s" : ""
					]
				})
			]
		}, s.id))
	})] });
}
function Switch({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch$1, {
		className: cn("peer inline-flex h-5 w-9 shrink-0 items-center rounded-full border border-transparent bg-input transition-colors duration-[var(--motion-quick)] data-[state=checked]:bg-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring", className),
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SwitchThumb, { className: "pointer-events-none block size-4 translate-x-0.5 rounded-full bg-foreground shadow transition-transform duration-[var(--motion-quick)] data-[state=checked]:translate-x-[16px] data-[state=checked]:bg-primary-foreground" })
	});
}
var Route$8 = createFileRoute("/_admin/ia")({ component: IaPage });
function IaPage() {
	const automations = useDbs((s) => s.automations);
	const setAutomations = useDbs((s) => s.setAutomations);
	const runAiScan = useDbs((s) => s.runAiScan);
	function toggle(key, label) {
		setAutomations({ [key]: !automations[key] });
		toast.success(`${label} ${!automations[key] ? "activé" : "désactivé"}`);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "IA & Automatisations",
			description: "Laissez DBS piloter le prix, le stock et les produits gagnants.",
			actions: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				onClick: () => {
					runAiScan();
					toast.success("Scan des produits gagnants lancé");
				},
				children: "Lancer un scan"
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-3 lg:grid-cols-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row$1, {
					title: "Revalorisation automatique",
					desc: "Ajuste les prix selon les règles IA et la marge minimale.",
					checked: automations.autoPrice,
					onChange: () => toggle("autoPrice", "Revalorisation")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row$1, {
					title: "Alertes de stock",
					desc: "Prévenez-vous dès qu’un SKU tombe sous 3 unités.",
					checked: automations.stockAlerts,
					onChange: () => toggle("stockAlerts", "Alertes de stock")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row$1, {
					title: "Scan produits gagnants",
					desc: "Recalcule les scores chaque nuit.",
					checked: automations.winScan,
					onChange: () => toggle("winScan", "Scan gagnants")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row$1, {
					title: "Notifications de commandes",
					desc: "Push immédiat à chaque nouvelle vente.",
					checked: automations.orderNotify,
					onChange: () => toggle("orderNotify", "Notifications")
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-4",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				variant: "outline",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/produits-gagnants",
					children: "Voir les produits gagnants"
				})
			})
		})
	] });
}
function Row$1({ title, desc, checked, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "dbs-panel flex items-start justify-between gap-4 p-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "font-semibold",
			children: title
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-sm text-muted-foreground",
			children: desc
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
			checked,
			onCheckedChange: onChange
		})]
	});
}
var Tabs = Root2$1;
function TabsList({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(List, {
		className: cn("inline-flex h-10 items-center gap-1 rounded-lg bg-secondary p-1", className),
		...props
	});
}
function TabsTrigger({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trigger$1, {
		className: cn("inline-flex h-8 items-center rounded-md px-3 text-sm font-medium text-muted-foreground transition-colors duration-[var(--motion-quick)] data-[state=active]:bg-card data-[state=active]:text-foreground data-[state=active]:shadow-[var(--shadow-border)]", className),
		...props
	});
}
function TabsContent({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content, {
		className: cn("mt-4 outline-none", className),
		...props
	});
}
var Route$7 = createFileRoute("/_admin/integrations")({ component: IntegrationsPage });
function IntegrationsPage() {
	const integrations = useDbs((s) => s.integrations);
	const toggleIntegration = useDbs((s) => s.toggleIntegration);
	const apiKeys = useDbs((s) => s.apiKeys);
	const setApiKey = useDbs((s) => s.setApiKey);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		title: "Paramètres & Intégrations",
		description: "Configurez votre boutique et vos services externes."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
		defaultValue: "apps",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
					value: "apps",
					children: "Général"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
					value: "keys",
					children: "API & Tokens"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
					value: "pay",
					children: "Paiement"
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
				value: "apps",
				className: "grid gap-3 lg:grid-cols-2",
				children: integrations.map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "dbs-panel flex items-center justify-between gap-3 p-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-semibold",
						children: i.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground",
						children: i.blurb
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							variant: i.connected ? "success" : "warning",
							children: i.connected ? "Connecté" : "Configuration requise"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							variant: i.connected ? "outline" : "default",
							onClick: () => {
								toggleIntegration(i.id);
								toast.success(i.connected ? `${i.name} déconnecté` : `${i.name} connecté`);
							},
							children: i.connected ? "Déconnecter" : "Connecter"
						})]
					})]
				}, i.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
				value: "keys",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "dbs-panel grid max-w-xl gap-4 p-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "shopify",
								children: "Shopify API Secret"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "shopify",
								value: apiKeys.shopify,
								onChange: (e) => setApiKey("shopify", e.target.value)
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "gemini",
								children: "Gemini API Key"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "gemini",
								value: apiKeys.gemini,
								onChange: (e) => setApiKey("gemini", e.target.value)
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "dbs",
								children: "DBS Payment Key"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "dbs",
								placeholder: "pk_live_…",
								value: apiKeys.dbsPay,
								onChange: (e) => setApiKey("dbsPay", e.target.value)
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							className: "w-fit",
							onClick: () => toast.success("Clés enregistrées localement"),
							children: "Sauvegarder"
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
				value: "pay",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "dbs-panel p-5 text-sm text-muted-foreground",
					children: "Reliez DBS Payment pour encaisser Orange Money, Moov Money et Wave depuis la boutique publique."
				})
			})
		]
	})] });
}
var Route$6 = createFileRoute("/_admin/parametres")({ component: SettingsPage });
function SettingsPage() {
	const settings = useDbs((s) => s.settings);
	const setSettings = useDbs((s) => s.setSettings);
	const resetDemo = useDbs((s) => s.resetDemo);
	const snapshot = useDbs((s) => ({
		products: s.products,
		orders: s.orders,
		customers: s.customers,
		settings: s.settings
	}));
	function exportJson() {
		const blob = new Blob([JSON.stringify(snapshot, null, 2)], { type: "application/json" });
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = "dbs-sauvegarde.json";
		a.click();
		URL.revokeObjectURL(url);
		toast.success("Sauvegarde exportée");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		title: "Paramètres",
		description: "Identité de la boutique, sauvegarde et réinitialisation."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-4 lg:grid-cols-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			className: "dbs-panel grid gap-3 p-5",
			onSubmit: (e) => {
				e.preventDefault();
				toast.success("Boutique mise à jour");
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-semibold",
					children: "Général"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "sname",
						children: "Nom"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "sname",
						value: settings.name,
						onChange: (e) => setSettings({ name: e.target.value })
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "stag",
						children: "Slogan"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "stag",
						value: settings.tagline,
						onChange: (e) => setSettings({ tagline: e.target.value })
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-1.5 sm:grid-cols-2 sm:gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "semail",
							children: "Email"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "semail",
							value: settings.email,
							onChange: (e) => setSettings({ email: e.target.value })
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "sphone",
							children: "Téléphone"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "sphone",
							value: settings.phone,
							onChange: (e) => setSettings({ phone: e.target.value })
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-1.5 sm:grid-cols-2 sm:gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "scity",
							children: "Ville"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "scity",
							value: settings.city,
							onChange: (e) => setSettings({ city: e.target.value })
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "scur",
							children: "Devise"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "scur",
							value: settings.currency,
							readOnly: true
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					className: "mt-2 w-fit",
					children: "Enregistrer"
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "dbs-panel space-y-4 p-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-semibold",
					children: "Sauvegarde"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground",
					children: "Exportez un JSON de votre catalogue, commandes et clients, ou réinitialisez la démo."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						onClick: exportJson,
						children: "Exporter"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						onClick: () => {
							resetDemo();
							toast.success("Boutique réinitialisée");
						},
						children: "Réinitialiser la démo"
					})]
				})
			]
		})]
	})] });
}
var Route$5 = createFileRoute("/_admin/payment")({ component: PaymentPage });
var tones = {
	orange: "bg-pay-orange",
	moov: "bg-pay-moov",
	wave: "bg-pay-wave",
	card: "bg-info",
	bank: "bg-muted-foreground"
};
function PaymentPage() {
	const orders = useDbs((s) => s.orders);
	const methods = useDbs((s) => s.paymentMethods);
	const togglePayment = useDbs((s) => s.togglePayment);
	const paid = orders.filter((o) => o.paymentStatus === "reussi");
	const pending = orders.filter((o) => o.paymentStatus === "en-attente");
	const failed = orders.filter((o) => o.paymentStatus === "echec");
	const total = paid.reduce((n, o) => n + o.amount, 0);
	const rate = orders.length ? paid.length / orders.length * 100 : 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "DBS Payment",
			description: "Gérez vos paiements et suivez vos transactions.",
			actions: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
				variant: "success",
				children: "Système opérationnel"
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-5 grid grid-cols-2 gap-3 lg:grid-cols-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat$1, {
					label: "Total des transactions",
					value: formatCfa(total)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat$1, {
					label: "Paiements réussis",
					value: `${rate.toLocaleString("fr-FR", { maximumFractionDigits: 1 })}%`
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat$1, {
					label: "En attente",
					value: formatInt(pending.length)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat$1, {
					label: "Échecs",
					value: formatInt(failed.length)
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
			defaultValue: "tx",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
						value: "tx",
						children: "Transactions"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
						value: "methods",
						children: "Moyens de paiement"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
						value: "params",
						children: "Paramètres"
					})
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
					value: "tx",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "dbs-panel overflow-x-auto p-0",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
							className: "dbs-table w-full min-w-[720px] text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								className: "border-b border-border",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "px-4 py-3 text-left",
										children: "Réf."
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "px-2 py-3 text-left",
										children: "Commande"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "px-2 py-3 text-left",
										children: "Client"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "px-2 py-3 text-left",
										children: "Moyen"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "px-2 py-3 text-left",
										children: "Montant"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "px-2 py-3 text-left",
										children: "Statut"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "px-4 py-3 text-left",
										children: "Date"
									})
								]
							}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: orders.slice(0, 12).map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								className: "border-b border-border last:border-0",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
										className: "px-4 py-3 font-medium",
										children: ["TXN-", o.id.replace("DBS-", "")]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-2 py-3",
										children: o.id
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-2 py-3",
										children: o.customerName
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-2 py-3",
										children: o.paymentMethod
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-2 py-3 tabular-nums",
										children: formatCfa(o.amount)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-2 py-3",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaymentStatusBadge, { status: o.paymentStatus })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-4 py-3 text-muted-foreground",
										children: formatDate(o.date)
									})
								]
							}, o.id)) })]
						})
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
					value: "methods",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "dbs-panel divide-y divide-border p-0",
						children: methods.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between gap-3 px-5 py-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("size-8 rounded-full", tones[m.tone]) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-medium",
									children: m.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground",
									children: m.enabled ? "Accepté sur la boutique" : "Désactivé"
								})] })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
								checked: m.enabled,
								onCheckedChange: () => togglePayment(m.id)
							})]
						}, m.id))
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
					value: "params",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "dbs-panel p-5 text-sm text-muted-foreground",
						children: "Les encaissements Orange Money, Moov Money et Wave sont routés par DBS Payment. Activez la clé API dans Intégrations pour passer en production."
					})
				})
			]
		})
	] });
}
function Stat$1({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "dbs-panel p-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 font-display text-xl font-semibold tabular-nums sm:text-2xl",
			children: value
		})]
	});
}
var Dialog = Dialog$1;
function DialogContent({ className, children, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, { className: "fixed inset-0 z-50 bg-background/70 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent$1, {
		className: cn("fixed left-1/2 top-1/2 z-50 w-[min(100%-1.5rem,520px)] -translate-x-1/2 -translate-y-1/2 rounded-xl bg-card p-5 text-card-foreground shadow-[var(--shadow-border)] outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95", className),
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
function DialogHeader({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("mb-4 space-y-1 pr-8", className),
		...props
	});
}
function DialogTitle({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle$1, {
		className: cn("font-display text-lg font-semibold", className),
		...props
	});
}
function DialogDesc({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
		className: cn("text-sm text-muted-foreground", className),
		...props
	});
}
var IMAGES = [
	"/products/smartphone.jpg",
	"/products/earbuds.jpg",
	"/products/watch.jpg",
	"/products/tshirt.jpg",
	"/products/backpack.jpg",
	"/products/laptop.jpg",
	"/products/headphones.jpg",
	"/products/sneakers.jpg"
];
var empty = {
	name: "",
	category: "Électronique",
	price: 9990,
	cost: 4e3,
	stock: 10,
	status: "en-ligne",
	image: IMAGES[0],
	description: "",
	slug: ""
};
function ProductDialog({ open, onOpenChange, product, onSave }) {
	const [form, setForm] = (0, import_react.useState)(empty);
	(0, import_react.useEffect)(() => {
		if (product) setForm({
			name: product.name,
			category: product.category,
			price: product.price,
			cost: product.cost,
			stock: product.stock,
			status: product.status,
			image: product.image,
			description: product.description,
			slug: product.slug
		});
		else setForm(empty);
	}, [product, open]);
	function submit(e) {
		e.preventDefault();
		const slug = form.slug || form.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
		onSave({
			...form,
			slug
		});
		onOpenChange(false);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: product ? "Modifier le produit" : "Ajouter un produit" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDesc, { children: "Le catalogue se synchronise avec la boutique publique." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit: submit,
			className: "grid gap-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "pname",
						children: "Nom"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "pname",
						required: true,
						value: form.name,
						onChange: (e) => setForm({
							...form,
							name: e.target.value
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-2 gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Catégorie" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: form.category,
							onValueChange: (v) => setForm({
								...form,
								category: v
							}),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "Électronique",
									children: "Électronique"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "Accessoires",
									children: "Accessoires"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "Vêtements",
									children: "Vêtements"
								})
							] })]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Statut" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: form.status,
							onValueChange: (v) => setForm({
								...form,
								status: v
							}),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "en-ligne",
									children: "En ligne"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "en-attente",
									children: "En attente"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "epuise",
									children: "Épuisé"
								})
							] })]
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-3 gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "price",
								children: "Prix"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "price",
								type: "number",
								min: 0,
								value: form.price,
								onChange: (e) => setForm({
									...form,
									price: Number(e.target.value)
								})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "cost",
								children: "Coût"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "cost",
								type: "number",
								min: 0,
								value: form.cost,
								onChange: (e) => setForm({
									...form,
									cost: Number(e.target.value)
								})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "stock",
								children: "Stock"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "stock",
								type: "number",
								min: 0,
								value: form.stock,
								onChange: (e) => setForm({
									...form,
									stock: Number(e.target.value)
								})
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Visuel" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid grid-cols-8 gap-1.5",
						children: IMAGES.map((src) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setForm({
								...form,
								image: src
							}),
							className: `overflow-hidden rounded-md ring-offset-background ${form.image === src ? "ring-2 ring-primary" : "opacity-70 hover:opacity-100"}`,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src,
								alt: "",
								className: "aspect-square w-full object-cover"
							})
						}, src))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "desc",
						children: "Description"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
						id: "desc",
						value: form.description,
						onChange: (e) => setForm({
							...form,
							description: e.target.value
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-2 flex justify-end gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						variant: "outline",
						onClick: () => onOpenChange(false),
						children: "Annuler"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						children: "Enregistrer"
					})]
				})
			]
		})] })
	});
}
function Checkbox({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox$1, {
		className: cn("grid size-4 shrink-0 place-items-center rounded-xs border border-input bg-background data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground", className),
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckboxIndicator, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
			className: "size-3",
			strokeWidth: 3
		}) })
	});
}
var DropdownMenu = Root2;
var DropdownMenuTrigger = Trigger;
function DropdownMenuContent({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portal2, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2, {
		className: cn("z-50 min-w-44 overflow-hidden rounded-lg bg-popover p-1 text-popover-foreground shadow-[var(--shadow-border)]", className),
		sideOffset: 6,
		...props
	}) });
}
function DropdownMenuItem({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item2, {
		className: cn("flex cursor-pointer select-none items-center gap-2 rounded-md px-2.5 py-2 text-sm outline-none data-[highlighted]:bg-accent data-[highlighted]:text-foreground", className),
		...props
	});
}
function DropdownMenuLabel({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label2, {
		className: cn("px-2.5 py-1.5 text-xs font-medium text-muted-foreground", className),
		...props
	});
}
function DropdownMenuSeparator({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator2, {
		className: cn("my-1 h-px bg-border", className),
		...props
	});
}
var Route$4 = createFileRoute("/_admin/produits")({ component: ProduitsPage });
function ProduitsPage() {
	const products = useDbs((s) => s.products);
	const addProduct = useDbs((s) => s.addProduct);
	const updateProduct = useDbs((s) => s.updateProduct);
	const deleteProduct = useDbs((s) => s.deleteProduct);
	const [q, setQ] = (0, import_react.useState)("");
	const [cat, setCat] = (0, import_react.useState)("all");
	const [status, setStatus] = (0, import_react.useState)("all");
	const [sort, setSort] = (0, import_react.useState)("name");
	const [page, setPage] = (0, import_react.useState)(1);
	const [selected, setSelected] = (0, import_react.useState)([]);
	const [open, setOpen] = (0, import_react.useState)(false);
	const [editing, setEditing] = (0, import_react.useState)(null);
	const perPage = 8;
	const online = products.filter((p) => p.status === "en-ligne").length;
	const wait = products.filter((p) => p.status === "en-attente").length;
	const out = products.filter((p) => p.status === "epuise").length;
	const filtered = (0, import_react.useMemo)(() => {
		let rows = products.filter((p) => {
			const matchQ = p.name.toLowerCase().includes(q.toLowerCase());
			const matchC = cat === "all" || p.category === cat;
			const matchS = status === "all" || p.status === status;
			return matchQ && matchC && matchS;
		});
		rows = [...rows].sort((a, b) => {
			if (sort === "price") return b.price - a.price;
			if (sort === "stock") return b.stock - a.stock;
			return a.name.localeCompare(b.name, "fr");
		});
		return rows;
	}, [
		products,
		q,
		cat,
		status,
		sort
	]);
	const pages = Math.max(1, Math.ceil(filtered.length / perPage));
	const slice = filtered.slice((page - 1) * perPage, page * perPage);
	const allChecked = slice.length > 0 && slice.every((p) => selected.includes(p.id));
	function save(input) {
		if (editing) {
			updateProduct(editing.id, input);
			toast.success("Produit mis à jour");
		} else {
			addProduct(input);
			toast.success("Produit ajouté au catalogue");
		}
		setEditing(null);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "Gestion des produits",
			description: "Gérez votre catalogue et synchronisez-le avec la boutique.",
			actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				variant: "outline",
				onClick: () => toast.success("Catalogue Shopify synchronisé"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "size-4" }), "Importer"]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				onClick: () => {
					setEditing(null);
					setOpen(true);
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), "Ajouter un produit"]
			})] })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-4 flex flex-wrap gap-2 text-sm",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabChip, {
					active: status === "all",
					label: `Tous (${products.length})`,
					onClick: () => setStatus("all")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabChip, {
					active: status === "en-ligne",
					label: `En ligne (${online})`,
					onClick: () => setStatus("en-ligne")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabChip, {
					active: status === "en-attente",
					label: `En attente (${wait})`,
					onClick: () => setStatus("en-attente")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabChip, {
					active: status === "epuise",
					label: `Épuisé (${out})`,
					onClick: () => setStatus("epuise")
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-4 flex flex-col gap-2 sm:flex-row",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: q,
					onChange: (e) => {
						setQ(e.target.value);
						setPage(1);
					},
					placeholder: "Rechercher…",
					className: "sm:max-w-xs"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
					value: cat,
					onValueChange: (v) => {
						setCat(v);
						setPage(1);
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
						className: "sm:w-44",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Catégorie" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: "all",
							children: "Catégorie"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: "Électronique",
							children: "Électronique"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: "Accessoires",
							children: "Accessoires"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: "Vêtements",
							children: "Vêtements"
						})
					] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
					value: status,
					onValueChange: (v) => {
						setStatus(v);
						setPage(1);
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
						className: "sm:w-40",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Statut" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: "all",
							children: "Statut"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: "en-ligne",
							children: "En ligne"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: "en-attente",
							children: "En attente"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: "epuise",
							children: "Épuisé"
						})
					] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
					value: sort,
					onValueChange: setSort,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
						className: "sm:w-40",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: "name",
							children: "Trier par nom"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: "price",
							children: "Prix"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: "stock",
							children: "Stock"
						})
					] })]
				})
			]
		}),
		selected.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-3 flex items-center gap-2 rounded-lg bg-secondary px-3 py-2 text-sm",
			children: [
				selected.length,
				" sélectionné",
				selected.length > 1 ? "s" : "",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "sm",
					variant: "outline",
					onClick: () => {
						selected.forEach((id) => deleteProduct(id));
						setSelected([]);
						toast.success("Produits supprimés");
					},
					children: "Supprimer"
				})
			]
		}) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "dbs-panel overflow-x-auto p-0",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
				className: "dbs-table w-full min-w-[720px] text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
					className: "border-b border-border",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-4 py-3",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
								checked: allChecked,
								onCheckedChange: (v) => setSelected(v ? slice.map((p) => p.id) : selected.filter((id) => !slice.some((p) => p.id === id))),
								"aria-label": "Tout sélectionner"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-2 py-3 text-left",
							children: "Produit"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-2 py-3 text-left",
							children: "Prix"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-2 py-3 text-left",
							children: "Stock"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-2 py-3 text-left",
							children: "Statut"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-4 py-3 text-right",
							children: "Actions"
						})
					]
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: slice.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
					className: "border-b border-border last:border-0",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-4 py-3",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
								checked: selected.includes(p.id),
								onCheckedChange: (v) => setSelected((s) => v ? [...s, p.id] : s.filter((id) => id !== p.id)),
								"aria-label": p.name
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-2 py-3",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductThumb, {
									src: p.image,
									alt: p.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-medium",
									children: p.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground",
									children: p.category
								})] })]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-2 py-3 tabular-nums",
							children: formatCfa(p.price)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-2 py-3 tabular-nums",
							children: formatInt(p.stock)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-2 py-3",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductStatusBadge, { status: p.status })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-4 py-3 text-right",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenu, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuTrigger, {
								asChild: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "ghost",
									size: "icon-sm",
									"aria-label": "Actions",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ellipsis, {})
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuContent, {
								align: "end",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
									onSelect: () => {
										setEditing(p);
										setOpen(true);
									},
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "size-4" }), "Modifier"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
									onSelect: () => {
										deleteProduct(p.id);
										toast.success("Produit supprimé");
									},
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" }), "Supprimer"]
								})]
							})] })
						})
					]
				}, p.id)) })]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-4 flex items-center justify-between text-sm text-muted-foreground",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
				filtered.length,
				" produit",
				filtered.length > 1 ? "s" : "",
				" · page ",
				page,
				"/",
				pages
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "outline",
					size: "sm",
					disabled: page <= 1,
					onClick: () => setPage((p) => p - 1),
					children: "Précédent"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "outline",
					size: "sm",
					disabled: page >= pages,
					onClick: () => setPage((p) => p + 1),
					children: "Suivant"
				})]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductDialog, {
			open,
			onOpenChange: setOpen,
			product: editing,
			onSave: save
		})
	] });
}
function TabChip({ label, onClick, active }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onClick,
		className: `rounded-full px-3 py-1 text-sm ${active ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"}`,
		children: label
	});
}
var Route$3 = createFileRoute("/_admin/produits-gagnants")({ component: WinningPage });
function WinningPage() {
	const products = useDbs((s) => s.products);
	const runAiScan = useDbs((s) => s.runAiScan);
	const setProductStatus = useDbs((s) => s.setProductStatus);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const ranked = [...products].sort((a, b) => b.aiScore - a.aiScore);
	const revenue = products.reduce((n, p) => n + p.revenue, 0);
	const avg = products.length ? Math.round(products.reduce((n, p) => n + p.aiScore, 0) / products.length) : 0;
	async function analyze() {
		setBusy(true);
		await new Promise((r) => setTimeout(r, 900));
		runAiScan();
		setBusy(false);
		toast.success("Analyse IA terminée");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "Produits gagnants (IA)",
			description: "Découvrez les produits les plus performants grâce à l’analyse IA.",
			actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				onClick: () => void analyze(),
				disabled: busy,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-4" }), busy ? "Analyse…" : "Lancer l’analyse IA"]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-5 grid grid-cols-2 gap-3 lg:grid-cols-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					label: "Produits analysés",
					value: formatInt(products.length)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					label: "Score moyen",
					value: `${avg}`,
					hint: "+2 cette semaine"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					label: "Taux de succès",
					value: `${avg > 70 ? 86 : 72}%`
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					label: "Revenus estimés",
					value: formatCfa(revenue)
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
			defaultValue: "list",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
						value: "list",
						children: "Produits gagnants"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
						value: "ai",
						children: "Analyse IA"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
						value: "hist",
						children: "Historique"
					})
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
					value: "list",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "dbs-panel overflow-x-auto p-0",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
							className: "dbs-table w-full min-w-[760px] text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								className: "border-b border-border",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "px-4 py-3 text-left",
										children: "Produit"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "px-2 py-3 text-left",
										children: "Score IA"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "px-2 py-3 text-left",
										children: "Tendance"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "px-2 py-3 text-left",
										children: "Potentiel"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "px-4 py-3 text-right",
										children: "Action"
									})
								]
							}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: ranked.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								className: "border-b border-border last:border-0",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-4 py-3",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductThumb, {
												src: p.image,
												alt: p.name
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-medium",
												children: p.name
											})]
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-2 py-3",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: cn("inline-flex min-w-10 justify-center rounded-full px-2 py-0.5 text-xs font-semibold tabular-nums", p.aiScore >= 85 ? "bg-success/15 text-success" : p.aiScore >= 70 ? "bg-primary/15 text-primary" : "bg-accent text-muted-foreground"),
											children: p.aiScore
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-2 py-3",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "inline-flex items-center gap-1 text-xs",
											children: [p.trend === "down" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingDown, { className: "size-3.5 text-danger" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { className: "size-3.5 text-success" }), p.trend === "up" ? "En hausse" : p.trend === "down" ? "En baisse" : "Stable"]
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-2 py-3",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
											variant: p.potential === "très élevé" ? "success" : p.potential === "élevé" ? "default" : "muted",
											children: p.potential.charAt(0).toUpperCase() + p.potential.slice(1)
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-4 py-3 text-right",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
											size: "sm",
											onClick: () => {
												setProductStatus(p.id, "en-ligne");
												toast.success(`${p.name} mis en avant`);
											},
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-3.5" }), "Ajouter"]
										})
									})
								]
							}, p.id)) })]
						})
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
					value: "ai",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "dbs-panel space-y-3 p-5 text-sm text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Le score combine vélocité des ventes, marge réelle et disponibilité stock. Un score supérieur à 85 indique un produit à pousser en campagne." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							variant: "outline",
							size: "sm",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/regles-prix",
								children: "Ajuster les règles de prix"
							})
						})]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
					value: "hist",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "dbs-panel p-5 text-sm text-muted-foreground",
						children: "Dernière analyse : aujourd’hui. Les scores se recalculent à chaque lancement."
					})
				})
			]
		})
	] });
}
function Stat({ label, value, hint }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "dbs-panel p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 font-display text-2xl font-semibold tabular-nums",
				children: value
			}),
			hint ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-xs text-success",
				children: hint
			}) : null
		]
	});
}
var Route$2 = createFileRoute("/_admin/regles-prix")({ component: PriceRulesPage });
function PriceRulesPage() {
	const rules = useDbs((s) => s.priceRules);
	const setPriceRules = useDbs((s) => s.setPriceRules);
	const preview = computePrice(rules);
	function num(key, value) {
		const n = Number(value);
		if (Number.isNaN(n)) return;
		setPriceRules({ [key]: n });
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		title: "Règles de prix IA",
		description: "Configurez vos règles de tarification et laissez l’IA optimiser vos prix."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
		defaultValue: "base",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
					value: "base",
					children: "Paramètres de base"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
					value: "marge",
					children: "Marge & bénéfices"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
					value: "frais",
					children: "Frais & coûts"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
					value: "psycho",
					children: "Arrondi & psychologie"
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
				value: "base",
				className: "grid gap-4 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "dbs-panel space-y-4 p-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-sm font-semibold",
							children: "Paramètres de base"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Prix fournisseur",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								type: "number",
								min: 0,
								value: rules.supplierPrice,
								onChange: (e) => num("supplierPrice", e.target.value)
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Majoration d’achat (%)",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								type: "number",
								min: 0,
								value: rules.buyMarkupPct,
								onChange: (e) => num("buyMarkupPct", e.target.value)
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Marge (%)",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								type: "number",
								min: 0,
								value: rules.marginPct,
								onChange: (e) => num("marginPct", e.target.value)
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Marge minimale (%)",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								type: "number",
								min: 0,
								value: rules.minMarginPct,
								onChange: (e) => num("minMarginPct", e.target.value)
							})
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Preview, {
					preview,
					onSave: () => toast.success("Règles de prix enregistrées")
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
				value: "marge",
				className: "grid gap-4 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "dbs-panel space-y-4 p-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground",
						children: "La marge s’applique sur le prix fournisseur. En dessous de la marge minimale, le prix suggéré est recalé."
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Marge (%)",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "number",
							value: rules.marginPct,
							onChange: (e) => num("marginPct", e.target.value)
						})
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Preview, {
					preview,
					onSave: () => toast.success("Marges enregistrées")
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
				value: "frais",
				className: "grid gap-4 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "dbs-panel space-y-4 p-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Frais de livraison (%)",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								type: "number",
								value: rules.deliveryPct,
								onChange: (e) => num("deliveryPct", e.target.value)
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Taxes (%)",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								type: "number",
								value: rules.taxPct,
								onChange: (e) => num("taxPct", e.target.value)
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Frais de transaction",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								type: "number",
								value: rules.transactionFee,
								onChange: (e) => num("transactionFee", e.target.value)
							})
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Preview, {
					preview,
					onSave: () => toast.success("Frais enregistrés")
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
				value: "psycho",
				className: "grid gap-4 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "dbs-panel space-y-4 p-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Prix psychologique" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
							checked: rules.psychological,
							onCheckedChange: (v) => setPriceRules({ psychological: v })
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Seuil (ex. 990)",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "number",
							value: rules.psychoEnding,
							onChange: (e) => num("psychoEnding", e.target.value)
						})
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Preview, {
					preview,
					onSave: () => toast.success("Arrondi enregistré")
				})]
			})
		]
	})] });
}
function Field({ label, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-1.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: label }), children]
	});
}
function Preview({ preview, onSave }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "dbs-panel p-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mb-4 text-sm font-semibold",
				children: "Aperçu de prix"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
				className: "space-y-3 text-sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						k: "Prix fournisseur",
						v: formatCfa(preview.supplier)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						k: "Prix d’achat",
						v: formatCfa(preview.purchase)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						k: "Marge",
						v: formatCfa(preview.margin)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						k: "Frais & taxes",
						v: formatCfa(preview.fees)
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-5 rounded-lg bg-secondary p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted-foreground",
					children: "Prix de vente suggéré"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-2xl font-semibold tabular-nums text-primary",
					children: formatCfa(preview.suggested)
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				className: "mt-4 w-full",
				onClick: onSave,
				children: "Enregistrer"
			})
		]
	});
}
function Row({ k, v }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center justify-between",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
			className: "text-muted-foreground",
			children: k
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
			className: "tabular-nums",
			children: v
		})]
	});
}
var $$splitComponentImporter$1 = () => import("./boutique._id-sRO8TSkG.mjs");
var Route$1 = createFileRoute("/boutique/$id")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
var $$splitComponentImporter = () => import("./paiement._orderId-B78wQ6Bk.mjs");
var Route = createFileRoute("/paiement/$orderId")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var AdminRoute = Route$18.update({
	id: "/_admin",
	getParentRoute: () => Route$19
});
var BoutiqueRoute = Route$17.update({
	id: "/boutique",
	path: "/boutique",
	getParentRoute: () => Route$19
});
var PanierRoute = Route$16.update({
	id: "/panier",
	path: "/panier",
	getParentRoute: () => Route$19
});
var AdminIndexRoute = Route$15.update({
	id: "/",
	path: "/",
	getParentRoute: () => AdminRoute
});
var AdminAnalyticsRoute = Route$14.update({
	id: "/analytics",
	path: "/analytics",
	getParentRoute: () => AdminRoute
});
var AdminAssistanceRoute = Route$13.update({
	id: "/assistance",
	path: "/assistance",
	getParentRoute: () => AdminRoute
});
var AdminCatalogueRoute = Route$12.update({
	id: "/catalogue",
	path: "/catalogue",
	getParentRoute: () => AdminRoute
});
var AdminClientsRoute = Route$11.update({
	id: "/clients",
	path: "/clients",
	getParentRoute: () => AdminRoute
});
var AdminCommandesRoute = Route$10.update({
	id: "/commandes",
	path: "/commandes",
	getParentRoute: () => AdminRoute
});
var AdminFournisseursRoute = Route$9.update({
	id: "/fournisseurs",
	path: "/fournisseurs",
	getParentRoute: () => AdminRoute
});
var AdminIaRoute = Route$8.update({
	id: "/ia",
	path: "/ia",
	getParentRoute: () => AdminRoute
});
var AdminIntegrationsRoute = Route$7.update({
	id: "/integrations",
	path: "/integrations",
	getParentRoute: () => AdminRoute
});
var AdminParametresRoute = Route$6.update({
	id: "/parametres",
	path: "/parametres",
	getParentRoute: () => AdminRoute
});
var AdminPaymentRoute = Route$5.update({
	id: "/payment",
	path: "/payment",
	getParentRoute: () => AdminRoute
});
var AdminProduitsRoute = Route$4.update({
	id: "/produits",
	path: "/produits",
	getParentRoute: () => AdminRoute
});
var AdminProduitsGagnantsRoute = Route$3.update({
	id: "/produits-gagnants",
	path: "/produits-gagnants",
	getParentRoute: () => AdminRoute
});
var AdminReglesPrixRoute = Route$2.update({
	id: "/regles-prix",
	path: "/regles-prix",
	getParentRoute: () => AdminRoute
});
var BoutiqueIdRoute = Route$1.update({
	id: "/$id",
	path: "/$id",
	getParentRoute: () => BoutiqueRoute
});
var PaiementOrderIdRoute = Route.update({
	id: "/paiement/$orderId",
	path: "/paiement/$orderId",
	getParentRoute: () => Route$19
});
var AdminRouteChildren = {
	AdminAnalyticsRoute,
	AdminAssistanceRoute,
	AdminCatalogueRoute,
	AdminClientsRoute,
	AdminCommandesRoute,
	AdminFournisseursRoute,
	AdminIaRoute,
	AdminIntegrationsRoute,
	AdminParametresRoute,
	AdminPaymentRoute,
	AdminProduitsRoute,
	AdminProduitsGagnantsRoute,
	AdminReglesPrixRoute,
	AdminIndexRoute
};
var AdminRouteWithChildren = AdminRoute._addFileChildren(AdminRouteChildren);
var BoutiqueRouteChildren = { BoutiqueIdRoute };
var rootRouteChildren = {
	AdminRoute: AdminRouteWithChildren,
	BoutiqueRoute: BoutiqueRoute._addFileChildren(BoutiqueRouteChildren),
	PanierRoute,
	PaiementOrderIdRoute
};
var routeTree = Route$19._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		defaultErrorComponent: AppErrorComponent
	});
}
//#endregion
export { Input as _, DropdownMenuContent as a, DropdownMenuSeparator as c, SelectContent as d, SelectItem as f, Label as g, Badge as h, DropdownMenu as i, DropdownMenuTrigger as l, SelectValue as m, Route as n, DropdownMenuItem as o, SelectTrigger as p, Route$1 as r, DropdownMenuLabel as s, router_exports as t, Select as u, ProductThumb as v, SalesChart as y };
