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
      {children}
    </DocsLayout>
  );
}
