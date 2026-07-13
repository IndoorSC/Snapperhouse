import { Badge, Button, SectionHeading } from "@/components/ui/primitives";
import { sellers } from "@/lib/data/sellers";

export const metadata = { title: "Admin · Users" };

export default function AdminUsersPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 md:px-6">
      <SectionHeading
        eyebrow="Admin"
        title="User manager"
        description="Search, suspend, and adjust credits with mandatory notes."
      />
      <input
        placeholder="Search by display name or email…"
        className="mb-6 h-11 w-full rounded-lg border border-[color:var(--line)] bg-white px-3 focus-ring"
      />
      <div className="space-y-3">
        {sellers.map((s) => (
          <div key={s.id} className="flex flex-col gap-3 rounded-2xl bg-white p-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <p className="font-display text-lg font-bold text-navy">{s.displayName}</p>
                {s.isSeller ? <Badge tone="orange">Seller</Badge> : null}
              </div>
              <p className="text-sm text-muted">
                @{s.username} · {s.suburb}, {s.state} · ★ {s.sellerRating} · {s.sellerSales} sales
              </p>
            </div>
            <div className="flex gap-2">
              <Button type="button" variant="secondary" size="sm">Adjust credits</Button>
              <Button type="button" variant="ghost" size="sm">Suspend</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
