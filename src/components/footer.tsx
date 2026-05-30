import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t mt-24">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-2 font-semibold">
            <span className="grid h-7 w-7 place-items-center rounded-lg bg-[var(--primary)] text-xs font-bold text-white">
              E
            </span>
            EstateHub
          </div>
          <p className="text-sm text-[var(--muted)]">
            Demo build by Marawan El-Safty · Next.js + Node + PostgreSQL
          </p>
          <Link href="/listings" className="text-sm text-[var(--muted)] hover:text-[var(--foreground)]">
            View listings →
          </Link>
        </div>
      </div>
    </footer>
  );
}
