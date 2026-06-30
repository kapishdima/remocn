# per-word-crossfade

**Tier:** `remocn` (animation) · **Vibe:** clean · **Natural length:** 90f @ 30fps

Words gently fade into place one after another with a short vertical drift, replacing the outgoing text in a calm keynote rhythm. Both the outgoing and incoming text animate at the word level.

## Install

```bash
shadcn add @remocn/per-word-crossfade
```

Lands at `components/remocn/per-word-crossfade.tsx`.

## Props

| Prop | Type | Default |
|---|---|---|
| `fromText` | `string` | required |
| `toText` | `string` | required |
| `fontSize` | `number` | `72` |
| `color` | `string` | `"#171717"` |
| `fontWeight` | `number` | `600` |
| `speed` | `number` | `1` |

## Example

```tsx
<PerWordCrossfade fromText="Fast to build." toText="Easy to ship." fontSize={72} />
```

## Use when

- Two short phrases need to swap with a soft, word-by-word transition that reads as calm and composed.
- A keynote-style slide replacement is needed — the sequential word drift matches presentation pacing.
- The A→B content change should feel deliberate but unhurried, with the crossfade reinforcing continuity.

## Don't use when

- The transition should be a single-block fade with no word-level staging — use `fade-through` for a unified opacity swap instead.
- You want the incoming words to build upward or slide in rather than drift-and-fade — use `line-by-line-slide` or `mask-reveal-up` for directional entrances.
- There is no outgoing text (first entrance only) — use `micro-scale-fade` or `per-character-rise` for a standalone reveal without a `fromText`.
