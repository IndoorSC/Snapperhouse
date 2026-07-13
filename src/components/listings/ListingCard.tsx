import { Badge } from "@/components/ui/primitives";
import type { EnrichedListing } from "@/lib/data";
import { completenessLabel, formatDistance, formatPrice } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export function ListingCard({ listing }: { listing: EnrichedListing }) {
  return (
    <Link
      href={`/listings/${listing.id}`}
      className="group flex flex-col overflow-hidden rounded-2xl bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(27,58,92,0.12)] focus-ring"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-navy-deep">
        <Image
          src={listing.photos[0] ?? "/images/listings/corydoras.svg"}
          alt={listing.species.commonName}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width:768px) 100vw, 33vw"
        />
        <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
          {listing.listingType === "rehoming" ? (
            <Badge tone="orange">Rehoming</Badge>
          ) : (
            <Badge tone="navy">For sale</Badge>
          )}
          {listing.species.waterType === "brackish" ? (
            <Badge tone="water">Brackish</Badge>
          ) : null}
          {listing.species.tradeStatus === "local_only" ? (
            <Badge tone="warning">Local stock only</Badge>
          ) : null}
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-display text-lg font-bold leading-tight text-navy group-hover:text-navy-mid">
              {listing.species.commonName}
            </h3>
            <p className="text-sm italic text-muted">{listing.species.scientificName}</p>
          </div>
          <p className="shrink-0 font-display text-lg font-extrabold text-orange">
            {formatPrice(listing.price, listing.priceNegotiable)}
          </p>
        </div>
        <p className="line-clamp-2 text-sm text-muted">{listing.description}</p>
        <div className="mt-auto flex flex-wrap items-center gap-x-3 gap-y-1 pt-2 text-xs font-semibold text-muted">
          <span>
            {listing.locationSuburb}, {listing.locationState}
          </span>
          <span className="text-[color:var(--line)]">·</span>
          <span>{formatDistance(listing.distanceKm, listing.locationState)}</span>
          <span className="text-[color:var(--line)]">·</span>
          <span>Qty {listing.quantityAvailable}</span>
        </div>
        {listing.completenessScore >= 70 ? (
          <p className="text-xs font-semibold text-success">
            {completenessLabel(listing.completenessScore)}
          </p>
        ) : null}
      </div>
    </Link>
  );
}

export function ListingGrid({ listings }: { listings: EnrichedListing[] }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {listings.map((listing) => (
        <ListingCard key={listing.id} listing={listing} />
      ))}
    </div>
  );
}
