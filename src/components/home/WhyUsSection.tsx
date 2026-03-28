"use client";

import { motion } from "framer-motion";
import { TrendingUp, Shield, UserCheck } from "lucide-react";
import { useTranslations } from "next-intl";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TiltCard } from "@/components/ui/TiltCard";

const cardsConfig = [
  { icon: TrendingUp, key: "roi" },
  { icon: Shield, key: "experience" },
  { icon: UserCheck, key: "senior" },
] as const;

export function WhyUsSection() {
  const t = useTranslations("home.whyUs");
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          badge={t("badge")}
          title={t("title")}
          highlight={t("highlight")}
        />
        <div className="grid md:grid-cols-3 gap-8">
          {cardsConfig.map((card, i) => (
            <motion.div
              key={card.key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
            >
              <TiltCard className="h-full">
                <div className="p-8 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-accent)]/30 hover:glow-accent transition-all duration-300 cursor-pointer group h-full" style={{ transformStyle: "preserve-3d" }}>
                  <div className="w-12 h-12 rounded-xl bg-[var(--color-accent)]/10 flex items-center justify-center mb-6 group-hover:bg-[var(--color-accent)]/20 group-hover:shadow-lg group-hover:shadow-[var(--color-accent)]/10 transition-all duration-300" style={{ transform: "translateZ(30px)" }}>
                    <card.icon
                      size={24}
                      className="text-[var(--color-accent)]"
                    />
                  </div>
                  <h3 className="font-[family-name:var(--font-heading)] text-xl font-bold text-[var(--color-text)] mb-3" style={{ transform: "translateZ(20px)" }}>
                    {t(`cards.${card.key}.title`)}
                  </h3>
                  <p className="text-[var(--color-text-muted)] leading-relaxed">
                    {t(`cards.${card.key}.description`)}
                  </p>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
