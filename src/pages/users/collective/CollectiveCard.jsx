import React from 'react';
import { getImageUrl } from '../../../config/config';
import { ArrowUpRight, Shield } from 'lucide-react';

const CollectiveCard = ({ col }) => {
  return (
    <div className="group relative bg-slate-900 border border-white/5 rounded-[2.5rem] overflow-hidden hover:border-amber-500/30 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
      {/* HERO VISUAL */}
      <div className="h-48 overflow-hidden relative">
        <img 
          src={getImageUrl(col.heroBackground)} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-60 group-hover:opacity-100" 
          alt="" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
        
        {/* TOP BADGE */}
        <div className="absolute top-6 right-6">
          <div className="bg-black/60 backdrop-blur-md text-amber-500 text-[8px] font-black px-3 py-1.5 rounded-full border border-amber-500/20 uppercase tracking-widest flex items-center gap-1.5">
            <Shield size={10} />
            Rank #{col.rating || 0}
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-8 relative">
        {/* LOGO OVERLAP */}
        <div className="relative mb-6">
          <div className="absolute inset-0 bg-amber-500 blur-xl opacity-0 group-hover:opacity-20 transition-opacity" />
          <img 
            src={getImageUrl(col.logo)} 
            className="w-20 h-20 rounded-2xl border-4 border-slate-950 relative z-10 -mt-20 bg-slate-900 object-cover shadow-2xl transition-transform duration-500 group-hover:-translate-y-2" 
            alt="" 
          />
        </div>

        <div className="space-y-1 mb-4">
          <h3 className="text-2xl font-black uppercase italic tracking-tighter text-white group-hover:text-amber-400 transition-colors">
            {col.name}
          </h3>
          <p className="text-amber-500/80 text-[10px] font-black uppercase tracking-[0.2em]">
            {col.slogan}
          </p>
        </div>

        <p className="text-slate-400 text-xs leading-relaxed line-clamp-2 mb-8 font-medium">
          {col.description}
        </p>

        {/* ELITE ACTION BUTTON */}
        <button className="relative w-full overflow-hidden py-4 bg-white/5 group/btn rounded-2xl transition-all duration-500">
          <div className="absolute inset-0 bg-white translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500" />
          <span className="relative z-10 flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-white group-hover/btn:text-black transition-colors">
            View Syndicate Portal
            <ArrowUpRight size={14} strokeWidth={3} />
          </span>
        </button>
      </div>
    </div>
  );
};

export default CollectiveCard;