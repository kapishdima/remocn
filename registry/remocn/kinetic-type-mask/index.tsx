"use client";

import { type ReactNode, useId } from "react";
import { Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";

export interface KineticTypeMaskProps {
  from?: ReactNode;
  to?: ReactNode;
  text?: string;
  transitionStart?: number;
  holdFrames?: number;
  transitionDuration?: number;
  maxScale?: number;
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

export function KineticTypeMask({
  from,
  to,
  text = "NEXT",
  transitionStart,
  holdFrames = 12,
  transitionDuration = 24,
  maxScale = 120,
  speed = 1,
  className,
}: KineticTypeMaskProps) {
  const frame = useCurrentFrame() * speed;
  const { width, height, durationInFrames } = useVideoConfig();

  const start = transitionStart ?? Math.floor(durationInFrames * 0.3);
  const scaleStart = start + holdFrames;

  const scale = interpolate(
    frame,
    [scaleStart, scaleStart + transitionDuration],
    [1, maxScale],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(0.7, 0, 0.84, 0),
    },
  );

  const id = useId().replace(/[:#]/g, "");

  const fromContent = from ?? <DefaultPanel label="Scene A" color="#0f172a" />;
  const toContent = to ?? <DefaultPanel label="Scene B" color="#f97316" />;

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
      <div style={{ position: "absolute", inset: 0 }}>{fromContent}</div>

      {scale < maxScale * 0.95 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "black",
            fontFamily: FONT_FAMILY,
            fontSize: height * 0.7,
            fontWeight: 900,
            transform: `scale(${scale})`,
            transformOrigin: "center center",
            willChange: "transform",
          }}
        >
          {text}
        </div>
      )}

      <div
        style={{
          position: "absolute",
          inset: 0,
          clipPath: `url(#${id})`,
          WebkitClipPath: `url(#${id})`,
        }}
      >
        <div style={{ position: "absolute", inset: 0 }}>{toContent}</div>
      </div>

      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${width} ${height}`}
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
        }}
      >
        <defs>
          <clipPath id={id} clipPathUnits="userSpaceOnUse">
            <text
              x={width / 2}
              y={height / 2}
              textAnchor="middle"
              dominantBaseline="central"
              fontFamily={FONT_FAMILY}
              fontWeight={900}
              fontSize={height * 0.7}
              style={{
                transform: `scale(${scale})`,
                transformOrigin: `${width / 2}px ${height / 2}px`,
              }}
            >
              {text}
            </text>
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}
