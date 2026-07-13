import { Badge, ButtonLink, SectionHeading } from "@/components/ui/primitives";
import { educationGuides } from "@/lib/data/education";
import Link from "next/link";

export const metadata = {
  title: "Education library",
  description:
    "Acclimation, packaging, quarantine, tax awareness and platform rules for Australian aquarium hobbyists.",
};

export default function EducationIndexPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 md:px-6">
      <SectionHeading
        eyebrow="Learn"
        title="Education library"
        description="Guides that protect buyers and sellers — and build Snapperhouse as a hobbyist resource."
      />
      <div className="grid gap-4 md:grid-cols-2">
        {educationGuides.map((guide) => (
          <Link
            key={guide.slug}
            href={`/education/${guide.slug}`}
            className="group rounded-[1.25rem] bg-white p-6 transition-all hover:-translate-y-0.5 hover:shadow-[0_16px_32px_rgba(27,58,92,0.1)] focus-ring"
          >
            <div className="flex flex-wrap gap-2">
              <Badge tone={guide.audience === "sellers" ? "orange" : "navy"}>
                {guide.audience}
              </Badge>
              {guide.format === "web+pdf" ? <Badge tone="muted">PDF available</Badge> : null}
            </div>
            <h2 className="mt-3 font-display text-xl font-bold text-navy group-hover:text-orange">
              {guide.title}
            </h2>
            <p className="mt-2 text-sm text-muted">{guide.summary}</p>
          </Link>
        ))}
      </div>
      <div className="mt-10 rounded-[1.5rem] border border-[color:var(--line)] bg-sand/60 p-6">
        <p className="text-sm text-muted">
          Sellers can paste this snippet into listings:{" "}
          <span className="font-semibold text-navy">
            Please follow the acclimation guide at snapperhouse.com.au/education/fish-acclimation-standard
            before introducing new fish to your tank.
          </span>
        </p>
        <ButtonLink href="/education/fish-acclimation-standard" variant="secondary" className="mt-4" size="sm">
          Open acclimation guide
        </ButtonLink>
      </div>
    </div>
  );
}
