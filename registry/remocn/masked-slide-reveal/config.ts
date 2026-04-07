import {
  type ComponentConfig,
  FONT_WEIGHT_OPTIONS,
  FPS,
  H,
  W,
} from "@/lib/customizer-config";

export const maskedSlideRevealConfig: ComponentConfig = {
  componentName: "MaskedSlideReveal",
  importPath: "@/components/remocn/masked-slide-reveal",
  controls: {
    text: { type: "text", default: "Reveal from the mask", label: "Text" },
    staggerDelay: {
      type: "number",
      default: 3,
      min: 0,
      max: 30,
      step: 1,
      label: "Stagger delay",
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
