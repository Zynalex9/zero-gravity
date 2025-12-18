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
          radial-gradient(ellipse at 0% 0%, rgba(180, 80, 20, 0.25) 0%, transparent 50%),
          radial-gradient(ellipse at 100% 0%, rgba(160, 70, 15, 0.2) 0%, transparent 45%),
          radial-gradient(ellipse at 100% 100%, rgba(140, 60, 10, 0.15) 0%, transparent 40%),
          radial-gradient(ellipse at 0% 100%, rgba(120, 50, 10, 0.12) 0%, transparent 35%),
          #050608
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
        <fog attach="fog" args={['#050810', 50, 180]} />
        
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
