'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, ReactNode } from 'react';

interface ParallaxElementProps {
    children: ReactNode;
    className?: string;
    speed?: number; // Multiplier for parallax effect (0.5 = half speed, 2 = double speed)
    direction?: 'up' | 'down';
}

/**
 * Creates a subtle parallax effect that moves elements at different speeds based on scroll.
 * Use sparingly on key foreground elements for depth.
 */
export function ParallaxElement({
    children,
    className = '',
    speed = 0.5,
    direction = 'up',
}: ParallaxElementProps) {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start end', 'end start'],
    });

    // Calculate parallax range (max 15px movement for subtlety)
    const maxMovement = 15;
    const range = direction === 'up' ? [-maxMovement, maxMovement] : [maxMovement, -maxMovement];
    const y = useTransform(scrollYProgress, [0, 1], range.map(v => v * speed));

    return (
        <motion.div
            ref={ref}
            style={{ y }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
