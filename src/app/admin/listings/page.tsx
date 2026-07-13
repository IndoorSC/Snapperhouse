import { Button, SectionHeading } from "@/components/ui/primitives";
import { getEnrichedListings } from "@/lib/data";
import { formatPrice } from "@/lib/utils";

export const metadata = { title: "Admin · Listings" };

export default function AdminListingsPage() {
  const listings = getEnrichedListings();
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 md:px-6">
      <SectionHeading
        eyebrow="Admin"
        title="Listing moderation"
        description="Remove listings with reason — seller notified by email."
      />
      <div className="space-y-3">
        {listings.map((l) => (
          <div key={l.id} className="flex flex-col gap-3 rounded-2xl bg-white p-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-display text-lg font-bold text-navy">{l.species.commonName}</p>
              <p className="text-sm text-muted">
                {l.sellerName} · {l.locationSuburb}, {l.locationState} ·{" "}
                {formatPrice(l.price, l.priceNegotiable)}
              </p>
            </div>
            <Button type="button" variant="danger" size="sm">Remove</Button>
          </div>
        ))}
      </div>
    </div>
  );
}
