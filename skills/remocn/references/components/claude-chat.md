# claude-chat

**Tier:** `remocn` (animation) · **Vibe:** tech · **Natural length:** 150f @ 30fps

Animated Claude chat input — types a prompt character-by-character and the waveform button morphs into a terracotta send button the moment text appears. Warm light/dark themes matching Anthropic's design language exactly.

## Install

```bash
shadcn add @remocn/claude-chat
```

Lands at `components/remocn/claude-chat.tsx`. Pulls `@remocn/caret`, `@remocn/remocn-ui` automatically.

## Props

| Prop | Type | Default |
|---|---|---|
| `greeting` | `string` | — |
| `placeholder` | `string` | `"Try: draft an email · summarize a doc · plan your…` |
| `prompt` | `string` | `"Draft a launch tweet for our new release"` |
| `modelName` | `string` | `"Opus 4.8"` |
| `modelTier` | `string` | `"Max"` |
| `accentColor` | `string` | `"#D97757"` |
| `speed` | `number` | `1` |

## Example

```tsx
<ClaudeChat placeholder="Try: draft an email · summarize a doc · plan your… />
```

## Use when

- Announcing a Claude integration or Anthropic-powered feature where the Claude brand must be visible.
- Showcasing a prompt workflow where claude.ai is the UI surface — the warm terracotta accent is the brand signal.
- A multi-AI comparison video needs the Claude card alongside `chat-gpt` and `v0`.

## Don't use when

- The product is Claude Code CLI — use `claude-code` instead, which shows the terminal welcome screen with `cwd` and agent context.
- The product is ChatGPT — use `chat-gpt` instead for the correct pill-input and blue accent.
- The integration is with OpenCode's TUI — use `opencode` instead.
