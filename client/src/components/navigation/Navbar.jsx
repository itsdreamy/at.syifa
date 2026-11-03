import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'WORK', path: '/work' },
    { name: 'STUDIO', path: '/studio' },
    { name: 'FEED', path: '/feed' },
    { name: 'CONTACT', path: '/contact' },
  ];

  const currentPath = location.pathname;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md transition-all py-6">
      <div className="w-full px-8 md:px-12 flex items-center justify-between">
        {/* Brand */}
        <Link 
          to="/" 
          className="text-xl md:text-2xl font-bold tracking-tight text-foreground hover:opacity-70 transition-opacity flex items-center gap-1"
        >
          <span>at.syifa®</span>
        </Link>

        {/* Desktop Nav Items */}
        <nav className="hidden md:flex items-center gap-10">
          {navItems.map((item) => {
            const isActive = currentPath === item.path || 
              (item.path === '/work' && currentPath.startsWith('/work')) ||
              (item.path === '/feed' && currentPath.startsWith('/feed'));

            return (
              <Link
                key={item.name}
                to={item.path}
                className="relative py-1 text-xs md:text-sm font-bold tracking-wider text-foreground hover:opacity-60 transition-opacity flex items-center gap-2"
              >
                <span>{item.name}</span>
                {isActive && (
                  <motion.span
                    layoutId="activeNavIndicator"
                    className="w-2 h-2 rounded-full bg-black inline-block"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-1 text-foreground hover:opacity-60 focus:outline-none"
          aria-label="Toggle navigation"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-white border-b border-border px-8 py-6 space-y-4"
        >
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between text-base font-bold tracking-wider text-foreground py-2 border-b border-border/40"
            >
              <span>{item.name}</span>
              {(currentPath === item.path || currentPath.startsWith(item.path)) && (
                <span className="w-2 h-2 rounded-full bg-black" />
              )}
            </Link>
          ))}
        </motion.div>
      )}
    </header>
  );
}
