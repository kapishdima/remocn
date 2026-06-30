# perspective-marquee

**Tier:** `remocn` (animation) · **Vibe:** premium · **Natural length:** 240f @ 30fps

A 3D-tilted infinite marquee with depth-of-field blur on items rolling toward the horizon. The strip is perspective-transformed via `rotateY` and `rotateX`, and items fade at the edges via `fadeColor`.

## Install

```bash
shadcn add @remocn/perspective-marquee
```

Lands at `components/remocn/perspective-marquee.tsx`.

## Props

| Prop | Type | Default |
|---|---|---|
| `items` | `string[]` | `DEFAULT_ITEMS` |
| `fontSize` | `number` | `84` |
| `color` | `string` | `"#fafafa"` |
| `fontWeight` | `number` | `700` |
| `pixelsPerFrame` | `number` | `2` |
| `rotateY` | `number` | `-28` |
| `rotateX` | `number` | `8` |
| `perspective` | `number` | `1200` |
| `fadeColor` | `string` | `"#050505"` |
| `speed` | `number` | `1` |

## Example

```tsx
<PerspectiveMarquee items={["Ship", "Build", "Animate", "Repeat"]} rotateY={-28} rotateX={8} />
```

## Use when

- A dark, cinematic background treatment is needed with text rolling into a 3D vanishing point.
- Feature names, brand words, or a tagline list should scroll with depth and atmosphere rather than flat.
- The scene calls for a premium looping background element that holds for 4–8 seconds without feeling static.

## Don't use when

- A flat, 2D looping ticker is sufficient — use `infinite-marquee` for a simpler, lighter strip with no perspective transform.
- The marquee should stop or the words should land on a specific item — both marquee components loop indefinitely; compose a `Sequence` with a static component for a hold state.
- The background is light-colored — the default `fadeColor="#050505"` creates edge fades tuned for dark scenes; adapt carefully or use `infinite-marquee` on light backgrounds.
