import { CopyButton } from "./copy-button";

export function InstallBlock({ name }: { name: string }) {
  const command = `npx shadcn@latest add remocn/${name}`;

  return (
    <div className="not-prose my-6 flex items-center justify-between gap-3 rounded-lg border border-fd-border bg-fd-card px-4 py-2.5 font-mono text-sm">
      <code className="truncate text-fd-foreground">{command}</code>
      <CopyButton value={command} />
    </div>
  );
}
