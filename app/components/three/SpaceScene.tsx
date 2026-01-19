'use client';

import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { Starfield } from './Starfield';
import { SpaceObjects } from './SpaceObjects';
import { Astronaut } from './Astronaut';
import { CameraController } from './CameraController';
import { AstronautCameraController } from './AstronautCameraController'; // ⭐ New import

interface SpaceSceneProps {
  scrollProgress: number;
  mousePosition: { x: number; y: number };
  reducedMotion: boolean;
  isMobile: boolean;
}

export function SpaceScene({ 
  scrollProgress, 
  mousePosition, 
  reducedMotion, 
  isMobile 
}: SpaceSceneProps) {
  return (
    <div 
      className="fixed inset-0 w-full h-full"
      style={{ 
        background: `
          radial-gradient(ellipse at 50% 20%, rgba(30, 60, 120, 0.15) 0%, transparent 50%),
          radial-gradient(ellipse at 70% 60%, rgba(40, 80, 140, 0.12) 0%, transparent 45%),
          radial-gradient(ellipse at 30% 80%, rgba(35, 70, 130, 0.1) 0%, transparent 40%),
          radial-gradient(ellipse at 10% 40%, rgba(25, 55, 110, 0.08) 0%, transparent 35%),
          #0a0e1a
        `,
        zIndex: 0 
      }}
      aria-hidden="true"
    >
      {/* ============================================ */}
      {/* FIRST CANVAS - Planets with Strong Zoom Effect */}
      {/* ============================================ */}
      <Canvas
        camera={{ position: [0, 0, 20], fov: 75 }}
        dpr={isMobile ? [1, 1.5] : [1, 2]}
        performance={{ min: 0.5 }}
        gl={{ 
          antialias: !isMobile,
          powerPreference: 'high-performance',
          alpha: false,
        }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}
      >
        <fog attach="fog" args={['#0a0e1a', 50, 180]} />
        
        <Suspense fallback={null}>
          {/* Planet camera controller - strong zoom effect */}
          <CameraController 
            scrollProgress={scrollProgress} 
            reducedMotion={reducedMotion} 
          />
          
          <Starfield 
            scrollProgress={scrollProgress} 
            reducedMotion={reducedMotion}
            isMobile={isMobile}
          />
          
          <SpaceObjects 
            scrollProgress={scrollProgress} 
            reducedMotion={reducedMotion} 
          />
        </Suspense>
      </Canvas>

      {/* ============================================ */}
      {/* SECOND CANVAS - Astronaut with Custom Camera */}
      {/* Subtle/different camera movement than planets */}
      {/* ============================================ */}
      <Canvas
        camera={{ position: [0, 0, 20], fov: 75 }}
        dpr={isMobile ? [1, 1.5] : [1, 2]}
        performance={{ min: 0.5 }}
        gl={{ 
          antialias: !isMobile,
          powerPreference: 'high-performance',
          alpha: true, // Transparent background
        }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
        }}
      >
        <Suspense fallback={null}>
          {/* ⭐ ASTRONAUT CAMERA CONTROLLER - Different settings! */}
          <AstronautCameraController 
            scrollProgress={scrollProgress} 
            reducedMotion={reducedMotion} 
          />
          
          <Astronaut 
            mousePosition={mousePosition} 
            reducedMotion={reducedMotion} 
          /> 
        </Suspense>
      </Canvas>

    </div>
  );
}