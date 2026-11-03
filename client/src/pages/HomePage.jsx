import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Award, CheckCircle2 } from 'lucide-react';
import HeroCardStack from '../components/home/HeroCardStack';
import KineticMarquee from '../components/home/KineticMarquee';
import ProcessTimeline from '../components/home/ProcessTimeline';
import FaqAccordion from '../components/home/FaqAccordion';
import CapybaraPool from '../components/capybara/CapybaraPool';
import ImageModal from '../components/common/ImageModal';
import { initialProjects } from '../data/portfolioData';
import { portfolioApi } from '../services/api';

export default function HomePage() {
  const [projects, setProjects] = useState(initialProjects);
  const [achievements, setAchievements] = useState([]);
  const [modalImage, setModalImage] = useState(null);

  useEffect(() => {
    portfolioApi.getProjects().then((data) => data && setProjects(data)).catch(() => {});
    portfolioApi.getAchievements().then((data) => data && setAchievements(data)).catch(() => {});
  }, []);

  return (
    <div className="w-full bg-white text-foreground">
      {/* 1. HERO SECTION (matches landingpage.mp4 frame_01) */}
      <section className="relative min-h-[92vh] pt-28 pb-12 px-8 md:px-12 flex flex-col justify-between overflow-hidden">
        {/* Top Header Row */}
        <div className="flex flex-col md:flex-row items-start justify-between gap-6 z-20">
          <div className="max-w-md">
            <p className="text-secondary text-sm md:text-base font-normal leading-relaxed">
              <strong className="text-foreground font-bold">at.syifa®</strong> — a design studio shaping brands and digital experiences through motion, clarity, and timeless craft. Based online, working globally, we help ambitious teams express who they are and what they stand for.
            </p>
          </div>
          <div className="font-bold text-xs md:text-sm tracking-widest text-foreground">
            © 2024-26
          </div>
        </div>

        {/* Center Typography & Interactive Card Deck */}
        <div className="relative my-8 py-6 w-full flex flex-col items-center justify-center select-none">
          {/* Massive Display Title */}
          <h1 className="text-[15vw] font-extrabold tracking-tightest text-foreground uppercase leading-none text-center w-full">
            at.syifa®
          </h1>

          {/* Floating Interactive Card Deck (fans out on hover) */}
          <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-auto">
            <HeroCardStack />
          </div>
        </div>

        {/* Bottom Bar: Action prompt & live clock */}
        <div className="flex items-center justify-between text-xs font-bold uppercase tracking-widest text-muted z-20">
          <Link
            to="/work"
            className="text-foreground hover:opacity-60 transition-opacity flex items-center gap-2"
          >
            <span>Explore Selected Projects</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <div className="hidden sm:block">
            SUMMA CUM LAUDE · GPA 3.97
          </div>
        </div>
      </section>

      {/* 2. KINETIC MARQUEE SECTION (matches landingpage.mp4 frame_10) */}
      <KineticMarquee />

      {/* 3. OUR SERVICES (matches landingpage.mp4 frame_12) */}
      <section className="py-24 border-b border-border px-8 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Sticky Prompt */}
          <div className="lg:col-span-4 space-y-6">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-foreground">
              Our Services
            </h2>
            <p className="text-secondary text-sm font-normal max-w-xs leading-relaxed">
              If you're looking for clarity in design and resilient engineering, let's build it together.
            </p>
            <div>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 font-bold text-lg text-foreground hover:translate-x-1 transition-transform"
              >
                <span>Get Started</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Right Services List */}
          <div className="lg:col-span-8 space-y-16">
            <div className="space-y-4">
              <h3 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-foreground">
                A/ We guide ideas from concept to execution, shaping visual and narrative direction for consistent expression across every touchpoint.
              </h3>
              <div className="flex flex-wrap gap-2 pt-2">
                {['Visual Direction', 'Campaign Concepts', 'Art Direction for Digital Products', 'Design Tokens', 'Design Systems'].map((pill) => (
                  <span key={pill} className="px-4 py-1.5 rounded-full bg-[#F4F4F2] text-xs font-bold text-foreground">
                    {pill}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-foreground">
                B/ We engineer high-performance web applications that move with intention, combining fluid spring physics with rock-solid reliability.
              </h3>
              <div className="flex flex-wrap gap-2 pt-2">
                {['React.js Architecture', 'TypeScript', 'Framer Motion', 'Micro-interactions', 'Published npm Packages'].map((pill) => (
                  <span key={pill} className="px-4 py-1.5 rounded-full bg-[#F4F4F2] text-xs font-bold text-foreground">
                    {pill}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-foreground">
                C/ We audit quality control and accessibility to ensure every interaction meets WCAG AAA standards across all devices.
              </h3>
              <div className="flex flex-wrap gap-2 pt-2">
                {['Quality Assurance (QC)', 'WCAG AAA Auditing', 'Cross-Browser Hardening', 'Stress Testing'].map((pill) => (
                  <span key={pill} className="px-4 py-1.5 rounded-full bg-[#F4F4F2] text-xs font-bold text-foreground">
                    {pill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SELECTED PROJECTS PREVIEW */}
      <section className="py-24 border-b border-border px-8 md:px-12 bg-[#FAFAF9]">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-border">
          <div>
            <div className="text-xs uppercase font-bold tracking-widest text-muted mb-2">Featured Work</div>
            <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tightest uppercase text-foreground">
              Selected Projects
            </h2>
          </div>
          <Link
            to="/work"
            className="mt-4 md:mt-0 font-bold text-sm text-foreground hover:opacity-60 transition-opacity flex items-center gap-1.5"
          >
            <span>View All Works ({projects.length})</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.slice(0, 3).map((proj) => (
            <Link
              key={proj.id}
              to={`/work/${proj.slug}`}
              className="group bg-white rounded-2xl overflow-hidden border border-border hover:border-black transition-colors flex flex-col shadow-sm"
            >
              <div className="aspect-[16/10] bg-black overflow-hidden relative">
                <img
                  src={proj.thumbnail}
                  alt={proj.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6 flex flex-col flex-grow justify-between">
                <div>
                  <div className="text-xs uppercase font-bold text-muted mb-1">{proj.category}</div>
                  <h3 className="text-2xl font-extrabold tracking-tight text-foreground mb-2 group-hover:text-black">
                    {proj.title}
                  </h3>
                  <p className="text-secondary text-sm line-clamp-2">{proj.description}</p>
                </div>
                <div className="pt-4 mt-4 border-t border-border flex items-center justify-between text-xs font-bold uppercase tracking-wider text-foreground">
                  <span>View Case Study</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 5. THE PROCESS GANTT TIMELINE (matches landingpage.mp4 frame_20) */}
      <ProcessTimeline />

      {/* 6. ACHIEVEMENTS & ACADEMIC HIGHLIGHTS */}
      <section className="py-24 border-b border-border px-8 md:px-12 bg-white">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 pb-6 border-b border-border">
          <div>
            <div className="text-xs uppercase font-bold tracking-widest text-muted mb-2">Excellence</div>
            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground">
              Academic Honors &amp; Recognition
            </h2>
          </div>
          <div className="mt-4 sm:mt-0 font-bold text-sm text-secondary">
            GPA 3.97 · Summa Cum Laude
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {achievements.map((ach) => (
            <div
              key={ach.id}
              className="p-6 rounded-2xl bg-surface border border-border flex flex-col justify-between group hover:border-black transition-colors"
            >
              <div>
                <div className="text-xs uppercase font-bold text-muted mb-3 flex items-center justify-between">
                  <span>{ach.category}</span>
                  <span>{ach.date}</span>
                </div>

                {ach.image && (
                  <div
                    onClick={() => setModalImage({ src: ach.image, title: ach.title })}
                    className="aspect-video w-full rounded-xl overflow-hidden bg-stone-100 mb-4 cursor-pointer relative group-hover:opacity-90 transition-opacity"
                  >
                    <img
                      src={ach.image}
                      alt={ach.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>
                )}

                <h3 className="font-extrabold text-xl text-foreground mb-2">
                  {ach.title}
                </h3>
                <p className="text-secondary text-xs leading-relaxed">
                  {ach.description}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-border flex items-center justify-between text-xs font-bold text-muted">
                <span>Verified</span>
                <Award className="w-4 h-4 text-black" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. FAQ ACCORDION (matches landingpage.mp4 frame_24) */}
      <FaqAccordion />

      {/* 8. THE CAPYBARA POOL (Interactive feature right before Contact) */}
      <CapybaraPool />

      {/* Image Modal Lightbox */}
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
