'use client';

import { Section } from '../ui';
import { motion } from 'framer-motion';
import Image from 'next/image';

export function HeroSection() {
  const scrollToWork = () => {
    const element = document.querySelector('#work');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Section id="hero" className="pt-6">
      <div className="container mx-auto px-4 md:px-8 flex flex-col items-center justify-center h-full max-w-7xl">
        {/* Main Banner Content */}
        <div className="relative flex flex-col items-center w-full gap-1">

          {/* Logo at the top - Animated */}
            <motion.div
                          initial={{ opacity: 0 ,y:-20}}
                          animate={{ 
                            opacity: 1, 
                            y: [0, -15, 0], 
                          }}
                          transition={{ 
                            opacity: { duration: 6, delay: 0 }, 
                            y: { 
                duration: 4, 
                repeat: Infinity, 
                ease: "easeInOut",
                delay: 1.2
              } 
                          }}
                          className="relative z-20 mb-[-10px] md:mb-[-10px] lg:mb-[-30px]"
                          style={{ filter: 'drop-shadow(0 0 15px rgba(154, 190, 228, 0.4))' }}
                        >
              <Image 
                src="/mainguy.png" 
                alt="Zero Gravity Logo" 
                width={400} 
                height={400}
                className="w-32 h-32 md:w-48 md:h-48 lg:w-64 lg:h-64 object-contain "
                priority
              />
            </motion.div>

          {/* Lens Flare / Glare Effect - Animated */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
            className="relative w-full max-w-2xl h-8 md:h-10 -my-1"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              {/* Main bright horizontal flare */}
              <div 
                className="absolute w-full h-[3px]"
                style={{
                  background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.3) 30%, rgba(255, 255, 255, 0.95) 48%, rgba(255, 255, 255, 1) 50%, rgba(255, 255, 255, 0.95) 52%, rgba(255, 255, 255, 0.3) 70%, transparent 100%)',
                  filter: 'blur(1.5px)'
                }}
              />
              
              {/* Bright center point */}
              {/* <div 
                className="absolute w-3 h-3 rounded-full"
                style={{
                  background: 'radial-gradient(circle, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.95) 40%, transparent 70%)'
                }}
              /> */}
            </div>
          </motion.div>

          {/* Zero Gravity Text with Glow - Animated */}
          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5, ease: 'easeOut' }}
            className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-tight leading-none relative z-10 text-center mt-1"
            style={{
              color: '#f5f0e8',
              textShadow: `
                0 0 40px rgba(245, 240, 232, 0.3),
                0 0 80px rgba(245, 240, 232, 0.2),
                0 2px 4px rgba(0, 0, 0, 0.5)
              `,
              filter: 'drop-shadow(0 0 20px rgba(245, 240, 232, 0.15))'
            }}
          >
            ZEROGRAVITY
          </motion.h1>
        </div>

        {/* Subtitle - Animated */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7, ease: 'easeOut' }}
          className="mt-8 md:mt-3 text-[#f5f0e8]/60 text-sm md:text-base tracking-[0.3em] uppercase"
        >
          Graphic Designer • Brand Identity • Visual Art
        </motion.p>

        {/* Scroll indicator */}
        <motion.button
          onClick={scrollToWork}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{
            duration: 1.5,
            delay: 1.2,
            repeat: Infinity,
            repeatType: 'reverse',
            repeatDelay: 0.5,
            ease: 'easeInOut'
          }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
        >
          <span className="text-[#f5f0e8]/50 text-xs tracking-widest">SCROLL</span>
          <svg
            className="w-5 h-5 text-[#f5f0e8]/50"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </motion.button>
      </div>
    </Section>
  );
}
