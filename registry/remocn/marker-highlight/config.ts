import {
  type ComponentConfig,
  FONT_WEIGHT_OPTIONS,
  FPS,
  H,
  W,
} from "@/lib/customizer-config";

export const markerHighlightConfig: ComponentConfig = {
  componentName: "MarkerHighlight",
  importPath: "@/components/remocn/marker-highlight",
  controls: {
    before: { type: "text", default: "Made for ", label: "Before" },
    highlight: { type: "text", default: "builders", label: "Highlight" },
    after: { type: "text", default: ".", label: "After" },
    markerColor: { type: "color", default: "#facc15", label: "Marker color" },
    baseColor: { type: "color", default: "#171717", label: "Base color" },
    highlightedTextColor: {
      type: "color",
      default: "#171717",
      label: "Highlighted text color",
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
