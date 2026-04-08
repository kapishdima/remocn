"use client";

import { Player, type PlayerRef } from "@remotion/player";
import { ArrowRight } from "lucide-react";
import { motion, useInView, useReducedMotion } from "motion/react";
import Link from "next/link";
import { type CSSProperties, type ReactNode, useRef, useState } from "react";
import Aurora from "@/components/Aurora";
import Dither from "@/components/Dither";
import Silk from "@/components/Silk";
import { Button } from "@/components/ui/button";
import registry from "@/registry/__index__";

/* -------------------------------------------------------------------------- */
/*                                  Tokens                                    */
/* -------------------------------------------------------------------------- */

const SECTION = "mx-auto w-full max-w-6xl px-6";

// Pastel accent palette — peach / lavender / mint
const PEACH = "#FFB38E";
const LAVENDER = "#D4B3FF";
const MINT = "#A1EEBD";

const SPRING_BOUNCE = { type: "spring" as const, stiffness: 120, damping: 14 };
const SPRING_SOFT = { type: "spring" as const, stiffness: 180, damping: 22 };

/* -------------------------------------------------------------------------- */
/*                              Helper components                             */
/* -------------------------------------------------------------------------- */

function FadeUp({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const reduced = useReducedMotion();
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={reduced ? false : { opacity: 0, y: 24, filter: "blur(8px)" }}
      animate={
        inView
          ? { opacity: 1, y: 0, filter: "blur(0px)" }
          : { opacity: 0, y: 24, filter: "blur(8px)" }
      }
      transition={{ ...SPRING_BOUNCE, delay }}
    >
      {children}
    </motion.div>
  );
}

function NoiseOverlay() {
  // Inline turbulence — sits on top of everything, ties tones together
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>`;
  const url = `url("data:image/svg+xml;utf8,${svg}")`;
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[60]"
      style={{
        backgroundImage: url,
        opacity: 0.04,
        mixBlendMode: "overlay",
      }}
    />
  );
}

/* -------------------------------------------------------------------------- */
/*                                   Header                                   */
/* -------------------------------------------------------------------------- */

function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-white/[0.05] bg-[#141318]/60 backdrop-blur-2xl">
      <div className={`flex h-16 items-center justify-between ${SECTION}`}>
        <Link
          href="/"
          className="font-[var(--font-display)] text-lg font-semibold -tracking-wide text-[#EDEDED] focus-visible:outline-none"
        >
          remocn
        </Link>
        <nav className="flex items-center gap-7 text-sm text-[#8B8A91]">
          <Link
            href="#showcase"
            className="hidden transition-colors hover:text-white focus-visible:text-white focus-visible:outline-none sm:inline"
          >
            Showcase
          </Link>
          <Link
            href="#components"
            className="hidden transition-colors hover:text-white focus-visible:text-white focus-visible:outline-none sm:inline"
          >
            Components
          </Link>
          <Link
            href="#use-cases"
            className="hidden transition-colors hover:text-white focus-visible:text-white focus-visible:outline-none sm:inline"
          >
            Use cases
          </Link>
          <Link
            href="/docs"
            className="transition-colors hover:text-white focus-visible:text-white focus-visible:outline-none"
          >
            Docs
          </Link>
          <Link
            href="https://github.com/remocn/remocn"
            target="_blank"
            rel="noreferrer noopener"
            className="flex items-center gap-1.5 transition-colors hover:text-white focus-visible:text-white focus-visible:outline-none"
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

/* -------------------------------------------------------------------------- */
/*                                    Hero                                    */
/* -------------------------------------------------------------------------- */

function Hero() {
  const heroEntry = registry["browser-flow"];

  return (
    <section className="relative overflow-hidden pt-44 pb-28">
      <div className="w-full h-screen absolute top-0 left-0">
        <Dither
          waveColor={[
            0.25098039215686274, 0.25098039215686274, 0.25098039215686274,
          ]}
          disableAnimation={false}
          enableMouseInteraction={false}
          mouseRadius={1}
          colorNum={6}
          pixelSize={2}
          waveAmplitude={0.35}
          waveFrequency={5.5}
          waveSpeed={0.01}
        />
      </div>
      <div className={SECTION}>
        <div className="flex flex-col items-center text-center">
          <FadeUp delay={0.08}>
            <h1 className="mt-8 max-w-8xl text-balance font-sans text-5xl font-semibold leading-[1.05] -tracking-[0.04em] text-[#EDEDED] md:text-7xl">
              Cinematic video components
              <br />
              Now copy-pasteable
            </h1>
          </FadeUp>

          <FadeUp delay={0.16}>
            <p className="mt-6 max-w-2xl text-balance text-xl font-light leading-relaxed text-white">
              Build product demos, changelogs, and launch videos in React. Open
              source and delightfully easy
            </p>
          </FadeUp>

          <FadeUp delay={0.24}>
            <div className="mt-10 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={SPRING_SOFT}
              >
                <Button className="hover:bg-white h-14 px-10">
                  <Link href="/docs" className="inline-flex items-center gap-2">
                    Browse components
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </Link>
                </Button>
              </motion.div>
            </div>
          </FadeUp>
        </div>
      </div>

      <FadeUp delay={0.32} className="relative mt-10 w-full">
        <motion.div
          className="relative flex justify-center"
          initial={{ y: 40 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ ...SPRING_BOUNCE, delay: 0.1 }}
        >
          <div className="relative w-[80vw] h-screen overflow-hidden rounded-3xl">
            {heroEntry ? (
              <Player
                component={heroEntry.Component}
                inputProps={{ url: "remocn.dev" }}
                durationInFrames={heroEntry.config.durationInFrames}
                fps={heroEntry.config.fps}
                compositionWidth={heroEntry.config.compositionWidth}
                compositionHeight={heroEntry.config.compositionHeight}
                style={{
                  width: "100%",
                  height: "100%",
                  display: "block",
                }}
                autoPlay
                loop
                acknowledgeRemotionLicense
              />
            ) : null}
          </div>
        </motion.div>
      </FadeUp>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                            Landing code showcase                           */
/* -------------------------------------------------------------------------- */

function LandingCodeShowcaseSection() {
  const entry = registry["landing-code-showcase"];
  const aspectRatio =
    entry &&
    `${entry.config.compositionWidth} / ${entry.config.compositionHeight}`;

  return (
    <section id="showcase" className="relative py-32">
      {/* Header sits inside the standard SECTION width for readable copy */}
      <div className={SECTION}>
        <FadeUp>
          <div className="mb-16 max-w-2xl">
            <h2 className="font-[var(--font-display)] text-4xl font-semibold -tracking-wide text-[#EDEDED] md:text-5xl">
              Type a prop
              <br />
              <span className="text-[#8B8A91]">ship a frame</span>
            </h2>
            <p className="mt-4 text-[#8B8A91]">
              Every component is just React. Watch the preview react to your
              code in real time
            </p>
          </div>
        </FadeUp>
      </div>

      {/* Showcase block breaks out of the section width so the player has
          room for the wide composition. */}
      <div className="mx-auto w-full max-w-[1600px] px-6">
        <FadeUp delay={0.1}>
          <motion.div
            whileHover={{ y: -4 }}
            transition={SPRING_SOFT}
            className="overflow-hidden rounded-3xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-2xl"
            style={{
              boxShadow: `0 30px 80px -30px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.05)`,
            }}
          >
            <div className="w-full" style={{ aspectRatio }}>
              {entry ? (
                <Player
                  component={entry.Component}
                  inputProps={{ accentColor: PEACH }}
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
        </FadeUp>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                              Bento registry                                */
/* -------------------------------------------------------------------------- */

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

  const handleEnter = () => playerRef.current?.play();
  const handleLeave = () => playerRef.current?.pause();

  return (
    // biome-ignore lint/a11y/noStaticElementInteractions: hover-to-play is decorative video preview
    <motion.div
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      whileHover={{ y: -4 }}
      transition={SPRING_SOFT}
      className={`group relative flex flex-col overflow-hidden rounded-3xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-2xl ${className}`}
      style={{
        boxShadow: `0 20px 50px -20px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.06)`,
      }}
    >
      {/* Spotlight overlay (driven by parent --mx/--my) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(500px circle at var(--mx) var(--my), rgba(255,255,255,0.07), transparent 40%)",
        }}
      />

      <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#0A090E]">
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
        <h3 className="font-[var(--font-display)] text-base font-medium text-[#EDEDED]">
          {title}
        </h3>
        <p className="mt-1 text-sm text-[#8B8A91]">{description}</p>
      </div>
    </motion.div>
  );
}

function BentoRegistry() {
  const gridRef = useRef<HTMLDivElement>(null);
  const grid2Ref = useRef<HTMLDivElement>(null);

  const handleMove = (
    e: React.MouseEvent<HTMLDivElement>,
    target: HTMLDivElement | null,
  ) => {
    if (!target) return;
    const rect = target.getBoundingClientRect();
    target.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    target.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  return (
    <section id="components" className="relative py-32">
      <div className={SECTION}>
        <FadeUp>
          <div className="mb-16 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <h2 className="font-[var(--font-display)] text-4xl font-semibold -tracking-wide text-[#EDEDED] md:text-5xl">
                A registry of motion
              </h2>
              <p className="mt-4 text-[#8B8A91]">
                Transitions, primitives, text reveals — production-ready and
                hover to play
              </p>
            </div>
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={SPRING_SOFT}
            >
              <Link
                href="/docs"
                className="group inline-flex h-11 shrink-0 items-center gap-2 self-start rounded-full border border-white/10 bg-white/[0.04] px-5 text-sm font-medium text-[#EDEDED] backdrop-blur-xl transition-colors hover:border-white/20 hover:bg-white/[0.06] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/30 sm:self-auto"
              >
                Browse components
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </motion.div>
          </div>
        </FadeUp>

        <FadeUp delay={0.1}>
          {/* biome-ignore lint/a11y/noStaticElementInteractions: spotlight cursor tracking is purely visual */}
          <div
            ref={gridRef}
            onMouseMove={(e) => handleMove(e, gridRef.current)}
            className="grid gap-6 md:grid-cols-3 md:grid-rows-2"
            style={{ "--mx": "50%", "--my": "50%" } as CSSProperties}
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
        </FadeUp>

        <FadeUp delay={0.18}>
          {/* biome-ignore lint/a11y/noStaticElementInteractions: spotlight cursor tracking is purely visual */}
          <div
            ref={grid2Ref}
            onMouseMove={(e) => handleMove(e, grid2Ref.current)}
            className="mt-6 grid gap-6 md:grid-cols-2"
            style={{ "--mx": "50%", "--my": "50%" } as CSSProperties}
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
        </FadeUp>
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
            className="flex-1 rounded-t-md"
            style={{
              height: `${h}%`,
              background: `linear-gradient(to top, ${PEACH}50, ${PEACH}10)`,
            }}
          />
        ))}
      </div>
      <div className="absolute inset-x-4 top-3 flex items-center justify-between font-mono text-[10px] text-white/40 tabular-nums">
        <span>upvotes</span>
        <span style={{ color: PEACH }}>+412</span>
      </div>
    </div>
  );
}

function CaseChangelogVisual() {
  return (
    <div className="flex h-full flex-col gap-2 p-5 font-mono text-[11px] text-white/50">
      <div className="flex items-center gap-2">
        <span
          className="rounded-full border px-2 py-0.5 text-[10px]"
          style={{
            borderColor: `${MINT}40`,
            color: MINT,
            background: `${MINT}10`,
          }}
        >
          v1.4.0
        </span>
        <span className="text-white/30">just now</span>
      </div>
      <div className="space-y-1 leading-relaxed text-white/50">
        <div>+ added marquee easing</div>
        <div>+ shipped 12 new transitions</div>
        <div className="text-white/30">- removed legacy spring helper</div>
      </div>
      <div className="mt-auto flex items-center gap-1.5 text-[10px] text-white/40">
        <span
          className="size-1.5 rounded-full"
          style={{ background: MINT, boxShadow: `0 0 8px ${MINT}` }}
        />
        rendered &amp; pushed
      </div>
    </div>
  );
}

function CaseDocsVisual() {
  return (
    <div className="grid h-full grid-cols-3 gap-2 p-5">
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <div
          key={i}
          className="rounded-xl border border-white/10 bg-white/[0.03] p-2.5"
        >
          <div
            className="h-1.5 w-2/3 rounded-full"
            style={{ background: `${LAVENDER}50` }}
          />
          <div className="mt-1.5 h-1 w-full rounded-full bg-white/10" />
          <div className="mt-1 h-1 w-4/5 rounded-full bg-white/10" />
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
      glow: PEACH,
      Visual: CaseChartVisual,
    },
    {
      label: "DevRel",
      title: "Changelogs",
      copy: "Turn boring release notes into viral tweets. One commit, one composition, one render",
      stat: "Render in 8s",
      glow: MINT,
      Visual: CaseChangelogVisual,
    },
    {
      label: "Documentation",
      title: "Docs that move",
      copy: "Explain complex workflows visually. A twelve second clip beats a thousand words every time",
      stat: "12s clips",
      glow: LAVENDER,
      Visual: CaseDocsVisual,
    },
  ];

  return (
    <section id="use-cases" className="relative py-32">
      <div className={SECTION}>
        <FadeUp>
          <div className="mb-16 max-w-2xl">
            <h2 className="font-[var(--font-display)] text-4xl font-semibold -tracking-wide text-[#EDEDED] md:text-5xl">
              Built for three jobs
            </h2>
            <p className="mt-4 text-[#8B8A91]">
              Marketing launches, release notes, and visual docs — without
              opening a video editor
            </p>
          </div>
        </FadeUp>

        <div className="grid gap-6 md:grid-cols-3">
          {cases.map((c, i) => {
            const Visual = c.Visual;
            return (
              <FadeUp key={c.title} delay={i * 0.08}>
                <motion.article
                  whileHover={{ y: -6 }}
                  transition={SPRING_BOUNCE}
                  className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-2xl"
                >
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -bottom-20 -right-20 h-60 w-60 rounded-full opacity-60 transition-opacity group-hover:opacity-100"
                    style={{
                      background: `radial-gradient(circle, ${c.glow}40, transparent 60%)`,
                      filter: "blur(40px)",
                    }}
                  />
                  <div className="relative h-44 w-full overflow-hidden border-b border-white/[0.05]">
                    <Visual />
                  </div>
                  <div className="relative flex flex-1 flex-col p-6">
                    <span className="font-mono text-[11px] text-[#666]">
                      {c.label}
                    </span>
                    <h3 className="mt-2 font-[var(--font-display)] text-2xl font-semibold -tracking-wide text-[#EDEDED]">
                      {c.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-[#8B8A91]">
                      {c.copy}
                    </p>
                    <div className="mt-6 flex items-center justify-between border-t border-white/[0.04] pt-4">
                      <span
                        className="font-mono text-[11px] tabular-nums"
                        style={{ color: c.glow }}
                      >
                        {c.stat}
                      </span>
                      <Link
                        href="/docs"
                        className="inline-flex items-center gap-1 text-xs text-[#8B8A91] transition-colors hover:text-white focus-visible:text-white focus-visible:outline-none"
                      >
                        Learn more
                        <ArrowRight className="size-3" aria-hidden="true" />
                      </Link>
                    </div>
                  </div>
                </motion.article>
              </FadeUp>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                                Stack marquee                               */
/* -------------------------------------------------------------------------- */

const STACK = [
  "Remotion",
  "React",
  "Next.js",
  "Tailwind",
  "TypeScript",
  "shadcn/ui",
  "Vercel",
];

function StackMarquee() {
  return (
    <section className="relative py-20">
      <div
        className="relative overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
        }}
      >
        <div className="flex w-max animate-[remocn-marquee_36s_linear_infinite] gap-16">
          {[...STACK, ...STACK, ...STACK].map((item, i) => (
            <span
              // biome-ignore lint/suspicious/noArrayIndexKey: marquee duplication
              key={i}
              className="whitespace-nowrap font-[var(--font-display)] text-2xl font-medium -tracking-wide text-white/30"
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      <style jsx global>{`
        @keyframes remocn-marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.3333%); }
        }
      `}</style>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                                 Final CTA                                  */
/* -------------------------------------------------------------------------- */

function FinalCTA() {
  const ref = useRef<HTMLHeadingElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const reduced = useReducedMotion();

  return (
    <section className="relative overflow-hidden py-40">
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background: `radial-gradient(60% 50% at 50% 50%, ${LAVENDER}15, transparent 70%), radial-gradient(40% 40% at 20% 80%, ${PEACH}12, transparent 60%), radial-gradient(40% 40% at 80% 20%, ${MINT}12, transparent 60%)`,
          filter: "blur(40px)",
        }}
      />
      <div className={`${SECTION} flex flex-col items-center text-center`}>
        <motion.h2
          ref={ref}
          className="text-balance font-[var(--font-display)] text-5xl font-semibold -tracking-wide text-[#EDEDED] md:text-6xl"
          initial={
            reduced ? false : { opacity: 0, y: 30, filter: "blur(14px)" }
          }
          animate={
            inView
              ? { opacity: 1, y: 0, filter: "blur(0px)" }
              : { opacity: 0, y: 30, filter: "blur(14px)" }
          }
          transition={{ ...SPRING_BOUNCE, duration: 1 }}
        >
          Stop fighting keyframes
          <br />
          Start writing code
        </motion.h2>

        <FadeUp delay={0.3}>
          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={SPRING_SOFT}
          >
            <Link
              href="/docs"
              className="mt-12 inline-flex h-14 items-center gap-2 rounded-full bg-white px-8 text-base font-medium text-[#141318] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#141318]"
              style={{
                boxShadow: `0 0 0 1px rgba(255,255,255,0.2), 0 12px 50px ${LAVENDER}40, inset 0 1px 0 rgba(255,255,255,0.6)`,
              }}
            >
              View documentation
              <ArrowRight className="size-5" aria-hidden="true" />
            </Link>
          </motion.div>
        </FadeUp>
      </div>

      <div className={SECTION}>
        <footer className="mt-32 flex flex-col items-start justify-between gap-4 border-t border-white/[0.05] pt-8 text-xs text-[#666] md:flex-row md:items-center">
          <span suppressHydrationWarning>
            © {new Date().getFullYear()} remocn — MIT licensed
          </span>
          <nav className="flex gap-6">
            <Link
              href="/docs"
              className="transition-colors hover:text-white focus-visible:text-white focus-visible:outline-none"
            >
              Docs
            </Link>
            <Link
              href="https://github.com/remocn/remocn"
              className="transition-colors hover:text-white focus-visible:text-white focus-visible:outline-none"
            >
              GitHub
            </Link>
            <Link
              href="/docs"
              className="transition-colors hover:text-white focus-visible:text-white focus-visible:outline-none"
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
      className="relative min-h-screen overflow-hidden bg-black font-sans text-[#EDEDED] antialiased"
      style={{ colorScheme: "dark" }}
    >
      <Header />
      <main className="relative">
        <Hero />
        <LandingCodeShowcaseSection />
        <BentoRegistry />
        <UseCases />
        <FinalCTA />
      </main>
    </div>
  );
}
