# tool-menu-slide-in

**Tier:** `remocn` (animation) · **Vibe:** tech · **Natural length:** 180f @ 30fps

A glass tool palette whips up from below the editor canvas while its icons pop in with a stagger. The panel spring-enters from the bottom; each icon slot fades and scales in sequentially, conveying a contextual AI or editing toolbar appearing in response to a user action.

## Install

```bash
shadcn add @remocn/tool-menu-slide-in
```

Lands at `components/remocn/tool-menu-slide-in.tsx`.

## Props

| Prop | Type | Default |
|---|---|---|
| `panelStartFrame` | `number` | `18` |
| `iconStagger` | `number` | `4` |
| `iconCount` | `number` | `5` |
| `accent` | `string` | `"#a78bfa"` |
| `panelColor` | `string` | `"rgba(18, 18, 22, 0.72)"` |
| `iconBg` | `string` | `"rgba(255,255,255,0.06)"` |
| `speed` | `number` | `1` |

## Example

```tsx
<ToolMenuSlideIn panelStartFrame={18} />
```

## Use when

- Demoing an AI-powered editor or design tool where a contextual action bar appears after a selection.
- A product walkthrough needs to show a floating toolbar revealing options without a screen recording.
- You want to convey "smart suggestions surface in context" as a UI capability beat.

## Don't use when

- The interaction is a file being dropped into a zone — use `drag-and-drop-flow` instead.
- You need to show data flowing between system components — use `data-flow-pipes` instead.
- The toolbar content needs to be readable/labeled; `iconCount` renders placeholder icons only — pair with a custom composition if label fidelity is required.
