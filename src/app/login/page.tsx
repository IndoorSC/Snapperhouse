import { Button, ButtonLink } from "@/components/ui/primitives";
import Link from "next/link";

export const metadata = { title: "Log in" };

export default function LoginPage() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-4 py-12">
      <h1 className="font-display text-3xl font-extrabold text-navy">Welcome back</h1>
      <p className="mt-2 text-muted">Log in to enquire, save searches and manage listings.</p>

      <form className="mt-8 space-y-4 rounded-[1.5rem] bg-white p-6">
        <label className="block text-sm">
          <span className="mb-1.5 block font-semibold text-navy">Email</span>
          <input
            type="email"
            required
            className="h-11 w-full rounded-lg border border-[color:var(--line)] bg-foam px-3 focus-ring"
            placeholder="you@email.com"
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1.5 block font-semibold text-navy">Password</span>
          <input
            type="password"
            required
            minLength={8}
            className="h-11 w-full rounded-lg border border-[color:var(--line)] bg-foam px-3 focus-ring"
            placeholder="••••••••"
          />
        </label>
        <Button type="submit" variant="orange" className="w-full">
          Log in
        </Button>
        <button
          type="button"
          className="flex h-11 w-full items-center justify-center rounded-lg border border-[color:var(--line)] bg-white text-sm font-semibold text-navy hover:bg-sand focus-ring"
        >
          Continue with Google
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-muted">
        New here?{" "}
        <Link href="/register" className="font-semibold text-orange hover:underline">
          Create an account
        </Link>
      </p>
      <ButtonLink href="/browse" variant="ghost" className="mt-2">
        Continue browsing as guest
      </ButtonLink>
    </div>
  );
}
