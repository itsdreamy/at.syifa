import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X } from 'lucide-react';

export default function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      q: "What do you enjoy working on?",
      a: "I enjoy working across different parts of the digital product process, from making sense of an idea to shaping the interface and checking that everything works as it should."
    },
    {
      q: "What tools do you usually work with?",
      a: "I usually work with Figma, React, Tailwind CSS, and npm package development."
    },
    {
      q: "How do you approach a new project?",
      a: "Every project starts with a question. I take time to understand the problem, the people it affects, and what the project needs to achieve before jumping into solutions."
    },
    {
      q: "Are you open to collaborations?",
      a: "Yes, I'm always open to collaborations. If you have a project in mind, feel free to reach out!"
    },
    {
      q: "Where can I see more of your work?",
      a: "You can see more of my work on my portfolio page. I'm always updating it with new projects and work I'm proud of."
    }
  ];

  return (
    <div className="w-full">
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
