import { type ComponentConfig, FPS, H, W } from "@/lib/customizer-config";

export const boundingBoxSelectorConfig: ComponentConfig = {
  componentName: "BoundingBoxSelector",
  importPath: "@/components/remocn/bounding-box-selector",
  controls: {
    borderColor: { type: "color", default: "#0ea5e9", label: "Border color" },
    handleColor: { type: "color", default: "#0ea5e9", label: "Handle color" },
    borderWidth: {
      type: "number",
      default: 2,
      min: 1,
      max: 8,
      step: 1,
      label: "Border width",
    },
    appearAt: {
      type: "number",
      default: 15,
      min: 0,
      max: 60,
      step: 1,
      label: "Appear at (frame)",
    },
    background: { type: "color", default: "#fafafa", label: "Background" },
  },
  durationInFrames: 90,
  fps: FPS,
  compositionWidth: W,
  compositionHeight: H,
};
