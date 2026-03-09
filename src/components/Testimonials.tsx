"use client";
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Testimonials() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.testimonial-text',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.3,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%'
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="testimonials" className="py-24 md:py-40 px-8 md:px-16 lg:px-24 bg-[#e5e5e5]">
      <div className="max-w-4xl mx-auto text-center">
        <div className="testimonial-text mb-16">
          <p className="font-serif text-3xl md:text-5xl leading-tight mb-8 text-dark">
            "They are very friendly and efficient in all they do. I recommend First-Line Fire Extinguisher for all of your fire extinguisher needs!"
          </p>
          <p className="text-sm uppercase tracking-widest text-gray-500">— Kandi H.</p>
        </div>

        <div className="w-24 h-px bg-gray-300 mx-auto my-16"></div>

        <div className="testimonial-text">
          <p className="font-serif text-3xl md:text-5xl leading-tight mb-8 text-dark">
            "When I called it was one of the best experiences. They worked with me and were always there for me when I needed anything. <span className="italic text-brand-red">Just a great company!</span>"
          </p>
          <p className="text-sm uppercase tracking-widest text-gray-500">— Shawn M.</p>
        </div>
      </div>
    </section>
  );
}
