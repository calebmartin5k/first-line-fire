"use client";
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

import Link from 'next/link';

const services = [
  {
    title: 'Fire Extinguishers',
    desc: 'Full installation, inspection, and mobile recharge.',
    img: 'https://images.squarespace-cdn.com/content/v1/6048cdd38eac65234887e5fb/1627423237823-I2Z7R2INIX4DIW83BO49/Fire+Extinguishers+in+First-Line+Fire+Truck'
  },
  {
    title: 'Emergency Lighting',
    desc: 'Ensure that your emergency lights are fully functional.',
    img: 'https://images.squarespace-cdn.com/content/v1/6048cdd38eac65234887e5fb/1627423462082-4MDFSEZA2NY6K37RL8T3/exit+light+installation.jpg'
  },
  {
    title: 'Fire Alarms & Security',
    desc: 'Protect your business with our state-of-the-art systems.',
    img: 'https://images.squarespace-cdn.com/content/v1/6048cdd38eac65234887e5fb/1627423585450-1F80CW78DO18QBSEIHQP/exterior+security+camera+installation'
  },
  {
    title: 'Safety Training',
    desc: 'Keep your employees and staff trained for emergencies.',
    img: 'https://images.squarespace-cdn.com/content/v1/6048cdd38eac65234887e5fb/1627423687993-SV3UPBWR1OJ7POVE5SS4/employee+fire+safety+training.jpeg'
  }
];

export default function Services() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeImg, setActiveImg] = useState(services[0].img);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.service-item', 
        { opacity: 0, x: 50 },
        { 
          opacity: 1, 
          x: 0, 
          duration: 0.8, 
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="services" className="bg-dark text-white py-24 md:py-40 px-8 md:px-16 lg:px-24">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16">
        <div className="w-full lg:w-1/2 flex flex-col justify-between">
          <div>
            <p className="text-sm uppercase tracking-widest text-gray-400 mb-8">Our Solutions:</p>
            <h2 className="font-serif text-5xl md:text-7xl leading-[0.9] mb-12">
              Comprehensive<br />
              <span className="italic text-brand-red">Protection</span>
            </h2>
          </div>
          
          <div className="hidden lg:block aspect-[4/5] w-3/4 overflow-hidden rounded-sm relative">
            <img 
              key={activeImg}
              src={activeImg} 
              alt="Service" 
              className="w-full h-full object-cover animate-in fade-in duration-500"
            />
          </div>
        </div>

        <div className="w-full lg:w-1/2 flex flex-col justify-center">
          <p className="text-xl md:text-2xl font-light mb-16 text-gray-300">
            From fire extinguishers and emergency lighting to complete alarm systems, we use the latest techniques to create safe, compliant environments.
          </p>

          <div className="flex flex-col border-t border-white/10">
            {services.map((service, idx) => (
              <div 
                key={idx}
                className="service-item group flex items-center justify-between py-8 border-b border-white/10 cursor-pointer transition-colors hover:bg-white/5 px-4 -mx-4"
                onMouseEnter={() => setActiveImg(service.img)}
              >
                <div>
                  <h3 className="text-2xl font-medium mb-2">{service.title}</h3>
                  <p className="text-gray-400 text-sm">{service.desc}</p>
                </div>
                <ArrowUpRight className="opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0 text-brand-red" />
              </div>
            ))}
          </div>
          
          <div className="mt-16">
            <Link href="/fire-extinguisher-sales-service" className="inline-flex items-center gap-2 bg-white text-dark px-8 py-4 rounded-full text-sm font-medium hover:bg-brand-red hover:text-white transition-colors">
              Learn More <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
