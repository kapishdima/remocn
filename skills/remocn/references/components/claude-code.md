# claude-code

**Tier:** `remocn` (animation) · **Vibe:** tech · **Natural length:** 160f @ 30fps

Animated Claude Code CLI welcome screen — a terminal window with a dashed welcome box, recent-activity and what's-new panels, and a prompt line that types a command with a block cursor. Dark/light themes.

## Install

```bash
shadcn add @remocn/claude-code
```

Lands at `components/remocn/claude-code.tsx`. Pulls `@remocn/caret`, `@remocn/remocn-ui` automatically.

## Props

| Prop | Type | Default |
|---|---|---|
| `title` | `string` | `"Claude Code v2.0.0"` |
| `userName` | `string` | `"Meaghan"` |
| `model` | `string` | `"Opus 4.8 • Max 20x"` |
| `cwd` | `string` | `"/users/meaghan/code/apps"` |
| `placeholder` | `string` | `'Try "edit <filepath> to ..."'` |
| `prompt` | `string` | `"edit src/theme.ts to add a dark mode toggle"` |
| `accentColor` | `string` | `"#D97757"` |
| `speed` | `number` | `1` |

## Example

```tsx
<ClaudeCode title="Claude Code v2.0.0" prompt="edit src/theme.ts to add a dark mode toggle" />
```

## Use when

- Depicting a Claude Code / agentic-CLI workflow as a recognizable branded surface in a dev-tool demo.
- You want a coding-agent prompt to type itself out with the authentic welcome-screen chrome.
- The scene calls for a terminal-app card rather than a raw shell — recent-activity and what's-new panels carry product context.

## Don't use when

- You need a generic, unbranded terminal — use `terminal-simulator`.
- You're depicting a different product's UI — use the matching card (`opencode`, `v0`, `chat-gpt`, `claude-chat`).
- You only need a typed command line with a cursor and no app frame — use `typewriter` over a plain surface.
