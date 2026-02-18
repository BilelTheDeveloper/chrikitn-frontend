import React from 'react';
import { motion } from 'framer-motion';
// Fixed: Added 'Users' to the import list
import { Rocket, Lightbulb, Zap, TrendingUp, Users } from 'lucide-react';

const stats = [
  { 
    id: '01', 
    title: "Stop Planning", 
    desc: "Ideas are worth nothing without execution. The Alliance is where plans become products.", 
    icon: <Lightbulb size={24} /> 
  },
  { 
    id: '02', 
    title: "Find Your Chrik", 
    desc: "Don't build alone. Connect with the top 1% of Tunisian specialists who share your hunger.", 
    icon: <Users size={24} /> 
  },
  { 
    id: '03', 
    title: "Scale Fast", 
    desc: "Move from a local prototype to a brand-ready solution using our verified network.", 
    icon: <TrendingUp size={24} /> 
  }
];

const Motivation = () => {
  return (
    <section className="py-24 bg-slate-950 relative overflow-hidden">
      {/* Background Accent Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Side: The "Push" */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8 text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-bold uppercase tracking-[0.2em] mx-auto lg:mx-0">
              <Rocket size={12} /> Time to Execute
            </div>
            
            <h2 className="text-4xl md:text-6xl font-black text-white leading-tight uppercase tracking-tighter">
              Tunisia is <br />
              <span className="text-blue-500 underline decoration-blue-500/30">Waiting</span> for your <br />
              Next Move.
            </h2>
            
            <p className="text-gray-400 text-lg leading-relaxed max-w-md mx-auto lg:mx-0">
              The only difference between a dreamer and a founder is the **Alliance**. We provide the trust; you provide the vision.
            </p>

            <button className="group flex items-center gap-4 text-white font-black uppercase tracking-widest text-sm bg-slate-900 border border-white/10 px-8 py-5 rounded-2xl hover:bg-blue-600 hover:border-blue-500 transition-all shadow-2xl mx-auto lg:mx-0">
              Start Your Journey <Zap size={18} className="group-hover:fill-white transition-all" />
            </button>
          </motion.div>

          {/* Right Side: Step-based Motivation Cards */}
          <div className="space-y-4">
            {stats.map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group p-6 rounded-2xl bg-slate-900/50 border border-white/5 hover:border-blue-500/20 transition-all flex gap-6 items-start"
              >
                <div className="flex flex-col items-center">
                  <span className="text-4xl font-black text-slate-800 group-hover:text-blue-500/40 transition-colors">
                    {item.id}
                  </span>
                  <div className="mt-2 text-blue-500/30 group-hover:text-blue-500 transition-colors">
                    {item.icon}
                  </div>
                </div>
                <div>
                  <h4 className="text-white font-bold text-lg mb-1">{item.title}</h4>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default Motivation;