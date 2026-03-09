"use client";
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    num: '01',
    title: 'Get in Touch',
    desc: 'Give us a call or fill out the form below to speak with a fire protection specialist about your business\' unique needs.',
    img: 'https://images.squarespace-cdn.com/content/v1/6048cdd38eac65234887e5fb/1627435762599-KQWRSXV4UPJZ69MGWLSH/IMG_4422.jpeg'
  },
  {
    num: '02',
    title: 'Get Up to Code',
    desc: 'Our technician will visit your facility, assess your specific needs, and equip you with everything you need to be safe and in compliance.',
    img: 'https://images.squarespace-cdn.com/content/v1/6048cdd38eac65234887e5fb/1627435832295-70PCR4APHYWQO7RTVOOP/IMG_4459.jpeg'
  },
  {
    num: '03',
    title: 'Get Back to Business',
    desc: 'Take one more thing off your to-do list. We\'ll keep you updated when it\'s time for service so you never have to worry about it again.',
    img: 'https://images.squarespace-cdn.com/content/v1/6048cdd38eac65234887e5fb/1627435967140-IWPQO9971VM8Y00V5C3K/219603096_1408458836202761_9061316575541296135_n.jpeg'
  }
];

export default function Process() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.process-step').forEach((step: any) => {
        gsap.fromTo(step,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: step,
              start: 'top 70%'
            }
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 md:py-40 px-8 md:px-16 lg:px-24 bg-light">
      <div className="max-w-7xl mx-auto">
        <div className="mb-24">
          <h2 className="font-serif text-5xl md:text-7xl mb-6">Protect your business today.<br/><span className="italic text-brand-red">Here's how.</span></h2>
        </div>

        <div className="flex flex-col gap-24 md:gap-40">
          {steps.map((step, idx) => (
            <div key={idx} className="process-step flex flex-col md:flex-row items-center gap-12 md:gap-24">
              <div className="w-full md:w-1/2 flex items-center gap-8">
                <div className="flex items-baseline gap-2">
                  <span className="font-serif text-6xl md:text-8xl text-dark">{step.num}</span>
                  <span className="text-sm font-medium text-gray-500">/ 03</span>
                </div>
                <div className="aspect-square w-full max-w-sm overflow-hidden rounded-sm relative group">
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
                  <img 
                    src={step.img} 
                    alt={step.title} 
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>
              <div className="w-full md:w-1/2">
                <p className="text-sm uppercase tracking-widest text-gray-400 mb-4">Process</p>
                <h3 className="font-serif text-4xl md:text-5xl mb-6">{step.title}</h3>
                <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-md">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
