"use client";

import {
  AbsoluteFill,
  Easing,
  interpolate,
  random,
  Sequence,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export interface ProductLaunchTrailerProps {
  logoLabel?: string;
  productName?: string;
  versionLabel?: string;
  accentPeach?: string;
  accentLavender?: string;
  accentMint?: string;
  background?: string;
  speed?: number;
  className?: string;
}

const FONT_FAMILY =
  "var(--font-geist-sans), -apple-system, BlinkMacSystemFont, sans-serif";
const MONO_FAMILY =
  "var(--font-geist-mono), ui-monospace, SFMono-Regular, Menlo, monospace";

// Soft "Tactile" easing — used for every camera move and reveal.
const SOFT = Easing.bezier(0.16, 1, 0.3, 1);

// Sequence anchors (frames). All later math is derived from these so the
// trailer is easy to retime in one place.
const T = {
  pulseStart: 0,
  pulseEnd: 50,
  zoomStart: 38,
  zoomEnd: 78,
  shellStart: 70,
  flyStart: 110,
  flyEnd: 200,
  outroStart: 190,
  outroEnd: 240,
};

export function ProductLaunchTrailer({
  logoLabel = "R",
  productName = "Remocn",
  versionLabel = "v1.0 is live",
  accentPeach = "#FFB38E",
  accentLavender = "#D4B3FF",
  accentMint = "#A1EEBD",
  background = "#141318",
  speed = 1,
  className,
}: ProductLaunchTrailerProps) {
  return (
    <AbsoluteFill className={className} style={{ background }}>
      {/* TODO(audio): TransitionWhoosh @ frame ~38, SuccessChime @ frame ~200 */}

      <Sequence from={T.pulseStart} durationInFrames={T.zoomEnd - T.pulseStart}>
        <PulseLogo
          label={logoLabel}
          name={productName}
          accentLavender={accentLavender}
          background={background}
          speed={speed}
        />
      </Sequence>

      <Sequence from={T.shellStart} durationInFrames={T.outroEnd - T.shellStart}>
        <AppShellFlyover
          accentPeach={accentPeach}
          accentLavender={accentLavender}
          accentMint={accentMint}
          background={background}
          speed={speed}
          flyStartLocal={T.flyStart - T.shellStart}
          flyEndLocal={T.flyEnd - T.shellStart}
          outroStartLocal={T.outroStart - T.shellStart}
        />
      </Sequence>

      <Sequence
        from={T.outroStart}
        durationInFrames={T.outroEnd - T.outroStart + 1}
      >
        <Outro
          versionLabel={versionLabel}
          accentMint={accentMint}
          accentPeach={accentPeach}
          accentLavender={accentLavender}
          speed={speed}
        />
      </Sequence>
    </AbsoluteFill>
  );
}

/* -------------------------------------------------------------------------- */
/*                                  Phase 1                                   */
/* -------------------------------------------------------------------------- */

function PulseLogo({
  label,
  name,
  accentLavender,
  background,
  speed,
}: {
  label: string;
  name: string;
  accentLavender: string;
  background: string;
  speed: number;
}) {
  const frame = useCurrentFrame() * speed;
  const localDuration = T.zoomEnd - T.pulseStart;

  // Soft pulse — sin wave on a slow period, modulating both glow and scale.
  const pulse = (Math.sin(frame / 6) + 1) / 2; // 0..1

  // After pulseEnd we hand off to the zoom transition: scale up + fade out.
  const zoomLocal = Math.max(0, frame - (T.zoomStart - T.pulseStart));
  const zoomDuration = T.zoomEnd - T.zoomStart;
  const zoom = interpolate(zoomLocal, [0, zoomDuration], [1, 14], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.7, 0, 0.84, 0),
  });
  const fade = interpolate(zoomLocal, [zoomDuration * 0.5, zoomDuration], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const baseScale = 0.96 + pulse * 0.04;
  const glowAlpha = 0.35 + pulse * 0.4;

  const labelOpacity = interpolate(frame, [4, 18], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          transform: `scale(${zoom * baseScale})`,
          opacity: fade,
          willChange: "transform, opacity",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 28,
        }}
      >
        {/* Logo squircle */}
        <div
          style={{
            width: 200,
            height: 200,
            borderRadius: 56,
            background:
              "linear-gradient(160deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.02) 100%)",
            border: `1px solid ${accentLavender}55`,
            boxShadow: `0 0 ${60 + pulse * 80}px ${accentLavender}${toHex(
              glowAlpha,
            )}, inset 0 1px 0 rgba(255,255,255,0.12)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontFamily: FONT_FAMILY,
            fontSize: 112,
            fontWeight: 700,
            letterSpacing: "-0.06em",
          }}
        >
          {label}
        </div>

        {/* Product name */}
        <div
          style={{
            opacity: labelOpacity,
            color: "rgba(255,255,255,0.92)",
            fontFamily: FONT_FAMILY,
            fontSize: 28,
            fontWeight: 500,
            letterSpacing: "0.02em",
          }}
        >
          {name}
        </div>
      </div>
      {/* swallow lint: localDuration kept for reference */}
      <span style={{ display: "none" }}>{localDuration}</span>
    </AbsoluteFill>
  );
}

/* -------------------------------------------------------------------------- */
/*                                  Phase 2                                   */
/* -------------------------------------------------------------------------- */

function AppShellFlyover({
  accentPeach,
  accentLavender,
  accentMint,
  background,
  speed,
  flyStartLocal,
  flyEndLocal,
  outroStartLocal,
}: {
  accentPeach: string;
  accentLavender: string;
  accentMint: string;
  background: string;
  speed: number;
  flyStartLocal: number;
  flyEndLocal: number;
  outroStartLocal: number;
}) {
  const frame = useCurrentFrame() * speed;

  // Shell fade-in — comes in right after the zoom punches through.
  const enter = interpolate(frame, [0, 14], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: SOFT,
  });

  // 3D camera fly-over: rx, ry, tz, scale all interpolated with the soft bezier.
  const flyT = interpolate(frame, [flyStartLocal, flyEndLocal], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: SOFT,
  });
  // Outro pull-back blends the camera away.
  const outroT = interpolate(
    frame,
    [outroStartLocal, outroStartLocal + 30],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: SOFT,
    },
  );

  const rx = interpolate(flyT, [0, 1], [0, -8]) * (1 - outroT);
  const ry = interpolate(flyT, [0, 1], [-6, 6]) * (1 - outroT);
  const tz =
    interpolate(flyT, [0, 1], [-220, 80]) * (1 - outroT) +
    outroT * -360;
  const scaleBoost =
    interpolate(flyT, [0, 1], [0.92, 1.04]) * (1 - outroT) + outroT * 0.84;

  // Drop-shadow blur grows when the camera hovers above the cards (tz > 0).
  const shadowBlur = Math.max(20, 28 + tz * 0.4);
  const shadowOpacity = 0.35 + Math.max(0, tz / 180) * 0.35;

  return (
    <AbsoluteFill
      style={{
        background,
        opacity: enter,
        perspective: 2000,
        perspectiveOrigin: "50% 45%",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          transformStyle: "preserve-3d",
          transform: `rotateX(${rx}deg) rotateY(${ry}deg) translateZ(${tz}px) scale(${scaleBoost})`,
          willChange: "transform",
        }}
      >
        {/* Faint border to suggest the app frame */}
        <div
          style={{
            position: "absolute",
            inset: 40,
            borderRadius: 24,
            border: `1px solid ${accentLavender}1f`,
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0) 100%)",
          }}
        />

        {/* Glass code block on the left */}
        <div
          style={{
            position: "absolute",
            left: 80,
            top: 110,
            width: 520,
            height: 500,
            transform: "translateZ(20px)",
            filter: `drop-shadow(0 22px ${shadowBlur}px ${accentLavender}${toHex(
              shadowOpacity,
            )})`,
          }}
        >
          <FauxCodeBlock accentLavender={accentLavender} accentMint={accentMint} />
        </div>

        {/* Bento grid on the right */}
        <div
          style={{
            position: "absolute",
            right: 80,
            top: 110,
            width: 540,
            height: 500,
            transform: "translateZ(40px)",
            filter: `drop-shadow(0 22px ${shadowBlur}px ${accentPeach}${toHex(
              shadowOpacity,
            )})`,
          }}
        >
          <FauxBentoGrid
            accentPeach={accentPeach}
            accentLavender={accentLavender}
            accentMint={accentMint}
            speed={speed}
          />
        </div>
      </div>
    </AbsoluteFill>
  );
}

function FauxCodeBlock({
  accentLavender,
  accentMint,
}: {
  accentLavender: string;
  accentMint: string;
}) {
  const frame = useCurrentFrame();
  const lines = [
    { t: "import { Trailer } from 'remocn'", c: "#c4b5fd" },
    { t: "", c: "" },
    { t: "export const Scene = () => (", c: "#e4e4e7" },
    { t: "  <Trailer", c: "#e4e4e7" },
    { t: `    label="v1.0"`, c: "#86efac" },
    { t: `    accent="lavender"`, c: "#fcd34d" },
    { t: "  />", c: "#e4e4e7" },
    { t: ")", c: "#e4e4e7" },
  ];

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        borderRadius: 20,
        background: "rgba(20,19,24,0.78)",
        backdropFilter: "blur(18px)",
        WebkitBackdropFilter: "blur(18px)",
        border: `1px solid ${accentLavender}33`,
        overflow: "hidden",
        fontFamily: MONO_FAMILY,
      }}
    >
      {/* Title bar */}
      <div
        style={{
          height: 38,
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "0 16px",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        {["#FFB38E", "#FCD34D", accentMint].map((c) => (
          <div
            key={c}
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: c,
              opacity: 0.85,
            }}
          />
        ))}
        <span
          style={{
            marginLeft: 12,
            color: "rgba(255,255,255,0.45)",
            fontSize: 12,
          }}
        >
          scene.tsx
        </span>
      </div>

      {/* Code lines, staggered in */}
      <div style={{ padding: "20px 22px", display: "flex", flexDirection: "column", gap: 6 }}>
        {lines.map((line, i) => {
          const local = frame - 14 - i * 5;
          const o = interpolate(local, [0, 10], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          const x = interpolate(local, [0, 10], [12, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          return (
            <div
              key={i}
              style={{
                display: "flex",
                gap: 14,
                opacity: o,
                transform: `translateX(${x}px)`,
                fontSize: 15,
                lineHeight: "22px",
              }}
            >
              <span style={{ color: "#3f3f46", width: 18, textAlign: "right" }}>
                {i + 1}
              </span>
              <span style={{ color: line.c || "#e4e4e7", whiteSpace: "pre" }}>
                {line.t || " "}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function FauxBentoGrid({
  accentPeach,
  accentLavender,
  accentMint,
  speed,
}: {
  accentPeach: string;
  accentLavender: string;
  accentMint: string;
  speed: number;
}) {
  const frame = useCurrentFrame() * speed;
  const { fps } = useVideoConfig();

  const cards: Array<{ title: string; body: string; tint: string; span: 1 | 2 }> = [
    { title: "Animations", body: "Spring-tuned", tint: accentLavender, span: 2 },
    { title: "Transitions", body: "Cinematic", tint: accentPeach, span: 1 },
    { title: "Backgrounds", body: "Volumetric", tint: accentMint, span: 1 },
    { title: "Compositions", body: "Production-ready", tint: accentLavender, span: 2 },
  ];

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 16,
      }}
    >
      {cards.map((c, i) => {
        const progress = spring({
          frame: frame - 30 - i * 8,
          fps,
          config: { damping: 14, stiffness: 110, mass: 0.7 },
          durationInFrames: 28,
        });
        return (
          <div
            key={c.title}
            style={{
              gridColumn: c.span === 2 ? "span 2" : "span 1",
              minHeight: 110,
              padding: 22,
              borderRadius: 18,
              background:
                "linear-gradient(160deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)",
              border: `1px solid ${c.tint}33`,
              boxShadow: `inset 0 1px 0 rgba(255,255,255,0.06)`,
              opacity: progress,
              transform: `translateY(${(1 - progress) * 18}px) scale(${
                0.92 + progress * 0.08
              })`,
              transformOrigin: "center",
              willChange: "transform, opacity",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
            }}
          >
            <div
              style={{
                color: "white",
                fontFamily: FONT_FAMILY,
                fontSize: 22,
                fontWeight: 600,
                letterSpacing: "-0.02em",
              }}
            >
              {c.title}
            </div>
            <div
              style={{
                color: `${c.tint}cc`,
                fontFamily: FONT_FAMILY,
                fontSize: 13,
                marginTop: 2,
              }}
            >
              {c.body}
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                                  Phase 3                                   */
/* -------------------------------------------------------------------------- */

function Outro({
  versionLabel,
  accentMint,
  accentPeach,
  accentLavender,
  speed,
}: {
  versionLabel: string;
  accentMint: string;
  accentPeach: string;
  accentLavender: string;
  speed: number;
}) {
  const frame = useCurrentFrame() * speed;
  const { fps } = useVideoConfig();

  // Heading drops in with a soft spring.
  const drop = spring({
    frame: frame - 6,
    fps,
    config: { damping: 14, stiffness: 110, mass: 0.7 },
    durationInFrames: 28,
  });
  const headingY = interpolate(drop, [0, 1], [-40, 0]);
  const headingOpacity = interpolate(drop, [0, 1], [0, 1]);

  // Confetti — lightweight inline burst (no SuccessConfetti import to avoid
  // its full-frame background).
  const particles = Array.from({ length: 70 }, (_, i) => {
    const angle = random(`pl:${i}:a`) * Math.PI * 2;
    const v = 9 + random(`pl:${i}:v`) * 9;
    const sz = 5 + random(`pl:${i}:s`) * 7;
    const f = Math.max(0, frame - 14 - Math.floor(random(`pl:${i}:d`) * 6));
    const cx = 640 + Math.cos(angle) * v * f;
    const cy = 280 + Math.sin(angle) * v * f + 0.4 * f * f;
    const colors = [accentMint, accentPeach, accentLavender, "#FCD34D"];
    const color = colors[Math.floor(random(`pl:${i}:c`) * colors.length)];
    const opacity = interpolate(f, [0, 4, 38, 50], [0, 1, 1, 0], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
    return { cx, cy, sz, color, opacity, key: i };
  });

  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      {/* Confetti layer */}
      <svg
        width={1280}
        height={720}
        viewBox="0 0 1280 720"
        style={{ position: "absolute", inset: 0 }}
      >
        {particles.map((p) => (
          <rect
            key={p.key}
            x={p.cx - p.sz / 2}
            y={p.cy - p.sz / 2}
            width={p.sz}
            height={p.sz * 0.55}
            rx={1}
            fill={p.color}
            opacity={p.opacity}
          />
        ))}
      </svg>

      {/* Heading */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 240,
          textAlign: "center",
          transform: `translateY(${headingY}px)`,
          opacity: headingOpacity,
          willChange: "transform, opacity",
        }}
      >
        <div
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: 96,
            fontWeight: 700,
            letterSpacing: "-0.04em",
            color: "white",
            textShadow: `0 0 60px ${accentMint}55`,
          }}
        >
          {versionLabel}
        </div>
      </div>
    </AbsoluteFill>
  );
}

/* -------------------------------------------------------------------------- */
/*                                  Helpers                                   */
/* -------------------------------------------------------------------------- */

function toHex(alpha: number) {
  const clamped = Math.max(0, Math.min(1, alpha));
  return Math.round(clamped * 255)
    .toString(16)
    .padStart(2, "0");
}
