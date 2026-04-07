import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
} from "fumadocs-ui/page";
import { notFound } from "next/navigation";
import { getMDXComponents } from "@/mdx-components";
import { source } from "@/source";

export default async function Page(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  const data = page.data as any;
  const MDX = data.body;

  return (
    <DocsPage
      full
      breadcrumb={{ enabled: false }}
      tableOfContent={{ enabled: false }}
      tableOfContentPopover={{ enabled: false }}
      footer={{ enabled: true }}
      editOnGithub={{
        owner: "remocn",
        repo: "remocn",
        sha: "main",
        path: `content/docs/${(params.slug ?? []).join("/") || "index"}.mdx`,
      }}
    >
      <DocsTitle className="text-5xl font-bold tracking-tighter md:text-6xl lg:text-7xl">
        {data.title}
      </DocsTitle>
      <DocsDescription className="mt-0 max-w-3xl text-balance text-lg text-muted-foreground md:text-xl">
        {data.description}
      </DocsDescription>
      <DocsBody>
        <MDX components={getMDXComponents()} />
      </DocsBody>
    </DocsPage>
  );
}

export function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();
  const data = page.data as any;
  return {
    title: data.title,
    description: data.description,
  };
}
