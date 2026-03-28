"use client";

import { motion } from "framer-motion";
import { Hospital, FileSignature, Shield, FileText } from "lucide-react";
import { useTranslations } from "next-intl";

const certificationsConfig = [
  { icon: Hospital, key: "hds", color: "#10b981" },
  { icon: FileSignature, key: "eidas", color: "#3b82f6" },
  { icon: Shield, key: "rgpd", color: "#8b5cf6" },
  { icon: FileText, key: "facturX", color: "#f59e0b" },
] as const;

export function ComplianceBanner() {
  const t = useTranslations("home.compliance");
  return (
    <section className="py-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-bg)] via-[var(--color-bg-subtle)] to-[var(--color-bg)]" />
      <div className="max-w-7xl mx-auto px-6 relative">
        <p className="text-center text-xs font-medium tracking-widest uppercase text-[var(--color-text-muted)] mb-8 font-[family-name:var(--font-sub)]">
          {t("sectionLabel")}
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {certificationsConfig.map((cert, i) => (
            <motion.div
              key={cert.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              whileHover={{ scale: 1.05, rotateY: 5 }}
              className="group p-5 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] text-center cursor-pointer transition-all hover:border-[var(--color-accent)]/30 hover:shadow-lg hover:shadow-[var(--color-accent)]/10 hover:-translate-y-1"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div
                className="w-12 h-12 rounded-xl mx-auto mb-3 flex items-center justify-center"
                style={{ backgroundColor: `${cert.color}15` }}
              >
                <cert.icon size={24} style={{ color: cert.color }} />
              </div>
              <p className="font-bold text-lg text-[var(--color-text)] font-[family-name:var(--font-heading)]">{t(`${cert.key}.label`)}</p>
              <p className="text-xs text-[var(--color-text-muted)] mt-1">{t(`${cert.key}.title`)}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
