# code-accordion

**Tier:** `remocn` (animation) · **Vibe:** tech · **Natural length:** 150f @ 30fps

A code window that springs a range of lines closed and replaces them with a "N lines collapsed" placeholder. The collapse is a spring animation that visually folds the selected line range, directing viewer attention to the lines that remain visible.

## Install

```bash
shadcn add @remocn/code-accordion
```

Lands at `components/remocn/code-accordion.tsx`.

## Props

| Prop | Type | Default |
|---|---|---|
| `lines` | `string[]` | `DEFAULT_LINES` |
| `collapseRange` | `[number, number]` | `[3, 14]` |
| `collapseAt` | `number` | `30` |
| `title` | `string` | `"process-orders.ts"` |
| `fontSize` | `number` | `16` |
| `width` | `number` | `720` |
| `cardColor` | `string` | `"#0a0a0a"` |
| `textColor` | `string` | `"#e4e4e7"` |
| `mutedColor` | `string` | `"#52525b"` |
| `speed` | `number` | `1` |

## Example

```tsx
<CodeAccordion lines={DEFAULT_LINES} />
```

## Use when

- Demoing a refactor or AI edit where boilerplate collapses to focus on the changed lines.
- A code walkthrough scene needs to zoom into a specific function without leaving the file context.
- You want the "IDE feel" of folding implementation details while keeping the file header visible.

## Don't use when

- You want to show a before/after diff between two versions of a file — use `code-diff-wipe` instead.
- You need a static, premium-looking code display without any collapse interaction — use `glass-code-block` instead.
- The file is short enough to show entirely; collapsing only 1–2 lines looks trivial.
