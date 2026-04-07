import { type ComponentConfig, FPS, H, W } from "@/lib/customizer-config";

export const browserFlowConfig: ComponentConfig = {
  componentName: "BrowserFlow",
  importPath: "@/components/remocn/browser-flow",
  controls: {
    url: {
      type: "text",
      default: "remocn.dev",
      label: "URL",
    },
  },
  durationInFrames: 270,
  fps: FPS,
  compositionWidth: W,
  compositionHeight: H,
};
