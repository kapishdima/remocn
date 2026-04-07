"use client";

import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export interface AIGenerateOverlayProps {
  maxBlur?: number;
  blurStartFrame?: number;
  blurPeakFrame?: number;
  revealStartFrame?: number;
  pillText?: string;
  accent?: string;
  background?: string;
  sourceImageBg?: string;
  generatedImageBg?: string;
  dotColor?: string;
  dotSize?: number;
  dotSpacing?: number;
  speed?: number;
  className?: string;
}

const FONT_FAMILY =
  "var(--font-geist-sans), -apple-system, BlinkMacSystemFont, sans-serif";

const DEFAULT_SOURCE_BG =
  "linear-gradient(135deg, #6b3a1a 0%, #d4a574 50%, #8b4513 100%)";

const DEFAULT_GENERATED_BG =
  "radial-gradient(ellipse at center, #d4a574 0%, #8b4513 22%, #2a1a10 42%), linear-gradient(180deg, #1a1410 0%, #0a0806 50%, #1a1410 100%)";

export function AIGenerateOverlay({
  maxBlur = 20,
  blurStartFrame = 20,
  blurPeakFrame = 40,
  revealStartFrame = 110,
  pillText = "Generating…",
  accent = "#a78bfa",
  background = "#050505",
  sourceImageBg = DEFAULT_SOURCE_BG,
  generatedImageBg = DEFAULT_GENERATED_BG,
  dotColor = "#ffffff",
  dotSize = 1.2,
  dotSpacing = 20,
  speed = 1,
  className,
}: AIGenerateOverlayProps) {
  const rawFrame = useCurrentFrame();
  const frame = rawFrame * speed;
  const { fps, durationInFrames } = useVideoConfig();

  // Phase 1 → 2: blur ramps up over [blurStartFrame, blurPeakFrame]
  const blur = interpolate(
    frame,
    [blurStartFrame, blurPeakFrame],
    [0, maxBlur],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  // Dot grid opacity follows blur, plus a subtle sine shimmer.
  const gridBaseOpacity = interpolate(
    frame,
    [blurStartFrame, blurPeakFrame],
    [0, 0.4],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const gridShimmer = Math.sin(frame / 6) * 0.05;
  const gridOpacity = Math.max(0, gridBaseOpacity + gridShimmer);

  // Generated image fade-in from revealStartFrame.
  const reveal = spring({
    frame: frame - revealStartFrame,
    fps,
    config: { mass: 1, damping: 22, stiffness: 90 },
  });
  const generatedOpacity = interpolate(reveal, [0, 1], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Pill is visible during phases 2-3, fades out as the new image fades in.
  const pillIn = interpolate(frame, [blurStartFrame, blurPeakFrame], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const pillOut = interpolate(generatedOpacity, [0, 0.6], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const pillOpacity = pillIn * pillOut;
  const pillScale = 1 + Math.sin(frame / 8) * 0.02;
  const pillGlow = 0.35 + Math.sin(frame / 8) * 0.15;

  // Detached dot count animation for the pill text — three trailing dots.
  const dotPhase = Math.floor(frame / 10) % 4;
  const animatedPillText =
    pillText.replace(/[…\.]+$/, "") + ".".repeat(dotPhase);

  // Typed unused-suppression: keep durationInFrames referenced for IDEs.
  void durationInFrames;

  return (
    <div
      className={className}
      style={{
        position: "absolute",
        inset: 0,
        background,
        fontFamily: FONT_FAMILY,
        overflow: "hidden",
      }}
    >
      {/* Source ("painting") layer — blurs out as AI thinks. */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: sourceImageBg,
          filter: `blur(${blur}px)`,
          // Slight scale to hide the blur edge feathering at the viewport border.
          transform: "scale(1.06)",
        }}
      />

      {/* Generated image layer — fades in over the blurred source. */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: generatedImageBg,
          opacity: generatedOpacity,
        }}
      />

      {/* Dot grid overlay — pure SVG pattern with animated opacity + shimmer. */}
      <svg
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          opacity: gridOpacity * (1 - generatedOpacity),
          pointerEvents: "none",
          mixBlendMode: "screen",
        }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="ai-generate-overlay-dots"
            width={dotSpacing}
            height={dotSpacing}
            patternUnits="userSpaceOnUse"
          >
            <circle
              cx={dotSpacing / 2}
              cy={dotSpacing / 2}
              r={dotSize}
              fill={dotColor}
            />
          </pattern>
        </defs>
        <rect
          width="100%"
          height="100%"
          fill="url(#ai-generate-overlay-dots)"
        />
      </svg>

      {/* "Generating…" pill */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "none",
          opacity: pillOpacity,
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 12,
            padding: "14px 24px",
            borderRadius: 999,
            background: "rgba(10, 10, 10, 0.55)",
            color: "#fafafa",
            fontSize: 18,
            fontWeight: 500,
            letterSpacing: "-0.01em",
            border: "1px solid rgba(255,255,255,0.12)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            boxShadow: `0 0 0 1px rgba(255,255,255,0.04), 0 0 40px ${hexWithAlpha(
              accent,
              pillGlow,
            )}, 0 12px 40px rgba(0,0,0,0.45)`,
            transform: `scale(${pillScale})`,
          }}
        >
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: 999,
              background: accent,
              boxShadow: `0 0 12px ${hexWithAlpha(accent, 0.9)}`,
            }}
          />
          {animatedPillText}
        </div>
      </div>
    </div>
  );
}

// Convert a #rrggbb to rgba(r, g, b, a). Falls back to the original string if
// not a 6-digit hex (so users can pass a CSS color name and still get *some*
// glow, just without alpha).
function hexWithAlpha(hex: string, alpha: number): string {
  const m = /^#([0-9a-f]{6})$/i.exec(hex);
  if (!m) return hex;
  const int = parseInt(m[1], 16);
  const r = (int >> 16) & 255;
  const g = (int >> 8) & 255;
  const b = int & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
