# radio

**Tier:** `remocn-ui` (primitive) · **Vibe:** clean · **Natural length:** 120f @ 30fps

Radio button whose checked/unchecked state is a pure function of the timeline; the ring border and inner dot pop are keyframed presets.

## Install

```bash
shadcn add @remocn/radio
```

Lands at `components/remocn/radio.tsx`. Pulls `@remocn/remocn-ui` automatically.

## Props

| Prop | Type | Default |
|---|---|---|
| `state` | `RadioState` | `"unchecked"` |
| `style` | `RadioStyle` | — |
| `label` | `string` | — |
| `size` | `RadioSize` | `"default"` |
| `theme` | `Partial<RemocnTheme>` | — |
| `primary` | `string` | — |

## Example

```tsx
<Radio state="unchecked" label="Monthly billing" />
```

## Use when

- Demonstrating a single-choice selection moment in a form walkthrough.
- Animating a user choosing between two or more mutually exclusive options.
- Pairing with `cursor` to show a click-and-select interaction on the timeline.

## Don't use when

- The control is binary on/off — use `switch` instead (sliding thumb reads more naturally for toggles).
- You need a multi-select where several options can be active — use `checkbox` instead.
- Options switch with a continuous sliding indicator between segments — use `toggle-group` instead.
