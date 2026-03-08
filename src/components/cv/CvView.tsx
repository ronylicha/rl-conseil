"use client";

import { Printer, Download, Mail, Phone, MapPin, Globe, Linkedin, Github } from "lucide-react";
import { siteConfig } from "@/data/site-config";
import { experiences, education, certifications } from "@/data/experience";
import { projects } from "@/data/projects";

export function CvView() {
  return (
    <section className="pt-24 pb-16 px-6 print:pt-0 print:pb-0 print:px-0">
      <div className="max-w-5xl mx-auto">
        {/* Actions */}
        <div className="flex justify-end gap-3 mb-6 no-print">
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 px-4 py-2 border border-[var(--color-border)] text-[var(--color-text-muted)] rounded-lg text-sm hover:bg-[var(--color-surface)] transition-all cursor-pointer"
          >
            <Printer size={16} /> Imprimer
          </button>
        </div>

        {/* CV Layout */}
        <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl overflow-hidden print:border-0 print:rounded-none print:shadow-none">
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
                  Disponible
                </span>
              </div>

              {/* Contact */}
              <div className="space-y-2">
                <h3 className="text-[10px] font-bold uppercase tracking-widest text-[#be3c5a] mb-3">Contact</h3>
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
                <h3 className="text-[10px] font-bold uppercase tracking-widest text-[#be3c5a] mb-3">Compétences</h3>
                {[
                  { cat: "Frontend", skills: ["React 19", "Next.js", "Vue.js", "Nuxt", "TypeScript", "Tailwind", "Three.js"] },
                  { cat: "Backend", skills: ["Laravel 12", "PHP 8.3", "Node.js", "Python", "FilamentPHP", "GraphQL"] },
                  { cat: "Bases de données", skills: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "Elasticsearch", "Vector DB"] },
                  { cat: "Cloud & Infra", skills: ["AWS", "Google Cloud", "OVHcloud", "Scaleway", "Vercel", "Cloudflare"] },
                  { cat: "DevOps & CI/CD", skills: ["Docker", "GitHub Actions", "GitLab CI", "Nginx", "Load Balancing", "Terraform"] },
                  { cat: "Mobile", skills: ["React Native", "Expo", "WebRTC", "PWA", "Firebase"] },
                  { cat: "IA & LLM", skills: ["Claude API", "OpenAI", "LangChain", "MCP", "RAG", "Embeddings"] },
                  { cat: "Conformité", skills: ["HDS", "eIDAS", "RGPD", "Factur-X", "NF525", "OWASP", "OAuth2"] },
                ].map((g) => (
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
                <h3 className="text-[10px] font-bold uppercase tracking-widest text-[#be3c5a] mb-3">Certifications</h3>
                {certifications.map((c) => (
                  <div key={c.title} className="mb-2 p-2.5 rounded-lg bg-white/5 border-l-2 border-[#be3c5a]">
                    <p className="text-[10px] font-semibold">{c.title}</p>
                    <p className="text-[9px] text-[#f0ece4]/50">{c.issuer} · {c.date}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Main Content */}
            <div className="p-8 print:p-6 space-y-8">
              {/* Header */}
              <div className="border-b border-[var(--color-border)] pb-6">
                <h2 className="font-[family-name:var(--font-heading)] text-lg font-bold text-[var(--color-text)] mb-3 flex items-center gap-2">
                  Profil
                </h2>
                <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
                  CTO et fondateur de RL Conseil, 15 ans d&apos;expérience en direction technique et développement d&apos;applications.
                  Expert en conformité réglementaire française (HDS, eIDAS, RGPD, Factur-X). Parcours international
                  (France, Israël) combinant vision business et excellence technique. 50+ applications livrées en production,
                  99.9% de disponibilité sur les plateformes critiques.
                </p>
              </div>

              {/* Experience */}
              <div>
                <h2 className="font-[family-name:var(--font-heading)] text-lg font-bold text-[var(--color-text)] mb-4">
                  Expérience Professionnelle
                </h2>
                <div className="space-y-5">
                  {experiences.map((exp) => (
                    <div key={exp.company + exp.period} className="relative pl-5 border-l-2 border-[var(--color-border)]">
                      <div className="absolute left-[-5px] top-1 w-2 h-2 rounded-full bg-[var(--color-accent)]" />
                      <div className="flex items-start justify-between mb-1">
                        <div>
                          <h3 className="text-sm font-bold text-[var(--color-text)]">{exp.title}</h3>
                          <p className="text-xs text-[var(--color-accent)]">{exp.company} · {exp.location}</p>
                        </div>
                        <span className="text-xs text-[var(--color-text-muted)] bg-[var(--color-bg-subtle)] px-2 py-0.5 rounded shrink-0">
                          {exp.duration}
                        </span>
                      </div>
                      <p className="text-xs text-[var(--color-text-muted)] mb-2">{exp.description}</p>
                      <ul className="space-y-0.5">
                        {exp.achievements.map((a) => (
                          <li key={a} className="text-xs text-[var(--color-text)] flex items-start gap-1.5">
                            <span className="mt-1.5 w-1 h-1 rounded-full bg-[var(--color-accent)] shrink-0" />
                            {a}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Education */}
              <div>
                <h2 className="font-[family-name:var(--font-heading)] text-lg font-bold text-[var(--color-text)] mb-4">
                  Formation
                </h2>
                <div className="space-y-3">
                  {education.map((edu) => (
                    <div key={edu.title} className="flex items-start justify-between">
                      <div>
                        <h3 className="text-sm font-bold text-[var(--color-text)]">{edu.title}</h3>
                        <p className="text-xs text-[var(--color-accent)]">{edu.institution}</p>
                      </div>
                      <span className="text-xs text-[var(--color-text-muted)]">{edu.period}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Portfolio Highlights */}
              <div>
                <h2 className="font-[family-name:var(--font-heading)] text-lg font-bold text-[var(--color-text)] mb-4">
                  Projets Notables
                </h2>
                <div className="grid grid-cols-2 gap-3">
                  {projects.slice(0, 4).map((p) => (
                    <div key={p.id} className="p-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-subtle)]">
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
