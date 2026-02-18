import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, ArrowRight, Activity } from 'lucide-react';
// ✅ IMPORT NAVIGATE
import { useNavigate } from 'react-router-dom';
import TunisiaMap from '../ui/TunisiaMap';

const Hero = () => {
  // ✅ INITIALIZE NAVIGATE
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen lg:h-screen w-full bg-slate-950 overflow-hidden flex items-center pt-24 lg:pt-0">
      
      {/* 1. Cyber-Glow Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 lg:w-[500px] lg:h-[500px] bg-blue-600/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 lg:w-[500px] lg:h-[500px] bg-indigo-600/10 blur-[120px] rounded-full animate-pulse" />
      </div>

      {/* 2. Main Layout Container */}
      <main className="container mx-auto px-6 lg:px-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        
        {/* LEFT SIDE: Elite Messaging */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col justify-center space-y-6 text-center lg:text-left items-center lg:items-start"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-500/20 bg-blue-500/5 text-blue-400 text-[10px] font-black uppercase tracking-[0.2em]">
            <Activity size={14} className="animate-pulse" /> Live Partnership Network
          </div>

          {/* Heading */}
          <h1 className="text-5xl md:text-7xl xl:text-8xl font-black text-white leading-[1.05] tracking-tighter">
            NEXT-GEN <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-blue-600">
              ALLIANCE.
            </span>
          </h1>

          <p className="text-gray-400 text-lg max-w-md leading-relaxed border-l-0 lg:border-l-2 border-blue-600/30 px-4 lg:px-0 lg:pl-6">
            Tunisia's only high-trust ecosystem. We verify identities and secure visions. Join the top 1% of founders.
          </p>

          {/* Call to Action */}
          <div className="flex flex-col sm:flex-row items-center gap-6 pt-4 w-full sm:w-auto">
            {/* ✅ ADDED onClick TO BUTTON */}
            <button 
              onClick={() => navigate('/signup')}
              className="w-full sm:w-auto px-10 py-5 bg-blue-600 hover:bg-blue-500 text-white font-black rounded-2xl transition-all shadow-[0_10px_40px_rgba(59,130,246,0.3)] flex items-center justify-center gap-2 group cursor-pointer"
            >
              INITIATE PITCH <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <div className="flex items-center gap-3 text-gray-500">
              <ShieldCheck size={24} className="text-blue-500/50" />
              <span className="text-[10px] font-medium uppercase tracking-widest text-left">Biometric <br/> Secured</span>
            </div>
          </div>
        </motion.div>

        {/* RIGHT SIDE */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative w-full flex items-center justify-center"
        >
          <div className="relative w-full max-w-[350px] md:max-w-md lg:max-w-none">
            <div className="absolute inset-0 bg-blue-500/10 blur-[100px] rounded-full scale-75" />
            <TunisiaMap />
            <div className="absolute -bottom- lg:bottom-0 right-0 lg:-right-10 p-5 bg-slate-800/80 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl">
              <div className="flex items-center gap-4">
                <div className="h-2.5 w-2.5 rounded-full bg-green-500 animate-ping" />
                <div>
                  <p className="text-[10px] text-gray-500 font-bold uppercase tracking-tighter">Core System</p>
                  <p className="text-sm font-black text-white uppercase tracking-widest">Operational</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

      </main>

      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/40 to-transparent shadow-[0_0_20px_rgba(59,130,246,0.5)]" />
    </div>
  );
};

export default Hero;