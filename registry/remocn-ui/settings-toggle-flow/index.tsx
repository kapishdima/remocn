"use client";

import { useButtonTransition } from "@/components/remocn/use-button-transition";
import { Cursor } from "@/components/remocn/cursor";
import { useCursorPath } from "@/components/remocn/use-cursor-path";
import { Select } from "@/components/remocn/select";
import { useSelectTransition } from "@/components/remocn/use-select-transition";
import { useSelectItemTransition } from "@/components/remocn/use-select-item-transition";
import { Slider } from "@/components/remocn/slider";
import { useSliderTransition } from "@/components/remocn/use-slider-transition";
import { Switch } from "@/components/remocn/switch";
import { useSwitchTransition } from "@/components/remocn/use-switch-transition";
import { Toast } from "@/components/remocn/toast";
import { useToastTransition } from "@/components/remocn/use-toast-transition";
import type { RemocnTheme } from "@/lib/remocn-ui";

/**
 * Settings toggle flow — a shippable composition scene. Pure orchestrator: a
 * cursor walks a settings panel, flipping a Switch, choosing a Select option,
 * and dragging a Slider, ending on a "Settings saved" Toast. Each interaction is
 * driven by its primitive's hook; the block holds no state/effect/frame of its
 * own (see §0B.2). Beat `at` values are the single source of truth (PRD US-B005)
 * and frame-synced so each cursor click/press lands on the same frame as the
 * state change it triggers.
 */

const DEFAULT_ROWS = [
  { label: "Notifications" },
  { label: "Theme" },
  { label: "Volume" },
];
const DEFAULT_SELECT_ITEMS = ["System", "Light", "Dark"];

// Stage geometry (1280×720): three stacked rows. The Switch, the Select trigger,
// and the Slider thumb each get a cursor target. The Select panel opens below
// its trigger, so the chosen item (index 2 → "Dark") sits ~96px lower.
const SWITCH_Y = 200;
const SWITCH_X = 700;
const SELECT_Y = 332;
const SELECT_X = 640;
const SELECT_ITEM_Y = 444;
const SLIDER_Y = 504;
const SLIDER_START_X = 544;
const SLIDER_END_X = 736;

export interface SettingsToggleFlowProps {
  /** Setting rows (label only). The first row carries the toggle switch. */
  rows?: { label: string }[];
  /** Options shown in the Select panel. */
  selectItems?: string[];
  /** Headline of the success toast. */
  toastTitle?: string;
  mode?: "light" | "dark";
  theme?: Partial<RemocnTheme>;
}

export function SettingsToggleFlow({
  rows = DEFAULT_ROWS,
  selectItems = DEFAULT_SELECT_ITEMS,
  toastTitle = "Settings saved",
  mode = "light",
  theme,
}: SettingsToggleFlowProps) {
  const opts = { mode, theme };

  // Cursor: click Switch (24) → click Select trigger (55) → click item (80) →
  // press Slider thumb (105) and drag to 150 → release. Each click/press `at`
  // equals the driven primitive's `at`.
  const cursorStyle = useCursorPath([
    { at: 0, x: 96, y: 80 },
    { at: 24, x: SWITCH_X, y: SWITCH_Y, duration: 20 },
    { at: 24, x: SWITCH_X, y: SWITCH_Y, click: true, duration: 0 },
    { at: 55, x: SELECT_X, y: SELECT_Y, duration: 22 },
    { at: 55, x: SELECT_X, y: SELECT_Y, click: true, duration: 0 },
    { at: 80, x: SELECT_X, y: SELECT_ITEM_Y, duration: 18 },
    { at: 80, x: SELECT_X, y: SELECT_ITEM_Y, click: true, duration: 0 },
    { at: 105, x: SLIDER_START_X, y: SLIDER_Y, duration: 18 },
    { at: 105, x: SLIDER_START_X, y: SLIDER_Y, press: true, duration: 0 },
    { at: 150, x: SLIDER_END_X, y: SLIDER_Y, press: true, duration: 45 },
    { at: 158, x: SLIDER_END_X, y: SLIDER_Y, duration: 0 },
  ]);

  // Beat 2 — switch turns on at the click (24).
  const switchStyle = useSwitchTransition(
    [{ at: 24, state: "checked", duration: 12 }],
    opts,
  );

  // Beats 4/7 — select panel opens at 55, closes at 90.
  const panelStyle = useSelectTransition(
    [
      { at: 55, state: "opened", duration: 14 },
      { at: 90, state: "closed", duration: 12 },
    ],
    opts,
  );

  // The select trigger button "click" — hover into the open press at 55.
  const triggerStyle = useButtonTransition(
    [
      { at: 45, state: "hover", duration: 8 },
      { at: 55, state: "press", duration: 8 },
    ],
    { variant: "outline", ...opts },
  );

  // Beat 6 — the last item (index 2) is highlighted, pressed, then selected at 80.
  const itemStyle = useSelectItemTransition(
    [
      { at: 68, state: "hover", duration: 8 },
      { at: 78, state: "press", duration: 6 },
      { at: 80, state: "selected", duration: 10 },
    ],
    opts,
  );

  // Beat 9 — dual-channel slider: value eases 20 → 80 across the drag while the
  // thumb idles → hover → press → idle, all from one hook.
  const sliderStyle = useSliderTransition([
    { at: 0, value: 20, thumbState: "idle" },
    { at: 105, thumbState: "press", duration: 6 },
    { at: 105, value: 20 },
    { at: 150, value: 80, duration: 45, easing: "inOut" },
    { at: 158, thumbState: "idle", duration: 8 },
  ]);

  // Beats 10/11 — toast enters at 155 (after the drag), auto-dismisses at 215.
  // The toast hook tints by `mode` only; `theme` rides the component prop below.
  const toastStyle = useToastTransition(
    [
      { at: 155, state: "visible", duration: 12 },
      { at: 215, state: "hidden", duration: 12 },
    ],
    { mode },
  );

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      {/* Switch row — its own relative box scopes the primitive's inset:0. */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: SWITCH_Y - 32,
          height: 64,
        }}
      >
        <Switch
          style={switchStyle}
          label={rows[0]?.label ?? "Notifications"}
          mode={mode}
          theme={theme}
        />
      </div>

      {/* Select row — the trigger; the panel opens below into the item row. */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: SELECT_Y - 32,
          height: 240,
        }}
      >
        <Select
          style={panelStyle}
          label={rows[1]?.label ?? "Theme"}
          items={selectItems}
          triggerStyle={triggerStyle}
          itemStyles={selectItems.map((_, i) =>
            i === selectItems.length - 1 ? itemStyle : undefined,
          )}
          mode={mode}
          theme={theme}
        />
      </div>

      {/* Slider row. */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: SLIDER_Y,
          transform: "translate(-50%, -50%)",
        }}
      >
        <Slider style={sliderStyle} width={320} mode={mode} theme={theme} />
      </div>

      {/* Success toast, anchored bottom-right. */}
      <div style={{ position: "absolute", right: 24, bottom: 24 }}>
        <Toast
          style={toastStyle}
          title={toastTitle}
          variant="success"
          mode={mode}
          theme={theme}
        />
      </div>

      <Cursor style={cursorStyle} variant="pointer" mode={mode} theme={theme} />
    </div>
  );
}
