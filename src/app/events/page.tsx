import { Badge, ButtonLink, SectionHeading } from "@/components/ui/primitives";
import { creditBundles, tradeDayEvents } from "@/lib/data/education";
import { CalendarDays, MapPin, Ticket } from "lucide-react";

export const metadata = {
  title: "Fish Trade Days",
  description:
    "Snapperhouse Fish Trade Days — real-world hobbyist markets funded in part by listing credits.",
};

export default function EventsPage() {
  return (
    <div>
      <section className="water-bg ripple text-white">
        <div className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-20">
          <Badge tone="orange" className="bg-orange text-white">
            Community events
          </Badge>
          <h1 className="mt-4 max-w-2xl font-display text-4xl font-extrabold tracking-tight md:text-5xl">
            Snapperhouse Fish Trade Days
          </h1>
          <p className="mt-4 max-w-xl text-lg text-white/75">
            Credits aren&apos;t just a listing fee — they help fund real-world hobbyist markets
            with seller tables, auctions, and bring-your-problem-fish corners.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-14 md:px-6">
        <SectionHeading
          title="Upcoming events"
          description="Quarterly cadence across Metro Melbourne, South East Melbourne and Gippsland."
        />
        <div className="grid gap-5 lg:grid-cols-2">
          {tradeDayEvents.map((event) => (
            <article key={event.id} className="rounded-[1.5rem] bg-white p-6 md:p-8">
              <Badge tone="navy">{event.area}</Badge>
              <h2 className="mt-3 font-display text-2xl font-bold text-navy">{event.title}</h2>
              <div className="mt-4 space-y-2 text-sm text-muted">
                <p className="flex items-center gap-2">
                  <CalendarDays className="h-4 w-4 text-navy" />
                  {new Date(event.date).toLocaleDateString("en-AU", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
                <p className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-navy" />
                  {event.venue}
                </p>
                <p className="flex items-center gap-2">
                  <Ticket className="h-4 w-4 text-navy" />
                  {event.ticketPrice}
                </p>
              </div>
              <p className="mt-4 text-ink/80">{event.description}</p>
              <ButtonLink href="/register" variant="orange" className="mt-6" size="sm">
                Register interest
              </ButtonLink>
            </article>
          ))}
        </div>

        <section className="mt-16 grid gap-6 lg:grid-cols-3">
          <div className="rounded-[1.25rem] bg-sand p-6 lg:col-span-2">
            <h2 className="font-display text-2xl font-bold text-navy">Events fund</h2>
            <p className="mt-2 text-muted">
              A transparent portion of credit revenue is allocated to Fish Trade Days. Current
              demo balance shown publicly so sellers can see credits contributing to something
              tangible.
            </p>
            <p className="mt-6 font-display text-4xl font-extrabold text-orange">$1,840</p>
            <p className="text-sm font-semibold text-muted">Allocated this financial year</p>
          </div>
          <div className="rounded-[1.25rem] bg-white p-6">
            <h2 className="font-display text-xl font-bold text-navy">Credit bundles</h2>
            <ul className="mt-4 space-y-3">
              {creditBundles.map((b) => (
                <li key={b.credits} className="flex items-baseline justify-between text-sm">
                  <span className="font-semibold text-navy">
                    {b.credits} credits · {b.label}
                  </span>
                  <span className="text-orange font-bold">${b.price}</span>
                </li>
              ))}
            </ul>
            <ButtonLink href="/dashboard" variant="secondary" className="mt-5 w-full" size="sm">
              Buy credits
            </ButtonLink>
          </div>
        </section>
      </div>
    </div>
  );
}
