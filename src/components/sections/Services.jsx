import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Users, ShieldCheck, ArrowUpRight } from 'lucide-react';

const Services = () => {
  const features = [
    {
      title: "Verified Ideas",
      desc: "Every project on Chriki TN is vetted. No spam, just real visions looking for builders.",
      icon: <Zap size={28} />,
      color: "from-blue-600 to-cyan-500",
      delay: 0.1
    },
    {
      title: "Founder Matching",
      desc: "Our algorithm connects standard users with the exact skills of our freelancer pool.",
      icon: <Users size={28} />,
      color: "from-indigo-600 to-blue-500",
      delay: 0.2
    },
    {
      title: "Secured Deals",
      desc: "Brands access a VIP feed of verified talent. We handle the trust so you focus on the build.",
      icon: <ShieldCheck size={28} />,
      color: "from-blue-700 to-indigo-600",
      delay: 0.3
    }
  ];

  return (
    <div className="container mx-auto px-6 relative">
      {/* Decorative background blur */}
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-full h-64 bg-blue-600/5 blur-[120px] pointer-events-none" />

      <div className="text-center mb-20 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center"
        >
          <span className="text-blue-500 font-black tracking-[0.4em] text-[10px] uppercase mb-4">The Alliance Edge</span>
          <h2 className="text-4xl lg:text-6xl font-black text-white uppercase tracking-tighter leading-none">
            Why <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-600">Chriki TN?</span>
          </h2>
          <div className="h-1.5 w-24 bg-gradient-to-r from-blue-600 to-transparent mt-6 rounded-full" />
        </motion.div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
        {features.map((f, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: f.delay, duration: 0.5 }}
            whileHover={{ y: -12 }}
            className="relative p-1 bg-gradient-to-b from-white/10 to-transparent rounded-[2.5rem] group"
          >
            {/* The Inner Card */}
            <div className="bg-slate-950 p-10 rounded-[2.4rem] h-full flex flex-col items-start transition-all group-hover:bg-slate-900/50">
              
              {/* Icon Container with Glow */}
              <div className={`mb-8 p-4 rounded-2xl bg-gradient-to-br ${f.color} text-white shadow group-hover:scale-110 transition-transform duration-500`}>
                {f.icon}
              </div>

              <h3 className="text-2xl font-black text-white mb-4 tracking-tight group-hover:text-blue-400 transition-colors">
                {f.title}
              </h3>
              
              <p className="text-gray-400 text-sm leading-relaxed mb-8">
                {f.desc}
              </p>

              {/* Elite Footer of the Card */}
              <div className="mt-auto flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest group-hover:text-white transition-colors">
                Explore Protocol <ArrowUpRight size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </div>
            </div>

            {/* Hover Glow Light Effect */}
            <div className="absolute inset-0 rounded-[2.5rem] bg-blue-500/20 opacity-0 group-hover:opacity-100 blur-2xl transition-opacity pointer-events-none" />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Services;