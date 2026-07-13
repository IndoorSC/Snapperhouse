import { ListingGrid } from "@/components/listings/ListingCard";
import { EmptyState, SectionHeading } from "@/components/ui/primitives";
import { enrichListing, getEnrichedListings } from "@/lib/data";
import { getListingsBySpecies } from "@/lib/data/listings";
import { getGroup, getSpeciesByGroup, taxonomyGroups } from "@/lib/data/taxonomy";
import { notFound } from "next/navigation";

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  return taxonomyGroups.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: { params: Params }) {
  const { slug } = await params;
  const group = getGroup(slug);
  return {
    title: group?.name ?? "Group",
    description: group
      ? `Browse ${group.name} listings from private Australian aquarium sellers.`
      : undefined,
  };
}

export default async function GroupPage({ params }: { params: Params }) {
  const { slug } = await params;
  const group = getGroup(slug);
  if (!group) notFound();

  const groupSpecies = getSpeciesByGroup(group.id);
  const listings = groupSpecies
    .flatMap((sp) => getListingsBySpecies(sp.id))
    .map(enrichListing)
    .filter((l): l is NonNullable<typeof l> => l != null);

  // fallback: if no species seed for equipment groups, show empty or all enriched filtered
  const display =
    listings.length > 0
      ? listings
      : getEnrichedListings().filter((l) => l.species.groupId === group.id);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 md:px-6">
      <SectionHeading
        eyebrow={group.section === "fish" ? "Fish & livestock" : group.section}
        title={group.name}
        description={
          group.subgroups?.length
            ? `Subgroups: ${group.subgroups.join(" · ")}`
            : `Active listings in ${group.name}.`
        }
      />
      {display.length ? (
        <ListingGrid listings={display} />
      ) : (
        <EmptyState
          title={`No ${group.name} listings yet`}
          description="Be the first seller to list in this group."
        />
      )}
    </div>
  );
}
