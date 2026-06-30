# directional-wipe

**Tier:** `remocn` (animation) · **Vibe:** premium · **Natural length:** 90f @ 30fps

Slides one scene in from an edge while pushing the outgoing scene off in the same direction. A clean, physically grounded swap — the two scenes move together as if on a continuous surface.

## Install

```bash
shadcn add @remocn/directional-wipe
```

Lands at `components/remocn/directional-wipe.tsx`.

## Props

| Prop | Type | Default |
|---|---|---|
| `from` | `ReactNode` | — |
| `to` | `ReactNode` | — |
| `direction` | `"left" \| "right" \| "up" \| "down"` | `"left"` |
| `transitionStart` | `number` | — |
| `transitionDuration` | `number` | `20` |
| `speed` | `number` | `1` |

## Example

```tsx
<DirectionalWipe
  from={<SceneA />}
  to={<SceneB />}
  direction="left"
  transitionStart={90}
  transitionDuration={20}
/>
```

## Use when

- Scenes are spatially related and should feel like pages sliding — feature steps, onboarding flows, or sequential reveals.
- You need the most neutral, universally readable scene transition in the library.
- Direction maps to narrative logic: left/right for lateral steps, up/down for hierarchy (zoom in/out of detail).

## Don't use when

- You want a dramatic, high-energy cut — the slide is clean but understated; use `chromatic-aberration-wipe` for impact or `zoom-through-transition` for aggression.
- You need the incoming scene to feel like it arrives from depth rather than a flat surface — use `spatial-push` for that 3-D press-in feel instead.
- The scenes are unrelated and the slide direction would imply false spatial continuity — use `frosted-glass-wipe` or `grid-pixelate-wipe` for a more abstract break.
