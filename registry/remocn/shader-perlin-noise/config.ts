import { type ComponentConfig, FPS, H, W } from "@/lib/customizer-config";

export const shaderPerlinNoiseConfig: ComponentConfig = {
  componentName: "ShaderPerlinNoise",
  importPath: "@/components/remocn/shader-perlin-noise",
  controls: {
    speed: {
      type: "number",
      default: 1,
      min: 0.1,
      max: 4,
      step: 0.1,
      label: "Speed",
    },
    proportion: {
      type: "number",
      default: 0.35,
      min: 0,
      max: 1,
      step: 0.05,
      label: "Proportion",
    },
    softness: {
      type: "number",
      default: 0.1,
      min: 0,
      max: 1,
      step: 0.05,
      label: "Softness",
    },
    colorBack: { type: "color", default: "#12121a", label: "Background" },
    colorFront: { type: "color", default: "#6a6a85", label: "Front" },
  },
  durationInFrames: 150,
  fps: FPS,
  compositionWidth: W,
  compositionHeight: H,
};
