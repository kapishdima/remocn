"use client";

import { ArrowRight, Check } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { type CSSProperties, useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { SECTION, SPRING_BOUNCE, SPRING_SOFT } from "@/config/landing";
import { type BillingMode, type Tier, tiers } from "@/config/sponsors";
import { cn } from "@/lib/utils";
import { FadeUp } from "../../../components/fade-up";

function BillingToggle({
  value,
  onChange,
}: {
  value: BillingMode;
  onChange: (v: BillingMode) => void;
}) {
  const options: { id: BillingMode; label: string }[] = [
    { id: "monthly", label: "Monthly" },
    { id: "one-time", label: "One-time" },
  ];

  return (
    <div className="inline-flex rounded-full border border-white/10 bg-white/[0.04] p-1 backdrop-blur-xl">
      {options.map((opt) => {
        const active = opt.id === value;
        return (
          <button
            key={opt.id}
            type="button"
            onClick={() => onChange(opt.id)}
            className={cn(
              "relative rounded-full px-5 py-2 text-sm font-medium transition-colors focus-visible:outline-none",
              active ? "text-[#141318]" : "text-[#8B8A91] hover:text-white",
            )}
          >
            {active && (
              <motion.div
                layoutId="billing-thumb"
                className="absolute inset-0 rounded-full bg-white"
                transition={SPRING_SOFT}
              />
            )}
            <span className="relative">{opt.label}</span>
          </button>
        );
      })}
    </div>
  );
}

function TierCard({
  tier,
  billingMode,
}: {
  tier: Tier;
  billingMode: BillingMode;
}) {
  const checkoutUrl =
    billingMode === "monthly" ? tier.monthlyUrl : tier.oneTimeUrl;
  const priceSuffix = billingMode === "monthly" ? "/mo" : "one-time";

  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={SPRING_BOUNCE}
      className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/[0.06] bg-white/[0.03] p-8 backdrop-blur-2xl"
      style={{
        boxShadow: `0 20px 50px -20px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.06)`,
      }}
    >
      {/* Spotlight overlay (driven by parent --mx/--my) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(500px circle at var(--mx) var(--my), ${tier.glow}1A, transparent 40%)`,
        }}
      />

      <div className="relative flex items-start justify-between gap-3">
        <div>
          <span className="font-mono text-[11px] text-[#666]">
            {tier.tagline}
          </span>
          <h3 className="mt-2 font-[var(--font-display)] text-2xl font-semibold -tracking-wide text-[#EDEDED]">
            {tier.name}
          </h3>
        </div>
        {tier.highlighted && <Badge variant="secondary">Most popular</Badge>}
      </div>

      <div className="relative mt-6 flex items-baseline gap-2 overflow-hidden">
        <motion.div
          key={billingMode}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={SPRING_SOFT}
          className="flex items-baseline gap-2"
        >
          <span className="font-[var(--font-display)] text-5xl font-semibold -tracking-wide text-[#EDEDED]">
            ${tier.price}
          </span>
          <span className="text-sm text-[#8B8A91]">{priceSuffix}</span>
        </motion.div>
      </div>

      <Separator className="relative my-6 bg-white/[0.04]" />

      <ul className="relative flex flex-col gap-3">
        {tier.perks.map((perk) => (
          <li
            key={perk}
            className="flex items-start gap-3 text-sm text-[#C8C7CC]"
          >
            <Check
              className="mt-[3px] size-3.5 shrink-0"
              style={{ color: tier.glow }}
              aria-hidden="true"
            />
            <span>{perk}</span>
          </li>
        ))}
      </ul>

      <div className="relative mt-8 pt-2">
        <Link
          href={checkoutUrl}
          target="_blank"
          className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.04] text-sm font-medium text-[#EDEDED] backdrop-blur-xl transition-colors hover:border-white/20 hover:bg-white/[0.08] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/30"
        >
          Become a {tier.name}
          <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      </div>
    </motion.article>
  );
}

export function Tiers() {
  const [billingMode, setBillingMode] = useState<BillingMode>("monthly");
  const gridRef = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = gridRef.current;
    if (!target) return;
    const rect = target.getBoundingClientRect();
    target.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    target.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  return (
    <section id="tiers" className="relative py-24">
      <div className={SECTION}>
        <FadeUp>
          <div className="mb-10 flex justify-center">
            <BillingToggle value={billingMode} onChange={setBillingMode} />
          </div>
        </FadeUp>

        <FadeUp delay={0.1}>
          {/* biome-ignore lint/a11y/noStaticElementInteractions: spotlight cursor tracking is purely visual */}
          <div
            ref={gridRef}
            onMouseMove={handleMove}
            className="grid gap-6 md:grid-cols-3"
            style={{ "--mx": "50%", "--my": "50%" } as CSSProperties}
          >
            {tiers.map((tier, i) => (
              <FadeUp key={tier.id} delay={i * 0.08}>
                <TierCard tier={tier} billingMode={billingMode} />
              </FadeUp>
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
