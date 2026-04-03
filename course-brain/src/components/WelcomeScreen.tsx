import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Brain } from 'lucide-react';

export default function WelcomeScreen({ onComplete }: { onComplete: () => void }) {
  const [show, setShow] = useState(true);
  const [textIndex, setTextIndex] = useState(0);
  const messages = ["Welcome to Course Brain AI", "Smarter Learning Starts Here"];

  useEffect(() => {
    const timer = setTimeout(() => {
      setTextIndex(1);
    }, 800);

    const exitTimer = setTimeout(() => {
      handleExit();
    }, 2000);

    return () => {
      clearTimeout(timer);
      clearTimeout(exitTimer);
    };
  }, []);

  const handleExit = () => {
    setShow(false);
    setTimeout(onComplete, 800);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1, filter: 'blur(20px)' }}
          transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
          className="fixed inset-0 z-[9999] bg-gradient-to-br from-black via-[#1a0000] to-[#4a0000] flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Particles */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ 
                  x: Math.random() * window.innerWidth, 
                  y: Math.random() * window.innerHeight,
                  opacity: Math.random() * 0.5 + 0.2
                }}
                animate={{ 
                  y: [null, Math.random() * -100 - 50],
                  opacity: [null, 0]
                }}
                transition={{ 
                  duration: Math.random() * 2 + 2, 
                  repeat: Infinity, 
                  ease: "linear" 
                }}
                className="absolute w-1 h-1 bg-red-500 rounded-full blur-[1px]"
              />
            ))}
          </div>

          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="relative mb-12"
          >
            <div className="absolute inset-0 bg-red-600/20 blur-[100px] rounded-full animate-pulse" />
            <motion.div
              animate={{ rotateY: [0, 360] }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="relative z-10 brain-glow"
            >
              <Brain className="w-32 h-32 text-[#ff3b3b]" strokeWidth={1} />
            </motion.div>
          </motion.div>

          <div className="text-center relative z-10 px-6">
            <AnimatePresence mode="wait">
              <motion.h1
                key={textIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-4"
              >
                {messages[textIndex].split("").map((char, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.03 }}
                  >
                    {char}
                  </motion.span>
                ))}
              </motion.h1>
            </AnimatePresence>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="flex items-center justify-center space-x-2 text-red-400/60 font-black uppercase tracking-[0.3em] text-[10px]"
            >
              <Sparkles className="w-3 h-3" />
              <span>Neural Network Initialized</span>
            </motion.div>
          </div>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
            onClick={handleExit}
            className="mt-16 px-12 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white font-black uppercase tracking-widest text-xs hover:bg-white hover:text-black transition-all group"
          >
            Enter Experience
            <motion.span 
              animate={{ x: [0, 5, 0] }} 
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="inline-block ml-2"
            >
              →
            </motion.span>
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
