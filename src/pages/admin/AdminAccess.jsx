import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { UserPlus, ShieldAlert, ShieldCheck, Mail } from 'lucide-react';

const AdminAccess = () => {
  // ✅ INITIALIZE: Always start with an empty array to prevent .length errors
  const [adminUsers, setAdminUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchEmail, setSearchEmail] = useState('');

  const fetchAdmins = async () => {
    try {
      const res = await axios.get('https://chrikitn-backend.onrender.com/api/access/list');
      // ✅ VALIDATE: Only set state if res.data is actually an array
      setAdminUsers(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Terminal Error fetching access list:", err);
      // Fallback to empty array on error so UI doesn't break
      setAdminUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  const handleGrantAccess = async (email) => {
    if (!email) return;
    try {
      await axios.post('https://chrikitn-backend.onrender.com/api/access/grant', { 
        email: email.toLowerCase().trim() 
      });
      setSearchEmail('');
      fetchAdmins(); 
    } catch (err) {
      alert("Execution Failed: Target user not found or already has clearance.");
    }
  };

  const handleRevoke = async (email) => {
    if (!window.confirm(`Revoke all administrative privileges for ${email}?`)) return;
    try {
      await axios.delete(`https://chrikitn-backend.onrender.com/api/access/revoke/${email}`);
      fetchAdmins();
    } catch (err) {
      alert("Terminal Error: System Master cannot be revoked or network failure.");
    }
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center h-[60vh]">
      <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4" />
      <p className="text-slate-500 font-black text-[10px] tracking-[0.3em] uppercase">Synchronizing Records...</p>
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-700">
      
      {/* 1. ELITE GRANT ACCESS SECTION */}
      <section className="bg-slate-900/40 border border-white/5 p-8 rounded-[2.5rem] backdrop-blur-xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50" />
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h2 className="text-white text-xl font-black uppercase tracking-tighter flex items-center gap-3">
              <UserPlus className="text-blue-500" size={24} />
              Grant <span className="text-blue-500">Privileges</span>
            </h2>
            <p className="text-slate-500 text-[11px] uppercase tracking-widest mt-1 font-bold">Deploy administrative clearance via email</p>
          </div>

          <form 
            onSubmit={(e) => { e.preventDefault(); handleGrantAccess(searchEmail); }}
            className="flex flex-1 max-w-md gap-3"
          >
            <div className="relative flex-1">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
              <input 
                type="email"
                required
                placeholder="USER@CHRIKITN.TN"
                value={searchEmail}
                onChange={(e) => setSearchEmail(e.target.value)}
                className="w-full bg-slate-950 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-xs font-bold text-white placeholder:text-slate-700 focus:outline-none focus:border-blue-500/50 transition-all"
              />
            </div>
            <button 
              type="submit"
              className="bg-blue-600 hover:bg-blue-500 text-white px-6 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all shadow-[0_0_20px_rgba(59,130,246,0.3)]"
            >
              Execute
            </button>
          </form>
        </div>
      </section>

      {/* 2. AUTHORIZED PERSONNEL LIST */}
      <section>
        <div className="flex items-center gap-4 mb-6 px-4">
          <ShieldCheck className="text-green-500" size={20} />
          <h3 className="text-sm font-black text-white uppercase tracking-[0.3em]">Authorized Personnel</h3>
          <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
          <span className="text-[10px] font-bold text-slate-500">{adminUsers?.length || 0} ACTIVE</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* ✅ SAFE MAP: Optional chaining ensures no crash if adminUsers is null */}
          {adminUsers?.map(user => (
            <div key={user._id} className="group bg-slate-900/60 border border-white/5 p-5 rounded-3xl flex items-center justify-between hover:border-blue-500/30 transition-all">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-600/10 rounded-2xl flex items-center justify-center border border-blue-500/20 group-hover:bg-blue-600/20 transition-all">
                  <ShieldCheck className="text-blue-500" size={20} />
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm uppercase tracking-tight italic">
                    {user.email ? user.email.split('@')[0] : 'Unknown'}
                  </h4>
                  <p className="text-slate-500 text-[10px] font-medium">{user.email}</p>
                </div>
              </div>
              
              <button 
                onClick={() => handleRevoke(user.email)}
                className="p-2 text-slate-600 hover:text-red-500 transition-colors"
                title="Revoke Access"
              >
                <ShieldAlert size={20} />
              </button>
            </div>
          ))}

          {(!adminUsers || adminUsers.length === 0) && (
            <div className="col-span-full py-12 text-center border border-dashed border-white/5 rounded-[2rem]">
              <p className="text-slate-600 text-[10px] font-black uppercase tracking-widest">No Authorized Personnel Detected</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default AdminAccess;