"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";
import { Rocket, Crown, Server, GraduationCap, Megaphone } from "lucide-react";
import { experiences } from "@/data/experience";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { cn } from "@/lib/utils";

const iconMap = [Rocket, Crown, Server, GraduationCap, Megaphone];

function TimelineNode({ isCurrent, isVisible, icon: Icon }: { isCurrent: boolean; isVisible: boolean; icon: React.ComponentType<{ size?: number; className?: string }> }) {
  return (
    <div className="relative">
      {/* Outer glow ring */}
      {isCurrent && (
        <div className="absolute -inset-3 rounded-full bg-[var(--color-accent)]/20 animate-ping" />
      )}
      <motion.div
        initial={{ scale: 0 }}
        animate={isVisible ? { scale: 1 } : { scale: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 15 }}
        className={cn(
          "relative z-10 w-14 h-14 rounded-full flex items-center justify-center border-4",
          isCurrent
            ? "bg-[var(--color-accent)] border-[var(--color-accent)]/30 shadow-lg shadow-[var(--color-accent)]/30"
            : "bg-[var(--color-surface)] border-[var(--color-border)]"
        )}
      >
        <Icon size={20} className={isCurrent ? "text-white" : "text-[var(--color-accent)]"} />
      </motion.div>
      {/* Glow dot */}
      {isCurrent && isVisible && (
        <motion.div
          className="absolute inset-0 rounded-full bg-[var(--color-accent)]/40"
          animate={{ scale: [1, 1.5, 1], opacity: [0.4, 0, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      )}
    </div>
  );
}

function TimelineCard({ exp, index, icon: Icon }: { exp: typeof experiences[0]; index: number; icon: React.ComponentType<{ size?: number; className?: string }> }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const isLeft = index % 2 === 0;

  return (
    <div ref={ref} className="relative mb-16 last:mb-0">
      <div className={cn(
        "flex items-start gap-8",
        "md:gap-12",
        isLeft ? "md:flex-row" : "md:flex-row-reverse"
      )}>
        {/* Card */}
        <motion.div
          initial={{ opacity: 0, x: isLeft ? -60 : 60, rotateY: isLeft ? -5 : 5 }}
          animate={isInView ? { opacity: 1, x: 0, rotateY: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2, type: "spring", stiffness: 100 }}
          className="flex-1 md:w-[calc(50%-3.5rem)]"
          style={{ perspective: "1000px" }}
        >
          <div className={cn(
            "p-6 rounded-2xl border bg-[var(--color-surface)] transition-all duration-500",
            exp.isCurrent
              ? "border-[var(--color-accent)]/30 shadow-lg shadow-[var(--color-accent)]/10"
              : "border-[var(--color-border)] hover:border-[var(--color-accent)]/20 hover:shadow-md"
          )}>
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-[family-name:var(--font-heading)] text-lg font-bold text-[var(--color-text)]">
                  {exp.title}
                </h3>
                <p className="text-sm font-medium text-[var(--color-accent)]">{exp.company}</p>
              </div>
              <motion.span
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ delay: 0.5, type: "spring" }}
                className={cn(
                  "px-3 py-1 rounded-full text-xs font-medium shrink-0",
                  exp.isCurrent
                    ? "bg-[var(--color-accent)] text-white"
                    : "bg-[var(--color-bg-subtle)] text-[var(--color-text-muted)]"
                )}
              >
                {exp.duration}
              </motion.span>
            </div>

            <p className="text-xs text-[var(--color-text-muted)] mb-3">{exp.location} · {exp.period}</p>
            <p className="text-sm text-[var(--color-text-muted)] mb-4 leading-relaxed">{exp.description}</p>

            {/* Achievements with stagger */}
            <ul className="space-y-2 mb-4">
              {exp.achievements.map((a, j) => (
                <motion.li
                  key={a}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.4 + j * 0.1, duration: 0.4 }}
                  className="flex items-start gap-2 text-sm text-[var(--color-text)]"
                >
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : {}}
                    transition={{ delay: 0.5 + j * 0.1, type: "spring" }}
                    className="mt-1.5 w-2 h-2 rounded-full bg-[var(--color-accent)] shrink-0"
                  />
                  {a}
                </motion.li>
              ))}
            </ul>

            {/* Skills with stagger */}
            <div className="flex flex-wrap gap-1.5">
              {exp.skills.map((s, j) => (
                <motion.span
                  key={s}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.6 + j * 0.05, duration: 0.3 }}
                  className="px-2.5 py-1 rounded-md text-xs font-medium bg-[var(--color-bg-subtle)] text-[var(--color-text-muted)]"
                >
                  {s}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Node (visible on mobile, hidden on md where it's positioned absolutely) */}
        <div className="hidden md:flex items-start pt-2">
          <TimelineNode isCurrent={exp.isCurrent} isVisible={isInView} icon={Icon} />
        </div>

        {/* Spacer for alternating layout */}
        <div className="hidden md:block flex-1" />
      </div>
    </div>
  );
}

export function ParcourseTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <section className="py-24 bg-[var(--color-bg-subtle)]">
      <div className="max-w-5xl mx-auto px-6">
        <SectionHeader
          badge="Expérience"
          title="Parcours Professionnel"
          subtitle="Des responsabilités croissantes, une expertise qui s'approfondit."
        />

        <div ref={containerRef} className="relative">
          {/* Background line (static, faded) */}
          <div className="hidden md:block absolute left-1/2 -translate-x-px top-0 bottom-0 w-0.5 bg-[var(--color-border)]" />

          {/* Animated glowing line that fills on scroll */}
          <motion.div
            className="hidden md:block absolute left-1/2 -translate-x-px top-0 w-0.5 bg-gradient-to-b from-[var(--color-accent)] to-[var(--color-accent-light)] origin-top"
            style={{ scaleY, height: "100%" }}
          />

          {/* Glow effect on the progress line */}
          <motion.div
            className="hidden md:block absolute left-1/2 -translate-x-[3px] top-0 w-1.5 bg-gradient-to-b from-[var(--color-accent)]/40 to-transparent origin-top blur-sm"
            style={{ scaleY, height: "100%" }}
          />

          {/* Timeline items */}
          {experiences.map((exp, i) => {
            const Icon = iconMap[i] || Rocket;
            return <TimelineCard key={exp.company + exp.period} exp={exp} index={i} icon={Icon} />;
          })}
        </div>
      </div>
    </section>
  );
}
