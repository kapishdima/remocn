"use client";

import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { LAVENDER, SECTION, SPRING_SOFT } from "@/config/landing";
import { type Sponsor, sponsors } from "@/config/sponsors";
import { cn } from "@/lib/utils";
import { FadeUp } from "../../../components/fade-up";

function SponsorLogoCard({
  sponsor,
  maxH,
}: {
  sponsor: Sponsor;
  maxH: string;
}) {
  return (
    <a
      href={sponsor.website}
      target="_blank"
      className="group relative flex items-center justify-center overflow-hidden rounded-2xl border border-white/[0.05] bg-white/[0.02] p-6 transition-colors duration-300 hover:border-white/[0.1] hover:bg-white/[0.05] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/30"
    >
      {/** biome-ignore lint/performance/noImgElement: sponsor logos are SVGs of arbitrary sizes */}
      <img
        src={sponsor.logoUrl}
        alt={sponsor.name}
        className={cn(
          maxH,
          "w-auto object-contain opacity-60 transition-all duration-300 grauscale invert group-hover:opacity-100 ",
          sponsor.customStyles,
        )}
        style={{ transform: `scale(${sponsor.logoScale ?? 1})` }}
      />
    </a>
  );
}

function SponsorGroup({
  label,
  items,
  gridClassName,
  aspectClassName,
  maxH,
}: {
  label: string;
  items: Sponsor[];
  gridClassName: string;
  aspectClassName: string;
  maxH: string;
}) {
  if (items.length === 0) return null;
  return (
    <div className="mb-12">
      <div className="mb-4 text-md text-[#666]">{label}</div>
      <div className={gridClassName}>
        {items.map((s) => (
          <div key={s.id} className={aspectClassName}>
            <SponsorLogoCard sponsor={s} maxH={maxH} />
          </div>
        ))}
      </div>
    </div>
  );
}

export function WallOfLove() {
  const partners = sponsors.filter((s) => s.tier === "partner");
  const builders = sponsors.filter((s) => s.tier === "builder");
  const supporters = sponsors.filter((s) => s.tier === "supporter");
  const isEmpty = sponsors.length === 0;

  return (
    <section id="wall-of-love" className="relative py-32">
      <div className={SECTION}>
        <FadeUp>
          <div className="mb-16 max-w-2xl">
            <h2 className="text-4xl font-semibold -tracking-wide text-[#EDEDED] md:text-5xl">
              Wall of love
            </h2>
            <p className="mt-4 text-[#8B8A91]">
              The wonderful people and companies keeping remocn alive
            </p>
          </div>
        </FadeUp>

        {isEmpty ? (
          <FadeUp delay={0.1}>
            <div
              className="flex flex-col items-center justify-center gap-6 rounded-3xl border border-white/[0.06] bg-white/[0.02] px-8 py-20 text-center backdrop-blur-2xl"
              style={{
                boxShadow: `0 20px 50px -20px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.05)`,
              }}
            >
              <p className="max-w-md text-balance text-lg text-[#C8C7CC]">
                Be the first to support remocn. Your logo could live right here.
              </p>
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={SPRING_SOFT}
              >
                <Link
                  href="#tiers"
                  className="inline-flex h-12 items-center gap-2 rounded-full bg-white px-6 text-sm font-medium text-[#141318] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#141318]"
                  style={{
                    boxShadow: `0 0 0 1px rgba(255,255,255,0.2), 0 12px 40px ${LAVENDER}40, inset 0 1px 0 rgba(255,255,255,0.6)`,
                  }}
                >
                  Become a sponsor
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </motion.div>
            </div>
          </FadeUp>
        ) : (
          <FadeUp delay={0.1}>
            <SponsorGroup
              label="Partners"
              items={partners}
              gridClassName="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
              aspectClassName="aspect-[3/2]"
              maxH="max-h-20"
            />
            <SponsorGroup
              label="Builders"
              items={builders}
              gridClassName="grid gap-4 md:grid-cols-3 lg:grid-cols-4"
              aspectClassName="aspect-[3/2]"
              maxH="max-h-14"
            />
            <SponsorGroup
              label="Supporters"
              items={supporters}
              gridClassName="grid gap-3 md:grid-cols-4 lg:grid-cols-6"
              aspectClassName="aspect-square"
              maxH="max-h-10"
            />
          </FadeUp>
        )}
      </div>
    </section>
  );
}
