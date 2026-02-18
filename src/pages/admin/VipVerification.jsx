import React, { useState, useEffect } from 'react';
// FIX: Import your custom api instance to ensure the token is attached
import api from '../../utils/api'; 
import { 
  Check, X, ShieldAlert, User, 
  ExternalLink, Briefcase, Rocket, 
  ImageIcon
} from 'lucide-react';
import { toast } from 'react-hot-toast';

// ✅ CLOUDINARY & BASE_URL UPDATE:
import { getImageUrl } from '../../config/config';

const VipVerification = () => {
  const [pendingPosts, setPendingPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. Fetch posts where verified is false
  const fetchPending = async () => {
    try {
      setLoading(true);
      // ✅ UPDATED: The 'api' utility already uses API_BASE_URL internally
      const res = await api.get('/vip/admin/pending');
      setPendingPosts(res.data);
    } catch (err) {
      toast.error("Security Breach: Failed to fetch pending intel");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPending();
  }, []);

  // 2. Approve or Purge Logic
  const handleAction = async (id, status) => {
    try {
      // status is 'approve' or 'reject'
      await api.patch(`/vip/admin/verify/${id}`, { status });
      
      if (status === 'approve') {
        toast.success("Intel cleared for broadcast!");
      } else {
        toast.error("Intel purged from database.");
      }

      // Remove from UI list immediately
      setPendingPosts(prev => prev.filter(post => post._id !== id));
    } catch (err) {
      toast.error("Action failed. Protocol restricted.");
    }
  };

  if (loading) return (
    <div className="p-20 text-center">
      <div className="w-12 h-12 border-4 border-amber-500/20 border-t-amber-500 rounded-full animate-spin mx-auto mb-4" />
      <p className="text-amber-500 font-black uppercase tracking-widest text-[10px]">Scanning for Pending Intel...</p>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto p-6 md:p-12 min-h-screen">
      {/* Admin Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div className="flex items-center gap-4">
          <div className="p-4 bg-amber-500/10 rounded-[1.5rem] text-amber-500 border border-amber-500/20 shadow-[0_0_20px_rgba(245,158,11,0.1)]">
            <ShieldAlert size={32} />
          </div>
          <div>
            <h1 className="text-3xl font-black text-white uppercase italic tracking-tight">
              VIP <span className="text-amber-500">Headquarters</span>
            </h1>
            <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.3em]">
              Verification Queue: {pendingPosts.length} Pending
            </p>
          </div>
        </div>
      </div>

      {/* Main Verification List */}
      <div className="grid gap-6">
        {pendingPosts.length === 0 ? (
          <div className="py-20 text-center bg-slate-900/40 border border-white/5 rounded-[3rem] border-dashed">
            <p className="text-slate-600 font-black uppercase tracking-widest text-xs underline decoration-amber-500/30 underline-offset-8">
              No pending intel to verify. System is clear.
            </p>
          </div>
        ) : (
          pendingPosts.map(post => (
            <div key={post._id} className="group relative bg-slate-900/80 border border-white/10 backdrop-blur-xl rounded-[2.5rem] p-8 overflow-hidden transition-all hover:border-amber-500/30 shadow-2xl">
              
              <div className="flex flex-col lg:flex-row gap-8 relative z-10">
                
                {/* 1. Submitter Identity & Visual Intel Preview */}
                <div className="w-full lg:w-1/3 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-slate-800 border border-white/5 flex items-center justify-center text-amber-500 overflow-hidden shadow-inner">
                      {post.user?.avatar ? (
                        /* ✅ UPDATED: getImageUrl for User Avatar */
                        <img src={getImageUrl(post.user.avatar)} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <User size={24} />
                      )}
                    </div>
                    <div>
                      <h4 className="text-white font-black text-sm uppercase tracking-tight">{post.user?.name || "Unknown Operative"}</h4>
                      <p className="text-[9px] text-slate-500 font-black uppercase tracking-widest">{post.user?.role}</p>
                    </div>
                  </div>

                  {/* WEBP IMAGE PREVIEW */}
                  {post.intelImage ? (
                    <div className="relative rounded-2xl overflow-hidden border border-white/5 aspect-video bg-slate-950 group/img">
                       <img 
                        /* ✅ UPDATED: getImageUrl for the Intel/Post Image */
                        src={getImageUrl(post.intelImage)} 
                        alt="Intel Attachment" 
                        className="w-full h-full object-cover opacity-80 group-hover/img:scale-110 transition-transform duration-700"
                       />
                       <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                       <div className="absolute top-2 right-2 px-2 py-1 bg-black/60 backdrop-blur-md rounded text-[8px] text-amber-500 font-bold uppercase tracking-tighter">Verified Content</div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center aspect-video bg-slate-950/50 rounded-2xl border border-white/5 border-dashed">
                      <ImageIcon size={20} className="text-slate-700 mb-2" />
                      <span className="text-[8px] text-slate-700 font-bold uppercase">No Visual Intel</span>
                    </div>
                  )}
                  
                  <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                    post.intelType === 'Freelancer' ? 'bg-blue-500/10 text-blue-400' : 'bg-amber-500/10 text-amber-400'
                  }`}>
                    {post.intelType === 'Freelancer' ? <Rocket size={12}/> : <Briefcase size={12}/>}
                    {post.intelType} Intel
                  </div>
                </div>

                {/* 2. Content Preview */}
                <div className="flex-1 space-y-4">
                  <div className="p-6 bg-slate-950 rounded-[2rem] border border-white/5 h-full relative overflow-hidden">
                    <h5 className="text-[10px] text-slate-500 uppercase font-black mb-4 tracking-widest flex items-center gap-2">
                      <div className="w-1 h-1 bg-amber-500 rounded-full animate-pulse" />
                      Broadcast Details:
                    </h5>
                    
                    {post.intelType === 'Freelancer' ? (
                      <div className="space-y-3">
                        <p className="text-white font-bold text-lg uppercase tracking-tight">{post.globalService}</p>
                        <p className="text-slate-400 text-sm leading-relaxed italic font-medium">
                          "{post.serviceDescription}"
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <p className="text-white font-bold text-lg uppercase tracking-tight">{post.brandName}</p>
                        <p className="text-slate-400 text-sm leading-relaxed italic font-medium">
                          "{post.searchingFor}"
                        </p>
                      </div>
                    )}
                    
                    {/* Display Links */}
                    {(post.portfolioLinks?.length > 0 || post.brandSocialLink) && (
                      <div className="mt-6 flex flex-wrap gap-2 pt-4 border-t border-white/5">
                        {post.intelType === 'Freelancer' ? (
                           post.portfolioLinks.map((link, i) => (
                            <a key={i} href={link} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 border border-white/5 rounded-xl text-[10px] text-amber-500 hover:bg-amber-500 hover:text-black hover:border-amber-500 transition-all font-bold uppercase">
                              <ExternalLink size={10} /> Link {i + 1}
                            </a>
                          ))
                        ) : (
                          <a href={post.brandSocialLink} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 border border-white/5 rounded-xl text-[10px] text-amber-500 hover:bg-amber-500 hover:text-black hover:border-amber-500 transition-all font-bold uppercase">
                            <ExternalLink size={10} /> Brand Portal
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* 3. Action Buttons */}
                <div className="flex lg:flex-col gap-3 justify-center">
                  <button 
                    onClick={() => handleAction(post._id, 'approve')}
                    className="flex-1 lg:w-16 lg:h-16 bg-green-500/10 border border-green-500/20 text-green-500 rounded-3xl flex items-center justify-center hover:bg-green-500 hover:text-white transition-all shadow-lg hover:shadow-green-500/40 group/btn"
                  >
                    <Check size={28} strokeWidth={3} className="group-hover/btn:scale-125 transition-transform" />
                  </button>
                  
                  <button 
                    onClick={() => handleAction(post._id, 'reject')}
                    className="flex-1 lg:w-16 lg:h-16 bg-red-500/10 border border-red-500/20 text-red-500 rounded-3xl flex items-center justify-center hover:bg-red-500 hover:text-white transition-all shadow-lg hover:shadow-red-500/40 group/btn"
                  >
                    <X size={28} strokeWidth={3} className="group-hover/btn:scale-125 transition-transform" />
                  </button>
                </div>

              </div>

              {/* Decorative "Classified" stamp */}
              <div className="absolute top-4 right-4 rotate-12 opacity-[0.03] select-none pointer-events-none">
                <span className="text-8xl font-black text-white uppercase italic">PENDING</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default VipVerification;