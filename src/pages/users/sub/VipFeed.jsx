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
    <div className="px-3 md:px-6 lg:px-8 overflow-hidden mx-auto space-y-8 md:space-y-12 pt-4 transition-all duration-700 w-full max-w-7xl relative">
      
      {/* Background Glows */}
      <div className="absolute top-[-5%] left-[-10%] w-full h-[300px] md:h-[500px] bg-amber-500/5 rounded-full blur-[80px] md:blur-[120px] -z-10 animate-pulse" />
      <div className="absolute bottom-[20%] right-[-5%] w-full h-[250px] md:h-[400px] bg-blue-500/5 rounded-full blur-[60px] md:blur-[100px] -z-10" />

      {/* Hero Section */}
      <section className="relative group w-full">
        <div className="absolute -inset-1 bg-gradient-to-r from-amber-600 via-amber-300 to-amber-700 rounded-[2rem] md:rounded-[3.5rem] blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>
        <div className="relative bg-slate-950/80 backdrop-blur-3xl p-4 md:p-7 rounded-[1.8rem] md:rounded-[3.2rem] border border-white/5 overflow-hidden shadow-2xl">
          
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6 md:gap-8">
            <div className="space-y-3 md:space-y-4 text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start gap-3">
                <div className="bg-amber-500/10 border border-amber-500/20 p-1.5 md:p-2 rounded-lg md:rounded-xl">
                  <Crown size={18} className="text-amber-500" />
                </div>
                <div className="hidden sm:block h-[1px] w-8 md:w-12 bg-amber-500/30" />
                <span className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.3em] md:tracking-[0.5em] text-amber-500/80">Premium Network Access</span>
              </div>
              
              <h1 className="text-3xl sm:text-2xl md:text-5xl font-black text-white uppercase italic tracking-tighter leading-none">
                VIP <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600">SECTOR</span>
              </h1>
            </div>  

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-5">
              {/* Layout Toggle */}
              <div className="flex items-center bg-slate-900/50 p-1 md:p-2 rounded-xl md:rounded-[1.5rem] border border-white/5 backdrop-blur-sm">
                <button 
                  onClick={() => setColCount(1)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg md:rounded-xl transition-all ${colCount === 1 ? 'bg-amber-500 text-black' : 'text-slate-500 hover:text-white'}`}
                >
                  <Square size={14} className="md:w-[16px]" />
                  <span className="text-[9px] font-black uppercase">Focus</span>
                </button>
                <button 
                  onClick={() => setColCount(2)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg md:rounded-xl transition-all ${colCount === 2 ? 'bg-amber-500 text-black' : 'text-slate-500 hover:text-white'}`}
                >
                  <Columns size={14} className="md:w-[16px]" />
                  <span className="text-[9px] font-black uppercase">Grid</span>
                </button>
              </div>

              {/* Action Button */}
              <button 
                onClick={() => setIsModalOpen(true)}
                className="w-full sm:w-auto group relative flex items-center justify-center gap-3 px-8 md:px-10 py-4 md:py-5 bg-white text-black font-black uppercase text-[10px] md:text-[11px] tracking-[0.15em] rounded-xl md:rounded-[1.8rem] overflow-hidden transition-all hover:scale-[1.02] active:scale-95 shadow-xl"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-amber-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <Plus size={16} strokeWidth={4} className="relative z-10" />
                <span className="relative z-10">Broadcast Intel</span>
              </button>
            </div>
          </div>
          <Sparkles className="absolute right-[-20px] bottom-[-20px] md:right-10 md:bottom-10 text-amber-500/10 w-24 h-24 md:w-32 md:h-32" />
        </div>
      </section>

      {/* Feed Grid */}
      <div className={`mx-auto transition-all duration-700 ${colCount === 1 ? 'max-w-3xl' : 'max-w-full'}`}>
        <div className={`grid gap-6 md:gap-10 lg:gap-12 transition-all duration-500 ${colCount === 2 ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'}`}>
            {vipPosts.length > 0 ? (
            vipPosts.map((post, index) => (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  transition={{ delay: index * 0.05 }} 
                  key={post._id} 
                  className="flex w-full group"
                >
                    <div className="w-full relative">
                        <div className="absolute -inset-0.5 bg-gradient-to-b from-amber-500/20 to-transparent rounded-[2rem] md:rounded-[3.2rem] opacity-0 group-hover:opacity-100 transition duration-500" />
                        <VipPostCard post={post} />
                    </div>
                </motion.div>
            ))
            ) : (
            <div className="col-span-full py-24 md:py-40 flex flex-col items-center justify-center bg-slate-900/20 border-2 border-amber-500/10 rounded-[2.5rem] md:rounded-[4rem] border-dashed">
                <Lock size={32} className="text-amber-500/20 mb-6 md:w-[40px]" />
                <p className="text-slate-500 text-[10px] md:text-xs uppercase font-black tracking-[0.4em] text-center px-4">Encrypted Channel Empty</p>
            </div>
            )}
        </div>
      </div>

      {/* Modal System */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} 
              onClick={() => !loading && setIsModalOpen(false)} 
              className="fixed inset-0 bg-slate-950/98 backdrop-blur-xl" 
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 40 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 40 }} 
              className="relative w-full max-w-2xl bg-slate-900 border border-white/10 rounded-[2rem] md:rounded-[3.5rem] p-6 md:p-12 shadow-2xl z-[110] my-auto"
            >
              {/* SUCCESS OVERLAY */}
              <AnimatePresence>
                {showSuccess && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 z-[120] bg-slate-900 rounded-[2rem] md:rounded-[3.5rem] flex flex-col items-center justify-center border-4 border-green-500/20">
                    <div className="bg-green-500/10 p-6 rounded-full mb-6">
                      <CheckCircle2 size={60} className="text-green-500 animate-bounce" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-black text-white uppercase italic tracking-tighter">Broadcast Live</h2>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="flex justify-between items-start mb-6 md:mb-8">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <Zap size={14} className="text-amber-500 fill-amber-500" />
                    <span className="text-[9px] md:text-[10px] font-black text-amber-500 uppercase tracking-[0.3em]">Dispatch Intel</span>
                  </div>
                  <h2 className="text-2xl md:text-4xl font-black text-white uppercase italic tracking-tighter">Deploy <span className="text-amber-500">Intel</span></h2>
                </div>
                <button onClick={() => setIsModalOpen(false)} className="p-2 md:p-3 bg-white/5 rounded-xl md:rounded-2xl text-slate-500 hover:text-white transition-all"><X size={20}/></button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                {user?.role === 'Freelancer' ? (
                  <div className="space-y-4 md:space-y-6">
                    <div className="space-y-2">
                      <label className="text-[9px] md:text-[10px] text-white font-black uppercase tracking-widest flex items-center gap-2">
                        <ShieldCheck size={12} className="text-amber-500" /> Professional Title
                      </label>
                      <input required name="globalService" placeholder="Ex: Senior UI/UX Architect" value={formData.globalService} onChange={handleInputChange} className="w-full bg-slate-950 border border-white/10 rounded-xl md:rounded-2xl p-4 md:p-5 text-white text-xs md:text-sm outline-none focus:border-amber-500 transition-all" />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[9px] md:text-[10px] text-white font-black uppercase tracking-widest">The Value</label>
                      <textarea required minLength={150} maxLength={250} name="serviceDescription" placeholder="Explain your skills (min 150 chars)..." value={formData.serviceDescription} onChange={handleInputChange} className="w-full bg-slate-950 border border-white/10 rounded-xl md:rounded-2xl p-4 md:p-5 text-white text-xs md:text-sm min-h-[100px] outline-none focus:border-amber-500 resize-none" />
                    </div>

                    <div className="space-y-3">
                      <label className="text-[9px] md:text-[10px] text-white font-black uppercase tracking-widest">Portfolios</label>
                      {formData.portfolioLinks.map((link, i) => (
                        <input key={i} required placeholder="https://..." value={link} onChange={(e) => handleLinkChange(i, e.target.value)} className="w-full bg-slate-950 border border-white/5 rounded-lg md:rounded-xl p-3 md:p-4 text-[10px] md:text-xs text-amber-200" />
                      ))}
                      <button type="button" onClick={addLinkField} className="text-[9px] text-amber-500 uppercase font-black">+ Add Link</button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <input required name="brandName" placeholder="Entity Name" value={formData.brandName} onChange={handleInputChange} className="w-full bg-slate-950 border border-white/10 rounded-xl md:rounded-2xl p-4 md:p-5 text-white" />
                    <input required name="brandSocialLink" placeholder="Access Portal (URL)" value={formData.brandSocialLink} onChange={handleInputChange} className="w-full bg-slate-950 border border-white/10 rounded-xl md:rounded-2xl p-4 md:p-5 text-white" />
                    <textarea required name="searchingFor" placeholder="Targeting Requirements..." value={formData.searchingFor} onChange={handleInputChange} className="w-full bg-slate-950 border border-white/10 rounded-xl md:rounded-2xl p-4 md:p-5 text-white min-h-[100px]" />
                  </div>
                )}

                <div className="space-y-2">
                  <label className="text-[9px] md:text-[10px] text-white font-black uppercase tracking-widest">Visual Intel</label>
                  <label className="flex flex-col items-center justify-center p-6 md:p-8 rounded-[1.5rem] md:rounded-[2.5rem] border-2 border-dashed border-white/10 bg-slate-950/50 cursor-pointer hover:border-amber-500/50 transition-all relative overflow-hidden">
                    {previewUrl ? (
                      <div className="relative w-full h-32 md:h-40">
                        {fileType === 'video' ? <video src={previewUrl} className="h-full w-full object-cover rounded-xl" /> : <img src={previewUrl} className="h-full w-full object-cover rounded-xl" alt="Preview" />}
                      </div>
                    ) : (
                      <div className="text-center">
                        <ImageIcon size={24} className="text-amber-500 mx-auto mb-2" />
                        <p className="text-[9px] text-white font-black uppercase">Upload Media</p>
                      </div>
                    )}
                    <input required type="file" accept="image/*,video/*" className="hidden" onChange={handleFileChange} />
                  </label>
                </div>

                <button disabled={loading} className="w-full py-4 md:py-6 bg-white text-black font-black uppercase tracking-[0.2em] text-[11px] md:text-[12px] rounded-xl md:rounded-[2rem] hover:scale-[1.01] active:scale-95 transition-all">
                  {loading ? "Synchronizing..." : "Initiate Broadcast"}
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