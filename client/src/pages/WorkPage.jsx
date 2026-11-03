import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { portfolioApi } from '../services/api';
import { initialProjects } from '../data/portfolioData';
import ProjectCard from '../components/projects/ProjectCard';

export default function WorkPage() {
  const [projects, setProjects] = useState(initialProjects);
  const [activeCategory, setActiveCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    portfolioApi.getProjects()
      .then((data) => {
        if (data && data.length > 0) setProjects(data);
      })
      .catch((err) => console.warn('Loaded initial projects fallback'))
      .finally(() => setLoading(false));
  }, []);

  const categories = ['All', ...new Set(projects.map((p) => p.category))];

  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects.filter((p) => p.category === activeCategory);

  return (
    <div className="pt-32 pb-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12">
        {/* Navigation Breadcrumb */}
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-secondary hover:text-foreground transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Return to Studio Homepage</span>
          </Link>
        </div>

        {/* Header */}
        <div className="border-b border-border pb-10 mb-12">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-[#171717]" />
            <span className="text-xs uppercase font-mono tracking-widest text-secondary">
              Archive &amp; Case Studies
            </span>
          </div>
          <h1 className="font-serif text-5xl sm:text-6xl text-foreground tracking-tight mb-4">
            All Works &amp; Systems
          </h1>
          <p className="text-secondary text-base max-w-xl font-light">
            A comprehensive index of user interfaces, interactive applications, open-source utilities, and architectural design systems.
          </p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2 pt-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-mono transition-all ${
                  activeCategory === cat
                    ? 'bg-[#171717] text-white shadow-sm'
                    : 'bg-surface border border-border text-secondary hover:text-foreground hover:bg-[#eee]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, idx) => (
            <ProjectCard key={project.id || idx} project={project} columnOffset={idx % 3} />
          ))}
        </div>
      </div>
    </div>
  );
}
