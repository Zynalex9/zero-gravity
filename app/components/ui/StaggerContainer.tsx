'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, ReactNode, Children } from 'react';

interface StaggerContainerProps {
    children: ReactNode;
    className?: string;
    staggerDelay?: number;
    variant?: 'fade' | 'slide' | 'scale';
}

/**
 * Container component for staggered animations of child elements.
 * Perfect for grids and lists where items should animate in sequence.
 */
export function StaggerContainer({
    children,
    className = '',
    staggerDelay = 0.10,
    variant = 'fade',
}: StaggerContainerProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-50px' });

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: staggerDelay,
            },
        },
    };

    const itemVariants = {
        fade: {
            hidden: { opacity: 0 },
            visible: { opacity: 1 },
        },
        slide: {
            hidden: { opacity: 0, y: 15 },
            visible: { opacity: 1, y: 0 },
        },
        scale: {
            hidden: { opacity: 0, scale: 0.9 },
            visible: { opacity: 1, scale: 1 },
        },
    };

    return (
        <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className={className}
        >
            {Children.map(children, (child, index) => (
                <motion.div
                    key={index}
                    variants={itemVariants[variant]}
                    transition={{
                        duration: 0.5,
                        ease: 'easeOut',
                    }}
                >
                    {child}
                </motion.div>
            ))}
        </motion.div>
    );
}
