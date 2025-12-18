'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Lerp helper for smooth interpolation
function lerp(start: number, end: number, factor: number): number {
  return start + (end - start) * factor;
}

// ============================================
// SPACE OBJECTS CONFIGURATION
// One large realistic object per section
// ============================================
export const SPACE_OBJECTS_CONFIG = {
  // Scroll ranges for each section (approximate)
  // Hero: 0-0.15, Services: 0.15-0.35, Work: 0.35-0.55, About: 0.55-0.75, Contact: 0.75-1.0
  sections: {
    services: { start: 0.12, end: 0.38 },
    work: { start: 0.35, end: 0.58 },
    about: { start: 0.52, end: 0.78 },
    contact: { start: 0.72, end: 0.95 },
  },
};

interface SpaceObjectsProps {
  scrollProgress: number;
  reducedMotion: boolean;
}

// Create realistic planet texture with procedural noise
function createPlanetTexture(
  baseColor: string,
  accentColor: string,
  noiseScale: number = 4
): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  const size = 512;
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;

  // Base color
  ctx.fillStyle = baseColor;
  ctx.fillRect(0, 0, size, size);

  // Add noise/texture for realism
  const imageData = ctx.getImageData(0, 0, size, size);
  const data = imageData.data;
  const accent = new THREE.Color(accentColor);

  for (let i = 0; i < data.length; i += 4) {
    const x = (i / 4) % size;
    const y = Math.floor(i / 4 / size);

    // Simplex-like noise approximation
    const noise1 = Math.sin(x * 0.02 * noiseScale) * Math.cos(y * 0.02 * noiseScale);
    const noise2 = Math.sin(x * 0.05 * noiseScale + 1.5) * Math.cos(y * 0.03 * noiseScale + 0.5);
    const noise3 = Math.sin(x * 0.01 * noiseScale + y * 0.01 * noiseScale);
    const combined = (noise1 + noise2 * 0.5 + noise3 * 0.3) / 1.8;

    // Blend based on noise
    const blend = Math.max(0, Math.min(1, combined * 0.5 + 0.5));
    data[i] = data[i] * (1 - blend * 0.4) + accent.r * 255 * blend * 0.4;
    data[i + 1] = data[i + 1] * (1 - blend * 0.4) + accent.g * 255 * blend * 0.4;
    data[i + 2] = data[i + 2] * (1 - blend * 0.4) + accent.b * 255 * blend * 0.4;

    // Add subtle variation
    const variation = (Math.random() - 0.5) * 15;
    data[i] = Math.max(0, Math.min(255, data[i] + variation));
    data[i + 1] = Math.max(0, Math.min(255, data[i + 1] + variation));
    data[i + 2] = Math.max(0, Math.min(255, data[i + 2] + variation));
  }

  ctx.putImageData(imageData, 0, 0);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  return texture;
}

// Create atmospheric glow texture
function createAtmosphereTexture(color: string): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  const size = 256;
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;

  const gradient = ctx.createRadialGradient(
    size / 2, size / 2, size * 0.3,
    size / 2, size / 2, size / 2
  );
  gradient.addColorStop(0, 'rgba(255,255,255,0)');
  gradient.addColorStop(0.5, color + '40');
  gradient.addColorStop(0.8, color + '20');
  gradient.addColorStop(1, 'rgba(0,0,0,0)');

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);

  return new THREE.CanvasTexture(canvas);
}

// Easing function for smooth animation
function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

function easeInCubic(t: number): number {
  return t * t * t;
}

// Calculate visibility, opacity, and animation progress based on scroll range
function useVisibility(
  scrollProgress: number, 
  start: number, 
  end: number,
  direction: 'left' | 'right' = 'left'
) {
  const inRange = scrollProgress >= start && scrollProgress <= end;
  const progress = Math.max(0, Math.min(1, (scrollProgress - start) / (end - start)));

  // Fade in during first 30%, fade out during last 30%
  let opacity = 1;
  if (progress < 0.3) {
    opacity = progress / 0.3;
  } else if (progress > 0.7) {
    opacity = (1 - progress) / 0.3;
  }

  // Animation offset - starts offscreen, moves to final position
  // Uses easing for smooth entrance/exit
  let animationProgress: number;
  if (progress < 0.3) {
    // Entering - ease in
    animationProgress = easeOutCubic(progress / 0.3);
  } else if (progress > 0.7) {
    // Exiting - ease out (reverse)
    animationProgress = easeOutCubic((1 - progress) / 0.3);
  } else {
    // Fully visible
    animationProgress = 1;
  }

  // Calculate X offset - starts far offscreen, ends at 0
  const offscreenDistance = 60; // How far offscreen to start
  const xOffset = (1 - animationProgress) * offscreenDistance * (direction === 'left' ? -1 : 1);

  return { 
    visible: inRange || progress > -0.1, // Keep visible slightly before/after for smooth transition
    opacity: inRange ? opacity : 0, 
    progress,
    xOffset,
    animationProgress 
  };
}

// ============================================
// MARS-LIKE PLANET - Services Section
// ============================================
function MarsPlanet({
  scrollProgress,
  reducedMotion,
}: {
  scrollProgress: number;
  reducedMotion: boolean;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const atmosphereRef = useRef<THREE.Mesh>(null);
  const { visible, opacity, xOffset } = useVisibility(
    scrollProgress,
    SPACE_OBJECTS_CONFIG.sections.services.start,
    SPACE_OBJECTS_CONFIG.sections.services.end,
    'left' // Comes from left
  );

  const texture = useMemo(() => {
    if (typeof document === 'undefined') return null;
    return createPlanetTexture('#b35c3a', '#8b4332', 3);
  }, []);

  const bumpTexture = useMemo(() => {
    if (typeof document === 'undefined') return null;
    return createPlanetTexture('#666666', '#444444', 6);
  }, []);

  useFrame((state, delta) => {
    if (!meshRef.current || reducedMotion) return;
    meshRef.current.rotation.y += delta * 0.03;
  });

  // Final position with animation offset
  const finalX = -18 + xOffset;

  return (
    <group position={[finalX, 0, -35]} visible={visible}>
      {/* Main planet */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[12, 64, 64]} />
        <meshStandardMaterial
          map={texture}
          bumpMap={bumpTexture}
          bumpScale={0.3}
          roughness={0.9}
          metalness={0.1}
          transparent
          opacity={opacity * 0.95}
        />
      </mesh>
      {/* Atmosphere glow */}
      <mesh ref={atmosphereRef} scale={1.08}>
        <sphereGeometry args={[12, 32, 32]} />
        <meshBasicMaterial
          color="#ff6644"
          transparent
          opacity={opacity * 0.15}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

// ============================================
// SATURN-LIKE RINGED PLANET - Work Section
// ============================================
function SaturnPlanet({
  scrollProgress,
  reducedMotion,
}: {
  scrollProgress: number;
  reducedMotion: boolean;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const { visible, opacity, xOffset } = useVisibility(
    scrollProgress,
    SPACE_OBJECTS_CONFIG.sections.work.start,
    SPACE_OBJECTS_CONFIG.sections.work.end,
    'right' // Comes from right
  );

  const texture = useMemo(() => {
    if (typeof document === 'undefined') return null;
    return createPlanetTexture('#d4a574', '#c9956c', 2);
  }, []);

  // Create ring texture with gaps
  const ringTexture = useMemo(() => {
    if (typeof document === 'undefined') return null;
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 64;
    const ctx = canvas.getContext('2d')!;

    // Create ring bands
    for (let x = 0; x < 512; x++) {
      const noise = Math.sin(x * 0.1) * 0.3 + Math.sin(x * 0.05) * 0.2 + Math.random() * 0.1;
      const alpha = Math.max(0, Math.min(1, 0.5 + noise));

      // Create gaps in rings
      const gap1 = x > 150 && x < 170;
      const gap2 = x > 280 && x < 295;
      const gap3 = x > 380 && x < 390;

      if (gap1 || gap2 || gap3) continue;

      ctx.fillStyle = `rgba(210, 190, 165, ${alpha})`;
      ctx.fillRect(x, 0, 1, 64);
    }

    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    return tex;
  }, []);

  useFrame((state, delta) => {
    if (!groupRef.current || reducedMotion) return;
    groupRef.current.rotation.y += delta * 0.02;
  });

  // Final position with animation offset
  const finalX = 22 + xOffset;

  return (
    <group ref={groupRef} position={[finalX, -5, -40]} rotation={[0.3, 0, 0.1]} visible={visible}>
      {/* Planet body */}
      <mesh>
        <sphereGeometry args={[10, 64, 64]} />
        <meshStandardMaterial
          map={texture}
          roughness={0.8}
          metalness={0.1}
          transparent
          opacity={opacity * 0.95}
        />
      </mesh>
      {/* Ring system */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[14, 24, 128]} />
        <meshStandardMaterial
          map={ringTexture}
          side={THREE.DoubleSide}
          transparent
          opacity={opacity * 0.7}
          roughness={0.9}
          depthWrite={false}
        />
      </mesh>
      {/* Atmosphere */}
      <mesh scale={1.05}>
        <sphereGeometry args={[10, 32, 32]} />
        <meshBasicMaterial
          color="#e8d4b8"
          transparent
          opacity={opacity * 0.1}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

// ============================================
// EARTH-LIKE PLANET - About Section
// ============================================
function EarthPlanet({
  scrollProgress,
  reducedMotion,
}: {
  scrollProgress: number;
  reducedMotion: boolean;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const cloudsRef = useRef<THREE.Mesh>(null);
  const { visible, opacity, xOffset } = useVisibility(
    scrollProgress,
    SPACE_OBJECTS_CONFIG.sections.about.start,
    SPACE_OBJECTS_CONFIG.sections.about.end,
    'left' // Comes from left
  );

  const texture = useMemo(() => {
    if (typeof document === 'undefined') return null;
    const canvas = document.createElement('canvas');
    const size = 512;
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d')!;

    // Ocean base
    ctx.fillStyle = '#1a4a7a';
    ctx.fillRect(0, 0, size, size);

    // Add land masses
    const imageData = ctx.getImageData(0, 0, size, size);
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
      const x = (i / 4) % size;
      const y = Math.floor(i / 4 / size);

      // Create continent-like shapes
      const n1 = Math.sin(x * 0.015) * Math.cos(y * 0.02) * Math.sin(x * 0.008 + y * 0.01);
      const n2 = Math.sin(x * 0.025 + 2) * Math.cos(y * 0.018 + 1);
      const land = n1 + n2 * 0.6;

      if (land > 0.3) {
        // Green land
        data[i] = 34 + Math.random() * 30;
        data[i + 1] = 85 + Math.random() * 40;
        data[i + 2] = 34 + Math.random() * 20;
      } else if (land > 0.2) {
        // Beach/desert
        data[i] = 180 + Math.random() * 30;
        data[i + 1] = 160 + Math.random() * 30;
        data[i + 2] = 100 + Math.random() * 30;
      } else {
        // Ocean with depth variation
        const depth = Math.random() * 20;
        data[i] = 26 - depth * 0.3;
        data[i + 1] = 74 + depth;
        data[i + 2] = 122 + depth;
      }
    }

    ctx.putImageData(imageData, 0, 0);
    return new THREE.CanvasTexture(canvas);
  }, []);

  // Cloud texture
  const cloudTexture = useMemo(() => {
    if (typeof document === 'undefined') return null;
    const canvas = document.createElement('canvas');
    const size = 512;
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d')!;

    ctx.fillStyle = 'rgba(0,0,0,0)';
    ctx.fillRect(0, 0, size, size);

    const imageData = ctx.getImageData(0, 0, size, size);
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
      const x = (i / 4) % size;
      const y = Math.floor(i / 4 / size);

      const n1 = Math.sin(x * 0.03) * Math.cos(y * 0.025);
      const n2 = Math.sin(x * 0.02 + 1) * Math.cos(y * 0.04 + 2);
      const cloud = (n1 + n2) * 0.5 + 0.5;

      if (cloud > 0.55) {
        const alpha = Math.min(255, (cloud - 0.55) * 400);
        data[i] = 255;
        data[i + 1] = 255;
        data[i + 2] = 255;
        data[i + 3] = alpha;
      }
    }

    ctx.putImageData(imageData, 0, 0);
    return new THREE.CanvasTexture(canvas);
  }, []);

  useFrame((state, delta) => {
    if (reducedMotion) return;
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.025;
    }
    if (cloudsRef.current) {
      cloudsRef.current.rotation.y += delta * 0.035;
    }
  });

  // Final position with animation offset
  const finalX = -20 + xOffset;

  return (
    <group position={[finalX, 3, -38]} visible={visible}>
      {/* Planet */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[11, 64, 64]} />
        <meshStandardMaterial
          map={texture}
          roughness={0.7}
          metalness={0.1}
          transparent
          opacity={opacity * 0.95}
        />
      </mesh>
      {/* Clouds */}
      <mesh ref={cloudsRef} scale={1.02}>
        <sphereGeometry args={[11, 64, 64]} />
        <meshStandardMaterial
          map={cloudTexture}
          transparent
          opacity={opacity * 0.6}
          depthWrite={false}
        />
      </mesh>
      {/* Atmosphere */}
      <mesh scale={1.1}>
        <sphereGeometry args={[11, 32, 32]} />
        <meshBasicMaterial
          color="#4488ff"
          transparent
          opacity={opacity * 0.2}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

// ============================================
// ICE GIANT / NEPTUNE - Contact Section
// ============================================
function IceGiant({
  scrollProgress,
  reducedMotion,
}: {
  scrollProgress: number;
  reducedMotion: boolean;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const { visible, opacity, xOffset } = useVisibility(
    scrollProgress,
    SPACE_OBJECTS_CONFIG.sections.contact.start,
    SPACE_OBJECTS_CONFIG.sections.contact.end,
    'right' // Comes from right
  );

  const texture = useMemo(() => {
    if (typeof document === 'undefined') return null;
    const canvas = document.createElement('canvas');
    const size = 512;
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d')!;

    // Create banded atmosphere
    for (let y = 0; y < size; y++) {
      const band = Math.sin(y * 0.05) * 0.15 + Math.sin(y * 0.02) * 0.1;
      const r = Math.floor(50 + band * 30);
      const g = Math.floor(100 + band * 50 + Math.random() * 10);
      const b = Math.floor(180 + band * 40 + Math.random() * 10);
      ctx.fillStyle = `rgb(${r},${g},${b})`;
      ctx.fillRect(0, y, size, 1);
    }

    // Add storm spots
    ctx.fillStyle = 'rgba(30, 80, 140, 0.6)';
    ctx.beginPath();
    ctx.ellipse(200, 200, 40, 20, 0, 0, Math.PI * 2);
    ctx.fill();

    return new THREE.CanvasTexture(canvas);
  }, []);

  useFrame((state, delta) => {
    if (!meshRef.current || reducedMotion) return;
    meshRef.current.rotation.y += delta * 0.04;
  });

  // Final position with animation offset
  const finalX = 18 + xOffset;

  return (
    <group position={[finalX, -2, -35]} visible={visible}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[13, 64, 64]} />
        <meshStandardMaterial
          map={texture}
          roughness={0.6}
          metalness={0.2}
          transparent
          opacity={opacity * 0.95}
        />
      </mesh>
      {/* Atmospheric glow */}
      <mesh scale={1.08}>
        <sphereGeometry args={[13, 32, 32]} />
        <meshBasicMaterial
          color="#4488cc"
          transparent
          opacity={opacity * 0.18}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

export function SpaceObjects({ scrollProgress, reducedMotion }: SpaceObjectsProps) {
  return (
    <group>
      {/* Services Section - Mars-like planet */}
      <MarsPlanet scrollProgress={scrollProgress} reducedMotion={reducedMotion} />

      {/* Work Section - Saturn-like ringed planet */}
      <SaturnPlanet scrollProgress={scrollProgress} reducedMotion={reducedMotion} />

      {/* About Section - Earth-like planet */}
      <EarthPlanet scrollProgress={scrollProgress} reducedMotion={reducedMotion} />

      {/* Contact Section - Ice giant */}
      <IceGiant scrollProgress={scrollProgress} reducedMotion={reducedMotion} />

      {/* Realistic lighting */}
      <ambientLight intensity={0.15} />
      <directionalLight
        position={[50, 30, 50]}
        intensity={1.5}
        color="#fff5e6"
      />
      <pointLight position={[-30, -20, 20]} intensity={0.3} color="#4488ff" />
    </group>
  );
}
