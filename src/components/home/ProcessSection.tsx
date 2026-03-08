"use client";

import { motion } from "framer-motion";
import { MessageSquare, PenTool, Code, Rocket } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";

const steps = [
  { icon: MessageSquare, title: "Cadrage", description: "Analyse de vos enjeux business et techniques. Définition du périmètre et des objectifs mesurables.", number: "01" },
  { icon: PenTool, title: "Conception", description: "Architecture, schémas de données, contrats d'API. Chaque décision est documentée et validée.", number: "02" },
  { icon: Code, title: "Réalisation", description: "Développement itératif avec points hebdomadaires. Code review systématique, tests automatisés.", number: "03" },
  { icon: Rocket, title: "Livraison", description: "Déploiement, formation, transfert de compétences. Suivi de performance et accompagnement post-livraison.", number: "04" },
];

export function ProcessSection() {
  return (
    <section className="py-24 bg-[var(--color-bg-subtle)] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          badge="Méthodologie"
          title="Notre approche"
          highlight="en 4 étapes"
        />
        <div className="grid md:grid-cols-4 gap-8 relative">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-16 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-[var(--color-accent)]/20 to-transparent" />

          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              whileHover={{ y: -8, rotateZ: 1 }}
              className="relative text-center group cursor-pointer"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="relative inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] mb-6 group-hover:border-[var(--color-accent)]/30 group-hover:shadow-lg group-hover:shadow-[var(--color-accent)]/10 transition-all">
                <step.icon size={24} className="text-[var(--color-accent)]" />
                <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[var(--color-accent)] text-white text-[10px] font-bold flex items-center justify-center">
                  {step.number}
                </span>
              </div>
              <h3 className="font-[family-name:var(--font-heading)] text-lg font-bold text-[var(--color-text)] mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
