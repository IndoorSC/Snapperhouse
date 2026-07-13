import Image from "next/image";
import Link from "next/link";

const sizes = {
  sm: { width: 150, height: 38 },
  md: { width: 190, height: 48 },
  lg: { width: 280, height: 70 },
  hero: { width: 520, height: 130 },
} as const;

export function Logo({
  tone = "navy",
  size = "md",
  withTagline = false,
}: {
  tone?: "navy" | "light";
  size?: keyof typeof sizes;
  withTagline?: boolean;
}) {
  const dim = sizes[size];
  const src = tone === "light" ? "/images/logo-light.svg" : "/images/logo.png";

  return (
    <Link
      href="/"
      className="group inline-flex shrink-0 items-center rounded-lg focus-ring"
      aria-label="Snapperhouse home"
    >
      <Image
        src={src}
        alt="Snapperhouse — Your Site, Your Store"
        width={dim.width}
        height={dim.height}
        className={`h-auto w-auto object-contain ${
          withTagline || size === "hero" ? "" : "max-h-10 md:max-h-12"
        }`}
        priority={size === "md" || size === "hero"}
      />
    </Link>
  );
}
