'use client';

import { GradientText } from '../ui';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative py-12 border-t border-white/10">
      <div className="container mx-auto px-4 md:px-8 max-w-6xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="text-xl font-bold tracking-tight">
            <span className="text-white">ZERO</span>
            <GradientText>GRAVITY</GradientText>
          </div>

          {/* Copyright */}
          <p className="text-white/40 text-sm text-center">
            © {currentYear} Zero Gravity Design Agency. All rights reserved.
          </p>

          {/* Links */}
          <div className="flex gap-6">
            <a href="#" className="text-white/40 hover:text-white text-sm transition-colors">
              Privacy
            </a>
            <a href="#" className="text-white/40 hover:text-white text-sm transition-colors">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
