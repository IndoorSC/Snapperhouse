import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import type { Metadata } from "next";
import { Bricolage_Grotesque, Figtree } from "next/font/google";
import "./globals.css";

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
  display: "swap",
});

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Snapperhouse — Your Site, Your Store",
    template: "%s · Snapperhouse",
  },
  description:
    "Australia's dedicated aquarium hobbyist marketplace. Buy, sell, rehome and trade freshwater fish, plants, shrimp and equipment — privately, with reputation and species care data.",
  metadataBase: new URL("https://snapperhouse.com.au"),
  openGraph: {
    title: "Snapperhouse — Your Site, Your Store",
    description:
      "Australian aquarium marketplace for private hobbyists. Species-driven listings, seller storefronts, and Fish Trade Days.",
    locale: "en_AU",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-AU" className={`${figtree.variable} ${bricolage.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
