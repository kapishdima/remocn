"use client";

import { type RemocnTheme, useRemocnTheme } from "@/lib/remocn-ui";

export type CheckboxState = "unchecked" | "checked";

type CheckboxSize = "sm" | "default" | "lg";

export interface CheckboxProps {
  /** Current visual state (snap path). State changes snap (no enter-tweens). */
  state?: CheckboxState;
  /**
   * Resolved animated visual (smooth path). When provided, takes precedence over
   * `state` — feed it an interpolated `CheckboxStyle` from `useCheckboxTransition`.
   */
  style?: CheckboxStyle;
  /** Optional text label rendered next to the box. */
  label?: string;
  size?: CheckboxSize;
  theme?: Partial<RemocnTheme>;
  /** Convenience override for the `primary` theme token — merged into `theme`. */
  primary?: string;
  mode?: "light" | "dark";
  /** Horizontal placement of the box+label within its slot. */
  align?: "start" | "center" | "end";
  className?: string;
}

/** Map an `align` value to a flexbox `justifyContent`. */
function justify(align: "start" | "center" | "end"): string {
  return align === "start"
    ? "flex-start"
    : align === "end"
      ? "flex-end"
      : "center";
}

/** Checkmark stroke length (svg path units), drives the draw-on animation. */
const CHECK_PATH_LENGTH = 14;

const SIZE_STYLES: Record<
  CheckboxSize,
  { box: number; fontSize: number; gap: number }
> = {
  sm: { box: 16, fontSize: 13, gap: 8 },
  default: { box: 20, fontSize: 15, gap: 10 },
  lg: { box: 24, fontSize: 17, gap: 12 },
};

// ===========================================================================
// Checkbox visual — the COMPLETE animated look for a moment in time. A `state`
// is a named preset of this visual (`checkboxStyle`); the smooth path feeds an
// interpolated `CheckboxStyle` straight through. The component is a pure
// renderer of whichever `CheckboxStyle` it receives.
// ===========================================================================

export interface CheckboxStyle {
  /** Animated box fill color (a concrete color, never "transparent"). */
  boxBackground: string;
  /** Animated box border color. */
  boxBorderColor: string;
  /** Checkmark opacity 0→1. */
  checkOpacity: number;
  /** Checkmark scale 0.6→1 (a slight pop on check). */
  checkScale: number;
  /** Checkmark draw fraction 0→1; drives the strokeDashoffset of the path. */
  checkDraw: number;
}

/** Concrete colors for the active theme, resolved once per render. */
export interface CheckboxStyleContext {
  uncheckedBg: string;
  checkedBg: string;
  uncheckedBorder: string;
  checkedBorder: string;
  /** Static checkmark stroke color (never animated). */
  checkColor: string;
}

/**
 * Derive the concrete colors for a theme. Pure — call it once and reuse the
 * result for every `checkboxStyle(state, ctx)` preset.
 */
export function checkboxStyleContext(theme: RemocnTheme): CheckboxStyleContext {
  return {
    uncheckedBg: theme.background,
    checkedBg: theme.primary,
    uncheckedBorder: theme.border,
    checkedBorder: theme.primary,
    checkColor: theme.primaryForeground,
  };
}

/**
 * The COMPLETE resting visual for a state — a pure `(state, ctx) => CheckboxStyle`
 * map. To change how a state looks, edit one entry.
 */
export function checkboxStyle(
  state: CheckboxState,
  ctx: CheckboxStyleContext,
): CheckboxStyle {
  switch (state) {
    case "checked":
      return {
        boxBackground: ctx.checkedBg,
        boxBorderColor: ctx.checkedBorder,
        checkOpacity: 1,
        checkScale: 1,
        checkDraw: 1,
      };
    default:
      return {
        boxBackground: ctx.uncheckedBg,
        boxBorderColor: ctx.uncheckedBorder,
        checkOpacity: 0,
        checkScale: 0.6,
        checkDraw: 0,
      };
  }
}

export function Checkbox({
  state = "unchecked",
  style,
  label,
  size = "default",
  theme: themeOverride,
  primary,
  mode,
  align = "center",
  className,
}: CheckboxProps) {
  const theme = useRemocnTheme(
    { ...themeOverride, ...(primary ? { primary } : {}) },
    mode,
  );

  const sizeStyle = SIZE_STYLES[size];
  const ctx = checkboxStyleContext(theme);
  const v = style ?? checkboxStyle(state, ctx);
  const boxSize = sizeStyle.box;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: justify(align),
        background: theme.background,
        fontFamily:
          "var(--font-geist-sans), -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      <span
        className={className}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: sizeStyle.gap,
        }}
      >
        {/* The box — animated fill + border; the checkmark draws on inside it. */}
        <span
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: boxSize,
            height: boxSize,
            borderRadius: Math.round(boxSize * 0.28),
            border: `1px solid ${v.boxBorderColor}`,
            background: v.boxBackground,
          }}
        >
          <svg
            width={boxSize}
            height={boxSize}
            viewBox="0 0 24 24"
            fill="none"
            style={{
              opacity: v.checkOpacity,
              transform: `scale(${v.checkScale})`,
            }}
          >
            <path
              d="M5 12.5l4.5 4.5L19 7"
              stroke={ctx.checkColor}
              strokeWidth="2.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              pathLength={CHECK_PATH_LENGTH}
              strokeDasharray={CHECK_PATH_LENGTH}
              strokeDashoffset={CHECK_PATH_LENGTH * (1 - v.checkDraw)}
            />
          </svg>
        </span>
        {label !== undefined && (
          <span
            style={{
              fontSize: sizeStyle.fontSize,
              fontWeight: 500,
              letterSpacing: "-0.01em",
              color: theme.foreground,
            }}
          >
            {label}
          </span>
        )}
      </span>
    </div>
  );
}
