"use client";

import { motion } from "framer-motion";
import { MessageSquare, PenTool, Code, Rocket } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useTranslations } from "next-intl";

const stepIcons = [MessageSquare, PenTool, Code, Rocket];
const stepKeys = ["scoping", "design", "build", "delivery"] as const;
const stepNumbers = ["01", "02", "03", "04"];

export function ProcessSection() {
  const t = useTranslations("home");

  return (
    <section className="py-24 bg-[var(--color-bg-subtle)] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          badge={t("process.badge")}
          title={t("process.title")}
          highlight={t("process.highlight")}
        />
        <div className="grid md:grid-cols-4 gap-8 relative">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-16 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-[var(--color-accent)]/20 to-transparent" />

          {stepKeys.map((key, i) => {
            const Icon = stepIcons[i];
            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                whileHover={{ y: -8, rotateZ: 1 }}
                className="relative text-center group cursor-pointer"
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className="relative inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] mb-6 group-hover:border-[var(--color-accent)]/30 group-hover:shadow-lg group-hover:shadow-[var(--color-accent)]/10 transition-all">
                  <Icon size={24} className="text-[var(--color-accent)]" />
                  <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[var(--color-accent)] text-white text-[10px] font-bold flex items-center justify-center">
                    {stepNumbers[i]}
                  </span>
                </div>
                <h3 className="font-[family-name:var(--font-heading)] text-lg font-bold text-[var(--color-text)] mb-2">
                  {t(`process.steps.${key}.title`)}
                </h3>
                <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
                  {t(`process.steps.${key}.description`)}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
