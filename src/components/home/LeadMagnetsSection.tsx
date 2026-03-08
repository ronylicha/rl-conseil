"use client";

import { motion } from "framer-motion";
import { ClipboardCheck, Hospital, FileText, Download } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";

const guides = [
  {
    icon: ClipboardCheck,
    color: "#3b82f6",
    badge: "Startups & PME",
    title: "Audit Flash : 15 points de contrôle technique",
    description: "Évaluez la santé technique de votre projet en 10 minutes. Architecture, sécurité, dette technique.",
    href: "/pdf-audit-flash.html",
  },
  {
    icon: Hospital,
    color: "#10b981",
    badge: "Secteur Santé",
    title: "Conformité HDS : le guide essentiel",
    description: "Les 10 points de conformité obligatoires pour votre application e-santé ou télémédecine.",
    href: "/pdf-checklist-hds.html",
  },
  {
    icon: FileText,
    color: "#8b5cf6",
    badge: "Toutes entreprises",
    title: "Facturation électronique 2026 : êtes-vous prêt ?",
    description: "Calendrier, formats acceptés, obligations par taille d'entreprise.",
    href: "/pdf-facturation-2026.html",
  },
];

export function LeadMagnetsSection() {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          badge="Ressources gratuites"
          title="Guides pratiques"
          highlight="pour préparer votre projet"
          subtitle="Trois guides concrets, rédigés par un CTO qui les utilise lui-même au quotidien."
        />
        <div className="grid md:grid-cols-3 gap-8">
          {guides.map((guide, i) => (
            <motion.a
              key={guide.title}
              href={guide.href}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.15 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="group block p-6 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-accent)]/30 hover:shadow-xl hover:shadow-[var(--color-accent)]/5 transition-all cursor-pointer"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="flex items-center justify-between mb-4">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: `${guide.color}15` }}
                >
                  <guide.icon size={20} style={{ color: guide.color }} />
                </div>
                <span className="text-[10px] font-medium uppercase tracking-wider px-2.5 py-1 rounded-full border border-[var(--color-border)] text-[var(--color-text-muted)]">
                  {guide.badge}
                </span>
              </div>
              <h3 className="font-[family-name:var(--font-heading)] text-lg font-bold text-[var(--color-text)] mb-2 group-hover:text-[var(--color-accent)] transition-colors">
                {guide.title}
              </h3>
              <p className="text-sm text-[var(--color-text-muted)] leading-relaxed mb-4">
                {guide.description}
              </p>
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-[var(--color-accent)]">
                <Download size={14} />
                Télécharger gratuitement
              </span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
