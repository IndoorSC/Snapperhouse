import Link from "next/link";

export function Logo({
  tone = "navy",
  size = "md",
}: {
  tone?: "navy" | "light";
  size?: "sm" | "md" | "lg";
}) {
  const text = tone === "light" ? "text-white" : "text-navy";
  const sizes = {
    sm: { mark: 28, word: "text-lg" },
    md: { mark: 34, word: "text-xl" },
    lg: { mark: 48, word: "text-3xl" },
  }[size];

  return (
    <Link href="/" className="group inline-flex items-center gap-2.5 focus-ring rounded-lg">
      <svg
        width={sizes.mark}
        height={sizes.mark}
        viewBox="0 0 48 48"
        fill="none"
        aria-hidden
        className="animate-swim"
      >
        <path
          d="M6 24C12 14 22 12 30 16C38 20 42 18 46 22C40 26 38 32 30 34C20 37 12 34 8 30C6.5 28.5 5.5 26 6 24Z"
          fill={tone === "light" ? "#F47B20" : "#1B3A5C"}
        />
        <path
          d="M6 24C4 20 1.5 19 0 20.5C3 23 3.5 26.5 4.5 29C5.5 27 6 25.5 6 24Z"
          fill="#F47B20"
        />
        <circle cx="34" cy="20.5" r="2.2" fill="white" />
        <path
          d="M18 18C20 16 24 15.5 27 17"
          stroke="white"
          strokeOpacity="0.35"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
      <span className={`font-display font-extrabold tracking-tight ${sizes.word} ${text}`}>
        Snapper<span className="text-orange">house</span>
      </span>
    </Link>
  );
}
