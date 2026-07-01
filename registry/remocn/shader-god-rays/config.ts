import { type ComponentConfig, FPS, H, W } from "@/lib/customizer-config";

export const shaderGodRaysConfig: ComponentConfig = {
  componentName: "ShaderGodRays",
  importPath: "@/components/remocn/shader-god-rays",
  controls: {
    speed: {
      type: "number",
      default: 1,
      min: 0.1,
      max: 4,
      step: 0.1,
      label: "Speed",
    },
    intensity: {
      type: "number",
      default: 0.8,
      min: 0,
      max: 2,
      step: 0.05,
      label: "Intensity",
    },
    density: {
      type: "number",
      default: 0.3,
      min: 0,
      max: 1,
      step: 0.05,
      label: "Density",
    },
    bloom: {
      type: "number",
      default: 0.4,
      min: 0,
      max: 1,
      step: 0.05,
      label: "Bloom",
    },
    colorBack: { type: "color", default: "#12121a", label: "Background" },
  },
  durationInFrames: 150,
  fps: FPS,
  compositionWidth: W,
  compositionHeight: H,
};
