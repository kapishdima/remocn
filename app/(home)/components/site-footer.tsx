import Link from "next/link";
import { type NavLink, SECTION } from "@/config/landing";

export function SiteFooter({
  navLinks,
  className = "",
}: {
  navLinks: NavLink[];
  className?: string;
}) {
  return (
    <div className={`${SECTION} ${className}`}>
      <footer className="flex flex-col items-start justify-between gap-4 border-t border-white/[0.05] pt-8 pb-12 text-xs text-[#666] md:flex-row md:items-center">
        <span suppressHydrationWarning>
          © {new Date().getFullYear()} remocn — MIT licensed
        </span>
        <nav className="flex gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-white focus-visible:text-white focus-visible:outline-none"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </footer>
    </div>
  );
}
