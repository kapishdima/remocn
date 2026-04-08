import Image from "next/image";
import Link from "next/link";
import { type NavLink, SECTION } from "@/config/landing";

export function SiteHeader({ navLinks }: { navLinks: NavLink[] }) {
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-white/[0.05] bg-[#141318]/60 backdrop-blur-2xl">
      <div className={`flex h-16 items-center justify-between ${SECTION}`}>
        <Link
          href="/"
          className="flex items-center gap-2 font-[var(--font-display)] text-lg font-semibold -tracking-wide text-[#EDEDED] focus-visible:outline-none"
        >
          <Image
            src="/logo.svg"
            alt="remocn logo"
            width={24}
            height={24}
            priority
          />
          remocn
        </Link>
        <nav className="flex items-center gap-7 text-sm text-[#8B8A91]">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`${
                link.smOnly ? "hidden sm:inline" : ""
              } transition-colors hover:text-white focus-visible:text-white focus-visible:outline-none`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="https://github.com/kapishdima/remocn"
            target="_blank"
            rel="noreferrer noopener"
            className="flex items-center gap-1.5 transition-colors hover:text-white focus-visible:text-white focus-visible:outline-none"
          >
            <svg
              viewBox="0 0 24 24"
              className="size-4"
              fill="currentColor"
              role="img"
              aria-label="GitHub"
            >
              <title>GitHub</title>
              <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.27-.01-1-.02-1.96-3.2.69-3.87-1.54-3.87-1.54-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.71 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.47.11-3.06 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.21-1.49 3.18-1.18 3.18-1.18.63 1.59.23 2.77.11 3.06.74.81 1.19 1.84 1.19 3.1 0 4.44-2.7 5.41-5.27 5.7.41.36.78 1.06.78 2.14 0 1.55-.01 2.8-.01 3.18 0 .31.21.68.8.56C20.21 21.39 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5Z" />
            </svg>
            GitHub
          </Link>
        </nav>
      </div>
    </header>
  );
}
