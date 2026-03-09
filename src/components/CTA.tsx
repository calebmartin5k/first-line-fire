"use client";
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

import Link from 'next/link';

export default function CTA() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.cta-content',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%'
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="contact" className="py-24 md:py-40 px-8 md:px-16 lg:px-24 bg-brand-red text-white text-center">
      <div className="max-w-4xl mx-auto cta-content">
        <h2 className="font-serif text-5xl md:text-7xl mb-8">Bring your business<br/><span className="italic">up to code.</span></h2>
        <p className="text-xl mb-12 opacity-90">
          Call us at (270) 554-3473 to speak with a fire protection specialist or fill out the form for a free quote.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <a href="tel:2705543473" className="bg-white text-brand-red px-8 py-4 rounded-full text-sm font-medium uppercase tracking-widest hover:bg-dark hover:text-white transition-colors">
            Call Now
          </a>
          <Link href="/service" className="bg-transparent border border-white text-white px-8 py-4 rounded-full text-sm font-medium uppercase tracking-widest hover:bg-white hover:text-brand-red transition-colors">
            Request Quote
          </Link>
        </div>
      </div>
    </section>
  );
}
