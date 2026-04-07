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

/**
 * Controls present on every animation. Spread first so that local controls
 * for a specific component can override a shared default if needed.
 */
const SHARED_CONTROLS: ControlConfig = {
  speed: {
    type: "number",
    default: 1,
    min: 0.25,
    max: 4,
    step: 0.25,
    label: "Speed",
  },
};

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
      charsPerSecond: { type: "number", default: 20, min: 4, max: 60, step: 1, label: "Chars / sec" },
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
  "staggered-fade-up": {
    componentName: "StaggeredFadeUp",
    importPath: "@/components/remocn/staggered-fade-up",
    controls: {
      text: { type: "text", default: "Ship faster with remocn", label: "Text" },
      staggerDelay: { type: "number", default: 4, min: 0, max: 30, step: 1, label: "Stagger delay" },
      distance: { type: "number", default: 20, min: 0, max: 120, step: 1, label: "Distance" },
      fontSize: { type: "number", default: 72, min: 12, max: 160, step: 1, label: "Font size" },
      color: { type: "color", default: "#171717", label: "Color" },
      fontWeight: { type: "select", default: "600", options: FONT_WEIGHT_OPTIONS, label: "Font weight" },
    },
    durationInFrames: 90,
    fps: FPS,
    compositionWidth: W,
    compositionHeight: H,
  },
  "masked-slide-reveal": {
    componentName: "MaskedSlideReveal",
    importPath: "@/components/remocn/masked-slide-reveal",
    controls: {
      text: { type: "text", default: "Reveal from the mask", label: "Text" },
      staggerDelay: { type: "number", default: 3, min: 0, max: 30, step: 1, label: "Stagger delay" },
      fontSize: { type: "number", default: 72, min: 12, max: 160, step: 1, label: "Font size" },
      color: { type: "color", default: "#171717", label: "Color" },
      fontWeight: { type: "select", default: "700", options: FONT_WEIGHT_OPTIONS, label: "Font weight" },
    },
    durationInFrames: 90,
    fps: FPS,
    compositionWidth: W,
    compositionHeight: H,
  },
  "tracking-in": {
    componentName: "TrackingIn",
    importPath: "@/components/remocn/tracking-in",
    controls: {
      text: { type: "text", default: "tracking in", label: "Text" },
      startTracking: { type: "number", default: 0.5, min: 0, max: 2, step: 0.05, label: "Start tracking (em)" },
      startBlur: { type: "number", default: 12, min: 0, max: 40, step: 1, label: "Start blur" },
      fontSize: { type: "number", default: 96, min: 12, max: 200, step: 1, label: "Font size" },
      color: { type: "color", default: "#171717", label: "Color" },
      fontWeight: { type: "select", default: "700", options: FONT_WEIGHT_OPTIONS, label: "Font weight" },
    },
    durationInFrames: 90,
    fps: FPS,
    compositionWidth: W,
    compositionHeight: H,
  },
  "shimmer-sweep": {
    componentName: "ShimmerSweep",
    importPath: "@/components/remocn/shimmer-sweep",
    controls: {
      text: { type: "text", default: "Generating", label: "Text" },
      baseColor: { type: "color", default: "#3f3f46", label: "Base color" },
      shineColor: { type: "color", default: "#fafafa", label: "Shine color" },
      fontSize: { type: "number", default: 96, min: 12, max: 200, step: 1, label: "Font size" },
      fontWeight: { type: "select", default: "700", options: FONT_WEIGHT_OPTIONS, label: "Font weight" },
    },
    durationInFrames: 120,
    fps: FPS,
    compositionWidth: W,
    compositionHeight: H,
  },
  "marker-highlight": {
    componentName: "MarkerHighlight",
    importPath: "@/components/remocn/marker-highlight",
    controls: {
      before: { type: "text", default: "Made for ", label: "Before" },
      highlight: { type: "text", default: "builders", label: "Highlight" },
      after: { type: "text", default: ".", label: "After" },
      markerColor: { type: "color", default: "#facc15", label: "Marker color" },
      baseColor: { type: "color", default: "#171717", label: "Base color" },
      highlightedTextColor: { type: "color", default: "#171717", label: "Highlighted text color" },
      fontSize: { type: "number", default: 72, min: 12, max: 160, step: 1, label: "Font size" },
      fontWeight: { type: "select", default: "600", options: FONT_WEIGHT_OPTIONS, label: "Font weight" },
    },
    durationInFrames: 90,
    fps: FPS,
    compositionWidth: W,
    compositionHeight: H,
  },
  "slot-machine-roll": {
    componentName: "SlotMachineRoll",
    importPath: "@/components/remocn/slot-machine-roll",
    controls: {
      from: { type: "text", default: "$99", label: "From" },
      to: { type: "text", default: "$199", label: "To" },
      fontSize: { type: "number", default: 120, min: 12, max: 240, step: 1, label: "Font size" },
      color: { type: "color", default: "#171717", label: "Color" },
      fontWeight: { type: "select", default: "700", options: FONT_WEIGHT_OPTIONS, label: "Font weight" },
    },
    durationInFrames: 90,
    fps: FPS,
    compositionWidth: W,
    compositionHeight: H,
  },
  "matrix-decode": {
    componentName: "MatrixDecode",
    importPath: "@/components/remocn/matrix-decode",
    controls: {
      text: { type: "text", default: "DECRYPTED", label: "Text" },
      charset: { type: "text", default: "!@#$%^&*()_+-=<>?/\\|", label: "Charset" },
      fontSize: { type: "number", default: 72, min: 12, max: 160, step: 1, label: "Font size" },
      color: { type: "color", default: "#22c55e", label: "Color" },
      fontWeight: { type: "select", default: "600", options: FONT_WEIGHT_OPTIONS, label: "Font weight" },
      revealDuration: { type: "number", default: 60, min: 10, max: 240, step: 1, label: "Reveal duration" },
    },
    durationInFrames: 90,
    fps: FPS,
    compositionWidth: W,
    compositionHeight: H,
  },
  "rgb-glitch-text": {
    componentName: "RGBGlitchText",
    importPath: "@/components/remocn/rgb-glitch-text",
    controls: {
      text: { type: "text", default: "GLITCH", label: "Text" },
      fontSize: { type: "number", default: 96, min: 12, max: 200, step: 1, label: "Font size" },
      color: { type: "color", default: "#171717", label: "Color" },
      fontWeight: { type: "select", default: "700", options: FONT_WEIGHT_OPTIONS, label: "Font weight" },
      glitchAt: { type: "number", default: 20, min: 0, max: 120, step: 1, label: "Glitch at (frame)" },
      glitchDuration: { type: "number", default: 8, min: 1, max: 60, step: 1, label: "Glitch duration" },
      intensity: { type: "number", default: 6, min: 0, max: 30, step: 1, label: "Intensity (px)" },
      seed: { type: "text", default: "glitch", label: "Seed" },
    },
    durationInFrames: 90,
    fps: FPS,
    compositionWidth: W,
    compositionHeight: H,
  },
  "video-mask-text": {
    componentName: "VideoMaskText",
    importPath: "@/components/remocn/video-mask-text",
    controls: {
      text: { type: "text", default: "CREATE", label: "Text" },
      posterColor: { type: "color", default: "#0ea5e9", label: "Poster color" },
      background: { type: "color", default: "#0a0a0a", label: "Background" },
      fontSize: { type: "number", default: 320, min: 80, max: 600, step: 10, label: "Font size" },
      fontWeight: { type: "select", default: "700", options: FONT_WEIGHT_OPTIONS, label: "Font weight" },
      zoomAt: { type: "number", default: 60, min: 0, max: 240, step: 1, label: "Zoom at (frame)" },
      zoomTo: { type: "number", default: 40, min: 1, max: 100, step: 1, label: "Zoom to (scale)" },
    },
    durationInFrames: 150,
    fps: FPS,
    compositionWidth: W,
    compositionHeight: H,
  },
  "infinite-marquee": {
    componentName: "InfiniteMarquee",
    importPath: "@/components/remocn/infinite-marquee",
    controls: {
      text: { type: "text", default: "ship · build · animate · ", label: "Text" },
      fontSize: { type: "number", default: 120, min: 12, max: 240, step: 1, label: "Font size" },
      color: { type: "color", default: "#171717", label: "Color" },
      fontWeight: { type: "select", default: "700", options: FONT_WEIGHT_OPTIONS, label: "Font weight" },
      pixelsPerFrame: { type: "number", default: 4, min: 1, max: 30, step: 1, label: "Pixels / frame" },
      stroke: { type: "boolean", default: false, label: "Stroke" },
      strokeColor: { type: "color", default: "#171717", label: "Stroke color" },
      background: { type: "color", default: "#fafafa", label: "Background" },
    },
    durationInFrames: 180,
    fps: FPS,
    compositionWidth: W,
    compositionHeight: H,
  },
  "morphing-modal": {
    componentName: "MorphingModal",
    importPath: "@/components/remocn/morphing-modal",
    controls: {
      morphAt: { type: "number", default: 30, min: 0, max: 240, step: 1, label: "Morph at (frame)" },
      borderRadiusFrom: { type: "number", default: 24, min: 0, max: 80, step: 1, label: "Radius from" },
      borderRadiusTo: { type: "number", default: 0, min: 0, max: 80, step: 1, label: "Radius to" },
      sourceTitle: { type: "text", default: "Compose video", label: "Source title" },
      sourceBody: { type: "text", default: "Click to start a new project", label: "Source body" },
      modalTitle: { type: "text", default: "New project", label: "Modal title" },
      background: { type: "color", default: "#050505", label: "Background" },
      cardColor: { type: "color", default: "#0a0a0a", label: "Card color" },
      textColor: { type: "color", default: "#fafafa", label: "Text color" },
      mutedColor: { type: "color", default: "#71717a", label: "Muted color" },
    },
    durationInFrames: 180,
    fps: FPS,
    compositionWidth: W,
    compositionHeight: H,
  },
  "data-flow-pipes": {
    componentName: "DataFlowPipes",
    importPath: "@/components/remocn/data-flow-pipes",
    controls: {
      pipeColor: { type: "color", default: "#1f1f23", label: "Pipe color" },
      pulseColor: { type: "color", default: "#22d3ee", label: "Pulse color" },
      pulseLength: { type: "number", default: 60, min: 10, max: 200, step: 5, label: "Pulse length" },
      pulseDuration: { type: "number", default: 36, min: 8, max: 120, step: 1, label: "Pulse duration" },
      background: { type: "color", default: "#050505", label: "Background" },
      nodeColor: { type: "color", default: "#0a0a0a", label: "Node color" },
      textColor: { type: "color", default: "#fafafa", label: "Text color" },
    },
    durationInFrames: 180,
    fps: FPS,
    compositionWidth: W,
    compositionHeight: H,
  },
  "cursor-flow": {
    componentName: "CursorFlow",
    importPath: "@/components/remocn/cursor-flow",
    controls: {
      cursorColor: { type: "color", default: "#fafafa", label: "Cursor color" },
      cursorSize: { type: "number", default: 28, min: 12, max: 64, step: 1, label: "Cursor size" },
      segmentDuration: { type: "number", default: 36, min: 8, max: 120, step: 1, label: "Segment duration" },
      background: { type: "color", default: "#0a0a0a", label: "Background" },
      showTargets: { type: "boolean", default: true, label: "Show targets" },
    },
    durationInFrames: 180,
    fps: FPS,
    compositionWidth: W,
    compositionHeight: H,
  },
  "code-accordion": {
    componentName: "CodeAccordion",
    importPath: "@/components/remocn/code-accordion",
    controls: {
      title: { type: "text", default: "process-orders.ts", label: "Title" },
      collapseAt: { type: "number", default: 30, min: 0, max: 240, step: 1, label: "Collapse at (frame)" },
      fontSize: { type: "number", default: 16, min: 10, max: 28, step: 1, label: "Font size" },
      width: { type: "number", default: 720, min: 320, max: 1100, step: 10, label: "Width" },
      background: { type: "color", default: "#050505", label: "Background" },
      cardColor: { type: "color", default: "#0a0a0a", label: "Card color" },
      textColor: { type: "color", default: "#e4e4e7", label: "Text color" },
      mutedColor: { type: "color", default: "#52525b", label: "Muted color" },
    },
    durationInFrames: 150,
    fps: FPS,
    compositionWidth: W,
    compositionHeight: H,
  },
  "glass-code-block": {
    componentName: "GlassCodeBlock",
    importPath: "@/components/remocn/glass-code-block",
    controls: {
      title: { type: "text", default: "hero.tsx", label: "Title" },
      width: { type: "number", default: 760, min: 300, max: 1100, step: 10, label: "Width" },
      height: { type: "number", default: 460, min: 200, max: 700, step: 10, label: "Height" },
      fontSize: { type: "number", default: 16, min: 10, max: 28, step: 1, label: "Font size" },
      background: { type: "color", default: "#0a0a0a", label: "Background" },
      glassColor: { type: "text", default: "rgba(10, 10, 10, 0.6)", label: "Glass color" },
      staggerFrames: { type: "number", default: 4, min: 0, max: 30, step: 1, label: "Stagger frames" },
      showTrafficLights: { type: "boolean", default: true, label: "Traffic lights" },
    },
    durationInFrames: 180,
    fps: FPS,
    compositionWidth: W,
    compositionHeight: H,
  },
  "spotlight-card": {
    componentName: "SpotlightCard",
    importPath: "@/components/remocn/spotlight-card",
    controls: {
      title: { type: "text", default: "Spotlight Card", label: "Title" },
      body: {
        type: "text",
        default: "Soft radial light follows the cursor, picking out the microborder.",
        label: "Body",
      },
      cardWidth: { type: "number", default: 520, min: 200, max: 900, step: 10, label: "Card width" },
      cardHeight: { type: "number", default: 320, min: 160, max: 700, step: 10, label: "Card height" },
      glowSize: { type: "number", default: 600, min: 100, max: 1400, step: 20, label: "Glow size" },
      glowOpacity: { type: "number", default: 0.08, min: 0, max: 0.4, step: 0.01, label: "Glow opacity" },
      background: { type: "color", default: "#050505", label: "Background" },
      cardColor: { type: "color", default: "#0a0a0a", label: "Card color" },
      textColor: { type: "color", default: "#fafafa", label: "Text color" },
      mutedColor: { type: "color", default: "#71717a", label: "Muted color" },
    },
    durationInFrames: 240,
    fps: FPS,
    compositionWidth: W,
    compositionHeight: H,
  },
  "perspective-marquee": {
    componentName: "PerspectiveMarquee",
    importPath: "@/components/remocn/perspective-marquee",
    controls: {
      fontSize: { type: "number", default: 84, min: 24, max: 200, step: 2, label: "Font size" },
      color: { type: "color", default: "#fafafa", label: "Color" },
      fontWeight: { type: "select", default: "700", options: FONT_WEIGHT_OPTIONS, label: "Font weight" },
      pixelsPerFrame: { type: "number", default: 2, min: 0.25, max: 10, step: 0.25, label: "Pixels / frame" },
      rotateY: { type: "number", default: -28, min: -60, max: 60, step: 1, label: "Rotate Y (deg)" },
      rotateX: { type: "number", default: 8, min: -30, max: 30, step: 1, label: "Rotate X (deg)" },
      perspective: { type: "number", default: 1200, min: 400, max: 3000, step: 50, label: "Perspective" },
      fadeColor: { type: "color", default: "#050505", label: "Fade color" },
      background: { type: "color", default: "#050505", label: "Background" },
    },
    durationInFrames: 240,
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
      period: { type: "number", default: 8, min: 1, max: 30, step: 0.5, label: "Period (frames)" },
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
      chunkSize: { type: "number", default: 4, min: 1, max: 20, step: 1, label: "Chunk size" },
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

// Append the shared controls (e.g. `speed`) to every component config so
// every animation in the customizer exposes the same baseline knobs.
for (const cfg of Object.values(componentConfigs)) {
  cfg.controls = { ...cfg.controls, ...SHARED_CONTROLS };
}

export function getDefaults(controls: ControlConfig): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const [key, ctrl] of Object.entries(controls)) {
    out[key] = ctrl.default;
  }
  return out;
}
