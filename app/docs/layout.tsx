import { DocsLayout } from "fumadocs-ui/layouts/docs";
import type { ReactNode } from "react";
import { DOCS_NAV } from "@/config/landing";
import { SiteHeader } from "@/app/(home)/components/site-header";
import { getGitHubStars } from "@/lib/github";
import { baseOptions } from "@/lib/layout.shared";
import { source } from "@/source";

export default async function Layout({ children }: { children: ReactNode }) {
  const githubStars = await getGitHubStars();

  return (
    <>
      {/* Custom remocn chrome owns the only top nav. Static (non-sticky) in
          docs and `fluid` (full-width) so the logo aligns to the left edge of
          the sidebar instead of floating inward at the contained width. */}
      <SiteHeader
        sticky={false}
        fluid
        navLinks={DOCS_NAV}
        githubStars={githubStars}
      />
      <DocsLayout
        tree={source.pageTree}
        {...baseOptions()}
        // Suppress the Fumadocs default top nav so there is no double header —
        // `SiteHeader` above is the single top bar. Verified against
        // fumadocs-ui 16.7 `NavOptions.enabled` (layouts/shared) and the
        // `navEnabled && jsx(slots.header)` guard in layouts/docs/client.
        nav={{ enabled: false }}
        searchToggle={{ enabled: false }}
      >
        {/* `relative isolate` scopes the decorative grid to the content column so
            it sits behind the page body but above the base background — the same
            dotted-grid backdrop used behind the landing hero, for visual
            continuity when crossing from the landing into the docs. */}
        <div className="relative isolate">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[360px] bg-grid-fade"
          />
          {children}
        </div>
      </DocsLayout>
    </>
  );
}
