import { type ComponentConfig, FPS, H, W } from "@/lib/customizer-config";

export const codeDiffWipeConfig: ComponentConfig = {
  componentName: "CodeDiffWipe",
  importPath: "@/components/remocn/code-diff-wipe",
  controls: {
    language: { type: "text", default: "tsx", label: "Language" },
    background: { type: "color", default: "#0a0a0a", label: "Background" },
    accent: { type: "color", default: "#0ea5e9", label: "Accent" },
    transitionStart: {
      type: "number",
      default: 20,
      min: 0,
      max: 120,
      step: 1,
      label: "Transition start",
    },
    transitionDuration: {
      type: "number",
      default: 60,
      min: 8,
      max: 180,
      step: 1,
      label: "Transition duration",
    },
    showHandle: { type: "boolean", default: true, label: "Show handle" },
  },
  durationInFrames: 120,
  fps: FPS,
  compositionWidth: W,
  compositionHeight: H,
};
