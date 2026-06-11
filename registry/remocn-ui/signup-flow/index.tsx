"use client";

import { type RemocnTheme, useRemocnTheme } from "@/lib/remocn-ui";
import { Cursor } from "@/components/remocn/cursor";
import { useCursorPath } from "@/components/remocn/use-cursor-path";
import { Input } from "@/components/remocn/input";
import { useInputTransition } from "@/components/remocn/use-input-transition";
import { Checkbox } from "@/components/remocn/checkbox";
import { useCheckboxTransition } from "@/components/remocn/use-checkbox-transition";
import { Button } from "@/components/remocn/button";
import { useButtonTransition } from "@/components/remocn/use-button-transition";
import { Toast } from "@/components/remocn/toast";
import { useToastTransition } from "@/components/remocn/use-toast-transition";

export interface SignupFlowProps {
  /** Value typed into the email field during the reveal. */
  email?: string;
  /** Label rendered next to the checkbox. */
  agreeLabel?: string;
  /** Submit button label. */
  buttonLabel?: string;
  /** Title shown in the success toast. */
  toastTitle?: string;
  mode?: "light" | "dark";
  theme?: Partial<RemocnTheme>;
}

// Stage layout — each form atom paints its own full-bleed background, so it is
// pinned inside a non-overlapping slot whose box it fills. The slots stack into
// a centered vertical form; the cursor tip targets each slot's visual center.
const STAGE_W = 1280;
const FORM_W = 440;
const FORM_LEFT = (STAGE_W - FORM_W) / 2; // 420

const INPUT_TOP = 206;
const INPUT_H = 90;
const CHECK_TOP = 318;
const CHECK_H = 52;
const BUTTON_TOP = 392;
const BUTTON_H = 84;

// Cursor tip targets (slot centers on the 1280×720 stage).
const INPUT_X = STAGE_W / 2;
const INPUT_Y = INPUT_TOP + INPUT_H / 2; // 251
const CHECK_X = STAGE_W / 2;
const CHECK_Y = CHECK_TOP + CHECK_H / 2; // 344
const BTN_X = STAGE_W / 2;
const BTN_Y = BUTTON_TOP + BUTTON_H / 2; // 434

/**
 * Cursor-driven signup: click the email field → typing reveal → check "agree" →
 * click Create → loading → success → success toast. A pure orchestrator — every
 * animated channel comes from a primitive's own transition hook
 * (`useCursorPath`/`use*Transition`); the block holds no state, effects, or
 * frame reads of its own. Beat timings mirror US-B001's beat table.
 */
export function SignupFlow({
  email = "jane@acme.com",
  agreeLabel = "I agree to the terms",
  buttonLabel = "Create account",
  toastTitle = "Account created",
  mode = "light",
  theme,
}: SignupFlowProps) {
  const resolved = useRemocnTheme(theme, mode);
  const opts = { mode, theme };

  // Cursor: park top-left → arrive Input (click 30) → arrive Checkbox (click
  // 80) → arrive Button (click 95). Each click `at` matches the target atom's
  // state change `at` (beats 2≡3, 5/6, 7≡8).
  const cursorStyle = useCursorPath([
    { at: 0, x: 120, y: 90 },
    { at: 30, x: INPUT_X, y: INPUT_Y, duration: 26, click: true },
    { at: 80, x: CHECK_X, y: CHECK_Y, duration: 30, click: true },
    { at: 95, x: BTN_X, y: BTN_Y, duration: 13, click: true },
  ]);

  // Input: focus on click (30), then reveal the typed email over 30→70.
  const inputStyle = useInputTransition(
    [
      { at: 30, state: "active", duration: 6 },
      { at: 30, state: "typing", duration: 40 },
    ],
    opts,
  );

  // Checkbox: draw the checkmark just after the click lands (82 = click+2).
  const checkboxStyle = useCheckboxTransition(
    [{ at: 82, state: "checked", duration: 12 }],
    opts,
  );

  // Button: hover on cursor arrival (95) → press → loading spinner → success.
  const buttonStyle = useButtonTransition(
    [
      { at: 95, state: "hover", duration: 8 },
      { at: 104, state: "press", duration: 6 },
      { at: 110, state: "loading", duration: 6 },
      { at: 150, state: "success", duration: 16 },
    ],
    opts,
  );

  // Toast: enters with success (150), auto-dismisses at 210. (No `theme`
  // option — the Toast component itself resolves the theme for its surface.)
  const toastStyle = useToastTransition(
    [
      { at: 150, state: "visible", duration: 14 },
      { at: 210, state: "hidden", duration: 14 },
    ],
    { mode },
  );

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        background: resolved.background,
      }}
    >
      {/* Email field slot — Input fills this box and centers its 320px field. */}
      <div
        style={{
          position: "absolute",
          left: FORM_LEFT,
          top: INPUT_TOP,
          width: FORM_W,
          height: INPUT_H,
        }}
      >
        <Input
          placeholder="you@example.com"
          value={email}
          valueWidth={108}
          style={inputStyle}
          mode={mode}
          theme={theme}
        />
      </div>

      {/* Agree checkbox slot. */}
      <div
        style={{
          position: "absolute",
          left: FORM_LEFT,
          top: CHECK_TOP,
          width: FORM_W,
          height: CHECK_H,
        }}
      >
        <Checkbox
          label={agreeLabel}
          style={checkboxStyle}
          mode={mode}
          theme={theme}
        />
      </div>

      {/* Submit button slot. */}
      <div
        style={{
          position: "absolute",
          left: FORM_LEFT,
          top: BUTTON_TOP,
          width: FORM_W,
          height: BUTTON_H,
        }}
      >
        <Button
          label={buttonLabel}
          style={buttonStyle}
          mode={mode}
          theme={theme}
        />
      </div>

      {/* Success toast, anchored bottom-right. */}
      <div style={{ position: "absolute", right: 32, bottom: 32 }}>
        <Toast
          title={toastTitle}
          variant="success"
          style={toastStyle}
          mode={mode}
          theme={theme}
        />
      </div>

      <Cursor style={cursorStyle} variant="pointer" mode={mode} theme={theme} />
    </div>
  );
}
