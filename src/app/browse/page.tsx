import { BrowseFilters } from "@/components/browse/BrowseFilters";
import { ListingGrid } from "@/components/listings/ListingCard";
import { EmptyState, SectionHeading } from "@/components/ui/primitives";
import { equipmentListings, setupListings } from "@/lib/data/listings";
import { getSeller } from "@/lib/data/sellers";
import { filterListings, sortListings } from "@/lib/data";
import { formatPrice } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export const metadata = {
  title: "Browse",
  description:
    "Browse active aquarium livestock, plants and equipment listings across Australia. Filter by seller for shareable storefront pages.",
};

export default async function BrowsePage({ searchParams }: { searchParams: SearchParams }) {
  const sp = await searchParams;
  const get = (k: string) => {
    const v = sp[k];
    return Array.isArray(v) ? v[0] : v;
  };

  const category = get("category") ?? "fish";
  const sort = get("sort") ?? "nearest";

  if (category === "equipment") {
    return (
      <BrowseShell category={category}>
        <div className="grid gap-5 sm:grid-cols-2">
          {equipmentListings.map((item) => {
            const seller = getSeller(item.sellerId);
            return (
              <div key={item.id} className="overflow-hidden rounded-2xl bg-white">
                <div className="relative aspect-[16/10] bg-navy-deep">
                  <Image src={item.photos[0]!} alt={item.model ?? item.category} fill className="object-cover" />
                </div>
                <div className="p-4">
                  <h3 className="font-display text-lg font-bold text-navy">
                    {item.brand} {item.model}
                  </h3>
                  <p className="text-sm capitalize text-muted">{item.condition.replace("_", " ")} · {item.category}</p>
                  <p className="mt-2 font-display text-lg font-extrabold text-orange">
                    {formatPrice(item.price, item.priceNegotiable)}
                  </p>
                  <p className="mt-1 text-xs text-muted">
                    {item.locationSuburb}, {item.locationState}
                    {seller ? ` · ${seller.displayName}` : ""}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </BrowseShell>
    );
  }

  if (category === "setups") {
    return (
      <BrowseShell category={category}>
        <div className="grid gap-5">
          {setupListings.map((item) => {
            const seller = getSeller(item.sellerId);
            return (
              <div key={item.id} className="grid overflow-hidden rounded-2xl bg-white md:grid-cols-[280px_1fr]">
                <div className="relative min-h-48 bg-navy-deep">
                  <Image src={item.photos[0]!} alt="Complete setup" fill className="object-cover" />
                </div>
                <div className="p-5">
                  <h3 className="font-display text-2xl font-bold text-navy">
                    {item.tankVolumeLitres}L complete setup
                  </h3>
                  <p className="mt-1 text-muted">
                    {item.tankLengthCm}×{item.tankWidthCm}×{item.tankHeightCm}cm · {item.locationSuburb}, {item.locationState}
                  </p>
                  <p className="mt-3 text-sm text-muted">{item.description}</p>
                  <p className="mt-4 font-display text-xl font-extrabold text-orange">
                    {formatPrice(item.price, item.priceNegotiable)}
                  </p>
                  {seller ? (
                    <Link href={`/sellers/${seller.username}`} className="mt-2 inline-block text-sm font-semibold text-navy hover:text-orange">
                      {seller.displayName}
                    </Link>
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>
      </BrowseShell>
    );
  }

  const results = sortListings(
    filterListings({
      category,
      group: get("group"),
      waterType: get("waterType"),
      listingType: get("listingType"),
      state: get("state"),
    }),
    sort,
  );

  return (
    <BrowseShell category={category} count={results.length}>
      {results.length ? (
        <ListingGrid listings={results} />
      ) : (
        <EmptyState
          title="No listings match"
          description="Try widening filters or browsing another group."
        />
      )}
    </BrowseShell>
  );
}

function BrowseShell({
  children,
  category,
  count,
}: {
  children: React.ReactNode;
  category: string;
  count?: number;
}) {
  const titles: Record<string, string> = {
    fish: "Fish & livestock",
    plants: "Aquatic plants",
    equipment: "Equipment",
    setups: "Complete setups",
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 md:px-6">
      <SectionHeading
        eyebrow="Browse"
        title={titles[category] ?? "Browse"}
        description={
          count != null
            ? `${count} active listing${count === 1 ? "" : "s"} · Filter by seller for a shareable page like /browse/maya-aquatics`
            : "Filter by seller for a shareable storefront — livestock uses credits."
        }
      />
      <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
        <Suspense fallback={<div className="h-80 rounded-2xl bg-white" />}>
          <BrowseFilters />
        </Suspense>
        <div>{children}</div>
      </div>
    </div>
  );
}
