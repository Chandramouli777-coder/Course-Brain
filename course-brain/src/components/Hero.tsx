import { motion } from 'motion/react';
import { Sparkles, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import CourseBrainLogo from './CourseBrainLogo';

export default function Hero() {
  return (
    <div className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-white">
      {/* Background Accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-red-50/50 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-red-50/30 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="relative z-10">
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="inline-flex items-center px-4 py-2 rounded-full text-xs font-bold bg-red-50 text-[#ff3b3b] mb-8 uppercase tracking-[0.2em] border border-red-100"
          >
            <Sparkles className="w-3 h-3 mr-2" />
            AI-Powered Learning Platform
          </motion.div>
          
          <motion.h1 
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeInOut" }}
            className="text-6xl md:text-8xl font-extrabold text-black tracking-tighter mb-8 leading-[0.9]"
          >
            Master Any Subject with <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff3b3b] to-[#8b0000]">
              Course Brain AI
            </span>
          </motion.h1>
          
          <motion.p 
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.4, ease: "easeInOut" }}
            className="text-xl md:text-2xl text-gray-500 max-w-3xl mx-auto mb-12 leading-relaxed font-medium"
          >
            The next generation of educational technology. Generate notes, solve doubts, and visualize concepts with state-of-the-art AI.
          </motion.p>
          
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/#features"
                className="w-full sm:w-auto inline-flex items-center justify-center px-10 py-5 border-2 border-red-100 text-lg font-bold rounded-2xl text-[#ff3b3b] bg-white hover:bg-red-50 transition-all"
              >
                See How it Works
              </Link>
            </motion.div>
          </motion.div>

          {/* Stats/Trust */}
          <div className="mt-24 grid grid-cols-2 md:grid-cols-3 gap-12 max-w-4xl mx-auto">
            {[
              { icon: CourseBrainLogo, value: '10k+', label: 'Notes Generated', size: 'sm' },
              { icon: Zap, value: '99%', label: 'Accuracy Rate' },
              { icon: Sparkles, value: '50k+', label: 'Doubts Solved' }
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 + (i * 0.1) }}
                className="flex flex-col items-center group"
              >
                <div className="p-4 bg-red-50 rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {stat.icon === CourseBrainLogo ? (
                    <CourseBrainLogo size="sm" showText={false} />
                  ) : (
                    (() => {
                      const Icon = stat.icon as any;
                      return <Icon className="w-8 h-8 text-[#ff3b3b]" />;
                    })()
                  )}
                </div>
                <span className="text-3xl font-black text-black tracking-tight">{stat.value}</span>
                <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
