"use client";

import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";

export interface TypewriterProps {
  text: string;
  cursor?: boolean;
  /** Typing speed in characters per second. */
  charsPerSecond?: number;
  /** Playback speed multiplier (1 = normal, 2 = twice as fast). */
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
  charsPerSecond = 20,
  speed = 1,
  fontSize = 48,
  color = "#171717",
  cursorColor = "#171717",
  fontWeight = 600,
  className,
}: TypewriterProps) {
  const frame = useCurrentFrame() * speed;
  const { fps } = useVideoConfig();

  const charsToRevealOver = (text.length / charsPerSecond) * fps;

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
