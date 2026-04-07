"use client";

import type { ReactNode } from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";

export interface SpringPopInProps {
  children?: ReactNode;
  damping?: number;
  mass?: number;
  stiffness?: number;
  delayInFrames?: number;
  className?: string;
}

const FONT_FAMILY =
  "var(--font-geist-sans), -apple-system, BlinkMacSystemFont, sans-serif";

function DefaultChild() {
  return (
    <div
      style={{
        width: 280,
        height: 280,
        borderRadius: 32,
        background: "linear-gradient(135deg, #0ea5e9 0%, #9333ea 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        fontFamily: FONT_FAMILY,
        fontSize: 56,
        fontWeight: 700,
        letterSpacing: "-0.04em",
        boxShadow: "0 30px 80px rgba(14,165,233,0.35)",
      }}
    >
      Pop!
    </div>
  );
}

export function SpringPopIn({
  children,
  damping = 12,
  mass = 1,
  stiffness = 100,
  delayInFrames = 0,
  className,
}: SpringPopInProps) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({
    fps,
    frame: frame - delayInFrames,
    config: {
      damping,
      mass,
      stiffness,
    },
  });

  return (
    <div
      className={className}
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "white",
      }}
    >
      <div
        style={{
          transform: `scale(${scale})`,
          transformOrigin: "center",
          willChange: "transform",
        }}
      >
        {children ?? <DefaultChild />}
      </div>
    </div>
  );
}
