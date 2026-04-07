import {
  type ComponentConfig,
  FONT_WEIGHT_OPTIONS,
  FPS,
  H,
  W,
} from "@/lib/customizer-config";

export const shimmerSweepConfig: ComponentConfig = {
  componentName: "ShimmerSweep",
  importPath: "@/components/remocn/shimmer-sweep",
  controls: {
    text: { type: "text", default: "Generating", label: "Text" },
    baseColor: { type: "color", default: "#3f3f46", label: "Base color" },
    shineColor: { type: "color", default: "#fafafa", label: "Shine color" },
    fontSize: {
      type: "number",
      default: 96,
      min: 12,
      max: 200,
      step: 1,
      label: "Font size",
    },
    fontWeight: {
      type: "select",
      default: "700",
      options: FONT_WEIGHT_OPTIONS,
      label: "Font weight",
    },
  },
  durationInFrames: 120,
  fps: FPS,
  compositionWidth: W,
  compositionHeight: H,
};
