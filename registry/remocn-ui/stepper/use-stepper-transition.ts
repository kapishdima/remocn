"use client";

import { useCurrentFrame } from "remotion";
import { clamp01, type EasingName, easings } from "@/lib/remocn-ui";
import type { StepperStyle } from "@/components/remocn/stepper";
// ^ install path; resolves in-repo via the @/components/remocn/* tsconfig alias.

/**
 * A scripted active-step the stepper eases TO. The `position` tweens from the
 * previous step's index to this one over `[at, at + (duration ?? DEFAULT_DURATION))`.
 */
export interface StepperStep {
  /** LOCAL (Sequence-relative) authored frame the stepper finishes reaching `index`. */
  at: number;
  /** Target active-step index (0..n-1). */
  index: number;
  /** Frames the move INTO this index takes. Omitted → DEFAULT_DURATION. */
  duration?: number;
  /** Override the easing for the move into this index. Default `out`. */
  easing?: EasingName;
}

/** Default frames for a move into a step when it omits `duration`. */
export const DEFAULT_DURATION = 24;

export interface StepperTransitionOptions {
  /** Playhead scale (effectiveFrame = useCurrentFrame() * speed). */
  speed?: number;
  /** Move duration (frames) when a step omits `duration`. */
  defaultDuration?: number;
}

/** Blend two stepper visuals: the single `position` field lerps. */
export function tweenStepperStyle(
  a: StepperStyle,
  b: StepperStyle,
  t: number,
): StepperStyle {
  return { position: a.position + (b.position - a.position) * t };
}

/**
 * Resolve the stepper's `StepperStyle` for an index timeline. THIS is the only
 * frame-reading file — `<Stepper>` itself stays pure. Mirrors the value-channel
 * deviation (like progress's `useProgressTransition`): it folds a numeric index
 * path into a continuous `position`.
 *
 * The fold is a pure function of `raw = useCurrentFrame() * speed`; tests
 * replicate `stepperStyleAt(steps, raw, opts)` with the frame injected.
 */
export function useStepperTransition(
  steps: StepperStep[],
  opts: StepperTransitionOptions = {},
): StepperStyle {
  const { speed = 1 } = opts;
  const raw = useCurrentFrame() * speed;
  return stepperStyleAt(steps, raw, opts);
}

/**
 * Pure core of `useStepperTransition` with the effective frame injected as `raw`.
 * Kept separate so it can be unit-tested without a Remotion render.
 * `useStepperTransition` is exactly `stepperStyleAt(steps, useCurrentFrame() *
 * speed, opts)`.
 */
export function stepperStyleAt(
  steps: StepperStep[],
  raw: number,
  opts: StepperTransitionOptions = {},
): StepperStyle {
  const { defaultDuration = DEFAULT_DURATION } = opts;

  if (steps.length === 0) return { position: 0 };

  // Authored order is the timeline order; `at` is the arrival frame of each step.
  const first = steps[0];

  // Before the first arrival, hold at the first step's index (no teleport).
  if (raw <= first.at) return { position: first.index };

  // Find the segment we're in: the move from step i-1 into step i, where i is
  // the first step with at > raw. If none, we're resting at the last step.
  let toIndex = steps.length - 1;
  for (let i = 1; i < steps.length; i++) {
    if (steps[i].at > raw) {
      toIndex = i;
      break;
    }
  }
  const pastLast = raw >= steps[steps.length - 1].at;
  const to = pastLast ? steps[steps.length - 1] : steps[toIndex];
  const from = pastLast ? steps[steps.length - 1] : steps[toIndex - 1];

  const dur = to.duration ?? defaultDuration;
  const ease = easings[to.easing ?? "out"];
  // The move runs over [start, to.at); start = to.at - dur.
  const start = to.at - dur;
  const t = pastLast || dur <= 0 ? 1 : ease(clamp01((raw - start) / dur));
  const position = from.index + (to.index - from.index) * t;

  return { position };
}
