"use client";

import type { Root } from "fumadocs-core/page-tree";
import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { getActiveDocsTab } from "@/lib/docs-tabs";
import { baseOptions } from "@/lib/layout.shared";

/**
 * Renders the Fumadocs `DocsLayout` with the sidebar tree that matches the
 * active docs tab. Both trees are built once on the server (in `app/docs/layout`)
 * and handed down; this client shell only picks between them by pathname, so the
 * Components and Primitives tabs each get their own sidebar without moving any
 * files or changing URLs. The page body arrives as server-rendered `children`,
 * so the RSC boundary stays intact — only the layout chrome is client-rendered.
 *
 * The `DocsLayout` props mirror the previous server layout: the custom
 * `DocsHeader` above owns the only top nav (`nav` disabled), search renders in
 * the sidebar header, and the theme switch / collapse trigger / sidebar footer
 * are suppressed. The decorative grid scopes a dotted backdrop to the content
 * column for visual continuity with the landing hero.
 *
 * `containerProps` pins two layout vars on the DocsLayout grid:
 * - `--fd-layout-width: 1400px` matches the chrome's width (DocsHeader/DocsTabsBar
 *   use 1400; the grid otherwise falls back to 97rem). Unifying them makes the
 *   sidebar's left edge coincide with the chrome's, so the tab bar's tabs line up
 *   exactly with the sidebar at every viewport width.
 * - `--fd-banner-height: 2.75rem` is the sticky `DocsTabsBar` height. fumadocs
 *   derives `--fd-docs-row-1: var(--fd-banner-height, 0px)` and sticks the sidebar/
 *   TOC at `top-(--fd-docs-row-1)`, dropping them just below the pinned tab bar
 *   instead of letting the bar overlap the sidebar top.
 */
export function DocsShell({
  componentsTree,
  primitivesTree,
  children,
}: {
  componentsTree: Root;
  primitivesTree: Root;
  children: ReactNode;
}) {
  const pathname = usePathname();
  const tree =
    getActiveDocsTab(pathname) === "primitives"
      ? primitivesTree
      : componentsTree;

  return (
    <DocsLayout
      tree={tree}
      {...baseOptions()}
      nav={{ enabled: false }}
      searchToggle={{ enabled: true }}
      themeSwitch={{ enabled: false }}
      sidebar={{ collapsible: false }}
      containerProps={{
        className: "[--fd-layout-width:1400px] [--fd-banner-height:2.75rem]",
      }}
    >
      <div className="relative isolate">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[360px] bg-grid-fade"
        />
        {children}
      </div>
    </DocsLayout>
  );
}
