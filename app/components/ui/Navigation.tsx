'use client';

import Image from 'next/image';

export function Navigation() {
  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 py-4">
      <div className="flex items-center justify-center">
        <a
          href="#hero"
          onClick={handleLogoClick}
          className="transition-transform hover:scale-105 duration-300"
        >
          <Image
            src="/Logo.png"
            alt="Zero Gravity Logo"
            width={80}
            height={80}
            className="w-16 h-16 md:w-20 md:h-20 object-cover"
            priority
          />
        </a>
      </div>
    </nav>
  );
}
