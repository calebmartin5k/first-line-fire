"use client";

import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import PageHero from '../../components/PageHero';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Page() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Fade up generic sections
      gsap.utils.toArray<HTMLElement>('.fade-up').forEach((el) => {
        gsap.fromTo(el,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 80%',
            }
          }
        );
      });

      // Stagger items in solutions grid
      gsap.fromTo('.solution-item',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.solutions-grid',
            start: 'top 75%',
          }
        }
      );

      // Stagger vessel pills
      gsap.fromTo('.vessel-pill',
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          stagger: 0.05,
          ease: 'back.out(1.2)',
          scrollTrigger: {
            trigger: '.vessels-container',
            start: 'top 85%',
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="bg-light min-h-screen font-sans" ref={containerRef}>
      <Navbar />
      <PageHero 
        title="River Industry Fire Protection" 
        subtitle="Ensuring your river vessels remain protected, code-compliant, and operational with our comprehensive marine fire safety solutions."
        imageUrl="https://images.squarespace-cdn.com/content/v1/6048cdd38eac65234887e5fb/bb4f0d05-6bf0-41a3-a773-edd23a9dab7d/river-industry.jpg"
      />
      
      <section className="px-8 md:px-16 lg:px-24 py-24 bg-white relative overflow-hidden">
        {/* Abstract Background Elements */}
        <div className="absolute top-40 left-0 w-96 h-96 bg-brand-red/5 rounded-full blur-3xl -ml-48 pointer-events-none"></div>

        <div className="max-w-4xl mx-auto space-y-24 text-lg text-gray-700 leading-relaxed relative z-10">
          
          <div className="grid md:grid-cols-2 gap-12 items-center fade-up">
            <div>
              <h2 className="font-serif text-4xl md:text-5xl text-dark mb-6 leading-tight">
                Understanding River Industry <span className="italic text-brand-red">Challenges</span>
              </h2>
              <p>
                River vessels face unique fire safety vulnerabilities unlike those of land-based operations. The combination of confined spaces, limited evacuation options, fuel and mechanical systems, remote locations with delayed emergency response, and constantly changing environmental conditions creates extraordinary fire risks. Add to this the complex web of USCG, NFPA, and TSMS regulatory requirements, and river operations face a perfect storm of fire safety challenges.
              </p>
            </div>
            <div className="bg-[#e5e5e5] p-8 border border-dark/10">
              <h3 className="font-serif text-2xl text-dark mb-6">Real-World Pain Points</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-4">
                  <span className="w-2 h-2 rounded-full bg-brand-red mt-2 shrink-0 shadow-[0_0_8px_rgba(224,57,62,0.6)]" />
                  <span className="text-sm"><strong>Operational downtime:</strong> Every hour a vessel is non-operational due to fire damage or safety violations costs thousands in lost revenue</span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="w-2 h-2 rounded-full bg-brand-red mt-2 shrink-0 shadow-[0_0_8px_rgba(224,57,62,0.6)]" />
                  <span className="text-sm"><strong>Remote locations:</strong> Emergency services may be hours away, making self-sufficiency critical</span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="w-2 h-2 rounded-full bg-brand-red mt-2 shrink-0 shadow-[0_0_8px_rgba(224,57,62,0.6)]" />
                  <span className="text-sm"><strong>Regulatory complexity:</strong> USCG requirements, NFPA standards, and TSMS documentation demand specialized knowledge</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-dark text-white p-12 md:p-16 relative overflow-hidden fade-up solutions-grid">
            <div className="absolute top-0 right-0 w-80 h-80 bg-brand-red/20 blur-3xl -mr-40 -mt-40 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 blur-2xl -ml-32 -mb-32 pointer-events-none"></div>
            
            <h2 className="font-serif text-4xl md:text-5xl mb-12 relative z-10 text-center">
              Comprehensive <span className="italic text-brand-red">Solutions</span>
            </h2>
            
            <div className="grid md:grid-cols-2 gap-12 relative z-10">
              <div className="solution-item bg-white/5 p-8 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors">
                <h3 className="font-serif text-2xl mb-4 text-brand-red">Fire Extinguishers</h3>
                <p className="text-gray-300 text-sm">
                  Expert marine fire risk assessment to determine appropriate extinguisher types, quantities, and placement. Strategic installation according to USCG and NFPA 10. Mobile on-site recharge capabilities minimize downtime.
                </p>
              </div>
              <div className="solution-item bg-white/5 p-8 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors">
                <h3 className="font-serif text-2xl mb-4 text-brand-red">Suppression Systems</h3>
                <p className="text-gray-300 text-sm">
                  Coast Guard-approved pre-engineered systems designed to detect and suppress fires quickly. FM-200, CO2, and clean agent systems built explicitly for river vessel engine rooms.
                </p>
              </div>
              <div className="solution-item bg-white/5 p-8 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors">
                <h3 className="font-serif text-2xl mb-4 text-brand-red">Alarm Systems</h3>
                <p className="text-gray-300 text-sm">
                  Early fire detection is critical. We offer regular testing and inspection according to NFPA 72 standards, seamlessly integrated with vessel monitoring systems.
                </p>
              </div>
              <div className="solution-item bg-white/5 p-8 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors">
                <h3 className="font-serif text-2xl mb-4 text-brand-red">Safety Training</h3>
                <p className="text-gray-300 text-sm">
                  Hands-on fire extinguisher training with live fire demonstrations aboard your vessels. Digital resources for crew onboarding and custom emergency action plan development.
                </p>
              </div>
            </div>
          </div>

          <div className="text-center max-w-3xl mx-auto vessels-container fade-up">
            <h2 className="font-serif text-4xl md:text-5xl text-dark mb-10">
              Vessels We <span className="italic text-gray-400">Protect</span>
            </h2>
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              {['Towboats & tugboats', 'Cargo barges', 'Passenger ferries', 'Dredging equipment', 'Commercial fishing', 'Crew transport boats', 'Shipyards'].map(vessel => (
                <span key={vessel} className="vessel-pill px-8 py-4 bg-light border border-dark/10 text-sm font-medium hover:border-brand-red hover:text-brand-red transition-all cursor-default">
                  {vessel}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-24 border-t border-dark/10 pt-24 text-center fade-up">
            <h2 className="font-serif text-4xl md:text-5xl text-dark mb-8">
              Turn fire safety into an<br/>
              <span className="italic text-brand-red">operational advantage.</span>
            </h2>
            <Link href="/service" className="inline-block bg-dark text-white px-8 py-4 rounded-full text-sm uppercase tracking-widest font-medium hover:bg-brand-red transition-colors">
              Schedule Assessment
            </Link>
          </div>

        </div>
      </section>
      
      <Footer />
    </div>
  );
}