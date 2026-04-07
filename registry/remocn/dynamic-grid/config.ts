import { type ComponentConfig, FPS, H, W } from "@/lib/customizer-config";

export const dynamicGridConfig: ComponentConfig = {
  componentName: "DynamicGrid",
  importPath: "@/components/remocn/dynamic-grid",
  controls: {
    cellSize: {
      type: "number",
      default: 40,
      min: 8,
      max: 160,
      step: 4,
      label: "Cell size",
    },
    lineColor: { type: "color", default: "#27272a", label: "Line color" },
    background: { type: "color", default: "#0a0a0a", label: "Background" },
    speed: {
      type: "number",
      default: 0.5,
      min: 0,
      max: 4,
      step: 0.1,
      label: "Speed",
    },
    direction: {
      type: "select",
      default: "diagonal",
      options: ["diagonal", "horizontal", "vertical"],
      label: "Direction",
    },
  },
  durationInFrames: 150,
  fps: FPS,
  compositionWidth: W,
  compositionHeight: H,
};
