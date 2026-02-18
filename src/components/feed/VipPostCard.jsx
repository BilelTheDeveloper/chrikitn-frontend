import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Crown, MessageSquare, Share2, 
  Heart, ShieldCheck, Zap, ExternalLink, 
  Rocket, Send, Film, Target, ChevronDown, ChevronUp
} from 'lucide-react';

// ✅ CLOUDINARY & BASE_URL UPDATE
import { getImageUrl } from '../../config/config';

const VipPostCard = ({ post }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false); // New state for Show More
  const navigate = useNavigate();
  
  const userData = JSON.parse(localStorage.getItem('user'));
  const currentUserId = userData?._id || userData?.id;
  const isOwnPost = post.user?._id === currentUserId;

  // ✅ FIX: Handle portfolioLinks whether they come as an Array or a JSON String
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

  const descriptionText = post.searchingFor || post.serviceDescription || "Confidential Protocol Active";

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative mb-10 group flex flex-col h-full w-full"
    >
      <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-600 to-amber-400 rounded-[3rem] blur opacity-0 group-hover:opacity-10 transition duration-1000"></div>
      
      <div className="relative bg-slate-950 border border-white/5 backdrop-blur-3xl rounded-[3rem] p-8 overflow-hidden shadow-2xl flex flex-col h-full">
        
        {/* 1. USER IDENTITY SECTION */}
        <div className="flex items-center justify-between mb-8">
          <div 
            onClick={handleProfileClick}
            className="flex items-center gap-4 cursor-pointer group/identity"
          >
            <div className="relative">
              <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-amber-500/20 bg-slate-900 p-0.5 shadow-inner">
                <img 
                  src={getImageUrl(post.user?.identityImage) || `https://ui-avatars.com/api/?name=${post.user?.name || 'U'}&background=0f172a&color=f59e0b&bold=true`} 
                  alt="Operative" 
                  className="w-full h-full object-cover rounded-xl transition-all duration-500 group-hover/identity:scale-110"
                />
              </div>
              <div className="absolute -bottom-1 -right-1 bg-amber-500 rounded-lg p-1 border-2 border-slate-950 shadow-lg">
                <Crown size={12} className="text-black" />
              </div>
            </div>
            
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-lg font-black text-white uppercase tracking-tighter italic group-hover/identity:text-amber-400 transition-colors">
                  {post.user?.name || "Anonymous Operative"}
                </h4>
                <ShieldCheck size={16} className="text-amber-500" />
              </div>
              
              <div className="flex items-center gap-2 mt-0.5">
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">
                  {post.intelType || post.user?.role} Protocol
                </p>
                {post.user?.speciality && (
                  <>
                    <span className="w-1 h-1 bg-slate-700 rounded-full" />
                    <div className="flex items-center gap-1.5 px-2 py-0.5 bg-amber-500/10 border border-amber-500/20 rounded-md">
                      <Target size={10} className="text-amber-500" />
                      <span className="text-[9px] font-black text-amber-500 uppercase tracking-widest">
                        {post.user.speciality === 'Other' ? post.user.customSpeciality : post.user.speciality}
                      </span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-2xl border border-white/10">
            <Zap size={12} className="text-amber-500 fill-amber-500" />
            <span className="text-[10px] font-black text-white uppercase tracking-widest">{post.ratingSnapshot || '0'}</span>
          </div>
        </div>

        {/* 2. BRAND / SERVICE NAME */}
        <div className="mb-6">
          <p className="text-[10px] font-black text-amber-500/50 uppercase tracking-[0.3em] mb-1">Affiliation / Entity</p>
          <h3 className="text-2xl font-black text-white uppercase tracking-tight">
            {post.brandName || post.globalService || "Independent Core"}
          </h3>
        </div>

        {/* 3. OPERATIONAL NEED - UPDATED FOR SHOW MORE & UNIFORM SIZE */}
        <div className="mb-8 p-6 bg-slate-900/50 rounded-[2rem] border border-white/5 relative overflow-hidden flex-grow">
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-3 flex items-center gap-2">
            <span className="w-1 h-1 bg-amber-500 rounded-full animate-pulse" />
            Operational Objective
          </p>
          
          <div className="relative">
            <p className={`text-slate-200 text-base leading-relaxed font-medium italic transition-all duration-300 ${!isExpanded ? 'line-clamp-3' : ''}`}>
              "{descriptionText}"
            </p>
            
            {descriptionText.length > 120 && (
              <button 
                onClick={() => setIsExpanded(!isExpanded)}
                className="mt-3 flex items-center gap-1 text-[9px] font-black text-amber-500 uppercase tracking-widest hover:text-amber-400 transition-colors"
              >
                {isExpanded ? (
                  <>Hide Intel <ChevronUp size={12} /></>
                ) : (
                  <>Show Full Intel <ChevronDown size={12} /></>
                )}
              </button>
            )}
          </div>

          <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
            <Rocket size={40} className="text-white" />
          </div>
        </div>

        {/* 4. LINKS SECTION */}
        <div className="flex flex-wrap gap-3 mb-8">
          {links.length > 0 && links.map((link, i) => (
            <a 
              key={i} href={link} target="_blank" rel="noreferrer"
              className="flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-amber-500 hover:text-black border border-white/10 rounded-2xl text-[10px] font-black text-amber-500 transition-all uppercase tracking-widest"
            >
              <ExternalLink size={12} /> {post.intelType === 'Freelancer' ? `Dossier ${i + 1}` : 'View Portal'}
            </a>
          ))}
          
          {post.brandSocialLink && !links.includes(post.brandSocialLink) && (
             <a 
               href={post.brandSocialLink} target="_blank" rel="noreferrer"
               className="flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-amber-500 hover:text-black border border-white/10 rounded-2xl text-[10px] font-black text-amber-500 transition-all uppercase tracking-widest"
             >
               <ExternalLink size={12} /> Official Portal
             </a>
          )}
        </div>

        {/* 5. INTEL MEDIA (IMAGE OR VIDEO) */}
        {post.intelImage && (
          <div className="relative rounded-[2.5rem] overflow-hidden border border-white/5 aspect-[16/9] bg-slate-900 mb-8 group/img">
            {post.mediaType === 'video' ? (
              <video 
                src={getImageUrl(post.intelImage)} 
                controls 
                className="w-full h-full object-cover opacity-80 group-hover/img:opacity-100 transition-opacity duration-700"
                poster={getImageUrl(post.intelImage).replace(/\.[^/.]+$/, ".jpg")} 
              />
            ) : (
              <img 
                src={getImageUrl(post.intelImage)} 
                alt="VIP Intel" 
                className="w-full h-full object-cover opacity-60 group-hover/img:opacity-100 transition-all duration-700 group-hover/img:scale-105"
              />
            )}
            
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60 pointer-events-none" />
            <div className="absolute bottom-6 left-6 flex items-center gap-2 pointer-events-none">
              <div className="px-3 py-1 bg-black/60 backdrop-blur-md rounded-full border border-white/10 flex items-center gap-2">
                {post.mediaType === 'video' ? <Film size={10} className="text-amber-500"/> : null}
                <span className="text-[8px] font-black text-amber-500 uppercase tracking-[0.3em]">
                    {post.mediaType === 'video' ? 'Encrypted Motion Data' : 'Encrypted Visual Data'}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* 6. REQUEST BUTTON */}
        <button 
          onClick={handleRequestClick}
          disabled={isOwnPost}
          className={`w-full py-5 font-black uppercase tracking-[0.4em] text-xs rounded-2xl transition-all flex items-center justify-center gap-3 mt-auto
            ${isOwnPost 
              ? 'bg-slate-900 text-slate-600 border border-white/5 cursor-not-allowed' 
              : 'bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-black shadow-[0_0_30px_rgba(245,158,11,0.2)] hover:shadow-[0_0_40px_rgba(245,158,11,0.4)] active:scale-[0.98]'
            }`}
        >
          {isOwnPost ? <ShieldCheck size={16} /> : <Send size={16} />}
          {isOwnPost ? "Your Intel Post" : "Submit Request"}
        </button>

        {/* FOOTER BAR */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/5">
          <div className="flex gap-4">
            <button onClick={() => setIsLiked(!isLiked)} className={`flex items-center gap-2 transition-all ${isLiked ? 'text-amber-500' : 'text-slate-500 hover:text-white'}`}>
              <Heart size={18} fill={isLiked ? "currentColor" : "none"} />
              <span className="text-[10px] font-black uppercase tracking-widest">{isLiked ? 1 : 0}</span>
            </button>
            <button className="flex items-center gap-2 text-slate-500 hover:text-white transition-all">
              <MessageSquare size={18} />
              <span className="text-[10px] font-black uppercase tracking-widest">Chat</span>
            </button>
          </div>
          <button className="text-slate-500 hover:text-amber-500 transition-all">
            <Share2 size={18} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default VipPostCard;