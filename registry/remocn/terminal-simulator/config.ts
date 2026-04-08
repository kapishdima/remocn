import { type ComponentConfig, FPS, H, W } from "@/lib/customizer-config";

export const terminalSimulatorConfig: ComponentConfig = {
  componentName: "TerminalSimulator",
  importPath: "@/components/remocn/terminal-simulator",
  controls: {
    prompt: { type: "text", default: "$", label: "Prompt" },
    title: { type: "text", default: "~/projects/remocn", label: "Title" },
    background: { type: "color", default: "#0a0a0a", label: "Background" },
    chromeColor: { type: "color", default: "#1a1a1a", label: "Chrome color" },
    fontSize: {
      type: "number",
      default: 18,
      min: 10,
      max: 32,
      step: 1,
      label: "Font size",
    },
    charsPerFrame: {
      type: "number",
      default: 1,
      min: 0.25,
      max: 6,
      step: 0.25,
      label: "Chars / frame",
    },
    chunkSize: {
      type: "number",
      default: 1,
      min: 1,
      max: 20,
      step: 1,
      label: "Chunk size",
    },
  },
  durationInFrames: 240,
  fps: FPS,
  compositionWidth: W,
  compositionHeight: H,
};
