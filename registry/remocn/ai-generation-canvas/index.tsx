"use client";

import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export interface AIGenerationCanvasProps {
  prompt?: string;
  accentColor?: string;
  cardCount?: number;
  speed?: number;
  className?: string;
}

const FONT_FAMILY =
  "var(--font-geist-sans), -apple-system, BlinkMacSystemFont, sans-serif";

function MiniBarChart({ accentColor }: { accentColor: string }) {
  const bars = [0.4, 0.7, 0.55, 0.85, 0.5, 0.95, 0.65];
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-end",
        gap: 6,
        height: 60,
        marginTop: 12,
      }}
    >
      {bars.map((h, i) => (
        <div
          key={i}
          style={{
            flex: 1,
            height: `${h * 100}%`,
            background: accentColor,
            borderRadius: 3,
            opacity: 0.3 + h * 0.7,
          }}
        />
      ))}
    </div>
  );
}

function MiniRows() {
  return (
    <div
      style={{
        marginTop: 12,
        display: "flex",
        flexDirection: "column",
        gap: 6,
      }}
    >
      {[0.9, 0.7, 0.85, 0.6].map((w, i) => (
        <div
          key={i}
          style={{
            height: 8,
            width: `${w * 100}%`,
            background: "rgba(255,255,255,0.12)",
            borderRadius: 4,
          }}
        />
      ))}
    </div>
  );
}

function StatBlock({
  accentColor,
  value,
}: {
  accentColor: string;
  value: string;
}) {
  return (
    <div style={{ marginTop: 8 }}>
      <div
        style={{
          fontSize: 36,
          fontWeight: 700,
          color: "white",
          letterSpacing: "-0.03em",
          fontFamily: FONT_FAMILY,
        }}
      >
        {value}
      </div>
      <div
        style={{
          fontSize: 12,
          color: accentColor,
          marginTop: 2,
          fontWeight: 500,
        }}
      >
        +12.4% this week
      </div>
    </div>
  );
}

function CardContent({
  index,
  accentColor,
}: {
  index: number;
  accentColor: string;
}) {
  const titles = [
    "Revenue",
    "Active Users",
    "Sessions",
    "Conversion",
    "Retention",
    "Latency",
  ];
  const values = ["$48.2k", "12,840", "9.1k", "3.8%", "76%", "142ms"];
  const variant = index % 3;
  return (
    <div style={{ width: "100%", height: "100%", padding: 18 }}>
      <div
        style={{
          fontSize: 12,
          color: "rgba(255,255,255,0.55)",
          fontWeight: 500,
          fontFamily: FONT_FAMILY,
          letterSpacing: "0.02em",
          textTransform: "uppercase",
        }}
      >
        {titles[index % titles.length]}
      </div>
      {variant === 0 ? (
        <>
          <StatBlock
            accentColor={accentColor}
            value={values[index % values.length]}
          />
          <MiniBarChart accentColor={accentColor} />
        </>
      ) : variant === 1 ? (
        <>
          <StatBlock
            accentColor={accentColor}
            value={values[index % values.length]}
          />
          <MiniRows />
        </>
      ) : (
        <>
          <MiniBarChart accentColor={accentColor} />
          <MiniRows />
        </>
      )}
    </div>
  );
}

export function AIGenerationCanvas({
  prompt = "Generate a dashboard",
  accentColor = "#7c3aed",
  cardCount = 4,
  speed = 1,
  className,
}: AIGenerationCanvasProps) {
  const frame = useCurrentFrame() * speed;
  const { fps } = useVideoConfig();

  // Phase boundaries
  const P1_END = 40;
  const P2_END = 70;
  const P3_END = 100;

  // Phase 1: typewriter
  const charCount = Math.floor(
    interpolate(frame, [4, P1_END - 2], [0, prompt.length], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }),
  );
  const typedText = prompt.substring(0, charCount);
  const cursorVisible = Math.floor(frame / 12) % 2 === 0;

  // Phase 2: input -> header transform
  const transformProgress = spring({
    frame: frame - P1_END,
    fps,
    config: { mass: 1, damping: 16, stiffness: 110 },
    durationInFrames: 30,
  });

  // Centered input dimensions
  const inputCenteredW = 640;
  const inputCenteredH = 80;
  const headerW = 1200;
  const headerH = 56;
  const inputW = interpolate(
    transformProgress,
    [0, 1],
    [inputCenteredW, headerW],
  );
  const inputH = interpolate(
    transformProgress,
    [0, 1],
    [inputCenteredH, headerH],
  );
  const inputTop = interpolate(transformProgress, [0, 1], [320, 40]);
  const inputRadius = interpolate(transformProgress, [0, 1], [16, 12]);
  const inputFontSize = interpolate(transformProgress, [0, 1], [24, 14]);

  // Phase 3: skeleton fade
  const skeletonOpacity = interpolate(frame, [P2_END, P3_END], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Shimmer position
  const shimmerPos = ((frame * 1.5) % 200) - 50;

  // Phase 4: card flip reveal (after frame 100)
  const cards = Array.from({ length: cardCount });

  return (
    <div
      className={className}
      style={{
        position: "absolute",
        inset: 0,
        background: "#0a0a0a",
        overflow: "hidden",
        fontFamily: FONT_FAMILY,
      }}
    >
      {/* subtle grid backdrop */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          maskImage:
            "radial-gradient(ellipse at center, black 40%, transparent 80%)",
        }}
      />

      {/* Skeleton + content cards grid (Phase 3 onward) */}
      {frame > P2_END && (
        <div
          style={{
            position: "absolute",
            top: 130,
            left: 40,
            right: 40,
            bottom: 40,
            display: "grid",
            gridTemplateColumns: `repeat(${Math.min(cardCount, 4)}, 1fr)`,
            gap: 20,
          }}
        >
          {cards.map((_, i) => {
            const cardStart = P3_END + i * 8;
            const flipProgress = spring({
              frame: frame - cardStart,
              fps,
              config: { mass: 0.9, damping: 14, stiffness: 100 },
              durationInFrames: 30,
            });
            const rotation = interpolate(flipProgress, [0, 1], [0, 180]);
            const showSkeleton = rotation < 90;

            return (
              <div
                key={i}
                style={{
                  position: "relative",
                  perspective: 1200,
                  opacity: skeletonOpacity,
                }}
              >
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    height: "100%",
                    transformStyle: "preserve-3d",
                    transform: `rotateY(${rotation}deg)`,
                  }}
                >
                  {/* Skeleton face */}
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "#141416",
                      border: "1px solid rgba(255,255,255,0.06)",
                      borderRadius: 14,
                      backfaceVisibility: "hidden",
                      overflow: "hidden",
                      visibility: showSkeleton ? "visible" : "hidden",
                    }}
                  >
                    {/* shimmer overlay */}
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        background: `linear-gradient(110deg, transparent 0%, transparent ${shimmerPos}%, ${accentColor}22 ${shimmerPos + 15}%, transparent ${shimmerPos + 30}%)`,
                      }}
                    />
                    <div style={{ padding: 18 }}>
                      <div
                        style={{
                          width: "40%",
                          height: 10,
                          background: "rgba(255,255,255,0.08)",
                          borderRadius: 4,
                        }}
                      />
                      <div
                        style={{
                          width: "70%",
                          height: 28,
                          background: "rgba(255,255,255,0.08)",
                          borderRadius: 6,
                          marginTop: 14,
                        }}
                      />
                      <div
                        style={{
                          width: "100%",
                          height: 60,
                          background: "rgba(255,255,255,0.05)",
                          borderRadius: 6,
                          marginTop: 16,
                        }}
                      />
                    </div>
                  </div>
                  {/* Content face */}
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "#141416",
                      border: `1px solid ${accentColor}33`,
                      borderRadius: 14,
                      backfaceVisibility: "hidden",
                      transform: "rotateY(180deg)",
                      overflow: "hidden",
                      boxShadow: `0 0 0 1px ${accentColor}22, 0 20px 40px rgba(0,0,0,0.4)`,
                    }}
                  >
                    <CardContent index={i} accentColor={accentColor} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Prompt input — centered then transforms to header */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: inputTop,
          width: inputW,
          height: inputH,
          marginLeft: -inputW / 2,
          background: "rgba(20,20,22,0.85)",
          border: `1px solid ${accentColor}55`,
          borderRadius: inputRadius,
          backdropFilter: "blur(12px)",
          display: "flex",
          alignItems: "center",
          padding: "0 20px",
          boxShadow:
            transformProgress < 0.5
              ? `0 0 0 6px ${accentColor}11, 0 30px 80px rgba(0,0,0,0.6)`
              : "0 8px 24px rgba(0,0,0,0.4)",
        }}
      >
        {/* sparkle icon */}
        <div
          style={{
            width: 20,
            height: 20,
            marginRight: 12,
            color: accentColor,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
            <path d="M12 2l2.5 6.5L21 11l-6.5 2.5L12 20l-2.5-6.5L3 11l6.5-2.5L12 2z" />
          </svg>
        </div>
        <div
          style={{
            color: "white",
            fontSize: inputFontSize,
            fontWeight: 500,
            letterSpacing: "-0.01em",
            whiteSpace: "nowrap",
            overflow: "hidden",
          }}
        >
          {typedText}
          {frame < P1_END && cursorVisible && (
            <span
              style={{
                display: "inline-block",
                width: 2,
                height: inputFontSize,
                background: accentColor,
                marginLeft: 2,
                verticalAlign: "middle",
              }}
            />
          )}
        </div>
        {transformProgress > 0.6 && (
          <div
            style={{
              marginLeft: "auto",
              display: "flex",
              gap: 8,
              alignItems: "center",
              opacity: (transformProgress - 0.6) / 0.4,
            }}
          >
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: 4,
                background: accentColor,
                boxShadow: `0 0 12px ${accentColor}`,
              }}
            />
            <div
              style={{
                fontSize: 12,
                color: "rgba(255,255,255,0.6)",
                fontWeight: 500,
              }}
            >
              Generating
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
