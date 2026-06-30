# short-slide-down

**Tier:** `remocn` (animation) · **Vibe:** clean · **Natural length:** 60f @ 30fps

Each new word drops in from above into its own line and pushes the stack downward until a centered multi-line composition locks in place. Fast and compositional — the viewer watches the layout build word-by-word.

## Install

```bash
shadcn add @remocn/short-slide-down
```

Lands at `components/remocn/short-slide-down.tsx`.

## Props

| Prop | Type | Default |
|---|---|---|
| `text` | `string` | required |
| `entryOffset` | `number` | `28` |
| `fontSize` | `number` | `72` |
| `color` | `string` | `"#171717"` |
| `fontWeight` | `number` | `600` |
| `speed` | `number` | `1` |

## Example

```tsx
<ShortSlideDown text="Ship your demo video today." entryOffset={28} fontSize={72} />
```

## Use when

- A multi-word headline should build its layout visibly — each word stacking to create a composed block.
- The scene is short and you need a fast (60f) entrance that still feels structured.
- You want vertical motion on entrance without a transition between two different texts.

## Don't use when

- You are swapping between two text values — use `shared-axis-y` which handles the outgoing text exit properly.
- The text is a single word or short phrase that doesn't benefit from a stacking effect — use `scale-down-fade` or `soft-blur-in` for a cleaner single-unit entrance.
- You want horizontal entry motion — use `short-slide-right` for a left-to-right glide instead.
