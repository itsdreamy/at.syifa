import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Waves, Sparkles, Volume2, VolumeX } from 'lucide-react';
import { poolMessages } from '../../data/portfolioData';

export default function CapybaraPool() {
  const poolRef = useRef(null);
  const animFrameRef = useRef(null);
  
  // Current position and target position of Capybara in percentage [0, 100]
  const [capyPos, setCapyPos] = useState({ x: 50, y: 50 });
  const targetPosRef = useRef({ x: 50, y: 50 });
  const currentPosRef = useRef({ x: 50, y: 50 });
  
  // Ripples list
  const [ripples, setRipples] = useState([]);
  
  // Dialogue state
  const [dialogue, setDialogue] = useState("Hey! Wanna swim with me?");
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isSwimming, setIsSwimming] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const idleTimeoutRef = useRef(null);

  // Safe boundaries (padding from edges in percent)
  const BOUNDS = { minX: 12, maxX: 88, minY: 15, maxY: 82 };

  // Spring physics loop for capybara swimming towards target
  useEffect(() => {
    let lastTime = performance.now();

    const loop = (time) => {
      const dt = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      const cur = currentPosRef.current;
      const tgt = targetPosRef.current;

      const dx = tgt.x - cur.x;
      const dy = tgt.y - cur.y;
      const dist = Math.hypot(dx, dy);

      if (dist > 0.4 && !reducedMotion) {
        setIsSwimming(true);
        // Smooth exponential spring ease
        const speed = 2.4; 
        cur.x += dx * Math.min(speed * dt, 0.25);
        cur.y += dy * Math.min(speed * dt, 0.25);
        setCapyPos({ x: cur.x, y: cur.y });
      } else {
        if (isSwimming) {
          setIsSwimming(false);
          if (hasInteracted) {
            setDialogue("Hehe. You found me!");
            resetIdleTimer();
          }
        }
      }

      animFrameRef.current = requestAnimationFrame(loop);
    };

    animFrameRef.current = requestAnimationFrame(loop);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [reducedMotion, isSwimming, hasInteracted]);

  const resetIdleTimer = useCallback(() => {
    if (idleTimeoutRef.current) clearTimeout(idleTimeoutRef.current);
    idleTimeoutRef.current = setTimeout(() => {
      setDialogue("Enjoying your little break?");
    }, 6000);
  }, []);

  // Handle pointer / touch interaction
  const handleInteraction = useCallback((clientX, clientY) => {
    if (!poolRef.current) return;
    const rect = poolRef.current.getBoundingClientRect();
    
    // Calculate percentage coords
    const rawX = ((clientX - rect.left) / rect.width) * 100;
    const rawY = ((clientY - rect.top) / rect.height) * 100;

    // Clamp coordinates to safe boundaries
    const clampedX = Math.max(BOUNDS.minX, Math.min(BOUNDS.maxX, rawX));
    const clampedY = Math.max(BOUNDS.minY, Math.min(BOUNDS.maxY, rawY));

    targetPosRef.current = { x: clampedX, y: clampedY };

    // Spawn water ripple
    const newRipple = {
      id: Date.now() + Math.random(),
      x: rawX,
      y: rawY,
    };
    setRipples((prev) => [...prev.slice(-8), newRipple]);

    if (!hasInteracted) {
      setHasInteracted(true);
      setDialogue("WAIT! I'M COMING!");
    } else {
      const randomMsg = poolMessages[Math.floor(Math.random() * poolMessages.length)];
      setDialogue(randomMsg);
    }

    resetIdleTimer();
  }, [hasInteracted, resetIdleTimer]);

  const onPointerDown = (e) => {
    handleInteraction(e.clientX, e.clientY);
  };

  const onPointerMove = (e) => {
    // Only move if button pressed or hovering deliberately
    if (e.buttons === 1) {
      handleInteraction(e.clientX, e.clientY);
    }
  };

  // Remove ripples after animation completes
  const removeRipple = (id) => {
    setRipples((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <section id="pool" className="py-24 border-t border-border bg-[#F7F7F5] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12">
        {/* Editorial Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-border">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-[#B8DDE8]" />
              <span className="text-xs uppercase font-mono tracking-widest text-secondary">
                Interactive Space · Section 08
              </span>
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl text-foreground tracking-tight">
              The Capybara Pool
            </h2>
          </div>
          <div className="mt-4 md:mt-0 flex items-center gap-4">
            <p className="text-secondary text-sm font-sans max-w-sm">
              "You've explored my work. Now come say hi to my little swimming buddy. Touch anywhere in the pool."
            </p>
            <button
              onClick={() => setReducedMotion(!reducedMotion)}
              className="px-3 py-1.5 rounded-full border border-border text-xs font-mono text-secondary hover:text-foreground hover:bg-surface transition-all flex items-center gap-1.5 shrink-0"
              title="Toggle Reduced Motion"
            >
              <span>{reducedMotion ? 'Enable Waves' : 'Reduced Motion'}</span>
            </button>
          </div>
        </div>

        {/* Swimming Pool Basin */}
        <div 
          ref={poolRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          className="relative w-full h-[450px] sm:h-[520px] rounded-2xl overflow-hidden cursor-crosshair border border-[#9fcddb] shadow-[inset_0_4px_24px_rgba(0,0,0,0.06),0_12px_32px_rgba(184,221,232,0.25)] select-none touch-pan-y"
          style={{
            background: 'linear-gradient(180deg, #A7D5E2 0%, #8CC7D8 50%, #76B9CC 100%)'
          }}
        >
          {/* Subtle underwater pool tile grid */}
          <div 
            className="absolute inset-0 opacity-15 pointer-events-none"
            style={{
              backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.4) 1px, transparent 1px),
                                linear-gradient(to bottom, rgba(255,255,255,0.4) 1px, transparent 1px)`,
              backgroundSize: '40px 40px'
            }}
          />

          {/* Sunlight caustic caustic water shimmer */}
          <div className="absolute inset-0 pool-shimmer pointer-events-none" />

          {/* Ripples container */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {ripples.map((ripple) => (
              <span
                key={ripple.id}
                onAnimationEnd={() => removeRipple(ripple.id)}
                className="ripple-circle"
                style={{
                  left: `${ripple.x}%`,
                  top: `${ripple.y}%`,
                  width: '60px',
                  height: '60px',
                }}
              />
            ))}
          </div>

          {/* Swimming Capybara on Donut Float */}
          <div
            className="absolute transition-transform duration-75 pointer-events-none -translate-x-1/2 -translate-y-1/2"
            style={{
              left: `${capyPos.x}%`,
              top: `${capyPos.y}%`,
            }}
          >
            {/* Bobbing animation */}
            <div className={`relative ${reducedMotion ? '' : 'animate-capy-bob'}`}>
              
              {/* Dialogue Speech Bubble */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={dialogue}
                  initial={{ opacity: 0, y: -8, scale: 0.9 }}
                  animate={{ opacity: 1, y: -20, scale: 1 }}
                  exit={{ opacity: 0, y: -12, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute -top-12 left-1/2 -translate-x-1/2 whitespace-nowrap bg-surface/95 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-border shadow-md text-xs font-mono font-medium text-foreground flex items-center gap-1.5 z-20"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-capy-brown" />
                  <span>{dialogue}</span>
                </motion.div>
              </AnimatePresence>

              {/* Water displacement ring beneath donut */}
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-28 h-10 rounded-full bg-white/30 blur-[4px] -z-10 animate-pulse" />

              {/* Capybara on Donut / Duck graphic */}
              <div className="w-32 h-32 sm:w-36 sm:h-36 drop-shadow-2xl">
                <img
                  src="/assets/capybara/capy-duck.png"
                  alt="Capybara swimming comfortably on donut float"
                  className="w-full h-full object-contain filter drop-shadow-lg"
                  draggable={false}
                />
              </div>

              {/* Swimming wake trail when moving */}
              {isSwimming && !reducedMotion && (
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-36 h-6 border-b-2 border-white/50 rounded-[50%] blur-[2px] animate-ping" />
              )}
            </div>
          </div>

          {/* Bottom pool deck instruction badge */}
          <div className="absolute bottom-4 left-6 pointer-events-none bg-surface/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/50 text-[11px] font-mono text-slate-700 shadow-sm flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#171717] animate-ping" />
            <span>Click or drag anywhere in the water to guide the capybara</span>
          </div>

          {/* Pool water depth indicator */}
          <div className="absolute bottom-4 right-6 pointer-events-none text-right font-mono text-[10px] text-slate-600 uppercase tracking-widest hidden sm:block">
            Temp: 26°C · Relax Mode
          </div>
        </div>
      </div>
    </section>
  );
}
