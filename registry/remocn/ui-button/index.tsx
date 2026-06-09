"use client";

import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { springs, useRemocnTheme } from "@/lib/remocn-ui";

export interface UIButtonProps {
  label?: string;
  mode?: "light" | "dark";
  speed?: number;
  className?: string;
}

export function UIButton({
  label = "Continue",
  mode,
  speed = 1,
  className,
}: UIButtonProps) {
  const frame = useCurrentFrame() * speed;
  const { fps } = useVideoConfig();
  const theme = useRemocnTheme(undefined, mode);

  const enter = spring({
    frame,
    fps,
    config: springs.soft,
    durationInFrames: 14,
  });
  const opacity = interpolate(enter, [0, 1], [0, 1], {
    extrapolateRight: "clamp",
  });
  const translateY = interpolate(enter, [0, 1], [8, 0]);

  return (
    <div
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
      <button
        type="button"
        className={className}
        style={{
          opacity,
          transform: `translateY(${translateY}px)`,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          height: 40,
          padding: "0 20px",
          fontSize: 15,
          fontWeight: 500,
          letterSpacing: "-0.01em",
          color: theme.primaryForeground,
          background: theme.primary,
          border: "none",
          borderRadius: theme.radius,
          cursor: "pointer",
        }}
      >
        {label}
      </button>
    </div>
  );
}
