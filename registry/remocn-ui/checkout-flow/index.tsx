"use client";

import { type RemocnTheme, useRemocnTheme } from "@/lib/remocn-ui";
import { Cursor } from "@/components/remocn/cursor";
import { useCursorPath } from "@/components/remocn/use-cursor-path";
import { Input } from "@/components/remocn/input";
import { useInputTransition } from "@/components/remocn/use-input-transition";
import { Button } from "@/components/remocn/button";
import { useButtonTransition } from "@/components/remocn/use-button-transition";
import { Checkbox } from "@/components/remocn/checkbox";
import { useCheckboxTransition } from "@/components/remocn/use-checkbox-transition";
import {
  ToggleGroup,
  type ToggleGroupItem,
} from "@/components/remocn/toggle-group";
import { useToggleGroupTransition } from "@/components/remocn/use-toggle-group-transition";
import { Toast } from "@/components/remocn/toast";
import { useToastTransition } from "@/components/remocn/use-toast-transition";
import { BlurIn } from "@/components/remocn/blur-in";
import { useBlurInTransition } from "@/components/remocn/use-blur-in-transition";
import {
  Field,
  FieldControl,
  FieldGroup,
  FieldLabel,
} from "@/components/remocn/field";

/**
 * Checkout flow — a shippable composition scene rendered as a real card (no
 * Dialog). Pure orchestrator: it scripts the lifecycle by calling each
 * primitive's transition hook (which legitimately read the frame) and lays the
 * primitives out on a position:relative stage. The block holds no
 * state/effect/frame of its own.
 *
 * The card itself, its header, and each field blur-in in sequence (card →
 * header → toggle → card number → terms → pay), then a cursor flips the billing
 * toggle monthly → yearly, types the card number, ticks the terms checkbox, and
 * presses Pay → loading → success → success Toast. Beat `at` values are the
 * single source of truth and are frame-synced so each cursor click lands on the
 * same frame as the state change it triggers.
 */

// Default plan segments for the billing toggle (value === label by default).
const DEFAULT_PLANS: ToggleGroupItem[] = [
  { value: "monthly", label: "Monthly" },
  { value: "yearly", label: "Yearly" },
];

// Stage geometry (1280×720). The card is centered; cursor Y targets are the
// vertical centers of each clickable control as they stack in the card column.
// Fields are left-aligned and the Pay button is right-aligned, so the X targets
// are anchored to the card's content edges, not its center.
const STAGE_W = 1280;
const CARD_W = 420;
const CARD_PAD = 28;
const CARD_TOP = 96;
const CARD_LEFT = (STAGE_W - CARD_W) / 2; // 430
const CENTER_X = STAGE_W / 2; // 640
const CONTENT_LEFT = CARD_LEFT + CARD_PAD; // 458
const CONTENT_RIGHT = CARD_LEFT + CARD_W - CARD_PAD; // 822

const TOGGLE_Y = 222;
const YEARLY_X = CONTENT_LEFT + 4 + 88 + 44; // 594 — "Yearly" segment center
const CARD_X = CENTER_X; // the input fills the row; click its middle
const CARD_Y = 312;
const TERMS_X = CONTENT_LEFT + 12; // 470 — over the left-aligned checkbox box
const TERMS_Y = 376;
const PAY_X = CONTENT_RIGHT - 48; // 774 — over the right-aligned Pay button
const PAY_Y = 442;

export interface CheckoutFlowProps {
  /** Card title. */
  title?: string;
  /** Card description under the title. */
  description?: string;
  /** Billing toggle segments. The first is the resting selection. */
  plans?: ToggleGroupItem[];
  /** Label above the card-number input. */
  cardLabel?: string;
  /** Card-number value revealed by the typing input. */
  cardPlaceholder?: string;
  /** Label shown beside the terms checkbox. */
  termsLabel?: string;
  /** Primary (pay) button label. */
  payLabel?: string;
  /** Headline of the success toast. */
  toastTitle?: string;
  mode?: "light" | "dark";
  theme?: Partial<RemocnTheme>;
}

export function CheckoutFlow({
  title = "Upgrade your plan",
  description = "Complete your purchase to unlock every feature.",
  plans = DEFAULT_PLANS,
  cardLabel = "Card number",
  cardPlaceholder = "4242 4242 4242 4242",
  termsLabel = "I accept the terms and conditions",
  payLabel = "Pay $49",
  toastTitle = "Payment successful",
  mode = "light",
  theme,
}: CheckoutFlowProps) {
  const resolved = useRemocnTheme(theme, mode);
  const opts = { mode, theme };

  // Entrance — card surface fades in place (distance 0 → no slide, so it never
  // becomes a transform containing block for the inset:0 atoms it holds), then
  // the header and each field blur-in staggered. All complete by frame 58,
  // before the first cursor click at 64.
  const cardEnter = useBlurInTransition(
    [{ at: 0, state: "revealed", duration: 18 }],
    { distance: 0 },
  );
  const enterHeader = useBlurInTransition([
    { at: 18, state: "revealed", duration: 16 },
  ]);
  const enterToggle = useBlurInTransition([
    { at: 24, state: "revealed", duration: 16 },
  ]);
  const enterCard = useBlurInTransition([
    { at: 30, state: "revealed", duration: 16 },
  ]);
  const enterTerms = useBlurInTransition([
    { at: 36, state: "revealed", duration: 16 },
  ]);
  const enterButton = useBlurInTransition([
    { at: 42, state: "revealed", duration: 16 },
  ]);

  // Cursor — clicks the Yearly segment (64), the card-number field (96), the
  // terms checkbox (150), then the Pay button (180). Each click `at` equals the
  // `at` of the state change it drives.
  const cursorStyle = useCursorPath([
    { at: 0, x: 140, y: 90 },
    { at: 64, x: YEARLY_X, y: TOGGLE_Y, duration: 22, click: true },
    { at: 96, x: CARD_X, y: CARD_Y, duration: 24, click: true },
    { at: 150, x: TERMS_X, y: TERMS_Y, duration: 30, click: true },
    { at: 180, x: PAY_X, y: PAY_Y, duration: 26, click: true },
  ]);

  // Billing toggle slides monthly → yearly on the click at 64.
  const toggleStyle = useToggleGroupTransition(
    [{ at: 64, state: plans[1]?.value ?? "yearly", duration: 16 }],
    { items: plans, ...opts },
  );

  // Card-number field — focus on the click at 96, type 100→140, then settle to
  // the static blur (filled/unfocused) state as the cursor leaves at 150.
  const cardStyle = useInputTransition(
    [
      { at: 96, state: "active", duration: 6 },
      { at: 100, state: "typing", duration: 40 },
      { at: 150, state: "blur", duration: 8 },
    ],
    opts,
  );

  // Terms checkbox ticks on the click at 150.
  const checkboxStyle = useCheckboxTransition(
    [{ at: 150, state: "checked", duration: 14 }],
    opts,
  );

  // Pay button — hovers, presses into the click at 180, loads, then succeeds.
  const payStyle = useButtonTransition(
    [
      { at: 172, state: "hover", duration: 8 },
      { at: 180, state: "press", duration: 6 },
      { at: 186, state: "loading", duration: 6 },
      { at: 224, state: "success", duration: 16 },
    ],
    opts,
  );

  // Success toast enters at 224, auto-dismisses at 286. The toast hook tints by
  // `mode` only; `theme` rides the component prop below.
  const toastStyle = useToastTransition(
    [
      { at: 224, state: "visible", duration: 14 },
      { at: 286, state: "hidden", duration: 14 },
    ],
    { mode },
  );

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        background: resolved.muted,
        fontFamily:
          "var(--font-geist-sans), -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: CARD_LEFT,
          top: CARD_TOP,
          width: CARD_W,
          height: 420,
          boxSizing: "border-box",
          padding: 28,
          display: "flex",
          flexDirection: "column",
          gap: 24,
          background: resolved.background,
          border: `1px solid ${resolved.border}`,
          borderRadius: 14,
          boxShadow:
            "0 10px 30px -12px rgba(0,0,0,0.22), 0 2px 8px -3px rgba(0,0,0,0.10)",
          opacity: cardEnter.opacity,
          filter: cardEnter.blur > 0 ? `blur(${cardEnter.blur}px)` : "none",
        }}
      >
        <BlurIn display="block" style={enterHeader}>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <div
              style={{
                fontSize: 22,
                lineHeight: "28px",
                fontWeight: 600,
                letterSpacing: "-0.02em",
                color: resolved.cardForeground,
              }}
            >
              {title}
            </div>
            <div
              style={{
                fontSize: 14,
                lineHeight: "20px",
                color: resolved.mutedForeground,
              }}
            >
              {description}
            </div>
          </div>
        </BlurIn>

        <BlurIn display="block" style={enterToggle}>
          <FieldControl height={44}>
            <ToggleGroup
              style={toggleStyle}
              items={plans}
              align="start"
              mode={mode}
              theme={theme}
            />
          </FieldControl>
        </BlurIn>

        <FieldGroup gap={24}>
          <BlurIn display="block" style={enterCard}>
            <Field>
              <FieldLabel mode={mode} theme={theme}>
                {cardLabel}
              </FieldLabel>
              <FieldControl>
                <Input
                  placeholder={cardPlaceholder}
                  value={cardPlaceholder}
                  style={cardStyle}
                  fullWidth
                  mode={mode}
                  theme={theme}
                />
              </FieldControl>
            </Field>
          </BlurIn>

          <BlurIn display="block" style={enterTerms}>
            <FieldControl>
              <Checkbox
                label={termsLabel}
                style={checkboxStyle}
                align="start"
                mode={mode}
                theme={theme}
              />
            </FieldControl>
          </BlurIn>
        </FieldGroup>

        <BlurIn display="block" style={enterButton}>
          <Field gap={10}>
            <FieldControl height={44}>
              <Button
                label={payLabel}
                style={payStyle}
                align="end"
                mode={mode}
                theme={theme}
              />
            </FieldControl>
          </Field>
        </BlurIn>
      </div>

      <div style={{ position: "absolute", right: 32, bottom: 32 }}>
        <Toast
          title={toastTitle}
          variant="success"
          style={toastStyle}
          mode={mode}
          theme={theme}
        />
      </div>

      <Cursor style={cursorStyle} variant="pointer" mode={mode} theme={theme} />
    </div>
  );
}
