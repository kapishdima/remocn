"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
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
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {Object.entries(controls).map(([key, ctrl]) => {
        const id = `ctrl-${key}`;
        return (
          <div key={key} className="flex flex-col gap-2">
            <div className="flex items-center justify-between gap-2">
              <Label
                htmlFor={id}
                className="text-xs font-medium text-fd-muted-foreground"
              >
                {ctrl.label}
              </Label>
              {ctrl.type === "number" && (
                <span className="font-mono text-xs tabular-nums text-fd-muted-foreground">
                  {values[key] as number}
                </span>
              )}
              {ctrl.type === "color" && (
                <span className="font-mono text-xs uppercase text-fd-muted-foreground">
                  {values[key] as string}
                </span>
              )}
            </div>

            {ctrl.type === "text" && (
              <Input
                id={id}
                type="text"
                value={values[key] as string}
                onChange={(e) => onChange(key, e.target.value)}
              />
            )}

            {ctrl.type === "number" && (
              <Slider
                id={id}
                min={ctrl.min}
                max={ctrl.max}
                step={ctrl.step}
                value={values[key] as number}
                onValueChange={(v) => onChange(key, v)}
              />
            )}

            {ctrl.type === "color" && (
              <div className="flex items-center gap-2">
                <input
                  id={id}
                  type="color"
                  value={values[key] as string}
                  onChange={(e) => onChange(key, e.target.value)}
                  className="size-9 shrink-0 cursor-pointer rounded-md border border-fd-border bg-transparent p-0.5"
                />
                <Input
                  type="text"
                  value={values[key] as string}
                  onChange={(e) => onChange(key, e.target.value)}
                  className="font-mono text-xs"
                />
              </div>
            )}

            {ctrl.type === "select" && (
              <Select
                value={values[key] as string}
                onValueChange={(v) => onChange(key, v as string)}
              >
                <SelectTrigger id={id} className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {ctrl.options.map((opt) => (
                    <SelectItem key={opt} value={opt}>
                      {opt}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}

            {ctrl.type === "boolean" && (
              <Switch
                id={id}
                checked={values[key] as boolean}
                onCheckedChange={(checked) => onChange(key, checked)}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
