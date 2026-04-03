import { motion, AnimatePresence } from 'motion/react';
import { User, Menu, X, LogOut, Settings, CreditCard } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import CourseBrainLogo from './CourseBrainLogo';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [userName, setUserName] = useState('Guest User');
  const [userEmail, setUserEmail] = useState('');
  const [userClass, setUserClass] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);

    const storedEmail = localStorage.getItem('userEmail');
    const storedName = localStorage.getItem('fullName') || localStorage.getItem('userName') || 'Guest User';
    const storedClass = localStorage.getItem('userClass') || localStorage.getItem('class') || 'Not Set';

    if (storedName) setUserName(storedName);
    if (storedEmail) setUserEmail(storedEmail);
    if (storedClass) setUserClass(storedClass);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [showProfile]);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    setShowProfile(false);
    navigate('/login');
  };

  const navLinks = [
    { name: 'Features', href: '/#features' },
    { name: 'Pricing', href: '/#pricing' },
    { name: 'Dashboard', href: '/dashboard' },
  ];

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? 'bg-white/80 backdrop-blur-xl border-b border-gray-100 py-3 shadow-sm' 
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <Link to="/" className="flex items-center">
              <CourseBrainLogo size="md" />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-10">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="text-sm font-bold text-gray-600 hover:text-[#ff3b3b] transition-colors tracking-widest uppercase"
                >
                  {link.name}
                </Link>
              ))}
              <div className="h-6 w-px bg-gray-100 mx-2" />
              <div className="flex items-center space-x-4">
                {/* Profile Icon */}
                <button 
                  onClick={() => setShowProfile(true)}
                  className="p-2 hover:bg-red-50 rounded-full transition-colors group"
                >
                  <User className="w-6 h-6 text-gray-600 group-hover:text-[#ff3b3b]" />
                </button>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center space-x-4">
              <button 
                onClick={() => setShowProfile(true)}
                className="p-2 hover:bg-red-50 rounded-full"
              >
                <User className="w-6 h-6 text-gray-600" />
              </button>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-600 hover:text-[#ff3b3b] p-2"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-b border-gray-100 overflow-hidden"
            >
              <div className="px-4 pt-2 pb-6 space-y-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.href}
                    onClick={() => setIsOpen(false)}
                    className="block px-4 py-3 text-base font-bold text-gray-600 hover:text-[#ff3b3b] hover:bg-red-50 rounded-xl transition-all"
                  >
                    {link.name}
                  </Link>
                ))}
                <div className="pt-4 flex flex-col space-y-3 px-4">
                  {/* Auth buttons removed */}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Profile Panel Overlay */}
      <AnimatePresence>
        {showProfile && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowProfile(false)}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[60]"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-white z-[70] shadow-2xl flex flex-col"
            >
              <div className="p-8 flex items-center justify-between border-b border-gray-50">
                <h2 className="text-2xl font-black text-black tracking-tight">My Profile</h2>
                <button 
                  onClick={() => setShowProfile(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-6 h-6 text-gray-400" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-8">
                {/* User Info Card */}
                <div className="bg-red-50 rounded-3xl p-8 mb-10 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 opacity-10">
                    <CourseBrainLogo size="lg" showText={false} />
                  </div>
                  <div className="relative z-10">
                    <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                      <User className="w-10 h-10 text-[#ff3b3b]" />
                    </div>
                    <h3 className="text-2xl font-bold text-black mb-1">{userName}</h3>
                    <p className="text-red-400 font-bold text-sm uppercase tracking-widest mb-6">{userEmail}</p>
                    
                    <div className="space-y-4">
                      <div className="flex justify-between text-sm font-bold text-gray-500 uppercase tracking-widest">
                        <span>Class / Year</span>
                        <span className="text-black">{userClass}</span>
                      </div>
                      <div className="flex justify-between text-sm font-bold text-gray-500 uppercase tracking-widest">
                        <span>Courses Completed</span>
                        <span className="text-black">0 Courses</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Progress Section */}
                <div className="mb-10">
                  <div className="flex justify-between items-end mb-4">
                    <h4 className="text-sm font-black text-black uppercase tracking-[0.2em]">Overall Progress</h4>
                    <span className="text-2xl font-black text-[#ff3b3b]">0%</span>
                  </div>
                  <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: '0%' }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      className="h-full bg-gradient-to-r from-[#ff3b3b] to-[#8b0000] rounded-full shadow-[0_0_10px_rgba(255,59,59,0.3)]"
                    />
                  </div>
                </div>

                {/* Features Access */}
                <div className="mb-10">
                  <h4 className="text-sm font-black text-black uppercase tracking-[0.2em] mb-6">Features Access</h4>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { name: 'AI Notes', access: true },
                      { name: 'Doubt Solver', access: true },
                      { name: 'Visualizer', access: true },
                      { name: 'Career Path', access: true },
                    ].map((feature) => (
                      <div key={feature.name} className="flex items-center space-x-3 p-4 bg-gray-50 rounded-2xl">
                        <div className={`w-2 h-2 rounded-full ${feature.access ? 'bg-green-500' : 'bg-gray-300'}`} />
                        <span className="text-sm font-bold text-gray-600">{feature.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="space-y-4">
                  <button className="w-full flex items-center justify-between p-5 bg-white border border-gray-100 rounded-2xl hover:bg-gray-50 transition-all group">
                    <div className="flex items-center space-x-4">
                      <Settings className="w-5 h-5 text-gray-400 group-hover:text-[#ff3b3b]" />
                      <span className="font-bold text-gray-700">Edit Profile</span>
                    </div>
                    <span className="text-gray-300">→</span>
                  </button>
                  <button className="w-full flex items-center justify-between p-5 bg-white border border-gray-100 rounded-2xl hover:bg-gray-50 transition-all group">
                    <div className="flex items-center space-x-4">
                      <CreditCard className="w-5 h-5 text-gray-400 group-hover:text-[#ff3b3b]" />
                      <span className="font-bold text-gray-700">Subscription</span>
                    </div>
                    <span className="text-gray-300">→</span>
                  </button>
                </div>
              </div>

              <div className="p-8 border-t border-gray-50">
                <button 
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center space-x-3 p-5 bg-red-50 text-[#ff3b3b] font-black uppercase tracking-widest rounded-2xl hover:bg-[#ff3b3b] hover:text-white transition-all"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Logout</span>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
