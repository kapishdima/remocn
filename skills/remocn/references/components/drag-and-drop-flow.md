# drag-and-drop-flow

**Tier:** `remocn` (animation) · **Vibe:** tech · **Natural length:** 150f @ 30fps

Simulated file drag into a dropzone followed by upload progress. A file card glides from outside the frame into a highlighted dropzone; the zone accepts it and a progress bar fills to completion.

## Install

```bash
shadcn add @remocn/drag-and-drop-flow
```

Lands at `components/remocn/drag-and-drop-flow.tsx`.

## Props

| Prop | Type | Default |
|---|---|---|
| `accent` | `string` | `"#0ea5e9"` |
| `dropzoneLabel` | `string` | `"Drop file to upload"` |
| `fileName` | `string` | `"design.fig"` |
| `speed` | `number` | `1` |

## Example

```tsx
<DragAndDropFlow accent="#0ea5e9" />
```

## Use when

- Demoing a file upload or import feature in a product walkthrough scene.
- A storage, design tool, or document platform needs to show its drag-and-drop UX without screen recording.
- You want to convey "just drop your file" ease-of-use in a marketing video beat.

## Don't use when

- The interaction you're demoing involves multiple tools or a palette — use `tool-menu-slide-in` to show a UI control surface instead.
- You need to show data moving between services (not a user-facing gesture) — use `data-flow-pipes` instead.
- The upload involves selecting from a dialog rather than dragging; simulate that interaction in `terminal-simulator` or use a screenshot overlay.
