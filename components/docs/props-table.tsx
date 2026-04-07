export interface PropDef {
  name: string;
  type: string;
  default?: string;
  description: string;
}

export function PropsTable({ rows }: { rows: PropDef[] }) {
  return (
    <div className="not-prose my-6 overflow-x-auto rounded-lg border border-fd-border">
      <table className="w-full border-collapse text-sm">
        <thead className="bg-fd-muted/40">
          <tr>
            <th className="px-4 py-2.5 text-left font-medium text-fd-foreground">
              Prop
            </th>
            <th className="px-4 py-2.5 text-left font-medium text-fd-foreground">
              Type
            </th>
            <th className="px-4 py-2.5 text-left font-medium text-fd-foreground">
              Default
            </th>
            <th className="px-4 py-2.5 text-left font-medium text-fd-foreground">
              Description
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.name} className="border-t border-fd-border align-top">
              <td className="px-4 py-2.5 font-mono text-xs text-fd-foreground">
                {row.name}
              </td>
              <td className="px-4 py-2.5 font-mono text-xs text-fd-muted-foreground">
                {row.type}
              </td>
              <td className="px-4 py-2.5 font-mono text-xs text-fd-muted-foreground">
                {row.default ?? "—"}
              </td>
              <td className="px-4 py-2.5 text-fd-muted-foreground">
                {row.description}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
