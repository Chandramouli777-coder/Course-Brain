import { motion } from 'motion/react';
import { ArrowLeft, Shield, Lock, Eye, FileText, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function PrivacyPolicy() {
  const sections = [
    {
      icon: Shield,
      title: "Data Protection",
      content: "We use industry-standard encryption to protect your personal information and course materials. Your data is stored securely and is never sold to third parties."
    },
    {
      icon: Lock,
      title: "AI Usage",
      content: "Our AI models process your content to generate notes, summaries, and visual aids. This processing happens in real-time, and we do not use your personal data to train public models without explicit consent."
    },
    {
      icon: Eye,
      title: "Information We Collect",
      content: "We collect basic account information (name, email) and the materials you upload to provide our services. We also collect usage data to improve the platform's performance."
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-white"
    >
      <Navbar />
      
      <main className="pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-4">
          <Link to="/" className="inline-flex items-center text-gray-500 hover:text-[#ff3b3b] transition-colors mb-12 group">
            <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
            <span className="font-bold uppercase tracking-widest text-xs">Back to Home</span>
          </Link>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="mb-16"
          >
            <h1 className="text-5xl md:text-7xl font-black text-black tracking-tighter mb-6">
              Privacy <span className="text-[#ff3b3b]">Policy</span>
            </h1>
            <p className="text-xl text-gray-500 font-medium leading-relaxed">
              Your trust is our priority. Learn how we handle your data and ensure your privacy while using Course Brain AI.
            </p>
          </motion.div>

          <div className="space-y-8">
            {sections.map((section, idx) => (
              <motion.div
                key={idx}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.1 * idx }}
                className="p-8 md:p-12 rounded-[3rem] bg-gray-50 border border-gray-100 hover:border-red-100 transition-all group"
              >
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="w-16 h-16 rounded-2xl bg-white shadow-xl shadow-red-100 flex items-center justify-center text-[#ff3b3b] shrink-0 group-hover:scale-110 transition-transform">
                    <section.icon className="w-8 h-8" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-black text-black mb-4 tracking-tight">{section.title}</h2>
                    <p className="text-gray-600 leading-relaxed font-medium">
                      {section.content}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-16 p-12 rounded-[3rem] bg-black text-white relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#ff3b3b]/20 blur-[100px] rounded-full" />
            <div className="relative z-10">
              <div className="flex items-center space-x-4 mb-6">
                <CheckCircle className="w-8 h-8 text-[#ff3b3b]" />
                <h2 className="text-3xl font-black tracking-tight">Commitment to Security</h2>
              </div>
              <p className="text-gray-400 leading-relaxed mb-8 font-medium">
                We are committed to maintaining the highest standards of data security. Our platform is regularly audited to ensure compliance with global privacy regulations.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest">GDPR Compliant</div>
                <div className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest">SSL Encrypted</div>
                <div className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest">24/7 Monitoring</div>
              </div>
            </div>
          </motion.div>

          <div className="mt-20 text-center">
            <p className="text-gray-400 text-sm font-medium">
              Last updated: April 3, 2026. For any questions, contact us at{' '}
              <a href="mailto:coursebrain.official@gmail.com" className="text-[#ff3b3b] font-bold hover:underline">
                coursebrain.official@gmail.com
              </a>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </motion.div>
  );
}
