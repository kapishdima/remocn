"use client";

import { Easing, interpolate, useCurrentFrame } from "remotion";

export interface CodeDiffWipeProps {
  before?: string;
  after?: string;
  language?: string;
  background?: string;
  accent?: string;
  transitionStart?: number;
  transitionDuration?: number;
  showHandle?: boolean;
  className?: string;
}

const DEFAULT_BEFORE = `function getUser(id) {
  return fetch('/api/user/' + id)
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      if (data.error) {
        throw new Error(data.error);
      }
      return data.user;
    });
}`;

const DEFAULT_AFTER = `async function getUser(id: string) {
  const res = await fetch(\`/api/user/\${id}\`);
  const { user, error } = await res.json();
  if (error) throw new Error(error);
  return user;
}`;

export function CodeDiffWipe({
  before = DEFAULT_BEFORE,
  after = DEFAULT_AFTER,
  language = "tsx",
  background = "#0a0a0a",
  accent = "#0ea5e9",
  transitionStart = 20,
  transitionDuration = 60,
  showHandle = true,
  className,
}: CodeDiffWipeProps) {
  const frame = useCurrentFrame();

  const progress = interpolate(
    frame,
    [transitionStart, transitionStart + transitionDuration],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.inOut(Easing.cubic),
    },
  );

  const wipePercent = progress * 100;

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
        fontFamily:
          "var(--font-geist-sans), -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      <div
        style={{
          position: "relative",
          width: 980,
          height: 560,
          borderRadius: 14,
          overflow: "hidden",
          background,
          boxShadow:
            "0 30px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.06)",
        }}
      >
        {/* AFTER (bottom layer) */}
        <CodePane
          code={after}
          background={background}
          label="AFTER"
          labelColor={accent}
          language={language}
        />

        {/* BEFORE (top layer, clipped) */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            clipPath: `inset(0 ${wipePercent}% 0 0)`,
          }}
        >
          <CodePane
            code={before}
            background={background}
            label="BEFORE"
            labelColor="#ef4444"
            language={language}
            dimmed
          />
        </div>

        {/* Handle */}
        {showHandle && wipePercent > 0 && wipePercent < 100 && (
          <div
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: `${wipePercent}%`,
              width: 2,
              background: accent,
              transform: "translateX(-1px)",
              boxShadow: `0 0 24px ${accent}`,
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 40,
                height: 40,
                borderRadius: "50%",
                background: accent,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#0a0a0a",
                fontSize: 18,
                fontWeight: 700,
                boxShadow: `0 0 32px ${accent}aa`,
              }}
            >
              {"<>"}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function CodePane({
  code,
  background,
  label,
  labelColor,
  language,
  dimmed,
}: {
  code: string;
  background: string;
  label: string;
  labelColor: string;
  language: string;
  dimmed?: boolean;
}) {
  const lines = code.split("\n");
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}
      <div
        style={{
          height: 44,
          padding: "0 18px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          background: "rgba(255,255,255,0.02)",
        }}
      >
        <div
          style={{
            color: "#71717a",
            fontSize: 13,
            fontFamily:
              "var(--font-geist-mono), ui-monospace, SFMono-Regular, monospace",
          }}
        >
          {language}
        </div>
        <div
          style={{
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.12em",
            color: labelColor,
            padding: "4px 10px",
            borderRadius: 999,
            background: `${labelColor}1a`,
            border: `1px solid ${labelColor}55`,
          }}
        >
          {label}
        </div>
      </div>

      {/* Code */}
      <pre
        style={{
          flex: 1,
          margin: 0,
          padding: 24,
          color: dimmed ? "#71717a" : "#e4e4e7",
          fontSize: 16,
          lineHeight: 1.6,
          fontFamily:
            "var(--font-geist-mono), ui-monospace, SFMono-Regular, monospace",
          overflow: "hidden",
          whiteSpace: "pre",
        }}
      >
        {lines.map((line, i) => (
          <div key={i} style={{ display: "flex" }}>
            <span
              style={{
                width: 32,
                textAlign: "right",
                marginRight: 16,
                color: "#3f3f46",
                userSelect: "none",
              }}
            >
              {i + 1}
            </span>
            <span>{line || " "}</span>
          </div>
        ))}
      </pre>
    </div>
  );
}
