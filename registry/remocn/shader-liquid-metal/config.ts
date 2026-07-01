import { type ComponentConfig, FPS, H, W } from "@/lib/customizer-config";

export const shaderLiquidMetalConfig: ComponentConfig = {
  componentName: "ShaderLiquidMetal",
  importPath: "@/components/remocn/shader-liquid-metal",
  controls: {
    speed: {
      type: "number",
      default: 1,
      min: 0.1,
      max: 4,
      step: 0.1,
      label: "Speed",
    },
    distortion: {
      type: "number",
      default: 0.1,
      min: 0,
      max: 0.5,
      step: 0.01,
      label: "Distortion",
    },
    repetition: {
      type: "number",
      default: 1.5,
      min: 1,
      max: 6,
      step: 0.5,
      label: "Repetition",
    },
    contour: {
      type: "number",
      default: 0.4,
      min: 0,
      max: 1,
      step: 0.05,
      label: "Contour",
    },
    colorBack: { type: "color", default: "#2a2a30", label: "Background" },
    colorTint: { type: "color", default: "#8a8a95", label: "Tint" },
  },
  durationInFrames: 150,
  fps: FPS,
  compositionWidth: W,
  compositionHeight: H,
};
