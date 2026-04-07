"use client";

import {
  Easing,
  interpolate,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export type TerminalLineType = "command" | "log" | "success" | "error";

export interface TerminalLine {
  text: string;
  type: TerminalLineType;
  delay?: number;
}

export interface TerminalSimulatorProps {
  lines?: TerminalLine[];
  prompt?: string;
  title?: string;
  background?: string;
  chromeColor?: string;
  fontSize?: number;
  charsPerFrame?: number;
  className?: string;
}

const DEFAULT_LINES: TerminalLine[] = [
  { text: "npm run build", type: "command", delay: 0 },
  { text: "> remocn@1.0.0 build", type: "log", delay: 8 },
  { text: "> next build", type: "log", delay: 4 },
  { text: "Compiled successfully in 4.2s", type: "success", delay: 18 },
  { text: "Generating static pages (24/24)", type: "log", delay: 12 },
  { text: "Build completed without errors", type: "success", delay: 14 },
];

const TYPE_COLORS: Record<TerminalLineType, string> = {
  command: "#fafafa",
  log: "#a1a1aa",
  success: "#22c55e",
  error: "#ef4444",
};

export function TerminalSimulator({
  lines = DEFAULT_LINES,
  prompt = "$",
  title = "~/projects/remocn",
  background = "#0a0a0a",
  chromeColor = "#1a1a1a",
  fontSize = 18,
  charsPerFrame = 1,
  className,
}: TerminalSimulatorProps) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const lineHeight = Math.round(fontSize * 1.6);
  const visibleLines = 8;
  const windowWidth = 900;
  const windowHeight = 480;
  const contentHeight = windowHeight - 60;

  // Compute cumulative start frames for each line
  const starts: number[] = [];
  let acc = 10;
  for (let i = 0; i < lines.length; i++) {
    const delay = lines[i].delay ?? 8;
    acc += delay;
    starts.push(acc);
    // Approximate typing duration so next line offsets after typing
    acc += Math.ceil(lines[i].text.length / charsPerFrame);
  }

  // Smooth scroll: each overflowing line eases the buffer up by one line over
  // ~0.25s, instead of snapping. Deterministic — pure function of frame.
  const scrollDuration = Math.max(1, Math.round(0.25 * fps));
  let translateY = 0;
  for (let i = visibleLines; i < lines.length; i++) {
    const t = interpolate(
      frame,
      [starts[i], starts[i] + scrollDuration],
      [0, 1],
      {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
        easing: Easing.out(Easing.cubic),
      },
    );
    translateY -= t * lineHeight;
  }

  return (
    <div
      className={className}
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#050505",
      }}
    >
      <div
        style={{
          width: windowWidth,
          height: windowHeight,
          background,
          borderRadius: 12,
          overflow: "hidden",
          boxShadow:
            "0 30px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.06)",
          display: "flex",
          flexDirection: "column",
          fontFamily:
            "var(--font-geist-mono), ui-monospace, SFMono-Regular, monospace",
        }}
      >
        {/* Chrome */}
        <div
          style={{
            height: 40,
            background: chromeColor,
            display: "flex",
            alignItems: "center",
            padding: "0 16px",
            gap: 8,
            borderBottom: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              background: "#ff5f57",
            }}
          />
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              background: "#febc2e",
            }}
          />
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              background: "#28c840",
            }}
          />
          <div
            style={{
              flex: 1,
              textAlign: "center",
              color: "#71717a",
              fontSize: 13,
            }}
          >
            {title}
          </div>
        </div>

        {/* Content */}
        <div
          style={{
            flex: 1,
            padding: 20,
            overflow: "hidden",
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              left: 20,
              right: 20,
              top: 20,
              transform: `translateY(${translateY}px)`,
              transition: "none",
            }}
          >
            {lines.map((line, index) => (
              <Sequence
                key={index}
                from={starts[index]}
                layout="none"
              >
                <TerminalLineRow
                  line={line}
                  prompt={prompt}
                  fontSize={fontSize}
                  lineHeight={lineHeight}
                  charsPerFrame={charsPerFrame}
                  fps={fps}
                />
              </Sequence>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function TerminalLineRow({
  line,
  prompt,
  fontSize,
  lineHeight,
  charsPerFrame,
  fps,
}: {
  line: TerminalLine;
  prompt: string;
  fontSize: number;
  lineHeight: number;
  charsPerFrame: number;
  fps: number;
}) {
  const localFrame = useCurrentFrame();
  const totalChars = line.text.length;
  const revealed = Math.floor(
    interpolate(localFrame, [0, totalChars / charsPerFrame], [0, totalChars], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }),
  );
  const visible = line.text.substring(0, revealed);
  const typingDone = revealed >= totalChars;
  // 2 Hz blink at any framerate.
  const cursorVisible = Math.floor((localFrame / fps) * 2) % 2 === 0;

  return (
    <div
      style={{
        height: lineHeight,
        fontSize,
        color: TYPE_COLORS[line.type],
        display: "flex",
        alignItems: "center",
        whiteSpace: "pre",
      }}
    >
      {line.type === "command" && (
        <span style={{ color: "#22c55e", marginRight: 8 }}>{prompt}</span>
      )}
      <span>{visible}</span>
      {!typingDone && cursorVisible && (
        <span
          style={{
            display: "inline-block",
            width: fontSize * 0.55,
            height: fontSize,
            background: TYPE_COLORS[line.type],
            marginLeft: 2,
          }}
        />
      )}
    </div>
  );
}
