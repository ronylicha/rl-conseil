"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { projects, type Project } from "@/data/projects";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

const statusColors: Record<string, string> = {
  success: "bg-emerald-500/10 text-emerald-500",
  coming: "bg-amber-500/10 text-amber-500",
  dev: "bg-blue-500/10 text-blue-500",
  opensource: "bg-purple-500/10 text-purple-500",
};

// Map project ids (kebab-case) to translation keys (camelCase)
const idToTranslationKey: Record<string, string> = {
  "scell": "scell",
  "apillmcontext": "apillmcontext",
  "claudenest": "claudenest",
  "praticonnect": "praticonnect",
  "noteflow": "noteflow",
  "daily-companion": "dailyCompanion",
  "gigapdf": "gigapdf",
  "ordoconnect": "ordoconnect",
  "timeismoney": "timeismoney",
  "giga-crm": "gigaCrm",
};

function ProjectCard({
  project,
  tProjects,
}: {
  project: Project;
  tProjects: ReturnType<typeof useTranslations>;
}) {
  const translationKey = idToTranslationKey[project.id] ?? project.id;

  return (
    <motion.a
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      href={project.url}
      target={project.url.startsWith("http") ? "_blank" : undefined}
      rel={project.url.startsWith("http") ? "noopener noreferrer" : undefined}
      className="group block p-6 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-accent)]/30 hover:shadow-xl hover:shadow-[var(--color-accent)]/10 hover:-translate-y-1 transition-all duration-300 cursor-pointer shimmer-hover"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 rounded-xl bg-[var(--color-bg-subtle)] flex items-center justify-center overflow-hidden">
          <Image
            src={`/logos/${project.logoDir}/logo-dark.${project.logoDarkExt}`}
            alt={tProjects(`items.${translationKey}.name`)}
            width={32}
            height={32}
            className="hidden dark:block object-contain w-auto h-auto"
          />
          <Image
            src={`/logos/${project.logoDir}/logo-light.${project.logoLightExt}`}
            alt={tProjects(`items.${translationKey}.name`)}
            width={32}
            height={32}
            className="block dark:hidden object-contain w-auto h-auto"
          />
        </div>
        <span
          className={cn(
            "px-2.5 py-1 rounded-full text-xs font-medium",
            statusColors[project.statusType]
          )}
        >
          {tProjects(`items.${translationKey}.status`)}
        </span>
      </div>
      <h3 className="font-[family-name:var(--font-heading)] text-lg font-bold text-[var(--color-text)] mb-1 group-hover:text-[var(--color-accent)] transition-colors">
        {tProjects(`items.${translationKey}.name`)}
      </h3>
      <p className="text-sm font-medium text-[var(--color-accent)] mb-2">
        {tProjects(`items.${translationKey}.subtitle`)}
      </p>
      <p className="text-sm text-[var(--color-text-muted)] mb-4 leading-relaxed line-clamp-2">
        {tProjects(`items.${translationKey}.description`)}
      </p>
      <div className="flex items-center justify-between">
        <div className="flex flex-wrap gap-1.5">
          {project.techTags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 rounded text-xs bg-[var(--color-bg-subtle)] text-[var(--color-text-muted)]"
            >
              {tag}
            </span>
          ))}
        </div>
        <ArrowRight
          size={16}
          className="text-[var(--color-text-muted)] group-hover:text-[var(--color-accent)] group-hover:translate-x-1 transition-all"
        />
      </div>
    </motion.a>
  );
}

export function PortfolioSection() {
  const [active, setActive] = useState("all");
  const tHome = useTranslations("home");
  const tProjects = useTranslations("projects");

  const filterKeys = ["all", "ai", "health", "compliance", "opensource"] as const;
  const filterCounts: Record<string, number> = {
    all: 10,
    ai: 5,
    health: 3,
    compliance: 4,
    opensource: 1,
  };

  const filtered =
    active === "all"
      ? projects
      : projects.filter((p) => p.categories.includes(active));

  return (
    <section id="realisations" className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          badge={tHome("portfolio.badge")}
          title={tHome("portfolio.title")}
          highlight={tHome("portfolio.highlight")}
          subtitle={tHome("portfolio.subtitle")}
        />

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {filterKeys.map((key) => (
            <button
              key={key}
              onClick={() => setActive(key)}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer",
                active === key
                  ? "bg-[var(--color-accent)] text-white"
                  : "bg-[var(--color-surface)] text-[var(--color-text-muted)] hover:text-[var(--color-text)] border border-[var(--color-border)]"
              )}
            >
              {tProjects(`filters.${key}`)}
              <span className="ml-1.5 opacity-60">{filterCounts[key]}</span>
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                tProjects={tProjects}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
