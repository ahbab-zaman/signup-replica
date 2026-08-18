import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef, type RefObject } from "react";
import * as THREE from "three";

interface MousePos {
  x: number; // -0.5 → 0.5
  y: number; // -0.5 → 0.5
}

interface HeroCanvasProps {
  mouseRef?: RefObject<MousePos>;
}

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

function ParticleField({ mouseRef }: { mouseRef?: RefObject<MousePos> }) {
  const points = useRef<THREE.Points>(null);

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

  useFrame((_state, delta) => {
    const mesh = points.current;
    if (!mesh) return;

    // Continuous rotation
    mesh.rotation.y += delta * 0.06;
    mesh.rotation.x += delta * 0.02;

    // Floating bobbing effect
    const time = _state.clock.getElapsedTime();
    const floatingY = Math.sin(time * 0.8) * 0.25;

    // Read latest mouse position directly from shared ref — no React re-render needed
    const mx = mouseRef?.current?.x ?? 0;
    const my = mouseRef?.current?.y ?? 0;

    const targetX = mx * 3.5;          // world-space offset
    const targetY = floatingY + my * -2.5; // invert Y so moving up pushes particles up

    mesh.position.x = THREE.MathUtils.lerp(mesh.position.x, targetX, 0.12);
    mesh.position.y = THREE.MathUtils.lerp(mesh.position.y, targetY, 0.12);
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

export default function HeroCanvas({ mouseRef }: HeroCanvasProps) {
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
      <ParticleField mouseRef={mouseRef} />
    </Canvas>
  );
}
