export type Category = "Électronique" | "Accessoires" | "Vêtements";
export type ProductStatus = "en-ligne" | "en-attente" | "epuise";
export type OrderStatus = "en-cours" | "expediee" | "livree" | "annulee";
export type PaymentStatus = "reussi" | "en-attente" | "echec";
export type Trend = "up" | "down" | "stable";
export type Potential = "très élevé" | "élevé" | "moyen" | "faible";

export type Product = {
  id: string;
  name: string;
  slug: string;
  category: Category;
  price: number;
  cost: number;
  stock: number;
  status: ProductStatus;
  image: string;
  description: string;
  sold: number;
  revenue: number;
  aiScore: number;
  trend: Trend;
  potential: Potential;
};

export type OrderItem = {
  productId: string;
  name: string;
  qty: number;
  price: number;
};

export type Order = {
  id: string;
  customerId: string;
  customerName: string;
  date: string;
  items: OrderItem[];
  amount: number;
  status: OrderStatus;
  paymentMethod: string;
  paymentStatus: PaymentStatus;
};

export type Customer = {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  orders: number;
  spent: number;
};

export type Supplier = {
  id: string;
  name: string;
  contact: string;
  email: string;
  products: number;
  status: "actif" | "inactif";
};

export type CartItem = {
  productId: string;
  qty: number;
};

export type PriceRules = {
  supplierPrice: number;
  buyMarkupPct: number;
  marginPct: number;
  minMarginPct: number;
  deliveryPct: number;
  taxPct: number;
  transactionFee: number;
  psychological: boolean;
  psychoEnding: number;
};

export type PaymentMethod = {
  id: string;
  name: string;
  enabled: boolean;
  tone: "orange" | "moov" | "wave" | "card" | "bank";
};

export type Integration = {
  id: string;
  name: string;
  blurb: string;
  connected: boolean;
};

export type StoreSettings = {
  name: string;
  tagline: string;
  email: string;
  phone: string;
  city: string;
  currency: string;
};

export type Automations = {
  autoPrice: boolean;
  stockAlerts: boolean;
  winScan: boolean;
  orderNotify: boolean;
};

export type Ticket = {
  id: string;
  subject: string;
  message: string;
  date: string;
  status: "ouvert" | "resolu";
};

export type PricePreview = {
  supplier: number;
  purchase: number;
  margin: number;
  fees: number;
  raw: number;
  suggested: number;
};

export type NewsPost = {
  id: string;
  title: string;
  excerpt: string;
  body: string;
  date: string;
  published: boolean;
};
