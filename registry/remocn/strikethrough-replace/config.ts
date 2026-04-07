import {
  type ComponentConfig,
  FONT_WEIGHT_OPTIONS,
  FPS,
  H,
  W,
} from "@/lib/customizer-config";

export const strikethroughReplaceConfig: ComponentConfig = {
  componentName: "StrikethroughReplace",
  importPath: "@/components/remocn/strikethrough-replace",
  controls: {
    from: { type: "text", default: "$49/mo", label: "From" },
    to: { type: "text", default: "Free", label: "To" },
    lineColor: { type: "color", default: "#ff5e3a", label: "Line color" },
    fontSize: {
      type: "number",
      default: 96,
      min: 12,
      max: 160,
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
  durationInFrames: 120,
  fps: FPS,
  compositionWidth: W,
  compositionHeight: H,
};
