import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldAlert, Rocket, ChevronRight, Lock } from 'lucide-react';
import { motion } from 'framer-motion';

const VipAccessDenied = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl w-full bg-slate-900/50 border border-white/10 backdrop-blur-xl rounded-[3rem] p-12 text-center shadow-2xl relative overflow-hidden"
      >
        {/* Background Glow */}
        <div className="absolute -top-24 -left-24 w-64 h-64 bg-amber-500/10 blur-[100px] rounded-full" />
        
        <div className="relative z-10">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-amber-500/10 rounded-3xl mb-8 border border-amber-500/20">
            <Lock className="text-amber-500" size={40} />
          </div>

          <h1 className="text-4xl font-black text-white uppercase tracking-tighter mb-4 italic">
            Restricted <span className="text-amber-500">Intel Access</span>
          </h1>
          
          <p className="text-slate-400 text-lg leading-relaxed mb-8 font-medium">
            The VIP Feed is reserved for verified <span className="text-white font-bold">Brands</span> and <span className="text-white font-bold">Freelancers</span>. 
            Standard accounts do not have the clearance levels required to view high-ticket dossiers or elite contracts.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10 text-left">
            <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
              <div className="flex items-center gap-2 text-amber-500 mb-2">
                <Rocket size={16} />
                <span className="text-[10px] font-black uppercase tracking-widest">For Freelancers</span>
              </div>
              <p className="text-xs text-slate-500">Access high-paying gigs and establish direct links with top-tier brands.</p>
            </div>
            <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
              <div className="flex items-center gap-2 text-blue-500 mb-2">
                <ShieldAlert size={16} />
                <span className="text-[10px] font-black uppercase tracking-widest">For Brands</span>
              </div>
              <p className="text-xs text-slate-500">Source elite talent and post verified operational objectives.</p>
            </div>
          </div>

          <button 
            onClick={() => navigate('/main/apply-vip')}
            className="group w-full py-5 bg-gradient-to-r from-amber-600 to-amber-500 text-black font-black uppercase tracking-[0.3em] text-xs rounded-2xl transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3"
          >
            Apply for Clearance
            <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default VipAccessDenied;