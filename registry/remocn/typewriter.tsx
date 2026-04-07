"use client";

import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";

export interface TypewriterProps {
  text: string;
  cursor?: boolean;
  speed?: number;
  fontSize?: number;
  color?: string;
  cursorColor?: string;
  fontWeight?: number;
  className?: string;
}

export function Typewriter({
  text,
  cursor = true,
  speed = 20,
  fontSize = 48,
  color = "#171717",
  cursorColor = "#171717",
  fontWeight = 600,
  className,
}: TypewriterProps) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const charsToRevealOver = (text.length / speed) * fps;

  const revealed = Math.floor(
    interpolate(frame, [0, charsToRevealOver], [0, text.length], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }),
  );

  const visibleText = text.substring(0, revealed);
  const isCursorVisible = Math.floor((frame / fps) * 2) % 2 === 0;

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
          whiteSpace: "pre",
        }}
      >
        {visibleText}
        {cursor && (
          <span
            style={{
              display: "inline-block",
              width: "0.08em",
              height: "1em",
              marginLeft: "0.04em",
              verticalAlign: "text-bottom",
              background: cursorColor,
              opacity: isCursorVisible ? 1 : 0,
            }}
          />
        )}
      </span>
    </div>
  );
}
