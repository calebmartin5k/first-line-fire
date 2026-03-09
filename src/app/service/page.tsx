"use client";

import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import PageHero from '../../components/PageHero';
import { Send, Phone, Mail } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Page() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Fade up left column text
      gsap.fromTo('.left-content',
        { opacity: 0, x: -40 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.service-section',
            start: 'top 80%',
          }
        }
      );

      // Fade up form container
      gsap.fromTo('.form-container',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.service-section',
            start: 'top 75%',
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      alert("Thank you for your inquiry. A fire protection specialist will contact you shortly.");
    }, 1500);
  };

  return (
    <div className="bg-light min-h-screen font-sans" ref={containerRef}>
      <Navbar darkText={true} />
      <PageHero 
        title="Schedule Service" 
        subtitle="Ensure your business is fully protected and code-compliant. Schedule an inspection, installation, or consultation today."
      />
      
      <section className="service-section px-8 md:px-16 lg:px-24 py-24 bg-white relative overflow-hidden">
        {/* Abstract Background Element */}
        <div className="absolute top-[30%] left-[-10%] w-[600px] h-[600px] bg-brand-red/5 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 lg:gap-24 relative z-10">
          
          <div className="w-full lg:w-5/12 left-content">
            <h2 className="font-serif text-5xl md:text-6xl text-dark mb-8 leading-[1.1]">
              Fire safety is a <br/><span className="italic text-brand-red">big deal.</span>
            </h2>
            <div className="text-xl text-gray-600 leading-relaxed space-y-6 mb-16">
              <p>
                You need to make sure you're protected and that your employees are safe. No one wants to think about fire, but it's important to know what precautions you should take in order to prevent fires from happening at all.
              </p>
              <p>
                First Line Fire Extinguisher can help keep your business safe by providing an annual inspection of the fire extinguishers on site as well as installing new ones if necessary. We also offer training so that everyone knows how best to handle a potential fire emergency.
              </p>
            </div>

            <div className="bg-dark text-white p-10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-brand-red/30 rounded-full blur-3xl -mr-24 -mt-24 pointer-events-none"></div>
              <h3 className="font-serif text-3xl mb-8 relative z-10">Direct Contact</h3>
              <div className="space-y-8 relative z-10 text-gray-300">
                <div className="flex items-start gap-4 group">
                  <div className="bg-white/10 p-3 rounded-full group-hover:bg-brand-red transition-colors duration-300">
                    <Phone className="text-white" size={24} />
                  </div>
                  <div>
                    <p className="text-sm uppercase tracking-widest text-brand-red font-bold mb-1">Call Us</p>
                    <a href="tel:2702791865" className="text-2xl font-medium text-white hover:text-brand-red transition-colors">(270) 279-1865</a>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 group">
                  <div className="bg-white/10 p-3 rounded-full group-hover:bg-brand-red transition-colors duration-300">
                    <Mail className="text-white" size={24} />
                  </div>
                  <div>
                    <p className="text-sm uppercase tracking-widest text-brand-red font-bold mb-1">Email</p>
                    <a href="mailto:sales@firstlinefire.com" className="text-xl text-white hover:text-brand-red transition-colors">sales@firstlinefire.com</a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-7/12 form-container">
            <div className="bg-white border border-dark/10 p-10 md:p-16 relative">
              
              {/* Form Graphic Element */}
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-brand-red to-transparent"></div>

              <h2 className="font-serif text-4xl md:text-5xl text-dark mb-10">
                Request a <span className="italic text-brand-red">Quote</span>
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label htmlFor="firstName" className="text-sm font-bold tracking-wide text-dark uppercase">First Name *</label>
                    <input required type="text" id="firstName" className="w-full bg-[#f8f8f8] border-none px-5 py-4 rounded-none focus:outline-none focus:ring-2 focus:ring-brand-red/50 transition-all text-lg" placeholder="John" />
                  </div>
                  <div className="space-y-3">
                    <label htmlFor="lastName" className="text-sm font-bold tracking-wide text-dark uppercase">Last Name *</label>
                    <input required type="text" id="lastName" className="w-full bg-[#f8f8f8] border-none px-5 py-4 rounded-none focus:outline-none focus:ring-2 focus:ring-brand-red/50 transition-all text-lg" placeholder="Doe" />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label htmlFor="email" className="text-sm font-bold tracking-wide text-dark uppercase">Email Address *</label>
                    <input required type="email" id="email" className="w-full bg-[#f8f8f8] border-none px-5 py-4 rounded-none focus:outline-none focus:ring-2 focus:ring-brand-red/50 transition-all text-lg" placeholder="john@company.com" />
                  </div>
                  <div className="space-y-3">
                    <label htmlFor="phone" className="text-sm font-bold tracking-wide text-dark uppercase">Phone Number *</label>
                    <input required type="tel" id="phone" className="w-full bg-[#f8f8f8] border-none px-5 py-4 rounded-none focus:outline-none focus:ring-2 focus:ring-brand-red/50 transition-all text-lg" placeholder="(555) 123-4567" />
                  </div>
                </div>

                <div className="space-y-3">
                  <label htmlFor="company" className="text-sm font-bold tracking-wide text-dark uppercase">Company Name</label>
                  <input type="text" id="company" className="w-full bg-[#f8f8f8] border-none px-5 py-4 rounded-none focus:outline-none focus:ring-2 focus:ring-brand-red/50 transition-all text-lg" placeholder="Acme Corp" />
                </div>

                <div className="space-y-3">
                  <label htmlFor="service" className="text-sm font-bold tracking-wide text-dark uppercase">Service Needed *</label>
                  <div className="relative">
                    <select required id="service" className="w-full bg-[#f8f8f8] border-none px-5 py-4 rounded-none focus:outline-none focus:ring-2 focus:ring-brand-red/50 transition-all text-lg text-dark appearance-none cursor-pointer">
                      <option value="">Select a service...</option>
                      <option value="extinguishers">Fire Extinguisher Service/Sales</option>
                      <option value="suppression">Fire Suppression Systems</option>
                      <option value="alarms">Fire Alarms & Security</option>
                      <option value="marine">Marine/River Industry Safety</option>
                      <option value="lighting">Emergency Lighting</option>
                      <option value="training">Safety Training</option>
                      <option value="other">Other</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-5 text-gray-500">
                      <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <label htmlFor="message" className="text-sm font-bold tracking-wide text-dark uppercase">Message *</label>
                  <textarea required id="message" rows={5} className="w-full bg-[#f8f8f8] border-none px-5 py-4 rounded-none focus:outline-none focus:ring-2 focus:ring-brand-red/50 transition-all text-lg resize-none" placeholder="Tell us about your facility and what you need help with..."></textarea>
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-brand-red text-white py-5 text-lg font-bold uppercase tracking-widest hover:bg-dark transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed transform hover:-translate-y-1"
                >
                  {isSubmitting ? 'Sending Request...' : 'Submit Request'} 
                  {!isSubmitting && <Send size={20} />}
                </button>
              </form>
            </div>
          </div>

        </div>
      </section>
      
      <Footer />
    </div>
  );
}