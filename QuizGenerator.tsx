import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, 
  Sparkles, 
  FileQuestion, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  Trophy,
  Zap,
  ChevronRight,
  Brain
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import FeatureLoading from '../components/FeatureLoading';

const mockQuiz = [
  {
    question: "What is the primary purpose of a Data Structure?",
    options: ["To store data in a specific format", "To increase memory usage", "To slow down algorithms", "To hide data from users"],
    answer: 0
  },
  {
    question: "Which of these is a linear data structure?",
    options: ["Tree", "Graph", "Linked List", "Heap"],
    answer: 2
  },
  {
    question: "What is the time complexity of searching in a balanced Binary Search Tree?",
    options: ["O(1)", "O(n)", "O(log n)", "O(n^2)"],
    answer: 2
  }
];

export default function QuizGenerator() {
  const navigate = useNavigate();
  const [topic, setTopic] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [quiz, setQuiz] = useState<any[] | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;
    setIsLoading(true);
    // Simulate AI generation
    setTimeout(() => {
      setQuiz(mockQuiz);
      setIsLoading(false);
    }, 3000);
  };

  const handleOptionSelect = (idx: number) => {
    if (selectedOption !== null) return;
    setSelectedOption(idx);
    if (idx === quiz![currentQuestion].answer) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion + 1 < quiz!.length) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
    } else {
      setShowResults(true);
    }
  };

  const resetQuiz = () => {
    setQuiz(null);
    setCurrentQuestion(0);
    setScore(0);
    setShowResults(false);
    setSelectedOption(null);
    setTopic('');
  };

  return (
    <div className="min-h-screen bg-[#fcfcfc]">
      <AnimatePresence>
        {isLoading && (
          <FeatureLoading 
            type="quiz" 
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
              <h1 className="text-2xl font-black text-black tracking-tight">AI Quiz Generator</h1>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Neural Learning Suite v2.0</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12">
        {!quiz ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-12 rounded-[3rem] text-center"
          >
            <div className="w-20 h-20 bg-red-50 rounded-3xl flex items-center justify-center text-[#ff3b3b] mx-auto mb-8 shadow-xl shadow-red-50">
              <FileQuestion className="w-10 h-10" />
            </div>
            <h2 className="text-3xl font-black text-black tracking-tight mb-4">Generate Adaptive Quiz</h2>
            <p className="text-gray-500 font-medium leading-relaxed mb-10 max-w-md mx-auto">
              Enter a topic or paste your notes to generate a personalized assessment powered by neural AI.
            </p>
            
            <form onSubmit={handleGenerate} className="space-y-6 max-w-lg mx-auto">
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g. Data Structures, React Hooks, etc."
                className="w-full px-8 py-5 bg-gray-50 border-none rounded-2xl focus:ring-4 focus:ring-red-50 transition-all outline-none text-lg font-bold text-gray-700"
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full py-5 bg-[#ff3b3b] text-white rounded-2xl font-black uppercase tracking-widest text-sm shadow-xl shadow-red-100 hover:bg-[#8b0000] transition-all flex items-center justify-center"
              >
                <Zap className="w-5 h-5 mr-3" />
                Generate Neural Quiz
              </motion.button>
            </form>
          </motion.div>
        ) : showResults ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card p-12 rounded-[3rem] text-center"
          >
            <div className="w-24 h-24 bg-yellow-50 rounded-full flex items-center justify-center text-yellow-500 mx-auto mb-8 shadow-xl shadow-yellow-50">
              <Trophy className="w-12 h-12" />
            </div>
            <h2 className="text-4xl font-black text-black tracking-tight mb-2">Quiz Completed!</h2>
            <p className="text-gray-400 font-black uppercase tracking-widest mb-10">Neural Performance Report</p>
            
            <div className="text-7xl font-black text-[#ff3b3b] mb-12">
              {Math.round((score / quiz.length) * 100)}%
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-12">
              <div className="p-6 bg-gray-50 rounded-3xl">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Correct</p>
                <p className="text-2xl font-black text-green-500">{score}</p>
              </div>
              <div className="p-6 bg-gray-50 rounded-3xl">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Total</p>
                <p className="text-2xl font-black text-black">{quiz.length}</p>
              </div>
            </div>
            
            <button
              onClick={resetQuiz}
              className="w-full py-5 bg-black text-white rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-gray-800 transition-all flex items-center justify-center"
            >
              <RotateCcw className="w-5 h-5 mr-3" />
              Retake Quiz
            </button>
          </motion.div>
        ) : (
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-card p-12 rounded-[3rem]"
          >
            <div className="flex justify-between items-center mb-10">
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Question {currentQuestion + 1} of {quiz.length}</span>
              <div className="w-32 h-2 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[#ff3b3b] transition-all duration-500" 
                  style={{ width: `${((currentQuestion + 1) / quiz.length) * 100}%` }}
                />
              </div>
            </div>
            
            <h3 className="text-2xl font-black text-black tracking-tight mb-10 leading-tight">
              {quiz[currentQuestion].question}
            </h3>
            
            <div className="space-y-4 mb-12">
              {quiz[currentQuestion].options.map((option: string, idx: number) => (
                <button
                  key={idx}
                  onClick={() => handleOptionSelect(idx)}
                  className={`w-full p-6 rounded-2xl text-left font-bold transition-all flex items-center justify-between border-2 ${
                    selectedOption === null 
                      ? 'bg-gray-50 border-transparent hover:border-red-100 hover:bg-white' 
                      : idx === quiz[currentQuestion].answer
                        ? 'bg-green-50 border-green-200 text-green-700'
                        : selectedOption === idx
                          ? 'bg-red-50 border-red-200 text-red-700'
                          : 'bg-gray-50 border-transparent opacity-50'
                  }`}
                >
                  <span>{option}</span>
                  {selectedOption !== null && idx === quiz[currentQuestion].answer && <CheckCircle2 className="w-5 h-5" />}
                  {selectedOption === idx && idx !== quiz[currentQuestion].answer && <XCircle className="w-5 h-5" />}
                </button>
              ))}
            </div>
            
            <AnimatePresence>
              {selectedOption !== null && (
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  onClick={nextQuestion}
                  className="w-full py-5 bg-black text-white rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-gray-800 transition-all flex items-center justify-center"
                >
                  <span>{currentQuestion + 1 === quiz.length ? 'Finish Quiz' : 'Next Question'}</span>
                  <ChevronRight className="ml-2 w-5 h-5" />
                </motion.button>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </main>
    </div>
  );
}
