import React, { useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Send, 
  ArrowLeft, 
  Target, 
  Zap, 
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

const CollaborationPitch = () => {
  const navigate = useNavigate();
  const { postId } = useParams();
  const location = useLocation();
  
  // We get the project details from the state passed via the Link, or use defaults
  const projectInfo = location.state?.project || { title: "The Project", domain: "General" };

  const [pitch, setPitch] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Logic will go here later
    setTimeout(() => {
      alert("Pitch sent to the project owner!");
      setLoading(false);
      navigate(-1);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-950 pb-20 px-4 pt-10">
      <div className="max-w-3xl mx-auto">
        
        {/* Back Button */}
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors mb-8 group"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-xs font-bold uppercase tracking-widest">Back to Feed</span>
        </button>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-900 border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl"
        >
          {/* Top Project Summary Banner */}
          <div className="bg-blue-600/10 border-b border-white/5 p-8 flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-[10px] font-black text-blue-500 uppercase tracking-[0.2em]">Pitching for</span>
              <h1 className="text-white text-2xl font-black tracking-tight">{projectInfo.title}</h1>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                <span className="text-xs text-slate-400 font-medium">{projectInfo.domain}</span>
              </div>
            </div>
            <Target size={40} className="text-blue-500/20" />
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-8">
            
            {/* Instructional Note */}
            <div className="flex gap-4 p-5 bg-white/5 rounded-2xl border border-white/5">
              <Zap size={24} className="text-amber-400 shrink-0" />
              <div className="space-y-1">
                <p className="text-sm text-white font-bold tracking-tight">Make your pitch count!</p>
                <p className="text-xs text-slate-400 leading-relaxed">
                  The owner will see your profile and this message. Explain how your skills can help bring this idea to life.
                </p>
              </div>
            </div>

            {/* The Pitch Area */}
            <div className="space-y-3">
              <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest ml-1">
                Your Collaboration Message
              </label>
              <textarea 
                required
                value={pitch}
                onChange={(e) => setPitch(e.target.value)}
                placeholder="Example: I'm a Senior Frontend Dev and I've built similar apps before. I'd love to help you with the UI/UX part of this..."
                className="w-full bg-slate-950 border border-white/10 rounded-2xl p-5 text-white text-sm focus:border-blue-500 outline-none min-h-[200px] transition-all resize-none leading-relaxed"
              />
            </div>

            {/* Verification Items */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-4 bg-slate-950/50 rounded-xl border border-white/5">
                <CheckCircle2 size={16} className="text-green-500" />
                <span className="text-[10px] font-bold text-slate-300 uppercase">Profile Link Attached</span>
              </div>
              <div className="flex items-center gap-3 p-4 bg-slate-950/50 rounded-xl border border-white/5">
                <CheckCircle2 size={16} className="text-green-500" />
                <span className="text-[10px] font-bold text-slate-300 uppercase">Skill Badges Included</span>
              </div>
            </div>

            {/* Submit Button */}
            <button 
              type="submit"
              disabled={loading}
              className="w-full py-5 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 text-white font-black uppercase tracking-[0.3em] text-xs rounded-2xl transition-all shadow-xl shadow-blue-900/20 flex items-center justify-center gap-3"
            >
              {loading ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <>
                  Send Collaboration Pitch <Send size={18} />
                </>
              )}
            </button>

            <p className="text-center text-[10px] text-slate-600 font-bold uppercase tracking-widest">
              By sending this, you agree to share your professional info with the owner.
            </p>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

// Simple Loader for the button
const Loader2 = ({ size, className }) => (
  <svg className={`animate-spin ${className}`} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
  </svg>
);

export default CollaborationPitch;