# zoom-through-transition

**Tier:** `remocn` (animation) · **Vibe:** premium · **Natural length:** 60f @ 30fps

Aggressively scales into the center of a scene element until the frame goes white (or a configurable background color), then cuts to the next scene. A "punch through" exit — kinetic, intentional, and brief.

## Install

```bash
shadcn add @remocn/zoom-through-transition
```

Lands at `components/remocn/zoom-through-transition.tsx`.

## Props

| Prop | Type | Default |
|---|---|---|
| `children` | `ReactNode` | — |
| `targetScale` | `number` | `20` |
| `transformOrigin` | `string` | `"center center"` |
| `background` | `string` | `"white"` |
| `speed` | `number` | `1` |

## Example

```tsx
<Sequence from={0} durationInFrames={60}>
  <ZoomThroughTransition targetScale={25} background="#0a0a0a" transformOrigin="60% 40%">
    <SceneA />
  </ZoomThroughTransition>
</Sequence>
<Sequence from={60}>
  <SceneB />
</Sequence>
```

## Use when

- The outgoing scene needs a dramatic, high-velocity exit that commands attention before the cut.
- You want to zoom into a specific element (a logo, a CTA button, a headline) to create a punch-through moment — set `transformOrigin` to that element's position.
- The overall motion language is aggressive and kinetic — pairs well with `chromatic-aberration-wipe` and hard cuts.

## Don't use when

- You need a two-sided transition (swap `from` and `to` scenes in one component) — `zoom-through-transition` wraps only the outgoing scene's exit; the incoming scene is a separate `Sequence`; use `spatial-push` or `directional-wipe` for a self-contained two-scene swap.
- The video tone is calm, professional, or documentary — an extreme scale-to-20x reads as aggressive and will break the pacing; use `frosted-glass-wipe` or `directional-wipe` instead.
- The origin point is unclear or centered on empty space — zooming into empty background produces a flat white flash with no dramatic payoff; identify a meaningful focal element and set `transformOrigin` precisely.
