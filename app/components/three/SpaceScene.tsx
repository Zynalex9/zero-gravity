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
        {/* Fog for depth effect - adjusted for richer color */}
        <fog attach="fog" args={['#0a0e1a', 50, 180]} />
        
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
