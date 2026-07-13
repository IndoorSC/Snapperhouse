import { Badge, Button, ButtonLink, SectionHeading } from "@/components/ui/primitives";
import { creditBundles } from "@/lib/data/education";
import Link from "next/link";

export const metadata = { title: "Account settings" };

export default function AccountPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 md:px-6">
      <SectionHeading
        eyebrow="Account"
        title="Settings"
        description="Profile, notifications, credits and privacy."
      />

      <form className="space-y-8">
        <section className="rounded-[1.25rem] bg-white p-6">
          <h2 className="font-display text-xl font-bold text-navy">Profile</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <label className="block text-sm sm:col-span-2">
              <span className="mb-1.5 block font-semibold text-navy">Display name</span>
              <input defaultValue="Maya Aquatics" className="h-11 w-full rounded-lg border border-[color:var(--line)] bg-foam px-3 focus-ring" />
            </label>
            <label className="block text-sm">
              <span className="mb-1.5 block font-semibold text-navy">Suburb</span>
              <input defaultValue="Geelong" className="h-11 w-full rounded-lg border border-[color:var(--line)] bg-foam px-3 focus-ring" />
            </label>
            <label className="block text-sm">
              <span className="mb-1.5 block font-semibold text-navy">State</span>
              <select defaultValue="VIC" className="h-11 w-full rounded-lg border border-[color:var(--line)] bg-foam px-3 focus-ring">
                {["ACT","NSW","NT","QLD","SA","TAS","VIC","WA"].map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </label>
          </div>
          <Button type="button" className="mt-5" size="sm">Save profile</Button>
        </section>

        <section className="rounded-[1.25rem] bg-white p-6">
          <h2 className="font-display text-xl font-bold text-navy">Email notifications</h2>
          <div className="mt-4 space-y-3">
            {[
              "New inquiry",
              "Sale confirmed",
              "Rating received",
              "Saved search match",
              "Followed seller new listing",
            ].map((label) => (
              <label key={label} className="flex items-center justify-between gap-3 text-sm">
                <span className="font-medium text-navy">{label}</span>
                <input type="checkbox" defaultChecked className="h-4 w-4 accent-orange" />
              </label>
            ))}
          </div>
        </section>

        <section className="rounded-[1.25rem] bg-white p-6">
          <div className="flex items-center justify-between gap-3">
            <h2 className="font-display text-xl font-bold text-navy">Credits</h2>
            <Badge tone="orange">12 available</Badge>
          </div>
          <ul className="mt-4 space-y-2">
            {creditBundles.map((b) => (
              <li key={b.credits} className="flex items-center justify-between rounded-xl bg-sand px-4 py-3 text-sm">
                <span className="font-semibold text-navy">{b.credits} credits · ${b.perListing.toFixed(2)}/listing</span>
                <Button type="button" variant="orange" size="sm">${b.price}</Button>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-xs text-muted">Stripe Elements will process purchases. Credits never expire.</p>
        </section>

        <section className="rounded-[1.25rem] bg-white p-6">
          <h2 className="font-display text-xl font-bold text-navy">Shortcuts</h2>
          <div className="mt-4 flex flex-wrap gap-3">
            <ButtonLink href="/account/saved-searches" variant="secondary" size="sm">Saved searches & follows</ButtonLink>
            <ButtonLink href="/dashboard" variant="secondary" size="sm">Seller dashboard</ButtonLink>
            <ButtonLink href="/education/tax-awareness" variant="ghost" size="sm">Tax explainer</ButtonLink>
          </div>
        </section>

        <section className="rounded-[1.25rem] border border-danger/20 bg-white p-6">
          <h2 className="font-display text-xl font-bold text-danger">Delete account</h2>
          <p className="mt-2 text-sm text-muted">
            Soft delete — listings archived, ratings retained anonymised.
          </p>
          <Button type="button" variant="danger" size="sm" className="mt-4">
            Request deletion
          </Button>
        </section>
      </form>

      <p className="mt-6 text-center text-sm text-muted">
        <Link href="/login" className="font-semibold text-navy hover:text-orange">Switch account</Link>
      </p>
    </div>
  );
}
