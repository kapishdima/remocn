"use client";

import { Player } from "@remotion/player";
import { DynamicCodeBlock } from "fumadocs-ui/components/dynamic-codeblock";
import { CheckIcon, LinkIcon, RotateCcwIcon } from "lucide-react";
import {
  parseAsBoolean,
  parseAsFloat,
  parseAsString,
  parseAsStringLiteral,
  useQueryStates,
} from "nuqs";
import { Suspense, useMemo, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  type ComponentConfig,
  type ControlConfig,
  componentConfigs,
  getDefaults,
} from "@/lib/customizer-config";
import { cn } from "@/lib/utils";
import { AnimatedBarChart } from "@/registry/remocn/animated-bar-chart";
import { AnimatedLineChart } from "@/registry/remocn/animated-line-chart";
import { BlurReveal } from "@/registry/remocn/blur-reveal";
import { BoundingBoxSelector } from "@/registry/remocn/bounding-box-selector";
import { ChatToPreviewLayout } from "@/registry/remocn/chat-to-preview-layout";
import { CodeAccordion } from "@/registry/remocn/code-accordion";
import { CursorFlow } from "@/registry/remocn/cursor-flow";
import { DataFlowPipes } from "@/registry/remocn/data-flow-pipes";
import { CodeDiffWipe } from "@/registry/remocn/code-diff-wipe";
import { DeviceMockupZoom } from "@/registry/remocn/device-mockup-zoom";
import { DirectionalWipe } from "@/registry/remocn/directional-wipe";
import { DragAndDropFlow } from "@/registry/remocn/drag-and-drop-flow";
import { DynamicGrid } from "@/registry/remocn/dynamic-grid";
import { GlassCodeBlock } from "@/registry/remocn/glass-code-block";
import { InfiniteMarquee } from "@/registry/remocn/infinite-marquee";
import { InlineHighlight } from "@/registry/remocn/inline-highlight";
import { MarkerHighlight } from "@/registry/remocn/marker-highlight";
import { MaskedSlideReveal } from "@/registry/remocn/masked-slide-reveal";
import { MatrixDecode } from "@/registry/remocn/matrix-decode";
import { MeshGradientBg } from "@/registry/remocn/mesh-gradient-bg";
import { MorphingModal } from "@/registry/remocn/morphing-modal";
import { PerspectiveMarquee } from "@/registry/remocn/perspective-marquee";
import { ProgressSteps } from "@/registry/remocn/progress-steps";
import { PulsingIndicator } from "@/registry/remocn/pulsing-indicator";
import { RGBGlitchText } from "@/registry/remocn/rgb-glitch-text";
import { ShimmerSweep } from "@/registry/remocn/shimmer-sweep";
import { SimulatedCursor } from "@/registry/remocn/simulated-cursor";
import { SpotlightCard } from "@/registry/remocn/spotlight-card";
import { SlotMachineRoll } from "@/registry/remocn/slot-machine-roll";
import { SpringPopIn } from "@/registry/remocn/spring-pop-in";
import { StaggeredBentoGrid } from "@/registry/remocn/staggered-bento-grid";
import { StaggeredFadeUp } from "@/registry/remocn/staggered-fade-up";
import { StrikethroughReplace } from "@/registry/remocn/strikethrough-replace";
import { SuccessConfetti } from "@/registry/remocn/success-confetti";
import { TerminalSimulator } from "@/registry/remocn/terminal-simulator";
import { TextFadeReplace } from "@/registry/remocn/text-fade-replace";
import { ToastNotification } from "@/registry/remocn/toast-notification";
import { TrackingIn } from "@/registry/remocn/tracking-in";
import { Typewriter } from "@/registry/remocn/typewriter";
import { ZoomThroughTransition } from "@/registry/remocn/zoom-through-transition";
import { ComponentCustomizer } from "./component-customizer";

const registry: Record<string, React.ComponentType<any>> = {
  "blur-reveal": BlurReveal,
  typewriter: Typewriter,
  "inline-highlight": InlineHighlight,
  "text-fade-replace": TextFadeReplace,
  "strikethrough-replace": StrikethroughReplace,
  "staggered-fade-up": StaggeredFadeUp,
  "masked-slide-reveal": MaskedSlideReveal,
  "tracking-in": TrackingIn,
  "shimmer-sweep": ShimmerSweep,
  "marker-highlight": MarkerHighlight,
  "slot-machine-roll": SlotMachineRoll,
  "matrix-decode": MatrixDecode,
  "rgb-glitch-text": RGBGlitchText,
  "infinite-marquee": InfiniteMarquee,
  "perspective-marquee": PerspectiveMarquee,
  "spotlight-card": SpotlightCard,
  "glass-code-block": GlassCodeBlock,
  "code-accordion": CodeAccordion,
  "cursor-flow": CursorFlow,
  "data-flow-pipes": DataFlowPipes,
  "morphing-modal": MorphingModal,
  "mesh-gradient-bg": MeshGradientBg,
  "dynamic-grid": DynamicGrid,
  "spring-pop-in": SpringPopIn,
  "simulated-cursor": SimulatedCursor,
  "pulsing-indicator": PulsingIndicator,
  "directional-wipe": DirectionalWipe,
  "device-mockup-zoom": DeviceMockupZoom,
  "zoom-through-transition": ZoomThroughTransition,
  "staggered-bento-grid": StaggeredBentoGrid,
  "chat-to-preview-layout": ChatToPreviewLayout,
  "bounding-box-selector": BoundingBoxSelector,
  "animated-line-chart": AnimatedLineChart,
  "animated-bar-chart": AnimatedBarChart,
  "terminal-simulator": TerminalSimulator,
  "code-diff-wipe": CodeDiffWipe,
  "toast-notification": ToastNotification,
  "drag-and-drop-flow": DragAndDropFlow,
  "progress-steps": ProgressSteps,
  "success-confetti": SuccessConfetti,
};

export function ComponentPreview({ name }: { name: string }) {
  const config = componentConfigs[name];
  const Component = registry[name];

  if (!config || !Component) {
    return (
      <div className="not-prose my-6 rounded-lg border border-fd-border p-4 text-sm text-fd-muted-foreground">
        Unknown component: <code>{name}</code>
      </div>
    );
  }

  return (
    <Suspense
      fallback={
        <div className="not-prose my-6 aspect-video w-full animate-pulse rounded-xl bg-muted" />
      }
    >
      <Preview name={name} config={config} Component={Component} />
    </Suspense>
  );
}

function buildParsers(name: string, controls: ControlConfig) {
  const parsers: Record<string, any> = {};
  const urlKeys: Record<string, string> = {};
  const prefix = name.replace(/-/g, "_");

  for (const [key, ctrl] of Object.entries(controls)) {
    urlKeys[key] = `${prefix}_${key}`;
    if (ctrl.type === "text") {
      parsers[key] = parseAsString.withDefault(ctrl.default);
    } else if (ctrl.type === "number") {
      parsers[key] = parseAsFloat.withDefault(ctrl.default);
    } else if (ctrl.type === "color") {
      parsers[key] = parseAsString.withDefault(ctrl.default);
    } else if (ctrl.type === "select") {
      parsers[key] = parseAsStringLiteral(
        ctrl.options as readonly string[],
      ).withDefault(ctrl.default);
    } else if (ctrl.type === "boolean") {
      parsers[key] = parseAsBoolean.withDefault(ctrl.default);
    }
  }
  return { parsers, urlKeys };
}

function Preview({
  name,
  config,
  Component,
}: {
  name: string;
  config: ComponentConfig;
  Component: React.ComponentType<any>;
}) {
  const { parsers, urlKeys } = useMemo(
    () => buildParsers(name, config.controls),
    [name, config.controls],
  );
  const defaults = useMemo(
    () => getDefaults(config.controls),
    [config.controls],
  );

  const [values, setValues] = useQueryStates(parsers, {
    urlKeys,
    clearOnDefault: true,
    shallow: true,
  });

  const isDefault = useMemo(
    () => Object.entries(defaults).every(([k, v]) => values[k] === v),
    [defaults, values],
  );

  const code = useMemo(() => generateCode(config, values), [config, values]);

  const [copied, setCopied] = useState(false);
  const handleCopyLink = () => {
    if (typeof window === "undefined") return;
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const handleReset = () => {
    setValues(null);
  };

  return (
    <div className="not-prose my-6 flex w-full flex-col gap-4">
      <Tabs defaultValue="preview" className="gap-3">
        <TabsList>
          <TabsTrigger value="preview">Preview</TabsTrigger>
          <TabsTrigger value="code">Code</TabsTrigger>
        </TabsList>

        <TabsContent value="preview" className="mt-0">
          <div className="aspect-video w-full overflow-hidden rounded-xl bg-muted">
            <Player
              component={Component}
              inputProps={values}
              durationInFrames={config.durationInFrames}
              fps={config.fps}
              compositionWidth={config.compositionWidth}
              compositionHeight={config.compositionHeight}
              style={{ width: "100%", height: "100%" }}
              controls
              loop
              autoPlay
              acknowledgeRemotionLicense
            />
          </div>
        </TabsContent>

        <TabsContent value="code" className="mt-0">
          <div className="overflow-hidden rounded-xl bg-muted [&_pre]:!rounded-none [&_pre]:!border-0 [&_pre]:!bg-transparent">
            <DynamicCodeBlock lang="tsx" code={code} />
          </div>
        </TabsContent>
      </Tabs>

      <div className="overflow-hidden rounded-xl bg-muted">
        <div className="flex items-center justify-between px-5 pt-4 pb-2">
          <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Customize
          </span>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={handleCopyLink}
              aria-label="Copy share link"
              title="Copy share link"
              className={cn(
                "inline-flex size-7 items-center justify-center rounded-md text-muted-foreground transition-colors",
                "hover:bg-background hover:text-foreground",
              )}
            >
              {copied ? (
                <CheckIcon className="size-3.5" />
              ) : (
                <LinkIcon className="size-3.5" />
              )}
            </button>
            <button
              type="button"
              onClick={handleReset}
              disabled={isDefault}
              aria-label="Reset to defaults"
              title="Reset to defaults"
              className={cn(
                "inline-flex size-7 items-center justify-center rounded-md text-muted-foreground transition-colors",
                "hover:bg-background hover:text-foreground",
                "disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-muted-foreground",
              )}
            >
              <RotateCcwIcon className="size-3.5" />
            </button>
          </div>
        </div>
        <div className="px-5 pb-5">
          <ComponentCustomizer
            controls={config.controls}
            values={values as Record<string, unknown>}
            onChange={(key, value) =>
              setValues((prev) => ({ ...prev, [key]: value }))
            }
          />
        </div>
      </div>
    </div>
  );
}

function generateCode(config: ComponentConfig, props: Record<string, unknown>) {
  const propsString = Object.entries(props)
    .map(([k, v]) => {
      if (typeof v === "string") return `  ${k}="${v}"`;
      return `  ${k}={${JSON.stringify(v)}}`;
    })
    .join("\n");
  return `import { ${config.componentName} } from "${config.importPath}";

<${config.componentName}
${propsString}
/>`;
}
