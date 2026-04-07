export function Dependencies({ items }: { items: string[] }) {
  if (items.length === 0) return null;
  return (
    <div className="not-prose my-4 flex max-w-3xl flex-wrap items-center gap-2">
      <span className="text-xs font-medium text-muted-foreground">
        Requires
      </span>
      {items.map((item) => (
        <code
          key={item}
          className="rounded-md bg-muted px-2 py-0.5 font-mono text-xs text-foreground"
        >
          {item}
        </code>
      ))}
    </div>
  );
}
