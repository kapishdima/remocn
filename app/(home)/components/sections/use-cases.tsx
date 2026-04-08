"use client";

import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import type { ReactNode } from "react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  LAVENDER,
  MINT,
  PEACH,
  SECTION,
  SPRING_BOUNCE,
} from "@/config/landing";
import { FadeUp } from "../fade-up";

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
        <Badge
          variant="outline"
          className="h-auto rounded-full px-2 py-0.5 text-[10px]"
          style={{
            borderColor: `${MINT}40`,
            color: MINT,
            background: `${MINT}10`,
          }}
        >
          v1.4.0
        </Badge>
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

function UseCaseCard({
  label,
  title,
  copy,
  stat,
  glow,
  href,
  children,
}: {
  label: string;
  title: string;
  copy: string;
  stat: string;
  glow: string;
  href: string;
  children: ReactNode;
}) {
  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={SPRING_BOUNCE}
      className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-2xl"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-20 -right-20 h-60 w-60 rounded-full opacity-60 transition-opacity group-hover:opacity-100"
        style={{
          background: `radial-gradient(circle, ${glow}40, transparent 60%)`,
          filter: "blur(40px)",
        }}
      />
      <div className="relative h-44 w-full overflow-hidden border-b border-white/[0.05]">
        {children}
      </div>
      <div className="relative flex flex-1 flex-col p-6">
        <Badge
          variant="outline"
          className="h-auto self-start rounded-none border-0 bg-transparent p-0 font-mono text-[11px] text-[#666]"
        >
          {label}
        </Badge>
        <h3 className="mt-2 font-[var(--font-display)] text-2xl font-semibold -tracking-wide text-[#EDEDED]">
          {title}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-[#8B8A91]">{copy}</p>
        <Separator className="mt-6 bg-white/[0.04]" />
        <div className="mt-4 flex items-center justify-between">
          <span
            className="font-mono text-[11px] tabular-nums"
            style={{ color: glow }}
          >
            {stat}
          </span>
          <Link
            href={href}
            className="inline-flex items-center gap-1 text-xs text-[#8B8A91] transition-colors hover:text-white focus-visible:text-white focus-visible:outline-none"
          >
            Learn more
            <ArrowRight className="size-3" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}

export function UseCases() {
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
          <FadeUp delay={0}>
            <UseCaseCard
              label="Marketing"
              title="Launch videos"
              copy="Ship to Product Hunt with a masterpiece. Wire components, render once, post anywhere"
              stat="12 PH #1s"
              glow={PEACH}
              href="/docs/compositions/product-launch-trailer"
            >
              <CaseChartVisual />
            </UseCaseCard>
          </FadeUp>
          <FadeUp delay={0.08}>
            <UseCaseCard
              label="DevRel"
              title="Changelogs"
              copy="Turn boring release notes into viral tweets. One commit, one composition, one render"
              stat="Render in 8s"
              glow={MINT}
              href="/docs/compositions/changelog-bite"
            >
              <CaseChangelogVisual />
            </UseCaseCard>
          </FadeUp>
          <FadeUp delay={0.16}>
            <UseCaseCard
              label="Documentation"
              title="Docs that move"
              copy="Explain complex workflows visually. A twelve second clip beats a thousand words every time"
              stat="12s clips"
              glow={LAVENDER}
              href="/docs/compositions/visual-docs-snippet"
            >
              <CaseDocsVisual />
            </UseCaseCard>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
