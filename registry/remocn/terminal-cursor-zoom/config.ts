import { type ComponentConfig, FPS, H, W } from "@/lib/customizer-config";

export const terminalCursorZoomConfig: ComponentConfig = {
  componentName: "TerminalCursorZoom",
  importPath: "@/components/remocn/terminal-cursor-zoom",
  controls: {
    command: {
      type: "text",
      default: "npx shadcn add @remocn/terminal-cursor-zoom",
      label: "Command",
    },
    zoom: {
      type: "number",
      default: 2.8,
      min: 1,
      max: 4,
      step: 0.1,
      label: "Zoom",
    },
    fontSize: {
      type: "number",
      default: 20,
      min: 10,
      max: 32,
      step: 1,
      label: "Font size",
    },
    prompt: { type: "text", default: "$", label: "Prompt" },
    title: { type: "text", default: "~/code/remocn-demo", label: "Title" },
  },
  durationInFrames: 90,
  fps: FPS,
  compositionWidth: W,
  compositionHeight: H,
  previewBackdrop: { type: "color", value: "#0B0B0C" },
};
