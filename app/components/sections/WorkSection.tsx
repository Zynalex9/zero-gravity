'use client';

import { Section, GradientText } from '../ui';

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  color: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: 'Stellar Brands',
    category: 'Brand Identity',
    description: 'Complete rebrand for a tech startup',
    color: 'from-purple-600 to-blue-600',
  },
  {
    id: 2,
    title: 'Nebula App',
    category: 'Digital Design',
    description: 'Mobile app UI/UX design',
    color: 'from-pink-600 to-purple-600',
  },
  {
    id: 3,
    title: 'Cosmic Packaging',
    category: 'Packaging',
    description: 'Premium product packaging',
    color: 'from-cyan-600 to-blue-600',
  },
  {
    id: 4,
    title: 'Orbit Motion',
    category: 'Motion Graphics',
    description: 'Brand animation package',
    color: 'from-orange-600 to-pink-600',
  },
  {
    id: 5,
    title: 'Galaxy Website',
    category: 'Web Design',
    description: 'E-commerce platform design',
    color: 'from-blue-600 to-cyan-600',
  },
  {
    id: 6,
    title: 'Aurora Identity',
    category: 'Brand Identity',
    description: 'Luxury brand development',
    color: 'from-purple-600 to-pink-600',
  },
];

export function WorkSection() {
  return (
    <Section id="work" className="py-20 md:py-32">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-24">
          <p className="text-purple-400 text-sm md:text-base tracking-widest uppercase mb-4">
            Portfolio
          </p>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Featured <GradientText>Work</GradientText>
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            A selection of projects where we helped brands break through 
            the noise and reach new heights.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="group relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer"
            >
              {/* Background gradient (placeholder for project image) */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-80 group-hover:opacity-100 transition-opacity duration-300`}
              />
              
              {/* Pattern overlay */}
              <div 
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: `radial-gradient(circle at 20% 80%, rgba(255,255,255,0.3) 0%, transparent 50%),
                                    radial-gradient(circle at 80% 20%, rgba(255,255,255,0.2) 0%, transparent 50%)`,
                }}
              />

              {/* Content */}
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <span className="text-white/70 text-sm tracking-wider uppercase mb-2">
                  {project.category}
                </span>
                <h3 className="text-2xl font-bold text-white mb-2">
                  {project.title}
                </h3>
                <p className="text-white/70 text-sm transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  {project.description}
                </p>
              </div>

              {/* Hover arrow */}
              <div className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/20 flex items-center justify-center transform translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <button className="px-8 py-4 border border-white/30 rounded-full text-white font-medium hover:bg-white/10 transition-all hover:border-white/50">
            View All Projects
          </button>
        </div>
      </div>
    </Section>
  );
}
