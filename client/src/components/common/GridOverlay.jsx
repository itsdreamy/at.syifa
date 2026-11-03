import React, { useState, useEffect } from 'react';

export default function GridOverlay() {
  const [showGrid, setShowGrid] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Toggle on Ctrl+G or Cmd+G
      if ((e.ctrlKey || e.metaKey) && (e.key === 'g' || e.key === 'G')) {
        e.preventDefault();
        setShowGrid((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (!showGrid) return null;

  return (
    <div 
      className="fixed inset-0 pointer-events-none z-50 grid-overlay transition-opacity duration-300"
      aria-hidden="true"
    >
      <div className="absolute top-2 right-4 bg-foreground text-background text-xs px-2.5 py-1 rounded font-mono shadow-md">
        Grid Overlay Active (Ctrl+G)
      </div>
    </div>
  );
}
