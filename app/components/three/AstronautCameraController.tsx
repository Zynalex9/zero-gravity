'use client';

import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

interface AstronautCameraControllerProps {
  scrollProgress: number;
  reducedMotion: boolean;
}

export function AstronautCameraController({ 
  scrollProgress, 
  reducedMotion 
}: AstronautCameraControllerProps) {
  const { camera } = useThree();
  const targetPosition = useRef(new THREE.Vector3());
  const targetFov = useRef(75);

  useFrame(() => {
    if (reducedMotion) return;

    // ============================================
    // ASTRONAUT GETS SMALLER AS YOU SCROLL
    // ============================================
    
    // Camera moves backwards - astronaut becomes smaller
    const zMove = scrollProgress * 65; // How far to move back (55 is good!)
    
    // Optional: Add slight side movement for interest
    const xMove = Math.sin(scrollProgress * Math.PI) * 4; // Left-right sway
    const yMove = scrollProgress * 1; // Slight upward drift
    
    targetPosition.current.set(
      xMove,          // X: subtle left-right movement
      yMove,          // Y: slight upward movement  
      20 + zMove      // Z: main effect - move away = smaller
    );

    // FOV change - makes astronaut even smaller
    const fovChange = scrollProgress * 10;
    targetFov.current = 75 + fovChange; // ⭐ Changed to PLUS for zoom out effect

    // Smooth interpolation (lerp)
    camera.position.lerp(targetPosition.current, 0.05);
    
    // Apply FOV change
    if (camera instanceof THREE.PerspectiveCamera) {
      camera.fov = THREE.MathUtils.lerp(camera.fov, targetFov.current, 0.05);
      camera.updateProjectionMatrix();
    }
  });

  return null;
}