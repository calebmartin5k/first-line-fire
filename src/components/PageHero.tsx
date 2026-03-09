"use client";
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface PageHeroProps {
  title: string;
  subtitle?: string;
  imageUrl?: string;
}

export default function PageHero({ title, subtitle, imageUrl }: PageHeroProps) {
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();
    
    tl.fromTo(textRef.current, 
      { opacity: 0, y: 50 }, 
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
    );
    
    if (imageRef.current) {
      tl.fromTo(imageRef.current,
        { opacity: 0, scale: 1.05 },
        { opacity: 1, scale: 1, duration: 1.5, ease: 'power2.out' },
        "-=0.5"
      );
    }
  }, []);

  return (
    <section className="relative min-h-[70vh] flex flex-col md:flex-row">
      <div 
        ref={textRef}
        className={`w-full ${imageUrl ? 'md:w-1/2' : 'md:w-full max-w-4xl mx-auto'} flex flex-col justify-center px-8 md:px-16 lg:px-24 pt-32 pb-16 md:pt-40 md:pb-24 z-10 bg-light`}
      >
        <p className="text-sm uppercase tracking-[0.2em] mb-6 text-brand-red font-medium">First-Line Fire</p>
        <h1 className="font-serif text-6xl md:text-7xl lg:text-8xl leading-[0.9] tracking-tight mb-8 text-balance">
          {title.split(' ').map((word, i, arr) => {
            // Apply italic to the last word or specific key words if desired
            if (i === arr.length - 1) {
              return <span key={i} className="italic text-brand-red">{word}</span>;
            }
            return word + ' ';
          })}
        </h1>
        {subtitle && (
          <p className="text-lg md:text-xl text-gray-600 max-w-md mb-12 leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>

      {imageUrl && (
        <div 
          ref={imageRef}
          className="w-full md:w-1/2 h-[50vh] md:h-auto relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-black/20 z-10"></div>
          <img 
            src={imageUrl} 
            alt={title} 
            className="w-full h-full object-cover"
          />
        </div>
      )}
    </section>
  );
}
