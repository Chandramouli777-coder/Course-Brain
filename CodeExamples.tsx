import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, 
  Sparkles, 
  Code, 
  Copy, 
  Check, 
  Zap,
  ChevronRight,
  Brain,
  Terminal,
  Cpu,
  Layers,
  Search
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import FeatureLoading from '../components/FeatureLoading';

const mockCode = [
  {
    id: 'python',
    name: 'Python',
    icon: '🐍',
    code: `def binary_search(arr, target):
    low = 0
    high = len(arr) - 1
    
    while low <= high:
        mid = (low + high) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            low = mid + 1
        else:
            high = mid - 1
            
    return -1`,
    desc: 'Efficiently find an element in a sorted list.'
  },
  {
    id: 'react',
    name: 'React',
    icon: '⚛️',
    code: `import { useState, useEffect } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = \`Count: \${count}\`;
  }, [count]);

  return (
    <button onClick={() => setCount(c => c + 1)}>
      Count is {count}
    </button>
  );
}`,
    desc: 'A simple counter component using React Hooks.'
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    icon: '📘',
    code: `interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
}

function greet(user: User): string {
  return \`Hello, \${user.name}! Your role is \${user.role}.\`;
}`,
    desc: 'Type-safe user interface and greeting function.'
  }
];

export default function CodeExamples() {
  const navigate = useNavigate();
  const [topic, setTopic] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [examples, setExamples] = useState<any[] | null>(null);
  const [selectedExample, setSelectedExample] = useState<any>(null);
  const [copied, setCopied] = useState(false);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;
    setIsLoading(true);
    // Simulate AI generation
    setTimeout(() => {
      setExamples(mockCode);
      setSelectedExample(mockCode[0]);
      setIsLoading(false);
    }, 3500);
  };

  const handleCopy = () => {
    if (selectedExample) {
      navigator.clipboard.writeText(selectedExample.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-[#fcfcfc]">
      <AnimatePresence>
        {isLoading && (
          <FeatureLoading 
            type="code" 
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
              <h1 className="text-2xl font-black text-black tracking-tight">AI Code Examples</h1>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Neural Learning Suite v2.0</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        {!examples ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-12 rounded-[3rem] text-center max-w-3xl mx-auto"
          >
            <div className="w-20 h-20 bg-red-50 rounded-3xl flex items-center justify-center text-[#ff3b3b] mx-auto mb-8 shadow-xl shadow-red-50">
              <Code className="w-10 h-10" />
            </div>
            <h2 className="text-3xl font-black text-black tracking-tight mb-4">Neural Code Synthesis</h2>
            <p className="text-gray-500 font-medium leading-relaxed mb-10">
              Enter a programming concept or algorithm, and our AI will generate clean, optimized code examples in multiple languages.
            </p>
            
            <form onSubmit={handleGenerate} className="space-y-6">
              <div className="relative group">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-300 group-focus-within:text-[#ff3b3b] transition-colors" />
                <input
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="e.g. Binary Search, React Hooks, REST API..."
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
                Synthesize Code
              </motion.button>
            </form>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            <div className="lg:col-span-1 space-y-6">
              <div className="glass-card p-8 rounded-[2.5rem] border-gray-100">
                <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-6">Languages</h3>
                <div className="space-y-3">
                  {examples.map((ex) => (
                    <button
                      key={ex.id}
                      onClick={() => setSelectedExample(ex)}
                      className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all group ${
                        selectedExample?.id === ex.id ? 'bg-[#ff3b3b] text-white shadow-lg shadow-red-100' : 'bg-gray-50 text-gray-400 hover:bg-gray-100'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-xl">{ex.icon}</span>
                        <span className="text-xs font-black uppercase tracking-widest">{ex.name}</span>
                      </div>
                      {selectedExample?.id === ex.id && <ChevronRight className="w-4 h-4" />}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-8 rounded-[2.5rem] bg-black text-white relative overflow-hidden">
                <Cpu className="w-10 h-10 text-red-400 mb-6" />
                <h3 className="text-lg font-black mb-2 leading-tight">Optimization</h3>
                <p className="text-[10px] font-bold text-red-100 uppercase tracking-widest leading-relaxed">
                  Our neural engine ensures all code follows industry best practices and is optimized for performance.
                </p>
              </div>
            </div>
            
            <div className="lg:col-span-3 space-y-8">
              <div className="glass-card rounded-[3rem] overflow-hidden border-gray-100 shadow-xl shadow-red-50/20">
                <div className="bg-gray-900 p-6 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 rounded-full bg-red-500" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500" />
                      <div className="w-3 h-3 rounded-full bg-green-500" />
                    </div>
                    <div className="ml-4 flex items-center space-x-2 text-gray-400">
                      <Terminal className="w-4 h-4" />
                      <span className="text-[10px] font-black uppercase tracking-widest">{selectedExample?.name} Example</span>
                    </div>
                  </div>
                  <button
                    onClick={handleCopy}
                    className="p-3 bg-white/5 hover:bg-white/10 rounded-xl text-gray-400 hover:text-white transition-all flex items-center space-x-2"
                  >
                    {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                    <span className="text-[10px] font-black uppercase tracking-widest">{copied ? 'Copied' : 'Copy Code'}</span>
                  </button>
                </div>
                <div className="p-10 bg-gray-950 overflow-x-auto custom-scrollbar">
                  <pre className="text-sm font-mono text-gray-300 leading-relaxed">
                    <code>{selectedExample?.code}</code>
                  </pre>
                </div>
                <div className="p-8 bg-white border-t border-gray-50">
                  <h4 className="text-xs font-black text-black uppercase tracking-widest mb-2 flex items-center">
                    <Layers className="w-4 h-4 mr-2 text-[#ff3b3b]" />
                    Explanation
                  </h4>
                  <p className="text-gray-500 font-medium leading-relaxed">
                    {selectedExample?.desc} This implementation is optimized for readability and follows standard conventions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
