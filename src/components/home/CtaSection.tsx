"use client";

import { motion } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

export function CtaSection() {
  const t = useTranslations("home");

  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl overflow-hidden p-12 md:p-20 text-center bg-gradient-to-br from-[var(--color-accent-dark)] via-[var(--color-accent)] to-[var(--color-accent-light)] animate-gradient-shift"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-medium tracking-wider uppercase bg-white/10 text-white/80 mb-6 font-[family-name:var(--font-sub)]">
            {t("cta.badge")}
          </span>
          <h2 className="font-[family-name:var(--font-heading)] text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
            {t("cta.title")}
            <br />
            {t("cta.titleLine2")}
          </h2>
          <p className="text-lg text-white/80 mb-10 max-w-xl mx-auto">
            {t("cta.description")}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <MagneticButton>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[var(--color-accent-dark)] rounded-xl font-medium hover:bg-white/90 transition-all group cursor-pointer"
              >
                {t("cta.primaryCta")}
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Link>
            </MagneticButton>
            <MagneticButton>
              <a
                href="tel:+33767987176"
                className="inline-flex items-center gap-2 px-8 py-4 border border-white/30 text-white rounded-xl font-medium hover:bg-white/10 transition-all cursor-pointer"
              >
                <Phone size={18} />
                {t("cta.phoneDisplay")}
              </a>
            </MagneticButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
