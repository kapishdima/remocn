import { type ComponentConfig, FPS, H, W } from "@/lib/customizer-config";

export const aiGenerationCanvasConfig: ComponentConfig = {
  componentName: "AIGenerationCanvas",
  importPath: "@/components/remocn/ai-generation-canvas",
  controls: {
    prompt: {
      type: "text",
      default: "Generate a dashboard",
      label: "Prompt",
    },
    accentColor: {
      type: "color",
      default: "#7c3aed",
      label: "Accent color",
    },
    cardCount: {
      type: "number",
      default: 4,
      min: 2,
      max: 6,
      step: 1,
      label: "Card count",
    },
  },
  durationInFrames: 180,
  fps: FPS,
  compositionWidth: W,
  compositionHeight: H,
};
