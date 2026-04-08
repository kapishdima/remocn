import defaultMdxComponents from "fumadocs-ui/mdx";
import type { MDXComponents } from "mdx/types";
import { Note, Warning } from "@/components/docs/callout";
import { ComponentCardGrid } from "@/components/docs/component-card-grid";
import { ComponentPreview } from "@/components/docs/component-preview";
import { Dependencies } from "@/components/docs/dependencies";
import { InstallBlock } from "@/components/docs/install-block";
import { PropsTable } from "@/components/docs/props-table";

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...(defaultMdxComponents as MDXComponents),
    ComponentPreview,
    InstallBlock,
    PropsTable,
    Note,
    Warning,
    Dependencies,
    ComponentCardGrid,
    ...components,
  };
}
