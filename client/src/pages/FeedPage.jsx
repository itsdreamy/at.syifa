import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { portfolioApi } from '../services/api';

export default function FeedPage() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    portfolioApi.getArticles()
      .then((data) => {
        if (data && data.length > 0) setArticles(data);
      })
      .catch(() => {});
  }, []);

  const feedItems = [
    {
      id: 'art-001',
      slug: 'crafting-editorial-rhythm-in-modern-web-interfaces',
      title: 'The Logic of Emotion',
      date: 'April 26, 2026',
      description: "In design, clarity isn't about simplicity for its own sake. It's about removing what doesn't serve meaning — until what remains feels inevitable.",
      image: '/assets/achievements/syifa-1.jpeg',
      aspect: 'aspect-[3/4]'
    },
    {
      id: 'art-002',
      slug: 'building-lightweight-physics-springs-in-react',
      title: 'Precision Over Perfection',
      date: 'March 29, 2026',
      description: "Design isn't about getting everything right — it's about making the right things matter.",
      image: '/assets/achievements/syifa-4.jpeg',
      aspect: 'aspect-square'
    },
    {
      id: 'art-003',
      slug: 'the-architecture-of-meaning',
      title: 'The Architecture of Meaning',
      date: 'March 2, 2026',
      description: 'A brand is a structure built from ideas, shaped by language, and held together by design.',
      image: '/assets/achievements/syifa-3.jpeg',
      aspect: 'aspect-[4/3]'
    },
    {
      id: 'art-004',
      slug: 'one-idea-many-forms',
      title: 'One Idea, Many Forms',
      date: 'February 6, 2026',
      description: 'A single thought can take endless shapes. The challenge is keeping its meaning intact as it moves between mediums.',
      image: '/assets/achievements/syifa-2.jpeg',
      aspect: 'aspect-[3/4]'
    }
  ];

  return (
    <div className="pt-28 mb-20 pb-48 bg-white">
      <div className="w-full px-8 md:px-12">
        {/* Header */}
        <div className="mb-16 border-b border-border pb-10">
          <div className="text-xs uppercase font-bold tracking-widest text-muted mb-2">Publications</div>
          <h1 className="text-6xl sm:text-8xl font-extrabold tracking-tightest uppercase text-foreground">
            Feed
          </h1>
          <p className="text-secondary text-base max-w-xl font-normal mt-3">
            Notes, essays, and observations on design, engineering, and digital culture.
          </p>
        </div>

        {/* 3-Column Asymmetric Feed Grid (matches feed.mp4) */}
        <div className="flex flex-col items-center justify-center">
            <h1 className="text-4xl font-bold text-center">Coming Soon</h1>
            <Link to="/" className="text-blue-500 hover:text-blue-600">
              Go back to the home page
            </Link>
        {/*           
          {feedItems.map((item) => (
            <Link
              key={item.id}
              to={`/feed/${item.slug}`}
              className="group block space-y-4 cursor-pointer"
            >
              {/* Image Container with Floating Arrow Hover Badge
              <div className={`relative ${item.aspect} w-full rounded-2xl overflow-hidden bg-stone-100 shadow-md`}>
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/25 transition-colors" />
                
                {/* Circular Black Arrow Badge
                <div className="absolute top-4 right-4 w-12 h-12 rounded-full bg-black text-white flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300 shadow-xl">
                  <ArrowUpRight className="w-5 h-5" />
                </div>
              </div>

              {/* Text content 
              <div className="space-y-1.5">
                <div className="text-xs font-bold text-muted uppercase tracking-wider">
                  {item.date}
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground group-hover:text-black transition-colors leading-snug">
                  {item.title}
                </h2>
                <p className="text-secondary text-sm font-normal leading-relaxed line-clamp-3">
                  {item.description}
                </p>
              </div>
            </Link>
          ))}
           */}
        </div>
      </div>
    </div>
  );
}
