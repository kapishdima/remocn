# terminal-simulator

**Tier:** `remocn` (animation) · **Vibe:** tech · **Natural length:** 240f @ 30fps

Terminal window that types out commands and rolls old lines off the top. Each line appears via a character-by-character type simulation; when the buffer fills, old lines scroll off as an instant step-function jump — never eased — matching real terminal behavior.

## Install

```bash
shadcn add @remocn/terminal-simulator
```

Lands at `components/remocn/terminal-simulator.tsx`.

## Props

| Prop | Type | Default |
|---|---|---|
| `lines` | `TerminalLine[]` | `DEFAULT_LINES` |
| `prompt` | `string` | `"$"` |
| `title` | `string` | `"~/projects/remocn"` |
| `background` | `string` | `"#0a0a0a"` |
| `chromeColor` | `string` | `"#1a1a1a"` |
| `fontSize` | `number` | `18` |
| `charsPerFrame` | `number` | `1` |
| `chunkSize` | `number` | `1` |
| `speed` | `number` | `1` |

## Example

```tsx
<TerminalSimulator lines={DEFAULT_LINES} />
```

## Use when

- Demoing a CLI tool install sequence (`npm install`, `npx shadcn add`, build output).
- Showing an AI agent or script executing a multi-step task in a terminal session.
- A developer tool launch video needs the authentic feel of commands running and output streaming.

## Don't use when

- You only need to type a single short string — use `typewriter` instead, which is lighter and pairs with any layout.
- The code should be displayed as a formatted, highlighted editor window — use `glass-code-block` instead.
