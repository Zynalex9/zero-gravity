'use client';

import { Section, GradientText } from '../ui';

export function HeroSection() {
  const scrollToContact = () => {
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToWork = () => {
    const element = document.querySelector('#work');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Section id="hero" className="pt-20">
      <div className="container mx-auto px-4 md:px-8 flex flex-col items-start justify-center h-full max-w-6xl">
        <div className="max-w-3xl">
          {/* Tagline */}
          <p className="text-purple-400 text-sm md:text-base tracking-widest uppercase mb-4 md:mb-6">
            Creative Design Agency
          </p>
          
          {/* Main Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6 md:mb-8">
            Design Without
            <br />
            <GradientText>Boundaries</GradientText>
          </h1>
          
          {/* Subheadline */}
          <p className="text-lg md:text-xl text-white/70 mb-8 md:mb-12 max-w-xl leading-relaxed">
            We craft bold, innovative visual experiences that defy convention 
            and propel brands into new dimensions of creative excellence.
          </p>
          
          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={scrollToContact}
              className="px-8 py-4 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full text-white font-medium hover:opacity-90 transition-all hover:scale-105 transform"
            >
              Start Your Project
            </button>
            <button
              onClick={scrollToWork}
              className="px-8 py-4 border border-white/30 rounded-full text-white font-medium hover:bg-white/10 transition-all hover:border-white/50"
            >
              View Our Work
            </button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 animate-bounce">
          <span className="text-white/50 text-xs tracking-widest">SCROLL</span>
          <svg
            className="w-5 h-5 text-white/50"
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
        </div>
      </div>
    </Section>
  );
}
