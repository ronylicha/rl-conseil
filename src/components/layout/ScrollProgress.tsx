"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] z-[100] origin-left"
      style={{
        scaleX,
        background:
          "linear-gradient(90deg, var(--color-accent), var(--color-accent-light))",
        boxShadow:
          "0 0 10px var(--color-accent), 0 0 20px rgba(190, 60, 90, 0.3)",
      }}
    />
  );
}
