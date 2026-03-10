"use client";
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Goal() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.goal-intro', 
        { opacity: 0, y: 40 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1, 
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            once: true,
          }
        }
      );

      const copyTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 58%',
          toggleActions: 'play none none none',
          once: true,
        }
      });

      copyTl.fromTo('.goal-copy',
        { y: 140, opacity: 0.35 },
        { y: 0, opacity: 1, duration: 1.05, ease: 'power3.out' },
        0
      );

      copyTl.fromTo('.goal-line',
        { opacity: 0, y: 90 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.11,
          ease: 'power4.out'
        },
        0.12
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="pt-10 pb-24 md:pt-14 md:pb-40 px-6 md:px-10 lg:px-12 bg-[#e5e5e5]">
      <div className="max-w-[1700px] mx-auto w-full grid grid-cols-1 md:grid-cols-[max-content_minmax(0,1fr)] gap-12 md:gap-10 lg:gap-16">
        <div className="goal-intro w-full flex flex-col md:flex-row md:items-center gap-10 md:gap-8 lg:gap-10">
          <div className="w-full md:w-auto md:flex-none text-center md:text-right">
            <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl text-dark leading-none">Our goal is</h2>
          </div>

          <div className="w-full max-w-sm md:max-w-none md:w-[320px] lg:w-[360px] z-10 relative">
            <div className="aspect-[3/4] overflow-hidden rounded-sm shadow-xl">
              <img 
                src="https://images.squarespace-cdn.com/content/v1/6048cdd38eac65234887e5fb/1615779359072-101Y9OSUIMBSJ5BVFQUW/2795627_orig.jpg" 
                alt="First-Line Fire Extinguisher Van" 
                className="w-full h-full object-cover transition-all duration-700"
              />
            </div>
          </div>
        </div>

        <div className="w-full goal-copy text-center md:text-left md:pt-64 lg:pt-72">
          <p className="font-serif text-3xl md:text-[clamp(2.6rem,4.2vw,5.6rem)] leading-[1.03] text-dark">
            <span className="block overflow-hidden"><span className="goal-line block">to deliver world-class</span></span>
            <span className="block overflow-hidden"><span className="goal-line block">fire protection through</span></span>
            <span className="block overflow-hidden"><span className="goal-line block">advanced techniques,</span></span>
            <span className="block overflow-hidden"><span className="goal-line block">customized systems, and</span></span>
            <span className="block overflow-hidden"><span className="goal-line block">a bespoke level of</span></span>
            <span className="block overflow-hidden"><span className="goal-line block"><span className="text-gray-400 italic">service</span> that makes every</span></span>
            <span className="block overflow-hidden"><span className="goal-line block">business feel secure.</span></span>
          </p>
        </div>
      </div>
    </section>
  );
}
