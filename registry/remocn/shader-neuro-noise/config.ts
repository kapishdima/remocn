import { type ComponentConfig, FPS, H, W } from "@/lib/customizer-config";

export const shaderNeuroNoiseConfig: ComponentConfig = {
  componentName: "ShaderNeuroNoise",
  importPath: "@/components/remocn/shader-neuro-noise",
  controls: {
    speed: {
      type: "number",
      default: 1,
      min: 0.1,
      max: 4,
      step: 0.1,
      label: "Speed",
    },
    brightness: {
      type: "number",
      default: 0.05,
      min: 0,
      max: 1,
      step: 0.05,
      label: "Brightness",
    },
    contrast: {
      type: "number",
      default: 0.3,
      min: 0,
      max: 1,
      step: 0.05,
      label: "Contrast",
    },
    colorBack: { type: "color", default: "#12121a", label: "Background" },
    colorMid: { type: "color", default: "#4a4a68", label: "Mid" },
  },
  durationInFrames: 150,
  fps: FPS,
  compositionWidth: W,
  compositionHeight: H,
};
