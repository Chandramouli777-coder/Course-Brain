import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, 
  Sparkles, 
  FileText, 
  Download, 
  Copy, 
  Loader2,
  Upload,
  X,
  Video,
  Mic,
  Layout,
  Zap,
  ChevronRight,
  Clock
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { generateNotes } from '../services/gemini';
import FeatureLoading from '../components/FeatureLoading';

export default function NotesGenerator() {
  const navigate = useNavigate();
  const [topic, setTopic] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [notes, setNotes] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [sourceType, setSourceType] = useState<string>('notes');

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;

    setIsLoading(true);
    
    try {
      const result = await generateNotes(topic);
      setNotes(result || 'Failed to generate notes.');
    } catch (error) {
      console.error(error);
      setNotes('An error occurred while generating notes.');
    } finally {
      // The FeatureLoading will handle the 3s delay via its own internal timer
      // but we keep isLoading true until it completes or we manually set it
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <div className="min-h-screen bg-[#fcfcfc]">
      <AnimatePresence>
        {isLoading && (
          <FeatureLoading 
            type={sourceType} 
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
            <div>
              <h1 className="text-2xl font-black text-black tracking-tight">AI Notes Engine</h1>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Powered by Course Brain AI</p>
            </div>
          </div>
          {notes && (
            <div className="flex items-center space-x-3">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 text-gray-400 hover:text-[#ff3b3b] hover:bg-red-50 rounded-2xl transition-all"
              >
                <Copy className="w-5 h-5" />
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 text-gray-400 hover:text-[#ff3b3b] hover:bg-red-50 rounded-2xl transition-all"
              >
                <Download className="w-5 h-5" />
              </motion.button>
            </div>
          )}
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-12">
        {!notes ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-2 space-y-8"
            >
              <div className="glass-card p-10 rounded-[3rem] border-gray-100 shadow-xl shadow-red-50/20">
                <div className="flex items-center space-x-4 mb-10">
                  <div className="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center text-[#ff3b3b]">
                    <Sparkles className="w-8 h-8" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-black text-black tracking-tight">Generate Smart Notes</h2>
                    <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Transform any topic into structured knowledge</p>
                  </div>
                </div>

                <form onSubmit={handleGenerate} className="space-y-8">
                  <div className="space-y-3">
                    <label className="block text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Topic or Subject</label>
                    <input
                      type="text"
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                      placeholder="e.g. Quantum Computing, Cellular Biology..."
                      className="block w-full px-6 py-5 bg-gray-50 border-none rounded-[1.5rem] focus:ring-4 focus:ring-red-50 transition-all outline-none text-lg font-bold text-gray-700 placeholder:text-gray-300"
                    />
                  </div>

                  <div className="space-y-3">
                    <label className="block text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Or Upload Source Material</label>
                    <div className="border-2 border-dashed border-gray-100 rounded-[2rem] p-12 text-center hover:border-red-200 transition-all cursor-pointer relative bg-gray-50/50 group">
                      <input
                        type="file"
                        onChange={handleFileUpload}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                        accept=".pdf,.txt"
                      />
                      {file ? (
                        <div className="flex items-center justify-center space-x-4">
                          <div className="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center text-[#ff3b3b]">
                            <FileText className="w-8 h-8" />
                          </div>
                          <div className="text-left">
                            <p className="font-black text-black">{file.name}</p>
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                          </div>
                          <button 
                            onClick={(e) => { e.preventDefault(); setFile(null); }}
                            className="p-2 hover:bg-red-50 rounded-xl text-gray-300 hover:text-[#ff3b3b] transition-colors"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        </div>
                      ) : (
                        <>
                          <div className="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center text-gray-300 mx-auto mb-6 group-hover:text-[#ff3b3b] transition-colors">
                            <Upload className="w-8 h-8" />
                          </div>
                          <p className="font-black text-black text-lg">Drop your files here</p>
                          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-2">Supports PDF, TXT up to 20MB</p>
                        </>
                      )}
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={isLoading || !topic.trim()}
                    className="w-full flex items-center justify-center px-8 py-5 bg-[#ff3b3b] text-white text-sm font-black uppercase tracking-widest rounded-2xl hover:bg-[#8b0000] disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-xl shadow-red-100"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-6 h-6 mr-3 animate-spin" />
                        AI is Processing...
                      </>
                    ) : (
                      <>
                        <Zap className="w-5 h-5 mr-3" />
                        Generate Premium Notes
                      </>
                    )}
                  </motion.button>
                </form>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-8"
            >
              <div className="p-8 rounded-[2.5rem] bg-black text-white relative overflow-hidden">
                <h3 className="text-sm font-black uppercase tracking-[0.3em] mb-8 text-red-400">Select AI Engine</h3>
                <div className="space-y-3">
                  {[
                    { id: 'notes', name: 'Standard Notes', icon: FileText, desc: 'Text-based summaries' },
                    { id: 'video', name: 'Video Engine', icon: Video, desc: 'Frames to structured text' },
                    { id: 'audio', name: 'Audio Engine', icon: Mic, desc: 'Voice to lecture notes' },
                    { id: 'summary', name: 'Summary Gen', icon: Layout, desc: 'Dense knowledge compression' },
                    { id: 'prep', name: 'Exam Prep', icon: Clock, desc: 'Optimized revision flow' },
                  ].map((engine) => (
                    <button
                      key={engine.id}
                      onClick={() => setSourceType(engine.id)}
                      className={`w-full flex items-center justify-between p-5 rounded-2xl transition-all group ${
                        sourceType === engine.id ? 'bg-[#ff3b3b] text-white' : 'bg-white/5 hover:bg-white/10 text-gray-400'
                      }`}
                    >
                      <div className="flex items-center space-x-4">
                        <engine.icon className={`w-5 h-5 ${sourceType === engine.id ? 'text-white' : 'text-red-400'}`} />
                        <div className="text-left">
                          <div className="text-xs font-black uppercase tracking-widest">{engine.name}</div>
                          <div className="text-[10px] font-bold opacity-60">{engine.desc}</div>
                        </div>
                      </div>
                      {sourceType === engine.id && <ChevronRight className="w-4 h-4" />}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-8 rounded-[2.5rem] bg-white border border-gray-100 shadow-sm">
                <h3 className="text-sm font-black text-black uppercase tracking-widest mb-4">Pro Tip</h3>
                <p className="text-gray-500 text-sm font-medium leading-relaxed">
                  Use the <span className="text-[#ff3b3b] font-bold">Video Engine</span> for YouTube lectures to get timestamped summaries and key diagrams automatically.
                </p>
              </div>
            </motion.div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white p-10 md:p-16 rounded-[3rem] border border-gray-50 shadow-2xl shadow-red-50/20"
          >
            <div className="prose prose-red max-w-none prose-headings:font-black prose-headings:tracking-tight prose-p:font-medium prose-p:text-gray-600 prose-p:leading-relaxed">
              <ReactMarkdown>{notes}</ReactMarkdown>
            </div>
            <div className="mt-16 pt-10 border-t border-gray-50 flex flex-col items-center">
              <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">Generated by Course Brain AI v2.0</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setNotes(null)}
                className="px-8 py-4 bg-gray-50 text-[#ff3b3b] font-black text-xs uppercase tracking-widest rounded-2xl hover:bg-red-50 transition-all"
              >
                Generate Another Resource
              </motion.button>
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
}
