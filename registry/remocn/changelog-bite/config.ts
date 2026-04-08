import { type ComponentConfig, FPS } from "@/lib/customizer-config";

export const changelogBiteConfig: ComponentConfig = {
  componentName: "ChangelogBite",
  importPath: "@/components/remocn/changelog-bite",
  controls: {
    label: { type: "text", default: "New", label: "Label" },
    title: { type: "text", default: "Inline diff view", label: "Title" },
    format: {
      type: "select",
      default: "square",
      options: ["square", "portrait"],
      label: "Format",
    },
    background: { type: "color", default: "#141318", label: "Background" },
    cardBackground: {
      type: "text",
      default: "rgba(20, 19, 24, 0.92)",
      label: "Card background",
    },
    accent: { type: "color", default: "#FFB38E", label: "Accent" },
  },
  durationInFrames: 150,
  fps: FPS,
  compositionWidth: 1080,
  compositionHeight: 1080,
};
