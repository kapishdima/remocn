"use client";

import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export interface PricingTierFocusProps {
  focusedTier?: 0 | 1 | 2 | "0" | "1" | "2";
  accentColor?: string;
  speed?: number;
  className?: string;
}

const FONT_FAMILY =
  "var(--font-geist-sans), -apple-system, BlinkMacSystemFont, sans-serif";

interface Tier {
  name: string;
  price: string;
  period: string;
  features: string[];
  cta: string;
}

const TIERS: Tier[] = [
  {
    name: "Free",
    price: "$0",
    period: "/mo",
    features: ["1 project", "Community support", "1 GB storage"],
    cta: "Get started",
  },
  {
    name: "Pro",
    price: "$24",
    period: "/mo",
    features: [
      "Unlimited projects",
      "Priority support",
      "100 GB storage",
      "Advanced analytics",
    ],
    cta: "Buy Pro",
  },
  {
    name: "Enterprise",
    price: "$99",
    period: "/mo",
    features: ["SSO & SAML", "Dedicated manager", "Unlimited storage"],
    cta: "Contact sales",
  },
];

export function PricingTierFocus({
  focusedTier = 1,
  accentColor = "#22c55e",
  speed = 1,
  className,
}: PricingTierFocusProps) {
  const frame = useCurrentFrame() * speed;
  const { fps } = useVideoConfig();

  const focusedIdx = Number(focusedTier);
  const focusStart = 30;

  const focusProgress = spring({
    frame: frame - focusStart,
    fps,
    config: { mass: 1, damping: 18, stiffness: 90 },
    durationInFrames: 50,
  });

  const focusScale = interpolate(focusProgress, [0, 1], [1, 1.05]);
  const focusLift = interpolate(focusProgress, [0, 1], [0, -20]);
  const sideBrightness = interpolate(focusProgress, [0, 1], [1, 0.4]);
  const sideBlur = interpolate(focusProgress, [0, 1], [0, 4]);
  const sideScale = interpolate(focusProgress, [0, 1], [1, 0.95]);

  // Shimmer on Pro CTA — runs around frame 90
  const shimmerStart = 90;
  const shimmerPos = interpolate(
    frame,
    [shimmerStart, shimmerStart + 40],
    [-150, 250],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  return (
    <div
      className={className}
      style={{
        position: "absolute",
        inset: 0,
        background: "#0a0a0a",
        fontFamily: FONT_FAMILY,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 60,
        gap: 28,
      }}
    >
      {TIERS.map((tier, i) => {
        const isFocused = i === focusedIdx;
        const scale = isFocused ? focusScale : sideScale;
        const lift = isFocused ? focusLift : 0;
        const brightness = isFocused ? 1 : sideBrightness;
        const blurPx = isFocused ? 0 : sideBlur;
        const z = isFocused ? 10 : 1;
        const shadow = isFocused
          ? `0 30px 80px rgba(0,0,0,0.7), 0 0 0 1px ${accentColor}55`
          : "0 8px 24px rgba(0,0,0,0.4)";

        return (
          <div
            key={tier.name}
            style={{
              position: "relative",
              flex: "1 1 0",
              maxWidth: 320,
              minHeight: 460,
              padding: 32,
              borderRadius: 20,
              background: "linear-gradient(180deg, #161616 0%, #0e0e0e 100%)",
              border: "1px solid rgba(255,255,255,0.08)",
              boxShadow: shadow,
              transform: `translateY(${lift}px) scale(${scale})`,
              filter: `brightness(${brightness}) blur(${blurPx}px)`,
              zIndex: z,
              display: "flex",
              flexDirection: "column",
              willChange: "transform, filter",
            }}
          >
            {isFocused && (
              <div
                style={{
                  position: "absolute",
                  top: 16,
                  right: 16,
                  padding: "4px 10px",
                  borderRadius: 999,
                  background: accentColor,
                  color: "#0a0a0a",
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                }}
              >
                Popular
              </div>
            )}
            <div
              style={{
                fontSize: 14,
                fontWeight: 600,
                color: "rgba(255,255,255,0.6)",
                letterSpacing: "0.04em",
                textTransform: "uppercase",
              }}
            >
              {tier.name}
            </div>
            <div
              style={{
                marginTop: 12,
                display: "flex",
                alignItems: "baseline",
                gap: 4,
              }}
            >
              <div
                style={{
                  fontSize: 56,
                  fontWeight: 700,
                  color: "white",
                  letterSpacing: "-0.04em",
                  lineHeight: 1,
                }}
              >
                {tier.price}
              </div>
              <div
                style={{
                  fontSize: 16,
                  color: "rgba(255,255,255,0.5)",
                  fontWeight: 500,
                }}
              >
                {tier.period}
              </div>
            </div>
            <div
              style={{
                marginTop: 24,
                display: "flex",
                flexDirection: "column",
                gap: 12,
                flex: 1,
              }}
            >
              {tier.features.map((f) => (
                <div
                  key={f}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    fontSize: 14,
                    color: "rgba(255,255,255,0.85)",
                  }}
                >
                  <div
                    style={{
                      width: 16,
                      height: 16,
                      borderRadius: 999,
                      background: `${accentColor}22`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: accentColor,
                      fontSize: 11,
                      fontWeight: 700,
                      flexShrink: 0,
                    }}
                  >
                    ✓
                  </div>
                  {f}
                </div>
              ))}
            </div>
            <div
              style={{
                marginTop: 24,
                position: "relative",
                height: 44,
                borderRadius: 12,
                background: isFocused ? accentColor : "rgba(255,255,255,0.08)",
                color: isFocused ? "#0a0a0a" : "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 14,
                fontWeight: 600,
                overflow: "hidden",
                border: isFocused ? "none" : "1px solid rgba(255,255,255,0.1)",
              }}
            >
              {tier.cta}
              {isFocused && (
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    bottom: 0,
                    width: 80,
                    transform: `translateX(${shimmerPos}px) skewX(-20deg)`,
                    background:
                      "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.55) 50%, transparent 100%)",
                    pointerEvents: "none",
                  }}
                />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
