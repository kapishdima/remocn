# chat-gpt

**Tier:** `remocn` (animation) · **Vibe:** tech · **Natural length:** 150f @ 30fps

Animated ChatGPT composer — types a prompt into the pill input, the blue voice button morphs into a send button, and the suggestion chips fade out. Light/dark themes. Mimics the ChatGPT web interface chrome exactly.

## Install

```bash
shadcn add @remocn/chat-gpt
```

Lands at `components/remocn/chat-gpt.tsx`. Pulls `@remocn/caret`, `@remocn/remocn-ui` automatically.

## Props

| Prop | Type | Default |
|---|---|---|
| `greeting` | `string` | `"What's on your mind today?"` |
| `placeholder` | `string` | `"Ask anything"` |
| `prompt` | `string` | `"Make a sunset over a calm ocean"` |
| `accentColor` | `string` | `"#2F6FED"` |
| `speed` | `number` | `1` |

## Example

```tsx
<ChatGpt greeting="What's on your mind today?" />
```

## Use when

- Announcing a ChatGPT integration or GPT-powered feature where the OpenAI brand must be recognizable.
- Showing a prompt-to-result workflow where the ChatGPT interface is the entry point.
- A comparison video contrasts multiple AI products — use this for the ChatGPT card, `claude-chat` for Claude.

## Don't use when

- The product being demoed is Claude — use `claude-chat` instead to match Anthropic's UI and warm color palette.
- The product is Vercel's v0 — use `v0` instead, which replicates the v0 dark textarea and mic-to-send morph.
- The product is a CLI/terminal AI agent — use `claude-code` or `opencode` instead.
