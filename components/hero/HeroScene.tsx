"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Float,
  Icosahedron,
  Torus,
  TorusKnot,
  Sparkles,
} from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

/* ----------------------------- Particle field ---------------------------- */
function ParticleField({ count = 1400 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 6 + Math.random() * 14;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, [count]);

  useFrame((state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.018;
    ref.current.rotation.x += delta * 0.006;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={count}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.028}
        sizeAttenuation
        color="#cfcfd6"
        transparent
        opacity={0.7}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/* ------------------------------ Metallic core ----------------------------- */
function MetalCore() {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    group.current.rotation.y = t * 0.12;
    group.current.rotation.z = Math.sin(t * 0.15) * 0.12;
  });

  return (
    <group ref={group}>
      <Float speed={1.4} rotationIntensity={0.6} floatIntensity={0.9}>
        <TorusKnot args={[1.15, 0.32, 220, 32]}>
          <meshStandardMaterial
            color="#e6e6ea"
            metalness={1}
            roughness={0.18}
            envMapIntensity={1.1}
          />
        </TorusKnot>
      </Float>

      <Float speed={1} rotationIntensity={0.4} floatIntensity={0.6}>
        <Icosahedron args={[2.7, 1]}>
          <meshStandardMaterial
            color="#9a9aa2"
            wireframe
            metalness={0.8}
            roughness={0.4}
            transparent
            opacity={0.22}
          />
        </Icosahedron>
      </Float>

      <Float speed={0.8} rotationIntensity={0.5} floatIntensity={0.7}>
        <Torus args={[3.6, 0.012, 16, 120]} rotation={[Math.PI / 2.3, 0, 0]}>
          <meshStandardMaterial
            color="#d2d2d8"
            metalness={1}
            roughness={0.3}
            transparent
            opacity={0.5}
          />
        </Torus>
      </Float>
    </group>
  );
}

/* ---------------------------- Camera mouse rig ---------------------------- */
function Rig() {
  const { camera, pointer } = useThree();
  const target = useMemo(() => new THREE.Vector3(), []);

  useFrame(() => {
    target.set(pointer.x * 1.6, pointer.y * 1.0, camera.position.z);
    camera.position.x += (target.x - camera.position.x) * 0.04;
    camera.position.y += (target.y - camera.position.y) * 0.04;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 45 }}
      dpr={[1, 1.8]}
      gl={{ antialias: true, alpha: true }}
      style={{ pointerEvents: "none" }}
    >
      <color attach="background" args={["#000000"]} />
      <fog attach="fog" args={["#000000", 9, 22]} />

      <ambientLight intensity={0.35} />
      <directionalLight position={[5, 5, 5]} intensity={2.4} color="#ffffff" />
      <pointLight position={[-6, -3, 2]} intensity={40} color="#8f8f99" />
      <pointLight position={[6, 4, -4]} intensity={30} color="#ffffff" />
      <spotLight
        position={[0, 8, 6]}
        angle={0.5}
        penumbra={1}
        intensity={20}
        color="#cfcfd6"
      />

      <MetalCore />
      <ParticleField />
      <Sparkles
        count={60}
        scale={12}
        size={2.4}
        speed={0.3}
        opacity={0.5}
        color="#ffffff"
      />

      <Rig />
    </Canvas>
  );
}
