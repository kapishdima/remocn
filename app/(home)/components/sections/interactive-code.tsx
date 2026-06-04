"use client";

import { Player } from "@remotion/player";
import { ChevronDown } from "lucide-react";
import { motion } from "motion/react";
import {
  type KeyboardEvent,
  type PointerEvent,
  type ReactNode,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";
import { SECTION, SPRING_SOFT } from "@/config/landing";
import { useTrackEvent } from "@/lib/analytics";
import registry from "@/registry/__index__";
import { FadeUp } from "../fade-up";
import { SectionHeading } from "../section-heading";

const COMPONENT = "typewriter";

const DEFAULTS = {
  text: "Ship it in React",
  fontSize: 104,
  color: "#171717",
  fontWeight: 700,
  cursor: true,
};

// Editor syntax palette — fixed dark theme so the card reads as a code editor
// in both light and dark site themes (mirrors the reference mock).
const SYNTAX = {
  keyword: "#c792ea",
  type: "#c9b3ff",
  fn: "#82aaff",
  prop: "#a6accd",
  string: "#c3e88d",
  number: "#89ddff",
  boolean: "#f78c6c",
  punctuation: "#676e95",
  plain: "#bcc2e0",
};

function Token({ color, children }: { color: string; children: ReactNode }) {
  return <span style={{ color }}>{children}</span>;
}

const CHIP =
  "rounded-[5px] bg-white/[0.07] px-1 align-baseline outline-none ring-1 ring-transparent transition-colors hover:bg-white/[0.12] focus-visible:bg-white/[0.12] focus-visible:ring-white/30";

const EDIT_INPUT =
  "rounded-[5px] bg-white/[0.12] px-1 align-baseline outline-none ring-1 ring-white/30";

/** Horizontal-drag number, with click-to-type and keyboard nudge. */
function DraggableNumber({
  value,
  onChange,
  min,
  max,
  step = 1,
  pxPerStep = 6,
  label,
}: {
  value: number;
  onChange: (next: number) => void;
  min: number;
  max: number;
  step?: number;
  pxPerStep?: number;
  label: string;
}) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState("");
  const drag = useRef<{ startX: number; startVal: number; moved: boolean } | null>(
    null,
  );

  const clamp = useCallback(
    (n: number) => Math.min(max, Math.max(min, n)),
    [min, max],
  );

  const onPointerDown = (e: PointerEvent<HTMLButtonElement>) => {
    if (editing) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    drag.current = { startX: e.clientX, startVal: value, moved: false };
  };

  const onPointerMove = (e: PointerEvent<HTMLButtonElement>) => {
    const d = drag.current;
    if (!d) return;
    const dx = e.clientX - d.startX;
    if (Math.abs(dx) > 3) d.moved = true;
    const next = clamp(d.startVal + Math.round(dx / pxPerStep) * step);
    if (next !== value) onChange(next);
  };

  const onPointerUp = (e: PointerEvent<HTMLButtonElement>) => {
    const d = drag.current;
    drag.current = null;
    e.currentTarget.releasePointerCapture?.(e.pointerId);
    if (d && !d.moved) {
      setDraft(String(value));
      setEditing(true);
    }
  };

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "ArrowUp" || e.key === "ArrowRight") {
      e.preventDefault();
      onChange(clamp(value + step));
    } else if (e.key === "ArrowDown" || e.key === "ArrowLeft") {
      e.preventDefault();
      onChange(clamp(value - step));
    } else if (e.key === "Enter") {
      e.preventDefault();
      setDraft(String(value));
      setEditing(true);
    }
  };

  const commit = () => {
    const parsed = Number(draft);
    if (Number.isFinite(parsed)) onChange(clamp(parsed));
    setEditing(false);
  };

  if (editing) {
    return (
      <input
        // biome-ignore lint/a11y/noAutofocus: focus follows an explicit click-to-edit
        autoFocus
        type="text"
        inputMode="numeric"
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onBlur={commit}
        onKeyDown={(e) => {
          if (e.key === "Enter") commit();
          if (e.key === "Escape") setEditing(false);
        }}
        style={{ color: SYNTAX.number, width: `${Math.max(draft.length, 1)}ch` }}
        className={EDIT_INPUT}
      />
    );
  }

  return (
    <button
      type="button"
      aria-label={`${label}: ${value}. Drag or use arrow keys to change.`}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onKeyDown={onKeyDown}
      style={{ color: SYNTAX.number, touchAction: "none" }}
      className={`${CHIP} cursor-ew-resize select-none`}
    >
      {value}
    </button>
  );
}

/** Quoted string value that becomes an inline input on click. */
function EditableString({
  value,
  onChange,
}: {
  value: string;
  onChange: (next: string) => void;
}) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState("");

  const commit = () => {
    onChange(draft);
    setEditing(false);
  };

  if (editing) {
    return (
      <span style={{ color: SYNTAX.string }}>
        "
        <input
          // biome-ignore lint/a11y/noAutofocus: focus follows an explicit click-to-edit
          autoFocus
          type="text"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onBlur={commit}
          onKeyDown={(e) => {
            if (e.key === "Enter") commit();
            if (e.key === "Escape") setEditing(false);
          }}
          style={{
            color: SYNTAX.string,
            width: `${Math.max(draft.length, 1)}ch`,
          }}
          className={EDIT_INPUT}
        />
        "
      </span>
    );
  }

  return (
    <button
      type="button"
      aria-label="Edit text"
      onClick={() => {
        setDraft(value);
        setEditing(true);
      }}
      style={{ color: SYNTAX.string }}
      className={`${CHIP} cursor-text`}
    >
      "{value}"
    </button>
  );
}

/** Color swatch + hex that opens the native color picker on click. */
function ColorValue({
  value,
  onChange,
}: {
  value: string;
  onChange: (next: string) => void;
}) {
  return (
    <span
      style={{ color: SYNTAX.string }}
      className={`${CHIP} relative inline-flex cursor-pointer items-center gap-1.5`}
    >
      <span
        aria-hidden
        className="size-2.5 rounded-full ring-1 ring-white/20"
        style={{ backgroundColor: value }}
      />
      "{value.toUpperCase()}"
      <input
        type="color"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Text color"
        className="absolute inset-0 cursor-pointer opacity-0"
      />
    </span>
  );
}

/** Boolean literal that toggles on click / Enter / Space. */
function ToggleBool({
  value,
  onChange,
}: {
  value: boolean;
  onChange: (next: boolean) => void;
}) {
  return (
    <button
      type="button"
      aria-label="Toggle cursor"
      aria-pressed={value}
      onClick={() => onChange(!value)}
      style={{ color: SYNTAX.boolean }}
      className={`${CHIP} cursor-pointer select-none`}
    >
      {String(value)}
    </button>
  );
}

export function InteractiveCode() {
  const entry = registry[COMPONENT];

  const [text, setText] = useState(DEFAULTS.text);
  const [fontSize, setFontSize] = useState(DEFAULTS.fontSize);
  const [color, setColor] = useState(DEFAULTS.color);
  const [fontWeight, setFontWeight] = useState(DEFAULTS.fontWeight);
  const [cursor, setCursor] = useState(DEFAULTS.cursor);

  const trackEvent = useTrackEvent();
  const timers = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());
  const track = useCallback(
    (prop: string) => {
      const existing = timers.current.get(prop);
      if (existing) clearTimeout(existing);
      timers.current.set(
        prop,
        setTimeout(() => {
          trackEvent("component_customized", { component: COMPONENT, prop });
          timers.current.delete(prop);
        }, 500),
      );
    },
    [trackEvent],
  );

  const set =
    <T,>(setter: (v: T) => void, prop: string) =>
    (v: T) => {
      setter(v);
      track(prop);
    };

  const inputProps = useMemo(
    () => ({ text, fontSize, color, cursorColor: color, fontWeight, cursor }),
    [text, fontSize, color, fontWeight, cursor],
  );

  const aspectRatio = entry
    ? `${entry.config.compositionWidth} / ${entry.config.compositionHeight}`
    : "16 / 9";

  return (
    <section id="showcase" className="relative py-20 sm:py-32">
      <div className={SECTION}>
        <SectionHeading
          eyebrow="It's just props"
          title="Tweak it live"
          lead="Every component is plain React driven by the Remotion API. Drag a number, click a color — the props are the controls, and the frame re-renders instantly."
        />

        <FadeUp delay={0.1}>
          <div className="mt-12 grid items-stretch gap-6 sm:mt-16 lg:grid-cols-2">
            {/* Interactive code editor — the JSX values are the controls. */}
            <div className="relative overflow-hidden rounded-2xl bg-[#0f0e17] ring-1 ring-white/10 sm:rounded-3xl">
              {/* Title bar */}
              <div className="relative flex items-center justify-between border-b border-white/[0.06] px-5 py-4">
                <div className="flex items-center gap-2">
                  <span className="size-3 rounded-full bg-white/15" />
                  <span className="size-3 rounded-full bg-white/15" />
                  <span className="size-3 rounded-full bg-white/15" />
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-lg bg-white/5 px-2.5 py-1 text-xs font-medium text-white/55 ring-1 ring-white/10">
                  Typewriter
                  <ChevronDown className="size-3.5" />
                </span>
              </div>

              {/* Code */}
              <pre className="relative overflow-x-auto px-6 py-6 font-mono text-[13px] leading-[1.95] whitespace-pre [scrollbar-width:none] sm:text-sm [&::-webkit-scrollbar]:hidden">
                <code>
                  <Token color={SYNTAX.keyword}>import</Token>
                  <Token color={SYNTAX.plain}>{" { "}</Token>
                  <Token color={SYNTAX.type}>Typewriter</Token>
                  <Token color={SYNTAX.plain}>{" } "}</Token>
                  <Token color={SYNTAX.keyword}>from</Token>{" "}
                  <Token color={SYNTAX.string}>
                    "@/components/remocn/typewriter"
                  </Token>
                  <Token color={SYNTAX.punctuation}>;</Token>
                  {"\n\n"}
                  <Token color={SYNTAX.keyword}>export function</Token>{" "}
                  <Token color={SYNTAX.fn}>Hero</Token>
                  <Token color={SYNTAX.punctuation}>{"() {"}</Token>
                  {"\n  "}
                  <Token color={SYNTAX.keyword}>return</Token>{" "}
                  <Token color={SYNTAX.punctuation}>(</Token>
                  {"\n    "}
                  <Token color={SYNTAX.punctuation}>{"<"}</Token>
                  <Token color={SYNTAX.type}>Typewriter</Token>
                  {"\n      "}
                  <Token color={SYNTAX.prop}>text</Token>
                  <Token color={SYNTAX.punctuation}>=</Token>
                  <EditableString value={text} onChange={set(setText, "text")} />
                  {"\n      "}
                  <Token color={SYNTAX.prop}>fontSize</Token>
                  <Token color={SYNTAX.punctuation}>={"{"}</Token>
                  <DraggableNumber
                    value={fontSize}
                    onChange={set(setFontSize, "fontSize")}
                    min={48}
                    max={160}
                    step={1}
                    pxPerStep={4}
                    label="Font size"
                  />
                  <Token color={SYNTAX.punctuation}>{"}"}</Token>
                  {"\n      "}
                  <Token color={SYNTAX.prop}>color</Token>
                  <Token color={SYNTAX.punctuation}>=</Token>
                  <ColorValue value={color} onChange={set(setColor, "color")} />
                  {"\n      "}
                  <Token color={SYNTAX.prop}>fontWeight</Token>
                  <Token color={SYNTAX.punctuation}>={"{"}</Token>
                  <DraggableNumber
                    value={fontWeight}
                    onChange={set(setFontWeight, "fontWeight")}
                    min={100}
                    max={900}
                    step={100}
                    pxPerStep={10}
                    label="Font weight"
                  />
                  <Token color={SYNTAX.punctuation}>{"}"}</Token>
                  {"\n      "}
                  <Token color={SYNTAX.prop}>cursor</Token>
                  <Token color={SYNTAX.punctuation}>={"{"}</Token>
                  <ToggleBool
                    value={cursor}
                    onChange={set(setCursor, "cursor")}
                  />
                  <Token color={SYNTAX.punctuation}>{"}"}</Token>
                  {"\n    "}
                  <Token color={SYNTAX.punctuation}>{"/>"}</Token>
                  {"\n  "}
                  <Token color={SYNTAX.punctuation}>)</Token>
                  {"\n"}
                  <Token color={SYNTAX.punctuation}>{"}"}</Token>
                </code>
              </pre>

              {/* Footer hint */}
              <div className="relative flex justify-end px-6 pb-5">
                <span className="font-mono text-xs text-white/30">
                  Drag or click values to edit
                </span>
              </div>
            </div>

            {/* Live preview — the real registry Typewriter. */}
            <motion.div
              whileHover={{ y: -4 }}
              transition={SPRING_SOFT}
              className="relative flex items-center justify-center overflow-hidden rounded-2xl bg-white shadow-2xl shadow-black/5 ring-1 ring-black/5 sm:rounded-3xl"
            >
              <div className="w-full" style={{ aspectRatio }}>
                {entry ? (
                  <Player
                    component={entry.Component}
                    inputProps={inputProps}
                    durationInFrames={entry.config.durationInFrames}
                    fps={entry.config.fps}
                    compositionWidth={entry.config.compositionWidth}
                    compositionHeight={entry.config.compositionHeight}
                    style={{ width: "100%", height: "100%", display: "block" }}
                    autoPlay
                    loop
                    acknowledgeRemotionLicense
                  />
                ) : null}
              </div>
            </motion.div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
