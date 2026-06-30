# marker-highlight

**Tier:** `remocn` (animation) · **Vibe:** playful · **Natural length:** 90f @ 30fps

A colored marker block animates behind a phrase as the text color shifts — the fill draws from left to right like a physical highlighter pen passing over the words.

## Install

```bash
shadcn add @remocn/marker-highlight
```

Lands at `components/remocn/marker-highlight.tsx`.

## Props

| Prop | Type | Default |
|---|---|---|
| `before` | `string` | `""` |
| `highlight` | `string` | required |
| `after` | `string` | `""` |
| `markerColor` | `string` | `"#facc15"` |
| `baseColor` | `string` | `"#171717"` |
| `highlightedTextColor` | `string` | `"#171717"` |
| `fontSize` | `number` | `72` |
| `fontWeight` | `number` | `600` |
| `speed` | `number` | `1` |

## Example

```tsx
<MarkerHighlight before="The" highlight="fastest" after="way to ship." markerColor="#facc15" />
```

## Use when

- A key phrase inside a sentence needs a physical, hand-drawn-feeling highlight that visually underscores the word.
- A playful or educational tone is appropriate and the visible paint stroke adds expressive energy.
- The brand color should appear as a background fill rather than a text color shift.

## Don't use when

- You want a subtle color-only emphasis with no visible background — use `inline-highlight` for a clean color-shift with no marker block.
- The entire sentence is new text that needs to enter the scene — both highlight components are emphasis tools, not entrances; use `mask-reveal-up` or `per-word-crossfade` for full reveals.
- The scene tone is minimal or premium and a bold painted marker would clash — use `inline-highlight` for a quieter callout.
