import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { 
  User, Mail, ShieldCheck, Award, Settings, 
  ChevronRight, Zap, Globe, Briefcase, Send 
} from 'lucide-react';
import PostCard from '../../components/feed/PostCard'; 

// ✅ CONFIG INTEGRATION:
import { API_BASE_URL, SOCKET_URL } from '../../config/config';

const Profile = () => {
  const { id } = useParams(); 
  const [profileUser, setProfileUser] = useState(null);
  const [latestPost, setLatestPost] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const loggedInUser = JSON.parse(localStorage.getItem('user'));
  const isOwnProfile = loggedInUser?.id === id || loggedInUser?._id === id;

  // ✅ IMPROVED: Helper to fix image paths using global config
  const getImageUrl = (path) => {
    if (!path) return null;
    if (path.startsWith('http')) return path; // Handles Cloudinary/External links
    // Handles local uploads by prefixing the SOCKET_URL (Base Server URL)
    return `${SOCKET_URL}${path.startsWith('/') ? '' : '/'}${path}`;
  };

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setLoading(true);
        // ✅ UPDATED: Uses API_BASE_URL
        const res = await axios.get(`${API_BASE_URL}/users/profile/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        
        setProfileUser(res.data.user);
        setLatestPost(res.data.latestPost);
      } catch (err) {
        console.error("Profile sync failure:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProfileData();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <div className="w-12 h-12 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin" />
        <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.3em]">Decrypting Operative Intel...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20">
      
      {/* --- 1. HEADER / IDENTITY CARD --- */}
      <section className="relative overflow-hidden bg-slate-900/50 border border-white/5 rounded-[3rem] p-8 shadow-2xl backdrop-blur-sm">
        <div className="absolute top-0 right-0 p-10 opacity-[0.03] text-white">
          <ShieldCheck size={200} />
        </div>

        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
          {/* Avatar Area */}
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-[2rem] blur opacity-20"></div>
            <div className="relative w-32 h-32 bg-slate-950 rounded-[2rem] border border-white/10 flex items-center justify-center overflow-hidden">
              {profileUser?.identityImage ? (
                <img 
                  src={getImageUrl(profileUser.identityImage)} 
                  className="w-full h-full object-cover" 
                  alt="Profile" 
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://ui-avatars.com/api/?background=0D1117&color=3B82F6&name=" + (profileUser?.name || "U");
                  }}
                />
              ) : (
                <User size={60} className="text-slate-700" />
              )}
            </div>
          </div>

          {/* User Identity Info */}
          <div className="text-center md:text-left flex-1">
            <h1 className="text-3xl font-black text-white uppercase tracking-tighter italic">
              {profileUser?.name || 'Authorized Operative'}
            </h1>
            <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-3">
              <span className="bg-blue-600/10 text-blue-500 border border-blue-500/20 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest">
                {profileUser?.role || 'Alliance Member'}
              </span>
              <div className="flex items-center gap-2 bg-slate-950/50 border border-white/5 px-3 py-1 rounded-full">
                <Zap size={10} className="text-amber-500" />
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Status: {profileUser?.status || 'Active'}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2 w-full md:w-auto">
            {isOwnProfile ? (
              <button className="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-white px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all border border-white/10 group">
                <Settings size={14} className="group-hover:rotate-90 transition-transform" /> Account Settings
              </button>
            ) : (
              <button className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all shadow-lg shadow-blue-600/20 active:scale-95">
                <Send size={14} /> Initialize Connection
              </button>
            )}
          </div>
        </div>
      </section>

      {/* --- 2. INTEL GRID --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-slate-900/30 border border-white/5 rounded-[2.5rem] p-8">
            <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-6 flex items-center gap-2">
              <Globe size={14} className="text-blue-500" /> Operative Biography
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed mb-8 italic">
              "{profileUser?.bio || "This operative has not yet broadcasted a public bio to the alliance."}"
            </p>
            
            {profileUser?.portfolioUrl && (
              <a 
                href={profileUser.portfolioUrl} 
                target="_blank" 
                rel="noreferrer" 
                className="flex items-center justify-between p-4 bg-slate-950/50 rounded-2xl border border-white/5 hover:border-blue-500/30 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-500/10 rounded-lg text-blue-500">
                    <Briefcase size={16} />
                  </div>
                  <span className="text-[10px] font-black text-white uppercase tracking-widest">Project Portfolio</span>
                </div>
                <ChevronRight size={14} className="text-slate-700 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
              </a>
            )}
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-slate-900/30 border border-white/5 rounded-[2.5rem] p-8">
            <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-6 flex items-center gap-2">
              <Award size={14} className="text-purple-500" /> System Credentials
            </h3>
            <div className="space-y-3">
              <DetailItem icon={<Mail size={14}/>} label="Registry" value={profileUser?.email || 'Classified'} />
              <DetailItem icon={<ShieldCheck size={14}/>} label="Security" value={profileUser?.isVerified ? "Verified Operative" : "Pending Verification"} />
            </div>
          </motion.div>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between px-4">
            <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">Latest Transmission</h3>
            <div className="h-[1px] w-12 bg-white/10" />
          </div>

          {latestPost ? (
            <PostCard post={{ ...latestPost, user: profileUser }} />
          ) : (
            <div className="bg-slate-900/20 border border-dashed border-white/5 rounded-[3rem] p-16 text-center">
              <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap size={20} className="text-slate-700" />
              </div>
              <p className="text-[10px] text-slate-600 font-black uppercase tracking-widest">No active nodes broadcasted in this sector.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const DetailItem = ({ icon, label, value }) => (
  <div className="flex items-center justify-between p-4 bg-slate-950/30 rounded-2xl border border-white/5">
    <div className="flex items-center gap-3">
      <div className="text-slate-500">{icon}</div>
      <span className="text-[9px] font-black text-slate-500 uppercase tracking-tighter">{label}</span>
    </div>
    <span className="text-[10px] font-bold text-slate-200">{value}</span>
  </div>
);

export default Profile;