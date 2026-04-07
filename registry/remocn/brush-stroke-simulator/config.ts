import { type ComponentConfig, FPS, H, W } from "@/lib/customizer-config";

export const brushStrokeSimulatorConfig: ComponentConfig = {
  componentName: "BrushStrokeSimulator",
  importPath: "@/components/remocn/brush-stroke-simulator",
  controls: {
    brushSize: {
      type: "number",
      default: 70,
      min: 20,
      max: 200,
      step: 2,
      label: "Brush size",
    },
    cursorColor: {
      type: "color",
      default: "#ffffff",
      label: "Cursor color",
    },
    background: {
      type: "color",
      default: "#0a0a0a",
      label: "Background",
    },
    baseColorA: {
      type: "color",
      default: "#f4a261",
      label: "Base highlight",
    },
    baseColorB: {
      type: "color",
      default: "#e76f51",
      label: "Base shadow",
    },
    overlayColor: {
      type: "color",
      default: "#1f1f23",
      label: "Overlay color",
    },
    startFrame: {
      type: "number",
      default: 12,
      min: 0,
      max: 60,
      step: 1,
      label: "Start frame",
    },
    sweepDuration: {
      type: "number",
      default: 150,
      min: 60,
      max: 240,
      step: 5,
      label: "Sweep duration",
    },
  },
  durationInFrames: 180,
  fps: FPS,
  compositionWidth: W,
  compositionHeight: H,
};
