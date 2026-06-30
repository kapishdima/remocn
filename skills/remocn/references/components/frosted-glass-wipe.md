# frosted-glass-wipe

**Tier:** `remocn` (animation) · **Vibe:** premium · **Natural length:** 90f @ 30fps

An elegant scene transition through a sliding pane of frosted glass. A blurred, semi-transparent panel sweeps across the frame — briefly obscuring the outgoing scene before clearing to reveal the incoming one. The mechanism is visual material, not a hard geometric cut.

## Install

```bash
shadcn add @remocn/frosted-glass-wipe
```

Lands at `components/remocn/frosted-glass-wipe.tsx`.

## Props

| Prop | Type | Default |
|---|---|---|
| `from` | `ReactNode` | — |
| `to` | `ReactNode` | — |
| `transitionStart` | `number` | — |
| `transitionDuration` | `number` | `30` |
| `glassBlur` | `number` | `24` |
| `speed` | `number` | `1` |

## Example

```tsx
<FrostedGlassWipe
  from={<SceneA />}
  to={<SceneB />}
  transitionStart={90}
  transitionDuration={30}
  glassBlur={28}
/>
```

## Use when

- The video tone is refined and editorial — the frosted pane reads as premium Apple-style material.
- You want the transition itself to be a visual moment, not just a mechanical cut — the glass panel briefly dominates the frame.
- Scenes are thematically distinct but tonally similar; the blur provides a soft boundary without implying spatial relationship.

## Don't use when

- The transition needs to be fast or punchy — `transitionDuration` of 30 frames is a slow, deliberate wipe; use `chromatic-aberration-wipe` (7f) or `directional-wipe` (20f) for faster cuts.
- The scenes share a clear spatial/directional relationship (left → right steps) — the frosted panel obscures that logic; use `directional-wipe` or `spatial-push` to preserve it.
- You need a structured geometric reveal pattern — the blur is amorphous by nature; use `grid-pixelate-wipe` for a cell-based dissolve instead.
