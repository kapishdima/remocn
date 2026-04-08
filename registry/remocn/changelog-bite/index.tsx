"use client";

import type { ReactNode } from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export interface ChangelogBiteProps {
  label?: string;
  title?: string;
  oldContent?: ReactNode;
  newContent?: ReactNode;
  format?: "square" | "portrait";
  background?: string;
  cardBackground?: string;
  accent?: string;
  speed?: number;
  className?: string;
}

const FONT_FAMILY =
  "var(--font-geist-sans), -apple-system, BlinkMacSystemFont, sans-serif";
const MONO_FAMILY =
  "var(--font-geist-mono), ui-monospace, SFMono-Regular, Menlo, monospace";

const SOFT = Easing.bezier(0.16, 1, 0.3, 1);

export function ChangelogBite({
  label = "New",
  title = "Inline diff view",
  oldContent,
  newContent,
  format = "square",
  background = "#141318",
  cardBackground = "rgba(20, 19, 24, 0.92)",
  accent = "#FFB38E",
  speed = 1,
  className,
}: ChangelogBiteProps) {
  const frame = useCurrentFrame() * speed;
  const { fps, durationInFrames } = useVideoConfig();

  // ── Card scale/opacity envelope (loop seam) ─────────────────────────────
  // First 10 frames: 0.95 → 1.0, 0 → 1
  // Last 15 frames:  1.0 → 0.95, 1 → 0
  // The match means a flat-cut from final to first frame is invisible.
  const enterT = interpolate(frame, [0, 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: SOFT,
  });
  const exitT = interpolate(
    frame,
    [durationInFrames - 15, durationInFrames - 1],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: SOFT },
  );
  const cardScale = 0.95 + enterT * 0.05 - exitT * 0.05;
  const cardOpacity = enterT * (1 - exitT);

  // ── Wipe progress (frosted glass + clip) ────────────────────────────────
  const wipe = spring({
    frame: frame - 60,
    fps,
    config: { damping: 18, mass: 0.9, stiffness: 90 },
    durationInFrames: 50,
  });
  const wipePct = wipe * 100;

  // ── Aspect-driven inner card sizing ─────────────────────────────────────
  const isSquare = format === "square";
  const cardWidth = isSquare ? 880 : 880;
  const cardHeight = isSquare ? 880 : 1100;

  const oldNode = oldContent ?? <DefaultOldPanel accent={accent} />;
  const newNode = newContent ?? <DefaultNewPanel accent={accent} />;

  return (
    <AbsoluteFill
      className={className}
      style={{
        background,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: FONT_FAMILY,
      }}
    >
      <div
        style={{
          width: cardWidth,
          height: cardHeight,
          borderRadius: 56,
          background: cardBackground,
          border: `1px solid ${accent}33`,
          boxShadow: `0 30px 120px ${accent}22, 0 0 0 1px rgba(255,255,255,0.04), inset 0 1px 0 rgba(255,255,255,0.06)`,
          opacity: cardOpacity,
          transform: `scale(${cardScale})`,
          transformOrigin: "center",
          willChange: "transform, opacity",
          padding: 56,
          display: "flex",
          flexDirection: "column",
          gap: 28,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Header row: title + New pill */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              color: "rgba(255,255,255,0.55)",
              fontSize: 22,
              letterSpacing: "0.02em",
            }}
          >
            {title}
          </div>
          <PulsingPill label={label} color={accent} speed={speed} />
        </div>

        {/* Diff stage */}
        <div
          style={{
            position: "relative",
            flex: 1,
            borderRadius: 32,
            overflow: "hidden",
            background: "rgba(8,7,12,0.6)",
            border: "1px solid rgba(255,255,255,0.05)",
          }}
        >
          {/* New (bottom layer) */}
          <div style={{ position: "absolute", inset: 0 }}>{newNode}</div>

          {/* Old (top layer, clipped left-to-right) */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              clipPath: `inset(0 ${wipePct}% 0 0)`,
              willChange: "clip-path",
            }}
          >
            {oldNode}
          </div>

          {/* Frosted glass shutter sweeping over the seam */}
          {wipePct > 0 && wipePct < 100 && (
            <div
              style={{
                position: "absolute",
                top: 0,
                bottom: 0,
                left: `calc(${wipePct}% - 60px)`,
                width: 120,
                background:
                  "linear-gradient(90deg, rgba(255,255,255,0.0) 0%, rgba(255,255,255,0.10) 50%, rgba(255,255,255,0.0) 100%)",
                backdropFilter: "blur(18px)",
                WebkitBackdropFilter: "blur(18px)",
                pointerEvents: "none",
              }}
            />
          )}

          {/* Subtle accent seam line */}
          {wipePct > 0 && wipePct < 100 && (
            <div
              style={{
                position: "absolute",
                top: 0,
                bottom: 0,
                left: `${wipePct}%`,
                width: 1.5,
                background: accent,
                opacity: 0.55,
                boxShadow: `0 0 18px ${accent}aa`,
                pointerEvents: "none",
              }}
            />
          )}
        </div>

        {/* Footer caption — labels swap mid-wipe */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            color: "rgba(255,255,255,0.4)",
            fontSize: 16,
            fontFamily: MONO_FAMILY,
          }}
        >
          <span style={{ opacity: 1 - wipe }}>before</span>
          <span style={{ opacity: wipe }}>after</span>
        </div>
      </div>
    </AbsoluteFill>
  );
}

/* -------------------------------------------------------------------------- */
/*                              Default content                               */
/* -------------------------------------------------------------------------- */

function DefaultOldPanel({ accent }: { accent: string }) {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: "#0a090e",
        padding: "44px 52px",
        fontFamily: MONO_FAMILY,
        color: "#71717a",
        fontSize: 22,
        lineHeight: 1.55,
        whiteSpace: "pre",
      }}
    >
      <div>{"function diff(a, b) {"}</div>
      <div>{"  if (a === b) return null;"}</div>
      <div>{"  return {"}</div>
      <div>{"    before: a,"}</div>
      <div>{"    after: b,"}</div>
      <div>{"  };"}</div>
      <div>{"}"}</div>
      <div
        style={{
          marginTop: 24,
          display: "inline-block",
          padding: "6px 14px",
          borderRadius: 999,
          background: "rgba(239,68,68,0.12)",
          border: "1px solid rgba(239,68,68,0.35)",
          color: "#ef4444",
          fontSize: 13,
          letterSpacing: "0.12em",
          fontWeight: 700,
        }}
      >
        BEFORE
      </div>
      {/* swallow lint */}
      <span style={{ display: "none" }}>{accent}</span>
    </div>
  );
}

function DefaultNewPanel({ accent }: { accent: string }) {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background:
          "radial-gradient(ellipse at 50% 30%, rgba(255,179,142,0.10) 0%, rgba(10,9,14,1) 70%)",
        padding: "44px 52px",
        fontFamily: MONO_FAMILY,
        color: "#e4e4e7",
        fontSize: 22,
        lineHeight: 1.55,
        whiteSpace: "pre",
      }}
    >
      <div>
        <span style={{ color: "#c4b5fd" }}>function</span>{" "}
        <span style={{ color: "#fcd34d" }}>diff</span>
        {"(a, b) {"}
      </div>
      <div>
        {"  return "}
        <span style={{ color: "#86efac" }}>visualDiff</span>
        {"(a, b);"}
      </div>
      <div>{"}"}</div>
      <div
        style={{
          marginTop: 24,
          display: "inline-block",
          padding: "6px 14px",
          borderRadius: 999,
          background: `${accent}1a`,
          border: `1px solid ${accent}55`,
          color: accent,
          fontSize: 13,
          letterSpacing: "0.12em",
          fontWeight: 700,
        }}
      >
        AFTER
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                              Pulsing pill                                  */
/* -------------------------------------------------------------------------- */

function PulsingPill({
  label,
  color,
  speed,
}: {
  label: string;
  color: string;
  speed: number;
}) {
  const frame = useCurrentFrame() * speed;
  const wave = (Math.sin(frame / 8) + 1) / 2;
  const dotScale = 0.92 + wave * 0.16;
  const ringPhase = (frame % 60) / 60;
  const ringScale = 1 + ringPhase * 1.6;
  const ringOpacity = (1 - ringPhase) * 0.6;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "10px 18px 10px 14px",
        borderRadius: 999,
        background: `${color}1a`,
        border: `1px solid ${color}55`,
        color,
        fontSize: 16,
        fontWeight: 600,
        letterSpacing: "0.02em",
      }}
    >
      <div style={{ position: "relative", width: 12, height: 12 }}>
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            background: color,
            opacity: ringOpacity,
            transform: `scale(${ringScale})`,
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            background: color,
            transform: `scale(${dotScale})`,
          }}
        />
      </div>
      {label}
    </div>
  );
}
