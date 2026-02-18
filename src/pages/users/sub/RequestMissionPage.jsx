import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import { 
  Send, 
  ShieldCheck, 
  ChevronLeft, 
  Target, 
  FileText, 
  Zap,
  Terminal
} from 'lucide-react';

// ✅ CONFIG INTEGRATION
import { API_BASE_URL } from '../../../config/config';

const RequestMissionPage = () => {
  const { postId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  
  // 1. Safe extraction of data from navigation state
  const receiverId = location.state?.receiverId;
  const brandName = location.state?.brandName;

  const [formData, setFormData] = useState({
    missionGoal: '',
    missionDetails: ''
  });
  const [loading, setLoading] = useState(false);

  // 2. Security Guard: Prevent orphans (page refreshes without state)
  useEffect(() => {
    if (!receiverId || !postId) {
      console.error("MISSION ERROR: Target ID or Post ID missing.");
      navigate('/main/vip');
    }
  }, [receiverId, postId, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const token = localStorage.getItem('token');
      
      // 3. Payload matches Controller destructuring
      const payload = {
        receiverId: receiverId,    
        postId: postId,            
        missionGoal: formData.missionGoal,
        missionDetails: formData.missionDetails
      };

      const response = await axios.post(
        `${API_BASE_URL}/requests/initiate`, // ✅ UPDATED: Uses global config
        payload,
        { 
          headers: { 
            Authorization: `Bearer ${token}` 
          } 
        }
      );

      if (response.data.success) {
        alert("PROTOCOL INITIATED: Mission Briefing has been encrypted and transmitted.");
        navigate('/main/vip');
      }
    } catch (err) {
      // 4. Enhanced Error Feedback
      console.error("Transmission Error:", err.response?.data);
      const serverMessage = err.response?.data?.msg || "Connection to the operative failed.";
      alert(`MISSION FAILED: ${serverMessage}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6 md:p-12 font-sans">
      {/* HEADER NAVIGATION */}
      <div className="max-w-4xl mx-auto mb-12 flex items-center justify-between">
        <button 
          onClick={() => navigate(-1)}
          className="group flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] hover:text-amber-500 transition-all"
        >
          <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Abort Mission
        </button>
        <div className="flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/20 rounded-full">
          <ShieldCheck size={14} className="text-amber-500" />
          <span className="text-[10px] font-black text-amber-500 uppercase tracking-widest font-mono">Secure Line Active</span>
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto"
      >
        {/* HERO SECTION */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-amber-500 rounded-2xl shadow-[0_0_20px_rgba(245,158,11,0.3)]">
              <Target size={24} className="text-black" />
            </div>
            <div>
              <h1 className="text-4xl font-black uppercase tracking-tighter italic">
                Mission <span className="text-amber-500">Briefing</span>
              </h1>
              <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.4em] flex items-center gap-2">
                Target Entity: <span className="text-white">{brandName || "Validating..."}</span>
              </p>
            </div>
          </div>
        </div>

        {/* BRIEFING FORM */}
        <form onSubmit={handleSubmit} className="space-y-8 bg-slate-900/40 border border-white/5 p-8 md:p-12 rounded-[3rem] backdrop-blur-xl shadow-2xl">
          
          {/* 1. MISSION GOAL */}
          <div className="relative group">
            <label className="flex items-center gap-2 text-[10px] font-black text-amber-500 uppercase tracking-[0.3em] mb-4">
              <Zap size={12} /> Primary Objective
            </label>
            <input 
              required
              type="text"
              placeholder="e.g. HIGH-LEVEL UI AUDIT & RE-ENGINEERING"
              className="w-full bg-slate-950/50 border border-white/10 rounded-2xl p-5 text-white placeholder:text-slate-700 outline-none focus:border-amber-500/50 transition-all font-bold tracking-tight uppercase"
              value={formData.missionGoal}
              onChange={(e) => setFormData({ ...formData, missionGoal: e.target.value })}
            />
          </div>

          {/* 2. MISSION DETAILS */}
          <div className="relative group">
            <label className="flex items-center gap-2 text-[10px] font-black text-amber-500 uppercase tracking-[0.3em] mb-4">
              <FileText size={12} /> Operational Intelligence (Details)
            </label>
            <textarea 
              required
              rows="8"
              placeholder="Describe the scope, timeline, and encrypted requirements for this mission..."
              className="w-full bg-slate-950/50 border border-white/10 rounded-3xl p-5 text-slate-200 placeholder:text-slate-700 outline-none focus:border-amber-500/50 transition-all leading-relaxed"
              value={formData.missionDetails}
              onChange={(e) => setFormData({ ...formData, missionDetails: e.target.value })}
            />
          </div>

          {/* TRANSMIT BUTTON */}
          <div className="pt-6">
            <button 
              disabled={loading}
              type="submit"
              className="group relative w-full py-6 bg-gradient-to-r from-amber-600 to-amber-500 rounded-2xl overflow-hidden active:scale-95 transition-all disabled:opacity-50"
            >
              <div className="relative z-10 flex items-center justify-center gap-3">
                {loading ? (
                  <span className="text-[10px] font-black text-black uppercase animate-pulse">Encrypting Data...</span>
                ) : (
                  <>
                    <Send size={18} className="text-black group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    <span className="text-[10px] font-black text-black uppercase tracking-[0.5em]">Transmit Briefing</span>
                  </>
                )}
              </div>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </button>
            <p className="text-center mt-6 text-[8px] font-bold text-slate-600 uppercase tracking-[0.2em] flex items-center justify-center gap-2">
              <Terminal size={10} /> Data will be processed through the Chriki-TN Security Layer
            </p>
          </div>

        </form>
      </motion.div>
    </div>
  );
};

export default RequestMissionPage;