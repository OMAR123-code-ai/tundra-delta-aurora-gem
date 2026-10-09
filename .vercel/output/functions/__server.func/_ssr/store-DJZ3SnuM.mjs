import "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { m as require_jsx_runtime, u as Slot } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { i as format, n as parseISO, t as fr } from "../_libs/date-fns.mjs";
import { n as persist, r as create, t as createJSONStorage } from "../_libs/zustand.mjs";
require_react();
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function mulberry32(seed) {
	let a = seed;
	return () => {
		a += 1831565813;
		let t = a;
		t = Math.imul(t ^ t >>> 15, t | 1);
		t ^= t + Math.imul(t ^ t >>> 7, t | 61);
		return ((t ^ t >>> 14) >>> 0) / 4294967296;
	};
}
function uid(prefix) {
	return `${prefix}-${Math.random().toString(36).slice(2, 8)}`;
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-[color,background-color,box-shadow,opacity,transform] duration-[var(--motion-quick)] ease-[var(--ease-out)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0 active:scale-[0.96]", {
	variants: {
		variant: {
			default: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-[var(--shadow-gold)]",
			secondary: "bg-secondary text-secondary-foreground hover:bg-accent",
			outline: "border border-border bg-transparent text-foreground hover:bg-accent",
			ghost: "text-muted-foreground hover:bg-accent hover:text-foreground",
			danger: "bg-danger text-foreground hover:bg-danger/90"
		},
		size: {
			default: "h-10 px-4",
			sm: "h-8 px-3 text-xs",
			lg: "h-11 px-5",
			icon: "size-10",
			"icon-sm": "size-8"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
function Button({ className, variant, size, asChild = false, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		...props
	});
}
function formatCfa(value) {
	return `${new Intl.NumberFormat("fr-FR").format(Math.round(value))} FCFA`;
}
function formatInt(value) {
	return new Intl.NumberFormat("fr-FR").format(Math.round(value));
}
function formatPct(value, digits = 1) {
	return `${value > 0 ? "+" : ""}${value.toLocaleString("fr-FR", {
		maximumFractionDigits: digits,
		minimumFractionDigits: digits
	})}%`;
}
function formatDate(iso) {
	return format(parseISO(iso), "d MMM yyyy", { locale: fr });
}
function formatDateLong(date = /* @__PURE__ */ new Date()) {
	return format(date, "d MMMM yyyy", { locale: fr });
}
var defaultPriceRules = {
	supplierPrice: 1e4,
	buyMarkupPct: 10,
	marginPct: 40,
	minMarginPct: 20,
	deliveryPct: 2.5,
	taxPct: 4.5,
	transactionFee: 0,
	psychological: true,
	psychoEnding: 990
};
function computePrice(rules) {
	const supplier = rules.supplierPrice;
	const purchase = Math.round(supplier * (1 + rules.buyMarkupPct / 100));
	const margin = Math.round(supplier * (rules.marginPct / 100));
	const subtotal = purchase + margin;
	const fees = Math.round(subtotal * (rules.deliveryPct / 100)) + Math.round(subtotal * (rules.taxPct / 100)) + rules.transactionFee;
	const raw = subtotal + fees;
	let suggested = raw;
	if (rules.psychological) {
		const thousands = Math.round(raw / 1e3) * 1e3;
		suggested = thousands - 1e3 + rules.psychoEnding;
		if (suggested < raw - 900) suggested += 1e3;
		if (suggested < purchase + margin) suggested = thousands + rules.psychoEnding - 1e3;
	}
	return {
		supplier,
		purchase,
		margin,
		fees,
		raw,
		suggested
	};
}
var FIRST = [
	"Jean",
	"Aissatou",
	"Moussa",
	"Fatimata",
	"Boubacar",
	"Aminata",
	"Ibrahim",
	"Mariam",
	"Ousmane",
	"Kadiatou",
	"Seydou",
	"Awa",
	"Abdoulaye",
	"Rokia"
];
var LAST = [
	"Dupont",
	"Diallo",
	"Traoré",
	"Sanogo",
	"Koné",
	"Ouattara",
	"Touré",
	"Cissé",
	"Sow",
	"Keita",
	"Camara",
	"Diop"
];
var CITIES = [
	"Abidjan",
	"Dakar",
	"Bamako",
	"Ouagadougou",
	"Conakry",
	"Lomé",
	"Cotonou"
];
function daysAgoIso(days, hours = 10) {
	const d = /* @__PURE__ */ new Date();
	d.setDate(d.getDate() - days);
	d.setHours(hours, 12, 0, 0);
	return d.toISOString();
}
function catalogProducts() {
	return [
		{
			id: "p-phone",
			name: "Smartphone 5G 128 Go",
			slug: "smartphone-5g-128",
			category: "Électronique",
			price: 249990,
			cost: 168e3,
			stock: 24,
			status: "en-ligne",
			image: "/products/smartphone.jpg",
			description: "Écran AMOLED 6,6\", 5G, 128 Go, triple capteur. Conçu pour durer, livré avec chargeur rapide.",
			sold: 0,
			revenue: 0,
			aiScore: 96,
			trend: "up",
			potential: "très élevé"
		},
		{
			id: "p-buds",
			name: "Écouteurs Bluetooth",
			slug: "ecouteurs-bluetooth",
			category: "Électronique",
			price: 9990,
			cost: 4200,
			stock: 56,
			status: "en-ligne",
			image: "/products/earbuds.jpg",
			description: "Autonomie 28 h, réduction de bruit, étui compact. Idéal quotidien et sport.",
			sold: 0,
			revenue: 0,
			aiScore: 84,
			trend: "stable",
			potential: "élevé"
		},
		{
			id: "p-watch",
			name: "Montre connectée",
			slug: "montre-connectee",
			category: "Accessoires",
			price: 24990,
			cost: 11200,
			stock: 32,
			status: "en-ligne",
			image: "/products/watch.jpg",
			description: "Cardio, GPS, notifications, 7 jours d’autonomie. Bracelet sport interchangeable.",
			sold: 0,
			revenue: 0,
			aiScore: 92,
			trend: "up",
			potential: "élevé"
		},
		{
			id: "p-tee",
			name: "T-shirt Homme Premium",
			slug: "tshirt-homme-premium",
			category: "Vêtements",
			price: 14990,
			cost: 4800,
			stock: 0,
			status: "epuise",
			image: "/products/tshirt.jpg",
			description: "Coton peigné 220 g, coupe droite, finitions soignées. Lavable 40°.",
			sold: 0,
			revenue: 0,
			aiScore: 64,
			trend: "up",
			potential: "moyen"
		},
		{
			id: "p-pack",
			name: "Sac à dos multifonction",
			slug: "sac-a-dos-multifonction",
			category: "Accessoires",
			price: 16990,
			cost: 6200,
			stock: 18,
			status: "en-ligne",
			image: "/products/backpack.jpg",
			description: "Compartiment 15\", tissu déperlant, USB pass-through. Voyage et bureau.",
			sold: 0,
			revenue: 0,
			aiScore: 60,
			trend: "stable",
			potential: "moyen"
		},
		{
			id: "p-laptop",
			name: "Ultrabook Pro 14\"",
			slug: "ultrabook-pro-14",
			category: "Électronique",
			price: 459990,
			cost: 312e3,
			stock: 8,
			status: "en-ligne",
			image: "/products/laptop.jpg",
			description: "14\" 2.8K, 16 Go, SSD 512 Go, journée complète d’autonomie. Finition aluminium.",
			sold: 0,
			revenue: 0,
			aiScore: 88,
			trend: "up",
			potential: "très élevé"
		},
		{
			id: "p-phones",
			name: "Casque studio ANC",
			slug: "casque-studio-anc",
			category: "Électronique",
			price: 34990,
			cost: 15400,
			stock: 21,
			status: "en-ligne",
			image: "/products/headphones.jpg",
			description: "ANC hybride, 40 h, arceau métal. Signature sonore équilibrée.",
			sold: 0,
			revenue: 0,
			aiScore: 79,
			trend: "up",
			potential: "élevé"
		},
		{
			id: "p-shoes",
			name: "Baskets Urban Gold",
			slug: "baskets-urban-gold",
			category: "Vêtements",
			price: 29990,
			cost: 11800,
			stock: 14,
			status: "en-ligne",
			image: "/products/sneakers.jpg",
			description: "Semelle confort, cuir et mesh, détails or. Édition ville.",
			sold: 0,
			revenue: 0,
			aiScore: 71,
			trend: "stable",
			potential: "moyen"
		}
	];
}
function createSeed() {
	const products = catalogProducts();
	const rng = mulberry32(20261004);
	const methods = [
		"Orange Money",
		"Moov Money",
		"Wave",
		"Carte bancaire",
		"Virement bancaire"
	];
	const customers = [];
	const customerByName = /* @__PURE__ */ new Map();
	const orders = [];
	const pickProduct = () => {
		const roll = rng();
		if (roll < .26) return products[0];
		if (roll < .44) return products[1];
		if (roll < .58) return products[2];
		if (roll < .7) return products[6];
		if (roll < .8) return products[4];
		if (roll < .88) return products[3];
		if (roll < .95) return products[7];
		return products[5];
	};
	for (let i = 0; i < 48; i += 1) {
		const name = `${FIRST[Math.floor(rng() * FIRST.length)]} ${LAST[Math.floor(rng() * LAST.length)]}`;
		let customer = customerByName.get(name);
		if (!customer) {
			const slug = name.toLowerCase().replace(/\s+/g, ".");
			customer = {
				id: `c-${customers.length + 1}`,
				name,
				email: `${slug.replace(".", ".")}@mail.ci`.replace(" ", ""),
				phone: `07 ${Math.floor(10 + rng() * 89)} ${Math.floor(10 + rng() * 89)} ${Math.floor(10 + rng() * 89)} ${Math.floor(10 + rng() * 89)}`,
				city: CITIES[Math.floor(rng() * CITIES.length)],
				orders: 0,
				spent: 0
			};
			customer.email = `${name.toLowerCase().replace(/ /g, ".")}@mail.ci`;
			customers.push(customer);
			customerByName.set(name, customer);
		}
		const itemCount = rng() > .72 ? 2 : 1;
		const items = [];
		const used = /* @__PURE__ */ new Set();
		for (let k = 0; k < itemCount; k += 1) {
			const product = pickProduct();
			if (used.has(product.id)) continue;
			used.add(product.id);
			const qty = rng() > .85 ? 2 : 1;
			items.push({
				productId: product.id,
				name: product.name,
				qty,
				price: product.price
			});
			product.sold += qty;
			product.revenue += product.price * qty;
		}
		const amount = items.reduce((s, it) => s + it.price * it.qty, 0);
		const days = Math.floor(rng() * 7);
		let status = "en-cours";
		if (days >= 5) status = "livree";
		else if (days >= 2) status = rng() > .2 ? "expediee" : "livree";
		else if (rng() > .92) status = "annulee";
		let paymentStatus = "reussi";
		if (status === "annulee") paymentStatus = rng() > .5 ? "echec" : "reussi";
		else if (status === "en-cours" && rng() > .86) paymentStatus = "en-attente";
		const method = methods[Math.floor(rng() * methods.length)];
		const order = {
			id: `DBS-${1024 - i}`,
			customerId: customer.id,
			customerName: customer.name,
			date: daysAgoIso(days, 8 + Math.floor(rng() * 10)),
			items,
			amount,
			status,
			paymentMethod: method,
			paymentStatus
		};
		orders.push(order);
		if (paymentStatus === "reussi" && status !== "annulee") {
			customer.orders += 1;
			customer.spent += amount;
		}
	}
	orders.sort((a, b) => a.date < b.date ? 1 : -1);
	return {
		products,
		orders,
		customers,
		suppliers: [
			{
				id: "s-1",
				name: "Tech Import CI",
				contact: "Yves Kouassi",
				email: "yves@techimport.ci",
				products: 4,
				status: "actif"
			},
			{
				id: "s-2",
				name: "Mode Dakar",
				contact: "Awa Ndiaye",
				email: "awa@modedakar.sn",
				products: 2,
				status: "actif"
			},
			{
				id: "s-3",
				name: "Accessoires Sahel",
				contact: "Ibrahim Touré",
				email: "ibrahim@sahel.ml",
				products: 2,
				status: "actif"
			},
			{
				id: "s-4",
				name: "Electro Abidjan",
				contact: "Marie Yao",
				email: "marie@electroabj.ci",
				products: 0,
				status: "inactif"
			}
		],
		cart: [],
		priceRules: defaultPriceRules,
		paymentMethods: [
			{
				id: "orange",
				name: "Orange Money",
				enabled: true,
				tone: "orange"
			},
			{
				id: "moov",
				name: "Moov Money",
				enabled: true,
				tone: "moov"
			},
			{
				id: "wave",
				name: "Wave",
				enabled: true,
				tone: "wave"
			},
			{
				id: "card",
				name: "Carte bancaire",
				enabled: true,
				tone: "card"
			},
			{
				id: "transfer",
				name: "Virement bancaire",
				enabled: true,
				tone: "bank"
			}
		],
		integrations: [
			{
				id: "shopify",
				name: "Shopify",
				blurb: "Synchroniser le catalogue et les stocks",
				connected: true
			},
			{
				id: "gemini",
				name: "Gemini AI",
				blurb: "Analyse des produits gagnants",
				connected: true
			},
			{
				id: "dbs-pay",
				name: "DBS Payment",
				blurb: "Encaisser Orange Money, Wave, Moov",
				connected: false
			},
			{
				id: "sheets",
				name: "Google Sheets",
				blurb: "Export automatique des commandes",
				connected: true
			},
			{
				id: "email",
				name: "Email & Notifications",
				blurb: "Alertes stock et nouvelles ventes",
				connected: true
			}
		],
		settings: {
			name: "Digital Business Store",
			tagline: "L'innovation au service de votre quotidien",
			email: "admin@dbs.store",
			phone: "+225 07 00 00 00",
			city: "Abidjan",
			currency: "FCFA"
		},
		automations: {
			autoPrice: true,
			stockAlerts: true,
			winScan: true,
			orderNotify: true
		},
		tickets: [],
		apiKeys: {
			shopify: "shpat_9f3•••••••c2",
			gemini: "AIza•••••••kQ",
			dbsPay: ""
		},
		visitors: 5842
	};
}
function nextOrderId(orders) {
	const nums = orders.map((o) => Number(o.id.replace("DBS-", ""))).filter((n) => !Number.isNaN(n));
	return `DBS-${(nums.length ? Math.max(...nums) : 1024) + 1}`;
}
var useDbs = create()(persist((set, get) => ({
	...createSeed(),
	hydrated: false,
	addProduct: (input) => set((s) => ({ products: [{
		...input,
		id: uid("p"),
		sold: 0,
		revenue: 0,
		aiScore: 55,
		trend: "stable",
		potential: "moyen"
	}, ...s.products] })),
	updateProduct: (id, patch) => set((s) => ({ products: s.products.map((p) => p.id === id ? {
		...p,
		...patch
	} : p) })),
	deleteProduct: (id) => set((s) => ({
		products: s.products.filter((p) => p.id !== id),
		cart: s.cart.filter((c) => c.productId !== id)
	})),
	setProductStatus: (id, status) => set((s) => ({ products: s.products.map((p) => p.id === id ? {
		...p,
		status
	} : p) })),
	updateOrderStatus: (id, status) => set((s) => ({ orders: s.orders.map((o) => o.id === id ? {
		...o,
		status
	} : o) })),
	togglePayment: (id) => set((s) => ({ paymentMethods: s.paymentMethods.map((m) => m.id === id ? {
		...m,
		enabled: !m.enabled
	} : m) })),
	toggleIntegration: (id) => set((s) => ({ integrations: s.integrations.map((i) => i.id === id ? {
		...i,
		connected: !i.connected
	} : i) })),
	setPriceRules: (patch) => set((s) => ({ priceRules: {
		...s.priceRules,
		...patch
	} })),
	setSettings: (patch) => set((s) => ({ settings: {
		...s.settings,
		...patch
	} })),
	setAutomations: (patch) => set((s) => ({ automations: {
		...s.automations,
		...patch
	} })),
	setApiKey: (key, value) => set((s) => ({ apiKeys: {
		...s.apiKeys,
		[key]: value
	} })),
	addToCart: (productId, qty = 1) => set((s) => {
		return { cart: s.cart.find((c) => c.productId === productId) ? s.cart.map((c) => c.productId === productId ? {
			...c,
			qty: c.qty + qty
		} : c) : [...s.cart, {
			productId,
			qty
		}] };
	}),
	setCartQty: (productId, qty) => set((s) => ({ cart: qty <= 0 ? s.cart.filter((c) => c.productId !== productId) : s.cart.map((c) => c.productId === productId ? {
		...c,
		qty
	} : c) })),
	removeFromCart: (productId) => set((s) => ({ cart: s.cart.filter((c) => c.productId !== productId) })),
	clearCart: () => set({ cart: [] }),
	checkout: ({ name, phone, city, method }) => {
		const s = get();
		const items = s.cart.map((c) => {
			const product = s.products.find((p) => p.id === c.productId);
			if (!product) return null;
			return {
				productId: product.id,
				name: product.name,
				qty: c.qty,
				price: product.price
			};
		}).filter((x) => Boolean(x));
		const amount = items.reduce((sum, it) => sum + it.price * it.qty, 0);
		const id = nextOrderId(s.orders);
		let customer = s.customers.find((c) => c.phone === phone || c.name.toLowerCase() === name.toLowerCase());
		const customers = [...s.customers];
		if (!customer) {
			customer = {
				id: uid("c"),
				name,
				email: `${name.toLowerCase().replace(/\s+/g, ".")}@client.ci`,
				phone,
				city,
				orders: 0,
				spent: 0
			};
			customers.unshift(customer);
		}
		set({
			products: s.products.map((p) => {
				const line = items.find((it) => it.productId === p.id);
				if (!line) return p;
				const stock = Math.max(0, p.stock - line.qty);
				return {
					...p,
					stock,
					status: stock === 0 ? "epuise" : p.status
				};
			}),
			customers,
			cart: [],
			orders: [{
				id,
				customerId: customer.id,
				customerName: name,
				date: (/* @__PURE__ */ new Date()).toISOString(),
				items,
				amount,
				status: "en-cours",
				paymentMethod: method,
				paymentStatus: "en-attente"
			}, ...s.orders]
		});
		return id;
	},
	payOrder: (id, success) => set((s) => {
		const order = s.orders.find((o) => o.id === id);
		if (!order) return s;
		if (!success) return { orders: s.orders.map((o) => o.id === id ? {
			...o,
			paymentStatus: "echec"
		} : o) };
		return {
			customers: s.customers.map((c) => c.id === order.customerId ? {
				...c,
				orders: c.orders + 1,
				spent: c.spent + order.amount
			} : c),
			products: s.products.map((p) => {
				const line = order.items.find((it) => it.productId === p.id);
				if (!line) return p;
				return {
					...p,
					sold: p.sold + line.qty,
					revenue: p.revenue + line.price * line.qty
				};
			}),
			orders: s.orders.map((o) => o.id === id ? {
				...o,
				paymentStatus: "reussi"
			} : o)
		};
	}),
	addTicket: (subject, message) => set((s) => ({ tickets: [{
		id: uid("t"),
		subject,
		message,
		date: (/* @__PURE__ */ new Date()).toISOString(),
		status: "ouvert"
	}, ...s.tickets] })),
	runAiScan: () => set((s) => ({ products: s.products.map((p) => {
		const velocity = p.sold / 10;
		const margin = (p.price - p.cost) / p.price;
		const stockFactor = p.stock === 0 ? -8 : p.stock < 8 ? 4 : 2;
		let aiScore = Math.round(Math.min(99, Math.max(40, 58 + velocity * 3 + margin * 40 + stockFactor)));
		const trend = velocity > 8 ? "up" : velocity < 3 ? "down" : "stable";
		const potential = aiScore >= 90 ? "très élevé" : aiScore >= 78 ? "élevé" : aiScore >= 62 ? "moyen" : "faible";
		if (p.status === "epuise") aiScore = Math.min(aiScore, 70);
		return {
			...p,
			aiScore,
			trend,
			potential
		};
	}) })),
	bumpVisitors: () => set((s) => ({ visitors: s.visitors + 1 })),
	resetDemo: () => set({
		...createSeed(),
		hydrated: true,
		cart: []
	})
}), {
	name: "dbs-store-v1",
	storage: createJSONStorage(() => typeof window === "undefined" ? {
		getItem: () => null,
		setItem: () => {},
		removeItem: () => {}
	} : localStorage),
	skipHydration: true,
	partialize: (s) => ({
		products: s.products,
		orders: s.orders,
		customers: s.customers,
		suppliers: s.suppliers,
		cart: s.cart,
		priceRules: s.priceRules,
		paymentMethods: s.paymentMethods,
		integrations: s.integrations,
		settings: s.settings,
		automations: s.automations,
		tickets: s.tickets,
		apiKeys: s.apiKeys,
		visitors: s.visitors
	})
}));
function rehydrateStore() {
	useDbs.persist.rehydrate();
}
//#endregion
export { formatDate as a, formatPct as c, formatCfa as i, rehydrateStore as l, cn as n, formatDateLong as o, computePrice as r, formatInt as s, Button as t, useDbs as u };
