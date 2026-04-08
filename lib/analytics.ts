import { track } from "@vercel/analytics";

export type PreviewSurface =
  | "hero"
  | "bento"
  | "landing_code_showcase"
  | "docs";

export type CtaId =
  | "hero_browse"
  | "bento_browse"
  | "final_cta"
  | "github_header";

type EventMap = {
  install_command_copied: {
    component: string;
    package_manager: "pnpm" | "npm" | "yarn" | "bun" | "prompt";
    surface: "docs" | "landing";
  };
  preview_played: {
    component: string;
    surface: PreviewSurface;
    trigger: "click" | "hover";
  };
  preview_paused: {
    component: string;
    surface: PreviewSurface;
  };
  component_customized: {
    component: string;
    prop: string;
  };
  customized_link_shared: {
    component: string;
  };
  customizer_reset: {
    component: string;
  };
  cta_clicked: {
    cta: CtaId;
    destination: string;
  };
  docs_component_viewed: {
    component: string;
  };
};

export function trackEvent<K extends keyof EventMap>(
  name: K,
  properties: EventMap[K],
) {
  track(name, properties as Record<string, string>);
}
