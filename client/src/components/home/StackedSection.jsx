import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';

/**
 * StackedSection — editorial "paper stack" scroll transition.
 *
 * Each section acts as a physical sheet that slides up and covers the
 * previous one as the visitor scrolls down.  The design is intentionally
 * restrained: gentle scale + opacity on the section being left behind,
 * no border lines at the top of incoming sheets, generous radius for depth.
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
  const isLast = index === total - 1;

  // Scroll progress of *this* panel (from when its top hits the viewport
  // top until its bottom scrolls fully out of view).
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // The section being scrolled away gently scales and dims so the
  // incoming sheet feels like it is physically layering on top.
  const scale = useTransform(
    scrollYProgress,
    [0, 1],
    [1, isLast || shouldReduceMotion ? 1 : 0.97]
  );
  const dimOpacity = useTransform(
    scrollYProgress,
    [0, 0.7, 1],
    [1, 1, isLast || shouldReduceMotion ? 1 : 0.92]
  );

  // Navbar is 72–80px; cascade each sheet 8px lower so the top-pill
  // gradient of the previous sheet remains vaguely visible underneath.
  const topOffset = 72 + index * 8;

  // Ascending z-index: later sheets always render above earlier ones.
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
          opacity: shouldReduceMotion ? 1 : dimOpacity,
          top: `${topOffset}px`,
        }}
        className={`
          w-full ${bgColor}
          rounded-t-[32px] md:rounded-t-[40px]
          shadow-[0_-20px_48px_-8px_rgba(0,0,0,0.08)]
          md:sticky
          transition-shadow duration-500
          overflow-hidden will-change-transform
        `}
      >
        {/* Subtle drag-pill indicator — hidden on mobile */}
        <div className="w-10 h-1 bg-neutral-200/80 rounded-full mx-auto mt-4 mb-0 hidden md:block" />

        <div className="w-full px-6 sm:px-10 md:px-16 py-16 md:py-24">
          {children}
        </div>
      </motion.div>
    </div>
  );
}
