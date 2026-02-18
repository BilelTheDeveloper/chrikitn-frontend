import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, Github, Twitter, Linkedin, Mail, ShieldCheck } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 border-t border-white/5 pt-20 pb-10 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-64 bg-blue-600/5 blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Column */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="bg-blue-600 p-1.5 rounded-lg">
                <Zap size={18} className="text-white fill-white" />
              </div>
              <span className="text-xl font-black text-white tracking-tighter uppercase italic">
                Chriki <span className="text-blue-500">TN</span>
              </span>
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
              Tunisia's elite ecosystem for verified founders and specialists. 
              Securing visions, matching talent, building the future.
            </p>
            <div className="flex gap-4">
              {[Twitter, Github, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="p-2 bg-slate-900 rounded-lg text-gray-400 hover:text-blue-500 hover:bg-slate-800 transition-all">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-6">Platform</h4>
            <ul className="space-y-4">
              {['Services', 'About', 'Feedback', 'Alliance Rules'].map((item) => (
                <li key={item}>
                  <Link to={`/${item.toLowerCase().replace(' ', '-')}`} className="text-gray-500 hover:text-blue-400 text-sm transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal/Trust */}
          <div>
            <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-6">Security</h4>
            <ul className="space-y-4">
              {['Privacy Policy', 'Terms of Service', 'Identity Verification', 'Safety Center'].map((item) => (
                <li key={item}>
                  <Link to="/" className="text-gray-500 hover:text-blue-400 text-sm transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter/CTA */}
          <div className="space-y-6">
            <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-6">Stay Connected</h4>
            <div className="relative group">
              <input 
                type="email" 
                placeholder="Secure Email..." 
                className="w-full bg-slate-900 border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500/50 transition-all"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 p-1.5 rounded-lg text-white hover:bg-blue-500 transition-colors">
                <Mail size={16} />
              </button>
            </div>
            <div className="flex items-center gap-2 text-[10px] text-gray-600 font-bold uppercase tracking-widest">
              <ShieldCheck size={14} className="text-green-500/50" />
              Biometric Secured Protocol
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-gray-600 text-[10px] font-bold uppercase tracking-[0.2em]">
            &copy; {currentYear} CHRIKI TN. ALL RIGHTS RESERVED.
          </p>
          <div className="flex items-center gap-4">
             <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
             <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Mainnet v4.0.2 - Tunisia</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;