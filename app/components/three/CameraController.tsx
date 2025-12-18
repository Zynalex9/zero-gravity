'use client';

import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// ============================================
// CAMERA CONFIGURATION - TWEAK HERE
// ============================================
export const CAMERA_CONFIG = {
  // Initial camera Z position
  initialZ: 20,
  // Final camera Z position (at scroll = 1)
  finalZ: 10,
  // FOV range for zoom effect
  initialFov: 75,
  finalFov: 60,
  // Camera drift/sway speed
  driftSpeed: 0.1,
  // Camera drift amplitude
  driftAmplitude: 0.5,
};

interface CameraControllerProps {
  scrollProgress: number;
  reducedMotion: boolean;
}

export function CameraController({ scrollProgress, reducedMotion }: CameraControllerProps) {
  const { camera } = useThree();
  const initializedRef = useRef(false);

  useFrame((state) => {
    const cam = camera as THREE.PerspectiveCamera;
    
    // Initialize camera position
    if (!initializedRef.current) {
      cam.position.z = CAMERA_CONFIG.initialZ;
      cam.fov = CAMERA_CONFIG.initialFov;
      cam.updateProjectionMatrix();
      initializedRef.current = true;
    }

    // Scroll-driven zoom (camera Z position)
    const targetZ = THREE.MathUtils.lerp(
      CAMERA_CONFIG.initialZ,
      CAMERA_CONFIG.finalZ,
      scrollProgress
    );

    // Scroll-driven FOV change
    const targetFov = THREE.MathUtils.lerp(
      CAMERA_CONFIG.initialFov,
      CAMERA_CONFIG.finalFov,
      scrollProgress
    );

    // Smooth interpolation
    cam.position.z = THREE.MathUtils.lerp(cam.position.z, targetZ, 0.1);
    
    if (Math.abs(cam.fov - targetFov) > 0.1) {
      cam.fov = THREE.MathUtils.lerp(cam.fov, targetFov, 0.1);
      cam.updateProjectionMatrix();
    }

    // Subtle camera drift (cinematic feel) - skip if reduced motion
    if (!reducedMotion) {
      const time = state.clock.elapsedTime;
      cam.position.x = Math.sin(time * CAMERA_CONFIG.driftSpeed) * CAMERA_CONFIG.driftAmplitude;
      cam.position.y = Math.cos(time * CAMERA_CONFIG.driftSpeed * 0.7) * CAMERA_CONFIG.driftAmplitude * 0.5;
    }
  });

  return null;
}
