"use client";

import { type ReactNode, useMemo } from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";

export interface GridPixelateWipeProps {
  from?: ReactNode;
  to?: ReactNode;
  cols?: number;
  rows?: number;
  pattern?: "wave" | "diagonal" | "spiral";
  transitionStart?: number;
  transitionDuration?: number;
  cellFadeFrames?: number;
  speed?: number;
  className?: string;
}

const FONT_FAMILY =
  "var(--font-geist-sans), -apple-system, BlinkMacSystemFont, sans-serif";

function DefaultPanel({ label, color }: { label: string; color: string }) {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: color,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        fontFamily: FONT_FAMILY,
        fontSize: 96,
        fontWeight: 700,
        letterSpacing: "-0.05em",
      }}
    >
      {label}
    </div>
  );
}

function spiralIndices(cols: number, rows: number): number[][] {
  const grid: number[][] = Array.from({ length: rows }, () =>
    Array(cols).fill(0),
  );
  let top = 0;
  let bottom = rows - 1;
  let left = 0;
  let right = cols - 1;
  let i = 0;
  while (top <= bottom && left <= right) {
    for (let x = left; x <= right; x++) grid[top][x] = i++;
    top++;
    for (let y = top; y <= bottom; y++) grid[y][right] = i++;
    right--;
    if (top <= bottom) {
      for (let x = right; x >= left; x--) grid[bottom][x] = i++;
      bottom--;
    }
    if (left <= right) {
      for (let y = bottom; y >= top; y--) grid[y][left] = i++;
      left--;
    }
  }
  return grid;
}

export function GridPixelateWipe({
  from,
  to,
  cols = 12,
  rows = 7,
  pattern = "wave",
  transitionStart,
  transitionDuration = 30,
  cellFadeFrames = 4,
  speed = 1,
  className,
}: GridPixelateWipeProps) {
  const frame = useCurrentFrame() * speed;
  const { durationInFrames } = useVideoConfig();

  const start =
    typeof transitionStart === "number"
      ? transitionStart
      : Math.floor(durationInFrames * 0.4);

  const delays = useMemo(() => {
    const raw: number[][] = Array.from({ length: rows }, () =>
      Array(cols).fill(0),
    );
    const spiral = pattern === "spiral" ? spiralIndices(cols, rows) : null;
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        if (pattern === "wave") {
          raw[y][x] = Math.hypot(x - (cols - 1) / 2, y - (rows - 1) / 2);
        } else if (pattern === "diagonal") {
          raw[y][x] = x + y;
        } else if (spiral) {
          raw[y][x] = spiral[y][x];
        }
      }
    }

    let min = Infinity;
    let max = -Infinity;
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        if (raw[y][x] < min) min = raw[y][x];
        if (raw[y][x] > max) max = raw[y][x];
      }
    }

    const span = Math.max(0, transitionDuration - cellFadeFrames);
    const range = max - min || 1;
    const normalized: number[][] = Array.from({ length: rows }, () =>
      Array(cols).fill(0),
    );
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        normalized[y][x] = ((raw[y][x] - min) / range) * span;
      }
    }
    return normalized;
  }, [cols, rows, pattern, transitionDuration, cellFadeFrames]);

  const fromContent = from ?? <DefaultPanel label="Scene A" color="#0f172a" />;
  const toContent = to ?? <DefaultPanel label="Scene B" color="#ec4899" />;

  const cells: ReactNode[] = [];
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const delay = delays[y][x];
      const opacity =
        frame < start
          ? 1
          : interpolate(
              frame,
              [start + delay, start + delay + cellFadeFrames],
              [1, 0],
              {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              },
            );
      cells.push(
        <div
          key={`${x}-${y}`}
          style={{
            background: "black",
            opacity,
          }}
        />,
      );
    }
  }

  return (
    <div
      className={className}
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        background: "black",
      }}
    >
      <div style={{ position: "absolute", inset: 0 }}>{toContent}</div>
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "grid",
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
          gridTemplateRows: `repeat(${rows}, 1fr)`,
        }}
      >
        {cells}
      </div>
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: frame < start ? 1 : 0,
        }}
      >
        {fromContent}
      </div>
    </div>
  );
}
