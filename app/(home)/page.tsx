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
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 800ms ${APPLE_EASE} ${delay}ms, transform 800ms ${APPLE_EASE} ${delay}ms`,
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
    <header className="fixed inset-x-0 top-0 z-40">
      <div
        className="absolute inset-x-0 bottom-0 h-px bg-white/10"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 20%, black 80%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 20%, black 80%, transparent)",
        }}
      />
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6 backdrop-blur-md">
        <Link
          href="/"
          className="font-semibold tracking-[-0.02em] text-[#EDEDED]"
        >
          remocn
        </Link>
        <nav className="flex items-center gap-6 text-sm text-[#888]">
          <Link
            href="/docs"
            className="transition-colors duration-75 hover:text-white"
          >
            Docs
          </Link>
          <Link
            href="https://github.com/remocn/remocn"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 transition-colors duration-75 hover:text-white"
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
  const heroEntry = registry["hero-device-assemble"];
  const [copied, setCopied] = useState(false);
  const cmd = "npx shadcn add remocn/hero-device-assemble";

  const copy = () => {
    navigator.clipboard?.writeText(cmd);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <section className="relative px-6 pt-40 pb-24">
      <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
        <Reveal>
          <a
            href="/docs"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.02] px-3 py-1 font-mono text-xs text-[#888] shadow-[0_0_24px_rgba(94,106,210,0.15)_inset] transition-colors hover:text-white"
          >
            <span className="size-1.5 rounded-full bg-[#5E6AD2] shadow-[0_0_8px_#5E6AD2]" />
            v1.0 is live
            <ArrowRight className="size-3" />
          </a>
        </Reveal>

        <Reveal delay={80}>
          <h1 className="mt-8 max-w-4xl text-balance text-5xl font-semibold leading-[1.05] tracking-[-0.04em] text-[#EDEDED] md:text-7xl">
            Cinematic{" "}
            <span className="bg-gradient-to-b from-white to-white/50 bg-clip-text text-transparent">
              video components
            </span>{" "}
            for React developers.
          </h1>
        </Reveal>

        <Reveal delay={160}>
          <p className="mt-6 max-w-2xl text-balance text-lg font-light leading-relaxed text-[#888]">
            Build launch videos, changelogs, and product demos using code. Copy,
            paste, and render in Remotion. Free &amp; open source.
          </p>
        </Reveal>

        <Reveal delay={240}>
          <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row">
            <Link
              href="/docs"
              className="inline-flex h-11 items-center gap-2 rounded-full bg-white px-5 text-sm font-medium text-black transition-transform duration-75 hover:scale-[1.02] active:scale-[0.99]"
            >
              Browse components
              <ArrowRight className="size-4" />
            </Link>
            <button
              type="button"
              onClick={copy}
              className="group inline-flex h-11 items-center gap-3 rounded-full border border-white/10 bg-white/[0.02] px-4 font-mono text-sm text-[#888] transition-colors duration-75 hover:border-white/20 hover:text-white"
            >
              <span className="text-[#5E6AD2]">$</span>
              <span>{cmd}</span>
              {copied ? (
                <Check className="size-3.5 text-emerald-400" />
              ) : (
                <Copy className="size-3.5 opacity-60 group-hover:opacity-100" />
              )}
            </button>
          </div>
        </Reveal>

        <Reveal delay={320} className="w-full">
          <div className="relative mt-20 w-full">
            <div
              aria-hidden
              className="absolute inset-0 -z-0"
              style={{
                background:
                  "radial-gradient(circle at center, rgba(94,106,210,0.18) 0%, rgba(157,78,221,0.06) 30%, transparent 60%)",
                filter: "blur(10px)",
              }}
            />
            <MacWindow className="relative mx-auto max-w-4xl">
              <div className="aspect-video w-full bg-black">
                {heroEntry ? (
                  <Player
                    component={heroEntry.Component}
                    inputProps={{ accentColor: "#5E6AD2" }}
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
            </MacWindow>
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
    <AbsoluteFill style={{ background: "#0A0A0A" }}>
      <StaggeredFadeUp
        text="Ship faster with remocn"
        fontSize={88}
        color="#EDEDED"
        staggerDelay={4}
      />
    </AbsoluteFill>
  );
}`;

  const entry = registry["staggered-fade-up"];

  return (
    <section className="relative border-t border-white/[0.04] px-6 py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="mb-16 max-w-2xl">
            <h2 className="text-4xl font-semibold tracking-[-0.03em] text-[#EDEDED] md:text-5xl">
              Code on the left.
              <br />
              <span className="text-[#666]">Pixels on the right.</span>
            </h2>
            <p className="mt-4 text-[#888]">
              Every component is just React. No timeline editor. No magic.
            </p>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="relative grid overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0A0A0A] lg:grid-cols-2">
            {/* Code side */}
            <div className="relative">
              <div className="flex items-center gap-1 border-b border-white/[0.06] px-4 py-2">
                <span className="rounded-md bg-white/[0.04] px-2.5 py-1 font-mono text-[11px] text-[#EDEDED]">
                  page.tsx
                </span>
                <span className="rounded-md px-2.5 py-1 font-mono text-[11px] text-[#666]">
                  Terminal
                </span>
              </div>
              <div className="not-prose [&_pre]:!m-0 [&_pre]:!rounded-none [&_pre]:!border-0 [&_pre]:!bg-transparent [&_pre]:!p-6 [&_pre]:!text-[13px]">
                <DynamicCodeBlock lang="tsx" code={sample} />
              </div>
            </div>

            {/* Vertical laser-cut divider */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-px lg:block"
              style={{
                background:
                  "linear-gradient(to bottom, transparent, rgba(255,255,255,0.12) 20%, rgba(255,255,255,0.12) 80%, transparent)",
              }}
            />

            {/* Preview side */}
            <div className="flex items-center justify-center border-t border-white/[0.06] bg-black p-6 lg:border-l-0 lg:border-t-0">
              <div className="aspect-video w-full overflow-hidden rounded-lg">
                {entry ? (
                  <Player
                    component={entry.Component}
                    inputProps={{
                      text: "Ship faster with remocn",
                      fontSize: 88,
                      color: "#EDEDED",
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
      className={`group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0A0A0A] ${className}`}
    >
      {/* Spotlight overlay (driven by parent --mx/--my) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(600px circle at var(--mx) var(--my), rgba(255,255,255,0.08), transparent 40%)",
        }}
      />
      {/* Border highlight */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl"
        style={{
          background:
            "radial-gradient(400px circle at var(--mx) var(--my), rgba(94,106,210,0.4), transparent 50%)",
          WebkitMask:
            "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          WebkitMaskComposite: "xor",
          mask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          maskComposite: "exclude",
          padding: 1,
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
      <div className="relative p-6">
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
    <section className="relative px-6 py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="mb-16 max-w-2xl">
            <h2 className="text-4xl font-semibold tracking-[-0.03em] text-[#EDEDED] md:text-5xl">
              A registry of motion.
            </h2>
            <p className="mt-4 text-[#888]">
              Transitions, primitives, text reveals — production-ready and
              hover-to-play.
            </p>
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
              description="From prompt to UI in a single composition."
              className="md:col-span-2 md:row-span-2"
            />
            <BentoCard
              name="shimmer-sweep"
              title="Shimmer Sweep"
              description="Light pass across text for AI accents."
              inputProps={{ text: "Generating..." }}
            />
            <BentoCard
              name="ecosystem-constellation"
              title="Ecosystem Constellation"
              description="Orbits of integration logos around your brand."
            />
          </div>
        </Reveal>

        <Reveal delay={200}>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <BentoCard
              name="kinetic-type-mask"
              title="Kinetic Type Mask"
              description="Use giant type as a window into the next scene."
            />
            <BentoCard
              name="frosted-glass-wipe"
              title="Frosted Glass Wipe"
              description="An elegant transition through a sheet of glass."
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function UseCases() {
  const cases = [
    {
      title: "Launch videos",
      copy: "Ship to Product Hunt with a masterpiece. Wire components, render once, post.",
      glow: "rgba(59, 130, 246, 0.18)",
      hint: (
        <svg
          viewBox="0 0 200 80"
          className="h-20 w-48 text-blue-400/40"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          role="img"
          aria-label="Trend chart"
        >
          <title>Trend chart</title>
          <path d="M0 60 L40 40 L80 50 L120 20 L160 35 L200 10" />
          <circle cx="120" cy="20" r="3" fill="currentColor" />
        </svg>
      ),
    },
    {
      title: "Changelogs",
      copy: "Turn boring release notes into viral tweets. One commit, one composition.",
      glow: "rgba(16, 185, 129, 0.18)",
      hint: (
        <div className="flex flex-col items-end gap-1.5 font-mono text-[10px] text-emerald-400/40">
          <div className="rounded border border-current px-2 py-0.5">
            v1.4.0
          </div>
          <div className="rounded border border-current/60 px-2 py-0.5">
            v1.3.2
          </div>
          <div className="rounded border border-current/40 px-2 py-0.5">
            v1.3.1
          </div>
        </div>
      ),
    },
    {
      title: "Documentation",
      copy: "Explain complex workflows visually. A 12-second clip beats a thousand words.",
      glow: "rgba(239, 68, 68, 0.18)",
      hint: (
        <svg
          viewBox="0 0 160 80"
          className="h-20 w-44 text-red-400/40"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          role="img"
          aria-label="Workflow diagram"
        >
          <title>Workflow diagram</title>
          <rect x="2" y="20" width="40" height="40" rx="4" />
          <rect x="60" y="20" width="40" height="40" rx="4" />
          <rect x="118" y="20" width="40" height="40" rx="4" />
          <path d="M42 40 L60 40 M100 40 L118 40" />
        </svg>
      ),
    },
  ];

  return (
    <section className="relative border-t border-white/[0.04] px-6 py-32">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <div className="mb-16 max-w-2xl">
            <h2 className="text-4xl font-semibold tracking-[-0.03em] text-[#EDEDED] md:text-5xl">
              Use cases.
            </h2>
            <p className="mt-4 text-[#888]">Three jobs remocn was built for.</p>
          </div>
        </Reveal>

        <div className="flex flex-col gap-4">
          {cases.map((c, i) => (
            <Reveal key={c.title} delay={i * 80}>
              <article
                className="group relative flex items-center justify-between overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0A0A0A] p-10"
                style={{
                  boxShadow: `inset -240px 0 220px -120px ${c.glow}`,
                }}
              >
                <div className="max-w-md">
                  <h3 className="text-2xl font-semibold tracking-[-0.02em] text-[#EDEDED]">
                    {c.title}
                  </h3>
                  <p className="mt-2 text-[#888]">{c.copy}</p>
                </div>
                <div className="hidden md:block">{c.hint}</div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const STACK_ITEMS = [
  "Remotion",
  "React",
  "Next.js",
  "Tailwind",
  "TypeScript",
  "shadcn/ui",
  "Framer Motion",
  "Vercel",
];

function TechStack() {
  return (
    <section className="relative border-t border-white/[0.04] py-24">
      <Reveal>
        <p className="text-center font-mono text-xs uppercase tracking-[0.2em] text-[#666]">
          Powered by the best
        </p>
      </Reveal>

      <div
        className="relative mt-10 overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
        }}
      >
        <div className="flex w-max animate-[remocn-marquee_30s_linear_infinite] gap-16">
          {[...STACK_ITEMS, ...STACK_ITEMS, ...STACK_ITEMS].map((item, i) => (
            <span
              // biome-ignore lint/suspicious/noArrayIndexKey: marquee duplication
              key={i}
              className="whitespace-nowrap text-2xl font-medium tracking-[-0.02em] text-white/30"
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

function FinalCTA() {
  const { ref, shown } = useInViewReveal<HTMLHeadingElement>(0.4);

  return (
    <section className="relative border-t border-white/[0.04] px-6 py-40">
      <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
        <h2
          ref={ref}
          className="text-balance text-5xl font-semibold text-[#EDEDED] md:text-6xl"
          style={{
            letterSpacing: shown ? "-0.04em" : "0.4em",
            filter: shown ? "blur(0px)" : "blur(10px)",
            opacity: shown ? 1 : 0,
            transition: `letter-spacing 1100ms ${APPLE_EASE}, filter 800ms ${APPLE_EASE}, opacity 800ms ${APPLE_EASE}`,
          }}
        >
          Stop fighting keyframes.
          <br />
          Start writing code.
        </h2>

        <Reveal delay={300}>
          <Link
            href="/docs"
            className="mt-12 inline-flex h-12 items-center gap-2 rounded-full bg-[#0A0A0A] px-6 text-sm font-medium text-[#EDEDED] transition-colors duration-75 hover:bg-[#121212]"
            style={{
              boxShadow:
                "0 0 0 1px rgba(255,255,255,0.1), 0 4px 14px rgba(0,0,0,0.5)",
            }}
          >
            View documentation
            <ArrowRight className="size-4" />
          </Link>
        </Reveal>
      </div>

      <footer className="mx-auto mt-32 flex max-w-5xl flex-col items-center justify-between gap-4 border-t border-white/[0.04] pt-8 text-xs text-[#666] md:flex-row">
        <span>© {new Date().getFullYear()} remocn. MIT licensed.</span>
        <nav className="flex gap-6">
          <Link
            href="/docs"
            className="transition-colors duration-75 hover:text-white"
          >
            Docs
          </Link>
          <Link
            href="https://github.com/remocn/remocn"
            className="transition-colors duration-75 hover:text-white"
          >
            GitHub
          </Link>
          <Link
            href="/docs"
            className="transition-colors duration-75 hover:text-white"
          >
            Components
          </Link>
        </nav>
      </footer>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                                    Page                                    */
/* -------------------------------------------------------------------------- */

export default function Page() {
  return (
    <div className="relative min-h-screen bg-black font-sans text-[#EDEDED] antialiased">
      <NoiseOverlay />
      <Header />
      <main>
        <Hero />
        <DXShowcase />
        <BentoRegistry />
        <UseCases />
        <TechStack />
        <FinalCTA />
      </main>
    </div>
  );
}
