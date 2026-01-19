"use client";

import { useRef, Suspense, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF, Billboard, useTexture } from "@react-three/drei";
import * as THREE from "three";

// ============================================
// ASTRONAUT CONFIGURATION
// ============================================
export const ASTRONAUT_CONFIG = {
  position: [-20, 0, 0] as [number, number, number],
  scale: 10,
  floatAmplitude: 0.3,
  floatSpeed: 1.5,
  rotationSpeed: 0.1,
  parallaxStrength: 0.3,
  placeholderSize: [2, 2.5] as [number, number],
};

interface AstronautProps {
  mousePosition: { x: number; y: number };
  reducedMotion: boolean;
}

/**
 * OPTION 1: GLB/GLTF 3D Model
 */
function AstronautModel({ mousePosition, reducedMotion }: AstronautProps) {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF("/models/astronaut.glb");

  useFrame((state) => {
    if (!groupRef.current || reducedMotion) return;

    const time = state.clock.elapsedTime;

    // Floating animation
    groupRef.current.position.y =
      ASTRONAUT_CONFIG.position[1] +
      Math.sin(time * ASTRONAUT_CONFIG.floatSpeed) * ASTRONAUT_CONFIG.floatAmplitude;

    // Subtle rotation
    groupRef.current.rotation.y = Math.sin(time * ASTRONAUT_CONFIG.rotationSpeed) * 0.2;
    groupRef.current.rotation.z = Math.sin(time * ASTRONAUT_CONFIG.rotationSpeed * 0.7) * 0.05;

    // Mouse parallax
    groupRef.current.position.x =
      ASTRONAUT_CONFIG.position[0] + mousePosition.x * ASTRONAUT_CONFIG.parallaxStrength;
  });

  return (
    <group
      ref={groupRef}
      position={ASTRONAUT_CONFIG.position}
      scale={ASTRONAUT_CONFIG.scale}
    >
      <primitive object={scene.clone()} />
    </group>
  );
}

/**
 * OPTION 2: PNG Billboard fallback
 */
function AstronautBillboard({ mousePosition, reducedMotion }: AstronautProps) {
  const groupRef = useRef<THREE.Group>(null);
  const texture = useTexture("/sideguy.png");

  useFrame((state) => {
    if (!groupRef.current || reducedMotion) return;

    const time = state.clock.elapsedTime;

    groupRef.current.position.y =
      ASTRONAUT_CONFIG.position[1] +
      Math.sin(time * ASTRONAUT_CONFIG.floatSpeed) * ASTRONAUT_CONFIG.floatAmplitude;

    groupRef.current.position.x =
      ASTRONAUT_CONFIG.position[0] + mousePosition.x * ASTRONAUT_CONFIG.parallaxStrength;
  });

  return (
    <group ref={groupRef} position={ASTRONAUT_CONFIG.position}>
      <Billboard>
        <mesh scale={ASTRONAUT_CONFIG.scale}>
          <planeGeometry args={ASTRONAUT_CONFIG.placeholderSize} />
          <meshBasicMaterial
            map={texture}
            transparent
            side={THREE.DoubleSide}
            depthWrite={false}
          />
        </mesh>
      </Billboard>
    </group>
  );
}

/**
 * OPTION 3: Geometric Placeholder
 */
function AstronautPlaceholder({ mousePosition, reducedMotion }: AstronautProps) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current || reducedMotion) return;

    const time = state.clock.elapsedTime;

    groupRef.current.position.y =
      ASTRONAUT_CONFIG.position[1] +
      Math.sin(time * ASTRONAUT_CONFIG.floatSpeed) * ASTRONAUT_CONFIG.floatAmplitude;

    groupRef.current.rotation.y = time * ASTRONAUT_CONFIG.rotationSpeed;

    groupRef.current.position.x =
      ASTRONAUT_CONFIG.position[0] + mousePosition.x * ASTRONAUT_CONFIG.parallaxStrength;
  });

  return (
    <group ref={groupRef} position={ASTRONAUT_CONFIG.position}>
      {/* Body */}
      <mesh scale={ASTRONAUT_CONFIG.scale}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color="#ffffff" roughness={0.3} metalness={0.7} />
      </mesh>
      {/* Helmet */}
      <mesh
        position={[0, 0.7 * ASTRONAUT_CONFIG.scale, 0]}
        scale={ASTRONAUT_CONFIG.scale}
      >
        <sphereGeometry args={[0.35, 32, 32]} />
        <meshStandardMaterial color="#333333" roughness={0.1} metalness={0.9} />
      </mesh>
      {/* Visor */}
      <mesh
        position={[
          0.1 * ASTRONAUT_CONFIG.scale,
          0.7 * ASTRONAUT_CONFIG.scale,
          0.2 * ASTRONAUT_CONFIG.scale,
        ]}
        scale={ASTRONAUT_CONFIG.scale}
      >
        <sphereGeometry args={[0.25, 32, 32]} />
        <meshStandardMaterial
          color="#4488ff"
          roughness={0.1}
          metalness={0.3}
          transparent
          opacity={0.8}
        />
      </mesh>
      {/* Backpack */}
      <mesh
        position={[0, 0, -0.4 * ASTRONAUT_CONFIG.scale]}
        scale={ASTRONAUT_CONFIG.scale}
      >
        <boxGeometry args={[0.5, 0.6, 0.3]} />
        <meshStandardMaterial color="#cccccc" roughness={0.5} metalness={0.5} />
      </mesh>
    </group>
  );
}

/**
 * Main Component
 */
export function Astronaut({ mousePosition, reducedMotion }: AstronautProps) {
  const [assetType, setAssetType] = useState<"glb" | "png" | "placeholder">("png");

  useEffect(() => {
    const checkAssets = async () => {
      try {
        const glbResponse = await fetch("/models/astronaut.glb", { method: "HEAD" });
        if (glbResponse.ok) {
          setAssetType("glb");
          return;
        }
      } catch (e) {
        /* Silence error */
      }

      try {
        const pngResponse = await fetch("/sideguy.png", { method: "HEAD" });
        if (pngResponse.ok) {
          setAssetType("png");
          return;
        }
      } catch (e) {
        /* Silence error */
      }

      setAssetType("placeholder");
    };

    checkAssets();
  }, []);

  return (
    <Suspense
      fallback={
        <AstronautPlaceholder
          mousePosition={mousePosition}
          reducedMotion={reducedMotion}
        />
      }
    >
      {assetType === "glb" && (
        <AstronautModel mousePosition={mousePosition} reducedMotion={reducedMotion} />
      )}
      {assetType === "png" && (
        <AstronautBillboard mousePosition={mousePosition} reducedMotion={reducedMotion} />
      )}
      {assetType === "placeholder" && (
        <AstronautPlaceholder mousePosition={mousePosition} reducedMotion={reducedMotion} />
      )}
    </Suspense>
  );
}

useGLTF.preload("/models/astronaut.glb");