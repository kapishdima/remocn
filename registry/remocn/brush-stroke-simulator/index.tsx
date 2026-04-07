"use client";

import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export interface BrushStrokeSimulatorProps {
  /** Brush stroke width in pixels. */
  brushSize?: number;
  /** Cursor fill color (semi-transparent). */
  cursorColor?: string;
  /** Outer page background. */
  background?: string;
  /** Primary tint of the simulated portrait base. */
  baseColorA?: string;
  /** Secondary tint of the simulated portrait base. */
  baseColorB?: string;
  /** Tint of the obscured / pixelated overlay. */
  overlayColor?: string;
  /** Frame at which the brushing motion begins. */
  startFrame?: number;
  /** How many frames the brush takes to complete its sweep. */
  sweepDuration?: number;
  /** Playback speed multiplier. */
  speed?: number;
  className?: string;
}

const FONT_FAMILY =
  "var(--font-geist-sans), -apple-system, BlinkMacSystemFont, sans-serif";

const STAGE_W = 1280;
const STAGE_H = 720;

/**
 * Two faces' worth of waypoints — sweeps left face, lifts, sweeps right face.
 * Y values cluster around the upper-middle of the frame so it reads like
 * brushing across the eyes/cheeks of a portrait.
 */
const WAYPOINTS: { x: number; y: number; press: boolean }[] = [
  { x: 280, y: 280, press: true },
  { x: 460, y: 260, press: true },
  { x: 460, y: 360, press: true },
  { x: 280, y: 380, press: true },
  // Lift between faces
  { x: 640, y: 220, press: false },
  // Right face
  { x: 820, y: 280, press: true },
  { x: 1000, y: 260, press: true },
  { x: 1000, y: 360, press: true },
  { x: 820, y: 380, press: true },
];

function cubicBezier(
  t: number,
  p0: { x: number; y: number },
  p1: { x: number; y: number },
  p2: { x: number; y: number },
  p3: { x: number; y: number },
) {
  const u = 1 - t;
  const tt = t * t;
  const uu = u * u;
  const uuu = uu * u;
  const ttt = tt * t;
  return {
    x: uuu * p0.x + 3 * uu * t * p1.x + 3 * u * tt * p2.x + ttt * p3.x,
    y: uuu * p0.y + 3 * uu * t * p1.y + 3 * u * tt * p2.y + ttt * p3.y,
  };
}

function easeInOut(t: number) {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}

function controlsFor(
  a: { x: number; y: number },
  b: { x: number; y: number },
  index: number,
) {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const len = Math.hypot(dx, dy) || 1;
  const sign = index % 2 === 0 ? 1 : -1;
  const px = (-dy / len) * (len * 0.18) * sign;
  const py = (dx / len) * (len * 0.18) * sign;
  return [
    { x: a.x + dx / 3 + px, y: a.y + dy / 3 + py },
    { x: a.x + (2 * dx) / 3 + px, y: a.y + (2 * dy) / 3 + py },
  ];
}

/**
 * Walks the bezier path up to the given progress (0..1) and returns:
 *  - the active position
 *  - whether the brush is currently "pressed" (between two press waypoints)
 *  - a sampled trail of every position visited so far (for the reveal mask)
 */
function sampleBrushPath(progress: number) {
  const segments = WAYPOINTS.length - 1;
  const samplesPerSegment = 14;
  const totalSamples = segments * samplesPerSegment;
  const reachedSamples = Math.max(
    1,
    Math.min(totalSamples, Math.floor(progress * totalSamples)),
  );

  const trail: { x: number; y: number; press: boolean }[] = [];
  let pos = { x: WAYPOINTS[0].x, y: WAYPOINTS[0].y };
  let pressed = WAYPOINTS[0].press;

  for (let i = 0; i < reachedSamples; i++) {
    const segIdx = Math.min(segments - 1, Math.floor(i / samplesPerSegment));
    const localT = (i % samplesPerSegment) / samplesPerSegment;
    const a = WAYPOINTS[segIdx];
    const b = WAYPOINTS[segIdx + 1];
    const [c1, c2] = controlsFor(a, b, segIdx);
    const t = easeInOut(localT);
    pos = cubicBezier(t, a, c1, c2, b);
    pressed = a.press && b.press;
    trail.push({ x: pos.x, y: pos.y, press: pressed });
  }

  return { pos, pressed, trail };
}

export function BrushStrokeSimulator({
  brushSize = 70,
  cursorColor = "rgba(255,255,255,0.45)",
  background = "#0a0a0a",
  baseColorA = "#f4a261",
  baseColorB = "#e76f51",
  overlayColor = "#1f1f23",
  startFrame = 12,
  sweepDuration = 150,
  speed = 1,
  className,
}: BrushStrokeSimulatorProps) {
  const frame = useCurrentFrame() * speed;
  const { fps } = useVideoConfig();

  const localFrame = Math.max(0, frame - startFrame);
  const progress = Math.min(1, localFrame / sweepDuration);

  const { pos, pressed, trail } = sampleBrushPath(progress);

  // Press scale: cursor shrinks slightly while pressing onto the surface.
  const pressTarget = pressed ? 0.86 : 1;
  const pressSpring = spring({
    frame: localFrame,
    fps,
    config: { damping: 18, stiffness: 220, mass: 0.6 },
  });
  const cursorScale = interpolate(pressSpring, [0, 1], [1, pressTarget]);

  // Build SVG path d-attribute from the accumulated trail.
  const maskPathD =
    trail.length === 0
      ? ""
      : trail
          .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(2)} ${p.y.toFixed(2)}`)
          .join(" ");

  // Tiny intro fade so the scene "lands" before the brush starts.
  const introOpacity = interpolate(frame, [0, 8], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      className={className}
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        background,
        fontFamily: FONT_FAMILY,
        opacity: introOpacity,
      }}
    >
      {/* Sharp base layer — fake portrait built from radial gradients */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `
            radial-gradient(circle at 27% 45%, ${baseColorA} 0%, transparent 28%),
            radial-gradient(circle at 67% 45%, ${baseColorA} 0%, transparent 28%),
            radial-gradient(circle at 47% 70%, ${baseColorB} 0%, transparent 55%),
            linear-gradient(160deg, #2a1a14 0%, #1a0f0a 100%)
          `,
        }}
      />

      {/* Eye / detail dots so the unbrushed area reads as "faces" */}
      <FaceDots />

      {/* Pixelated overlay — the layer the brush "reveals" through the mask */}
      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${STAGE_W} ${STAGE_H}`}
        style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
      >
        <defs>
          <mask id="brush-reveal-mask" maskUnits="userSpaceOnUse">
            <rect width={STAGE_W} height={STAGE_H} fill="white" />
            {maskPathD && (
              <path
                d={maskPathD}
                stroke="black"
                strokeWidth={brushSize}
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            )}
          </mask>
          <pattern
            id="pixel-overlay"
            x="0"
            y="0"
            width="32"
            height="32"
            patternUnits="userSpaceOnUse"
          >
            <rect width="32" height="32" fill={overlayColor} />
            <rect width="16" height="16" fill="rgba(255,255,255,0.04)" />
            <rect x="16" y="16" width="16" height="16" fill="rgba(0,0,0,0.25)" />
          </pattern>
        </defs>
        <rect
          width={STAGE_W}
          height={STAGE_H}
          fill="url(#pixel-overlay)"
          mask="url(#brush-reveal-mask)"
        />
      </svg>

      {/* Cursor / fingertip */}
      <div
        style={{
          position: "absolute",
          left: pos.x - brushSize / 2,
          top: pos.y - brushSize / 2,
          width: brushSize,
          height: brushSize,
          borderRadius: "50%",
          background: cursorColor,
          border: "1.5px solid rgba(255,255,255,0.85)",
          boxShadow:
            "0 8px 24px rgba(0,0,0,0.45), inset 0 0 0 1px rgba(255,255,255,0.15)",
          transform: `scale(${cursorScale})`,
          transformOrigin: "center",
          pointerEvents: "none",
          zIndex: 9999,
        }}
      />
    </div>
  );
}

function FaceDots() {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox={`0 0 ${STAGE_W} ${STAGE_H}`}
      style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
    >
      {/* Left face */}
      <circle cx="320" cy="300" r="10" fill="rgba(0,0,0,0.55)" />
      <circle cx="420" cy="300" r="10" fill="rgba(0,0,0,0.55)" />
      <path
        d="M310 360 Q370 390 430 360"
        stroke="rgba(0,0,0,0.55)"
        strokeWidth="6"
        fill="none"
        strokeLinecap="round"
      />
      {/* Right face */}
      <circle cx="860" cy="300" r="10" fill="rgba(0,0,0,0.55)" />
      <circle cx="960" cy="300" r="10" fill="rgba(0,0,0,0.55)" />
      <path
        d="M850 360 Q910 390 970 360"
        stroke="rgba(0,0,0,0.55)"
        strokeWidth="6"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}
