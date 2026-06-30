# grid-pixelate-wipe

**Tier:** `remocn` (animation) · **Vibe:** premium · **Natural length:** 90f @ 30fps

Dissolves from one scene to the next through a deterministic grid of mask cells. Each cell fades independently in a configurable wave, diagonal, or spiral pattern — a structured, geometric dissolve that reads as deliberate and designed.

## Install

```bash
shadcn add @remocn/grid-pixelate-wipe
```

Lands at `components/remocn/grid-pixelate-wipe.tsx`.

## Props

| Prop | Type | Default |
|---|---|---|
| `from` | `ReactNode` | — |
| `to` | `ReactNode` | — |
| `cols` | `number` | `12` |
| `rows` | `number` | `7` |
| `pattern` | `"wave" \| "diagonal" \| "spiral"` | `"wave"` |
| `transitionStart` | `number` | — |
| `transitionDuration` | `number` | `30` |
| `cellFadeFrames` | `number` | `4` |
| `speed` | `number` | `1` |

## Example

```tsx
<GridPixelateWipe
  from={<SceneA />}
  to={<SceneB />}
  cols={16}
  rows={9}
  pattern="diagonal"
  transitionStart={90}
  transitionDuration={30}
/>
```

## Use when

- The transition should feel designed and deliberate — the grid dissolve reads as an intentional visual motif, not just a cut.
- You want to vary transition character by pattern: `wave` for organic flow, `diagonal` for directional energy, `spiral` for focus-to-center drama.
- Scenes are thematically distinct and you want a clear, structured boundary between them.

## Don't use when

- The scenes are spatially related and the transition should feel like physical movement — grid cells break spatial continuity; use `directional-wipe` or `spatial-push` instead.
- You need a fast, energy-forward cut — a 30-frame grid dissolve reads as deliberate and cinematic, not punchy; use `chromatic-aberration-wipe` for impact.
- The video aesthetic is minimalist or naturalistic — the grid pattern draws attention to itself; use `frosted-glass-wipe` for a softer, less geometric boundary.
