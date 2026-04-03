import { motion, AnimatePresence } from 'motion/react';
import { Mail, Lock, ArrowRight, Github, ArrowLeft, Eye, EyeOff, Check, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import CourseBrainLogo from '../components/CourseBrainLogo';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isShaking, setIsShaking] = useState(false);

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

  const validation = {
    length: password.length >= 8,
    upper: /[A-Z]/.test(password),
    lower: /[a-z]/.test(password),
    number: /\d/.test(password),
    special: /[@$!%*?&]/.test(password),
  };

  const strength = Object.values(validation).filter(Boolean).length;
  const strengthColor = strength <= 2 ? 'bg-red-500' : strength <= 4 ? 'bg-yellow-500' : 'bg-green-500';

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!passwordRegex.test(password)) {
      setError('Password does not meet security requirements');
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
      return;
    }

    // Extract name from email
    const namePart = email.split('@')[0];
    const formattedName = namePart.charAt(0).toUpperCase() + namePart.slice(1);
    
    localStorage.setItem('userName', formattedName);
    localStorage.setItem('userEmail', email);
    localStorage.setItem('isLoggedIn', 'true');
    
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen premium-gradient-bg flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Accents */}
      <div className="absolute top-0 left-0 w-full h-full -z-10">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-red-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-red-500/3 rounded-full blur-[120px]" />
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 px-4">
        <div className="flex justify-center mb-12">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
          >
            <CourseBrainLogo size="lg" />
          </motion.div>
        </div>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-center"
        >
          <h2 className="text-5xl font-black text-black tracking-tighter heading-glow">
            Welcome <span className="text-[#ff3b3b]">Back</span>
          </h2>
          <p className="mt-4 text-xs font-black text-gray-400 uppercase tracking-[0.4em]">
            Neural Core Access Required
          </p>
        </motion.div>
      </div>

      <motion.div 
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.2, ease: [0.25, 1, 0.5, 1] }}
        className="mt-12 sm:mx-auto sm:w-full sm:max-w-md px-4"
      >
        <div className={`glass-modal p-8 md:p-12 relative overflow-hidden ${isShaking ? 'animate-shake' : ''}`}>
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 blur-3xl rounded-full -mr-16 -mt-16" />
          
          <form onSubmit={handleLogin} className="space-y-8 relative z-10">
            <div className="space-y-2">
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] ml-1">
                Email Address
              </label>
              <div className="relative group">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300 group-focus-within:text-[#ff3b3b] transition-colors" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-14 pr-6 py-5 bg-gray-50/50 border border-transparent focus:border-red-100 rounded-3xl focus:ring-4 focus:ring-red-50 transition-all font-bold text-gray-700 outline-none"
                  placeholder="alex@example.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] ml-1">
                Security Key
              </label>
              <div className="relative group">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300 group-focus-within:text-[#ff3b3b] transition-colors" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-14 pr-14 py-5 bg-gray-50/50 border border-transparent focus:border-red-100 rounded-3xl focus:ring-4 focus:ring-red-50 transition-all font-bold text-gray-700 outline-none"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-300 hover:text-[#ff3b3b] transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>

              {/* Password Strength Indicator */}
              {password.length > 0 && (
                <div className="mt-4 space-y-4">
                  <div className="flex gap-1 h-1 w-full rounded-full overflow-hidden bg-gray-100">
                    {[...Array(5)].map((_, i) => (
                      <div 
                        key={i} 
                        className={`flex-1 transition-all duration-500 ${i < strength ? strengthColor : 'bg-transparent'}`} 
                      />
                    ))}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2">
                    {Object.entries({
                      '8+ Characters': validation.length,
                      'Uppercase': validation.upper,
                      'Lowercase': validation.lower,
                      'Number': validation.number,
                      'Special Symbol': validation.special,
                    }).map(([label, isValid]) => (
                      <div key={label} className="flex items-center space-x-2">
                        {isValid ? (
                          <Check className="w-3 h-3 text-green-500" />
                        ) : (
                          <X className="w-3 h-3 text-gray-300" />
                        )}
                        <span className={`text-[9px] font-black uppercase tracking-widest ${isValid ? 'text-green-600' : 'text-gray-400'}`}>
                          {label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <AnimatePresence>
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-xs font-black text-red-500 uppercase tracking-widest text-center"
                >
                  {error}
                </motion.p>
              )}
            </AnimatePresence>

            <div className="flex items-center justify-between px-1">
              <label className="flex items-center cursor-pointer group">
                <div className="relative">
                  <input type="checkbox" className="sr-only" />
                  <div className="w-10 h-5 bg-gray-100 rounded-full shadow-inner transition-colors group-hover:bg-gray-200" />
                  <div className="dot absolute left-1 top-1 bg-white w-3 h-3 rounded-full transition-transform" />
                </div>
                <span className="ml-3 text-[10px] font-black text-gray-400 uppercase tracking-widest">Remember Me</span>
              </label>
              <Link to="#" className="text-[10px] font-black text-[#ff3b3b] hover:underline uppercase tracking-widest">
                Recovery Key?
              </Link>
            </div>

            <motion.button
              whileHover={{ scale: 1.02, boxShadow: '0 20px 40px rgba(255, 59, 59, 0.2)' }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full flex justify-center items-center py-6 px-4 rounded-3xl shadow-xl shadow-red-100 text-xs font-black uppercase tracking-[0.3em] text-white bg-[#ff3b3b] hover:bg-[#8b0000] transition-all relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              <span className="relative z-10">Initialize Session</span>
              <ArrowRight className="ml-3 w-5 h-5 relative z-10" />
            </motion.button>
          </form>

          <div className="mt-12">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-100" />
              </div>
              <div className="relative flex justify-center text-[9px] font-black uppercase tracking-[0.4em]">
                <span className="px-6 bg-white/80 backdrop-blur-sm text-gray-400">Neural Sync</span>
              </div>
            </div>

            <div className="mt-10">
              <motion.button 
                whileHover={{ y: -2 }}
                className="w-full inline-flex justify-center py-5 px-4 border border-gray-100 rounded-3xl bg-white/50 text-[10px] font-black uppercase tracking-widest text-gray-500 hover:bg-gray-50 hover:text-black transition-all"
              >
                <Github className="w-5 h-5 mr-4" />
                GitHub Protocol
              </motion.button>
            </div>
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 flex flex-col items-center space-y-6"
        >
          <p className="text-center text-[10px] font-black text-gray-400 uppercase tracking-widest">
            New to Course Brain?{' '}
            <Link to="/signup" className="text-[#ff3b3b] hover:underline ml-2">
              Create Neural ID
            </Link>
          </p>
          <Link to="/" className="inline-flex items-center text-[10px] font-black text-gray-300 hover:text-[#ff3b3b] transition-colors uppercase tracking-[0.3em]">
            <ArrowLeft className="w-4 h-4 mr-3" />
            Abort to Home
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
