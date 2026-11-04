import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Github, CheckCircle2, Figma } from 'lucide-react';
import { initialProjects } from '../data/portfolioData';
import { portfolioApi } from '../services/api';

export default function ProjectDetailPage() {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);
    portfolioApi.getProjectBySlug(slug)
      .then((data) => setProject(data))
      .catch(() => {
        const fallback = initialProjects.find((p) => p.slug === slug || p.id === slug);
        setProject(fallback);
      })
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen pt-40 px-8 md:px-12 text-center font-bold text-sm">
        Loading case study...
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen pt-40 px-8 md:px-12 text-center">
        <h1 className="text-4xl font-extrabold mb-4">Project Not Found</h1>
        <Link to="/work" className="text-sm font-bold underline">Return to Work</Link>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-24 min-h-screen bg-white">
      <div className="w-full px-8 md:px-12">
        {/* Breadcrumb Return */}
        <div className="mb-8">
          <Link
            to="/work"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted hover:text-foreground transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Return to Work</span>
          </Link>
        </div>

        {/* Möbius-Style Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Visual Column */}
          <div className="lg:col-span-6 relative">
            <div className="w-full aspect-[16/10] sm:aspect-[4/3] rounded-2xl overflow-hidden bg-neutral-900 border border-border shadow-xl relative flex items-center justify-center p-2">
              <img
                src={project.thumbnail}
                alt={project.title}
                className="w-full h-full object-contain rounded-xl"
              />
            </div>
            {/* Year Watermark in corner */}
            <div className="text-8xl sm:text-9xl font-extrabold tracking-tightest text-[#ECECEC] select-none mt-4">
              '{project.year?.slice(-2) || '26'}
            </div>
          </div>

          {/* Right Text Column */}
          <div className="lg:col-span-6 space-y-8 pt-4">
            <div>
              <div className="text-xs uppercase font-bold tracking-widest text-muted mb-2">
                {project.category} · {project.role}
              </div>
              <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tightest text-foreground leading-[1.05] mb-6">
                {project.title}
              </h1>
              <p className="text-secondary text-lg sm:text-xl font-normal leading-relaxed">
                {project.overview || project.description}
              </p>
            </div>

            {/* Action Buttons */}
            {(project.links?.live || project.links?.github || project.links?.figma) && (
              <div className="flex flex-wrap gap-3 pt-2">
                {project.links?.live && (
                  <a
                    href={project.links.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 rounded-full bg-black text-white hover:bg-neutral-800 transition-colors text-xs font-bold uppercase tracking-wider inline-flex items-center gap-2"
                  >
                    <span>Live Project</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
                {project.links?.figma && (
                  <a
                    href={project.links.figma}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 rounded-full bg-[#1E1E1E] text-white hover:bg-black transition-colors text-xs font-bold uppercase tracking-wider inline-flex items-center gap-2"
                    title="Open design file in Figma"
                  >
                    {/* Figma logo inline SVG */}
                    <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 38 57" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0z" fill="#1ABCFE"/>
                      <path d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 0 1-19 0z" fill="#0ACF83"/>
                      <path d="M19 0v19h9.5a9.5 9.5 0 0 0 0-19H19z" fill="#FF7262"/>
                      <path d="M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5z" fill="#F24E1E"/>
                      <path d="M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5z" fill="#A259FF"/>
                    </svg>
                    <span>View in Figma</span>
                  </a>
                )}
                {project.links?.github && (
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 rounded-full border border-black hover:bg-black hover:text-white transition-colors text-xs font-bold uppercase tracking-wider inline-flex items-center gap-2"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>Repository</span>
                  </a>
                )}
              </div>
            )}

            {/* Problem Statement */}
            {project.problem && (
              <div className="p-6 rounded-2xl bg-[#F7F7F5] border border-border/60 space-y-2">
                <h3 className="font-bold text-sm uppercase tracking-wider text-muted">The Problem</h3>
                <p className="text-foreground text-sm sm:text-base leading-relaxed">
                  {project.problem}
                </p>
              </div>
            )}

            {/* Process Steps */}
            {project.process && project.process.length > 0 && (
              <div className="space-y-4 pt-4">
                <h3 className="font-extrabold text-2xl tracking-tight text-foreground">Execution Process</h3>
                <div className="space-y-2.5">
                  {project.process.map((step, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-4 rounded-xl border border-border">
                      <span className="font-mono text-xs font-bold text-muted mt-0.5">0{idx + 1}</span>
                      <p className="text-sm text-foreground font-medium leading-relaxed">{step}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Outcomes */}
            {project.outcomes && (
              <div className="space-y-3 pt-4">
                <h3 className="font-extrabold text-2xl tracking-tight text-foreground">Outcomes &amp; Impact</h3>
                <div className="space-y-2">
                  {project.outcomes.map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm font-semibold text-foreground">
                      <CheckCircle2 className="w-4 h-4 text-black shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Full High-Resolution Artifact Gallery */}
            {project.screenshots && project.screenshots.length > 0 && (
              <div className="space-y-4 pt-6 border-t border-border">
                <h3 className="font-extrabold text-xl tracking-tight text-foreground">Project Gallery</h3>
                <div className="grid grid-cols-1 gap-4">
                  <a 
                    href={project.links?.figma || project.links?.github || project.links?.live} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-sm font-bold underline"
                  >
                    View the Full Project in {project.links?.figma ? 'Figma' : project.links?.github ? 'GitHub' : 'npm'}
                  </a>
                </div>
              </div>
            )}

            {/* Bottom Tag List (matches frame_06) */}
            <div className="pt-8 border-t border-border text-xs uppercase font-bold tracking-wider text-muted leading-relaxed">
              {project.technologies ? project.technologies.join(', ') : 'UI Architecture, Frontend Engineering, Motion Design'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
