"use client";

import { clamp01, mixOklch, type RemocnTheme, useRemocnTheme } from "@/lib/remocn-ui";

export type SliderThumbState = "idle" | "hover" | "press";

// ===========================================================================
// Slider visual — the COMPLETE animated look for a moment in time. This is a
// DUAL-channel atom (value-channel deviation §0): the numeric `value` animates
// as a lerp while the thumb visuals (`thumbScale`, `ringOpacity`) come from a
// `thumbState` preset. Both live in one `SliderStyle`; `useSliderTransition`
// feeds an interpolated one through the `style` prop. The component never reads
// the frame.
// ===========================================================================

export interface SliderStyle {
  /** Fill percentage 0–100 (clamped by the renderer). */
  value: number;
  /** Thumb zoom: 1 idle, grows on hover/press. */
  thumbScale: number;
  /** Grab-ring opacity 0 (idle) → 1 (hover/press). */
  ringOpacity: number;
}

export interface SliderProps {
  /** Fill percentage 0–100 (snap path). Clamped. Ignored when `style` is set. */
  value?: number;
  /** Thumb visual state (snap path). Ignored when `style` is set. */
  thumbState?: SliderThumbState;
  /**
   * Resolved animated visual (smooth path). When provided, takes precedence over
   * `value`/`thumbState` — feed it an interpolated `SliderStyle` from
   * `useSliderTransition`.
   */
  style?: SliderStyle;
  /** Track width in px. */
  width?: number;
  /** Show the current value above the thumb. */
  showValue?: boolean;
  theme?: Partial<RemocnTheme>;
  mode?: "light" | "dark";
  className?: string;
}

/** Track height (px) — shadcn `h-2`. */
const TRACK_HEIGHT = 8;
/** Thumb pill — shadcn `h-4 w-6` (16×24), `rounded-full` → radius = height/2. */
const THUMB_HEIGHT = 16;
const THUMB_WIDTH = 24;
const THUMB_RADIUS = THUMB_HEIGHT / 2;
/** Grab-ring width (px) at full opacity — shadcn `ring-4`. */
const RING_WIDTH = 4;

/** Clamp a 0–100 value to [0,100]. Reuses core clamp01 on the normalized value. */
function clampValue(value: number): number {
  return clamp01(value / 100) * 100;
}

/**
 * The thumb-channel preset for a state — pure `(thumbState) => {thumbScale,
 * ringOpacity}`. Hover and press both grow the thumb and show the grab ring;
 * press grows it a touch more. The `value` channel is independent of this.
 */
export function sliderThumbStyle(thumbState: SliderThumbState): {
  thumbScale: number;
  ringOpacity: number;
} {
  switch (thumbState) {
    case "hover":
      return { thumbScale: 1.1, ringOpacity: 1 };
    case "press":
      return { thumbScale: 1.15, ringOpacity: 1 };
    default:
      return { thumbScale: 1, ringOpacity: 0 };
  }
}

/** Concrete colors for the active theme, resolved once per render. */
export interface SliderStyleContext {
  /** Track rail — shadcn `bg-input/90`. */
  track: string;
  /** Range fill — shadcn `bg-primary`. */
  range: string;
  /** Thumb fill — shadcn white in both themes. */
  thumbBg: string;
  /** Resting 1px ring on the thumb — shadcn `ring-1 ring-black/10`. */
  thumbRing: string;
  /** Grab ring — shadcn `ring-ring/30` (baked to ~30% via a mix toward bg). */
  ring: string;
  /** showValue label color. */
  valueText: string;
}

/**
 * Derive the concrete colors for a theme. Pure. Matches the current shadcn
 * slider: an `input` track, a white thumb, and a `ring`-token grab ring baked to
 * ~30% (a mix toward the background) so it reads as a soft but visible halo in
 * both light and dark.
 */
export function sliderStyleContext(theme: RemocnTheme): SliderStyleContext {
  return {
    // bg-input/90 — nudge the input token 10% toward background for the /90.
    track: mixOklch(theme.input, theme.background, 0.1),
    range: theme.primary,
    // shadcn thumb is white in both themes.
    thumbBg: "oklch(1 0 0)",
    // ring-black/10 resting hairline.
    thumbRing: "rgba(0, 0, 0, 0.1)",
    // ring-ring/30 → ~30% of the ring token: 70% toward background.
    ring: mixOklch(theme.ring, theme.background, 0.7),
    valueText: theme.foreground,
  };
}

/**
 * A deterministic slider. Pure renderer of whatever it receives — it reads no
 * frame, holds no state, runs no effects. Snap (`value` + `thumbState`) and
 * smooth (`style`) share one render path. Placement is the caller's job; the
 * slider renders inline.
 */
export function Slider({
  value = 0,
  thumbState = "idle",
  style,
  width = 320,
  showValue = false,
  theme: themeOverride,
  mode,
  className,
}: SliderProps) {
  const theme = useRemocnTheme(themeOverride, mode);
  const ctx = sliderStyleContext(theme);

  const thumb = sliderThumbStyle(thumbState);
  const v: SliderStyle = style ?? {
    value,
    thumbScale: thumb.thumbScale,
    ringOpacity: thumb.ringOpacity,
  };
  const pct = clampValue(v.value);

  return (
    <div
      className={className}
      style={{
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        width,
        height: THUMB_HEIGHT,
        fontFamily:
          "var(--font-geist-sans), -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      {/* Track — muted rail. */}
      <div
        style={{
          position: "relative",
          width: "100%",
          height: TRACK_HEIGHT,
          borderRadius: TRACK_HEIGHT / 2,
          background: ctx.track,
        }}
      >
        {/* Range — primary fill from the left to `value%`. */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: `${pct}%`,
            borderRadius: TRACK_HEIGHT / 2,
            background: ctx.range,
          }}
        />
      </div>
      {/* Thumb — positioned at value%, centered via translateX(-50%). The grab
          ring sits behind it, fading in on hover/press. */}
      <div
        style={{
          position: "absolute",
          left: `${pct}%`,
          top: "50%",
          transform: `translate(-50%, -50%) scale(${v.thumbScale})`,
        }}
      >
        {/* Grab ring — a rounded-rect halo hugging the pill, fading in on
            hover/press (shadcn ring-4 ring-ring/30). */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            width: THUMB_WIDTH + RING_WIDTH * 2,
            height: THUMB_HEIGHT + RING_WIDTH * 2,
            transform: "translate(-50%, -50%)",
            borderRadius: THUMB_RADIUS + RING_WIDTH,
            background: ctx.ring,
            opacity: v.ringOpacity,
          }}
        />
        {/* Thumb — white 16×24 pill with shadow-md and a resting ring-1
            ring-black/10 hairline (inset box-shadow). */}
        <div
          style={{
            position: "relative",
            width: THUMB_WIDTH,
            height: THUMB_HEIGHT,
            borderRadius: THUMB_RADIUS,
            background: ctx.thumbBg,
            boxShadow: `0 0 0 1px ${ctx.thumbRing}, 0 2px 4px rgba(0,0,0,0.18)`,
          }}
        />
        {showValue && (
          <span
            style={{
              position: "absolute",
              left: "50%",
              bottom: "100%",
              marginBottom: 8,
              transform: "translateX(-50%)",
              fontSize: 12,
              fontWeight: 500,
              fontVariantNumeric: "tabular-nums",
              color: ctx.valueText,
            }}
          >
            {Math.round(pct)}
          </span>
        )}
      </div>
    </div>
  );
}
