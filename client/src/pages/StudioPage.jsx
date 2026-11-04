import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Award, GraduationCap, HeartHandshake, CheckCircle2 } from 'lucide-react';
import { portfolioApi } from '../services/api';
import ImageModal from '../components/common/ImageModal';

export default function StudioPage() {
  const [achievements, setAchievements] = useState([]);
  const [volunteer, setVolunteer] = useState([]);
  const [modalImage, setModalImage] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    portfolioApi.getAchievements().then((data) => data && setAchievements(data)).catch(() => {});
    portfolioApi.getVolunteer().then((data) => data && setVolunteer(data)).catch(() => {});
  }, []);

  return (
    <div className="pt-28 pb-24 min-h-screen bg-white">
      <div className="w-full px-8 md:px-12">
        {/* Massive Studio Header */}
        <div className="mb-16 select-none border-b border-border pb-16">
          <h1 className="text-[12vw] font-extrabold tracking-tightest text-foreground uppercase leading-none mb-8">
            We are <br />at.syifa®
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Prompt */}
            <div className="lg:col-span-4 space-y-4">
              <p className="text-secondary text-sm font-normal max-w-xs">
                Do you feel ready to collaborate on something memorable?
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 font-bold text-lg md:text-xl text-foreground hover:translate-x-1 transition-transform"
              >
                <span>Join Us</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            {/* Right Philosophy Narrative */}
            <div className="lg:col-span-8 space-y-6 text-lg sm:text-xl text-secondary font-normal leading-relaxed">
              <p>
                <strong className="text-foreground font-bold">at.syifa®</strong> is a design studio built around clarity, intention, and craft. We believe that strong ideas come from thoughtful collaboration, steady focus, and an honest approach to problem-solving. Every project starts with understanding — the people, the context, and the possibilities — before anything is designed.
              </p>
              <p>
                We shape brands and digital experiences that feel precise, adaptable, and meaningful. Our goal is simple: create work that lasts, grows, and continues to make sense long after launch.
              </p>
            </div>
          </div>
        </div>

        {/* Studio Principles & Services */}
        <div className="py-16 border-b border-border">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4">
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
                Our Services
              </h2>
            </div>
            <div className="lg:col-span-8 space-y-12">
              <div className="space-y-4">
                <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
                  A/ User Interface &amp; Product Architecture
                </h3>
                <p className="text-secondary text-base leading-relaxed">
                  We guide digital products from concept to execution, shaping visual design systems and fluid user journeys that feel effortless across web and mobile surfaces.
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  {['Visual Direction', 'Design Systems', 'Interactive Prototyping', 'Component Tokenization'].map((t) => (
                    <span key={t} className="px-3.5 py-1.5 rounded-full bg-[#F4F4F2] text-xs font-bold text-foreground">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
                  B/ Modern Frontend Engineering
                </h3>
                <p className="text-secondary text-base leading-relaxed">
                  High-performance React architectures, lightweight zero-dependency physics animation solvers, canvas workflows, and resilient API integrations.
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  {['React & Vite', 'TypeScript', 'Framer Motion', 'Canvas 2D/3D', 'Physics Engines'].map((t) => (
                    <span key={t} className="px-3.5 py-1.5 rounded-full bg-[#F4F4F2] text-xs font-bold text-foreground">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
                  C/ Quality Control &amp; Accessibility (QC)
                </h3>
                <p className="text-secondary text-base leading-relaxed">
                  Cross-browser compatibility testing, layout stress testing, responsive breakpoint hardening from 360px to 4K, and WCAG AA/AAA conformance audits.
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  {['Regression QA', 'WCAG AAA Compliance', 'Cross-Browser Testing', 'Performance Profiling'].map((t) => (
                    <span key={t} className="px-3.5 py-1.5 rounded-full bg-[#F4F4F2] text-xs font-bold text-foreground">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Academic Achievements & Honors (GPA 3.97 Summa Cum Laude) */}
        <div className="py-20 border-b border-border">
          <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between">
            <div>
              <div className="text-xs uppercase font-bold tracking-widest text-muted mb-2">Recognition</div>
              <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground">
                Academic Honors &amp; Awards
              </h2>
            </div>
            <div className="mt-4 md:mt-0 font-bold text-sm text-secondary">
              Graduated with Highest Distinction (GPA 3.97)
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
        </div>

        {/* Volunteer & Community */}
        <div className="py-20">
          <div className="mb-12">
            <div className="text-xs uppercase font-bold tracking-widest text-muted mb-2">Community Impact</div>
            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground">
              Volunteer Experience
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {volunteer.map((vol) => (
              <div key={vol.id} className="bg-surface rounded-2xl overflow-hidden border border-border hover:border-black transition-colors flex flex-col shadow-sm">
                {vol.image && (
                  <div 
                    onClick={() => setModalImage({ src: vol.image, title: `${vol.organization} - ${vol.role}` })}
                    className="aspect-[3/4] w-full overflow-hidden bg-stone-100 cursor-pointer"
                  >
                    <img 
                      src={vol.image} 
                      alt={vol.organization} 
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                <div className="p-6 space-y-3 flex-grow flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-xs uppercase font-bold text-muted mb-2">
                      <span className="text-foreground">{vol.role}</span>
                      <span>{vol.date}</span>
                    </div>
                    <h3 className="font-extrabold text-xl text-foreground mb-1">{vol.organization}</h3>
                    <p className="text-secondary text-sm leading-relaxed">{vol.description}</p>
                  </div>
                  {vol.contribution && (
                    <div className="p-3 rounded-lg bg-white border border-border/60 text-xs text-foreground font-mono">
                      <strong className="block text-muted text-[10px] uppercase mb-0.5">Impact:</strong>
                      {vol.contribution}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

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
