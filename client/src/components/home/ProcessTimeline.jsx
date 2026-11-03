import React from 'react';
import { motion } from 'framer-motion';

export default function ProcessTimeline() {
  const columns = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0'));

  const phases = [
    {
      title: 'Discovery',
      barStart: 'col-start-1',
      barSpan: 'col-span-3',
      description: 'We start by listening. This phase is about understanding your goals, audience, and challenges — finding clarity before we begin designing.'
    },
    {
      title: 'Strategy',
      barStart: 'col-start-3',
      barSpan: 'col-span-3',
      description: 'We translate insights into direction. Here, we define the concept, structure, and creative approach that shape your brand or digital product.'
    },
    {
      title: 'Design & Build',
      barStart: 'col-start-5',
      barSpan: 'col-span-5',
      description: 'Ideas take form. From visual identity to interactive experience, we design, prototype, and develop with precision and care.'
    },
    {
      title: 'Launch & Beyond',
      barStart: 'col-start-9',
      barSpan: 'col-span-4',
      description: 'Delivery is only the beginning. We test, refine, and support after launch — ensuring the work performs and evolves over time.'
    }
  ];

  return (
    <div className="w-full py-24 border-b border-border bg-white px-8 md:px-12">
      {/* Visual Gantt Bar Track */}
      <div className="relative mb-16 select-none overflow-hidden">
        {/* Number scale 01 - 12 */}
        <div className="grid grid-cols-12 gap-2 text-center text-xs font-mono text-muted mb-4">
          {columns.map((num) => (
            <div key={num} className="border-b border-border/50 pb-2">
              {num}
            </div>
          ))}
        </div>

        {/* Floating process bars */}
        <div className="grid grid-cols-12 gap-y-4 gap-x-2 py-4 relative">
          {phases.map((phase, idx) => (
            <motion.div
              key={phase.title}
              initial={{ scaleX: 0, opacity: 0 }}
              whileInView={{ scaleX: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15, ease: 'easeOut' }}
              style={{ originX: 0 }}
              className={`${phase.barStart} ${phase.barSpan} h-12 bg-black text-white rounded-lg flex items-center px-4 font-bold text-xs md:text-sm tracking-wider shadow-md hover:bg-neutral-800 transition-colors`}
            >
              <span>{phase.title}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 4 Column Explanations */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {phases.map((phase) => (
          <div key={phase.title} className="space-y-3">
            <h3 className="font-extrabold text-2xl text-foreground tracking-tight">
              {phase.title}
            </h3>
            <p className="text-secondary text-sm leading-relaxed font-normal">
              {phase.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
