"use client";

import { Button } from "@/components/remocn/button";
import { useButtonTransition } from "@/components/remocn/use-button-transition";
import { Cursor } from "@/components/remocn/cursor";
import { useCursorPath } from "@/components/remocn/use-cursor-path";
import { Dialog } from "@/components/remocn/dialog";
import { useDialogTransition } from "@/components/remocn/use-dialog-transition";
import { Input } from "@/components/remocn/input";
import { useInputTransition } from "@/components/remocn/use-input-transition";
import { Toast } from "@/components/remocn/toast";
import { useToastTransition } from "@/components/remocn/use-toast-transition";
import {
  ToggleGroup,
  type ToggleGroupItem,
} from "@/components/remocn/toggle-group";
import { useToggleGroupTransition } from "@/components/remocn/use-toggle-group-transition";
import type { RemocnTheme } from "@/lib/remocn-ui";

/**
 * Checkout flow — a shippable composition scene. Pure orchestrator: it scripts
 * the lifecycle by calling each primitive's transition hook (which legitimately
 * read the frame) and lays the primitives out on a position:relative stage. The
 * block itself holds no state/effect/frame of its own (see §0B.2). Beat `at`
 * values are the single source of truth (PRD US-B003) and are frame-synced so
 * each cursor click lands on the same frame as the state change it triggers.
 *
 * Lifecycle: toggle monthly→yearly → cursor to Upgrade → Dialog opens → card
 * number types in → confirm press → loading → success → Dialog closes → Toast.
 */

// Default plan segments for the billing toggle (value === label by default).
const DEFAULT_PLANS: ToggleGroupItem[] = [
  { value: "monthly", label: "Monthly" },
  { value: "yearly", label: "Yearly" },
];

// Stage geometry (1280×720). The toggle sits high, the Upgrade button mid-low;
// the cursor hotspot targets each in turn. Two-segment default toggle is 184px
// wide, centered → "Yearly" segment center X ≈ 684.
const TOGGLE_Y = 232;
const YEARLY_X = 684;
const UPGRADE_X = 640;
const UPGRADE_Y = 432;

export interface CheckoutFlowProps {
  /** Billing toggle segments. The first is the resting selection. */
  plans?: ToggleGroupItem[];
  /** Label of the button that opens the payment dialog. */
  upgradeLabel?: string;
  /** Card-number value revealed by the typing input inside the dialog. */
  cardPlaceholder?: string;
  /** Label of the dialog's primary (confirm) action button. */
  confirmLabel?: string;
  /** Headline of the success toast. */
  toastTitle?: string;
  mode?: "light" | "dark";
  theme?: Partial<RemocnTheme>;
}

export function CheckoutFlow({
  plans = DEFAULT_PLANS,
  upgradeLabel = "Upgrade",
  cardPlaceholder = "4242 4242 4242 4242",
  confirmLabel = "Pay",
  toastTitle = "Payment successful",
  mode = "light",
  theme,
}: CheckoutFlowProps) {
  const opts = { mode, theme };

  // Beat 1 — cursor clicks the "Yearly" segment at 24; then eases to Upgrade and
  // clicks at 50 (beat 3). Click `at` == the driven state-change `at`.
  const cursorStyle = useCursorPath([
    { at: 0, x: 96, y: 80 },
    { at: 24, x: YEARLY_X, y: TOGGLE_Y, duration: 22 },
    { at: 24, x: YEARLY_X, y: TOGGLE_Y, click: true, duration: 0 },
    { at: 50, x: UPGRADE_X, y: UPGRADE_Y, duration: 22 },
    { at: 50, x: UPGRADE_X, y: UPGRADE_Y, click: true, duration: 0 },
  ]);

  // Beat 2 — toggle slides monthly → yearly on the click at 24.
  const toggleStyle = useToggleGroupTransition(
    [{ at: 24, state: plans[1]?.value ?? "yearly", duration: 14 }],
    { items: plans, ...opts },
  );

  // Beat 4 — the Upgrade button hovers then presses into the click at 50.
  const upgradeStyle = useButtonTransition(
    [
      { at: 40, state: "hover", duration: 10 },
      { at: 50, state: "press", duration: 8 },
    ],
    opts,
  );

  // Beat 5 / 10 — dialog opens at 56 (after the press), closes at 175.
  const dialogStyle = useDialogTransition(
    [
      { at: 56, state: "opened", duration: 14 },
      { at: 175, state: "closed", duration: 12 },
    ],
    opts,
  );

  // Beat 6 — card number types in from 70 to 120 (inside the dialog). `at` is the
  // transition START and the reveal ramps over [at, at+duration) (useStateTransition
  // / STYLE-GUIDE §5), so the typing window is [70, 120] — fully revealed by 120,
  // before the confirm press at 124 (PRD US-B003 beat 6 + AC4). A brief `active`
  // focus precedes it as the dialog settles.
  const cardStyle = useInputTransition(
    [
      { at: 62, state: "active", duration: 8 },
      { at: 70, state: "typing", duration: 50 },
    ],
    opts,
  );

  // Beats 7/8/9 — confirm press (124) → loading (128) → success (165).
  const confirmStyle = useButtonTransition(
    [
      { at: 124, state: "press", duration: 6 },
      { at: 128, state: "loading", duration: 6 },
      { at: 165, state: "success", duration: 16 },
    ],
    opts,
  );

  // Beats 11/12 — success toast enters at 178, auto-dismisses at 235. The toast
  // hook tints by `mode` only (no animated theme channel); `theme` rides the
  // component prop below.
  const toastStyle = useToastTransition(
    [
      { at: 178, state: "visible", duration: 12 },
      { at: 235, state: "hidden", duration: 12 },
    ],
    { mode },
  );

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      {/* Billing toggle — its own relative box scopes the primitive's inset:0. */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: TOGGLE_Y - 40,
          height: 80,
        }}
      >
        <ToggleGroup style={toggleStyle} items={plans} mode={mode} theme={theme} />
      </div>

      {/* Upgrade button. */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: UPGRADE_Y - 40,
          height: 80,
        }}
      >
        <Button
          label={upgradeLabel}
          style={upgradeStyle}
          mode={mode}
          theme={theme}
        />
      </div>

      {/* Payment dialog — transparent overlay; the backdrop + card fade with it.
          The card-number input and confirm button are layered over the card and
          ride the dialog's own opacity (driven by the same hook). */}
      <Dialog
        style={dialogStyle}
        title="Complete payment"
        description="Enter your card details to finish upgrading."
        actionLabel={confirmLabel}
        cancelLabel="Cancel"
        mode={mode}
        theme={theme}
      />

      {/* Card-number field, overlaid on the dialog body, fading with the popup. */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 332,
          height: 64,
          opacity: dialogStyle.popupOpacity,
        }}
      >
        <Input
          style={cardStyle}
          placeholder={cardPlaceholder}
          value={cardPlaceholder}
          mode={mode}
          theme={theme}
        />
      </div>

      {/* Confirm button, overlaid on the dialog footer, fading with the popup. */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 408,
          height: 64,
          opacity: dialogStyle.popupOpacity,
        }}
      >
        <Button
          label={confirmLabel}
          style={confirmStyle}
          mode={mode}
          theme={theme}
        />
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
