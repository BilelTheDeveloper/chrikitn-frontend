import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Zap, 
  MessageSquare, 
  MoreHorizontal, 
  Clock, 
  Target,
  ShieldCheck,
  Send // Imported for the request button
} from 'lucide-react';

// ✅ CLOUDINARY & BASE_URL UPDATE:
// Importing the helper we created in config.js
import { getImageUrl } from '../../config/config';

const PostCard = ({ post }) => {
  // ✅ Helper to get the correct User ID
  const userId = post.user?._id || post.user?.id;

  // ✅ ALIGNED WITH YOUR USER MODEL:
  const displayName = post.user?.name || "Unknown Operative";
  const userPhoto = post.user?.identityImage; 

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileHover={{ y: -5 }}
      animate={{ opacity: 1, y: 0 }}
      className="group relative overflow-hidden bg-slate-900/40 border border-white/5 rounded-[2.5rem] p-7 transition-all duration-500 hover:border-blue-500/30 hover:bg-slate-900/60 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
    >
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-600/5 blur-[80px] rounded-full group-hover:bg-blue-600/10 transition-colors" />

      <div className="flex justify-between items-start mb-8">
        {/* LINKED PROFILE SECTION */}
        <Link to={`/main/profile/${userId}`} className="flex gap-4 group/author">
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-tr from-blue-600 to-cyan-400 rounded-full opacity-20 group-hover/author:opacity-100 blur transition duration-500" />
            <div className="relative w-14 h-14 rounded-full border-2 border-slate-800 overflow-hidden bg-slate-950 flex items-center justify-center shadow-2xl">
              {userPhoto ? (
                <img 
                  src={getImageUrl(userPhoto)} 
                  alt={displayName} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover/author:scale-110"
                  onError={(e) => { 
                    e.target.onerror = null; 
                    e.target.src = `https://ui-avatars.com/api/?name=${displayName}&background=0f172a&color=3b82f6&bold=true`; 
                  }}
                />
              ) : (
                <span className="text-blue-500 font-black text-xl">{displayName.substring(0, 1).toUpperCase()}</span>
              )}
            </div>
            <div className="absolute bottom-0 right-0 w-4 h-4 bg-slate-950 rounded-full flex items-center justify-center border border-white/10">
               <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
            </div>
          </div>

          <div className="flex flex-col justify-center">
            <h4 className="text-white font-bold text-base tracking-tight flex items-center gap-2 group-hover/author:text-blue-400 transition-colors">
              {displayName}
              <ShieldCheck size={14} className="text-blue-500" />
            </h4>
            <div className="flex items-center gap-2 mt-1">
               <span className="text-[9px] px-2 py-0.5 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-md font-black uppercase tracking-tighter">
                 {post.user?.role || 'Member'}
               </span>
               <span className="text-[10px] text-slate-500 font-medium tracking-wide flex items-center gap-1">
                 <Clock size={10} /> {new Date(post.createdAt).toLocaleDateString()}
               </span>
            </div>
          </div>
        </Link>

        <button className="p-2 text-slate-600 hover:text-white hover:bg-white/5 rounded-xl transition-all">
          <MoreHorizontal size={20} />
        </button>
      </div>

      <div className="space-y-4 mb-8 relative z-10">
        <div className="space-y-2">
          <span className="text-[9px] font-black text-blue-500/60 uppercase tracking-[0.3em]">{post.domain}</span>
          <h2 className="text-white font-black text-2xl tracking-tighter uppercase leading-none italic group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-slate-500 transition-all duration-500">
            {post.globalVision}
          </h2>
        </div>
        
        <p className="text-slate-400 text-sm leading-relaxed font-medium line-clamp-3 group-hover:text-slate-300 transition-colors">
          {post.description}
        </p>
        
        <div className="flex items-center gap-3 bg-slate-950/50 w-fit px-5 py-3 rounded-2xl border border-white/5 group-hover:border-blue-500/20 transition-all">
          <Target size={14} className="text-blue-500" />
          <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">
            Objective: <span className="text-white">{post.goal}</span>
          </span>
        </div>
      </div>

      {/* 🚀 NEW: SUBMIT REQUEST BUTTON */}
      <div className="mb-6">
        <button className="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-black uppercase tracking-[0.3em] text-[10px] rounded-2xl transition-all shadow-[0_0_20px_rgba(59,130,246,0.1)] hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] active:scale-[0.98] flex items-center justify-center gap-3">
          <Send size={14} />
          Submit Request
        </button>
      </div>

      <div className="flex items-center justify-between pt-6 border-t border-white/5">
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black text-slate-400 hover:text-blue-400 hover:bg-blue-400/5 uppercase tracking-widest transition-all">
            <Zap size={16} /> Boost
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black text-slate-400 hover:text-cyan-400 hover:bg-cyan-400/5 uppercase tracking-widest transition-all">
            <MessageSquare size={16}/> Intel
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default PostCard;