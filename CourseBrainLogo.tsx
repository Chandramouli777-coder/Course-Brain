import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';

interface CourseBrainLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
  lightMode?: boolean;
}

const quotes = [
  "Smarter learning starts here.",
  "Your AI academic partner.",
  "Master any subject with ease.",
  "Neural networks for your notes.",
  "The future of EdTech is here.",
  "Unlock your full potential.",
  "Learning, redefined by AI.",
  "Course Brain: Your second brain."
];

export default function CourseBrainLogo({ size = 'md', showText = true, className = '', lightMode = false }: CourseBrainLogoProps) {
  const [showQuote, setShowQuote] = useState(false);
  const [quote, setQuote] = useState("");

  const dimensions = {
    sm: { width: 32, height: 32, text: 'text-lg' },
    md: { width: 48, height: 48, text: 'text-xl' },
    lg: { width: 64, height: 64, text: 'text-2xl' }
  }[size];

  const handleLogoClick = () => {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    setQuote(randomQuote);
    setShowQuote(true);
    setTimeout(() => setShowQuote(false), 3000);
  };

  return (
    <div className={`flex items-center space-x-3 group relative ${className}`}>
      <motion.div
        onClick={handleLogoClick}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{
          y: [0, -6, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="relative cursor-pointer"
        style={{ width: dimensions.width, height: dimensions.height }}
      >
        {/* Advanced Glow Aura */}
        <motion.div
          animate={{
            opacity: [0.3, 0.6, 0.3],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute inset-0 bg-red-600 rounded-full blur-xl -z-10"
        />

        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-2xl">
          <defs>
            <linearGradient id="brain3DGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ff3b3b" />
              <stop offset="40%" stopColor="#d32f2f" />
              <stop offset="100%" stopColor="#8b0000" />
            </linearGradient>
            <radialGradient id="brainHighlight" cx="30%" cy="30%" r="50%">
              <stop offset="0%" stopColor="white" stopOpacity="0.4" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </radialGradient>
          </defs>
          
          <path
            d="M50 20C35 20 22 32 22 48C22 58 28 68 38 72C38 78 42 82 50 82V20Z"
            fill="url(#brain3DGrad)"
            className="opacity-95"
          />
          <path
            d="M50 20C65 20 78 32 78 48C78 58 72 68 62 72C62 78 58 82 50 82V20Z"
            fill="url(#brain3DGrad)"
          />
          <path
            d="M50 20C35 20 22 32 22 48C22 58 28 68 38 72C38 78 42 82 50 82V20Z"
            fill="url(#brainHighlight)"
          />

          <g stroke="rgba(0,0,0,0.2)" strokeWidth="1.2" fill="none" strokeLinecap="round">
            <path d="M50 25V75" strokeWidth="2" />
            <path d="M35 30Q40 35 35 40 M65 30Q60 35 65 40" />
            <path d="M28 45Q35 45 40 40 M72 45Q65 45 60 40" />
            <path d="M30 55Q40 55 45 50 M70 55Q60 55 55 50" />
            <path d="M38 65Q45 65 48 60 M62 65Q55 65 52 60" />
          </g>
          
          <motion.g
            animate={{ opacity: [0.2, 0.8, 0.2] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <circle cx="35" cy="35" r="1.5" fill="white" />
            <circle cx="65" cy="45" r="1.5" fill="white" />
            <circle cx="45" cy="60" r="1.5" fill="white" />
            <circle cx="55" cy="30" r="1.5" fill="white" />
          </motion.g>
        </svg>
      </motion.div>

      {showText && (
        <motion.span 
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className={`${dimensions.text} font-black tracking-tighter ${lightMode ? 'text-white' : 'text-gray-900'}`}
        >
          Course<span className={lightMode ? 'text-red-300' : 'text-[#ff3b3b]'}>Brain</span>
        </motion.span>
      )}

      <AnimatePresence>
        {showQuote && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            className="absolute left-0 top-full mt-4 z-50 bg-black text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest whitespace-nowrap shadow-2xl border border-white/10"
          >
            <div className="absolute -top-1 left-6 w-2 h-2 bg-black rotate-45 border-l border-t border-white/10" />
            {quote}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
