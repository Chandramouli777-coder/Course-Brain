import { motion } from 'motion/react';
import { 
  Video, 
  Mic, 
  Network, 
  Compass, 
  FileText, 
  Zap,
  Clock,
  Sparkles,
  Layout,
  Layers,
  Activity,
  Cpu,
  Share2,
  Focus,
  GitBranch
} from 'lucide-react';
import { useEffect } from 'react';

interface FeatureLoadingProps {
  type: string;
  onComplete: () => void;
}

export default function FeatureLoading({ type, onComplete }: FeatureLoadingProps) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 2000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  const getFeatureConfig = () => {
    switch (type) {
      case 'video':
        return {
          icon: Video,
          text: "Neural Video Processing...",
          color: "text-red-500",
          glow: "shadow-red-500/50"
        };
      case 'audio':
        return {
          icon: Mic,
          text: "Acoustic Analysis...",
          color: "text-[#ff3b3b]",
          glow: "shadow-red-500/50"
        };
      case 'visual':
        return {
          icon: Network,
          text: "Mapping Knowledge Nodes...",
          color: "text-red-600",
          glow: "shadow-red-600/50"
        };
      case 'career':
        return {
          icon: Compass,
          text: "Calculating Career Trajectories...",
          color: "text-red-400",
          glow: "shadow-red-400/50"
        };
      case 'summary':
        return {
          icon: FileText,
          text: "Synthesizing Core Concepts...",
          color: "text-[#8b0000]",
          glow: "shadow-red-900/50"
        };
      case 'prep':
        return {
          icon: Zap,
          text: "Optimizing Exam Readiness...",
          color: "text-red-500",
          glow: "shadow-red-500/50"
        };
      case 'flash':
        return {
          icon: Layers,
          text: "Generating Neural Flashcards...",
          color: "text-[#ff3b3b]",
          glow: "shadow-red-500/50"
        };
      case 'sync':
        return {
          icon: Share2,
          text: "Establishing Neural Sync...",
          color: "text-red-600",
          glow: "shadow-red-600/50"
        };
      case 'focus':
        return {
          icon: Focus,
          text: "Calibrating Deep Focus...",
          color: "text-red-400",
          glow: "shadow-red-400/50"
        };
      case 'tree':
        return {
          icon: GitBranch,
          text: "Mapping Skill Architecture...",
          color: "text-[#8b0000]",
          glow: "shadow-red-900/50"
        };
      case 'pulse':
        return {
          icon: Activity,
          text: "Monitoring Neural Pulse...",
          color: "text-red-500",
          glow: "shadow-red-500/50"
        };
      case 'core':
        return {
          icon: Cpu,
          text: "Activating Cortex Engine...",
          color: "text-[#ff3b3b]",
          glow: "shadow-red-500/50"
        };
      default:
        return {
          icon: Sparkles,
          text: "Initializing AI Engine...",
          color: "text-[#ff3b3b]",
          glow: "shadow-red-500/50"
        };
    }
  };

  const config = getFeatureConfig();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[10000] bg-black flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Background Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              x: Math.random() * window.innerWidth, 
              y: Math.random() * window.innerHeight,
              opacity: 0 
            }}
            animate={{ 
              y: [null, Math.random() * -100],
              opacity: [0, 0.5, 0]
            }}
            transition={{ 
              duration: 2 + Math.random() * 2, 
              repeat: Infinity, 
              delay: Math.random() * 2 
            }}
            className="absolute w-1 h-1 bg-[#ff3b3b] rounded-full blur-[1px]"
          />
        ))}
      </div>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,59,59,0.15)_0%,_transparent_70%)]" />
      
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
        className="relative z-10 flex flex-col items-center"
      >
        <div className="relative w-64 h-64 mb-16 flex items-center justify-center">
          <div className={`absolute inset-0 bg-[#ff3b3b]/10 blur-[80px] rounded-full animate-pulse`} />
          
          {/* Feature Specific Animations */}
          <div className="relative z-20">
            {type === 'video' && (
              <div className="relative flex items-center justify-center">
                <motion.div
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 90, 180, 270, 360],
                    borderRadius: ["20%", "50%", "20%"]
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  className="w-32 h-32 border-4 border-[#ff3b3b] flex items-center justify-center"
                >
                  <Video className="w-12 h-12 text-[#ff3b3b]" />
                </motion.div>
                <div className="absolute inset-0 flex items-center justify-center">
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{ 
                        scale: [1, 2],
                        opacity: [0.5, 0]
                      }}
                      transition={{ duration: 2, repeat: Infinity, delay: i * 0.6 }}
                      className="absolute w-32 h-32 border border-[#ff3b3b]/30 rounded-full"
                    />
                  ))}
                </div>
              </div>
            )}

            {type === 'audio' && (
              <div className="flex items-center space-x-2 h-24">
                {[...Array(12)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{ 
                      height: [20, 80, 20],
                      backgroundColor: ["#ff3b3b", "#8b0000", "#ff3b3b"]
                    }}
                    transition={{ 
                      duration: 0.5 + Math.random() * 0.5, 
                      repeat: Infinity, 
                      delay: i * 0.1 
                    }}
                    className="w-3 bg-[#ff3b3b] rounded-full shadow-[0_0_15px_rgba(255,59,59,0.5)]"
                  />
                ))}
              </div>
            )}

            {type === 'visual' && (
              <div className="relative w-40 h-40">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0"
                >
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{ 
                        scale: [1, 1.2, 1],
                        boxShadow: ["0 0 10px #ff3b3b", "0 0 30px #ff3b3b", "0 0 10px #ff3b3b"]
                      }}
                      transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                      className="absolute w-6 h-6 bg-[#ff3b3b] rounded-full"
                      style={{ 
                        top: `${50 + 40 * Math.sin(i * Math.PI / 3)}%`,
                        left: `${50 + 40 * Math.cos(i * Math.PI / 3)}%`
                      }}
                    />
                  ))}
                </motion.div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Network className="w-16 h-16 text-[#ff3b3b] brain-glow" />
                </div>
              </div>
            )}

            {type === 'career' && (
              <div className="relative w-48 h-48 flex items-center justify-center">
                <svg className="w-full h-full absolute inset-0">
                  <motion.path
                    d="M 20 120 Q 60 20 120 120 T 220 120"
                    fill="transparent"
                    stroke="#ff3b3b"
                    strokeWidth="4"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  />
                </svg>
                <motion.div
                  animate={{ 
                    x: [0, 100, 200],
                    y: [0, -50, 0],
                    opacity: [0, 1, 0]
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute left-4"
                >
                  <Compass className="w-10 h-10 text-[#ff3b3b]" />
                </motion.div>
              </div>
            )}

            {type === 'summary' && (
              <div className="flex flex-col space-y-4 items-center">
                <motion.div
                  animate={{ 
                    width: [200, 100, 50],
                    opacity: [1, 0.5, 1]
                  }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="h-4 bg-[#ff3b3b] rounded-full"
                />
                <motion.div
                  animate={{ 
                    width: [150, 80, 40],
                    opacity: [1, 0.5, 1]
                  }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
                  className="h-4 bg-[#ff3b3b]/60 rounded-full"
                />
                <motion.div
                  animate={{ 
                    width: [100, 60, 30],
                    opacity: [1, 0.5, 1]
                  }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
                  className="h-4 bg-[#ff3b3b]/30 rounded-full"
                />
                <FileText className="w-12 h-12 text-[#ff3b3b] mt-4" />
              </div>
            )}

            {type === 'prep' && (
              <div className="relative w-40 h-40 flex items-center justify-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 border-4 border-dashed border-[#ff3b3b] rounded-full"
                />
                <div className="relative">
                  <Clock className="w-16 h-16 text-[#ff3b3b]" />
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="absolute top-1/2 left-1/2 w-6 h-1 bg-[#ff3b3b] origin-left -translate-y-1/2 rounded-full"
                  />
                </div>
                <motion.div
                  animate={{ 
                    scale: [1, 1.5, 1],
                    opacity: [0, 1, 0]
                  }}
                  transition={{ duration: 0.5, repeat: Infinity, delay: 0.2 }}
                  className="absolute -top-4 -right-4"
                >
                  <Zap className="w-8 h-8 text-[#ff3b3b]" />
                </motion.div>
              </div>
            )}

            {!['video', 'audio', 'visual', 'career', 'summary', 'prep'].includes(type) && (
              <motion.div
                animate={{ 
                  rotate: 360,
                  scale: [1, 1.2, 1]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="relative"
              >
                <Sparkles className="w-20 h-20 text-[#ff3b3b] brain-glow" />
              </motion.div>
            )}
          </div>
        </div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center"
        >
          <h2 className={`text-3xl font-black uppercase tracking-[0.3em] mb-6 ${config.color} drop-shadow-[0_0_10px_rgba(255,59,59,0.3)]`}>
            {config.text}
          </h2>
          
          <div className="relative w-64 h-1.5 bg-white/5 rounded-full overflow-hidden mx-auto">
            <motion.div
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 2, ease: "easeInOut" }}
              className={`h-full bg-gradient-to-r from-[#ff3b3b] to-[#8b0000] shadow-[0_0_15px_#ff3b3b]`}
            />
          </div>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-6 text-gray-500 font-bold uppercase tracking-[0.2em] text-[10px]"
          >
            Optimizing Neural Pathways for Smarter Learning
          </motion.p>
        </motion.div>
      </motion.div>

      {/* Cinematic Vignette */}
      <div className="absolute inset-0 shadow-[inset_0_0_150px_rgba(0,0,0,0.8)] pointer-events-none" />
    </motion.div>
  );
}
