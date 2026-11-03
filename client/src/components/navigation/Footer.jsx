import React from 'react';
import { ArrowUp, Github, Linkedin, Mail, Instagram } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-border bg-[#F7F7F5] pt-16 pb-12 transition-colors">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 pb-16 border-b border-border">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#171717]" />
              <h3 className="font-serif text-3xl text-foreground">at.syifa</h3>
            </div>
            <p className="text-secondary text-sm max-w-sm leading-relaxed font-sans">
              A digital studio and personal interactive portfolio exploring thoughtful user interfaces, high-performance web systems, and playful spatial interactions.
            </p>
            <div className="pt-2 text-xs font-mono text-muted">
              Designed with editorial precision &amp; subtle motion.
            </div>
          </div>

          {/* Quick Nav */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase font-mono tracking-widest text-secondary">Navigation</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="#hero" className="text-secondary hover:text-foreground transition-colors">Top / Hero</a>
              </li>
              <li>
                <a href="#about" className="text-secondary hover:text-foreground transition-colors">About &amp; Philosophy</a>
              </li>
              <li>
                <a href="#work" className="text-secondary hover:text-foreground transition-colors">Selected Projects</a>
              </li>
              <li>
                <a href="#experience" className="text-secondary hover:text-foreground transition-colors">Experience &amp; Writing</a>
              </li>
              <li>
                <a href="#pool" className="text-secondary hover:text-foreground transition-colors">Capybara Pool</a>
              </li>
              <li>
                <a href="#contact" className="text-secondary hover:text-foreground transition-colors">Contact</a>
              </li>
            </ul>
          </div>

          {/* Connect / Socials */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase font-mono tracking-widest text-secondary">Connect</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a 
                  href="mailto:syifa@example.com" 
                  className="inline-flex items-center gap-2 text-secondary hover:text-foreground transition-colors group"
                >
                  <Mail className="w-4 h-4 text-muted group-hover:text-foreground transition-colors" />
                  <span>Email Syifa</span>
                </a>
              </li>
              <li>
                <a 
                  href="https://linkedin.com/in/syifa-portfolio" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center gap-2 text-secondary hover:text-foreground transition-colors group"
                >
                  <Linkedin className="w-4 h-4 text-muted group-hover:text-foreground transition-colors" />
                  <span>LinkedIn Profile</span>
                </a>
              </li>
              <li>
                <a 
                  href="https://github.com/syifa-code" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center gap-2 text-secondary hover:text-foreground transition-colors group"
                >
                  <Github className="w-4 h-4 text-muted group-hover:text-foreground transition-colors" />
                  <span>GitHub Repository</span>
                </a>
              </li>
              <li>
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center gap-2 text-secondary hover:text-foreground transition-colors group"
                >
                  <Instagram className="w-4 h-4 text-muted group-hover:text-foreground transition-colors" />
                  <span>Instagram</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-secondary">
          <div>
            © {new Date().getFullYear()} Syifa. All rights reserved.
          </div>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-surface hover:border-foreground/40 hover:text-foreground transition-all group"
            aria-label="Back to top"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
}
