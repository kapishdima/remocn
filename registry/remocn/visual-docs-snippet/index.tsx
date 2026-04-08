"use client";

import {
  AbsoluteFill,
  Easing,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export interface VisualDocsSnippetProps {
  cursorStart?: { x: number; y: number };
  cursorTarget?: { x: number; y: number };
  clickFrame?: number;
  tooltipTitle?: string;
  tooltipBody?: string;
  buttonLabel?: string;
  accent?: string;
  background?: string;
  speed?: number;
  className?: string;
}

const FONT_FAMILY =
  "var(--font-geist-sans), -apple-system, BlinkMacSystemFont, sans-serif";

const SOFT = Easing.bezier(0.16, 1, 0.3, 1);

// Browser frame layout — kept as constants so cursor coordinates are easy to
// reason about against absolute frame coordinates.
const BROWSER = {
  left: 100,
  top: 90,
  width: 1080,
  height: 540,
  chromeHeight: 48,
};

// The "Generate" button sits inside the browser; bounding box is anchored
// here. Coordinates are absolute (in the 1280x720 frame).
const BUTTON = {
  cx: 640,
  cy: 360,
  width: 220,
  height: 64,
};

export function VisualDocsSnippet({
  cursorStart = { x: 980, y: 560 },
  cursorTarget = { x: BUTTON.cx, y: BUTTON.cy },
  clickFrame = 110,
  tooltipTitle = "Generate runs",
  tooltipBody = "Click to start a new generation. The job will appear in the sidebar.",
  buttonLabel = "Generate",
  accent = "#FFB38E",
  background = "#141318",
  speed = 1,
  className,
}: VisualDocsSnippetProps) {
  const frame = useCurrentFrame() * speed;
  const { fps } = useVideoConfig();

  // ── Timing anchors derived from clickFrame ──────────────────────────────
  const cursorStartFrame = 30;
  const cursorEndFrame = clickFrame; // arrives exactly at click
  const boundingBoxFrame = clickFrame + 5;
  const tooltipFrame = clickFrame + 20;
  const settleFrame = clickFrame + 90;

  // ── Browser fade-in ─────────────────────────────────────────────────────
  const enter = interpolate(frame, [0, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: SOFT,
  });
  const enterScale = interpolate(frame, [0, 30], [0.98, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: SOFT,
  });

  // ── Cursor motion: bezier arc from start to target ──────────────────────
  const cursorT = interpolate(
    frame,
    [cursorStartFrame, cursorEndFrame],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: SOFT,
    },
  );
  // After click, cursor exits down-right so it doesn't cover the new content.
  const exitT = interpolate(
    frame,
    [clickFrame + 6, clickFrame + 50],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: SOFT,
    },
  );
  const exitTarget = { x: 1180, y: 660 };

  const baseX = lerp(cursorStart.x, cursorTarget.x, cursorT);
  const baseY = lerp(cursorStart.y, cursorTarget.y, cursorT);
  // Soft arc bias on the way to the button (so the path feels organic).
  const arc = Math.sin(cursorT * Math.PI) * -36;
  const cursorX = lerp(baseX, exitTarget.x, exitT);
  const cursorY = lerp(baseY + arc, exitTarget.y, exitT);

  // ── Click micro-bounce ──────────────────────────────────────────────────
  const clickSpring = spring({
    frame: frame - clickFrame,
    fps,
    config: { damping: 10, stiffness: 200, mass: 0.6 },
    durationInFrames: 14,
  });
  const clickDip = interpolate(clickSpring, [0, 0.4, 1], [1, 0.94, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const buttonScale = frame >= clickFrame ? clickDip : 1;
  const cursorClickScale = frame >= clickFrame ? clickDip : 1;

  // Click ripple
  const ripple = interpolate(frame, [clickFrame, clickFrame + 24], [0, 60], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const rippleOpacity = interpolate(
    frame,
    [clickFrame, clickFrame + 24],
    [0.6, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  // ── Bounding box draw-on (animated stroke-dashoffset) ───────────────────
  const boxPerimeter = (BUTTON.width + 24 + (BUTTON.height + 24)) * 2;
  const boxProgress = interpolate(
    frame,
    [boundingBoxFrame, boundingBoxFrame + 18],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: SOFT },
  );
  const boxOpacity = interpolate(
    frame,
    [boundingBoxFrame, boundingBoxFrame + 6, settleFrame, settleFrame + 10],
    [0, 1, 1, 0.6],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  return (
    <AbsoluteFill
      className={className}
      style={{
        background,
        fontFamily: FONT_FAMILY,
      }}
    >
      {/* Browser frame */}
      <div
        style={{
          position: "absolute",
          left: BROWSER.left,
          top: BROWSER.top,
          width: BROWSER.width,
          height: BROWSER.height,
          borderRadius: 18,
          overflow: "hidden",
          background: "#0a090e",
          border: "1px solid rgba(255,255,255,0.06)",
          boxShadow: "0 50px 120px rgba(0,0,0,0.55)",
          opacity: enter,
          transform: `scale(${enterScale})`,
          transformOrigin: "center 40%",
          willChange: "transform, opacity",
        }}
      >
        <BrowserChrome chromeHeight={BROWSER.chromeHeight} />

        {/* Page viewport */}
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: BROWSER.chromeHeight,
            bottom: 0,
            background: "#0a090e",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            paddingTop: 60,
            gap: 22,
          }}
        >
          <div
            style={{
              fontSize: 13,
              color: "rgba(255,255,255,0.45)",
              letterSpacing: "0.04em",
            }}
          >
            Generations · 2 active
          </div>
          <div
            style={{
              fontSize: 38,
              fontWeight: 600,
              color: "white",
              letterSpacing: "-0.025em",
              maxWidth: 720,
              textAlign: "center",
              lineHeight: 1.15,
            }}
          >
            Run a new generation
          </div>
          <div
            style={{
              fontSize: 15,
              color: "rgba(255,255,255,0.55)",
              maxWidth: 480,
              textAlign: "center",
              lineHeight: 1.5,
            }}
          >
            Pick a model, set a seed, and start a job. Results stream into the
            sidebar as they finish.
          </div>
        </div>
      </div>

      {/* CTA button — sits OUTSIDE the browser DOM in absolute coords so the
          bounding box and cursor align to identical pixel anchors. */}
      <div
        style={{
          position: "absolute",
          left: BUTTON.cx - BUTTON.width / 2,
          top: BUTTON.cy - BUTTON.height / 2,
          width: BUTTON.width,
          height: BUTTON.height,
          borderRadius: 14,
          background: "white",
          color: "#0a090e",
          fontWeight: 600,
          fontSize: 17,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transform: `scale(${buttonScale})`,
          boxShadow:
            frame >= clickFrame
              ? `0 0 0 6px ${accent}22, 0 12px 32px rgba(255,255,255,0.08)`
              : "0 12px 32px rgba(255,255,255,0.08)",
          opacity: enter,
          willChange: "transform",
        }}
      >
        {buttonLabel} →
      </div>

      {/* Click ripple */}
      {rippleOpacity > 0 && (
        <svg
          style={{
            position: "absolute",
            left: BUTTON.cx - 80,
            top: BUTTON.cy - 80,
            width: 160,
            height: 160,
            pointerEvents: "none",
          }}
        >
          <circle
            cx={80}
            cy={80}
            r={ripple}
            fill="none"
            stroke={accent}
            strokeWidth={2}
            opacity={rippleOpacity}
          />
        </svg>
      )}

      {/* Bounding box selector — animated draw-on via stroke-dashoffset */}
      {frame >= boundingBoxFrame && (
        <svg
          style={{
            position: "absolute",
            left: BUTTON.cx - BUTTON.width / 2 - 12,
            top: BUTTON.cy - BUTTON.height / 2 - 12,
            width: BUTTON.width + 24,
            height: BUTTON.height + 24,
            pointerEvents: "none",
            opacity: boxOpacity,
          }}
        >
          <rect
            x={1}
            y={1}
            width={BUTTON.width + 22}
            height={BUTTON.height + 22}
            rx={10}
            ry={10}
            fill="none"
            stroke={accent}
            strokeOpacity={0.85}
            strokeWidth={2}
            strokeDasharray={`${boxPerimeter} ${boxPerimeter}`}
            strokeDashoffset={(1 - boxProgress) * boxPerimeter}
          />
          {/* Corner ticks */}
          {[
            [0, 0],
            [BUTTON.width + 24, 0],
            [0, BUTTON.height + 24],
            [BUTTON.width + 24, BUTTON.height + 24],
          ].map(([cx, cy], i) => (
            <circle
              key={i}
              cx={cx}
              cy={cy}
              r={4}
              fill={accent}
              opacity={boxProgress}
            />
          ))}
        </svg>
      )}

      {/* Tooltip card to the right of the bounding box */}
      {frame >= tooltipFrame && (
        <Tooltip
          frame={frame}
          tooltipFrame={tooltipFrame}
          settleFrame={settleFrame}
          accent={accent}
          title={tooltipTitle}
          body={tooltipBody}
        />
      )}

      {/* Cursor — drawn last so it sits above everything */}
      {frame >= cursorStartFrame && (
        <div
          style={{
            position: "absolute",
            left: cursorX,
            top: cursorY,
            transform: `translate(-2px, -2px) scale(${cursorClickScale})`,
            transformOrigin: "top left",
            zIndex: 9999,
            filter: "drop-shadow(0 4px 10px rgba(0,0,0,0.55))",
            willChange: "transform, left, top",
          }}
        >
          <CursorSVG />
        </div>
      )}
    </AbsoluteFill>
  );
}

/* -------------------------------------------------------------------------- */
/*                                 Subviews                                    */
/* -------------------------------------------------------------------------- */

function BrowserChrome({ chromeHeight }: { chromeHeight: number }) {
  return (
    <div
      style={{
        position: "relative",
        height: chromeHeight,
        display: "flex",
        alignItems: "center",
        gap: 14,
        paddingLeft: 18,
        paddingRight: 18,
        background: "rgba(20,19,24,0.95)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <div style={{ display: "flex", gap: 8 }}>
        {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
          <div
            key={c}
            style={{
              width: 11,
              height: 11,
              borderRadius: "50%",
              background: c,
              opacity: 0.85,
            }}
          />
        ))}
      </div>
      <div
        style={{
          flex: 1,
          height: 28,
          marginLeft: 12,
          borderRadius: 14,
          background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,255,255,0.06)",
          display: "flex",
          alignItems: "center",
          paddingLeft: 14,
          color: "rgba(255,255,255,0.55)",
          fontSize: 12,
          fontFamily:
            "var(--font-geist-mono), ui-monospace, SFMono-Regular, Menlo, monospace",
        }}
      >
        ⌕ remocn.dev/runs/new
      </div>
    </div>
  );
}

function Tooltip({
  frame,
  tooltipFrame,
  settleFrame,
  accent,
  title,
  body,
}: {
  frame: number;
  tooltipFrame: number;
  settleFrame: number;
  accent: string;
  title: string;
  body: string;
}) {
  // Two-line stagger fade-up
  const headT = interpolate(
    frame,
    [tooltipFrame, tooltipFrame + 14],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: SOFT },
  );
  const bodyT = interpolate(
    frame,
    [tooltipFrame + 6, tooltipFrame + 20],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: SOFT },
  );
  const settle = interpolate(
    frame,
    [settleFrame, settleFrame + 10],
    [1, 0.6],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  return (
    <div
      style={{
        position: "absolute",
        left: BUTTON.cx + BUTTON.width / 2 + 56,
        top: BUTTON.cy - 60,
        width: 320,
        padding: "20px 22px",
        borderRadius: 16,
        background: "rgba(20,19,24,0.92)",
        border: `1px solid ${accent}55`,
        boxShadow: `0 20px 60px rgba(0,0,0,0.5)`,
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        opacity: settle,
        fontFamily: FONT_FAMILY,
      }}
    >
      <div
        style={{
          opacity: headT,
          transform: `translateY(${(1 - headT) * 12}px)`,
          color: "white",
          fontSize: 17,
          fontWeight: 600,
          letterSpacing: "-0.01em",
          marginBottom: 6,
        }}
      >
        {title}
      </div>
      <div
        style={{
          opacity: bodyT,
          transform: `translateY(${(1 - bodyT) * 12}px)`,
          color: "rgba(255,255,255,0.6)",
          fontSize: 14,
          lineHeight: 1.5,
        }}
      >
        {body}
      </div>
      {/* Pointer toward bounding box */}
      <div
        style={{
          position: "absolute",
          left: -8,
          top: 70,
          width: 14,
          height: 14,
          background: "rgba(20,19,24,0.92)",
          borderLeft: `1px solid ${accent}55`,
          borderBottom: `1px solid ${accent}55`,
          transform: "rotate(45deg)",
        }}
      />
    </div>
  );
}

function CursorSVG() {
  return (
    <svg width={28} height={28} viewBox="0 0 24 24" fill="none">
      <path
        d="M5 3L5 19L9.5 14.5L12.5 21L15 20L12 13.5L18.5 13.5L5 3Z"
        fill="white"
        stroke="#000"
        strokeWidth={1.2}
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/*                                 Helpers                                    */
/* -------------------------------------------------------------------------- */

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}
