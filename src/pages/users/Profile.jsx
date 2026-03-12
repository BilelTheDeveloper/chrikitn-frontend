import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; 
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, Mail, ShieldCheck, Award, Settings, 
  ChevronRight, Zap, Globe, Briefcase, Send,
  Cpu, Activity, Target, Fingerprint
} from 'lucide-react';
import PostCard from '../../components/feed/PostCard'; 

// ✅ CONFIG INTEGRATION:
import { API_BASE_URL, SOCKET_URL } from '../../config/config';

const Profile = () => {
  const { id } = useParams(); 
  const navigate = useNavigate(); 
  const [profileUser, setProfileUser] = useState(null);
  const [latestPost, setLatestPost] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const loggedInUser = JSON.parse(localStorage.getItem('user'));
  const isOwnProfile = loggedInUser?.id === id || loggedInUser?._id === id;

  const getImageUrl = (path) => {
    if (!path) return null;
    if (path.startsWith('http')) return path; 
    return `${SOCKET_URL}${path.startsWith('/') ? '' : '/'}${path}`;
  };

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setLoading(true);
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
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6">
        <div className="relative">
            <div className="w-20 h-20 border-2 border-blue-500/20 rounded-full animate-ping absolute" />
            <div className="w-20 h-20 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin" />
        </div>
        <div className="text-center">
            <p className="text-[10px] text-blue-500 font-black uppercase tracking-[0.5em] animate-pulse">Syncing DNA Sequence</p>
            <p className="text-[8px] text-slate-600 font-bold uppercase tracking-widest mt-2">Bypassing Firewall...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-32 px-4">
      
      {/* --- 1. THE ARCHITECT HEADER --- */}
      <section className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 via-cyan-500/10 to-purple-600/20 rounded-[3.5rem] blur-2xl opacity-50 transition duration-1000 group-hover:opacity-100" />
        
        <div className="relative overflow-hidden bg-slate-950/80 border border-white/10 rounded-[3.5rem] p-8 md:p-12 shadow-2xl backdrop-blur-xl">
          {/* Animated Background Grid */}
          <div className="absolute inset-0 opacity-[0.05] pointer-events-none" 
               style={{ backgroundImage: `radial-gradient(#3b82f6 1px, transparent 1px)`, backgroundSize: '30px 30px' }} />
          
          <div className="absolute top-0 right-0 p-12 opacity-[0.05] text-blue-500 rotate-12 group-hover:rotate-0 transition-transform duration-700">
            <Fingerprint size={300} />
          </div>

          <div className="relative z-10 flex flex-col lg:flex-row items-center gap-12">
            {/* Avatar Tech-Stack */}
            <div className="relative">
              <div className="absolute -inset-4 bg-blue-500/10 rounded-full animate-pulse" />
              <div className="absolute -inset-2 border border-blue-500/30 rounded-[2.5rem] rotate-6 group-hover:rotate-0 transition-transform duration-500" />
              
              <div className="relative w-40 h-40 bg-slate-900 rounded-[2.5rem] border-2 border-white/10 flex items-center justify-center overflow-hidden shadow-2xl">
                {profileUser?.identityImage ? (
                  <img 
                    src={getImageUrl(profileUser.identityImage)} 
                    className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110" 
                    alt="Identity" 
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://ui-avatars.com/api/?background=0D1117&color=3B82F6&bold=true&size=256&name=" + (profileUser?.name || "U");
                    }}
                  />
                ) : (
                  <User size={80} className="text-slate-800" />
                )}
                <div className="absolute bottom-0 inset-x-0 h-1/3 bg-gradient-to-t from-black/80 to-transparent flex items-end justify-center pb-2">
                    <span className="text-[8px] font-black text-blue-400 tracking-[0.2em] uppercase">ID: {profileUser?._id?.slice(-6)}</span>
                </div>
              </div>
            </div>

            {/* Identity Info Panel */}
            <div className="text-center lg:text-left flex-1 space-y-4">
              <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 px-4 py-1.5 rounded-full mb-2">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-ping" />
                <span className="text-[9px] font-black text-blue-500 uppercase tracking-widest">Active Node</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter leading-none italic">
                {profileUser?.name || 'Authorized Operative'}
              </h1>

              <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                <StatBadge icon={<Cpu size={10}/>} label="System Rank" value={profileUser?.role || 'Operative'} color="blue" />
                <StatBadge icon={<Activity size={10}/>} label="Signal Status" value={profileUser?.status || 'Online'} color="emerald" />
                <StatBadge icon={<Target size={10}/>} label="Sector" value="North Africa" color="purple" />
              </div>
            </div>

            {/* Action Matrix */}
            <div className="flex flex-col gap-3 w-full lg:w-64">
              {isOwnProfile ? (
                <button 
                  onClick={() => navigate('/main/settings')} 
                  className="relative overflow-hidden group/btn flex items-center justify-center gap-3 bg-white text-slate-950 px-8 py-5 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] transition-all hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] active:scale-95"
                >
                  <Settings size={16} className="group-hover/btn:rotate-180 transition-transform duration-500" /> 
                  Override Settings
                </button>
              ) : (
                <button className="relative overflow-hidden group/btn flex items-center justify-center gap-3 bg-blue-600 text-white px-8 py-5 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] transition-all hover:bg-blue-500 hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] active:scale-95">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700" />
                  <Send size={16} /> Establish Connection
                </button>
              )}
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-white/5 border border-white/5 rounded-xl py-3 text-center">
                    <p className="text-[8px] font-black text-slate-500 uppercase tracking-tighter">Connection Level</p>
                    <p className="text-xs font-bold text-white">98.4%</p>
                </div>
                <div className="bg-white/5 border border-white/5 rounded-xl py-3 text-center">
                    <p className="text-[8px] font-black text-slate-500 uppercase tracking-tighter">Response Time</p>
                    <p className="text-xs font-bold text-white">2.4ms</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- 2. THE INTELLIGENCE MATRIX --- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN: INTEL (4 Cols) */}
        <div className="lg:col-span-5 space-y-8">
          
          {/* Bio Node */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="relative bg-slate-900/40 border border-white/5 rounded-[2.5rem] p-8 backdrop-blur-md">
            <div className="absolute top-0 right-0 p-6 opacity-[0.05] text-blue-500"><Globe size={60}/></div>
            <h3 className="text-[10px] font-black text-blue-500 uppercase tracking-[0.4em] mb-6 flex items-center gap-3">
              <span className="w-8 h-[1px] bg-blue-500" /> Operative Biography
            </h3>
            <p className="text-slate-300 text-base leading-relaxed mb-10 font-medium italic">
              "{profileUser?.bio || "No public broadcast detected from this operative yet. Intel remains classified."}"
            </p>
            
            {profileUser?.portfolioUrl && (
              <a 
                href={profileUser.portfolioUrl} 
                target="_blank" 
                rel="noreferrer" 
                className="flex items-center justify-between p-5 bg-blue-600/5 hover:bg-blue-600/10 rounded-2xl border border-blue-500/10 hover:border-blue-500/30 transition-all group"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-500/20 rounded-xl text-blue-400 group-hover:scale-110 transition-transform">
                    <Briefcase size={20} />
                  </div>
                  <div>
                    <span className="block text-[10px] font-black text-white uppercase tracking-widest">Main Node Portfolio</span>
                    <span className="text-[9px] text-blue-500/60 font-bold">external-link.chriki.tn</span>
                  </div>
                </div>
                <ChevronRight size={18} className="text-slate-700 group-hover:text-blue-500 group-hover:translate-x-2 transition-all" />
              </a>
            )}
          </motion.div>

          {/* Credentials Node */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="bg-slate-950/50 border border-white/5 rounded-[2.5rem] p-8">
            <h3 className="text-[10px] font-black text-purple-500 uppercase tracking-[0.4em] mb-8 flex items-center gap-3">
              <span className="w-8 h-[1px] bg-purple-500" /> Registry Credentials
            </h3>
            <div className="grid gap-4">
              <DetailItem icon={<Mail size={16}/>} label="Protocol Email" value={profileUser?.email || 'Classified'} />
              <DetailItem icon={<ShieldCheck size={16}/>} label="Verification" value={profileUser?.isVerified ? "Level 1 Verified" : "Unverified Node"} />
              <DetailItem icon={<Award size={16}/>} label="Alliance Tenure" value="Established 2024" />
            </div>
          </motion.div>
        </div>

        {/* RIGHT COLUMN: TRANSMISSIONS (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center justify-between px-6">
            <div className="flex items-center gap-4">
                <div className="p-2 bg-blue-500/10 rounded-lg"><Zap size={14} className="text-blue-500" /></div>
                <h3 className="text-[11px] font-black text-white uppercase tracking-[0.3em]">Latest Transmissions</h3>
            </div>
            <div className="flex-1 h-[1px] bg-gradient-to-r from-white/10 to-transparent ml-6" />
          </div>

          <div className="relative">
            {latestPost ? (
              <div className="transform transition-transform hover:scale-[1.01]">
                <PostCard post={{ ...latestPost, user: profileUser }} />
              </div>
            ) : (
              <div className="relative overflow-hidden bg-slate-900/20 border border-dashed border-white/10 rounded-[3.5rem] p-20 text-center group">
                <div className="absolute inset-0 bg-blue-500/5 translate-y-full group-hover:translate-y-0 transition-transform duration-700" />
                <div className="relative z-10">
                    <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:rotate-12 transition-transform">
                        <Cpu size={32} className="text-slate-700" />
                    </div>
                    <p className="text-[11px] text-slate-500 font-black uppercase tracking-[0.3em]">Silence in this Sector.</p>
                    <p className="text-[9px] text-slate-700 font-bold uppercase tracking-widest mt-2">No active broadcasts detected.</p>
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

// UI COMPONENTS FOR CLEANER CODE
const StatBadge = ({ icon, label, value, color }) => {
    const colors = {
        blue: "bg-blue-600/10 text-blue-500 border-blue-500/20",
        emerald: "bg-emerald-600/10 text-emerald-500 border-emerald-500/20",
        purple: "bg-purple-600/10 text-purple-400 border-purple-500/20"
    };
    return (
        <div className={`flex items-center gap-3 px-4 py-2 rounded-2xl border ${colors[color]} backdrop-blur-sm`}>
            <div className="p-1.5 bg-white/5 rounded-lg">{icon}</div>
            <div>
                <p className="text-[7px] font-black uppercase tracking-tighter opacity-70">{label}</p>
                <p className="text-[10px] font-black uppercase tracking-widest">{value}</p>
            </div>
        </div>
    );
};

const DetailItem = ({ icon, label, value }) => (
  <div className="group flex items-center justify-between p-5 bg-slate-900/30 hover:bg-slate-900/60 rounded-[1.5rem] border border-white/5 hover:border-white/10 transition-all">
    <div className="flex items-center gap-4">
      <div className="text-slate-500 group-hover:text-blue-500 transition-colors">{icon}</div>
      <div>
        <span className="block text-[8px] font-black text-slate-500 uppercase tracking-[0.2em]">{label}</span>
        <span className="text-[11px] font-bold text-slate-200">{value}</span>
      </div>
    </div>
    <div className="w-1.5 h-1.5 rounded-full bg-slate-800 group-hover:bg-blue-500 transition-colors" />
  </div>
);

export default Profile;