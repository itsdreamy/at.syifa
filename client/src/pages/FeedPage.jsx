import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, BookOpen } from 'lucide-react';
import { portfolioApi } from '../services/api';

export default function FeedPage() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    portfolioApi.getArticles()
      .then((data) => {
        if (data) setArticles(data);
      })
      .catch((err) => console.warn('Articles fallback'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="pt-32 pb-24 min-h-screen">
      <div className="max-w-5xl mx-auto px-6 sm:px-8 md:px-12">
        {/* Navigation Breadcrumb */}
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-secondary hover:text-foreground transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Return to Studio Homepage</span>
          </Link>
        </div>

        {/* Header */}
        <div className="border-b border-border pb-10 mb-12">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-[#171717]" />
            <span className="text-xs uppercase font-mono tracking-widest text-secondary">
              Publications &amp; Notes
            </span>
          </div>
          <h1 className="font-serif text-5xl sm:text-6xl text-foreground tracking-tight mb-4">
            Editorial Feed
          </h1>
          <p className="text-secondary text-base max-w-xl font-light">
            Reflections, engineering deep-dives, and design notes on crafting thoughtful digital systems.
          </p>
        </div>

        {/* Articles List */}
        <div className="divide-y divide-border border-y border-border">
          {articles.map((art) => (
            <Link
              key={art.id}
              to={`/feed/${art.slug}`}
              className="py-10 block group hover:bg-surface/60 transition-colors px-4 -mx-4 rounded-xl"
            >
              <div className="flex items-center justify-between text-xs font-mono text-muted mb-3">
                <span className="text-foreground font-medium">{art.category}</span>
                <span>{art.publishedAt} · {art.readingTime}</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl text-foreground group-hover:text-black transition-colors mb-3">
                {art.title}
              </h2>

              <p className="text-secondary text-sm sm:text-base font-light leading-relaxed max-w-3xl mb-4">
                {art.description}
              </p>

              <div className="inline-flex items-center gap-1.5 text-xs font-mono text-foreground font-semibold group-hover:translate-x-1 transition-transform">
                <span>Read Full Article</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
