"use client";

import type { ReactNode } from "react";
import { Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";

export interface DirectionalWipeProps {
  from?: ReactNode;
  to?: ReactNode;
  direction?: "left" | "right" | "up" | "down";
  transitionStart?: number;
  transitionDuration?: number;
  speed?: number;
  className?: string;
}

const FONT_FAMILY =
  "var(--font-geist-sans), -apple-system, BlinkMacSystemFont, sans-serif";

function DefaultPanel({ label, color }: { label: string; color: string }) {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: color,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        fontFamily: FONT_FAMILY,
        fontSize: 96,
        fontWeight: 700,
        letterSpacing: "-0.05em",
      }}
    >
      {label}
    </div>
  );
}

export function DirectionalWipe({
  from,
  to,
  direction = "left",
  transitionStart,
  transitionDuration = 20,
  speed = 1,
  className,
}: DirectionalWipeProps) {
  const frame = useCurrentFrame() * speed;
  const { durationInFrames } = useVideoConfig();

  const start =
    typeof transitionStart === "number"
      ? transitionStart
      : Math.floor(durationInFrames * 0.4);

  const progress = interpolate(
    frame,
    [start, start + transitionDuration],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(0.65, 0, 0.35, 1),
    },
  );

  const axis: "x" | "y" =
    direction === "left" || direction === "right" ? "x" : "y";
  const sign = direction === "left" || direction === "up" ? -1 : 1;

  const fromOffset = progress * 100 * sign;
  const toOffset = (1 - progress) * 100 * -sign;

  const transformFor = (offset: number) =>
    axis === "x" ? `translateX(${offset}%)` : `translateY(${offset}%)`;

  const fromContent = from ?? <DefaultPanel label="Scene A" color="#0ea5e9" />;
  const toContent = to ?? <DefaultPanel label="Scene B" color="#9333ea" />;

  return (
    <div
      className={className}
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        background: "black",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          transform: transformFor(fromOffset),
          willChange: "transform",
        }}
      >
        {fromContent}
      </div>
      <div
        style={{
          position: "absolute",
          inset: 0,
          transform: transformFor(toOffset),
          willChange: "transform",
        }}
      >
        {toContent}
      </div>
    </div>
  );
}
