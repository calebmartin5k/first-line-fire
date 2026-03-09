"use client";

import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import PageHero from '../../components/PageHero';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function FireExtinguisherSalesService() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // General fade up elements
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

      // Stagger list items in hazard section
      gsap.fromTo('.hazard-item',
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.hazard-list',
            start: 'top 85%',
          }
        }
      );
      
      // Image scale effect
      gsap.utils.toArray<HTMLElement>('.img-reveal').forEach((el) => {
        gsap.fromTo(el,
          { clipPath: 'inset(10% 10% 10% 10%)', scale: 1.1 },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            scale: 1,
            duration: 1.5,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 75%',
            }
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="bg-light min-h-screen font-sans" ref={containerRef}>
      <Navbar />
      <PageHero 
        title="Fire Extinguisher Sales and Service" 
        subtitle="Make sure that your facility is properly outfitted with the right fire protection equipment and that everything is operating correctly."
        imageUrl="https://images.squarespace-cdn.com/content/v1/6048cdd38eac65234887e5fb/ca05da42-6d79-4f9e-a835-214471b31a8f/fire+extinguisher+service.jpeg"
      />
      
      <section className="px-8 md:px-16 lg:px-24 py-24 bg-white relative overflow-hidden">
        {/* Abstract Background Element */}
        <div className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] bg-brand-red/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 lg:gap-24 relative z-10">
          
          <div className="w-full lg:w-1/2">
            <div className="fade-up">
              <h2 className="font-serif text-4xl md:text-5xl text-dark mb-8 leading-tight">
                Protect Your Business and Stay <span className="italic text-brand-red">Code-Compliant</span>
              </h2>
              <div className="text-lg text-gray-700 leading-relaxed space-y-6">
                <p>
                  By equipping your business with adequate fire extinguishers and other protection equipment, you’ll remain prepared in the event of a fire emergency and stay compliant with all of your local fire codes.
                </p>
                <p>
                  At First-Line Fire, we offer a full range of fire extinguishers for sale and service, so you can be sure that your business is properly protected.
                </p>
              </div>
            </div>

            <div className="my-16 aspect-[4/3] overflow-hidden relative fade-up">
              <img 
                src="https://images.squarespace-cdn.com/content/v1/6048cdd38eac65234887e5fb/38b09542-eced-457f-8c25-05c9d60e1539/first-line-fire-fire-extinguisher-servicing.jpeg" 
                alt="A red fire extinguisher from First Line Fire" 
                className="w-full h-full object-cover img-reveal"
              />
            </div>

            <div className="fade-up">
              <h2 className="font-serif text-3xl md:text-4xl text-dark mb-6">
                What Type Do You Need?
              </h2>
              <div className="text-lg text-gray-700 leading-relaxed space-y-6 mb-16">
                <p>
                  There are many different types and sizes available, so it’s important to choose the ones best suited for your business. Our experts can help you select the right extinguishers based on facility size and potential fire types.
                </p>
                <p>
                  Every business is different. We begin every service by understanding your business. Our technicians conduct a full fire safety walkthrough to determine which types of extinguishers you’ll need based upon existing potential fire hazards.
                </p>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-1/2">
            <div className="bg-dark text-white p-10 md:p-12 mb-16 relative overflow-hidden fade-up">
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand-red/20 blur-3xl -mr-32 -mt-32"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 blur-2xl -ml-24 -mb-24"></div>
              
              <h2 className="font-serif text-3xl md:text-4xl mb-8 relative z-10">
                How Many Extinguishers <span className="italic text-brand-red">Do I Need?</span>
              </h2>
              <p className="text-gray-300 mb-8 relative z-10 text-lg">
                In order to meet requirements, each business must have a certain number of extinguishers based on specific NFPA guidelines.
              </p>
              
              <div className="space-y-8 relative z-10">
                <div>
                  <h3 className="font-serif text-xl mb-2 text-brand-red">Building Size and Layout</h3>
                  <p className="text-gray-300 text-sm">Large or multi-floor buildings require more extinguishers than smaller single-story buildings.</p>
                </div>
                <div>
                  <h3 className="font-serif text-xl mb-2 text-brand-red">Fire Hazard Level</h3>
                  <p className="text-gray-300 text-sm mb-4">Assesses the risk of a fire starting based on business type and materials present:</p>
                  <ul className="text-sm text-gray-300 space-y-3 hazard-list">
                    <li className="hazard-item flex gap-3 items-center bg-white/5 p-2 rounded-md"><span className="flex items-center justify-center w-6 h-6 rounded bg-brand-red text-white font-bold text-xs">A</span> Combustible products like paper, wood</li>
                    <li className="hazard-item flex gap-3 items-center bg-white/5 p-2 rounded-md"><span className="flex items-center justify-center w-6 h-6 rounded bg-brand-red text-white font-bold text-xs">B</span> Flammable gasses or liquids</li>
                    <li className="hazard-item flex gap-3 items-center bg-white/5 p-2 rounded-md"><span className="flex items-center justify-center w-6 h-6 rounded bg-brand-red text-white font-bold text-xs">C</span> Electrical wiring</li>
                    <li className="hazard-item flex gap-3 items-center bg-white/5 p-2 rounded-md"><span className="flex items-center justify-center w-6 h-6 rounded bg-brand-red text-white font-bold text-xs">D</span> Combustible metals</li>
                    <li className="hazard-item flex gap-3 items-center bg-white/5 p-2 rounded-md"><span className="flex items-center justify-center w-6 h-6 rounded bg-brand-red text-white font-bold text-xs">K</span> Cooking grease or oil</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-serif text-xl mb-2 text-brand-red">Placement Regulations</h3>
                  <p className="text-gray-300 text-sm">Specific codes dictate placement. Our technicians ensure your extinguishers are properly placed and code-compliant.</p>
                </div>
              </div>
            </div>

            <div className="bg-[#e5e5e5] p-10 md:p-12 fade-up border border-dark/5">
              <h2 className="font-serif text-3xl md:text-4xl text-dark mb-8">
                Other <span className="italic text-brand-red">Services</span>
              </h2>
              
              <div className="space-y-6">
                <div className="group bg-white p-8 border border-dark/10 hover:border-brand-red transition-all cursor-default">
                  <h3 className="text-xl font-medium mb-2 text-dark group-hover:text-brand-red transition-colors">Installation</h3>
                  <p className="text-gray-600 text-sm">Experienced installation ensuring proper placement and compliant signage requirements.</p>
                </div>
                <div className="group bg-white p-8 border border-dark/10 hover:border-brand-red transition-all cursor-default">
                  <h3 className="text-xl font-medium mb-2 text-dark group-hover:text-brand-red transition-colors">Maintenance</h3>
                  <p className="text-gray-600 text-sm">Regular on-site inspections to keep equipment up to date and compliant with relevant codes.</p>
                </div>
                <div className="group bg-white p-8 border border-dark/10 hover:border-brand-red transition-all cursor-default">
                  <h3 className="text-xl font-medium mb-2 text-dark group-hover:text-brand-red transition-colors">Safety Training</h3>
                  <p className="text-gray-600 text-sm">On-site employee training ensuring your staff knows exactly what to do in an emergency.</p>
                </div>
              </div>

              <div className="mt-12">
                <Link href="/service" className="inline-flex items-center gap-2 bg-dark text-white px-8 py-4 rounded-full text-sm font-medium hover:bg-brand-red transition-colors w-full justify-center">
                  Schedule Service <ArrowUpRight size={16} />
                </Link>
              </div>
            </div>

          </div>

        </div>
      </section>
      
      <Footer />
    </div>
  );
}