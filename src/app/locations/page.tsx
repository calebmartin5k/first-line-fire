"use client";

import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import PageHero from '../../components/PageHero';
import Link from 'next/link';
import { ArrowUpRight, MapPin, Phone } from 'lucide-react';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const locations = [
  {
    city: "Paducah",
    state: "KY",
    phone: "(270) 491-3309",
    phoneClean: "2704913309",
    address: "1333 N 8th St",
    zip: "Paducah, KY 42001",
    img: "https://images.squarespace-cdn.com/content/v1/6048cdd38eac65234887e5fb/1630638865411-CRT941D5U4J6ZTRQ5ANO/IMG_4462.jpeg"
  },
  {
    city: "Madisonville",
    state: "KY",
    phone: "(270) 825-3795",
    phoneClean: "2708253795",
    address: "1503 West Noel Avenue",
    zip: "Madisonville, KY 42431",
    img: "https://images.squarespace-cdn.com/content/v1/6048cdd38eac65234887e5fb/1632168789476-6I2EHWIHCPR3GF85JLRG/IMG_8384.jpeg"
  },
  {
    city: "Princeton",
    state: "IN",
    phone: "(812) 635-0320",
    phoneClean: "8126350320",
    address: "213 S Hall St",
    zip: "Princeton, IN 47670",
    img: "https://images.squarespace-cdn.com/content/v1/6048cdd38eac65234887e5fb/1632171025823-QFXW2AK4L8NHXRAIBAOE/part0.jpeg"
  }
];

export default function Page() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.location-card',
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.locations-grid',
            start: 'top 80%',
          }
        }
      );

      gsap.fromTo('.cta-banner',
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.cta-banner',
            start: 'top 85%',
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="bg-light min-h-screen font-sans" ref={containerRef}>
      <Navbar darkText={true} />
      <PageHero 
        title="Our Locations" 
        subtitle="Proudly serving Kentucky, Illinois, Indiana, and Tennessee with industry-leading fire protection and suppression systems."
      />
      
      <section className="px-8 md:px-16 lg:px-24 py-24 bg-white relative overflow-hidden">
        {/* Background Graphic */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-dark/5 rounded-full blur-3xl pointer-events-none -mr-48 -mt-48"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-3 gap-12 locations-grid">
            {locations.map((loc, idx) => (
              <div key={idx} className="location-card group flex flex-col bg-white border border-dark/10 transition-all duration-500 hover:-translate-y-2">
                <div className="aspect-[4/3] overflow-hidden relative">
                  <div className="absolute inset-0 bg-brand-red/20 mix-blend-multiply z-10 group-hover:bg-transparent transition-colors duration-500"></div>
                  <img 
                    src={loc.img} 
                    alt={`${loc.city} Office`} 
                    className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-700" 
                  />
                </div>
                
                <div className="p-10 flex flex-col grow">
                  <h2 className="font-serif text-4xl text-dark mb-8 flex items-baseline gap-2">
                    {loc.city} <span className="text-2xl italic text-brand-red">{loc.state}</span>
                  </h2>
                  
                  <div className="space-y-6 mt-auto">
                    <div className="flex items-start gap-4 p-4 bg-light group-hover:bg-brand-red/5 transition-colors">
                      <MapPin className="text-brand-red shrink-0 mt-1" size={24} />
                      <div>
                        <p className="text-dark font-medium">{loc.address}</p>
                        <p className="text-gray-500 text-sm mt-1">{loc.zip}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 p-4 bg-light group-hover:bg-brand-red/5 transition-colors">
                      <Phone className="text-brand-red shrink-0" size={24} />
                      <a href={`tel:${loc.phoneClean}`} className="text-dark font-medium hover:text-brand-red transition-colors text-lg">
                        {loc.phone}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-32 bg-dark text-white p-12 md:p-20 text-center relative overflow-hidden cta-banner">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-brand-red/20 rounded-full blur-3xl -mt-[400px] pointer-events-none"></div>
            <div className="relative z-10">
              <h2 className="font-serif text-4xl md:text-6xl mb-6">Need service at your <span className="italic text-brand-red">location?</span></h2>
              <p className="text-gray-300 max-w-2xl mx-auto mb-10 text-xl leading-relaxed">
                Our mobile service teams are equipped to handle inspections, installations, and recharge services directly at your facility or vessel.
              </p>
              <Link href="/service" className="inline-flex items-center gap-2 bg-brand-red text-white px-10 py-5 rounded-full text-sm uppercase tracking-widest font-medium hover:bg-white hover:text-brand-red transition-all hover:scale-105">
                Schedule Mobile Service <ArrowUpRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}