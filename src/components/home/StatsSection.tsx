"use client";

import { useRef, useEffect, useState } from "react";
import { Calendar, Server, CheckCircle, Euro } from "lucide-react";

const stats = [
  { value: 15, suffix: "+", label: "Années d'expertise", icon: Calendar },
  {
    value: 50,
    suffix: "+",
    label: "Applications en production",
    icon: Server,
  },
  { value: 99.9, suffix: "%", label: "Disponibilité garantie", icon: CheckCircle },
  { value: 500, suffix: "k€+", label: "Facturés via nos outils", icon: Euro },
];

function AnimatedCounter({
  target,
  suffix,
  duration = 2000,
}: {
  target: number;
  suffix: string;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = Date.now();
          const step = () => {
            const progress = Math.min((Date.now() - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target * 10) / 10);
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return (
    <span
      ref={ref}
      className="text-4xl md:text-5xl font-bold font-[family-name:var(--font-heading)] text-gradient tabular-nums"
    >
      {count % 1 === 0 ? Math.floor(count) : count.toFixed(1)}
      {suffix}
    </span>
  );
}

export function StatsSection() {
  return (
    <section className="py-20 border-y border-[var(--color-border)] relative overflow-hidden">
      <div className="absolute inset-0 animate-shimmer" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <stat.icon
                size={24}
                className="mx-auto mb-3 text-[var(--color-accent)]"
              />
              <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              <p className="mt-2 text-sm text-[var(--color-text-muted)]">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
