import { BrowseFilters } from "@/components/browse/BrowseFilters";
import { ListingGrid } from "@/components/listings/ListingCard";
import { ButtonLink, EmptyState, SectionHeading } from "@/components/ui/primitives";
import { filterListings, sortListings } from "@/lib/data";
import { equipmentListings, setupListings } from "@/lib/data/listings";
import { getSeller, sellers } from "@/lib/data/sellers";
import { formatPrice } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

type Params = Promise<{ seller: string }>;
type SearchParams = Promise<Record<string, string | string[] | undefined>>;

function normalizeSellerSlug(value: string) {
  return value.trim().toLowerCase().replace(/_/g, "-");
}

function resolveSeller(slug: string) {
  const normalized = normalizeSellerSlug(slug);
  return sellers.find(
    (s) => normalizeSellerSlug(s.username) === normalized && s.isSeller,
  );
}

export async function generateStaticParams() {
  return sellers.filter((s) => s.isSeller).map((s) => ({ seller: s.username }));
}

export async function generateMetadata({ params }: { params: Params }) {
  const { seller: slug } = await params;
  const seller = resolveSeller(slug);
  if (!seller) return { title: "Seller browse" };
  return {
    title: `${seller.displayName} listings`,
    description: `Browse active aquarium listings from ${seller.displayName} on Snapperhouse — ${seller.suburb}, ${seller.state}.`,
  };
}

export default async function BrowseSellerPage({
  params,
  searchParams,
}: {
  params: Params;
  searchParams: SearchParams;
}) {
  const { seller: slug } = await params;
  const seller = resolveSeller(slug);
  if (!seller) notFound();

  const sp = await searchParams;
  const get = (k: string) => {
    const v = sp[k];
    return Array.isArray(v) ? v[0] : v;
  };

  const category = get("category") ?? "fish";
  const sort = get("sort") ?? "nearest";

  if (category === "equipment") {
    const items = equipmentListings.filter((item) => item.sellerId === seller.id);
    return (
      <SellerBrowseShell seller={seller} category={category} count={items.length}>
        <div className="grid gap-5 sm:grid-cols-2">
          {items.map((item) => (
            <div key={item.id} className="overflow-hidden rounded-2xl bg-white">
              <div className="relative aspect-[16/10] bg-navy-deep">
                <Image src={item.photos[0]!} alt={item.model ?? item.category} fill className="object-cover" />
              </div>
              <div className="p-4">
                <h3 className="font-display text-lg font-bold text-navy">
                  {item.brand} {item.model}
                </h3>
                <p className="mt-2 font-display text-lg font-extrabold text-orange">
                  {formatPrice(item.price, item.priceNegotiable)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </SellerBrowseShell>
    );
  }

  if (category === "setups") {
    const items = setupListings.filter((item) => item.sellerId === seller.id);
    return (
      <SellerBrowseShell seller={seller} category={category} count={items.length}>
        <div className="grid gap-5">
          {items.map((item) => (
            <div key={item.id} className="rounded-2xl bg-white p-5">
              <h3 className="font-display text-2xl font-bold text-navy">
                {item.tankVolumeLitres}L complete setup
              </h3>
              <p className="mt-3 text-sm text-muted">{item.description}</p>
              <p className="mt-4 font-display text-xl font-extrabold text-orange">
                {formatPrice(item.price, item.priceNegotiable)}
              </p>
            </div>
          ))}
        </div>
      </SellerBrowseShell>
    );
  }

  const results = sortListings(
    filterListings({
      category,
      group: get("group"),
      waterType: get("waterType"),
      listingType: get("listingType"),
      state: get("state"),
      seller: seller.username,
    }),
    sort,
  );

  return (
    <SellerBrowseShell seller={seller} category={category} count={results.length}>
      {results.length ? (
        <ListingGrid listings={results} />
      ) : (
        <EmptyState
          title={`No listings from ${seller.displayName}`}
          description="This seller has no active stock matching the current filters."
        />
      )}
    </SellerBrowseShell>
  );
}

function SellerBrowseShell({
  children,
  seller,
  category,
  count,
}: {
  children: React.ReactNode;
  seller: NonNullable<ReturnType<typeof resolveSeller>>;
  category: string;
  count: number;
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
        eyebrow="Seller storefront"
        title={seller.displayName}
        description={`${titles[category] ?? "Browse"} · ${count} active listing${count === 1 ? "" : "s"} · ${seller.suburb}, ${seller.state}`}
        action={
          <div className="flex flex-wrap gap-2">
            <ButtonLink href={`/sellers/${seller.username}`} variant="secondary" size="sm">
              Full profile
            </ButtonLink>
            <ButtonLink href="/browse" variant="ghost" size="sm">
              All sellers
            </ButtonLink>
          </div>
        }
      />
      <p className="mb-6 text-sm text-muted">
        Shareable link:{" "}
        <Link href={`/browse/${seller.username}`} className="font-semibold text-navy hover:text-orange">
          snapperhouse.com.au/browse/{seller.username}
        </Link>
      </p>
      <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
        <Suspense fallback={<div className="h-80 rounded-2xl bg-white" />}>
          <BrowseFilters activeSeller={seller.username} />
        </Suspense>
        <div>{children}</div>
      </div>
    </div>
  );
}
