import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, ExternalLink, User, Clock, Shield, AlertCircle } from 'lucide-react';

// ✅ CLOUDINARY & BASE_URL UPDATE:
import { API_BASE_URL, getImageUrl } from '../../config/config';

const RoleVerification = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const token = localStorage.getItem('token');
      // ✅ UPDATED: Uses API_BASE_URL instead of localhost:5000
      const res = await axios.get(`${API_BASE_URL}/role-request/admin/pending`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      // The backend returns { success: true, data: [...] }
      setRequests(res.data.data);
    } catch (err) {
      setError("Failed to fetch operative dossiers.");
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (id, status) => {
    try {
      const token = localStorage.getItem('token');
      // ✅ UPDATED: Uses API_BASE_URL instead of localhost:5000
      await axios.patch(`${API_BASE_URL}/role-request/admin/verify/${id}`, 
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Smoothly remove from UI
      setRequests(prev => prev.filter(req => req._id !== id));
    } catch (err) {
      alert(err.response?.data?.msg || "Protocol execution failed.");
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-blue-500 animate-pulse font-black uppercase tracking-[0.3em] text-xs">
            Scanning Clearance Database...
        </div>
    </div>
  );

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="mb-12">
        <h1 className="text-4xl font-black text-white uppercase tracking-tighter italic leading-none">
          Role <span className="text-blue-500">Upgrades</span>
        </h1>
        <p className="text-slate-500 text-[10px] font-black mt-3 uppercase tracking-[0.2em] flex items-center gap-2">
          <Shield size={12} className="text-blue-500" /> Administrative Verification Queue
        </p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-500 text-xs font-bold flex items-center gap-2">
            <AlertCircle size={16} /> {error}
        </div>
      )}

      <div className="grid grid-cols-1 gap-4">
        <AnimatePresence mode='popLayout'>
          {requests.map((req) => (
            <motion.div
              key={req._id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-slate-900/40 border border-white/5 rounded-[2rem] p-6 flex flex-col lg:flex-row items-center justify-between gap-6 hover:border-blue-500/30 transition-all duration-500 backdrop-blur-md"
            >
              {/* User Identity Section */}
              <div className="flex items-center gap-4 min-w-[280px]">
                <div className="w-14 h-14 rounded-2xl bg-slate-800 overflow-hidden border border-white/10 relative">
                  {/* ✅ UPDATED: Now uses centralized getImageUrl for Cloudinary/Local support */}
                  <img 
                    src={getImageUrl(req.user?.identityImage) || `https://ui-avatars.com/api/?name=${req.user?.name}&background=0D8ABC&color=fff`} 
                    className="w-full h-full object-cover"
                    alt="User"
                  />
                </div>
                <div>
                  <h4 className="text-white font-black uppercase tracking-tight italic">{req.user?.name || 'Unknown Operative'}</h4>
                  <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest">{req.user?.email}</p>
                </div>
              </div>

              {/* Request Stats Section */}
              <div className="flex flex-wrap gap-10 items-center justify-center">
                <div className="flex flex-col gap-1">
                  <span className="text-[9px] text-slate-500 font-black uppercase tracking-widest">Requested Designation</span>
                  <span className={`px-4 py-1 rounded-full text-[10px] font-black uppercase text-center ${
                    req.requestedRole === 'Brand' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                  }`}>
                    {req.requestedRole}
                  </span>
                </div>

                <div className="flex flex-col gap-1">
                  <span className="text-[9px] text-slate-500 font-black uppercase tracking-widest">Verification Dossier</span>
                  <a 
                    href={req.portfolioLink} 
                    target="_blank" 
                    rel="noreferrer"
                    className="flex items-center gap-2 text-white hover:text-blue-400 transition-all text-[11px] font-black uppercase italic"
                  >
                    Open Link <ExternalLink size={14} className="text-blue-500" />
                  </a>
                </div>

                <div className="flex flex-col gap-1">
                  <span className="text-[9px] text-slate-500 font-black uppercase tracking-widest">Timestamp</span>
                  <span className="text-[11px] text-slate-400 font-bold flex items-center gap-2">
                    <Clock size={12} className="text-slate-600" /> {new Date(req.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>

              {/* Approval/Rejection Buttons */}
              <div className="flex items-center gap-4 pl-6 border-l border-white/5">
                <button 
                  onClick={() => handleAction(req._id, 'Approved')}
                  className="group flex flex-col items-center gap-1"
                >
                    <div className="w-12 h-12 rounded-2xl bg-green-500/10 text-green-500 flex items-center justify-center group-hover:bg-green-500 group-hover:text-white transition-all shadow-xl shadow-green-500/5 border border-green-500/20">
                        <Check size={22} strokeWidth={3} />
                    </div>
                    <span className="text-[8px] font-black text-green-500/50 uppercase tracking-tighter group-hover:text-green-500">Clear</span>
                </button>

                <button 
                  onClick={() => handleAction(req._id, 'Rejected')}
                  className="group flex flex-col items-center gap-1"
                >
                    <div className="w-12 h-12 rounded-2xl bg-red-500/10 text-red-500 flex items-center justify-center group-hover:bg-red-500 group-hover:text-white transition-all shadow-xl shadow-red-500/5 border border-red-500/20">
                        <X size={22} strokeWidth={3} />
                    </div>
                    <span className="text-[8px] font-black text-red-500/50 uppercase tracking-tighter group-hover:text-red-500">Deny</span>
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {requests.length === 0 && !loading && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-32 text-center border-2 border-dashed border-white/5 rounded-[4rem] bg-slate-900/20"
          >
            <Shield className="mx-auto text-slate-800 mb-6 opacity-20" size={64} />
            <p className="text-slate-600 font-black uppercase tracking-[0.4em] text-[10px]">Command Center Clear: No Pending Clearance Requests</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default RoleVerification;