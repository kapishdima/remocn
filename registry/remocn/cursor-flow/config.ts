import { type ComponentConfig, FPS, H, W } from "@/lib/customizer-config";

export const cursorFlowConfig: ComponentConfig = {
  componentName: "CursorFlow",
  importPath: "@/components/remocn/cursor-flow",
  controls: {
    cursorColor: { type: "color", default: "#fafafa", label: "Cursor color" },
    cursorSize: {
      type: "number",
      default: 28,
      min: 12,
      max: 64,
      step: 1,
      label: "Cursor size",
    },
    segmentDuration: {
      type: "number",
      default: 36,
      min: 8,
      max: 120,
      step: 1,
      label: "Segment duration",
    },
    background: { type: "color", default: "#0a0a0a", label: "Background" },
    showTargets: { type: "boolean", default: true, label: "Show targets" },
  },
  durationInFrames: 180,
  fps: FPS,
  compositionWidth: W,
  compositionHeight: H,
};
