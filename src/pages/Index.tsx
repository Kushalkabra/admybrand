import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Testimonials from '@/components/Testimonials';
import Pricing from '@/components/Pricing';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';
import { LogoScroller } from '@/components/LogoScroller';


const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <LogoScroller />
      <Features />
      <Testimonials />
      <Pricing />
      <FAQ />
      
      <Footer />
    </div>
  );
};

export default Index;
