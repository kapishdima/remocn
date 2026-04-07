"use client";

import { useCurrentFrame } from "remotion";

export interface PulsingIndicatorProps {
  color?: string;
  size?: number;
  /** Wavelength of the base pulse, in frames. Higher = longer one cycle. */
  period?: number;
  /** Playback speed multiplier (1 = normal, 2 = twice as fast). */
  speed?: number;
  background?: string;
  className?: string;
}

export function PulsingIndicator({
  color = "#22c55e",
  size = 16,
  period = 8,
  speed = 1,
  background = "white",
  className,
}: PulsingIndicatorProps) {
  const frame = useCurrentFrame() * speed;

  // Inner dot pulse: 0..1 normalized
  const wave = Math.sin(frame / period) * 0.5 + 0.5;
  const dotScale = 0.9 + wave * 0.2;
  const dotOpacity = 0.6 + wave * 0.4;

  // Outer ring "ping": phase from 0..1 looping
  const ringPeriod = period * Math.PI * 2;
  const phase = (frame % ringPeriod) / ringPeriod;
  const ringScale = 1 + phase * 1.6;
  const ringOpacity = (1 - phase) * 0.7;

  return (
    <div
      className={className}
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background,
      }}
    >
      <div
        style={{
          position: "relative",
          width: size,
          height: size,
        }}
      >
        {/* Ping ring */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            background: color,
            opacity: ringOpacity,
            transform: `scale(${ringScale})`,
            transformOrigin: "center",
            willChange: "transform, opacity",
          }}
        />
        {/* Solid dot */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            background: color,
            opacity: dotOpacity,
            transform: `scale(${dotScale})`,
            transformOrigin: "center",
            willChange: "transform, opacity",
          }}
        />
      </div>
    </div>
  );
}
