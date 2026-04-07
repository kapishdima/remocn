import { type ComponentConfig, FPS, H, W } from "@/lib/customizer-config";

export const imageExpandToFullscreenConfig: ComponentConfig = {
  componentName: "ImageExpandToFullscreen",
  importPath: "@/components/remocn/image-expand-to-fullscreen",
  controls: {
    morphAt: {
      type: "number",
      default: 30,
      min: 0,
      max: 240,
      step: 1,
      label: "Morph at (frame)",
    },
    borderRadiusFrom: {
      type: "number",
      default: 12,
      min: 0,
      max: 40,
      step: 1,
      label: "Radius from",
    },
    borderRadiusTo: {
      type: "number",
      default: 16,
      min: 0,
      max: 40,
      step: 1,
      label: "Radius to",
    },
    imageColorA: { type: "color", default: "#ff6b6b", label: "Image color A" },
    imageColorB: { type: "color", default: "#845ec2", label: "Image color B" },
    imageColorC: { type: "color", default: "#4d8dff", label: "Image color C" },
    feedBackground: {
      type: "color",
      default: "#f4f4f5",
      label: "Feed background",
    },
    editorBackground: {
      type: "color",
      default: "#0a0a0a",
      label: "Editor background",
    },
    accent: { type: "color", default: "#fafafa", label: "Accent" },
    postAuthor: {
      type: "text",
      default: "Maya Larsson",
      label: "Post author",
    },
    postBody: {
      type: "text",
      default:
        "Sunset over the old harbor — color graded straight out of camera.",
      label: "Post body",
    },
  },
  durationInFrames: 180,
  fps: FPS,
  compositionWidth: W,
  compositionHeight: H,
};
