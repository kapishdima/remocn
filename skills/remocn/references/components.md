# remocn Component Reference

Complete catalog of the remocn registry. Install any component (namespaced shadcn registry):

```bash
shadcn add @remocn/<name>
```

Components land in `components/remocn/<name>.tsx` — you own the code. Many pull others via `registryDependencies` (auto-installed); the shared core lib is **`@remocn/remocn-ui`**.

Source of truth for this list: `public/r/registry.json`. Props/defaults below are taken from each component's `index.tsx`.

**Canvas standard:** `1280×720 @ 30fps`. The `*Nf @ 30fps · vibe: …*` line under each component is its
natural length in frames (budget your `<Sequence durationInFrames>` around it so the animation
isn't clipped) and a tone tag (`tech` · `premium` · `data` · `clean` · `playful` · `social`) to
help match brand voice. Palette and fonts: `design.md` → tokens.

---

## UI Primitives

Timeline-driven shadcn-style primitives rendered to video. Different API than the animation tier: state-based (`state`, `style`, `variant`), **no `speed` prop**. Most depend on the `@remocn/remocn-ui` core lib.

### accordion

A disclosure whose opened/closed state is a pure function of the timeline; the panel reveal, chevron, and background are keyframed presets.

*120f @ 30fps · vibe: clean*

Dependencies: `@remocn/remocn-ui`

```tsx
<Accordion state="closed" />
```

| Prop | Type | Default |
|---|---|---|
| `state` | `AccordionState` | `"closed"` |
| `style` | `AccordionStyle` | — |
| `title` | `string` | `"Is it accessible?"` |
| `content` | `string` | `"Yes. It adheres to the WAI-ARIA design pattern."` |
| `contentHeight` | `number` | `64` |
| `variant` | `AccordionVariant` | `"default"` |
| `theme` | `Partial<RemocnTheme>` | — |

### ai-prompt-flow

An AI prompt composition: a prompt types into the field, the Generate button runs hover → press → loading, a skeleton shimmer reveals, then crossfades into the generated answer, and a ready toast slides in. A pure orchestrator — the shimmer is owned by the skeleton-block motion atom; every other channel comes from a composed primitive's hook.

*vibe: clean*

Dependencies: `@remocn/remocn-ui`, `@remocn/input`, `@remocn/button`, `@remocn/skeleton`, `@remocn/skeleton-block`, `@remocn/toast`

```tsx
<AiPromptFlow prompt="Summarize this thread" />
```

| Prop | Type | Default |
|---|---|---|
| `prompt` | `string` | `"Summarize this thread"` |
| `buttonLabel` | `string` | `"Generate"` |
| `answerLines` | `string[]` | `DEFAULT_ANSWER` |
| `toastTitle` | `string` | `"Response ready"` |
| `theme` | `Partial<RemocnTheme>` | — |

### alert-dialog

A modal alert dialog whose opened/closed state is a pure function of the timeline; the backdrop dim and popup zoom are keyframed presets. Self-contained — pair it with the Button as a trigger (see the example).

*120f @ 30fps · vibe: clean*

Dependencies: `@remocn/remocn-ui`

```tsx
<AlertDialog state="closed" />
```

| Prop | Type | Default |
|---|---|---|
| `state` | `AlertDialogState` | `"closed"` |
| `style` | `AlertDialogStyle` | — |
| `title` | `string` | `"Delete account?"` |
| `description` | `string` | `"This action cannot be undone. This will permanent…` |
| `actionLabel` | `string` | `"Delete"` |
| `cancelLabel` | `string` | `"Cancel"` |
| `theme` | `Partial<RemocnTheme>` | — |

### blur-in

A wrapper that reveals a single child with blur + opacity + a directional offset; a pure state atom, theme-independent — its context is a motion config (blur/distance/axis), not a theme.

*120f @ 30fps · vibe: premium*

Dependencies: `@remocn/remocn-ui`

```tsx
<BlurIn children={<Scene />} state="hidden" />
```

| Prop | Type | Default |
|---|---|---|
| `state` | `BlurInState` | `"hidden"` |
| `style` | `BlurInStyle` | — |
| `children` | `ReactNode` | required |
| `blur` | `number` | `8` |
| `direction` | `BlurInDirection` | `"up"` |
| `distance` | `number` | `12` |
| `display` | `CSSProperties["display"]` | `"inline-block"` |

### button

A button whose idle/hover/press/loading/success state is a pure function of the timeline; the loading state composes the Spinner motion atom.

*120f @ 30fps · vibe: clean*

Dependencies: `@remocn/remocn-ui`, `@remocn/spinner`

```tsx
<Button state="idle" />
```

| Prop | Type | Default |
|---|---|---|
| `state` | `ButtonState` | `"idle"` |
| `style` | `ButtonStyle` | — |
| `label` | `string` | `"Continue"` |
| `variant` | `ButtonVariant` | `"default"` |
| `size` | `ButtonSize` | `"default"` |
| `theme` | `Partial<RemocnTheme>` | — |
| `primary` | `string` | — |
| `speed` | `number` | `1` |
| `align` | `"start" \| "center" \| "end"` | `"center"` |

### caret

A blinking text caret — a controlled vertical bar, or a pure motion atom that blinks deterministically from useCurrentFrame.

*120f @ 30fps · vibe: tech*

```tsx
<Caret color="currentColor" />
```

| Prop | Type | Default |
|---|---|---|
| `color` | `string` | `"currentColor"` |
| `width` | `number` | `2` |
| `height` | `number` | `18` |
| `radius` | `number` | `1` |
| `opacity` | `number` | — |
| `blink` | `boolean` | `false` |
| `blinkPerSecond` | `number` | `1` |
| `speed` | `number` | `1` |
| `marginLeft` | `number` | `0` |
| `style` | `CSSProperties` | — |

### checkbox

A checkbox whose checked/unchecked state is a pure function of the timeline; the box fill, border, and checkmark draw are keyframed presets.

*120f @ 30fps · vibe: clean*

Dependencies: `@remocn/remocn-ui`

```tsx
<Checkbox state="unchecked" />
```

| Prop | Type | Default |
|---|---|---|
| `state` | `CheckboxState` | `"unchecked"` |
| `style` | `CheckboxStyle` | — |
| `label` | `string` | — |
| `size` | `CheckboxSize` | `"default"` |
| `theme` | `Partial<RemocnTheme>` | — |
| `primary` | `string` | — |
| `align` | `"start" \| "center" \| "end"` | `"center"` |

### checkout-flow

A cursor-driven checkout card: the card and its fields blur-in, then the pointer flips a billing-cycle toggle, types a card number, ticks the terms checkbox, and presses Pay through to success, ending in a toast. A pure orchestrator — every channel comes from a composed primitive's transition hook.

*vibe: clean*

Dependencies: `@remocn/remocn-ui`, `@remocn/toggle-group`, `@remocn/input`, `@remocn/checkbox`, `@remocn/button`, `@remocn/field`, `@remocn/blur-in`, `@remocn/cursor`, `@remocn/toast`

```tsx
<CheckoutFlow title="Upgrade your plan" />
```

| Prop | Type | Default |
|---|---|---|
| `title` | `string` | `"Upgrade your plan"` |
| `description` | `string` | `"Complete your purchase to unlock every feature."` |
| `plans` | `ToggleGroupItem[]` | `DEFAULT_PLANS` |
| `cardLabel` | `string` | `"Card number"` |
| `cardPlaceholder` | `string` | `"4242 4242 4242 4242"` |
| `termsLabel` | `string` | `"I accept the terms and conditions"` |
| `payLabel` | `string` | `"Pay $49"` |
| `toastTitle` | `string` | `"Payment successful"` |
| `theme` | `Partial<RemocnTheme>` | — |

### combobox

A combobox whose opened/closed state is a pure function of the timeline; the panel fade/scale/lift are keyframed presets like select. The trigger reuses the Input presets (typed query + caret reveal via an injected inputStyle), the list is filtered by a pure case-insensitive substring on the visible query prefix, and rows reuse the SelectItem row.

*120f @ 30fps · vibe: clean*

Dependencies: `@remocn/remocn-ui`, `@remocn/input`, `@remocn/select-item`

```tsx
<Combobox state="closed" />
```

| Prop | Type | Default |
|---|---|---|
| `state` | `ComboboxState` | `"closed"` |
| `style` | `ComboboxStyle` | — |
| `query` | `string` | `""` |
| `revealCount` | `number` | — |
| `placeholder` | `string` | `"Select a fruit…"` |
| `items` | `string[]` | `["Apple", "Banana", "Orange", "Grape"]` |
| `selectedIndex` | `number` | `-1` |
| `highlightedIndex` | `number` | `-1` |
| `pressedIndex` | `number` | `-1` |
| `itemStyles` | `(SelectItemStyle \| undefined)[]` | — |
| `inputStyle` | `InputStyle` | — |
| `theme` | `Partial<RemocnTheme>` | — |

### command-menu

A ⌘K command palette whose opened/closed state is a pure function of the timeline; the panel zoom + backdrop dim are dialog-like keyframed presets. The search row reveals the typed query, the list is filtered by a pure case-insensitive substring on the visible query prefix, and rows reuse the CommandMenuItem row.

*120f @ 30fps · vibe: tech*

Dependencies: `@remocn/remocn-ui`, `@remocn/command-menu-item`

```tsx
<CommandMenu state="closed" />
```

| Prop | Type | Default |
|---|---|---|
| `state` | `CommandMenuState` | `"closed"` |
| `style` | `CommandMenuStyle` | — |
| `query` | `string` | `""` |
| `revealCount` | `number` | — |
| `items` | `CommandMenuEntry[]` | `[ { icon: "user", label: "Profile", shortcut: "⌘ P…` |
| `selectedIndex` | `number` | `-1` |
| `highlightedIndex` | `number` | `-1` |
| `pressedIndex` | `number` | `-1` |
| `itemStyles` | `(CommandMenuItemStyle \| undefined)[]` | — |
| `theme` | `Partial<RemocnTheme>` | — |

### command-menu-item

A command-palette row whose idle/hover/press/selected state is a pure function of the timeline. Leading icon + label + trailing shortcut kbd. Exports an inline CommandMenuItemRow (reused by CommandMenu) and a standalone CommandMenuItem atom; the row background, label color, and icon color are keyframed presets.

*120f @ 30fps · vibe: tech*

Dependencies: `@remocn/remocn-ui`

```tsx
<CommandMenuItemRow state="idle" />
```

| Prop | Type | Default |
|---|---|---|
| `state` | `CommandMenuItemState` | `"idle"` |
| `style` | `CommandMenuItemStyle` | — |
| `label` | `string` | — |
| `icon` | `CommandMenuIcon` | — |
| `shortcut` | `string` | — |
| `width` | `number` | `{16} height={16} viewBox="0 0 24 24" fill="none"> …` |
| `theme` | `Partial<RemocnTheme>` | — |

### context-menu

A right-click context menu whose opened/closed state is a pure function of the timeline; the panel scales from its top-left corner (the click point) with a fade + lift. No trigger — the caller positions it. Rows reuse the DropdownMenuItem row; items are plain string labels.

*120f @ 30fps · vibe: clean*

Dependencies: `@remocn/remocn-ui`, `@remocn/dropdown-menu-item`

```tsx
<ContextMenu state="closed" />
```

| Prop | Type | Default |
|---|---|---|
| `state` | `ContextMenuState` | `"closed"` |
| `style` | `ContextMenuStyle` | — |
| `items` | `string[]` | `["Back", "Reload", "Save As…", "Inspect"]` |
| `highlightedIndex` | `number` | `-1` |
| `pressedIndex` | `number` | `-1` |
| `itemStyles` | `(DropdownMenuItemStyle \| undefined)[]` | — |
| `theme` | `Partial<RemocnTheme>` | — |

### cursor

An animated cursor that moves between waypoints, clicks (ripple), and drags. The Cursor renderer is a pure function of a numeric CursorStyle channel; useCursorPath reads the frame and eases the path, ripple, and press phases.

*120f @ 30fps · vibe: clean*

Dependencies: `@remocn/remocn-ui`

```tsx
<Cursor variant="arrow" />
```

| Prop | Type | Default |
|---|---|---|
| `style` | `CursorStyle` | — |
| `variant` | `CursorVariant` | `"arrow"` |
| `size` | `number` | `28` |
| `theme` | `Partial<RemocnTheme>` | — |
| `rippleColor` | `string` | — |

### dialog

A modal dialog whose opened/closed state is a pure function of the timeline; the backdrop dim and popup zoom are keyframed presets, with a close button and a primary action. Self-contained — pair it with the Button as a trigger (see the example).

*120f @ 30fps · vibe: clean*

Dependencies: `@remocn/remocn-ui`

```tsx
<Dialog state="closed" />
```

| Prop | Type | Default |
|---|---|---|
| `state` | `DialogState` | `"closed"` |
| `style` | `DialogStyle` | — |
| `title` | `string` | `"Edit profile"` |
| `description` | `string` | `"Make changes to your profile here. Click save whe…` |
| `actionLabel` | `string` | `"Save changes"` |
| `cancelLabel` | `string` | `"Cancel"` |
| `theme` | `Partial<RemocnTheme>` | — |

### drawer

A bottom panel whose opened/closed state is a pure function of the timeline; the backdrop dim and bottom-edge slide-up are keyframed presets, with a drag handle and a primary action. Self-contained — pair it with the Button as a trigger (see the example).

*120f @ 30fps · vibe: clean*

Dependencies: `@remocn/remocn-ui`

```tsx
<Drawer state="closed" />
```

| Prop | Type | Default |
|---|---|---|
| `state` | `DrawerState` | `"closed"` |
| `style` | `DrawerStyle` | — |
| `title` | `string` | `"Edit profile"` |
| `description` | `string` | `"Make changes to your profile here. Click save whe…` |
| `actionLabel` | `string` | `"Save changes"` |
| `cancelLabel` | `string` | `"Cancel"` |
| `theme` | `Partial<RemocnTheme>` | — |

### dropdown-menu

A dropdown menu whose opened/closed state is a pure function of the timeline; the trigger reuses the Button primitive and the reveal panel composes DropdownMenuItem rows. The panel fade, scale, lift, and chevron are keyframed presets.

*120f @ 30fps · vibe: clean*

Dependencies: `@remocn/remocn-ui`, `@remocn/button`, `@remocn/dropdown-menu-item`

```tsx
<DropdownMenu state="closed" />
```

| Prop | Type | Default |
|---|---|---|
| `state` | `DropdownMenuState` | `"closed"` |
| `style` | `DropdownMenuStyle` | — |
| `label` | `string` | `"Options"` |
| `items` | `string[]` | `["Profile", "Billing", "Settings", "Log out"]` |
| `highlightedIndex` | `number` | `-1` |
| `pressedIndex` | `number` | `-1` |
| `itemStyles` | `(DropdownMenuItemStyle \| undefined)[]` | — |
| `triggerStyle` | `ButtonStyle` | — |
| `theme` | `Partial<RemocnTheme>` | — |

### dropdown-menu-item

A dropdown menu action row whose idle/hover/press state is a pure function of the timeline; the row background and label color are keyframed presets. Composed inside the DropdownMenu panel.

*120f @ 30fps · vibe: clean*

Dependencies: `@remocn/remocn-ui`

```tsx
<DropdownMenuItemRow state="idle" />
```

| Prop | Type | Default |
|---|---|---|
| `style` | `DropdownMenuItemStyle` | — |
| `state` | `DropdownMenuItemState` | `"idle"` |
| `label` | `string` | `"Profile"` |
| `width` | `number` | `ROW_WIDTH` |
| `theme` | `Partial<RemocnTheme>` | — |

### field

A static layout family for composing labeled form controls, modeled on shadcn's Field: FieldGroup ▸ Field ▸ FieldLabel / FieldControl / FieldDescription. Reads no frame and holds no state — colors come from the resolved theme. FieldControl is a relative fixed-height slot for the absolute remocn-ui controls (Input, Button).

*vibe: clean*

Dependencies: `@remocn/remocn-ui`

```tsx
<FieldGroup children={<Scene />} gap={16} />
```

| Prop | Type | Default |
|---|---|---|
| `children` | `ReactNode` | required |
| `gap` | `number` | `16` |
| `style` | `CSSProperties` | — |

### input

A text input whose idle/hover/active/typing/invalid state is a pure function of the timeline; the focus ring, border, caret, and value reveal are keyframed presets.

*120f @ 30fps · vibe: clean*

Dependencies: `@remocn/remocn-ui`, `@remocn/caret`

```tsx
<Input state="idle" />
```

| Prop | Type | Default |
|---|---|---|
| `state` | `InputState` | `"idle"` |
| `style` | `InputStyle` | — |
| `placeholder` | `string` | `"you@example.com"` |
| `value` | `string` | `"remotion@remocn.dev"` |
| `size` | `InputSize` | `"default"` |
| `theme` | `Partial<RemocnTheme>` | — |
| `primary` | `string` | — |
| `fullWidth` | `boolean` | `false` |

### onboarding-stepper-flow

A multi-step onboarding composition: a horizontal stepper advances through panels of input, radio, and switch fields, finishing on a Finish button that runs to success. Panel crossfade derives linearly from the stepper's exposed position channel; every other channel comes from a composed primitive's hook.

*vibe: clean*

Dependencies: `@remocn/remocn-ui`, `@remocn/stepper`, `@remocn/input`, `@remocn/radio`, `@remocn/switch`, `@remocn/button`

```tsx
<OnboardingStepperFlow steps={DEFAULT_STEPS} />
```

| Prop | Type | Default |
|---|---|---|
| `steps` | `string[]` | `DEFAULT_STEPS` |
| `name` | `string` | `"jane@acme.com"` |
| `plans` | `string[]` | `DEFAULT_PLANS` |
| `nextLabel` | `string` | `"Next"` |
| `finishLabel` | `string` | `"Finish"` |
| `theme` | `Partial<RemocnTheme>` | — |

### popover

A popover/hover-card whose opened/closed state is a pure function of the timeline. The Popover renderer is a pure function of a PopoverStyle (opacity, scale, translate); usePopoverTransition eases both the open and the close. The static `side` prop sets the enter translate axis; renders title + description and/or arbitrary children in a popover card.

*120f @ 30fps · vibe: clean*

Dependencies: `@remocn/remocn-ui`

```tsx
<Popover state="closed" />
```

| Prop | Type | Default |
|---|---|---|
| `state` | `PopoverState` | `"closed"` |
| `style` | `PopoverStyle` | — |
| `title` | `string` | — |
| `description` | `string` | — |
| `children` | `ReactNode` | — |
| `side` | `PopoverSide` | `"bottom"` |
| `width` | `number` | `288` |
| `theme` | `Partial<RemocnTheme>` | — |

### progress

A progress bar whose fill is a pure function of a numeric value channel (value-channel deviation). The Progress renderer takes a clamped 0–100 value; useProgressTransition reads the frame and eases the fill between value steps. Muted track + primary indicator, optional floored percentage label.

*120f @ 30fps · vibe: data*

Dependencies: `@remocn/remocn-ui`

```tsx
<Progress value={0} />
```

| Prop | Type | Default |
|---|---|---|
| `value` | `number` | `0` |
| `style` | `ProgressStyle` | — |
| `width` | `number` | `320` |
| `showLabel` | `boolean` | `false` |
| `theme` | `Partial<RemocnTheme>` | — |

### radio

A radio whose checked/unchecked state is a pure function of the timeline; the ring border and inner dot pop are keyframed presets.

*120f @ 30fps · vibe: clean*

Dependencies: `@remocn/remocn-ui`

```tsx
<Radio state="unchecked" />
```

| Prop | Type | Default |
|---|---|---|
| `state` | `RadioState` | `"unchecked"` |
| `style` | `RadioStyle` | — |
| `label` | `string` | — |
| `size` | `RadioSize` | `"default"` |
| `theme` | `Partial<RemocnTheme>` | — |
| `primary` | `string` | — |

### resizable

Two panels split by a draggable handle, where the split ratio is a numeric channel plus a handle idle/hover/press channel (dual-channel value-channel deviation). The Resizable renderer is pure (clamped 0–1 ratio, handle scale, grab-ring opacity); useResizableTransition reads the frame and eases both channels — ratio as a numeric lerp, the handle visual from its state presets. Horizontal and vertical splits; 1px divider + centered grip pill with a derived grab ring.

*120f @ 30fps · vibe: clean*

Dependencies: `@remocn/remocn-ui`

```tsx
<Resizable direction="horizontal" />
```

| Prop | Type | Default |
|---|---|---|
| `first` | `ReactNode` | — |
| `second` | `ReactNode` | — |
| `direction` | `ResizableDirection` | `"horizontal"` |
| `ratio` | `number` | `0.5` |
| `handleState` | `ResizableHandleState` | `"idle"` |
| `style` | `ResizableStyle` | `{{ width: "100%", height: "100%", display: "flex",…` |
| `minRatio` | `number` | `0.15` |
| `maxRatio` | `number` | `0.85` |
| `width` | `number` | `440` |
| `height` | `number` | `240` |
| `theme` | `Partial<RemocnTheme>` | — |

### select

A select whose opened/closed state is a pure function of the timeline; the trigger reuses the Button primitive and the reveal panel composes SelectItem rows. The panel fade, scale, lift, and chevron are keyframed presets.

*120f @ 30fps · vibe: clean*

Dependencies: `@remocn/remocn-ui`, `@remocn/button`, `@remocn/select-item`

```tsx
<Select state="closed" />
```

| Prop | Type | Default |
|---|---|---|
| `state` | `SelectState` | `"closed"` |
| `style` | `SelectStyle` | — |
| `label` | `string` | `"Select a fruit"` |
| `triggerStyle` | `ButtonStyle` | — |
| `items` | `string[]` | `["Apple", "Banana", "Orange", "Grape"]` |
| `selectedIndex` | `number` | `-1` |
| `highlightedIndex` | `number` | `-1` |
| `pressedIndex` | `number` | `-1` |
| `itemStyles` | `(SelectItemStyle \| undefined)[]` | — |
| `theme` | `Partial<RemocnTheme>` | — |

### select-item

A select option row whose idle/hover/press/selected state is a pure function of the timeline; the row background, label color, and check icon are keyframed presets. Composed inside the Select panel.

*120f @ 30fps · vibe: clean*

Dependencies: `@remocn/remocn-ui`

```tsx
<SelectItemRow state="idle" />
```

| Prop | Type | Default |
|---|---|---|
| `state` | `SelectItemState` | `"idle"` |
| `style` | `SelectItemStyle` | — |
| `label` | `string` | — |
| `width` | `number` | — |
| `theme` | `Partial<RemocnTheme>` | — |

### settings-toggle-flow

A two-column settings card: the card and its controls blur-in, then the cursor flips a switch, opens a select, drags a labeled slider, and clicks Save, ending in a saved toast. A pure orchestrator — every channel comes from a composed primitive's transition hook.

*vibe: clean*

Dependencies: `@remocn/remocn-ui`, `@remocn/switch`, `@remocn/select`, `@remocn/slider`, `@remocn/button`, `@remocn/blur-in`, `@remocn/cursor`, `@remocn/toast`

```tsx
<SettingsToggleFlow title="Notification settings" />
```

| Prop | Type | Default |
|---|---|---|
| `title` | `string` | `"Notification settings"` |
| `description` | `string` | `"Manage how you receive alerts` |
| `rows` | `{ label: string }[]` | `DEFAULT_ROWS` |
| `selectItems` | `string[]` | `DEFAULT_SELECT_ITEMS` |
| `saveLabel` | `string` | `"Save settings"` |
| `toastTitle` | `string` | `"Settings saved"` |
| `theme` | `Partial<RemocnTheme>` | — |

### sheet

A side panel whose opened/closed state is a pure function of the timeline; the backdrop dim and right-edge slide-in are keyframed presets, with a close button and a primary action. Self-contained — pair it with the Button as a trigger (see the example).

*120f @ 30fps · vibe: clean*

Dependencies: `@remocn/remocn-ui`

```tsx
<Sheet state="closed" />
```

| Prop | Type | Default |
|---|---|---|
| `state` | `SheetState` | `"closed"` |
| `style` | `SheetStyle` | — |
| `title` | `string` | `"Edit profile"` |
| `description` | `string` | `"Make changes to your profile here. Click save whe…` |
| `actionLabel` | `string` | `"Save changes"` |
| `cancelLabel` | `string` | `"Cancel"` |
| `theme` | `Partial<RemocnTheme>` | — |

### signup-flow

A signup card composition: a real shadcn-style card (header, labeled Full Name / Email / Password / Confirm fields, primary + Google-outline buttons, sign-in footer) whose cursor fills each field top-to-bottom, then clicks Create account (hover → press → loading → success) as a success toast slides in. A pure orchestrator — every channel comes from a composed primitive's transition hook.

*vibe: clean*

Dependencies: `@remocn/remocn-ui`, `@remocn/cursor`, `@remocn/input`, `@remocn/button`, `@remocn/toast`, `@remocn/field`, `@remocn/blur-in`

```tsx
<SignupFlow title="Create an account" />
```

| Prop | Type | Default |
|---|---|---|
| `title` | `string` | `"Create an account"` |
| `description` | `string` | `"Enter your information below to create your accou…` |
| `fullName` | `string` | `"John Doe"` |
| `email` | `string` | `"m@example.com"` |
| `password` | `string` | `"••••••••"` |
| `createLabel` | `string` | `"Create account"` |
| `googleLabel` | `string` | — |
| `signinText` | `string` | — |
| `toastTitle` | `string` | `"Account created"` |
| `theme` | `Partial<RemocnTheme>` | — |

### skeleton

A skeleton→content crossfade whose loading/loaded state is a pure function of the timeline. The Skeleton renderer is pure (reads no frame); only the composed SkeletonBlock shimmer reads it. SkeletonStyle opacities sum to 1 so the box never dims; real children sit in normal flow and the placeholder (a lines/card layout or a custom node) is an absolute overlay.

*120f @ 30fps · vibe: clean*

Dependencies: `@remocn/remocn-ui`, `@remocn/skeleton-block`

```tsx
<Skeleton state="loading" />
```

| Prop | Type | Default |
|---|---|---|
| `state` | `SkeletonState` | `"loading"` |
| `style` | `SkeletonStyle` | `{{ display: "flex", gap: 14, alignItems: "center" …` |
| `children` | `ReactNode` | — |
| `placeholder` | `ReactNode` | — |
| `layout` | `SkeletonLayout` | `"lines"` |
| `speed` | `number` | — |
| `theme` | `Partial<RemocnTheme>` | — |

### skeleton-block

A shimmer placeholder block — a motion atom (spinner pattern). A directional highlight gradient sweeps across deterministically from useCurrentFrame() and loops seamlessly. Configurable width/height/radius/speed and base/highlight colors.

*120f @ 30fps · vibe: clean*

Dependencies: `@remocn/remocn-ui`

```tsx
<SkeletonBlock width={120} />
```

| Prop | Type | Default |
|---|---|---|
| `width` | `number \| string` | `120` |
| `height` | `number` | `16` |
| `radius` | `number` | `6` |
| `speed` | `number` | `1` |
| `baseColor` | `string` | — |
| `highlightColor` | `string` | — |
| `flexShrink` | `number` | — |

### slider

A slider whose fill is a numeric value channel plus a thumb idle/hover/press channel (dual-channel value-channel deviation). The Slider renderer is pure (clamped 0–100 value, thumb scale, grab-ring opacity); useSliderTransition reads the frame and eases both channels — value as a numeric lerp, the thumb visual from its state presets. Muted track + primary range + bordered thumb with a derived grab ring.

*120f @ 30fps · vibe: clean*

Dependencies: `@remocn/remocn-ui`

```tsx
<Slider value={0} />
```

| Prop | Type | Default |
|---|---|---|
| `value` | `number` | `0` |
| `thumbState` | `SliderThumbState` | `"idle"` |
| `style` | `SliderStyle` | — |
| `width` | `number` | `320` |
| `showValue` | `boolean` | `false` |
| `theme` | `Partial<RemocnTheme>` | — |

### spinner

A deterministic spinning arc that loops on the Remotion frame — a pure motion atom with no state.

*120f @ 30fps · vibe: clean*

```tsx
<Spinner size={20} />
```

| Prop | Type | Default |
|---|---|---|
| `size` | `number` | `20` |
| `color` | `string` | `"currentColor"` |
| `speed` | `number` | `1` |
| `strokeWidth` | `number` | `2.5` |

### stepper

A horizontal onboarding stepper whose progress is a pure function of a continuous step index (value-channel deviation). Every circle (fill, number, stroke-dash check) and connector (primary fill fraction) derives purely from the float position; useStepperTransition reads the frame and eases position between step indices.

*120f @ 30fps · vibe: clean*

Dependencies: `@remocn/remocn-ui`

```tsx
<Stepper steps={DEFAULT_STEPS} />
```

| Prop | Type | Default |
|---|---|---|
| `steps` | `string[]` | `DEFAULT_STEPS` |
| `activeIndex` | `number` | `0` |
| `style` | `StepperStyle` | — |
| `orientation` | `StepperOrientation` | — |
| `theme` | `Partial<RemocnTheme>` | — |

### switch

A switch whose checked/unchecked state is a pure function of the timeline; the track fill and sliding thumb are keyframed presets.

*120f @ 30fps · vibe: clean*

Dependencies: `@remocn/remocn-ui`

```tsx
<Switch state="unchecked" />
```

| Prop | Type | Default |
|---|---|---|
| `state` | `SwitchState` | `"unchecked"` |
| `style` | `SwitchStyle` | — |
| `label` | `string` | — |
| `size` | `SwitchSize` | `"default"` |
| `theme` | `Partial<RemocnTheme>` | — |
| `primary` | `string` | — |

### tabs

A tabs widget whose active-tab state is a pure function of the timeline; the sliding indicator, label colors, and panel crossfade are keyframed/derived presets.

*120f @ 30fps · vibe: clean*

Dependencies: `@remocn/remocn-ui`

```tsx
<Tabs state={DEFAULT_ITEMS[0]} />
```

| Prop | Type | Default |
|---|---|---|
| `state` | `TabsState` | `DEFAULT_ITEMS[0]` |
| `style` | `TabsStyle` | — |
| `items` | `string[]` | `DEFAULT_ITEMS` |
| `contents` | `string[]` | `DEFAULT_CONTENTS` |
| `contentHeight` | `number` | `72` |
| `variant` | `TabsVariant` | `"pill"` |
| `theme` | `Partial<RemocnTheme>` | — |

### toast

A toast notification whose hidden/visible state is a pure function of the timeline. The Toast renderer is a pure function of a ToastStyle (opacity, translateY, scale); useToastTransition eases both the slide-in enter and the auto-dismiss exit. Variants default/success/error change the leading icon and its color.

*120f @ 30fps · vibe: clean*

Dependencies: `@remocn/remocn-ui`

```tsx
<Toast title="…" state="hidden" />
```

| Prop | Type | Default |
|---|---|---|
| `state` | `ToastState` | `"hidden"` |
| `style` | `ToastStyle` | — |
| `title` | `string` | required |
| `description` | `string` | — |
| `variant` | `ToastVariant` | `"default"` |
| `theme` | `Partial<RemocnTheme>` | — |

### toggle-group

A segmented control whose active value is a pure function of the timeline; a raised thumb SLIDES between segments (position + width derived from a float indicator offset, no jumps) and the labels crossfade color via mixOklch. The tabs precedent without content panels.

*120f @ 30fps · vibe: clean*

Dependencies: `@remocn/remocn-ui`

```tsx
<ToggleGroup state={DEFAULT_ITEMS[0].value} />
```

| Prop | Type | Default |
|---|---|---|
| `state` | `ToggleGroupState` | `DEFAULT_ITEMS[0].value` |
| `style` | `ToggleGroupStyle` | — |
| `items` | `ToggleGroupItem[]` | `DEFAULT_ITEMS` |
| `size` | `ToggleGroupSize` | `"default"` |
| `theme` | `Partial<RemocnTheme>` | — |
| `align` | `"start" \| "center" \| "end"` | `"center"` |

### tooltip

A tooltip whose hidden/visible state is a pure function of the timeline. The Tooltip renderer is a pure function of a TooltipStyle (opacity, scale, translate); useTooltipTransition eases both the show and the hide. The static `side` prop sets the enter translate axis and the arrow placement.

*120f @ 30fps · vibe: clean*

Dependencies: `@remocn/remocn-ui`

```tsx
<Tooltip label="…" state="hidden" />
```

| Prop | Type | Default |
|---|---|---|
| `state` | `TooltipState` | `"hidden"` |
| `style` | `TooltipStyle` | — |
| `label` | `string` | required |
| `side` | `TooltipSide` | `"top"` |
| `theme` | `Partial<RemocnTheme>` | — |

---

## Text Animations

Reveal, replace, and emphasize text. Shared text props: `fontSize`, `color`, `fontWeight`, `speed`.

### blur-out-up

Words arrive clean and depart upward with increasing blur for airy exits.

*90f @ 30fps · vibe: premium*

```tsx
<BlurOutUp text="…" staggerDelay={1} />
```

| Prop | Type | Default |
|---|---|---|
| `text` | `string` | required |
| `staggerDelay` | `number` | `1` |
| `fontSize` | `number` | `72` |
| `color` | `string` | `"#171717"` |
| `fontWeight` | `number` | `600` |
| `speed` | `number` | `1` |

### bottom-up-letters

Letters rise from below in a pronounced staircase, one symbol at a time, with zero blur.

*60f @ 30fps · vibe: clean*

```tsx
<BottomUpLetters text="…" staggerDelay={3} />
```

| Prop | Type | Default |
|---|---|---|
| `text` | `string` | required |
| `staggerDelay` | `number` | `3` |
| `distance` | `number` | `46` |
| `fontSize` | `number` | `72` |
| `color` | `string` | `"#171717"` |
| `fontWeight` | `number` | `600` |
| `speed` | `number` | `1` |

### fade-through

A Material-style content transition: old fades out, new fades in with a soft delay.

*90f @ 30fps · vibe: clean*

```tsx
<FadeThrough fromText="…" toText="…" />
```

| Prop | Type | Default |
|---|---|---|
| `fromText` | `string` | required |
| `toText` | `string` | required |
| `fontSize` | `number` | `72` |
| `color` | `string` | `"#171717"` |
| `fontWeight` | `number` | `600` |
| `speed` | `number` | `1` |

### focus-blur-resolve

A premium focus pull from heavy blur to crisp text, then a soft blur-out exit.

*90f @ 30fps · vibe: premium*

```tsx
<FocusBlurResolve text="…" blur={14} />
```

| Prop | Type | Default |
|---|---|---|
| `text` | `string` | required |
| `blur` | `number` | `14` |
| `fontSize` | `number` | `72` |
| `color` | `string` | `"#171717"` |
| `fontWeight` | `number` | `600` |
| `speed` | `number` | `1` |

### infinite-marquee

Seamlessly looping horizontal text strip with optional stroke style.

*180f @ 30fps · vibe: clean*

```tsx
<InfiniteMarquee text="ship · build · animate · " />
```

| Prop | Type | Default |
|---|---|---|
| `text` | `string` | `"ship · build · animate · "` |
| `fontSize` | `number` | `120` |
| `color` | `string` | `"#171717"` |
| `fontWeight` | `number` | `900` |
| `pixelsPerFrame` | `number` | `4` |
| `stroke` | `boolean` | `false` |
| `strokeColor` | `string` | `"#171717"` |
| `speed` | `number` | `1` |

### inline-highlight

Animates one word inside a sentence from a base color to a brand color.

*90f @ 30fps · vibe: clean*

```tsx
<InlineHighlight before="…" highlight="…" />
```

| Prop | Type | Default |
|---|---|---|
| `before` | `string` | required |
| `highlight` | `string` | required |
| `after` | `string` | `""` |
| `baseColor` | `string` | `"#171717"` |
| `highlightColor` | `string` | `"#ff5e3a"` |
| `fontSize` | `number` | `48` |
| `fontWeight` | `number` | `600` |
| `speed` | `number` | `1` |

### kinetic-center-build

A word appears in the center; each new word enters from the right and pushes the line until the full phrase locks centered.

*60f @ 30fps · vibe: premium*

```tsx
<KineticCenterBuild text="…" entryOffset={88} />
```

| Prop | Type | Default |
|---|---|---|
| `text` | `string` | required |
| `entryOffset` | `number` | `88` |
| `fontSize` | `number` | `72` |
| `color` | `string` | `"#171717"` |
| `fontWeight` | `number` | `600` |
| `speed` | `number` | `1` |

### line-by-line-slide

Each line enters from the left with a staggered slide and exits to the right for a flowing paragraph reveal.

*90f @ 30fps · vibe: clean*

```tsx
<LineByLineSlide text="…" distance={48} />
```

| Prop | Type | Default |
|---|---|---|
| `text` | `string` | required |
| `distance` | `number` | `48` |
| `fontSize` | `number` | `72` |
| `color` | `string` | `"#171717"` |
| `fontWeight` | `number` | `600` |
| `speed` | `number` | `1` |

### marker-highlight

Colored marker block draws behind a phrase as the text color shifts.

*90f @ 30fps · vibe: playful*

```tsx
<MarkerHighlight highlight="…" before="" />
```

| Prop | Type | Default |
|---|---|---|
| `before` | `string` | `""` |
| `highlight` | `string` | required |
| `after` | `string` | `""` |
| `markerColor` | `string` | `"#facc15"` |
| `baseColor` | `string` | `"#171717"` |
| `highlightedTextColor` | `string` | `"#171717"` |
| `fontSize` | `number` | `72` |
| `fontWeight` | `number` | `600` |
| `speed` | `number` | `1` |

### mask-reveal-up

Lines reveal upward with a soft masked feel and compact stagger.

*90f @ 30fps · vibe: clean*

```tsx
<MaskRevealUp text="…" distance={30} />
```

| Prop | Type | Default |
|---|---|---|
| `text` | `string` | required |
| `distance` | `number` | `30` |
| `fontSize` | `number` | `72` |
| `color` | `string` | `"#171717"` |
| `fontWeight` | `number` | `600` |
| `speed` | `number` | `1` |

### matrix-decode

Random scramble resolves left-to-right into the target text.

*90f @ 30fps · vibe: tech*

```tsx
<MatrixDecode text="…" charset="!@#$%^&*()_+-=<>?/\\|" />
```

| Prop | Type | Default |
|---|---|---|
| `text` | `string` | required |
| `charset` | `string` | `"!@#$%^&*()_+-=<>?/\\|"` |
| `fontSize` | `number` | `72` |
| `color` | `string` | `"#22c55e"` |
| `fontWeight` | `number` | `600` |
| `revealDuration` | `number` | `60` |
| `speed` | `number` | `1` |

### micro-scale-fade

A calm, tiny scale pop used as subtle premium polish for labels and headings.

*60f @ 30fps · vibe: clean*

```tsx
<MicroScaleFade text="…" scaleFrom={0.96} />
```

| Prop | Type | Default |
|---|---|---|
| `text` | `string` | required |
| `scaleFrom` | `number` | `0.96` |
| `fontSize` | `number` | `72` |
| `color` | `string` | `"#171717"` |
| `fontWeight` | `number` | `600` |
| `speed` | `number` | `1` |

### number-wheel

Mechanical odometer that rolls an integer up or down to its target, direction inferred from the values.

*112f @ 30fps · vibe: data*

```tsx
<Odometer fontSize={{fontSize} opacity={placeOpacity(current, place)} />} />
```

| Prop | Type | Default |
|---|---|---|
| `from` | `number` | — |
| `to` | `number` | — |
| `fontSize` | `number` | `{fontSize} opacity={placeOpacity(current, place)} />` |
| `color` | `string` | — |
| `speed` | `number` | — |

### per-character-rise

Letters slide up from below with no blur — crisp, deliberate, kinetic.

*60f @ 30fps · vibe: clean*

```tsx
<PerCharacterRise text="…" distance={32} />
```

| Prop | Type | Default |
|---|---|---|
| `text` | `string` | required |
| `distance` | `number` | `32` |
| `fontSize` | `number` | `72` |
| `color` | `string` | `"#171717"` |
| `fontWeight` | `number` | `600` |
| `speed` | `number` | `1` |

### per-word-crossfade

Words gently fade into place one after another, with a short vertical drift for a calm keynote rhythm.

*90f @ 30fps · vibe: clean*

```tsx
<PerWordCrossfade fromText="…" toText="…" />
```

| Prop | Type | Default |
|---|---|---|
| `fromText` | `string` | required |
| `toText` | `string` | required |
| `fontSize` | `number` | `72` |
| `color` | `string` | `"#171717"` |
| `fontWeight` | `number` | `600` |
| `speed` | `number` | `1` |

### perspective-marquee

A 3D-tilted infinite marquee with depth-of-field blur on items rolling toward the horizon.

*240f @ 30fps · vibe: premium*

```tsx
<PerspectiveMarquee items={DEFAULT_ITEMS} />
```

| Prop | Type | Default |
|---|---|---|
| `items` | `string[]` | `DEFAULT_ITEMS` |
| `fontSize` | `number` | `84` |
| `color` | `string` | `"#fafafa"` |
| `fontWeight` | `number` | `700` |
| `pixelsPerFrame` | `number` | `2` |
| `rotateY` | `number` | `-28` |
| `rotateX` | `number` | `8` |
| `perspective` | `number` | `1200` |
| `fadeColor` | `string` | `"#050505"` |
| `speed` | `number` | `1` |

### rgb-glitch-text

Three RGB-offset text copies jitter for a brief glitch window.

*90f @ 30fps · vibe: tech*

```tsx
<RGBGlitchText text="…" fontSize={96} />
```

| Prop | Type | Default |
|---|---|---|
| `text` | `string` | required |
| `fontSize` | `number` | `96` |
| `color` | `string` | `"#171717"` |
| `fontWeight` | `number` | `700` |
| `glitchAt` | `number` | `20` |
| `glitchDuration` | `number` | `8` |
| `intensity` | `number` | `6` |
| `seed` | `string` | `"glitch"` |
| `speed` | `number` | `1` |

### rolling-number

Odometer where every place rolls at its own speed, new places rising into view, settling exactly on the target value.

*150f @ 30fps · vibe: data*

```tsx
<RollingNumber from={0} />
```

| Prop | Type | Default |
|---|---|---|
| `from` | `number` | `0` |
| `to` | `number` | `24813` |
| `fontSize` | `number` | `120` |
| `color` | `string` | `"#171717"` |
| `speed` | `number` | `1` |

### scale-down-fade

Subtle premium settle-in with a restrained scale-down fade on exit.

*90f @ 30fps · vibe: clean*

```tsx
<ScaleDownFade text="…" fontSize={72} />
```

| Prop | Type | Default |
|---|---|---|
| `text` | `string` | required |
| `fontSize` | `number` | `72` |
| `color` | `string` | `"#171717"` |
| `fontWeight` | `number` | `600` |
| `speed` | `number` | `1` |

### shared-axis-y

Per-word hard-cut transition with staircase timing for sharp editorial swaps.

*90f @ 30fps · vibe: clean*

```tsx
<SharedAxisY fromText="…" toText="…" />
```

| Prop | Type | Default |
|---|---|---|
| `fromText` | `string` | required |
| `toText` | `string` | required |
| `fontSize` | `number` | `72` |
| `color` | `string` | `"#171717"` |
| `fontWeight` | `number` | `600` |
| `speed` | `number` | `1` |

### shared-axis-z

Scale-based shared-axis transition for focus shifts and context depth.

*90f @ 30fps · vibe: clean*

```tsx
<SharedAxisZ fromText="…" toText="…" />
```

| Prop | Type | Default |
|---|---|---|
| `fromText` | `string` | required |
| `toText` | `string` | required |
| `fontSize` | `number` | `72` |
| `color` | `string` | `"#171717"` |
| `fontWeight` | `number` | `600` |
| `speed` | `number` | `1` |

### shimmer-sweep

Light shine sweeps across muted text via background-clip:text.

*120f @ 30fps · vibe: premium*

```tsx
<ShimmerSweep text="…" baseColor="#3f3f46" />
```

| Prop | Type | Default |
|---|---|---|
| `text` | `string` | required |
| `baseColor` | `string` | `"#3f3f46"` |
| `shineColor` | `string` | `"#fafafa"` |
| `fontSize` | `number` | `96` |
| `fontWeight` | `number` | `700` |
| `speed` | `number` | `1` |

### short-slide-down

Each new word drops in from above into its own line and pushes the stack downward until a centered three-line composition locks in place.

*60f @ 30fps · vibe: clean*

```tsx
<ShortSlideDown text="…" entryOffset={28} />
```

| Prop | Type | Default |
|---|---|---|
| `text` | `string` | required |
| `entryOffset` | `number` | `28` |
| `fontSize` | `number` | `72` |
| `color` | `string` | `"#171717"` |
| `fontWeight` | `number` | `600` |
| `speed` | `number` | `1` |

### short-slide-right

The whole phrase glides in from the left as one compact move while words reveal in sequence through opacity.

*60f @ 30fps · vibe: clean*

```tsx
<ShortSlideRight text="…" distance={24} />
```

| Prop | Type | Default |
|---|---|---|
| `text` | `string` | required |
| `distance` | `number` | `24` |
| `staggerDelay` | `number` | `3` |
| `fontSize` | `number` | `72` |
| `color` | `string` | `"#171717"` |
| `fontWeight` | `number` | `600` |
| `speed` | `number` | `1` |

### slot-machine-roll

Vertical reel scrolls characters from one value to another.

*90f @ 30fps · vibe: playful*

```tsx
<SlotMachineRoll from="$99" />
```

| Prop | Type | Default |
|---|---|---|
| `from` | `string` | `"$99"` |
| `to` | `string` | `"$199"` |
| `fontSize` | `number` | `120` |
| `color` | `string` | `"#171717"` |
| `fontWeight` | `number` | `700` |
| `speed` | `number` | `1` |

### soft-blur-in

Per-character fade-in with a gentle blur and upward motion. Apple's signature hero-title reveal.

*60f @ 30fps · vibe: premium*

```tsx
<SoftBlurIn text="…" blur={12} />
```

| Prop | Type | Default |
|---|---|---|
| `text` | `string` | required |
| `blur` | `number` | `12` |
| `fontSize` | `number` | `72` |
| `color` | `string` | `"#171717"` |
| `fontWeight` | `number` | `600` |
| `speed` | `number` | `1` |

### spring-scale-in

Words pop in with a soft overshoot scale, like a physical spring settling into place.

*60f @ 30fps · vibe: playful*

```tsx
<SpringScaleIn text="…" staggerDelay={3} />
```

| Prop | Type | Default |
|---|---|---|
| `text` | `string` | required |
| `staggerDelay` | `number` | `3` |
| `scaleFrom` | `number` | `0.7` |
| `fontSize` | `number` | `72` |
| `color` | `string` | `"#171717"` |
| `fontWeight` | `number` | `600` |
| `speed` | `number` | `1` |

### staggered-fade-up

Words fade in and slide up one after another with a configurable delay.

*90f @ 30fps · vibe: clean*

```tsx
<StaggeredFadeUp text="…" staggerDelay={4} />
```

| Prop | Type | Default |
|---|---|---|
| `text` | `string` | required |
| `staggerDelay` | `number` | `4` |
| `distance` | `number` | `20` |
| `fontSize` | `number` | `72` |
| `color` | `string` | `"#171717"` |
| `fontWeight` | `number` | `600` |
| `speed` | `number` | `1` |

### strikethrough-replace

Draws a strike line across old text then reveals new text in its place.

*120f @ 30fps · vibe: clean*

```tsx
<StrikethroughReplace from="…" to="…" />
```

| Prop | Type | Default |
|---|---|---|
| `from` | `string` | required |
| `to` | `string` | required |
| `lineColor` | `string` | `"#ff5e3a"` |
| `fontSize` | `number` | `48` |
| `color` | `string` | `"#171717"` |
| `fontWeight` | `number` | `600` |
| `speed` | `number` | `1` |

### top-down-letters

Letters descend from above in a pronounced staircase, one symbol at a time, with zero blur.

*60f @ 30fps · vibe: clean*

```tsx
<TopDownLetters text="…" staggerDelay={3} />
```

| Prop | Type | Default |
|---|---|---|
| `text` | `string` | required |
| `staggerDelay` | `number` | `3` |
| `distance` | `number` | `46` |
| `fontSize` | `number` | `72` |
| `color` | `string` | `"#171717"` |
| `fontWeight` | `number` | `600` |
| `speed` | `number` | `1` |

### tracking-in

Letter-spacing collapses and blur clears with a springy motion.

*90f @ 30fps · vibe: premium*

```tsx
<TrackingIn text="…" startTracking={0.5} />
```

| Prop | Type | Default |
|---|---|---|
| `text` | `string` | required |
| `startTracking` | `number` | `0.5` |
| `startBlur` | `number` | `12` |
| `fontSize` | `number` | `96` |
| `color` | `string` | `"#171717"` |
| `fontWeight` | `number` | `700` |
| `speed` | `number` | `1` |

### typewriter

Character-by-character text reveal with a deterministic blinking cursor.

*120f @ 30fps · vibe: clean*

Dependencies: `@remocn/remocn-ui`, `@remocn/caret`

```tsx
<Typewriter text="…" cursor={true} />
```

| Prop | Type | Default |
|---|---|---|
| `text` | `string` | required |
| `cursor` | `boolean` | `true` |
| `charsPerSecond` | `number` | `22` |
| `speed` | `number` | `1` |
| `fontSize` | `number` | `48` |
| `color` | `string` | `"#171717"` |
| `cursorColor` | `string` | `"#171717"` |
| `fontWeight` | `number` | `600` |

---

## Backgrounds & Effects

Animated foundations, cursors, and one-shot effects.

### backdrop

Configurable full-frame background (color / gradient / image / live component) with Screen Studio-style padding and a rounded, shadowed content frame.

*150f @ 30fps · vibe: clean*

```tsx
<Backdrop padding={4} />
```

| Prop | Type | Default |
|---|---|---|
| `fill` | `BackdropFill \| ReactNode` | — |
| `padding` | `number` | `4` |
| `radius` | `number` | `1` |
| `shadow` | `string` | `"0 20px 60px rgba(0,0,0,0.4)"` |
| `children` | `ReactNode` | — |

### confetti

Deterministic confetti burst for Remotion — seeded particles with gravity, spin, and flutter so every render is identical. Fire it on any frame as a celebratory overlay.

*90f @ 30fps · vibe: playful*

```tsx
<Confetti particleCount={140} />
```

| Prop | Type | Default |
|---|---|---|
| `particleCount` | `number` | `140` |
| `colors` | `string[]` | `DEFAULT_COLORS` |
| `originX` | `number` | `0.5` |
| `originY` | `number` | `0.5` |
| `startFrame` | `number` | `0` |
| `lifetime` | `number` | `90` |
| `power` | `number` | `17` |
| `gravity` | `number` | `0.45` |
| `size` | `number` | `13` |
| `seed` | `number` | `1` |

### dynamic-grid

Subtle moving grid background with configurable cell size and direction.

*150f @ 30fps · vibe: premium*

```tsx
<DynamicGrid cellSize={40} />
```

| Prop | Type | Default |
|---|---|---|
| `cellSize` | `number` | `40` |
| `lineColor` | `string` | `"#27272a"` |
| `background` | `string` | `"#0a0a0a"` |
| `speed` | `number` | `0.5` |
| `direction` | `"diagonal" \| "horizontal" \| "vertical"` | `"diagonal"` |

### mesh-gradient-bg

Living gradient with amorphous color blobs slowly drifting across the frame.

*150f @ 30fps · vibe: premium*

```tsx
<MeshGradientBg colors={["#ff0080", "#7928ca", "#00d4ff", "#ffb800"]} />
```

| Prop | Type | Default |
|---|---|---|
| `colors` | `string[]` | `["#ff0080", "#7928ca", "#00d4ff", "#ffb800"]` |
| `speed` | `number` | `1` |
| `background` | `string` | `"#0a0a0a"` |
| `blur` | `number` | `80` |

### simulated-cursor

Animated mouse cursor moving between waypoints with click ripple feedback.

*150f @ 30fps · vibe: clean*

```tsx
<SimulatedCursor points={DEFAULT_POINTS} />
```

| Prop | Type | Default |
|---|---|---|
| `points` | `CursorPoint[]` | `DEFAULT_POINTS` |
| `color` | `string` | `"#ffffff"` |
| `size` | `number` | `32` |
| `speed` | `number` | `1` |

### spotlight-card

A card with a moonlight-cool radial spotlight that follows a synthetic cursor and lights up its microborder.

*240f @ 30fps · vibe: premium*

```tsx
<SpotlightCard title="Spotlight Card" />
```

| Prop | Type | Default |
|---|---|---|
| `title` | `string` | `"Spotlight Card"` |
| `body` | `string` | `"Soft radial light follows the cursor` |
| `cardWidth` | `number` | `520` |
| `cardHeight` | `number` | `320` |
| `glowSize` | `number` | `600` |
| `glowOpacity` | `number` | `0.08` |
| `cardColor` | `string` | `"#0a0a0a"` |
| `textColor` | `string` | `"#fafafa"` |
| `mutedColor` | `string` | `"#71717a"` |
| `speed` | `number` | `1` |
| `children` | `ReactNode` | — |

---

## Transitions & Wipes

Swap between two scenes. Most accept `from` / `to` as `ReactNode`.

### chromatic-aberration-wipe

An ultra-fast slide transition with an RGB glitch on the peak frames.

*90f @ 30fps · vibe: premium*

```tsx
<ChromaticAberrationWipe direction="left" />
```

| Prop | Type | Default |
|---|---|---|
| `from` | `ReactNode` | — |
| `to` | `ReactNode` | — |
| `direction` | `"left" \| "right"` | `"left"` |
| `transitionStart` | `number` | — |
| `transitionDuration` | `number` | `7` |
| `aberrationOffset` | `number` | `8` |
| `speed` | `number` | `1` |

### device-mockup-zoom

Pull back from a UI to reveal it inside a device frame.

*120f @ 30fps · vibe: premium*

```tsx
<DeviceMockupZoom device="laptop" />
```

| Prop | Type | Default |
|---|---|---|
| `children` | `ReactNode` | — |
| `device` | `"laptop" \| "phone"` | `"laptop"` |
| `frameColor` | `string` | `"#1f1f1f"` |
| `screenColor` | `string` | `"#0a0a0a"` |
| `speed` | `number` | `1` |

### directional-wipe

Slide one scene in while pushing the other out.

*90f @ 30fps · vibe: premium*

```tsx
<DirectionalWipe direction="left" />
```

| Prop | Type | Default |
|---|---|---|
| `from` | `ReactNode` | — |
| `to` | `ReactNode` | — |
| `direction` | `"left" \| "right" \| "up" \| "down"` | `"left"` |
| `transitionStart` | `number` | — |
| `transitionDuration` | `number` | `20` |
| `speed` | `number` | `1` |

### frosted-glass-wipe

Elegant scene transition through a sliding pane of frosted glass.

*90f @ 30fps · vibe: premium*

```tsx
<FrostedGlassWipe transitionDuration={30} />
```

| Prop | Type | Default |
|---|---|---|
| `from` | `ReactNode` | — |
| `to` | `ReactNode` | — |
| `transitionStart` | `number` | — |
| `transitionDuration` | `number` | `30` |
| `glassBlur` | `number` | `24` |
| `speed` | `number` | `1` |

### grid-pixelate-wipe

Dissolve from one scene to the next through a deterministic grid of mask cells.

*90f @ 30fps · vibe: premium*

```tsx
<GridPixelateWipe cols={12} />
```

| Prop | Type | Default |
|---|---|---|
| `from` | `ReactNode` | — |
| `to` | `ReactNode` | — |
| `cols` | `number` | `12` |
| `rows` | `number` | `7` |
| `pattern` | `"wave" \| "diagonal" \| "spiral"` | `"wave"` |
| `transitionStart` | `number` | — |
| `transitionDuration` | `number` | `30` |
| `cellFadeFrames` | `number` | `4` |
| `speed` | `number` | `1` |

### image-expand-to-fullscreen

An image lifts out of a feed post and morphs into a fullscreen editor with toolbars sliding in.

*180f @ 30fps · vibe: premium*

```tsx
<ImageExpandToFullscreen from={DEFAULT_FROM} />
```

| Prop | Type | Default |
|---|---|---|
| `from` | `ImageExpandRect` | `DEFAULT_FROM` |
| `to` | `ImageExpandRect` | `DEFAULT_TO` |
| `borderRadiusFrom` | `number` | `12` |
| `borderRadiusTo` | `number` | `16` |
| `morphAt` | `number` | `30` |
| `imageColorA` | `string` | `"#ff6b6b"` |
| `imageColorB` | `string` | `"#845ec2"` |
| `imageColorC` | `string` | `"#4d8dff"` |
| `feedBackground` | `string` | `"#f4f4f5"` |
| `editorBackground` | `string` | `"#0a0a0a"` |
| `accent` | `string` | `"#fafafa"` |
| `postAuthor` | `string` | `"Maya Larsson"` |
| … | +2 more | |

### spatial-push

A new scene physically presses the old one back into the frame.

*90f @ 30fps · vibe: premium*

```tsx
<SpatialPush direction="up" />
```

| Prop | Type | Default |
|---|---|---|
| `from` | `ReactNode` | — |
| `to` | `ReactNode` | — |
| `direction` | `"up" \| "down" \| "left" \| "right"` | `"up"` |
| `transitionStart` | `number` | — |
| `transitionDuration` | `number` | `30` |
| `speed` | `number` | `1` |

### zoom-through-transition

Aggressively scale into the center of an element.

*60f @ 30fps · vibe: premium*

```tsx
<ZoomThroughTransition targetScale={20} />
```

| Prop | Type | Default |
|---|---|---|
| `children` | `ReactNode` | — |
| `targetScale` | `number` | `20` |
| `transformOrigin` | `string` | `"center center"` |
| `background` | `string` | `"white"` |
| `speed` | `number` | `1` |

---

## UI Blocks

Interface simulations for product demos.

### animated-bar-chart

Bars spring up from the baseline in a staggered cascade.

*90f @ 30fps · vibe: data*

```tsx
<AnimatedBarChart data={[35, 60, 45, 80, 55, 70, 90, 65]} />
```

| Prop | Type | Default |
|---|---|---|
| `data` | `number[]` | `[35, 60, 45, 80, 55, 70, 90, 65]` |
| `labels` | `string[]` | — |
| `width` | `number` | `1000` |
| `height` | `number` | `500` |
| `barColor` | `string` | `"#0ea5e9"` |
| `gap` | `number` | `16` |
| `staggerFrames` | `number` | `6` |
| `speed` | `number` | `1` |

### animated-line-chart

Line chart whose SVG path draws on from left to right with a leading dot.

*90f @ 30fps · vibe: data*

```tsx
<AnimatedLineChart data={[12, 19, 8, 15, 22, 18, 28, 25, 32]} />
```

| Prop | Type | Default |
|---|---|---|
| `data` | `number[]` | `[12, 19, 8, 15, 22, 18, 28, 25, 32]` |
| `width` | `number` | `1000` |
| `height` | `number` | `500` |
| `strokeColor` | `string` | `"#22c55e"` |
| `strokeWidth` | `number` | `4` |
| `gridColor` | `string` | `"#27272a"` |
| `showDot` | `boolean` | `true` |
| `speed` | `number` | `1` |

### code-accordion

A code window that springs a range of lines closed and replaces them with a "N lines collapsed" placeholder.

*150f @ 30fps · vibe: tech*

```tsx
<CodeAccordion lines={DEFAULT_LINES} />
```

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

### code-diff-wipe

Before/after code reveal via clip-path wipe with a handle marker.

*120f @ 30fps · vibe: tech*

```tsx
<CodeDiffWipe before={DEFAULT_BEFORE} />
```

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

### data-flow-pipes

Glowing data packets travel along SVG bezier pipes between system nodes, leaving fading trails.

*180f @ 30fps · vibe: tech*

```tsx
<DataFlowPipes nodes={DEFAULT_NODES} />
```

| Prop | Type | Default |
|---|---|---|
| `nodes` | `DataFlowNode[]` | `DEFAULT_NODES` |
| `edges` | `DataFlowEdge[]` | `DEFAULT_EDGES` |
| `pipeColor` | `string` | `"#1f1f23"` |
| `pulseColor` | `string` | `"#22d3ee"` |
| `pulseLength` | `number` | `60` |
| `pulseDuration` | `number` | `36` |
| `nodeColor` | `string` | `"#0a0a0a"` |
| `textColor` | `string` | `"#fafafa"` |
| `speed` | `number` | `1` |

### drag-and-drop-flow

Simulated file drag into a dropzone followed by upload progress.

*150f @ 30fps · vibe: tech*

```tsx
<DragAndDropFlow accent="#0ea5e9" />
```

| Prop | Type | Default |
|---|---|---|
| `accent` | `string` | `"#0ea5e9"` |
| `dropzoneLabel` | `string` | `"Drop file to upload"` |
| `fileName` | `string` | `"design.fig"` |
| `speed` | `number` | `1` |

### glass-code-block

A premium frosted-glass code editor window with a regex tokenizer and line-by-line stagger reveal.

*180f @ 30fps · vibe: tech*

```tsx
<GlassCodeBlock code={DEFAULT_CODE} />
```

| Prop | Type | Default |
|---|---|---|
| `code` | `string` | `DEFAULT_CODE` |
| `title` | `string` | `"hero.tsx"` |
| `width` | `number` | `760` |
| `height` | `number` | `460` |
| `fontSize` | `number` | `16` |
| `glassColor` | `string` | `"rgba(10, 10, 10, 0.6)"` |
| `staggerFrames` | `number` | `4` |
| `showTrafficLights` | `boolean` | `true` |
| `speed` | `number` | `1` |

### progress-steps

Multi-step pipeline with sequentially activating nodes and filling lines.

*150f @ 30fps · vibe: data*

```tsx
<ProgressSteps steps={[{ label: "Connect" }, { label: "Process" }, { lab…} />
```

| Prop | Type | Default |
|---|---|---|
| `steps` | `Array<{ label: string }>` | `[{ label: "Connect" }, { label: "Process" }, { lab…` |
| `orientation` | `"horizontal" \| "vertical"` | `"horizontal"` |
| `activeColor` | `string` | `"#22c55e"` |
| `inactiveColor` | `string` | `"#27272a"` |
| `textColor` | `string` | `"white"` |
| `stepDuration` | `number` | `30` |
| `speed` | `number` | `1` |

### terminal-simulator

Terminal window that types out commands and rolls old lines off the top.

*240f @ 30fps · vibe: tech*

```tsx
<TerminalSimulator lines={DEFAULT_LINES} />
```

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

### tool-menu-slide-in

A glass tool palette whips up from below the editor canvas while its icons pop in with a stagger.

*180f @ 30fps · vibe: tech*

```tsx
<ToolMenuSlideIn panelStartFrame={18} />
```

| Prop | Type | Default |
|---|---|---|
| `panelStartFrame` | `number` | `18` |
| `iconStagger` | `number` | `4` |
| `iconCount` | `number` | `5` |
| `accent` | `string` | `"#a78bfa"` |
| `panelColor` | `string` | `"rgba(18, 18, 22, 0.72)"` |
| `iconBg` | `string` | `"rgba(255,255,255,0.06)"` |
| `speed` | `number` | `1` |

---

## AI & Social Cards

Brand/product card scenes (AI tools + social profiles). Data props are pre-filled; override per brand.

### chat-gpt

Animated ChatGPT composer — types a prompt into the pill input, the blue voice button morphs into a send button, and the suggestion chips fade out. Light/dark themes.

*150f @ 30fps · vibe: tech*

Dependencies: `@remocn/caret`, `@remocn/remocn-ui`

```tsx
<ChatGpt greeting="What's on your mind today?" />
```

| Prop | Type | Default |
|---|---|---|
| `greeting` | `string` | `"What's on your mind today?"` |
| `placeholder` | `string` | `"Ask anything"` |
| `prompt` | `string` | `"Make a sunset over a calm ocean"` |
| `accentColor` | `string` | `"#2F6FED"` |
| `speed` | `number` | `1` |

### claude-chat

Animated Claude chat input — types a prompt character-by-character and the waveform button morphs into a terracotta send button the moment text appears. Warm light/dark themes.

*150f @ 30fps · vibe: tech*

Dependencies: `@remocn/caret`, `@remocn/remocn-ui`

```tsx
<ClaudeChat placeholder="Try: draft an email · summarize a doc · plan your… />
```

| Prop | Type | Default |
|---|---|---|
| `greeting` | `string` | — |
| `placeholder` | `string` | `"Try: draft an email · summarize a doc · plan your…` |
| `prompt` | `string` | `"Draft a launch tweet for our new release"` |
| `modelName` | `string` | `"Opus 4.8"` |
| `modelTier` | `string` | `"Max"` |
| `accentColor` | `string` | `"#D97757"` |
| `speed` | `number` | `1` |

### claude-code

Animated Claude Code CLI welcome screen — terminal window with a dashed welcome box, recent activity and what's new panels, and a prompt line that types a command with a block cursor. Dark/light themes.

*160f @ 30fps · vibe: tech*

Dependencies: `@remocn/caret`, `@remocn/remocn-ui`

```tsx
<ClaudeCode title="Claude Code v2.0.0" />
```

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

### github-stars

Inertial fly-through of a repo's stargazers with a synced count-up odometer that locks on the total. Horizontal 16:9 or vertical 9:16.

*120f @ 30fps · vibe: data*

Dependencies: `@remocn/number-wheel`

```tsx
<Row speed={1} />
```

| Prop | Type | Default |
|---|---|---|
| `repo` | `string` | — |
| `totalStars` | `number` | — |
| `stargazers` | `Stargazer[]` | — |
| `orientation` | `"horizontal" \| "vertical"` | — |
| `accentColor` | `string` | — |
| `speed` | `number` | `1` |
| `theme` | `"light" \| "dark"` | — |
| `repoAvatarUrl` | `string` | — |

### opencode

Animated OpenCode TUI welcome screen — two-tone wordmark, an input box with a blue accent bar that types a query, a model status line, and command hints. Dark/light themes.

*150f @ 30fps · vibe: tech*

Dependencies: `@remocn/caret`, `@remocn/remocn-ui`

```tsx
<OpenCode placeholder="Ask anything... " />
```

| Prop | Type | Default |
|---|---|---|
| `placeholder` | `string` | `"Ask anything... "` |
| `query` | `string` | `'"What is the tech stack of this project?"'` |
| `agentName` | `string` | `"Build"` |
| `modelName` | `string` | `"Kimi K2.5"` |
| `provider` | `string` | `"Moonshot AI"` |
| `accentColor` | `string` | `"#2B7FFF"` |
| `speed` | `number` | `1` |

### v0

Animated Vercel v0 composer — types a prompt into the dark textarea and the mic button morphs into a send button. Dark/light themes.

*150f @ 30fps · vibe: tech*

Dependencies: `@remocn/caret`, `@remocn/remocn-ui`

```tsx
<V0 greeting="What do you want to create?" />
```

| Prop | Type | Default |
|---|---|---|
| `greeting` | `string` | `"What do you want to create?"` |
| `placeholder` | `string` | `"Ask v0 to build…"` |
| `prompt` | `string` | `"a landing page for my SaaS with pricing and testi…` |
| `modelName` | `string` | `"v0 Max"` |
| `projectName` | `string` | `"Project"` |
| `speed` | `number` | `1` |

### x-follow-card

Animated X profile follow card — spring bounce-in, staggered blur-in, a synthetic cursor that clicks Follow and flips it to Following. Light/dark, horizontal or vertical.

*165f @ 30fps · vibe: social*

Dependencies: `@remocn/cursor`

```tsx
<XFollowCard name={{name} size={44} accent={accent} theme={theme} /> …} />
```

| Prop | Type | Default |
|---|---|---|
| `name` | `string` | `{name} size={44} accent={accent} theme={theme} /> …` |
| `handle` | `string` | `"remocn"` |
| `bio` | `string` | `"Building the collaborative video toolkit for smal…` |
| `avatarUrl` | `string` | `{avatarUrl} name={name} size={44} accent={accent} …` |
| `coverUrl` | `string` | `""` |
| `location` | `string` | `"Tunisia"` |
| `website` | `string` | `"remocn.tn"` |
| `joined` | `string` | `"January 2024"` |
| `verified` | `boolean` | `true` |
| `accentColor` | `string` | `"#1d9bf0"` |
| `orientation` | `"horizontal" \| "vertical"` | `"horizontal"` |
| `speed` | `number` | `1` |

### x-followers-overview

X follow notifications cycle through as 3D flipping text — '<name> followed you · 7h' — then the total follower count pops in with a confetti burst. Hardcoded sample list (X API ready). Light/dark, horizontal or vertical.

*360f @ 30fps · vibe: data*

Dependencies: `@remocn/confetti`

```tsx
<XFollowersOverview notifications={SAMPLE_FOLLOWERS} />
```

| Prop | Type | Default |
|---|---|---|
| `notifications` | `FollowerNotification[]` | `SAMPLE_FOLLOWERS` |
| `totalFollowers` | `number` | `1709` |
| `handle` | `string` | `"remocn"` |
| `avatarUrl` | `string` | `"/logo.svg"` |
| `accentColor` | `string` | `"#1d9bf0"` |
| `orientation` | `"horizontal" \| "vertical"` | `"horizontal"` |
| `speed` | `number` | `1` |

---

## Compositions

Ready-to-use multi-scene sequences.

### ai-generation-canvas

A prompt input transforms into a header, then a skeleton dashboard flips into populated cards.

*180f @ 30fps · vibe: premium*

```tsx
<AIGenerationCanvas prompt="Generate a dashboard" />
```

| Prop | Type | Default |
|---|---|---|
| `prompt` | `string` | `"Generate a dashboard"` |
| `accentColor` | `string` | `{accentColor} value={values[index % values.length]…` |
| `cardCount` | `number` | `4` |
| `speed` | `number` | `1` |

### browser-flow

Full Safari/Chrome simulation: typed URL, progress bar, page render, scroll, and a virtual cursor click.

*270f @ 30fps · vibe: premium*

```tsx
<BrowserFlow url="remocn.dev" />
```

| Prop | Type | Default |
|---|---|---|
| `url` | `string` | `"remocn.dev"` |
| `speed` | `number` | `1` |

### chat-to-preview-layout

Two-column layout where chat shrinks and preview expands.

*120f @ 30fps · vibe: clean*

```tsx
<ChatToPreviewLayout startChatRatio={0.5} />
```

| Prop | Type | Default |
|---|---|---|
| `chat` | `ReactNode` | — |
| `preview` | `ReactNode` | — |
| `startChatRatio` | `number` | `0.5` |
| `endChatRatio` | `number` | `0.25` |
| `speed` | `number` | `1` |

### dashboard-populate

An empty dashboard cascades to life with KPI count-ups, bar bounces, line traces, and a donut fill.

*180f @ 30fps · vibe: data*

```tsx
<DashboardPopulate accentColor="#22c55e" />
```

| Prop | Type | Default |
|---|---|---|
| `accentColor` | `string` | `"#22c55e"` |
| `kpiTarget` | `number` | `128400` |
| `speed` | `number` | `1` |

### ecosystem-constellation

A central logo orbited by integration satellites with pulsing data lines.

*240f @ 30fps · vibe: premium*

```tsx
<EcosystemConstellation satelliteCount={6} />
```

| Prop | Type | Default |
|---|---|---|
| `satelliteCount` | `number` | `6` |
| `centerLabel` | `string` | `"V"` |
| `accentColor` | `string` | `"#a855f7"` |
| `speed` | `number` | `1` |

### hero-device-assemble

Floating device layers spring together into a laptop or phone mockup, then the screen wakes with a shimmer.

*150f @ 30fps · vibe: premium*

```tsx
<HeroDeviceAssemble assembleStart={0} />
```

| Prop | Type | Default |
|---|---|---|
| `assembleStart` | `number` | `0` |
| `device` | `"laptop" \| "phone"` | `"laptop"` |
| `accentColor` | `string` | `"#22c55e"` |
| `speed` | `number` | `1` |

### infinite-bento-pan

A camera diagonally drifts across an oversized bento grid behind a soft vignette.

*300f @ 30fps · vibe: premium*

```tsx
<InfiniteBentoPan panSpeed={1} />
```

| Prop | Type | Default |
|---|---|---|
| `panSpeed` | `number` | `1` |
| `accentColor` | `string` | `"#7c3aed"` |
| `speed` | `number` | `1` |

### landing-code-showcase

Magical split-screen: code types itself on the left while the preview reactively re-renders on the right with sparks and tactile bounce.

*720f @ 30fps · vibe: tech*

```tsx
<LandingCodeShowcase accentColor={{PEACH} /> </div>} />
```

| Prop | Type | Default |
|---|---|---|
| `accentColor` | `string` | `{PEACH} /> </div>` |
| `speed` | `number` | `1` |

### live-code-compilation

Split-screen where typed code on the left snaps a live UI preview on the right, HMR-style.

*260f @ 30fps · vibe: tech*

```tsx
<LiveCodeCompilation accentColor="#3b82f6" />
```

| Prop | Type | Default |
|---|---|---|
| `accentColor` | `string` | `"#3b82f6"` |
| `speed` | `number` | `1` |

### pricing-tier-focus

Three pricing cards where the focused tier rises and brightens while siblings dim and blur.

*180f @ 30fps · vibe: data*

```tsx
<PricingTierFocus focusedTier={1} />
```

| Prop | Type | Default |
|---|---|---|
| `focusedTier` | `0 \| 1 \| 2 \| "0" \| "1" \| "2"` | `1` |
| `accentColor` | `string` | `"#22c55e"` |
| `speed` | `number` | `1` |

### terminal-to-browser-deploy

A CLI deploy completes, the terminal blurs back, and a browser window springs from the deploy URL.

*240f @ 30fps · vibe: tech*

```tsx
<TerminalToBrowserDeploy siteUrl="https://app.example.com" />
```

| Prop | Type | Default |
|---|---|---|
| `siteUrl` | `string` | `"https://app.example.com"` |
| `accentColor` | `string` | `"#22c55e"` |
| `speed` | `number` | `1` |

---

## Core library

### remocn-ui

Shared timeline-fold hook, theme context, and color math for remocn UI primitives.

Shared lib (`registry:lib`), not a visual component. Pulled automatically as a dependency by most UI Primitives. Install directly only when building your own primitive.
