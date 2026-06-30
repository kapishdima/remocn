# infinite-marquee

**Tier:** `remocn` (animation) · **Vibe:** clean · **Natural length:** 180f @ 30fps

Seamlessly looping horizontal text strip driven by `pixelsPerFrame`, with an optional outline/stroke style. The strip never enters or exits — it loops for the entire clip duration.

## Install

```bash
shadcn add @remocn/infinite-marquee
```

Lands at `components/remocn/infinite-marquee.tsx`.

## Props

| Prop | Type | Default |
|---|---|---|
| `text` | `string` | `"ship · build · animate · "` |
| `fontSize` | `number` | `120` |
| `color` | `string` | `"#171717"` |
| `fontWeight` | `number` | `900` |
| `pixelsPerFrame` | `number` | `4` |
| `stroke` | `boolean` | `false` |
| `strokeColor` | `string` | `"#171717"` |
| `speed` | `number` | `1` |

## Example

```tsx
<InfiniteMarquee text="ship · build · animate · " fontSize={120} />
```

## Use when

- A scene needs ambient motion in the background or as a decorative band between sections.
- Looping brand words, feature names, or a tagline should scroll continuously without a defined start/end.
- A ticker-style lower-third or full-bleed text treatment is required for the full clip duration.

## Don't use when

- The text should enter, hold, then exit — that is a reveal animation, not a ticker; use `blur-out-up` or `mask-reveal-up` instead.
- You need 3D perspective depth on the scrolling strip — use `perspective-marquee` for a tilted, depth-of-field version.
- The marquee should stop or snap to a specific word — this component loops forever with no hold state; compose a `Sequence` with a static slide instead.
