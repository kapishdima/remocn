import { type ComponentConfig, FPS, H, W } from "@/lib/customizer-config";

export const frostedGlassWipeConfig: ComponentConfig = {
  componentName: "FrostedGlassWipe",
  importPath: "@/components/remocn/frosted-glass-wipe",
  controls: {
    transitionDuration: {
      type: "number",
      default: 30,
      min: 10,
      max: 90,
      step: 1,
      label: "Transition duration",
    },
    glassBlur: {
      type: "number",
      default: 24,
      min: 4,
      max: 48,
      step: 1,
      label: "Glass blur (px)",
    },
  },
  durationInFrames: 90,
  fps: FPS,
  compositionWidth: W,
  compositionHeight: H,
};
