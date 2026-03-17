"use client";
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

import Link from 'next/link';

export default function Hero() {
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();
    
    tl.fromTo(textRef.current, 
      { opacity: 0, y: 50 }, 
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
    )
    .fromTo(imageRef.current,
      { opacity: 0, scale: 1.05 },
      { opacity: 1, scale: 1, duration: 1.5, ease: 'power2.out' },
      "-=0.5"
    );
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col md:flex-row pt-24 md:pt-0">
      <div 
        ref={textRef}
        className="w-full md:w-1/2 flex flex-col justify-start xl:justify-center px-8 md:px-10 lg:px-14 xl:px-16 2xl:px-24 pt-48 md:pt-44 lg:pt-40 xl:pt-24 2xl:pt-0 pb-12 z-10 bg-light"
      >
        <p className="md:hidden text-sm uppercase tracking-[0.2em] mb-6 text-gray-500 font-medium">First-Line Fire Extinguisher Co.</p>
        <h1 className="font-serif text-5xl sm:text-6xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-[7rem] leading-[0.9] tracking-tight mb-8 text-balance">
          We make fire <br />
          <span className="italic text-brand-red">safety simple.</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-md mb-12 leading-relaxed">
          Your Trusted Fire Protection & Suppression Company in Paducah, KY.
        </p>
        
        <div className="flex gap-6 items-center">
          <Link href="/service" className="bg-dark text-white px-8 py-4 rounded-full text-sm uppercase tracking-widest font-medium hover:bg-brand-red transition-colors">
            Schedule Service
          </Link>
        </div>
      </div>

      <div 
        ref={imageRef}
        className="w-full md:w-1/2 h-[50vh] md:h-screen relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-black/20 z-10"></div>
        <img 
          src="/hero.webp" 
          alt="Fire Extinguisher Technician" 
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-8 left-8 z-20 text-white max-w-sm">
          <p className="font-serif text-3xl italic mb-2">Protecting your business</p>
          <p className="text-sm opacity-80 font-medium">With life-saving fire suppression and protection systems.</p>
        </div>
      </div>
    </section>
  );
}
