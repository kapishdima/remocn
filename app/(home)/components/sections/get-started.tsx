import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { CodeBlockCommand } from "@/components/docs/code-block-command";
import { LAVENDER, MINT, PEACH, SECTION } from "@/config/landing";
import { convertNpmCommand } from "@/lib/convert-npm-command";
import { FadeUp } from "../fade-up";
import { SectionHeading } from "../section-heading";
import { Tok, TypewriterCodeBlock } from "../typewriter-code-block";

type Step = {
  n: number;
  title: string;
  description: string;
  command: string;
  component?: string;
  /** Pastel accent that differentiates this step from its neighbours. */
  accent: string;
};

const START: Step = {
  n: 1,
  title: "Start with Remotion",
  description:
    "Already have a Remotion project? Skip ahead. Otherwise scaffold one in seconds.",
  command: "npx create-video@latest",
  accent: PEACH,
};

const INIT: Step = {
  n: 2,
  title: "Set up shadcn",
  description:
    "Run the shadcn init once so the CLI knows where to drop component files in your project.",
  command: "npx shadcn@latest init",
  accent: MINT,
};

const ADD: Step = {
  n: 3,
  title: "Add a component",
  description:
    "Pull any primitive or composition straight into your project with the shadcn CLI — the code lands in your repo, yours to tweak.",
  command: "npx shadcn@latest add remocn/blur-reveal",
  component: "blur-reveal",
  accent: LAVENDER,
};

const RENDER: Step = {
  n: 4,
  title: "Render your video",
  description:
    "Drop the component into a composition and export an mp4 — no editor required.",
  command: "npx remotion render",
  accent: PEACH,
};

/** A taste of what `remocn/<name>` pulls in — fills the featured card. */
const SAMPLE_COMPONENTS = [
  "blur-reveal",
  "shimmer-sweep",
  "frosted-glass-wipe",
  "grid-pixelate-wipe",
];

function StepBadge({ n, accent }: { n: number; accent: string }) {
  return (
    <span
      className="flex size-8 shrink-0 items-center justify-center rounded-full border font-mono text-sm font-medium text-foreground tabular-nums"
      style={{
        backgroundColor: `color-mix(in oklab, ${accent} 16%, transparent)`,
        borderColor: `color-mix(in oklab, ${accent} 45%, transparent)`,
      }}
    >
      {n}
    </span>
  );
}

function CompactStep({ step, delay }: { step: Step; delay: number }) {
  return (
    <FadeUp delay={delay} className="min-w-0">
      <div className="surface-card flex min-w-0 flex-col gap-4 rounded-2xl p-5 sm:p-4">
        <div className="flex items-center gap-3">
          <StepBadge n={step.n} accent={step.accent} />
          <h3 className="text-base font-semibold tracking-tight text-foreground">
            {step.title}
          </h3>
        </div>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {step.description}
        </p>
        <CodeBlockCommand
          component={step.component}
          variant="outline"
          {...convertNpmCommand(step.command)}
        />
      </div>
    </FadeUp>
  );
}

function FeaturedStep({ step, delay }: { step: Step; delay: number }) {
  return (
    <FadeUp delay={delay} className="min-w-0">
      <div className="surface-card flex min-w-0 flex-col gap-5 rounded-2xl p-6 sm:rounded-3xl sm:p-6">
        <div className="flex items-center gap-3">
          <StepBadge n={step.n} accent={step.accent} />
          <h3 className="text-lg font-semibold tracking-tight text-foreground">
            {step.title}
          </h3>
        </div>

        <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
          {step.description}
        </p>

        <CodeBlockCommand
          component={step.component}
          variant="outline"
          {...convertNpmCommand(step.command)}
        />

        <TypewriterCodeBlock
          header={false}
          text={<Tok kind="string">"Hello, world"</Tok>}
          fontSize={<Tok kind="number">72</Tok>}
          color={<Tok kind="string">"#171717"</Tok>}
          fontWeight={<Tok kind="number">700</Tok>}
          cursor={<Tok kind="boolean">true</Tok>}
        />

        <div className="flex flex-wrap items-center gap-2 pt-1">
          {SAMPLE_COMPONENTS.map((name) => (
            <span
              key={name}
              className="rounded-lg border border-border bg-muted/40 px-2.5 py-1 text-xs text-muted-foreground"
            >
              {name}
            </span>
          ))}
          <Link
            href="/docs/components"
            className="rounded-lg px-2.5 py-1 text-xs text-muted-foreground/70 transition-colors hover:text-foreground focus-visible:text-foreground focus-visible:outline-none"
          >
            + more
          </Link>
        </div>
      </div>
    </FadeUp>
  );
}

export function GetStarted() {
  return (
    <section id="get-started" className="relative py-20 sm:py-20">
      <div className={SECTION}>
        <SectionHeading
          eyebrow="Get started"
          title="Ship your first frame in minutes"
          lead="If you know shadcn/ui, you already know remocn. Three commands and you're rendering — the code lands in your repo, yours to tweak."
        />

        <div className="mt-12 grid items-start gap-4 sm:mt-16 sm:gap-6 md:grid-cols-2">
          <div className="flex min-w-0 flex-col gap-4 sm:gap-6.5">
            <CompactStep step={START} delay={0} />
            <CompactStep step={INIT} delay={0.08} />
            <CompactStep step={RENDER} delay={0.16} />
          </div>
          <FeaturedStep step={ADD} delay={0.08} />
        </div>

        {/* <FadeUp delay={0.1}>
          <div className="mt-8 flex justify-center">
            <Link
              href="/docs/getting-started/installation"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:text-foreground focus-visible:outline-none"
            >
              Read the full installation guide
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </FadeUp> */}
      </div>
    </section>
  );
}
