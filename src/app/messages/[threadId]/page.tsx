import { Badge, Button, ButtonLink } from "@/components/ui/primitives";
import Link from "next/link";
import { notFound } from "next/navigation";

type Params = Promise<{ threadId: string }>;

const threads: Record<
  string,
  {
    listing: string;
    listingId: string;
    counterpart: string;
    status: string;
    messages: { from: "me" | "them"; text: string; time: string }[];
  }
> = {
  "t-1": {
    listing: "Bronze Corydora",
    listingId: "l-001",
    counterpart: "Alex M",
    status: "active",
    messages: [
      {
        from: "them",
        text: "Hi Maya — interested in 6 bronze corys. Happy to pick up Saturday arvo in Geelong if still available?",
        time: "10:12",
      },
      {
        from: "me",
        text: "Hi Alex — yes, still available. Saturday 2–4pm works. I can bag with oxygen.",
        time: "10:40",
      },
      {
        from: "them",
        text: "Perfect. I'll follow the acclimation guide. See you then!",
        time: "11:05",
      },
    ],
  },
  "t-2": {
    listing: "Altum Angelfish",
    listingId: "l-003",
    counterpart: "Priya K",
    status: "active",
    messages: [
      {
        from: "them",
        text: "What size tank are they in currently? Looking for tall tank candidates.",
        time: "Yesterday",
      },
    ],
  },
  "t-3": {
    listing: "Bristlenose Pleco",
    listingId: "l-008",
    counterpart: "Dan W",
    status: "active",
    messages: [
      { from: "me", text: "Confirmed for 5pm at the usual meetup spot.", time: "Mon" },
      { from: "them", text: "Thanks — see you at 5.", time: "Mon" },
    ],
  },
};

export default async function ThreadPage({ params }: { params: Params }) {
  const { threadId } = await params;
  const thread = threads[threadId];
  if (!thread) notFound();

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-3xl flex-col px-4 py-8 md:px-6">
      <Link href="/messages" className="text-sm font-semibold text-muted hover:text-orange">
        ← Inbox
      </Link>
      <div className="mt-4 rounded-2xl bg-white p-4">
        <div className="flex flex-wrap items-center gap-2">
          <h1 className="font-display text-xl font-bold text-navy">{thread.counterpart}</h1>
          <Badge tone="success">{thread.status}</Badge>
        </div>
        <Link
          href={`/listings/${thread.listingId}`}
          className="text-sm font-semibold text-orange hover:underline"
        >
          {thread.listing}
        </Link>
      </div>

      <div className="mt-4 flex-1 space-y-3">
        {thread.messages.map((m, i) => (
          <div
            key={i}
            className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm ${
              m.from === "me"
                ? "ml-auto bg-navy text-white"
                : "bg-white text-ink"
            }`}
          >
            <p>{m.text}</p>
            <p className={`mt-1 text-xs ${m.from === "me" ? "text-white/60" : "text-muted"}`}>
              {m.time}
            </p>
          </div>
        ))}
      </div>

      <form className="mt-4 flex gap-2">
        <input
          className="h-11 flex-1 rounded-lg border border-[color:var(--line)] bg-white px-3 focus-ring"
          placeholder="Reply on-platform…"
          maxLength={500}
        />
        <Button type="button" variant="orange">
          Send
        </Button>
      </form>
      <div className="mt-3 flex flex-wrap gap-2">
        <ButtonLink href="/dashboard" variant="secondary" size="sm">
          Mark as sold to…
        </ButtonLink>
        <Button type="button" variant="ghost" size="sm">
          Flag no-show
        </Button>
      </div>
    </div>
  );
}
