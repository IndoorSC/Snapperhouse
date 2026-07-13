import { ListingGrid } from "@/components/listings/ListingCard";
import { Badge, ButtonLink, EmptyState, SectionHeading } from "@/components/ui/primitives";
import { enrichListing, getEnrichedListings } from "@/lib/data";
import { getListing } from "@/lib/data/listings";
import { getSeller } from "@/lib/data/sellers";
import { getGroup, getGenus, getSpecies } from "@/lib/data/taxonomy";
import { completenessLabel, formatDistance, formatPrice } from "@/lib/utils";
import { MapPin, MessageCircle, Thermometer, Truck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

type Params = Promise<{ id: string }>;

export async function generateStaticParams() {
  return getEnrichedListings().map((l) => ({ id: l.id }));
}

export async function generateMetadata({ params }: { params: Params }) {
  const { id } = await params;
  const listing = getListing(id);
  const species = listing ? getSpecies(listing.speciesId) : null;
  return {
    title: species ? `${species.commonName} for sale` : "Listing",
    description: listing?.description,
  };
}

export default async function ListingDetailPage({ params }: { params: Params }) {
  const { id } = await params;
  const raw = getListing(id);
  if (!raw) notFound();
  const listing = enrichListing(raw);
  if (!listing) notFound();

  const seller = getSeller(listing.sellerId)!;
  const group = getGroup(listing.species.groupId);
  const genus = getGenus(listing.species.genusId);
  const related = getEnrichedListings()
    .filter((l) => l.species.groupId === listing.species.groupId && l.id !== listing.id)
    .slice(0, 3);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 md:px-6">
      <nav className="mb-6 text-sm text-muted">
        <Link href="/browse" className="hover:text-orange">Browse</Link>
        {" / "}
        {group ? (
          <>
            <Link href={`/group/${group.slug}`} className="hover:text-orange">{group.name}</Link>
            {" / "}
          </>
        ) : null}
        <Link href={`/species/${listing.species.slug}`} className="hover:text-orange">
          {listing.species.commonName}
        </Link>
      </nav>

      <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <div className="relative aspect-[16/11] overflow-hidden rounded-[1.5rem] bg-navy-deep">
            <Image
              src={listing.photos[0]!}
              alt={listing.species.commonName}
              fill
              className="object-cover"
              priority
              sizes="(max-width:1024px) 100vw, 60vw"
            />
          </div>

          <div className="mt-8">
            <h2 className="font-display text-2xl font-bold text-navy">About this listing</h2>
            <p className="mt-3 whitespace-pre-line text-base leading-relaxed text-muted">
              {listing.description}
            </p>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {[
              listing.sellerTemp != null && {
                label: "Seller tank temp",
                value: `${listing.sellerTemp}°C`,
              },
              listing.sellerPh != null && { label: "Seller pH", value: String(listing.sellerPh) },
              listing.sellerGh != null && { label: "GH", value: `${listing.sellerGh} dGH` },
              listing.sellerKh != null && { label: "KH", value: `${listing.sellerKh} dKH` },
              listing.strainVariant && { label: "Strain / variant", value: listing.strainVariant },
              listing.dietNotes && { label: "Diet notes", value: listing.dietNotes },
              listing.minTankLitres && {
                label: "Min tank",
                value: `${listing.minTankLitres}L`,
              },
              listing.compatibilityNotes && {
                label: "Compatibility",
                value: listing.compatibilityNotes,
              },
              listing.breedingNotes && { label: "Breeding notes", value: listing.breedingNotes },
            ]
              .filter(Boolean)
              .map((item) => (
                <div
                  key={(item as { label: string }).label}
                  className="rounded-xl bg-white px-4 py-3"
                >
                  <p className="text-xs font-bold uppercase tracking-wide text-muted">
                    {(item as { label: string }).label}
                  </p>
                  <p className="mt-1 text-sm font-semibold text-navy">
                    {(item as { value: string }).value}
                  </p>
                </div>
              ))}
          </div>
        </div>

        <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-[1.5rem] bg-white p-6">
            <div className="flex flex-wrap gap-2">
              <Badge tone={listing.listingType === "rehoming" ? "orange" : "navy"}>
                {listing.listingType === "rehoming" ? "Rehoming" : "For sale"}
              </Badge>
              <Badge tone="water">{listing.species.waterType}</Badge>
              {listing.species.tradeStatus === "local_only" ? (
                <Badge tone="warning">Local stock only</Badge>
              ) : null}
              {listing.completenessScore >= 70 ? (
                <Badge tone="success">{completenessLabel(listing.completenessScore)}</Badge>
              ) : null}
            </div>

            <h1 className="mt-4 font-display text-3xl font-extrabold text-navy">
              {listing.species.commonName}
            </h1>
            <p className="text-base italic text-muted">{listing.species.scientificName}</p>
            {genus && group ? (
              <p className="mt-1 text-sm text-muted">
                {group.name} · {genus.name}
              </p>
            ) : null}

            <p className="mt-5 font-display text-3xl font-extrabold text-orange">
              {formatPrice(listing.price, listing.priceNegotiable)}
            </p>
            <p className="mt-1 text-sm font-semibold text-muted">
              {listing.quantityAvailable} available
            </p>

            <div className="mt-5 space-y-2 text-sm text-muted">
              <p className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-navy" />
                {listing.locationSuburb}, {listing.locationState}
                {listing.distanceKm != null
                  ? ` · ${formatDistance(listing.distanceKm)}`
                  : ""}
              </p>
              <p className="flex items-center gap-2">
                {listing.pickupAvailable ? (
                  <>
                    <Thermometer className="h-4 w-4 text-navy" /> Pickup available
                  </>
                ) : null}
              </p>
              {listing.freightConsidered ? (
                <p className="flex items-center gap-2">
                  <Truck className="h-4 w-4 text-navy" /> Freight considered
                </p>
              ) : null}
            </div>

            {listing.species.tradeStatus === "local_only" && listing.species.tradeNotes ? (
              <p className="mt-4 rounded-xl bg-warning/10 px-3 py-2 text-sm text-warning">
                {listing.species.tradeNotes}
              </p>
            ) : null}

            <ButtonLink href="/messages" variant="orange" className="mt-6 w-full">
              <MessageCircle className="h-4 w-4" />
              Enquire
            </ButtonLink>
            <p className="mt-3 text-xs text-muted">
              Contact stays on Snapperhouse. Set your suburb before first inquiry.
            </p>
          </div>

          <Link
            href={`/sellers/${seller.username}`}
            className="block rounded-[1.5rem] bg-white p-6 transition-shadow hover:shadow-[0_12px_30px_rgba(27,58,92,0.1)] focus-ring"
          >
            <p className="text-xs font-bold uppercase tracking-wide text-muted">Seller</p>
            <p className="mt-1 font-display text-xl font-bold text-navy">{seller.displayName}</p>
            <p className="text-sm text-muted">
              {seller.suburb}, {seller.state} · ★ {seller.sellerRating.toFixed(1)} ·{" "}
              {seller.sellerSales} sales
            </p>
          </Link>

          <Link
            href={`/species/${listing.species.slug}`}
            className="block rounded-[1.5rem] border border-[color:var(--line)] bg-sand/50 p-5 text-sm font-semibold text-navy hover:text-orange focus-ring"
          >
            View species care page →
          </Link>
        </aside>
      </div>

      {related.length ? (
        <section className="mt-16">
          <SectionHeading title="More in this group" />
          <ListingGrid listings={related} />
        </section>
      ) : (
        <div className="mt-16">
          <EmptyState title="No related listings" description="Check back as more sellers list this group." />
        </div>
      )}
    </div>
  );
}
