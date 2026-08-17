import { Canvas, useFrame } from "@react-three/fiber";
import { useReducedMotion } from "framer-motion";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const PARTICLE_COUNT = 720;

function readCssVar(name: string, fallback: string): string {
  if (typeof window === "undefined") return fallback;
  return (
    getComputedStyle(document.documentElement).getPropertyValue(name).trim() ||
    fallback
  );
}

const PARTICLE_COLORS = [
  readCssVar("--color-grad-hero-1", "#a78bfa"),
  readCssVar("--color-grad-hero-2", "#f472b6"),
  readCssVar("--color-grad-hero-3", "#fbbf24"),
];

function ParticleField() {
  const points = useRef<THREE.Points>(null);
  const reduceMotion = useReducedMotion();

  const { positions, colors } = useMemo(() => {
    const array = new Float32Array(PARTICLE_COUNT * 3);
    const colorArray = new Float32Array(PARTICLE_COUNT * 3);
    for (let i = 0; i < array.length; i += 3) {
      array[i] = (Math.random() - 0.5) * 24;
      array[i + 1] = (Math.random() - 0.5) * 16;
      array[i + 2] = (Math.random() - 0.5) * 12;

      const color = new THREE.Color(
        PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)],
      );
      colorArray[i] = color.r;
      colorArray[i + 1] = color.g;
      colorArray[i + 2] = color.b;
    }
    return { positions: array, colors: colorArray };
  }, []);

  useFrame((state, delta) => {
    const mesh = points.current;
    if (!mesh || reduceMotion) return;

    mesh.rotation.y += delta * 0.02;
    mesh.rotation.x = THREE.MathUtils.lerp(
      mesh.rotation.x,
      state.pointer.y * 0.12,
      0.05,
    );
    mesh.rotation.z = THREE.MathUtils.lerp(
      mesh.rotation.z,
      state.pointer.x * 0.08,
      0.05,
    );
    mesh.position.x = THREE.MathUtils.lerp(
      mesh.position.x,
      state.pointer.x * 0.35,
      0.03,
    );
    mesh.position.y = THREE.MathUtils.lerp(
      mesh.position.y,
      state.pointer.y * 0.2,
      0.03,
    );
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.055}
        sizeAttenuation
        transparent
        opacity={0.82}
        vertexColors
        color="#ffffff"
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
      aria-hidden="true"
    >
      <ParticleField />
    </Canvas>
  );
}
