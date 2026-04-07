"use client";

import type { ControlConfig } from "@/lib/customizer-config";

export function ComponentCustomizer({
  controls,
  values,
  onChange,
}: {
  controls: ControlConfig;
  values: Record<string, unknown>;
  onChange: (key: string, value: unknown) => void;
}) {
  return (
    <div className="flex flex-col gap-4 p-5">
      {Object.entries(controls).map(([key, ctrl]) => (
        <div key={key} className="flex flex-col gap-1.5">
          <label
            htmlFor={`ctrl-${key}`}
            className="text-xs font-medium text-fd-muted-foreground"
          >
            {ctrl.label}
          </label>

          {ctrl.type === "text" && (
            <input
              id={`ctrl-${key}`}
              type="text"
              value={values[key] as string}
              onChange={(e) => onChange(key, e.target.value)}
              className="rounded-md border border-fd-border bg-fd-background px-3 py-1.5 text-sm focus:border-fd-ring focus:outline-none"
            />
          )}

          {ctrl.type === "number" && (
            <div className="flex items-center gap-3">
              <input
                id={`ctrl-${key}`}
                type="range"
                min={ctrl.min}
                max={ctrl.max}
                step={ctrl.step}
                value={values[key] as number}
                onChange={(e) => onChange(key, Number(e.target.value))}
                className="flex-1 accent-fd-foreground"
              />
              <span className="w-10 text-right font-mono text-xs text-fd-muted-foreground">
                {values[key] as number}
              </span>
            </div>
          )}

          {ctrl.type === "color" && (
            <div className="flex items-center gap-2">
              <input
                id={`ctrl-${key}`}
                type="color"
                value={values[key] as string}
                onChange={(e) => onChange(key, e.target.value)}
                className="size-8 cursor-pointer rounded-md border border-fd-border bg-transparent"
              />
              <span className="font-mono text-xs text-fd-muted-foreground">
                {values[key] as string}
              </span>
            </div>
          )}

          {ctrl.type === "select" && (
            <select
              id={`ctrl-${key}`}
              value={values[key] as string}
              onChange={(e) => onChange(key, e.target.value)}
              className="rounded-md border border-fd-border bg-fd-background px-3 py-1.5 text-sm focus:border-fd-ring focus:outline-none"
            >
              {ctrl.options.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          )}

          {ctrl.type === "boolean" && (
            <input
              id={`ctrl-${key}`}
              type="checkbox"
              checked={values[key] as boolean}
              onChange={(e) => onChange(key, e.target.checked)}
              className="size-4 accent-fd-foreground"
            />
          )}
        </div>
      ))}
    </div>
  );
}
