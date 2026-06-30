# inline-highlight

**Tier:** `remocn` (animation) · **Vibe:** clean · **Natural length:** 90f @ 30fps

Animates a single word inside a sentence from a base color to a brand highlight color. The surrounding text is static; only the target word transitions, with no background block or underline.

## Install

```bash
shadcn add @remocn/inline-highlight
```

Lands at `components/remocn/inline-highlight.tsx`.

## Props

| Prop | Type | Default |
|---|---|---|
| `before` | `string` | required |
| `highlight` | `string` | required |
| `after` | `string` | `""` |
| `baseColor` | `string` | `"#171717"` |
| `highlightColor` | `string` | `"#ff5e3a"` |
| `fontSize` | `number` | `48` |
| `fontWeight` | `number` | `600` |
| `speed` | `number` | `1` |

## Example

```tsx
<InlineHighlight before="Build videos" highlight="faster" after="with Remotion." />
```

## Use when

- One keyword inside a sentence needs to draw attention through a color shift without any background decoration.
- The text is already visible and a subtle emphasis beat is needed mid-scene, not a full entrance.
- Clean, minimal brand-color callout is required — no physical marker, no underline, just the color pop.

## Don't use when

- You want a physical drawn marker or filled background behind the word — use `marker-highlight` for a visible paint-stroke effect instead.
- The entire sentence is new and needs to enter — this component is for emphasis within existing text, not a reveal; use `mask-reveal-up` or `per-word-crossfade` for full entrances.
- Multiple words across the sentence need to highlight in sequence — this highlights one span; compose multiple `Sequence`-wrapped instances or use `kinetic-center-build` for a word-by-word build.
