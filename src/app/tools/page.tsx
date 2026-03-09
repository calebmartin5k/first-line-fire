"use client";

import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import PageHero from '../../components/PageHero';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Anchor, Calculator, Map, ClipboardCheck, ArrowRight, ShieldCheck, Cpu } from 'lucide-react';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

export default function ToolsPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate tool sections
      gsap.utils.toArray<HTMLElement>('.tool-section').forEach((section) => {
        gsap.fromTo(section, 
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 80%',
            }
          }
        );
      });

      // Stagger feature cards
      gsap.utils.toArray<HTMLElement>('.feature-grid').forEach((grid) => {
        gsap.fromTo(grid.children,
          { opacity: 0, scale: 0.95 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: grid,
              start: 'top 85%',
            }
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="bg-light min-h-screen font-sans" ref={containerRef}>
      <Navbar darkText={true} />
      <PageHero 
        title="Custom Digital Tools" 
        subtitle="Explore our proprietary software solutions designed to simplify regulatory compliance for our customers and optimize route efficiency for our technicians."
      />

      <section className="px-8 md:px-16 lg:px-24 py-24 bg-white relative overflow-hidden">
        {/* Abstract Background Element */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-red/5 rounded-full blur-3xl -mr-48 -mt-48 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto space-y-32">
          
          {/* Introduction */}
          <div className="tool-section max-w-4xl">
            <h2 className="font-serif text-3xl md:text-5xl text-dark mb-6 leading-tight">
              Driving Fire Safety Through <span className="italic text-brand-red">Innovation</span>
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              At First-Line Fire, we don't just inspect and install—we engineer custom digital platforms that solve the most complex pain points in the fire protection industry. Below are examples of how we leverage technology to empower our clients and our workforce.
            </p>
          </div>

          {/* Tool 1: Maritime Architect */}
          <div id="maritime-architect" className="tool-section scroll-mt-32">
            <div className="bg-dark text-white p-10 md:p-16 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-red to-transparent"></div>
              <div className="absolute bottom-0 right-0 w-80 h-80 bg-brand-red/20 rounded-full blur-3xl -mr-40 -mb-40 pointer-events-none"></div>
              
              <div className="flex flex-col lg:flex-row gap-16 relative z-10">
                <div className="w-full lg:w-1/2">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/10 text-brand-red mb-8">
                    <Anchor size={32} />
                  </div>
                  <p className="text-brand-red text-sm uppercase tracking-widest font-medium mb-4">Customer-Facing App</p>
                  <h3 className="font-serif text-4xl md:text-5xl mb-6">Maritime Compliance & Risk Architect</h3>
                  <div className="text-gray-300 space-y-6 text-lg leading-relaxed">
                    <p>
                      Navigating the USCG Subchapter M regulations is incredibly complex for river vessel operators. This tool is a self-service interactive wizard that allows vessel owners to audit their own compliance instantly.
                    </p>
                    <p>
                      By inputting basic vessel metrics, the Architect calculates exact fire protection requirements using proprietary compliance logic and instantly generates a quote for any missing equipment.
                    </p>
                  </div>
                </div>

                <div className="w-full lg:w-1/2">
                  <div className="bg-white/5 border border-white/10 p-8 backdrop-blur-md">
                    <h4 className="text-xl font-medium mb-6 flex items-center gap-3">
                      <Calculator className="text-brand-red" /> Interactive Example
                    </h4>
                    
                    <div className="space-y-6">
                      <div className="bg-black/40 p-4 border border-white/5">
                        <p className="text-xs text-gray-400 mb-1 uppercase tracking-wider">Example Input</p>
                        <p className="font-medium">Vessel Length: <span className="text-brand-red">85 feet</span></p>
                        <p className="font-medium">Engine Power: <span className="text-brand-red">3,500 BHP</span></p>
                        <p className="font-medium">Fixed System: <span className="text-brand-red">No</span></p>
                      </div>
                      
                      <div className="flex justify-center">
                        <ArrowRight className="text-brand-red opacity-50" />
                      </div>

                      <div className="bg-brand-red/10 p-4 border border-brand-red/20">
                        <p className="text-xs text-brand-red mb-1 uppercase tracking-wider">Instant Compliance Output</p>
                        <ul className="space-y-2 text-sm">
                          <li className="flex gap-2"><ShieldCheck size={16} className="text-brand-red shrink-0" /> Requires: (4) 10-B:C Extinguishers</li>
                          <li className="flex gap-2"><ShieldCheck size={16} className="text-brand-red shrink-0" /> Requires: (4) Additional 40-B Extinguishers for Engine Space</li>
                          <li className="flex gap-2"><ShieldCheck size={16} className="text-brand-red shrink-0" /> Gap Identified: Client missing (2) 40-B units</li>
                        </ul>
                      </div>
                      <button className="w-full bg-white text-dark py-3 font-medium hover:bg-brand-red hover:text-white transition-colors cursor-default">
                        Generate Missing Equipment Quote
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tool 2: Route Optimizer */}
          <div id="route-optimizer" className="tool-section scroll-mt-32">
            <div className="bg-[#e5e5e5] text-dark p-10 md:p-16 relative overflow-hidden border border-dark/5">
              
              <div className="flex flex-col lg:flex-row-reverse gap-16 relative z-10">
                <div className="w-full lg:w-1/2">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-dark text-white mb-8">
                    <Map size={32} />
                  </div>
                  <p className="text-brand-red text-sm uppercase tracking-widest font-medium mb-4">Internal Team App</p>
                  <h3 className="font-serif text-4xl md:text-5xl mb-6">Route Optimizer & Commission Hub</h3>
                  <div className="text-gray-700 space-y-6 text-lg leading-relaxed">
                    <p>
                      Our route-based technicians face massive administrative burdens. The Route Optimizer is a mobile-first field service app that acts as a real-time command center for our workforce.
                    </p>
                    <p>
                      It tracks live commission payouts to motivate staff, uses Geolocation to surface site-specific hazard histories, and groups daily jobs geographically to drastically reduce "windshield time".
                    </p>
                  </div>
                </div>

                <div className="w-full lg:w-1/2">
                  <div className="grid grid-cols-1 gap-4 feature-grid">
                    <div className="bg-white p-6 border border-dark/5 transition-shadow">
                      <h4 className="font-medium text-lg mb-2 flex items-center gap-2">
                        <Cpu className="text-brand-red" size={20}/> Site-Aware Deficiency Capture
                      </h4>
                      <p className="text-gray-600 text-sm">
                        Techs use voice-to-text to dictate notes while walking a facility. The AI instantly generates a professional deficiency report and quote that customers can sign digitally on the spot.
                      </p>
                    </div>
                    <div className="bg-white p-6 border border-dark/5 transition-shadow">
                      <h4 className="font-medium text-lg mb-2 flex items-center gap-2">
                        <ClipboardCheck className="text-brand-red" size={20}/> Live Commission Tracking
                      </h4>
                      <p className="text-gray-600 text-sm">
                        A dynamic chart shows techs exactly how much they are earning per day based on their field sales and inspection volumes, eliminating management disputes.
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-8 p-6 bg-dark text-white text-center">
                    <p className="font-serif text-3xl mb-2 text-brand-red">Eliminates 40%</p>
                    <p className="text-sm text-gray-300">of manual reporting time per technician per week.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="tool-section border-t border-dark/10 pt-24 text-center">
            <h2 className="font-serif text-4xl md:text-5xl text-dark mb-8">
              Experience the difference<br/>
              <span className="italic text-brand-red">technology makes.</span>
            </h2>
            <Link href="/service" className="inline-block bg-dark text-white px-8 py-4 text-sm uppercase tracking-widest font-medium hover:bg-brand-red transition-colors">
              Schedule A Consultation
            </Link>
          </div>

        </div>
      </section>
      
      <Footer />
    </div>
  );
}