'use client';

import { Section } from '../ui';
import { motion } from 'framer-motion';

export function HeroSection() {
  const scrollToWork = () => {
    const element = document.querySelector('#work');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Section id="hero" className="pt-20">
      <div className="container mx-auto px-4 md:px-8 flex flex-col items-center justify-center h-full max-w-7xl">
        {/* Main Portfolio Typography with Glassmorphism */}
        <div className="relative flex flex-col items-center w-full">

          {/* Year Badge - Top Left - Animated */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' }}
            className="absolute left-0 md:left-8 top-8 md:top-16 z-20"
          >
            <div className="px-6 py-3 rounded-full bg-white/5 backdrop-blur-xl border border-white/10">
              <span className="text-[#f5f0e8] text-sm font-medium tracking-wide">2025</span>
            </div>
          </motion.div>

          {/* Glassmorphism Bars Behind Text - Animated */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
          >
            {/* Top Bar */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
              className="absolute w-[70%] h-24 md:h-32 rounded-3xl bg-white/[0.02] backdrop-blur-2xl border border-white/5"
              style={{
                transform: 'translateY(-40px) rotate(-1deg)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
              }}
            />
            {/* Bottom Bar */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
              className="absolute w-[70%] h-24 md:h-32 rounded-3xl bg-white/[0.03] backdrop-blur-2xl border border-white/5"
              style={{
                transform: 'translateY(40px) rotate(1deg)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
              }}
            />
          </motion.div>

          {/* Large PORTFOLIO Text with Glow - Animated with Scale */}
          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
            className="font-serif text-6xl sm:text-7xl md:text-8xl lg:text-[10rem] xl:text-[12rem] font-bold tracking-tight leading-none relative z-10"
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
            PORTFOLIO
          </motion.h1>

          {/* Name Badge - Bottom Right - Animated */}
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
            className="absolute right-0 md:right-8 bottom-8 md:bottom-16 z-20"
          >
            <div className="px-6 py-3 rounded-full bg-white/5 backdrop-blur-xl border border-white/10">
              <span className="text-[#f5f0e8] text-sm md:text-base font-medium tracking-wide font-cursive">
                Zero Gravity
              </span>
            </div>
          </motion.div>
        </div>

        {/* Subtitle - Animated */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
          className="mt-12 md:mt-16 text-[#f5f0e8]/60 text-sm md:text-base tracking-[0.3em] uppercase"
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
