import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Github, CheckCircle2, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { portfolioApi } from '../services/api';
import { initialProjects } from '../data/portfolioData';

export default function ProjectDetailPage() {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);
    portfolioApi.getProjectBySlug(slug)
      .then((data) => {
        setProject(data);
      })
      .catch((err) => {
        // Fallback to local data
        const local = initialProjects.find((p) => p.slug === slug || p.id === slug);
        if (local) {
          setProject(local);
        } else {
          setError(`Project '${slug}' could not be located.`);
        }
      })
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen pt-40 pb-20 max-w-4xl mx-auto px-6 text-center">
        <div className="font-mono text-sm text-secondary animate-pulse">Loading case study...</div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen pt-40 pb-20 max-w-4xl mx-auto px-6 text-center">
        <AlertCircle className="w-12 h-12 text-secondary mx-auto mb-4" />
        <h1 className="font-serif text-3xl text-foreground mb-4">Project Not Found</h1>
        <p className="text-secondary text-sm mb-8">{error || 'The requested project could not be found.'}</p>
        <Link
          to="/work"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#171717] text-white text-xs font-mono"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to All Work</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 min-h-screen">
      <div className="max-w-5xl mx-auto px-6 sm:px-8 md:px-12">
        {/* Back Navigation */}
        <div className="mb-10">
          <Link
            to="/work"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-secondary hover:text-foreground transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to All Projects</span>
          </Link>
        </div>

        {/* Header Metadata */}
        <div className="border-b border-border pb-8 mb-12">
          <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-muted mb-4">
            <span className="px-2.5 py-0.5 rounded-full bg-surface border border-border text-foreground">
              {project.category}
            </span>
            <span>•</span>
            <span>Year: {project.year}</span>
            <span>•</span>
            <span>Role: {project.role}</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl text-foreground tracking-tight leading-tight mb-6">
            {project.title}
          </h1>

          <p className="text-secondary text-lg sm:text-xl font-light leading-relaxed max-w-3xl">
            {project.description}
          </p>

          {/* Links Bar */}
          <div className="pt-6 flex flex-wrap gap-4">
            {project.links?.live && (
              <a
                href={project.links.live}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#171717] text-white hover:bg-[#333] transition-colors text-xs font-mono"
              >
                <span>Live Experience</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
            {project.links?.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-border bg-surface hover:bg-[#f0f0ee] transition-colors text-xs font-mono text-foreground"
              >
                <Github className="w-3.5 h-3.5" />
                <span>Source Code</span>
              </a>
            )}
          </div>
        </div>

        {/* Hero Preview Visual */}
        <div className="w-full aspect-[16/9] rounded-2xl overflow-hidden border border-border bg-[#171717] shadow-xl mb-16">
          <img
            src={project.thumbnail}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content Breakdown Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Case Study Column */}
          <div className="lg:col-span-8 space-y-12">
            {/* Overview */}
            {project.overview && (
              <section className="space-y-4">
                <h2 className="font-serif text-3xl text-foreground">Project Overview</h2>
                <p className="text-secondary text-base leading-relaxed font-light">
                  {project.overview}
                </p>
              </section>
            )}

            {/* Problem Statement */}
            {project.problem && (
              <section className="space-y-4 p-6 rounded-xl bg-surface border border-border">
                <h3 className="font-serif text-2xl text-foreground">The Challenge</h3>
                <p className="text-secondary text-sm leading-relaxed font-light">
                  {project.problem}
                </p>
              </section>
            )}

            {/* Process */}
            {project.process && project.process.length > 0 && (
              <section className="space-y-4">
                <h2 className="font-serif text-3xl text-foreground">Engineering &amp; Design Process</h2>
                <div className="space-y-3">
                  {project.process.map((step, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-4 rounded-lg bg-surface border border-border/80">
                      <span className="font-mono text-xs text-muted font-bold shrink-0 mt-0.5">0{idx + 1}.</span>
                      <p className="text-secondary text-sm leading-relaxed">{step}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Outcomes */}
            {project.outcomes && project.outcomes.length > 0 && (
              <section className="space-y-4">
                <h2 className="font-serif text-3xl text-foreground">Outcomes &amp; Impact</h2>
                <div className="grid grid-cols-1 gap-3">
                  {project.outcomes.map((outcome, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-4 rounded-lg bg-surface border border-border">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <p className="text-foreground text-sm font-medium">{outcome}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar Specs */}
          <div className="lg:col-span-4 space-y-8">
            {/* Technologies */}
            <div className="p-6 rounded-xl bg-surface border border-border space-y-4">
              <h4 className="text-xs uppercase font-mono tracking-widest text-secondary">Technologies Used</h4>
              <div className="flex flex-wrap gap-2">
                {project.technologies?.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 rounded text-xs font-mono bg-background border border-border text-foreground"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Responsibilities */}
            {project.responsibilities && (
              <div className="p-6 rounded-xl bg-surface border border-border space-y-4">
                <h4 className="text-xs uppercase font-mono tracking-widest text-secondary">Responsibilities</h4>
                <ul className="space-y-2 text-xs font-sans text-secondary">
                  {project.responsibilities.map((r, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-muted">•</span>
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
