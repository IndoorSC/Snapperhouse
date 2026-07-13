import { Button, SectionHeading } from "@/components/ui/primitives";

export const metadata = { title: "Saved searches" };

const demoSearches = [
  { name: "Altum Angelfish VIC", filters: "Angelfish · VIC · For sale" },
  { name: "Cherry shrimp metro", filters: "Shrimp · Neocaridina · 50km" },
  { name: "Rehoming near me", filters: "Rehoming · Nearest first" },
];

const followed = ["Tank Tom", "Shrimp Sara", "Josh Reefless"];

export default function SavedSearchesPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 md:px-6">
      <SectionHeading
        eyebrow="Account"
        title="Saved searches & follows"
        description="Email alerts within an hour of matching listings. Max 10 saved searches."
      />

      <section className="rounded-[1.25rem] bg-white p-6">
        <h2 className="font-display text-xl font-bold text-navy">Saved searches</h2>
        <ul className="mt-4 space-y-3">
          {demoSearches.map((s) => (
            <li key={s.name} className="flex items-center justify-between gap-3 rounded-xl bg-sand px-4 py-3">
              <div>
                <p className="font-semibold text-navy">{s.name}</p>
                <p className="text-sm text-muted">{s.filters}</p>
              </div>
              <Button type="button" variant="ghost" size="sm">Remove</Button>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-6 rounded-[1.25rem] bg-white p-6">
        <h2 className="font-display text-xl font-bold text-navy">Followed sellers</h2>
        <ul className="mt-4 space-y-3">
          {followed.map((name) => (
            <li key={name} className="flex items-center justify-between gap-3 rounded-xl bg-sand px-4 py-3">
              <p className="font-semibold text-navy">{name}</p>
              <Button type="button" variant="ghost" size="sm">Unfollow</Button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
