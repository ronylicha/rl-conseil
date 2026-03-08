"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { testimonials } from "@/data/testimonials";

export function TestimonialsSection() {
  return (
    <section className="py-24 bg-[var(--color-bg-subtle)]">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          badge="Témoignages"
          title="Ils nous ont fait confiance"
          highlight="et ils en parlent"
        />
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="p-8 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-accent)]/20 hover:shadow-lg hover:shadow-[var(--color-accent)]/5 hover:-translate-y-1 transition-all duration-300"
            >
              <Quote
                size={24}
                className="text-[var(--color-accent)] mb-4 opacity-40"
              />
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star
                    key={j}
                    size={14}
                    className="fill-[var(--color-accent)] text-[var(--color-accent)]"
                  />
                ))}
              </div>
              <p className="text-[var(--color-text-muted)] text-sm leading-relaxed mb-6">
                &ldquo;{t.text}&rdquo;
              </p>
              <div>
                <p className="font-semibold text-[var(--color-text)] text-sm">
                  {t.name}
                </p>
                <p className="text-xs text-[var(--color-text-muted)]">
                  {t.title}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
