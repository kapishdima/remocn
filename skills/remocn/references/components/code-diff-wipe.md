# code-diff-wipe

**Tier:** `remocn` (animation) · **Vibe:** tech · **Natural length:** 120f @ 30fps

Before/after code reveal via clip-path wipe with a handle marker. The "before" code is visible initially; a vertical wipe driven by `interpolate` reveals the "after" version from left to right, with an optional draggable-looking handle bar at the transition boundary.

## Install

```bash
shadcn add @remocn/code-diff-wipe
```

Lands at `components/remocn/code-diff-wipe.tsx`.

## Props

| Prop | Type | Default |
|---|---|---|
| `before` | `string` | `DEFAULT_BEFORE` |
| `after` | `string` | `DEFAULT_AFTER` |
| `language` | `string` | `"tsx"` |
| `background` | `string` | `"#0a0a0a"` |
| `accent` | `string` | `"#0ea5e9"` |
| `transitionStart` | `number` | `20` |
| `transitionDuration` | `number` | `60` |
| `showHandle` | `boolean` | `true` |
| `speed` | `number` | `1` |

## Example

```tsx
<CodeDiffWipe before={DEFAULT_BEFORE} />
```

## Use when

- Showing an AI-assisted code transformation — old implementation wipes away to reveal the rewritten version.
- Demoing a migration or upgrade (e.g., class component → hook, REST → tRPC) in a single scene.
- A changelog or release video needs a visceral "out with the old, in with the new" moment.

## Don't use when

- You want to collapse/fold part of a file to focus attention — use `code-accordion` instead.
- Both before and after are identical or near-identical; the wipe adds no information — use `glass-code-block` for static display.
- The files are too long to compare at a readable font size; consider using `terminal-simulator` to show a patch being applied instead.
