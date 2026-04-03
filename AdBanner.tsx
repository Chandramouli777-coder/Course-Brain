import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, X, ArrowRight, Zap } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function AdBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 20, stiffness: 100 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-4xl z-[1000]"
        >
          <div className="bg-black border border-red-900/30 shadow-[0_20px_50px_-15px_rgba(255,59,59,0.3)] rounded-[2.5rem] p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden relative group">
            {/* Animated Background Glow */}
            <div className="absolute -top-1/2 -left-1/4 w-1/2 h-full bg-[#ff3b3b]/10 blur-3xl rounded-full -z-10 group-hover:bg-[#ff3b3b]/20 transition-colors duration-700" />
            
            <div className="flex items-center space-x-6">
              <div className="w-16 h-16 rounded-2xl bg-[#ff3b3b]/10 flex items-center justify-center text-[#ff3b3b] shadow-inner relative overflow-hidden">
                <Sparkles className="w-8 h-8 brain-glow" />
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 border border-[#ff3b3b]/20 rounded-2xl"
                />
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-black text-white tracking-tight mb-1">
                  🚀 Upgrade to <span className="text-[#ff3b3b]">Course Brain Pro</span>
                </h3>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] mt-0.5">
                  Unlock unlimited AI features • Priority Support
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4 w-full md:w-auto">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(255, 59, 59, 0.4)' }}
                whileTap={{ scale: 0.95 }}
                className="flex-1 md:flex-none px-10 py-4 bg-[#ff3b3b] text-white rounded-2xl text-xs font-black uppercase tracking-widest shadow-lg shadow-red-900/20 hover:bg-[#8b0000] transition-all flex items-center justify-center animate-pulse"
              >
                Upgrade Now
                <ArrowRight className="ml-2 w-4 h-4" />
              </motion.button>
              
              <button
                onClick={() => setIsVisible(false)}
                className="p-4 rounded-2xl bg-white/5 text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
