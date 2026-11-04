import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { HeartHandshake, Calendar, ArrowUpRight, Instagram, Play } from 'lucide-react';
import ImageModal from '../common/ImageModal';

export default function VolunteerSection({ volunteer = [] }) {
  const [modalImage, setModalImage] = useState(null);

  return (
    <div className="w-full">
      {/* Section Header — no border-b (StackedSection provides visual separation via rounded top + shadow) */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase font-extrabold tracking-widest text-muted">
              BEYOND THE SCREEN
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground">
            Giving Back, Growing Together.
          </h2>
        </div>
      </div>

      {/* Section Introduction */}
      <div className="mb-12 max-w-3xl">
        <p className="text-secondary text-base sm:text-lg font-normal leading-relaxed">
          Some meaningful experiences happen outside the classroom and the screen. Through volunteering, I've had the opportunity to collaborate with others, take responsibility, contribute to communities, and learn from experiences beyond my usual environment.
        </p>
      </div>

      {/* 3-Column Portrait Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {volunteer.map((item, idx) => (
          <motion.div
            key={item.id || idx}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: idx * 0.12, ease: 'easeOut' }}
            className="group bg-surface rounded-2xl overflow-hidden border border-border hover:border-black/40 hover:shadow-lg transition-all duration-300 flex flex-col"
          >
            {/* Portrait Image Container (3:4 ratio) */}
            <div
              onClick={() => setModalImage({ src: item.image, title: `${item.organization} — ${item.role}` })}
              className="relative w-full aspect-[3/4] overflow-hidden bg-stone-100 cursor-pointer"
            >
              <img
                src={item.image}
                alt={item.organization || 'Volunteer photograph'}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                loading="lazy"
              />

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 backdrop-blur-sm text-foreground text-xs font-bold px-3 py-1.5 rounded-full shadow-md flex items-center gap-1.5">
                  <span>Enlarge Photo</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>

            {/* Content beneath portrait image */}
            <div className="p-5 flex flex-col flex-grow justify-between space-y-3">
              <div>
                <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-muted mb-2">
                  <span className="flex items-center gap-1.5">
                    <HeartHandshake className="w-3.5 h-3.5 text-black" />
                    <span>{item.role}</span>
                  </span>
                  <span className="flex items-center gap-1 text-[11px] font-mono">
                    <Calendar className="w-3 h-3" />
                    {item.date}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight text-foreground group-hover:text-black mb-2 leading-snug">
                  {item.organization}
                </h3>

                <p className="text-secondary text-sm leading-relaxed font-normal">
                  {item.description}
                </p>
              </div>

              {/* Optional: Instagram source link at card bottom */}
              {item.reelUrl && (
                <a
                  href={item.reelUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-muted hover:text-foreground transition-colors mt-1"
                >
                  <Instagram className="w-3.5 h-3.5" />
                  <span>View on Instagram</span>
                </a>
              )}

              {item.contribution && (
                <div className="pt-3 border-t border-border/70 text-xs font-mono text-muted">
                  <span className="text-foreground font-semibold">Focus: </span>
                  {item.contribution}
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {modalImage && (
        <ImageModal
          isOpen={!!modalImage}
          src={modalImage.src}
          alt={modalImage.title}
          caption={modalImage.title}
          onClose={() => setModalImage(null)}
        />
      )}
    </div>
  );
}
