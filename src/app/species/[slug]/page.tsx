import { ListingGrid } from "@/components/listings/ListingCard";
import { Badge, ButtonLink, SectionHeading } from "@/components/ui/primitives";
import { enrichListing } from "@/lib/data";
import { getListingsBySpecies } from "@/lib/data/listings";
import { getGenus, getGroup, getSpecies, species } from "@/lib/data/taxonomy";
import Link from "next/link";
import { notFound } from "next/navigation";

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  return species.filter((s) => s.approved).map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Params }) {
  const { slug } = await params;
  const sp = getSpecies(slug);
  if (!sp) return { title: "Species" };
  return {
    title: `${sp.commonName} (${sp.scientificName})`,
    description: `${sp.careSummary ?? sp.commonName} — private sellers Australia. Buy ${sp.commonName} on Snapperhouse.`,
  };
}

export default async function SpeciesPage({ params }: { params: Params }) {
  const { slug } = await params;
  const sp = getSpecies(slug);
  if (!sp || !sp.approved) notFound();

  const group = getGroup(sp.groupId);
  const genus = getGenus(sp.genusId);
  const active = getListingsBySpecies(sp.id)
    .map(enrichListing)
    .filter((l): l is NonNullable<typeof l> => l != null)
    .slice(0, 6);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: sp.commonName,
    description: sp.careSummary,
    about: sp.scientificName,
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 md:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <nav className="mb-6 text-sm text-muted">
        <Link href="/browse" className="hover:text-orange">Browse</Link>
        {group ? (
          <>
            {" / "}
            <Link href={`/group/${group.slug}`} className="hover:text-orange">{group.name}</Link>
          </>
        ) : null}
        {genus ? <>{" / "}{genus.name}</> : null}
        {" / "}
        <span className="text-navy">{sp.commonName}</span>
      </nav>

      <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <div className="flex flex-wrap gap-2">
            <Badge tone="water">{sp.waterType}</Badge>
            {sp.tradeStatus === "open" ? <Badge tone="success">Open trade</Badge> : null}
            {sp.tradeStatus === "local_only" ? <Badge tone="warning">Local stock only</Badge> : null}
            {sp.tradeStatus === "prohibited" ? <Badge tone="warning">Prohibited</Badge> : null}
            {sp.breedingDifficulty ? (
              <Badge tone="muted">Breeding: {sp.breedingDifficulty}</Badge>
            ) : null}
          </div>

          <h1 className="mt-4 font-display text-4xl font-extrabold tracking-tight text-navy md:text-5xl">
            {sp.commonName}
          </h1>
          <p className="mt-2 text-xl italic text-muted">{sp.scientificName}</p>
          {sp.commonNameAliases.length ? (
            <p className="mt-2 text-sm text-muted">
              Also known as: {sp.commonNameAliases.join(", ")}
            </p>
          ) : null}

          {sp.careSummary ? (
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink/80">{sp.careSummary}</p>
          ) : null}

          {sp.tradeNotes ? (
            <p className="mt-4 rounded-xl bg-warning/10 px-4 py-3 text-sm text-warning">
              {sp.tradeNotes}
            </p>
          ) : null}

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {[
              sp.tempMin != null &&
                sp.tempMax != null && {
                  label: "Temperature",
                  value: `${sp.tempMin}–${sp.tempMax}°C`,
                },
              sp.phMin != null &&
                sp.phMax != null && { label: "pH", value: `${sp.phMin}–${sp.phMax}` },
              sp.ghMin != null &&
                sp.ghMax != null && { label: "GH", value: `${sp.ghMin}–${sp.ghMax} dGH` },
              sp.minTankLitres && { label: "Min tank", value: `${sp.minTankLitres}L` },
              sp.diet && { label: "Diet", value: sp.diet },
              sp.compatibility && { label: "Compatibility", value: sp.compatibility },
              sp.originNotes && { label: "Origin", value: sp.originNotes },
            ]
              .filter(Boolean)
              .map((item) => (
                <div key={(item as { label: string }).label} className="rounded-xl bg-white p-4">
                  <p className="text-xs font-bold uppercase tracking-wide text-muted">
                    {(item as { label: string }).label}
                  </p>
                  <p className="mt-1 text-sm font-semibold text-navy">
                    {(item as { value: string }).value}
                  </p>
                </div>
              ))}
          </div>

          <p className="mt-6 text-xs text-muted">
            Trade status is maintained in good faith but may be incomplete. Verify current
            regulations with{" "}
            <a
              href="https://www.agriculture.gov.au/"
              className="font-semibold text-navy underline"
              target="_blank"
              rel="noreferrer"
            >
              DAFF
            </a>{" "}
            before listing.
          </p>

          <button
            type="button"
            className="mt-4 text-sm font-semibold text-orange hover:underline"
          >
            Suggest a correction
          </button>
        </div>

        <aside className="rounded-[1.5rem] water-bg ripple p-6 text-white lg:self-start">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-orange">
            Active listings
          </p>
          <p className="mt-2 font-display text-3xl font-bold">{active.length}</p>
          <p className="mt-1 text-sm text-white/70">
            Private sellers currently offering {sp.commonName} on Snapperhouse.
          </p>
          <ButtonLink href={`/browse?group=${group?.slug ?? ""}`} variant="orange" className="mt-6">
            Browse all in group
          </ButtonLink>
        </aside>
      </div>

      <section className="mt-14">
        <SectionHeading
          title={`Buy ${sp.commonName} from private sellers`}
          description="Up to six active listings shown."
        />
        {active.length ? (
          <ListingGrid listings={active} />
        ) : (
          <p className="text-muted">No active listings right now — follow sellers or save a search.</p>
        )}
      </section>
    </div>
  );
}
