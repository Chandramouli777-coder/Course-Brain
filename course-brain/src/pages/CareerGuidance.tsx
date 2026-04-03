import { motion } from 'motion/react';
import { Compass, Target, Map, Briefcase, FileUser, MessageSquare, ChevronRight, Sparkles, Zap, Brain } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import CourseBrainLogo from '../components/CourseBrainLogo';

export default function CareerGuidance() {
  const navigate = useNavigate();

  const roadmapSteps = [
    { title: 'Foundations', desc: 'Master DSA and Core CS concepts', status: 'completed' },
    { title: 'Specialization', desc: 'Deep dive into AI & Machine Learning', status: 'current' },
    { title: 'Projects', desc: 'Build 3 industry-grade AI applications', status: 'upcoming' },
    { title: 'Interview Prep', desc: 'Mock interviews and system design', status: 'upcoming' },
  ];

  return (
    <div className="min-h-screen bg-[#fcfcfc] flex flex-col lg:flex-row">
      {/* Sidebar (Simplified) */}
      <aside className="w-full lg:w-72 bg-white border-r border-gray-100 p-8 flex flex-col sticky top-0 h-auto lg:h-screen">
        <div className="mb-12">
          <CourseBrainLogo size="md" />
        </div>
        <nav className="flex-1 space-y-2">
          <button 
            onClick={() => navigate('/dashboard')}
            className="w-full flex items-center space-x-4 px-4 py-4 rounded-2xl text-gray-400 hover:bg-gray-50 hover:text-gray-600 transition-all font-bold text-sm uppercase tracking-widest"
          >
            <ChevronRight className="w-5 h-5 rotate-180" />
            <span>Back to Dashboard</span>
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 lg:p-12">
        <header className="mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-3 mb-4"
          >
            <div className="w-10 h-10 rounded-xl bg-red-50 text-[#ff3b3b] flex items-center justify-center">
              <Compass className="w-6 h-6" />
            </div>
            <span className="text-xs font-black text-[#ff3b3b] uppercase tracking-[0.3em]">AI Career Guidance</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl font-black text-black tracking-tight mb-4"
          >
            Design Your <span className="text-gradient">Future</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 font-bold uppercase tracking-widest text-sm max-w-2xl"
          >
            AI-powered career suggestions and skill roadmaps tailored to your learning progress.
          </motion.p>
        </header>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Career Roadmap Animation */}
          <motion.section 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="xl:col-span-2 glass-card rounded-[3rem] p-10 relative overflow-hidden"
          >
            <div className="relative z-10">
              <h2 className="text-2xl font-black text-black mb-8 flex items-center">
                <Map className="w-6 h-6 mr-3 text-[#ff3b3b]" />
                Your AI Roadmap
              </h2>

              <div className="relative">
                {/* Roadmap Line */}
                <div className="absolute left-6 top-0 bottom-0 w-1 bg-gray-100 rounded-full" />
                
                <div className="space-y-12">
                  {roadmapSteps.map((step, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + (i * 0.2) }}
                      className="relative pl-16"
                    >
                      <div className={`absolute left-4 top-0 w-5 h-5 rounded-full border-4 border-white shadow-lg z-10 ${
                        step.status === 'completed' ? 'bg-green-500' : 
                        step.status === 'current' ? 'bg-[#ff3b3b] animate-pulse' : 'bg-gray-200'
                      }`} />
                      
                      <div className={`p-6 rounded-[2rem] border transition-all ${
                        step.status === 'current' ? 'bg-red-50 border-red-100 shadow-xl shadow-red-50' : 'bg-white border-gray-50'
                      }`}>
                        <h3 className="text-lg font-black text-black mb-1">{step.title}</h3>
                        <p className="text-sm font-bold text-gray-400">{step.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-red-50 rounded-full blur-3xl opacity-50" />
          </motion.section>

          {/* Sidebar Tools */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="p-8 rounded-[2.5rem] bg-black text-white relative overflow-hidden group"
            >
              <Sparkles className="w-10 h-10 mb-6 text-red-400" />
              <h3 className="text-xl font-black mb-2">AI Suggestions</h3>
              <p className="text-gray-400 text-sm font-bold uppercase tracking-widest mb-6">Based on your Python (AI101) progress</p>
              
              <div className="space-y-3">
                {['AI Research Engineer', 'Data Scientist', 'ML Ops Specialist'].map((job) => (
                  <div key={job} className="flex items-center justify-between p-4 rounded-2xl bg-white/10 hover:bg-white/20 transition-colors cursor-pointer">
                    <span className="text-sm font-bold">{job}</span>
                    <ChevronRight className="w-4 h-4" />
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="p-8 rounded-[2.5rem] bg-white border border-gray-100 shadow-sm"
            >
              <h3 className="text-xl font-black text-black mb-6">Quick Resources</h3>
              <div className="grid grid-cols-1 gap-4">
                {[
                  { icon: FileUser, label: 'AI Resume Builder', color: 'text-blue-500', bg: 'bg-blue-50' },
                  { icon: MessageSquare, label: 'Mock Interview', color: 'text-purple-500', bg: 'bg-purple-50' },
                  { icon: Zap, label: 'Skill Assessment', color: 'text-amber-500', bg: 'bg-amber-50' },
                ].map((tool, i) => (
                  <button key={i} className="flex items-center space-x-4 p-4 rounded-2xl hover:bg-gray-50 transition-all group">
                    <div className={`w-12 h-12 rounded-xl ${tool.bg} ${tool.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <tool.icon className="w-6 h-6" />
                    </div>
                    <span className="text-sm font-black text-black uppercase tracking-widest">{tool.label}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}
