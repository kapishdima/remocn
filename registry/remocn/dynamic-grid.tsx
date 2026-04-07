"use client";

import { useCurrentFrame } from "remotion";

export interface DynamicGridProps {
  cellSize?: number;
  lineColor?: string;
  background?: string;
  speed?: number;
  direction?: "diagonal" | "horizontal" | "vertical";
  className?: string;
}

export function DynamicGrid({
  cellSize = 40,
  lineColor = "#27272a",
  background = "#0a0a0a",
  speed = 0.5,
  direction = "diagonal",
  className,
}: DynamicGridProps) {
  const frame = useCurrentFrame();

  const offset = (frame * speed) % cellSize;

  let tx = 0;
  let ty = 0;
  if (direction === "horizontal") {
    tx = offset;
  } else if (direction === "vertical") {
    ty = offset;
  } else {
    tx = offset;
    ty = offset;
  }

  return (
    <div
      className={className}
      style={{
        position: "absolute",
        inset: 0,
        background,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: `-${cellSize}px`,
          backgroundImage: `
            linear-gradient(to right, ${lineColor} 1px, transparent 1px),
            linear-gradient(to bottom, ${lineColor} 1px, transparent 1px)
          `,
          backgroundSize: `${cellSize}px ${cellSize}px`,
          transform: `translate(${tx}px, ${ty}px)`,
          willChange: "transform",
        }}
      />
    </div>
  );
}
