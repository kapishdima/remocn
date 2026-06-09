/**
 * Verification tests for the OKLCH <-> sRGB color helpers in
 * registry/remocn/ui-core/color.ts.
 *
 * color.ts is now a thin wrapper over the `culori` package, and it exposes
 * culori's NATIVE shapes and scales:
 *   - `Rgb` objects are mode-tagged `{ mode: "rgb", r, g, b, alpha }` with
 *     channels in 0..1 (NOT 0..255).
 *   - `Oklch` objects are `{ mode: "oklch", l, c, h, alpha? }` with lowercase
 *     l/c/h; achromatic hue is normalized to 0.
 *   - `rgbToOklch` takes a culori `Rgb` OBJECT (not 3 scalars).
 *   - `toCss` uses culori's `formatRgb`, which emits LEGACY comma syntax with
 *     0..255 integer channels: `"rgb(255, 128, 0)"` / `"rgba(255, 128, 0, 0.5)"`.
 *
 * culori must be installed before these run:
 *
 *   bun install                                  # pulls culori + @types/culori
 *   bun test registry/remocn/ui-core/__tests__
 *
 * These tests are deliberately PROPERTY-BASED, not pinned to magic RGB numbers.
 * culori uses its own matrices and gamut-mapping (clampChroma), so exact
 * channels can shift by a hair between culori versions. Instead we assert the
 * INVARIANTS that must hold regardless of culori's rounding: endpoint identity,
 * perceptual (non-sRGB) midpoint, shortest-arc hue, neutral-hold, round-trip,
 * and alpha handling. All channel tolerances are expressed in the 0..1 scale
 * (~0.01 ~= 2/255), immune to culori's 8-bit quantization.
 *
 * Where an exact value is genuinely useful (theme-override AC), we compute the
 * expected from the module's OWN oklchToRgb/parseColor so the test is
 * self-consistent and immune to culori version drift.
 *
 * These are PURE (no React / no Remotion), so they import the real module.
 */

import { describe, expect, it } from "bun:test";
import {
  mixOklch,
  oklchToRgb,
  parseColor,
  rgbToOklch,
  toCss,
} from "../color";

// --- helpers ---------------------------------------------------------------

/**
 * Parse culori `formatRgb` output -- legacy comma syntax with 0..255 integer
 * channels -- back into a 0..1 culori-shaped Rgb so it compares directly
 * against parseColor/oklchToRgb output (which are also 0..1).
 *   "rgb(255, 128, 0)"        -> { r: 1, g: 0.502, b: 0, alpha: 1 }
 *   "rgba(10, 20, 30, 0.5)"   -> { r: 0.039, g: 0.078, b: 0.118, alpha: 0.5 }
 * Robust to either comma- or space-separated forms just in case.
 */
function rgbOf(css: string): { r: number; g: number; b: number; alpha: number } {
  const inner = css.slice(css.indexOf("(") + 1, css.lastIndexOf(")"));
  const parts = inner
    .replace(/\//g, " ")
    .replace(/,/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((n) => Number.parseFloat(n));
  const [r255, g255, b255, a] = parts;
  return {
    r: r255 / 255,
    g: g255 / 255,
    b: b255 / 255,
    alpha: a === undefined ? 1 : a,
  };
}

/** Assert each RGB channel (0..1) of two colors is within `tol`. */
function expectRgbClose(
  got: { r: number; g: number; b: number },
  want: { r: number; g: number; b: number },
  tol: number,
) {
  expect(Math.abs(got.r - want.r)).toBeLessThanOrEqual(tol);
  expect(Math.abs(got.g - want.g)).toBeLessThanOrEqual(tol);
  expect(Math.abs(got.b - want.b)).toBeLessThanOrEqual(tol);
}

// Channel tolerance in the 0..1 scale: ~2/255, covers clampChroma + 8-bit
// rounding on both the interpolate and the direct-convert paths.
const TOL = 0.01;

const BLACK = "oklch(0 0 0)";
const WHITE = "oklch(1 0 0)";

// --- mixOklch endpoints ----------------------------------------------------
// Property: a mix at t=0 IS the first color, at t=1 IS the second color.

describe("mixOklch endpoints", () => {
  const a = "oklch(0.5 0.12 250)";
  const b = "oklch(0.7 0.15 140)";

  it("returns ~a at t=0 (within tol of parseColor(a))", () => {
    expectRgbClose(rgbOf(mixOklch(a, b, 0)), parseColor(a), TOL);
  });

  it("returns ~b at t=1 (within tol of parseColor(b))", () => {
    expectRgbClose(rgbOf(mixOklch(a, b, 1)), parseColor(b), TOL);
  });

  it("preserves alpha at the endpoints (within 0.01)", () => {
    const aa = "oklch(0.5 0.12 250 / 40%)";
    const bb = "oklch(0.7 0.15 140 / 80%)";
    expect(Math.abs(rgbOf(mixOklch(aa, bb, 0)).alpha - 0.4)).toBeLessThanOrEqual(0.01);
    expect(Math.abs(rgbOf(mixOklch(aa, bb, 1)).alpha - 0.8)).toBeLessThanOrEqual(0.01);
  });
});

// --- midpoint is the OKLCH midpoint, NOT the naive sRGB midpoint -----------
// Property (not a pinned value): mixing black<->white in OKLCH at t=0.5 lands
// on the PERCEPTUAL midpoint, which is meaningfully different from the naive
// sRGB lerp (0.5 in the 0..1 scale). It must also stay neutral (r==g==b).

describe("mixOklch midpoint (perceptual, not naive sRGB lerp)", () => {
  it("black<->white at t=0.5 is neutral and clearly off the sRGB midpoint 0.5", () => {
    const mid = rgbOf(mixOklch(BLACK, WHITE, 0.5));
    // Neutral: no phantom hue swept through the achromatic axis. Compared in
    // 0..1 with TOL (formatRgb rounds to ints, so equal channels stay equal).
    expect(Math.abs(mid.r - mid.g)).toBeLessThanOrEqual(TOL);
    expect(Math.abs(mid.g - mid.b)).toBeLessThanOrEqual(TOL);
    // A naive sRGB lerp at t=0.5 would land at ~0.5 (0..1). The OKLCH
    // (perceptual) midpoint is well clear of that by a real margin -> proves we
    // are NOT lerping in sRGB. Assert the GAP magnitude, never the exact value.
    // 10/255 ~= 0.039 in the 0..1 scale.
    expect(Math.abs(mid.g - 0.5)).toBeGreaterThan(0.039);
  });

  it("matches the module's own oklchToRgb(0.5,0,0) (self-consistent, no magic number)", () => {
    // Both routes (interpolate->clampChroma->rgb vs oklchToRgb) must agree on
    // the neutral L=0.5 point. Computed from the module, so it tracks culori.
    expectRgbClose(rgbOf(mixOklch(BLACK, WHITE, 0.5)), oklchToRgb(0.5, 0, 0), TOL);
  });
});

// --- shortest-arc hue ------------------------------------------------------
// Property: culori's fixupHueShorter takes the SHORT way around the hue circle.
// Hues straddling the 0/360 seam (350 <-> 10) mix to ~0/360, never ~180.

describe("mixOklch shortest-arc hue", () => {
  it("h=350 <-> h=10 midpoint lands near 0/360, not ~180 (short way)", () => {
    const a = "oklch(0.6 0.12 350)";
    const b = "oklch(0.6 0.12 10)";
    const mid = rgbOf(mixOklch(a, b, 0.5));
    const hue = rgbToOklch({ mode: "rgb", r: mid.r, g: mid.g, b: mid.b }).h;
    // Short arc -> ~0deg. Accept the wraparound band [345,360] U [0,15];
    // reject the long-way ~180.
    const nearZero = hue <= 15 || hue >= 345;
    expect(nearZero).toBe(true);
    expect(Math.abs(hue - 180)).toBeGreaterThan(120);
  });
});

// --- neutral-hold ----------------------------------------------------------
// Property: mixing two grays yields a gray (no phantom hue), and mixing a gray
// with a chromatic color carries the chromatic hue rather than the gray's
// meaningless hue.

describe("mixOklch holds hue for neutrals (no phantom hue)", () => {
  it("midpoint of two grays stays neutral (r==g==b within tol)", () => {
    const a = "oklch(0.3 0 0)";
    const b = "oklch(0.8 0 0)";
    const mid = rgbOf(mixOklch(a, b, 0.5));
    expect(Math.abs(mid.r - mid.g)).toBeLessThanOrEqual(TOL);
    expect(Math.abs(mid.g - mid.b)).toBeLessThanOrEqual(TOL);
  });

  it("gray<->chromatic near the chromatic end carries that hue (within ~20deg)", () => {
    const gray = "oklch(0.6 0 0)";
    const blue = "oklch(0.6 0.12 250)";
    const near = rgbOf(mixOklch(gray, blue, 0.9));
    const hue = rgbToOklch({ mode: "rgb", r: near.r, g: near.g, b: near.b }).h;
    // Hue distance on the circle.
    const dh = Math.abs(((hue - 250 + 540) % 360) - 180);
    expect(dh).toBeLessThan(20);
  });
});

// --- oklchToRgb anchors ----------------------------------------------------
// Only the TRUE endpoints (pure black / pure white) are pinned, since those are
// gamut corners every correct implementation must hit exactly. In the 0..1
// scale white is r==g==b==1 and black is r==g==b==0. Mid-lightness neutrals are
// asserted as PROPERTIES (neutral + ordered), not pinned values.

describe("oklchToRgb anchors and neutral properties", () => {
  it("oklch(1 0 0) -> pure white (r==g==b==1)", () => {
    const w = oklchToRgb(1, 0, 0);
    expectRgbClose(w, { r: 1, g: 1, b: 1 }, TOL);
    expect(w.alpha ?? 1).toBe(1);
  });

  it("oklch(0 0 0) -> pure black (r==g==b==0)", () => {
    const k = oklchToRgb(0, 0, 0);
    expectRgbClose(k, { r: 0, g: 0, b: 0 }, TOL);
    expect(k.alpha ?? 1).toBe(1);
  });

  it("neutral oklch inputs (C=0) produce gray (r==g==b)", () => {
    for (const L of [0.205, 0.5, 0.985]) {
      const rgb = oklchToRgb(L, 0, 0);
      expect(Math.abs(rgb.r - rgb.g)).toBeLessThanOrEqual(TOL);
      expect(Math.abs(rgb.g - rgb.b)).toBeLessThanOrEqual(TOL);
    }
  });

  it("neutral lightness is monotonic: darker L -> darker gray", () => {
    const dark = oklchToRgb(0.205, 0, 0).r;
    const mid = oklchToRgb(0.5, 0, 0).r;
    const light = oklchToRgb(0.985, 0, 0).r;
    expect(dark).toBeLessThan(mid);
    expect(mid).toBeLessThan(light);
    // Near-corner sanity without pinning: dark neutral is genuinely dark,
    // light neutral is genuinely light (0..1 scale; 80/255 ~= 0.314,
    // 230/255 ~= 0.902).
    expect(dark).toBeLessThan(0.314);
    expect(light).toBeGreaterThan(0.902);
  });
});

// --- theme-override AC (plan §6) -------------------------------------------
// AC: a theme override "primary" oklch value resolves to a concrete RGB used in
// the inline style. We assert SELF-CONSISTENCY between the two ways the module
// can produce that RGB (oklchToRgb vs parseColor of the oklch string) rather
// than hard-coding a culori-version-specific value. This is the (a) path from
// the brief; no TODO/magic number needed.

describe("theme-override primary resolves consistently", () => {
  it("oklchToRgb(0.205,0,0) ~= parseColor('oklch(0.205 0 0)')", () => {
    const viaArgs = oklchToRgb(0.205, 0, 0);
    const viaParse = parseColor("oklch(0.205 0 0)");
    expectRgbClose(viaParse, viaArgs, TOL);
  });
});

// --- round trip rgbToOklch(oklchToRgb(...)) --------------------------------
// Property: converting OKLCH -> sRGB -> OKLCH recovers the original within
// 8-bit quantization. Catches a transposed matrix / atan2 sign error.
// rgbToOklch now takes the Rgb OBJECT directly, and returns lowercase l/c/h.

describe("oklch <-> rgb round-trip (in-gamut values)", () => {
  const cases: Array<[number, number, number]> = [
    [0.6, 0.1, 30],
    [0.5, 0.12, 250],
    [0.7, 0.15, 140],
  ];
  for (const [L, C, h] of cases) {
    it(`L=${L} C=${C} h=${h} survives a round trip`, () => {
      const rgb = oklchToRgb(L, C, h);
      const back = rgbToOklch(rgb);
      expect(Math.abs(back.l - L)).toBeLessThan(0.02);
      expect(Math.abs((back.c ?? 0) - C)).toBeLessThan(0.02);
      // Hue compared on the circle.
      const dh = Math.abs((((back.h ?? 0) - h + 540) % 360) - 180);
      expect(dh).toBeLessThan(2);
    });
  }

  it("achromatic round-trip normalizes hue to 0 (not NaN/undefined)", () => {
    // culori leaves hue undefined for achromatic; the module normalizes to 0.
    const back = rgbToOklch({ mode: "rgb", r: 0.5, g: 0.5, b: 0.5 });
    expect(back.h).toBe(0);
    expect(Number.isNaN(back.h)).toBe(false);
    expect(back.c ?? 0).toBeLessThan(0.001);
  });
});

// --- parseColor format coverage --------------------------------------------
// parseColor returns { mode: "rgb", r, g, b, alpha } with channels in 0..1.

describe("parseColor formats", () => {
  it("parses #rrggbb hex", () => {
    const c = parseColor("#ff8000");
    // 0xff/255=1, 0x80/255~=0.502, 0x00/255=0
    expectRgbClose(c, { r: 1, g: 0x80 / 255, b: 0 }, TOL);
    expect(c.mode).toBe("rgb");
    expect(c.alpha).toBe(1);
  });

  it("parses #rgb shorthand hex", () => {
    const c = parseColor("#f80");
    // #f80 -> #ff8800: 1, 0x88/255~=0.533, 0
    expectRgbClose(c, { r: 1, g: 0x88 / 255, b: 0 }, TOL);
  });

  it("parses rgb() space-separated", () => {
    expectRgbClose(
      parseColor("rgb(10 20 30)"),
      { r: 10 / 255, g: 20 / 255, b: 30 / 255 },
      TOL,
    );
  });

  it("parses rgb() comma-separated", () => {
    expectRgbClose(
      parseColor("rgb(10, 20, 30)"),
      { r: 10 / 255, g: 20 / 255, b: 30 / 255 },
      TOL,
    );
  });

  it("parses oklch() with a percent alpha (alpha ~= 0.10)", () => {
    const c = parseColor("oklch(1 0 0 / 10%)");
    expect(Math.abs(c.alpha! - 0.1)).toBeLessThanOrEqual(0.01);
  });

  it("defaults alpha to 1 when no alpha is present", () => {
    expect(parseColor("rgb(10 20 30)").alpha).toBe(1);
  });

  it("var(...) does not throw and returns the black sentinel", () => {
    // Documented contract: the animated path cannot resolve var() under
    // Remotion's per-frame render; falls back to black rather than throwing.
    expect(() => parseColor("var(--primary)")).not.toThrow();
    expect(parseColor("var(--primary)")).toEqual({
      mode: "rgb",
      r: 0,
      g: 0,
      b: 0,
      alpha: 1,
    });
  });

  it("unparseable input falls back to the black sentinel", () => {
    expect(parseColor("not-a-color")).toEqual({
      mode: "rgb",
      r: 0,
      g: 0,
      b: 0,
      alpha: 1,
    });
  });
});

// --- toCss -----------------------------------------------------------------
// toCss uses culori's formatRgb: LEGACY comma syntax, 0..255 integer channels,
// alpha emitted as rgba(...) only when alpha < 1.

describe("toCss (culori formatRgb output)", () => {
  it('emits legacy "rgb(r, g, b)" with 0..255 ints when opaque', () => {
    // 1 -> 255, 0.5 -> round(127.5)=128, 0 -> 0
    expect(toCss({ mode: "rgb", r: 1, g: 0.5, b: 0, alpha: 1 })).toBe(
      "rgb(255, 128, 0)",
    );
  });

  it("emits opaque rgb(...) when alpha is omitted", () => {
    // formatRgb treats undefined alpha as opaque.
    expect(toCss({ mode: "rgb", r: 0, g: 0, b: 0 } as never)).toBe("rgb(0, 0, 0)");
  });

  it('emits legacy "rgba(r, g, b, a)" when alpha < 1', () => {
    expect(toCss({ mode: "rgb", r: 10 / 255, g: 20 / 255, b: 30 / 255, alpha: 0.5 })).toBe(
      "rgba(10, 20, 30, 0.5)",
    );
  });

  it("round-trips through culori: toCss output re-parses to the same channels", () => {
    // Structural guard independent of the exact format string: whatever
    // formatRgb emits must parse back to the same 0..1 channels (within 8-bit).
    const want = { r: 1, g: 0.5, b: 0 };
    const reparsed = parseColor(toCss({ mode: "rgb", ...want, alpha: 1 }));
    expectRgbClose(reparsed, want, TOL);
    expect(reparsed.alpha).toBe(1);
  });

  it("carries alpha through the re-parse when alpha < 1", () => {
    const reparsed = parseColor(
      toCss({ mode: "rgb", r: 10 / 255, g: 20 / 255, b: 30 / 255, alpha: 0.5 }),
    );
    expect(Math.abs(reparsed.alpha! - 0.5)).toBeLessThanOrEqual(0.01);
  });
});

// --- alpha interpolation through mixOklch ----------------------------------

describe("mixOklch interpolates alpha", () => {
  it("midpoint of two alpha-bearing colors averages their alpha", () => {
    const a = "oklch(0.5 0.12 250 / 20%)";
    const b = "oklch(0.5 0.12 250 / 80%)";
    const mid = rgbOf(mixOklch(a, b, 0.5));
    // Equal L/C/h so only alpha moves; midpoint alpha ~= 0.5.
    expect(Math.abs(mid.alpha - 0.5)).toBeLessThanOrEqual(0.02);
  });
});
