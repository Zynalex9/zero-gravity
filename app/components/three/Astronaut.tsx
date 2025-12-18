'use client';

import { useRef, Suspense, useState, useEffect } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { useGLTF, Billboard, useTexture } from '@react-three/drei';
import * as THREE from 'three';

// ============================================
// ASTRONAUT CONFIGURATION - TWEAK HERE
// ============================================
export const ASTRONAUT_CONFIG = {
  // Position in 3D space (x, y, z) - right side of screen, slightly up
  position: [3, 0.5, -5] as [number, number, number],
  // Scale of the astronaut model/image
  scale: 1.5,
  // Floating animation amplitude (how much it moves up/down)
  floatAmplitude: 0.3,
  // Floating animation speed
  floatSpeed: 1.5,
  // Rotation animation speed
  rotationSpeed: 0.1,
  // Mouse parallax strength (0 = disabled, 1 = full movement)
  parallaxStrength: 0.3,
  // Fallback placeholder size (width, height)
  placeholderSize: [2, 2.5] as [number, number],
};

/**
 * ============================================
 * INSTRUCTIONS FOR REPLACING ASTRONAUT ASSET
 * ============================================
 * 
 * OPTION 1: GLB/GLTF 3D Model (Recommended)
 * -----------------------------------------
 * 1. Place your astronaut model at: /public/models/astronaut.glb
 * 2. Ensure the model is optimized (< 2MB recommended for web)
 * 3. The component will automatically load it
 * 4. Adjust ASTRONAUT_CONFIG.scale and position as needed
 * 
 * OPTION 2: Transparent PNG Image
 * --------------------------------
 * 1. Place your astronaut image at: /public/images/astronaut.png
 * 2. Use a transparent PNG for best results
 * 3. The image will be displayed as a billboard (always faces camera)
 * 4. Adjust ASTRONAUT_CONFIG.placeholderSize for proper aspect ratio
 * 
 * To switch between options:
 * - If astronaut.glb exists, it will be used
 * - Otherwise, astronaut.png is used as fallback
 * - If neither exists, a placeholder sphere is shown
 */

interface AstronautProps {
  mousePosition: { x: number; y: number };
  reducedMotion: boolean;
}

// GLB Model version of the astronaut
function AstronautModel({ mousePosition, reducedMotion }: AstronautProps) {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF('/models/astronaut.glb');
  
  useFrame((state) => {
    if (!groupRef.current || reducedMotion) return;
    
    const time = state.clock.elapsedTime;
    
    // Floating animation
    groupRef.current.position.y = 
      ASTRONAUT_CONFIG.position[1] + 
      Math.sin(time * ASTRONAUT_CONFIG.floatSpeed) * ASTRONAUT_CONFIG.floatAmplitude;
    
    // Subtle rotation
    groupRef.current.rotation.y = 
      Math.sin(time * ASTRONAUT_CONFIG.rotationSpeed) * 0.2;
    groupRef.current.rotation.z = 
      Math.sin(time * ASTRONAUT_CONFIG.rotationSpeed * 0.7) * 0.05;
    
    // Mouse parallax
    groupRef.current.position.x = 
      ASTRONAUT_CONFIG.position[0] + 
      mousePosition.x * ASTRONAUT_CONFIG.parallaxStrength;
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

// PNG Billboard fallback version
function AstronautBillboard({ mousePosition, reducedMotion }: AstronautProps) {
  const groupRef = useRef<THREE.Group>(null);
  const texture = useTexture('/images/astronaut.png');

  useFrame((state) => {
    if (!groupRef.current || reducedMotion) return;
    
    const time = state.clock.elapsedTime;
    
    // Floating animation
    groupRef.current.position.y = 
      ASTRONAUT_CONFIG.position[1] + 
      Math.sin(time * ASTRONAUT_CONFIG.floatSpeed) * ASTRONAUT_CONFIG.floatAmplitude;
    
    // Mouse parallax
    groupRef.current.position.x = 
      ASTRONAUT_CONFIG.position[0] + 
      mousePosition.x * ASTRONAUT_CONFIG.parallaxStrength;
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

// Placeholder sphere when no asset is available
function AstronautPlaceholder({ mousePosition, reducedMotion }: AstronautProps) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current || reducedMotion) return;
    
    const time = state.clock.elapsedTime;
    
    // Floating animation
    groupRef.current.position.y = 
      ASTRONAUT_CONFIG.position[1] + 
      Math.sin(time * ASTRONAUT_CONFIG.floatSpeed) * ASTRONAUT_CONFIG.floatAmplitude;
    
    // Rotation
    groupRef.current.rotation.y = time * ASTRONAUT_CONFIG.rotationSpeed;
    
    // Mouse parallax
    groupRef.current.position.x = 
      ASTRONAUT_CONFIG.position[0] + 
      mousePosition.x * ASTRONAUT_CONFIG.parallaxStrength;
  });

  return (
    <group ref={groupRef} position={ASTRONAUT_CONFIG.position}>
      {/* Astronaut body placeholder */}
      <mesh scale={ASTRONAUT_CONFIG.scale}>
        {/* Body */}
        <capsuleGeometry args={[0.4, 0.8, 16, 32]} />
        <meshStandardMaterial 
          color="#ffffff" 
          roughness={0.3}
          metalness={0.7}
        />
      </mesh>
      {/* Helmet */}
      <mesh 
        position={[0, 0.7 * ASTRONAUT_CONFIG.scale, 0]} 
        scale={ASTRONAUT_CONFIG.scale}
      >
        <sphereGeometry args={[0.35, 32, 32]} />
        <meshStandardMaterial 
          color="#333333"
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>
      {/* Visor */}
      <mesh 
        position={[0.1 * ASTRONAUT_CONFIG.scale, 0.7 * ASTRONAUT_CONFIG.scale, 0.2 * ASTRONAUT_CONFIG.scale]} 
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
        <meshStandardMaterial 
          color="#cccccc"
          roughness={0.5}
          metalness={0.5}
        />
      </mesh>
    </group>
  );
}

// Main Astronaut component with asset detection
export function Astronaut({ mousePosition, reducedMotion }: AstronautProps) {
  const [assetType, setAssetType] = useState<'glb' | 'png' | 'placeholder'>('placeholder');

  useEffect(() => {
    // Check which assets are available
    const checkAssets = async () => {
      try {
        // Try GLB first
        const glbResponse = await fetch('/models/astronaut.glb', { method: 'HEAD' });
        if (glbResponse.ok) {
          setAssetType('glb');
          return;
        }
      } catch {}

      try {
        // Try PNG fallback
        const pngResponse = await fetch('/images/astronaut.png', { method: 'HEAD' });
        if (pngResponse.ok) {
          setAssetType('png');
          return;
        }
      } catch {}

      // Default to placeholder
      setAssetType('placeholder');
    };

    checkAssets();
  }, []);

  return (
    <Suspense fallback={<AstronautPlaceholder mousePosition={mousePosition} reducedMotion={reducedMotion} />}>
      {assetType === 'glb' && (
        <AstronautModel mousePosition={mousePosition} reducedMotion={reducedMotion} />
      )}
      {assetType === 'png' && (
        <AstronautBillboard mousePosition={mousePosition} reducedMotion={reducedMotion} />
      )}
      {assetType === 'placeholder' && (
        <AstronautPlaceholder mousePosition={mousePosition} reducedMotion={reducedMotion} />
      )}
    </Suspense>
  );
}

// Preload GLB if it exists
useGLTF.preload('/models/astronaut.glb');
