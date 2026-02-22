import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, X, Upload, Plus,
  Image as ImageIcon, UserPlus, ArrowLeft, Shield, Briefcase
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
  
  const [formData, setFormData] = useState({
    name: '',
    slogan: '',
    description: '',
    members: [], 
    services: [] // ✅ NEW: Services Array
  });
  
  const [logoFile, setLogoFile] = useState(null);
  const [bgFile, setBgFile] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  // --- SERVICE LOGIC ---
  const addServiceSlot = () => {
    if (formData.services.length >= 5) return toast.error("Maximum 5 operational services allowed.");
    setFormData({
      ...formData,
      services: [...formData.services, { title: '', description: '' }]
    });
  };

  const updateService = (index, field, value) => {
    const updated = [...formData.services];
    updated[index][field] = value;
    setFormData({ ...formData, services: updated });
  };

  const removeService = (index) => {
    setFormData({
      ...formData,
      services: formData.services.filter((_, i) => i !== index)
    });
  };

  // --- MEMBER LOGIC ---
  useEffect(() => {
    if (user && user.role !== 'Freelancer') {
      toast.error("ACCESS DENIED: Freelancer Role Required");
      navigate('/main/collective');
    }
  }, [user, navigate]);

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
        } catch (err) { console.error("Search Failed"); }
      } else { setSearchResults([]); }
    }, 400); 
    return () => clearTimeout(delayDebounce);
  }, [searchQuery, user?._id, formData.members]);

  const addMember = (selectedUser) => {
    if (formData.members.length >= 5) return toast.error("Strike team full.");
    if (formData.members.find(m => m._id === selectedUser._id)) return;
    setFormData({ ...formData, members: [...formData.members, selectedUser] });
    setSearchQuery(''); 
    setSearchResults([]); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!logoFile || !bgFile) return toast.error("Brand assets required.");
    if (formData.services.length === 0) return toast.error("Add at least one service card.");
    
    setLoading(true);
    const data = new FormData();
    data.append('name', formData.name);
    data.append('slogan', formData.slogan);
    data.append('description', formData.description);
    data.append('logo', logoFile); 
    data.append('background', bgFile); 
    data.append('memberIds', JSON.stringify(formData.members.map(m => m._id)));
    data.append('services', JSON.stringify(formData.services)); // ✅ Backend connection

    try {
      await api.post('/collectives/initiate', data);
      toast.success("Syndicate Protocol Initiated!");
      setTimeout(() => navigate('/main/collective'), 2000);
    } catch (err) {
      toast.error(err.response?.data?.msg || "Initiation Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white pb-20 overflow-x-hidden selection:bg-amber-500/30">
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-amber-500/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-500/5 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-12">
        <button onClick={() => navigate('/main/collective')} className="group flex items-center gap-3 text-slate-500 hover:text-white mb-12 transition-all">
          <div className="p-2 rounded-xl bg-white/5 border border-white/10 group-hover:border-amber-500/50"><ArrowLeft size={18} /></div>
          <span className="text-[10px] font-black uppercase tracking-[0.3em]">Abort Initiation</span>
        </button>

        <header className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="text-amber-500" size={20} />
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-amber-500/80">Founding Protocol</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-black italic tracking-tighter uppercase mb-4">
            CREATE <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-600">UNIVERSE</span>
          </h1>
        </header>

        <form onSubmit={handleSubmit} className="space-y-20">
          {/* SECTION 1: IDENTITY */}
          <section className="bg-slate-900/40 backdrop-blur-3xl border border-white/10 rounded-[3rem] p-8 md:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              <div className="lg:col-span-4">
                <label className="block text-[9px] font-black uppercase text-amber-500 mb-4 tracking-widest">01. Syndicate Emblem</label>
                <label className="relative flex flex-col items-center justify-center aspect-square rounded-[2.5rem] border-2 border-dashed border-white/10 bg-slate-950 hover:border-amber-500/50 cursor-pointer transition-all overflow-hidden group">
                  {logoFile ? (
                    <img src={URL.createObjectURL(logoFile)} className="w-full h-full object-cover" alt="Logo" />
                  ) : (
                    <div className="text-center p-6">
                      <Upload size={32} className="text-slate-700 group-hover:text-amber-500 transition-colors mx-auto mb-4" />
                      <p className="text-[8px] font-black text-slate-600 uppercase">Upload Vector</p>
                    </div>
                  )}
                  <input type="file" className="hidden" accept="image/*" onChange={(e) => setLogoFile(e.target.files[0])} />
                </label>
              </div>
              
              <div className="lg:col-span-8 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <label className="text-[9px] font-black uppercase text-slate-500">Collective Name</label>
                    <input required placeholder="E.g. NEXUS ALPHA" className="w-full bg-slate-950 border border-white/10 rounded-2xl p-5 text-white outline-none focus:border-amber-500 font-bold" 
                      onChange={(e) => setFormData({...formData, name: e.target.value.toUpperCase()})} />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[9px] font-black uppercase text-slate-500">Call Sign (Slogan)</label>
                    <input required placeholder="Future is Now" className="w-full bg-slate-950 border border-white/10 rounded-2xl p-5 text-white outline-none focus:border-amber-500"
                      onChange={(e) => setFormData({...formData, slogan: e.target.value})} />
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-[9px] font-black uppercase text-slate-500">Intel Summary</label>
                  <textarea required rows={3} placeholder="Define your collective's core mission..." className="w-full bg-slate-950 border border-white/10 rounded-3xl p-6 text-white outline-none focus:border-amber-500 resize-none"
                    onChange={(e) => setFormData({...formData, description: e.target.value})} />
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 2: THE VISUAL SERVICE BLUEPRINT (WYSIWYG) */}
          <section className="space-y-8">
            <div className="flex justify-between items-end">
              <div>
                <label className="text-[9px] font-black uppercase text-amber-500 tracking-widest">02. Operational Services</label>
                <p className="text-sm text-slate-500 mt-2 font-medium">Design your service cards as they will appear in your universe.</p>
              </div>
              <button 
                type="button" 
                onClick={addServiceSlot}
                disabled={formData.services.length >= 5}
                className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 rounded-xl hover:border-amber-500/50 hover:bg-amber-500/5 transition-all text-[10px] font-black uppercase tracking-widest disabled:opacity-30"
              >
                <Plus size={14} /> Add Service Card
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence>
                {formData.services.map((service, index) => (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    key={index}
                    className="group relative p-8 rounded-[2rem] bg-gradient-to-br from-slate-900 to-slate-950 border border-white/10 hover:border-amber-500/30 transition-all shadow-xl"
                  >
                    <button 
                      type="button" 
                      onClick={() => removeService(index)}
                      className="absolute top-4 right-4 p-2 bg-red-500/10 text-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500 hover:text-white"
                    >
                      <X size={14} />
                    </button>
                    
                    <div className="mb-6 w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center text-amber-500">
                      <Briefcase size={20} />
                    </div>

                    <input 
                      value={service.title}
                      onChange={(e) => updateService(index, 'title', e.target.value.toUpperCase())}
                      placeholder="SERVICE TITLE"
                      className="w-full bg-transparent border-none text-xl font-black italic tracking-tighter text-white placeholder:text-slate-800 outline-none mb-3 uppercase"
                    />

                    <textarea 
                      value={service.description}
                      onChange={(e) => updateService(index, 'description', e.target.value)}
                      placeholder="Brief operational description of this specific service..."
                      className="w-full bg-transparent border-none text-sm text-slate-400 placeholder:text-slate-800 outline-none resize-none h-24 leading-relaxed"
                    />
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Ghost Slot for Guidance */}
              {formData.services.length < 5 && (
                <button 
                  type="button"
                  onClick={addServiceSlot}
                  className="group min-h-[250px] border-2 border-dashed border-white/5 rounded-[2rem] flex flex-col items-center justify-center gap-4 hover:border-white/20 hover:bg-white/[0.02] transition-all"
                >
                  <div className="p-4 rounded-full bg-white/5 text-slate-700 group-hover:text-amber-500 transition-colors">
                    <Plus size={32} />
                  </div>
                  <span className="text-[10px] font-black uppercase text-slate-700 tracking-widest group-hover:text-slate-400 transition-colors">Initialize Slot 0{formData.services.length + 1}</span>
                </button>
              )}
            </div>
          </section>

          {/* SECTION 3: RECRUITMENT */}
          <section className="space-y-8 pt-10 border-t border-white/5">
            <div className="flex justify-between items-end">
              <div>
                <label className="text-[9px] font-black uppercase text-amber-500 tracking-widest">03. Strike Team</label>
                <p className="text-sm text-slate-500 mt-2 font-medium">Recruit up to 5 verified operatives.</p>
              </div>
            </div>

            <div className="relative">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
              <input 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Scan for operatives..." 
                className="w-full bg-slate-900 border border-white/10 rounded-2xl p-6 pl-14 text-white outline-none focus:border-amber-500" 
              />
              {searchResults.length > 0 && (
                <div className="absolute top-full left-0 w-full bg-slate-900 border border-white/10 mt-4 rounded-3xl overflow-hidden z-[50] shadow-2xl">
                  {searchResults.map(u => (
                    <button key={u._id} type="button" onClick={() => addMember(u)} className="w-full flex items-center gap-4 p-5 hover:bg-white/5 transition-all border-b border-white/5 last:border-0">
                      <img src={getImageUrl(u.identityImage)} className="w-12 h-12 rounded-xl object-cover" alt="" />
                      <div className="text-left flex-1">
                        <p className="text-sm font-bold text-white uppercase">{u.name}</p>
                        <p className="text-[9px] text-slate-500 font-black uppercase tracking-widest">{u.speciality}</p>
                      </div>
                      <UserPlus size={18} className="text-amber-500" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {formData.members.map(m => (
                <div key={m._id} className="relative group p-4 bg-white/5 border border-white/10 rounded-2xl flex flex-col items-center text-center gap-3">
                  <img src={getImageUrl(m.identityImage)} className="w-16 h-16 rounded-2xl object-cover" alt="" />
                  <p className="text-[10px] font-black text-white uppercase">{m.name}</p>
                  <button type="button" onClick={() => setFormData({...formData, members: formData.members.filter(mem => mem._id !== m._id)})} className="absolute -top-2 -right-2 p-1 bg-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"><X size={10}/></button>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION 4: PORTAL ASSETS */}
          <section className="bg-slate-900/40 border border-white/10 rounded-[3rem] p-10">
            <label className="text-[9px] font-black uppercase text-amber-500 tracking-widest mb-6 block">04. Portal Visual Background</label>
            <label className="flex items-center gap-6 p-8 bg-slate-950 border border-white/5 rounded-[2rem] cursor-pointer hover:bg-slate-900 transition-all group">
              <div className="p-4 rounded-2xl bg-white/5 text-amber-500 group-hover:scale-110 transition-transform"><ImageIcon /></div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-white uppercase">{bgFile ? bgFile.name : "Select 4K Portal Background"}</span>
                <span className="text-[8px] text-slate-600 font-black uppercase tracking-widest mt-1">Hero visual for your syndicate universe</span>
              </div>
              <input type="file" className="hidden" accept="image/*" onChange={(e) => setBgFile(e.target.files[0])} />
            </label>
          </section>

          <button 
            disabled={loading}
            type="submit"
            className="group relative w-full py-10 bg-gradient-to-r from-amber-600 to-amber-500 text-black font-black uppercase tracking-[0.5em] text-sm rounded-[3rem] hover:scale-[1.01] active:scale-[0.98] transition-all shadow-[0_20px_50px_rgba(245,158,11,0.2)] disabled:opacity-50"
          >
            {loading ? "INITIALIZING GRID..." : "DEPLOY GLOBAL SYNDICATE"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateCollective;