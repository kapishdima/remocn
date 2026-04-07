import {
  type ComponentConfig,
  FONT_WEIGHT_OPTIONS,
  FPS,
  H,
  W,
} from "@/lib/customizer-config";

export const rgbGlitchTextConfig: ComponentConfig = {
  componentName: "RGBGlitchText",
  importPath: "@/components/remocn/rgb-glitch-text",
  controls: {
    text: { type: "text", default: "GLITCH", label: "Text" },
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
    glitchAt: {
      type: "number",
      default: 20,
      min: 0,
      max: 120,
      step: 1,
      label: "Glitch at (frame)",
    },
    glitchDuration: {
      type: "number",
      default: 8,
      min: 1,
      max: 60,
      step: 1,
      label: "Glitch duration",
    },
    intensity: {
      type: "number",
      default: 6,
      min: 0,
      max: 30,
      step: 1,
      label: "Intensity (px)",
    },
    seed: { type: "text", default: "glitch", label: "Seed" },
  },
  durationInFrames: 90,
  fps: FPS,
  compositionWidth: W,
  compositionHeight: H,
};
