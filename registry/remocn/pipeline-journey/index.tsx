"use client";

import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export interface PipelineJourneyProps {
  cardLabel?: string;
  accentColor?: string;
  speed?: number;
  className?: string;
}

const FONT_FAMILY =
  "var(--font-geist-sans), -apple-system, BlinkMacSystemFont, sans-serif";
const MONO_FAMILY =
  "var(--font-geist-mono), ui-monospace, SFMono-Regular, Menlo, monospace";

const COLUMNS = [
  { id: "todo", title: "Todo", count: 3 },
  { id: "in_progress", title: "In Progress", count: 2 },
  { id: "done", title: "Done", count: 4 },
];

const COL_WIDTH = 320;
const COL_GAP = 40;
const BOARD_TOP = 120;
const BOARD_LEFT = 120;
const CARD_W = 280;
const CARD_H = 88;

function colCenter(index: number) {
  const x = BOARD_LEFT + index * (COL_WIDTH + COL_GAP) + COL_WIDTH / 2;
  const y = BOARD_TOP + 90;
  return { x, y };
}

function pseudoRandom(i: number) {
  const v = Math.sin(i * 12.9898) * 43758.5453;
  return v - Math.floor(v);
}

function PlaceholderCard({ opacity = 1 }: { opacity?: number }) {
  return (
    <div
      style={{
        width: CARD_W,
        height: CARD_H,
        borderRadius: 12,
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.08)",
        marginBottom: 12,
        padding: 14,
        display: "flex",
        flexDirection: "column",
        gap: 10,
        opacity,
      }}
    >
      <div
        style={{
          width: "70%",
          height: 10,
          borderRadius: 4,
          background: "rgba(255,255,255,0.12)",
        }}
      />
      <div
        style={{
          width: "45%",
          height: 8,
          borderRadius: 4,
          background: "rgba(255,255,255,0.08)",
        }}
      />
      <div style={{ flex: 1 }} />
      <div
        style={{
          width: 28,
          height: 28,
          borderRadius: 999,
          background: "rgba(255,255,255,0.12)",
        }}
      />
    </div>
  );
}

export function PipelineJourney({
  cardLabel = "Build pipeline",
  accentColor = "#22c55e",
  speed = 1,
  className,
}: PipelineJourneyProps) {
  const frame = useCurrentFrame() * speed;
  const { fps } = useVideoConfig();

  // Phases
  const flight1Start = 30;
  const flight1End = 70;
  const waitEnd = 110;
  const flight2Start = 110;
  const flight2End = 150;
  const confettiStart = 150;

  const todoCenter = colCenter(0);
  const progCenter = colCenter(1);
  const doneCenter = colCenter(2);

  // Card position interpolation
  let cx: number;
  let cy: number;
  let rotZ = 0;
  let scaleBoost = 1;
  let shadowAlpha = 0.25;
  let shadowBlur = 20;

  if (frame < flight1Start) {
    cx = todoCenter.x;
    cy = todoCenter.y;
  } else if (frame < flight1End) {
    const p = (frame - flight1Start) / (flight1End - flight1Start);
    cx = interpolate(p, [0, 1], [todoCenter.x, progCenter.x]);
    // arc
    const arc = Math.sin(p * Math.PI) * 80;
    cy = interpolate(p, [0, 1], [todoCenter.y, progCenter.y]) - arc;
    rotZ = Math.sin(p * Math.PI) * 3;
    scaleBoost = 1 + Math.sin(p * Math.PI) * 0.15;
    shadowAlpha = 0.25 + Math.sin(p * Math.PI) * 0.4;
    shadowBlur = 20 + Math.sin(p * Math.PI) * 60;
  } else if (frame < flight2Start) {
    cx = progCenter.x;
    cy = progCenter.y;
  } else if (frame < flight2End) {
    const p = (frame - flight2Start) / (flight2End - flight2Start);
    cx = interpolate(p, [0, 1], [progCenter.x, doneCenter.x]);
    const arc = Math.sin(p * Math.PI) * 80;
    cy = interpolate(p, [0, 1], [progCenter.y, doneCenter.y]) - arc;
    rotZ = Math.sin(p * Math.PI) * 3;
    scaleBoost = 1 + Math.sin(p * Math.PI) * 0.15;
    shadowAlpha = 0.25 + Math.sin(p * Math.PI) * 0.4;
    shadowBlur = 20 + Math.sin(p * Math.PI) * 60;
  } else {
    cx = doneCenter.x;
    cy = doneCenter.y;
  }

  // Landing micro-spring on each arrival
  const land1 = spring({
    frame: frame - flight1End,
    fps,
    config: { damping: 10, stiffness: 180, mass: 0.7 },
    durationInFrames: 18,
  });
  const land2 = spring({
    frame: frame - flight2End,
    fps,
    config: { damping: 10, stiffness: 180, mass: 0.7 },
    durationInFrames: 18,
  });

  let landingScale = 1;
  if (frame >= flight1End && frame < flight2Start) {
    landingScale = interpolate(land1, [0, 1], [0.92, 1]);
  } else if (frame >= flight2End) {
    landingScale = interpolate(land2, [0, 1], [0.92, 1]);
  }

  // Column flash on landing
  const progFlash = interpolate(
    frame,
    [flight1End, flight1End + 4, flight1End + 18],
    [0, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const doneFlash = interpolate(
    frame,
    [flight2End, flight2End + 4, flight2End + 18],
    [0, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  // Timer visibility (during in_progress wait)
  const timerOpacity = interpolate(
    frame,
    [flight1End + 4, flight1End + 12, waitEnd - 8, waitEnd],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const timerSecs = Math.floor(
    interpolate(frame, [flight1End, waitEnd], [0, 42], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }),
  );

  // Confetti particles
  const PARTICLE_COUNT = 36;
  const confettiFrame = frame - confettiStart;

  return (
    <div
      className={className}
      style={{
        position: "absolute",
        inset: 0,
        background: "#09090b",
        fontFamily: FONT_FAMILY,
        color: "white",
        overflow: "hidden",
      }}
    >
      {/* Subtle grid bg */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Title */}
      <div
        style={{
          position: "absolute",
          top: 48,
          left: BOARD_LEFT,
          fontSize: 24,
          fontWeight: 600,
          letterSpacing: "-0.02em",
        }}
      >
        Sprint board
      </div>

      {/* Columns */}
      {COLUMNS.map((col, i) => {
        const flash =
          col.id === "in_progress"
            ? progFlash
            : col.id === "done"
              ? doneFlash
              : 0;
        return (
          <div
            key={col.id}
            style={{
              position: "absolute",
              top: BOARD_TOP,
              left: BOARD_LEFT + i * (COL_WIDTH + COL_GAP),
              width: COL_WIDTH,
              height: 480,
              borderRadius: 16,
              background: `rgba(255,255,255,${0.02 + flash * 0.08})`,
              border: `1px solid rgba(255,255,255,${0.06 + flash * 0.2})`,
              padding: 20,
              transition: "none",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 18,
              }}
            >
              <div style={{ fontSize: 14, fontWeight: 600, opacity: 0.85 }}>
                {col.title}
              </div>
              <div
                style={{
                  fontSize: 12,
                  fontFamily: MONO_FAMILY,
                  opacity: 0.5,
                  padding: "2px 8px",
                  borderRadius: 999,
                  background: "rgba(255,255,255,0.06)",
                }}
              >
                {col.count}
              </div>
            </div>
            {Array.from({ length: col.count }).map((_, k) => (
              <PlaceholderCard key={k} opacity={0.55 + ((k * 13) % 30) / 100} />
            ))}
          </div>
        );
      })}

      {/* Flying card */}
      <div
        style={{
          position: "absolute",
          left: cx - CARD_W / 2,
          top: cy - CARD_H / 2,
          width: CARD_W,
          height: CARD_H,
          borderRadius: 14,
          background: "#18181b",
          border: `1px solid ${accentColor}`,
          boxShadow: `0 ${shadowBlur / 2}px ${shadowBlur}px rgba(0,0,0,${shadowAlpha}), 0 0 0 1px rgba(255,255,255,0.04) inset`,
          transform: `rotate(${rotZ}deg) scale(${scaleBoost * landingScale})`,
          transformOrigin: "center center",
          padding: 16,
          display: "flex",
          flexDirection: "column",
          gap: 10,
          willChange: "transform",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              fontFamily: MONO_FAMILY,
              fontSize: 11,
              opacity: 0.5,
            }}
          >
            REMO-128
          </div>
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: 999,
              background: accentColor,
              boxShadow: `0 0 12px ${accentColor}`,
            }}
          />
        </div>
        <div
          style={{
            fontSize: 16,
            fontWeight: 600,
            letterSpacing: "-0.01em",
          }}
        >
          {cardLabel}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: "auto",
          }}
        >
          <div
            style={{
              fontFamily: MONO_FAMILY,
              fontSize: 12,
              opacity: timerOpacity,
              color: accentColor,
            }}
          >
            00:{String(timerSecs).padStart(2, "0")}
          </div>
          <div
            style={{
              fontSize: 11,
              opacity: 0.4,
            }}
          >
            assignee
          </div>
        </div>
      </div>

      {/* Confetti */}
      {confettiFrame > 0 &&
        Array.from({ length: PARTICLE_COUNT }).map((_, i) => {
          const angle = pseudoRandom(i + 1) * Math.PI * 2;
          const dist = 60 + pseudoRandom(i + 99) * 220;
          const drift = pseudoRandom(i + 7) * 40 - 20;
          const sizeR = pseudoRandom(i + 3);
          const size = 6 + sizeR * 8;
          const colorPick = pseudoRandom(i + 5);
          const color =
            colorPick < 0.33
              ? accentColor
              : colorPick < 0.66
                ? "#fbbf24"
                : "#60a5fa";
          const lifespan = 50;
          const t = Math.min(confettiFrame / lifespan, 1);
          const eased = 1 - (1 - t) * (1 - t);
          const px = doneCenter.x + Math.cos(angle) * dist * eased + drift * t;
          const py =
            doneCenter.y +
            Math.sin(angle) * dist * eased +
            // gravity
            t * t * 220;
          const opacity = interpolate(t, [0, 0.7, 1], [1, 1, 0]);
          const rot = pseudoRandom(i + 11) * 360 + confettiFrame * 12;
          return (
            <div
              key={i}
              style={{
                position: "absolute",
                left: px - size / 2,
                top: py - size / 2,
                width: size,
                height: size * 0.6,
                background: color,
                borderRadius: 2,
                opacity,
                transform: `rotate(${rot}deg)`,
                willChange: "transform",
              }}
            />
          );
        })}
    </div>
  );
}
