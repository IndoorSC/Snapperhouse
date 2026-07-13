import { Badge, ButtonLink } from "@/components/ui/primitives";
import { educationGuides, getGuide } from "@/lib/data/education";
import Link from "next/link";
import { notFound } from "next/navigation";

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  return educationGuides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: { params: Params }) {
  const { slug } = await params;
  const guide = getGuide(slug);
  return {
    title: guide?.title ?? "Guide",
    description: guide?.summary,
  };
}

export default async function EducationGuidePage({ params }: { params: Params }) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();

  return (
    <article className="mx-auto max-w-3xl px-4 py-10 md:px-6">
      <Link href="/education" className="text-sm font-semibold text-muted hover:text-orange">
        ← Education library
      </Link>
      <div className="mt-6 flex flex-wrap gap-2">
        <Badge tone="navy">{guide.audience}</Badge>
        {guide.format === "web+pdf" ? <Badge tone="orange">Web + PDF</Badge> : null}
      </div>
      <h1 className="mt-4 font-display text-4xl font-extrabold tracking-tight text-navy">
        {guide.title}
      </h1>
      <p className="mt-3 text-lg text-muted">{guide.summary}</p>
      <ol className="mt-10 space-y-4">
        {guide.content.map((step, i) => (
          <li key={step} className="flex gap-4 rounded-2xl bg-white p-5">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-navy font-display text-sm font-bold text-white">
              {i + 1}
            </span>
            <p className="text-base leading-relaxed text-ink/85">{step}</p>
          </li>
        ))}
      </ol>
      {guide.slug === "tax-awareness" ? (
        <p className="mt-8 rounded-xl bg-sand px-4 py-3 text-sm text-muted">
          This platform does not provide tax advice. Consult a registered tax agent or the ATO
          directly.
        </p>
      ) : null}
      <ButtonLink href="/browse" variant="secondary" className="mt-10">
        Back to marketplace
      </ButtonLink>
    </article>
  );
}
