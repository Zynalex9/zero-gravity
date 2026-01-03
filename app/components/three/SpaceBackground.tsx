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
          background: `
            radial-gradient(ellipse at 50% 20%, rgba(30, 60, 120, 0.15) 0%, transparent 50%),
            radial-gradient(ellipse at 70% 60%, rgba(40, 80, 140, 0.12) 0%, transparent 45%),
            #0a0e1a
          `,
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
