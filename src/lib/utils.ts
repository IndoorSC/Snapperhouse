import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatPrice(price: number, negotiable = false) {
  if (price === 0) return negotiable ? "Free / ONO" : "Free";
  const formatted = new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
    maximumFractionDigits: price % 1 === 0 ? 0 : 2,
  }).format(price);
  return negotiable ? `${formatted} ONO` : formatted;
}

export function formatDistance(km?: number, state?: string) {
  if (km == null) return state ?? "";
  if (km < 10) return `${km.toFixed(1)}km away`;
  if (km < 500) return `~${Math.round(km)}km away`;
  return state ?? "";
}

export function formatMemberSince(iso: string) {
  return new Date(iso).toLocaleDateString("en-AU", {
    month: "long",
    year: "numeric",
  });
}

export function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function completenessLabel(score: number) {
  if (score >= 90) return "Excellent detail";
  if (score >= 70) return "Good detail";
  if (score >= 40) return "Basic detail";
  return "Minimal detail";
}
