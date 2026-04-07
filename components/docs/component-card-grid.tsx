import Link from "next/link";
import { cn } from "@/lib/utils";

export interface CardItem {
  name: string;
  description: string;
  status: "stable" | "soon";
  href?: string;
}

export function ComponentCardGrid({ items }: { items: CardItem[] }) {
  return (
    <div className="not-prose my-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => {
        const card = (
          <article
            className={cn(
              "group/card relative flex h-full flex-col gap-2 rounded-xl bg-muted p-5 transition-colors",
              item.status === "stable" ? "hover:bg-muted/70" : "opacity-60",
            )}
          >
            <div className="flex items-center justify-between gap-2">
              <h3 className="font-mono text-sm font-medium tracking-tight text-foreground">
                {item.name}
              </h3>
              {item.status === "soon" && (
                <span className="rounded bg-foreground/5 px-1.5 py-0.5 font-mono text-[10px] font-medium uppercase tracking-wider text-foreground/60">
                  Soon
                </span>
              )}
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {item.description}
            </p>
          </article>
        );

        if (item.status === "stable" && item.href) {
          return (
            <Link
              key={item.name}
              href={item.href}
              className="block rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
            >
              {card}
            </Link>
          );
        }
        return <div key={item.name}>{card}</div>;
      })}
    </div>
  );
}
