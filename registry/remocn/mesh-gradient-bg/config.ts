import { type ComponentConfig, FPS, H, W } from "@/lib/customizer-config";

export const meshGradientBgConfig: ComponentConfig = {
  componentName: "MeshGradientBg",
  importPath: "@/components/remocn/mesh-gradient-bg",
  controls: {
    speed: {
      type: "number",
      default: 1,
      min: 0.1,
      max: 4,
      step: 0.1,
      label: "Speed",
    },
    blur: {
      type: "number",
      default: 80,
      min: 20,
      max: 200,
      step: 4,
      label: "Blur",
    },
    background: { type: "color", default: "#0a0a0a", label: "Background" },
  },
  durationInFrames: 150,
  fps: FPS,
  compositionWidth: W,
  compositionHeight: H,
};
