"use client";

import { useRef } from 'react';
import { useScroll, motion } from 'framer-motion';

export function HeroSection() {
  const scrollToWork = () => {
    const element = document.querySelector("#work");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen pt-6">
      <div className="container mx-auto flex h-screen max-w-7xl flex-col items-center justify-center px-4 md:px-8">
        
        {/* Main Content Wrapper */}
        <div className="relative flex w-full flex-col items-center justify-center">
          
          {/* Text Content */}
          <div className="relative z-10 flex w-full flex-col items-center justify-center px-4">
            
            {/* Zero Gravity Title */}
            <motion.h1
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
              className="relative z-10 mt-1 text-center font-serif text-[clamp(2rem,8vw,3rem)] font-bold leading-none tracking-tight md:text-[clamp(3rem,5vw,4rem)]"
              style={{
                color: "#f5f0e8",
                textShadow: `
                  0 0 40px rgba(245, 240, 232, 0.3),
                  0 0 80px rgba(245, 240, 232, 0.2),
                  0 2px 4px rgba(0, 0, 0, 0.5)
                `,
                filter: "drop-shadow(0 0 20px rgba(245, 240, 232, 0.15))",
              }}
            >
              ZEROGRAVITY
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
              className="mt-4 w-full max-w-[90vw] text-center text-[9px] uppercase tracking-[0.2em] text-[#f5f0e8]/60 sm:text-[10px] sm:tracking-[0.4em] md:mt-2 md:text-[11px] lg:text-[12px]"
            >
              Graphic Designer • Brand Identity • Visual Art
            </motion.p>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.button
          onClick={scrollToWork}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{
            duration: 1.5,
            delay: 1.2,
            repeat: Infinity,
            repeatType: "reverse",
            repeatDelay: 0.5,
            ease: "easeInOut",
          }}
          className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 cursor-pointer flex-col items-center gap-2 transition-opacity hover:opacity-80 md:flex"
        >
          <span className="text-xs tracking-widest text-[#f5f0e8]/50">
            SCROLL
          </span>
          <svg
            className="h-5 w-5 text-[#f5f0e8]/50"
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
    </section>
  );
}