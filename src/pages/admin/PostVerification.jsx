import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, 
  Trash2, 
  Clock, 
  Lightbulb, 
  Target, 
  ShieldAlert,
  Search,
  Loader2,
  User
} from 'lucide-react';

// ✅ CLOUDINARY & BASE_URL UPDATE:
import { API_BASE_URL } from '../../config/config';

const PostVerification = () => {
  const [pendingPosts, setPendingPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPendingPosts();
  }, []);

  const fetchPendingPosts = async () => {
    try {
      setLoading(true);
      // ✅ UPDATED: Uses API_BASE_URL instead of relative path
      const res = await axios.get(`${API_BASE_URL}/posts/pending`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });

      // --- LOGIC UPDATE START ---
      // This handles both cases: if res.data is a direct array or an object containing the array
      const dataToSet = Array.isArray(res.data) 
        ? res.data 
        : (res.data.posts || []);
      
      setPendingPosts(dataToSet);
      // --- LOGIC UPDATE END ---

      setError(null);
    } catch (err) {
      setError("Failed to synchronize with central intelligence.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (id, action) => {
    try {
      if (action === 'accept') {
        // ✅ UPDATED: Uses API_BASE_URL
        await axios.put(`${API_BASE_URL}/posts/accept/${id}`, {}, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
      } else {
        // ✅ UPDATED: Uses API_BASE_URL
        await axios.delete(`${API_BASE_URL}/posts/reject/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
      }
      
      // Remove post from UI immediately after success
      setPendingPosts(prev => prev.filter(post => post._id !== id));
    } catch (err) {
      alert("Operation failed. Terminal access might be restricted.");
    }
  };

  if (loading) return (
    <div className="h-96 flex flex-col items-center justify-center space-y-4">
      <Loader2 className="text-blue-500 animate-spin" size={40} />
      <p className="text-[10px] text-slate-500 uppercase font-black tracking-[0.5em]">Decrypting Queue...</p>
    </div>
  );

  return (
    <div className="p-6 md:p-10 space-y-8">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white uppercase tracking-tighter flex items-center gap-3">
            <ShieldAlert className="text-blue-500" />
            Intelligence <span className="text-blue-500">Verification</span>
          </h1>
          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.3em] mt-1">
            {pendingPosts.length} Project Nodes Awaiting Authorization
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={14} />
            <input 
              type="text" 
              placeholder="Filter by Domain..." 
              className="bg-slate-900 border border-white/5 rounded-xl pl-9 pr-4 py-2 text-xs text-white focus:border-blue-500/50 outline-none transition-all"
            />
          </div>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-500 text-[10px] font-black uppercase tracking-widest text-center">
          {error}
        </div>
      )}

      {/* PENDING LIST */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <AnimatePresence mode="popLayout">
          {pendingPosts.length > 0 ? (
            pendingPosts.map((post) => (
              <motion.div
                key={post._id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, x: 20 }}
                className="bg-slate-900/40 border border-white/5 rounded-[2.5rem] overflow-hidden flex flex-col backdrop-blur-sm"
              >
                <div className="p-5 bg-white/5 border-b border-white/5 flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-500">
                      <User size={14} />
                    </div>
                    <div>
                        <span className="block text-[10px] font-black text-white uppercase tracking-wider leading-none">
                            {post.user?.username || "Unknown Operative"}
                        </span>
                        <span className="text-[8px] font-bold text-slate-500 uppercase tracking-widest">
                            Ref: {post._id.slice(-6)}
                        </span>
                    </div>
                  </div>
                  <div className="text-[9px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                    <Clock size={12} /> {new Date(post.createdAt).toLocaleDateString()}
                  </div>
                </div>

                <div className="p-6 space-y-5 flex-grow">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-[9px] font-black text-blue-400 uppercase tracking-tighter">
                      {post.domain}
                    </span>
                  </div>

                  <div className="space-y-4">
                    <div className="flex gap-3">
                      <Lightbulb className="text-amber-500 shrink-0" size={18} />
                      <div>
                        <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em] mb-1">Global Vision</p>
                        <p className="text-sm text-white font-bold leading-tight">{post.globalVision}</p>
                      </div>
                    </div>

                    <div className="bg-slate-950/80 p-5 rounded-[1.5rem] border border-white/5">
                      <p className="text-[9px] font-black text-blue-500 uppercase tracking-[0.2em] mb-2">Project Intelligence</p>
                      <p className="text-xs text-slate-300 leading-relaxed font-medium">
                        {post.description}
                      </p>
                    </div>

                    <div className="flex gap-3">
                      <Target className="text-purple-500 shrink-0" size={18} />
                      <div>
                        <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em] mb-1">Broadcast Goal</p>
                        <p className="text-xs text-slate-400 font-bold">{post.goal}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-slate-950/50 border-t border-white/5 grid grid-cols-2 gap-3">
                  <button 
                    onClick={() => handleAction(post._id, 'reject')}
                    className="flex items-center justify-center gap-2 py-3.5 rounded-2xl border border-red-500/10 text-red-500 text-[10px] font-black uppercase tracking-[0.2em] hover:bg-red-500 hover:text-white transition-all group"
                  >
                    <Trash2 size={14} className="group-hover:rotate-12 transition-transform" /> Terminate
                  </button>
                  <button 
                    onClick={() => handleAction(post._id, 'accept')}
                    className="flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-blue-600 text-white text-[10px] font-black uppercase tracking-[0.2em] hover:bg-blue-500 shadow-lg shadow-blue-600/20 transition-all active:scale-95"
                  >
                    <ShieldCheck size={14} /> Authorize Post
                  </button>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full py-32 flex flex-col items-center justify-center text-center">
              <div className="w-20 h-20 bg-slate-900 border border-dashed border-white/10 rounded-full flex items-center justify-center mb-6">
                <ShieldCheck size={32} className="text-slate-800" />
              </div>
              <h3 className="text-white font-bold uppercase tracking-widest">Queue Clear</h3>
              <p className="text-xs text-slate-500 mt-2 uppercase tracking-tighter font-black">All project nodes have been verified.</p>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default PostVerification;