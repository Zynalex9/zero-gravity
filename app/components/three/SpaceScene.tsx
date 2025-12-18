'use client';

import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { Starfield } from './Starfield';
import { SpaceObjects } from './SpaceObjects';
import { Astronaut } from './Astronaut';
import { CameraController } from './CameraController';

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
        background: 'radial-gradient(ellipse at center, #0d1b2a 0%, #0a0a0f 50%, #050508 100%)',
        zIndex: 0 
      }}
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 20], fov: 75 }}
        dpr={isMobile ? [1, 1.5] : [1, 2]} // Lower resolution on mobile
        performance={{ min: 0.5 }} // Allow frame rate drops
        gl={{ 
          antialias: !isMobile, // Disable antialiasing on mobile
          powerPreference: 'high-performance',
          alpha: false,
        }}
      >
        {/* Fog for depth effect */}
        <fog attach="fog" args={['#0a0a0f', 30, 100]} />
        
        <Suspense fallback={null}>
          {/* Camera controller for scroll-driven zoom */}
          <CameraController 
            scrollProgress={scrollProgress} 
            reducedMotion={reducedMotion} 
          />
          
          {/* Starfield with scroll-driven density */}
          <Starfield 
            scrollProgress={scrollProgress} 
            reducedMotion={reducedMotion}
            isMobile={isMobile}
          />
          
          {/* Space objects that appear at scroll thresholds */}
          <SpaceObjects 
            scrollProgress={scrollProgress} 
            reducedMotion={reducedMotion} 
          />
          
          {/* Floating astronaut */}
          <Astronaut 
            mousePosition={mousePosition} 
            reducedMotion={reducedMotion} 
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
