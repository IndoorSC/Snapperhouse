import { getActiveListings, listings } from "@/lib/data/listings";
import { getSeller } from "@/lib/data/sellers";
import { getGroup, getSpecies, species } from "@/lib/data/taxonomy";
import type { Listing, Species } from "@/lib/types";

export type EnrichedListing = Listing & {
  species: Species;
  sellerName: string;
  sellerUsername: string;
  groupName: string;
  groupSlug: string;
};

export function enrichListing(listing: Listing): EnrichedListing | null {
  const sp = getSpecies(listing.speciesId);
  const seller = getSeller(listing.sellerId);
  if (!sp || !seller) return null;
  const group = getGroup(sp.groupId);
  return {
    ...listing,
    species: sp,
    sellerName: seller.displayName,
    sellerUsername: seller.username,
    groupName: group?.name ?? "Livestock",
    groupSlug: group?.slug ?? "miscellaneous",
  };
}

export function getEnrichedListings() {
  return getActiveListings()
    .map(enrichListing)
    .filter((l): l is EnrichedListing => l != null);
}

export function searchEnriched(query: string) {
  const q = query.toLowerCase().trim();
  const all = getEnrichedListings();
  if (!q) return all;
  return all.filter((l) => {
    const hay = [
      l.species.commonName,
      l.species.scientificName,
      ...l.species.commonNameAliases,
      l.description,
      l.strainVariant ?? "",
      l.sellerName,
      l.groupName,
    ]
      .join(" ")
      .toLowerCase();
    return hay.includes(q) || q.split(/\s+/).every((part) => hay.includes(part));
  });
}

export function filterListings(params: {
  q?: string;
  group?: string;
  waterType?: string;
  listingType?: string;
  state?: string;
  category?: string;
}) {
  let results = params.q ? searchEnriched(params.q) : getEnrichedListings();

  if (params.category === "plants") {
    results = results.filter((l) => getGroup(l.species.groupId)?.section === "plants");
  } else if (params.category === "fish" || !params.category) {
    results = results.filter((l) => getGroup(l.species.groupId)?.section === "fish");
  }

  if (params.group) {
    const g = getGroup(params.group);
    if (g) results = results.filter((l) => l.species.groupId === g.id);
  }
  if (params.waterType) {
    results = results.filter((l) => l.species.waterType === params.waterType);
  }
  if (params.listingType === "for_sale" || params.listingType === "rehoming") {
    results = results.filter((l) => l.listingType === params.listingType);
  }
  if (params.state) {
    results = results.filter((l) => l.locationState === params.state);
  }
  return results;
}

export function sortListings(
  items: EnrichedListing[],
  sort: string = "recent",
) {
  const copy = [...items];
  switch (sort) {
    case "nearest":
      return copy.sort(
        (a, b) => (a.distanceKm ?? 9999) - (b.distanceKm ?? 9999),
      );
    case "price-asc":
      return copy.sort((a, b) => a.price - b.price);
    case "price-desc":
      return copy.sort((a, b) => b.price - a.price);
    case "recent":
    default:
      return copy.sort(
        (a, b) => +new Date(b.publishedAt) - +new Date(a.publishedAt),
      );
  }
}

export { listings, species };
