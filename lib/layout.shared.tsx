import Image from "next/image";
import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <span className="flex items-center gap-2 font-semibold tracking-tight">
          <Image src="/logo.svg" alt="remocn logo" width={20} height={20} />
          remocn
        </span>
      ),
    },
    githubUrl: "https://github.com/remocn/remocn",
    links: [
      {
        text: "Documentation",
        url: "/docs/getting-started/introduction",
        active: "nested-url",
      },
    ],
  };
}
