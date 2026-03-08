"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useTheme } from "@/providers/ThemeProvider";

function WireframeGlobe() {
  const globeRef = useRef<THREE.Group>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const { theme } = useTheme();

  const isDark = theme === "dark";
  // Adapt colors for light/dark mode
  const wireColor = isDark ? "#be3c5a" : "#be3c5a";
  const dotColor = isDark ? "#f0ece4" : "#1c2128";
  const ringColor = isDark ? "#f0ece4" : "#0d1117";

  const dots = useMemo(() => {
    const points: { pos: THREE.Vector3; isParis: boolean }[] = [];
    const radius = 2;

    for (let lat = -80; lat <= 80; lat += 6) {
      const latRad = (lat * Math.PI) / 180;
      const circumference = Math.cos(latRad);
      const dotsInRow = Math.max(4, Math.floor(circumference * 28));

      for (let i = 0; i < dotsInRow; i++) {
        const lonRad = ((i / dotsInRow) * 360 * Math.PI) / 180;
        const x = radius * Math.cos(latRad) * Math.cos(lonRad);
        const y = radius * Math.sin(latRad);
        const z = radius * Math.cos(latRad) * Math.sin(lonRad);

        const isParis = Math.abs(lat - 48) < 8 && Math.abs((i / dotsInRow) * 360 - 2) < 20;
        points.push({ pos: new THREE.Vector3(x, y, z), isParis });
      }
    }
    return points;
  }, []);

  const parisPos = useMemo(() => {
    const latRad = (48.86 * Math.PI) / 180;
    const lonRad = (2.35 * Math.PI) / 180;
    const r = 2;
    return new THREE.Vector3(
      r * Math.cos(latRad) * Math.cos(lonRad),
      r * Math.sin(latRad),
      r * Math.cos(latRad) * Math.sin(lonRad)
    );
  }, []);

  useFrame(({ clock }) => {
    if (globeRef.current) {
      globeRef.current.rotation.y = clock.getElapsedTime() * 0.08;
    }
    if (glowRef.current) {
      const scale = 1 + Math.sin(clock.getElapsedTime() * 2) * 0.4;
      glowRef.current.scale.setScalar(scale);
    }
  });

  return (
    <group ref={globeRef}>
      {/* Main wireframe sphere - MUCH more visible */}
      <mesh>
        <sphereGeometry args={[2, 48, 48]} />
        <meshBasicMaterial color={wireColor} wireframe transparent opacity={0.15} />
      </mesh>

      {/* Inner wireframe for depth */}
      <mesh>
        <sphereGeometry args={[1.96, 24, 24]} />
        <meshBasicMaterial color={wireColor} wireframe transparent opacity={0.06} />
      </mesh>

      {/* Dot grid - denser and more visible */}
      {dots.map((dot, i) => (
        <mesh key={i} position={dot.pos}>
          <sphereGeometry args={[dot.isParis ? 0.05 : 0.018, 6, 6]} />
          <meshBasicMaterial
            color={dot.isParis ? "#be3c5a" : dotColor}
            transparent
            opacity={dot.isParis ? 1 : 0.5}
          />
        </mesh>
      ))}

      {/* Paris marker - bigger, brighter */}
      <mesh position={parisPos}>
        <sphereGeometry args={[0.08, 12, 12]} />
        <meshBasicMaterial color="#be3c5a" />
      </mesh>

      {/* Paris glow ring - pulsing */}
      <mesh ref={glowRef} position={parisPos}>
        <ringGeometry args={[0.1, 0.16, 32]} />
        <meshBasicMaterial color="#be3c5a" transparent opacity={0.5} side={THREE.DoubleSide} />
      </mesh>

      {/* Paris outer glow */}
      <mesh position={parisPos}>
        <sphereGeometry args={[0.2, 12, 12]} />
        <meshBasicMaterial color="#be3c5a" transparent opacity={0.15} />
      </mesh>

      {/* Latitude rings - more visible */}
      {[-45, -15, 15, 45, 65].map((lat) => {
        const latRad = (lat * Math.PI) / 180;
        const r = 2 * Math.cos(latRad);
        const y = 2 * Math.sin(latRad);
        return (
          <mesh key={lat} position={[0, y, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[r - 0.003, r + 0.003, 64]} />
            <meshBasicMaterial color={ringColor} transparent opacity={0.08} side={THREE.DoubleSide} />
          </mesh>
        );
      })}

      {/* Ambient particles around globe - more visible */}
      {Array.from({ length: 60 }).map((_, i) => {
        const angle1 = (i / 60) * Math.PI * 2;
        const angle2 = Math.sin(i * 0.7) * Math.PI;
        const r = 2.4 + Math.sin(i * 1.3) * 0.6;
        return (
          <mesh
            key={`p${i}`}
            position={[
              r * Math.cos(angle1) * Math.cos(angle2),
              r * Math.sin(angle2) * 0.5,
              r * Math.sin(angle1) * Math.cos(angle2),
            ]}
          >
            <sphereGeometry args={[0.012, 4, 4]} />
            <meshBasicMaterial color="#be3c5a" transparent opacity={0.5} />
          </mesh>
        );
      })}
    </group>
  );
}

export function Globe() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <WireframeGlobe />
    </>
  );
}
