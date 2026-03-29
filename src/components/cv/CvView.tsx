"use client";

import { Printer, Mail, Phone, MapPin, Globe, Linkedin, Github } from "lucide-react";
import { siteConfig } from "@/data/site-config";
import { experiences, education, certifications } from "@/data/experience";
import { projects } from "@/data/projects";
import { useTranslations } from "next-intl";

export function CvView() {
  const t = useTranslations("cv");
  const tExp = useTranslations("experience");

  const experienceKeys = [
    "qrCommunication",
    "phoenixConsulting",
    "orFormationDsi",
    "orFormationDirecteur",
    "professionalMarketing",
  ] as const;

  const educationKeys = ["licenceEconomie", "btsComptabilite"] as const;
  const certificationKeys = ["symfony2", "symfony1"] as const;

  const skillGroups = [
    { cat: t("skillCategories.frontend"), skills: ["React 19", "Next.js", "Vue.js", "Nuxt", "TypeScript", "Tailwind", "Three.js"] },
    { cat: t("skillCategories.backend"), skills: ["Laravel 12", "PHP 8.3", "Node.js", "Bun", "Hono", "Python", "FilamentPHP", "GraphQL"] },
    { cat: t("skillCategories.databases"), skills: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "Elasticsearch", "Vector DB"] },
    { cat: t("skillCategories.cloudInfra"), skills: ["AWS", "Google Cloud", "OVHcloud", "Scaleway", "Vercel", "Cloudflare"] },
    { cat: t("skillCategories.devopsCicd"), skills: ["Docker", "GitHub Actions", "GitLab CI", "Nginx", "Load Balancing", "Terraform"] },
    { cat: t("skillCategories.mobile"), skills: ["React Native", "Expo", "WebRTC", "PWA", "Firebase"] },
    { cat: t("skillCategories.aiLlm"), skills: ["Claude API", "OpenAI", "LangChain", "MCP", "RAG", "Embeddings", "Multi-Agent"] },
    { cat: t("skillCategories.compliance"), skills: ["HDS", "eIDAS", "RGPD", "Factur-X", "NF525", "OWASP", "OAuth2"] },
  ];

  return (
    <section className="pt-24 pb-16 px-6 print:pt-0 print:pb-0 print:px-0">
      <div className="max-w-5xl mx-auto">
        {/* Actions */}
        <div className="flex justify-end gap-3 mb-6 no-print">
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 px-4 py-2 border border-[var(--color-border)] text-[var(--color-text-muted)] rounded-lg text-sm hover:bg-[var(--color-surface)] hover:border-[var(--color-accent)]/30 hover:text-[var(--color-accent)] hover:shadow-md transition-all duration-300 cursor-pointer"
          >
            <Printer size={16} /> {t("actions.print")}
          </button>
        </div>

        {/* CV Layout */}
        <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl overflow-hidden shadow-xl shadow-black/5 dark:shadow-black/20 print:border-0 print:rounded-none print:shadow-none">
          <div className="grid md:grid-cols-[280px_1fr] print:grid-cols-[220px_1fr]">
            {/* Sidebar */}
            <div className="bg-[#0d1117] text-[#f0ece4] p-8 print:p-6 space-y-6">
              {/* Photo + Name */}
              <div className="text-center">
                <img src="/profile-photo.jpg" alt={siteConfig.founder.name} className="w-28 h-28 rounded-full mx-auto mb-4 border-3 border-white/20 object-cover" />
                <h1 className="text-xl font-bold font-[family-name:var(--font-heading)]">{siteConfig.founder.name}</h1>
                <p className="text-xs text-[#be3c5a] uppercase tracking-wider mt-1">{siteConfig.founder.title}</p>
                <span className="inline-flex items-center gap-1.5 mt-3 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  {t("available")}
                </span>
              </div>

              {/* Contact */}
              <div className="space-y-2">
                <h3 className="text-[10px] font-bold uppercase tracking-widest text-[#be3c5a] mb-3">{t("sections.contact")}</h3>
                {[
                  { icon: Mail, text: siteConfig.founder.email },
                  { icon: Phone, text: siteConfig.founder.phoneDisplay },
                  { icon: Globe, text: "rlconseil.net" },
                  { icon: MapPin, text: siteConfig.founder.location },
                  { icon: Linkedin, text: "LinkedIn" },
                  { icon: Github, text: "GitHub" },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-2 text-[11px] text-[#f0ece4]/80">
                    <Icon size={13} className="text-[#be3c5a] shrink-0" />
                    {text}
                  </div>
                ))}
              </div>

              {/* Skills */}
              <div>
                <h3 className="text-[10px] font-bold uppercase tracking-widest text-[#be3c5a] mb-3">{t("sections.skills")}</h3>
                {skillGroups.map((g) => (
                  <div key={g.cat} className="mb-3">
                    <p className="text-[10px] font-semibold text-[#f0ece4]/90 mb-1.5">{g.cat}</p>
                    <div className="flex flex-wrap gap-1">
                      {g.skills.map((s) => (
                        <span key={s} className="px-2 py-0.5 text-[9px] rounded bg-white/10">{s}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Certifications */}
              <div>
                <h3 className="text-[10px] font-bold uppercase tracking-widest text-[#be3c5a] mb-3">{t("sections.certifications")}</h3>
                {certifications.map((c, i) => (
                  <div key={c.title} className="mb-2 p-2.5 rounded-lg bg-white/5 border-l-2 border-[#be3c5a]">
                    <p className="text-[10px] font-semibold">{tExp(`certifications.${certificationKeys[i]}.title`)}</p>
                    <p className="text-[9px] text-[#f0ece4]/50">{tExp(`certifications.${certificationKeys[i]}.issuer`)} · {tExp(`certifications.${certificationKeys[i]}.date`)}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Main Content */}
            <div className="p-8 print:p-6 space-y-8">
              {/* Header */}
              <div className="border-b border-[var(--color-border)] pb-6">
                <h2 className="font-[family-name:var(--font-heading)] text-lg font-bold text-[var(--color-text)] mb-3 flex items-center gap-2">
                  {t("sections.profile")}
                </h2>
                <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
                  {t("profileText")}
                </p>
              </div>

              {/* Experience */}
              <div>
                <h2 className="font-[family-name:var(--font-heading)] text-lg font-bold text-[var(--color-text)] mb-4">
                  {t("sections.experience")}
                </h2>
                <div className="space-y-5">
                  {experiences.map((exp, i) => {
                    const key = experienceKeys[i];
                    return (
                    <div key={exp.company + exp.period} className="relative pl-5 border-l-2 border-[var(--color-border)]">
                      <div className="absolute left-[-5px] top-1 w-2 h-2 rounded-full bg-[var(--color-accent)]" />
                      <div className="flex items-start justify-between mb-1">
                        <div>
                          <h3 className="text-sm font-bold text-[var(--color-text)]">{tExp(`items.${key}.title`)}</h3>
                          <p className="text-xs text-[var(--color-accent)]">{tExp(`items.${key}.company`)} · {tExp(`items.${key}.location`)}</p>
                        </div>
                        <span className="text-xs text-[var(--color-text-muted)] bg-[var(--color-bg-subtle)] px-2 py-0.5 rounded shrink-0">
                          {tExp(`items.${key}.duration`)}
                        </span>
                      </div>
                      <p className="text-xs text-[var(--color-text-muted)] mb-2">{tExp(`items.${key}.description`)}</p>
                      <ul className="space-y-0.5">
                        {exp.achievements.map((_, j) => (
                          <li key={j} className="text-xs text-[var(--color-text)] flex items-start gap-1.5">
                            <span className="mt-1.5 w-1 h-1 rounded-full bg-[var(--color-accent)] shrink-0" />
                            {tExp(`items.${key}.achievements.${j}`)}
                          </li>
                        ))}
                      </ul>
                    </div>
                    );
                  })}
                </div>
              </div>

              {/* Education */}
              <div>
                <h2 className="font-[family-name:var(--font-heading)] text-lg font-bold text-[var(--color-text)] mb-4">
                  {t("sections.education")}
                </h2>
                <div className="space-y-3">
                  {education.map((edu, i) => (
                    <div key={edu.title} className="flex items-start justify-between">
                      <div>
                        <h3 className="text-sm font-bold text-[var(--color-text)]">{tExp(`education.${educationKeys[i]}.title`)}</h3>
                        <p className="text-xs text-[var(--color-accent)]">{tExp(`education.${educationKeys[i]}.institution`)}</p>
                      </div>
                      <span className="text-xs text-[var(--color-text-muted)]">{edu.period}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Portfolio Highlights */}
              <div>
                <h2 className="font-[family-name:var(--font-heading)] text-lg font-bold text-[var(--color-text)] mb-4">
                  {t("sections.notableProjects")}
                </h2>
                <div className="grid grid-cols-2 gap-3">
                  {projects.slice(0, 4).map((p) => (
                    <div key={p.id} className="p-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-subtle)] hover:border-[var(--color-accent)]/20 transition-colors">
                      <h4 className="text-xs font-bold text-[var(--color-text)]">{p.name}</h4>
                      <p className="text-[10px] text-[var(--color-text-muted)] mt-0.5">{p.subtitle}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
