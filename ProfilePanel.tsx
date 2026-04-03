import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { User, Mail, CreditCard, GraduationCap, BookOpen, TrendingUp, X, LogOut, Settings, ChevronRight } from 'lucide-react';

interface ProfilePanelProps {
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
}

export default function ProfilePanel({ isOpen, onClose, onLogout }: ProfilePanelProps) {
  const [userName, setUserName] = useState('Guest User');
  const [userEmail, setUserEmail] = useState('');
  const [userClass, setUserClass] = useState('Not Set');

  useEffect(() => {
    if (isOpen) {
      const storedEmail = localStorage.getItem('userEmail');
      const storedName = localStorage.getItem('fullName') || localStorage.getItem('userName') || 'Guest User';
      const storedClass = localStorage.getItem('userClass') || localStorage.getItem('class') || 'Not Set';

      if (storedName) setUserName(storedName);
      if (storedEmail) setUserEmail(storedEmail);
      if (storedClass) setUserClass(storedClass);
    }
  }, [isOpen]);

  const stats = [
    { icon: BookOpen, label: 'Courses Completed', value: '0', color: 'text-blue-500', bg: 'bg-blue-50' },
    { icon: TrendingUp, label: 'Learning Progress', value: '0%', color: 'text-[#ff3b3b]', bg: 'bg-red-50' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[110] bg-black/20 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 h-full w-full max-w-md z-[120] bg-white shadow-2xl overflow-hidden flex flex-col"
          >
            <div className="p-8 flex items-center justify-between border-b border-gray-50">
              <h2 className="text-2xl font-black text-black tracking-tight">My Profile</h2>
              <motion.button
                whileHover={{ rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="p-2 rounded-xl bg-gray-50 text-gray-400 hover:text-black transition-colors"
              >
                <X className="w-6 h-6" />
              </motion.button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar">
              {/* User Info */}
              <div className="flex items-center space-x-6">
                <div className="relative">
                  <div className="w-24 h-24 rounded-[2rem] bg-gradient-to-br from-[#ff3b3b] to-[#8b0000] flex items-center justify-center shadow-xl shadow-red-100">
                    <User className="w-12 h-12 text-white" />
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-xl bg-green-500 border-4 border-white flex items-center justify-center shadow-lg">
                    <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-black text-black">{userName}</h3>
                  <p className="text-sm font-bold text-gray-400 uppercase tracking-widest flex items-center mt-1">
                    <Mail className="w-4 h-4 mr-2" />
                    {userEmail || 'No Email Provided'}
                  </p>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4">
                {stats.map((stat, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 * idx }}
                    className="p-6 rounded-[2rem] bg-gray-50 border border-gray-100"
                  >
                    <div className={`w-10 h-10 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center mb-4`}>
                      <stat.icon className="w-5 h-5" />
                    </div>
                    <div className="text-2xl font-black text-black">{stat.value}</div>
                    <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">{stat.label}</div>
                  </motion.div>
                ))}
              </div>

              {/* Details List */}
              <div className="space-y-4">
                <div className="p-6 rounded-[2rem] bg-white border border-gray-100 shadow-sm flex items-center justify-between hover:border-red-100 transition-colors group">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-2xl bg-red-50 text-[#ff3b3b] flex items-center justify-center">
                      <CreditCard className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-sm font-black text-black uppercase tracking-widest">Subscription</div>
                      <div className="text-sm font-bold text-gray-500">Premium AI Plan</div>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-[#ff3b3b] transition-colors" />
                </div>

                <div className="p-6 rounded-[2rem] bg-white border border-gray-100 shadow-sm flex items-center justify-between hover:border-red-100 transition-colors group">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-500 flex items-center justify-center">
                      <GraduationCap className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-sm font-black text-black uppercase tracking-widest">Class</div>
                      <div className="text-sm font-bold text-gray-500">{userClass}</div>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-blue-500 transition-colors" />
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-3 pt-4">
                <button className="w-full py-4 px-6 rounded-2xl bg-gray-50 text-gray-600 font-bold text-sm flex items-center justify-between hover:bg-gray-100 transition-colors">
                  <div className="flex items-center">
                    <Settings className="w-5 h-5 mr-3" />
                    Account Settings
                  </div>
                </button>
                <button 
                  onClick={onLogout}
                  className="w-full py-4 px-6 rounded-2xl bg-red-50 text-[#ff3b3b] font-bold text-sm flex items-center justify-between hover:bg-red-100 transition-colors"
                >
                  <div className="flex items-center">
                    <LogOut className="w-5 h-5 mr-3" />
                    Sign Out
                  </div>
                </button>
              </div>
            </div>
            
            <div className="p-8 border-t border-gray-50 bg-gray-50/50">
              <p className="text-center text-[10px] font-black text-gray-400 uppercase tracking-widest">
                Course Brain v2.0 • Premium AI Platform
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
