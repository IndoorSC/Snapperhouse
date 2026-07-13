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
      <section className="relative overflow-hidden water-bg ripple text-white">
        <div className="pointer-events-none absolute inset-0">
          <div className="animate-float absolute -left-10 top-24 h-40 w-40 rounded-full bg-orange/20 blur-3xl" />
          <div className="animate-float absolute bottom-10 right-10 h-56 w-56 rounded-full bg-water-light/30 blur-3xl [animation-delay:1s]" />
        </div>
        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 pb-20 pt-16 md:grid-cols-[1.15fr_0.85fr] md:px-6 md:pb-24 md:pt-24">
          <div>
            <p className="animate-rise mb-4 font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
              Snapper<span className="text-orange">house</span>
            </p>
            <h1 className="animate-rise-delay max-w-xl font-display text-2xl font-semibold leading-snug text-white/95 sm:text-3xl md:text-4xl">
              Your Site, Your Store
            </h1>
            <p className="animate-rise-delay-2 mt-5 max-w-lg text-base leading-relaxed text-white/75 sm:text-lg">
              Australia&apos;s aquarium marketplace for private hobbyists — species-driven
              listings, seller storefronts, and community tools Facebook can&apos;t offer.
            </p>
            <div className="animate-rise-delay-2 mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/browse" variant="orange" size="lg">
                Browse livestock
                <ArrowRight className="h-4 w-4" />
              </ButtonLink>
              <ButtonLink
                href="/register"
                variant="secondary"
                size="lg"
                className="border-white/20 bg-white/10 text-white hover:bg-white/20"
              >
                Start selling
              </ButtonLink>
            </div>
          </div>

          <div className="animate-rise-delay relative hidden min-h-[320px] md:block">
            <div className="absolute inset-0 rounded-[2rem] border border-white/10 bg-white/5 backdrop-blur-sm" />
            <svg
              viewBox="0 0 480 420"
              className="absolute inset-0 h-full w-full p-6"
              aria-hidden
            >
              <defs>
                <linearGradient id="heroFish" x1="0" y1="0" x2="1" y2="1">
                  <stop stopColor="#3D8FAD" />
                  <stop offset="0.5" stopColor="#F47B20" />
                  <stop offset="1" stopColor="#FF8F3A" />
                </linearGradient>
              </defs>
              <g className="animate-swim origin-center">
                <path
                  d="M60 210C120 120 220 100 300 140C380 180 420 160 460 200C400 240 380 300 300 320C200 345 120 320 80 280C65 260 55 235 60 210Z"
                  fill="url(#heroFish)"
                  opacity="0.95"
                />
                <path
                  d="M60 210C40 175 15 165 0 180C30 210 35 250 45 280C55 255 60 230 60 210Z"
                  fill="#F47B20"
                />
                <circle cx="360" cy="175" r="12" fill="#102438" />
                <circle cx="364" cy="171" r="4" fill="white" />
              </g>
              <circle cx="90" cy="80" r="18" fill="white" opacity="0.08" />
              <circle cx="140" cy="110" r="8" fill="white" opacity="0.1" />
              <circle cx="400" cy="70" r="28" fill="white" opacity="0.06" />
            </svg>
            <div className="absolute bottom-6 left-6 right-6 rounded-2xl bg-navy-deep/70 p-4 backdrop-blur">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-orange">
                Built by hobbyists
              </p>
              <p className="mt-1 text-sm text-white/85">
                Taxonomy, ratings, tax awareness, and Fish Trade Days — not just another
                classifieds board.
              </p>
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
