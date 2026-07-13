import { cn } from "@/lib/utils";
import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "orange" | "danger";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  primary:
    "bg-navy text-white hover:bg-navy-mid shadow-[0_8px_24px_rgba(27,58,92,0.25)]",
  secondary:
    "bg-white/90 text-navy border border-[color:var(--line)] hover:bg-sand",
  ghost: "bg-transparent text-navy hover:bg-sand",
  orange:
    "bg-orange text-white hover:bg-orange-hot shadow-[0_8px_24px_rgba(244,123,32,0.3)]",
  danger: "bg-danger text-white hover:opacity-90",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-3.5 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-base",
};

export function Button({
  className,
  variant = "primary",
  size = "md",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
}) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-all duration-200 focus-ring disabled:opacity-50",
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    />
  );
}

export function ButtonLink({
  href,
  children,
  className,
  variant = "primary",
  size = "md",
}: {
  href: string;
  children: ReactNode;
  className?: string;
  variant?: Variant;
  size?: Size;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-all duration-200 focus-ring",
        variants[variant],
        sizes[size],
        className,
      )}
    >
      {children}
    </Link>
  );
}

export function Badge({
  children,
  tone = "navy",
  className,
}: {
  children: ReactNode;
  tone?: "navy" | "orange" | "water" | "warning" | "success" | "muted";
  className?: string;
}) {
  const tones = {
    navy: "bg-navy/10 text-navy",
    orange: "bg-orange/15 text-orange-deep",
    water: "bg-water/15 text-water",
    warning: "bg-warning/15 text-warning",
    success: "bg-success/15 text-success",
    muted: "bg-sand text-muted",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md px-2 py-0.5 text-xs font-semibold tracking-wide",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-2xl">
        {eyebrow ? (
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-orange">
            {eyebrow}
          </p>
        ) : null}
        <h2 className="font-display text-3xl font-bold tracking-tight text-navy md:text-4xl">
          {title}
        </h2>
        {description ? (
          <p className="mt-2 text-base text-muted md:text-lg">{description}</p>
        ) : null}
      </div>
      {action}
    </div>
  );
}

export function EmptyState({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-dashed border-[color:var(--line)] bg-white/60 px-6 py-16 text-center">
      <h3 className="font-display text-xl font-bold text-navy">{title}</h3>
      <p className="mx-auto mt-2 max-w-md text-muted">{description}</p>
      {action ? <div className="mt-6">{action}</div> : null}
    </div>
  );
}
