"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown, Sparkles } from "lucide-react";
import Link from "next/link";
import { MagneticButton } from "@/components/ui/MagneticButton";

function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let mouse = { x: 0, y: 0 };

    // Detect theme for color adaptation
    const getColors = () => {
      const isDark = document.documentElement.classList.contains("dark");
      return {
        particle: isDark ? "rgba(240, 236, 228, 0.4)" : "rgba(13, 17, 23, 0.25)",
        accent: isDark ? "rgba(190, 60, 90, 0.8)" : "rgba(190, 60, 90, 0.7)",
        lineBase: isDark ? [190, 60, 90] : [190, 60, 90],
        lineMaxOpacity: isDark ? 0.15 : 0.1,
      };
    };
    let colors = getColors();

    // Re-check theme on mutation
    const observer = new MutationObserver(() => { colors = getColors(); });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const particles: { x: number; y: number; vx: number; vy: number; size: number; isAccent: boolean }[] = [];
    const count = 200;

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 2 + 0.5,
        isAccent: Math.random() < 0.15,
      });
    }

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener("mousemove", onMouseMove);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update & draw particles
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        // Mouse repulsion
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
          const force = (150 - dist) / 150 * 0.5;
          p.x += (dx / dist) * force;
          p.y += (dy / dist) * force;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.isAccent ? colors.accent : colors.particle;
        ctx.fill();
      }

      // Draw connections
      ctx.strokeStyle = "rgba(190, 60, 90, 0.06)";
      ctx.lineWidth = 0.5;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            const opacity = (1 - dist / 120) * colors.lineMaxOpacity;
            ctx.strokeStyle = `rgba(${colors.lineBase[0]}, ${colors.lineBase[1]}, ${colors.lineBase[2]}, ${opacity})`;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      observer.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
}

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[var(--color-bg)]">
      {/* Full-screen particle canvas */}
      <ParticleCanvas />

      {/* Subtle gradient at bottom for transition */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[var(--color-bg)] to-transparent z-[1]" />

      {/* Accent glow */}
      <motion.div
        className="absolute top-1/4 right-1/3 w-[500px] h-[500px] rounded-full z-[1] blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, var(--color-accent), transparent)" }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.05, 0.1, 0.05] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-20 w-full">
        <div className="max-w-3xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)]/60 backdrop-blur-md text-xs font-medium text-[var(--color-text-muted)] mb-8 animate-border-glow"
          >
            <span className="w-2 h-2 rounded-full bg-[var(--color-success)] animate-pulse" />
            <Sparkles size={12} className="text-[var(--color-accent)]" />
            CTO Externalisé · Ingénierie Digitale · Paris
          </motion.div>

          {/* Title */}
          <h1 className="font-[family-name:var(--font-heading)] text-5xl md:text-7xl lg:text-[5.5rem] font-bold leading-[0.95] tracking-tight mb-8">
            <motion.span
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, type: "spring", stiffness: 80 }}
              className="block text-[var(--color-text)]"
            >
              La direction
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4, type: "spring", stiffness: 80 }}
              className="block text-[var(--color-text)]"
            >
              technique
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="block text-gradient-animated"
            >
              que votre projet mérite
            </motion.span>
          </h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="text-lg md:text-xl text-[var(--color-text-muted)] leading-relaxed mb-12 max-w-2xl"
          >
            Ancien DSI devenu entrepreneur, je ne livre pas du code — je construis
            des actifs numériques pérennes. Les contraintes réglementaires françaises
            ne sont pas un frein, elles sont mon terrain de jeu.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="flex flex-wrap gap-4"
          >
            <MagneticButton>
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 px-8 py-4 bg-[var(--color-accent)] text-white rounded-xl font-medium text-base hover:bg-[var(--color-accent-dark)] transition-all duration-200 cursor-pointer animate-glow-pulse hover:animate-none hover:shadow-xl hover:shadow-[var(--color-accent)]/20"
              >
                Planifier un échange
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </MagneticButton>
            <MagneticButton>
              <Link
                href="/#services"
                className="inline-flex items-center gap-2 px-8 py-4 border border-[var(--color-border)] text-[var(--color-text)] rounded-xl font-medium text-base hover:bg-[var(--color-surface)]/80 hover:border-[var(--color-accent)]/30 backdrop-blur-sm transition-all duration-200 cursor-pointer"
              >
                Découvrir notre expertise
              </Link>
            </MagneticButton>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-[var(--color-text-muted)] tracking-widest uppercase font-[family-name:var(--font-sub)]">
          Explorer
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown size={16} className="text-[var(--color-accent)]" />
        </motion.div>
      </motion.div>
    </section>
  );
}
