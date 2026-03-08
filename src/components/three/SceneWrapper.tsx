"use client";

import { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { cn } from "@/lib/utils";

interface SceneWrapperProps {
  children: React.ReactNode;
  className?: string;
  cameraPosition?: [number, number, number];
}

function canRender3D(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    return !!(
      (canvas.getContext("webgl2") || canvas.getContext("webgl")) &&
      window.requestAnimationFrame
    );
  } catch {
    return false;
  }
}

function LoadingFallback() {
  return (
    <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-bg)] via-[var(--color-bg-subtle)] to-[var(--color-bg)] flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-[var(--color-accent)] border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

export function SceneWrapper({
  children,
  className,
  cameraPosition = [0, 0, 8],
}: SceneWrapperProps) {
  const [enabled, setEnabled] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    setEnabled(canRender3D());
  }, []);

  if (!isMounted) {
    return (
      <div className={cn("relative", className)}>
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-bg)] via-[var(--color-bg-subtle)] to-[var(--color-bg)]" />
      </div>
    );
  }

  if (!enabled) {
    return (
      <div className={cn("relative", className)}>
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-bg)] via-[var(--color-bg-subtle)] to-[var(--color-bg)]" />
      </div>
    );
  }

  return (
    <div className={cn("relative w-full h-full", className)}>
      <Suspense fallback={<LoadingFallback />}>
        <Canvas
          camera={{ position: cameraPosition, fov: 60 }}
          dpr={[1, 1.5]}
          gl={{
            antialias: true,
            alpha: true,
            stencil: false,
            depth: true,
            powerPreference: "high-performance",
          }}
          style={{
            background: "transparent",
            width: "100%",
            height: "100%",
          }}
        >
          {children}
        </Canvas>
      </Suspense>
    </div>
  );
}
