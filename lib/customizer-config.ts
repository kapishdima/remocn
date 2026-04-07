export type ControlType =
  | { type: "text"; default: string; label: string }
  | {
      type: "number";
      default: number;
      min: number;
      max: number;
      step: number;
      label: string;
    }
  | { type: "color"; default: string; label: string }
  | { type: "select"; default: string; options: string[]; label: string }
  | { type: "boolean"; default: boolean; label: string };

export type ControlConfig = Record<string, ControlType>;

export interface ComponentConfig {
  controls: ControlConfig;
  durationInFrames: number;
  fps: number;
  compositionWidth: number;
  compositionHeight: number;
}

export const componentConfigs: Record<string, ComponentConfig> = {
  "blur-reveal": {
    controls: {
      text: { type: "text", default: "BlurReveal", label: "Text" },
      blur: {
        type: "number",
        default: 10,
        min: 1,
        max: 30,
        step: 1,
        label: "Blur",
      },
      fontSize: {
        type: "number",
        default: 72,
        min: 12,
        max: 120,
        step: 1,
        label: "Font size",
      },
      color: { type: "color", default: "#171717", label: "Color" },
      fontWeight: {
        type: "select",
        default: "600",
        options: ["400", "500", "600", "700"],
        label: "Font weight",
      },
    },
    durationInFrames: 90,
    fps: 30,
    compositionWidth: 1280,
    compositionHeight: 720,
  },
};

export function getDefaults(controls: ControlConfig): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const [key, ctrl] of Object.entries(controls)) {
    out[key] = ctrl.default;
  }
  return out;
}
