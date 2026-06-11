"use client";

import { type RemocnTheme, useRemocnTheme } from "@/lib/remocn-ui";
import { Input } from "@/components/remocn/input";
import { useInputTransition } from "@/components/remocn/use-input-transition";
import { Button } from "@/components/remocn/button";
import { useButtonTransition } from "@/components/remocn/use-button-transition";
import { Skeleton } from "@/components/remocn/skeleton";
import { SkeletonBlock } from "@/components/remocn/skeleton-block";
import { useSkeletonTransition } from "@/components/remocn/use-skeleton-transition";
import { Toast } from "@/components/remocn/toast";
import { useToastTransition } from "@/components/remocn/use-toast-transition";

export interface AiPromptFlowProps {
  /** Prompt typed into the field during the reveal. */
  prompt?: string;
  /** Submit button label. */
  buttonLabel?: string;
  /** Generated answer, as discrete lines (defines the response box). */
  answerLines?: string[];
  /** Title shown in the ready toast. */
  toastTitle?: string;
  mode?: "light" | "dark";
  theme?: Partial<RemocnTheme>;
}

// Stage layout — the prompt field and answer box paint their own full-bleed
// backgrounds, so each is pinned inside a non-overlapping slot it fills. The
// answer column is fixed-width so the skeleton placeholder and the real answer
// share one box (crossfade never resizes it).
const STAGE_W = 1280;
const PROMPT_W = 520;
const PROMPT_LEFT = (STAGE_W - PROMPT_W) / 2; // 380
const PROMPT_TOP = 168;
const PROMPT_H = 92;

const BTN_W = 200;
const BTN_LEFT = (STAGE_W - BTN_W) / 2; // 540
const BTN_TOP = 278;
const BTN_H = 64;

const ANSWER_W = 560;
const ANSWER_LEFT = (STAGE_W - ANSWER_W) / 2; // 360
const ANSWER_TOP = 380;

const DEFAULT_ANSWER = [
  "The thread debates the Q3 roadmap: ship the editor first,",
  "defer billing to Q4, and pull the migration forward so",
  "infra is unblocked before the team scales next quarter.",
];

/**
 * Prompt → submit → skeleton shimmer → crossfade into the answer → ready toast.
 * A pure orchestrator: typing/button/skeleton/toast are each driven by their own
 * transition hook, and the shimmer is owned entirely by the `skeleton-block`
 * motion atom. The block holds no state, effects, or frame reads of its own.
 * Beat timings mirror US-B002's beat table.
 */
export function AiPromptFlow({
  prompt = "Summarize this thread",
  buttonLabel = "Generate",
  answerLines = DEFAULT_ANSWER,
  toastTitle = "Response ready",
  mode = "light",
  theme,
}: AiPromptFlowProps) {
  const resolved = useRemocnTheme(theme, mode);
  const opts = { mode, theme };

  // Input: focus, then reveal the typed prompt over 0→50.
  const inputStyle = useInputTransition(
    [
      { at: 0, state: "active", duration: 1 },
      { at: 0, state: "typing", duration: 50 },
    ],
    opts,
  );

  // Button: hover after typing settles (52) → press → loading spinner. It stays
  // loading while the skeleton shimmers.
  const buttonStyle = useButtonTransition(
    [
      { at: 52, state: "hover", duration: 6 },
      { at: 58, state: "press", duration: 4 },
      { at: 62, state: "loading", duration: 4 },
    ],
    opts,
  );

  // Skeleton: loads on submit (64), crossfades to the answer at 150. The two
  // opacities sum to 1, so the box never jumps. (No `theme` option — the
  // Skeleton component itself threads the theme into its blocks.)
  const skeletonStyle = useSkeletonTransition(
    [
      { at: 64, state: "loading", duration: 1 },
      { at: 150, state: "loaded", duration: 16 },
    ],
    { mode },
  );

  // Output-panel reveal vs. answer-text reveal are TWO distinct moments, owned
  // by two different channels — do not conflate them:
  //   • The output PANEL (the shimmer area) stays blank during prompt typing and
  //     appears when generation STARTS. That onset is the button's already-
  //     exposed `spinnerOpacity` channel — it ramps 0→1 as the button enters
  //     `loading` (~62) — read linearly here (sanctioned §0B.3 read; semantics
  //     correct: panel reveal == submit, never during typing).
  //   • The answer TEXT is revealed later, at 150, ENTIRELY by the Skeleton
  //     primitive's loaded crossfade (`contentOpacity`) — NOT by this gate. This
  //     gate only hides the empty/shimmering area while the prompt is typed.
  const panelOpacity = buttonStyle.spinnerOpacity;

  // Toast: enters once the crossfade settles (160), auto-dismisses at 220.
  // (No `theme` option — the Toast component resolves its own surface theme.)
  const toastStyle = useToastTransition(
    [
      { at: 160, state: "visible", duration: 14 },
      { at: 220, state: "hidden", duration: 14 },
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
      {/* Prompt field slot. */}
      <div
        style={{
          position: "absolute",
          left: PROMPT_LEFT,
          top: PROMPT_TOP,
          width: PROMPT_W,
          height: PROMPT_H,
        }}
      >
        <Input
          placeholder="Ask anything…"
          value={prompt}
          style={inputStyle}
          mode={mode}
          theme={theme}
        />
      </div>

      {/* Generate button slot. */}
      <div
        style={{
          position: "absolute",
          left: BTN_LEFT,
          top: BTN_TOP,
          width: BTN_W,
          height: BTN_H,
        }}
      >
        <Button
          label={buttonLabel}
          style={buttonStyle}
          mode={mode}
          theme={theme}
        />
      </div>

      {/* Output panel — appears on submit (panelOpacity), then the Skeleton
          shimmer crossfades into the real answer lines at 150 (contentOpacity,
          primitive-owned). The real content sits in normal flow and sets the box
          height; the shimmer placeholder mirrors it as SkeletonBlock rows. */}
      <div
        style={{
          position: "absolute",
          left: ANSWER_LEFT,
          top: ANSWER_TOP,
          width: ANSWER_W,
          display: "flex",
          justifyContent: "center",
          opacity: panelOpacity,
        }}
      >
        <Skeleton
          style={skeletonStyle}
          mode={mode}
          theme={theme}
          placeholder={
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 14,
                width: ANSWER_W,
              }}
            >
              {answerLines.map((_, i) => (
                <SkeletonBlock
                  key={i}
                  width={i === answerLines.length - 1 ? "70%" : "100%"}
                  height={18}
                  baseColor={resolved.muted}
                />
              ))}
            </div>
          }
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 8,
              width: ANSWER_W,
              fontFamily:
                "var(--font-geist-sans), -apple-system, BlinkMacSystemFont, sans-serif",
              fontSize: 18,
              lineHeight: 1.45,
              letterSpacing: "-0.01em",
              color: resolved.foreground,
            }}
          >
            {answerLines.map((line, i) => (
              <span key={i}>{line}</span>
            ))}
          </div>
        </Skeleton>
      </div>

      {/* Ready toast, anchored bottom-right. */}
      <div style={{ position: "absolute", right: 32, bottom: 32 }}>
        <Toast
          title={toastTitle}
          variant="success"
          style={toastStyle}
          mode={mode}
          theme={theme}
        />
      </div>
    </div>
  );
}
