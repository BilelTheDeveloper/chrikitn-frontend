import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, Search, X, Upload, 
  Image as ImageIcon, UserPlus, ArrowLeft, Shield
} from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../../../utils/api';
import { toast } from 'react-hot-toast';
import { getImageUrl } from '../../../config/config';

const CreateCollective = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  // Founding Form State
  const [formData, setFormData] = useState({
    name: '',
    slogan: '',
    description: '',
    members: [], 
  });
  
  const [logoFile, setLogoFile] = useState(null);
  const [bgFile, setBgFile] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  // Security: Only Freelancers can access this logic
  useEffect(() => {
    if (user && user.role !== 'Freelancer') {
      toast.error("ACCESS DENIED: Freelancer Role Required");
      navigate('/main/collective');
    }
  }, [user, navigate]);

  // 🔍 OPERATIVE DISCOVERY SEARCH
  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      if (searchQuery.trim().length > 1) { 
        try {
          const res = await api.get(`/search/operatives?q=${searchQuery}`);
          const data = res.data.data || res.data;
          
          const filtered = data.filter(u => 
            u._id !== user?._id && 
            !formData.members.some(m => m._id === u._id)
          );
          setSearchResults(filtered);
        } catch (err) {
          console.error("Search Protocol Handshake Failed");
        }
      } else {
        setSearchResults([]);
      }
    }, 400); 
    return () => clearTimeout(delayDebounce);
  }, [searchQuery, user?._id, formData.members]);

  const addMember = (selectedUser) => {
    if (formData.members.length >= 5) {
      return toast.error("STRIKE TEAM CAPACITY REACHED: Max 5 Operatives");
    }
    if (formData.members.find(m => m._id === selectedUser._id)) return;
    
    setFormData({ ...formData, members: [...formData.members, selectedUser] });
    setSearchQuery(''); 
    setSearchResults([]); 
    toast.success(`${selectedUser.name} drafted to syndicate`);
  };

  const removeMember = (id) => {
    setFormData({ ...formData, members: formData.members.filter(m => m._id !== id) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!logoFile) return toast.error("Collective Logo is required");
    if (!bgFile) return toast.error("Portal Visual (Background) is required");
    
    setLoading(true);
    const data = new FormData();
    data.append('name', formData.name);
    data.append('slogan', formData.slogan);
    data.append('description', formData.description);
    data.append('logo', logoFile); 
    data.append('background', bgFile); 
    data.append('memberIds', JSON.stringify(formData.members.map(m => m._id)));

    try {
      await api.post('/collectives/initiate', data);
      toast.success("Collective Initiated! Redirection to Hub...");
      setTimeout(() => navigate('/collectives'), 2000);
    } catch (err) {
      toast.error(err.response?.data?.msg || "Founding Protocol Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white pb-20 overflow-x-hidden">
      {/* Background Decor */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-amber-500/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-500/5 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 pt-12">
        {/* Navigation HUD */}
        <button 
          onClick={() => navigate('/main/collective')}
          className="group flex items-center gap-3 text-slate-500 hover:text-white transition-colors mb-12"
        >
          <div className="p-2 rounded-xl bg-white/5 border border-white/10 group-hover:border-amber-500/50">
            <ArrowLeft size={18} />
          </div>
          <span className="text-[10px] font-black uppercase tracking-[0.3em]">Return to Hub</span>
        </button>

        {/* Header Section */}
        <header className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="text-amber-500" size={20} />
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-amber-500/80">Founding Protocol</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter uppercase mb-4">
            INITIATE <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600">SYNDICATE</span>
          </h1>
          <p className="text-slate-500 max-w-2xl text-sm leading-relaxed">
            Establish your collective identity on the global grid. Select your elite strike team, 
            upload visual identifiers, and deploy your operational portal.
          </p>
        </header>

        {/* Main Form Page Container */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-slate-900/50 backdrop-blur-3xl border border-white/10 rounded-[3rem] p-8 md:p-16 shadow-2xl"
        >
          <form onSubmit={handleSubmit} className="space-y-12">
            
            {/* 01. IDENTITY GRID */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              <div className="lg:col-span-4">
                <label className="block text-[9px] font-black uppercase text-amber-500 mb-4 tracking-widest">01. Syndicate Emblem</label>
                <label className="flex flex-col items-center justify-center aspect-square rounded-[2.5rem] border-2 border-dashed border-white/10 bg-slate-950 hover:border-amber-500/50 cursor-pointer transition-all overflow-hidden group">
                  {logoFile ? (
                    <img src={URL.createObjectURL(logoFile)} className="w-full h-full object-cover" alt="Logo" />
                  ) : (
                    <div className="text-center p-6">
                      <Upload size={32} className="text-slate-700 group-hover:text-amber-500 transition-colors mx-auto mb-4" />
                      <p className="text-[8px] font-black text-slate-600 uppercase tracking-widest">Upload Alpha Vector</p>
                    </div>
                  )}
                  <input type="file" className="hidden" accept="image/*" onChange={(e) => setLogoFile(e.target.files[0])} />
                </label>
              </div>
              
              <div className="lg:col-span-8 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <label className="text-[9px] font-black uppercase text-slate-500 tracking-widest">Collective Name</label>
                    <input required placeholder="E.g. BLACK NEON" className="w-full bg-slate-950 border border-white/10 rounded-2xl p-5 text-white outline-none focus:border-amber-500 transition-all font-bold" 
                      onChange={(e) => setFormData({...formData, name: e.target.value.toUpperCase()})} />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[9px] font-black uppercase text-slate-500 tracking-widest">Slogan / Call Sign</label>
                    <input required placeholder="Digital Dominance" className="w-full bg-slate-950 border border-white/10 rounded-2xl p-5 text-white outline-none focus:border-amber-500 transition-all"
                      onChange={(e) => setFormData({...formData, slogan: e.target.value})} />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[9px] font-black uppercase text-slate-500 tracking-widest">Intel Summary (Collective Bio)</label>
                  <textarea required rows={4} placeholder="Define the power of your combined expertise..." className="w-full bg-slate-950 border border-white/10 rounded-3xl p-6 text-white outline-none focus:border-amber-500 resize-none leading-relaxed"
                    onChange={(e) => setFormData({...formData, description: e.target.value})} />
                </div>
              </div>
            </div>

            {/* 02. VISUAL PORTAL */}
            <div className="space-y-4">
              <label className="text-[9px] font-black uppercase text-amber-500 tracking-widest">02. Portal Visual (Hero Background)</label>
              <label className="flex items-center gap-6 p-6 bg-slate-950 border border-white/10 rounded-3xl cursor-pointer hover:bg-slate-900 transition-all group">
                <div className="p-4 rounded-2xl bg-white/5 text-amber-500 group-hover:scale-110 transition-transform">
                  <ImageIcon />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-white uppercase">{bgFile ? bgFile.name : "Select High-Res Portal Graphic"}</span>
                  <span className="text-[8px] text-slate-600 font-black uppercase tracking-widest mt-1">Recommended: 1920x1080 (JPG/PNG)</span>
                </div>
                <input type="file" className="hidden" accept="image/*" onChange={(e) => setBgFile(e.target.files[0])} />
              </label>
            </div>

            {/* 03. RECRUITMENT SYSTEM */}
            <div className="space-y-6 pt-6 border-t border-white/5">
              <div className="flex justify-between items-end">
                <div>
                  <label className="text-[9px] font-black uppercase text-amber-500 tracking-widest">03. Strike Team Recruitment</label>
                  <p className="text-[8px] text-slate-500 uppercase mt-1">Invite up to 5 verified operatives to join your ranks.</p>
                </div>
                <span className="text-[10px] font-black text-amber-500 bg-amber-500/10 px-3 py-1 rounded-lg border border-amber-500/20">
                  {formData.members.length} / 5
                </span>
              </div>
              
              <div className="relative">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
                <input 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Scan network for operatives by name..." 
                  className="w-full bg-slate-950 border border-white/10 rounded-[2rem] p-6 pl-14 text-white outline-none focus:border-amber-500 transition-all shadow-inner" 
                />
                
                {searchResults.length > 0 && (
                  <div className="absolute top-full left-0 w-full bg-slate-900 border border-white/10 mt-4 rounded-3xl overflow-hidden z-[50] shadow-2xl max-h-80 overflow-y-auto backdrop-blur-xl">
                    {searchResults.map(u => (
                      <button key={u._id} type="button" onClick={() => addMember(u)} className="w-full flex items-center gap-4 p-5 hover:bg-white/5 transition-all border-b border-white/5 last:border-0">
                        <img src={getImageUrl(u.identityImage)} className="w-12 h-12 rounded-xl object-cover" alt="" />
                        <div className="text-left flex-1">
                          <p className="text-sm font-bold text-white uppercase">{u.name}</p>
                          <p className="text-[9px] text-slate-500 font-black uppercase tracking-widest">{u.speciality || 'Operative'}</p>
                        </div>
                        <div className="p-2 bg-amber-500/10 text-amber-500 rounded-lg">
                          <UserPlus size={18} />
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Selected Members Grid */}
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {formData.members.map(m => (
                  <div key={m._id} className="relative group p-4 bg-white/5 border border-white/10 rounded-2xl flex flex-col items-center text-center gap-3">
                    <img src={getImageUrl(m.identityImage)} className="w-16 h-16 rounded-2xl object-cover" alt="" />
                    <div>
                      <p className="text-[10px] font-black text-white uppercase">{m.name}</p>
                      <p className="text-[7px] text-amber-500 uppercase tracking-widest mt-1">{m.speciality || 'Operative'}</p>
                    </div>
                    <button 
                      type="button" 
                      onClick={() => removeMember(m._id)} 
                      className="absolute -top-2 -right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X size={12}/>
                    </button>
                  </div>
                ))}
                {formData.members.length === 0 && (
                  <div className="col-span-full py-8 border-2 border-dashed border-white/5 rounded-3xl flex items-center justify-center">
                    <p className="text-[9px] text-slate-600 uppercase font-black italic tracking-widest">Operational grid empty. Draft your strike team above.</p>
                  </div>
                )}
              </div>
            </div>

            {/* SUBMIT BUTTON */}
            <div className="pt-8">
              <button 
                disabled={loading}
                type="submit"
                className="group relative w-full py-8 bg-gradient-to-r from-amber-600 to-amber-500 text-black font-black uppercase tracking-[0.5em] text-sm rounded-[2.5rem] hover:scale-[1.01] active:scale-[0.98] transition-all shadow-[0_20px_50px_rgba(245,158,11,0.2)] disabled:opacity-50"
              >
                <div className="flex items-center justify-center gap-4">
                  {loading ? (
                    <div className="w-5 h-5 border-3 border-black/20 border-t-black rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Deploy Global Syndicate</span>
                      <Shield size={20} className="group-hover:rotate-12 transition-transform" />
                    </>
                  )}
                </div>
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default CreateCollective;