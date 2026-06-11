"use client";

import { type RemocnTheme, useRemocnTheme } from "@/lib/remocn-ui";
import { Cursor } from "@/components/remocn/cursor";
import { useCursorPath } from "@/components/remocn/use-cursor-path";
import { Input } from "@/components/remocn/input";
import { useInputTransition } from "@/components/remocn/use-input-transition";
import { Button } from "@/components/remocn/button";
import { useButtonTransition } from "@/components/remocn/use-button-transition";
import { Toast } from "@/components/remocn/toast";
import { useToastTransition } from "@/components/remocn/use-toast-transition";
import {
  Field,
  FieldControl,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/remocn/field";

export interface SignupFlowProps {
  /** Card title. */
  title?: string;
  /** Card description under the title. */
  description?: string;
  /** Value typed into the Full Name field. */
  fullName?: string;
  /** Value typed into the Email field. */
  email?: string;
  /** Value typed into the password fields (rendered as the masked string). */
  password?: string;
  /** Primary submit button label. */
  createLabel?: string;
  /** Outline (social) button label. */
  googleLabel?: string;
  /** Footer prompt shown before the "Sign in" link. */
  signinText?: string;
  /** Title shown in the success toast. */
  toastTitle?: string;
  mode?: "light" | "dark";
  theme?: Partial<RemocnTheme>;
}

const STAGE_W = 1280;
const CARD_W = 376;
const CARD_TOP = 48;
const CARD_LEFT = (STAGE_W - CARD_W) / 2; // 452
const CENTER_X = STAGE_W / 2; // 640 — the centered content column

// Cursor tip targets — each control's vertical center, derived from the flow:
// card top 48 + pad 28 → content y 76. Header = title(28) + gap4 + desc(40, the
// description wraps to 2 lines in the 320px column) = 72 → ends 148. gap24 →
// FieldGroup at 172 (Field = label 18 + gap6 + control 40; group gap 16):
//   Name   control 196–236 → center 216
//   Email  control 276–316 → center 296   (+ desc 16)
//   Pass   control 378–418 → center 398   (+ desc 16)
//   Confirm control 480–520 → center 500
// gap24 → action Field at 544: Create control 544–584 → center 564.
// (The click only needs to land on the field; focus is frame-driven, so a few
// px of font drift is harmless.)
const NAME_Y = 216;
const EMAIL_Y = 296;
const PASS_Y = 398;
const CONFIRM_Y = 500;
const CREATE_Y = 564;

export function SignupFlow({
  title = "Create an account",
  description = "Enter your information below to create your account",
  fullName = "John Doe",
  email = "m@example.com",
  password = "••••••••",
  createLabel = "Create account",
  toastTitle = "Account created",
  mode = "light",
  theme,
}: SignupFlowProps) {
  const resolved = useRemocnTheme(theme, mode);
  const opts = { mode, theme };

  // Cursor: park → Name (18) → Email (52) → Password (96) → Confirm (134) →
  // Create (176). Each click `at` matches the target field's `active`/`hover`.
  const cursorStyle = useCursorPath([
    { at: 0, x: 160, y: 120 },
    { at: 18, x: CENTER_X, y: NAME_Y, duration: 18, click: true },
    { at: 52, x: CENTER_X, y: EMAIL_Y, duration: 30, click: true },
    { at: 96, x: CENTER_X, y: PASS_Y, duration: 40, click: true },
    { at: 134, x: CENTER_X, y: CONFIRM_Y, duration: 32, click: true },
    { at: 176, x: CENTER_X, y: CREATE_Y, duration: 38, click: true },
  ]);

  // Each field focuses on its click, then reveals its typed value. Each field's
  // own hook holds the filled visual afterward.
  // Each field focuses on its click, types its value, then BLURS (state `blur`)
  // the moment the cursor clicks the next field/button — so only the focused
  // field ever shows the ring + caret. `blur` keeps the value fully shown and
  // static (no un-typing); the previously-typed fields stay filled.
  const nameStyle = useInputTransition(
    [
      { at: 18, state: "active", duration: 6 },
      { at: 20, state: "typing", duration: 20 },
      { at: 52, state: "blur", duration: 8 },
    ],
    opts,
  );
  const emailStyle = useInputTransition(
    [
      { at: 52, state: "active", duration: 6 },
      { at: 54, state: "typing", duration: 28 },
      { at: 96, state: "blur", duration: 8 },
    ],
    opts,
  );
  const passStyle = useInputTransition(
    [
      { at: 96, state: "active", duration: 6 },
      { at: 98, state: "typing", duration: 22 },
      { at: 134, state: "blur", duration: 8 },
    ],
    opts,
  );
  const confirmStyle = useInputTransition(
    [
      { at: 134, state: "active", duration: 6 },
      { at: 136, state: "typing", duration: 22 },
      { at: 176, state: "blur", duration: 8 },
    ],
    opts,
  );

  // Create button: hover on arrival (176) → press → loading spinner → success.
  const buttonStyle = useButtonTransition(
    [
      { at: 176, state: "hover", duration: 8 },
      { at: 186, state: "press", duration: 6 },
      { at: 192, state: "loading", duration: 6 },
      { at: 234, state: "success", duration: 16 },
    ],
    opts,
  );

  // Toast: enters with success (234), auto-dismisses at 300. (No `theme` option
  // — the Toast component resolves the theme for its own surface.)
  const toastStyle = useToastTransition(
    [
      { at: 234, state: "visible", duration: 14 },
      { at: 300, state: "hidden", duration: 14 },
    ],
    { mode },
  );

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        background: resolved.muted,
        fontFamily:
          "var(--font-geist-sans), -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      {/* Card — surface = theme.background so the atoms' fills blend in. The
          content flows in a padded column. */}
      <div
        style={{
          position: "absolute",
          left: CARD_LEFT,
          top: CARD_TOP,
          width: CARD_W,
          height: 580,
          boxSizing: "border-box",
          padding: 28,
          display: "flex",
          flexDirection: "column",
          gap: 24,
          background: resolved.background,
          border: `1px solid ${resolved.border}`,
          borderRadius: 14,
          boxShadow:
            "0 10px 30px -12px rgba(0,0,0,0.22), 0 2px 8px -3px rgba(0,0,0,0.10)",
        }}
      >
        {/* Header. */}
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <div
            style={{
              fontSize: 22,
              lineHeight: "28px",
              fontWeight: 600,
              letterSpacing: "-0.02em",
              color: resolved.cardForeground,
            }}
          >
            {title}
          </div>
          <div
            style={{
              fontSize: 14,
              lineHeight: "20px",
              color: resolved.mutedForeground,
            }}
          >
            {description}
          </div>
        </div>

        {/* Fields. */}
        <FieldGroup gap={16}>
          <Field>
            <FieldLabel mode={mode} theme={theme}>
              Full Name
            </FieldLabel>
            <FieldControl>
              <Input
                placeholder={fullName}
                value={fullName}
                style={nameStyle}
                mode={mode}
                theme={theme}
              />
            </FieldControl>
          </Field>

          <Field>
            <FieldLabel mode={mode} theme={theme}>
              Email
            </FieldLabel>
            <FieldControl>
              <Input
                placeholder={email}
                value={email}
                style={emailStyle}
                mode={mode}
                theme={theme}
              />
            </FieldControl>
            <FieldDescription mode={mode} theme={theme}>
              We'll use this to contact you.
            </FieldDescription>
          </Field>

          <Field>
            <FieldLabel mode={mode} theme={theme}>
              Password
            </FieldLabel>
            <FieldControl>
              <Input
                placeholder={password}
                value={password}
                style={passStyle}
                mode={mode}
                theme={theme}
              />
            </FieldControl>
            <FieldDescription mode={mode} theme={theme}>
              Must be at least 8 characters long.
            </FieldDescription>
          </Field>

          <Field>
            <FieldLabel mode={mode} theme={theme}>
              Confirm Password
            </FieldLabel>
            <FieldControl>
              <Input
                placeholder={password}
                value={password}
                style={confirmStyle}
                mode={mode}
                theme={theme}
              />
            </FieldControl>
          </Field>
        </FieldGroup>

        {/* Actions + footer. */}
        <Field gap={10}>
          <FieldControl>
            <Button
              label={createLabel}
              style={buttonStyle}
              mode={mode}
              theme={theme}
            />
          </FieldControl>
        </Field>
      </div>

      {/* Success toast, anchored bottom-right of the stage. */}
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
