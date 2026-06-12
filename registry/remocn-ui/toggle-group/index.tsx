"use client";

import type { ReactNode } from "react";
import { mixOklch, type RemocnTheme, useRemocnTheme } from "@/lib/remocn-ui";

/** Active segment — one of the `items` VALUES. */
export type ToggleGroupState = string;

export type ToggleGroupSize = "default" | "sm";

/** One segment of the group. */
export interface ToggleGroupItem {
  value: string;
  label: string;
  /** Optional leading icon node. */
  icon?: ReactNode;
}

export interface ToggleGroupProps {
  /** Current visual state (snap path). State changes snap (no enter-tweens). */
  state?: ToggleGroupState;
  /**
   * Resolved animated visual (smooth path). When provided, takes precedence over
   * `state` — feed it an interpolated `ToggleGroupStyle` from `useToggleGroupTransition`.
   */
  style?: ToggleGroupStyle;
  /** Segments (value + label, optional icon). The active `state` is one value. */
  items?: ToggleGroupItem[];
  size?: ToggleGroupSize;
  theme?: Partial<RemocnTheme>;
  mode?: "light" | "dark";
  /** Horizontal placement of the track within its (full-width) slot. */
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

/** Default segments. */
const DEFAULT_ITEMS: ToggleGroupItem[] = [
  { value: "Monthly", label: "Monthly" },
  { value: "Yearly", label: "Yearly" },
];

const SIZE_STYLES: Record<
  ToggleGroupSize,
  { height: number; segMinWidth: number; fontSize: number; pad: number; gap: number }
> = {
  sm: { height: 32, segMinWidth: 72, fontSize: 13, pad: 3, gap: 6 },
  default: { height: 36, segMinWidth: 88, fontSize: 14, pad: 4, gap: 8 },
};

// ===========================================================================
// Toggle-group visual — the COMPLETE animated look for a moment in time. A
// `state` is a named preset of this visual (`toggleGroupStyle`); the smooth path
// feeds an interpolated `ToggleGroupStyle` straight through. The component is a
// pure renderer of whichever style it receives. The sliding thumb's position +
// width and the per-label color all DERIVE from `indicatorOffset` in render —
// mirrors the Tabs indicator (so position AND width move without jumps).
// ===========================================================================

export interface ToggleGroupStyle {
  /**
   * Float index (0,1,2…) of where the active thumb sits. The only animated
   * field — the thumb position/width and label colors derive from it inside the
   * pure render, so a lerp of this single value slides the thumb smoothly.
   */
  indicatorOffset: number;
}

/** Concrete colors for the active theme, resolved once per render. */
export interface ToggleGroupStyleContext {
  /** Segment values — the thumb is indexed against this. */
  items: ToggleGroupItem[];
  /** Container track background. */
  trackBg: string;
  /** Active (raised) thumb surface. */
  thumbBg: string;
  /** Active label color. */
  activeFg: string;
  /** Inactive label color. */
  inactiveFg: string;
  radius: number;
}

/**
 * Derive the concrete colors for a theme. Pure — call it once and reuse the
 * result for every `toggleGroupStyle(state, ctx)` preset.
 */
export function toggleGroupStyleContext(
  items: ToggleGroupItem[],
  theme: RemocnTheme,
): ToggleGroupStyleContext {
  return {
    items,
    trackBg: theme.muted,
    // A concrete surface lifts the active segment off the muted track.
    thumbBg: theme.background,
    activeFg: theme.foreground,
    inactiveFg: theme.mutedForeground,
    radius: theme.radius,
  };
}

/**
 * The COMPLETE resting visual for a state — a pure `(state, ctx) =>
 * ToggleGroupStyle` map. `indicatorOffset` is the index of `state` in
 * `ctx.items` (safe lookup: unknown state → 0).
 */
export function toggleGroupStyle(
  state: ToggleGroupState,
  ctx: ToggleGroupStyleContext,
): ToggleGroupStyle {
  const i = ctx.items.findIndex((it) => it.value === state);
  return { indicatorOffset: i < 0 ? 0 : i };
}

export function ToggleGroup({
  state = DEFAULT_ITEMS[0].value,
  style,
  items = DEFAULT_ITEMS,
  size = "default",
  theme: themeOverride,
  mode,
  align = "center",
  className,
}: ToggleGroupProps) {
  const theme = useRemocnTheme(themeOverride, mode);
  const ctx = toggleGroupStyleContext(items, theme);
  const v = style ?? toggleGroupStyle(state, ctx);

  const sizeStyle = SIZE_STYLES[size];
  const { pad } = sizeStyle;
  // Equal-width segments; the thumb spans exactly one segment and slides by the
  // float `indicatorOffset`, so both position AND width track without jumps.
  const segmentWidth = sizeStyle.segMinWidth;
  const thumbX = pad + v.indicatorOffset * segmentWidth;

  return (
    <div
      className={className}
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: justify(align),
        // OPAQUE wrapper — a self-contained widget, not a modal layer (like Tabs).
        background: theme.background,
        fontFamily:
          "var(--font-geist-sans), -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      <div
        style={{
          position: "relative",
          display: "flex",
          height: sizeStyle.height,
          padding: pad,
          boxSizing: "border-box",
          background: ctx.trackBg,
          borderRadius: ctx.radius,
        }}
      >
        {/* Sliding thumb — a raised surface spanning one segment. */}
        <div
          style={{
            position: "absolute",
            top: pad,
            left: thumbX,
            width: segmentWidth,
            height: sizeStyle.height - pad * 2,
            background: ctx.thumbBg,
            borderRadius: Math.max(2, ctx.radius - 3),
            boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
          }}
        />
        {/* Labels stay in normal flow defining the segment widths. */}
        {items.map((item, i) => {
          const proximity = Math.max(0, 1 - Math.abs(i - v.indicatorOffset));
          return (
            <span
              key={item.value}
              style={{
                position: "relative",
                width: segmentWidth,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: sizeStyle.gap,
                fontSize: sizeStyle.fontSize,
                fontWeight: 500,
                letterSpacing: "-0.01em",
                color: mixOklch(ctx.inactiveFg, ctx.activeFg, proximity),
              }}
            >
              {item.icon}
              {item.label}
            </span>
          );
        })}
      </div>
    </div>
  );
}
