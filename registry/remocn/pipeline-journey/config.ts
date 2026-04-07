import { type ComponentConfig, FPS, H, W } from "@/lib/customizer-config";

export const pipelineJourneyConfig: ComponentConfig = {
  componentName: "PipelineJourney",
  importPath: "@/components/remocn/pipeline-journey",
  controls: {
    cardLabel: {
      type: "text",
      default: "Build pipeline",
      label: "Card label",
    },
    accentColor: {
      type: "color",
      default: "#22c55e",
      label: "Accent color",
    },
  },
  durationInFrames: 200,
  fps: FPS,
  compositionWidth: W,
  compositionHeight: H,
};
