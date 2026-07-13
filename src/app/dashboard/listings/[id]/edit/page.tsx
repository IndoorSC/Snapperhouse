import { ButtonLink, SectionHeading } from "@/components/ui/primitives";
import { enrichListing } from "@/lib/data";
import { getListing } from "@/lib/data/listings";
import { notFound } from "next/navigation";

type Params = Promise<{ id: string }>;

export async function generateMetadata({ params }: { params: Params }) {
  const { id } = await params;
  const listing = getListing(id);
  return { title: listing ? `Edit listing` : "Edit listing" };
}

export default async function EditListingPage({ params }: { params: Params }) {
  const { id } = await params;
  const raw = getListing(id);
  if (!raw) notFound();
  const listing = enrichListing(raw);
  if (!listing) notFound();

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 md:px-6">
      <SectionHeading
        eyebrow="Edit"
        title={listing.species.commonName}
        description="Edits to active listings do not consume credits."
      />
      <form className="space-y-4 rounded-[1.5rem] bg-white p-6">
        <label className="block text-sm">
          <span className="mb-1.5 block font-semibold text-navy">Price</span>
          <input
            type="number"
            defaultValue={listing.price}
            className="h-11 w-full rounded-lg border border-[color:var(--line)] bg-foam px-3 focus-ring"
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1.5 block font-semibold text-navy">Quantity available</span>
          <input
            type="number"
            defaultValue={listing.quantityAvailable}
            className="h-11 w-full rounded-lg border border-[color:var(--line)] bg-foam px-3 focus-ring"
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1.5 block font-semibold text-navy">Description</span>
          <textarea
            rows={5}
            defaultValue={listing.description}
            className="w-full rounded-lg border border-[color:var(--line)] bg-foam px-3 py-2 focus-ring"
          />
        </label>
        <div className="flex flex-wrap gap-3 pt-2">
          <ButtonLink href="/dashboard" variant="orange" size="sm">
            Save changes
          </ButtonLink>
          <ButtonLink href={`/listings/${listing.id}`} variant="secondary" size="sm">
            View public listing
          </ButtonLink>
        </div>
      </form>
    </div>
  );
}
