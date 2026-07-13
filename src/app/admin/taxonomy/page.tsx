import { Badge, Button, SectionHeading } from "@/components/ui/primitives";
import { species, taxonomyGroups } from "@/lib/data/taxonomy";

export const metadata = { title: "Admin · Taxonomy" };

export default function AdminTaxonomyPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 md:px-6">
      <SectionHeading
        eyebrow="Admin"
        title="Taxonomy manager"
        description="Create, edit and seed groups, genera and species. CSV import supported for launch data."
        action={<Button type="button" variant="orange" size="sm">Import CSV</Button>}
      />
      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-2xl bg-white p-5">
          <h2 className="font-display text-lg font-bold text-navy">Tier 1 groups</h2>
          <ul className="mt-4 max-h-96 space-y-2 overflow-auto">
            {taxonomyGroups.map((g) => (
              <li key={g.id} className="flex items-center justify-between gap-2 rounded-lg bg-sand px-3 py-2 text-sm">
                <span className="font-semibold text-navy">{g.name}</span>
                <Badge tone="muted">{g.section}</Badge>
              </li>
            ))}
          </ul>
        </section>
        <section className="rounded-2xl bg-white p-5">
          <h2 className="font-display text-lg font-bold text-navy">Species records</h2>
          <ul className="mt-4 max-h-96 space-y-2 overflow-auto">
            {species.map((s) => (
              <li key={s.id} className="rounded-lg bg-sand px-3 py-2 text-sm">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-semibold text-navy">{s.commonName}</span>
                  <Badge tone={s.tradeStatus === "open" ? "success" : "warning"}>
                    {s.tradeStatus}
                  </Badge>
                </div>
                <p className="italic text-muted">{s.scientificName}</p>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
