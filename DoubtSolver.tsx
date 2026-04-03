import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, 
  Send, 
  User, 
  Loader2,
  Sparkles,
  ChevronRight,
  Zap,
  MessageSquare,
  Bot
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { solveDoubt } from '../services/gemini';
import CourseBrainLogo from '../components/CourseBrainLogo';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

export default function DoubtSolver() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm your Course Brain AI tutor. What academic doubt can I help you with today?",
      sender: 'ai',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await solveDoubt(input);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response || "I'm sorry, I couldn't process that. Could you rephrase?",
        sender: 'ai',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fcfcfc] flex flex-col">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-50 h-20 flex items-center px-6 shrink-0 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto w-full flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <motion.button 
              whileHover={{ x: -4 }}
              onClick={() => navigate('/dashboard')}
              className="p-3 hover:bg-gray-50 rounded-2xl transition-colors text-gray-400 hover:text-black"
            >
              <ArrowLeft className="w-6 h-6" />
            </motion.button>
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center text-[#ff3b3b] shadow-inner">
                <Bot className="w-7 h-7" />
              </div>
              <div>
                <h1 className="text-lg font-black text-black tracking-tight">AI Tutor</h1>
                <div className="flex items-center text-[10px] text-green-500 font-black uppercase tracking-widest">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                  Active Now
                </div>
              </div>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-3 text-[10px] font-black uppercase tracking-widest text-gray-400 bg-gray-50 px-4 py-2 rounded-2xl border border-gray-100">
            <Sparkles className="w-3 h-3 text-[#ff3b3b]" />
            <span>Gemini Ultra 2.0</span>
          </div>
        </div>
      </header>

      {/* Chat Area */}
      <main className="flex-1 overflow-y-auto p-6 md:p-12 custom-scrollbar">
        <div className="max-w-3xl mx-auto space-y-10">
          <AnimatePresence initial={false}>
            {messages.map((message, i) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex max-w-[85%] md:max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div className={`shrink-0 w-10 h-10 rounded-2xl flex items-center justify-center mt-1 shadow-sm ${
                    message.sender === 'user' ? 'bg-black ml-4' : 'bg-white border border-gray-100 mr-4'
                  }`}>
                    {message.sender === 'user' ? (
                      <User className="w-5 h-5 text-white" />
                    ) : (
                      <div className="text-[#ff3b3b]">
                        <CourseBrainLogo size="sm" showText={false} />
                      </div>
                    )}
                  </div>
                  <div className={`p-6 rounded-[2rem] shadow-sm transition-all ${
                    message.sender === 'user' 
                      ? 'bg-[#ff3b3b] text-white rounded-tr-none shadow-red-100' 
                      : 'bg-white text-gray-800 border border-gray-50 rounded-tl-none'
                  }`}>
                    <div className={`prose prose-sm max-w-none prose-headings:text-inherit prose-p:text-inherit prose-strong:text-inherit prose-ul:text-inherit ${
                      message.sender === 'user' ? 'prose-invert' : 'prose-red'
                    } prose-p:font-medium prose-p:leading-relaxed`}>
                      <ReactMarkdown>{message.text}</ReactMarkdown>
                    </div>
                    <div className={`text-[10px] font-black uppercase tracking-widest mt-4 opacity-40 ${message.sender === 'user' ? 'text-right' : 'text-left'}`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          {isLoading && (
            <motion.div 
              initial={{ opacity: 0, x: -10 }} 
              animate={{ opacity: 1, x: 0 }} 
              className="flex justify-start"
            >
              <div className="flex items-center space-x-4 bg-white p-6 rounded-[2rem] border border-gray-50 shadow-sm">
                <div className="flex space-x-1">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.1 }}
                      className="w-1.5 h-1.5 bg-[#ff3b3b] rounded-full"
                    />
                  ))}
                </div>
                <span className="text-xs font-black text-gray-400 uppercase tracking-widest">AI is thinking...</span>
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </main>

      {/* Input Area */}
      <div className="bg-white/80 backdrop-blur-md border-t border-gray-50 p-6 shrink-0">
        <div className="max-w-3xl mx-auto">
          <form onSubmit={handleSend} className="relative group">
            <div className="absolute inset-0 bg-red-50 rounded-[2rem] blur-xl opacity-0 group-focus-within:opacity-50 transition-opacity -z-10" />
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Describe your academic doubt in detail..."
              className="w-full pl-8 pr-20 py-6 bg-gray-50 border-none rounded-[2rem] focus:ring-4 focus:ring-red-50 transition-all outline-none font-bold text-gray-700 placeholder:text-gray-300"
            />
            <motion.button
              whileHover={{ scale: 1.05, x: -4 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={!input.trim() || isLoading}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-4 bg-[#ff3b3b] text-white rounded-2xl hover:bg-[#8b0000] disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-red-100"
            >
              <Send className="w-6 h-6" />
            </motion.button>
          </form>
          <div className="flex items-center justify-center space-x-4 mt-4">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
              Tip: You can paste code or math formulas
            </p>
            <div className="w-1 h-1 bg-gray-200 rounded-full" />
            <button className="text-[10px] font-black text-[#ff3b3b] uppercase tracking-widest hover:underline">
              Clear Chat
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
