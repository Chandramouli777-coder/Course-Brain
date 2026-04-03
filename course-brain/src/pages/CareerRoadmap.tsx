import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, 
  Sparkles, 
  Compass, 
  Target, 
  Zap,
  ChevronRight,
  Brain,
  Map,
  Trophy,
  Star,
  ExternalLink,
  Search
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import FeatureLoading from '../components/FeatureLoading';

const mockRoadmap = [
  { id: 1, title: "Foundations", desc: "Master the basics of programming and logic.", skills: ["Python", "Algorithms", "Data Structures"], status: "completed" },
  { id: 2, title: "Frontend Core", desc: "Build modern, responsive user interfaces.", skills: ["React", "Tailwind CSS", "TypeScript"], status: "current" },
  { id: 3, title: "Backend Systems", desc: "Design scalable server-side architectures.", skills: ["Node.js", "PostgreSQL", "Redis"], status: "upcoming" },
  { id: 4, title: "AI Integration", desc: "Connect your apps to neural networks.", skills: ["Gemini API", "LangChain", "Vector DBs"], status: "upcoming" },
  { id: 5, title: "Full Stack Mastery", desc: "Deploy production-grade AI applications.", skills: ["Docker", "CI/CD", "Cloud Run"], status: "upcoming" }
];

export default function CareerRoadmap() {
  const navigate = useNavigate();
  const [goal, setGoal] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [roadmap, setRoadmap] = useState<any[] | null>(null);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!goal.trim()) return;
    setIsLoading(true);
    // Simulate AI generation
    setTimeout(() => {
      setRoadmap(mockRoadmap);
      setIsLoading(false);
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-[#fcfcfc]">
      <AnimatePresence>
        {isLoading && (
          <FeatureLoading 
            type="career" 
            onComplete={() => setIsLoading(false)} 
          />
        )}
      </AnimatePresence>

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
            <div>
              <h1 className="text-2xl font-black text-black tracking-tight">AI Career Guidance</h1>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Neural Learning Suite v2.0</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12">
        {!roadmap ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-12 rounded-[3rem] text-center max-w-3xl mx-auto"
          >
            <div className="w-20 h-20 bg-red-50 rounded-3xl flex items-center justify-center text-[#ff3b3b] mx-auto mb-8 shadow-xl shadow-red-50">
              <Compass className="w-10 h-10" />
            </div>
            <h2 className="text-3xl font-black text-black tracking-tight mb-4">Neural Career Roadmap</h2>
            <p className="text-gray-500 font-medium leading-relaxed mb-10">
              Tell us your dream role or career goal, and our AI will generate a personalized learning path with prerequisite mapping.
            </p>
            
            <form onSubmit={handleGenerate} className="space-y-6">
              <div className="relative group">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-300 group-focus-within:text-[#ff3b3b] transition-colors" />
                <input
                  type="text"
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  placeholder="e.g. AI Engineer, Full Stack Developer, Data Scientist..."
                  className="w-full pl-16 pr-8 py-6 bg-gray-50 border-none rounded-3xl focus:ring-4 focus:ring-red-50 transition-all outline-none text-lg font-bold text-gray-700"
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full py-6 bg-[#ff3b3b] text-white rounded-3xl font-black uppercase tracking-widest text-sm shadow-xl shadow-red-100 hover:bg-[#8b0000] transition-all flex items-center justify-center"
              >
                <Zap className="w-5 h-5 mr-3" />
                Generate Career Path
              </motion.button>
            </form>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-12">
              <div className="relative">
                {/* Vertical Line */}
                <div className="absolute left-10 top-0 bottom-0 w-1 bg-gray-100 rounded-full" />
                
                <div className="space-y-12 relative z-10">
                  {roadmap.map((step, idx) => (
                    <motion.div
                      key={step.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.2 }}
                      className="flex items-start space-x-10"
                    >
                      <div className={`w-20 h-20 rounded-3xl flex items-center justify-center shadow-lg shrink-0 ${
                        step.status === 'completed' ? 'bg-green-500 text-white' : 
                        step.status === 'current' ? 'bg-[#ff3b3b] text-white animate-pulse' : 
                        'bg-white text-gray-300 border border-gray-100'
                      }`}>
                        {step.status === 'completed' ? <Trophy className="w-10 h-10" /> : 
                         step.status === 'current' ? <Target className="w-10 h-10" /> : 
                         <Map className="w-10 h-10" />}
                      </div>
                      
                      <div className="glass-card flex-1 p-8 rounded-[2.5rem] border-gray-100 hover:border-red-100 transition-all group">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-xl font-black text-black mb-1 group-hover:text-[#ff3b3b] transition-colors">{step.title}</h3>
                            <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Phase {idx + 1}</p>
                          </div>
                          {step.status === 'current' && (
                            <span className="px-4 py-1 bg-red-50 text-[#ff3b3b] text-[10px] font-black uppercase tracking-widest rounded-full">Active</span>
                          )}
                        </div>
                        <p className="text-gray-500 font-medium leading-relaxed mb-6">{step.desc}</p>
                        <div className="flex flex-wrap gap-2">
                          {step.skills.map((skill: string) => (
                            <span key={skill} className="px-4 py-2 bg-gray-50 text-gray-600 text-[10px] font-black uppercase tracking-widest rounded-xl">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="space-y-8">
              <div className="p-8 rounded-[2.5rem] bg-black text-white relative overflow-hidden">
                <div className="relative z-10">
                  <Star className="w-10 h-10 text-red-400 mb-6" />
                  <h3 className="text-xl font-black mb-4 leading-tight">Career Insights</h3>
                  <div className="space-y-6">
                    <div className="p-4 bg-white/5 rounded-2xl">
                      <p className="text-[10px] font-black text-red-400 uppercase tracking-widest mb-1">Market Demand</p>
                      <p className="text-lg font-black">Very High (98%)</p>
                    </div>
                    <div className="p-4 bg-white/5 rounded-2xl">
                      <p className="text-[10px] font-black text-red-400 uppercase tracking-widest mb-1">Avg. Salary</p>
                      <p className="text-lg font-black">$120k - $180k</p>
                    </div>
                    <div className="p-4 bg-white/5 rounded-2xl">
                      <p className="text-[10px] font-black text-red-400 uppercase tracking-widest mb-1">Top Skills</p>
                      <p className="text-xs font-bold text-gray-400">Generative AI, Cloud Architecture, Python</p>
                    </div>
                  </div>
                  <button className="w-full mt-8 py-4 bg-[#ff3b3b] text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-[#8b0000] transition-all flex items-center justify-center">
                    Download Full Report
                    <ExternalLink className="ml-2 w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <div className="p-8 rounded-[2.5rem] bg-white border border-gray-100 shadow-sm">
                <h3 className="text-sm font-black text-black uppercase tracking-widest mb-4">Neural Mentor</h3>
                <p className="text-gray-500 text-sm font-medium leading-relaxed">
                  Based on your current progress in <span className="text-[#ff3b3b] font-bold">DSA</span> and <span className="text-[#ff3b3b] font-bold">Python</span>, you are 15% ahead of the typical learning curve for this role.
                </p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
