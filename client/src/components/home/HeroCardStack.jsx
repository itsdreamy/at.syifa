import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function HeroCardStack() {
  const [hovered, setHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  const cards = [
    {
      id: 1,
      image: '/assets/syifa/syifa-2.jpeg',
      initialRotate: -12,
      hoverRotate: -22,
      hoverX: -90,
      hoverY: 10,
      aspect: 'aspect-[3/4]',
      width: 'w-64 sm:w-72',
      bg: 'bg-stone-800'
    },
    {
      id: 2,
      image: '/assets/syifa/syifa-3.jpeg',
      initialRotate: 8,
      hoverRotate: 18,
      hoverX: 85,
      hoverY: -20,
      aspect: 'aspect-[3/4]',
      width: 'w-64 sm:w-72',
      bg: 'bg-neutral-900'
    },
    {
      id: 3,
      image: '/assets/syifa/syifa-4.jpeg',
      initialRotate: -2,
      hoverRotate: 0,
      hoverX: 0,
      hoverY: -35,
      aspect: 'aspect-[3/4]',
      width: 'w-72 sm:w-80',
      bg: 'bg-[#F26430]' // bold warm accent like the video!
    }
  ];

  return (
    <div 
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        setMousePos({ x: 0, y: 0 });
      }}
      className="relative w-full h-[420px] sm:h-[500px] flex items-center justify-center cursor-pointer select-none"
    >
      {cards.map((card, i) => {
        const isCenter = i === cards.length - 1;
        const currentRotate = hovered ? card.hoverRotate : card.initialRotate;
        const currentX = hovered ? card.hoverX + mousePos.x * 30 : mousePos.x * 15;
        const currentY = hovered ? card.hoverY + mousePos.y * 30 : mousePos.y * 15;

        return (
          <motion.div
            key={card.id}
            initial={false}
            animate={{
              x: currentX,
              y: currentY,
              rotate: currentRotate + (mousePos.x * 10),
              scale: hovered && isCenter ? 1.05 : 1,
            }}
            transition={{
              type: "spring",
              stiffness: 240,
              damping: 22,
              mass: 0.8
            }}
            style={{ zIndex: i + 1 }}
            className={`absolute ${card.width} ${card.aspect} rounded-2xl overflow-hidden shadow-2xl border-4 border-white ${card.bg}`}
          >
            <img
              src={card.image}
              alt="Visual Showcase"
              className="w-full h-full object-cover pointer-events-none"
              draggable={false}
            />
          </motion.div>
        );
      })}
    </div>
  );
}
