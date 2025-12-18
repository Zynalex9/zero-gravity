'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// ============================================
// PERFORMANCE CONFIGURATION - TWEAK HERE
// ============================================
export const STARFIELD_CONFIG = {
  // Base star count (desktop) - increased for rich field
  baseStarCount: 5000,
  // Mobile star count (reduced for performance)
  mobileStarCount: 2500,
  // Minimum visible stars (at scroll = 0)
  minVisibleRatio: 0.3,
  // Maximum visible stars (at scroll = 1)
  maxVisibleRatio: 1.0,
  // Star field radius - keep distant
  fieldRadius: 150,
  // Star size range - small and distant
  minStarSize: 0.3,
  maxStarSize: 1.8,
  // Rotation speed multiplier
  rotationSpeed: 0.02,
  // Rich NASA-style color palette
  colors: {
    // Cool blues (distant, cold stars)
    blues: ['#a8d4ff', '#7ec8ff', '#5bb5ff', '#3da2ff', '#c4e3ff'],
    // Warm oranges/yellows (closer, warmer stars)  
    warm: ['#ffd699', '#ffcc80', '#ffb347', '#ffa500', '#ffe4b5'],
    // Pure whites (bright main sequence)
    whites: ['#ffffff', '#f8f8ff', '#fefefe', '#f5f5f5'],
    // Subtle purples/magentas (nebula-touched)
    purples: ['#e6b3ff', '#d9a3ff', '#cc99ff', '#bf8fff'],
    // Deep reds (cooler red giants in distance)
    reds: ['#ffb3b3', '#ff9999', '#ff8080'],
  },
};

// Create a soft circular star texture with gentle glow
function createStarTexture(): THREE.Texture {
  const canvas = document.createElement('canvas');
  const size = 64;
  canvas.width = size;
  canvas.height = size;
  
  const ctx = canvas.getContext('2d')!;
  const center = size / 2;
  
  // Create radial gradient for soft circular star with gentle bloom
  const gradient = ctx.createRadialGradient(center, center, 0, center, center, center);
  gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
  gradient.addColorStop(0.05, 'rgba(255, 255, 255, 0.95)');
  gradient.addColorStop(0.15, 'rgba(255, 255, 255, 0.6)');
  gradient.addColorStop(0.3, 'rgba(255, 255, 255, 0.25)');
  gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.08)');
  gradient.addColorStop(0.7, 'rgba(255, 255, 255, 0.02)');
  gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
  
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);
  
  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

// Create a brighter star texture for the "bright star" layer
function createBrightStarTexture(): THREE.Texture {
  const canvas = document.createElement('canvas');
  const size = 128;
  canvas.width = size;
  canvas.height = size;
  
  const ctx = canvas.getContext('2d')!;
  const center = size / 2;
  
  // Brighter core with more pronounced glow
  const gradient = ctx.createRadialGradient(center, center, 0, center, center, center);
  gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
  gradient.addColorStop(0.03, 'rgba(255, 255, 255, 1)');
  gradient.addColorStop(0.08, 'rgba(255, 255, 255, 0.85)');
  gradient.addColorStop(0.15, 'rgba(255, 255, 255, 0.5)');
  gradient.addColorStop(0.25, 'rgba(255, 255, 255, 0.25)');
  gradient.addColorStop(0.4, 'rgba(255, 255, 255, 0.1)');
  gradient.addColorStop(0.6, 'rgba(255, 255, 255, 0.03)');
  gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
  
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);
  
  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

// Create tiny dim star texture for distant background
function createDimStarTexture(): THREE.Texture {
  const canvas = document.createElement('canvas');
  const size = 32;
  canvas.width = size;
  canvas.height = size;
  
  const ctx = canvas.getContext('2d')!;
  const center = size / 2;
  
  // Very soft, tiny stars
  const gradient = ctx.createRadialGradient(center, center, 0, center, center, center);
  gradient.addColorStop(0, 'rgba(255, 255, 255, 0.9)');
  gradient.addColorStop(0.2, 'rgba(255, 255, 255, 0.4)');
  gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.1)');
  gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
  
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);
  
  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

interface StarfieldProps {
  scrollProgress: number;
  reducedMotion: boolean;
  isMobile: boolean;
}

// Helper to get all colors as flat array with weights
function getWeightedColors() {
  const colors = STARFIELD_CONFIG.colors;
  // More whites and blues, fewer warm and purples for realistic distribution
  return [
    ...colors.whites, ...colors.whites, ...colors.whites, // 12 whites (most common)
    ...colors.blues, ...colors.blues, // 10 blues (common)
    ...colors.warm, // 5 warm (less common)
    ...colors.purples, // 4 purples (rare)
    ...colors.reds, // 3 reds (rare)
  ];
}

// Far distant background stars - tiny, numerous, creates depth
function DistantStars({ starCount, reducedMotion }: { starCount: number; reducedMotion: boolean }) {
  const pointsRef = useRef<THREE.Points>(null);
  
  const starTexture = useMemo(() => {
    if (typeof document === 'undefined') return null;
    return createDimStarTexture();
  }, []);

  const { positions, colors } = useMemo(() => {
    const count = Math.floor(starCount * 1.5); // More distant stars
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const colorOptions = getWeightedColors().map(c => new THREE.Color(c));

    for (let i = 0; i < count; i++) {
      // Very far distribution - 120 to 200 units away
      const radius = 120 + Math.random() * 80;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);

      // Slightly desaturated colors for distance
      const color = colorOptions[Math.floor(Math.random() * colorOptions.length)].clone();
      color.multiplyScalar(0.7 + Math.random() * 0.3); // Dim them slightly
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    return { positions, colors };
  }, [starCount]);

  useFrame((state, delta) => {
    if (!pointsRef.current || reducedMotion) return;
    // Very slow rotation for parallax depth
    pointsRef.current.rotation.y += delta * 0.003;
    pointsRef.current.rotation.x += delta * 0.001;
  });

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    return geo;
  }, [positions, colors]);

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial
        size={0.4}
        sizeAttenuation={true}
        vertexColors={true}
        transparent={true}
        opacity={0.6}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        map={starTexture}
      />
    </points>
  );
}

// Mid-distance stars - the main layer
function MidStars({ scrollProgress, starCount, reducedMotion }: { 
  scrollProgress: number; 
  starCount: number; 
  reducedMotion: boolean;
}) {
  const pointsRef = useRef<THREE.Points>(null);

  const starTexture = useMemo(() => {
    if (typeof document === 'undefined') return null;
    return createStarTexture();
  }, []);

  const { positions, colors, sizes } = useMemo(() => {
    const positions = new Float32Array(starCount * 3);
    const colors = new Float32Array(starCount * 3);
    const sizes = new Float32Array(starCount);
    const colorOptions = getWeightedColors().map(c => new THREE.Color(c));

    for (let i = 0; i < starCount; i++) {
      // Mid-range distribution - 50 to 120 units
      const radius = 50 + Math.cbrt(Math.random()) * 70;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);

      const color = colorOptions[Math.floor(Math.random() * colorOptions.length)];
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;

      // Varied sizes - mostly small, few medium
      const sizeRand = Math.random();
      if (sizeRand > 0.95) {
        sizes[i] = 1.2 + Math.random() * 0.6; // 5% medium-bright
      } else if (sizeRand > 0.7) {
        sizes[i] = 0.6 + Math.random() * 0.5; // 25% small-medium
      } else {
        sizes[i] = 0.3 + Math.random() * 0.3; // 70% tiny
      }
    }

    return { positions, colors, sizes };
  }, [starCount]);

  const visibleCount = useMemo(() => {
    const ratio = STARFIELD_CONFIG.minVisibleRatio + 
      scrollProgress * (STARFIELD_CONFIG.maxVisibleRatio - STARFIELD_CONFIG.minVisibleRatio);
    return Math.floor(starCount * ratio);
  }, [scrollProgress, starCount]);

  useFrame((state, delta) => {
    if (!pointsRef.current || reducedMotion) return;
    pointsRef.current.rotation.y += delta * STARFIELD_CONFIG.rotationSpeed * (1 + scrollProgress * 0.5);
    pointsRef.current.rotation.x += delta * STARFIELD_CONFIG.rotationSpeed * 0.3;
  });

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geo.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    return geo;
  }, [positions, colors, sizes]);

  useMemo(() => {
    geometry.setDrawRange(0, visibleCount);
  }, [geometry, visibleCount]);

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial
        size={1.5}
        sizeAttenuation={true}
        vertexColors={true}
        transparent={true}
        opacity={0.85}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        map={starTexture}
      />
    </points>
  );
}

// Bright accent stars - fewer, more colorful, subtle glow
function BrightStars({ starCount, reducedMotion }: { starCount: number; reducedMotion: boolean }) {
  const pointsRef = useRef<THREE.Points>(null);

  const starTexture = useMemo(() => {
    if (typeof document === 'undefined') return null;
    return createBrightStarTexture();
  }, []);

  const { positions, colors } = useMemo(() => {
    const count = Math.floor(starCount * 0.08); // 8% bright stars
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    
    // Bright stars have more vivid colors
    const brightColors = [
      ...STARFIELD_CONFIG.colors.blues.map(c => new THREE.Color(c)),
      ...STARFIELD_CONFIG.colors.warm.map(c => new THREE.Color(c)),
      ...STARFIELD_CONFIG.colors.whites.map(c => new THREE.Color(c)),
      ...STARFIELD_CONFIG.colors.purples.map(c => new THREE.Color(c)),
    ];

    for (let i = 0; i < count; i++) {
      // Spread throughout mid to far range
      const radius = 60 + Math.random() * 90;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);

      const color = brightColors[Math.floor(Math.random() * brightColors.length)];
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    return { positions, colors };
  }, [starCount]);

  useFrame((state, delta) => {
    if (!pointsRef.current || reducedMotion) return;
    // Slightly different rotation for depth parallax
    pointsRef.current.rotation.y += delta * 0.012;
    pointsRef.current.rotation.x += delta * 0.004;
  });

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    return geo;
  }, [positions, colors]);

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial
        size={2.5}
        sizeAttenuation={true}
        vertexColors={true}
        transparent={true}
        opacity={0.95}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        map={starTexture}
      />
    </points>
  );
}

export function Starfield({ scrollProgress, reducedMotion, isMobile }: StarfieldProps) {
  const starCount = isMobile ? STARFIELD_CONFIG.mobileStarCount : STARFIELD_CONFIG.baseStarCount;

  return (
    <group>
      {/* Layer 1: Far distant tiny stars - creates depth */}
      <DistantStars starCount={starCount} reducedMotion={reducedMotion} />
      
      {/* Layer 2: Main mid-distance star field */}
      <MidStars 
        scrollProgress={scrollProgress} 
        starCount={starCount} 
        reducedMotion={reducedMotion} 
      />
      
      {/* Layer 3: Bright accent stars with glow */}
      <BrightStars starCount={starCount} reducedMotion={reducedMotion} />
    </group>
  );
}
