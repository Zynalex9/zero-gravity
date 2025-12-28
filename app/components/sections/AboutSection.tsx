'use client';

import { Section } from '../ui';

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
            {/* Photo Card */}
            <div className="portfolio-card-cream">
              {/* Profile Image Placeholder */}
              <div className="aspect-[4/5] bg-gradient-to-br from-gray-300 to-gray-400 rounded-xl mb-4 overflow-hidden relative">
                <div className="absolute inset-0 bg-[url('/placeholder-profile.jpg')] bg-cover bg-center" />
                <div className="absolute inset-0 flex items-end p-4">
                  <div className="bg-white/90 backdrop-blur-sm rounded-lg px-4 py-2">
                    <h3 className="font-serif text-xl font-bold text-gray-900">ZERO GRAVITY</h3>
                    <p className="text-sm text-gray-600">Creative Design Agency • Brand Identity • Visual Art</p>
                  </div>
                </div>
              </div>
            </div>

            {/* About Me Card */}
            <div className="portfolio-card-cream">
              <h2 className="font-serif text-3xl font-bold text-gray-900 mb-4">ABOUT US</h2>
              <p className="text-gray-700 italic mb-4">Hello,</p>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                We're Zero Gravity, a creative design agency specializing in brand development
                and visual storytelling. Our portfolio demonstrates a diverse range of impactful
                designs, seamlessly integrating aesthetics and functionality. We collaborate
                closely with clients to understand their unique vision, values, and goals,
                ensuring that every project delivers a strong brand identity and achieves its objectives.
              </p>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                We are dedicated to creating visually captivating and highly effective work
                that leaves a lasting impression and elevates brands to new heights.
              </p>
              <p className="text-gray-700 italic text-sm">
                Let's collaborate to create something extraordinary together.
              </p>
            </div>
          </div>

          {/* Right Column - Education, Experience, Skills */}
          <div className="lg:col-span-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* Education & Experience Card */}
              <div className="portfolio-card-cream">
                {/* Education */}
                <h2 className="font-serif text-2xl font-bold text-gray-900 mb-6">EDUCATION</h2>
                <div className="space-y-4 mb-8">
                  {education.map((item, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="pill-badge-light !bg-[#d4c8b8] !text-gray-900 text-xs font-bold">
                        {item.year}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 text-sm">{item.title}</h4>
                        <p className="text-gray-600 text-xs">{item.subtitle}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Experience */}
                <h2 className="font-serif text-2xl font-bold text-gray-900 mb-6">EXPERIENCE</h2>
                <div className="space-y-4">
                  {experience.map((item, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="pill-badge-light !bg-[#d4c8b8] !text-gray-900 text-xs font-bold">
                        {item.year}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 text-sm">{item.title}</h4>
                        <p className="text-gray-600 text-xs">{item.subtitle}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Skills Card */}
              <div className="portfolio-card-cream">
                {/* Design Software */}
                <h2 className="font-serif text-2xl font-bold text-gray-900 mb-6">DESIGN SOFTWARE</h2>
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
                        <p className="text-gray-900 text-sm font-medium">{item.name}</p>
                        <SkillDots rating={item.rating} />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Personal Skills */}
                <h2 className="font-serif text-2xl font-bold text-gray-900 mb-6">PERSONAL SKILLS</h2>
                <div className="flex flex-wrap gap-2">
                  {personalSkills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 border border-gray-400 rounded-full text-gray-700 text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Card */}
            <div className="portfolio-card-cream">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div className="flex items-center gap-6">
                  {/* QR Code Placeholder */}
                  <div className="w-24 h-24 bg-white border border-gray-200 rounded-lg flex items-center justify-center">
                    <div className="w-20 h-20 bg-gradient-to-br from-gray-800 to-gray-600 rounded grid grid-cols-4 grid-rows-4 gap-[2px] p-1">
                      {Array.from({ length: 16 }).map((_, i) => (
                        <div key={i} className={`${Math.random() > 0.4 ? 'bg-white' : 'bg-transparent'}`} />
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs mb-1">Scan to</p>
                    <p className="text-gray-900 font-bold">view CV</p>
                  </div>
                </div>

                <h2 className="font-serif text-3xl font-bold text-gray-900">CONTACT</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <span>📞</span>
                    <span className="text-gray-700">(+1) 234-567-890</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>📸</span>
                    <span className="text-gray-700">instagram.com/zerogravity</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>✉️</span>
                    <span className="text-gray-700">hello@zerogravity.design</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>🎨</span>
                    <span className="text-gray-700">dribbble.com/zerogravity</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>🅱️</span>
                    <span className="text-gray-700">behance.net/zerogravity</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>💼</span>
                    <span className="text-gray-700">linkedin.com/company/zerogravity</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section >
  );
}
