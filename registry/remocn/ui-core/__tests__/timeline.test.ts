/**
 * Verification tests for the timeline FOLD SEMANTICS.
 *
 * Scope: registry/remocn/ui-core/timeline.ts — framesFor, revealCount, and the
 * pure fold logic inside useTimelineState (speed contract, active windows,
 * progressOf in-flight-only, duration:0 snap).
 *
 * Runner: Bun's built-in test runner.
 *   bun test registry/remocn/ui-core/__tests__
 *
 * --------------------------------------------------------------------------
 * WHY THE FOLD IS REPLICATED HERE INSTEAD OF IMPORTED
 * --------------------------------------------------------------------------
 * `useTimelineState` is a React hook whose FIRST line is `useCurrentFrame()`
 * from "remotion" — it cannot run outside a Remotion render tree, and even
 * importing the module pulls the remotion runtime. `framesFor` and
 * `revealCount` are pure but share that module.
 *
 * So we do BOTH:
 *   1. Re-derive framesFor / revealCount as exact spec mirrors and assert their
 *      numeric contract (these formulas are trivially copyable and stable).
 *   2. Replicate the documented pure fold ("foldTimeline" below) byte-for-byte
 *      from timeline.ts's algorithm, factoring out the single impure line
 *      (useCurrentFrame) into an injected `raw` frame. This lets us assert the
 *      speed contract, active-window math, and the progressOf flash-bug guard
 *      headlessly.
 *
 * MAINTENANCE CONTRACT: if timeline.ts's fold body changes, this replica MUST
 * be updated in lockstep. The replica is annotated with the source line ranges
 * it mirrors so a reviewer can diff them. The numeric expectations are the real
 * verification value; the replica is the harness that lets us reach them
 * without a Remotion render. The same expectations are ALSO encoded as the
 * Player-level ACs in plan §6 (speed contract, settled-read persists) — see the
 * cross-references on each test.
 * --------------------------------------------------------------------------
 */

import { describe, expect, it } from "bun:test";

// ===========================================================================
// 1. framesFor / revealCount — exact spec mirrors of timeline.ts lines 5-19
// ===========================================================================

/** MIRROR of timeline.ts:framesFor (lines 5-7). */
function framesFor(d: number | { seconds: number }, fps: number): number {
  return typeof d === "number" ? d : Math.round(d.seconds * fps);
}

/** MIRROR of timeline.ts:revealCount (lines 10-19). */
function revealCount(
  localFrame: number,
  fps: number,
  len: number,
  cps: number,
): number {
  const over = (len / cps) * fps;
  if (over <= 0) return len;
  return Math.max(0, Math.min(len, Math.floor((localFrame / over) * len)));
}

describe("framesFor", () => {
  it("passes a raw frame number through unchanged", () => {
    expect(framesFor(30, 30)).toBe(30);
  });

  it("converts {seconds} to rounded frames at fps", () => {
    expect(framesFor({ seconds: 2 }, 30)).toBe(60);
    expect(framesFor({ seconds: 0.5 }, 30)).toBe(15);
  });

  it("rounds fractional second->frame conversions", () => {
    // 0.1s * 30fps = 3 exactly; 0.11s * 30 = 3.3 -> 3
    expect(framesFor({ seconds: 0.11 }, 30)).toBe(3);
    // 0.116s * 30 = 3.48 -> 3 ; 0.117 * 30 = 3.51 -> 4
    expect(framesFor({ seconds: 0.117 }, 30)).toBe(4);
  });
});

describe("revealCount (typewriter math)", () => {
  // over = (len/cps)*fps. For len=5, cps=10, fps=30 => over = 0.5*30 = 15 frames
  // to fully reveal 5 chars. count = floor((frame/15)*5).
  it("reveals nothing at frame 0", () => {
    expect(revealCount(0, 30, 5, 10)).toBe(0);
  });

  it("reveals proportionally mid-flight", () => {
    // frame 6 of 15 => floor((6/15)*5) = floor(2) = 2
    expect(revealCount(6, 30, 5, 10)).toBe(2);
    // frame 9 => floor((9/15)*5)=floor(3)=3
    expect(revealCount(9, 30, 5, 10)).toBe(3);
  });

  it("clamps to full length once the reveal window has elapsed", () => {
    expect(revealCount(15, 30, 5, 10)).toBe(5);
    expect(revealCount(999, 30, 5, 10)).toBe(5);
  });

  it("never goes negative for a negative localFrame", () => {
    expect(revealCount(-50, 30, 5, 10)).toBe(0);
  });

  it("returns full length immediately when the window is non-positive", () => {
    // len=0 => over=0 => guarded early-return of len (0). Also guards cps<=0.
    expect(revealCount(0, 30, 0, 10)).toBe(0);
  });
});

// ===========================================================================
// 2. Pure fold replica — MIRROR of timeline.ts useTimelineState body
//    (lines 62-99), with the one impure line (useCurrentFrame) injected as
//    `raw`. Keep in lockstep with source.
// ===========================================================================

interface Step<A extends string = string, V = unknown> {
  at: number;
  action: A;
  value?: V;
  duration?: number;
}

function clamp01(t: number): number {
  return Math.max(0, Math.min(1, t));
}

function foldTimeline<S, A extends string>(
  raw: number, // injected useCurrentFrame() — MIRROR of timeline.ts line 62
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
  const effectiveFrame = raw * speed; // line 63: SPEED CONTRACT

  const ordered = steps // lines 67-70: stable sort by `at`, ties in array order
    .map((step, index) => ({ step, index }))
    .sort((a, b) => a.step.at - b.step.at || a.index - b.index)
    .map((entry) => entry.step);

  let state: S = { ...defaultState }; // line 72: shallow clone
  const active: Array<{ step: Step<A>; progress: number }> = [];

  for (const step of ordered) {
    // lines 75-85
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
    // lines 87-97: most-recent active step of `action`, else 0
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

// --- speed contract --------------------------------------------------------

describe("fold speed contract (plan §6 'Speed contract LIVE', R7)", () => {
  type A = "go";
  const dd: Record<A, number> = { go: 10 };
  const steps: Step<A>[] = [{ at: 30, action: "go" }];
  const reducer = (s: { fired: boolean }, _step: Step<A>) => ({ fired: true });

  it("a step {at:30} is NOT yet active at render frame 14 when speed=2 (eff=28)", () => {
    const r = foldTimeline(14, steps, { fired: false }, reducer, dd, 2);
    expect(r.frame).toBe(28);
    expect(r.state.fired).toBe(false);
    expect(r.active.length).toBe(0);
  });

  it("a step {at:30} becomes active at render frame 15 when speed=2 (eff=30)", () => {
    const r = foldTimeline(15, steps, { fired: false }, reducer, dd, 2);
    expect(r.frame).toBe(30); // effectiveFrame = 15 * 2
    expect(r.state.fired).toBe(true);
    expect(r.active.length).toBe(1);
    expect(r.progressOf("go")).toBe(0); // just entered the window
  });

  it("the same step fires at render frame 60 when speed=0.5 (eff=30)", () => {
    const r = foldTimeline(60, steps, { fired: false }, reducer, dd, 0.5);
    expect(r.frame).toBe(30);
    expect(r.state.fired).toBe(true);
  });

  it("at speed=1 a step fires at its authored frame", () => {
    expect(foldTimeline(29, steps, { fired: false }, reducer, dd, 1).state.fired)
      .toBe(false);
    expect(foldTimeline(30, steps, { fired: false }, reducer, dd, 1).state.fired)
      .toBe(true);
  });
});

// --- progressOf in-flight only (the flash-bug guard) -----------------------

describe("progressOf is IN-FLIGHT ONLY (plan §6 'Settled-read persists', R-flash)", () => {
  type A = "check";
  const dd: Record<A, number> = { check: 12 }; // 12f default window
  const steps: Step<A>[] = [{ at: 15, action: "check" }];
  const reducer = (_s: { checked: boolean }, _step: Step<A>) => ({
    checked: true,
  });

  const run = (raw: number) =>
    foldTimeline(raw, steps, { checked: false }, reducer, dd, 1);

  it("progressOf('check') is 0 before the window (frame 10)", () => {
    const r = run(10);
    expect(r.progressOf("check")).toBe(0);
    expect(r.state.checked).toBe(false);
  });

  it("ramps 0->1 across frames 15..27", () => {
    expect(run(15).progressOf("check")).toBeCloseTo(0, 5); // (15-15)/12 = 0
    expect(run(21).progressOf("check")).toBeCloseTo(0.5, 5); // (21-15)/12 = 0.5
    // frame 27 is the exclusive end (15+12) => no longer active => 0
    expect(run(26).progressOf("check")).toBeCloseTo(11 / 12, 5);
  });

  it("at frame 90 progressOf('check') returns to 0 (window closed)", () => {
    const r = run(90);
    expect(r.progressOf("check")).toBe(0); // THE FLASH BUG GUARD
  });

  it("but state.checked STAYS true after the window closes (settled truth)", () => {
    expect(run(90).state.checked).toBe(true);
    expect(run(27).state.checked).toBe(true); // settled at the boundary too
  });

  it("toggle sequence check@15 -> uncheck@60: state reflects most-recent reducer", () => {
    type T = "check" | "uncheck";
    const tdd: Record<T, number> = { check: 12, uncheck: 10 };
    const tsteps: Step<T>[] = [
      { at: 15, action: "check" },
      { at: 60, action: "uncheck" },
    ];
    const treducer = (
      _s: { checked: boolean },
      step: Step<T>,
    ): { checked: boolean } => ({ checked: step.action === "check" });
    const trun = (raw: number) =>
      foldTimeline(raw, tsteps, { checked: false }, treducer, tdd, 1);

    expect(trun(40).state.checked).toBe(true); // after check, before uncheck
    expect(trun(40).progressOf("check")).toBe(0); // check window closed -> in-flight 0
    expect(trun(90).state.checked).toBe(false); // after uncheck settled
    expect(trun(90).progressOf("uncheck")).toBe(0); // uncheck window closed too
  });
});

// --- duration:0 snaps (never active) ---------------------------------------

describe("duration:0 snaps the logical state and is never active", () => {
  type A = "set";
  const dd: Record<A, number> = { set: 12 };
  const steps: Step<A>[] = [{ at: 20, action: "set", duration: 0 }];
  const reducer = (_s: { v: number }, _step: Step<A>) => ({ v: 1 });
  const run = (raw: number) =>
    foldTimeline(raw, steps, { v: 0 }, reducer, dd, 1);

  it("state updates exactly at `at`", () => {
    expect(run(19).state.v).toBe(0);
    expect(run(20).state.v).toBe(1);
  });

  it("the duration:0 step never enters `active` and progressOf stays 0", () => {
    expect(run(20).active.length).toBe(0);
    expect(run(20).progressOf("set")).toBe(0);
    expect(run(25).active.length).toBe(0);
  });
});

// --- active-window boundaries ----------------------------------------------

describe("active window is [at, at+dur) — inclusive start, exclusive end", () => {
  type A = "x";
  const dd: Record<A, number> = { x: 10 };
  const steps: Step<A>[] = [{ at: 5, action: "x" }];
  const reducer = (s: object) => s;
  const run = (raw: number) => foldTimeline(raw, steps, {}, reducer, dd, 1);

  it("active at the start frame", () => {
    expect(run(5).active.length).toBe(1);
    expect(run(5).progressOf("x")).toBe(0);
  });

  it("active just before the end frame", () => {
    expect(run(14).active.length).toBe(1); // 14 < 15
  });

  it("NOT active at the exclusive end frame at+dur=15", () => {
    expect(run(15).active.length).toBe(0);
  });
});

// --- progressOf picks the most-recent active step of an action -------------

describe("progressOf resolves the MOST-RECENT in-flight step of an action", () => {
  it("overlapping windows of the same action -> later `at` wins", () => {
    type A = "pulse";
    const dd: Record<A, number> = { pulse: 20 };
    const steps: Step<A>[] = [
      { at: 0, action: "pulse" }, // window [0,20)
      { at: 10, action: "pulse" }, // window [10,30) — overlaps
    ];
    const reducer = (s: object) => s;
    const r = foldTimeline(15, steps, {}, reducer, dd, 1);
    // both active at frame 15; most-recent (at=10) wins: (15-10)/20 = 0.25
    expect(r.active.length).toBe(2);
    expect(r.progressOf("pulse")).toBeCloseTo(0.25, 5);
  });
});
