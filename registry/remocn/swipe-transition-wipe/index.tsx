"use client";

import type { ReactNode } from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export interface SwipeTransitionWipeProps {
  sceneA?: ReactNode;
  sceneB?: ReactNode;
  labelA?: string;
  labelB?: string;
  colorA1?: string;
  colorA2?: string;
  colorB1?: string;
  colorB2?: string;
  background?: string;
  direction?: "left" | "right";
  swipeAt?: number;
  parallaxFactor?: number;
  dimStrength?: number;
  speed?: number;
  className?: string;
}

const FONT_FAMILY =
  "var(--font-geist-sans), -apple-system, BlinkMacSystemFont, sans-serif";

function DefaultScene({
  label,
  c1,
  c2,
}: {
  label: string;
  c1: string;
  c2: string;
}) {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: `linear-gradient(135deg, ${c1} 0%, ${c2} 100%)`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        fontFamily: FONT_FAMILY,
        fontSize: 128,
        fontWeight: 700,
        letterSpacing: "-0.05em",
        textShadow: "0 8px 40px rgba(0,0,0,0.35)",
      }}
    >
      {label}
    </div>
  );
}

function ParallaxBackground({ background }: { background: string }) {
  // Doubled-width dot grid layer so parallax translation never reveals an edge.
  const dots: Array<{ x: number; y: number }> = [];
  const cols = 40;
  const rows = 12;
  const gapX = 64;
  const gapY = 64;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      dots.push({ x: c * gapX + 32, y: r * gapY + 32 });
    }
  }
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "200%",
        height: "100%",
        background,
      }}
    >
      <svg
        width="100%"
        height="100%"
        style={{ position: "absolute", inset: 0 }}
      >
        {dots.map((d, i) => (
          <circle
            key={i}
            cx={d.x}
            cy={d.y}
            r={2}
            fill="rgba(255,255,255,0.08)"
          />
        ))}
      </svg>
    </div>
  );
}

export function SwipeTransitionWipe({
  sceneA,
  sceneB,
  labelA = "First",
  labelB = "Second",
  colorA1 = "#0ea5e9",
  colorA2 = "#1e3a8a",
  colorB1 = "#f97316",
  colorB2 = "#9333ea",
  background = "#050505",
  direction = "left",
  swipeAt = 30,
  parallaxFactor = 0.6,
  dimStrength = 0.4,
  speed = 1,
  className,
}: SwipeTransitionWipeProps) {
  const frame = useCurrentFrame() * speed;
  const { fps } = useVideoConfig();

  // A snappy spring with a touch of overshoot — feels like a flick.
  const swipe = spring({
    frame: frame - swipeAt,
    fps,
    config: { mass: 1, damping: 22, stiffness: 140 },
    durationInFrames: 50,
  });

  // direction: "left" → outgoing slides left (translateX negative).
  // direction: "right" → outgoing slides right (translateX positive).
  const sign = direction === "left" ? -1 : 1;

  // Foreground slider: 0% → -100% (or +100%) of its own width.
  const foregroundTx = swipe * 100 * sign;

  // Parallax background moves at parallaxFactor of foreground speed.
  // Layer is 200% wide so it can travel up to 50% in either direction.
  const backgroundTx = swipe * 50 * sign * parallaxFactor;

  // Outgoing scene gets darker as it leaves.
  const dimAlpha = interpolate(swipe, [0, 1], [0, dimStrength], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const sceneAContent = sceneA ?? (
    <DefaultScene label={labelA} c1={colorA1} c2={colorA2} />
  );
  const sceneBContent = sceneB ?? (
    <DefaultScene label={labelB} c1={colorB1} c2={colorB2} />
  );

  // Order children so the incoming scene sits next to the outgoing one
  // in the swipe direction. For "left" swipes the new scene must be to
  // the right; for "right" swipes it must be to the left.
  const orderedScenes =
    direction === "left"
      ? [sceneAContent, sceneBContent]
      : [sceneBContent, sceneAContent];

  // For "right" swipes the slider needs to start at -100% so that scene A
  // is centered on stage initially.
  const baseOffset = direction === "left" ? 0 : -100;
  const sliderTx = baseOffset + foregroundTx;

  return (
    <div
      className={className}
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        background,
      }}
    >
      {/* Parallax background layer */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          transform: `translateX(${backgroundTx}%)`,
          willChange: "transform",
        }}
      >
        <ParallaxBackground background={background} />
      </div>

      {/* Foreground slider — two scenes laid out side by side */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          width: "200%",
          transform: `translateX(${sliderTx}%)`,
          willChange: "transform",
        }}
      >
        {orderedScenes.map((scene, i) => {
          // The "outgoing" scene is whichever one started centered.
          const isOutgoing =
            (direction === "left" && i === 0) ||
            (direction === "right" && i === 1);
          return (
            <div
              key={i}
              style={{
                position: "relative",
                width: "50%",
                flexShrink: 0,
                overflow: "hidden",
              }}
            >
              {scene}
              {isOutgoing && (
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: `rgba(0,0,0,${dimAlpha})`,
                    pointerEvents: "none",
                  }}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
