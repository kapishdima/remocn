import { useCurrentFrame } from "remotion";
import type { Step } from "./types";

/** duration(seconds-or-frames) -> frames. Number = frames; {seconds} -> *fps. */
export function framesFor(d: number | { seconds: number }, fps: number): number {
  return typeof d === "number" ? d : Math.round(d.seconds * fps);
}

/** Deterministic char-reveal count (same math as the typewriter component). */
export function revealCount(
  localFrame: number,
  fps: number,
  len: number,
  cps: number,
): number {
  const over = (len / cps) * fps;
  if (over <= 0) return len;
  return Math.max(0, Math.min(len, Math.floor((localFrame / over) * len)));
}

function clamp01(t: number): number {
  return Math.max(0, Math.min(1, t));
}

export function useTimelineState<S, A extends string>(
  steps: Step<A>[],
  defaultState: S,
  reducer: (draft: S, step: Step<A>) => S,
  durationDefaults: Record<A, number>,
  speed = 1,
): {
  state: S;
  active: Array<{ step: Step<A>; progress: number }>;
  progressOf: (action: A) => number;
  frame: number;
} {
  const raw = useCurrentFrame();
  const effectiveFrame = raw * speed;

  const ordered = steps
    .map((step, index) => ({ step, index }))
    .sort((a, b) => a.step.at - b.step.at || a.index - b.index)
    .map((entry) => entry.step);

  let state: S = { ...defaultState };
  const active: Array<{ step: Step<A>; progress: number }> = [];

  for (const step of ordered) {
    if (step.at <= effectiveFrame) {
      state = reducer(state, step);
    }

    const dur = step.duration ?? durationDefaults[step.action];
    const end = step.at + dur;
    if (dur > 0 && step.at <= effectiveFrame && effectiveFrame < end) {
      active.push({ step, progress: clamp01((effectiveFrame - step.at) / dur) });
    }
  }

  const progressOf = (action: A): number => {
    let result = 0;
    let bestAt = -Infinity;
    for (const entry of active) {
      if (entry.step.action === action && entry.step.at >= bestAt) {
        bestAt = entry.step.at;
        result = entry.progress;
      }
    }
    return result;
  };

  return { state, active, progressOf, frame: effectiveFrame };
}
