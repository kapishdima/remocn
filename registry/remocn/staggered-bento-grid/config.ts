import { type ComponentConfig, FPS, H, W } from "@/lib/customizer-config";

export const staggeredBentoGridConfig: ComponentConfig = {
  componentName: "StaggeredBentoGrid",
  importPath: "@/components/remocn/staggered-bento-grid",
  controls: {
    staggerDelay: {
      type: "number",
      default: 8,
      min: 1,
      max: 30,
      step: 1,
      label: "Stagger delay",
    },
    columns: {
      type: "number",
      default: 3,
      min: 2,
      max: 5,
      step: 1,
      label: "Columns",
    },
    background: { type: "color", default: "#0a0a0a", label: "Background" },
    cardColor: { type: "color", default: "#1a1a1a", label: "Card color" },
    textColor: { type: "color", default: "#ffffff", label: "Text color" },
  },
  durationInFrames: 120,
  fps: FPS,
  compositionWidth: W,
  compositionHeight: H,
};
