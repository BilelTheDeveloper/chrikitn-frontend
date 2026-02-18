import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
  ShieldCheck, 
  Briefcase, 
  Globe, 
  Send, 
  ArrowLeft,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

// ✅ CONFIG INTEGRATION
import { API_BASE_URL } from '../../../config/config';

const VipApplicationForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    requestedRole: 'Freelancer',
    portfolioLink: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('token');
      
      // ✅ UPDATED: Points to centralized API_BASE_URL
      const res = await axios.post(
        `${API_BASE_URL}/role-request/apply`, 
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.success) {
        setSuccess(true);
        // Protocol: Redirect back to main after 4 seconds of success display
        setTimeout(() => navigate('/main'), 4000);
      }
    } catch (err) {
      console.error("Dossier transmission failed:", err);
      setError(err.response?.data?.msg || "Transmission failed. Check your link.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center p-6">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
          <div className="w-20 h-20 bg-green-500/10 border border-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="text-green-500" size={40} />
          </div>
          <h2 className="text-3xl font-black text-white uppercase italic mb-2 tracking-tighter">Dossier Received</h2>
          <p className="text-slate-400 max-w-xs mx-auto font-medium">Your application is now under review by the Alliance Command. You will be notified once cleared.</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 pt-12">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors mb-8 text-[10px] font-black uppercase tracking-widest"
      >
        <ArrowLeft size={14} /> Abort Request
      </button>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* LEFT COLUMN: INFO */}
        <div className="md:col-span-1">
          <h1 className="text-4xl font-black text-white uppercase tracking-tighter italic leading-none mb-6">
            Upgrade <span className="text-amber-500">Clearance</span>
          </h1>
          <p className="text-slate-400 text-sm leading-relaxed mb-6 font-medium">
            Submit your professional dossier for manual verification. Access to VIP Intel requires a proven track record.
          </p>
          <div className="space-y-4">
            <div className="flex gap-3 items-start">
              <ShieldCheck className="text-amber-500 shrink-0" size={18} />
              <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Manual verification by Admin</p>
            </div>
            <div className="flex gap-3 items-start">
              <Globe className="text-amber-500 shrink-0" size={18} />
              <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Unlock Global VIP Feed access</p>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: FORM */}
        <div className="md:col-span-2">
          <form onSubmit={handleSubmit} className="bg-slate-900/50 border border-white/5 p-8 rounded-[2.5rem] backdrop-blur-xl relative overflow-hidden">
            {error && (
              <motion.div initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 text-red-500 text-xs font-bold">
                <AlertCircle size={16} /> {error}
              </motion.div>
            )}

            <div className="mb-8">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4 block">Select Operational Role</label>
              <div className="grid grid-cols-2 gap-4">
                {['Freelancer', 'Brand'].map((role) => (
                  <button
                    key={role}
                    type="button"
                    onClick={() => setFormData({...formData, requestedRole: role})}
                    className={`p-4 rounded-2xl border transition-all flex flex-col items-center gap-2 ${
                      formData.requestedRole === role 
                      ? 'border-amber-500 bg-amber-500/5 text-amber-500' 
                      : 'border-white/5 bg-white/5 text-slate-500 hover:border-white/20'
                    }`}
                  >
                    {role === 'Freelancer' ? <Briefcase size={20} /> : <ShieldCheck size={20} />}
                    <span className="text-[10px] font-black uppercase tracking-widest">{role}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-10">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4 block">Portfolio / Dossier Link</label>
              <div className="relative">
                <input 
                  type="url"
                  required
                  placeholder="https://behance.net/yourname"
                  value={formData.portfolioLink}
                  onChange={(e) => setFormData({...formData, portfolioLink: e.target.value})}
                  className="w-full bg-slate-950 border border-white/10 rounded-2xl px-6 py-4 text-white text-sm focus:outline-none focus:border-amber-500/50 transition-all"
                />
              </div>
              <p className="text-[9px] text-slate-600 mt-3 font-bold uppercase tracking-widest italic">Provide a link to your Behance, LinkedIn, or Website.</p>
            </div>

            <button 
              disabled={loading}
              className="w-full py-5 bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-black font-black uppercase tracking-[0.4em] text-xs rounded-2xl transition-all shadow-[0_0_30px_rgba(245,158,11,0.2)] flex items-center justify-center gap-3"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin" />
              ) : (
                <>
                  <Send size={16} /> Transmit Application
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VipApplicationForm;