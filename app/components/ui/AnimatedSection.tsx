'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, ReactNode } from 'react';

interface AnimatedSectionProps {
    children: ReactNode;
    className?: string;
    delay?: number;
    duration?: number;
    yOffset?: number;
}

/**
 * Wrapper component that provides scroll-triggered fade-in and slide-up animations.
 * Automatically respects reduced motion preferences.
 */
export function AnimatedSection({
    children,
    className = '',
    delay = 0,
    duration = 0.5,
    yOffset = 20,
}: AnimatedSectionProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: yOffset }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: yOffset }}
            transition={{
                duration,
                delay,
                ease: 'easeOut', // Gentle easing for minimalist feel
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
