import {
  type ComponentConfig,
  FONT_WEIGHT_OPTIONS,
  FPS,
  H,
  W,
} from "@/lib/customizer-config";

export const inlineHighlightConfig: ComponentConfig = {
  componentName: "InlineHighlight",
  importPath: "@/components/remocn/inline-highlight",
  controls: {
    before: { type: "text", default: "Ship faster with ", label: "Before" },
    highlight: { type: "text", default: "remocn", label: "Highlight" },
    after: { type: "text", default: ".", label: "After" },
    baseColor: { type: "color", default: "#171717", label: "Base color" },
    highlightColor: {
      type: "color",
      default: "#ff5e3a",
      label: "Highlight color",
    },
    fontSize: {
      type: "number",
      default: 72,
      min: 12,
      max: 160,
      step: 1,
      label: "Font size",
    },
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
