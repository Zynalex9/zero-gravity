'use client';

import { motion, useAnimation } from 'framer-motion';
import { useEffect, useState } from 'react';

export function Preloader() {
    const [isComplete, setIsComplete] = useState(false);
    const controls = useAnimation();

    useEffect(() => {
        // Check if user prefers reduced motion
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (prefersReducedMotion) {
            // Skip animation for accessibility
            setIsComplete(true);
            return;
        }

        // Animation sequence
        const runSequence = async () => {
            // Wait for text to slide in and pause
            await new Promise(resolve => setTimeout(resolve, 1200));

            // Slide text up and out
            await controls.start({
                y: -100,
                opacity: 0,
                transition: { duration: 0.6, ease: 'easeIn' }
            });

            // Small delay before background slides up
            await new Promise(resolve => setTimeout(resolve, 100));

            // Mark as complete to trigger background slide
            setIsComplete(true);
        };

        runSequence();
    }, [controls]);

    if (isComplete && typeof window !== 'undefined') {
        // Small delay to ensure smooth transition
        setTimeout(() => {
            document.body.style.overflow = 'auto';
        }, 600);
    }

    return (
        <motion.div
            initial={{ y: 0 }}
            animate={isComplete ? { y: '-100%' } : { y: 0 }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[9999] bg-black flex items-center justify-center"
            onAnimationComplete={() => {
                if (isComplete) {
                    // Remove from DOM after animation
                    const preloader = document.getElementById('preloader-root');
                    if (preloader) {
                        preloader.style.display = 'none';
                    }
                }
            }}
        >
            <motion.h1
                initial={{ x: -100, opacity: 0 }}
                animate={controls}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="font-serif text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tight text-[#f5f0e8]"
                style={{
                    textShadow: `
                        0 0 40px rgba(245, 240, 232, 0.2),
                        0 2px 4px rgba(0, 0, 0, 0.5)
                    `,
                }}
            >
                ZERO GRAVITY
            </motion.h1>
        </motion.div>
    );
}
