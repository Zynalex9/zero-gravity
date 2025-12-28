'use client';

import { SpaceBackground } from './components/three';
import { Navigation, Preloader } from './components/ui';
import {
  HeroSection,
  AboutSection,
  WorkSection,
  ContactSection,
  Footer,
} from './components/sections';
import {
  useScrollProgress,
  useReducedMotion,
  useMousePosition,
  useIsMobile,
} from './hooks/useScrollProgress';

export default function HomePage() {
  const scrollProgress = useScrollProgress();
  const reducedMotion = useReducedMotion();
  const mousePosition = useMousePosition();
  const isMobile = useIsMobile();

  return (
    <>
      {/* Preloader */}
      <Preloader />

      {/* Fixed 3D Space Background */}
      <SpaceBackground
        scrollProgress={scrollProgress}
        mousePosition={reducedMotion ? { x: 0, y: 0 } : mousePosition}
        reducedMotion={reducedMotion}
        isMobile={isMobile}
      />

      {/* Navigation */}
      <Navigation />

      {/* Main Content - scrolls over the WebGL canvas */}
      <main className="relative z-10">
        <HeroSection />
        <AboutSection />
        <WorkSection />
        <ContactSection />
        <Footer />
      </main>
    </>
  );
}
