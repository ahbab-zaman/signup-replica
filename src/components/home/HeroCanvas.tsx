import { Canvas, useFrame } from "@react-three/fiber";
import { useReducedMotion } from "framer-motion";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const PARTICLE_COUNT = 600;

function readCssVar(name: string, fallback: string): string {
  if (typeof window === "undefined") return fallback;
  return (
    getComputedStyle(document.documentElement).getPropertyValue(name).trim() ||
    fallback
  );
}

const PARTICLE_COLOR = readCssVar("--color-accent-light", "#a78bfa");

function ParticleField() {
  const points = useRef<THREE.Points>(null);
  const reduceMotion = useReducedMotion();

  const positions = useMemo(() => {
    const array = new Float32Array(PARTICLE_COUNT * 3);
    for (let i = 0; i < array.length; i += 3) {
      array[i] = (Math.random() - 0.5) * 24;
      array[i + 1] = (Math.random() - 0.5) * 16;
      array[i + 2] = (Math.random() - 0.5) * 12;
    }
    return array;
  }, []);

  useFrame((state, delta) => {
    const mesh = points.current;
    if (!mesh || reduceMotion) return;

    mesh.rotation.y += delta * 0.03;
    mesh.rotation.x = THREE.MathUtils.lerp(
      mesh.rotation.x,
      state.pointer.y * 0.06,
      0.05,
    );
    mesh.rotation.z = THREE.MathUtils.lerp(
      mesh.rotation.z,
      state.pointer.x * 0.08,
      0.05,
    );
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.045}
        sizeAttenuation
        transparent
        opacity={0.7}
        color={PARTICLE_COLOR}
        depthWrite={false}
      />
    </points>
  );
}

export default function HeroCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 0, 9], fov: 55 }}
      dpr={[1, 1.5]}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      }}
      className="pointer-events-none"
      aria-hidden="true"
    >
      <ParticleField />
    </Canvas>
  );
}