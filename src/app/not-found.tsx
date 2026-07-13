import { ButtonLink } from "@/components/ui/primitives";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-lg flex-col items-center justify-center px-4 py-20 text-center">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-orange">404</p>
      <h1 className="mt-3 font-display text-3xl font-extrabold text-navy">
        Page not found
      </h1>
      <p className="mt-2 text-muted">
        That listing, species or page may have swam off. Try browse instead.
      </p>
      <ButtonLink href="/browse" variant="orange" className="mt-8">
        Browse listings
      </ButtonLink>
    </div>
  );
}
