# remocn-ui (core library)

**Tier:** `remocn-ui` (shared core) · Not a visual component.

The shared core lib behind the UI Primitives tier: the timeline-fold hook (maps a keyframed preset to the current frame), theme context (`RemocnTheme`), and color math. Most UI Primitives (`button`, `dialog`, `select`, `command-menu`, `tooltip`, …) depend on it.

## Install

```bash
shadcn add @remocn/remocn-ui
```

You rarely install it directly — it is pulled transitively as a `registryDependency` whenever you add a primitive that needs it.

## Use when

- You are building your own timeline-driven primitive and want the shared fold hook / theme context instead of re-implementing them.

## Don't use when

- You just want to use an existing primitive — add the primitive (`shadcn add @remocn/<name>`); this lib comes along automatically.
- You are in the animation tier (`remocn`) — those components are frame-driven and don't need it.
