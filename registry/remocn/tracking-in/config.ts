import {
  type ComponentConfig,
  FONT_WEIGHT_OPTIONS,
  FPS,
  H,
  W,
} from "@/lib/customizer-config";

export const trackingInConfig: ComponentConfig = {
  componentName: "TrackingIn",
  importPath: "@/components/remocn/tracking-in",
  controls: {
    text: { type: "text", default: "tracking in", label: "Text" },
    startTracking: {
      type: "number",
      default: 0.5,
      min: 0,
      max: 2,
      step: 0.05,
      label: "Start tracking (em)",
    },
    startBlur: {
      type: "number",
      default: 12,
      min: 0,
      max: 40,
      step: 1,
      label: "Start blur",
    },
    fontSize: {
      type: "number",
      default: 96,
      min: 12,
      max: 200,
      step: 1,
      label: "Font size",
    },
    color: { type: "color", default: "#171717", label: "Color" },
    fontWeight: {
      type: "select",
      default: "700",
      options: FONT_WEIGHT_OPTIONS,
      label: "Font weight",
    },
  },
  durationInFrames: 90,
  fps: FPS,
  compositionWidth: W,
  compositionHeight: H,
};
