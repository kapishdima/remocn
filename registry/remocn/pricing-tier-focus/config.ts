import { type ComponentConfig, FPS, H, W } from "@/lib/customizer-config";

export const pricingTierFocusConfig: ComponentConfig = {
  componentName: "PricingTierFocus",
  importPath: "@/components/remocn/pricing-tier-focus",
  controls: {
    focusedTier: {
      type: "select",
      default: "1",
      options: ["0", "1", "2"],
      label: "Focused tier",
    },
    accentColor: {
      type: "color",
      default: "#22c55e",
      label: "Accent color",
    },
  },
  durationInFrames: 180,
  fps: FPS,
  compositionWidth: W,
  compositionHeight: H,
};
