import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Target, Users, Zap, Globe, Fingerprint, Lock } from 'lucide-react';

const AboutPage = () => {
  const CoreValue = ({ icon: Icon, title, desc }) => (
    <motion.div 
      whileHover={{ y: -5 }}
      className="p-8 rounded-[2rem] bg-slate-900/40 border border-white/5 backdrop-blur-3xl hover:border-blue-500/30 transition-all group"
    >
      <div className="w-12 h-12 bg-blue-600/10 border border-blue-500/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-600/20 transition-colors">
        <Icon className="text-blue-500" size={24} />
      </div>
      <h3 className="text-white font-black uppercase tracking-tighter text-lg mb-3 italic">{title}</h3>
      <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
    </motion.div>
  );

  return (
    <div className="pt-32 pb-20 bg-slate-950 min-h-screen text-white relative overflow-hidden">
      {/* Background Tech Elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-600/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 text-blue-500 font-black text-[10px] uppercase tracking-[0.4em] mb-6">
              <Globe size={14} /> Operational Intelligence
            </div>
            <h1 className="text-5xl lg:text-7xl font-black uppercase tracking-tighter mb-8 leading-[0.9]">
              Tunisia's First <br />
              <span className="text-blue-500 italic">Trust-Network</span>
            </h1>
            <p className="text-xl text-slate-400 leading-relaxed mb-8 max-w-xl">
              Chriki TN was born from a simple problem: The Tunisian tech scene is full of talent but low on trust. 
              We are building the infrastructure for a <span className="text-white font-bold">New Digital Alliance.</span>
            </p>
            <div className="flex gap-4">
               <div className="px-6 py-3 bg-slate-900 border border-white/10 rounded-xl flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-300">Live in Tunis</span>
               </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative"
          >
            <div className="aspect-square rounded-[4rem] bg-gradient-to-br from-blue-600/20 to-transparent border border-white/5 flex items-center justify-center overflow-hidden">
               {/* Visualizing the "Shield" */}
               <div className="relative z-10 flex flex-col items-center">
                  <ShieldCheck size={120} className="text-blue-500 drop-shadow-[0_0_30px_rgba(59,130,246,0.4)]" />
                  <div className="mt-8 flex gap-3">
                     {[...Array(3)].map((_, i) => (
                        <div key={i} className="h-1 w-8 bg-blue-500/30 rounded-full" />
                     ))}
                  </div>
               </div>
               {/* Decorative Grid */}
               <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px]" />
            </div>
          </motion.div>
        </div>

        {/* Pillars Section */}
        <div className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black uppercase tracking-tighter italic">The Biometric <span className="text-blue-500">Manifesto</span></h2>
            <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.3em] mt-2">Zero Trust Architecture</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <CoreValue 
              icon={Fingerprint} 
              title="Identity First" 
              desc="Every Freelancer and Brand undergoes a 2-stage verification. No bots. No ghost accounts. Only verified human intelligence." 
            />
            <CoreValue 
              icon={Lock} 
              title="Secure IP" 
              desc="Your ideas are your currency. We provide the framework to share concepts safely within the alliance without fear of theft." 
            />
            <CoreValue 
              icon={Target} 
              title="Precision Matching" 
              desc="Stop bidding. Start building. Our network connects founders with the exact technical DNA required for their project." 
            />
          </div>
        </div>

        {/* Closing Action */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-12 rounded-[3.5rem] bg-gradient-to-r from-blue-600/10 to-transparent border border-blue-500/20 text-center relative overflow-hidden"
        >
          <div className="relative z-10">
            <h2 className="text-4xl font-black uppercase tracking-tighter mb-6">Ready to Join the <span className="text-blue-500">Alliance?</span></h2>
            <p className="text-slate-400 mb-10 max-w-2xl mx-auto">
              We aren't just another platform; we are a gated community for the top 1% of Tunisian creators. 
              Your session is waiting.
            </p>
            <button className="bg-blue-600 hover:bg-blue-500 text-white font-black uppercase tracking-[0.2em] text-[10px] py-5 px-10 rounded-2xl transition-all shadow-xl shadow-blue-500/20 active:scale-95">
              Request Access
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutPage;