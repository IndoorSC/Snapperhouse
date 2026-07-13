import { Button, SectionHeading } from "@/components/ui/primitives";

export const metadata = { title: "Admin · Flags" };

const flags = [
  { type: "No-show", parties: "Tank Tom → buyer Alex M", note: "Agreed meetup, buyer did not arrive", when: "3d ago" },
  { type: "Rating dispute", parties: "Josh Reefless disputes buyer rating", note: "Claims note is defamatory", when: "5d ago" },
];

export default function AdminFlagsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 md:px-6">
      <SectionHeading
        eyebrow="Admin"
        title="Flag review queue"
        description="No-show disputes and rating content reviews. Platform does not mediate commercial disputes."
      />
      <div className="space-y-3">
        {flags.map((f) => (
          <div key={f.note} className="rounded-2xl bg-white p-5">
            <p className="text-xs font-bold uppercase tracking-wide text-orange">{f.type}</p>
            <p className="mt-1 font-display text-lg font-bold text-navy">{f.parties}</p>
            <p className="mt-1 text-sm text-muted">{f.note} · {f.when}</p>
            <div className="mt-4 flex gap-2">
              <Button type="button" variant="secondary" size="sm">Keep</Button>
              <Button type="button" variant="danger" size="sm">Remove flag / rating</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
