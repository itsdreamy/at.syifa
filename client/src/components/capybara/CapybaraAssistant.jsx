import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MessageSquare, Sparkles } from 'lucide-react';
import { capybaraMessages } from '../../data/portfolioData';

export default function CapybaraAssistant() {
  const [isOpen, setIsOpen] = useState(true);
  const [minimized, setMinimized] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [bubbleVisible, setBubbleVisible] = useState(true);

  // Cycle messages without immediate repeat
  const nextMessage = () => {
    setBubbleVisible(false);
    setTimeout(() => {
      setCurrentIndex((prev) => {
        let next = Math.floor(Math.random() * capybaraMessages.length);
        if (next === prev) {
          next = (prev + 1) % capybaraMessages.length;
        }
        return next;
      });
      setBubbleVisible(true);
    }, 200);
  };

  // Welcome message timer
  useEffect(() => {
    const timer = setTimeout(() => {
      setBubbleVisible(true);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  if (!isOpen) {
    return (
      <button
        onClick={() => {
          setIsOpen(true);
          setMinimized(false);
          setBubbleVisible(true);
        }}
        className="fixed bottom-6 right-6 z-40 bg-surface border border-border text-foreground px-3.5 py-2 rounded-full shadow-lg flex items-center gap-2 hover:bg-[#F0F0EE] transition-all text-xs font-mono"
        aria-label="Wake Capybara Assistant"
      >
        <span className="text-base">🦫</span>
        <span>Wake Mascot</span>
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-40 pointer-events-none flex flex-col items-end">
      {/* Speech Bubble */}
      <AnimatePresence>
        {!minimized && bubbleVisible && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.95 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="pointer-events-auto max-w-xs mb-3 bg-surface/95 backdrop-blur-md border border-border p-4 rounded-2xl shadow-xl text-foreground text-xs relative"
          >
            {/* Top bubble controls */}
            <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-border/60">
              <span className="font-mono text-[10px] text-secondary flex items-center gap-1 uppercase tracking-wider">
                <Sparkles className="w-3 h-3 text-capy-brown" />
                Capy Assistant
              </span>
              <button
                onClick={() => setBubbleVisible(false)}
                className="text-muted hover:text-foreground transition-colors p-0.5"
                title="Dismiss message"
                aria-label="Dismiss message"
              >
                <X className="w-3 h-3" />
              </button>
            </div>

            {/* Message Body */}
            <p className="font-sans text-foreground text-xs leading-relaxed font-medium">
              "{capybaraMessages[currentIndex]}"
            </p>

            {/* Bubble Tail */}
            <div className="absolute -bottom-2 right-8 w-3 h-3 bg-surface border-r border-b border-border rotate-45" />

            {/* Click hint */}
            <div className="mt-2 pt-1.5 text-[10px] font-mono text-muted flex items-center justify-between">
              <span>Click capy for next thought</span>
              <button
                onClick={nextMessage}
                className="text-foreground hover:underline font-semibold"
              >
                Next ↻
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Capybara Mascot Body */}
      <motion.div
        drag
        dragConstraints={{ left: -100, right: 0, top: -100, bottom: 0 }}
        className="pointer-events-auto relative group cursor-pointer"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={nextMessage}
      >
        {/* Floating Animation Wrapper */}
        <div className="relative animate-capy-bob">
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 drop-shadow-xl select-none">
            <img
              src="/assets/capybara/capy-yuzu.png"
              alt="Floating 3D Capybara Mascot"
              className="w-full h-full object-contain filter drop-shadow-md"
              loading="lazy"
            />
            {/* Soft contact shadow */}
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-14 h-2.5 bg-black/15 rounded-full blur-[2px] -z-10" />
          </div>

          {/* Quick controls on hover */}
          <div className="absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsOpen(false);
              }}
              className="w-5 h-5 rounded-full bg-surface border border-border text-secondary hover:text-foreground flex items-center justify-center text-[10px] shadow-sm"
              title="Close mascot"
              aria-label="Close mascot"
            >
              ✕
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
