"use client";

import { Logo } from "@/components/layout/Logo";
import { ButtonLink } from "@/components/ui/primitives";
import { cn } from "@/lib/utils";
import { Bell, Menu, MessageSquare, Search, X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

const nav = [
  { href: "/browse", label: "Browse" },
  { href: "/browse?category=plants", label: "Plants" },
  { href: "/browse?category=equipment", label: "Equipment" },
  { href: "/education", label: "Guides" },
  { href: "/events", label: "Trade Days" },
];

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");

  function onSearch(e: FormEvent) {
    e.preventDefault();
    const query = q.trim();
    router.push(query ? `/search?q=${encodeURIComponent(query)}` : "/browse");
    setOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-[color:var(--line)] bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-2.5 md:px-6">
        <Logo size="md" />

        <form
          onSubmit={onSearch}
          className="relative ml-2 hidden min-w-0 flex-1 md:block lg:max-w-md"
        >
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search species, sellers, listings…"
            className="h-10 w-full rounded-lg border border-[color:var(--line)] bg-white pl-10 pr-3 text-sm text-ink placeholder:text-muted/70 focus-ring"
            aria-label="Search"
          />
        </form>

        <nav className="ml-auto hidden items-center gap-1 lg:flex">
          {nav.map((item) => {
            const active = pathname === item.href || pathname.startsWith(item.href.split("?")[0]!);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-lg px-3 py-2 text-sm font-semibold transition-colors focus-ring",
                  active ? "bg-sand text-navy" : "text-muted hover:bg-sand hover:text-navy",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-1 lg:ml-2">
          <Link
            href="/messages"
            className="hidden rounded-lg p-2 text-muted hover:bg-sand hover:text-navy focus-ring sm:inline-flex"
            aria-label="Messages"
          >
            <MessageSquare className="h-5 w-5" />
          </Link>
          <button
            type="button"
            className="hidden rounded-lg p-2 text-muted hover:bg-sand hover:text-navy focus-ring sm:inline-flex"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5" />
          </button>
          <ButtonLink href="/login" variant="ghost" size="sm" className="hidden sm:inline-flex">
            Log in
          </ButtonLink>
          <ButtonLink href="/register" variant="orange" size="sm">
            Join
          </ButtonLink>
          <button
            type="button"
            className="rounded-lg p-2 text-navy hover:bg-sand focus-ring lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open ? (
        <div className="border-t border-[color:var(--line)] bg-white px-4 py-4 lg:hidden">
          <form onSubmit={onSearch} className="relative mb-4">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search…"
              className="h-11 w-full rounded-lg border border-[color:var(--line)] bg-foam pl-10 pr-3 text-sm focus-ring"
            />
          </form>
          <div className="flex flex-col gap-1">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-base font-semibold text-navy hover:bg-sand"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/dashboard"
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-3 text-base font-semibold text-navy hover:bg-sand"
            >
              Seller dashboard
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}
