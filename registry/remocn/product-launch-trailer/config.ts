import { type ComponentConfig, FPS, H, W } from "@/lib/customizer-config";

export const productLaunchTrailerConfig: ComponentConfig = {
  componentName: "ProductLaunchTrailer",
  importPath: "@/components/remocn/product-launch-trailer",
  controls: {
    logoLabel: { type: "text", default: "R", label: "Logo label" },
    productName: { type: "text", default: "Remocn", label: "Product name" },
    versionLabel: {
      type: "text",
      default: "v1.0 is live",
      label: "Version label",
    },
    accentPeach: { type: "color", default: "#FFB38E", label: "Accent peach" },
    accentLavender: {
      type: "color",
      default: "#D4B3FF",
      label: "Accent lavender",
    },
    accentMint: { type: "color", default: "#A1EEBD", label: "Accent mint" },
    background: { type: "color", default: "#141318", label: "Background" },
  },
  durationInFrames: 240,
  fps: FPS,
  compositionWidth: W,
  compositionHeight: H,
};
