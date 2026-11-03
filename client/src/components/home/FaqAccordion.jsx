import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X } from 'lucide-react';

export default function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      q: "How do you start a new project?",
      a: "We start by listening. Every project begins with a short discovery phase where we learn about your goals, challenges, and expectations. From there, we define the creative direction, map out deliverables, and set a timeline that balances clarity with craft."
    },
    {
      q: "Can you help with strategy, not just design?",
      a: "Yes. Design without strategy is just decoration. We help teams articulate value propositions, user journeys, brand voice, and technical architecture before writing code or assembling layouts."
    },
    {
      q: "What technologies do you specialize in?",
      a: "We build high-performance web applications using modern React, Vite, Node/Express, Tailwind CSS, Framer Motion, and physics animation solvers with zero unnecessary dependencies."
    },
    {
      q: "How do we collaborate together?",
      a: "We work seamlessly across global timezones using asynchronous documentation, interactive Figma component reviews, and version-controlled GitHub repositories."
    }
  ];

  return (
    <div className="w-full py-24 border-b border-border bg-white px-8 md:px-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Column Title */}
        <div className="lg:col-span-4">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-foreground">
            Questions
          </h2>
          <p className="text-secondary text-sm mt-3 max-w-xs font-normal">
            Everything you need to know about our workflow, approach, and engineering standards.
          </p>
        </div>

        {/* Right Column Accordion */}
        <div className="lg:col-span-8 divide-y divide-border border-y border-border">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={index} className="py-6">
                <button
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  className="w-full flex items-center justify-between text-left group"
                >
                  <span className="text-xl md:text-3xl font-extrabold tracking-tight text-foreground group-hover:opacity-70 transition-opacity">
                    {faq.q}
                  </span>
                  <span className="p-2 text-foreground">
                    {isOpen ? <X className="w-6 h-6" /> : <Plus className="w-6 h-6" />}
                  </span>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <p className="pt-4 text-secondary text-base leading-relaxed max-w-2xl font-normal">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
