# chromatic-aberration-wipe

**Tier:** `remocn` (animation) · **Vibe:** premium · **Natural length:** 90f @ 30fps

An ultra-fast slide transition between two scenes with an RGB channel-split glitch on the peak frames. The `from` scene exits and the `to` scene enters; the aberration burst fires at the cut point for a high-energy feel.

## Install

```bash
shadcn add @remocn/chromatic-aberration-wipe
```

Lands at `components/remocn/chromatic-aberration-wipe.tsx`.

## Props

| Prop | Type | Default |
|---|---|---|
| `from` | `ReactNode` | — |
| `to` | `ReactNode` | — |
| `direction` | `"left" \| "right"` | `"left"` |
| `transitionStart` | `number` | — |
| `transitionDuration` | `number` | `7` |
| `aberrationOffset` | `number` | `8` |
| `speed` | `number` | `1` |

## Example

```tsx
<ChromaticAberrationWipe
  from={<SceneA />}
  to={<SceneB />}
  direction="left"
  transitionStart={60}
  transitionDuration={7}
  aberrationOffset={10}
/>
```

## Use when

- Cuts between scenes need to feel fast, kinetic, and slightly chaotic — tech product reveals, gaming, or hype reels.
- A single high-energy punctuation is needed between two content beats.
- The surrounding motion language is already bold — pairs well with `zoom-through-transition` or hard cuts.

## Don't use when

- The video tone is calm, professional, or corporate — the RGB glitch reads as aggressive; use `directional-wipe` or `frosted-glass-wipe` instead.
- You need a slow, sustained transition over 20+ frames — `transitionDuration` defaults to 7 frames by design; stretching it dilutes the glitch impact; use `spatial-push` for a longer, weighted move.
- The scenes share a continuous spatial narrative — glitch implies a break or error; use `spatial-push` or `directional-wipe` to preserve visual continuity.
