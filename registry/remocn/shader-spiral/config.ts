import { type ComponentConfig, FPS, H, W } from "@/lib/customizer-config";

export const shaderSpiralConfig: ComponentConfig = {
  componentName: "ShaderSpiral",
  importPath: "@/components/remocn/shader-spiral",
  controls: {
    speed: {
      type: "number",
      default: 1,
      min: 0.1,
      max: 4,
      step: 0.1,
      label: "Speed",
    },
    density: {
      type: "number",
      default: 1,
      min: 0.2,
      max: 4,
      step: 0.1,
      label: "Density",
    },
    strokeWidth: {
      type: "number",
      default: 0.5,
      min: 0.05,
      max: 1,
      step: 0.05,
      label: "Stroke",
    },
    softness: {
      type: "number",
      default: 0.2,
      min: 0,
      max: 1,
      step: 0.05,
      label: "Softness",
    },
    colorBack: { type: "color", default: "#12121a", label: "Background" },
  },
  durationInFrames: 150,
  fps: FPS,
  compositionWidth: W,
  compositionHeight: H,
};
