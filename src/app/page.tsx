import { Logo } from "@/components/layout/Logo";
import { ListingGrid } from "@/components/listings/ListingCard";
import { Badge, ButtonLink, SectionHeading } from "@/components/ui/primitives";
import { getEnrichedListings, sortListings } from "@/lib/data";
import { taxonomyGroups } from "@/lib/data/taxonomy";
import { ArrowRight, Fish, MapPin, ShieldCheck, Store } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  const featured = sortListings(getEnrichedListings(), "nearest").slice(0, 6);
  const fishGroups = taxonomyGroups.filter((g) => g.section === "fish").slice(0, 10);

  return (
    <>
      <section className="relative overflow-hidden bg-white">
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-[linear-gradient(180deg,transparent,rgba(232,238,243,0.9))]" />
        <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-10 md:px-6 md:pb-20 md:pt-14">
          <div className="animate-rise mx-auto flex max-w-4xl flex-col items-center text-center">
            <Logo size="hero" className="w-full max-w-[34rem] sm:max-w-[40rem]" />
            <h1 className="sr-only">Snapperhouse — Your Site, Your Store</h1>
            <p className="animate-rise-delay mx-auto mt-8 max-w-xl text-base font-medium leading-relaxed text-navy sm:text-lg md:text-xl">
              Australia&apos;s aquarium marketplace for private hobbyists — species-driven
              listings, seller storefronts, and community tools Facebook can&apos;t offer.
            </p>
            <div className="animate-rise-delay-2 mt-8 flex flex-wrap justify-center gap-3">
              <ButtonLink href="/browse" variant="orange" size="lg">
                Browse livestock
              </ButtonLink>
              <ButtonLink href="/register" variant="primary" size="lg" className="text-white">
                Start selling
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-[color:var(--line)] bg-white">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-10 sm:grid-cols-3 md:px-6">
          {[
            {
              icon: Store,
              title: "Seller storefronts",
              text: "Profiles, reputation and species listings — not throwaway ads.",
            },
            {
              icon: Fish,
              title: "Species taxonomy",
              text: "Search by group, genus and care data with trade status built in.",
            },
            {
              icon: MapPin,
              title: "Local-first discovery",
              text: "Nearest listings first when your suburb is set. Pickup or freight.",
            },
          ].map((item) => (
            <div key={item.title} className="flex gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-sand text-navy">
                <item.icon className="h-5 w-5" />
              </div>
              <div>
                <h2 className="font-display text-lg font-bold text-navy">{item.title}</h2>
                <p className="mt-1 text-sm text-muted">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 md:px-6">
        <SectionHeading
          eyebrow="Near you"
          title="Fresh listings from private sellers"
          description="Sorted nearest-first for demo buyers in Geelong / Melbourne. Switch sort anytime."
          action={
            <ButtonLink href="/browse" variant="secondary" size="sm">
              View all
              <ArrowRight className="h-4 w-4" />
            </ButtonLink>
          }
        />
        <ListingGrid listings={featured} />
      </section>

      <section className="bg-sand/70 py-16">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <SectionHeading
            eyebrow="Taxonomy"
            title="Browse by group"
            description="Every fish listing is attached to an approved species — cleaner search, better care context."
          />
          <div className="flex flex-wrap gap-2.5">
            {fishGroups.map((group) => (
              <Link
                key={group.id}
                href={`/group/${group.slug}`}
                className="rounded-xl bg-white px-4 py-3 text-sm font-semibold text-navy shadow-sm transition-all hover:-translate-y-0.5 hover:text-orange focus-ring"
              >
                {group.name}
              </Link>
            ))}
            <Link
              href="/browse"
              className="rounded-xl border border-dashed border-navy/20 px-4 py-3 text-sm font-semibold text-muted hover:border-orange hover:text-orange focus-ring"
            >
              All groups →
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 md:px-6">
        <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
          <div className="rounded-[1.5rem] water-bg ripple p-8 text-white md:p-10">
            <Badge tone="orange" className="bg-orange text-white">
              Fish Trade Days
            </Badge>
            <h2 className="mt-4 font-display text-3xl font-bold md:text-4xl">
              Credits fund real-world community events
            </h2>
            <p className="mt-3 max-w-md text-white/75">
              Quarterly hobbyist markets across Melbourne and Gippsland — seller tables,
              auctions, and problem-fish help desks.
            </p>
            <ButtonLink
              href="/events"
              variant="orange"
              className="mt-8"
            >
              See upcoming Trade Days
            </ButtonLink>
          </div>
          <div className="rounded-[1.5rem] border border-[color:var(--line)] bg-white p-8 md:p-10">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-sand text-navy">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <h2 className="mt-4 font-display text-3xl font-bold text-navy md:text-4xl">
              Sell with a proper reputation
            </h2>
            <p className="mt-3 text-muted">
              Blind dual ratings, no-show flagging, and on-platform messaging keep contact
              private until you&apos;re ready.
            </p>
            <ButtonLink href="/education/platform-rules" variant="secondary" className="mt-8">
              Read the seller code
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
