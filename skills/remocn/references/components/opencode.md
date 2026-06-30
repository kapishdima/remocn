# opencode

**Tier:** `remocn` (animation) · **Vibe:** tech · **Natural length:** 150f @ 30fps

Animated OpenCode TUI welcome screen — a two-tone wordmark, an input box with a blue accent bar that types a query, a model status line, and command hints. Dark/light themes.

## Install

```bash
shadcn add @remocn/opencode
```

Lands at `components/remocn/opencode.tsx`. Pulls `@remocn/caret`, `@remocn/remocn-ui` automatically.

## Props

| Prop | Type | Default |
|---|---|---|
| `placeholder` | `string` | `"Ask anything... "` |
| `query` | `string` | `'"What is the tech stack of this project?"'` |
| `agentName` | `string` | `"Build"` |
| `modelName` | `string` | `"Kimi K2.5"` |
| `provider` | `string` | `"Moonshot AI"` |
| `accentColor` | `string` | `"#2B7FFF"` |
| `speed` | `number` | `1` |

## Example

```tsx
<OpenCode query='"What is the tech stack of this project?"' modelName="Kimi K2.5" />
```

## Use when

- Depicting the OpenCode TUI as a recognizable branded surface in a dev-tool demo.
- A coding-agent query should type itself into the authentic welcome screen with model/provider context.
- The scene wants a terminal-UI card rather than a raw shell.

## Don't use when

- You're depicting a different product — use the matching card (`claude-code`, `v0`, `chat-gpt`, `claude-chat`).
- You need a generic, unbranded terminal — use `terminal-simulator`.
- You only need a typed line with a cursor and no app chrome — use `typewriter`.
