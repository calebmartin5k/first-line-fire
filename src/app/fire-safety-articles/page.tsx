"use client";

import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import PageHero from '../../components/PageHero';
import { ArrowUpRight } from 'lucide-react';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const articles = [
  {
    "image": "https://images.squarespace-cdn.com/content/v1/6048cdd38eac65234887e5fb/1770218851904-HBRH0AV3GPSUPRSLWI6T/image2.png",
    "title": "Lithium-Ion vs. ABC Extinguishers: Why Your Mining Fleet Needs Specialized Suppression in 2026",
    "description": "Lithium-ion battery fires demand more than ABC extinguishers. Learn why mining fleets need dual-agent AFEX suppression systems to protect electric & diesel equipment in 2026."
  },
  {
    "image": "https://images.squarespace-cdn.com/content/v1/6048cdd38eac65234887e5fb/1770217754858-Q7BOXNT2ZG9NN36G7EJV/image3.png",
    "title": "Fire Trucks vs. Fire Suppression: Who to Call for Industrial Compliance",
    "description": "Learn the difference between fire apparatus dealers and industrial fire suppression contractors. Find out who to call for NFPA compliance, mining systems & marine safety."
  },
  {
    "image": "https://images.squarespace-cdn.com/content/v1/6048cdd38eac65234887e5fb/1766173750218-ASZ0G1F7DJTNZUGB1K34/image3.png",
    "title": "How to Pass Your Kentucky Fire Marshal Inspection on the First Try: A 4-Step Preparation Guide",
    "description": "Ensure your facility is compliant and ready for your next inspection with these 4 crucial steps."
  },
  {
    "image": "https://images.squarespace-cdn.com/content/v1/6048cdd38eac65234887e5fb/1758739661987-M2WUEDO38GA3PABOYWIM/image2.png",
    "title": "Which Local Code Items Must Be on an Official Fire Marshal Checklist?",
    "description": "A detailed breakdown of the exact items local fire marshals look for during official walkthroughs."
  },
  {
    "image": "https://images.squarespace-cdn.com/content/v1/6048cdd38eac65234887e5fb/239e7365-04af-43a0-a1f4-0716c0acd472/how-does-a-wireless-security-camera-work-first-line-fire.jpg",
    "title": "How Does A Wireless Security Camera Work? What to Know Before You Buy",
    "description": "Protecting your home or your business with a security camera can give you peace of mind. But, how does a wireless security camera work?"
  },
  {
    "image": "https://images.squarespace-cdn.com/content/v1/6048cdd38eac65234887e5fb/1672329905116-F8N7X81ZO8XGUV3TDFAS/how-to-promote-fire-safety-in-a-workplace-first-line-fire.jpg",
    "title": "How to Promote Fire Safety in a Workplace",
    "description": "Actionable advice on creating a culture of safety and preparedness among your employees."
  },
  {
    "image": "https://images.squarespace-cdn.com/content/v1/6048cdd38eac65234887e5fb/1669981560381-UTEUY0ZYZ8LYAU6NNEAM/winter-fire-safety-first-line-fire.jpeg",
    "title": "Winter Fire Safety: Don't Let Your Holiday Celebration Go Up In Flames",
    "description": "Key tips to prevent common winter fire hazards and keep your business safe during the cold months."
  },
  {
    "image": "https://images.squarespace-cdn.com/content/v1/6048cdd38eac65234887e5fb/1670599342073-J1EQIC76YAZDB6N0KLQE/construction_site_safety.jpg",
    "title": "Construction Site Fire Safety: 10 Tips for Prevention",
    "description": "Essential guidelines to mitigate risks and maintain compliance on active construction sites."
  },
  {
    "image": "https://images.squarespace-cdn.com/content/v1/6048cdd38eac65234887e5fb/1670527778343-EMTHIH6ES6Z4UXHRJD4D/staring-a-business-compliance.png",
    "title": "Starting a business? Here’s all the compliance info you need.",
    "description": "A comprehensive starting guide for new business owners to ensure full fire code compliance."
  }
];

export default function FireSafetyArticles() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Featured Article Animation
      gsap.fromTo('.featured-article',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.featured-article',
            start: 'top 80%',
          }
        }
      );

      // Grid Articles Stagger Animation
      gsap.utils.toArray<HTMLElement>('.article-card').forEach((card) => {
        gsap.fromTo(card,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
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
        title="Fire Safety Articles" 
        subtitle="Learn more about fire safety, compliance, and best practices from our industry experts."
      />
      
      <section className="px-8 md:px-16 lg:px-24 py-24 bg-dark text-white relative overflow-hidden">
        {/* Abstract Red Glow */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-red/10 rounded-full blur-[100px] pointer-events-none -mr-96 -mt-96"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          
          {/* Featured Article */}
          <div className="mb-32 group cursor-pointer featured-article">
            <div className="flex flex-col lg:flex-row gap-16 items-center">
              <div className="w-full lg:w-3/5 aspect-video overflow-hidden relative">
                <div className="absolute inset-0 bg-brand-red/20 mix-blend-multiply z-10 group-hover:bg-transparent transition-colors duration-500"></div>
                <img 
                  src={articles[0].image} 
                  alt={articles[0].title} 
                  className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-700"
                />
              </div>
              <div className="w-full lg:w-2/5">
                <p className="text-brand-red text-sm uppercase tracking-widest font-bold mb-6">Featured Article</p>
                <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.1] mb-8 group-hover:text-brand-red transition-colors">
                  {articles[0].title}
                </h2>
                <p className="text-gray-400 text-xl mb-10 leading-relaxed">
                  {articles[0].description}
                </p>
                <span className="inline-flex items-center gap-2 border-b border-brand-red pb-1 text-brand-red font-medium text-lg group-hover:text-white group-hover:border-white transition-colors">
                  Read Full Article <ArrowUpRight size={20} />
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24 border-t border-white/10 pt-24">
            {articles.slice(1).map((article, index) => (
              <article key={index} className="article-card flex flex-col group cursor-pointer">
                <div className="aspect-[4/3] overflow-hidden mb-8 relative">
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors duration-500 z-10"></div>
                  <img 
                    src={article.image} 
                    alt={article.title} 
                    className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-700"
                  />
                </div>
                <h3 className="font-serif text-2xl md:text-3xl mb-4 group-hover:text-brand-red transition-colors leading-snug">
                  {article.title}
                </h3>
                {article.description && (
                  <p className="text-gray-400 line-clamp-3 mb-8 text-lg">
                    {article.description}
                  </p>
                )}
                <div className="mt-auto">
                  <span className="inline-flex items-center gap-2 font-medium text-brand-red group-hover:text-white transition-colors">
                    Read Article <ArrowUpRight size={18} />
                  </span>
                </div>
              </article>
            ))}
          </div>

        </div>
      </section>
      
      <Footer />
    </div>
  );
}