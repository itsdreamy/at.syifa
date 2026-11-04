import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [timeStr, setTimeStr] = useState('');

  // Live time ticker
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options = { 
        timeZone: 'Asia/Jakarta', 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
      };
      const formatted = new Intl.DateTimeFormat('en-US', options).format(now);
      setTimeStr(`JAKARTA, ID ${formatted}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 3000);
      setEmail('');
    }
  };

  return (
    <footer className="w-full bg-white pt-24 pb-12 px-8 md:px-12 border-t border-border overflow-hidden">
      {/* Giant Typography Brand Header */}
      <div className="relative mb-16 select-none">
        <h2 className="text-[14vw] font-extrabold tracking-tightest leading-none text-foreground w-full uppercase">
          at.syifa
        </h2>
        <div className="absolute top-2 right-0 font-bold text-xs md:text-sm tracking-widest text-foreground">
          © 2026
        </div>
      </div>

      {/* 3-Column Info Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-20 border-b border-border/80">
        {/* Newsletter Column */}
        <div className="md:col-span-6 space-y-6">
          <p className="text-secondary text-sm md:text-base font-normal max-w-md leading-relaxed">
            Join our newsletter for thoughts on design and coding! I'll send you updates ocassionally.
          </p>

          <form onSubmit={handleSubscribe} className="relative max-w-md">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="YOUR EMAIL HERE"
              required
              className="w-full bg-[#F4F4F2] text-xs font-bold tracking-widest uppercase px-5 py-4 rounded-xl text-foreground placeholder:text-muted focus:outline-none focus:ring-1 focus:ring-black pr-12 transition-all"
            />
            <button
              type="submit"
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-foreground hover:translate-x-1 transition-transform"
              aria-label="Subscribe"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
          {subscribed && (
            <div className="text-xs font-mono text-emerald-600">✓ Thank you for subscribing!</div>
          )}
        </div>

        {/* Social Column */}
        <div className="md:col-span-3 space-y-4">
          <div className="text-xs uppercase font-bold tracking-widest text-muted">
            Social
          </div>
          <ul className="space-y-3 font-bold text-lg md:text-xl text-foreground">
            <li>
              <a 
                href="https://www.linkedin.com/in/hi-syifaaa/" 
                target="_blank" 
                rel="noreferrer" 
                className="hover:opacity-60 transition-opacity block"
              >
                LinkedIn
              </a>
            </li>
            {/* <li>
              <a 
                href="https://x.com" 
                target="_blank" 
                rel="noreferrer" 
                className="hover:opacity-60 transition-opacity block"
              >
                X (Twitter)
              </a>
            </li> */}
            <li>
              <a 
                href="https://instagram.com/hi.syifaaa_" 
                target="_blank" 
                rel="noreferrer" 
                className="hover:opacity-60 transition-opacity block"
              >
                Instagram
              </a>
            </li>
            <li>
              <a 
                href="https://github.com/itsdreamy" 
                target="_blank" 
                rel="noreferrer" 
                className="hover:opacity-60 transition-opacity block"
              >
                GitHub
              </a>
            </li>
          </ul>
        </div>

        {/* Legal Column */}
        <div className="md:col-span-3 space-y-4">
          <div className="text-xs uppercase font-bold tracking-widest text-muted">
            Legal
          </div>
          <ul className="space-y-3 font-bold text-lg md:text-xl text-foreground">
            <li>
              <Link to="/" className="hover:opacity-60 transition-opacity block">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/" className="hover:opacity-60 transition-opacity block">
                Terms of Service
              </Link>
            </li>
            <li>
              <Link to="/404" className="hover:opacity-60 transition-opacity block">
                404
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] font-bold tracking-widest uppercase text-muted">
        <div>
          © 2026 AT.SYIFA. ALL RIGHTS RESERVED.
        </div>
        <div>
          {timeStr || 'SUKABUMI, ID'}
        </div>
      </div>
    </footer>
  );
}
