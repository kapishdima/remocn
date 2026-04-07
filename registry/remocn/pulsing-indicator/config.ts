import { type ComponentConfig, FPS, H, W } from "@/lib/customizer-config";

export const pulsingIndicatorConfig: ComponentConfig = {
  componentName: "PulsingIndicator",
  importPath: "@/components/remocn/pulsing-indicator",
  controls: {
    color: { type: "color", default: "#22c55e", label: "Color" },
    size: {
      type: "number",
      default: 32,
      min: 8,
      max: 120,
      step: 1,
      label: "Size",
    },
    period: {
      type: "number",
      default: 8,
      min: 1,
      max: 30,
      step: 0.5,
      label: "Period (frames)",
    },
    background: { type: "color", default: "#ffffff", label: "Background" },
  },
  durationInFrames: 120,
  fps: FPS,
  compositionWidth: W,
  compositionHeight: H,
};
