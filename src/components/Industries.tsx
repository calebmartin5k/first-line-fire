"use client";
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const industries = [
  {
    title: 'Industrial',
    desc: 'Keep your facility safe and fully operational with no interruptions.',
    img: 'https://images.squarespace-cdn.com/content/v1/6048cdd38eac65234887e5fb/e2d40310-1364-49a4-9590-3815141f15a9/IMG_4924.jpg'
  },
  {
    title: 'Commercial',
    desc: 'Expert fire suppression system installation and annual maintenance.',
    img: 'https://images.squarespace-cdn.com/content/v1/6048cdd38eac65234887e5fb/1627424023819-8BIISNR91X4X6A2DZW8F/IMG_3955.jpeg'
  },
  {
    title: 'River Industry',
    desc: 'Ensure your tow boats stay operational and safe with reliable suppression.',
    img: 'https://images.squarespace-cdn.com/content/v1/6048cdd38eac65234887e5fb/1627434613503-RORBBMZY1ZD4HPJZ6C5U/IMG_4632.jpeg'
  },
  {
    title: 'Vehicle',
    desc: 'Safeguard your off-road and construction equipment.',
    img: 'https://images.squarespace-cdn.com/content/v1/6048cdd38eac65234887e5fb/1627434786266-67RFV9H51N9K8VI0TADG/Image-2.jpg'
  }
];

export default function Industries() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.industry-card',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.1,
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
    <section ref={sectionRef} id="industries" className="relative py-24 md:py-40 px-8 md:px-16 lg:px-24 bg-dark text-white overflow-hidden">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[150%] text-center pointer-events-none opacity-10">
        <h2 className="font-serif text-[15vw] leading-none whitespace-nowrap">Industries We Serve</h2>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <h2 className="font-serif text-5xl md:text-7xl mb-6">We're here to <span className="italic text-brand-red">serve you.</span></h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            We serve a wide range of industries, providing industry-specific fire suppression systems to ensure maximum safety and compliance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {industries.map((ind, idx) => (
            <div key={idx} className="industry-card flex flex-col group cursor-pointer">
              <div className="aspect-[3/4] overflow-hidden rounded-sm mb-6 relative">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
                <img 
                  src={ind.img} 
                  alt={ind.title} 
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <h3 className="font-serif text-2xl mb-2">{ind.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {ind.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
