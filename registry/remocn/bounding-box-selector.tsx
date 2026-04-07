"use client";

import type { ReactNode } from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";

export interface BoundingBoxSelectorProps {
  children?: ReactNode;
  borderColor?: string;
  handleColor?: string;
  borderWidth?: number;
  appearAt?: number;
  background?: string;
  className?: string;
}

const FONT_FAMILY =
  "var(--font-geist-sans), -apple-system, BlinkMacSystemFont, sans-serif";

function DefaultPlaceholder() {
  return (
    <div
      style={{
        width: 480,
        height: 280,
        background: "white",
        borderRadius: 16,
        boxShadow: "0 12px 40px rgba(0,0,0,0.08)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#71717a",
        fontFamily: FONT_FAMILY,
        fontSize: 24,
        fontWeight: 600,
        letterSpacing: "-0.02em",
      }}
    >
      Selected element
    </div>
  );
}

function Handle({
  color,
  style,
}: {
  color: string;
  style: React.CSSProperties;
}) {
  return (
    <div
      style={{
        position: "absolute",
        width: 10,
        height: 10,
        background: "white",
        border: `2px solid ${color}`,
        borderRadius: 2,
        ...style,
      }}
    />
  );
}

export function BoundingBoxSelector({
  children,
  borderColor = "#0ea5e9",
  handleColor = "#0ea5e9",
  borderWidth = 2,
  appearAt = 15,
  background = "#fafafa",
  className,
}: BoundingBoxSelectorProps) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame: frame - appearAt,
    fps,
    config: { damping: 16, stiffness: 140, mass: 0.7 },
  });

  const opacity = progress;
  const scale = 0.96 + progress * 0.04;

  const content = children ?? <DefaultPlaceholder />;

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
      }}
    >
      <div style={{ position: "relative", display: "inline-block" }}>
        {content}
        <div
          style={{
            position: "absolute",
            inset: -8,
            border: `${borderWidth}px solid ${borderColor}`,
            borderRadius: 4,
            opacity,
            transform: `scale(${scale})`,
            transformOrigin: "center center",
            pointerEvents: "none",
            willChange: "transform, opacity",
          }}
        >
          <Handle color={handleColor} style={{ top: -6, left: -6 }} />
          <Handle color={handleColor} style={{ top: -6, right: -6 }} />
          <Handle color={handleColor} style={{ bottom: -6, left: -6 }} />
          <Handle color={handleColor} style={{ bottom: -6, right: -6 }} />
          <Handle
            color={handleColor}
            style={{ top: -6, left: "50%", marginLeft: -5 }}
          />
          <Handle
            color={handleColor}
            style={{ bottom: -6, left: "50%", marginLeft: -5 }}
          />
          <Handle
            color={handleColor}
            style={{ left: -6, top: "50%", marginTop: -5 }}
          />
          <Handle
            color={handleColor}
            style={{ right: -6, top: "50%", marginTop: -5 }}
          />
        </div>
      </div>
    </div>
  );
}
