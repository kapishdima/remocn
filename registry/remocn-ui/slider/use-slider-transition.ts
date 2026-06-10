"use client";

import { useCurrentFrame } from "remotion";
import { clamp01, type EasingName, easings } from "@/lib/remocn-ui";
import {
  sliderThumbStyle,
  type SliderStyle,
  type SliderThumbState,
} from "@/components/remocn/slider";
// ^ install path; resolves in-repo via the @/components/remocn/* tsconfig alias.

/**
 * One scripted slider keyframe. A step may move the `value` channel, the
 * `thumbState` channel, or both. The value eases from the previous value-bearing
 * step to this one; the thumb visual tweens from the previous thumb-bearing
 * step's preset to this one.
 */
export interface SliderStep {
  /** LOCAL (Sequence-relative) authored frame this keyframe is reached. */
  at: number;
  /** Target fill percentage 0–100 (this step moves the value channel). */
  value?: number;
  /** Target thumb state (this step moves the thumb channel). */
  thumbState?: SliderThumbState;
  /** Frames the move INTO this step takes. Omitted → DEFAULT_DURATION. */
  duration?: number;
  /** Override the easing for the move into this step. Default `out`. */
  easing?: EasingName;
}

/** Default frames for a move into a step when it omits `duration`. */
export const DEFAULT_DURATION = 18;

export interface SliderTransitionOptions {
  /** Playhead scale (effectiveFrame = useCurrentFrame() * speed). */
  speed?: number;
  /** Move duration (frames) when a step omits `duration`. */
  defaultDuration?: number;
}

/** Blend two slider visuals: all three fields lerp (value + thumb channels). */
export function tweenSliderStyle(
  a: SliderStyle,
  b: SliderStyle,
  t: number,
): SliderStyle {
  return {
    value: a.value + (b.value - a.value) * t,
    thumbScale: a.thumbScale + (b.thumbScale - a.thumbScale) * t,
    ringOpacity: a.ringOpacity + (b.ringOpacity - a.ringOpacity) * t,
  };
}

/**
 * Resolve the slider's `SliderStyle` for a dual-channel timeline. THIS is the
 * only frame-reading file — `<Slider>` itself stays pure. The fold is a pure
 * function of `raw = useCurrentFrame() * speed`; tests replicate
 * `sliderStyleAt(steps, raw, opts)` with the frame injected.
 */
export function useSliderTransition(
  steps: SliderStep[],
  opts: SliderTransitionOptions = {},
): SliderStyle {
  const { speed = 1 } = opts;
  const raw = useCurrentFrame() * speed;
  return sliderStyleAt(steps, raw, opts);
}

/** Eased value at `raw` over the value-bearing steps (numeric channel). */
function valueAt(
  steps: SliderStep[],
  raw: number,
  defaultDuration: number,
): number {
  const valueSteps = steps.filter(
    (s): s is SliderStep & { value: number } => s.value !== undefined,
  );
  if (valueSteps.length === 0) return 0;
  const first = valueSteps[0];
  if (raw <= first.at) return first.value;

  let toIndex = valueSteps.length - 1;
  for (let i = 1; i < valueSteps.length; i++) {
    if (valueSteps[i].at > raw) {
      toIndex = i;
      break;
    }
  }
  const pastLast = raw >= valueSteps[valueSteps.length - 1].at;
  const to = pastLast ? valueSteps[valueSteps.length - 1] : valueSteps[toIndex];
  const from = pastLast
    ? valueSteps[valueSteps.length - 1]
    : valueSteps[toIndex - 1];

  const dur = to.duration ?? defaultDuration;
  const ease = easings[to.easing ?? "out"];
  const start = to.at - dur;
  const t = pastLast || dur <= 0 ? 1 : ease(clamp01((raw - start) / dur));
  return from.value + (to.value - from.value) * t;
}

/** Eased thumb visual at `raw` over the thumb-bearing steps (state channel). */
function thumbAt(
  steps: SliderStep[],
  raw: number,
  defaultDuration: number,
): { thumbScale: number; ringOpacity: number } {
  const thumbSteps = steps.filter(
    (s): s is SliderStep & { thumbState: SliderThumbState } =>
      s.thumbState !== undefined,
  );
  if (thumbSteps.length === 0) return sliderThumbStyle("idle");
  const first = thumbSteps[0];
  if (raw <= first.at) return sliderThumbStyle(first.thumbState);

  let toIndex = thumbSteps.length - 1;
  for (let i = 1; i < thumbSteps.length; i++) {
    if (thumbSteps[i].at > raw) {
      toIndex = i;
      break;
    }
  }
  const pastLast = raw >= thumbSteps[thumbSteps.length - 1].at;
  const to = pastLast ? thumbSteps[thumbSteps.length - 1] : thumbSteps[toIndex];
  const from = pastLast
    ? thumbSteps[thumbSteps.length - 1]
    : thumbSteps[toIndex - 1];

  const dur = to.duration ?? defaultDuration;
  const ease = easings[to.easing ?? "out"];
  const start = to.at - dur;
  const t = pastLast || dur <= 0 ? 1 : ease(clamp01((raw - start) / dur));

  const a = sliderThumbStyle(from.thumbState);
  const b = sliderThumbStyle(to.thumbState);
  return {
    thumbScale: a.thumbScale + (b.thumbScale - a.thumbScale) * t,
    ringOpacity: a.ringOpacity + (b.ringOpacity - a.ringOpacity) * t,
  };
}

/**
 * Pure core of `useSliderTransition` with the effective frame injected as `raw`.
 * The two channels are folded independently and merged: `value` eases over the
 * value-bearing steps, the thumb visual tweens over the thumb-bearing steps.
 * Kept separate so it can be unit-tested without a Remotion render.
 */
export function sliderStyleAt(
  steps: SliderStep[],
  raw: number,
  opts: SliderTransitionOptions = {},
): SliderStyle {
  const { defaultDuration = DEFAULT_DURATION } = opts;
  const value = valueAt(steps, raw, defaultDuration);
  const thumb = thumbAt(steps, raw, defaultDuration);
  return {
    value,
    thumbScale: thumb.thumbScale,
    ringOpacity: thumb.ringOpacity,
  };
}
