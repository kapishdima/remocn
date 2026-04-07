"use client";

import { useCurrentFrame, useVideoConfig } from "remotion";

export interface MeshGradientBgProps {
  colors?: string[];
  speed?: number;
  background?: string;
  blur?: number;
  className?: string;
}

export function MeshGradientBg({
  colors = ["#ff0080", "#7928ca", "#00d4ff", "#ffb800"],
  speed = 1,
  background = "#0a0a0a",
  blur = 80,
  className,
}: MeshGradientBgProps) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const isDark = isColorDark(background);
  const blendMode: "screen" | "multiply" = isDark ? "screen" : "multiply";

  // One full cycle every (2 / speed) seconds — fps-independent.
  const t = (frame / fps) * speed;

  const blobs = colors.map((color, i) => {
    const phase = i * 1.7;
    const sx = Math.sin(t * Math.PI + phase);
    const cy = Math.cos(t * Math.PI * 1.3 + phase);
    const sx2 = Math.sin(t * Math.PI * 0.7 * (2 / 3) + phase * 0.5);

    const left = 50 + sx * 25;
    const top = 50 + cy * 25;
    const scale = 1 + sx2 * 0.2;

    return { color, left, top, scale, key: `blob-${i}` };
  });

  return (
    <div
      className={className}
      style={{
        position: "absolute",
        inset: 0,
        background,
        overflow: "hidden",
      }}
    >
      {blobs.map((b) => (
        <div
          key={b.key}
          style={{
            position: "absolute",
            left: `${b.left}%`,
            top: `${b.top}%`,
            width: "55%",
            height: "55%",
            borderRadius: "50%",
            background: `radial-gradient(circle, ${b.color} 0%, ${b.color}00 70%)`,
            filter: `blur(${blur}px)`,
            mixBlendMode: blendMode,
            transform: `translate(-50%, -50%) scale(${b.scale})`,
            willChange: "transform",
          }}
        />
      ))}
    </div>
  );
}

function isColorDark(hex: string): boolean {
  const m = hex.replace("#", "");
  if (m.length !== 6 && m.length !== 3) return true;
  const full =
    m.length === 3
      ? m
          .split("")
          .map((c) => c + c)
          .join("")
      : m;
  const r = parseInt(full.slice(0, 2), 16);
  const g = parseInt(full.slice(2, 4), 16);
  const b = parseInt(full.slice(4, 6), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance < 0.5;
}
