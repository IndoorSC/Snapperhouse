import { Badge, ButtonLink, SectionHeading } from "@/components/ui/primitives";
import Link from "next/link";

export const metadata = { title: "Messages" };

const threads = [
  {
    id: "t-1",
    listing: "Bronze Corydora",
    counterpart: "Alex M",
    preview: "Happy to pick up Saturday arvo in Geelong if still available?",
    time: "2h ago",
    unread: true,
  },
  {
    id: "t-2",
    listing: "Altum Angelfish",
    counterpart: "Priya K",
    preview: "What size tank are they in currently?",
    time: "Yesterday",
    unread: false,
  },
  {
    id: "t-3",
    listing: "Bristlenose Pleco",
    counterpart: "Dan W",
    preview: "Thanks — see you at 5.",
    time: "Mon",
    unread: false,
  },
];

export default function MessagesPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 md:px-6">
      <SectionHeading
        eyebrow="Inbox"
        title="Messages"
        description="All buyer–seller contact stays on Snapperhouse. Emails never expose addresses."
      />
      <div className="space-y-3">
        {threads.map((t) => (
          <Link
            key={t.id}
            href={`/messages/${t.id}`}
            className="block rounded-2xl bg-white p-5 transition-shadow hover:shadow-[0_12px_28px_rgba(27,58,92,0.1)] focus-ring"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-display text-lg font-bold text-navy">{t.counterpart}</p>
                  {t.unread ? <Badge tone="orange">New</Badge> : null}
                </div>
                <p className="text-sm font-semibold text-muted">{t.listing}</p>
                <p className="mt-2 text-sm text-ink/75">{t.preview}</p>
              </div>
              <span className="shrink-0 text-xs text-muted">{t.time}</span>
            </div>
          </Link>
        ))}
      </div>
      <ButtonLink href="/browse" variant="ghost" className="mt-6">
        Browse more listings
      </ButtonLink>
    </div>
  );
}
