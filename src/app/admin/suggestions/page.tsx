import { Button, SectionHeading } from "@/components/ui/primitives";

export const metadata = { title: "Admin · Suggestions" };

const items = [
  { species: "Panda Corydora", scientific: "Corydoras panda", by: "Tank Tom", when: "2d ago" },
  { species: "Crystal Red Shrimp", scientific: "Caridina cantonensis", by: "Shrimp Sara", when: "4d ago" },
  { species: "German Blue Ram", scientific: "Mikrogeophagus ramirezi", by: "Maya Aquatics", when: "1w ago" },
];

export default function AdminSuggestionsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 md:px-6">
      <SectionHeading
        eyebrow="Admin"
        title="Species suggestion queue"
        description="Seller-submitted additions awaiting approval."
      />
      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.species} className="flex flex-col gap-3 rounded-2xl bg-white p-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-display text-lg font-bold text-navy">{item.species}</p>
              <p className="text-sm italic text-muted">{item.scientific}</p>
              <p className="mt-1 text-xs text-muted">Suggested by {item.by} · {item.when}</p>
            </div>
            <div className="flex gap-2">
              <Button type="button" variant="orange" size="sm">Approve</Button>
              <Button type="button" variant="ghost" size="sm">Reject</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
