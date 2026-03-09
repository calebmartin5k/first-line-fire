"use client";
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Statement() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.statement-word',
        { opacity: 0, y: 100 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          stagger: 0.1,
          ease: 'power4.out',
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
    <section ref={sectionRef} className="py-24 md:py-40 px-8 md:px-16 lg:px-24 bg-[#e5e5e5] overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col items-center justify-center text-center">
        <h2 className="font-serif text-6xl md:text-8xl lg:text-9xl leading-[0.9] tracking-tight flex flex-wrap justify-center gap-x-6 gap-y-4">
          <span className="statement-word inline-block">Industry-Leading</span>
          <span className="statement-word inline-block">Fire</span>
          <span className="statement-word inline-block">Safety</span>
          <span className="w-full h-0"></span>
          <span className="statement-word inline-block italic text-brand-red">for</span>
          <span className="statement-word inline-block">Complete</span>
          <span className="w-full h-0"></span>
          <span className="statement-word inline-block">Peace</span>
          <span className="statement-word inline-block italic text-brand-red">of</span>
          <span className="statement-word inline-block">Mind</span>
        </h2>
      </div>
    </section>
  );
}
