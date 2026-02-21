import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, Plus, Lock, Search, X, 
  Upload, ShieldCheck, Zap, Layout, 
  Info, CheckCircle2, UserPlus, Image as ImageIcon
} from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import api from '../../../utils/api';
import { toast } from 'react-hot-toast';

const MainCollective = () => {
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [collectives, setCollectives] = useState([]);
  const [fetching, setFetching] = useState(true);
  
  // Founding Form State
  const [formData, setFormData] = useState({
    name: '',
    slogan: '',
    description: '',
    members: [], // Array of user objects
  });
  
  const [logoFile, setLogoFile] = useState(null);
  const [bgFile, setBgFile] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const isFreelancer = user?.role === 'Freelancer';

  // 📡 FETCH ACTIVE COLLECTIVES
  useEffect(() => {
    const fetchCollectives = async () => {
      try {
        const res = await api.get('/collectives'); // We will create this GET route next
        setCollectives(res.data);
      } catch (err) {
        console.error("Discovery Error");
      } finally {
        setFetching(false);
      }
    };
    fetchCollectives();
  }, []);

  // 🔍 SEARCH FOR POTENTIAL MEMBERS
  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      if (searchQuery.length > 2) {
        try {
          // Hits your existing user search endpoint
          const res = await api.get(`/users/search?q=${searchQuery}&role=Freelancer`);
          setSearchResults(res.data.filter(u => u._id !== user?._id));
        } catch (err) {
          console.error("Search Error");
        }
      }
    }, 500);
    return () => clearTimeout(delayDebounce);
  }, [searchQuery, user?._id]);

  const addMember = (selectedUser) => {
    if (formData.members.find(m => m._id === selectedUser._id)) return;
    setFormData({ ...formData, members: [...formData.members, selectedUser] });
    setSearchQuery('');
    setSearchResults([]);
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
    data.append('logo', logoFile); // Matches backend upload.fields
    data.append('background', bgFile); // Matches backend upload.fields
    data.append('memberIds', JSON.stringify(formData.members.map(m => m._id)));

    try {
      await api.post('/collectives/initiate', data);
      toast.success("Collective Initiated! Recruitment notifications dispatched.");
      
      // Reset State
      setIsModalOpen(false);
      setFormData({ name: '', slogan: '', description: '', members: [] });
      setLogoFile(null);
      setBgFile(null);
      
    } catch (err) {
      toast.error(err.response?.data?.msg || "Founding Protocol Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-4 md:p-8 overflow-x-hidden">
      {/* 1. HEADER SECTION */}
      <header className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 mb-16 pt-4">
        <div className="space-y-2 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-3">
            <Users className="text-amber-500" size={24} />
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-amber-500/80">Syndicate Hub</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black italic tracking-tighter uppercase">
            THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600">COLLECTIVES</span>
          </h1>
        </div>

        {/* ROLE-GATED BUTTON */}
        <div className="relative group">
          <button 
            disabled={!isFreelancer}
            onClick={() => setIsModalOpen(true)}
            className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-black uppercase text-[11px] tracking-widest transition-all
              ${isFreelancer 
                ? 'bg-white text-black hover:scale-105 shadow-[0_0_30px_rgba(255,255,255,0.1)]' 
                : 'bg-slate-900 text-slate-600 border border-white/5 cursor-not-allowed'
              }`}
          >
            {isFreelancer ? <Plus size={16} strokeWidth={3} /> : <Lock size={16} />}
            Initiate Collective
          </button>
          {!isFreelancer && (
            <span className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-max bg-red-500/10 text-red-500 text-[8px] font-black px-3 py-1 rounded border border-red-500/20 opacity-0 group-hover:opacity-100 transition-opacity">
              ONLY FREELANCER OPERATIVES CAN FOUND SYNDICATES
            </span>
          )}
        </div>
      </header>

      {/* 2. DISCOVERY FEED */}
      <main className="max-w-7xl mx-auto">
        {fetching ? (
          <div className="col-span-full py-40 flex flex-col items-center justify-center border-2 border-dashed border-white/5 rounded-[4rem] bg-slate-900/20">
            <div className="w-12 h-12 border-4 border-amber-500/20 border-t-amber-500 rounded-full animate-spin mb-4" />
            <p className="text-slate-500 font-black uppercase tracking-[0.3em] text-xs">Decrypting Syndicate Data...</p>
          </div>
        ) : collectives.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {collectives.map((col) => (
              <div key={col._id} className="group relative bg-slate-900 border border-white/5 rounded-[2.5rem] overflow-hidden hover:border-amber-500/30 transition-all duration-500">
                <div className="h-48 overflow-hidden">
                  <img src={col.heroBackground} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="" />
                </div>
                <div className="p-8">
                  <div className="flex justify-between items-start mb-4">
                    <img src={col.logo} className="w-16 h-16 rounded-2xl border-2 border-slate-950 -mt-16 bg-slate-900" alt="" />
                    <div className="bg-amber-500/10 text-amber-500 text-[8px] font-black px-3 py-1 rounded-full border border-amber-500/20 uppercase tracking-widest">
                      Rank #{col.rating}
                    </div>
                  </div>
                  <h3 className="text-xl font-black uppercase italic tracking-tighter text-white">{col.name}</h3>
                  <p className="text-amber-500/80 text-[10px] font-bold uppercase tracking-widest mb-4">{col.slogan}</p>
                  <p className="text-slate-400 text-xs line-clamp-2 mb-6">{col.description}</p>
                  <button className="w-full py-4 bg-white/5 hover:bg-white text-white hover:text-black text-[10px] font-black uppercase tracking-[0.2em] rounded-xl transition-all">
                    View Syndicate Portal
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="col-span-full py-40 flex flex-col items-center justify-center border-2 border-dashed border-white/5 rounded-[4rem] bg-slate-900/20">
            <Layout size={40} className="text-slate-800 mb-4" />
            <p className="text-slate-500 font-black uppercase tracking-[0.3em] text-xs">No Operational Collectives Found</p>
          </div>
        )}
      </main>

      {/* 3. FOUNDING MODAL */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => !loading && setIsModalOpen(false)}
              className="absolute inset-0 bg-slate-950/95 backdrop-blur-2xl"
            />
            
            <motion.div 
              initial={{ y: 50, opacity: 0, scale: 0.9 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 50, opacity: 0, scale: 0.9 }}
              className="relative w-full max-w-3xl bg-slate-900 border border-white/10 rounded-[3rem] p-8 md:p-12 shadow-2xl overflow-y-auto max-h-[90vh]"
            >
              <div className="flex justify-between items-start mb-10">
                <div>
                  <h2 className="text-3xl font-black italic uppercase text-white">Found <span className="text-amber-500">Syndicate</span></h2>
                  <p className="text-slate-500 text-[10px] uppercase font-black tracking-widest mt-1">Operational Identity Setup</p>
                </div>
                <button onClick={() => setIsModalOpen(false)} className="p-3 bg-white/5 rounded-2xl hover:text-red-500 transition-all"><X /></button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                {/* LOGO & NAME ROW */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-1">
                    <label className="block text-[9px] font-black uppercase text-amber-500 mb-3">01. Syndicate Logo</label>
                    <label className="flex flex-col items-center justify-center aspect-square rounded-3xl border-2 border-dashed border-white/10 bg-slate-950 hover:border-amber-500/50 cursor-pointer transition-all overflow-hidden group">
                      {logoFile ? (
                        <img src={URL.createObjectURL(logoFile)} className="w-full h-full object-cover" alt="Logo" />
                      ) : (
                        <Upload size={24} className="text-slate-700 group-hover:text-amber-500 transition-colors" />
                      )}
                      <input type="file" className="hidden" accept="image/*" onChange={(e) => setLogoFile(e.target.files[0])} />
                    </label>
                  </div>
                  
                  <div className="md:col-span-2 space-y-6">
                    <div className="space-y-2">
                      <label className="text-[9px] font-black uppercase text-slate-500">Collective Name</label>
                      <input required placeholder="E.g. NEON ARCHITECTS" className="w-full bg-slate-950 border border-white/10 rounded-2xl p-4 text-white outline-none focus:border-amber-500 transition-all" 
                        onChange={(e) => setFormData({...formData, name: e.target.value.toUpperCase()})} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[9px] font-black uppercase text-slate-500">Slogan / Call Sign</label>
                      <input required placeholder="E.g. Future-Proofing Brands" className="w-full bg-slate-950 border border-white/10 rounded-2xl p-4 text-white outline-none focus:border-amber-500 transition-all"
                        onChange={(e) => setFormData({...formData, slogan: e.target.value})} />
                    </div>
                  </div>
                </div>

                {/* DESCRIPTION */}
                <div className="space-y-2">
                  <label className="text-[9px] font-black uppercase text-slate-500">Intel Summary (About the Collective)</label>
                  <textarea required rows={4} placeholder="Describe the combined power of your team..." className="w-full bg-slate-950 border border-white/10 rounded-2xl p-4 text-white outline-none focus:border-amber-500 resize-none"
                    onChange={(e) => setFormData({...formData, description: e.target.value})} />
                </div>

                {/* BACKGROUND SELECTION */}
                <div className="space-y-2">
                  <label className="text-[9px] font-black uppercase text-slate-500">Portal Visual (Hero Background)</label>
                  <label className="flex items-center gap-4 p-4 bg-slate-950 border border-white/10 rounded-2xl cursor-pointer hover:bg-slate-900 transition-all">
                    <ImageIcon className="text-amber-500" />
                    <span className="text-xs text-slate-400">{bgFile ? bgFile.name : "Select High-Res Background"}</span>
                    <input type="file" className="hidden" accept="image/*" onChange={(e) => setBgFile(e.target.files[0])} />
                  </label>
                </div>

                {/* RECRUITMENT SECTION */}
                <div className="space-y-4">
                  <label className="text-[9px] font-black uppercase text-amber-500">02. Strike Team Recruitment</label>
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                    <input 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search operatives by name..." 
                      className="w-full bg-slate-950 border border-white/10 rounded-2xl p-4 pl-12 text-white outline-none focus:border-amber-500" 
                    />
                    
                    {searchResults.length > 0 && (
                      <div className="absolute top-full left-0 w-full bg-slate-800 border border-white/10 mt-2 rounded-2xl overflow-hidden z-[160] shadow-2xl max-h-60 overflow-y-auto">
                        {searchResults.map(u => (
                          <button key={u._id} type="button" onClick={() => addMember(u)} className="w-full flex items-center gap-4 p-4 hover:bg-white/5 transition-all border-b border-white/5 last:border-0">
                            <img src={u.identityImage} className="w-10 h-10 rounded-lg object-cover" alt="" />
                            <div className="text-left">
                              <p className="text-xs font-bold text-white uppercase">{u.name}</p>
                              <p className="text-[8px] text-slate-500 font-black uppercase tracking-widest">{u.speciality || 'Operative'}</p>
                            </div>
                            <UserPlus className="ml-auto text-amber-500" size={16} />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Selected Members Tags */}
                  <div className="flex flex-wrap gap-3">
                    {formData.members.map(m => (
                      <div key={m._id} className="flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 px-3 py-2 rounded-xl">
                        <span className="text-[9px] font-black text-amber-500 uppercase tracking-widest">{m.name}</span>
                        <button type="button" onClick={() => removeMember(m._id)} className="text-amber-500 hover:text-white"><X size={12}/></button>
                      </div>
                    ))}
                    {formData.members.length === 0 && (
                      <p className="text-[8px] text-slate-600 uppercase font-bold italic tracking-wider">No operatives drafted yet...</p>
                    )}
                  </div>
                </div>

                <button 
                  disabled={loading}
                  className="w-full py-6 bg-gradient-to-r from-amber-600 to-amber-500 text-black font-black uppercase tracking-[0.4em] text-xs rounded-[2rem] hover:scale-[1.02] active:scale-95 transition-all shadow-xl disabled:opacity-50"
                >
                  {loading ? (
                    <div className="flex items-center justify-center gap-3">
                      <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                      Transmitting Data...
                    </div>
                  ) : "Initiate Global Syndicate"}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MainCollective;