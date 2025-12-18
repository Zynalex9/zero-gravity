'use client';

import { useState, useEffect, useCallback } from 'react';

interface ScrollProgressOptions {
  throttleMs?: number;
}

/**
 * Hook to track scroll progress from 0 to 1 based on document scroll position
 * @param options - Configuration options
 * @returns Current scroll progress (0-1)
 */
export function useScrollProgress(options: ScrollProgressOptions = {}) {
  const { throttleMs = 16 } = options; // ~60fps default
  const [progress, setProgress] = useState(0);

  const calculateProgress = useCallback(() => {
    if (typeof window === 'undefined') return 0;
    
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    
    if (scrollHeight <= 0) return 0;
    
    return Math.min(Math.max(scrollTop / scrollHeight, 0), 1);
  }, []);

  useEffect(() => {
    let lastTime = 0;
    let rafId: number;

    const handleScroll = () => {
      const now = Date.now();
      
      if (now - lastTime >= throttleMs) {
        lastTime = now;
        setProgress(calculateProgress());
      } else {
        // Schedule update for next available frame
        cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(() => {
          setProgress(calculateProgress());
        });
      }
    };

    // Set initial value
    setProgress(calculateProgress());

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, [calculateProgress, throttleMs]);

  return progress;
}

/**
 * Hook to detect if user prefers reduced motion
 */
export function useReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  return prefersReducedMotion;
}

/**
 * Hook to track mouse position normalized to -1 to 1
 */
export function useMousePosition() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let rafId: number;

    const handleMouseMove = (event: MouseEvent) => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        setPosition({
          x: (event.clientX / window.innerWidth) * 2 - 1,
          y: -(event.clientY / window.innerHeight) * 2 + 1,
        });
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return position;
}

/**
 * Hook to detect mobile/small screen
 */
export function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile, { passive: true });
    return () => window.removeEventListener('resize', checkMobile);
  }, [breakpoint]);

  return isMobile;
}
