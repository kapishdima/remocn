"use client";

import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export interface TerminalToBrowserDeployProps {
  siteUrl?: string;
  accentColor?: string;
  speed?: number;
  className?: string;
}

const FONT_FAMILY =
  "var(--font-geist-sans), -apple-system, BlinkMacSystemFont, sans-serif";
const MONO_FAMILY =
  "var(--font-geist-mono), ui-monospace, SFMono-Regular, Menlo, monospace";

interface Line {
  text: string;
  start: number;
  type: "command" | "step" | "success";
}

function MacDots({ size = 12 }: { size?: number }) {
  return (
    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
      {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
        <div
          key={c}
          style={{
            width: size,
            height: size,
            borderRadius: "50%",
            background: c,
            opacity: 0.85,
          }}
        />
      ))}
    </div>
  );
}

export function TerminalToBrowserDeploy({
  siteUrl = "https://app.example.com",
  accentColor = "#22c55e",
  speed = 1,
  className,
}: TerminalToBrowserDeployProps) {
  const frame = useCurrentFrame() * speed;
  const { fps, durationInFrames } = useVideoConfig();

  const lines: Line[] = [
    { text: "$ pnpm deploy", start: 10, type: "command" },
    { text: "→ Building project...", start: 35, type: "step" },
    { text: "→ Bundling assets...", start: 55, type: "step" },
    { text: "→ Optimizing images...", start: 75, type: "step" },
    { text: "→ Uploading...", start: 95, type: "step" },
    { text: `✓ Deployed to ${siteUrl}`, start: 120, type: "success" },
  ];

  // typewriter for each line
  const renderedLines = lines.map((line) => {
    const elapsed = frame - line.start;
    const charsPerFrame = 1.6;
    const visibleChars = Math.max(
      0,
      Math.min(line.text.length, Math.floor(elapsed * charsPerFrame)),
    );
    return {
      ...line,
      visible: line.text.slice(0, visibleChars),
      isVisible: elapsed >= 0,
    };
  });

  // Terminal collapse start (after deploy line is fully typed)
  const collapseStart = 155;
  const collapseProgress = interpolate(
    frame,
    [collapseStart, collapseStart + 18],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const terminalScale = interpolate(collapseProgress, [0, 1], [1, 0.8]);
  const terminalBlur = interpolate(collapseProgress, [0, 1], [0, 10]);
  const terminalOpacity = interpolate(collapseProgress, [0, 1], [1, 0.35]);

  // Browser spring entry
  const browserSpring = spring({
    frame: frame - collapseStart - 4,
    fps,
    config: { mass: 1, damping: 14, stiffness: 110 },
    durationInFrames: 50,
  });
  const browserScale = browserSpring;
  const browserOpacity = interpolate(browserSpring, [0, 0.3, 1], [0, 1, 1], {
    extrapolateRight: "clamp",
  });

  // Cursor for typewriter effect on the active line
  let activeLine: (typeof renderedLines)[number] | undefined;
  for (let i = renderedLines.length - 1; i >= 0; i--) {
    const l = renderedLines[i];
    if (l.isVisible && l.visible.length < l.text.length) {
      activeLine = l;
      break;
    }
  }

  // approximate vertical position of URL line within terminal body
  // line height ~ 30, body padding-top 18, lines start at index 0..5
  const urlLineIndex = 5;
  const lineHeight = 30;
  const terminalBodyPaddingTop = 22;
  const urlLineCenterY =
    terminalBodyPaddingTop + urlLineIndex * lineHeight + 12;

  // Terminal box dimensions inside the 1280x720 frame
  const terminalWidth = 820;
  const terminalHeight = 360;
  const terminalLeft = (1280 - terminalWidth) / 2;
  const terminalTop = (720 - terminalHeight) / 2;
  const terminalHeaderHeight = 36;

  // The transform-origin for the browser window: the URL text inside the terminal body
  const originX = terminalLeft + 200;
  const originY = terminalTop + terminalHeaderHeight + urlLineCenterY;

  // Browser window dimensions
  const browserWidth = 980;
  const browserHeight = 560;

  return (
    <div
      className={className}
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        background: "#050505",
        fontFamily: FONT_FAMILY,
      }}
    >
      {/* subtle backdrop */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at center, #0f172a 0%, #050505 70%)",
        }}
      />

      {/* Terminal */}
      <div
        style={{
          position: "absolute",
          left: terminalLeft,
          top: terminalTop,
          width: terminalWidth,
          height: terminalHeight,
          borderRadius: 14,
          background: "rgba(15,15,17,0.96)",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow:
            "0 30px 80px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.06)",
          overflow: "hidden",
          transform: `scale(${terminalScale})`,
          filter: `blur(${terminalBlur}px)`,
          opacity: terminalOpacity,
          transformOrigin: "center center",
          willChange: "transform, filter",
        }}
      >
        <div
          style={{
            height: terminalHeaderHeight,
            display: "flex",
            alignItems: "center",
            paddingLeft: 14,
            borderBottom: "1px solid rgba(255,255,255,0.06)",
            background: "rgba(255,255,255,0.02)",
          }}
        >
          <MacDots />
          <div
            style={{
              flex: 1,
              textAlign: "center",
              color: "rgba(255,255,255,0.45)",
              fontFamily: MONO_FAMILY,
              fontSize: 12,
              marginRight: 56,
            }}
          >
            ~/project — zsh
          </div>
        </div>
        <div
          style={{
            padding: `${terminalBodyPaddingTop}px 22px`,
            fontFamily: MONO_FAMILY,
            fontSize: 16,
            lineHeight: `${lineHeight}px`,
            color: "rgba(255,255,255,0.85)",
          }}
        >
          {renderedLines.map((line, i) => {
            if (!line.isVisible) return null;
            const isActive = activeLine === line;
            const showCursor = isActive && Math.floor(frame / 12) % 2 === 0;
            const color =
              line.type === "success"
                ? accentColor
                : line.type === "command"
                  ? "rgba(255,255,255,0.95)"
                  : "rgba(255,255,255,0.7)";
            return (
              <div
                key={i}
                style={{
                  color,
                  whiteSpace: "pre",
                }}
              >
                {line.visible}
                {showCursor && (
                  <span
                    style={{
                      display: "inline-block",
                      width: 8,
                      height: 18,
                      background: "rgba(255,255,255,0.85)",
                      verticalAlign: "text-bottom",
                      marginLeft: 2,
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Browser window — emerges from URL line */}
      <div
        style={{
          position: "absolute",
          left: (1280 - browserWidth) / 2,
          top: (720 - browserHeight) / 2,
          width: browserWidth,
          height: browserHeight,
          borderRadius: 16,
          overflow: "hidden",
          background: "#0a0a0a",
          border: "1px solid rgba(255,255,255,0.1)",
          boxShadow:
            "0 50px 120px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.04), inset 0 1px 0 rgba(255,255,255,0.06)",
          transform: `scale(${browserScale})`,
          transformOrigin: `${((originX - (1280 - browserWidth) / 2) / browserWidth) * 100}% ${((originY - (720 - browserHeight) / 2) / browserHeight) * 100}%`,
          opacity: browserOpacity,
          willChange: "transform, opacity",
        }}
      >
        {/* Browser chrome */}
        <div
          style={{
            height: 44,
            display: "flex",
            alignItems: "center",
            gap: 14,
            paddingLeft: 16,
            paddingRight: 16,
            background: "rgba(20,20,22,0.95)",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <MacDots />
          <div
            style={{
              flex: 1,
              height: 26,
              borderRadius: 13,
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.08)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "rgba(255,255,255,0.7)",
              fontFamily: MONO_FAMILY,
              fontSize: 12,
            }}
          >
            {siteUrl}
          </div>
          <div style={{ width: 60 }} />
        </div>
        {/* Page */}
        <div
          style={{
            position: "absolute",
            inset: "44px 0 0 0",
            background:
              "linear-gradient(180deg, #0a0a0a 0%, #111118 60%, #0a0a0a 100%)",
            color: "white",
            padding: "60px 80px",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: 24,
          }}
        >
          {/* nav */}
          <div
            style={{
              position: "absolute",
              top: 22,
              left: 80,
              right: 80,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              fontFamily: FONT_FAMILY,
              fontSize: 14,
              color: "rgba(255,255,255,0.7)",
            }}
          >
            <div style={{ fontWeight: 600, color: "white" }}>Acme</div>
            <div style={{ display: "flex", gap: 24 }}>
              <span>Features</span>
              <span>Pricing</span>
              <span>Docs</span>
            </div>
          </div>

          {/* abstract shape */}
          <div
            style={{
              position: "absolute",
              right: 60,
              top: 120,
              width: 280,
              height: 280,
              borderRadius: "50%",
              background: `radial-gradient(circle at 30% 30%, ${accentColor}55, transparent 70%)`,
              filter: "blur(20px)",
            }}
          />
          <div
            style={{
              position: "absolute",
              right: 100,
              top: 160,
              width: 200,
              height: 200,
              borderRadius: 24,
              border: `1px solid ${accentColor}55`,
              transform: "rotate(12deg)",
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.04), transparent)",
            }}
          />

          <div
            style={{
              fontFamily: FONT_FAMILY,
              fontSize: 14,
              color: accentColor,
              fontWeight: 500,
              marginTop: 50,
            }}
          >
            Now live
          </div>
          <div
            style={{
              fontFamily: FONT_FAMILY,
              fontSize: 72,
              fontWeight: 700,
              letterSpacing: "-0.04em",
              lineHeight: 1,
              maxWidth: 560,
            }}
          >
            Ship faster.
          </div>
          <div
            style={{
              fontFamily: FONT_FAMILY,
              fontSize: 18,
              color: "rgba(255,255,255,0.65)",
              maxWidth: 480,
              lineHeight: 1.5,
            }}
          >
            From commit to global edge in seconds. No config. No drama.
          </div>
          <button
            type="button"
            style={{
              marginTop: 8,
              padding: "14px 28px",
              borderRadius: 10,
              background: accentColor,
              color: "#0a0a0a",
              fontFamily: FONT_FAMILY,
              fontSize: 15,
              fontWeight: 600,
              border: "none",
              boxShadow: `0 10px 30px ${accentColor}40`,
            }}
          >
            Get started →
          </button>
        </div>
      </div>

      {/* prevent unused fps warning if duration computed */}
      <div style={{ display: "none" }}>{durationInFrames}</div>
    </div>
  );
}
