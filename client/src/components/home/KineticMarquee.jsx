import React from 'react';
import { motion } from 'framer-motion';

export default function KineticMarquee() {
  const words = ['clarity', 'imagination', 'craft', 'precision', 'motion', 'structure', 'rhythm'];

  return (
    <div className="relative py-20 overflow-hidden bg-white select-none border-y border-border">
      {/* Row 1 - Left to Right */}
      <div className="flex whitespace-nowrap overflow-hidden">
        <motion.div
          animate={{ x: [0, -1000] }}
          transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
          className="flex items-center gap-12 font-extrabold text-[8vw] md:text-[6vw] tracking-tighter uppercase text-black"
        >
          {words.concat(words).map((w, idx) => (
            <span key={idx} className="flex items-center gap-12">
              <span>{w}</span>
              <span className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-black shrink-0" />
            </span>
          ))}
        </motion.div>
      </div>

      {/* Row 2 - Right to Left with subtle opacity */}
      <div className="flex whitespace-nowrap overflow-hidden -mt-4 md:-mt-8">
        <motion.div
          animate={{ x: [-1000, 0] }}
          transition={{ duration: 32, repeat: Infinity, ease: 'linear' }}
          className="flex items-center gap-12 font-extrabold text-[8vw] md:text-[6vw] tracking-tighter uppercase text-[#E5E5E5]"
        >
          {words.concat(words).map((w, idx) => (
            <span key={idx} className="flex items-center gap-12">
              <span>{w}</span>
              <span className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-[#E5E5E5] shrink-0" />
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
