"use client";

import { motion } from "framer-motion";
import { Compass, Code, Rocket, Scale, Crown, Gauge } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { services } from "@/data/services";

const iconMap: Record<
  string,
  React.ComponentType<{ size?: number; className?: string }>
> = {
  Compass,
  Code,
  Rocket,
  Scale,
  Crown,
  Gauge,
};

export function ServicesSection() {
  return (
    <section id="services" className="relative py-24 bg-[var(--color-bg-subtle)]">
      {/* Floating dots background - seeded positions to avoid hydration mismatch */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[
          { l: 12, t: 8, d: 7, dl: 0 }, { l: 85, t: 15, d: 9, dl: 1.2 },
          { l: 35, t: 25, d: 11, dl: 2.5 }, { l: 60, t: 40, d: 8, dl: 0.8 },
          { l: 20, t: 55, d: 13, dl: 3.1 }, { l: 75, t: 65, d: 6, dl: 1.5 },
          { l: 45, t: 75, d: 10, dl: 4.2 }, { l: 90, t: 30, d: 12, dl: 0.3 },
          { l: 8, t: 85, d: 7, dl: 2.8 }, { l: 55, t: 90, d: 14, dl: 3.5 },
          { l: 30, t: 12, d: 9, dl: 1.8 }, { l: 68, t: 50, d: 11, dl: 4.0 },
        ].map((dot, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-[var(--color-accent)]/10"
            style={{
              left: `${dot.l}%`,
              top: `${dot.t}%`,
              animation: `float ${dot.d}s ease-in-out infinite`,
              animationDelay: `${dot.dl}s`,
            }}
          />
        ))}
      </div>
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <SectionHeader
          badge="Expertise"
          title="Notre offre"
          highlight="au service de votre ambition"
          subtitle="Six domaines d'intervention pour couvrir l'intégralité de votre chaîne de valeur technique."
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => {
            const Icon = iconMap[service.icon] || Code;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="group p-6 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-accent)]/30 hover:shadow-lg hover:shadow-[var(--color-accent)]/5 transition-all duration-300 cursor-pointer"
              >
                <div className="w-10 h-10 rounded-lg bg-[var(--color-accent)]/10 flex items-center justify-center mb-4 group-hover:bg-[var(--color-accent)]/20 transition-colors">
                  <Icon
                    size={20}
                    className="text-[var(--color-accent)]"
                  />
                </div>
                <h3 className="font-[family-name:var(--font-heading)] text-lg font-bold text-[var(--color-text)] mb-2">
                  {service.title}
                </h3>
                <p className="text-sm text-[var(--color-text-muted)] mb-4 leading-relaxed">
                  {service.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {service.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-md text-xs font-medium bg-[var(--color-bg-subtle)] text-[var(--color-text-muted)]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
        </div>
    </section>
  );
}
