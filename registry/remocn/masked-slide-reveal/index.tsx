"use client";

import { spring, useCurrentFrame, useVideoConfig } from "remotion";

export interface MaskedSlideRevealProps {
  text: string;
  staggerDelay?: number;
  fontSize?: number;
  color?: string;
  fontWeight?: number;
  speed?: number;
  className?: string;
}

export function MaskedSlideReveal({
  text,
  staggerDelay = 3,
  fontSize = 72,
  color = "#171717",
  fontWeight = 700,
  speed = 1,
  className,
}: MaskedSlideRevealProps) {
  const frame = useCurrentFrame() * speed;
  const { fps } = useVideoConfig();

  const words = text.split(" ");

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
      <span
        className={className}
        style={{
          fontSize,
          fontWeight,
          color,
          letterSpacing: "-0.03em",
          fontFamily:
            "var(--font-geist-sans), -apple-system, BlinkMacSystemFont, sans-serif",
        }}
      >
        {words.map((word, i) => {
          const t = spring({
            frame: frame - i * staggerDelay,
            fps,
            config: { damping: 14 },
          });
          return (
            <span
              key={i}
              style={{
                display: "inline-block",
                overflow: "hidden",
                verticalAlign: "bottom",
                lineHeight: 1,
                marginRight: "0.25em",
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  transform: `translateY(${(1 - t) * 100}%)`,
                }}
              >
                {word}
              </span>
            </span>
          );
        })}
      </span>
    </div>
  );
}
