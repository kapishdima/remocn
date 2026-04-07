"use client";

import { Player } from "@remotion/player";
import { useMemo, useState } from "react";
import { BlurReveal } from "@/components/remocn/blur-reveal";
import { componentConfigs, getDefaults } from "@/lib/customizer-config";
import { cn } from "@/lib/utils";
import { ComponentCustomizer } from "./component-customizer";

const registry: Record<string, React.ComponentType<any>> = {
  "blur-reveal": BlurReveal,
};

export function ComponentPreview({ name }: { name: string }) {
  const config = componentConfigs[name];
  const Component = registry[name];
  const initialValues = useMemo(
    () => (config ? getDefaults(config.controls) : {}),
    [config],
  );
  const [values, setValues] = useState<Record<string, unknown>>(initialValues);
  const [tab, setTab] = useState<"preview" | "code">("preview");

  if (!config || !Component) {
    return (
      <div className="not-prose my-6 rounded-lg border border-fd-border p-4 text-sm text-fd-muted-foreground">
        Unknown component: <code>{name}</code>
      </div>
    );
  }

  const inputProps = values;

  return (
    <div className="not-prose my-6 overflow-hidden rounded-xl border border-fd-border bg-fd-card">
      <div className="flex items-center gap-1 border-b border-fd-border px-3 py-2">
        {(["preview", "code"] as const).map((t) => (
          <button
            type="button"
            key={t}
            onClick={() => setTab(t)}
            className={cn(
              "rounded-md px-3 py-1 text-xs font-medium capitalize transition-colors",
              tab === t
                ? "bg-fd-accent text-fd-accent-foreground"
                : "text-fd-muted-foreground hover:text-fd-foreground",
            )}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "preview" ? (
        <div className="grid gap-0 md:grid-cols-[1fr_280px]">
          <div className="flex items-center justify-center bg-fd-muted/30 p-6">
            <div className="aspect-video w-full max-w-2xl overflow-hidden rounded-lg border border-fd-border bg-white shadow-sm">
              <Player
                component={Component}
                inputProps={inputProps}
                durationInFrames={config.durationInFrames}
                fps={config.fps}
                compositionWidth={config.compositionWidth}
                compositionHeight={config.compositionHeight}
                style={{ width: "100%", height: "100%" }}
                controls
                loop
                autoPlay
                acknowledgeRemotionLicense
              />
            </div>
          </div>
          <div className="border-t border-fd-border md:border-l md:border-t-0">
            <ComponentCustomizer
              controls={config.controls}
              values={values}
              onChange={(key, value) =>
                setValues((prev) => ({ ...prev, [key]: value }))
              }
            />
          </div>
        </div>
      ) : (
        <pre className="overflow-x-auto bg-fd-muted/30 p-5 text-xs leading-relaxed">
          <code>{generateCode(name, inputProps)}</code>
        </pre>
      )}
    </div>
  );
}

function generateCode(name: string, props: Record<string, unknown>) {
  const componentName = name
    .split("-")
    .map((s) => s[0].toUpperCase() + s.slice(1))
    .join("");
  const propsString = Object.entries(props)
    .map(([k, v]) => {
      if (typeof v === "string") return `  ${k}="${v}"`;
      return `  ${k}={${JSON.stringify(v)}}`;
    })
    .join("\n");
  return `<${componentName}\n${propsString}\n/>`;
}
