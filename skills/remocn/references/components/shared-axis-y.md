# shared-axis-y

**Tier:** `remocn` (animation) · **Vibe:** clean · **Natural length:** 90f @ 30fps

Per-word hard-cut transition that swaps two text values with staircase timing along the vertical axis. The outgoing text exits upward word-by-word while the incoming text drops in, creating a sharp editorial swap with zero blur.

## Install

```bash
shadcn add @remocn/shared-axis-y
```

Lands at `components/remocn/shared-axis-y.tsx`.

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
<Sequence from={0} durationInFrames={90}>
  <SharedAxisY fromText="Before launch" toText="After launch" />
</Sequence>
<Sequence from={90} durationInFrames={90}>
  <SharedAxisY fromText="After launch" toText="Coming soon" />
</Sequence>
```

## Use when

- Swapping two text values in a slide-deck style transition (A → B → C chained in `<Sequence>`).
- You want a crisp, editorial replacement without blur or scale — vertical word-by-word staircase reads as confident.
- The outgoing and incoming phrases are thematically related (before/after, old/new, step N / step N+1).

## Don't use when

- You only need to bring text in for the first time with no outgoing content — use `short-slide-down` or `staggered-fade-up` for a clean entrance instead.
- You want a depth or focus-shift feel between two contexts — use `shared-axis-z` which scales rather than slides for that spatial metaphor.
- The transition should feel playful or bouncy — the hard-cut staircase is intentionally sharp; use `spring-scale-in` for a springy swap.
