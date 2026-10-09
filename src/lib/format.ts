import { format, parseISO } from "date-fns";
import { fr } from "date-fns/locale";

export function formatCfa(value: number) {
  return `${new Intl.NumberFormat("fr-FR").format(Math.round(value))} FCFA`;
}

export function formatInt(value: number) {
  return new Intl.NumberFormat("fr-FR").format(Math.round(value));
}

export function formatPct(value: number, digits = 1) {
  const sign = value > 0 ? "+" : "";
  return `${sign}${value.toLocaleString("fr-FR", {
    maximumFractionDigits: digits,
    minimumFractionDigits: digits,
  })}%`;
}

export function formatDate(iso: string) {
  return format(parseISO(iso), "d MMM yyyy", { locale: fr });
}

export function formatDateLong(date = new Date()) {
  return format(date, "d MMMM yyyy", { locale: fr });
}

export function todayIso() {
  return new Date().toISOString();
}
