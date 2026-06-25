# Motion Principles for remocn

The 12 classic animation principles, adapted to **composing Remotion videos from remocn blocks**.
Each entry: the principle → the Remotion mechanic that expresses it → a remocn component that
demonstrates it → do/avoid tuned to remocn's restraint.

- This file is about **which** principle and **when** (intent). For **how** the APIs work
  (easing curves, sequencing, spring config), see the `remotion-best-practices` skill.
- Motion must stay restrained — see `design.md`. Where a principle pushes toward boldness
  (squash, exaggeration), the cap below always wins.
- Idiom note: remocn components drive motion with `spring()` and `interpolate()` + `Easing`.
  Examples here use that same idiom.

Tags: **`core`** — routinely useful when assembling scenes · **`rarely-needed`** — character-
animation territory; only relevant if you hand-draw motion, not when composing blocks.

---

## 1. Squash & Stretch — `rarely-needed`

Compress on impact, elongate on speed; preserve volume. For UI this means a tiny scale-x/scale-y
trade on landing — nothing cartoon.

- **Mechanic:** `spring()` driving `scaleX`/`scaleY` inversely on impact frames.
- **remocn:** `spring-scale-in` (settle), `confetti` (particle pop).
- **Do/Avoid:** at most a 2–4% volume trade on a hard landing. ❌ No rubber-band squash on text or
  cards — it fights `design.md`.

## 2. Anticipation — `core`

A short wind-up before the action makes it feel intentional: a drawer dips before it expands.

- **Mechanic:** `spring()` with light overshoot, or a brief reverse `interpolate` (e.g. `−4px`)
  for 1–3 frames before the main move.
- **remocn:** `spring-scale-in`, `tool-menu-slide-in` (palette crouches before it flies up),
  `code-accordion`.
- **Do/Avoid:** keep the wind-up to 1–3 frames, ≤110% scale. ❌ No bouncy cartoon recoil.

## 3. Staging — `core`

Direct the eye: one clear idea per scene. Clear the stage before introducing the next element.

- **Mechanic:** `<Sequence>` / `<Series>` to isolate beats; stagger entrances so only one focal
  element moves at a time; dim/scale-down what's leaving.
- **remocn:** `pricing-tier-focus` (focused tier rises, siblings dim), most Compositions.
- **Do/Avoid:** one focal action per beat. ❌ Don't enter five elements on the same frame.

## 4. Straight-Ahead vs Pose-to-Pose — `rarely-needed`

Pose-to-pose = define key frames, interpolate between. That's exactly how remocn works.

- **Mechanic:** `interpolate(frame, [k0, k1, k2], [v0, v1, v2])` — your keyframes are the poses.
- **remocn:** every component (key ranges in `index.tsx`).
- **Do/Avoid:** think in keyframes and let `interpolate` fill between. Straight-ahead (frame-by-
  frame) is for hand-drawn organic effects — not block composition.

## 5. Follow-Through & Overlapping Action — `core`

Nothing stops at once; elements arrive staggered. Lighter things lead, heavier lag.

- **Mechanic:** per-element delay offsets (`frame - index * stagger`) on the same animation.
- **remocn:** `staggered-fade-up`, `tool-menu-slide-in` (icons pop after the panel),
  `short-slide-right`.
- **Do/Avoid:** stagger 3–6 frames between siblings. ❌ Don't land a whole group on one frame
  (reads robotic) and don't over-stagger (feels sluggish).

## 6. Slow In & Slow Out — `core`

Ease into and out of poses — almost nothing should move linearly.

- **Mechanic:** `interpolate(..., { easing: Easing.out(Easing.cubic) })`; sharp curve = snappy,
  gentle = graceful.
- **remocn:** transitions (`directional-wipe`, `frosted-glass-wipe`), most text reveals.
- **Do/Avoid:** default to ease-out for entrances. ❌ Linear `interpolate` for visible motion
  unless it's a constant drift (e.g. marquee, grid pan).

## 7. Arc — `core`

Living motion follows curves, not straight lines — especially cursors and gestures.

- **Mechanic:** drive `x` and `y` from separate eased interpolations, or a bezier path.
- **remocn:** `cursor` + `useCursorPath`, social cards' cursor travel to the Follow button.
- **Do/Avoid:** curve cursor/hand paths. ❌ No straight diagonal cursor jumps.

## 8. Secondary Action — `core`

Supporting motion that reinforces the primary action without stealing focus.

- **Mechanic:** a small parallel channel — a cursor ripple on click, a shadow that breathes as a
  card opens, a caret blink under typing.
- **remocn:** `x-follow-card` (ripple at click), `typewriter` (`caret` blink).
- **Do/Avoid:** secondary motion stays subtle and on-theme. ❌ Don't add competing animation that
  splits attention.

## 9. Timing — `core`

Frame counts set weight: fast = light, slow = heavy. Vary timing for contrast.

- **Mechanic:** budget in frames @ fps (remocn defaults to 30fps; component durations run
  ~90–300 frames). The `speed` prop scales the animation tier.
- **remocn:** every animation-tier component (`speed`); composition `durationInFrames`.
- **Do/Avoid:** match duration to weight — a heavy hero assemble is slower than a toast. ❌ Don't
  reuse one duration for everything (kills rhythm).

## 10. Exaggeration — `core` (capped)

Push slightly past literal reality for clarity — but remocn's house style is restraint.

- **Mechanic:** a touch of overshoot on `spring()`, a brief ≤110% scale peak.
- **remocn:** `spring-scale-in`, `micro-scale-fade`.
- **Do/Avoid:** subtle UI exaggeration only (≤110%, gentle overshoot). ❌ No stretched/cartoon
  exaggeration — this is the principle most likely to collide with `design.md`; the cap wins.

## 11. Solid Drawing — `rarely-needed`

Form, weight, and consistent perspective. For block composition this is mostly fixed by the
components; it matters only if you build 3D-ish scenes.

- **Mechanic:** consistent `perspective` / `transform-origin` across layered elements.
- **remocn:** `spatial-push`, `perspective-marquee`, `device-mockup-zoom`.
- **Do/Avoid:** keep one perspective per scene when stacking 3D layers. ❌ Don't mix inconsistent
  vanishing points.

## 12. Appeal — `rarely-needed`

The charisma of the result: clear shapes, balanced proportion, motion that invites watching.
Emergent, not a knob.

- **Mechanic:** outcome of staging + timing + restraint working together.
- **remocn:** the full Compositions as reference for a coherent, watchable result.
- **Do/Avoid:** aim for clear and captivating, not busy. ❌ More motion ≠ more appeal — cut what
  doesn't serve the focal idea.
