import { type ComponentConfig, FPS, H, W } from "@/lib/customizer-config";

export const terminalToBrowserDeployConfig: ComponentConfig = {
  componentName: "TerminalToBrowserDeploy",
  importPath: "@/components/remocn/terminal-to-browser-deploy",
  controls: {
    siteUrl: {
      type: "text",
      default: "https://app.example.com",
      label: "Site URL",
    },
    accentColor: {
      type: "color",
      default: "#22c55e",
      label: "Accent color",
    },
  },
  durationInFrames: 240,
  fps: FPS,
  compositionWidth: W,
  compositionHeight: H,
};
