"use client";

import {
  Sequence,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export interface BentoItem {
  title: string;
  body?: string;
  span?: 1 | 2;
}

export interface StaggeredBentoGridProps {
  items?: BentoItem[];
  staggerDelay?: number;
  columns?: number;
  background?: string;
  cardColor?: string;
  textColor?: string;
  className?: string;
}

const FONT_FAMILY =
  "var(--font-geist-sans), -apple-system, BlinkMacSystemFont, sans-serif";

const DEFAULT_ITEMS: BentoItem[] = [
  { title: "Fast", body: "Built on Remotion", span: 2 },
  { title: "Animated", body: "Spring physics" },
  { title: "Composable", body: "Drop-in blocks" },
  { title: "Themed", body: "Tailwind ready" },
  { title: "Open", body: "MIT licensed", span: 2 },
];

function Card({
  item,
  cardColor,
  textColor,
}: {
  item: BentoItem;
  cardColor: string;
  textColor: string;
}) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame,
    fps,
    durationInFrames: Math.round(0.6 * fps),
    config: { damping: 12 },
  });

  return (
    <div
      style={{
        gridColumn: `span ${item.span ?? 1}`,
        background: cardColor,
        borderRadius: 16,
        padding: 24,
        opacity: progress,
        transform: `scale(${0.85 + progress * 0.15})`,
        transformOrigin: "center center",
        willChange: "transform, opacity",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        minHeight: 140,
        border: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <div
        style={{
          color: textColor,
          fontFamily: FONT_FAMILY,
          fontSize: 28,
          fontWeight: 700,
          letterSpacing: "-0.03em",
          marginBottom: 4,
        }}
      >
        {item.title}
      </div>
      {item.body ? (
        <div
          style={{
            color: textColor,
            opacity: 0.6,
            fontFamily: FONT_FAMILY,
            fontSize: 16,
            fontWeight: 400,
          }}
        >
          {item.body}
        </div>
      ) : null}
    </div>
  );
}

export function StaggeredBentoGrid({
  items = DEFAULT_ITEMS,
  staggerDelay = 8,
  columns = 3,
  background = "#0a0a0a",
  cardColor = "#1a1a1a",
  textColor = "white",
  className,
}: StaggeredBentoGridProps) {
  return (
    <div
      className={className}
      style={{
        position: "absolute",
        inset: 0,
        background,
        padding: 64,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
          gap: 20,
          width: "100%",
          maxWidth: 1100,
        }}
      >
        {items.map((item, index) => (
          <Sequence
            key={index}
            from={index * staggerDelay}
            layout="none"
          >
            <Card item={item} cardColor={cardColor} textColor={textColor} />
          </Sequence>
        ))}
      </div>
    </div>
  );
}
