import Image from "next/image";
import Link from "next/link";

/** Intrinsic size of public/images/logo.png — do not alter the asset */
const INTRINSIC = { width: 1774, height: 887 } as const;

const sizes = {
  sm: { height: 36 },
  md: { height: 48 },
  lg: { height: 72 },
  hero: { height: 140 },
} as const;

export function Logo({
  size = "md",
}: {
  tone?: "navy" | "light";
  size?: keyof typeof sizes;
  withTagline?: boolean;
}) {
  const height = sizes[size].height;
  const width = Math.round((height * INTRINSIC.width) / INTRINSIC.height);

  return (
    <Link
      href="/"
      className="group inline-flex shrink-0 items-center rounded-lg focus-ring"
      aria-label="Snapperhouse home"
    >
      <Image
        src="/images/logo.png"
        alt="Snapperhouse — Your Site, Your Store"
        width={width}
        height={height}
        className="h-auto w-auto max-w-full object-contain"
        style={{ height, width: "auto" }}
        priority
        unoptimized
      />
    </Link>
  );
}
