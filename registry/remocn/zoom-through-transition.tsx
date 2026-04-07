"use client";

import type { ReactNode } from "react";
import { Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";

export interface ZoomThroughTransitionProps {
  children?: ReactNode;
  targetScale?: number;
  transformOrigin?: string;
  background?: string;
  className?: string;
}

const FONT_FAMILY =
  "var(--font-geist-sans), -apple-system, BlinkMacSystemFont, sans-serif";

function DefaultContent() {
  return (
    <div
      style={{
        width: 320,
        height: 200,
        borderRadius: 24,
        background: "linear-gradient(135deg, #0ea5e9 0%, #9333ea 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        fontFamily: FONT_FAMILY,
        fontSize: 48,
        fontWeight: 700,
        letterSpacing: "-0.03em",
        boxShadow: "0 20px 60px rgba(14,165,233,0.35)",
      }}
    >
      Zoom
    </div>
  );
}

export function ZoomThroughTransition({
  children,
  targetScale = 20,
  transformOrigin = "center center",
  background = "white",
  className,
}: ZoomThroughTransitionProps) {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const scale = interpolate(
    frame,
    [0, durationInFrames],
    [1, targetScale],
    {
      extrapolateRight: "clamp",
      easing: Easing.bezier(0.7, 0, 0.84, 0),
    },
  );

  const opacity = interpolate(
    frame,
    [0, durationInFrames * 0.7, durationInFrames],
    [1, 1, 0],
    { extrapolateRight: "clamp" },
  );

  const content = children ?? <DefaultContent />;

  return (
    <div
      className={className}
      style={{
        position: "absolute",
        inset: 0,
        background,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          transform: `scale(${scale})`,
          transformOrigin,
          opacity,
          willChange: "transform, opacity",
        }}
      >
        {content}
      </div>
    </div>
  );
}
