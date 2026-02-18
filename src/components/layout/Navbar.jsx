import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Zap } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // 1. Handle scroll effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 2. Close mobile menu when switching pages
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Services', path: '/services' },
    { name: 'About', path: '/about' },
    { name: 'Feedback', path: '/feedback' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${
      scrolled ? 'bg-slate-950/90 backdrop-blur-xl border-b border-white/5 py-4' : 'bg-transparent py-6'
    }`}>
      <div className="container mx-auto px-6 lg:px-16 flex justify-between items-center">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="bg-blue-600 p-1.5 rounded-lg group-hover:rotate-12 transition-transform duration-300">
            <Zap size={20} className="text-white fill-white" />
          </div>
          <span className="text-xl font-black text-white tracking-tighter uppercase italic">
            Chriki <span className="text-blue-500">TN</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.path} 
              className={`text-[11px] font-bold uppercase tracking-[0.2em] transition-colors ${
                location.pathname === link.path ? 'text-blue-500' : 'text-gray-400 hover:text-blue-400'
              }`}
            >
              {link.name}
            </Link>
          ))}
          
          {/* Auth Actions */}
          <div className="flex items-center gap-6 border-l border-white/10 pl-10">
            <Link to="/login" className="text-[11px] font-bold text-white uppercase tracking-[0.2em] hover:text-blue-400 transition-colors">
              Login
            </Link>
            <Link 
              to="/signup" 
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-black uppercase tracking-widest rounded-xl transition-all shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:scale-105 active:scale-95"
            >
              Join Alliance
            </Link>
          </div>
        </div>

        {/* Mobile Toggle */}
        <button className="lg:hidden text-white p-2" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-full left-0 w-full bg-slate-900 border-b border-white/10 overflow-hidden lg:hidden"
          >
            <div className="p-8 flex flex-col gap-6">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  to={link.path} 
                  className="text-white font-bold uppercase tracking-widest text-sm hover:text-blue-500 transition-colors"
                >
                  {link.name}
                </Link>
              ))}
              <div className="h-[1px] bg-white/5 w-full my-2" />
              <Link to="/login" className="text-gray-400 font-bold uppercase tracking-widest text-sm">Login</Link>
              <Link to="/signup" className="w-full py-4 bg-blue-600 text-white text-center font-black rounded-xl shadow-lg">
                JOIN ALLIANCE
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;