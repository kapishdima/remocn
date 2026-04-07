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
  /**
   * Import statement shown in the generated code snippet.
   * Example: `import { BlurReveal } from "@/components/remocn/blur-reveal";`
   */
  importPath: string;
  /**
   * Pascal-case component name used in the generated JSX snippet.
   */
  componentName: string;
}

const FPS = 30;
const W = 1280;
const H = 720;
const FONT_WEIGHT_OPTIONS = ["400", "500", "600", "700"];

export const componentConfigs: Record<string, ComponentConfig> = {
  "blur-reveal": {
    componentName: "BlurReveal",
    importPath: "@/components/remocn/blur-reveal",
    controls: {
      text: { type: "text", default: "BlurReveal", label: "Text" },
      blur: { type: "number", default: 10, min: 1, max: 30, step: 1, label: "Blur" },
      fontSize: { type: "number", default: 72, min: 12, max: 160, step: 1, label: "Font size" },
      color: { type: "color", default: "#171717", label: "Color" },
      fontWeight: { type: "select", default: "600", options: FONT_WEIGHT_OPTIONS, label: "Font weight" },
    },
    durationInFrames: 90,
    fps: FPS,
    compositionWidth: W,
    compositionHeight: H,
  },
  typewriter: {
    componentName: "Typewriter",
    importPath: "@/components/remocn/typewriter",
    controls: {
      text: { type: "text", default: "console.log('hello, world')", label: "Text" },
      cursor: { type: "boolean", default: true, label: "Show cursor" },
      speed: { type: "number", default: 20, min: 4, max: 60, step: 1, label: "Speed (cps)" },
      fontSize: { type: "number", default: 72, min: 12, max: 160, step: 1, label: "Font size" },
      color: { type: "color", default: "#171717", label: "Color" },
      cursorColor: { type: "color", default: "#171717", label: "Cursor color" },
      fontWeight: { type: "select", default: "600", options: FONT_WEIGHT_OPTIONS, label: "Font weight" },
    },
    durationInFrames: 120,
    fps: FPS,
    compositionWidth: W,
    compositionHeight: H,
  },
  "inline-highlight": {
    componentName: "InlineHighlight",
    importPath: "@/components/remocn/inline-highlight",
    controls: {
      before: { type: "text", default: "Ship faster with ", label: "Before" },
      highlight: { type: "text", default: "remocn", label: "Highlight" },
      after: { type: "text", default: ".", label: "After" },
      baseColor: { type: "color", default: "#171717", label: "Base color" },
      highlightColor: { type: "color", default: "#ff5e3a", label: "Highlight color" },
      fontSize: { type: "number", default: 72, min: 12, max: 160, step: 1, label: "Font size" },
      fontWeight: { type: "select", default: "600", options: FONT_WEIGHT_OPTIONS, label: "Font weight" },
    },
    durationInFrames: 90,
    fps: FPS,
    compositionWidth: W,
    compositionHeight: H,
  },
  "text-fade-replace": {
    componentName: "TextFadeReplace",
    importPath: "@/components/remocn/text-fade-replace",
    controls: {
      from: { type: "text", default: "Loading...", label: "From" },
      to: { type: "text", default: "Ready!", label: "To" },
      fontSize: { type: "number", default: 72, min: 12, max: 160, step: 1, label: "Font size" },
      color: { type: "color", default: "#171717", label: "Color" },
      fontWeight: { type: "select", default: "600", options: FONT_WEIGHT_OPTIONS, label: "Font weight" },
    },
    durationInFrames: 90,
    fps: FPS,
    compositionWidth: W,
    compositionHeight: H,
  },
  "strikethrough-replace": {
    componentName: "StrikethroughReplace",
    importPath: "@/components/remocn/strikethrough-replace",
    controls: {
      from: { type: "text", default: "$49/mo", label: "From" },
      to: { type: "text", default: "Free", label: "To" },
      lineColor: { type: "color", default: "#ff5e3a", label: "Line color" },
      fontSize: { type: "number", default: 96, min: 12, max: 160, step: 1, label: "Font size" },
      color: { type: "color", default: "#171717", label: "Color" },
      fontWeight: { type: "select", default: "700", options: FONT_WEIGHT_OPTIONS, label: "Font weight" },
    },
    durationInFrames: 120,
    fps: FPS,
    compositionWidth: W,
    compositionHeight: H,
  },
  "mesh-gradient-bg": {
    componentName: "MeshGradientBg",
    importPath: "@/components/remocn/mesh-gradient-bg",
    controls: {
      speed: { type: "number", default: 1, min: 0.1, max: 4, step: 0.1, label: "Speed" },
      blur: { type: "number", default: 80, min: 20, max: 200, step: 4, label: "Blur" },
      background: { type: "color", default: "#0a0a0a", label: "Background" },
    },
    durationInFrames: 150,
    fps: FPS,
    compositionWidth: W,
    compositionHeight: H,
  },
  "dynamic-grid": {
    componentName: "DynamicGrid",
    importPath: "@/components/remocn/dynamic-grid",
    controls: {
      cellSize: { type: "number", default: 40, min: 8, max: 160, step: 4, label: "Cell size" },
      lineColor: { type: "color", default: "#27272a", label: "Line color" },
      background: { type: "color", default: "#0a0a0a", label: "Background" },
      speed: { type: "number", default: 0.5, min: 0, max: 4, step: 0.1, label: "Speed" },
      direction: {
        type: "select",
        default: "diagonal",
        options: ["diagonal", "horizontal", "vertical"],
        label: "Direction",
      },
    },
    durationInFrames: 150,
    fps: FPS,
    compositionWidth: W,
    compositionHeight: H,
  },
  "spring-pop-in": {
    componentName: "SpringPopIn",
    importPath: "@/components/remocn/spring-pop-in",
    controls: {
      damping: { type: "number", default: 12, min: 1, max: 40, step: 1, label: "Damping" },
      mass: { type: "number", default: 1, min: 0.1, max: 5, step: 0.1, label: "Mass" },
      stiffness: { type: "number", default: 100, min: 10, max: 400, step: 5, label: "Stiffness" },
      delayInFrames: { type: "number", default: 0, min: 0, max: 60, step: 1, label: "Delay (frames)" },
    },
    durationInFrames: 60,
    fps: FPS,
    compositionWidth: W,
    compositionHeight: H,
  },
  "simulated-cursor": {
    componentName: "SimulatedCursor",
    importPath: "@/components/remocn/simulated-cursor",
    controls: {
      color: { type: "color", default: "#ffffff", label: "Color" },
      size: { type: "number", default: 32, min: 12, max: 96, step: 1, label: "Size" },
      background: { type: "color", default: "#0a0a0a", label: "Background" },
    },
    durationInFrames: 150,
    fps: FPS,
    compositionWidth: W,
    compositionHeight: H,
  },
  "pulsing-indicator": {
    componentName: "PulsingIndicator",
    importPath: "@/components/remocn/pulsing-indicator",
    controls: {
      color: { type: "color", default: "#22c55e", label: "Color" },
      size: { type: "number", default: 32, min: 8, max: 120, step: 1, label: "Size" },
      speed: { type: "number", default: 8, min: 1, max: 30, step: 0.5, label: "Speed" },
      background: { type: "color", default: "#ffffff", label: "Background" },
    },
    durationInFrames: 120,
    fps: FPS,
    compositionWidth: W,
    compositionHeight: H,
  },
  "directional-wipe": {
    componentName: "DirectionalWipe",
    importPath: "@/components/remocn/directional-wipe",
    controls: {
      direction: {
        type: "select",
        default: "left",
        options: ["left", "right", "up", "down"],
        label: "Direction",
      },
      transitionDuration: {
        type: "number",
        default: 20,
        min: 4,
        max: 60,
        step: 1,
        label: "Transition duration",
      },
    },
    durationInFrames: 90,
    fps: FPS,
    compositionWidth: W,
    compositionHeight: H,
  },
  "device-mockup-zoom": {
    componentName: "DeviceMockupZoom",
    importPath: "@/components/remocn/device-mockup-zoom",
    controls: {
      device: {
        type: "select",
        default: "laptop",
        options: ["laptop", "phone"],
        label: "Device",
      },
      frameColor: { type: "color", default: "#1f1f1f", label: "Frame color" },
      screenColor: { type: "color", default: "#0a0a0a", label: "Screen color" },
      background: { type: "color", default: "#fafafa", label: "Background" },
    },
    durationInFrames: 120,
    fps: FPS,
    compositionWidth: W,
    compositionHeight: H,
  },
  "zoom-through-transition": {
    componentName: "ZoomThroughTransition",
    importPath: "@/components/remocn/zoom-through-transition",
    controls: {
      targetScale: { type: "number", default: 20, min: 2, max: 60, step: 1, label: "Target scale" },
      background: { type: "color", default: "#ffffff", label: "Background" },
    },
    durationInFrames: 60,
    fps: FPS,
    compositionWidth: W,
    compositionHeight: H,
  },
  "staggered-bento-grid": {
    componentName: "StaggeredBentoGrid",
    importPath: "@/components/remocn/staggered-bento-grid",
    controls: {
      staggerDelay: { type: "number", default: 8, min: 1, max: 30, step: 1, label: "Stagger delay" },
      columns: { type: "number", default: 3, min: 2, max: 5, step: 1, label: "Columns" },
      background: { type: "color", default: "#0a0a0a", label: "Background" },
      cardColor: { type: "color", default: "#1a1a1a", label: "Card color" },
      textColor: { type: "color", default: "#ffffff", label: "Text color" },
    },
    durationInFrames: 120,
    fps: FPS,
    compositionWidth: W,
    compositionHeight: H,
  },
  "chat-to-preview-layout": {
    componentName: "ChatToPreviewLayout",
    importPath: "@/components/remocn/chat-to-preview-layout",
    controls: {
      startChatRatio: {
        type: "number",
        default: 0.5,
        min: 0.1,
        max: 0.9,
        step: 0.05,
        label: "Start chat ratio",
      },
      endChatRatio: {
        type: "number",
        default: 0.25,
        min: 0.05,
        max: 0.9,
        step: 0.05,
        label: "End chat ratio",
      },
      background: { type: "color", default: "#0a0a0a", label: "Background" },
    },
    durationInFrames: 120,
    fps: FPS,
    compositionWidth: W,
    compositionHeight: H,
  },
  "bounding-box-selector": {
    componentName: "BoundingBoxSelector",
    importPath: "@/components/remocn/bounding-box-selector",
    controls: {
      borderColor: { type: "color", default: "#0ea5e9", label: "Border color" },
      handleColor: { type: "color", default: "#0ea5e9", label: "Handle color" },
      borderWidth: { type: "number", default: 2, min: 1, max: 8, step: 1, label: "Border width" },
      appearAt: { type: "number", default: 15, min: 0, max: 60, step: 1, label: "Appear at (frame)" },
      background: { type: "color", default: "#fafafa", label: "Background" },
    },
    durationInFrames: 90,
    fps: FPS,
    compositionWidth: W,
    compositionHeight: H,
  },
  "animated-line-chart": {
    componentName: "AnimatedLineChart",
    importPath: "@/components/remocn/animated-line-chart",
    controls: {
      strokeColor: { type: "color", default: "#22c55e", label: "Stroke color" },
      strokeWidth: { type: "number", default: 4, min: 1, max: 16, step: 1, label: "Stroke width" },
      background: { type: "color", default: "#0a0a0a", label: "Background" },
      gridColor: { type: "color", default: "#27272a", label: "Grid color" },
      showDot: { type: "boolean", default: true, label: "Show leading dot" },
    },
    durationInFrames: 90,
    fps: FPS,
    compositionWidth: W,
    compositionHeight: H,
  },
  "animated-bar-chart": {
    componentName: "AnimatedBarChart",
    importPath: "@/components/remocn/animated-bar-chart",
    controls: {
      barColor: { type: "color", default: "#0ea5e9", label: "Bar color" },
      background: { type: "color", default: "#0a0a0a", label: "Background" },
      gap: { type: "number", default: 16, min: 0, max: 80, step: 2, label: "Gap" },
      staggerFrames: { type: "number", default: 6, min: 0, max: 30, step: 1, label: "Stagger frames" },
    },
    durationInFrames: 90,
    fps: FPS,
    compositionWidth: W,
    compositionHeight: H,
  },
  "terminal-simulator": {
    componentName: "TerminalSimulator",
    importPath: "@/components/remocn/terminal-simulator",
    controls: {
      prompt: { type: "text", default: "$", label: "Prompt" },
      title: { type: "text", default: "~/projects/remocn", label: "Title" },
      background: { type: "color", default: "#0a0a0a", label: "Background" },
      chromeColor: { type: "color", default: "#1a1a1a", label: "Chrome color" },
      fontSize: { type: "number", default: 18, min: 10, max: 32, step: 1, label: "Font size" },
      charsPerFrame: { type: "number", default: 1, min: 0.25, max: 6, step: 0.25, label: "Chars / frame" },
    },
    durationInFrames: 240,
    fps: FPS,
    compositionWidth: W,
    compositionHeight: H,
  },
  "code-diff-wipe": {
    componentName: "CodeDiffWipe",
    importPath: "@/components/remocn/code-diff-wipe",
    controls: {
      language: { type: "text", default: "tsx", label: "Language" },
      background: { type: "color", default: "#0a0a0a", label: "Background" },
      accent: { type: "color", default: "#0ea5e9", label: "Accent" },
      transitionStart: { type: "number", default: 20, min: 0, max: 120, step: 1, label: "Transition start" },
      transitionDuration: { type: "number", default: 60, min: 8, max: 180, step: 1, label: "Transition duration" },
      showHandle: { type: "boolean", default: true, label: "Show handle" },
    },
    durationInFrames: 120,
    fps: FPS,
    compositionWidth: W,
    compositionHeight: H,
  },
  "toast-notification": {
    componentName: "ToastNotification",
    importPath: "@/components/remocn/toast-notification",
    controls: {
      title: { type: "text", default: "Deployment successful", label: "Title" },
      message: { type: "text", default: "Your changes are live at remocn.dev", label: "Message" },
      variant: {
        type: "select",
        default: "success",
        options: ["success", "error", "info", "warning"],
        label: "Variant",
      },
      background: { type: "color", default: "#fafafa", label: "Background" },
      cardColor: { type: "color", default: "#ffffff", label: "Card color" },
      textColor: { type: "color", default: "#171717", label: "Text color" },
      mutedColor: { type: "color", default: "#71717a", label: "Muted color" },
    },
    durationInFrames: 90,
    fps: FPS,
    compositionWidth: W,
    compositionHeight: H,
  },
  "drag-and-drop-flow": {
    componentName: "DragAndDropFlow",
    importPath: "@/components/remocn/drag-and-drop-flow",
    controls: {
      accent: { type: "color", default: "#0ea5e9", label: "Accent" },
      dropzoneLabel: { type: "text", default: "Drop file to upload", label: "Dropzone label" },
      fileName: { type: "text", default: "design.fig", label: "File name" },
      background: { type: "color", default: "#fafafa", label: "Background" },
    },
    durationInFrames: 150,
    fps: FPS,
    compositionWidth: W,
    compositionHeight: H,
  },
  "progress-steps": {
    componentName: "ProgressSteps",
    importPath: "@/components/remocn/progress-steps",
    controls: {
      orientation: {
        type: "select",
        default: "horizontal",
        options: ["horizontal", "vertical"],
        label: "Orientation",
      },
      activeColor: { type: "color", default: "#22c55e", label: "Active color" },
      inactiveColor: { type: "color", default: "#27272a", label: "Inactive color" },
      background: { type: "color", default: "#0a0a0a", label: "Background" },
      textColor: { type: "color", default: "#ffffff", label: "Text color" },
      stepDuration: { type: "number", default: 30, min: 4, max: 120, step: 1, label: "Step duration" },
    },
    durationInFrames: 150,
    fps: FPS,
    compositionWidth: W,
    compositionHeight: H,
  },
  "success-confetti": {
    componentName: "SuccessConfetti",
    importPath: "@/components/remocn/success-confetti",
    controls: {
      count: { type: "number", default: 60, min: 10, max: 200, step: 5, label: "Particle count" },
      originX: { type: "number", default: 0.5, min: 0, max: 1, step: 0.05, label: "Origin X" },
      originY: { type: "number", default: 0.5, min: 0, max: 1, step: 0.05, label: "Origin Y" },
      gravity: { type: "number", default: 0.4, min: 0, max: 2, step: 0.05, label: "Gravity" },
      velocity: { type: "number", default: 12, min: 1, max: 40, step: 0.5, label: "Velocity" },
      text: { type: "text", default: "Merged!", label: "Text" },
      textColor: { type: "color", default: "#171717", label: "Text color" },
      background: { type: "color", default: "#fafafa", label: "Background" },
      seed: { type: "text", default: "remocn", label: "Seed" },
    },
    durationInFrames: 120,
    fps: FPS,
    compositionWidth: W,
    compositionHeight: H,
  },
};

export function getDefaults(controls: ControlConfig): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const [key, ctrl] of Object.entries(controls)) {
    out[key] = ctrl.default;
  }
  return out;
}
