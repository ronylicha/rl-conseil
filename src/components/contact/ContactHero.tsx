"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Clock, Globe as GlobeIcon, ShieldCheck, MapPin, ArrowDown } from "lucide-react";

const Scene = dynamic(
  () => import("@/components/three/SceneWrapper").then((mod) => ({ default: mod.SceneWrapper })),
  { ssr: false }
);

const GlobeScene = dynamic(
  () => import("@/components/three/Globe").then((mod) => ({ default: mod.Globe })),
  { ssr: false }
);

const quickStats = [
  { icon: Clock, label: "Réponse sous 24h" },
  { icon: GlobeIcon, label: "France et international" },
  { icon: ShieldCheck, label: "Échanges confidentiels" },
];

export function ContactHero() {
  return (
    <section className="pt-32 pb-20 relative overflow-hidden min-h-[70vh] flex items-center">
      {/* 3D Globe Background - CENTERED, much more visible */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[800px] h-[800px] opacity-60 dark:opacity-50">
          <Scene className="w-full h-full" cameraPosition={[0, 0, 4.5]}>
            <GlobeScene />
          </Scene>
        </div>
      </div>

      {/* Lighter gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-bg)]/60 via-transparent to-[var(--color-bg)]/80" />

      {/* Accent glow */}
      <motion.div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, var(--color-accent), transparent)" }}
        animate={{ scale: [1, 1.15, 1], opacity: [0.08, 0.15, 0.08] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium tracking-wider uppercase border border-[var(--color-border)] text-[var(--color-accent)] mb-8 font-[family-name:var(--font-sub)] animate-border-glow"
          >
            <MapPin size={12} />
            Paris, France
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="font-[family-name:var(--font-heading)] text-4xl md:text-6xl lg:text-7xl font-bold text-[var(--color-text)] mb-6 leading-tight"
          >
            Parlons de votre{" "}
            <span className="text-gradient-animated">prochain projet</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-lg text-[var(--color-text-muted)] mb-12 leading-relaxed max-w-2xl mx-auto"
          >
            Nous sommes disponibles pour analyser vos enjeux et vous proposer
            une feuille de route technique adaptée à vos ambitions.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex flex-wrap justify-center gap-6 mb-12"
          >
            {quickStats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + i * 0.1 }}
                className="flex items-center gap-2.5 text-sm text-[var(--color-text-muted)]"
              >
                <div className="w-9 h-9 rounded-lg bg-[var(--color-accent)]/10 flex items-center justify-center hover:bg-[var(--color-accent)]/20 hover:shadow-md hover:shadow-[var(--color-accent)]/10 transition-all duration-300">
                  <s.icon size={16} className="text-[var(--color-accent)]" />
                </div>
                {s.label}
              </motion.div>
            ))}
          </motion.div>

          {/* Scroll hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ArrowDown size={20} className="mx-auto text-[var(--color-accent)]/50" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
