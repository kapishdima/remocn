"use client";

import type { ReactNode } from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export interface MorphingModalRect {
  top: number;
  left: number;
  width: number;
  height: number;
}

export interface MorphingModalProps {
  from?: MorphingModalRect;
  to?: MorphingModalRect;
  borderRadiusFrom?: number;
  borderRadiusTo?: number;
  morphAt?: number;
  background?: string;
  cardColor?: string;
  textColor?: string;
  mutedColor?: string;
  sourceTitle?: string;
  sourceBody?: string;
  modalTitle?: string;
  modalBody?: string;
  source?: ReactNode;
  modal?: ReactNode;
  speed?: number;
  className?: string;
}

const FONT_FAMILY =
  "var(--font-geist-sans), -apple-system, BlinkMacSystemFont, sans-serif";

const VIEWPORT_W = 1280;
const VIEWPORT_H = 720;

const DEFAULT_FROM: MorphingModalRect = {
  left: 460,
  top: 260,
  width: 360,
  height: 200,
};

const DEFAULT_TO: MorphingModalRect = {
  left: 80,
  top: 60,
  width: VIEWPORT_W - 160,
  height: VIEWPORT_H - 120,
};

export function MorphingModal({
  from = DEFAULT_FROM,
  to = DEFAULT_TO,
  borderRadiusFrom = 24,
  borderRadiusTo = 0,
  morphAt = 30,
  background = "#050505",
  cardColor = "#0a0a0a",
  textColor = "#fafafa",
  mutedColor = "#71717a",
  sourceTitle = "Compose video",
  sourceBody = "Click to start a new project",
  modalTitle = "New project",
  modalBody = "Pick a template, drop your assets, and ship a 30s video in under five minutes. Everything renders deterministically — no flicker, no flaky frames.",
  source,
  modal,
  speed = 1,
  className,
}: MorphingModalProps) {
  const frame = useCurrentFrame() * speed;
  const { fps } = useVideoConfig();

  // ONE heavy spring drives all 5 morph properties at once. High mass +
  // low stiffness so the modal "blooms" instead of jumping.
  const morph = spring({
    frame: frame - morphAt,
    fps,
    config: { mass: 1.5, damping: 22, stiffness: 110 },
  });

  const left = interpolate(morph, [0, 1], [from.left, to.left]);
  const top = interpolate(morph, [0, 1], [from.top, to.top]);
  const width = interpolate(morph, [0, 1], [from.width, to.width]);
  const height = interpolate(morph, [0, 1], [from.height, to.height]);
  const radius = interpolate(morph, [0, 1], [borderRadiusFrom, borderRadiusTo]);

  // Backdrop fades in alongside the morph spring.
  const backdropAlpha = interpolate(morph, [0, 1], [0, 0.8]);

  // Source content vanishes in the FIRST third of the morph.
  const sourceOpacity = interpolate(morph, [0, 0.33], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Modal content arrives in the LAST third with a translateY offset.
  const modalOpacity = interpolate(morph, [0.66, 1], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const modalTy = interpolate(morph, [0.66, 1], [20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

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
      {/* Backdrop dim layer */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `rgba(0, 0, 0, ${backdropAlpha})`,
          pointerEvents: "none",
        }}
      />

      {/* Suggestion of a bento grid behind so the morph reads as
          "card lifting off". Very low contrast. */}
      <BackgroundGrid />

      {/* The morphing card */}
      <div
        style={{
          position: "absolute",
          left,
          top,
          width,
          height,
          background: cardColor,
          borderRadius: radius,
          boxShadow:
            "0 60px 140px rgba(0,0,0,0.65), 0 0 0 1px rgba(255,255,255,0.06)",
          overflow: "hidden",
        }}
      >
        {/* Source layer (fades out first) */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            padding: 28,
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            gap: 6,
            opacity: sourceOpacity,
          }}
        >
          {source ?? (
            <>
              <div
                style={{
                  fontSize: 20,
                  fontWeight: 700,
                  color: textColor,
                  letterSpacing: "-0.01em",
                }}
              >
                {sourceTitle}
              </div>
              <div style={{ fontSize: 14, color: mutedColor }}>{sourceBody}</div>
            </>
          )}
        </div>

        {/* Modal layer (arrives last with translateY) */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            padding: 64,
            display: "flex",
            flexDirection: "column",
            gap: 24,
            opacity: modalOpacity,
            transform: `translateY(${modalTy}px)`,
          }}
        >
          {modal ?? (
            <>
              <div
                style={{
                  fontSize: 56,
                  fontWeight: 700,
                  color: textColor,
                  letterSpacing: "-0.03em",
                  lineHeight: 1.05,
                }}
              >
                {modalTitle}
              </div>
              <div
                style={{
                  fontSize: 20,
                  lineHeight: 1.55,
                  color: mutedColor,
                  maxWidth: 720,
                }}
              >
                {modalBody}
              </div>
              <div
                style={{
                  marginTop: 12,
                  display: "inline-flex",
                  alignSelf: "flex-start",
                  background: textColor,
                  color: cardColor,
                  padding: "12px 22px",
                  borderRadius: 12,
                  fontSize: 16,
                  fontWeight: 600,
                }}
              >
                Get started
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function BackgroundGrid() {
  // Decorative bento background — 3x2 cards, very low contrast.
  const cells = [
    { x: 80, y: 60, w: 360, h: 200 },
    { x: 460, y: 60, w: 360, h: 200 },
    { x: 840, y: 60, w: 360, h: 200 },
    { x: 80, y: 460, w: 360, h: 200 },
    { x: 840, y: 460, w: 360, h: 200 },
  ];
  return (
    <>
      {cells.map((c, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: c.x,
            top: c.y,
            width: c.w,
            height: c.h,
            background: "#0a0a0a",
            borderRadius: 24,
            border: "1px solid rgba(255,255,255,0.04)",
          }}
        />
      ))}
    </>
  );
}
