import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, Calendar, AlertCircle } from 'lucide-react';
import { portfolioApi } from '../services/api';

export default function ArticleDetailPage() {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);
    portfolioApi.getArticleBySlug(slug)
      .then((data) => {
        setArticle(data);
      })
      .catch((err) => {
        setError(`Article '${slug}' could not be loaded.`);
      })
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen pt-40 pb-20 max-w-3xl mx-auto px-6 text-center">
        <div className="font-mono text-sm text-secondary animate-pulse">Loading publication...</div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen pt-40 pb-20 max-w-3xl mx-auto px-6 text-center">
        <AlertCircle className="w-12 h-12 text-secondary mx-auto mb-4" />
        <h1 className="font-serif text-3xl text-foreground mb-4">Article Not Found</h1>
        <p className="text-secondary text-sm mb-8">{error || 'The requested article could not be located.'}</p>
        <Link
          to="/feed"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#171717] text-white text-xs font-mono"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Feed</span>
        </Link>
      </div>
    );
  }

  // Simple clean markdown-like paragraph renderer
  const paragraphs = (article.content || article.description).split('\n\n');

  return (
    <div className="pt-32 pb-24 min-h-screen">
      <article className="max-w-3xl mx-auto px-6 sm:px-8">
        {/* Navigation Breadcrumb */}
        <div className="mb-10">
          <Link
            to="/feed"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-secondary hover:text-foreground transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to All Articles</span>
          </Link>
        </div>

        {/* Header Metadata */}
        <div className="border-b border-border pb-8 mb-12">
          <div className="flex items-center gap-4 text-xs font-mono text-muted mb-4">
            <span className="px-2.5 py-0.5 rounded-full bg-surface border border-border text-foreground font-medium">
              {article.category}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {article.publishedAt}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {article.readingTime}
            </span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-foreground tracking-tight leading-tight mb-6">
            {article.title}
          </h1>

          <p className="text-secondary text-lg sm:text-xl font-light leading-relaxed italic border-l-2 border-border pl-4">
            {article.description}
          </p>
        </div>

        {/* Content Body */}
        <div className="space-y-6 text-foreground font-sans text-base sm:text-lg leading-relaxed font-light">
          {paragraphs.map((p, idx) => {
            if (p.startsWith('# ')) {
              return null; // Skip main title as it's rendered in header
            }
            if (p.startsWith('### ')) {
              return (
                <h3 key={idx} className="font-serif text-2xl sm:text-3xl text-foreground font-normal pt-6 pb-2">
                  {p.replace('### ', '')}
                </h3>
              );
            }
            return (
              <p key={idx} className="text-[#333333]">
                {p}
              </p>
            );
          })}
        </div>

        {/* Article Author Footer */}
        <div className="mt-16 pt-8 border-t border-border flex items-center justify-between text-xs font-mono text-secondary">
          <div>Written by Syifa · Studio Notes</div>
          <Link to="/feed" className="hover:text-foreground">
            More Articles →
          </Link>
        </div>
      </article>
    </div>
  );
}
