# spatial-push

**Tier:** `remocn` (animation) · **Vibe:** premium · **Natural length:** 90f @ 30fps

A new scene physically presses the old one back into the frame — the incoming scene scales up from depth while the outgoing scene shrinks away, creating a 3-D push-in feel that implies the viewer is moving forward through space.

## Install

```bash
shadcn add @remocn/spatial-push
```

Lands at `components/remocn/spatial-push.tsx`.

## Props

| Prop | Type | Default |
|---|---|---|
| `from` | `ReactNode` | — |
| `to` | `ReactNode` | — |
| `direction` | `"up" \| "down" \| "left" \| "right"` | `"up"` |
| `transitionStart` | `number` | — |
| `transitionDuration` | `number` | `30` |
| `speed` | `number` | `1` |

## Example

```tsx
<SpatialPush
  from={<SceneA />}
  to={<SceneB />}
  direction="up"
  transitionStart={90}
  transitionDuration={30}
/>
```

## Use when

- The narrative moves deeper into a topic — "zooming in" on a feature, entering a product, or drilling into detail; `direction="up"` gives the sense of moving forward.
- You want a weighted, physical transition that feels more 3-D than a flat lateral slide.
- Scenes represent hierarchical levels — parent context gives way to child detail.

## Don't use when

- You need a fast, energy-forward cut — the scale-based push reads as deliberate and weighty over 30 frames; use `chromatic-aberration-wipe` for speed or `directional-wipe` for a flat lateral slide.
- The scenes are at the same hierarchical level and no depth relationship exists — the perspective scale implies hierarchy; use `directional-wipe` for lateral steps or `frosted-glass-wipe` for a neutral boundary.
- You want to return to a parent/overview context — pushing "out" feels spatially inconsistent; reverse the direction or cut directly instead.
