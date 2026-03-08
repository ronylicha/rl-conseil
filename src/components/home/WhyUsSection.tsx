"use client";

import { motion } from "framer-motion";
import { TrendingUp, Shield, UserCheck } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TiltCard } from "@/components/ui/TiltCard";

const cards = [
  {
    icon: TrendingUp,
    title: "Nous parlons ROI, pas lignes de code",
    description:
      "Chaque décision technique est une décision business. Conformité HDS pour la santé, facturation électronique 2026, signature eIDAS : nous sécurisons votre croissance et anticipons vos obligations réglementaires.",
  },
  {
    icon: Shield,
    title: "15 ans d'erreurs que vous n'aurez pas à commettre",
    description:
      "Architecture pensée pour dans trois ans, pas pour la démo de vendredi. Pas de dette technique cachée, pas de raccourcis. Code propre, documenté, évolutif.",
  },
  {
    icon: UserCheck,
    title: "Un interlocuteur senior. Point final.",
    description:
      "Pas d'équipe de juniors qui tourne tous les trimestres. Un CTO unique, senior, disponible, qui connaît votre projet dans ses moindres détails.",
  },
];

export function WhyUsSection() {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          badge="Pourquoi RL Conseil ?"
          title="Ce qui nous distingue"
          highlight="d'une agence classique"
        />
        <div className="grid md:grid-cols-3 gap-8">
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
            >
              <TiltCard className="h-full">
                <div className="p-8 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-accent)]/30 hover:glow-accent transition-all duration-300 cursor-pointer group h-full">
                  <div className="w-12 h-12 rounded-xl bg-[var(--color-accent)]/10 flex items-center justify-center mb-6 group-hover:bg-[var(--color-accent)]/20 group-hover:shadow-lg group-hover:shadow-[var(--color-accent)]/10 transition-all duration-300" style={{ transform: "translateZ(30px)" }}>
                    <card.icon
                      size={24}
                      className="text-[var(--color-accent)]"
                    />
                  </div>
                  <h3 className="font-[family-name:var(--font-heading)] text-xl font-bold text-[var(--color-text)] mb-3" style={{ transform: "translateZ(20px)" }}>
                    {card.title}
                  </h3>
                  <p className="text-[var(--color-text-muted)] leading-relaxed">
                    {card.description}
                  </p>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
