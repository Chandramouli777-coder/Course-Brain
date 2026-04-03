import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  BookOpen, 
  Clock, 
  ChevronRight, 
  Layout, 
  FileText, 
  MessageSquare, 
  Plus,
  Video,
  Mic,
  Network,
  Compass,
  Zap,
  Star,
  User as UserIcon,
  Bell,
  X,
  Upload,
  Mail,
  ExternalLink,
  Target,
  Brain,
  Code,
  HelpCircle,
  FileQuestion,
  Trophy,
  Layers,
  Activity,
  Cpu,
  Share2,
  Focus,
  GitBranch,
  Shield
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CourseBrainLogo from '../components/CourseBrainLogo';
import PrivacyModal from '../components/PrivacyModal';
import ProfilePanel from '../components/ProfilePanel';
import FeatureLoading from '../components/FeatureLoading';
import AdBanner from '../components/AdBanner';

const defaultSubjects = [
  { name: 'Data Structures & Algorithms', code: 'CS301', progress: 0, color: 'bg-red-500' },
  { name: 'Java Programming', code: 'CS202', progress: 0, color: 'bg-[#ff3b3b]' },
  { name: 'Python for AI', code: 'AI101', progress: 0, color: 'bg-[#8b0000]' },
  { name: 'Database Management', code: 'CS304', progress: 0, color: 'bg-red-600' },
  { name: 'Engineering Physics', code: 'PH101', progress: 0, color: 'bg-red-400' },
  { name: 'Organic Chemistry', code: 'CH102', progress: 0, color: 'bg-[#ff3b3b]' },
  { name: 'Technical English', code: 'EN101', progress: 0, color: 'bg-green-500' },
];

const quickActions = [
  { id: 'video', name: 'Video to Notes', icon: Video, desc: 'Convert video to text', path: '/video-notes' },
  { id: 'audio', name: 'Audio to Notes', icon: Mic, desc: 'Transcribe lectures', path: '/audio-notes' },
  { id: 'visual', name: 'Notes to Visual', icon: Network, desc: 'Generate mind maps', path: '/notes-visual' },
  { id: 'career', name: 'Career Guidance', icon: Compass, desc: 'AI career paths', path: '/career-guidance' },
  { id: 'summary', name: 'Summary Gen', icon: FileText, desc: 'Quick summaries', path: '/summary' },
  { id: 'prep', name: 'Last Minute Prep', icon: Zap, desc: 'Exam revision', path: '/prep' },
];

const advancedTools = [
  { id: 'quiz', name: 'Quiz Gen', icon: FileQuestion, desc: 'Auto-generate quizzes', path: '/quiz' },
  { id: 'mock', name: 'Mock Exams', icon: Trophy, desc: 'Simulated exam environment', path: '/mock' },
  { id: 'weak', name: 'Weak Topics', icon: Target, desc: 'Detect learning gaps', path: '/weak-topics' },
  { id: 'graph', name: 'Knowledge Graph', icon: Network, desc: 'Visualize concept links', path: '/graph' },
  { id: 'algo', name: 'Algo Sim', icon: Code, desc: 'Interactive algorithm visualizer', path: '/algo' },
  { id: 'viz', name: 'Concept Viz', icon: Brain, desc: '3D concept visualization', path: '/viz' },
  { id: 'flash', name: 'Neural Cards', icon: Layers, desc: 'Spaced repetition flashcards', path: '/flashcards' },
  { id: 'sync', name: 'Brain Sync', icon: Share2, desc: 'Collaborative learning nodes', path: '/sync' },
  { id: 'focus', name: 'Deep Focus', icon: Focus, desc: 'AI study timer & soundscapes', path: '/focus' },
  { id: 'tree', name: 'Skill Tree', icon: GitBranch, desc: 'Dynamic learning progress tree', path: '/skill-tree' },
  { id: 'pulse', name: 'Neural Pulse', icon: Activity, desc: 'Real-time cognitive load tracking', path: '/pulse' },
  { id: 'core', name: 'Cortex Engine', icon: Cpu, desc: 'Advanced AI tutor core', path: '/cortex' },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('Guest User');
  const [userEmail, setUserEmail] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showProfilePanel, setShowProfilePanel] = useState(false);
  const [loadingFeature, setLoadingFeature] = useState<string | null>(null);
  const [isPrivacyAccepted, setIsPrivacyAccepted] = useState(false);
  const [isDetailsCompleted, setIsDetailsCompleted] = useState(false);
  const [courses, setCourses] = useState(defaultSubjects);
  const [showAddCourseModal, setShowAddCourseModal] = useState(false);
  const [newCourse, setNewCourse] = useState({ name: '', code: '', materials: '' });
  
  // User Details State
  const [fullName, setFullName] = useState('');
  const [userClass, setUserClass] = useState('');

  useEffect(() => {
    const storedEmail = localStorage.getItem('userEmail');
    const storedName = localStorage.getItem('fullName') || localStorage.getItem('userName') || 'Guest User';
    const privacyAccepted = localStorage.getItem('privacyAccepted');
    const detailsCompleted = localStorage.getItem('detailsCompleted');
    const savedFullName = localStorage.getItem('fullName');
    const savedClass = localStorage.getItem('userClass') || localStorage.getItem('class');

    if (storedName) setUserName(storedName);
    if (storedEmail) setUserEmail(storedEmail);
    if (savedFullName) setFullName(savedFullName);
    if (savedClass) setUserClass(savedClass);

    if (!privacyAccepted) {
      setShowPrivacyModal(true);
    } else {
      setIsPrivacyAccepted(true);
      if (!detailsCompleted) {
        setShowDetailsModal(true);
      } else {
        setIsDetailsCompleted(true);
      }
    }

    const savedCourses = localStorage.getItem('userCourses');
    if (savedCourses) {
      const parsedCourses = JSON.parse(savedCourses);
      // Ensure all progress is 0 as requested
      const resetCourses = parsedCourses.map((c: any) => ({ ...c, progress: 0 }));
      setCourses(resetCourses);
    } else {
      setCourses(defaultSubjects);
    }
  }, []);

  const handleAcceptPrivacy = () => {
    localStorage.setItem('privacyAccepted', 'true');
    setShowPrivacyModal(false);
    setIsPrivacyAccepted(true);
    setShowDetailsModal(true);
  };

  const handleSaveDetails = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('fullName', fullName);
    localStorage.setItem('userClass', userClass);
    localStorage.setItem('detailsCompleted', 'true');
    setShowDetailsModal(false);
    setIsDetailsCompleted(true);
  };

  const handleDeclinePrivacy = () => {
    localStorage.removeItem('privacyAccepted');
    navigate('/login');
  };

  const handleLogout = () => {
    setShowProfilePanel(false);
    navigate('/login');
  };

  const handleActionClick = (id: string, path: string) => {
    setLoadingFeature(id);
    // 4-second animation as requested
    setTimeout(() => {
      navigate(path);
    }, 4000);
  };

  const handleAddCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCourse.name || !newCourse.code) return;

    const courseToAdd = {
      ...newCourse,
      progress: 0,
      color: 'bg-[#ff3b3b]'
    };

    const updatedCourses = [courseToAdd, ...courses];
    setCourses(updatedCourses);
    localStorage.setItem('userCourses', JSON.stringify(updatedCourses));
    setNewCourse({ name: '', code: '', materials: '' });
    setShowAddCourseModal(false);
  };

  if (!isPrivacyAccepted || !isDetailsCompleted) {
    return (
      <div className="min-h-screen premium-gradient-bg flex items-center justify-center p-4">
        <AnimatePresence>
          {showPrivacyModal && (
            <PrivacyModal 
              isOpen={showPrivacyModal} 
              onAccept={handleAcceptPrivacy} 
              onDecline={handleDeclinePrivacy} 
            />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showDetailsModal && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
            >
              <motion.div 
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                className="glass-modal max-w-md w-full p-8 md:p-12"
              >
                <h2 className="text-3xl font-black text-black tracking-tight mb-2">Neural Identity</h2>
                <p className="text-gray-400 text-xs font-black uppercase tracking-widest mb-8">Complete your profile</p>
                
                <form onSubmit={handleSaveDetails} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Full Name</label>
                    <input 
                      type="text" 
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-6 py-4 bg-gray-50 rounded-2xl border-none focus:ring-4 focus:ring-red-50 outline-none font-bold text-gray-700"
                      placeholder="Alex Johnson"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Academic Level</label>
                    <select 
                      required
                      value={userClass}
                      onChange={(e) => setUserClass(e.target.value)}
                      className="w-full px-6 py-4 bg-gray-50 rounded-2xl border-none focus:ring-4 focus:ring-red-50 outline-none font-bold text-gray-700 appearance-none"
                    >
                      <option value="">Select Level</option>
                      <option value="B.Tech 1st Year">B.Tech 1st Year</option>
                      <option value="B.Tech 2nd Year">B.Tech 2nd Year</option>
                      <option value="B.Tech 3rd Year">B.Tech 3rd Year</option>
                      <option value="B.Tech 4th Year">B.Tech 4th Year</option>
                    </select>
                  </div>
                  <button 
                    type="submit"
                    className="w-full py-5 bg-[#ff3b3b] text-white rounded-2xl font-black uppercase tracking-widest hover:bg-[#8b0000] transition-all mt-4"
                  >
                    Sync Identity
                  </button>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#fcfcfc]">
      <AnimatePresence>
        {loadingFeature && (
          <FeatureLoading 
            type={loadingFeature} 
            onComplete={() => setLoadingFeature(null)} 
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showAddCourseModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAddCourseModal(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-lg glass-modal rounded-[2.5rem] p-10 overflow-hidden"
            >
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-black text-black tracking-tight">Add New Course</h2>
                <button onClick={() => setShowAddCourseModal(false)} className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
                  <X className="w-6 h-6 text-gray-400" />
                </button>
              </div>

              <form onSubmit={handleAddCourse} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Course Name</label>
                  <input
                    type="text"
                    required
                    value={newCourse.name}
                    onChange={(e) => setNewCourse({ ...newCourse, name: e.target.value })}
                    placeholder="e.g. Machine Learning"
                    className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-4 focus:ring-red-50 transition-all outline-none font-bold text-gray-700"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Course Code</label>
                  <input
                    type="text"
                    required
                    value={newCourse.code}
                    onChange={(e) => setNewCourse({ ...newCourse, code: e.target.value })}
                    placeholder="e.g. AI201"
                    className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-4 focus:ring-red-50 transition-all outline-none font-bold text-gray-700"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Materials (Optional)</label>
                  <div className="border-2 border-dashed border-gray-100 rounded-2xl p-6 text-center hover:border-red-200 transition-all cursor-pointer bg-gray-50/50">
                    <Upload className="w-6 h-6 text-gray-300 mx-auto mb-2" />
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Upload PDF or Text</p>
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="submit"
                    className="flex-1 py-4 bg-[#ff3b3b] text-white rounded-2xl font-black uppercase tracking-widest text-xs shadow-lg shadow-red-100 hover:bg-[#8b0000] transition-all"
                  >
                    Add Course
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAddCourseModal(false)}
                    className="flex-1 py-4 bg-gray-50 text-gray-500 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-gray-100 transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside className="w-72 bg-white border-r border-gray-100 hidden lg:flex flex-col sticky top-0 h-screen">
        <div className="p-8 border-b border-gray-50">
          <CourseBrainLogo size="md" />
        </div>
        
        <nav className="flex-1 p-6 space-y-2">
          {[
            { name: 'Overview', icon: Layout, active: true },
            { name: 'My Courses', icon: BookOpen },
            { name: 'AI Notes', icon: FileText },
            { name: 'Doubt Solver', icon: MessageSquare },
            { name: 'Revision', icon: Clock },
            { name: 'Privacy Policy', icon: Shield, path: '/privacy' },
          ].map((item) => (
            <button
              key={item.name}
              onClick={() => item.path && navigate(item.path)}
              className={`w-full flex items-center space-x-4 px-6 py-4 rounded-2xl transition-all font-black text-xs uppercase tracking-widest relative group ${
                item.active ? 'text-[#ff3b3b]' : 'text-gray-400 hover:bg-gray-50 hover:text-gray-600'
              }`}
            >
              {item.active && (
                <motion.div
                  layoutId="sidebar-active"
                  className="absolute left-0 w-1.5 h-8 bg-[#ff3b3b] rounded-r-full"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <item.icon className={`w-5 h-5 ${item.active ? 'text-[#ff3b3b]' : 'group-hover:text-[#ff3b3b] transition-colors'}`} />
              <span>{item.name}</span>
            </button>
          ))}
        </nav>

        <div className="p-6 border-t border-gray-50">
          <div className="bg-gradient-to-br from-[#ff3b3b] to-[#8b0000] rounded-3xl p-6 text-white relative overflow-hidden group">
            <div className="relative z-10">
              <Star className="w-8 h-8 mb-4 text-red-200" />
              <p className="font-black text-lg mb-1">Upgrade to Pro</p>
              <p className="text-red-100 text-xs font-bold uppercase tracking-widest mb-4">Unlock all AI features</p>
              <button className="w-full bg-white text-[#ff3b3b] py-3 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-red-50 transition-colors">
                Upgrade Now
              </button>
            </div>
            <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 lg:ml-0 p-8 lg:p-12">
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div className="flex-1">
            <motion.h1 
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
              className="text-4xl font-black text-black tracking-tight mb-2"
            >
              Welcome back, {userName}! 👋
            </motion.h1>
            <motion.p 
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 1, 0.5, 1] }}
              className="text-gray-400 font-bold uppercase tracking-[0.2em] text-xs"
            >
              {userClass} • Your learning progress is looking great today.
            </motion.p>
          </div>

          <div className="flex items-center space-x-6">
            {/* Neural Status Card */}
            <div className="hidden xl:flex items-center space-x-4 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
              <div className="relative">
                <Activity className="w-6 h-6 text-[#ff3b3b] animate-pulse" />
                <div className="absolute inset-0 bg-[#ff3b3b]/20 blur-lg rounded-full" />
              </div>
              <div>
                <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest">Neural Pulse</p>
                <p className="text-xs font-black text-black">Optimal Focus</p>
              </div>
              <div className="w-12 h-1.5 bg-gray-50 rounded-full overflow-hidden">
                <motion.div 
                  animate={{ width: ['20%', '80%', '40%', '90%', '60%'] }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  className="h-full bg-[#ff3b3b]"
                />
              </div>
            </div>

            <div className="relative group hidden md:block">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#ff3b3b] transition-colors" />
              <input
                type="text"
                placeholder="Search resources..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-64 pl-14 pr-6 py-4 bg-white border border-gray-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-red-50 transition-all font-medium text-gray-600 shadow-sm"
              />
            </div>

            <div className="flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-4 rounded-2xl bg-white border border-gray-100 text-gray-400 hover:text-[#ff3b3b] hover:border-red-100 transition-all shadow-sm relative"
              >
                <Bell className="w-6 h-6" />
                <span className="absolute top-4 right-4 w-2 h-2 bg-[#ff3b3b] rounded-full border-2 border-white" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowProfilePanel(true)}
                className="p-1 rounded-2xl bg-white border border-gray-100 shadow-sm hover:border-red-100 transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#ff3b3b] to-[#8b0000] flex items-center justify-center text-white">
                  <UserIcon className="w-6 h-6" />
                </div>
              </motion.button>
            </div>
          </div>
        </header>

        {/* Quick AI Tools */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-sm font-black text-black uppercase tracking-[0.3em]">AI Learning Suite</h2>
            <button 
              onClick={() => navigate('/tools')}
              className="text-[#ff3b3b] font-black text-xs uppercase tracking-widest hover:underline"
            >
              View All Tools
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {quickActions.map((action, i) => (
              <motion.button
                key={action.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, ease: [0.25, 1, 0.5, 1] }}
                whileHover={{ y: -8, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleActionClick(action.id, action.path)}
                className="flex flex-col items-center p-6 bg-white border border-gray-50 rounded-[2rem] hover:shadow-2xl hover:shadow-red-50 transition-all group"
              >
                <div className="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-[#ff3b3b] transition-all duration-500">
                  <action.icon className="w-6 h-6 text-[#ff3b3b] group-hover:text-white transition-colors duration-500" />
                </div>
                <span className="text-[10px] font-black text-black uppercase tracking-widest text-center leading-tight">{action.name}</span>
              </motion.button>
            ))}
          </div>
        </section>

        {/* My Courses */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-sm font-black text-black uppercase tracking-[0.3em]">Active Courses</h2>
            <button 
              onClick={() => setShowAddCourseModal(true)}
              className="flex items-center space-x-2 bg-black text-white px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-gray-800 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Add Course</span>
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {courses.map((subject, i) => (
                <motion.div
                  key={subject.name}
                  layout
                  initial={{ opacity: 0, scale: 0.9, y: 30 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ 
                    duration: 0.6, 
                    delay: i < 7 ? 0.3 + (i * 0.1) : 0,
                    ease: [0.25, 1, 0.5, 1] 
                  }}
                  whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(255, 59, 59, 0.1)' }}
                  className="bg-white p-8 rounded-[2.5rem] border border-gray-50 shadow-sm transition-all group relative overflow-hidden"
                >
                  <div className="flex justify-between items-start mb-6">
                    <div className={`w-14 h-14 ${subject.color} rounded-2xl flex items-center justify-center shadow-lg shadow-red-100`}>
                      <BookOpen className="w-7 h-7 text-white" />
                    </div>
                    <span className="text-xs font-black text-gray-300 uppercase tracking-widest">{subject.code}</span>
                  </div>
                  
                  <h3 className="text-xl font-black text-black mb-6 leading-tight group-hover:text-[#ff3b3b] transition-colors">
                    {subject.name}
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-end">
                      <span className="text-xs font-black text-gray-400 uppercase tracking-widest">Progress</span>
                      <span className="text-sm font-black text-black">{subject.progress}%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-50 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${subject.progress}%` }}
                        transition={{ duration: 1.5, delay: 0.5 + (i * 0.1), ease: [0.25, 1, 0.5, 1] }}
                        className={`h-full ${subject.color} rounded-full`}
                      />
                    </div>
                  </div>

                  <button className="w-full mt-8 py-4 bg-gray-50 text-gray-900 font-black text-xs uppercase tracking-widest rounded-2xl hover:bg-[#ff3b3b] hover:text-white transition-all flex items-center justify-center space-x-2">
                    <span>{subject.progress === 100 ? 'Review Course' : 'Continue Learning'}</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </section>

        {/* Advanced AI Tools */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-sm font-black text-black uppercase tracking-[0.3em]">Advanced Neural Tools</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {advancedTools.map((tool, i) => (
              <motion.div
                key={tool.name}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 + i * 0.1 }}
                onClick={() => handleActionClick(tool.id, tool.path)}
                className="glass-card p-6 hover:border-[#ff3b3b]/30 transition-all cursor-pointer group"
              >
                <div className="p-4 bg-gray-50 rounded-2xl w-fit mb-4 group-hover:bg-red-50 transition-colors">
                  <tool.icon className="w-6 h-6 text-gray-400 group-hover:text-[#ff3b3b]" />
                </div>
                <h3 className="text-sm font-black text-black uppercase tracking-widest mb-2">{tool.name}</h3>
                <p className="text-[10px] text-gray-400 font-bold leading-relaxed">{tool.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Stay Updated Section */}
        <section className="mb-16">
          <div className="glass-card rounded-[3rem] p-12 relative overflow-hidden">
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="max-w-md">
                <h2 className="text-3xl font-black text-black tracking-tight mb-4">Stay Updated</h2>
                <p className="text-gray-500 font-medium leading-relaxed mb-6">
                  Get the latest AI learning tips and platform updates directly in your inbox.
                </p>
                <div className="flex items-center space-x-4">
                  <div className="flex-1 relative">
                    <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input 
                      type="email" 
                      placeholder="Enter your email"
                      className="w-full pl-14 pr-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-4 focus:ring-red-50 transition-all outline-none font-bold text-gray-700"
                    />
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-[#ff3b3b] text-white rounded-2xl font-black uppercase tracking-widest text-xs shadow-lg shadow-red-100"
                  >
                    Subscribe
                  </motion.button>
                </div>
                <div className="mt-6 flex items-center space-x-3">
                  <span className="text-xs font-black text-gray-400 uppercase tracking-widest">Official Contact:</span>
                  <a 
                    href="mailto:coursebrain.official@gmail.com"
                    className="flex items-center space-x-2 text-[#ff3b3b] font-black text-xs uppercase tracking-widest hover:underline group"
                  >
                    <Mail className="w-4 h-4" />
                    <span>coursebrain.official@gmail.com</span>
                    <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </div>
              </div>
              <div className="w-full md:w-64 h-64 bg-red-50 rounded-[2.5rem] flex items-center justify-center relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-[#ff3b3b]/10 to-transparent rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition-opacity" />
                <Mail className="w-24 h-24 text-[#ff3b3b] brain-glow" />
              </div>
            </div>
          </div>
        </section>

        {/* Advertisement Banner */}
        <motion.section 
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1, duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
          className="relative"
        >
          <div className="bg-black rounded-[2.5rem] p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#ff3b3b]/20 rounded-full blur-[100px] -mr-32 -mt-32 group-hover:bg-[#ff3b3b]/30 transition-colors duration-700" />
            <div className="relative z-10">
              <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight mb-2">
                🚀 Upgrade to <span className="text-[#ff3b3b]">Course Brain Pro</span>
              </h2>
              <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">
                Unlock unlimited AI features and priority support
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(255, 59, 59, 0.4)' }}
              whileTap={{ scale: 0.95 }}
              className="relative z-10 px-10 py-5 bg-[#ff3b3b] text-white rounded-2xl font-black uppercase tracking-widest text-sm shadow-xl shadow-red-900/20 animate-pulse"
            >
              Upgrade Now
            </motion.button>
          </div>
        </motion.section>

        {/* Dashboard Footer */}
        <footer className="mt-20 pt-10 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">© 2026 Course Brain AI • Neural Learning Suite v2.0</p>
          <div className="flex items-center space-x-6">
            <button onClick={() => navigate('/privacy')} className="text-[10px] font-black text-gray-400 uppercase tracking-widest hover:text-[#ff3b3b] transition-colors">Privacy Policy</button>
            <button onClick={() => navigate('/privacy')} className="text-[10px] font-black text-gray-400 uppercase tracking-widest hover:text-[#ff3b3b] transition-colors">Terms of Service</button>
            <button onClick={() => navigate('/privacy')} className="text-[10px] font-black text-gray-400 uppercase tracking-widest hover:text-[#ff3b3b] transition-colors">Help Center</button>
          </div>
        </footer>
      </main>

      <ProfilePanel 
        isOpen={showProfilePanel} 
        onClose={() => setShowProfilePanel(false)} 
        onLogout={handleLogout} 
      />
    </div>
  );
}
