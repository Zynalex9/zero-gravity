'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// ============================================
// SPACE OBJECTS CONFIGURATION - TWEAK HERE
// ============================================
export const SPACE_OBJECTS_CONFIG = {
  // Scroll thresholds for object appearance (0-1)
  planet1Threshold: 0.15,
  planet2Threshold: 0.35,
  cometThreshold: 0.5,
  nebulaThreshold: 0.25,
  // Object positions
  planet1Position: [-15, 8, -30] as [number, number, number],
  planet2Position: [20, -10, -40] as [number, number, number],
  cometPosition: [25, 15, -25] as [number, number, number],
  nebulaPosition: [-20, -5, -50] as [number, number, number],
};

interface SpaceObjectsProps {
  scrollProgress: number;
  reducedMotion: boolean;
}

// Simple planet component
function Planet({ 
  position, 
  size, 
  color, 
  visible, 
  reducedMotion 
}: { 
  position: [number, number, number];
  size: number;
  color: string;
  visible: boolean;
  reducedMotion: boolean;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (!meshRef.current || reducedMotion) return;
    meshRef.current.rotation.y += delta * 0.1;
  });

  return (
    <mesh 
      ref={meshRef} 
      position={position}
      visible={visible}
      scale={visible ? 1 : 0}
    >
      <sphereGeometry args={[size, 32, 32]} />
      <meshStandardMaterial 
        color={color} 
        roughness={0.8}
        metalness={0.2}
        transparent
        opacity={visible ? 0.9 : 0}
      />
    </mesh>
  );
}

// Simple ring around planet
function PlanetWithRings({ 
  position, 
  size, 
  color, 
  ringColor,
  visible, 
  reducedMotion 
}: { 
  position: [number, number, number];
  size: number;
  color: string;
  ringColor: string;
  visible: boolean;
  reducedMotion: boolean;
}) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (!groupRef.current || reducedMotion) return;
    groupRef.current.rotation.y += delta * 0.05;
    groupRef.current.rotation.z += delta * 0.02;
  });

  return (
    <group ref={groupRef} position={position} visible={visible}>
      <mesh>
        <sphereGeometry args={[size, 32, 32]} />
        <meshStandardMaterial 
          color={color} 
          roughness={0.7}
          metalness={0.3}
          transparent
          opacity={visible ? 0.9 : 0}
        />
      </mesh>
      <mesh rotation={[Math.PI / 2.5, 0, 0]}>
        <ringGeometry args={[size * 1.4, size * 2, 64]} />
        <meshStandardMaterial 
          color={ringColor}
          side={THREE.DoubleSide}
          transparent
          opacity={visible ? 0.6 : 0}
        />
      </mesh>
    </group>
  );
}

// Comet with tail
function Comet({ 
  position, 
  visible, 
  reducedMotion,
  scrollProgress 
}: { 
  position: [number, number, number];
  visible: boolean;
  reducedMotion: boolean;
  scrollProgress: number;
}) {
  const groupRef = useRef<THREE.Group>(null);

  // Comet tail as a line of particles
  const tailPositions = useMemo(() => {
    const positions = new Float32Array(30 * 3);
    for (let i = 0; i < 30; i++) {
      positions[i * 3] = -i * 0.5 - Math.random() * 0.3;
      positions[i * 3 + 1] = Math.random() * 0.2 - 0.1;
      positions[i * 3 + 2] = Math.random() * 0.2 - 0.1;
    }
    return positions;
  }, []);

  useFrame((state, delta) => {
    if (!groupRef.current || reducedMotion) return;
    // Move comet across screen based on scroll
    const offset = (scrollProgress - SPACE_OBJECTS_CONFIG.cometThreshold) * 30;
    groupRef.current.position.x = position[0] - offset;
    groupRef.current.position.y = position[1] - offset * 0.3;
  });

  // Create geometry for comet tail
  const tailGeometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(tailPositions, 3));
    return geo;
  }, [tailPositions]);

  return (
    <group ref={groupRef} position={position} visible={visible}>
      {/* Comet head */}
      <mesh>
        <sphereGeometry args={[0.5, 16, 16]} />
        <meshStandardMaterial 
          color="#88ccff"
          emissive="#4488ff"
          emissiveIntensity={0.5}
          transparent
          opacity={visible ? 1 : 0}
        />
      </mesh>
      {/* Comet tail */}
      <points geometry={tailGeometry}>
        <pointsMaterial
          size={0.3}
          color="#aaddff"
          transparent
          opacity={visible ? 0.6 : 0}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}

// Nebula cloud effect
function Nebula({ 
  position, 
  visible, 
  reducedMotion 
}: { 
  position: [number, number, number];
  visible: boolean;
  reducedMotion: boolean;
}) {
  const groupRef = useRef<THREE.Group>(null);

  // Create nebula as multiple overlapping transparent spheres
  const nebulaLayers = useMemo(() => {
    return [
      { scale: 8, color: '#ff44aa', opacity: 0.1 },
      { scale: 6, color: '#aa44ff', opacity: 0.15 },
      { scale: 4, color: '#4444ff', opacity: 0.12 },
      { scale: 5, color: '#ff8844', opacity: 0.08 },
    ];
  }, []);

  useFrame((state, delta) => {
    if (!groupRef.current || reducedMotion) return;
    groupRef.current.rotation.z += delta * 0.01;
  });

  return (
    <group ref={groupRef} position={position} visible={visible}>
      {nebulaLayers.map((layer, i) => (
        <mesh key={i} scale={layer.scale}>
          <sphereGeometry args={[1, 16, 16]} />
          <meshBasicMaterial
            color={layer.color}
            transparent
            opacity={visible ? layer.opacity : 0}
            side={THREE.BackSide}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      ))}
    </group>
  );
}

export function SpaceObjects({ scrollProgress, reducedMotion }: SpaceObjectsProps) {
  return (
    <group>
      {/* Distant planet 1 - appears early */}
      <Planet
        position={SPACE_OBJECTS_CONFIG.planet1Position}
        size={3}
        color="#ff6644"
        visible={scrollProgress > SPACE_OBJECTS_CONFIG.planet1Threshold}
        reducedMotion={reducedMotion}
      />

      {/* Planet with rings - appears mid scroll */}
      <PlanetWithRings
        position={SPACE_OBJECTS_CONFIG.planet2Position}
        size={4}
        color="#ddaa66"
        ringColor="#ccbb99"
        visible={scrollProgress > SPACE_OBJECTS_CONFIG.planet2Threshold}
        reducedMotion={reducedMotion}
      />

      {/* Comet - appears and moves */}
      <Comet
        position={SPACE_OBJECTS_CONFIG.cometThreshold > 0 ? SPACE_OBJECTS_CONFIG.cometPosition : [0, 0, 0]}
        visible={scrollProgress > SPACE_OBJECTS_CONFIG.cometThreshold}
        reducedMotion={reducedMotion}
        scrollProgress={scrollProgress}
      />

      {/* Nebula cloud */}
      <Nebula
        position={SPACE_OBJECTS_CONFIG.nebulaPosition}
        visible={scrollProgress > SPACE_OBJECTS_CONFIG.nebulaThreshold}
        reducedMotion={reducedMotion}
      />

      {/* Ambient light for objects */}
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#ffffff" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#4488ff" />
    </group>
  );
}
