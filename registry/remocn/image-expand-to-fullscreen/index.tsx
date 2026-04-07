"use client";

import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export interface ImageExpandRect {
  top: number;
  left: number;
  width: number;
  height: number;
}

export interface ImageExpandToFullscreenProps {
  from?: ImageExpandRect;
  to?: ImageExpandRect;
  borderRadiusFrom?: number;
  borderRadiusTo?: number;
  morphAt?: number;
  imageColorA?: string;
  imageColorB?: string;
  imageColorC?: string;
  feedBackground?: string;
  editorBackground?: string;
  accent?: string;
  postAuthor?: string;
  postBody?: string;
  speed?: number;
  className?: string;
}

const FONT_FAMILY =
  "var(--font-geist-sans), -apple-system, BlinkMacSystemFont, sans-serif";

const VIEWPORT_W = 1280;
const VIEWPORT_H = 720;

const DEFAULT_FROM: ImageExpandRect = {
  left: 460,
  top: 280,
  width: 360,
  height: 200,
};

const DEFAULT_TO: ImageExpandRect = {
  left: 200,
  top: 120,
  width: 880,
  height: 480,
};

export function ImageExpandToFullscreen({
  from = DEFAULT_FROM,
  to = DEFAULT_TO,
  borderRadiusFrom = 12,
  borderRadiusTo = 16,
  morphAt = 30,
  imageColorA = "#ff6b6b",
  imageColorB = "#845ec2",
  imageColorC = "#4d8dff",
  feedBackground = "#f4f4f5",
  editorBackground = "#0a0a0a",
  accent = "#fafafa",
  postAuthor = "Maya Larsson",
  postBody = "Sunset over the old harbor — color graded straight out of camera.",
  speed = 1,
  className,
}: ImageExpandToFullscreenProps) {
  const frame = useCurrentFrame() * speed;
  const { fps } = useVideoConfig();

  // ONE spring drives the entire shared-element transition. Slightly more
  // critically damped than the morphing modal — the image lands with a
  // tight settle rather than a heavy bloom.
  const morph = spring({
    frame: frame - morphAt,
    fps,
    config: { mass: 1.4, damping: 24, stiffness: 130 },
  });

  const left = interpolate(morph, [0, 1], [from.left, to.left]);
  const top = interpolate(morph, [0, 1], [from.top, to.top]);
  const width = interpolate(morph, [0, 1], [from.width, to.width]);
  const height = interpolate(morph, [0, 1], [from.height, to.height]);
  const radius = interpolate(morph, [0, 1], [borderRadiusFrom, borderRadiusTo]);

  // Feed UI fades fully out in the FIRST half of the morph; the dark
  // editor background fades in across the same window.
  const feedOpacity = interpolate(morph, [0, 0.5], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const editorOpacity = interpolate(morph, [0, 0.5], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Toolbars slide in during the LAST third of the morph — they should
  // feel called in by the image landing at fullscreen.
  const toolbarOpacity = interpolate(morph, [0.5, 1], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const topToolbarTy = interpolate(morph, [0.5, 1], [-100, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const bottomToolbarTy = interpolate(morph, [0.5, 1], [100, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const imageGradient = `linear-gradient(135deg, ${imageColorA}, ${imageColorB}, ${imageColorC})`;

  return (
    <div
      className={className}
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        fontFamily: FONT_FAMILY,
      }}
    >
      {/* Feed background (light page) */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: feedBackground,
          opacity: feedOpacity,
        }}
      />

      {/* Editor background (dark canvas) */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: editorBackground,
          opacity: editorOpacity,
        }}
      />

      {/* Fake post card living on the feed */}
      <div
        style={{
          position: "absolute",
          left: 380,
          top: 140,
          width: 520,
          padding: 24,
          background: "#ffffff",
          borderRadius: 20,
          boxShadow: "0 30px 80px rgba(15, 15, 25, 0.08)",
          opacity: feedOpacity,
          display: "flex",
          flexDirection: "column",
          gap: 16,
        }}
      >
        {/* Author row */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 999,
              background: imageGradient,
            }}
          />
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <div
              style={{
                fontSize: 15,
                fontWeight: 600,
                color: "#0a0a0a",
                letterSpacing: "-0.005em",
              }}
            >
              {postAuthor}
            </div>
            <div style={{ fontSize: 12, color: "#71717a" }}>2h ago</div>
          </div>
        </div>

        {/* Body text */}
        <div
          style={{
            fontSize: 14,
            lineHeight: 1.5,
            color: "#27272a",
          }}
        >
          {postBody}
        </div>

        {/* Spacer where the thumbnail visually lives — the actual
            morphing image is rendered absolutely below so it can lift
            cleanly off the card. */}
        <div
          style={{
            width: "100%",
            height: 200,
            borderRadius: 12,
            background: "transparent",
          }}
        />

        {/* Action row */}
        <div style={{ display: "flex", gap: 16 }}>
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              style={{
                width: 28,
                height: 28,
                borderRadius: 8,
                background: "#f4f4f5",
              }}
            />
          ))}
        </div>
      </div>

      {/* The morphing image — driven entirely by the single spring */}
      <div
        style={{
          position: "absolute",
          left,
          top,
          width,
          height,
          borderRadius: radius,
          background: imageGradient,
          boxShadow:
            "0 40px 100px rgba(0, 0, 0, 0.55), 0 0 0 1px rgba(255, 255, 255, 0.06)",
          overflow: "hidden",
        }}
      />

      {/* Top toolbar */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 64,
          padding: "0 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "rgba(15, 15, 18, 0.6)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
          opacity: toolbarOpacity,
          transform: `translateY(${topToolbarTy}%)`,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              background: "rgba(255, 255, 255, 0.08)",
            }}
          />
          <div
            style={{
              fontSize: 14,
              fontWeight: 500,
              color: accent,
              letterSpacing: "-0.005em",
            }}
          >
            Editor
          </div>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              style={{
                width: 32,
                height: 32,
                borderRadius: 8,
                background: "rgba(255, 255, 255, 0.06)",
              }}
            />
          ))}
        </div>
      </div>

      {/* Bottom toolbar */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 80,
          padding: "0 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 14,
          background: "rgba(15, 15, 18, 0.6)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderTop: "1px solid rgba(255, 255, 255, 0.06)",
          opacity: toolbarOpacity,
          transform: `translateY(${bottomToolbarTy}%)`,
        }}
      >
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            style={{
              width: 44,
              height: 44,
              borderRadius: 12,
              background:
                i === 2
                  ? accent
                  : "rgba(255, 255, 255, 0.06)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
            }}
          />
        ))}
      </div>
    </div>
  );
}
