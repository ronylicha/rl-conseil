"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Calendar, Layers, Shield, Server } from "lucide-react";
import { useTranslations } from "next-intl";

export function ParcourseHero() {
  const t = useTranslations("parcours");

  const stats = [
    { value: "15+", label: t("hero.stats.yearsExperience"), icon: Calendar },
    { value: "10+", label: t("hero.stats.saasPlatforms"), icon: Layers },
    { value: "4", label: t("hero.stats.compliances"), icon: Shield },
    { value: "99.9%", label: t("hero.stats.uptime"), icon: Server },
  ];

  return (
    <section className="pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium tracking-wider uppercase border border-[var(--color-border)] text-[var(--color-accent)] mb-6 font-[family-name:var(--font-sub)]">
              <span className="w-2 h-2 rounded-full bg-[var(--color-success)] animate-pulse" />
              {t("hero.availabilityBadge")}
            </span>
            <h1 className="font-[family-name:var(--font-heading)] text-4xl md:text-6xl font-bold text-[var(--color-text)] mb-6 leading-tight">
              {t("hero.title")} <span className="text-gradient">{t("hero.titleHighlight")}</span>
            </h1>
            <p className="text-lg text-[var(--color-text-muted)] leading-relaxed mb-8">
              {t("hero.description")}
            </p>
            <div className="grid grid-cols-2 gap-4">
              {stats.map((s) => (
                <div key={s.label} className="p-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-accent)]/30 hover:shadow-md hover:shadow-[var(--color-accent)]/5 hover:-translate-y-0.5 transition-all cursor-default">
                  <s.icon size={18} className="text-[var(--color-accent)] mb-2" />
                  <p className="text-2xl font-bold font-[family-name:var(--font-heading)] text-[var(--color-text)]">{s.value}</p>
                  <p className="text-xs text-[var(--color-text-muted)]">{s.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative flex justify-center group"
          >
            <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-2xl overflow-hidden border-2 border-[var(--color-accent)]/20 shadow-2xl shadow-[var(--color-accent)]/10 group-hover:shadow-[var(--color-accent)]/20 transition-all duration-700" style={{ animation: "float-slow 6s ease-in-out infinite" }}>
              <Image
                src="/profile-photo.jpg"
                alt="Rony Licha - CTO & Fondateur RL Conseil"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="absolute -bottom-4 -right-4 px-4 py-2 rounded-xl bg-[var(--color-accent)] text-white text-sm font-medium shadow-lg shadow-[var(--color-accent)]/30" style={{ animation: "float-slow 6s ease-in-out infinite", animationDelay: "1s" }}>
              {t("hero.floatingBadge")}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
