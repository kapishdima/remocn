/**
 * A single scripted interaction on the Remotion timeline.
 *
 * Every remocn UI primitive consumes the same `steps: Step[]` envelope. State is
 * a deterministic left-fold over the steps whose `at` is <= the current frame.
 */
export interface Step<A extends string = string, V = unknown> {
  /** LOCAL (Sequence-relative) authored frame at which this step begins. */
  at: number;
  /** Per-component action union (e.g. "hover" | "press" | "loading"). */
  action: A;
  /** Polymorphic payload; meaning depends on action. */
  value?: V;
  /** Frames to animate the transition. 0 = snap. Omitted = component default. */
  duration?: number;
}

/** Result of folding steps: the resolved logical state at the current frame. */
export type TimelineState<S> = S;
