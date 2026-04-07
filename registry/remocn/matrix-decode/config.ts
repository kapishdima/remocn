import {
  type ComponentConfig,
  FONT_WEIGHT_OPTIONS,
  FPS,
  H,
  W,
} from "@/lib/customizer-config";

export const matrixDecodeConfig: ComponentConfig = {
  componentName: "MatrixDecode",
  importPath: "@/components/remocn/matrix-decode",
  controls: {
    text: { type: "text", default: "DECRYPTED", label: "Text" },
    charset: {
      type: "text",
      default: "!@#$%^&*()_+-=<>?/\\|",
      label: "Charset",
    },
    fontSize: {
      type: "number",
      default: 72,
      min: 12,
      max: 160,
      step: 1,
      label: "Font size",
    },
    color: { type: "color", default: "#22c55e", label: "Color" },
    fontWeight: {
      type: "select",
      default: "600",
      options: FONT_WEIGHT_OPTIONS,
      label: "Font weight",
    },
    revealDuration: {
      type: "number",
      default: 60,
      min: 10,
      max: 240,
      step: 1,
      label: "Reveal duration",
    },
  },
  durationInFrames: 90,
  fps: FPS,
  compositionWidth: W,
  compositionHeight: H,
};
