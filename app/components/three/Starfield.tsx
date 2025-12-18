'use client';

import { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// ============================================
// PERFORMANCE CONFIGURATION - TWEAK HERE
// ============================================
export const STARFIELD_CONFIG = {
  // Base star count (desktop)
  baseStarCount: 3000,
  // Mobile star count (reduced for performance)
  mobileStarCount: 1500,
  // Minimum visible stars (at scroll = 0)
  minVisibleRatio: 0.3,
  // Maximum visible stars (at scroll = 1)
  maxVisibleRatio: 1.0,
  // Star field radius
  fieldRadius: 100,
  // Star size range
  minStarSize: 0.5,
  maxStarSize: 2.5,
  // Rotation speed multiplier
  rotationSpeed: 0.02,
  // Color variation
  colors: ['#ffffff', '#ffeedd', '#aaccff', '#ffccaa'],
};

// Create a circular star texture with soft glow
function createStarTexture(): THREE.Texture {
  const canvas = document.createElement('canvas');
  const size = 64;
  canvas.width = size;
  canvas.height = size;
  
  const ctx = canvas.getContext('2d')!;
  const center = size / 2;
  
  // Create radial gradient for soft circular star
  const gradient = ctx.createRadialGradient(center, center, 0, center, center, center);
  gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
  gradient.addColorStop(0.1, 'rgba(255, 255, 255, 0.9)');
  gradient.addColorStop(0.25, 'rgba(255, 255, 255, 0.5)');
  gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.15)');
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

export function Starfield({ scrollProgress, reducedMotion, isMobile }: StarfieldProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.PointsMaterial>(null);

  // Determine star count based on device
  const starCount = isMobile ? STARFIELD_CONFIG.mobileStarCount : STARFIELD_CONFIG.baseStarCount;

  // Create star texture
  const starTexture = useMemo(() => {
    if (typeof document === 'undefined') return null;
    return createStarTexture();
  }, []);

  // Generate star positions and colors
  const { positions, colors, sizes } = useMemo(() => {
    const positions = new Float32Array(starCount * 3);
    const colors = new Float32Array(starCount * 3);
    const sizes = new Float32Array(starCount);
    
    const colorOptions = STARFIELD_CONFIG.colors.map(c => new THREE.Color(c));

    for (let i = 0; i < starCount; i++) {
      // Spherical distribution for more natural look
      const radius = STARFIELD_CONFIG.fieldRadius * Math.cbrt(Math.random());
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);

      // Random color from palette
      const color = colorOptions[Math.floor(Math.random() * colorOptions.length)];
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;

      // Random size
      sizes[i] = STARFIELD_CONFIG.minStarSize + 
        Math.random() * (STARFIELD_CONFIG.maxStarSize - STARFIELD_CONFIG.minStarSize);
    }

    return { positions, colors, sizes };
  }, [starCount]);

  // Calculate visible star count based on scroll
  const visibleCount = useMemo(() => {
    const ratio = STARFIELD_CONFIG.minVisibleRatio + 
      scrollProgress * (STARFIELD_CONFIG.maxVisibleRatio - STARFIELD_CONFIG.minVisibleRatio);
    return Math.floor(starCount * ratio);
  }, [scrollProgress, starCount]);

  // Animation frame - rotation and twinkle effect
  useFrame((state, delta) => {
    if (!pointsRef.current || reducedMotion) return;

    // Subtle rotation
    pointsRef.current.rotation.y += delta * STARFIELD_CONFIG.rotationSpeed * (1 + scrollProgress * 0.5);
    pointsRef.current.rotation.x += delta * STARFIELD_CONFIG.rotationSpeed * 0.3;
  });

  // Create geometry with draw range for density control
  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geo.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    return geo;
  }, [positions, colors, sizes]);

  // Update draw range based on visible count
  useMemo(() => {
    geometry.setDrawRange(0, visibleCount);
  }, [geometry, visibleCount]);

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial
        ref={materialRef}
        size={2}
        sizeAttenuation={true}
        vertexColors={true}
        transparent={true}
        opacity={0.9}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        map={starTexture}
        alphaMap={starTexture}
      />
    </points>
  );
}
