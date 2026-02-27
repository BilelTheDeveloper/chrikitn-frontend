import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Send, 
  Activity, 
  Plus, 
  X, 
  AlertTriangle,
  Lightbulb,
  Target,
  Loader2
} from 'lucide-react';
import PostCard from '../../../components/feed/PostCard'; 

// ✅ CONFIG INTEGRATION
import { API_BASE_URL } from '../../../config/config';

const UserFeed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projectData, setProjectData] = useState({
    domain: '',
    customDomain: '',
    globalIdea: '',
    projectDetails: '',
    goal: ''
  });

  const domains = ['Web Development', 'Mobile App', 'AI/Machine Learning', 'Cybersecurity', 'Blockchain', 'Hardware/IoT', 'Design/UI-UX'];

  const fetchFeed = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      // ✅ UPDATED: Uses API_BASE_URL from config
      const res = await axios.get(`${API_BASE_URL}/posts/feed`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      // Handle various response formats (direct array or nested object)
      const feedData = Array.isArray(res.data) ? res.data : (res.data.posts || []);
      setPosts(feedData);
    } catch (err) {
      console.error("Feed sync failure:", err);
      setPosts([]); 
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { 
    fetchFeed(); 
  }, []);

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const payload = {
        domain: projectData.domain === 'Other' ? projectData.customDomain : projectData.domain,
        globalVision: projectData.globalIdea, 
        description: projectData.projectDetails, 
        goal: projectData.goal
      };

      // ✅ UPDATED: Uses API_BASE_URL from config
      await axios.post(`${API_BASE_URL}/posts/broadcast`, payload, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setIsModalOpen(false);
      setProjectData({ domain: '', customDomain: '', globalIdea: '', projectDetails: '', goal: '' });
      alert("Broadcast transmitted to HQ.");
      fetchFeed(); // Refresh the stream
    } catch (err) {
      console.error("Broadcast Error:", err);
      alert(err.response?.data?.msg || "Transmission failed.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8 pb-20">
      {/* ADD POST TRIGGER */}
      <div className="bg-slate-900/40 border border-white/5 rounded-[2.5rem] p-6 backdrop-blur-md shadow-2xl flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center">
            <Activity size={18} className="text-blue-500" />
          </div>
          <span className="text-slate-400 text-l font-medium tracking-tight">Post your idea. Find your co-creator.</span>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)} 
          className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2 transition-all active:scale-95 shadow-lg shadow-blue-600/20"
        >
          <Plus size={16} />  Post
        </button>
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between px-2">
          <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em]">Live Intelligence Stream</h3>
          <div className="h-[1px] flex-1 bg-white/5 mx-4" />
        </div>

        {loading ? (
          <div className="flex flex-col items-center py-20 gap-4">
            <Loader2 className="text-blue-500 animate-spin" size={32} />
            <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Syncing with Alliance Servers...</p>
          </div>
        ) : (
          <div className="space-y-6">
            <AnimatePresence>
              {posts.length > 0 ? (
                posts.map((post) => (
                  <motion.div
                    key={post._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                  >
                    <PostCard post={post} />
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-20 text-slate-600 text-[10px] font-black uppercase tracking-widest">
                  No intelligence nodes found in this sector.
                </div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* MODAL SECTION */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              onClick={() => setIsModalOpen(false)} 
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-md" 
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }} 
              animate={{ opacity: 1, scale: 1, y: 0 }} 
              exit={{ opacity: 0, scale: 0.9, y: 20 }} 
              className="relative w-full max-w-xl bg-slate-900 border border-white/10 rounded-[2.5rem] shadow-3xl overflow-hidden"
            >
              <div className="p-6 border-b border-white/5 flex items-center justify-between bg-white/5">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
                    <Send size={14} className="text-white"/>
                  </div>
                  <h2 className="text-sm font-black text-white uppercase tracking-widest">Post Project Intelligence</h2>
                </div>
                <button onClick={() => setIsModalOpen(false)} className="text-slate-500 hover:text-white transition-colors">
                  <X size={20}/>
                </button>
              </div>

              <form onSubmit={handlePostSubmit} className="p-8 space-y-5 overflow-y-auto max-h-[75vh]">
                <div className="bg-amber-500/10 border border-amber-500/20 p-4 rounded-2xl flex gap-3">
                  <AlertTriangle className="text-amber-500 shrink-0" size={18} />
                  <p className="text-[10px] text-amber-200/70 font-bold uppercase tracking-wide leading-relaxed">
                    Security Advisory: Share the vision, hide core logic.
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Project Domain</label>
                  <select 
                    required 
                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-blue-500 outline-none transition-all appearance-none" 
                    value={projectData.domain} 
                    onChange={(e) => setProjectData({...projectData, domain: e.target.value})}
                  >
                    <option value="" disabled>Select Sector</option>
                    {domains.map(d => <option key={d} value={d}>{d}</option>)}
                    <option value="Other">Other / Classified</option>
                  </select>
                </div>

                {projectData.domain === 'Other' && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="space-y-2">
                    <input 
                      type="text" 
                      placeholder="Specify your domain..." 
                      className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-blue-500 outline-none" 
                      onChange={(e) => setProjectData({...projectData, customDomain: e.target.value})}
                    />
                  </motion.div>
                )}

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 flex items-center gap-2">
                    <Lightbulb size={12} className="text-blue-500"/> Global Vision
                  </label>
                  <input 
                    required 
                    type="text" 
                    placeholder="e.g., Decentralized Freelance Hub" 
                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-blue-500 outline-none" 
                    value={projectData.globalIdea} 
                    onChange={(e) => setProjectData({...projectData, globalIdea: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Brief Description</label>
                  <textarea 
                    required 
                    placeholder="Describe the problem..." 
                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-blue-500 outline-none min-h-[100px] resize-none" 
                    value={projectData.projectDetails} 
                    onChange={(e) => setProjectData({...projectData, projectDetails: e.target.value})} 
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 flex items-center gap-2">
                    <Target size={12} className="text-purple-500"/> Broadcast Goal
                  </label>
                  <input 
                    required 
                    type="text" 
                    placeholder="Seeking partners?" 
                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-blue-500 outline-none" 
                    value={projectData.goal} 
                    onChange={(e) => setProjectData({...projectData, goal: e.target.value})}
                  />
                </div>

                <div className="pt-4">
                  <button 
                    type="submit" 
                    className="w-full bg-blue-600 hover:bg-blue-500 text-white py-4 rounded-2xl text-xs font-black uppercase tracking-[0.3em] transition-all flex items-center justify-center gap-3 shadow-xl shadow-blue-600/20"
                  >
                    Initialize Broadcast <Send size={16} />
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserFeed;