import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useState } from 'react';
import { Brain, Sparkles } from 'lucide-react';

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 400);
          return 100;
        }
        return prev + 2;
      });
    }, 30); // Faster loading

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1, filter: 'blur(20px)' }}
      transition={{ duration: 1, ease: [0.25, 1, 0.5, 1] }}
      className="fixed inset-0 z-[10000] flex items-center justify-center bg-[#0a0a0a] overflow-hidden"
    >
      {/* Ambient Red Lighting */}
      <div className="absolute inset-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-red-900/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-red-900/10 rounded-full blur-[120px]" />
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-red-500/20 rounded-full"
            animate={{
              y: [-20, -150],
              x: [0, (i % 2 === 0 ? 40 : -40)],
              opacity: [0, 0.6, 0],
              scale: [0, 1.2, 0]
            }}
            transition={{
              duration: 4 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 5
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
          />
        ))}
      </div>

      <div className="relative flex flex-col items-center w-full max-w-md px-10">
        <motion.div
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.8, 1, 0.8],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="mb-12 relative"
        >
          <div className="absolute inset-0 bg-red-600/20 blur-[60px] rounded-full animate-pulse" />
          <motion.div
            animate={{ rotateY: [0, 360] }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="relative z-10 brain-glow"
          >
            <Brain className="w-24 h-24 text-[#ff3b3b]" strokeWidth={1} />
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-8 w-full"
        >
          <div className="space-y-3">
            <h2 className="text-3xl font-black tracking-[0.4em] text-white uppercase font-display">
              Course Brain
            </h2>
            <div className="flex items-center justify-center space-x-3 text-red-500 font-black tracking-[0.6em] uppercase text-[8px]">
              <Sparkles className="w-3 h-3" />
              <span>Neural Core Initializing</span>
            </div>
          </div>
          
          <div className="relative w-full h-[2px] bg-white/5 rounded-full overflow-hidden">
            <motion.div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-transparent via-[#ff3b3b] to-transparent shadow-[0_0_15px_#ff3b3b]"
              style={{ width: `${progress}%` }}
            />
            <motion.div
              className="absolute inset-y-0 w-20 bg-gradient-to-r from-transparent via-white/40 to-transparent"
              animate={{ left: ['-20%', '120%'] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
          </div>

          <div className="flex justify-between items-center text-[10px] font-black text-gray-500 uppercase tracking-[0.3em]">
            <span>System Ready</span>
            <span className="text-red-500">{progress}%</span>
          </div>
        </motion.div>
      </div>

      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] z-50 opacity-20" />
    </motion.div>
  );
}
