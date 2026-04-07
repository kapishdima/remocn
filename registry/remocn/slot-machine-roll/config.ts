import {
  type ComponentConfig,
  FONT_WEIGHT_OPTIONS,
  FPS,
  H,
  W,
} from "@/lib/customizer-config";

export const slotMachineRollConfig: ComponentConfig = {
  componentName: "SlotMachineRoll",
  importPath: "@/components/remocn/slot-machine-roll",
  controls: {
    from: { type: "text", default: "$99", label: "From" },
    to: { type: "text", default: "$199", label: "To" },
    fontSize: {
      type: "number",
      default: 120,
      min: 12,
      max: 240,
      step: 1,
      label: "Font size",
    },
    color: { type: "color", default: "#171717", label: "Color" },
    fontWeight: {
      type: "select",
      default: "700",
      options: FONT_WEIGHT_OPTIONS,
      label: "Font weight",
    },
  },
  durationInFrames: 90,
  fps: FPS,
  compositionWidth: W,
  compositionHeight: H,
};
