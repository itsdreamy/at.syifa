import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ProjectCard({ project, columnOffset = 0 }) {
  const [isHovered, setIsHovered] = useState(false);

  // Staggered floating movement based on column offset
  const floatVariants = {
    animate: {
      y: [0, columnOffset % 2 === 0 ? -8 : 8, 0],
      transition: {
        duration: 5.5 + (columnOffset * 0.8),
        repeat: Infinity,
        ease: 'easeInOut',
      }
    },
    hover: {
      y: 0,
      scale: 1.015,
      transition: { duration: 0.25, ease: 'easeOut' }
    }
  };

  return (
    <motion.div
      variants={floatVariants}
      animate={isHovered ? 'hover' : 'animate'}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group flex flex-col h-full bg-surface border border-border rounded-xl overflow-hidden transition-shadow duration-300 hover:shadow-lg hover:border-[#171717]/30"
    >
      <Link to={`/work/${project.slug}`} className="flex flex-col h-full">
        {/* Thumbnail container */}
        <div className="relative aspect-[16/10] overflow-hidden bg-[#1f1f1f] border-b border-border">
          <img
            src={project.thumbnail}
            alt={project.title}
            loading="lazy"
            className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500 ease-out"
          />
          <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300" />
          
          {/* Category Pill Tag */}
          <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-surface/90 backdrop-blur-md text-[11px] font-mono font-medium text-foreground border border-border shadow-sm">
            {project.category}
          </div>

          {/* Hover Action Badge */}
          <div className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-surface/90 backdrop-blur-md flex items-center justify-center text-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-sm">
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </div>
        </div>

        {/* Content Details */}
        <div className="p-6 flex flex-col flex-grow justify-between bg-surface">
          <div>
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-xs font-mono text-muted">{project.year}</span>
              <span className="text-xs font-mono text-secondary">{project.role}</span>
            </div>

            <h3 className="font-serif text-2xl text-foreground group-hover:text-black transition-colors mb-2 leading-snug">
              {project.title}
            </h3>

            <p className="text-secondary text-sm font-sans line-clamp-2 leading-relaxed mb-4">
              {project.description}
            </p>
          </div>

          {/* Tech Tags */}
          {project.technologies && project.technologies.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-3 border-t border-border/70">
              {project.technologies.slice(0, 3).map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-0.5 rounded text-[11px] font-mono text-secondary bg-[#f2f2ef] border border-border/50"
                >
                  {tech}
                </span>
              ))}
              {project.technologies.length > 3 && (
                <span className="text-[11px] font-mono text-muted self-center">
                  +{project.technologies.length - 3}
                </span>
              )}
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  );
}
