import { type ComponentConfig, FPS, H, W } from "@/lib/customizer-config";

export const githubSponsorsConfig: ComponentConfig = {
  componentName: "GitHubSponsors",
  importPath: "@/components/remocn/github-sponsors",
  controls: {
    account: {
      type: "text",
      default: "remocn",
      label: "Account",
    },
    accentColor: { type: "color", default: "#db61a2", label: "Accent" },
    theme: {
      type: "select",
      default: "light",
      options: ["light", "dark"],
      label: "Theme",
    },
  },
  durationInFrames: 270,
  fps: FPS,
  compositionWidth: W,
  compositionHeight: H,
};
