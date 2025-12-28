'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export function Preloader() {
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        // Prevent scrolling during preloader
        document.body.style.overflow = 'hidden';

        // Check if user prefers reduced motion
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (prefersReducedMotion) {
            // Skip animation for accessibility
            setIsComplete(true);
            document.body.style.overflow = 'auto';
            return;
        }

        // Set timer for when to complete the preloader
        const timer = setTimeout(() => {
            setIsComplete(true);
        }, 1900); // Total animation time: 1.9s

        return () => {
            clearTimeout(timer);
        };
    }, []);

    // Re-enable scrolling after background slides up
    useEffect(() => {
        if (isComplete) {
            const scrollTimer = setTimeout(() => {
                document.body.style.overflow = 'auto';
            }, 800); // Wait for background slide animation to complete

            return () => clearTimeout(scrollTimer);
        }
    }, [isComplete]);

    return (
        <motion.div
            initial={{ y: 0 }}
            animate={isComplete ? { y: '-100%' } : { y: 0 }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: isComplete ? 0 : 0 }}
            className="fixed inset-0 z-[9999] bg-black flex items-center justify-center"
            style={{ pointerEvents: isComplete ? 'none' : 'auto' }}
        >
            <motion.h1
                initial={{ x: -100, opacity: 0 }}
                animate={{
                    x: isComplete ? 0 : 0,
                    y: isComplete ? -150 : 0,
                    opacity: isComplete ? 0 : 1,
                }}
                transition={{
                    x: { duration: 0.8, ease: 'easeOut' },
                    y: { duration: 0.6, ease: 'easeIn', delay: 0 },
                    opacity: isComplete
                        ? { duration: 0.6, ease: 'easeIn', delay: 0 }
                        : { duration: 0.8, ease: 'easeOut', delay: 0 },
                }}
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
