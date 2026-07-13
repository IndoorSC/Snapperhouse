import { Logo } from "@/components/layout/Logo";
import Link from "next/link";

const columns = [
  {
    title: "Marketplace",
    links: [
      { href: "/browse", label: "Browse listings" },
      { href: "/browse?category=plants", label: "Aquatic plants" },
      { href: "/browse?category=equipment", label: "Equipment" },
      { href: "/browse?category=setups", label: "Complete setups" },
    ],
  },
  {
    title: "Learn",
    links: [
      { href: "/education", label: "Education library" },
      { href: "/education/fish-acclimation-standard", label: "Acclimation guide" },
      { href: "/education/tax-awareness", label: "Tax awareness" },
      { href: "/education/platform-rules", label: "Platform rules" },
    ],
  },
  {
    title: "Sellers",
    links: [
      { href: "/register", label: "Create account" },
      { href: "/dashboard", label: "Seller dashboard" },
      { href: "/dashboard/listings/new", label: "Create a listing" },
      { href: "/events", label: "Fish Trade Days" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-auto border-t border-[color:var(--line)] bg-navy-deep text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-[1.2fr_repeat(3,1fr)] md:px-6">
        <div>
          <Logo size="md" />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/80">
            Australia&apos;s aquarium hobbyist marketplace. Your site, your store —
            species-driven listings, reputation, and community events.
          </p>
        </div>
        {columns.map((col) => (
          <div key={col.title}>
            <h3 className="text-sm font-bold uppercase tracking-[0.14em] text-white/50">
              {col.title}
            </h3>
            <ul className="mt-4 space-y-2.5">
              {col.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/80 transition-colors hover:text-orange"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-5 text-xs text-white/45 md:flex-row md:items-center md:justify-between md:px-6">
          <p>© {new Date().getFullYear()} Snapperhouse · snapperhouse.com.au</p>
          <p>
            Trade status data is indicative only — verify with DAFF before listing.
          </p>
        </div>
      </div>
    </footer>
  );
}
