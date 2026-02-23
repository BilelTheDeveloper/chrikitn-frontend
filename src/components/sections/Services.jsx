import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Users, ShieldCheck, ArrowUpRight, Globe, Lock } from 'lucide-react';

const Services = () => {
  const features = [
    {
      title: "Neural Escrow",
      desc: "Scam-proof payments. We hold the funds in a secure vault. Money is only released when the work is 100% verified.",
      icon: <Lock size={28} />,
      color: "from-emerald-600 to-teal-500",
      delay: 0.1
    },
    {
      title: "The Collective",
      desc: "Your elite digital headquarters. A professional portfolio link to show the world you are a top-tier operative.",
      icon: <Globe size={28} />,
      color: "from-blue-600 to-indigo-500",
      delay: 0.2
    },
    {
      title: "Verified Ideas",
      desc: "Every project is vetted. Share your vision in the pitch feed protected by biometric-verified viewing protocols.",
      icon: <Zap size={28} />,
      color: "from-cyan-600 to-blue-500",
      delay: 0.3
    },
    {
      title: "Elite Matching",
      desc: "We connect high-end Brands with vetted Freelancers. Manual reviews and face-matching ensure zero low-quality spam.",
      icon: <Users size={28} />,
      color: "from-indigo-700 to-blue-600",
      delay: 0.4
    }
  ];

  return (
    <div className="container mx-auto px-6 relative py-20">
      {/* Decorative background blur */}
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-full h-64 bg-blue-600/5 blur-[120px] pointer-events-none" />

      <div className="text-center mb-20 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center"
        >
          <span className="text-blue-500 font-black tracking-[0.4em] text-[10px] uppercase mb-4 underline decoration-blue-500/50 underline-offset-8">System Protocols</span>
          <h2 className="text-5xl lg:text-7xl font-black text-white uppercase tracking-tighter leading-none italic">
            THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-700">ECOSYSTEM</span>
          </h2>
          <div className="h-1 w-32 bg-blue-600 mt-8 rounded-full" />
        </motion.div>
      </div>
      
      {/* Grid Update: Changed to 2x2 on medium and 4 columns on large */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
        {features.map((f, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: f.delay, duration: 0.5 }}
            whileHover={{ y: -8 }}
            className="relative p-[1px] bg-white/10 rounded-[2rem] group overflow-hidden"
          >
            {/* The Inner Card */}
            <div className="bg-[#020617] p-8 rounded-[1.9rem] h-full flex flex-col items-start transition-all group-hover:bg-slate-900/40 relative z-10">
              
              {/* Icon Container with Glow */}
              <div className={`mb-6 p-3 rounded-xl bg-gradient-to-br ${f.color} text-white shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                {f.icon}
              </div>

              <h3 className="text-xl font-black text-white mb-3 tracking-tight group-hover:text-blue-400 transition-colors uppercase italic">
                {f.title}
              </h3>
              
              <p className="text-gray-400 text-xs leading-relaxed mb-6 font-medium">
                {f.desc}
              </p>

              {/* Card Footer */}
              <div className="mt-auto flex items-center gap-2 text-[9px] font-black text-blue-500/50 uppercase tracking-[0.2em] group-hover:text-blue-400 transition-colors">
                Initialize_Link <ArrowUpRight size={12} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </div>
            </div>

            {/* Subtle Inner Border Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Services;