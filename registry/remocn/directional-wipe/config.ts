import { type ComponentConfig, FPS, H, W } from "@/lib/customizer-config";

export const directionalWipeConfig: ComponentConfig = {
  componentName: "DirectionalWipe",
  importPath: "@/components/remocn/directional-wipe",
  controls: {
    direction: {
      type: "select",
      default: "left",
      options: ["left", "right", "up", "down"],
      label: "Direction",
    },
    transitionDuration: {
      type: "number",
      default: 20,
      min: 4,
      max: 60,
      step: 1,
      label: "Transition duration",
    },
  },
  durationInFrames: 90,
  fps: FPS,
  compositionWidth: W,
  compositionHeight: H,
};
