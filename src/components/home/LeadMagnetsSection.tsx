"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ClipboardCheck,
  Hospital,
  FileText,
  Download,
  Shield,
  Brain,
  Server,
  PenTool,
  Layers,
  Lock,
} from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";

type GuideCategory = "all" | "conformite" | "tech" | "strategie";

interface Guide {
  icon: typeof ClipboardCheck;
  color: string;
  badge: string;
  category: GuideCategory[];
  title: string;
  description: string;
  href: string;
}

const guides: Guide[] = [
  {
    icon: ClipboardCheck,
    color: "#3b82f6",
    badge: "Startups & PME",
    category: ["tech"],
    title: "Audit Flash : 15 points de contrôle technique",
    description:
      "Évaluez la santé technique de votre projet en 10 minutes. Architecture, sécurité, dette technique.",
    href: "/pdf-audit-flash.html",
  },
  {
    icon: Hospital,
    color: "#10b981",
    badge: "Secteur Santé",
    category: ["conformite"],
    title: "Conformité HDS : le guide essentiel",
    description:
      "Les 10 points de conformité obligatoires pour votre application e-santé ou télémédecine.",
    href: "/pdf-checklist-hds.html",
  },
  {
    icon: FileText,
    color: "#8b5cf6",
    badge: "Toutes entreprises",
    category: ["conformite"],
    title: "Facturation électronique 2026 : êtes-vous prêt ?",
    description:
      "Calendrier, formats acceptés, obligations par taille d'entreprise.",
    href: "/pdf-facturation-2026.html",
  },
  {
    icon: Shield,
    color: "#2563eb",
    badge: "Conformité",
    category: ["conformite"],
    title: "RGPD pour les PME : 12 obligations incontournables",
    description:
      "Le guide pratique pour mettre votre entreprise en conformité avec le Règlement Général sur la Protection des Données.",
    href: "/pdf-guide-rgpd.html",
  },
  {
    icon: Brain,
    color: "#f59e0b",
    badge: "Innovation",
    category: ["strategie"],
    title: "IA en Entreprise : premiers pas concrets",
    description:
      "Comment intégrer l'intelligence artificielle dans votre organisation sans risques et avec un ROI mesurable.",
    href: "/pdf-guide-ia-entreprise.html",
  },
  {
    icon: Server,
    color: "#06b6d4",
    badge: "Architecture",
    category: ["tech"],
    title: "Architecture SaaS : les 8 piliers d'une solution scalable",
    description:
      "Le guide technique pour concevoir, déployer et faire évoluer une application SaaS professionnelle.",
    href: "/pdf-guide-architecture-saas.html",
  },
  {
    icon: PenTool,
    color: "#8b5cf6",
    badge: "Conformité",
    category: ["conformite"],
    title: "Signature électronique & eIDAS : guide de conformité",
    description:
      "Comprendre les niveaux de signature électronique et implémenter une solution conforme au règlement européen.",
    href: "/pdf-guide-eidas.html",
  },
  {
    icon: Layers,
    color: "#ec4899",
    badge: "Stratégie",
    category: ["strategie", "tech"],
    title: "Choisir sa stack technique : le framework de décision CTO",
    description:
      "Un guide méthodique pour faire les bons choix technologiques et éviter les erreurs coûteuses.",
    href: "/pdf-guide-stack-technique.html",
  },
  {
    icon: Lock,
    color: "#ef4444",
    badge: "Sécurité",
    category: ["tech"],
    title: "Cybersécurité PME : 10 mesures essentielles",
    description:
      "Protégez votre entreprise contre les cyberattaques avec ces 10 mesures concrètes et accessibles.",
    href: "/pdf-guide-cybersecurite.html",
  },
];

const categories: { key: GuideCategory; label: string }[] = [
  { key: "all", label: "Tous" },
  { key: "conformite", label: "Conformité" },
  { key: "tech", label: "Tech & Archi" },
  { key: "strategie", label: "Stratégie" },
];

export function LeadMagnetsSection() {
  const [activeCategory, setActiveCategory] = useState<GuideCategory>("all");

  const filteredGuides =
    activeCategory === "all"
      ? guides
      : guides.filter((g) => g.category.includes(activeCategory));

  return (
    <section className="py-24" id="ressources">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          badge="Ressources gratuites"
          title="Guides pratiques"
          highlight="pour préparer votre projet"
          subtitle="Neuf guides concrets, rédigés par un CTO qui les utilise lui-même au quotidien."
        />

        <div className="flex justify-center gap-2 mb-10 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all font-[family-name:var(--font-sub)] ${
                activeCategory === cat.key
                  ? "bg-[var(--color-accent)] text-white"
                  : "border border-[var(--color-border)] text-[var(--color-text-muted)] hover:border-[var(--color-accent)]/30 hover:text-[var(--color-text)]"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredGuides.map((guide, i) => (
              <motion.a
                key={guide.title}
                href={guide.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.08 }}
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
                  <span className="text-[10px] font-medium uppercase tracking-wider px-2.5 py-1 rounded-full border border-[var(--color-border)] text-[var(--color-text-muted)] font-[family-name:var(--font-sub)]">
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
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
