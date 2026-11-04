import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { initialProjects } from '../data/portfolioData';
import { portfolioApi } from '../services/api';
import { ArrowUpRight, Grid, Move } from 'lucide-react';

export default function WorkPage() {
  const [projects, setProjects] = useState(initialProjects);
  const [viewMode, setViewMode] = useState('canvas'); // 'canvas' | 'grid'
  const containerRef = useRef(null);

  // useEffect(() => {
  //   window.scrollTo(0, 0);
  //   portfolioApi.getProjects()
  //     .then((data) => {
  //       if (data && data.length > 0) setProjects(data);
  //     })
  //     .catch((err) => console.warn('Loaded fallback projects'));
  // }, []);

  // Pre-configured organic canvas coordinates for projects
  const cardPositions = [
    { x: -280, y: -160, rotate: -4, size: 'w-72 sm:w-80 aspect-[4/5]' },
    { x: 260, y: -180, rotate: 3, size: 'w-80 sm:w-96 aspect-[3/4]' },
    { x: -320, y: 140, rotate: 2, size: 'w-80 sm:w-88 aspect-[4/5]' },
    { x: 240, y: 160, rotate: -3, size: 'w-72 sm:w-80 aspect-[16/10]' },
    { x: 0, y: 260, rotate: 1, size: 'w-80 sm:w-96 aspect-[16/9]' },
  ];

  return (
    <div className="pt-24 min-h-screen bg-white relative overflow-hidden select-none">
      {/* View Mode Toggle Switch */}
      <div className="absolute top-24 right-8 md:right-12 z-40 flex items-center gap-2 bg-[#F4F4F2] p-1 rounded-full border border-border">
        <button
          onClick={() => setViewMode('canvas')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
            viewMode === 'canvas' ? 'bg-black text-white shadow-sm' : 'text-secondary hover:text-black'
          }`}
        >
          <Move className="w-3.5 h-3.5" />
          <span>Canvas</span>
        </button>
        <button
          onClick={() => setViewMode('grid')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
            viewMode === 'grid' ? 'bg-black text-white shadow-sm' : 'text-secondary hover:text-black'
          }`}
        >
          <Grid className="w-3.5 h-3.5" />
          <span>Grid</span>
        </button>
      </div>

      {viewMode === 'canvas' ? (
        /* INFINITE 2D INTERACTIVE DRAGGABLE WORK CANVAS (matches reference video) */
        <div 
          ref={containerRef}
          className="relative w-full h-[90vh] flex items-center justify-center cursor-grab active:cursor-grabbing overflow-hidden"
        >
          {/* Centered Giant Typography Title */}
          <div className="absolute pointer-events-none text-center z-10">
            <h1 className="text-[18vw] font-extrabold tracking-tightest leading-none text-black uppercase">
              Work
            </h1>
            <p className="text-secondary text-sm font-bold tracking-widest uppercase mt-2">
              scroll / drag
            </p>
          </div>

          {/* Draggable World Layer */}
          <motion.div
            drag
            dragConstraints={{ left: -500, right: 500, top: -400, bottom: 400 }}
            dragElastic={0.2}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
          >
            {projects.map((proj, idx) => {
              const pos = cardPositions[idx % cardPositions.length];
              return (
                <motion.div
                  key={proj.id || idx}
                  style={{
                    x: pos.x,
                    y: pos.y,
                    rotate: pos.rotate,
                  }}
                  whileHover={{ scale: 1.05, rotate: 0, zIndex: 30 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className={`absolute pointer-events-auto ${pos.size} bg-surface rounded-2xl overflow-hidden shadow-2xl border-4 border-white group cursor-pointer`}
                >
                  <Link to={`/work/${proj.slug}`} className="block w-full h-full relative">
                    <img
                      src={proj.thumbnail}
                      alt={proj.title}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex flex-col justify-end p-6 text-white">
                      <div className="text-xs uppercase font-mono tracking-wider opacity-80 mb-1">
                        {proj.category}
                      </div>
                      <h3 className="font-extrabold text-xl md:text-2xl tracking-tight flex items-center justify-between">
                        <span>{proj.title}</span>
                        <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </h3>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      ) : (
        /* ACCESSIBLE STANDARD EDITORIAL GRID MODE */
        <div className="max-w-7xl mx-auto px-8 md:px-12 py-16">
          <div className="mb-12 border-b border-border pb-8">
            <h1 className="text-6xl font-extrabold tracking-tightest uppercase text-foreground mb-4">
              All Projects
            </h1>
            <p className="text-secondary text-base max-w-xl font-normal">
              An index of user interfaces, interactive web apps, open-source utilities, and architectural design systems.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((proj) => (
              <Link
                key={proj.id}
                to={`/work/${proj.slug}`}
                className="group flex flex-col bg-surface border border-border rounded-xl overflow-hidden hover:border-black transition-colors"
              >
                <div className="aspect-[16/10] bg-black overflow-hidden relative">
                  <img
                    src={proj.thumbnail}
                    alt={proj.title}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6 flex flex-col flex-grow justify-between">
                  <div>
                    <div className="text-xs uppercase font-bold tracking-wider text-muted mb-2">
                      {proj.category} · {proj.year}
                    </div>
                    <h3 className="text-2xl font-extrabold tracking-tight text-foreground group-hover:text-black mb-2">
                      {proj.title}
                    </h3>
                    <p className="text-secondary text-sm line-clamp-2">
                      {proj.description}
                    </p>
                  </div>
                  <div className="mt-4 pt-4 border-t border-border flex items-center justify-between text-xs font-bold uppercase tracking-wider text-foreground">
                    <span>Take a Closer Look</span>
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
