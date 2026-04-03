import { motion } from 'motion/react';
import { Github, Twitter, Linkedin, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import CourseBrainLogo from './CourseBrainLogo';

export default function Footer() {
  return (
    <footer className="bg-[#8b0000] text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="mb-6 block">
              <CourseBrainLogo size="md" lightMode={true} />
            </Link>
            <p className="text-red-100 leading-relaxed mb-6">
              Empowering students with AI-driven study tools to master any subject with ease and efficiency.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-red-300 transition-colors"><Twitter className="w-5 h-5" /></a>
              <a href="#" className="hover:text-red-300 transition-colors"><Github className="w-5 h-5" /></a>
              <a href="#" className="hover:text-red-300 transition-colors"><Linkedin className="w-5 h-5" /></a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Product</h4>
            <ul className="space-y-4">
              <li><Link to="/#features" className="hover:text-red-300 transition-colors">Features</Link></li>
              <li><Link to="/#pricing" className="hover:text-red-300 transition-colors">Pricing</Link></li>
              <li><Link to="/dashboard" className="hover:text-red-300 transition-colors">Dashboard</Link></li>
              <li><Link to="/notes" className="hover:text-red-300 transition-colors">Notes Generator</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Company</h4>
            <ul className="space-y-4">
              <li><a href="#" className="hover:text-red-300 transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-red-300 transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-red-300 transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-red-300 transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Stay Updated</h4>
            <p className="text-sm text-red-100 mb-4">Subscribe to our newsletter for study tips and updates.</p>
            <div className="flex mb-6 group">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-red-900/50 border border-red-700/30 rounded-l-lg px-4 py-2 w-full focus:ring-2 focus:ring-red-400 outline-none text-white placeholder:text-red-200 transition-all group-hover:bg-red-900/70"
              />
              <button className="bg-[#ff3b3b] text-white px-4 py-2 rounded-r-lg hover:bg-red-500 transition-all hover:shadow-[0_0_15px_rgba(255,59,59,0.5)] active:scale-95">
                <Mail className="w-5 h-5" />
              </button>
            </div>
            
            <div className="pt-4 border-t border-red-800/50">
              <p className="text-[10px] text-red-300 uppercase tracking-[0.2em] font-bold mb-2">Official Support</p>
              <div className="flex items-center gap-3 group cursor-pointer" onClick={() => window.open('mailto:coursebrain.official@gmail.com')}>
                <div className="w-8 h-8 rounded-full bg-red-900/50 flex items-center justify-center group-hover:bg-[#ff3b3b] transition-all group-hover:shadow-[0_0_10px_rgba(255,59,59,0.3)]">
                  <Mail className="w-4 h-4 text-red-200 group-hover:text-white" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-white font-medium group-hover:text-red-200 transition-colors">coursebrain.official@gmail.com</span>
                  <span className="text-[10px] text-red-400 group-hover:text-red-300 transition-colors">Click to contact us</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-red-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-red-200">© 2026 Course Brain AI. All rights reserved.</p>
          <div className="flex space-x-6 text-sm text-red-200">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/privacy" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
