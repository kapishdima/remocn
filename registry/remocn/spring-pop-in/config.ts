import { type ComponentConfig, FPS, H, W } from "@/lib/customizer-config";

export const springPopInConfig: ComponentConfig = {
  componentName: "SpringPopIn",
  importPath: "@/components/remocn/spring-pop-in",
  controls: {
    damping: {
      type: "number",
      default: 12,
      min: 1,
      max: 40,
      step: 1,
      label: "Damping",
    },
    mass: {
      type: "number",
      default: 1,
      min: 0.1,
      max: 5,
      step: 0.1,
      label: "Mass",
    },
    stiffness: {
      type: "number",
      default: 100,
      min: 10,
      max: 400,
      step: 5,
      label: "Stiffness",
    },
    delayInFrames: {
      type: "number",
      default: 0,
      min: 0,
      max: 60,
      step: 1,
      label: "Delay (frames)",
    },
  },
  durationInFrames: 60,
  fps: FPS,
  compositionWidth: W,
  compositionHeight: H,
};
