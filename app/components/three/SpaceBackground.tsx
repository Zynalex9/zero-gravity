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
            radial-gradient(ellipse at 0% 0%, rgba(180, 80, 20, 0.25) 0%, transparent 50%),
            radial-gradient(ellipse at 100% 0%, rgba(160, 70, 15, 0.2) 0%, transparent 45%),
            #050608
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
