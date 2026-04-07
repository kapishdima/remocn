import {
  type ComponentConfig,
  FONT_WEIGHT_OPTIONS,
  FPS,
  H,
  W,
} from "@/lib/customizer-config";

export const textFadeReplaceConfig: ComponentConfig = {
  componentName: "TextFadeReplace",
  importPath: "@/components/remocn/text-fade-replace",
  controls: {
    from: { type: "text", default: "Loading...", label: "From" },
    to: { type: "text", default: "Ready!", label: "To" },
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
