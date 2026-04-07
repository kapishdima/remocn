import { type ComponentConfig, FPS, H, W } from "@/lib/customizer-config";

export const chromaticAberrationWipeConfig: ComponentConfig = {
  componentName: "ChromaticAberrationWipe",
  importPath: "@/components/remocn/chromatic-aberration-wipe",
  controls: {
    direction: {
      type: "select",
      default: "left",
      options: ["left", "right"],
      label: "Direction",
    },
    transitionDuration: {
      type: "number",
      default: 7,
      min: 4,
      max: 16,
      step: 1,
      label: "Transition duration",
    },
    aberrationOffset: {
      type: "number",
      default: 8,
      min: 2,
      max: 24,
      step: 1,
      label: "Aberration offset (px)",
    },
  },
  durationInFrames: 90,
  fps: FPS,
  compositionWidth: W,
  compositionHeight: H,
};
