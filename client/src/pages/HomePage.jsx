import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Award } from 'lucide-react';
import HeroCardStack from '../components/home/HeroCardStack';
import KineticMarquee from '../components/home/KineticMarquee';
import ProcessTimeline from '../components/home/ProcessTimeline';
import FaqAccordion from '../components/home/FaqAccordion';
import VolunteerSection from '../components/home/VolunteerSection';
import StackedSection from '../components/home/StackedSection';
import CapybaraPool from '../components/capybara/CapybaraPool';
import ImageModal from '../components/common/ImageModal';
import { initialProjects, initialVolunteers } from '../data/portfolioData';
import { portfolioApi } from '../services/api';
import initialAchievements from '../../../server/data/achievements.json';

export default function HomePage() {
  const [projects, setProjects] = useState(initialProjects);
  const [achievements, setAchievements] = useState([]);
  const [volunteer, setVolunteer] = useState(initialVolunteers);
  const [modalImage, setModalImage] = useState(null);

  useEffect(() => {
    portfolioApi.getProjects()
      .then((data) => data && data.length > 0 && setProjects(data))
      .catch(() => {});

    portfolioApi.getAchievements()
      .then((data) => data && data.length > 0 && setAchievements(data))
      .catch(() => {});
  }, []);

  return (
    <div className="w-full bg-white text-foreground">
      {/* 1. HERO SECTION (matches landingpage.mp4 frame_01) */}
      <section className="relative min-h-[92vh] pt-28 pb-12 px-8 md:px-12 flex flex-col justify-between overflow-hidden">
        {/* Top Header Row */}
        <div className="flex flex-col md:flex-row items-start justify-between gap-6 z-20">
          <div className="max-w-md">
            <p className="text-secondary text-sm md:text-base font-normal leading-relaxed">
              <strong className="text-foreground font-bold">Hi, I'm Syifa!</strong> A designer and developer who enjoys turning ideas into thoughtful digital experiences. I explore the space between design, technology, and the little details that make products feel right.
            </p>
          </div>
          <div className="font-bold text-xs md:text-sm tracking-widest text-foreground">
            © 2026
          </div>
        </div>

        {/* Center Typography & Interactive Card Deck */}
        <div className="relative my-8 py-6 w-full flex flex-col items-center justify-center select-none">
          {/* Massive Display Title */}
          <h1 className="text-[15vw] font-extrabold tracking-tightest text-foreground uppercase leading-none text-center w-full">
            at.syifa
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
            Cumulative GPA 3.98
          </div>
        </div>
      </section>

      {/* 2. KINETIC MARQUEE SECTION (matches landingpage.mp4 frame_10) */}
      <KineticMarquee />

      {/* 3. SERVICES I OFFER */}
      <section className="py-24 border-b border-border px-8 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Sticky Prompt */}
          <div className="lg:col-span-4 space-y-6">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-foreground">
              What I Do
            </h2>
            <p className="text-secondary text-sm font-normal max-w-xs leading-relaxed">
              I enjoy working across different parts of the digital product process, from making sense of an idea to shaping the interface and checking that everything works as it should.
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
                Interface &amp; Experience Design
              </h3>
              <p className="text-secondary text-sm font-normal max-w-xl leading-relaxed">
                I turn ideas and requirements into clear, thoughtful interfaces. I care about visual hierarchy, usability, and the small details that make digital experiences easier to navigate.
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                {['UI Design', 'Wireframing', 'Prototyping', 'Visual Design', 'Design Systems'].map((pill) => (
                  <span key={pill} className="px-4 py-1.5 rounded-full bg-[#F4F4F2] text-xs font-bold text-foreground">
                    {pill}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-foreground">
                Web Development
              </h3>
              <p className="text-secondary text-sm font-normal max-w-xl leading-relaxed">
                I enjoy bringing designs to life through code, experimenting with interactions, and building responsive experiences. I'm especially interested in how thoughtful implementation can make an interface feel more engaging.
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                {['React JavaScript', 'Express.js', 'Tailwind CSS', 'npm Package Development'].map((pill) => (
                  <span key={pill} className="px-4 py-1.5 rounded-full bg-[#F4F4F2] text-xs font-bold text-foreground">
                    {pill}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-foreground">
                Quality &amp; Documentation
              </h3>
              <p className="text-secondary text-sm font-normal max-w-xl leading-relaxed">
                My experience in quality control and technical writing has taught me to look beyond how something looks. I pay attention to functionality, consistency, clarity, and how people understand and use a product.
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                {['Quality Control', 'Testing', 'Technical Writing', 'Documentation', 'Attention to Detail'].map((pill) => (
                  <span key={pill} className="px-4 py-1.5 rounded-full bg-[#F4F4F2] text-xs font-bold text-foreground">
                    {pill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. OVERLAPPING STACKED SECTIONS: Selected Work through FAQ */}
      <div className="relative w-full">
        {/* Layer 1: Selected Work */}
        <StackedSection index={0} total={5} id="work" bgColor="bg-[#FAFAF9]">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14">
            <div>
              <div className="text-xs uppercase font-bold tracking-widest text-muted mb-3">
                A Few Things I've Worked On
              </div>
              <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tightest uppercase text-foreground">
                Selected Work
              </h2>
            </div>
            <Link
              to="/work"
              className="mt-4 md:mt-0 font-bold text-sm text-foreground hover:opacity-60 transition-opacity flex items-center gap-1.5"
            >
              <span>Explore All Projects ({projects.length})</span>
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
                <div className="aspect-[16/10] bg-stone-100 overflow-hidden relative">
                  <img
                    src={proj.thumbnail}
                    alt={proj.title}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <div className="p-6 flex flex-col flex-grow justify-between">
                  <div>
                    <div className="text-xs uppercase font-bold text-muted mb-1">
                      {proj.category}
                    </div>
                    <h3 className="text-2xl font-extrabold tracking-tight text-foreground mb-2 group-hover:text-black">
                      {proj.title}
                    </h3>
                    <p className="text-secondary text-sm line-clamp-2">
                      {proj.description}
                    </p>
                  </div>
                  <div className="pt-4 mt-4 border-t border-border flex items-center justify-between text-xs font-bold uppercase tracking-wider text-foreground">
                    <span>Take a Closer Look</span>
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </StackedSection>

        {/* Layer 2: Process Timeline */}
        <StackedSection index={1} total={5} id="timeline" bgColor="bg-white">
          <div className="mb-10">
            <div className="text-xs uppercase font-bold tracking-widest text-muted mb-3">
              Process &amp; Cadence
            </div>
            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground">
              How I Approach Building
            </h2>
          </div>
          <ProcessTimeline />
        </StackedSection>

        {/* Layer 3: Academic Highlights & Recognition */}
        <StackedSection index={2} total={5} id="achievements" bgColor="bg-[#FAFAF9]">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12">
            <div>
              <div className="text-xs uppercase font-bold tracking-widest text-muted mb-3">
                A Little Progress Along the Way
              </div>
              <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground">
                Academic Highlights &amp; Recognition
              </h2>
              <p className="text-secondary mt-3 text-sm font-normal max-w-xl leading-relaxed">
                Some milestones I'm proud of, from academic achievements to opportunities that challenged me to learn, grow, and try something new.
              </p>
            </div>
            <div className="mt-4 sm:mt-0 font-bold text-sm text-secondary">
              Cumulative GPA 3.98
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {achievements.map((ach) => (
              <div
                key={ach.id}
                className="p-6 rounded-2xl bg-white border border-border flex flex-col justify-between group hover:border-black transition-colors shadow-sm"
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
        </StackedSection>

        {/* Layer 4: Volunteer Experience (BEYOND THE SCREEN - Placement immediately after Achievements & before FAQ) */}
        <StackedSection index={3} total={5} id="volunteer" bgColor="bg-white">
          <VolunteerSection volunteer={volunteer} />
        </StackedSection>

        {/* Layer 5: Questions / FAQ */}
        <StackedSection index={4} total={5} id="faq" bgColor="bg-[#FAFAF9]">
          <FaqAccordion />
        </StackedSection>
      </div>

      {/* 5. THE CAPYBARA POOL (Signature interactive pool before contact, non-stacked) */}
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
