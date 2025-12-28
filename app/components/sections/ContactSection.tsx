'use client';

import { useState } from 'react';
import { Section, AnimatedSection } from '../ui';
import { Mail, Phone, MapPin, Instagram, Linkedin } from 'lucide-react';
import { motion } from 'framer-motion';

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Thanks for reaching out! I\'ll get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
  };

  const socialLinks = [
    { name: 'Behance', url: 'https://behance.net/zerogravity', icon: 'behance' },
    { name: 'Dribbble', url: 'https://dribbble.com/zerogravity', icon: 'dribbble' },
    { name: 'Instagram', url: 'https://instagram.com/zerogravity', Icon: Instagram },
    { name: 'LinkedIn', url: 'https://linkedin.com/company/zerogravity', Icon: Linkedin },
  ];

  return (
    <Section id="contact" className="py-20 md:py-32">
      <div className="container mx-auto px-4 md:px-8 max-w-5xl">
        {/* Section Header */}
        <AnimatedSection delay={0.1}>
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="w-12 h-[1px] bg-[#f5f0e8]/30"></div>
              <span className="decorative-star text-[#f5f0e8]">✦</span>
              <div className="w-12 h-[1px] bg-[#f5f0e8]/30"></div>
            </div>
            <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold text-metallic mb-4">
              LET'S TALK
            </h2>
            <p className="text-[#f5f0e8]/60 text-lg max-w-xl mx-auto">
              Have a project in mind? Let's create something amazing together.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form - Slide in from left */}
          <AnimatedSection delay={0.2} yOffset={30}>
            <motion.div
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.2 }}
              className="portfolio-card"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-[#f5f0e8]/70 text-sm mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-[#f5f0e8]/10 rounded-lg text-[#f5f0e8] placeholder-[#f5f0e8]/30 focus:outline-none focus:border-[#f5f0e8]/30 transition-colors"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-[#f5f0e8]/70 text-sm mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-[#f5f0e8]/10 rounded-lg text-[#f5f0e8] placeholder-[#f5f0e8]/30 focus:outline-none focus:border-[#f5f0e8]/30 transition-colors"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-[#f5f0e8]/70 text-sm mb-2">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 bg-white/5 border border-[#f5f0e8]/10 rounded-lg text-[#f5f0e8] placeholder-[#f5f0e8]/30 focus:outline-none focus:border-[#f5f0e8]/30 transition-colors resize-none"
                    placeholder="Tell me about your project..."
                  />
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 bg-[#f5f0e8] rounded-lg text-[#1a1a1a] font-medium hover:bg-[#e8e0d0] transition-all"
                >
                  Send Message
                </motion.button>
              </form>
            </motion.div>
          </AnimatedSection>

          {/* Contact Info - Slide in from right */}
          <div className="space-y-6">
            <AnimatedSection delay={0.3} yOffset={30}>
              <div className="portfolio-card">
                <h3 className="font-serif text-2xl font-bold text-[#f5f0e8] mb-6">Get In Touch</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                      <Mail className="w-5 h-5 text-[#f5f0e8]" />
                    </div>
                    <div>
                      <p className="text-[#f5f0e8]/60 text-sm">Email</p>
                      <a href="mailto:hello@zerogravity.design" className="text-[#f5f0e8] hover:text-[#d4c8b8] transition-colors">
                        hello@zerogravity.design
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                      <Phone className="w-5 h-5 text-[#f5f0e8]" />
                    </div>
                    <div>
                      <p className="text-[#f5f0e8]/60 text-sm">Phone</p>
                      <a href="tel:+1234567890" className="text-[#f5f0e8] hover:text-[#d4c8b8] transition-colors">
                        (+1) 234-567-890
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-[#f5f0e8]" />
                    </div>
                    <div>
                      <p className="text-[#f5f0e8]/60 text-sm">Location</p>
                      <p className="text-[#f5f0e8]">San Francisco, CA</p>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.4} yOffset={30}>
              <div className="portfolio-card">
                <h3 className="font-serif text-2xl font-bold text-[#f5f0e8] mb-6">Follow Me</h3>
                <div className="grid grid-cols-2 gap-3">
                  {socialLinks.map((social) => (
                    <motion.a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-3 px-4 py-3 bg-white/5 border border-[#f5f0e8]/10 rounded-lg hover:bg-white/10 transition-all group"
                    >
                      {social.Icon ? (
                        <social.Icon className="w-5 h-5 text-[#f5f0e8]/70 group-hover:text-[#f5f0e8] transition-colors" />
                      ) : (
                        <div className="w-5 h-5 rounded bg-[#f5f0e8]/70 group-hover:bg-[#f5f0e8] transition-colors flex items-center justify-center text-[10px] font-bold text-black">
                          {social.icon === 'behance' ? 'Bē' : 'Dr'}
                        </div>
                      )}
                      <span className="text-[#f5f0e8]/70 group-hover:text-[#f5f0e8] transition-colors text-sm">
                        {social.name}
                      </span>
                    </motion.a>
                  ))}
                </div>
              </div>
            </AnimatedSection>

            {/* Availability Badge */}
            <AnimatedSection delay={0.5} yOffset={30}>
              <div className="portfolio-card text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/20 border border-green-500/30 rounded-full mb-3">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  <span className="text-green-400 text-sm font-medium">Available for Freelance</span>
                </div>
                <p className="text-[#f5f0e8]/60 text-sm">
                  Currently accepting new projects and collaborations
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </Section>
  );
}
