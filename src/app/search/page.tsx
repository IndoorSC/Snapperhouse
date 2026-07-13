import { ListingGrid } from "@/components/listings/ListingCard";
import { EmptyState, SectionHeading } from "@/components/ui/primitives";
import { searchEnriched, sortListings } from "@/lib/data";

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export const metadata = { title: "Search" };

export default async function SearchPage({ searchParams }: { searchParams: SearchParams }) {
  const sp = await searchParams;
  const q = (Array.isArray(sp.q) ? sp.q[0] : sp.q) ?? "";
  const results = sortListings(searchEnriched(q), "recent");

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 md:px-6">
      <SectionHeading
        eyebrow="Search"
        title={q ? `Results for “${q}”` : "Search listings"}
        description={`${results.length} match${results.length === 1 ? "" : "es"} across species names, aliases and descriptions.`}
      />
      {results.length ? (
        <ListingGrid listings={results} />
      ) : (
        <EmptyState
          title="Nothing found"
          description="Try a common name, scientific name, or strain — e.g. cory, neon, or Apistogramma."
        />
      )}
    </div>
  );
}
