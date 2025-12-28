'use client';

import { Section, AnimatedSection, ParallaxElement, StaggerContainer } from '../ui';
import { Phone, Instagram, Mail, Dribbble, Globe, Linkedin } from 'lucide-react';

// Education data
const education = [
  {
    year: '2019',
    title: 'University of Architecture (UAH)',
    subtitle: 'Fashion Design Major',
  },
  {
    year: '2023',
    title: 'IELTS Certificate',
    subtitle: 'Total Score: 6.5',
  },
];

// Experience data
const experience = [
  {
    year: '2022',
    title: 'IMAGINATION Musical Show',
    subtitle: 'Costume Designer',
  },
  {
    year: '2023',
    title: 'Space Fintech Joint Stock Company',
    subtitle: 'Internship in Designing Department',
  },
  {
    year: '2024',
    title: 'Design Freelance',
    subtitle: 'Graphic Designer (Posters, Social Post, Magazine...)',
  },
];

// Design software with ratings (out of 5)
const software = [
  { name: 'Illustrator', short: 'Ai', color: '#FF9A00', rating: 5 },
  { name: 'InDesign', short: 'Id', color: '#FF3366', rating: 4 },
  { name: 'Photoshop', short: 'Ps', color: '#31A8FF', rating: 5 },
  { name: 'After Effects', short: 'Ae', color: '#9999FF', rating: 4 },
  { name: 'Lightroom', short: 'Lr', color: '#31A8FF', rating: 3 },
  { name: 'Figma', short: 'F', color: '#A259FF', rating: 4 },
];

// Personal skills
const personalSkills = [
  'Typography', 'Creativity', 'Diligent',
  'Time Management', 'Layout', 'Team work', 'Adaptive'
];

function SkillDots({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((dot) => (
        <span
          key={dot}
          className={dot <= rating ? 'skill-dot' : 'skill-dot-empty'}
        />
      ))}
    </div>
  );
}

export function AboutSection() {
  return (
    <Section id="about" className="py-20 md:py-32">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        {/* Main Resume Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* Left Column - Photo & About */}
          <div className="lg:col-span-4 space-y-6">
            {/* Photo Card with Parallax */}
            <ParallaxElement speed={0.3}>
              <AnimatedSection delay={0.1}>
                <div className="portfolio-card-cream">
                  {/* Profile Image Placeholder */}
                  <div className="aspect-[4/5] bg-gradient-to-br from-gray-700 to-gray-900 rounded-xl mb-4 overflow-hidden relative">
                    <div className="absolute inset-0 bg-[url('/placeholder-profile.jpg')] bg-cover bg-center" />
                    <div className="absolute inset-0 flex items-end p-4">
                      <div className="bg-black/60 backdrop-blur-md rounded-lg px-4 py-2 border border-white/10">
                        <h3 className="font-serif text-xl font-bold text-[#f5f0e8]">ZERO GRAVITY</h3>
                        <p className="text-sm text-[#f5f0e8]/70">Creative Design Agency • Brand Identity • Visual Art</p>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            </ParallaxElement>

            {/* About Me Card */}
            <AnimatedSection delay={0.2}>
              <div className="portfolio-card-cream">
                <h2 className="font-serif text-3xl font-bold text-[#f5f0e8] mb-4">ABOUT US</h2>
                <p className="text-[#f5f0e8]/80 italic mb-4">Hello,</p>
                <p className="text-[#f5f0e8]/70 text-sm leading-relaxed mb-4">
                  We're Zero Gravity, a creative design agency specializing in brand development
                  and visual storytelling. Our portfolio demonstrates a diverse range of impactful
                  designs, seamlessly integrating aesthetics and functionality. We collaborate
                  closely with clients to understand their unique vision, values, and goals,
                  ensuring that every project delivers a strong brand identity and achieves its objectives.
                </p>
                <p className="text-[#f5f0e8]/70 text-sm leading-relaxed mb-4">
                  We are dedicated to creating visually captivating and highly effective work
                  that leaves a lasting impression and elevates brands to new heights.
                </p>
                <p className="text-[#f5f0e8]/80 italic text-sm">
                  Let's collaborate to create something extraordinary together.
                </p>
              </div>
            </AnimatedSection>
          </div>

          {/* Right Column - Education, Experience, Skills */}
          <div className="lg:col-span-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* Education & Experience Card */}
              <AnimatedSection delay={0.3}>
                <div className="portfolio-card-cream">
                  {/* Education */}
                  <h2 className="font-serif text-2xl font-bold text-[#f5f0e8] mb-6">EDUCATION</h2>
                  <StaggerContainer className="space-y-4 mb-8" staggerDelay={0.1} variant="fade">
                    {education.map((item, index) => (
                      <div key={index} className="flex gap-4">
                        <div className="pill-badge !bg-white/10 !text-[#f5f0e8] text-xs font-bold border border-white/20">
                          {item.year}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-[#f5f0e8] text-sm">{item.title}</h4>
                          <p className="text-[#f5f0e8]/60 text-xs">{item.subtitle}</p>
                        </div>
                      </div>
                    ))}
                  </StaggerContainer>

                  {/* Experience */}
                  <h2 className="font-serif text-2xl font-bold text-[#f5f0e8] mb-6">EXPERIENCE</h2>
                  <StaggerContainer className="space-y-4" staggerDelay={0.1} variant="fade">
                    {experience.map((item, index) => (
                      <div key={index} className="flex gap-4">
                        <div className="pill-badge !bg-white/10 !text-[#f5f0e8] text-xs font-bold border border-white/20">
                          {item.year}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-[#f5f0e8] text-sm">{item.title}</h4>
                          <p className="text-[#f5f0e8]/60 text-xs">{item.subtitle}</p>
                        </div>
                      </div>
                    ))}
                  </StaggerContainer>
                </div>
              </AnimatedSection>

              {/* Skills Card */}
              <ParallaxElement speed={0.4} direction="down">
                <AnimatedSection delay={0.4}>
                  <div className="portfolio-card-cream">
                    {/* Design Software */}
                    <h2 className="font-serif text-2xl font-bold text-[#f5f0e8] mb-6">DESIGN SOFTWARE</h2>
                    <div className="grid grid-cols-2 gap-4 mb-8">
                      {software.map((item, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <div
                            className="software-icon text-white font-bold"
                            style={{ background: item.color }}
                          >
                            {item.short}
                          </div>
                          <div>
                            <p className="text-[#f5f0e8] text-sm font-medium">{item.name}</p>
                            <SkillDots rating={item.rating} />
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Personal Skills */}
                    <h2 className="font-serif text-2xl font-bold text-[#f5f0e8] mb-6">PERSONAL SKILLS</h2>
                    <div className="flex flex-wrap gap-2">
                      {personalSkills.map((skill, index) => (
                        <span
                          key={index}
                          className="px-4 py-2 border border-white/20 rounded-full text-[#f5f0e8]/80 text-sm bg-white/5"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </AnimatedSection>
              </ParallaxElement>
            </div>

            {/* Contact Card */}
            <AnimatedSection delay={0.5}>
              <div className="portfolio-card-cream relative overflow-hidden">
                {/* Decorative gradient overlay */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-white/5 to-transparent rounded-full blur-3xl -z-10"></div>

                <div className="flex flex-col gap-8">
                  {/* Header with QR Code */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6">
                      {/* Enhanced QR Code */}
                      <div className="relative group">
                        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-white/5 rounded-xl blur-md group-hover:blur-lg transition-all"></div>
                        <div className="relative w-28 h-28 bg-gradient-to-br from-black/60 to-black/40 border-2 border-white/30 rounded-xl flex items-center justify-center backdrop-blur-sm shadow-xl">
                          <div className="w-24 h-24 bg-gradient-to-br from-gray-600 to-gray-900 rounded-lg grid grid-cols-4 grid-rows-4 gap-[2px] p-1.5">
                            {Array.from({ length: 16 }).map((_, i) => (
                              <div key={i} className={`rounded-sm ${Math.random() > 0.4 ? 'bg-white' : 'bg-transparent'}`} />
                            ))}
                          </div>
                        </div>
                      </div>
                      <div>
                        <p className="text-[#f5f0e8]/50 text-xs mb-1 uppercase tracking-wider">Scan to</p>
                        <p className="text-[#f5f0e8] font-bold text-lg">View CV</p>
                        <div className="flex items-center gap-2 mt-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                          <span className="text-green-400 text-xs font-medium">Available</span>
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <h2 className="font-serif text-4xl font-bold text-[#f5f0e8] mb-1">CONTACT</h2>
                      <p className="text-[#f5f0e8]/50 text-sm">Let's connect</p>
                    </div>
                  </div>

                  {/* Decorative divider */}
                  <div className="flex items-center gap-4">
                    <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                    <span className="text-[#f5f0e8]/30 text-xs">✦</span>
                    <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                  </div>

                  {/* Contact Information Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <a href="tel:+1234567890" className="group flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all">
                      <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Phone className="w-4 h-4 text-[#f5f0e8]/70 group-hover:text-[#f5f0e8]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[#f5f0e8]/50 text-xs">Phone</p>
                        <p className="text-[#f5f0e8]/90 text-sm font-medium truncate">(+1) 234-567-890</p>
                      </div>
                    </a>

                    <a href="mailto:hello@zerogravity.design" className="group flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all">
                      <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Mail className="w-4 h-4 text-[#f5f0e8]/70 group-hover:text-[#f5f0e8]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[#f5f0e8]/50 text-xs">Email</p>
                        <p className="text-[#f5f0e8]/90 text-sm font-medium truncate">hello@zerogravity.design</p>
                      </div>
                    </a>

                    <a href="https://instagram.com/zerogravity" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all">
                      <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Instagram className="w-4 h-4 text-[#f5f0e8]/70 group-hover:text-[#f5f0e8]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[#f5f0e8]/50 text-xs">Instagram</p>
                        <p className="text-[#f5f0e8]/90 text-sm font-medium truncate">@zerogravity</p>
                      </div>
                    </a>

                    <a href="https://linkedin.com/company/zerogravity" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all">
                      <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Linkedin className="w-4 h-4 text-[#f5f0e8]/70 group-hover:text-[#f5f0e8]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[#f5f0e8]/50 text-xs">LinkedIn</p>
                        <p className="text-[#f5f0e8]/90 text-sm font-medium truncate">Zero Gravity</p>
                      </div>
                    </a>

                    <a href="https://dribbble.com/zerogravity" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all">
                      <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Dribbble className="w-4 h-4 text-[#f5f0e8]/70 group-hover:text-[#f5f0e8]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[#f5f0e8]/50 text-xs">Dribbble</p>
                        <p className="text-[#f5f0e8]/90 text-sm font-medium truncate">zerogravity</p>
                      </div>
                    </a>

                    <a href="https://behance.net/zerogravity" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all">
                      <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Globe className="w-4 h-4 text-[#f5f0e8]/70 group-hover:text-[#f5f0e8]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[#f5f0e8]/50 text-xs">Behance</p>
                        <p className="text-[#f5f0e8]/90 text-sm font-medium truncate">zerogravity</p>
                      </div>
                    </a>
                  </div>

                  {/* Footer note */}
                  <div className="text-center pt-4 border-t border-white/10">
                    <p className="text-[#f5f0e8]/40 text-xs italic">Response within 24 hours • Available for projects worldwide</p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </Section >
  );
}
