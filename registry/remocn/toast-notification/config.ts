import { type ComponentConfig, FPS, H, W } from "@/lib/customizer-config";

export const toastNotificationConfig: ComponentConfig = {
  componentName: "ToastNotification",
  importPath: "@/components/remocn/toast-notification",
  controls: {
    title: { type: "text", default: "Deployment successful", label: "Title" },
    message: {
      type: "text",
      default: "Your changes are live at remocn.dev",
      label: "Message",
    },
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
};
