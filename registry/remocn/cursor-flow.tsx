"use client";

import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export interface CursorWaypoint {
  x: number;
  y: number;
  /** If set, the cursor will pause here for this many frames before moving on. */
  hold?: number;
  /** If true, a click animation will fire when the cursor reaches this point. */
  click?: boolean;
  /** Optional label rendered next to the click target. */
  label?: string;
}

export interface CursorFlowProps {
  waypoints?: CursorWaypoint[];
  cursorColor?: string;
  cursorSize?: number;
  segmentDuration?: number;
  background?: string;
  showTargets?: boolean;
  speed?: number;
  className?: string;
}

const FONT_FAMILY =
  "var(--font-geist-sans), -apple-system, BlinkMacSystemFont, sans-serif";

const DEFAULT_WAYPOINTS: CursorWaypoint[] = [
  { x: 200, y: 180 },
  { x: 540, y: 240, click: true, label: "Generate" },
  { x: 880, y: 360, hold: 8 },
  { x: 1040, y: 520, click: true, label: "Publish" },
];

/**
 * Cubic Bezier evaluator. Two control points are derived per segment so the
 * trajectory always has a "belly" — straight lines between two points are
 * specifically the look we want to avoid.
 */
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

/** Apple-flavoured ease for in-segment motion: slow start, slow end. */
function easeInOut(t: number) {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}

/** Per-segment control points: midpoint perpendicular offset gives a natural arc. */
function controlsFor(
  a: { x: number; y: number },
  b: { x: number; y: number },
  index: number,
) {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const len = Math.hypot(dx, dy) || 1;
  // Perpendicular unit vector. Alternate sign per segment so the path snakes
  // instead of always bulging the same way.
  const sign = index % 2 === 0 ? 1 : -1;
  const px = (-dy / len) * (len * 0.18) * sign;
  const py = (dx / len) * (len * 0.18) * sign;
  // Place control points at 1/3 and 2/3 along the chord, offset perpendicular.
  return [
    { x: a.x + dx / 3 + px, y: a.y + dy / 3 + py },
    { x: a.x + (2 * dx) / 3 + px, y: a.y + (2 * dy) / 3 + py },
  ];
}

export function CursorFlow({
  waypoints = DEFAULT_WAYPOINTS,
  cursorColor = "#fafafa",
  cursorSize = 28,
  segmentDuration = 36,
  background = "#0a0a0a",
  showTargets = true,
  speed = 1,
  className,
}: CursorFlowProps) {
  const frame = useCurrentFrame() * speed;
  const { fps } = useVideoConfig();

  // Build the timeline: each segment is segmentDuration frames, with optional
  // hold time at each waypoint.
  type SegmentTiming = { startFrame: number; endFrame: number; holdEnd: number };
  const timings: SegmentTiming[] = [];
  let cursorFrame = 0;
  for (let i = 0; i < waypoints.length - 1; i++) {
    const start = cursorFrame;
    const end = start + segmentDuration;
    const holdEnd = end + (waypoints[i + 1].hold ?? 0);
    timings.push({ startFrame: start, endFrame: end, holdEnd });
    cursorFrame = holdEnd;
  }

  // Find the active segment.
  let pos = { x: waypoints[0].x, y: waypoints[0].y };
  let activeWaypointIndex = 0;
  for (let i = 0; i < timings.length; i++) {
    const { startFrame, endFrame, holdEnd } = timings[i];
    if (frame >= startFrame && frame < endFrame) {
      const t = easeInOut((frame - startFrame) / segmentDuration);
      const a = waypoints[i];
      const b = waypoints[i + 1];
      const [c1, c2] = controlsFor(a, b, i);
      pos = cubicBezier(t, a, c1, c2, b);
      activeWaypointIndex = i;
      break;
    } else if (frame >= endFrame && frame < holdEnd) {
      pos = { x: waypoints[i + 1].x, y: waypoints[i + 1].y };
      activeWaypointIndex = i + 1;
      break;
    } else if (frame >= holdEnd) {
      pos = { x: waypoints[i + 1].x, y: waypoints[i + 1].y };
      activeWaypointIndex = i + 1;
    }
  }

  return (
    <div
      className={className}
      style={{
        position: "absolute",
        inset: 0,
        background,
        fontFamily: FONT_FAMILY,
      }}
    >
      {/* Click targets */}
      {showTargets &&
        waypoints.map((wp, i) => {
          if (!wp.click) return null;
          // Find when the cursor reaches this waypoint and trigger the press scale.
          const timing = timings[i - 1];
          const arrivalFrame = timing ? timing.endFrame : 0;
          return (
            <ClickTarget
              key={i}
              x={wp.x}
              y={wp.y}
              label={wp.label}
              arrivalFrame={arrivalFrame}
              currentFrame={frame}
              fps={fps}
            />
          );
        })}

      {/* Cursor */}
      <Cursor
        x={pos.x}
        y={pos.y}
        size={cursorSize}
        color={cursorColor}
        currentFrame={frame}
        fps={fps}
        clickFrames={timings
          .map((t, i) => (waypoints[i + 1].click ? t.endFrame : -1))
          .filter((f) => f >= 0)}
      />

      {/* Cursor active marker just for context — small dot at active waypoint */}
      <div
        style={{
          position: "absolute",
          width: 6,
          height: 6,
          left: waypoints[activeWaypointIndex].x - 3,
          top: waypoints[activeWaypointIndex].y - 3,
          borderRadius: "50%",
          background: "rgba(255,255,255,0.04)",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}

function Cursor({
  x,
  y,
  size,
  color,
  currentFrame,
  fps,
  clickFrames,
}: {
  x: number;
  y: number;
  size: number;
  color: string;
  currentFrame: number;
  fps: number;
  clickFrames: number[];
}) {
  // Find nearest click moment within ±4 frames; press scale if so.
  let scale = 1;
  for (const cf of clickFrames) {
    const delta = currentFrame - cf;
    if (delta >= 0 && delta <= 4) {
      // 4-frame hard press: 1 → 0.85 → 1
      const press = spring({
        frame: delta,
        fps,
        config: { damping: 22, stiffness: 320, mass: 0.5 },
      });
      scale = interpolate(press, [0, 1], [0.85, 1]);
      break;
    }
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      style={{
        position: "absolute",
        left: x,
        top: y,
        transform: `scale(${scale})`,
        transformOrigin: "0 0",
        zIndex: 9999,
        filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.6))",
        pointerEvents: "none",
      }}
    >
      <path
        d="M3 2 L3 18 L7 14 L10 21 L13 20 L10 13 L17 13 Z"
        fill={color}
        stroke="#0a0a0a"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ClickTarget({
  x,
  y,
  label,
  arrivalFrame,
  currentFrame,
  fps,
}: {
  x: number;
  y: number;
  label?: string;
  arrivalFrame: number;
  currentFrame: number;
  fps: number;
}) {
  // Synced press: when the cursor scales to 0.85, the target dips to 0.98.
  const delta = currentFrame - arrivalFrame;
  let pressScale = 1;
  if (delta >= 0 && delta <= 6) {
    const t = spring({
      frame: delta,
      fps,
      config: { damping: 18, stiffness: 280 },
    });
    pressScale = interpolate(t, [0, 1], [0.98, 1]);
  }

  return (
    <div
      style={{
        position: "absolute",
        left: x - 70,
        top: y - 22,
        transform: `scale(${pressScale})`,
        transformOrigin: "center",
        padding: "10px 18px",
        borderRadius: 10,
        background: "#fafafa",
        color: "#0a0a0a",
        fontSize: 14,
        fontWeight: 600,
        boxShadow: "0 12px 30px rgba(0,0,0,0.4)",
        pointerEvents: "none",
      }}
    >
      {label ?? "Click"}
    </div>
  );
}
