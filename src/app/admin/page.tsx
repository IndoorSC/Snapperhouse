import { ButtonLink, SectionHeading } from "@/components/ui/primitives";
import Link from "next/link";

export const metadata = { title: "Admin" };

const links = [
  { href: "/admin/taxonomy", label: "Taxonomy manager", desc: "Groups, genera, species CRUD" },
  { href: "/admin/suggestions", label: "Suggestion queue", desc: "Approve seller species additions" },
  { href: "/admin/users", label: "User manager", desc: "Suspend, credits, history" },
  { href: "/admin/listings", label: "Listing moderation", desc: "Remove or review listings" },
  { href: "/admin/flags", label: "Flag review", desc: "No-show and rating disputes" },
];

export default function AdminPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 md:px-6">
      <SectionHeading
        eyebrow="Admin"
        title="Platform overview"
        description="Staff tools for taxonomy, moderation and reporting."
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Active listings", value: "128" },
          { label: "New users (7d)", value: "34" },
          { label: "Credits sold (7d)", value: "$412" },
          { label: "Pending suggestions", value: "5" },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl bg-white p-5">
            <p className="text-xs font-bold uppercase tracking-wide text-muted">{s.label}</p>
            <p className="mt-2 font-display text-3xl font-extrabold text-navy">{s.value}</p>
          </div>
        ))}
      </div>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="rounded-2xl bg-white p-6 transition-shadow hover:shadow-[0_12px_28px_rgba(27,58,92,0.1)] focus-ring"
          >
            <h2 className="font-display text-xl font-bold text-navy">{link.label}</h2>
            <p className="mt-1 text-sm text-muted">{link.desc}</p>
          </Link>
        ))}
      </div>
      <ButtonLink href="/" variant="ghost" className="mt-8">
        ← Back to site
      </ButtonLink>
    </div>
  );
}
