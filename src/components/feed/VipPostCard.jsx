import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Crown, MessageSquare, Share2, 
  Heart, ShieldCheck, Zap, ExternalLink, 
  Rocket, Send, Film, Target
} from 'lucide-react';

// ✅ CLOUDINARY & BASE_URL UPDATE
import { getImageUrl } from '../../config/config';

const VipPostCard = ({ post }) => {
  const [isLiked, setIsLiked] = useState(false);
  const navigate = useNavigate();
  
  const userData = JSON.parse(localStorage.getItem('user'));
  const currentUserId = userData?._id || userData?.id;
  const isOwnPost = post.user?._id === currentUserId;

  const getParsedLinks = () => {
    if (!post.portfolioLinks) return [];
    if (Array.isArray(post.portfolioLinks)) return post.portfolioLinks;
    try {
      return JSON.parse(post.portfolioLinks);
    } catch (e) {
      return [post.portfolioLinks];
    }
  };

  const links = getParsedLinks();

  const handleProfileClick = () => {
    if (post.user?._id) {
      navigate(`/main/profile/${post.user._id}`);
    }
  };

  const handleRequestClick = () => {
    if (isOwnPost) return;
    if (post.user?._id) {
      navigate(`/main/request-mission/${post._id}`, { 
        state: { 
          receiverId: post.user._id, 
          brandName: post.brandName || post.globalService || "Independent Operative"
        } 
      });
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative mb-6 md:mb-10 group w-full"
    >
      <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-600 to-amber-400 rounded-[2rem] md:rounded-[3rem] blur opacity-0 group-hover:opacity-10 transition duration-1000"></div>
      
      <div className="relative bg-slate-950 border border-white/5 backdrop-blur-3xl rounded-[2rem] md:rounded-[3rem] p-5 md:p-8 overflow-hidden shadow-2xl">
        
        {/* 1. USER IDENTITY SECTION */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 md:mb-8">
          <div 
            onClick={handleProfileClick}
            className="flex items-center gap-3 md:gap-4 cursor-pointer group/identity"
          >
            <div className="relative">
              <div className="w-14 h-14 md:w-19 md:h-19 rounded-xl md:rounded-2xl overflow-hidden border-2 border-amber-500/20 bg-slate-900 p-0.5 shadow-inner">
                <img 
                  src={getImageUrl(post.user?.identityImage) || `https://ui-avatars.com/api/?name=${post.user?.name || 'U'}&background=0f172a&color=f59e0b&bold=true`} 
                  alt="Operative" 
                  className="w-full h-full object-cover rounded-lg md:rounded-xl transition-all duration-500 group-hover/identity:scale-110"
                />
              </div>
              <div className="absolute -bottom-1 -right-1 bg-amber-500 rounded-lg p-1 border-2 border-slate-950 shadow-lg">
                <Crown size={10} className="text-black md:w-[12px]" />
              </div>
            </div>
            
            <div className="max-w-[150px] sm:max-w-full">
              <div className="flex items-center gap-2">
                <h4 className="text-sm md:text-lg font-black text-white uppercase tracking-tighter italic group-hover/identity:text-amber-400 transition-colors truncate">
                  {post.user?.name || "Anonymous"}
                </h4>
                <ShieldCheck size={14} className="text-amber-500 shrink-0" />
              </div>
              
              <div className="flex flex-wrap items-center gap-2 mt-0.5">
                <p className="text-[8px] md:text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">
                  {post.intelType || post.user?.role}
                </p>
                {post.user?.speciality && (
                  <div className="flex items-center gap-1.5 px-2 py-0.5 bg-amber-500/10 border border-amber-500/20 rounded-md">
                    <Target size={8} className="text-amber-500" />
                    <span className="text-[8px] font-black text-amber-500 uppercase tracking-widest whitespace-nowrap">
                      {post.user.speciality === 'Other' ? post.user.customSpeciality : post.user.speciality}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-2xl border border-white/10 ml-auto sm:ml-0">
            <Zap size={10} className="text-amber-500 fill-amber-500 md:w-[12px]" />
            <span className="text-[9px] md:text-[10px] font-black text-white uppercase tracking-widest">{post.ratingSnapshot || '0'}</span>
          </div>
        </div>

        {/* 2. BRAND / SERVICE NAME */}
        <div className="mb-5 md:mb-6">
          <p className="text-[8px] md:text-[10px] font-black text-amber-500/50 uppercase tracking-[0.3em] mb-1">Affiliation / Entity</p>
          <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-tight break-words">
            {post.brandName || post.globalService || "Independent Core"}
          </h3>
        </div>

        {/* 3. OPERATIONAL NEED */}
        <div className="mb-6 md:mb-8 p-5 md:p-6 bg-slate-900/50 rounded-[1.5rem] md:rounded-[2rem] border border-white/5 relative overflow-hidden">
          <p className="text-[8px] md:text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-3 flex items-center gap-2">
            <span className="w-1 h-1 bg-amber-500 rounded-full animate-pulse" />
            Operational Objective
          </p>
          <p className="text-slate-200 text-sm md:text-base leading-relaxed font-medium italic relative z-10">
            "{post.searchingFor || post.serviceDescription || "Confidential Protocol Active"}"
          </p>
          <div className="absolute top-0 right-0 p-4 opacity-5 md:opacity-10">
            <Rocket size={32} className="text-white md:w-[40px]" />
          </div>
        </div>

        {/* 4. LINKS SECTION */}
        <div className="flex flex-wrap gap-2 md:gap-3 mb-6 md:mb-8">
          {links.length > 0 && links.map((link, i) => (
            <a 
              key={i} href={link} target="_blank" rel="noreferrer"
              className="flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 bg-white/5 hover:bg-amber-500 hover:text-black border border-white/10 rounded-xl md:rounded-2xl text-[8px] md:text-[10px] font-black text-amber-500 transition-all uppercase tracking-widest"
            >
              <ExternalLink size={10} /> {post.intelType === 'Freelancer' ? `Dossier ${i + 1}` : 'Portal'}
            </a>
          ))}
          
          {post.brandSocialLink && !links.includes(post.brandSocialLink) && (
             <a 
               href={post.brandSocialLink} target="_blank" rel="noreferrer"
               className="flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 bg-white/5 hover:bg-amber-500 hover:text-black border border-white/10 rounded-xl md:rounded-2xl text-[8px] md:text-[10px] font-black text-amber-500 transition-all uppercase tracking-widest"
             >
               <ExternalLink size={10} /> Official
             </a>
          )}
        </div>

        {/* 5. INTEL MEDIA */}
        {post.intelImage && (
          <div className="relative rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden border border-white/5 aspect-video bg-slate-900 mb-6 md:mb-8 group/img">
            {post.mediaType === 'video' ? (
              <video 
                src={getImageUrl(post.intelImage)} 
                controls 
                className="w-full h-full object-cover opacity-90 transition-opacity duration-700"
                poster={getImageUrl(post.intelImage).replace(/\.[^/.]+$/, ".jpg")} 
              />
            ) : (
              <img 
                src={getImageUrl(post.intelImage)} 
                alt="VIP Intel" 
                className="w-full h-full object-cover opacity-80 group-hover/img:opacity-100 transition-all duration-700 group-hover/img:scale-105"
              />
            )}
            
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60 pointer-events-none" />
            <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 flex items-center gap-2 pointer-events-none">
              <div className="px-2 md:px-3 py-1 bg-black/60 backdrop-blur-md rounded-full border border-white/10 flex items-center gap-2">
                <span className="text-[7px] md:text-[8px] font-black text-amber-500 uppercase tracking-[0.2em]">
                    {post.mediaType === 'video' ? 'Encrypted Motion' : 'Visual Data'}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* 6. REQUEST BUTTON */}
        <button 
          onClick={handleRequestClick}
          disabled={isOwnPost}
          className={`w-full py-4 md:py-5 font-black uppercase tracking-[0.2em] md:tracking-[0.4em] text-[10px] md:text-xs rounded-xl md:rounded-2xl transition-all flex items-center justify-center gap-3 
            ${isOwnPost 
              ? 'bg-slate-900 text-slate-600 border border-white/5 cursor-not-allowed' 
              : 'bg-gradient-to-r from-amber-600 to-amber-500 text-black shadow-lg active:scale-[0.98]'
            }`}
        >
          {isOwnPost ? <ShieldCheck size={14} /> : <Send size={14} />}
          {isOwnPost ? "Your Intel Post" : "Submit Request"}
        </button>

        {/* FOOTER BAR */}
        <div className="flex items-center justify-between mt-6 md:mt-8 pt-5 md:pt-6 border-t border-white/5">
          <div className="flex gap-4">
            <button onClick={() => setIsLiked(!isLiked)} className={`flex items-center gap-2 transition-all ${isLiked ? 'text-amber-500' : 'text-slate-500'}`}>
              <Heart size={16} fill={isLiked ? "currentColor" : "none"} />
              <span className="text-[9px] font-black uppercase tracking-widest">{isLiked ? 1 : 0}</span>
            </button>
            <button className="flex items-center gap-2 text-slate-500 hover:text-white transition-all">
              <MessageSquare size={16} />
              <span className="text-[9px] font-black uppercase tracking-widest">Chat</span>
            </button>
          </div>
          <button className="text-slate-500 hover:text-amber-500 transition-all">
            <Share2 size={16} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default VipPostCard;