// Pastel accent palette — peach / lavender / mint
export const PEACH = "#FFB38E";
export const LAVENDER = "#D4B3FF";
export const MINT = "#A1EEBD";

export const SECTION = "mx-auto w-full max-w-6xl px-6";

export const SPRING_BOUNCE = {
  type: "spring" as const,
  stiffness: 120,
  damping: 14,
};
export const SPRING_SOFT = {
  type: "spring" as const,
  stiffness: 180,
  damping: 22,
};

export const STACK = [
  "Remotion",
  "React",
  "Next.js",
  "Tailwind",
  "TypeScript",
  "shadcn/ui",
  "Vercel",
] as const;

export type NavLink = {
  href: string;
  label: string;
  /** Hidden on mobile (matches the existing `hidden sm:inline` pattern). */
  smOnly?: boolean;
};

export const HOME_NAV: NavLink[] = [
  { href: "#showcase", label: "Showcase", smOnly: true },
  { href: "#components", label: "Components", smOnly: true },
  { href: "#use-cases", label: "Use cases", smOnly: true },
  { href: "/sponsors", label: "Sponsors", smOnly: true },
  { href: "/docs/getting-started/introduction", label: "Docs" },
];

export const SPONSORS_NAV: NavLink[] = [
  { href: "/#showcase", label: "Showcase", smOnly: true },
  { href: "/#components", label: "Components", smOnly: true },
  { href: "/sponsors", label: "Sponsors", smOnly: true },
  { href: "/docs/getting-started/introduction", label: "Docs" },
];

export const FOOTER_NAV: NavLink[] = [
  { href: "/docs/getting-started/introduction", label: "Docs" },
  { href: "https://github.com/remocn/remocn", label: "GitHub" },
  { href: "/sponsors", label: "Sponsors" },
];
