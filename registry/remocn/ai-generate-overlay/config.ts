import { type ComponentConfig, FPS, H, W } from "@/lib/customizer-config";

export const aiGenerateOverlayConfig: ComponentConfig = {
  componentName: "AIGenerateOverlay",
  importPath: "@/components/remocn/ai-generate-overlay",
  controls: {
    maxBlur: {
      type: "number",
      default: 20,
      min: 0,
      max: 40,
      step: 1,
      label: "Max blur (px)",
    },
    blurStartFrame: {
      type: "number",
      default: 20,
      min: 0,
      max: 120,
      step: 1,
      label: "Blur start (frame)",
    },
    blurPeakFrame: {
      type: "number",
      default: 40,
      min: 0,
      max: 160,
      step: 1,
      label: "Blur peak (frame)",
    },
    revealStartFrame: {
      type: "number",
      default: 110,
      min: 30,
      max: 160,
      step: 1,
      label: "Reveal start (frame)",
    },
    pillText: {
      type: "text",
      default: "Generating…",
      label: "Pill text",
    },
    accent: {
      type: "color",
      default: "#a78bfa",
      label: "Accent color",
    },
    background: {
      type: "color",
      default: "#050505",
      label: "Background",
    },
    sourceImageBg: {
      type: "color",
      default: "#8b4513",
      label: "Source image color",
    },
    generatedImageBg: {
      type: "color",
      default: "#1a1410",
      label: "Generated image color",
    },
  },
  durationInFrames: 180,
  fps: FPS,
  compositionWidth: W,
  compositionHeight: H,
};
