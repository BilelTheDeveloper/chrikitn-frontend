import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Shield, Mail, Lock, ChevronRight, Loader2 } from 'lucide-react';

// ✅ CLOUDINARY & BASE_URL UPDATE:
import { API_BASE_URL } from '../../config/config';

// --- MOVE ELITEINPUT OUTSIDE TO FIX THE FOCUS BUG ---
const EliteInput = ({ icon: Icon, label, ...props }) => (
  <div className="space-y-1 group">
    <label className="text-[10px] font-black text-slate-500 uppercase ml-2 tracking-widest group-focus-within:text-blue-500 transition-colors">
      {label}
    </label>
    <div className="relative overflow-hidden rounded-2xl border border-white/5 bg-slate-950/50 group-focus-within:border-blue-500/50 transition-all">
      <Icon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-500 transition-colors" size={18} />
      <input 
        {...props} 
        className="w-full bg-transparent pl-12 pr-4 py-4 text-white placeholder:text-slate-800 outline-none text-sm" 
      />
      <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-blue-500 group-focus-within:w-full transition-all duration-500" />
    </div>
  </div>
);

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // ✅ UPDATED: Uses API_BASE_URL for the login endpoint
      const res = await axios.post(`${API_BASE_URL}/auth/login`, formData);
      
      // Save Token and User Data to LocalStorage
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));

      // Redirect based on role or to mainfeed
      if (res.data.user.role === 'Admin') {
        navigate('/admin-verification'); 
      } else {
        navigate('/main');
      }
    } catch (err) {
      setError(err.response?.data?.msg || 'Authentication Failed: Access Denied');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-6 relative overflow-hidden">
      {/* Dynamic Background Orbs */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full animate-pulse" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-600/10 blur-[120px] rounded-full" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Header Section */}
        <div className="text-center mb-10">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="inline-flex items-center justify-center w-16 h-16 bg-blue-600/10 border border-blue-500/20 rounded-2xl mb-6 shadow-[0_0_30px_rgba(59,130,246,0.2)]"
          >
            <Shield className="text-blue-500" size={32} />
          </motion.div>
          <h2 className="text-4xl font-black text-white uppercase tracking-tighter italic">Terminal <span className="text-blue-500">Access</span></h2>
          <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.4em] mt-2">Authenticated Session Required</p>
        </div>

        {/* Login Card */}
        <div className="bg-slate-900/40 border border-white/5 p-8 md:p-10 rounded-[3.5rem] backdrop-blur-3xl shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <EliteInput 
              icon={Mail} 
              label="Identity Email" 
              type="email" 
              placeholder="beji@chriki.tn" 
              required
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
            
            <div className="space-y-1">
              <EliteInput 
                icon={Lock} 
                label="Security Key" 
                type="password" 
                placeholder="••••••••••••" 
                required
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
              <div className="flex justify-end pr-2">
                {/* ✅ UPDATED: Link to the Forgot Password Protocol */}
                <Link 
                    to="/forgot-password" 
                    className="text-[9px] font-black text-slate-600 hover:text-blue-500 uppercase tracking-widest transition-colors"
                >
                  Forgot Password? Reset Protocol
                </Link>
              </div>
            </div>

            {error && (
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] font-black uppercase tracking-widest text-center"
              >
                {error}
              </motion.div>
            )}

            <button 
              disabled={loading}
              className="group w-full py-4 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 text-white font-black uppercase tracking-widest rounded-2xl mt-4 transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-500/30"
            >
              {loading ? (
                <Loader2 className="animate-spin" size={18} />
              ) : (
                <>Authorize Session <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" /></>
              )}
            </button>
          </form>
        </div>

        {/* Footer */}
        <div className="mt-10 text-center space-y-4">
          <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">
            Unauthorized access is strictly monitored
          </p>
          <div className="p-1 bg-slate-900/50 rounded-2xl border border-white/5 inline-block px-6 py-3">
             <p className="text-slate-400 text-xs font-medium">
               New operative? <Link to="/signup" className="text-blue-500 font-black hover:text-blue-400 transition-colors uppercase ml-1 tracking-tighter">Request Access</Link>
             </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;