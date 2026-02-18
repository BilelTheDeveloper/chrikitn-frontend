import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, ExternalLink, Mail, Phone, Fingerprint, 
  Eye, X, User, Briefcase, Globe, Database, Hash, Trash2, CheckCircle, Target
} from 'lucide-react';

// ✅ CLOUDINARY & BASE_URL UPDATE:
import { API_BASE_URL, getImageUrl } from '../../config/config';

const UserVerification = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);

  // ✅ HELPER: Get Security Token
  const getAuthHeader = () => ({
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  });

  const fetchUsers = async () => {
    try {
      // ✅ UPDATED: Points to admin-core to match server.js + added Auth Headers
      const res = await axios.get(`${API_BASE_URL}/admin-core/users`, getAuthHeader());
      setUsers(res.data);
    } catch (err) {
      console.error("Link Failure", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchUsers(); }, []);

  // --- ACCEPT FUNCTION ---
  const handleVerify = async (userId) => {
    try {
      // ✅ UPDATED: Points to admin-core + added Auth Headers
      const res = await axios.patch(`${API_BASE_URL}/admin-core/verify/${userId}`, {}, getAuthHeader());
      if (res.data.success) {
        setUsers(users.map(u => u._id === userId ? { ...u, isVerified: true, status: 'Active' } : u));
        setSelectedUser(null);
      }
    } catch (err) {
      alert("Verification Protocol Failed");
    }
  };

  // --- REJECT FUNCTION (DELETE) ---
  const handleReject = async (userId) => {
    if (window.confirm("ARE YOU SURE? This will permanently DELETE this user from the database.")) {
      try {
        // ✅ UPDATED: Points to admin-core + added Auth Headers
        const res = await axios.delete(`${API_BASE_URL}/admin-core/users/${userId}`, getAuthHeader());
        if (res.data.success) {
          setUsers(users.filter(u => u._id !== userId));
          setSelectedUser(null);
        }
      } catch (err) {
        console.error("Purge Failed", err);
        alert("Could not delete user.");
      }
    }
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center h-64 space-y-4">
      <div className="w-12 h-12 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
      <p className="text-[10px] font-black text-blue-500 uppercase tracking-[0.5em]">Scanning Node Database...</p>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* --- MAIN TABLE --- */}
      <div className="bg-slate-900/40 border border-white/5 rounded-[2.5rem] overflow-hidden backdrop-blur-3xl shadow-2xl">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/5 bg-white/[0.02]">
              <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-slate-500">Operative Identity</th>
              <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-slate-500">Alliance Role & Badge</th>
              <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-slate-500 text-center">Visual Evidence</th>
              <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-slate-500 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            <AnimatePresence>
              {users.map((user) => (
                <motion.tr 
                  key={user._id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="hover:bg-blue-500/[0.02] transition-colors group"
                >
                  <td className="px-6 py-6 font-bold text-white text-sm">
                    {user.name}
                    <div className="text-[9px] text-slate-500 font-mono mt-1 uppercase tracking-tighter italic">UID: {user._id.slice(-8)}</div>
                  </td>
                  <td className="px-6 py-6">
                    <div className="flex flex-col gap-2">
                        <span className="w-fit px-3 py-1 bg-slate-950 border border-white/10 text-slate-400 text-[9px] font-black uppercase tracking-tighter rounded-lg">
                        {user.role}
                        </span>
                        {/* ✅ Table Speciality Badge */}
                        {user.speciality && (
                        <div className="flex items-center gap-1.5 text-blue-500/80">
                            <Target size={10} />
                            <span className="text-[9px] font-black uppercase tracking-widest">
                            {user.speciality === 'Other' ? user.customSpeciality : user.speciality}
                            </span>
                        </div>
                        )}
                    </div>
                  </td>
                  <td className="px-6 py-6 text-center">
                    <div className="flex items-center justify-center gap-2">
                        <div className="w-10 h-10 rounded-lg bg-slate-950 overflow-hidden border border-white/10 p-1">
                          <img src={getImageUrl(user.identityImage)} className="w-full h-full object-cover rounded-md opacity-70" alt="ID" />
                        </div>
                        <div className="w-10 h-10 rounded-lg bg-slate-950 overflow-hidden border border-blue-500/20 p-1">
                          <img src={getImageUrl(user.biometricImage)} className="w-full h-full object-cover rounded-md opacity-70" alt="Bio" />
                        </div>
                    </div>
                  </td>
                  <td className="px-6 py-6 text-right">
                    <button 
                      onClick={() => setSelectedUser(user)}
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600/10 text-blue-500 border border-blue-500/20 rounded-xl hover:bg-blue-600 hover:text-white transition-all text-[10px] font-black uppercase tracking-widest"
                    >
                       <Eye size={14} /> Full Review
                    </button>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>

      {/* --- FULL DATA DOSSIER MODAL --- */}
      <AnimatePresence>
        {selectedUser && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/95 backdrop-blur-xl">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-slate-900 border border-white/10 rounded-[3.5rem] max-w-6xl w-full max-h-[90vh] overflow-y-auto shadow-2xl shadow-blue-500/10 relative scrollbar-hide"
            >
              {/* Header */}
              <div className="sticky top-0 bg-slate-900/80 backdrop-blur-md z-10 px-10 py-8 border-b border-white/5 flex justify-between items-center">
                <div>
                    <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter flex items-center gap-3">
                        <Fingerprint className="text-blue-500" size={28} /> 
                        Operative <span className="text-blue-500">Dossier</span>
                    </h3>
                    <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.3em] mt-1">Cross-Reference Protocol Active</p>
                </div>
                <button onClick={() => setSelectedUser(null)} className="p-3 bg-white/5 rounded-full text-slate-400 hover:text-white transition-all">
                    <X size={24} />
                </button>
              </div>

              <div className="p-10 grid grid-cols-1 lg:grid-cols-3 gap-10">
                
                {/* COLUMN 1: CORE DATA */}
                <div className="space-y-6 bg-white/[0.02] p-8 rounded-[2.5rem] border border-white/5">
                    <div className="flex items-center gap-4 border-b border-white/5 pb-6">
                        <div className="w-16 h-16 bg-blue-600/20 rounded-2xl flex items-center justify-center border border-blue-500/30">
                            <User className="text-blue-500" size={32} />
                        </div>
                        <div>
                            <h4 className="text-xl font-black text-white">{selectedUser.name}</h4>
                            <div className="flex flex-col gap-1">
                                <span className="text-xs font-bold text-blue-500 uppercase tracking-widest">{selectedUser.role}</span>
                                {/* ✅ Modal Speciality Badge */}
                                {selectedUser.speciality && (
                                    <div className="flex items-center gap-1 px-2 py-0.5 bg-blue-500/10 border border-blue-500/20 rounded-md w-fit">
                                        <Target size={10} className="text-blue-500" />
                                        <span className="text-[9px] font-black text-blue-500 uppercase">
                                            {selectedUser.speciality === 'Other' ? selectedUser.customSpeciality : selectedUser.speciality}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex flex-col gap-1">
                            <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2"><Mail size={12}/> Email Address</span>
                            <p className="text-sm font-bold text-slate-300">{selectedUser.email}</p>
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2"><Phone size={12}/> Direct Comms</span>
                            <p className="text-sm font-bold text-slate-300">{selectedUser.phone}</p>
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2"><Globe size={12}/> Portfolio Link</span>
                            <a href={selectedUser.portfolioUrl} target="_blank" rel="noreferrer" className="text-sm font-bold text-blue-500 flex items-center gap-2 hover:underline">
                                Visit Portfolio <ExternalLink size={14}/>
                            </a>
                        </div>
                        <div className="flex flex-col gap-1 pt-4">
                            <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2"><Hash size={12}/> Operative ID</span>
                            <p className="text-[10px] font-mono text-slate-500">{selectedUser._id}</p>
                        </div>
                    </div>
                </div>

                {/* COLUMN 2: IDENTITY DOCUMENT */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2"><Database size={14}/> Evidence 01: ID</span>
                        <span className="px-2 py-1 bg-white/5 rounded text-[9px] text-slate-500 font-mono italic">Verified Format</span>
                    </div>
                    <div className="aspect-[3/4] rounded-[2.5rem] overflow-hidden border-2 border-white/5 bg-black group relative">
                        <img src={getImageUrl(selectedUser.identityImage)} className="w-full h-full object-contain" alt="ID Document" />
                        <div className="absolute inset-0 bg-blue-500/5 pointer-events-none border border-white/10 rounded-[2.5rem]" />
                    </div>
                </div>

                {/* COLUMN 3: BIOMETRIC CAPTURE */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest flex items-center gap-2"><Fingerprint size={14}/> Evidence 02: Bio</span>
                        <div className="flex gap-1">
                            <div className="w-1 h-1 bg-blue-500 rounded-full animate-ping"/>
                            <span className="text-[9px] text-blue-500 font-black uppercase">Live Signal</span>
                        </div>
                    </div>
                    <div className="aspect-[3/4] rounded-[2.5rem] overflow-hidden border-2 border-blue-500/30 bg-slate-950 shadow-[0_0_50px_rgba(59,130,246,0.15)] relative">
                        <img src={getImageUrl(selectedUser.biometricImage)} className="w-full h-full object-contain" alt="Biometric Face" />
                        <div className="absolute inset-0 border-[16px] border-slate-900/50 pointer-events-none rounded-[2.5rem]" />
                        <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-blue-500 opacity-50" />
                        <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-blue-500 opacity-50" />
                    </div>
                </div>

              </div>

              {/* --- ACTION FOOTER --- */}
              <div className="p-10 bg-white/[0.01] border-t border-white/5 flex items-center justify-between">
                <div className="flex gap-4">
                  <button 
                    onClick={() => handleReject(selectedUser._id)}
                    className="flex items-center gap-2 px-8 py-4 bg-red-500/10 border border-red-500/20 text-red-500 text-[11px] font-black uppercase tracking-widest rounded-2xl hover:bg-red-500 hover:text-white transition-all"
                  >
                    <Trash2 size={16} /> Reject & Purge
                  </button>
                </div>

                <div className="flex gap-4">
                  <button onClick={() => setSelectedUser(null)} className="px-10 py-4 text-[10px] font-black uppercase text-slate-400 hover:text-white transition-all">Cancel</button>
                  
                  {!selectedUser.isVerified && (
                    <button 
                      onClick={() => handleVerify(selectedUser._id)}
                      className="flex items-center gap-2 px-12 py-4 bg-emerald-600 text-white text-[11px] font-black uppercase tracking-[0.3em] rounded-2xl hover:bg-emerald-500 shadow-2xl shadow-emerald-500/30 active:scale-95 transition-all"
                    >
                      <ShieldCheck size={18} /> Accept Operative
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserVerification;