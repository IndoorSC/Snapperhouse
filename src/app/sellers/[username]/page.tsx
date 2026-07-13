import { ListingGrid } from "@/components/listings/ListingCard";
import { Badge, SectionHeading } from "@/components/ui/primitives";
import { enrichListing } from "@/lib/data";
import { getListingsBySeller } from "@/lib/data/listings";
import { getSeller, getSellerRatings, sellers } from "@/lib/data/sellers";
import { formatMemberSince } from "@/lib/utils";
import { Star } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

type Params = Promise<{ username: string }>;

export async function generateStaticParams() {
  return sellers.map((s) => ({ username: s.username }));
}

export async function generateMetadata({ params }: { params: Params }) {
  const { username } = await params;
  const seller = getSeller(username);
  return {
    title: seller?.displayName ?? "Seller",
    description: seller
      ? `${seller.displayName} — ${seller.suburb}, ${seller.state}. Private aquarium seller on Snapperhouse.`
      : undefined,
  };
}

export default async function SellerProfilePage({ params }: { params: Params }) {
  const { username } = await params;
  const seller = getSeller(username);
  if (!seller) notFound();

  const listings = getListingsBySeller(seller.id)
    .map(enrichListing)
    .filter((l): l is NonNullable<typeof l> => l != null);
  const ratings = getSellerRatings(seller.id);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 md:px-6">
      <div className="rounded-[1.5rem] bg-white p-6 md:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <Badge tone="navy">Seller storefront</Badge>
            <h1 className="mt-3 font-display text-4xl font-extrabold text-navy">
              {seller.displayName}
            </h1>
            <p className="mt-2 text-muted">
              {seller.suburb}, {seller.state} · Member since {formatMemberSince(seller.memberSince)}
            </p>
            {seller.bio ? <p className="mt-4 max-w-2xl text-ink/80">{seller.bio}</p> : null}
            <p className="mt-4 text-sm text-muted">
              Shareable browse page:{" "}
              <Link
                href={`/browse/${seller.username}`}
                className="font-semibold text-navy hover:text-orange"
              >
                /browse/{seller.username}
              </Link>
            </p>
          </div>
          <div className="rounded-2xl bg-sand px-5 py-4 text-center">
            <div className="flex items-center justify-center gap-1 font-display text-3xl font-extrabold text-navy">
              <Star className="h-6 w-6 fill-orange text-orange" />
              {seller.sellerRating.toFixed(1)}
            </div>
            <p className="mt-1 text-sm font-semibold text-muted">
              {seller.sellerSales} confirmed sales
            </p>
            {seller.noshowCount ? (
              <p className="mt-2 text-xs text-warning">{seller.noshowCount} no-show reports</p>
            ) : null}
          </div>
        </div>
      </div>

      <section className="mt-12">
        <SectionHeading title="Active listings" description={`${listings.length} currently live`} />
        <ListingGrid listings={listings} />
      </section>

      <section className="mt-12">
        <SectionHeading title="Rating history" />
        <div className="space-y-3">
          {ratings.map((r) => (
            <div key={r.id} className="rounded-2xl bg-white p-5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-display font-bold text-navy">{"★".repeat(r.stars)}</span>
                <span className="text-sm font-semibold text-navy">{r.reviewerName}</span>
                <span className="text-xs text-muted">{r.date}</span>
                {r.speciesName ? <Badge tone="muted">{r.speciesName}</Badge> : null}
              </div>
              {r.note ? <p className="mt-2 text-sm text-muted">{r.note}</p> : null}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
