import { DocsLayout } from "fumadocs-ui/layouts/docs";
import type { ReactNode } from "react";
import { baseOptions } from "@/lib/layout.shared";
import { source } from "@/source";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout
      tree={source.pageTree}
      {...baseOptions()}
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
  );
}
