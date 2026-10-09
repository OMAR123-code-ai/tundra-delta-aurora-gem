import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { createSeed, type SeedState } from "@/lib/seed";
import type {
  Automations,
  CartItem,
  OrderStatus,
  PriceRules,
  Product,
  ProductStatus,
  StoreSettings,
} from "@/lib/types";
import { uid } from "@/lib/utils";

type DbsState = SeedState & {
  hydrated: boolean;
  addProduct: (input: Omit<Product, "id" | "sold" | "revenue" | "aiScore" | "trend" | "potential">) => void;
  updateProduct: (id: string, patch: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  setProductStatus: (id: string, status: ProductStatus) => void;
  updateOrderStatus: (id: string, status: OrderStatus) => void;
  togglePayment: (id: string) => void;
  toggleIntegration: (id: string) => void;
  setPriceRules: (patch: Partial<PriceRules>) => void;
  setSettings: (patch: Partial<StoreSettings>) => void;
  setAutomations: (patch: Partial<Automations>) => void;
  setApiKey: (key: "shopify" | "gemini" | "dbsPay", value: string) => void;
  addToCart: (productId: string, qty?: number) => void;
  setCartQty: (productId: string, qty: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  checkout: (input: {
    name: string;
    phone: string;
    city: string;
    method: string;
  }) => string;
  payOrder: (id: string, success: boolean) => void;
  addTicket: (subject: string, message: string) => void;
  runAiScan: () => void;
  bumpVisitors: () => void;
  resetDemo: () => void;
};

function nextOrderId(orders: SeedState["orders"]) {
  const nums = orders.map((o) => Number(o.id.replace("DBS-", ""))).filter((n) => !Number.isNaN(n));
  const max = nums.length ? Math.max(...nums) : 1024;
  return `DBS-${max + 1}`;
}

export const useDbs = create<DbsState>()(
  persist(
    (set, get) => ({
      ...createSeed(),
      hydrated: false,
      addProduct: (input) =>
        set((s) => ({
          products: [
            {
              ...input,
              id: uid("p"),
              sold: 0,
              revenue: 0,
              aiScore: 55,
              trend: "stable",
              potential: "moyen",
            },
            ...s.products,
          ],
        })),
      updateProduct: (id, patch) =>
        set((s) => ({
          products: s.products.map((p) => (p.id === id ? { ...p, ...patch } : p)),
        })),
      deleteProduct: (id) =>
        set((s) => ({
          products: s.products.filter((p) => p.id !== id),
          cart: s.cart.filter((c) => c.productId !== id),
        })),
      setProductStatus: (id, status) =>
        set((s) => ({
          products: s.products.map((p) => (p.id === id ? { ...p, status } : p)),
        })),
      updateOrderStatus: (id, status) =>
        set((s) => ({
          orders: s.orders.map((o) => (o.id === id ? { ...o, status } : o)),
        })),
      togglePayment: (id) =>
        set((s) => ({
          paymentMethods: s.paymentMethods.map((m) =>
            m.id === id ? { ...m, enabled: !m.enabled } : m,
          ),
        })),
      toggleIntegration: (id) =>
        set((s) => ({
          integrations: s.integrations.map((i) =>
            i.id === id ? { ...i, connected: !i.connected } : i,
          ),
        })),
      setPriceRules: (patch) =>
        set((s) => ({
          priceRules: { ...s.priceRules, ...patch },
        })),
      setSettings: (patch) =>
        set((s) => ({
          settings: { ...s.settings, ...patch },
        })),
      setAutomations: (patch) =>
        set((s) => ({
          automations: { ...s.automations, ...patch },
        })),
      setApiKey: (key, value) =>
        set((s) => ({
          apiKeys: { ...s.apiKeys, [key]: value },
        })),
      addToCart: (productId, qty = 1) =>
        set((s) => {
          const existing = s.cart.find((c) => c.productId === productId);
          const cart: CartItem[] = existing
            ? s.cart.map((c) =>
                c.productId === productId ? { ...c, qty: c.qty + qty } : c,
              )
            : [...s.cart, { productId, qty }];
          return { cart };
        }),
      setCartQty: (productId, qty) =>
        set((s) => ({
          cart:
            qty <= 0
              ? s.cart.filter((c) => c.productId !== productId)
              : s.cart.map((c) => (c.productId === productId ? { ...c, qty } : c)),
        })),
      removeFromCart: (productId) =>
        set((s) => ({ cart: s.cart.filter((c) => c.productId !== productId) })),
      clearCart: () => set({ cart: [] }),
      checkout: ({ name, phone, city, method }) => {
        const s = get();
        const items = s.cart
          .map((c) => {
            const product = s.products.find((p) => p.id === c.productId);
            if (!product) return null;
            return {
              productId: product.id,
              name: product.name,
              qty: c.qty,
              price: product.price,
            };
          })
          .filter((x): x is NonNullable<typeof x> => Boolean(x));
        const amount = items.reduce((sum, it) => sum + it.price * it.qty, 0);
        if (!items.length || amount <= 0) return "";
        // Fail closed: never create an order or decrement stock for an invalid quantity.
        const validQuantities = s.cart.every((line) => Number.isInteger(line.qty) && line.qty > 0);
        const hasEnoughStock = items.every((line) => {
          const product = s.products.find((p) => p.id === line.productId);
          return product !== undefined && line.qty <= product.stock;
        });
        if (!validQuantities || !hasEnoughStock) return "";
        const id = nextOrderId(s.orders);
        let customer = s.customers.find(
          (c) => c.phone === phone || c.name.toLowerCase() === name.toLowerCase(),
        );
        const customers = [...s.customers];
        if (!customer) {
          customer = {
            id: uid("c"),
            name,
            email: `${name.toLowerCase().replace(/\s+/g, ".")}@client.ci`,
            phone,
            city,
            orders: 0,
            spent: 0,
          };
          customers.unshift(customer);
        }
        const products = s.products.map((p) => {
          const line = items.find((it) => it.productId === p.id);
          if (!line) return p;
          const stock = Math.max(0, p.stock - line.qty);
          return {
            ...p,
            stock,
            status: stock === 0 ? ("epuise" as const) : p.status,
          };
        });
        set({
          products,
          customers,
          cart: [],
          orders: [
            {
              id,
              customerId: customer.id,
              customerName: name,
              date: new Date().toISOString(),
              items,
              amount,
              status: "en-cours",
              paymentMethod: method,
              paymentStatus: "en-attente",
            },
            ...s.orders,
          ],
        });
        return id;
      },
      payOrder: (id, success) =>
        set((s) => {
          const order = s.orders.find((o) => o.id === id);
          if (!order) return s;
          // Payment callbacks can fire more than once; apply sales metrics exactly once.
          if (success && order.paymentStatus === "reussi") return s;
          if (!success) {
            return {
              orders: s.orders.map((o) =>
                o.id === id ? { ...o, paymentStatus: "echec" as const } : o,
              ),
            };
          }
          const customers = s.customers.map((c) =>
            c.id === order.customerId
              ? { ...c, orders: c.orders + 1, spent: c.spent + order.amount }
              : c,
          );
          const products = s.products.map((p) => {
            const line = order.items.find((it) => it.productId === p.id);
            if (!line) return p;
            return {
              ...p,
              sold: p.sold + line.qty,
              revenue: p.revenue + line.price * line.qty,
            };
          });
          return {
            customers,
            products,
            orders: s.orders.map((o) =>
              o.id === id ? { ...o, paymentStatus: "reussi" as const } : o,
            ),
          };
        }),
      addTicket: (subject, message) =>
        set((s) => ({
          tickets: [
            {
              id: uid("t"),
              subject,
              message,
              date: new Date().toISOString(),
              status: "ouvert",
            },
            ...s.tickets,
          ],
        })),
      runAiScan: () =>
        set((s) => ({
          products: s.products.map((p) => {
            const velocity = p.sold / 10;
            const margin = (p.price - p.cost) / p.price;
            const stockFactor = p.stock === 0 ? -8 : p.stock < 8 ? 4 : 2;
            let aiScore = Math.round(
              Math.min(99, Math.max(40, 58 + velocity * 3 + margin * 40 + stockFactor)),
            );
            const trend: Product["trend"] =
              velocity > 8 ? "up" : velocity < 3 ? "down" : "stable";
            const potential: Product["potential"] =
              aiScore >= 90 ? "très élevé" : aiScore >= 78 ? "élevé" : aiScore >= 62 ? "moyen" : "faible";
            if (p.status === "epuise") aiScore = Math.min(aiScore, 70);
            return { ...p, aiScore, trend, potential };
          }),
        })),
      bumpVisitors: () => set((s) => ({ visitors: s.visitors + 1 })),
      resetDemo: () => set({ ...createSeed(), hydrated: true, cart: [] }),
    }),
    {
      name: "dbs-store-v2",
      storage: createJSONStorage(() =>
        typeof window === "undefined"
          ? {
              getItem: () => null,
              setItem: () => {},
              removeItem: () => {},
            }
          : localStorage,
      ),
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
        visitors: s.visitors,
      }),
      // Credentials are session-only. Clear values restored from older snapshots.
      merge: (persistedState, currentState) => ({
        ...currentState,
        ...(persistedState as Partial<DbsState>),
        apiKeys: { shopify: "", gemini: "", dbsPay: "" },
      }),
    },
  ),
);

export function rehydrateStore() {
  if (typeof window === "undefined") return;
  if (useDbs.persist.hasHydrated()) return;
  void useDbs.persist.rehydrate();
}
