"use client";

import { Player, type PlayerRef } from "@remotion/player";
import { DynamicCodeBlock } from "fumadocs-ui/components/dynamic-codeblock";
import { ArrowRight, Check, Copy } from "lucide-react";
import Link from "next/link";
import {
  type CSSProperties,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import registry from "@/registry/__index__";

/* -------------------------------------------------------------------------- */
/*                             Reusable utilities                             */
/* -------------------------------------------------------------------------- */

const APPLE_EASE = "cubic-bezier(0.16, 1, 0.3, 1)";
const SECTION_WRAPPER = "mx-auto w-full max-w-6xl px-6";

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const listener = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", listener);
    return () => mq.removeEventListener("change", listener);
  }, []);
  return reduced;
}

function useInViewReveal<T extends HTMLElement>(threshold = 0.15) {
  const ref = useRef<T>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setShown(true);
            io.disconnect();
            break;
          }
        }
      },
      { threshold },
    );
    io.observe(node);
    return () => io.disconnect();
  }, [threshold]);
  return { ref, shown };
}

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, shown } = useInViewReveal<HTMLDivElement>();
  const reduced = usePrefersReducedMotion();
  const visible = reduced || shown;
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: reduced
          ? "none"
          : `opacity 800ms ${APPLE_EASE} ${delay}ms, transform 800ms ${APPLE_EASE} ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

function MacWindow({
  children,
  className = "",
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-xl bg-[#0A0A0A] shadow-[0_40px_120px_-20px_rgba(0,0,0,0.9),0_0_0_1px_rgba(255,255,255,0.06)_inset] ${className}`}
      style={style}
    >
      <div className="flex h-9 items-center gap-1.5 border-b border-white/5 bg-[#0A0A0A] px-4">
        <span className="size-2.5 rounded-full bg-[#ff5f57]/60" />
        <span className="size-2.5 rounded-full bg-[#febc2e]/60" />
        <span className="size-2.5 rounded-full bg-[#28c840]/60" />
      </div>
      {children}
    </div>
  );
}

function GridBackground() {
  // Faint grid that fades out via a radial mask so it never competes for attention.
  const grid =
    "linear-gradient(to right, rgba(255,255,255,0.09) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.09) 1px, transparent 1px)";
  const mask =
    "radial-gradient(ellipse 70% 55% at 50% 35%, black 0%, rgba(0,0,0,0.6) 45%, transparent 80%)";
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0"
      style={{
        backgroundImage: grid,
        backgroundSize: "56px 56px",
        maskImage: mask,
        WebkitMaskImage: mask,
      }}
    />
  );
}

function NoiseOverlay() {
  // Inline SVG turbulence — kills color banding on the void-black background.
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>`;
  const url = `url("data:image/svg+xml;utf8,${svg}")`;
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-50"
      style={{
        backgroundImage: url,
        opacity: 0.035,
        mixBlendMode: "overlay",
      }}
    />
  );
}

/* -------------------------------------------------------------------------- */
/*                                  Sections                                  */
/* -------------------------------------------------------------------------- */

function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-white/[0.06] bg-black/60 backdrop-blur-xl">
      <div
        className={`flex h-14 items-center justify-between ${SECTION_WRAPPER}`}
      >
        <Link
          href="/"
          className="font-semibold tracking-[-0.02em] text-[#EDEDED] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/30 focus-visible:rounded-sm"
        >
          remocn
        </Link>
        <nav className="flex items-center gap-6 text-sm text-[#888]">
          <Link
            href="/docs"
            className="transition-colors duration-75 hover:text-white focus-visible:text-white focus-visible:outline-none"
          >
            Docs
          </Link>
          <Link
            href="https://github.com/remocn/remocn"
            target="_blank"
            rel="noreferrer noopener"
            className="flex items-center gap-1.5 transition-colors duration-75 hover:text-white focus-visible:text-white focus-visible:outline-none"
          >
            <svg
              viewBox="0 0 24 24"
              className="size-4"
              fill="currentColor"
              role="img"
              aria-label="GitHub"
            >
              <title>GitHub</title>
              <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.27-.01-1-.02-1.96-3.2.69-3.87-1.54-3.87-1.54-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.71 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.47.11-3.06 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.21-1.49 3.18-1.18 3.18-1.18.63 1.59.23 2.77.11 3.06.74.81 1.19 1.84 1.19 3.1 0 4.44-2.7 5.41-5.27 5.7.41.36.78 1.06.78 2.14 0 1.55-.01 2.8-.01 3.18 0 .31.21.68.8.56C20.21 21.39 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5Z" />
            </svg>
            GitHub
          </Link>
        </nav>
      </div>
    </header>
  );
}

function Hero() {
  const heroEntry = registry["browser-flow"];
  const [copied, setCopied] = useState(false);
  const cmd = "npx shadcn add remocn/browser-flow";

  const copy = () => {
    navigator.clipboard?.writeText(cmd);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <section className={`relative ${SECTION_WRAPPER} pt-40 pb-24`}>
      <div className="flex flex-col items-center text-center">
        <Reveal>
          <Link
            href="/docs"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.02] px-3 py-1 font-mono text-xs text-[#888] transition-colors hover:text-white focus-visible:text-white focus-visible:outline-none"
          >
            <span className="size-1.5 rounded-full bg-[#5E6AD2]" />
            v1.0 is live
            <ArrowRight className="size-3" aria-hidden="true" />
          </Link>
        </Reveal>

        <Reveal delay={80}>
          <h1 className="mt-8 max-w-6xl text-balance text-4xl font-semibold leading-[1.05] tracking-[-0.04em] text-[#EDEDED] md:text-6xl">
            Cinematic video components for React developers
          </h1>
        </Reveal>

        <Reveal delay={160}>
          <p className="mt-6 max-w-2xl text-balance text-lg font-light leading-relaxed text-[#888]">
            Build launch videos, changelogs, and product demos using code. Copy,
            paste, and render in Remotion. Free &amp; open source
          </p>
        </Reveal>

        <Reveal delay={240}>
          <div className="mt-10 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
            <Link
              href="/docs"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-white px-6 text-sm font-medium text-black transition-transform duration-75 hover:scale-[1.02] active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              Browse components
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
            <button
              type="button"
              onClick={copy}
              aria-label={copied ? "Command copied" : `Copy ${cmd}`}
              className="group inline-flex h-12 items-center gap-3 rounded-full border border-white/10 bg-white/[0.02] px-5 font-mono text-sm text-[#888] transition-colors duration-75 hover:border-white/20 hover:text-white focus-visible:border-white/30 focus-visible:text-white focus-visible:outline-none"
            >
              <span className="text-[#5E6AD2]" aria-hidden="true">
                $
              </span>
              <span>{cmd}</span>
              {copied ? (
                <Check
                  className="size-3.5 text-emerald-400"
                  aria-hidden="true"
                />
              ) : (
                <Copy
                  className="size-3.5 opacity-60 group-hover:opacity-100"
                  aria-hidden="true"
                />
              )}
            </button>
          </div>
        </Reveal>

        <Reveal delay={320} className="w-full">
          <div className="relative mt-20 w-full">
            <div className="aspect-video w-full bg-black">
              {heroEntry ? (
                <Player
                  component={heroEntry.Component}
                  inputProps={{ url: "remocn.dev" }}
                  durationInFrames={heroEntry.config.durationInFrames}
                  fps={heroEntry.config.fps}
                  compositionWidth={heroEntry.config.compositionWidth}
                  compositionHeight={heroEntry.config.compositionHeight}
                  style={{ width: "100%", height: "100%" }}
                  autoPlay
                  loop
                  acknowledgeRemotionLicense
                />
              ) : null}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function DXShowcase() {
  const sample = `import { StaggeredFadeUp } from "@/components/remocn/staggered-fade-up";
import { AbsoluteFill } from "remotion";

export default function Scene() {
  return (
    <AbsoluteFill style={{ background: "#fafafa" }}>
      <StaggeredFadeUp
        text="Ship faster with remocn"
        fontSize={88}
        color="#0A0A0A"
        staggerDelay={4}
      />
    </AbsoluteFill>
  );
}`;

  const entry = registry["staggered-fade-up"];

  return (
    <section className="relative border-t border-white/[0.04] py-32">
      <div className={SECTION_WRAPPER}>
        <Reveal>
          <div className="mb-16 max-w-2xl">
            <h2 className="text-4xl font-semibold tracking-[-0.03em] text-[#EDEDED] md:text-5xl">
              Code on the left
              <br />
              <span className="text-[#666]">pixels on the right</span>
            </h2>
            <p className="mt-4 text-[#888]">
              Every component is just React. No timeline editor, no magic
            </p>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="grid overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0A0A0A] lg:grid-cols-2 lg:items-stretch">
            {/* Code side */}
            <div className="flex flex-col">
              <div className="flex items-center gap-1 border-b border-white/[0.06] px-4 py-2.5">
                <span className="rounded-md bg-white/[0.06] px-2.5 py-1 font-mono text-[11px] text-[#EDEDED]">
                  page.tsx
                </span>
                <span className="rounded-md px-2.5 py-1 font-mono text-[11px] text-[#666]">
                  Terminal
                </span>
              </div>
              <div className="flex-1 [&_.shiki]:!bg-transparent [&_figure]:!m-0 [&_figure]:!h-full [&_pre]:!m-0 [&_pre]:!h-full [&_pre]:!max-h-none [&_pre]:!overflow-visible [&_pre]:!rounded-none [&_pre]:!border-0 [&_pre]:!bg-transparent [&_pre]:!p-6 [&_pre]:!text-[13px]">
                <DynamicCodeBlock lang="tsx" code={sample} />
              </div>
            </div>

            {/* Preview side */}
            <div className="flex items-center justify-center border-t border-white/[0.06] bg-[#fafafa] p-8 lg:border-l lg:border-t-0">
              <div className="aspect-video w-full overflow-hidden rounded-lg bg-[#fafafa]">
                {entry ? (
                  <Player
                    component={entry.Component}
                    inputProps={{
                      text: "Ship faster with remocn",
                      fontSize: 88,
                      color: "#0A0A0A",
                      staggerDelay: 4,
                      distance: 20,
                      fontWeight: "600",
                    }}
                    durationInFrames={entry.config.durationInFrames}
                    fps={entry.config.fps}
                    compositionWidth={entry.config.compositionWidth}
                    compositionHeight={entry.config.compositionHeight}
                    style={{ width: "100%", height: "100%" }}
                    autoPlay
                    loop
                    acknowledgeRemotionLicense
                  />
                ) : null}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function BentoCard({
  name,
  title,
  description,
  className = "",
  inputProps,
}: {
  name: string;
  title: string;
  description: string;
  className?: string;
  inputProps?: Record<string, unknown>;
}) {
  const entry = registry[name];
  const playerRef = useRef<PlayerRef>(null);

  const handleEnter = () => {
    playerRef.current?.play();
  };
  const handleLeave = () => {
    playerRef.current?.pause();
  };

  return (
    // biome-ignore lint/a11y/noStaticElementInteractions: hover-to-play is decorative video preview, no semantic action
    <div
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className={`group relative flex flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0A0A0A] ${className}`}
    >
      {/* Spotlight overlay (driven by parent --mx/--my) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(600px circle at var(--mx) var(--my), rgba(255,255,255,0.06), transparent 40%)",
        }}
      />

      <div className="relative aspect-[16/9] w-full overflow-hidden bg-black">
        {entry ? (
          <Player
            ref={playerRef}
            component={entry.Component}
            inputProps={inputProps ?? {}}
            durationInFrames={entry.config.durationInFrames}
            fps={entry.config.fps}
            compositionWidth={entry.config.compositionWidth}
            compositionHeight={entry.config.compositionHeight}
            style={{ width: "100%", height: "100%" }}
            loop
            acknowledgeRemotionLicense
          />
        ) : null}
      </div>
      <div className="relative flex-1 p-6">
        <h3 className="text-base font-medium text-[#EDEDED]">{title}</h3>
        <p className="mt-1 text-sm text-[#888]">{description}</p>
      </div>
    </div>
  );
}

function BentoRegistry() {
  const gridRef = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = gridRef.current?.getBoundingClientRect();
    if (!rect) return;
    gridRef.current?.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    gridRef.current?.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  return (
    <section className="relative py-32">
      <div className={SECTION_WRAPPER}>
        <Reveal>
          <div className="mb-16 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <h2 className="text-4xl font-semibold tracking-[-0.03em] text-[#EDEDED] md:text-5xl">
                A registry of motion
              </h2>
              <p className="mt-4 text-[#888]">
                Transitions, primitives, text reveals — production-ready and
                hover to play
              </p>
            </div>
            <Link
              href="/docs"
              className="group inline-flex h-11 shrink-0 items-center gap-2 self-start rounded-full border border-white/10 bg-white/[0.02] px-5 text-sm font-medium text-[#EDEDED] transition-colors duration-75 hover:border-white/20 hover:bg-white/[0.04] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/30 sm:self-auto"
            >
              Browse components
              <ArrowRight
                className="size-4 transition-transform duration-150 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>
          </div>
        </Reveal>

        <Reveal delay={120}>
          {/* biome-ignore lint/a11y/noStaticElementInteractions: spotlight cursor tracking is purely visual */}
          <div
            ref={gridRef}
            onMouseMove={handleMove}
            className="grid gap-4 md:grid-cols-3 md:grid-rows-2"
            style={
              {
                "--mx": "50%",
                "--my": "50%",
              } as CSSProperties
            }
          >
            <BentoCard
              name="ai-generation-canvas"
              title="AI Generation Canvas"
              description="From prompt to UI in a single composition"
              className="md:col-span-2 md:row-span-2"
            />
            <BentoCard
              name="shimmer-sweep"
              title="Shimmer Sweep"
              description="Light pass across text for AI accents"
              inputProps={{ text: "Generating" }}
            />
            <BentoCard
              name="ecosystem-constellation"
              title="Ecosystem Constellation"
              description="Orbits of integration logos around your brand"
            />
          </div>
        </Reveal>

        <Reveal delay={200}>
          {/* biome-ignore lint/a11y/noStaticElementInteractions: spotlight cursor tracking is purely visual */}
          <div
            onMouseMove={handleMove}
            className="mt-4 grid gap-4 md:grid-cols-2"
          >
            <BentoCard
              name="grid-pixelate-wipe"
              title="Grid Pixelate Wipe"
              description="The screen breaks into squares and reassembles into a new scene"
            />
            <BentoCard
              name="frosted-glass-wipe"
              title="Frosted Glass Wipe"
              description="An elegant transition through a sheet of glass"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                                 Use cases                                  */
/* -------------------------------------------------------------------------- */

function CaseChartVisual() {
  return (
    <div className="relative h-full w-full">
      <div className="absolute inset-0 flex items-end gap-2 px-4 pt-4">
        {[34, 52, 28, 71, 44, 88, 64, 95, 76, 100].map((h, i) => (
          <div
            // biome-ignore lint/suspicious/noArrayIndexKey: static demo data
            key={i}
            className="flex-1 rounded-sm bg-white/15"
            style={{ height: `${h}%` }}
          />
        ))}
      </div>
      <div className="absolute inset-x-4 top-3 flex items-center justify-between font-mono text-[10px] text-white/40 tabular-nums">
        <span>upvotes</span>
        <span className="text-emerald-300/70">+412</span>
      </div>
    </div>
  );
}

function CaseChangelogVisual() {
  return (
    <div className="flex h-full flex-col gap-2 p-4 font-mono text-[11px] text-white/50">
      <div className="flex items-center gap-2">
        <span className="rounded-sm border border-white/15 bg-white/[0.04] px-1.5 py-0.5 text-[10px] text-white/70">
          v1.4.0
        </span>
        <span className="text-white/30">just now</span>
      </div>
      <div className="space-y-1 leading-relaxed text-white/40">
        <div>+ added marquee easing</div>
        <div>+ shipped 12 new transitions</div>
        <div className="text-white/30">- removed legacy spring helper</div>
      </div>
      <div className="mt-auto flex items-center gap-1.5 text-[10px] text-white/30">
        <span className="size-1 rounded-full bg-emerald-400/70" />
        rendered &amp; pushed
      </div>
    </div>
  );
}

function CaseDocsVisual() {
  return (
    <div className="grid h-full grid-cols-3 gap-2 p-4">
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <div
          key={i}
          className="rounded-md border border-white/10 bg-white/[0.02] p-2"
        >
          <div className="h-1.5 w-2/3 rounded-full bg-white/15" />
          <div className="mt-1.5 h-1 w-full rounded-full bg-white/8" />
          <div className="mt-1 h-1 w-4/5 rounded-full bg-white/8" />
        </div>
      ))}
    </div>
  );
}

function UseCases() {
  const cases = [
    {
      label: "Marketing",
      title: "Launch videos",
      copy: "Ship to Product Hunt with a masterpiece. Wire components, render once, post anywhere",
      stat: "12 PH #1s",
      glow: "rgba(94, 106, 210, 0.18)",
      Visual: CaseChartVisual,
    },
    {
      label: "DevRel",
      title: "Changelogs",
      copy: "Turn boring release notes into viral tweets. One commit, one composition, one render",
      stat: "Render in 8s",
      glow: "rgba(16, 185, 129, 0.16)",
      Visual: CaseChangelogVisual,
    },
    {
      label: "Documentation",
      title: "Docs that move",
      copy: "Explain complex workflows visually. A twelve second clip beats a thousand words every time",
      stat: "12s clips",
      glow: "rgba(244, 114, 182, 0.14)",
      Visual: CaseDocsVisual,
    },
  ];

  return (
    <section className="relative border-t border-white/[0.04] py-32">
      <div className={SECTION_WRAPPER}>
        <Reveal>
          <div className="mb-16 max-w-2xl">
            <h2 className="text-4xl font-semibold tracking-[-0.03em] text-[#EDEDED] md:text-5xl">
              Built for three jobs
            </h2>
            <p className="mt-4 text-[#888]">
              Marketing launches, release notes, and visual docs — without
              opening a video editor
            </p>
          </div>
        </Reveal>

        <div className="grid gap-4 md:grid-cols-3">
          {cases.map((c, i) => {
            const Visual = c.Visual;
            return (
              <Reveal key={c.title} delay={i * 80}>
                <article
                  className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0A0A0A]"
                  style={{
                    boxShadow: `inset 0 -120px 140px -100px ${c.glow}`,
                  }}
                >
                  <div className="relative h-44 w-full overflow-hidden border-b border-white/[0.06] bg-black/40">
                    <Visual />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <span className="font-mono text-[11px] text-[#666]">
                      {c.label}
                    </span>
                    <h3 className="mt-2 text-2xl font-semibold tracking-[-0.02em] text-[#EDEDED]">
                      {c.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-[#888]">
                      {c.copy}
                    </p>
                    <div className="mt-6 flex items-center justify-between border-t border-white/[0.04] pt-4">
                      <span className="font-mono text-[11px] text-[#666] tabular-nums">
                        {c.stat}
                      </span>
                      <Link
                        href="/docs"
                        className="inline-flex items-center gap-1 text-xs text-[#888] transition-colors duration-75 hover:text-white focus-visible:text-white focus-visible:outline-none"
                      >
                        Learn more
                        <ArrowRight className="size-3" aria-hidden="true" />
                      </Link>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  const { ref, shown } = useInViewReveal<HTMLHeadingElement>(0.4);
  const reduced = usePrefersReducedMotion();
  const visible = reduced || shown;

  return (
    <section className="relative border-t border-white/[0.04] py-40">
      <div
        className={`${SECTION_WRAPPER} flex flex-col items-center text-center`}
      >
        <h2
          ref={ref}
          className="text-balance text-5xl font-semibold tracking-[-0.03em] text-[#EDEDED] md:text-6xl"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(24px)",
            filter: visible ? "blur(0px)" : "blur(12px)",
            transition: reduced
              ? "none"
              : `opacity 900ms ${APPLE_EASE}, transform 900ms ${APPLE_EASE}, filter 900ms ${APPLE_EASE}`,
          }}
        >
          Stop fighting keyframes
          <br />
          Start writing code
        </h2>

        <Reveal delay={300}>
          <Link
            href="/docs"
            className="mt-12 inline-flex h-12 items-center gap-2 rounded-full border border-white/10 bg-[#0A0A0A] px-6 text-sm font-medium text-[#EDEDED] transition-colors duration-75 hover:border-white/20 hover:bg-[#121212] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/30"
          >
            View documentation
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </Reveal>
      </div>

      <div className={SECTION_WRAPPER}>
        <footer className="mt-32 flex flex-col items-start justify-between gap-4 border-t border-white/[0.04] pt-8 text-xs text-[#666] md:flex-row md:items-center">
          <span suppressHydrationWarning>
            © {new Date().getFullYear()} remocn — MIT licensed
          </span>
          <nav className="flex gap-6">
            <Link
              href="/docs"
              className="transition-colors duration-75 hover:text-white focus-visible:text-white focus-visible:outline-none"
            >
              Docs
            </Link>
            <Link
              href="https://github.com/remocn/remocn"
              className="transition-colors duration-75 hover:text-white focus-visible:text-white focus-visible:outline-none"
            >
              GitHub
            </Link>
            <Link
              href="/docs"
              className="transition-colors duration-75 hover:text-white focus-visible:text-white focus-visible:outline-none"
            >
              Components
            </Link>
          </nav>
        </footer>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                                    Page                                    */
/* -------------------------------------------------------------------------- */

export default function Page() {
  return (
    <div
      className="relative min-h-screen bg-black font-sans text-[#EDEDED] antialiased"
      style={{ colorScheme: "dark" }}
    >
      <GridBackground />
      <NoiseOverlay />
      <Header />
      <main className="relative z-10">
        <Hero />
        <DXShowcase />
        <BentoRegistry />
        <UseCases />
        <FinalCTA />
      </main>
    </div>
  );
}
