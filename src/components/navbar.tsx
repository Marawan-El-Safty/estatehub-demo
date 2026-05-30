"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/listings", label: "Listings" },
  { href: "/dashboard", label: "Agent Dashboard" },
  { href: "/dashboard/analytics", label: "Analytics" },
];

export function Navbar() {
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-50 glass border-b">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-[var(--primary)] text-sm font-bold text-white">
            E
          </span>
          <span className="text-[var(--foreground)]">EstateHub</span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {links.map((l) => {
            const active = pathname === l.href || (l.href !== "/" && pathname.startsWith(l.href));
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`rounded-lg px-3 py-2 text-sm transition-colors ${
                  active
                    ? "bg-[var(--surface-2)] text-[var(--foreground)]"
                    : "text-[var(--muted)] hover:text-[var(--foreground)]"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </div>

        <Link
          href="/listings"
          className="rounded-lg bg-[var(--primary)] px-4 py-2 text-sm font-medium text-white shadow-lg shadow-[var(--primary)]/20 transition-transform hover:-translate-y-0.5"
        >
          Browse Homes
        </Link>
      </nav>
    </header>
  );
}
