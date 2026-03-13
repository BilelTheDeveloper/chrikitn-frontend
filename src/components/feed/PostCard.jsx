import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  MessageSquare, 
  MoreHorizontal, 
  Clock, 
  Target,
  ShieldCheck,
  Send,
  User
} from 'lucide-react';

// ✅ CLOUDINARY & BASE_URL UPDATE:
import { getImageUrl } from '../../config/config';

const PostCard = ({ post }) => {
  // ✅ Helper to get the correct User ID
  const userId = post.user?._id || post.user?.id;

  // ✅ ALIGNED WITH YOUR USER MODEL:
  const displayName = post.user?.name || "User";
  const userPhoto = post.user?.identityImage; 

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileHover={{ y: -5 }}
      animate={{ opacity: 1, y: 0 }}
      className="group relative flex flex-col h-full bg-slate-900/40 border border-white/10 rounded-[2rem] p-6 transition-all duration-500 hover:border-blue-500/40 hover:bg-slate-900/70 hover:shadow-[0_20px_50px_rgba(0,0,0,0.6)]"
    >
      {/* Visual Accent */}
      <div className="absolute -top-12 -right-12 w-32 h-32 bg-blue-600/10 blur-[60px] rounded-full group-hover:bg-blue-600/20 transition-colors" />

      {/* Header: User Info */}
      <div className="flex justify-between items-start mb-6">
        <Link to={`/main/profile/${userId}`} className="flex gap-3 group/author">
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-tr from-blue-600 to-cyan-400 rounded-full opacity-0 group-hover/author:opacity-40 blur transition duration-500" />
            <div className="relative w-12 h-12 rounded-full border border-white/10 overflow-hidden bg-slate-950 flex items-center justify-center">
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
                <User size={20} className="text-slate-500" />
              )}
            </div>
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-slate-900" />
          </div>

          <div className="flex flex-col justify-center">
            <h4 className="text-white font-bold text-sm flex items-center gap-1 group-hover/author:text-blue-400 transition-colors">
              {displayName}
              <ShieldCheck size={12} className="text-blue-500" />
            </h4>
            <div className="flex items-center gap-2 mt-0.5">
               <span className="text-[10px] text-slate-500 flex items-center gap-1 font-medium">
                 <Clock size={10} /> {new Date(post.createdAt).toLocaleDateString()}
               </span>
            </div>
          </div>
        </Link>

        <button className="p-2 text-slate-500 hover:text-white transition-all">
          <MoreHorizontal size={18} />
        </button>
      </div>

      {/* Content Section */}
      <div className="flex-1 space-y-4 mb-6">
        <div className="space-y-1">
          <span className="text-[10px] font-bold text-blue-500 uppercase tracking-widest">{post.domain}</span>
          <h2 className="text-white font-extrabold text-xl tracking-tight leading-tight group-hover:text-blue-50 transition-colors">
            {post.globalVision}
          </h2>
        </div>
        
        <p className="text-slate-400 text-sm leading-relaxed line-clamp-3">
          {post.description}
        </p>
        
        {/* Objective Box - Simplified */}
        <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
          <div className="flex items-center gap-2 mb-1">
            <Target size={14} className="text-blue-400" />
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">The Need :</span>
          </div>
          <p className="text-xs text-white font-semibold leading-relaxed">
            {post.goal}
          </p>
        </div>
      </div>

      {/* Action Button - Updated with Link and New Text */}
      <div className="mt-auto pt-4 border-t border-white/5">
        <Link 
          to={`/main/pitch/${post._id}`}
          state={{ project: { title: post.globalVision, domain: post.domain } }}
          className="w-full py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-bold uppercase tracking-widest text-[11px] rounded-xl transition-all active:scale-[0.98] flex items-center justify-center gap-2 shadow-lg shadow-blue-900/20"
        >
          <Send size={14} />
          Apply to Collaborate
        </Link>
      </div>
    </motion.div>
  );
};

export default PostCard;