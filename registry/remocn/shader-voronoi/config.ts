import { type ComponentConfig, FPS, H, W } from "@/lib/customizer-config";

export const shaderVoronoiConfig: ComponentConfig = {
  componentName: "ShaderVoronoi",
  importPath: "@/components/remocn/shader-voronoi",
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
      default: 0.4,
      min: 0,
      max: 1,
      step: 0.05,
      label: "Distortion",
    },
    gap: {
      type: "number",
      default: 0.04,
      min: 0,
      max: 0.2,
      step: 0.01,
      label: "Gap",
    },
    glow: {
      type: "number",
      default: 0,
      min: 0,
      max: 1,
      step: 0.05,
      label: "Glow",
    },
    colorGap: { type: "color", default: "#12121a", label: "Gap Color" },
  },
  durationInFrames: 150,
  fps: FPS,
  compositionWidth: W,
  compositionHeight: H,
};
