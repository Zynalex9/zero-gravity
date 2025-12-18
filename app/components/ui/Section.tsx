'use client';

interface SectionProps {
  id: string;
  children: React.ReactNode;
  className?: string;
  fullHeight?: boolean;
}

export function Section({ id, children, className = '', fullHeight = true }: SectionProps) {
  return (
    <section
      id={id}
      className={`
        relative w-full 
        ${fullHeight ? 'min-h-screen' : ''} 
        flex flex-col justify-center
        ${className}
      `}
    >
      {children}
    </section>
  );
}

interface ContentBoxProps {
  children: React.ReactNode;
  className?: string;
  blur?: boolean;
}

export function ContentBox({ children, className = '', blur = true }: ContentBoxProps) {
  return (
    <div
      className={`
        relative
        ${blur ? 'bg-black/30 backdrop-blur-sm' : ''}
        rounded-2xl
        p-6 md:p-8 lg:p-12
        ${className}
      `}
    >
      {children}
    </div>
  );
}

interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
}

export function GradientText({ children, className = '' }: GradientTextProps) {
  return (
    <span
      className={`
        bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400
        bg-clip-text text-transparent
        ${className}
      `}
    >
      {children}
    </span>
  );
}
