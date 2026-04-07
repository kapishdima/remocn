"use client";

import {
  interpolate,
  random,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export interface SuccessConfettiProps {
  count?: number;
  colors?: string[];
  originX?: number;
  originY?: number;
  gravity?: number;
  velocity?: number;
  text?: string;
  textColor?: string;
  background?: string;
  seed?: string;
  speed?: number;
  className?: string;
}

export function SuccessConfetti({
  count = 60,
  colors = ["#ff5e3a", "#22c55e", "#0ea5e9", "#facc15", "#a855f7"],
  originX = 0.5,
  originY = 0.5,
  gravity = 0.4,
  velocity = 12,
  text = "Merged!",
  textColor = "#171717",
  background = "#fafafa",
  seed = "remocn",
  speed = 1,
  className,
}: SuccessConfettiProps) {
  const frame = useCurrentFrame() * speed;
  const { fps, durationInFrames } = useVideoConfig();

  const width = 1280;
  const height = 720;
  const cx = width * originX;
  const cy = height * originY;

  const textPop = spring({
    frame: frame - 4,
    fps,
    config: { damping: 9, stiffness: 160, mass: 0.7 },
  });
  const textScale = interpolate(textPop, [0, 1], [0.6, 1]);
  const textOpacity = interpolate(frame, [4, 14], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const textExit = interpolate(
    frame,
    [durationInFrames - 12, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const particles = Array.from({ length: count }, (_, i) => {
    const seedKey = `${seed}:${i}`;
    const angle = random(`${seedKey}:angle`) * Math.PI * 2; // 0..2pi for full burst
    const speed = velocity * (0.6 + random(`${seedKey}:speed`) * 0.8);
    const colorIndex = Math.floor(random(`${seedKey}:color`) * colors.length);
    const color = colors[colorIndex] ?? colors[0];
    const size = 6 + random(`${seedKey}:size`) * 8;
    const rotationSpeed = (random(`${seedKey}:rot`) - 0.5) * 16;
    const initialRotation = random(`${seedKey}:irot`) * 360;
    const isCircle = random(`${seedKey}:shape`) > 0.6;
    const lifeOffset = Math.floor(random(`${seedKey}:delay`) * 4);

    const f = Math.max(0, frame - lifeOffset);
    const x = cx + Math.cos(angle) * speed * f;
    const y = cy + Math.sin(angle) * speed * f + 0.5 * gravity * f * f;
    const rotation = initialRotation + rotationSpeed * f;

    const opacity = interpolate(
      frame,
      [0, 4, durationInFrames - 20, durationInFrames],
      [0, 1, 1, 0],
      { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
    );

    return {
      x,
      y,
      rotation,
      color,
      size,
      isCircle,
      opacity,
      key: i,
    };
  });

  return (
    <div
      className={className}
      style={{
        position: "absolute",
        inset: 0,
        background,
        overflow: "hidden",
        fontFamily:
          "var(--font-geist-sans), -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        style={{ position: "absolute", inset: 0 }}
      >
        {particles.map((p) =>
          p.isCircle ? (
            <circle
              key={p.key}
              cx={p.x}
              cy={p.y}
              r={p.size / 2}
              fill={p.color}
              opacity={p.opacity}
            />
          ) : (
            <rect
              key={p.key}
              x={-p.size / 2}
              y={-p.size / 2}
              width={p.size}
              height={p.size * 0.5}
              rx={1}
              fill={p.color}
              opacity={p.opacity}
              transform={`translate(${p.x} ${p.y}) rotate(${p.rotation})`}
            />
          ),
        )}
      </svg>

      {text ? (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            pointerEvents: "none",
          }}
        >
          <span
            style={{
              fontSize: 96,
              fontWeight: 700,
              letterSpacing: "-0.04em",
              color: textColor,
              transform: `scale(${textScale})`,
              opacity: Math.min(textOpacity, textExit),
            }}
          >
            {text}
          </span>
        </div>
      ) : null}
    </div>
  );
}
