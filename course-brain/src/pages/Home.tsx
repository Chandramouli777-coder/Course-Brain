import { motion } from 'motion/react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Pricing from '../components/Pricing';
import Footer from '../components/Footer';
import AdBanner from '../components/AdBanner';

export default function Home() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5, ease: [0.25, 1, 0.5, 1] }}
      className="min-h-screen bg-white"
    >
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Pricing />
      </main>
      <Footer />
      <AdBanner />
    </motion.div>
  );
}
