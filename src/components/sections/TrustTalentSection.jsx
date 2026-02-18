import React from 'react';
import { motion } from 'framer-motion';
import { Zap, ShieldCheck, Cpu, Binary, Workflow } from 'lucide-react';

const TrustTalentSection = () => {
  return (
    <section className="py-24 bg-slate-950 relative overflow-hidden">
      <div className="container mx-auto px-6">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter leading-none mb-6">
            The <span className="text-blue-500">Convergence</span> <br />
            of Power & Integrity
          </h2>
          <div className="h-1 w-20 bg-blue-600 rounded-full mb-6" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Side: The Talent Pool */}
          <div className="lg:col-span-4 space-y-6">
            <div className="p-8 rounded-[2rem] bg-slate-900/30 border border-white/5 relative group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-100 transition-opacity">
                <Binary className="text-blue-500" size={40} />
              </div>
              <h3 className="text-xl font-black text-white uppercase italic mb-4">Unfiltered Talent</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Tunisia is home to world-class engineers, designers, and visionaries. But without a platform, this raw power remains fragmented and hidden.
              </p>
            </div>
            
            <div className="flex justify-center lg:justify-start">
               <motion.div 
                animate={{ x: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 3 }}
                className="flex items-center gap-2 text-blue-500 font-bold text-[10px] uppercase tracking-[0.3em]"
               >
                 Propelling Potential <Workflow size={14} />
               </motion.div>
            </div>
          </div>

          {/* Center: The Chriki "Fusion" Core */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center">
            <div className="relative">
              {/* Outer Glow Rings */}
              <div className="absolute inset-0 scale-150 bg-blue-600/20 blur-[60px] rounded-full animate-pulse" />
              
              <motion.div 
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="w-48 h-48 rounded-full border-2 border-dashed border-blue-500/30 flex items-center justify-center relative z-10"
              >
                <div className="w-40 h-40 rounded-full border border-blue-500/50 flex items-center justify-center">
                  <div className="w-32 h-32 bg-blue-600 rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(59,130,246,0.5)]">
                    <ShieldCheck size={60} className="text-white" />
                  </div>
                </div>
              </motion.div>

              {/* Connecting Lines (Desktop only) */}
              <div className="hidden lg:block absolute top-1/2 -left-20 w-20 h-[2px] bg-gradient-to-r from-transparent to-blue-500" />
              <div className="hidden lg:block absolute top-1/2 -right-20 w-20 h-[2px] bg-gradient-to-l from-transparent to-blue-500" />
            </div>
            
            <div className="mt-12 text-center">
               <span className="text-[10px] font-black text-white uppercase tracking-[0.5em] bg-blue-600 px-4 py-1 rounded-full">
                 The Trust Anchor
               </span>
            </div>
          </div>

          {/* Right Side: The Trust Solution */}
          <div className="lg:col-span-4 space-y-6">
            <div className="p-8 rounded-[2rem] bg-slate-900/30 border border-white/5 relative group text-right lg:text-left">
              <div className="absolute top-0 left-0 p-4 opacity-10 lg:hidden transition-opacity">
                <Cpu className="text-blue-500" size={40} />
              </div>
              <div className="absolute top-0 right-0 p-4 opacity-10 hidden lg:block transition-opacity">
                <Cpu className="text-blue-500" size={40} />
              </div>
              <h3 className="text-xl font-black text-white uppercase italic mb-4">Verified Trust</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                By injecting biometric verification and operational auditing, we transform "anonymous users" into 
                <span className="text-white font-bold"> Trusted Operatives.</span> No ghosting. No scams.
              </p>
            </div>

            <div className="flex justify-center lg:justify-end">
               <motion.div 
                animate={{ x: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 3 }}
                className="flex items-center gap-2 text-blue-500 font-bold text-[10px] uppercase tracking-[0.3em]"
               >
                 <Zap size={14} /> Eliminating Risk
               </motion.div>
            </div>
          </div>

        </div>

        {/* Bottom Conclusion */}
        <div className="mt-24 p-10 rounded-[3rem] border border-white/5 bg-slate-900/20 backdrop-blur-sm text-center">
          <p className="text-xl md:text-2xl font-medium text-slate-300 italic">
            "We don't just find you a partner; we find you an <span className="text-blue-500 font-black not-italic">Alliance</span> you can bet your business on."
          </p>
        </div>
      </div>
    </section>
  );
};

export default TrustTalentSection;