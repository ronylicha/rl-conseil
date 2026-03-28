"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useTranslations } from "next-intl";

const testimonialKeys = ["marieL", "thomasR", "sophieM"] as const;
const ratings = [5, 5, 5];

export function TestimonialsSection() {
  const tHome = useTranslations("home");
  const tTestimonials = useTranslations("testimonials");

  return (
    <section className="py-24 bg-[var(--color-bg-subtle)]">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          badge={tHome("testimonials.badge")}
          title={tHome("testimonials.title")}
          highlight={tHome("testimonials.highlight")}
        />
        <div className="grid md:grid-cols-3 gap-8">
          {testimonialKeys.map((key, i) => (
            <motion.div
              key={key}
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
                {Array.from({ length: ratings[i] }).map((_, j) => (
                  <Star
                    key={j}
                    size={14}
                    className="fill-[var(--color-accent)] text-[var(--color-accent)]"
                  />
                ))}
              </div>
              <p className="text-[var(--color-text-muted)] text-sm leading-relaxed mb-6">
                &ldquo;{tTestimonials(`items.${key}.text`)}&rdquo;
              </p>
              <div>
                <p className="font-semibold text-[var(--color-text)] text-sm">
                  {tTestimonials(`items.${key}.name`)}
                </p>
                <p className="text-xs text-[var(--color-text-muted)]">
                  {tTestimonials(`items.${key}.title`)}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
