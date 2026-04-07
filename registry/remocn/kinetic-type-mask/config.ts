import { type ComponentConfig, FPS, H, W } from "@/lib/customizer-config";

export const kineticTypeMaskConfig: ComponentConfig = {
  componentName: "KineticTypeMask",
  importPath: "@/components/remocn/kinetic-type-mask",
  controls: {
    text: { type: "text", default: "NEXT", label: "Text" },
    holdFrames: { type: "number", default: 12, min: 0, max: 60, step: 1, label: "Hold frames" },
    transitionDuration: { type: "number", default: 24, min: 8, max: 60, step: 1, label: "Transition duration" },
    maxScale: { type: "number", default: 120, min: 20, max: 300, step: 5, label: "Max scale" },
  },
  durationInFrames: 90,
  fps: FPS,
  compositionWidth: W,
  compositionHeight: H,
};
