import React from 'react';
import { motion } from 'framer-motion';

export default function ProcessTimeline() {
  const columns = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0'));

  const phases = [
    {
      title: 'Understand',
      barStart: 'col-start-1',
      barSpan: 'col-span-3',
      description:
        'Every project starts with a question. I take time to understand the problem, the people it affects, and what the project needs to achieve before jumping into solutions.'
    },
    {
      title: 'Explore',
      barStart: 'col-start-3',
      barSpan: 'col-span-3',
      description:
        'With a clearer direction, I map out the structure, explore possible approaches, and decide what makes the most sense. This is where ideas begin to take shape.'
    },
    {
      title: 'Design & Create',
      barStart: 'col-start-5',
      barSpan: 'col-span-5',
      description:
        'This is where things become tangible. I turn concepts into interfaces, build and test interactions, and refine the details to make the experience both useful and intuitive.'
    },
    {
      title: 'Refine & Deliver',
      barStart: 'col-start-9',
      barSpan: 'col-span-4',
      description:
        "Before calling it finished, I review what I've made, check the details, and improve what needs work. I believe a good result comes from paying attention right up to the final step."
    }
  ];

  return (
    <div className="w-full">
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
