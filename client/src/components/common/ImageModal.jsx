import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export default function ImageModal({ isOpen, src, alt, caption, onClose }) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.2 }}
          onClick={(e) => e.stopPropagation()}
          className="relative max-w-4xl w-full bg-surface border border-border rounded-xl overflow-hidden shadow-2xl"
        >
          <div className="flex items-center justify-between p-4 border-b border-border bg-background">
            <span className="text-xs font-mono text-secondary">{caption || alt || 'Photo Preview'}</span>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-surface text-secondary hover:text-foreground transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="max-h-[75vh] overflow-auto flex items-center justify-center bg-black/5 p-2">
            <img 
              src={src} 
              alt={alt} 
              className="max-h-[70vh] w-auto object-contain rounded-lg shadow-sm"
            />
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
