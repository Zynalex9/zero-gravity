'use client';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative py-12 border-t border-[#f5f0e8]/10">
      <div className="container mx-auto px-4 md:px-8 max-w-6xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="font-serif text-2xl font-bold tracking-tight">
            <span className="text-metallic">ZERO GRAVITY</span>
          </div>

          {/* Copyright */}
          <p className="text-[#f5f0e8]/40 text-sm text-center">
            © {currentYear} Zero Gravity Design Agency. All rights reserved.
          </p>

          {/* Quick Links */}
          <div className="flex items-center gap-4">
            <span className="decorative-star text-[#f5f0e8]/40">✦</span>
            <a
              href="https://behance.net/zerogravity"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#f5f0e8]/40 hover:text-[#f5f0e8] text-sm transition-colors"
            >
              Behance
            </a>
            <a
              href="https://dribbble.com/zerogravity"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#f5f0e8]/40 hover:text-[#f5f0e8] text-sm transition-colors"
            >
              Dribbble
            </a>
            <a
              href="https://instagram.com/zerogravity"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#f5f0e8]/40 hover:text-[#f5f0e8] text-sm transition-colors"
            >
              Instagram
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
