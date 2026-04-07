import { type ComponentConfig, FPS, H, W } from "@/lib/customizer-config";

export const morphingModalConfig: ComponentConfig = {
  componentName: "MorphingModal",
  importPath: "@/components/remocn/morphing-modal",
  controls: {
    morphAt: {
      type: "number",
      default: 30,
      min: 0,
      max: 240,
      step: 1,
      label: "Morph at (frame)",
    },
    borderRadiusFrom: {
      type: "number",
      default: 24,
      min: 0,
      max: 80,
      step: 1,
      label: "Radius from",
    },
    borderRadiusTo: {
      type: "number",
      default: 0,
      min: 0,
      max: 80,
      step: 1,
      label: "Radius to",
    },
    sourceTitle: {
      type: "text",
      default: "Compose video",
      label: "Source title",
    },
    sourceBody: {
      type: "text",
      default: "Click to start a new project",
      label: "Source body",
    },
    modalTitle: { type: "text", default: "New project", label: "Modal title" },
    background: { type: "color", default: "#050505", label: "Background" },
    cardColor: { type: "color", default: "#0a0a0a", label: "Card color" },
    textColor: { type: "color", default: "#fafafa", label: "Text color" },
    mutedColor: { type: "color", default: "#71717a", label: "Muted color" },
  },
  durationInFrames: 180,
  fps: FPS,
  compositionWidth: W,
  compositionHeight: H,
};
