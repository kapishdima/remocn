import { type ComponentConfig, FPS, H, W } from "@/lib/customizer-config";

export const spatialPushConfig: ComponentConfig = {
  componentName: "SpatialPush",
  importPath: "@/components/remocn/spatial-push",
  controls: {
    direction: {
      type: "select",
      default: "up",
      options: ["up", "down", "left", "right"],
      label: "Direction",
    },
    transitionDuration: {
      type: "number",
      default: 30,
      min: 10,
      max: 80,
      step: 1,
      label: "Transition duration",
    },
  },
  durationInFrames: 90,
  fps: FPS,
  compositionWidth: W,
  compositionHeight: H,
};
