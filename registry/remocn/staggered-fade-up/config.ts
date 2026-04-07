import {
  type ComponentConfig,
  FONT_WEIGHT_OPTIONS,
  FPS,
  H,
  W,
} from "@/lib/customizer-config";

export const staggeredFadeUpConfig: ComponentConfig = {
  componentName: "StaggeredFadeUp",
  importPath: "@/components/remocn/staggered-fade-up",
  controls: {
    text: { type: "text", default: "Ship faster with remocn", label: "Text" },
    staggerDelay: {
      type: "number",
      default: 4,
      min: 0,
      max: 30,
      step: 1,
      label: "Stagger delay",
    },
    distance: {
      type: "number",
      default: 20,
      min: 0,
      max: 120,
      step: 1,
      label: "Distance",
    },
    fontSize: {
      type: "number",
      default: 72,
      min: 12,
      max: 160,
      step: 1,
      label: "Font size",
    },
    color: { type: "color", default: "#171717", label: "Color" },
    fontWeight: {
      type: "select",
      default: "600",
      options: FONT_WEIGHT_OPTIONS,
      label: "Font weight",
    },
  },
  durationInFrames: 90,
  fps: FPS,
  compositionWidth: W,
  compositionHeight: H,
};
