# strikethrough-replace

**Tier:** `remocn` (animation) · **Vibe:** clean · **Natural length:** 120f @ 30fps

Draws a strike line across the `from` text, then fades the `to` text in beneath it — the visual grammar of editorial correction or a before/after reveal. The strike line color (`lineColor`) defaults to red-orange for maximum contrast.

## Install

```bash
shadcn add @remocn/strikethrough-replace
```

Lands at `components/remocn/strikethrough-replace.tsx`.

## Props

| Prop | Type | Default |
|---|---|---|
| `from` | `string` | required |
| `to` | `string` | required |
| `lineColor` | `string` | `"#ff5e3a"` |
| `fontSize` | `number` | `48` |
| `color` | `string` | `"#171717"` |
| `fontWeight` | `number` | `600` |
| `speed` | `number` | `1` |

## Example

```tsx
<StrikethroughReplace from="Manual video editing" to="One-click export" lineColor="#ff5e3a" fontSize={48} />
```

## Use when

- Showing a problem being replaced by a solution — the strike communicates "we are crossing this out intentionally."
- A pricing or comparison slide needs to visually cross out the old value before the new one appears.
- You want editorial correction language: old thinking struck through, new thinking revealed below.

## Don't use when

- You only need to bring text in for the first time with no "old" text to cross out — this is a two-text replacement, not a plain entrance; use `staggered-fade-up` or `soft-blur-in` instead.
- The transition should feel smooth and spatial rather than editorial — use `shared-axis-y` or `shared-axis-z` for a clean A→B swap without the struck-out narrative.
- Both texts are long — the struck-out line becomes hard to read at small sizes and the animation runs to 120f; keep `from` and `to` short for legibility.
