"use client";

import { useRemocnTheme } from "@/lib/remocn-ui";
import { Stepper } from "@/registry/remocn-ui/stepper";

export interface StepperPreviewProps {
  activeIndex?: number;
  mode?: "light" | "dark";
}

/** Fixed demo steps for the customizer preview. */
const DEMO_STEPS = ["Account", "Plan", "Done"];

/**
 * Preview-only wrapper for the customizer. The shipped `Stepper` is a wide,
 * placement-agnostic horizontal element; the customizer Player renders its
 * `component` as the composition root, so this thin wrapper centers it on a
 * theme-background stage and supplies a fixed demo `steps` set. NOT shipped: not
 * listed in registry.json files.
 */
export function StepperPreview({ activeIndex = 1, mode }: StepperPreviewProps) {
  const theme = useRemocnTheme(undefined, mode);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: theme.background,
      }}
    >
      <Stepper steps={DEMO_STEPS} activeIndex={activeIndex} mode={mode} />
    </div>
  );
}
