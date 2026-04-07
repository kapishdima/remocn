import { type ComponentConfig, FPS, H, W } from "@/lib/customizer-config";

export const gridPixelateWipeConfig: ComponentConfig = {
  componentName: "GridPixelateWipe",
  importPath: "@/components/remocn/grid-pixelate-wipe",
  controls: {
    cols: {
      type: "number",
      default: 12,
      min: 2,
      max: 32,
      step: 1,
      label: "Columns",
    },
    rows: {
      type: "number",
      default: 7,
      min: 2,
      max: 24,
      step: 1,
      label: "Rows",
    },
    pattern: {
      type: "select",
      default: "wave",
      options: ["wave", "diagonal", "spiral"],
      label: "Pattern",
    },
    transitionDuration: {
      type: "number",
      default: 30,
      min: 10,
      max: 90,
      step: 1,
      label: "Transition duration",
    },
    cellFadeFrames: {
      type: "number",
      default: 4,
      min: 1,
      max: 20,
      step: 1,
      label: "Cell fade (frames)",
    },
  },
  durationInFrames: 90,
  fps: FPS,
  compositionWidth: W,
  compositionHeight: H,
};
