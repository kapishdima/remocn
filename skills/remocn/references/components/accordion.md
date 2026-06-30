# accordion

**Tier:** `remocn-ui` (primitive) · **Vibe:** clean · **Natural length:** 120f @ 30fps

A disclosure whose opened/closed state is a pure function of the timeline; the panel reveal, chevron rotation, and background are keyframed presets.

## Install

```bash
shadcn add @remocn/accordion
```

Lands at `components/remocn/accordion.tsx`. Pulls `@remocn/remocn-ui` automatically.

## Props

| Prop | Type | Default |
|---|---|---|
| `state` | `AccordionState` | `"closed"` |
| `style` | `AccordionStyle` | — |
| `title` | `string` | `"Is it accessible?"` |
| `content` | `string` | `"Yes. It adheres to the WAI-ARIA design pattern."` |
| `contentHeight` | `number` | `64` |
| `variant` | `AccordionVariant` | `"default"` |
| `theme` | `Partial<RemocnTheme>` | — |

## Example

```tsx
<Accordion state="closed" title="What's included?" content="All features, no limits." />
```

## Use when

- Showing a collapsible FAQ or settings section expanding on a timeline cue.
- Demonstrating the open/close interaction of a disclosure pattern in a product demo.
- Composing multiple staggered reveals where each panel opens at a different `from` frame.

## Don't use when

- The content is always visible — there is no collapse state; lay it out statically instead.
- You need a flyout triggered from a button — use `dropdown-menu` instead.
- The reveal wraps arbitrary JSX children rather than a string — use `blur-in` to wrap any node.
