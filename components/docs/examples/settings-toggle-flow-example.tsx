"use client";

import { SettingsToggleFlow } from "@/registry/remocn-ui/settings-toggle-flow";

/**
 * Fixed lifecycle demo for the `settings-toggle-flow` block: a cursor walks a
 * settings panel — flipping a Switch, opening a Select and choosing an option,
 * then dragging a Slider — ending on a "Settings saved" Toast. The block is a
 * pure orchestrator; every channel comes from a composed primitive's hook.
 *
 * Timeline (US-B005 beat table): switch click 24 ≡ switch on 24; select click 55
 * ≡ panel open 55; item click 80 ≡ select 80; panel close 90; slider drag
 * 105→150 (dual-channel value + thumb); toast enter 155 → dismiss 215.
 * durationInFrames 225 (215 + ~10 settle).
 */
export const SettingsToggleFlowExampleScene = () => <SettingsToggleFlow />;

export const settingsToggleFlowExampleCode = (): string => {
  return `import { SettingsToggleFlow } from "@/components/remocn/settings-toggle-flow";

export const Scene = () => <SettingsToggleFlow />;`;
};
