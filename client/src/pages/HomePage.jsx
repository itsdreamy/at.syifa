import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowDownRight, 
  ArrowUpRight, 
  Code, 
  Compass, 
  Layers, 
  Award, 
  BookOpen, 
  GraduationCap, 
  ExternalLink,
  HeartHandshake,
  CheckCircle2,
  Mail,
  Github,
  Linkedin,
  RefreshCw
} from 'lucide-react';
import { portfolioApi } from '../services/api';
import { initialProjects } from '../data/portfolioData';
import ProjectGallery from '../components/projects/ProjectGallery';
import CapybaraPool from '../components/capybara/CapybaraPool';
import ImageModal from '../components/common/ImageModal';
import { Link } from 'react-router-dom';

export default function HomePage({ showFeed = true }) {
  // State for data from Express API
  const [projects, setProjects] = useState(initialProjects);
  const [experiences, setExperiences] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [volunteer, setVolunteer] = useState([]);
  const [articles, setArticles] = useState([]);
  
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState(null);

  // Modal preview state
  const [modalImage, setModalImage] = useState(null);

  // Load data from Express API with fallback
  const loadData = async () => {
    setLoading(true);
    setApiError(null);
    try {
      const [projData, expData, achData, volData, artData] = await Promise.allSettled([
        portfolioApi.getProjects(),
        portfolioApi.getExperiences(),
        portfolioApi.getAchievements(),
        portfolioApi.getVolunteer(),
        portfolioApi.getArticles(),
      ]);

      if (projData.status === 'fulfilled' && projData.value) {
        setProjects(projData.value);
      }
      if (expData.status === 'fulfilled' && expData.value) {
        setExperiences(expData.value);
      }
      if (achData.status === 'fulfilled' && achData.value) {
        setAchievements(achData.value);
      }
      if (volData.status === 'fulfilled' && volData.value) {
        setVolunteer(volData.value);
      }
      if (artData.status === 'fulfilled' && artData.value) {
        setArticles(artData.value);
      }
    } catch (err) {
      console.warn('API error during load:', err);
      setApiError('Connected in offline/fallback mode. Using static configuration.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="relative">
      {/* SECTION 1: HERO */}
      <section id="hero" className="min-h-[92vh] pt-32 sm:pt-40 pb-20 flex flex-col justify-between border-b border-border relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 w-full">
          {/* Top metadata tags */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-wrap items-center justify-between gap-4 pb-8 border-b border-border"
          >
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono uppercase tracking-widest text-secondary">
                Portfolio · 2026 Edition
              </span>
              <span className="text-muted">/</span>
              <span className="text-xs font-mono text-secondary">Creative Studio</span>
            </div>
            
            <div className="flex items-center gap-2 text-xs font-mono text-secondary">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Available for Full-time &amp; Select Contracts</span>
            </div>
          </motion.div>

          {/* Main Hero Headline Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 py-12 lg:py-16 items-center">
            {/* Left Col: Headline */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="lg:col-span-8 space-y-6"
            >
              <div className="inline-block px-3 py-1 rounded-full bg-surface border border-border text-xs font-mono text-secondary mb-2">
                UI Designer · Web Developer · Technical Writer
              </div>

              <h1 className="font-serif text-5xl sm:text-7xl lg:text-8xl text-foreground font-normal leading-[1.05] tracking-tight">
                Designing things that feel right. <br />
                <span className="italic font-normal">Building things</span> that work.
              </h1>

              <p className="font-sans text-secondary text-lg sm:text-xl max-w-2xl font-light leading-relaxed">
                I enjoy turning ideas into thoughtful digital experiences through design, development, and a little curiosity.
              </p>

              {/* Action buttons */}
              <div className="pt-4 flex flex-wrap items-center gap-4">
                <a
                  href="#work"
                  className="px-6 py-3.5 rounded-full bg-[#171717] text-white hover:bg-[#333] transition-all text-sm font-medium inline-flex items-center gap-2 shadow-sm group"
                >
                  <span>Explore My Work</span>
                  <ArrowDownRight className="w-4 h-4 group-hover:translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                </a>
                <a
                  href="#contact"
                  className="px-6 py-3.5 rounded-full border border-border bg-surface hover:bg-[#eaeae7] transition-all text-sm font-medium text-foreground inline-flex items-center gap-2"
                >
                  <span>Get in Touch</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </motion.div>

            {/* Right Col: Portrait / Mascot Vignette */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="lg:col-span-4 flex justify-center lg:justify-end"
            >
              <div className="relative w-full max-w-sm aspect-[4/5] rounded-2xl bg-surface border border-border p-4 shadow-sm flex flex-col justify-between overflow-hidden group">
                {/* Background architectural grid */}
                <div 
                  className="absolute inset-0 opacity-10 pointer-events-none"
                  style={{
                    backgroundImage: 'linear-gradient(to right, #171717 1px, transparent 1px), linear-gradient(to bottom, #171717 1px, transparent 1px)',
                    backgroundSize: '24px 24px'
                  }}
                />

                {/* Top card tag */}
                <div className="relative z-10 flex items-center justify-between text-xs font-mono text-secondary">
                  <span>AT.SYIFA</span>
                  <span>EST. 2026</span>
                </div>

                {/* Syifa Portrait photo */}
                <div className="relative z-10 my-auto flex items-center justify-center h-64 overflow-hidden rounded-xl">
                  <img
                    src="/assets/syifa-portrait.png"
                    alt="Syifa Portrait"
                    className="h-full object-contain filter drop-shadow-md group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Subtle floating capy badge */}
                  <div className="absolute -bottom-2 -right-2 w-16 h-16 pointer-events-none">
                    <img 
                      src="/assets/capybara/capy-laptop.png" 
                      alt="Capybara with laptop" 
                      className="w-full h-full object-contain filter drop-shadow-md animate-float-slow"
                    />
                  </div>
                </div>

                {/* Bottom card signature */}
                <div className="relative z-10 pt-2 border-t border-border flex items-center justify-between text-xs font-mono text-muted">
                  <span>Human-Computer Interaction</span>
                  <span>GPA 3.97</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Quick stats ticker */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-10 border-t border-border">
            <div>
              <div className="font-serif text-3xl sm:text-4xl text-foreground">3.97</div>
              <div className="text-xs font-mono text-secondary mt-1">Summa Cum Laude GPA</div>
            </div>
            <div>
              <div className="font-serif text-3xl sm:text-4xl text-foreground">&lt;1.8 KB</div>
              <div className="text-xs font-mono text-secondary mt-1">Published npm Package</div>
            </div>
            <div>
              <div className="font-serif text-3xl sm:text-4xl text-foreground">100%</div>
              <div className="text-xs font-mono text-secondary mt-1">QC &amp; Accessibility Pass</div>
            </div>
            <div>
              <div className="font-serif text-3xl sm:text-4xl text-foreground">3+ Yrs</div>
              <div className="text-xs font-mono text-secondary mt-1">Design &amp; Engineering</div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: ABOUT ME */}
      <section id="about" className="py-24 border-b border-border bg-[#F7F7F5]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-[#171717]" />
            <span className="text-xs uppercase font-mono tracking-widest text-secondary">
              Editorial Profile · Section 02
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5">
              <h2 className="font-serif text-4xl sm:text-5xl text-foreground tracking-tight leading-tight">
                Crafting interfaces with intention, restraint, and architectural clarity.
              </h2>
            </div>

            <div className="lg:col-span-7 space-y-6 text-base sm:text-lg text-secondary leading-relaxed font-light">
              <p>
                Hello! I am <strong className="text-foreground font-medium">Syifa</strong>—a designer and web developer who works at the intersection of aesthetic editorial typography and resilient frontend engineering.
              </p>
              <p>
                My working philosophy is grounded in simplicity: digital tools should feel natural to use, visually calm to explore, and engineered to withstand demanding real-world conditions. Rather than chasing fleeting design gimmicks, I focus on generous whitespace, ergonomic typography, and accessible micro-interactions.
              </p>
              
              {/* Pillars grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                <div className="p-5 rounded-xl bg-surface border border-border">
                  <div className="flex items-center gap-2 mb-2 font-serif text-xl text-foreground">
                    <Compass className="w-5 h-5 text-capy-brown" />
                    <span>Design Philosophy</span>
                  </div>
                  <p className="text-xs font-sans text-secondary leading-normal">
                    Editorial layouts, deliberate whitespace, and accessible typographic scale that respects the user's attention.
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-surface border border-border">
                  <div className="flex items-center gap-2 mb-2 font-serif text-xl text-foreground">
                    <Code className="w-5 h-5 text-capy-blue" />
                    <span>Development Craft</span>
                  </div>
                  <p className="text-xs font-sans text-secondary leading-normal">
                    High-performance React, clean architecture, zero-bloat packages, and 60fps spring physics.
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-surface border border-border">
                  <div className="flex items-center gap-2 mb-2 font-serif text-xl text-foreground">
                    <Layers className="w-5 h-5 text-foreground" />
                    <span>Quality Assurance</span>
                  </div>
                  <p className="text-xs font-sans text-secondary leading-normal">
                    Rigorous cross-browser testing, edge-case mitigation, and strict WCAG accessibility standards.
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-surface border border-border">
                  <div className="flex items-center gap-2 mb-2 font-serif text-xl text-foreground">
                    <BookOpen className="w-5 h-5 text-secondary" />
                    <span>Technical Writing</span>
                  </div>
                  <p className="text-xs font-sans text-secondary leading-normal">
                    Clear API specs, systematic documentation, and distilling complex abstractions into plain words.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: SELECTED WORK */}
      <section id="work" className="py-24 border-b border-border bg-[#F7F7F5]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 pb-6 border-b border-border">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-[#171717]" />
                <span className="text-xs uppercase font-mono tracking-widest text-secondary">
                  Featured Projects · Section 03
                </span>
              </div>
              <h2 className="font-serif text-4xl sm:text-5xl text-foreground tracking-tight">
                Selected Work
              </h2>
            </div>
            <div className="mt-4 sm:mt-0 flex items-center gap-3">
              <Link
                to="/work"
                className="text-xs font-mono uppercase tracking-wider text-secondary hover:text-foreground inline-flex items-center gap-1 group"
              >
                <span>View All Projects ({projects.length})</span>
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </div>
          </div>

          {/* 3-Column Organic Floating Project Gallery */}
          <ProjectGallery projects={projects} />
        </div>
      </section>

      {/* SECTION 4: EXPERIENCE & CONTRIBUTIONS */}
      <section id="experience" className="py-24 border-b border-border bg-[#F7F7F5]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-[#171717]" />
            <span className="text-xs uppercase font-mono tracking-widest text-secondary">
              Professional Journey · Section 04
            </span>
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl text-foreground tracking-tight mb-12">
            Experience &amp; Contributions
          </h2>

          <div className="divide-y divide-border border-y border-border">
            {experiences.map((exp, idx) => (
              <div 
                key={exp.id || idx}
                className="py-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-start group hover:bg-surface/50 transition-colors px-4 -mx-4 rounded-xl"
              >
                {/* Period & Org */}
                <div className="md:col-span-3 space-y-1">
                  <span className="text-xs font-mono text-muted">{exp.date}</span>
                  <div className="font-medium text-foreground text-base">{exp.organization}</div>
                  <div className="text-xs font-mono text-secondary">{exp.role}</div>
                </div>

                {/* Details */}
                <div className="md:col-span-6 space-y-3">
                  <h3 className="font-serif text-2xl text-foreground">{exp.title}</h3>
                  <p className="text-secondary text-sm leading-relaxed font-light">
                    {exp.description}
                  </p>
                  {exp.responsibilities && exp.responsibilities.length > 0 && (
                    <ul className="space-y-1.5 pt-2">
                      {exp.responsibilities.map((resp, i) => (
                        <li key={i} className="text-xs text-secondary flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-muted shrink-0 mt-0.5" />
                          <span>{resp}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Action / Link */}
                <div className="md:col-span-3 flex md:justify-end items-center">
                  {exp.link ? (
                    <a
                      href={exp.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-full border border-border text-xs font-mono text-secondary hover:text-foreground hover:bg-surface transition-all flex items-center gap-1.5"
                    >
                      <span>View Resource</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  ) : (
                    <span className="text-xs font-mono text-muted">Production Verified</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: ACHIEVEMENTS & ACADEMIC HIGHLIGHTS */}
      <section id="achievements" className="py-24 border-b border-border bg-[#F7F7F5]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 pb-6 border-b border-border">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-[#171717]" />
                <span className="text-xs uppercase font-mono tracking-widest text-secondary">
                  Recognition · Section 05
                </span>
              </div>
              <h2 className="font-serif text-4xl sm:text-5xl text-foreground tracking-tight">
                Achievements &amp; Academic Honors
              </h2>
            </div>
            <div className="mt-4 sm:mt-0 text-xs font-mono text-secondary">
              Graduated with Summa Cum Laude Distinction
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {achievements.map((ach) => (
              <div 
                key={ach.id}
                className="bg-surface border border-border rounded-xl p-6 flex flex-col justify-between hover:border-foreground/30 transition-all shadow-sm group"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-muted mb-4">
                    <span>{ach.category}</span>
                    <span>{ach.date}</span>
                  </div>

                  {ach.image && (
                    <div 
                      onClick={() => setModalImage({ src: ach.image, title: ach.title })}
                      className="aspect-video w-full rounded-lg overflow-hidden bg-[#eee] mb-4 cursor-pointer relative group-hover:opacity-90"
                    >
                      <img 
                        src={ach.image} 
                        alt={ach.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-mono">
                        Click to enlarge
                      </div>
                    </div>
                  )}

                  <h3 className="font-serif text-xl text-foreground mb-2 group-hover:text-black">
                    {ach.title}
                  </h3>

                  <p className="text-secondary text-xs leading-relaxed font-sans">
                    {ach.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-border flex items-center justify-between text-[11px] font-mono text-muted">
                  <span>Verified Distinction</span>
                  <Award className="w-3.5 h-3.5 text-capy-brown" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6: VOLUNTEER EXPERIENCE */}
      <section id="volunteer" className="py-24 border-b border-border bg-[#F7F7F5]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-[#171717]" />
            <span className="text-xs uppercase font-mono tracking-widest text-secondary">
              Community · Section 06
            </span>
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl text-foreground tracking-tight mb-12">
            Volunteer Experience
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {volunteer.map((vol) => (
              <div 
                key={vol.id}
                className="bg-surface border border-border rounded-xl p-8 space-y-4 hover:border-foreground/30 transition-all shadow-sm"
              >
                <div className="flex items-center justify-between text-xs font-mono text-muted">
                  <span className="flex items-center gap-1.5 text-secondary">
                    <HeartHandshake className="w-4 h-4 text-capy-pink" />
                    {vol.organization}
                  </span>
                  <span>{vol.date}</span>
                </div>

                <h3 className="font-serif text-2xl text-foreground">{vol.role}</h3>
                
                <p className="text-secondary text-sm leading-relaxed font-light">
                  {vol.description}
                </p>

                {vol.contribution && (
                  <div className="p-4 rounded-lg bg-[#F7F7F5] border border-border/70 text-xs text-foreground font-mono">
                    <strong className="block text-secondary text-[10px] uppercase tracking-wider mb-1">Impact &amp; Contribution:</strong>
                    {vol.contribution}
                  </div>
                )}

                {vol.image && (
                  <div 
                    onClick={() => setModalImage({ src: vol.image, title: `${vol.organization} - ${vol.role}` })}
                    className="aspect-[21/9] w-full rounded-lg overflow-hidden bg-[#eee] cursor-pointer relative group"
                  >
                    <img 
                      src={vol.image} 
                      alt={vol.organization} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-mono">
                      Click to inspect photograph
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7: FEED / ARTICLES (OPTIONAL) */}
      {showFeed && (
        <section id="feed" className="py-24 border-b border-border bg-[#F7F7F5]">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 pb-6 border-b border-border">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2 h-2 rounded-full bg-[#171717]" />
                  <span className="text-xs uppercase font-mono tracking-widest text-secondary">
                    Writing &amp; Research · Section 07
                  </span>
                </div>
                <h2 className="font-serif text-4xl sm:text-5xl text-foreground tracking-tight">
                  Editorial Feed
                </h2>
              </div>
              <div className="mt-4 sm:mt-0">
                <Link
                  to="/feed"
                  className="text-xs font-mono uppercase tracking-wider text-secondary hover:text-foreground inline-flex items-center gap-1 group"
                >
                  <span>Explore All Notes</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {articles.map((art) => (
                <Link 
                  key={art.id}
                  to={`/feed/${art.slug}`}
                  className="bg-surface border border-border rounded-xl p-8 flex flex-col justify-between hover:border-foreground/30 hover:shadow-md transition-all group"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-xs font-mono text-muted">
                      <span>{art.category}</span>
                      <span>{art.readingTime}</span>
                    </div>

                    <h3 className="font-serif text-2xl sm:text-3xl text-foreground group-hover:text-black leading-snug">
                      {art.title}
                    </h3>

                    <p className="text-secondary text-sm leading-relaxed font-light line-clamp-3">
                      {art.description}
                    </p>
                  </div>

                  <div className="pt-6 mt-6 border-t border-border flex items-center justify-between text-xs font-mono text-secondary">
                    <span>{art.publishedAt}</span>
                    <span className="inline-flex items-center gap-1 text-foreground font-medium group-hover:translate-x-1 transition-transform">
                      Read Note →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* SECTION 8: THE CAPYBARA POOL (Interactive feature right before Contact) */}
      <CapybaraPool />

      {/* SECTION 9: CONTACT */}
      <section id="contact" className="py-28 bg-[#171717] text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
            <div className="lg:col-span-8 space-y-6">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#B8DDE8]" />
                <span className="text-xs uppercase font-mono tracking-widest text-[#A1A1A1]">
                  Initiate Contact · Section 09
                </span>
              </div>

              <h2 className="font-serif text-5xl sm:text-7xl lg:text-8xl text-white font-normal tracking-tight leading-[1.05]">
                Have something in mind?
              </h2>

              <p className="font-sans text-[#A1A1A1] text-lg sm:text-xl font-light max-w-xl leading-relaxed">
                Let's make something meaningful together. Whether it's an ambitious digital product, a design system, or a technical inquiry.
              </p>

              <div className="pt-4 flex flex-wrap gap-4">
                <a
                  href="mailto:syifa@example.com"
                  className="px-8 py-4 rounded-full bg-white text-[#171717] hover:bg-[#eaeae7] transition-all font-medium text-sm inline-flex items-center gap-2 shadow-lg"
                >
                  <Mail className="w-4 h-4" />
                  <span>Send an Email</span>
                </a>
                <a
                  href="https://linkedin.com/in/syifa-portfolio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 rounded-full border border-white/20 hover:border-white/50 text-white transition-all font-medium text-sm inline-flex items-center gap-2"
                >
                  <Linkedin className="w-4 h-4" />
                  <span>Connect on LinkedIn</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-4 space-y-6 border-t lg:border-t-0 lg:border-l border-white/10 pt-8 lg:pt-0 lg:pl-12">
              <div className="space-y-2">
                <div className="text-xs font-mono text-[#A1A1A1] uppercase tracking-wider">Direct Inbox</div>
                <div className="font-sans text-sm text-white">syifa@example.com</div>
              </div>

              <div className="space-y-2">
                <div className="text-xs font-mono text-[#A1A1A1] uppercase tracking-wider">Availability Status</div>
                <div className="flex items-center gap-2 text-sm text-emerald-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Available for high-impact roles</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-xs font-mono text-[#A1A1A1] uppercase tracking-wider">Response Window</div>
                <div className="text-xs text-[#A1A1A1]">Usually within 24–48 hours</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {modalImage && (
        <ImageModal
          isOpen={!!modalImage}
          src={modalImage.src}
          alt={modalImage.title}
          caption={modalImage.title}
          onClose={() => setModalImage(null)}
        />
      )}
    </div>
  );
}
