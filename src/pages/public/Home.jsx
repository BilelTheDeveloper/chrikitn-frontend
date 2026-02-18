import React from 'react';
import { motion } from 'framer-motion';
import Hero from '../../components/sections/Hero';
import Services from '../../components/sections/Services';
import Feedback from '../../components/sections/Feedback';
import Motivation from '../../components/sections/Motivation';
import { Zap, ShieldCheck, Binary, Cpu, Workflow, ChevronRight } from 'lucide-react';

// --- Sub-Component: The Elite Convergence Section ---
const TrustTalentConvergence = () => (
  <section className="py-24 bg-slate-950 relative overflow-hidden border-t border-white/5">
    <div className="container mx-auto px-6 relative z-10">
      
      {/* Section Header */}
      <div className="max-w-3xl mb-20">
        <div className="inline-flex items-center gap-2 text-blue-500 font-black text-[10px] uppercase tracking-[0.4em] mb-4">
          <Cpu size={14} /> System Architecture
        </div>
        <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter leading-[0.9]">
          The <span className="text-blue-500">Convergence</span> <br />
          of Power & Integrity
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Side: The Talent Pool */}
        <div className="lg:col-span-4 space-y-6">
          <motion.div 
            whileHover={{ x: 10 }}
            className="p-8 rounded-[2.5rem] bg-slate-900/40 border border-white/5 backdrop-blur-3xl relative group"
          >
            <div className="absolute top-6 right-8 text-blue-500/10 group-hover:text-blue-500/30 transition-colors">
              <Binary size={40} />
            </div>
            <h3 className="text-xl font-black text-white uppercase italic mb-4 tracking-tight">Unfiltered Talent</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Tunisia is home to world-class visionaries. But without a network, this raw power remains fragmented. We aggregate the elite.
            </p>
          </motion.div>
          <div className="flex items-center gap-3 px-6">
            <div className="h-[1px] w-12 bg-blue-500/30" />
            <span className="text-[9px] font-black text-blue-500 uppercase tracking-[0.3em]">Propelling Potential</span>
          </div>
        </div>

        {/* Center: The Chriki "Fusion" Core */}
        <div className="lg:col-span-4 flex flex-col items-center justify-center relative py-12 lg:py-0">
          <div className="relative">
            {/* Outer Pulsing Glow */}
            <div className="absolute inset-0 scale-150 bg-blue-600/10 blur-[80px] rounded-full animate-pulse" />
            
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="w-56 h-56 rounded-full border-2 border-dashed border-blue-500/20 flex items-center justify-center relative z-10"
            >
              <div className="w-44 h-44 rounded-full border border-blue-500/40 flex items-center justify-center bg-slate-950/50 backdrop-blur-xl">
                <div className="w-32 h-32 bg-blue-600 rounded-full flex items-center justify-center shadow-[0_0_60px_rgba(59,130,246,0.4)]">
                  <ShieldCheck size={50} className="text-white" />
                </div>
              </div>
            </motion.div>

            {/* Connecting Lasers (Desktop) */}
            <div className="hidden lg:block absolute top-1/2 -left-24 w-24 h-[1px] bg-gradient-to-r from-transparent via-blue-500/50 to-blue-500" />
            <div className="hidden lg:block absolute top-1/2 -right-24 w-24 h-[1px] bg-gradient-to-l from-transparent via-blue-500/50 to-blue-500" />
          </div>
          <div className="mt-12 px-6 py-2 bg-slate-900 border border-white/10 rounded-full">
             <span className="text-[10px] font-black text-white uppercase tracking-[0.4em]">The Trust Anchor</span>
          </div>
        </div>

        {/* Right Side: The Trust Solution */}
        <div className="lg:col-span-4 space-y-6">
          <motion.div 
            whileHover={{ x: -10 }}
            className="p-8 rounded-[2.5rem] bg-slate-900/40 border border-white/5 backdrop-blur-3xl relative group"
          >
            <div className="absolute top-6 left-8 text-blue-500/10 group-hover:text-blue-500/30 transition-colors">
              <Workflow size={40} />
            </div>
            <h3 className="text-xl font-black text-white uppercase italic mb-4 tracking-tight lg:text-right">Verified Trust</h3>
            <p className="text-slate-400 text-sm leading-relaxed lg:text-right">
              By injecting biometric verification, we transform anonymous users into <span className="text-white font-bold">Trusted Operatives.</span> No ghosting.
            </p>
          </motion.div>
          <div className="flex items-center justify-end gap-3 px-6">
            <span className="text-[9px] font-black text-blue-500 uppercase tracking-[0.3em]">Eliminating Risk</span>
            <div className="h-[1px] w-12 bg-blue-500/30" />
          </div>
        </div>
      </div>
    </div>
  </section>
);

// --- Main Home Component ---
const Home = () => {
  return (
    <div className="bg-slate-950 min-h-screen">
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Services Section */}
      <section className="py-24 bg-slate-900/30 relative">
        <Services />
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-slate-950 to-transparent" />
      </section>

      {/* 3. NEW: Talent & Trust Convergence Section */}
      <TrustTalentConvergence />

      {/* 4. Motivation Section */}
      <section className="py-24 border-t border-white/5 bg-slate-950/50">
        <Motivation />
      </section>

      {/* 5. Feedback Section */}
      <section className="py-24 border-t border-white/10 bg-slate-900/20">
        <div className="container mx-auto px-6 mb-12">
           <div className="flex items-center gap-4">
              <div className="h-[2px] w-12 bg-blue-600" />
              <h2 className="text-2xl font-black text-white uppercase tracking-tighter italic">Intelligence Briefing</h2>
           </div>
        </div>
        <Feedback />
      </section>
    </div>
  );
};

export default Home;