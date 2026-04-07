"use client";

import type { ReactNode } from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export interface SpatialPushProps {
  from?: ReactNode;
  to?: ReactNode;
  direction?: "up" | "down" | "left" | "right";
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

export function SpatialPush({
  from,
  to,
  direction = "up",
  transitionStart,
  transitionDuration = 30,
  speed = 1,
  className,
}: SpatialPushProps) {
  const frame = useCurrentFrame() * speed;
  const { fps, durationInFrames } = useVideoConfig();

  const start =
    typeof transitionStart === "number"
      ? transitionStart
      : Math.floor(durationInFrames * 0.4);

  const aProgress = interpolate(
    frame,
    [start, start + transitionDuration],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  const aScale = interpolate(aProgress, [0, 1], [1, 0.92]);
  const aBrightness = interpolate(aProgress, [0, 1], [1, 0.5]);
  const aRadius = interpolate(aProgress, [0, 1], [0, 16]);

  const bSpring = spring({
    frame: frame - start,
    fps,
    config: { mass: 1.2, damping: 14, stiffness: 90 },
    durationInFrames: 40,
  });

  const bTransform =
    direction === "up"
      ? `translateY(${(1 - bSpring) * 100}%)`
      : direction === "down"
        ? `translateY(${(bSpring - 1) * 100}%)`
        : direction === "left"
          ? `translateX(${(1 - bSpring) * 100}%)`
          : `translateX(${(bSpring - 1) * 100}%)`;

  const bShadow =
    direction === "up"
      ? "0 -40px 100px rgba(0,0,0,0.8)"
      : direction === "down"
        ? "0 40px 100px rgba(0,0,0,0.8)"
        : direction === "left"
          ? "-40px 0 100px rgba(0,0,0,0.8)"
          : "40px 0 100px rgba(0,0,0,0.8)";

  const fromContent = from ?? <DefaultPanel label="Scene A" color="#0f172a" />;
  const toContent = to ?? <DefaultPanel label="Scene B" color="#22c55e" />;

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
          transform: `scale(${aScale})`,
          filter: `brightness(${aBrightness})`,
          borderRadius: `${aRadius}px`,
          overflow: "hidden",
          willChange: "transform",
        }}
      >
        {fromContent}
      </div>
      <div
        style={{
          position: "absolute",
          inset: 0,
          transform: bTransform,
          boxShadow: bShadow,
          willChange: "transform",
        }}
      >
        {toContent}
      </div>
    </div>
  );
}
