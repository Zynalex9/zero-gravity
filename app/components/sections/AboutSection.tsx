'use client';

import { Section, ContentBox, GradientText } from '../ui';

interface Stat {
  value: string;
  label: string;
}

const stats: Stat[] = [
  { value: '150+', label: 'Projects Completed' },
  { value: '50+', label: 'Happy Clients' },
  { value: '12', label: 'Years Experience' },
  { value: '25', label: 'Team Members' },
];

interface TeamMember {
  name: string;
  role: string;
  emoji: string;
}

const team: TeamMember[] = [
  { name: 'Alex Nova', role: 'Creative Director', emoji: '👨‍🎨' },
  { name: 'Sam Cosmos', role: 'Lead Designer', emoji: '👩‍🎨' },
  { name: 'Jordan Star', role: 'Motion Designer', emoji: '🧑‍💻' },
  { name: 'Riley Orbit', role: '3D Artist', emoji: '👨‍💻' },
];

export function AboutSection() {
  return (
    <Section id="about" className="py-20 md:py-32">
      <div className="container mx-auto px-4 md:px-8 max-w-6xl">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-24">
          <p className="text-purple-400 text-sm md:text-base tracking-widest uppercase mb-4">
            About Us
          </p>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            We Are <GradientText>Zero Gravity</GradientText>
          </h2>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {/* Story */}
          <ContentBox blur={true}>
            <h3 className="text-2xl font-bold text-white mb-6">Our Story</h3>
            <div className="space-y-4 text-white/70 leading-relaxed">
              <p>
                Founded in 2012, Zero Gravity emerged from a simple belief: design 
                should defy expectations. What started as a small studio has grown 
                into a full-service creative agency serving clients across the globe.
              </p>
              <p>
                We believe that great design isn't just about aesthetics—it's about 
                creating meaningful connections between brands and their audiences. 
                Our work combines strategic thinking with boundless creativity to 
                deliver results that truly matter.
              </p>
              <p>
                From startups to Fortune 500 companies, we've helped brands of all 
                sizes reach new heights. Our team of passionate designers, strategists, 
                and dreamers work together to turn ambitious visions into reality.
              </p>
            </div>
          </ContentBox>

          {/* Values */}
          <ContentBox blur={true}>
            <h3 className="text-2xl font-bold text-white mb-6">Our Values</h3>
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-semibold text-purple-400 mb-2">
                  🚀 Innovation First
                </h4>
                <p className="text-white/70">
                  We constantly push boundaries and explore new creative frontiers.
                </p>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-cyan-400 mb-2">
                  🎯 Strategic Design
                </h4>
                <p className="text-white/70">
                  Every design decision is backed by purpose and strategy.
                </p>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-pink-400 mb-2">
                  🤝 Collaborative Spirit
                </h4>
                <p className="text-white/70">
                  We work as partners with our clients, not just service providers.
                </p>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-orange-400 mb-2">
                  ✨ Attention to Detail
                </h4>
                <p className="text-white/70">
                  Excellence lives in the details. We obsess over every pixel.
                </p>
              </div>
            </div>
          </ContentBox>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {stats.map((stat) => (
            <ContentBox 
              key={stat.label} 
              className="text-center py-8"
              blur={true}
            >
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-2">
                {stat.value}
              </div>
              <div className="text-white/60 text-sm md:text-base">
                {stat.label}
              </div>
            </ContentBox>
          ))}
        </div>

        {/* Team */}
        <div>
          <h3 className="text-2xl md:text-3xl font-bold text-white text-center mb-12">
            Meet the <GradientText>Team</GradientText>
          </h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member) => (
              <ContentBox 
                key={member.name}
                className="text-center group hover:bg-white/10 transition-all duration-300"
                blur={true}
              >
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">
                  {member.emoji}
                </div>
                <h4 className="text-lg font-semibold text-white mb-1">
                  {member.name}
                </h4>
                <p className="text-white/60 text-sm">
                  {member.role}
                </p>
              </ContentBox>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
