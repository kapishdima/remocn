import type React from "react";
import { type ComponentConfig, SHARED_CONTROLS } from "@/lib/customizer-config";

import { AnimatedBarChart } from "@/registry/remocn/animated-bar-chart";
import { animatedBarChartConfig } from "@/registry/remocn/animated-bar-chart/config";
import { AnimatedLineChart } from "@/registry/remocn/animated-line-chart";
import { animatedLineChartConfig } from "@/registry/remocn/animated-line-chart/config";
import { BlurReveal } from "@/registry/remocn/blur-reveal";
import { blurRevealConfig } from "@/registry/remocn/blur-reveal/config";
import { BoundingBoxSelector } from "@/registry/remocn/bounding-box-selector";
import { boundingBoxSelectorConfig } from "@/registry/remocn/bounding-box-selector/config";
import { ChatToPreviewLayout } from "@/registry/remocn/chat-to-preview-layout";
import { chatToPreviewLayoutConfig } from "@/registry/remocn/chat-to-preview-layout/config";
import { CodeAccordion } from "@/registry/remocn/code-accordion";
import { codeAccordionConfig } from "@/registry/remocn/code-accordion/config";
import { CodeDiffWipe } from "@/registry/remocn/code-diff-wipe";
import { codeDiffWipeConfig } from "@/registry/remocn/code-diff-wipe/config";
import { CursorFlow } from "@/registry/remocn/cursor-flow";
import { cursorFlowConfig } from "@/registry/remocn/cursor-flow/config";
import { DataFlowPipes } from "@/registry/remocn/data-flow-pipes";
import { dataFlowPipesConfig } from "@/registry/remocn/data-flow-pipes/config";
import { DeviceMockupZoom } from "@/registry/remocn/device-mockup-zoom";
import { deviceMockupZoomConfig } from "@/registry/remocn/device-mockup-zoom/config";
import { DirectionalWipe } from "@/registry/remocn/directional-wipe";
import { directionalWipeConfig } from "@/registry/remocn/directional-wipe/config";
import { DragAndDropFlow } from "@/registry/remocn/drag-and-drop-flow";
import { dragAndDropFlowConfig } from "@/registry/remocn/drag-and-drop-flow/config";
import { DynamicGrid } from "@/registry/remocn/dynamic-grid";
import { dynamicGridConfig } from "@/registry/remocn/dynamic-grid/config";
import { GlassCodeBlock } from "@/registry/remocn/glass-code-block";
import { glassCodeBlockConfig } from "@/registry/remocn/glass-code-block/config";
import { InfiniteMarquee } from "@/registry/remocn/infinite-marquee";
import { infiniteMarqueeConfig } from "@/registry/remocn/infinite-marquee/config";
import { InlineHighlight } from "@/registry/remocn/inline-highlight";
import { inlineHighlightConfig } from "@/registry/remocn/inline-highlight/config";
import { MarkerHighlight } from "@/registry/remocn/marker-highlight";
import { markerHighlightConfig } from "@/registry/remocn/marker-highlight/config";
import { MaskedSlideReveal } from "@/registry/remocn/masked-slide-reveal";
import { maskedSlideRevealConfig } from "@/registry/remocn/masked-slide-reveal/config";
import { MatrixDecode } from "@/registry/remocn/matrix-decode";
import { matrixDecodeConfig } from "@/registry/remocn/matrix-decode/config";
import { MeshGradientBg } from "@/registry/remocn/mesh-gradient-bg";
import { meshGradientBgConfig } from "@/registry/remocn/mesh-gradient-bg/config";
import { MorphingModal } from "@/registry/remocn/morphing-modal";
import { morphingModalConfig } from "@/registry/remocn/morphing-modal/config";
import { PerspectiveMarquee } from "@/registry/remocn/perspective-marquee";
import { perspectiveMarqueeConfig } from "@/registry/remocn/perspective-marquee/config";
import { ProgressSteps } from "@/registry/remocn/progress-steps";
import { progressStepsConfig } from "@/registry/remocn/progress-steps/config";
import { PulsingIndicator } from "@/registry/remocn/pulsing-indicator";
import { pulsingIndicatorConfig } from "@/registry/remocn/pulsing-indicator/config";
import { RGBGlitchText } from "@/registry/remocn/rgb-glitch-text";
import { rgbGlitchTextConfig } from "@/registry/remocn/rgb-glitch-text/config";
import { ShimmerSweep } from "@/registry/remocn/shimmer-sweep";
import { shimmerSweepConfig } from "@/registry/remocn/shimmer-sweep/config";
import { SimulatedCursor } from "@/registry/remocn/simulated-cursor";
import { simulatedCursorConfig } from "@/registry/remocn/simulated-cursor/config";
import { SlotMachineRoll } from "@/registry/remocn/slot-machine-roll";
import { slotMachineRollConfig } from "@/registry/remocn/slot-machine-roll/config";
import { SpotlightCard } from "@/registry/remocn/spotlight-card";
import { spotlightCardConfig } from "@/registry/remocn/spotlight-card/config";
import { SpringPopIn } from "@/registry/remocn/spring-pop-in";
import { springPopInConfig } from "@/registry/remocn/spring-pop-in/config";
import { StaggeredBentoGrid } from "@/registry/remocn/staggered-bento-grid";
import { staggeredBentoGridConfig } from "@/registry/remocn/staggered-bento-grid/config";
import { StaggeredFadeUp } from "@/registry/remocn/staggered-fade-up";
import { staggeredFadeUpConfig } from "@/registry/remocn/staggered-fade-up/config";
import { StrikethroughReplace } from "@/registry/remocn/strikethrough-replace";
import { strikethroughReplaceConfig } from "@/registry/remocn/strikethrough-replace/config";
import { SuccessConfetti } from "@/registry/remocn/success-confetti";
import { successConfettiConfig } from "@/registry/remocn/success-confetti/config";
import { TerminalSimulator } from "@/registry/remocn/terminal-simulator";
import { terminalSimulatorConfig } from "@/registry/remocn/terminal-simulator/config";
import { TextFadeReplace } from "@/registry/remocn/text-fade-replace";
import { textFadeReplaceConfig } from "@/registry/remocn/text-fade-replace/config";
import { ToastNotification } from "@/registry/remocn/toast-notification";
import { toastNotificationConfig } from "@/registry/remocn/toast-notification/config";
import { TrackingIn } from "@/registry/remocn/tracking-in";
import { trackingInConfig } from "@/registry/remocn/tracking-in/config";
import { Typewriter } from "@/registry/remocn/typewriter";
import { typewriterConfig } from "@/registry/remocn/typewriter/config";
import { ZoomThroughTransition } from "@/registry/remocn/zoom-through-transition";
import { zoomThroughTransitionConfig } from "@/registry/remocn/zoom-through-transition/config";

export interface RegistryEntry {
  Component: React.ComponentType<any>;
  config: ComponentConfig;
}

const registry: Record<string, RegistryEntry> = {
  "blur-reveal": { Component: BlurReveal, config: blurRevealConfig },
  typewriter: { Component: Typewriter, config: typewriterConfig },
  "inline-highlight": { Component: InlineHighlight, config: inlineHighlightConfig },
  "text-fade-replace": { Component: TextFadeReplace, config: textFadeReplaceConfig },
  "strikethrough-replace": { Component: StrikethroughReplace, config: strikethroughReplaceConfig },
  "staggered-fade-up": { Component: StaggeredFadeUp, config: staggeredFadeUpConfig },
  "masked-slide-reveal": { Component: MaskedSlideReveal, config: maskedSlideRevealConfig },
  "tracking-in": { Component: TrackingIn, config: trackingInConfig },
  "shimmer-sweep": { Component: ShimmerSweep, config: shimmerSweepConfig },
  "marker-highlight": { Component: MarkerHighlight, config: markerHighlightConfig },
  "slot-machine-roll": { Component: SlotMachineRoll, config: slotMachineRollConfig },
  "matrix-decode": { Component: MatrixDecode, config: matrixDecodeConfig },
  "rgb-glitch-text": { Component: RGBGlitchText, config: rgbGlitchTextConfig },
  "infinite-marquee": { Component: InfiniteMarquee, config: infiniteMarqueeConfig },
  "perspective-marquee": { Component: PerspectiveMarquee, config: perspectiveMarqueeConfig },
  "spotlight-card": { Component: SpotlightCard, config: spotlightCardConfig },
  "glass-code-block": { Component: GlassCodeBlock, config: glassCodeBlockConfig },
  "code-accordion": { Component: CodeAccordion, config: codeAccordionConfig },
  "cursor-flow": { Component: CursorFlow, config: cursorFlowConfig },
  "data-flow-pipes": { Component: DataFlowPipes, config: dataFlowPipesConfig },
  "morphing-modal": { Component: MorphingModal, config: morphingModalConfig },
  "mesh-gradient-bg": { Component: MeshGradientBg, config: meshGradientBgConfig },
  "dynamic-grid": { Component: DynamicGrid, config: dynamicGridConfig },
  "spring-pop-in": { Component: SpringPopIn, config: springPopInConfig },
  "simulated-cursor": { Component: SimulatedCursor, config: simulatedCursorConfig },
  "pulsing-indicator": { Component: PulsingIndicator, config: pulsingIndicatorConfig },
  "directional-wipe": { Component: DirectionalWipe, config: directionalWipeConfig },
  "device-mockup-zoom": { Component: DeviceMockupZoom, config: deviceMockupZoomConfig },
  "zoom-through-transition": { Component: ZoomThroughTransition, config: zoomThroughTransitionConfig },
  "staggered-bento-grid": { Component: StaggeredBentoGrid, config: staggeredBentoGridConfig },
  "chat-to-preview-layout": { Component: ChatToPreviewLayout, config: chatToPreviewLayoutConfig },
  "bounding-box-selector": { Component: BoundingBoxSelector, config: boundingBoxSelectorConfig },
  "animated-line-chart": { Component: AnimatedLineChart, config: animatedLineChartConfig },
  "animated-bar-chart": { Component: AnimatedBarChart, config: animatedBarChartConfig },
  "terminal-simulator": { Component: TerminalSimulator, config: terminalSimulatorConfig },
  "code-diff-wipe": { Component: CodeDiffWipe, config: codeDiffWipeConfig },
  "toast-notification": { Component: ToastNotification, config: toastNotificationConfig },
  "drag-and-drop-flow": { Component: DragAndDropFlow, config: dragAndDropFlowConfig },
  "progress-steps": { Component: ProgressSteps, config: progressStepsConfig },
  "success-confetti": { Component: SuccessConfetti, config: successConfettiConfig },
};

// Append the shared controls (e.g. `speed`) to every component config so
// every animation in the customizer exposes the same baseline knobs.
for (const { config } of Object.values(registry)) {
  config.controls = { ...config.controls, ...SHARED_CONTROLS };
}

export default registry;
