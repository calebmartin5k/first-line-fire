import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import MaritimeComplianceArchitect from '../../components/MaritimeComplianceArchitect';

export default function MaritimeArchitectPage() {
  return (
    <div className="bg-light min-h-screen font-sans">
      <Navbar />
      
      {/* Hero section for the tool page */}
      <section className="pt-32 pb-16 bg-dark text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-brand-red via-dark to-dark"></div>
        <div className="container mx-auto px-8 md:px-16 lg:px-24 relative z-10">
          <p className="text-sm uppercase tracking-[0.2em] mb-4 text-brand-red font-medium">First-Line Fire Extinguisher Co.</p>
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl leading-tight mb-6">
            Maritime Compliance &<br />
            <span className="italic text-brand-red">Risk Architect</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl leading-relaxed">
            A specialized self-service compliance utility for towboat operators and the river industry. Instantly audit your vessel's firefighting equipment against 46 CFR Subchapter M regulations.
          </p>
        </div>
      </section>

      {/* Main Tool Component */}
      <MaritimeComplianceArchitect />
      
      <Footer />
    </div>
  );
}
