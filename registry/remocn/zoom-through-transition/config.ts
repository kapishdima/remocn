import { type ComponentConfig, FPS, H, W } from "@/lib/customizer-config";

export const zoomThroughTransitionConfig: ComponentConfig = {
  componentName: "ZoomThroughTransition",
  importPath: "@/components/remocn/zoom-through-transition",
  controls: {
    targetScale: {
      type: "number",
      default: 20,
      min: 2,
      max: 60,
      step: 1,
      label: "Target scale",
    },
    background: { type: "color", default: "#ffffff", label: "Background" },
  },
  durationInFrames: 60,
  fps: FPS,
  compositionWidth: W,
  compositionHeight: H,
};
