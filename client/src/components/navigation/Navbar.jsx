import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowUpRight } from 'lucide-react';

export default function Navbar({ showFeed = true }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Work', path: '/work' },
    ...(showFeed ? [{ name: 'Feed', path: '/feed' }] : []),
    { name: 'Contact', path: '/#contact', isAnchor: true },
  ];

  const handleAnchorClick = (e, path) => {
    if (path.startsWith('/#')) {
      const hash = path.substring(1);
      if (location.pathname === '/') {
        e.preventDefault();
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-[#F7F7F5]/90 backdrop-blur-md border-b border-[#E5E5E5] py-3.5 shadow-sm'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 flex items-center justify-between">
        {/* Brand / Logo */}
        <Link 
          to="/" 
          className="group flex items-center gap-2.5 font-medium tracking-tight text-foreground"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-[#171717] group-hover:scale-125 transition-transform" />
          <span className="font-serif text-2xl tracking-normal text-foreground group-hover:opacity-70 transition-opacity">
            at.syifa
          </span>
          <span className="hidden sm:inline-block text-xs uppercase tracking-widest text-secondary font-mono ml-2 border-l border-border pl-2.5">
            studio
          </span>
        </Link>

        {/* Center / Right Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return link.isAnchor ? (
              <a
                key={link.name}
                href={link.path}
                onClick={(e) => handleAnchorClick(e, link.path)}
                className="text-sm font-medium text-secondary hover:text-foreground transition-colors tracking-wide"
              >
                {link.name}
              </a>
            ) : (
              <Link
                key={link.name}
                to={link.path}
                className={`text-sm font-medium tracking-wide transition-colors relative py-1 ${
                  isActive ? 'text-foreground' : 'text-secondary hover:text-foreground'
                }`}
              >
                {link.name}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#171717] rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Availability Badge & Action */}
        <div className="hidden sm:flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-surface border border-border text-xs font-mono text-secondary">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Open to opportunities</span>
          </div>
          <a
            href="mailto:syifa@example.com"
            className="inline-flex items-center gap-1 text-xs font-medium uppercase tracking-wider px-3.5 py-1.5 rounded-full bg-[#171717] text-white hover:bg-[#333] transition-colors"
          >
            <span>Let's talk</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-foreground hover:opacity-70 focus:outline-none"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-background border-b border-border px-6 py-6 space-y-4 animate-in fade-in duration-200">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={(e) => handleAnchorClick(e, link.path)}
                className="text-lg font-medium text-foreground hover:text-secondary transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>
          <div className="pt-4 border-t border-border flex flex-col gap-3">
            <div className="flex items-center gap-2 text-xs font-mono text-secondary">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Open to opportunities</span>
            </div>
            <a
              href="mailto:syifa@example.com"
              className="inline-flex justify-center items-center gap-1.5 text-sm font-medium py-2.5 rounded-lg bg-[#171717] text-white hover:bg-[#333]"
            >
              <span>Get in Touch</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
