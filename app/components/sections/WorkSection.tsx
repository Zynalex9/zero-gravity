'use client';

import { Section } from '../ui';

interface Project {
  id: number;
  title: string;
  color: string;
  gradient?: string;
}

// Album cover projects (mimicking the poster grid from inspiration)
const albumCovers: Project[] = [
  { id: 1, title: 'Elvis Presley', color: '#1a1a2e', gradient: 'from-blue-900 to-purple-900' },
  { id: 2, title: 'Moody Blues', color: '#2d1f3d', gradient: 'from-purple-800 to-indigo-900' },
  { id: 3, title: 'Killer Queen', color: '#8b0000', gradient: 'from-red-800 to-red-950' },
  { id: 4, title: 'Green Grass', color: '#228b22', gradient: 'from-green-600 to-green-900' },
  { id: 5, title: 'Ob-La-Di', color: '#daa520', gradient: 'from-yellow-500 to-orange-600' },
  { id: 6, title: 'Beatles', color: '#f5f5dc', gradient: 'from-amber-100 to-amber-300' },
  { id: 7, title: 'Scary Monsters', color: '#ff4500', gradient: 'from-orange-500 to-red-600' },
  { id: 8, title: 'Disco', color: '#ff69b4', gradient: 'from-pink-400 to-purple-500' },
  { id: 9, title: 'Ghost Town', color: '#4a4a4a', gradient: 'from-gray-600 to-gray-800' },
  { id: 10, title: 'Pearl Jam', color: '#8b4513', gradient: 'from-amber-700 to-amber-900' },
  { id: 11, title: 'Green Day', color: '#32cd32', gradient: 'from-lime-500 to-green-700' },
  { id: 12, title: 'Tree', color: '#228b22', gradient: 'from-emerald-500 to-emerald-800' },
  { id: 13, title: 'Mirror', color: '#c0c0c0', gradient: 'from-slate-300 to-slate-500' },
  { id: 14, title: 'Les Miserables', color: '#1a1a2e', gradient: 'from-slate-800 to-slate-950' },
  { id: 15, title: 'Tori', color: '#ff6347', gradient: 'from-red-400 to-orange-500' },
  { id: 16, title: 'The Face', color: '#f5deb3', gradient: 'from-amber-200 to-orange-300' },
  { id: 17, title: 'The Music', color: '#4169e1', gradient: 'from-blue-500 to-indigo-700' },
  { id: 18, title: 'C Moon', color: '#ffd700', gradient: 'from-yellow-400 to-orange-500' },
  { id: 19, title: 'I Am A Rock', color: '#cd853f', gradient: 'from-orange-600 to-red-700' },
];

// Social posts (second row in the inspiration)
const socialPosts: Project[] = [
  { id: 20, title: "Knockin' On Door", color: '#ff0000', gradient: 'from-red-500 to-red-700' },
  { id: 21, title: 'Bob Dylan', color: '#8b4513', gradient: 'from-amber-600 to-amber-800' },
  { id: 22, title: 'Instagram Post', color: '#e1306c', gradient: 'from-pink-500 to-purple-600' },
  { id: 23, title: 'Scary Monsters', color: '#32cd32', gradient: 'from-green-400 to-green-600' },
  { id: 24, title: 'Heaven Door', color: '#ff4500', gradient: 'from-orange-500 to-red-600' },
];

export function WorkSection() {
  return (
    <Section id="work" className="py-20 md:py-32">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">

        {/* Section Header - POSTERS */}
        <div className="text-center mb-12 relative">
          {/* Decorative stars */}
          <div className="absolute left-4 top-1/2 -translate-y-1/2 hidden md:flex items-center gap-8">
            <span className="decorative-star">✦</span>
            <div className="w-24 h-[1px] bg-[#f5f0e8]/30"></div>
          </div>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 hidden md:flex items-center gap-8">
            <div className="w-24 h-[1px] bg-[#f5f0e8]/30"></div>
            <span className="decorative-star">✦</span>
          </div>

          <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold text-metallic">
            POSTERS
          </h2>
          <p className="mt-4 text-[#f5f0e8]/60 font-cursive text-lg">Personal Projects</p>
        </div>

        {/* Album Covers Section */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <span className="decorative-star text-[#f5f0e8]">❋</span>
            <h3 className="font-serif text-2xl md:text-3xl font-bold text-[#f5f0e8]">ALBUM COVERS</h3>
            <div className="flex-1 h-[1px] bg-[#f5f0e8]/20 hidden md:block"></div>
            <p className="text-[#f5f0e8]/60 text-sm font-cursive hidden md:block">Of various songs and albums</p>
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-2 md:gap-3">
            {albumCovers.map((project) => (
              <div
                key={project.id}
                className={`aspect-square rounded-lg overflow-hidden cursor-pointer group relative bg-gradient-to-br ${project.gradient}`}
              >
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center p-2">
                  <p className="text-white text-xs md:text-sm font-medium text-center">{project.title}</p>
                </div>

                {/* Pattern overlay for texture */}
                <div className="absolute inset-0 opacity-30 group-hover:opacity-10 transition-opacity">
                  <div className="w-full h-full" style={{
                    backgroundImage: `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.2) 0%, transparent 50%)`,
                  }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Social Posts Section */}
        <div>
          <div className="flex items-center gap-4 mb-6">
            <span className="decorative-star text-[#f5f0e8]">❋</span>
            <h3 className="font-serif text-2xl md:text-3xl font-bold text-[#f5f0e8]">SOCIAL MEDIA</h3>
            <div className="flex-1 h-[1px] bg-[#f5f0e8]/20 hidden md:block"></div>
            <p className="text-[#f5f0e8]/60 text-sm font-cursive hidden md:block">Instagram posts & stories</p>
          </div>

          {/* Social Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
            {socialPosts.map((project) => (
              <div
                key={project.id}
                className={`aspect-[4/5] rounded-xl overflow-hidden cursor-pointer group relative bg-gradient-to-br ${project.gradient}`}
              >
                {/* Mock phone frame overlay */}
                <div className="absolute top-2 left-2 right-2 flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-white/20"></div>
                  <div className="flex-1 h-3 bg-white/10 rounded-full"></div>
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center p-4">
                  <div className="text-center">
                    <p className="text-white text-sm font-medium">{project.title}</p>
                    <p className="text-white/60 text-xs mt-1">View Project →</p>
                  </div>
                </div>

                {/* Instagram-like footer */}
                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/50 to-transparent">
                  <div className="flex items-center gap-3">
                    <span className="text-white text-xs">♡ 250 likes</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <button className="pill-badge hover:bg-[#2a2a2a] transition-colors">
            View All Projects →
          </button>
        </div>
      </div>
    </Section>
  );
}
