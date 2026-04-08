import { type ComponentConfig, FPS, H, W } from "@/lib/customizer-config";

export const visualDocsSnippetConfig: ComponentConfig = {
  componentName: "VisualDocsSnippet",
  importPath: "@/components/remocn/visual-docs-snippet",
  controls: {
    tooltipTitle: {
      type: "text",
      default: "Generate runs",
      label: "Tooltip title",
    },
    tooltipBody: {
      type: "text",
      default:
        "Click to start a new generation. The job will appear in the sidebar.",
      label: "Tooltip body",
    },
    buttonLabel: {
      type: "text",
      default: "Generate",
      label: "Button label",
    },
    clickFrame: {
      type: "number",
      default: 110,
      min: 60,
      max: 180,
      step: 5,
      label: "Click frame",
    },
    accent: { type: "color", default: "#FFB38E", label: "Accent" },
    background: { type: "color", default: "#141318", label: "Background" },
  },
  durationInFrames: 210,
  fps: FPS,
  compositionWidth: W,
  compositionHeight: H,
};
