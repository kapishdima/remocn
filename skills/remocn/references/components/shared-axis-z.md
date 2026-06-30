# shared-axis-z

**Tier:** `remocn` (animation) · **Vibe:** clean · **Natural length:** 90f @ 30fps

Scale-based shared-axis transition: the outgoing text shrinks away while the incoming text grows into full size, simulating a camera push or focus shift along the Z axis.

## Install

```bash
shadcn add @remocn/shared-axis-z
```

Lands at `components/remocn/shared-axis-z.tsx`.

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
  <SharedAxisZ fromText="The problem" toText="The solution" />
</Sequence>
<Sequence from={90} durationInFrames={90}>
  <SharedAxisZ fromText="The solution" toText="Ship it." />
</Sequence>
```

## Use when

- Conveying a zoom-in narrative: moving from a broad context to a focused point.
- Transitioning between two text values where the second is a more specific or deeper layer of the first.
- Chaining multiple topic shifts in a `<Sequence>` where each swap should feel like a camera push forward.

## Don't use when

- The swap is a lateral topic change with no depth relationship — use `shared-axis-y` for a horizontal-edit-style cut instead.
- You only need to bring text in for the first time with no outgoing content — use `scale-down-fade` or `soft-blur-in` for a single-text entrance.
- The scene already has a lot of scale motion and you need variety — mix in `shared-axis-y` to alternate the spatial grammar.
