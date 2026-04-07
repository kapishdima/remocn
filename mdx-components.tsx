import defaultMdxComponents from "fumadocs-ui/mdx";
import type { MDXComponents } from "mdx/types";
import { ComponentPreview } from "@/components/docs/component-preview";
import { InstallBlock } from "@/components/docs/install-block";
import { PropsTable } from "@/components/docs/props-table";

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    ComponentPreview,
    InstallBlock,
    PropsTable,
    ...components,
  };
}
