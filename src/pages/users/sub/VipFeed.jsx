import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Crown, Lock, Plus, X, Zap, 
  Image as ImageIcon, Film, Square, Columns, 
  Sparkles, ShieldCheck, Activity, CheckCircle2, Link as LinkIcon
} from 'lucide-react';

// ✅ UPDATED IMPORTS
import api from '../../../utils/api'; 
import { useAuth } from '../../../context/AuthContext'; 
import VipPostCard from '../../../components/feed/VipPostCard'; 
import { toast } from 'react-hot-toast';

const VipFeed = () => {
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [vipPosts, setVipPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [fileType, setFileType] = useState('image'); 
  
  const [colCount, setColCount] = useState(2);

  const initialFormState = {
    globalService: '',
    serviceDescription: '',
    portfolioLinks: [''],
    brandName: '',
    brandSocialLink: '',
    searchingFor: '',
  };

  const [formData, setFormData] = useState(initialFormState);

  const fetchFeed = async () => {
    try {
      const res = await api.get('/vip/feed');
      setVipPosts(res.data);
    } catch (err) {
      console.error("Transmission Error: Unauthorized Access.");
    }
  };

  useEffect(() => {
    fetchFeed();
  }, []);

  const handleInputChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleLinkChange = (index, value) => {
    const newLinks = [...formData.portfolioLinks];
    newLinks[index] = value;
    setFormData({ ...formData, portfolioLinks: newLinks });
  };

  const addLinkField = () => setFormData({ ...formData, portfolioLinks: [...formData.portfolioLinks, ''] });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const isVideo = file.type.startsWith('video');
    
    if (isVideo) {
      const video = document.createElement('video');
      video.preload = 'metadata';
      video.onloadedmetadata = () => {
        window.URL.revokeObjectURL(video.src);
        if (video.duration > 50.5) { 
          toast.error("Video exceeds 50-second limit.");
          e.target.value = ""; 
          return;
        }
        setFileType('video');
        setImageFile(file);
        setPreviewUrl(URL.createObjectURL(file));
      };
      video.src = URL.createObjectURL(file);
    } else {
      setFileType('image');
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!imageFile) {
        toast.error("Visual Intel Media is required.");
        return;
    }

    if (user?.role === 'Freelancer' && formData.serviceDescription.length < 150) {
        toast.error("Intel Summary must be at least 150 characters.");
        return;
    }

    setLoading(true);
    const data = new FormData();
    data.append('intelImage', imageFile);
    const currentRole = user?.role || 'Simple';
    data.append('intelType', currentRole);

    if (currentRole === 'Freelancer') {
      data.append('globalService', formData.globalService);
      data.append('serviceDescription', formData.serviceDescription);
      const validLinks = formData.portfolioLinks.filter(link => link.trim() !== "");
      data.append('portfolioLinks', JSON.stringify(validLinks));
    } else {
      data.append('brandName', formData.brandName || user?.name || "Elite Entity");
      data.append('brandSocialLink', formData.brandSocialLink);
      data.append('searchingFor', formData.searchingFor);
    }

    try {
      await api.post('/vip/create', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      // Professional Success Sequence
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        setIsModalOpen(false);
        setImageFile(null);
        setPreviewUrl(null);
        setFormData(initialFormState);
        fetchFeed();
      }, 2500);

    } catch (err) {
      toast.error(err.response?.data?.msg || "Broadcast Failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" p-2 overflow-hidden mx-auto space-y-12 pt-4 transition-all duration-700 w-full max-w-7xl relative ">
      
      <div className=" absolute top-[-10%] left-[-10%] w-full h-[500px] bg-amber-500/5 rounded-full blur-[120px] -z-10 animate-pulse" />
      <div className="absolute bottom-[20%] right-[-5%] w-full h-[400px] bg-blue-500/5 rounded-full blur-[100px] -z-10" />

      <section className="relative group w-full">
        <div className="absolute -inset-1 bg-gradient-to-r from-amber-600 via-amber-300 to-amber-700 rounded-[3.5rem] blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
        <div className="relative bg-slate-950/80 backdrop-blur-3xl p-10 rounded-[3.2rem] border border-white/5 overflow-hidden shadow-2xl">
          
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="bg-amber-500/10 border border-amber-500/20 p-2 rounded-xl">
                  <Crown size={20} className="text-amber-500" />
                </div>
                <div className="h-[1px] w-12 bg-amber-500/30" />
                <span className="text-[10px] font-black uppercase tracking-[0.5em] text-amber-500/80">Premium Network Access</span>
              </div>
              
              <h1 className="text-5xl md:text-6xl font-black text-white uppercase italic tracking-tighter leading-none">
                VIP <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600">SECTOR</span>
              </h1>
              <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
                
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-5">
              <div className="flex items-center bg-slate-900/50 p-2 rounded-[1.5rem] border border-white/5 backdrop-blur-sm shadow-inner">
                <button 
                  onClick={() => setColCount(1)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${colCount === 1 ? 'bg-amber-500 text-black' : 'text-slate-500 hover:text-white'}`}
                >
                  <Square size={16} />
                  <span className="text-[9px] font-black uppercase">Focus</span>
                </button>
                <button 
                  onClick={() => setColCount(2)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${colCount === 2 ? 'bg-amber-500 text-black' : 'text-slate-500 hover:text-white'}`}
                >
                  <Columns size={16} />
                  <span className="text-[9px] font-black uppercase">Grid</span>
                </button>
              </div>

              <button 
                onClick={() => setIsModalOpen(true)}
                className="group relative flex items-center gap-3 px-10 py-5 bg-white text-black font-black uppercase text-[11px] tracking-[0.2em] rounded-[1.8rem] overflow-hidden transition-all hover:scale-[1.02] active:scale-95 shadow-[0_20px_40px_rgba(255,255,255,0.1)]"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-amber-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <Plus size={18} strokeWidth={4} className="relative z-10" />
                <span className="relative z-10">Broadcast Intel</span>
              </button>
            </div>
          </div>
          <Sparkles className="absolute right-10 bottom-10 text-amber-500/10 w-32 h-32" />
        </div>
      </section>

      <div className={`mx-auto transition-all duration-700 ${colCount === 1 ? 'max-w-3xl' : 'max-w-full'}`}>
        <div className={`grid gap-10 transition-all duration-500 ${colCount === 2 ? 'md:grid-cols-2 lg:gap-12' : 'grid-cols-1'}`}>
            {vipPosts.length > 0 ? (
            vipPosts.map((post, index) => (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }} key={post._id} className="flex w-full group">
                    <div className="w-full relative">
                        <div className="absolute -inset-0.5 bg-gradient-to-b from-amber-500/20 to-transparent rounded-[3.2rem] opacity-0 group-hover:opacity-100 transition duration-500" />
                        <VipPostCard post={post} />
                    </div>
                </motion.div>
            ))
            ) : (
            <div className="col-span-full py-40 flex flex-col items-center justify-center bg-slate-900/20 border-2 border-amber-500/10 rounded-[4rem] border-dashed">
                <Lock size={40} className="text-amber-500/20 mb-6" />
                <p className="text-slate-500 text-xs uppercase font-black tracking-[0.4em]">Encrypted Channel Empty</p>
            </div>
            )}
        </div>
      </div>

      {/* 🚀 ELITE MODAL SYSTEM */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 overflow-y-auto">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} 
              onClick={() => !loading && setIsModalOpen(false)} 
              className="fixed inset-0 bg-slate-950/98 backdrop-blur-xl" 
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 40 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 40 }} 
              className="relative w-full max-w-2xl bg-slate-900 border border-white/10 rounded-[3.5rem] p-8 md:p-12 shadow-[0_0_100px_rgba(0,0,0,0.8)] z-[110] my-auto"
            >
              {/* SUCCESS OVERLAY */}
              <AnimatePresence>
                {showSuccess && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 z-[120] bg-slate-900 rounded-[3.5rem] flex flex-col items-center justify-center border-4 border-green-500/20">
                    <div className="bg-green-500/10 p-6 rounded-full mb-6">
                      <CheckCircle2 size={80} className="text-green-500 animate-bounce" />
                    </div>
                    <h2 className="text-3xl font-black text-white uppercase italic tracking-tighter">Broadcast Live</h2>
                    <p className="text-green-500/60 text-[10px] font-black uppercase tracking-[0.4em] mt-2">Protocol Successfully Executed</p>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="flex justify-between items-start mb-8">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <Zap size={16} className="text-amber-500 fill-amber-500" />
                    <span className="text-[10px] font-black text-amber-500 uppercase tracking-[0.3em]">VIP Intelligence Dispatch</span>
                  </div>
                  <h2 className="text-4xl font-black text-white uppercase italic tracking-tighter">Deploy <span className="text-amber-500">Intel</span></h2>
                </div>
                <button onClick={() => setIsModalOpen(false)} className="p-3 bg-white/5 rounded-2xl text-slate-500 hover:text-white hover:bg-red-500/20 transition-all"><X size={24}/></button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {user?.role === 'Freelancer' ? (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] text-white font-black uppercase tracking-widest flex items-center gap-2">
                          <ShieldCheck size={12} className="text-amber-500" /> 01. Professional Title
                        </label>
                        <input required maxLength={150} name="globalService" placeholder="Ex: Senior UI/UX Architect & Brand Strategist" value={formData.globalService} onChange={handleInputChange} className="w-full bg-slate-950 border border-white/10 rounded-2xl p-5 text-white text-sm outline-none focus:border-amber-500 transition-all placeholder:text-slate-700" />
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <label className="text-[10px] text-white font-black uppercase tracking-widest flex items-center gap-2">
                             <Zap size={12} className="text-amber-500" /> 02. Why choose you? (The Value)
                          </label>
                          <span className={`text-[9px] font-mono ${formData.serviceDescription.length < 150 ? 'text-red-500' : 'text-green-500'}`}>
                            {formData.serviceDescription.length}/250
                          </span>
                        </div>
                        <textarea required minLength={150} maxLength={250} name="serviceDescription" placeholder="Explain your elite skills and what makes your work superior to others. Be direct and professional." value={formData.serviceDescription} onChange={handleInputChange} className="w-full bg-slate-950 border border-white/10 rounded-2xl p-5 text-white text-sm min-h-[120px] outline-none focus:border-amber-500 resize-none transition-all placeholder:text-slate-700" />
                        <p className="text-[9px] text-slate-500 italic uppercase font-bold tracking-tighter">Minimum 150 characters required for system verification.</p>
                      </div>

                      <div className="space-y-3">
                        <label className="text-[10px] text-white font-black uppercase tracking-widest flex items-center gap-2">
                          <LinkIcon size={12} className="text-amber-500" /> 03. Portfolio Evidence
                        </label>
                        {formData.portfolioLinks.map((link, i) => (
                          <input key={i} required placeholder="https://yourwork.com/project-alpha" value={link} onChange={(e) => handleLinkChange(i, e.target.value)} className="w-full bg-slate-950 border border-white/5 rounded-xl p-4 text-xs text-amber-200 outline-none focus:border-amber-500/40" />
                        ))}
                        <button type="button" onClick={addLinkField} className="flex items-center gap-2 text-[10px] text-amber-500 font-black uppercase hover:text-white transition-colors">
                          <Plus size={14} /> Add Additional Proof
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-5">
                    <div className="space-y-2">
                        <label className="text-[10px] text-white font-black uppercase tracking-widest">Entity Name</label>
                        <input required maxLength={150} name="brandName" placeholder="Elite Brand Name" value={formData.brandName} onChange={handleInputChange} className="w-full bg-slate-950 border border-white/10 rounded-2xl p-5 text-white text-sm outline-none focus:border-amber-500" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] text-white font-black uppercase tracking-widest">Access Portal (URL)</label>
                        <input required name="brandSocialLink" placeholder="https://instagram.com/brand" value={formData.brandSocialLink} onChange={handleInputChange} className="w-full bg-slate-950 border border-white/10 rounded-2xl p-5 text-white text-sm outline-none focus:border-amber-500" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] text-white font-black uppercase tracking-widest">Targeting Requirements</label>
                        <textarea required name="searchingFor" placeholder="Describe the specific talent or service your brand is hunting for..." value={formData.searchingFor} onChange={handleInputChange} className="w-full bg-slate-950 border border-white/10 rounded-2xl p-5 text-white text-sm min-h-[120px] outline-none focus:border-amber-500 resize-none" />
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <label className="text-[10px] text-white font-black uppercase tracking-widest flex items-center gap-2">
                    <ImageIcon size={12} className="text-amber-500" /> 04. Visual Identity (Required)
                  </label>
                  <label className="flex flex-col items-center justify-center p-8 rounded-[2.5rem] border-2 border-dashed border-white/10 bg-slate-950/50 cursor-pointer hover:border-amber-500/50 hover:bg-slate-950 transition-all group overflow-hidden relative">
                    {previewUrl ? (
                      <div className="relative w-full h-40">
                        {fileType === 'video' ? <video src={previewUrl} className="h-full w-full object-cover rounded-2xl" /> : <img src={previewUrl} className="h-full w-full object-cover rounded-2xl" alt="Preview" />}
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity uppercase text-[10px] font-black text-white">Change Media</div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-4 py-4">
                        <div className="flex -space-x-3">
                           <div className="p-4 bg-slate-900 rounded-full border border-white/10 group-hover:scale-110 transition-transform"><ImageIcon size={24} className="text-amber-500" /></div>
                           <div className="p-4 bg-slate-900 rounded-full border border-white/10 group-hover:scale-110 transition-transform"><Film size={24} className="text-amber-500" /></div>
                        </div>
                        <div className="text-center">
                          <p className="text-[11px] text-white font-black uppercase tracking-[0.2em]">Upload High-Resolution Intel</p>
                          <p className="text-[9px] text-slate-600 font-bold uppercase mt-1">4K Image or MP4 (Max 50s)</p>
                        </div>
                      </div>
                    )}
                    <input required type="file" accept="image/*,video/*" className="hidden" onChange={handleFileChange} />
                  </label>
                </div>

                <button disabled={loading} className="relative w-full py-6 bg-white text-black font-black uppercase tracking-[0.4em] text-[12px] rounded-[2rem] transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50 overflow-hidden group shadow-[0_20px_40px_rgba(255,255,255,0.1)]">
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-amber-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                  <span className="relative z-10 group-hover:text-black">{loading ? "Synchronizing..." : "Initiate Global Broadcast"}</span>
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default VipFeed;