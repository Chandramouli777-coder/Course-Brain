import { motion, AnimatePresence } from 'motion/react';
import { Shield, Check, X, FileText, Lock, ExternalLink } from 'lucide-react';

interface PrivacyModalProps {
  isOpen: boolean;
  onAccept: () => void;
  onDecline: () => void;
}

export default function PrivacyModal({ isOpen, onAccept, onDecline }: PrivacyModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-2xl glass-modal rounded-[2.5rem] overflow-hidden"
          >
            <div className="p-8 sm:p-12">
              <div className="flex items-center space-x-4 mb-8">
                <div className="w-16 h-16 rounded-2xl bg-red-50 flex items-center justify-center">
                  <Shield className="w-8 h-8 text-[#ff3b3b]" />
                </div>
                <div>
                  <h2 className="text-3xl font-black text-black tracking-tight">
                    Privacy Policy & Terms
                  </h2>
                  <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">
                    Last updated: April 2026
                  </p>
                </div>
              </div>

              <div className="space-y-6 max-h-[40vh] overflow-y-auto pr-4 custom-scrollbar mb-8">
                <section>
                  <h3 className="flex items-center text-sm font-black text-black uppercase tracking-widest mb-3">
                    <Lock className="w-4 h-4 mr-2 text-[#ff3b3b]" />
                    Data Protection
                  </h3>
                  <p className="text-gray-500 leading-relaxed font-medium">
                    We use advanced AI to personalize your learning experience. Your data is encrypted and never shared with third parties without your explicit consent. We collect minimal information required to provide our services.
                  </p>
                </section>

                <section>
                  <h3 className="flex items-center text-sm font-black text-black uppercase tracking-widest mb-3">
                    <FileText className="w-4 h-4 mr-2 text-[#ff3b3b]" />
                    Terms of Service
                  </h3>
                  <p className="text-gray-500 leading-relaxed font-medium">
                    By using Course Brain, you agree to our community guidelines. We strive to provide accurate AI-generated content, but users should verify critical information. Prohibited use includes any form of academic dishonesty.
                  </p>
                </section>

                <section>
                  <h3 className="flex items-center text-sm font-black text-black uppercase tracking-widest mb-3">
                    <ExternalLink className="w-4 h-4 mr-2 text-[#ff3b3b]" />
                    Third-Party Services
                  </h3>
                  <p className="text-gray-500 leading-relaxed font-medium">
                    We may integrate with services like Google and GitHub for authentication. Their respective privacy policies apply to data handled by them.
                  </p>
                </section>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onAccept}
                  className="flex-1 py-5 bg-[#ff3b3b] text-white rounded-2xl font-black uppercase tracking-widest text-sm flex items-center justify-center shadow-lg shadow-red-100 hover:bg-[#8b0000] transition-all"
                >
                  <Check className="w-5 h-5 mr-2" />
                  Accept & Continue
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onDecline}
                  className="flex-1 py-5 bg-gray-50 text-gray-500 rounded-2xl font-black uppercase tracking-widest text-sm flex items-center justify-center hover:bg-gray-100 transition-all"
                >
                  <X className="w-5 h-5 mr-2" />
                  Decline
                </motion.button>
              </div>
              
              <p className="mt-6 text-center text-xs font-bold text-gray-400 uppercase tracking-widest">
                Declining will sign you out of your account
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
