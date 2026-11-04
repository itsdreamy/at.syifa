import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';

/**
 * StackedSection implements an editorial paper-stacking scroll transition.
 * As the user scrolls down, each section enters as a distinct physical sheet of paper,
 * visually sliding over and covering the previous section.
 */
export default function StackedSection({
  children,
  index,
  total,
  id,
  className = '',
  bgColor = 'bg-white',
}) {
  const containerRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  // Track the scroll progress of this panel container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  });

  // Calculate sticky top offset (header is ~76px, slight cascading offset per card on desktop)
  const isLast = index === total - 1;
  const topOffset = 76 + index * 10;

  // Subtle depth transformations for the sheet being covered
  // Gently scales from 1.0 to 0.985 with a tiny dimming to simulate real paper depth
  const scale = useTransform(scrollYProgress, [0, 1], [1, isLast || shouldReduceMotion ? 1 : 0.985]);
  const opacity = useTransform(scrollYProgress, [0, 0.85, 1], [1, 1, isLast || shouldReduceMotion ? 1 : 0.94]);

  // Ascending z-index so incoming sections always sit physically above previous sections
  const zIndex = (index + 1) * 10;

  return (
    <div
      ref={containerRef}
      id={id}
      className={`relative w-full ${className}`}
      style={{ zIndex }}
    >
      <motion.div
        style={{
          scale: shouldReduceMotion ? 1 : scale,
          opacity: shouldReduceMotion ? 1 : opacity,
          top: `${topOffset}px`,
        }}
        className={`w-full ${bgColor} rounded-t-[28px] md:rounded-t-[36px] border-t border-border/80 shadow-[0_-14px_36px_rgba(0,0,0,0.06)] md:sticky transition-shadow duration-300 overflow-hidden will-change-transform`}
      >
        {/* Subtle physical sheet indicator */}
        <div className="w-12 h-1 bg-neutral-300/60 rounded-full mx-auto mt-3.5 mb-1 hidden md:block" />

        <div className="w-full px-8 md:px-12 py-16 md:py-24">
          {children}
        </div>
      </motion.div>
    </div>
  );
}
