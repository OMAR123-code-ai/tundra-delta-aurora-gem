import { mulberry32 } from "@/lib/utils";
import { defaultPriceRules } from "@/lib/pricing";
import type {
  Automations,
  Customer,
  Integration,
  Order,
  PaymentMethod,
  Product,
  StoreSettings,
  Supplier,
  Ticket,
} from "@/lib/types";

const FIRST = [
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
  "Rokia",
];
const LAST = [
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
  "Diop",
];
const CITIES = ["Abidjan", "Dakar", "Bamako", "Ouagadougou", "Conakry", "Lomé", "Cotonou"];

function daysAgoIso(days: number, hours = 10) {
  const d = new Date();
  d.setDate(d.getDate() - days);
  d.setHours(hours, 12, 0, 0);
  return d.toISOString();
}

export function catalogProducts(): Product[] {
  return [
    {
      id: "p-phone",
      name: "Smartphone 5G 128 Go",
      slug: "smartphone-5g-128",
      category: "Électronique",
      price: 249990,
      cost: 168000,
      stock: 24,
      status: "en-ligne",
      image: "/products/smartphone.jpg",
      description:
        "Écran AMOLED 6,6\", 5G, 128 Go, triple capteur. Conçu pour durer, livré avec chargeur rapide.",
      sold: 0,
      revenue: 0,
      aiScore: 96,
      trend: "up",
      potential: "très élevé",
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
      potential: "élevé",
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
      potential: "élevé",
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
      potential: "moyen",
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
      potential: "moyen",
    },
    {
      id: "p-laptop",
      name: "Ultrabook Pro 14\"",
      slug: "ultrabook-pro-14",
      category: "Électronique",
      price: 459990,
      cost: 312000,
      stock: 8,
      status: "en-ligne",
      image: "/products/laptop.jpg",
      description: "14\" 2.8K, 16 Go, SSD 512 Go, journée complète d’autonomie. Finition aluminium.",
      sold: 0,
      revenue: 0,
      aiScore: 88,
      trend: "up",
      potential: "très élevé",
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
      potential: "élevé",
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
      potential: "moyen",
    },
  ];
}

export function createSeed() {
  const products = catalogProducts();
  const rng = mulberry32(20261004);
  const methods = ["Orange Money", "Moov Money", "Wave", "Carte bancaire", "Virement bancaire"];
  const customers: Customer[] = [];
  const customerByName = new Map<string, Customer>();
  const orders: Order[] = [];

  const pickProduct = () => {
    const roll = rng();
    if (roll < 0.26) return products[0];
    if (roll < 0.44) return products[1];
    if (roll < 0.58) return products[2];
    if (roll < 0.7) return products[6];
    if (roll < 0.8) return products[4];
    if (roll < 0.88) return products[3];
    if (roll < 0.95) return products[7];
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
        spent: 0,
      };
      customer.email = `${name.toLowerCase().replace(/ /g, ".")}@mail.ci`;
      customers.push(customer);
      customerByName.set(name, customer);
    }

    const itemCount = rng() > 0.72 ? 2 : 1;
    const items = [];
    const used = new Set<string>();
    for (let k = 0; k < itemCount; k += 1) {
      const product = pickProduct();
      if (used.has(product.id)) continue;
      used.add(product.id);
      const qty = rng() > 0.85 ? 2 : 1;
      items.push({
        productId: product.id,
        name: product.name,
        qty,
        price: product.price,
      });
      product.sold += qty;
      product.revenue += product.price * qty;
    }
    const amount = items.reduce((s, it) => s + it.price * it.qty, 0);
    const days = Math.floor(rng() * 7);
    let status: Order["status"] = "en-cours";
    if (days >= 5) status = "livree";
    else if (days >= 2) status = rng() > 0.2 ? "expediee" : "livree";
    else if (rng() > 0.92) status = "annulee";

    let paymentStatus: Order["paymentStatus"] = "reussi";
    if (status === "annulee") paymentStatus = rng() > 0.5 ? "echec" : "reussi";
    else if (status === "en-cours" && rng() > 0.86) paymentStatus = "en-attente";

    const method = methods[Math.floor(rng() * methods.length)];
    const idNum = 1024 - i;
    const order: Order = {
      id: `DBS-${idNum}`,
      customerId: customer.id,
      customerName: customer.name,
      date: daysAgoIso(days, 8 + Math.floor(rng() * 10)),
      items,
      amount,
      status,
      paymentMethod: method,
      paymentStatus,
    };
    orders.push(order);
    if (paymentStatus === "reussi" && status !== "annulee") {
      customer.orders += 1;
      customer.spent += amount;
    }
  }

  orders.sort((a, b) => (a.date < b.date ? 1 : -1));

  const suppliers: Supplier[] = [
    {
      id: "s-1",
      name: "Tech Import CI",
      contact: "Yves Kouassi",
      email: "yves@techimport.ci",
      products: 4,
      status: "actif",
    },
    {
      id: "s-2",
      name: "Mode Dakar",
      contact: "Awa Ndiaye",
      email: "awa@modedakar.sn",
      products: 2,
      status: "actif",
    },
    {
      id: "s-3",
      name: "Accessoires Sahel",
      contact: "Ibrahim Touré",
      email: "ibrahim@sahel.ml",
      products: 2,
      status: "actif",
    },
    {
      id: "s-4",
      name: "Electro Abidjan",
      contact: "Marie Yao",
      email: "marie@electroabj.ci",
      products: 0,
      status: "inactif",
    },
  ];

  const paymentMethods: PaymentMethod[] = [
    { id: "orange", name: "Orange Money", enabled: true, tone: "orange" },
    { id: "moov", name: "Moov Money", enabled: true, tone: "moov" },
    { id: "wave", name: "Wave", enabled: true, tone: "wave" },
    { id: "card", name: "Carte bancaire", enabled: true, tone: "card" },
    { id: "transfer", name: "Virement bancaire", enabled: true, tone: "bank" },
  ];

  const integrations: Integration[] = [
    { id: "shopify", name: "Shopify", blurb: "Synchroniser le catalogue et les stocks", connected: false },
    { id: "gemini", name: "Gemini AI", blurb: "Analyse des produits gagnants", connected: true },
    { id: "dbs-pay", name: "DBS Payment", blurb: "Encaisser Orange Money, Wave, Moov", connected: false },
    { id: "sheets", name: "Google Sheets", blurb: "Export automatique des commandes", connected: true },
    { id: "email", name: "Email & Notifications", blurb: "Alertes stock et nouvelles ventes", connected: true },
  ];

  const settings: StoreSettings = {
    name: "Digital Business Store",
    tagline: "L'innovation au service de votre quotidien",
    email: "admin@dbs.store",
    phone: "+225 07 00 00 00",
    city: "Abidjan",
    currency: "FCFA",
  };

  const automations: Automations = {
    autoPrice: true,
    stockAlerts: true,
    winScan: true,
    orderNotify: true,
  };

  const visitors = 5842;

  return {
    products,
    orders,
    customers,
    suppliers,
    cart: [] as { productId: string; qty: number }[],
    priceRules: defaultPriceRules,
    paymentMethods,
    integrations,
    settings,
    automations,
    tickets: [] as Ticket[],
    // Never seed credentials: real secrets must not ship in source code.
    apiKeys: {
      shopify: "",
      gemini: "",
      dbsPay: "",
    },
    visitors,
  };
}

export type SeedState = ReturnType<typeof createSeed>;
