"use client";

import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";

export interface TextFadeReplaceProps {
  from: string;
  to: string;
  fontSize?: number;
  color?: string;
  fontWeight?: number;
  className?: string;
}

export function TextFadeReplace({
  from,
  to,
  fontSize = 48,
  color = "#171717",
  fontWeight = 600,
  className,
}: TextFadeReplaceProps) {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const stops = [
    0,
    durationInFrames * 0.4,
    durationInFrames * 0.6,
    durationInFrames,
  ];

  const fromOpacity = interpolate(frame, stops, [1, 1, 0, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const fromY = interpolate(frame, stops, [0, 0, -12, -12], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const toOpacity = interpolate(frame, stops, [0, 0, 1, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const toY = interpolate(frame, stops, [12, 12, 0, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const baseSpanStyle: React.CSSProperties = {
    position: "absolute",
    left: "50%",
    top: "50%",
    fontSize,
    fontWeight,
    color,
    letterSpacing: "-0.03em",
    fontFamily:
      "var(--font-geist-sans), -apple-system, BlinkMacSystemFont, sans-serif",
    whiteSpace: "nowrap",
  };

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "white",
      }}
    >
      <div style={{ position: "relative", width: 0, height: 0 }}>
        <span
          className={className}
          style={{
            ...baseSpanStyle,
            opacity: fromOpacity,
            transform: `translate(-50%, calc(-50% + ${fromY}px))`,
          }}
        >
          {from}
        </span>
        <span
          className={className}
          style={{
            ...baseSpanStyle,
            opacity: toOpacity,
            transform: `translate(-50%, calc(-50% + ${toY}px))`,
          }}
        >
          {to}
        </span>
      </div>
    </div>
  );
}
