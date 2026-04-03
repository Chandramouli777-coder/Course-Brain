import { motion } from 'motion/react';
import { 
  Video, 
  Mic, 
  Network, 
  Compass, 
  FileText, 
  Zap, 
  FileQuestion, 
  Trophy, 
  Target, 
  Brain, 
  Code, 
  Layers,
  ArrowLeft,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const tools = [
  { id: 'video', name: 'Video to Notes', icon: Video, desc: 'Convert video lectures to structured notes', path: '/video-notes', color: 'text-red-500', bg: 'bg-red-50' },
  { id: 'audio', name: 'Audio to Notes', icon: Mic, desc: 'Transcribe and summarize audio recordings', path: '/audio-notes', color: 'text-orange-500', bg: 'bg-orange-50' },
  { id: 'visual', name: 'Notes to Visual', icon: Network, desc: 'Generate mind maps and diagrams', path: '/notes-visual', color: 'text-blue-500', bg: 'bg-blue-50' },
  { id: 'career', name: 'Career Guidance', icon: Compass, desc: 'AI-powered career path recommendations', path: '/career-guidance', color: 'text-green-500', bg: 'bg-green-50' },
  { id: 'summary', name: 'Summary Gen', icon: FileText, desc: 'Quick summaries of long documents', path: '/summary', color: 'text-purple-500', bg: 'bg-purple-50' },
  { id: 'prep', name: 'Last Minute Prep', icon: Zap, desc: 'Optimized revision for exams', path: '/prep', color: 'text-yellow-500', bg: 'bg-yellow-50' },
  { id: 'quiz', name: 'Quiz Generator', icon: FileQuestion, desc: 'Auto-generate quizzes from notes', path: '/quiz', color: 'text-pink-500', bg: 'bg-pink-50' },
  { id: 'practice', name: 'Practice Questions', icon: Target, desc: 'Topic-wise practice questions', path: '/mock', color: 'text-indigo-500', bg: 'bg-indigo-50' },
  { id: 'mock', name: 'Mock Exams', icon: Trophy, desc: 'Simulated exam environment', path: '/mock', color: 'text-[#ff3b3b]', bg: 'bg-red-50' },
  { id: 'weak', name: 'Weak Topic Detection', icon: Target, desc: 'Identify and fix learning gaps', path: '/weak-topics', color: 'text-red-600', bg: 'bg-red-50' },
  { id: 'graph', name: 'Knowledge Graph', icon: Network, desc: 'Visualize concept connections', path: '/graph', color: 'text-cyan-500', bg: 'bg-cyan-50' },
  { id: 'code', name: 'Code Examples', icon: Code, desc: 'AI-generated code snippets and explanations', path: '/code-examples', color: 'text-emerald-500', bg: 'bg-emerald-50' },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1 }
};

export default function Tools() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#fcfcfc] py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-16 flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <motion.button 
              whileHover={{ x: -4 }}
              onClick={() => navigate('/dashboard')}
              className="p-3 hover:bg-gray-50 rounded-2xl transition-colors text-gray-400 hover:text-black"
            >
              <ArrowLeft className="w-6 h-6" />
            </motion.button>
            <div>
              <h1 className="text-4xl font-black text-black tracking-tight mb-2">AI Learning <span className="text-[#ff3b3b]">Suite</span></h1>
              <p className="text-xs font-black text-gray-400 uppercase tracking-[0.3em]">Neural Core Tools v2.0</p>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-4 bg-white p-2 rounded-2xl border border-gray-100 shadow-sm">
            <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center text-[#ff3b3b]">
              <Sparkles className="w-5 h-5" />
            </div>
            <div className="pr-4">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">Neural Status</p>
              <p className="text-xs font-black text-black leading-none">All Systems Optimal</p>
            </div>
          </div>
        </header>

        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {tools.map((tool) => (
            <motion.div
              key={tool.id}
              variants={item}
              whileHover={{ y: -8, scale: 1.02 }}
              onClick={() => navigate(tool.path)}
              className="glass-card p-8 rounded-[2.5rem] border-gray-100 hover:border-red-100 transition-all cursor-pointer group relative overflow-hidden"
            >
              <div className={`absolute top-0 right-0 w-32 h-32 ${tool.bg} opacity-0 group-hover:opacity-20 blur-3xl rounded-full -mr-16 -mt-16 transition-opacity`} />
              
              <div className={`w-14 h-14 ${tool.bg} rounded-2xl flex items-center justify-center ${tool.color} mb-6 group-hover:scale-110 transition-transform shadow-sm`}>
                <tool.icon className="w-7 h-7" />
              </div>
              
              <h3 className="text-xl font-black text-black mb-2 tracking-tight group-hover:text-[#ff3b3b] transition-colors">{tool.name}</h3>
              <p className="text-gray-500 text-sm font-medium leading-relaxed mb-6">
                {tool.desc}
              </p>
              
              <div className="flex items-center text-[10px] font-black text-[#ff3b3b] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all translate-x-[-10px] group-hover:translate-x-0">
                Initialize Tool
                <ChevronRight className="ml-1 w-3 h-3" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        <footer className="mt-20 pt-10 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">© 2026 Course Brain AI • Neural Learning Suite v2.0</p>
          <div className="flex items-center space-x-6">
            <button onClick={() => navigate('/privacy')} className="text-[10px] font-black text-gray-400 uppercase tracking-widest hover:text-[#ff3b3b] transition-colors">Privacy Policy</button>
            <button onClick={() => navigate('/privacy')} className="text-[10px] font-black text-gray-400 uppercase tracking-widest hover:text-[#ff3b3b] transition-colors">Terms of Service</button>
          </div>
        </footer>
      </div>
    </div>
  );
}
