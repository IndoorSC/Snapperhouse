"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { taxonomyGroups } from "@/lib/data/taxonomy";

const states = ["ACT", "NSW", "NT", "QLD", "SA", "TAS", "VIC", "WA"] as const;

export function BrowseFilters() {
  const router = useRouter();
  const params = useSearchParams();

  function update(key: string, value: string) {
    const next = new URLSearchParams(params.toString());
    if (!value || value === "any") next.delete(key);
    else next.set(key, value);
    router.push(`/browse?${next.toString()}`);
  }

  const fishGroups = taxonomyGroups.filter((g) => g.section === "fish");

  return (
    <aside className="space-y-5 rounded-2xl bg-white p-5 lg:sticky lg:top-24">
      <h2 className="font-display text-lg font-bold text-navy">Filters</h2>

      <label className="block text-sm">
        <span className="mb-1.5 block font-semibold text-navy">Category</span>
        <select
          className="h-10 w-full rounded-lg border border-[color:var(--line)] bg-foam px-3 focus-ring"
          value={params.get("category") ?? "fish"}
          onChange={(e) => update("category", e.target.value)}
        >
          <option value="fish">Fish & Livestock</option>
          <option value="plants">Plants</option>
          <option value="equipment">Equipment</option>
          <option value="setups">Complete Setups</option>
        </select>
      </label>

      <label className="block text-sm">
        <span className="mb-1.5 block font-semibold text-navy">Water type</span>
        <select
          className="h-10 w-full rounded-lg border border-[color:var(--line)] bg-foam px-3 focus-ring"
          value={params.get("waterType") ?? "any"}
          onChange={(e) => update("waterType", e.target.value)}
        >
          <option value="any">Any</option>
          <option value="freshwater">Freshwater</option>
          <option value="brackish">Brackish</option>
        </select>
      </label>

      <label className="block text-sm">
        <span className="mb-1.5 block font-semibold text-navy">Group</span>
        <select
          className="h-10 w-full rounded-lg border border-[color:var(--line)] bg-foam px-3 focus-ring"
          value={params.get("group") ?? "any"}
          onChange={(e) => update("group", e.target.value)}
        >
          <option value="any">All groups</option>
          {fishGroups.map((g) => (
            <option key={g.id} value={g.slug}>
              {g.name}
            </option>
          ))}
        </select>
      </label>

      <label className="block text-sm">
        <span className="mb-1.5 block font-semibold text-navy">Listing type</span>
        <select
          className="h-10 w-full rounded-lg border border-[color:var(--line)] bg-foam px-3 focus-ring"
          value={params.get("listingType") ?? "any"}
          onChange={(e) => update("listingType", e.target.value)}
        >
          <option value="any">For sale & rehoming</option>
          <option value="for_sale">For sale</option>
          <option value="rehoming">Rehoming</option>
        </select>
      </label>

      <label className="block text-sm">
        <span className="mb-1.5 block font-semibold text-navy">State</span>
        <select
          className="h-10 w-full rounded-lg border border-[color:var(--line)] bg-foam px-3 focus-ring"
          value={params.get("state") ?? "any"}
          onChange={(e) => update("state", e.target.value)}
        >
          <option value="any">Any state</option>
          {states.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </label>

      <label className="block text-sm">
        <span className="mb-1.5 block font-semibold text-navy">Sort</span>
        <select
          className="h-10 w-full rounded-lg border border-[color:var(--line)] bg-foam px-3 focus-ring"
          value={params.get("sort") ?? "nearest"}
          onChange={(e) => update("sort", e.target.value)}
        >
          <option value="nearest">Nearest first</option>
          <option value="recent">Most recent</option>
          <option value="price-asc">Price: low to high</option>
          <option value="price-desc">Price: high to low</option>
        </select>
      </label>
    </aside>
  );
}
