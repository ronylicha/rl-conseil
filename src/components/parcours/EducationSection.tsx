"use client";

import { motion } from "framer-motion";
import { GraduationCap, Award } from "lucide-react";
import { education, certifications } from "@/data/experience";
import { useTranslations } from "next-intl";

const educationKeys = ["licenceEconomie", "btsComptabilite"] as const;
const certificationKeys = ["symfony2", "symfony1"] as const;

export function EducationSection() {
  const t = useTranslations("parcours");
  const tExp = useTranslations("experience");

  const translatedEducation = education.map((edu, i) => ({
    period: edu.period,
    title: tExp(`education.${educationKeys[i]}.title`),
    institution: tExp(`education.${educationKeys[i]}.institution`),
    description: tExp(`education.${educationKeys[i]}.description`),
  }));

  const translatedCertifications = certifications.map((cert, i) => ({
    date: tExp(`certifications.${certificationKeys[i]}.date`),
    title: tExp(`certifications.${certificationKeys[i]}.title`),
    issuer: tExp(`certifications.${certificationKeys[i]}.issuer`),
  }));

  return (
    <section className="py-24">
      <div className="max-w-4xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Education */}
          <div>
            <h3 className="flex items-center gap-3 font-[family-name:var(--font-heading)] text-2xl font-bold text-[var(--color-text)] mb-8">
              <GraduationCap size={24} className="text-[var(--color-accent)]" />
              {t("education.sectionTitle")}
            </h3>
            <div className="space-y-6">
              {translatedEducation.map((edu, i) => (
                <motion.div
                  key={edu.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="p-6 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-accent)]/30 hover:shadow-lg hover:shadow-[var(--color-accent)]/5 hover:-translate-y-1 transition-all duration-300 cursor-default shimmer-hover"
                >
                  <p className="text-xs text-[var(--color-text-muted)] mb-1">{edu.period}</p>
                  <h4 className="font-semibold text-[var(--color-text)] mb-1">{edu.title}</h4>
                  <p className="text-sm text-[var(--color-accent)] mb-2">{edu.institution}</p>
                  <p className="text-sm text-[var(--color-text-muted)]">{edu.description}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div>
            <h3 className="flex items-center gap-3 font-[family-name:var(--font-heading)] text-2xl font-bold text-[var(--color-text)] mb-8">
              <Award size={24} className="text-[var(--color-accent)]" />
              {t("education.certificationsSectionTitle")}
            </h3>
            <div className="space-y-6">
              {translatedCertifications.map((cert, i) => (
                <motion.div
                  key={cert.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="p-6 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-accent)]/30 hover:shadow-lg hover:shadow-[var(--color-accent)]/5 hover:-translate-y-1 transition-all duration-300 cursor-default shimmer-hover"
                >
                  <p className="text-xs text-[var(--color-text-muted)] mb-1">{cert.date}</p>
                  <h4 className="font-semibold text-[var(--color-text)] mb-1">{cert.title}</h4>
                  <p className="text-sm text-[var(--color-accent)]">{cert.issuer}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
