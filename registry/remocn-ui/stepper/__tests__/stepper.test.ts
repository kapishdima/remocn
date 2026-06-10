/**
 * Verification tests for the PURE / DETERMINISTIC parts of `stepper`.
 *
 * Scope:
 *   - registry/remocn-ui/stepper/index.tsx
 *       StepperStyle interface — position field semantics
 *       stepperStyle(activeIndex)   — pure identity preset
 *       stepperStyleContext(theme)  — token mapping
 *       stepCircleAt(i, position)   — per-step fill/checkDraw/active thresholds
 *       connectorFillAt(i, position) — connector fill fraction
 *   - registry/remocn-ui/stepper/use-stepper-transition.ts
 *       tweenStepperStyle(a, b, t)  — pure single-field lerp
 *       stepperStyleAt(steps, raw, opts) — pure exported core of useStepperTransition
 *       DEFAULT_DURATION constant
 *       StepperStep interface semantics
 *   - registry/remocn-ui/stepper/config.ts
 *       stepperConfig.controls wiring + stepperConfig.snippet codegen
 *
 * The render path (Stepper JSX) calls `useRemocnTheme` (React context) — NOT
 * exercised here. `useStepperTransition` is exactly
 * `stepperStyleAt(steps, useCurrentFrame() * speed, opts)` — we call
 * `stepperStyleAt` directly (the exported pure core).
 *
 * Runner: Bun's built-in test runner (TypeScript-native, no framework dep).
 *   bun test registry/remocn-ui/stepper/__tests__
 *
 * --------------------------------------------------------------------------
 * IMPORT STRATEGY
 * --------------------------------------------------------------------------
 * Relative imports for component source; `@/lib/remocn-ui` for core alias.
 * `stepperStyleAt` and `tweenStepperStyle` are pure value functions — they
 * call neither `useCurrentFrame()` nor `useRemocnTheme` at import or call time.
 * `useStepperTransition` IS a hook and is NOT imported; we call `stepperStyleAt`
 * directly (the exported pure core, documented as such in the source).
 * --------------------------------------------------------------------------
 */

import { describe, expect, it } from "bun:test";
import {
  stepperStyle,
  stepperStyleContext,
  stepCircleAt,
  connectorFillAt,
} from "../index";
import {
  tweenStepperStyle,
  stepperStyleAt,
  DEFAULT_DURATION,
  type StepperStep,
} from "../use-stepper-transition";
import { stepperConfig } from "../config";
import { defaultLightTheme, easings } from "@/lib/remocn-ui";

// ===========================================================================
// Shared fixtures
// ===========================================================================

/** Convenience wrapper for snippet(). */
type SnippetValues = {
  activeIndex?: number;
  mode?: string;
};
const snippet = (values: SnippetValues): string =>
  stepperConfig.snippet(values as Record<string, unknown>);

// ===========================================================================
// 1. DEFAULT_DURATION constant
// ===========================================================================

describe("DEFAULT_DURATION", () => {
  it("is a positive number", () => {
    expect(typeof DEFAULT_DURATION).toBe("number");
    expect(DEFAULT_DURATION).toBeGreaterThan(0);
  });

  it("equals 24 (the authored value)", () => {
    expect(DEFAULT_DURATION).toBe(24);
  });
});

// ===========================================================================
// 2. stepperStyleContext — token mapping
//    MIRROR of index.tsx lines 76-85.
//    Maps: primary, primaryFg, mutedBg, border, mutedFg, foreground.
// ===========================================================================

describe("stepperStyleContext: token mapping (light theme)", () => {
  const ctx = stepperStyleContext(defaultLightTheme);

  it("primary equals theme.primary", () => {
    expect(ctx.primary).toBe(defaultLightTheme.primary);
  });

  it("primaryFg equals theme.primaryForeground", () => {
    expect(ctx.primaryFg).toBe(defaultLightTheme.primaryForeground);
  });

  it("mutedBg equals theme.muted", () => {
    expect(ctx.mutedBg).toBe(defaultLightTheme.muted);
  });

  it("border equals theme.border", () => {
    expect(ctx.border).toBe(defaultLightTheme.border);
  });

  it("mutedFg equals theme.mutedForeground", () => {
    expect(ctx.mutedFg).toBe(defaultLightTheme.mutedForeground);
  });

  it("foreground equals theme.foreground", () => {
    expect(ctx.foreground).toBe(defaultLightTheme.foreground);
  });
});

// ===========================================================================
// 3. stepperStyle preset — pure (activeIndex) => StepperStyle
//    MIRROR of index.tsx lines 91-93.
//    stepperStyle(activeIndex) = { position: activeIndex }
// ===========================================================================

describe("stepperStyle: identity map", () => {
  it("stepperStyle(0) returns position=0", () => {
    expect(stepperStyle(0).position).toBe(0);
  });

  it("stepperStyle(1) returns position=1", () => {
    expect(stepperStyle(1).position).toBe(1);
  });

  it("stepperStyle(2) returns position=2", () => {
    expect(stepperStyle(2).position).toBe(2);
  });

  it("stepperStyle(1.5) returns position=1.5 (float passthrough)", () => {
    expect(stepperStyle(1.5).position).toBe(1.5);
  });
});

// ===========================================================================
// 4. stepCircleAt — per-step fill / checkDraw / active thresholds
//    MIRROR of index.tsx lines 108-123.
//    fill     = clamp01(position - i)
//    checkDraw = fill
//    active   = Math.floor(position) === i && fill < 1
//
//    Key positions tested (3-step stepper, i in {0,1,2}):
//      position=0:   step 0 active, steps 1/2 future
//      position=0.5: step 0 mid-fill (active), step 1 future
//      position=1:   step 0 completed, step 1 active
//      position=1.5: step 0 completed, step 1 mid-fill (active), step 2 future
//      position=2:   steps 0/1 completed, step 2 active (fill=0)
// ===========================================================================

describe("stepCircleAt: position=0 (first step active, rest future)", () => {
  it("step 0: fill=0, checkDraw=0, active=true", () => {
    const r = stepCircleAt(0, 0);
    expect(r.fill).toBe(0);
    expect(r.checkDraw).toBe(0);
    expect(r.active).toBe(true);
  });

  it("step 1: fill=0, checkDraw=0, active=false (future)", () => {
    const r = stepCircleAt(1, 0);
    expect(r.fill).toBe(0);
    expect(r.checkDraw).toBe(0);
    expect(r.active).toBe(false);
  });

  it("step 2: fill=0, checkDraw=0, active=false (future)", () => {
    const r = stepCircleAt(2, 0);
    expect(r.fill).toBe(0);
    expect(r.checkDraw).toBe(0);
    expect(r.active).toBe(false);
  });
});

describe("stepCircleAt: position=0.5 (step 0 mid-fill, still active)", () => {
  it("step 0: fill=0.5, checkDraw=0.5, active=true", () => {
    const r = stepCircleAt(0, 0.5);
    expect(r.fill).toBeCloseTo(0.5, 10);
    expect(r.checkDraw).toBeCloseTo(0.5, 10);
    expect(r.active).toBe(true);
  });

  it("step 1: fill=0, checkDraw=0, active=false", () => {
    const r = stepCircleAt(1, 0.5);
    expect(r.fill).toBe(0);
    expect(r.checkDraw).toBe(0);
    expect(r.active).toBe(false);
  });
});

describe("stepCircleAt: position=1 (step 0 completed, step 1 active)", () => {
  it("step 0: fill=1, checkDraw=1, active=false (completed)", () => {
    const r = stepCircleAt(0, 1);
    expect(r.fill).toBe(1);
    expect(r.checkDraw).toBe(1);
    expect(r.active).toBe(false);
  });

  it("step 1: fill=0, checkDraw=0, active=true", () => {
    const r = stepCircleAt(1, 1);
    expect(r.fill).toBe(0);
    expect(r.checkDraw).toBe(0);
    expect(r.active).toBe(true);
  });

  it("step 2: fill=0, checkDraw=0, active=false (future)", () => {
    const r = stepCircleAt(2, 1);
    expect(r.fill).toBe(0);
    expect(r.checkDraw).toBe(0);
    expect(r.active).toBe(false);
  });
});

describe("stepCircleAt: position=1.5 (step 0 completed, step 1 mid-fill)", () => {
  it("step 0: fill=1, checkDraw=1, active=false (completed)", () => {
    const r = stepCircleAt(0, 1.5);
    expect(r.fill).toBe(1);
    expect(r.checkDraw).toBe(1);
    expect(r.active).toBe(false);
  });

  it("step 1: fill=0.5, checkDraw=0.5, active=true", () => {
    const r = stepCircleAt(1, 1.5);
    expect(r.fill).toBeCloseTo(0.5, 10);
    expect(r.checkDraw).toBeCloseTo(0.5, 10);
    expect(r.active).toBe(true);
  });

  it("step 2: fill=0, checkDraw=0, active=false (future)", () => {
    const r = stepCircleAt(2, 1.5);
    expect(r.fill).toBe(0);
    expect(r.checkDraw).toBe(0);
    expect(r.active).toBe(false);
  });
});

describe("stepCircleAt: position=2 (steps 0/1 completed, step 2 active)", () => {
  it("step 0: fill=1, checkDraw=1, active=false (completed)", () => {
    const r = stepCircleAt(0, 2);
    expect(r.fill).toBe(1);
    expect(r.checkDraw).toBe(1);
    expect(r.active).toBe(false);
  });

  it("step 1: fill=1, checkDraw=1, active=false (completed)", () => {
    const r = stepCircleAt(1, 2);
    expect(r.fill).toBe(1);
    expect(r.checkDraw).toBe(1);
    expect(r.active).toBe(false);
  });

  it("step 2: fill=0, checkDraw=0, active=true (last step reached)", () => {
    // floor(2)=2, fill=clamp(2-2)=0 → active=true
    const r = stepCircleAt(2, 2);
    expect(r.fill).toBe(0);
    expect(r.checkDraw).toBe(0);
    expect(r.active).toBe(true);
  });
});

describe("stepCircleAt: fill clamps at 1 for large position", () => {
  it("step 0 at position=5 clamps fill to 1", () => {
    const r = stepCircleAt(0, 5);
    expect(r.fill).toBe(1);
    expect(r.checkDraw).toBe(1);
    expect(r.active).toBe(false);
  });
});

describe("stepCircleAt: fill clamps at 0 for negative (position - i)", () => {
  it("step 2 at position=0 clamps fill to 0 (no negative fill)", () => {
    const r = stepCircleAt(2, 0);
    expect(r.fill).toBe(0);
    expect(r.checkDraw).toBe(0);
  });
});

describe("stepCircleAt: fill and checkDraw are always equal", () => {
  for (const [i, pos] of [[0, 0], [0, 0.5], [0, 1], [1, 1.5], [2, 2]] as [number, number][]) {
    it(`i=${i} pos=${pos}: fill === checkDraw`, () => {
      const r = stepCircleAt(i, pos);
      expect(r.fill).toBeCloseTo(r.checkDraw, 10);
    });
  }
});

// ===========================================================================
// 5. connectorFillAt — connector primary-fill fraction between steps
//    MIRROR of index.tsx lines 126-128.
//    connectorFillAt(i, position) = clamp01(position - i)
//    Same formula as stepCircleAt fill — tests confirm the identity.
// ===========================================================================

describe("connectorFillAt: connector between step 0 and 1", () => {
  it("position=0: fill=0 (connector empty)", () => {
    expect(connectorFillAt(0, 0)).toBe(0);
  });

  it("position=0.5: fill=0.5 (connector half full)", () => {
    expect(connectorFillAt(0, 0.5)).toBeCloseTo(0.5, 10);
  });

  it("position=1: fill=1 (connector fully filled)", () => {
    expect(connectorFillAt(0, 1)).toBe(1);
  });

  it("position=2: fill=1 (clamped, already passed)", () => {
    expect(connectorFillAt(0, 2)).toBe(1);
  });
});

describe("connectorFillAt: connector between step 1 and 2", () => {
  it("position=1: fill=0 (second connector empty)", () => {
    expect(connectorFillAt(1, 1)).toBe(0);
  });

  it("position=1.5: fill=0.5", () => {
    expect(connectorFillAt(1, 1.5)).toBeCloseTo(0.5, 10);
  });

  it("position=2: fill=1 (second connector full)", () => {
    expect(connectorFillAt(1, 2)).toBe(1);
  });
});

describe("connectorFillAt: negative result is clamped to 0", () => {
  it("connectorFillAt(2, 0) = 0 (not -2)", () => {
    expect(connectorFillAt(2, 0)).toBe(0);
  });
});

// ===========================================================================
// 6. tweenStepperStyle — pure single-field lerp
//    MIRROR of use-stepper-transition.ts lines 34-40.
//    position lerps linearly: a.position + (b.position - a.position) * t
// ===========================================================================

describe("tweenStepperStyle: t=0 returns value equal to a", () => {
  it("position equals a.position at t=0", () => {
    const r = tweenStepperStyle({ position: 0 }, { position: 2 }, 0);
    expect(r.position).toBeCloseTo(0, 10);
  });
});

describe("tweenStepperStyle: t=1 returns value equal to b", () => {
  it("position equals b.position at t=1", () => {
    const r = tweenStepperStyle({ position: 0 }, { position: 2 }, 1);
    expect(r.position).toBeCloseTo(2, 10);
  });
});

describe("tweenStepperStyle: t=0.5 midpoint (0 → 2)", () => {
  // 0 + (2-0)*0.5 = 1
  it("0 → 2 at t=0.5 gives position=1", () => {
    const r = tweenStepperStyle({ position: 0 }, { position: 2 }, 0.5);
    expect(r.position).toBeCloseTo(1, 10);
  });
});

describe("tweenStepperStyle: t=0.5 midpoint (1 → 0, reverse)", () => {
  // 1 + (0-1)*0.5 = 0.5
  it("1 → 0 at t=0.5 gives position=0.5", () => {
    const r = tweenStepperStyle({ position: 1 }, { position: 0 }, 0.5);
    expect(r.position).toBeCloseTo(0.5, 10);
  });
});

describe("tweenStepperStyle: identity (a === b)", () => {
  it("position is unchanged when both endpoints are the same", () => {
    const r = tweenStepperStyle({ position: 1 }, { position: 1 }, 0.5);
    expect(r.position).toBeCloseTo(1, 10);
  });
});

describe("tweenStepperStyle: t=0.25 quarter-point", () => {
  // 0 + (2-0)*0.25 = 0.5
  it("0 → 2 at t=0.25 gives position=0.5", () => {
    const r = tweenStepperStyle({ position: 0 }, { position: 2 }, 0.25);
    expect(r.position).toBeCloseTo(0.5, 10);
  });
});

// ===========================================================================
// 7. stepperStyleAt — pure exported core of useStepperTransition
//    MIRROR of use-stepper-transition.ts lines 66-102.
//    useStepperTransition = stepperStyleAt(steps, useCurrentFrame() * speed, opts).
//    Call stepperStyleAt directly with frame injected as `raw`.
//
//    MAINTENANCE CONTRACT: if use-stepper-transition.ts lines 66-102 change,
//    update these tests in lockstep. Annotated source lines below.
// ===========================================================================

describe("stepperStyleAt: empty steps → position=0", () => {
  // source line 73: if (steps.length === 0) return { position: 0 }
  it("returns {position:0} for any raw frame when steps is empty", () => {
    expect(stepperStyleAt([], 0).position).toBe(0);
    expect(stepperStyleAt([], 100).position).toBe(0);
  });
});

describe("stepperStyleAt: before first step — holds at first.index", () => {
  // source line 79: if (raw <= first.at) return { position: first.index }
  const steps: StepperStep[] = [{ at: 30, index: 1 }];

  it("raw=0 < first.at=30 → holds at first.index=1", () => {
    expect(stepperStyleAt(steps, 0).position).toBe(1);
  });

  it("raw=30 = first.at=30 → still holds at first.index=1 (raw <= first.at)", () => {
    expect(stepperStyleAt(steps, 30).position).toBe(1);
  });

  it("raw=29 → holds at first.index=1", () => {
    expect(stepperStyleAt(steps, 29).position).toBe(1);
  });
});

describe("stepperStyleAt: past last step — rests at last.index", () => {
  // source lines 90-92: pastLast → to=from=last, t=1
  const steps: StepperStep[] = [{ at: 0, index: 0 }, { at: 24, index: 1 }];

  it("raw=50 past last.at=24 → position=1 (last index)", () => {
    expect(stepperStyleAt(steps, 50).position).toBeCloseTo(1, 10);
  });

  it("raw=100 → position=1", () => {
    expect(stepperStyleAt(steps, 100).position).toBeCloseTo(1, 10);
  });
});

describe("stepperStyleAt: mid-window uses easings.out (non-linear)", () => {
  // steps=[{at:0,index:0},{at:24,index:1}], raw=12
  // pastLast: 12>=24? no. toIndex=1 (steps[1].at=24>12)
  // to={at:24,index:1}, from={at:0,index:0}
  // dur=24, start=0, t=out(clamp01((12-0)/24))=out(0.5)=0.875
  // position = 0 + (1-0)*0.875 = 0.875
  const steps: StepperStep[] = [{ at: 0, index: 0 }, { at: 24, index: 1 }];

  it("raw=12 gives position=0.875 (out-eased, not linear 0.5)", () => {
    expect(stepperStyleAt(steps, 12).position).toBeCloseTo(0.875, 8);
  });

  it("out(0.5) = 0.875 — confirms easing is non-linear at midpoint", () => {
    expect(easings.out(0.5)).toBeCloseTo(0.875, 8);
  });

  it("value at raw=12 is 0.875, NOT 0.5 (rejects linear hypothesis)", () => {
    const r = stepperStyleAt(steps, 12);
    expect(r.position).not.toBeCloseTo(0.5, 1);
    expect(r.position).toBeCloseTo(0.875, 8);
  });
});

describe("stepperStyleAt: at last step boundary — pastLast → t=1", () => {
  // raw=24: steps[1].at=24, pastLast = raw(24) >= 24 = true → t=1 → position=1
  const steps: StepperStep[] = [{ at: 0, index: 0 }, { at: 24, index: 1 }];

  it("raw=24 exactly at last step → position=1", () => {
    expect(stepperStyleAt(steps, 24).position).toBeCloseTo(1, 10);
  });
});

describe("stepperStyleAt: two-step multi-segment timeline", () => {
  // steps=[{at:0,index:0},{at:24,index:1},{at:48,index:2}]
  // raw=36 (mid of second segment [24→48], dur=24):
  // toIndex search: steps[2].at=48>36 → toIndex=2
  // pastLast: 36>=48? no. to={at:48,index:2}, from={at:24,index:1}
  // dur=24, start=24, t=out((36-24)/24)=out(0.5)=0.875
  // position = 1 + (2-1)*0.875 = 1.875
  const steps: StepperStep[] = [
    { at: 0, index: 0 },
    { at: 24, index: 1 },
    { at: 48, index: 2 },
  ];

  it("raw=36 mid-second segment gives position=1.875", () => {
    expect(stepperStyleAt(steps, 36).position).toBeCloseTo(1.875, 8);
  });

  it("raw=24 (start of second segment boundary) → pastLast=false, t=out(0)=0 → position=1", () => {
    // steps[2].at=48>24 → toIndex=2; start=48-24=24; t=out((24-24)/24)=out(0)=0
    // position = 1 + (2-1)*0 = 1
    expect(stepperStyleAt(steps, 24).position).toBeCloseTo(1, 10);
  });
});

describe("stepperStyleAt: custom duration on a step", () => {
  // steps=[{at:0,index:0},{at:12,index:1,duration:12}]
  // raw=6: toIndex=1, dur=12, start=0, t=out(6/12)=out(0.5)=0.875
  // position=0+(1-0)*0.875=0.875
  const steps: StepperStep[] = [{ at: 0, index: 0 }, { at: 12, index: 1, duration: 12 }];

  it("custom duration=12: raw=6 gives position=0.875", () => {
    expect(stepperStyleAt(steps, 6).position).toBeCloseTo(0.875, 8);
  });
});

describe("stepperStyleAt: past last with three steps", () => {
  const steps: StepperStep[] = [
    { at: 0, index: 0 },
    { at: 24, index: 1 },
    { at: 48, index: 2 },
  ];

  it("raw=100 past last → position=2 (last step index)", () => {
    expect(stepperStyleAt(steps, 100).position).toBeCloseTo(2, 10);
  });
});

describe("stepperStyleAt: single-step timeline (no from step)", () => {
  // Only one step: hold at its index before and after
  const steps: StepperStep[] = [{ at: 0, index: 1 }];

  it("raw=0 (at first.at) → holds at position=1", () => {
    expect(stepperStyleAt(steps, 0).position).toBe(1);
  });

  it("raw=50 past last → pastLast=true → position=1", () => {
    expect(stepperStyleAt(steps, 50).position).toBeCloseTo(1, 10);
  });
});

// ===========================================================================
// 8. stepperConfig.controls — customizer control wiring
// ===========================================================================

describe("stepperConfig.controls.activeIndex", () => {
  it("is a number control", () => {
    expect(stepperConfig.controls.activeIndex.type).toBe("number");
  });

  it("defaults to 1 (middle step of the 3-step default)", () => {
    expect(stepperConfig.controls.activeIndex.default).toBe(1);
  });

  it("min is 0", () => {
    const ctrl = stepperConfig.controls.activeIndex;
    if (ctrl.type !== "number") throw new Error("expected number");
    expect(ctrl.min).toBe(0);
  });

  it("max is 2", () => {
    const ctrl = stepperConfig.controls.activeIndex;
    if (ctrl.type !== "number") throw new Error("expected number");
    expect(ctrl.max).toBe(2);
  });

  it("step is 1 (integer steps only)", () => {
    const ctrl = stepperConfig.controls.activeIndex;
    if (ctrl.type !== "number") throw new Error("expected number");
    expect(ctrl.step).toBe(1);
  });
});

describe("stepperConfig.controls.mode", () => {
  it("is a select control", () => {
    expect(stepperConfig.controls.mode.type).toBe("select");
  });

  it("options are ['light', 'dark']", () => {
    const ctrl = stepperConfig.controls.mode;
    if (ctrl.type !== "select") throw new Error("expected select");
    expect(ctrl.options).toEqual(["light", "dark"]);
  });

  it("defaults to 'light'", () => {
    expect(stepperConfig.controls.mode.default).toBe("light");
  });
});

// ===========================================================================
// 9. stepperConfig.snippet — pure JSX string builder
// ===========================================================================

describe("stepperConfig.snippet: import line", () => {
  it("includes 'import { Stepper }' from the correct path", () => {
    const out = snippet({ activeIndex: 1 });
    expect(out).toContain("import { Stepper }");
    expect(out).toContain('from "@/components/remocn/stepper"');
  });
});

describe("stepperConfig.snippet: structural invariants", () => {
  it("contains a <Stepper JSX element", () => {
    expect(snippet({ activeIndex: 1 })).toContain("<Stepper");
  });

  it("ends with a self-closing />", () => {
    expect(snippet({ activeIndex: 1 }).trimEnd().endsWith("/>")).toBe(true);
  });

  it("starts with the import line", () => {
    expect(snippet({ activeIndex: 1 }).startsWith('import { Stepper }')).toBe(true);
  });
});

describe("stepperConfig.snippet: activeIndex is always emitted", () => {
  it("emits activeIndex={1} for the default value", () => {
    expect(snippet({ activeIndex: 1 })).toContain("activeIndex={1}");
  });

  it("emits activeIndex={0} when activeIndex is 0", () => {
    expect(snippet({ activeIndex: 0 })).toContain("activeIndex={0}");
  });

  it("emits activeIndex={2} when activeIndex is 2", () => {
    expect(snippet({ activeIndex: 2 })).toContain("activeIndex={2}");
  });

  it("emits activeIndex={0} when activeIndex is omitted from values (falls back to 0)", () => {
    // snippet uses `activeIndex ?? 0`
    expect(snippet({})).toContain("activeIndex={0}");
  });
});

describe("stepperConfig.snippet: steps inline literal always emitted", () => {
  it("always emits steps={[...]} inline", () => {
    const out = snippet({ activeIndex: 1 });
    expect(out).toContain("steps={");
    expect(out).toContain("Account");
    expect(out).toContain("Plan");
    expect(out).toContain("Done");
  });

  it("emits steps for every activeIndex value", () => {
    for (const i of [0, 1, 2]) {
      const out = snippet({ activeIndex: i });
      expect(out).toContain("steps={");
    }
  });
});

describe("stepperConfig.snippet: default mode is omitted", () => {
  it("omits mode when it equals the default 'light'", () => {
    expect(snippet({ activeIndex: 1, mode: "light" })).not.toContain("mode=");
  });

  it("omits mode when not provided", () => {
    expect(snippet({ activeIndex: 1 })).not.toContain("mode=");
  });
});

describe("stepperConfig.snippet: non-default mode is emitted", () => {
  it("emits mode=\"dark\" when non-default", () => {
    expect(snippet({ activeIndex: 1, mode: "dark" })).toContain('mode="dark"');
  });
});

describe("stepperConfig.snippet: activeIndex numeric round-trip", () => {
  it("emits the correct activeIndex for 0, 1, 2", () => {
    for (const i of [0, 1, 2]) {
      expect(snippet({ activeIndex: i })).toContain(`activeIndex={${i}}`);
    }
  });
});
