import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Statement from '../components/Statement';
import Goal from '../components/Goal';
import Services from '../components/Services';
import Process from '../components/Process';
import Industries from '../components/Industries';
import Testimonials from '../components/Testimonials';
import CTA from '../components/CTA';
import Footer from '../components/Footer';

export default function App() {
  return (
    <div className="bg-light min-h-screen font-sans">
      <Navbar />
      <Hero />
      <Statement />
      <Goal />
      <Services />
      <Process />
      <Industries />
      <Testimonials />
      <CTA />
      <Footer />
    </div>
  );
}
