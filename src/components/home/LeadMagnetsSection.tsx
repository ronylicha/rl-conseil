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
  Lock,
} from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useTranslations } from "next-intl";

type GuideCategory = "all" | "compliance" | "tech" | "strategy";

interface GuideData {
  icon: typeof ClipboardCheck;
  color: string;
  translationKey: string;
  category: GuideCategory[];
  href: string;
}

const guidesData: GuideData[] = [
  {
    icon: ClipboardCheck,
    color: "#3b82f6",
    translationKey: "auditFlash",
    category: ["tech"],
    href: "/pdf-audit-flash.html",
  },
  {
    icon: Hospital,
    color: "#10b981",
    translationKey: "conformiteHds",
    category: ["compliance"],
    href: "/pdf-checklist-hds.html",
  },
  {
    icon: FileText,
    color: "#8b5cf6",
    translationKey: "facturation2026",
    category: ["compliance"],
    href: "/pdf-facturation-2026.html",
  },
  {
    icon: Shield,
    color: "#2563eb",
    translationKey: "rgpdPme",
    category: ["compliance"],
    href: "/pdf-guide-rgpd.html",
  },
  {
    icon: Brain,
    color: "#f59e0b",
    translationKey: "iaEntreprise",
    category: ["strategy"],
    href: "/pdf-guide-ia-entreprise.html",
  },
  {
    icon: Server,
    color: "#06b6d4",
    translationKey: "architectureSaas",
    category: ["tech"],
    href: "/pdf-guide-architecture-saas.html",
  },
  {
    icon: PenTool,
    color: "#8b5cf6",
    translationKey: "signatureEidas",
    category: ["compliance"],
    href: "/pdf-guide-eidas.html",
  },
  {
    icon: Lock,
    color: "#ec4899",
    translationKey: "stackTechnique",
    category: ["strategy", "tech"],
    href: "/pdf-guide-stack-technique.html",
  },
  {
    icon: Lock,
    color: "#ef4444",
    translationKey: "cybersecurite",
    category: ["tech"],
    href: "/pdf-guide-cybersecurite.html",
  },
];

const categoryKeys: GuideCategory[] = ["all", "compliance", "tech", "strategy"];

export function LeadMagnetsSection() {
  const [activeCategory, setActiveCategory] = useState<GuideCategory>("all");
  const t = useTranslations("home");

  const filteredGuides =
    activeCategory === "all"
      ? guidesData
      : guidesData.filter((g) => g.category.includes(activeCategory));

  return (
    <section className="py-24" id="ressources">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          badge={t("leadMagnets.badge")}
          title={t("leadMagnets.title")}
          highlight={t("leadMagnets.highlight")}
          subtitle={t("leadMagnets.subtitle")}
        />

        <div className="flex justify-center gap-2 mb-10 flex-wrap">
          {categoryKeys.map((key) => (
            <button
              key={key}
              onClick={() => setActiveCategory(key)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all font-[family-name:var(--font-sub)] ${
                activeCategory === key
                  ? "bg-[var(--color-accent)] text-white"
                  : "border border-[var(--color-border)] text-[var(--color-text-muted)] hover:border-[var(--color-accent)]/30 hover:text-[var(--color-text)]"
              }`}
            >
              {t(`leadMagnets.categories.${key}`)}
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
                key={guide.translationKey}
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
                    {t(`leadMagnets.guides.${guide.translationKey}.badge`)}
                  </span>
                </div>
                <h3 className="font-[family-name:var(--font-heading)] text-lg font-bold text-[var(--color-text)] mb-2 group-hover:text-[var(--color-accent)] transition-colors">
                  {t(`leadMagnets.guides.${guide.translationKey}.title`)}
                </h3>
                <p className="text-sm text-[var(--color-text-muted)] leading-relaxed mb-4">
                  {t(`leadMagnets.guides.${guide.translationKey}.description`)}
                </p>
                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-[var(--color-accent)]">
                  <Download size={14} />
                  {t("leadMagnets.downloadCta")}
                </span>
              </motion.a>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
