import type { PricePreview, PriceRules } from "@/lib/types";

export const defaultPriceRules: PriceRules = {
  supplierPrice: 10000,
  buyMarkupPct: 10,
  marginPct: 40,
  minMarginPct: 20,
  deliveryPct: 2.5,
  taxPct: 4.5,
  transactionFee: 0,
  psychological: true,
  psychoEnding: 990,
};

export function computePrice(rules: PriceRules): PricePreview {
  const supplier = rules.supplierPrice;
  const purchase = Math.round(supplier * (1 + rules.buyMarkupPct / 100));
  const margin = Math.round(supplier * (rules.marginPct / 100));
  const subtotal = purchase + margin;
  const delivery = Math.round(subtotal * (rules.deliveryPct / 100));
  const tax = Math.round(subtotal * (rules.taxPct / 100));
  const fees = delivery + tax + rules.transactionFee;
  const raw = subtotal + fees;
  let suggested = raw;
  if (rules.psychological) {
    const thousands = Math.round(raw / 1000) * 1000;
    suggested = thousands - 1000 + rules.psychoEnding;
    if (suggested < raw - 900) suggested += 1000;
    if (suggested < purchase + margin) suggested = thousands + rules.psychoEnding - 1000;
  }
  return { supplier, purchase, margin, fees, raw, suggested };
}
