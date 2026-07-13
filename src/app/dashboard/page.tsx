import { Badge, ButtonLink, SectionHeading } from "@/components/ui/primitives";
import { getEnrichedListings } from "@/lib/data";
import { formatPrice } from "@/lib/utils";
import { AlertTriangle, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const metadata = { title: "Seller dashboard" };

export default function DashboardPage() {
  const mine = getEnrichedListings().filter((l) => l.sellerId === "u-maya");

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 md:px-6">
      <SectionHeading
        eyebrow="Seller"
        title="Dashboard"
        description="Listings, credits and financial year summary — Australian FY (1 July – 30 June)."
        action={
          <ButtonLink href="/dashboard/listings/new" variant="orange">
            <Plus className="h-4 w-4" />
            New listing
          </ButtonLink>
        }
      />

      <div className="grid gap-4 md:grid-cols-4">
        {[
          { label: "Credits", value: "12" },
          { label: "Active listings", value: String(mine.length) },
          { label: "FY confirmed sales", value: "14" },
          { label: "FY est. value", value: "$2,180" },
        ].map((stat) => (
          <div key={stat.label} className="rounded-2xl bg-white p-5">
            <p className="text-xs font-bold uppercase tracking-wide text-muted">{stat.label}</p>
            <p className="mt-2 font-display text-3xl font-extrabold text-navy">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 flex gap-3 rounded-2xl bg-warning/10 px-5 py-4 text-sm text-warning">
        <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" />
        <div>
          <p className="font-bold">Soft tax nudge (Level 2)</p>
          <p className="mt-1">
            You have had 14 confirmed sales this financial year totalling approximately $2,180.
            If you are selling regularly with a view to making a profit, it is worth reviewing
            your tax obligations.
          </p>
          <p className="mt-2 text-xs">
            This platform does not provide tax advice. Educational only — consult a registered
            tax agent or the ATO.
          </p>
        </div>
      </div>

      <section className="mt-10">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-2xl font-bold text-navy">Active livestock</h2>
          <div className="flex gap-2 text-sm font-semibold">
            <Badge tone="navy">Active</Badge>
            <Badge tone="muted">Drafts 1</Badge>
            <Badge tone="muted">Expired 0</Badge>
          </div>
        </div>
        <div className="space-y-3">
          {mine.map((listing) => (
            <div
              key={listing.id}
              className="flex flex-col gap-4 rounded-2xl bg-white p-4 sm:flex-row sm:items-center"
            >
              <div className="relative h-20 w-full shrink-0 overflow-hidden rounded-xl bg-navy-deep sm:w-28">
                <Image src={listing.photos[0]!} alt="" fill className="object-cover" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-display text-lg font-bold text-navy">
                  {listing.species.commonName}
                </p>
                <p className="text-sm text-muted">
                  {formatPrice(listing.price, listing.priceNegotiable)} · Qty{" "}
                  {listing.quantityAvailable} · {listing.completenessScore}% detail
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <ButtonLink
                  href={`/dashboard/listings/${listing.id}/edit`}
                  variant="secondary"
                  size="sm"
                >
                  Edit
                </ButtonLink>
                <ButtonLink href={`/listings/${listing.id}`} variant="ghost" size="sm">
                  View
                </ButtonLink>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10 grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl bg-white p-6">
          <h2 className="font-display text-xl font-bold text-navy">Financial year summary</h2>
          <ul className="mt-4 space-y-2 text-sm">
            <li className="flex justify-between"><span className="text-muted">For sale confirmations</span><span className="font-semibold text-navy">11</span></li>
            <li className="flex justify-between"><span className="text-muted">Rehoming confirmations</span><span className="font-semibold text-navy">3</span></li>
            <li className="flex justify-between"><span className="text-muted">Active listing months</span><span className="font-semibold text-navy">7</span></li>
          </ul>
          <Link href="/education/tax-awareness" className="mt-4 inline-block text-sm font-semibold text-orange hover:underline">
            Tax awareness explainer →
          </Link>
        </div>
        <div className="rounded-2xl bg-white p-6">
          <h2 className="font-display text-xl font-bold text-navy">ATO resources</h2>
          <ul className="mt-4 space-y-2 text-sm font-semibold text-navy">
            <li><a className="hover:text-orange" href="https://www.ato.gov.au/" target="_blank" rel="noreferrer">ATO — Are you in business?</a></li>
            <li><a className="hover:text-orange" href="https://www.ato.gov.au/" target="_blank" rel="noreferrer">ATO — Hobby vs business tool</a></li>
            <li><Link className="hover:text-orange" href="/account">Credit purchase history</Link></li>
          </ul>
        </div>
      </section>
    </div>
  );
}
