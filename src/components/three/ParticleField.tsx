"use client";

import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const PARTICLE_COUNT = 2000;

function Particles() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const { viewport } = useThree();

  const particleData = useMemo(() => {
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const velocities = new Float32Array(PARTICLE_COUNT * 3);
    const scales = new Float32Array(PARTICLE_COUNT);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;

      // Camera at z=8, fov=60 → visible area ~±8 x ±5 at z=0
      // Spread particles across visible area + slight overflow for edge coverage
      positions[i3] = (Math.random() - 0.5) * 18;      // x: -9 to 9
      positions[i3 + 1] = (Math.random() - 0.5) * 14;  // y: -7 to 7
      positions[i3 + 2] = (Math.random() - 0.5) * 6 - 1; // z: -4 to 2 (biased toward camera)

      velocities[i3] = (Math.random() - 0.5) * 0.003;
      velocities[i3 + 1] = (Math.random() - 0.5) * 0.002;
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.001;

      scales[i] = Math.random() * 0.04 + 0.008;
    }

    return { positions, velocities, scales };
  }, []);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame(({ pointer, clock }) => {
    if (!meshRef.current) return;

    mouseRef.current.x += (pointer.x * viewport.width * 0.3 - mouseRef.current.x) * 0.015;
    mouseRef.current.y += (pointer.y * viewport.height * 0.3 - mouseRef.current.y) * 0.015;

    const time = clock.getElapsedTime();

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;

      particleData.positions[i3] +=
        particleData.velocities[i3] + Math.sin(time * 0.2 + i * 0.05) * 0.0008;
      particleData.positions[i3 + 1] +=
        particleData.velocities[i3 + 1] + Math.cos(time * 0.15 + i * 0.03) * 0.0008;
      particleData.positions[i3 + 2] += particleData.velocities[i3 + 2];

      // Wrap around – matching visible bounds
      if (particleData.positions[i3] > 9) particleData.positions[i3] = -9;
      if (particleData.positions[i3] < -9) particleData.positions[i3] = 9;
      if (particleData.positions[i3 + 1] > 7) particleData.positions[i3 + 1] = -7;
      if (particleData.positions[i3 + 1] < -7) particleData.positions[i3 + 1] = 7;
      if (particleData.positions[i3 + 2] > 2) particleData.positions[i3 + 2] = -4;
      if (particleData.positions[i3 + 2] < -4) particleData.positions[i3 + 2] = 2;

      dummy.position.set(
        particleData.positions[i3] + mouseRef.current.x * 0.08,
        particleData.positions[i3 + 1] + mouseRef.current.y * 0.08,
        particleData.positions[i3 + 2]
      );
      dummy.scale.setScalar(particleData.scales[i]);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, PARTICLE_COUNT]}>
      <sphereGeometry args={[1, 6, 6]} />
      <meshBasicMaterial color="#f0ece4" transparent opacity={0.5} />
    </instancedMesh>
  );
}

function ConnectionLines() {
  const geometryRef = useRef<THREE.BufferGeometry>(null);
  const lineRef = useRef<THREE.LineSegments>(null);

  useFrame(({ scene }) => {
    if (!lineRef.current || !geometryRef.current) return;

    const mesh = scene.children.find(
      (c) => c instanceof THREE.InstancedMesh
    ) as THREE.InstancedMesh | undefined;

    if (!mesh) return;

    const positions: number[] = [];
    const matrix = new THREE.Matrix4();
    const pos1 = new THREE.Vector3();
    const pos2 = new THREE.Vector3();

    // Sample a subset for performance
    const sampleCount = Math.min(250, PARTICLE_COUNT);
    const maxDist = 1.8;

    for (let i = 0; i < sampleCount; i++) {
      mesh.getMatrixAt(i, matrix);
      pos1.setFromMatrixPosition(matrix);

      for (let j = i + 1; j < sampleCount; j++) {
        mesh.getMatrixAt(j, matrix);
        pos2.setFromMatrixPosition(matrix);

        if (pos1.distanceTo(pos2) < maxDist) {
          positions.push(pos1.x, pos1.y, pos1.z, pos2.x, pos2.y, pos2.z);
        }
      }
    }

    geometryRef.current.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3)
    );
  });

  return (
    <lineSegments ref={lineRef}>
      <bufferGeometry ref={geometryRef} />
      <lineBasicMaterial color="#be3c5a" transparent opacity={0.1} />
    </lineSegments>
  );
}

export function ParticleField() {
  return (
    <>
      <Particles />
      <ConnectionLines />
    </>
  );
}
