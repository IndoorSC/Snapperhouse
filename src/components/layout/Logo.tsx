import Image from "next/image";
import Link from "next/link";

/** Intrinsic size of public/images/logo.png — do not alter the asset */
const INTRINSIC = { width: 1774, height: 887 } as const;

const sizes = {
  sm: { height: 44 },
  md: { height: 64 },
  lg: { height: 96 },
  hero: { height: 240 },
} as const;

export function Logo({
  size = "md",
  className = "",
}: {
  tone?: "navy" | "light";
  size?: keyof typeof sizes;
  withTagline?: boolean;
  className?: string;
}) {
  const height = sizes[size].height;
  const width = Math.round((height * INTRINSIC.width) / INTRINSIC.height);

  return (
    <Link
      href="/"
      className={`group inline-flex shrink-0 items-center focus-ring ${className}`}
      aria-label="Snapperhouse home"
    >
      <Image
        src="/images/logo.png"
        alt="Snapperhouse — Your Site, Your Store"
        width={width}
        height={height}
        className="h-auto w-full max-w-full object-contain"
        style={{ maxHeight: height }}
        priority
        unoptimized
      />
    </Link>
  );
}
