'use client';

import dynamic from 'next/dynamic';

// Dynamically import SpaceScene with SSR disabled to prevent WebGL issues
const SpaceScene = dynamic(
  () => import('./SpaceScene').then(mod => ({ default: mod.SpaceScene })),
  { 
    ssr: false,
    loading: () => (
      <div 
        className="fixed inset-0 w-full h-full"
        style={{ 
          background: 'radial-gradient(ellipse at center, #0d1b2a 0%, #0a0a0f 50%, #050508 100%)',
          zIndex: 0 
        }}
        aria-hidden="true"
      />
    )
  }
);

interface SpaceBackgroundProps {
  scrollProgress: number;
  mousePosition: { x: number; y: number };
  reducedMotion: boolean;
  isMobile: boolean;
}

export function SpaceBackground(props: SpaceBackgroundProps) {
  return <SpaceScene {...props} />;
}
