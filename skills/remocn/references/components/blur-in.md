# blur-in

**Tier:** `remocn-ui` (primitive) · **Vibe:** premium · **Natural length:** 120f @ 30fps

A wrapper that reveals a single child with blur + opacity + a directional offset; a pure state atom, theme-independent — its context is a motion config (blur/distance/axis), not a theme.

## Install

```bash
shadcn add @remocn/blur-in
```

Lands at `components/remocn/blur-in.tsx`. Pulls `@remocn/remocn-ui` automatically.

## Props

| Prop | Type | Default |
|---|---|---|
| `state` | `BlurInState` | `"hidden"` |
| `style` | `BlurInStyle` | — |
| `children` | `ReactNode` | required |
| `blur` | `number` | `8` |
| `direction` | `BlurInDirection` | `"up"` |
| `distance` | `number` | `12` |
| `display` | `CSSProperties["display"]` | `"inline-block"` |

## Example

```tsx
<BlurIn state="hidden" blur={12} direction="up" distance={16}>
  <Scene />
</BlurIn>
```

## Use when

- Revealing an arbitrary JSX subtree (card, image, composed scene) with a premium blur entrance.
- Wrapping a UI primitive whose own `state` prop doesn't expose blur-in as an option.
- Staggering multiple child elements into view by rendering each in its own `<BlurIn>` at offset frames.

## Don't use when

- You're animating a text-only line — use a purpose-built text reveal (`soft-blur-in`, `staggered-fade-up`) instead of wrapping raw text.
- The child is a remocn-ui primitive that already exposes a `state` prop with its own entrance — animate via `state` directly.
- You need a full-opacity slide with no blur — use the component's own directional offset or a translation interpolation.
