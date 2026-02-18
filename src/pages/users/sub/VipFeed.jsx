import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Crown, Lock, Plus, X, Zap, 
  Image as ImageIcon, Film, LayoutGrid, columns, Grid2X2, Grid3X3
} from 'lucide-react';

// ✅ UPDATED IMPORTS
import api from '../../../utils/api'; 
import { useAuth } from '../../../context/AuthContext'; 
import VipPostCard from '../../../components/feed/VipPostCard'; 
import { toast } from 'react-hot-toast';

const VipFeed = () => {
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [vipPosts, setVipPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [fileType, setFileType] = useState('image'); 
  
  // 🎚️ NEW: Column State (Desktop only)
  const [colCount, setColCount] = useState(3);

  const initialFormState = {
    globalService: '',
    serviceDescription: '',
    portfolioLinks: [''],
    brandName: '',
    brandSocialLink: '',
    searchingFor: '',
  };

  const [formData, setFormData] = useState(initialFormState);

  // 1. Fetch Feed
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
    setLoading(true);

    const data = new FormData();
    if (imageFile) data.append('intelImage', imageFile);
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
      
      toast.success("Intel Broadcasted Successfully.");
      setIsModalOpen(false);
      setImageFile(null);
      setPreviewUrl(null);
      setFormData(initialFormState);
      fetchFeed();
    } catch (err) {
      console.error("Submission Error:", err);
      toast.error(err.response?.data?.msg || "Broadcast Failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    // 🌍 UPDATED: Container width now expands for Grid View
    <div className={`mx-auto space-y-10 pb-32 px-4 pt-6 transition-all duration-500 ${colCount === 3 ? 'max-w-7xl' : 'max-w-5xl'}`}>
      
      {/* ELITE VIP HEADER */}
      <div className="relative p-1 rounded-[3rem] bg-gradient-to-br from-amber-600 via-amber-300 to-amber-700 shadow-2xl">
        <div className="bg-slate-950 p-8 rounded-[2.8rem] relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-amber-500">
                <Crown size={18} />
                <span className="text-[10px] font-black uppercase tracking-[0.4em]">Elite Protocol</span>
              </div>
              <h1 className="text-4xl font-black text-white uppercase italic tracking-tighter">
                VIP <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-500">INTEL</span>
              </h1>
            </div>

            <div className="flex items-center gap-4">
              {/* 🕹️ NEW: GRID CONTROLS (Hidden on mobile) */}
              <div className="hidden md:flex items-center bg-white/5 p-1.5 rounded-2xl border border-white/10 gap-1">
                <button 
                  onClick={() => setColCount(2)}
                  className={`p-2 rounded-xl transition-all ${colCount === 2 ? 'bg-amber-500 text-black' : 'text-slate-500 hover:text-white'}`}
                >
                  <Grid2X2 size={18} />
                </button>
                <button 
                  onClick={() => setColCount(3)}
                  className={`p-2 rounded-xl transition-all ${colCount === 3 ? 'bg-amber-500 text-black' : 'text-slate-500 hover:text-white'}`}
                >
                  <Grid3X3 size={18} />
                </button>
              </div>

              <button 
                onClick={() => setIsModalOpen(true)}
                className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-amber-600 to-amber-400 text-black font-black uppercase text-[11px] tracking-widest rounded-2xl hover:scale-105 transition-transform shadow-lg"
              >
                <Plus size={16} strokeWidth={4} />
                Deploy Intel
              </button>
            </div>
          </div>
          <Zap className="absolute right-[-20px] top-[-20px] text-amber-500/5 w-40 h-40 rotate-12" />
        </div>
      </div>

      {/* 🚀 UPDATED: FEED GRID SYSTEM */}
      <div className={`grid gap-6 ${colCount === 3 ? 'md:grid-cols-3' : 'md:grid-cols-2'} grid-cols-1`}>
        {vipPosts.length > 0 ? (
          vipPosts.map(post => <VipPostCard key={post._id} post={post} />)
        ) : (
          <div className="col-span-full py-24 flex flex-col items-center justify-center border-2 border-amber-500/10 rounded-[3rem] border-dashed">
             <Lock size={32} className="text-amber-900/30 mb-4" />
             <p className="text-slate-500 text-[10px] uppercase font-black tracking-widest">No Active Broadcasts Found</p>
          </div>
        )}
      </div>

      {/* MODAL FORM (No changes to logic here) */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => !loading && setIsModalOpen(false)} className="absolute inset-0 bg-slate-950/90 backdrop-blur-xl" />
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="relative w-full max-w-lg bg-slate-900 border border-amber-500/30 rounded-[3rem] p-8 overflow-hidden max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-sm font-black text-white uppercase tracking-widest italic">Initialize {user?.role} Broadcast</h2>
                <button onClick={() => setIsModalOpen(false)} className="text-slate-500 hover:text-white"><X size={20}/></button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {user?.role === 'Freelancer' ? (
                  <div className="space-y-4">
                    <input required name="globalService" placeholder="Primary Service" value={formData.globalService} onChange={handleInputChange} className="w-full bg-slate-950 border border-white/5 rounded-2xl p-4 text-white text-sm outline-none focus:border-amber-500/50" />
                    <textarea required name="serviceDescription" placeholder="Intel Summary..." value={formData.serviceDescription} onChange={handleInputChange} className="w-full bg-slate-950 border border-white/5 rounded-2xl p-4 text-white text-sm min-h-[100px] outline-none focus:border-amber-500/50" />
                    {formData.portfolioLinks.map((link, i) => (
                      <input key={i} placeholder="Link URL" value={link} onChange={(e) => handleLinkChange(i, e.target.value)} className="w-full bg-slate-950 border border-white/5 rounded-xl p-3 text-xs text-amber-200 outline-none" />
                    ))}
                    <button type="button" onClick={addLinkField} className="text-[9px] text-amber-500 font-black uppercase">+ Add Link</button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <input required name="brandName" placeholder="Brand / Entity Name" value={formData.brandName} onChange={handleInputChange} className="w-full bg-slate-950 border border-white/5 rounded-2xl p-4 text-white text-sm outline-none focus:border-amber-500/50" />
                    <input required name="brandSocialLink" placeholder="Portal / Portfolio Link" value={formData.brandSocialLink} onChange={handleInputChange} className="w-full bg-slate-950 border border-white/5 rounded-2xl p-4 text-white text-sm outline-none focus:border-amber-500/50" />
                    <textarea required name="searchingFor" placeholder="Operational Objective..." value={formData.searchingFor} onChange={handleInputChange} className="w-full bg-slate-950 border border-white/5 rounded-2xl p-4 text-white text-sm min-h-[120px] outline-none focus:border-amber-500/50" />
                  </div>
                )}

                <label className="flex flex-col items-center justify-center p-6 rounded-3xl border-2 border-dashed border-white/5 bg-slate-950 cursor-pointer hover:border-amber-500/30 transition-all">
                  {previewUrl ? (
                    fileType === 'video' ? (
                      <video src={previewUrl} className="h-40 w-full object-cover rounded-xl mb-2" controls />
                    ) : (
                      <img src={previewUrl} className="h-40 w-full object-cover rounded-xl mb-2" alt="Preview" />
                    )
                  ) : (
                    <div className="flex flex-col items-center">
                      <div className="flex gap-2 mb-2">
                         <ImageIcon size={24} className="text-slate-700" />
                         <Film size={24} className="text-slate-700" />
                      </div>
                      <span className="text-[10px] text-slate-500 font-black uppercase tracking-[0.2em]">Attach Media (Max 50s)</span>
                    </div>
                  )}
                  <input type="file" accept="image/*,video/*" className="hidden" onChange={handleFileChange} />
                  <span className="mt-2 text-[9px] text-amber-500/50 font-black uppercase tracking-widest">{imageFile ? imageFile.name : "Select File"}</span>
                </label>

                <button disabled={loading} className="w-full py-4 bg-amber-600 text-black font-black uppercase tracking-widest rounded-2xl hover:bg-amber-500 shadow-xl shadow-amber-900/20">
                  {loading ? "Broadcasting..." : "Confirm Deployment"}
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