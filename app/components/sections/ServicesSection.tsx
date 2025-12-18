'use client';

import { Section, ContentBox, GradientText } from '../ui';

interface Service {
  icon: string;
  title: string;
  description: string;
}

const services: Service[] = [
  {
    icon: '🎨',
    title: 'Brand Identity',
    description: 'Complete brand systems including logos, color palettes, typography, and visual guidelines that make your brand unforgettable.',
  },
  {
    icon: '📱',
    title: 'Digital Design',
    description: 'Web and mobile interfaces that blend stunning aesthetics with intuitive user experiences and seamless functionality.',
  },
  {
    icon: '📦',
    title: 'Packaging Design',
    description: 'Eye-catching packaging that tells your product\'s story and stands out on any shelf or screen.',
  },
  {
    icon: '🎬',
    title: 'Motion Graphics',
    description: 'Dynamic animations and video content that bring your brand to life and captivate your audience.',
  },
  {
    icon: '🖼️',
    title: 'Illustration',
    description: 'Custom illustrations and artwork that add unique character and depth to your visual communications.',
  },
  {
    icon: '✨',
    title: '3D & CGI',
    description: 'Immersive 3D visualizations and computer-generated imagery that push creative boundaries.',
  },
];

export function ServicesSection() {
  return (
    <Section id="services" className="py-20 md:py-32">
      <div className="container mx-auto px-4 md:px-8 max-w-6xl">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-24">
          <p className="text-purple-400 text-sm md:text-base tracking-widest uppercase mb-4">
            What We Do
          </p>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Our <GradientText>Services</GradientText>
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            From concept to completion, we offer comprehensive design solutions 
            that elevate your brand above the atmosphere.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, index) => (
            <ContentBox
              key={service.title}
              className="group hover:bg-white/10 transition-all duration-300 cursor-pointer hover:-translate-y-2"
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {service.icon}
              </div>
              <h3 className="text-xl md:text-2xl font-semibold text-white mb-3">
                {service.title}
              </h3>
              <p className="text-white/60 leading-relaxed">
                {service.description}
              </p>
            </ContentBox>
          ))}
        </div>
      </div>
    </Section>
  );
}
