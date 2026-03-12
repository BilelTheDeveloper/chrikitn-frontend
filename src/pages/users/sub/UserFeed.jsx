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
  Loader2,
  LayoutGrid,
  Square
} from 'lucide-react';
import PostCard from '../../../components/feed/PostCard'; 

// ✅ CONFIG INTEGRATION
import { API_BASE_URL } from '../../../config/config';

const UserFeed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isGridView, setIsGridView] = useState(true); // Default: 2 posts in a row
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
      const res = await axios.get(`${API_BASE_URL}/posts/feed`, {
        headers: { Authorization: `Bearer ${token}` }
      });
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

      await axios.post(`${API_BASE_URL}/posts/broadcast`, payload, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setIsModalOpen(false);
      setProjectData({ domain: '', customDomain: '', globalIdea: '', projectDetails: '', goal: '' });
      alert("Idea posted successfully!");
      fetchFeed(); 
    } catch (err) {
      console.error("Post Error:", err);
      alert(err.response?.data?.msg || "Post failed.");
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 space-y-8 pb-20">
      {/* HEADER & POST TRIGGER */}
      <div className="bg-slate-900/60 border border-white/10 rounded-[2rem] p-6 backdrop-blur-xl shadow-2xl flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center shadow-inner">
            <Activity size={22} className="text-blue-400" />
          </div>
          <div>
            <h1 className="text-white font-bold text-lg">Fikra Feed</h1>
            <p className="text-slate-400 text-sm">Share your ideas and find partners.</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          {/* GRID TOGGLE BUTTON */}
          <button 
            onClick={() => setIsGridView(!isGridView)}
            className="p-3 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-white transition-all"
            title={isGridView ? "Switch to 1 column" : "Switch to 2 columns"}
          >
            {isGridView ? <Square size={18} /> : <LayoutGrid size={18} />}
          </button>

          <button 
            onClick={() => setIsModalOpen(true)} 
            className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all active:scale-95 shadow-lg shadow-blue-600/20"
          >
            <Plus size={18} /> Create Post
          </button>
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between px-2">
          <h3 className="text-[11px] font-bold text-slate-500 uppercase tracking-[0.3em]">Latest Projects</h3>
          <div className="h-[1px] flex-1 bg-white/10 mx-6" />
        </div>

        {loading ? (
          <div className="flex flex-col items-center py-24 gap-4">
            <Loader2 className="text-blue-500 animate-spin" size={40} />
            <p className="text-xs text-slate-500 font-bold uppercase tracking-widest animate-pulse">Loading Ideas...</p>
          </div>
        ) : (
          <div className={`grid gap-6 ${isGridView ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1 max-w-2xl mx-auto'}`}>
            <AnimatePresence>
              {posts.length > 0 ? (
                posts.map((post) => (
                  <motion.div
                    key={post._id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                  >
                    <PostCard post={post} />
                  </motion.div>
                ))
              ) : (
                <div className="col-span-full text-center py-20 text-slate-600 text-sm font-medium italic">
                  No ideas found yet. Be the first to post!
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
              className="absolute inset-0 bg-slate-950/90 backdrop-blur-sm" 
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }} 
              animate={{ opacity: 1, scale: 1, y: 0 }} 
              exit={{ opacity: 0, scale: 0.95, y: 20 }} 
              className="relative w-full max-w-xl bg-slate-900 border border-white/10 rounded-[2rem] shadow-3xl overflow-hidden"
            >
              <div className="p-6 border-b border-white/5 flex items-center justify-between bg-white/5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-600/20">
                    <Send size={18} className="text-white"/>
                  </div>
                  <h2 className="text-base font-bold text-white tracking-tight">Post Your Idea</h2>
                </div>
                <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white transition-colors p-2">
                  <X size={24}/>
                </button>
              </div>

              <form onSubmit={handlePostSubmit} className="p-8 space-y-6 overflow-y-auto max-h-[75vh]">
                <div className="bg-amber-500/10 border border-amber-500/20 p-4 rounded-2xl flex gap-3">
                  <AlertTriangle className="text-amber-500 shrink-0" size={20} />
                  <p className="text-xs text-amber-200/80 font-medium leading-relaxed">
                    Tip: Share the big vision, but keep your secret details safe.
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">What category is this?</label>
                  <select 
                    required 
                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white focus:border-blue-500 outline-none transition-all appearance-none cursor-pointer hover:border-white/20" 
                    value={projectData.domain} 
                    onChange={(e) => setProjectData({...projectData, domain: e.target.value})}
                  >
                    <option value="" disabled>Select Category</option>
                    {domains.map(d => <option key={d} value={d}>{d}</option>)}
                    <option value="Other">Other</option>
                  </select>
                </div>

                {projectData.domain === 'Other' && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="space-y-2">
                    <input 
                      type="text" 
                      placeholder="Type your category here..." 
                      className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white focus:border-blue-500 outline-none" 
                      onChange={(e) => setProjectData({...projectData, customDomain: e.target.value})}
                    />
                  </motion.div>
                )}

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1 flex items-center gap-2">
                    <Lightbulb size={14} className="text-blue-500"/> Project Name / Title
                  </label>
                  <input 
                    required 
                    type="text" 
                    placeholder="e.g., AI Fitness Coach" 
                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white focus:border-blue-500 outline-none" 
                    value={projectData.globalIdea} 
                    onChange={(e) => setProjectData({...projectData, globalIdea: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Describe the idea</label>
                  <textarea 
                    required 
                    placeholder="What problem are you solving? Explain it simply..." 
                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white focus:border-blue-500 outline-none min-h-[120px] resize-none" 
                    value={projectData.projectDetails} 
                    onChange={(e) => setProjectData({...projectData, projectDetails: e.target.value})} 
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1 flex items-center gap-2">
                    <Target size={14} className="text-purple-500"/> What do you need?
                  </label>
                  <input 
                    required 
                    type="text" 
                    placeholder="e.g., Looking for a React Developer" 
                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white focus:border-blue-500 outline-none" 
                    value={projectData.goal} 
                    onChange={(e) => setProjectData({...projectData, goal: e.target.value})}
                  />
                </div>

                <div className="pt-4">
                  <button 
                    type="submit" 
                    className="w-full bg-blue-600 hover:bg-blue-500 text-white py-4 rounded-xl text-sm font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-3 shadow-xl shadow-blue-600/30"
                  >
                    Post Idea Now <Send size={18} />
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