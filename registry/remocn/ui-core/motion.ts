/**
 * Deterministic, frame-based motion presets for remocn UI primitives.
 *
 * `easings` are pure functions on normalized progress `t ∈ [0,1]`. `springs` are
 * parameter bags passed straight to Remotion's `spring({ config })`.
 */

export const easings = {
  /** Linear. */
  linear: (t: number): number => t,
  /** Ease-out cubic — decelerates into rest. */
  out: (t: number): number => 1 - (1 - t) ** 3,
  /** Ease-in cubic — accelerates from rest. */
  in: (t: number): number => t * t * t,
  /** Ease-in-out cubic. */
  inOut: (t: number): number =>
    t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2,
} as const;

export type EasingName = keyof typeof easings;

/** Remotion `spring()` config presets. */
export const springs = {
  /** Fast, tight settle — good for presses and toggles. */
  snappy: { damping: 18, stiffness: 220, mass: 0.7 },
  /** Gentle, smooth settle — good for entrances. */
  soft: { damping: 14, stiffness: 120, mass: 0.9 },
  /** Slight overshoot for playful pops. */
  bouncy: { damping: 10, stiffness: 180, mass: 0.8 },
} as const;

export type SpringName = keyof typeof springs;
