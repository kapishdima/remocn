import { type ComponentConfig, FPS, H, W } from "@/lib/customizer-config";

export const swipeTransitionWipeConfig: ComponentConfig = {
  componentName: "SwipeTransitionWipe",
  importPath: "@/components/remocn/swipe-transition-wipe",
  controls: {
    direction: {
      type: "select",
      default: "left",
      options: ["left", "right"],
      label: "Direction",
    },
    swipeAt: {
      type: "number",
      default: 30,
      min: 0,
      max: 120,
      step: 1,
      label: "Swipe at (frame)",
    },
    parallaxFactor: {
      type: "number",
      default: 0.6,
      min: 0,
      max: 1,
      step: 0.05,
      label: "Parallax factor",
    },
    dimStrength: {
      type: "number",
      default: 0.4,
      min: 0,
      max: 1,
      step: 0.05,
      label: "Dim strength",
    },
    labelA: {
      type: "text",
      default: "First",
      label: "Label A",
    },
    labelB: {
      type: "text",
      default: "Second",
      label: "Label B",
    },
    colorA1: {
      type: "color",
      default: "#0ea5e9",
      label: "Color A1",
    },
    colorA2: {
      type: "color",
      default: "#1e3a8a",
      label: "Color A2",
    },
    colorB1: {
      type: "color",
      default: "#f97316",
      label: "Color B1",
    },
    colorB2: {
      type: "color",
      default: "#9333ea",
      label: "Color B2",
    },
    background: {
      type: "color",
      default: "#050505",
      label: "Background",
    },
  },
  durationInFrames: 180,
  fps: FPS,
  compositionWidth: W,
  compositionHeight: H,
};
