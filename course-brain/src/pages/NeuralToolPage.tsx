import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, 
  Sparkles, 
  Zap,
  ChevronRight,
  Brain,
  Network,
  Code,
  Target,
  FileQuestion,
  Trophy,
  Layers,
  Activity,
  Cpu,
  Share2,
  Focus,
  GitBranch,
  Search,
  Download,
  Share,
  Maximize2
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import FeatureLoading from '../components/FeatureLoading';

const toolConfigs: Record<string, any> = {
  quiz: { name: 'Quiz Gen', icon: FileQuestion, desc: 'Auto-generate adaptive quizzes from your notes.', color: 'text-red-500', bg: 'bg-red-50' },
  mock: { name: 'Mock Exams', icon: Trophy, desc: 'Simulated exam environment with real-time feedback.', color: 'text-[#ff3b3b]', bg: 'bg-red-50' },
  weak: { name: 'Weak Topics', icon: Target, desc: 'AI-powered detection of your learning gaps.', color: 'text-red-600', bg: 'bg-red-50' },
  graph: { name: 'Knowledge Graph', icon: Network, desc: 'Visualize complex concept links in 2D/3D.', color: 'text-red-400', bg: 'bg-red-50' },
  algo: { name: 'Algo Sim', icon: Code, desc: 'Interactive algorithm visualizer for CS students.', color: 'text-[#8b0000]', bg: 'bg-red-50' },
  viz: { name: 'Concept Viz', icon: Brain, desc: '3D neural visualization of abstract concepts.', color: 'text-red-500', bg: 'bg-red-50' },
  flash: { name: 'Neural Cards', icon: Layers, desc: 'Spaced repetition flashcards for long-term memory.', color: 'text-[#ff3b3b]', bg: 'bg-red-50' },
  sync: { name: 'Brain Sync', icon: Share2, desc: 'Collaborative learning nodes for group study.', color: 'text-red-600', bg: 'bg-red-50' },
  focus: { name: 'Deep Focus', icon: Focus, desc: 'AI study timer with cognitive soundscapes.', color: 'text-red-400', bg: 'bg-red-50' },
  tree: { name: 'Skill Tree', icon: GitBranch, desc: 'Dynamic learning progress and prerequisite tree.', color: 'text-[#8b0000]', bg: 'bg-red-50' },
  pulse: { name: 'Neural Pulse', icon: Activity, desc: 'Real-time cognitive load and focus tracking.', color: 'text-red-500', bg: 'bg-red-50' },
  core: { name: 'Cortex Engine', icon: Cpu, desc: 'Advanced AI tutor core for personalized learning.', color: 'text-[#ff3b3b]', bg: 'bg-red-50' },
};

export default function NeuralToolPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname.replace('/', '');
  
  // Map path to tool ID
  const toolIdMap: Record<string, string> = {
    'quiz': 'quiz',
    'mock': 'mock',
    'weak-topics': 'weak',
    'graph': 'graph',
    'algo': 'algo',
    'viz': 'viz',
    'flashcards': 'flash',
    'sync': 'sync',
    'focus': 'focus',
    'skill-tree': 'tree',
    'pulse': 'pulse',
    'cortex': 'core'
  };

  const currentToolId = toolIdMap[path] || 'quiz';
  const config = toolConfigs[currentToolId];

  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('generate');

  return (
    <div className="min-h-screen bg-[#fcfcfc]">
      <AnimatePresence>
        {isLoading && (
          <FeatureLoading 
            type={currentToolId} 
            onComplete={() => setIsLoading(false)} 
          />
        )}
      </AnimatePresence>

      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <motion.button 
              whileHover={{ x: -4 }}
              onClick={() => navigate('/dashboard')}
              className="p-3 hover:bg-gray-50 rounded-2xl transition-colors text-gray-400 hover:text-black"
            >
              <ArrowLeft className="w-6 h-6" />
            </motion.button>
            <div className="flex items-center space-x-4">
              <div className={`w-12 h-12 ${config.bg} rounded-xl flex items-center justify-center ${config.color}`}>
                <config.icon className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-xl font-black text-black tracking-tight">{config.name}</h1>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Neural Tool Suite v2.0</p>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <motion.button className="p-3 text-gray-400 hover:text-[#ff3b3b] hover:bg-red-50 rounded-2xl transition-all">
              <Share className="w-5 h-5" />
            </motion.button>
            <motion.button className="p-3 text-gray-400 hover:text-[#ff3b3b] hover:bg-red-50 rounded-2xl transition-all">
              <Download className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Sidebar Controls */}
          <div className="lg:col-span-1 space-y-6">
            <div className="glass-card p-8 rounded-[2.5rem] border-gray-100">
              <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-6">Tool Settings</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Complexity</label>
                  <select className="w-full px-4 py-3 bg-gray-50 rounded-xl border-none font-bold text-xs text-gray-700 outline-none focus:ring-2 focus:ring-red-100 appearance-none">
                    <option>Standard Neural</option>
                    <option>Advanced Deep Learning</option>
                    <option>Expert Synthesis</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Source Context</label>
                  <div className="p-4 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200 text-center hover:border-red-200 transition-all cursor-pointer">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Select Course Material</p>
                  </div>
                </div>
              </div>
              <button className="w-full mt-8 py-4 bg-black text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-gray-800 transition-all">
                Update Engine
              </button>
            </div>

            <div className="p-8 rounded-[2.5rem] bg-gradient-to-br from-[#ff3b3b] to-[#8b0000] text-white">
              <Sparkles className="w-8 h-8 mb-4 text-red-200" />
              <h3 className="text-lg font-black mb-2 leading-tight">Neural Optimization</h3>
              <p className="text-[10px] font-bold text-red-100 uppercase tracking-widest leading-relaxed">
                This tool uses advanced neural pathways to optimize your learning efficiency by up to 40%.
              </p>
            </div>
          </div>

          {/* Main Interface Area */}
          <div className="lg:col-span-3 space-y-8">
            <div className="flex items-center space-x-4 mb-4">
              {['generate', 'history', 'analytics'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${
                    activeTab === tab ? 'bg-[#ff3b3b] text-white shadow-lg shadow-red-100' : 'bg-white text-gray-400 hover:bg-gray-50'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card min-h-[600px] rounded-[3rem] p-12 flex flex-col items-center justify-center text-center relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,59,59,0.03)_0%,_transparent_70%)]" />
              
              <div className="relative z-10 max-w-md">
                <div className={`w-24 h-24 ${config.bg} rounded-3xl flex items-center justify-center ${config.color} mx-auto mb-8 shadow-xl shadow-red-50`}>
                  <config.icon className="w-12 h-12" />
                </div>
                <h2 className="text-3xl font-black text-black tracking-tight mb-4">{config.name} Interface</h2>
                <p className="text-gray-500 font-medium leading-relaxed mb-10">
                  {config.desc} Select your course material to begin the neural processing sequence.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="flex-1 px-8 py-5 bg-[#ff3b3b] text-white rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl shadow-red-100 hover:bg-[#8b0000] transition-all flex items-center justify-center">
                    <Zap className="w-4 h-4 mr-2" />
                    Initialize Engine
                  </button>
                  <button className="flex-1 px-8 py-5 bg-white border border-gray-100 text-black rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-gray-50 transition-all flex items-center justify-center">
                    <Maximize2 className="w-4 h-4 mr-2" />
                    Full Screen
                  </button>
                </div>
              </div>

              {/* Decorative Neural Elements */}
              <div className="absolute top-10 right-10 opacity-10">
                <Network className="w-32 h-32 text-[#ff3b3b]" />
              </div>
              <div className="absolute bottom-10 left-10 opacity-10">
                <Brain className="w-32 h-32 text-[#ff3b3b]" />
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}
