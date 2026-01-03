'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// ============================================
// PERFORMANCE CONFIGURATION - TWEAK HERE
// ============================================
export const STARFIELD_CONFIG = {
  // Base star count (desktop) - high density for rich field
  baseStarCount: 12000,
  // Mobile star count (reduced for performance)
  mobileStarCount: 6000,
  // Minimum visible stars (at scroll = 0)
  minVisibleRatio: 0.5,
  // Maximum visible stars (at scroll = 1)
  maxVisibleRatio: 1.0,
  // Star field radius - keep distant
  fieldRadius: 150,
  // Star size range - small and distant
  minStarSize: 0.3,
  maxStarSize: 1.8,
  // Rotation speed multiplier
  rotationSpeed: 0.02,
  // Glowy dark blue star palette inspired by deep space
  colors: {
    // Dominant dark blues (glowy, like in the image)
    blues: ['#5a8fc4', '#4d7fb8', '#6a9dd6', '#4a7cb5', '#5985c7', '#3d6fa3'],
    // Lighter blue accents (fewer, brighter stars)
    lightBlues: ['#7db3e8', '#8fc5ff', '#a1d2ff'],
    // Deep blues (distant, atmospheric)
    deepBlues: ['#2d4a70', '#345580', '#3b5f8f', '#294060'],
    // Subtle whites (very few, brightest stars)
    whites: ['#d4e4f7', '#e0ebf8', '#c5d9f2'],
    // Muted purples (nebula-touched, rare)
    purples: ['#7a8fc9', '#8a9dd9', '#6a7db8'],
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
  // Dominated by various blue tones for glowy dark blue aesthetic
  return [
    ...colors.blues, ...colors.blues, ...colors.blues, // Dark blues dominant
    ...colors.deepBlues, ...colors.deepBlues, // Deep blues common
    ...colors.lightBlues, // Lighter blues for accent
    ...colors.whites, // Few bright whites
    ...colors.purples, // Rare purple tints
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

// Dense star band - subtle Milky Way hint in the center
function DenseStarBand({ starCount, reducedMotion }: { starCount: number; reducedMotion: boolean }) {
  const pointsRef = useRef<THREE.Points>(null);

  const starTexture = useMemo(() => {
    if (typeof document === 'undefined') return null;
    return createDimStarTexture();
  }, []);

  const { positions, colors } = useMemo(() => {
    const count = Math.floor(starCount * 0.6); // Dense cluster
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    
    // Mostly cool blues and whites for galaxy band
    const bandColors = [
      ...STARFIELD_CONFIG.colors.blues.map(c => new THREE.Color(c)),
      ...STARFIELD_CONFIG.colors.whites.map(c => new THREE.Color(c)),
      ...STARFIELD_CONFIG.colors.whites.map(c => new THREE.Color(c)),
    ];

    for (let i = 0; i < count; i++) {
      // Create a horizontal band concentrated around y=0
      const radius = 80 + Math.random() * 100;
      const theta = Math.random() * Math.PI * 2;
      
      // Concentrate stars near the horizontal plane (y close to 0)
      const verticalSpread = (Math.random() + Math.random() + Math.random()) / 3 - 0.5;
      const y = verticalSpread * 40;
      
      const horizontalRadius = Math.sqrt(radius * radius - y * y * 0.3);
      
      positions[i * 3] = horizontalRadius * Math.cos(theta);
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = horizontalRadius * Math.sin(theta);

      const color = bandColors[Math.floor(Math.random() * bandColors.length)].clone();
      color.multiplyScalar(0.5 + Math.random() * 0.3);
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    return { positions, colors };
  }, [starCount]);

  useFrame((state, delta) => {
    if (!pointsRef.current || reducedMotion) return;
    pointsRef.current.rotation.y += delta * 0.005;
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
        size={0.35}
        sizeAttenuation={true}
        vertexColors={true}
        transparent={true}
        opacity={0.4}
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
      ...STARFIELD_CONFIG.colors.blues.map((c: string) => new THREE.Color(c)),
      ...STARFIELD_CONFIG.colors.lightBlues.map((c: string) => new THREE.Color(c)),
      ...STARFIELD_CONFIG.colors.whites.map((c: string) => new THREE.Color(c)),
      ...STARFIELD_CONFIG.colors.purples.map((c: string) => new THREE.Color(c)),
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

// Create nebula texture for cosmic dust clouds
function createNebulaTexture(
  color1: string,
  color2: string,
  color3: string
): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  const size = 1024;
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;

  // Create soft cloudy nebula effect
  ctx.fillStyle = 'rgba(0,0,0,0)';
  ctx.fillRect(0, 0, size, size);

  // Layer multiple gradients for organic cloud look
  const centerX = size / 2;
  const centerY = size / 2;

  // Create multiple overlapping gradient clouds for organic shape
  const cloudPositions = [
    { x: centerX * 0.4, y: centerY * 0.5, radius: size * 0.9 },
    { x: centerX * 1.3, y: centerY * 0.7, radius: size * 0.7 },
    { x: centerX * 0.8, y: centerY * 1.2, radius: size * 0.6 },
    { x: centerX * 1.5, y: centerY * 0.3, radius: size * 0.5 },
    { x: centerX * 0.3, y: centerY * 1.1, radius: size * 0.55 },
  ];

  cloudPositions.forEach((cloud, index) => {
    const gradient = ctx.createRadialGradient(
      cloud.x, cloud.y, 0,
      cloud.x, cloud.y, cloud.radius
    );
    
    const opacity = ['50', '35', '25', '30', '28'][index];
    const colors = [color1, color2, color3];
    const mainColor = colors[index % 3];
    const secondColor = colors[(index + 1) % 3];
    
    gradient.addColorStop(0, mainColor + opacity);
    gradient.addColorStop(0.3, mainColor + '20');
    gradient.addColorStop(0.6, secondColor + '10');
    gradient.addColorStop(1, 'rgba(0,0,0,0)');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);
  });

  // Add subtle noise for texture
  const imageData = ctx.getImageData(0, 0, size, size);
  const data = imageData.data;
  for (let i = 0; i < data.length; i += 4) {
    const noise = (Math.random() - 0.5) * 12;
    data[i] = Math.max(0, Math.min(255, data[i] + noise));
    data[i + 1] = Math.max(0, Math.min(255, data[i + 1] + noise));
    data[i + 2] = Math.max(0, Math.min(255, data[i + 2] + noise));
  }
  ctx.putImageData(imageData, 0, 0);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

// Nebula clouds - blue cosmic dust and gas effect
function NebulaClouds({ reducedMotion }: { reducedMotion: boolean }) {
  const groupRef = useRef<THREE.Group>(null);

  // Create nebula textures with blue gas colors
  const deepBlueNebula = useMemo(() => {
    if (typeof document === 'undefined') return null;
    return createNebulaTexture('#1e3a5f', '#2a4d7c', '#3d5f8f');
  }, []);

  const lightBlueNebula = useMemo(() => {
    if (typeof document === 'undefined') return null;
    return createNebulaTexture('#4a7cb5', '#5a8fc4', '#6a9dd6');
  }, []);

  const cyanNebula = useMemo(() => {
    if (typeof document === 'undefined') return null;
    return createNebulaTexture('#2d5a7b', '#3d6a8b', '#4d7a9b');
  }, []);

  useFrame((state, delta) => {
    if (!groupRef.current || reducedMotion) return;
    groupRef.current.rotation.z += delta * 0.002;
  });

  return (
    <group ref={groupRef}>
      {/* Large background nebula - very far */}
      <mesh position={[0, 0, -150]} rotation={[0.1, 0, 0.15]}>
        <planeGeometry args={[280, 220]} />
        <meshBasicMaterial
          map={deepBlueNebula}
          transparent
          opacity={0.28}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Left side deep blue nebula */}
      <mesh position={[-70, 10, -110]} rotation={[0.05, 0, 0.4]}>
        <planeGeometry args={[160, 140]} />
        <meshBasicMaterial
          map={deepBlueNebula}
          transparent
          opacity={0.32}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Right side light blue nebula */}
      <mesh position={[80, -15, -120]} rotation={[-0.03, 0, -0.25]}>
        <planeGeometry args={[150, 130]} />
        <meshBasicMaterial
          map={lightBlueNebula}
          transparent
          opacity={0.3}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Top right cyan nebula */}
      <mesh position={[50, 50, -125]} rotation={[0.08, 0, 0.6]}>
        <planeGeometry args={[120, 110]} />
        <meshBasicMaterial
          map={cyanNebula}
          transparent
          opacity={0.28}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Bottom cyan-blue glow */}
      <mesh position={[-25, -55, -100]} rotation={[-0.05, 0, 0.2]}>
        <planeGeometry args={[180, 90]} />
        <meshBasicMaterial
          map={cyanNebula}
          transparent
          opacity={0.35}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Upper left blue gas cloud */}
      <mesh position={[-90, 60, -135]} rotation={[0.06, 0, -0.5]}>
        <planeGeometry args={[140, 120]} />
        <meshBasicMaterial
          map={deepBlueNebula}
          transparent
          opacity={0.26}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Lower right gas cloud */}
      <mesh position={[95, -65, -130]} rotation={[-0.04, 0, 0.7]}>
        <planeGeometry args={[130, 115]} />
        <meshBasicMaterial
          map={lightBlueNebula}
          transparent
          opacity={0.29}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Top center nebula cloud */}
      <mesh position={[-30, 75, -118]} rotation={[0.07, 0, 0.3]}>
        <planeGeometry args={[145, 125]} />
        <meshBasicMaterial
          map={cyanNebula}
          transparent
          opacity={0.27}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Mid-left nebula wisp */}
      <mesh position={[-105, -30, -112]} rotation={[-0.02, 0, -0.4]}>
        <planeGeometry args={[125, 140]} />
        <meshBasicMaterial
          map={lightBlueNebula}
          transparent
          opacity={0.25}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Mid-right cyan wisp */}
      <mesh position={[110, 20, -108]} rotation={[0.04, 0, -0.6]}>
        <planeGeometry args={[135, 110]} />
        <meshBasicMaterial
          map={cyanNebula}
          transparent
          opacity={0.24}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Bottom left nebula */}
      <mesh position={[-80, -70, -115]} rotation={[-0.06, 0, 0.35]}>
        <planeGeometry args={[120, 100]} />
        <meshBasicMaterial
          map={deepBlueNebula}
          transparent
          opacity={0.26}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

export function Starfield({ scrollProgress, reducedMotion, isMobile }: StarfieldProps) {
  const starCount = isMobile ? STARFIELD_CONFIG.mobileStarCount : STARFIELD_CONFIG.baseStarCount;

  return (
    <group>
      {/* Layer 0: Nebula clouds - cosmic dust background */}
      <NebulaClouds reducedMotion={reducedMotion} />
      
      {/* Layer 1: Far distant tiny stars - creates depth */}
      <DistantStars starCount={starCount} reducedMotion={reducedMotion} />
      
      {/* Layer 2: Dense star band - Milky Way hint */}
      <DenseStarBand starCount={starCount} reducedMotion={reducedMotion} />
      
      {/* Layer 3: Main mid-distance star field */}
      <MidStars 
        scrollProgress={scrollProgress} 
        starCount={starCount} 
        reducedMotion={reducedMotion} 
      />
      
      {/* Layer 4: Bright accent stars with glow */}
      <BrightStars starCount={starCount} reducedMotion={reducedMotion} />
    </group>
  );
}
