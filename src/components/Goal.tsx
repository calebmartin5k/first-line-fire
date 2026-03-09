"use client";
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Goal() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.fade-up', 
        { opacity: 0, y: 40 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1, 
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="py-24 md:py-40 px-8 md:px-16 lg:px-24 bg-[#e5e5e5]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16 md:gap-24">
        <div className="w-full md:w-1/3 fade-up">
          <h2 className="font-serif text-4xl md:text-5xl text-dark">Our goal is</h2>
        </div>
        
        <div className="w-full md:w-1/3 fade-up">
          <div className="aspect-[3/4] overflow-hidden rounded-sm">
            <img 
              src="https://images.squarespace-cdn.com/content/v1/6048cdd38eac65234887e5fb/1615779359072-101Y9OSUIMBSJ5BVFQUW/2795627_orig.jpg" 
              alt="First-Line Fire Extinguisher Van" 
              className="w-full h-full object-cover transition-all duration-700"
            />
          </div>
        </div>

        <div className="w-full md:w-1/3 fade-up">
          <p className="font-serif text-3xl md:text-4xl leading-tight text-dark">
            to deliver world-class fire protection through advanced techniques, customized systems, and a bespoke level of <span className="text-gray-400 italic">service</span> that makes every business feel secure.
          </p>
        </div>
      </div>
    </section>
  );
}
