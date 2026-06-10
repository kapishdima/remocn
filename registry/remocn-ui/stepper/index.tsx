"use client";

import { clamp01, mixOklch, type RemocnTheme, useRemocnTheme } from "@/lib/remocn-ui";

// ===========================================================================
// Stepper visual — the COMPLETE animated look for a moment in time. The animated
// channel is a single CONTINUOUS float `position` (the value-channel deviation
// §0, like progress): every circle's fill/color/check and every connector's
// primary fill derive PURELY from `position` in the render. `useStepperTransition`
// feeds an interpolated `StepperStyle` through `style`; the component never reads
// the frame.
// ===========================================================================

export interface StepperStyle {
  /**
   * Continuous active-step index (0..n-1, float). The ONLY animated field — each
   * circle and connector is a pure function of it, so a lerp advances the stepper
   * smoothly (checks draw, connectors fill) without jumps.
   */
  position: number;
}

export type StepperOrientation = "horizontal" | "vertical";

export interface StepperProps {
  /** Step labels. Their count is the step count. */
  steps?: string[];
  /**
   * Active step index (snap path). Ignored when `style` is supplied. May be a
   * float, but is typically an integer for the snap form.
   */
  activeIndex?: number;
  /**
   * Resolved animated visual (smooth path). When provided, takes precedence over
   * `activeIndex` — feed it an interpolated `StepperStyle` from `useStepperTransition`.
   */
  style?: StepperStyle;
  /**
   * Layout. Only `"horizontal"` is implemented this wave; `"vertical"` is
   * accepted but falls back to horizontal.
   */
  orientation?: StepperOrientation;
  theme?: Partial<RemocnTheme>;
  mode?: "light" | "dark";
  className?: string;
}

/** Default onboarding steps. */
const DEFAULT_STEPS = ["Account", "Plan", "Done"];

/** Circle diameter (px). */
const CIRCLE = 36;
/** Checkmark stroke length (svg path units), drives the draw-on animation. */
const CHECK_PATH_LENGTH = 14;

/** Concrete colors for the active theme, resolved once per render. */
export interface StepperStyleContext {
  /** Completed/active accent (circles, connector fill, ring). */
  primary: string;
  /** Check color on a completed circle. */
  primaryFg: string;
  /** Future circle fill. */
  mutedBg: string;
  /** Future circle border + empty connector. */
  border: string;
  /** Future step number color. */
  mutedFg: string;
  /** Active/completed number + label color. */
  foreground: string;
}

/**
 * Derive the concrete colors for a theme. Pure — call it once and reuse the
 * result across every step's derivation.
 */
export function stepperStyleContext(theme: RemocnTheme): StepperStyleContext {
  return {
    primary: theme.primary,
    primaryFg: theme.primaryForeground,
    mutedBg: theme.muted,
    border: theme.border,
    mutedFg: theme.mutedForeground,
    foreground: theme.foreground,
  };
}

/**
 * The COMPLETE resting visual for an active index — a pure `(activeIndex) =>
 * StepperStyle` map. `position` IS the index (the smooth path feeds a float).
 */
export function stepperStyle(activeIndex: number): StepperStyle {
  return { position: activeIndex };
}

/**
 * The derived per-step visual at a given `position`. PURE — exported so tests can
 * assert the completed/active/future thresholds and the check draw without a
 * render.
 *
 * - completed: i + 1 <= position (fully reached the NEXT step) → filled primary
 *   circle + drawn check (checkDraw 0→1 as position crosses i→i+1).
 * - active: the step `position` is currently sitting on/approaching.
 * - future: i not yet reached.
 *
 * `fill` 0→1 is how "done" step i is: clamp01(position - i). At fill>=1 the step
 * is completed (check drawn); below 1 it's the active/in-progress step.
 */
export function stepCircleAt(i: number, position: number): {
  /** 0→1 completion of this step. */
  fill: number;
  /** Checkmark draw fraction 0→1 (only meaningful once fill reaches 1). */
  checkDraw: number;
  /** True when the step is the current/active one (the integer position sits here). */
  active: boolean;
} {
  const fill = clamp01(position - i);
  // The check draws as the step crosses from active (fill→1) into completed.
  const checkDraw = fill;
  // Active = the step the position currently rests on (its own integer slot),
  // before it has fully completed into the next.
  const active = Math.floor(position) === i && fill < 1;
  return { fill, checkDraw, active };
}

/** Connector primary-fill fraction between step i and i+1. PURE; exported. */
export function connectorFillAt(i: number, position: number): number {
  return clamp01(position - i);
}

export function Stepper({
  steps = DEFAULT_STEPS,
  activeIndex = 0,
  style,
  orientation: _orientation = "horizontal",
  theme: themeOverride,
  mode,
  className,
}: StepperProps) {
  const theme = useRemocnTheme(themeOverride, mode);
  const ctx = stepperStyleContext(theme);
  const v = style ?? stepperStyle(activeIndex);
  const position = v.position;

  return (
    <div
      className={className}
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: theme.background,
        fontFamily:
          "var(--font-geist-sans), -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start" }}>
        {steps.map((label, i) => {
          const { fill, checkDraw, active } = stepCircleAt(i, position);
          const completed = fill >= 1;
          // Circle background interpolates muted → primary as the step fills.
          const circleBg = mixOklch(ctx.mutedBg, ctx.primary, fill);
          const circleBorder = mixOklch(ctx.border, ctx.primary, fill);
          // Number fades out as the check fades in (completed shows the check).
          const numberOpacity = 1 - checkDraw;
          const numberColor = active || completed ? ctx.foreground : ctx.mutedFg;
          const isLast = i === steps.length - 1;
          return (
            <div
              key={label}
              style={{ display: "flex", alignItems: "flex-start" }}
            >
              {/* Step circle + label below it. */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 8,
                  width: CIRCLE + 24,
                }}
              >
                <div
                  style={{
                    position: "relative",
                    width: CIRCLE,
                    height: CIRCLE,
                    borderRadius: "50%",
                    background: circleBg,
                    border: `2px solid ${active ? ctx.primary : circleBorder}`,
                    boxSizing: "border-box",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {/* Step number — fades out as the check draws in. */}
                  <span
                    style={{
                      position: "absolute",
                      fontSize: 14,
                      fontWeight: 600,
                      color: numberColor,
                      opacity: numberOpacity,
                    }}
                  >
                    {i + 1}
                  </span>
                  {/* Checkmark — stroke-dash draw (checkbox technique). */}
                  <svg width={CIRCLE} height={CIRCLE} viewBox="0 0 24 24" fill="none">
                    <path
                      d="M5 12.5l4.5 4.5L19 7"
                      stroke={ctx.primaryFg}
                      strokeWidth="2.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      pathLength={CHECK_PATH_LENGTH}
                      strokeDasharray={CHECK_PATH_LENGTH}
                      strokeDashoffset={CHECK_PATH_LENGTH * (1 - checkDraw)}
                    />
                  </svg>
                </div>
                <span
                  style={{
                    fontSize: 13,
                    fontWeight: 500,
                    letterSpacing: "-0.01em",
                    color: active || completed ? ctx.foreground : ctx.mutedFg,
                    whiteSpace: "nowrap",
                  }}
                >
                  {label}
                </span>
              </div>
              {/* Connector to the next step — a muted rail with a primary fill. */}
              {!isLast && (
                <div
                  style={{
                    position: "relative",
                    width: 64,
                    height: 2,
                    marginTop: CIRCLE / 2 - 1,
                    background: ctx.border,
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      left: 0,
                      top: 0,
                      bottom: 0,
                      width: `${connectorFillAt(i, position) * 100}%`,
                      background: ctx.primary,
                    }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
