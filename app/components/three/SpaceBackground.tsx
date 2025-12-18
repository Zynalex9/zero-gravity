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
            radial-gradient(ellipse at 0% 0%, rgba(180, 100, 50, 0.15) 0%, transparent 50%),
            radial-gradient(ellipse at 100% 20%, rgba(160, 80, 40, 0.12) 0%, transparent 45%),
            radial-gradient(ellipse at 50% 50%, #0a1220 0%, #060a12 40%, #030508 70%, #020304 100%)
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
