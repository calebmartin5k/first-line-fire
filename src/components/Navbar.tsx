"use client";
import { useState, useEffect } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import Link from 'next/link';

interface NavbarProps {
  darkText?: boolean;
}

export default function Navbar({ darkText = false }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showToolsDropdown, setShowToolsDropdown] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isDark = isScrolled || darkText;

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300 ${isScrolled ? 'bg-light border-b border-dark/5' : 'bg-transparent'}`}>
      <div className="w-full flex flex-col xl:flex-row">
        {/* Left Section */}
        <div className="w-full xl:w-1/2 flex justify-between items-center px-8 md:px-16 lg:px-24 py-6 transition-colors duration-300 text-dark">
          <div className="flex items-center gap-4">
            <Link href="/">
              <img 
                src="https://images.squarespace-cdn.com/content/v1/6048cdd38eac65234887e5fb/1615924069832-H7LY1AONNDW07LXVOZ12/First+Line+Fire+Extinguisher.png?format=1500w" 
                alt="First-Line Fire Extinguisher" 
                className="h-10"
              />
            </Link>
          </div>

          <div className="hidden xl:flex items-center gap-8 text-sm uppercase tracking-widest font-medium">
            <Link href="/fire-extinguisher-sales-service" className="hover:text-brand-red transition-colors whitespace-nowrap">Sales & Service</Link>
            <Link href="/river-industry" className="hover:text-brand-red transition-colors whitespace-nowrap">River Industry</Link>
            <Link href="/fire-safety-articles" className="hover:text-brand-red transition-colors whitespace-nowrap">Articles</Link>
            
            <div 
              className="relative group py-2"
              onMouseEnter={() => setShowToolsDropdown(true)}
              onMouseLeave={() => setShowToolsDropdown(false)}
            >
              <Link href="/tools" className="flex items-center gap-1 hover:text-brand-red transition-colors whitespace-nowrap">
                Tools <ChevronDown size={16} />
              </Link>
              
              {showToolsDropdown && (
                <div className="absolute top-full left-0 mt-0 w-64 bg-light border border-dark/5 shadow-xl rounded-sm overflow-hidden flex flex-col">
                  <Link href="/maritime-architect" className="px-6 py-4 text-dark hover:bg-[#e5e5e5] hover:text-brand-red transition-colors whitespace-nowrap border-b border-dark/5">
                    Maritime Architect
                  </Link>
                  <Link href="/internal" className="px-6 py-4 text-dark hover:bg-[#e5e5e5] hover:text-brand-red transition-colors whitespace-nowrap">
                    Route Optimizer Hub
                  </Link>
                </div>
              )}
            </div>
          </div>

          <button className="xl:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Right Section */}
        <div className={`hidden xl:flex w-1/2 justify-end items-center gap-8 px-8 md:px-16 lg:px-24 py-6 transition-colors duration-300 ${isDark ? 'text-dark' : 'text-white'}`}>
          <Link href="/locations" className={`text-sm uppercase tracking-widest font-medium transition-colors ${isDark ? 'hover:text-brand-red' : 'hover:text-white/80'}`}>Locations</Link>
          <a href="tel:2702791865" className={`text-sm font-medium transition-colors ${isDark ? 'hover:text-brand-red' : 'hover:text-white/80'}`}>(270) 279-1865</a>
          <Link href="/service" className={`${isDark ? 'bg-dark text-white hover:bg-brand-red' : 'bg-white text-dark hover:bg-gray-100'} px-6 py-3 rounded-full text-sm font-medium transition-colors`}>
            Schedule Service
          </Link>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-light border-b border-dark/5 flex flex-col p-6 gap-6 xl:hidden text-dark shadow-xl">
          <Link href="/fire-extinguisher-sales-service" className="text-sm uppercase tracking-widest font-medium hover:text-brand-red" onClick={() => setIsOpen(false)}>Sales & Service</Link>
          <Link href="/river-industry" className="text-sm uppercase tracking-widest font-medium hover:text-brand-red" onClick={() => setIsOpen(false)}>River Industry</Link>
          <Link href="/fire-safety-articles" className="text-sm uppercase tracking-widest font-medium hover:text-brand-red" onClick={() => setIsOpen(false)}>Articles</Link>
          
          <div className="flex flex-col gap-4 border-l-2 border-brand-red pl-4">
            <p className="text-xs text-gray-500 uppercase tracking-widest font-bold">Tools</p>
            <Link href="/tools" className="text-sm font-medium hover:text-brand-red" onClick={() => setIsOpen(false)}>All Tools</Link>
            <Link href="/maritime-architect" className="text-sm font-medium hover:text-brand-red" onClick={() => setIsOpen(false)}>Maritime Architect</Link>
            <Link href="/internal" className="text-sm font-medium hover:text-brand-red" onClick={() => setIsOpen(false)}>Route Optimizer</Link>
          </div>

          <Link href="/locations" className="text-sm uppercase tracking-widest font-medium hover:text-brand-red" onClick={() => setIsOpen(false)}>Locations</Link>
          <a href="tel:2702791865" className="text-sm font-medium hover:text-brand-red">(270) 279-1865</a>
          <Link href="/service" className="bg-dark text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-brand-red text-center" onClick={() => setIsOpen(false)}>Schedule Service</Link>
        </div>
      )}
    </nav>
  );
}