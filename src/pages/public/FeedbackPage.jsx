import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, Star, Plus, X, Upload, User, Mail, MessageSquare, ShieldCheck, ChevronRight } from 'lucide-react';

const testimonials = [
  {
    name: "Sami Ben Ali",
    role: "Founder",
    text: "I had an idea for a Tunisian logistics app but no team. Within 48 hours of Admin approval, I matched with a senior developer.",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sami"
  },
  {
    name: "Leila Mansour",
    role: "Verified Freelancer",
    text: "The VIP feed is a game changer. No more bidding against bots. Every client here is verified and serious about building.",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Leila"
  },
  {
    name: "Global Tech Tunis",
    role: "Brand Partner",
    text: "The biometric security gives us peace of mind. We found our lead UI designer through Chriki TN. High trust, high quality.",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Brand"
  }
];

const Feedback = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [preview, setPreview] = useState(null);

  const EliteInput = ({ icon: Icon, label, area, ...props }) => (
    <div className="space-y-1 group">
      <label className="text-[9px] font-black text-slate-500 uppercase ml-2 tracking-[0.2em] group-focus-within:text-blue-500 transition-colors">
        {label}
      </label>
      <div className="relative overflow-hidden rounded-xl border border-white/5 bg-slate-950/50 group-focus-within:border-blue-500/50 transition-all">
        <Icon className="absolute left-4 top-4 text-slate-500 group-focus-within:text-blue-500 transition-colors" size={16} />
        {area ? (
          <textarea {...props} className="w-full bg-transparent pl-12 pr-4 py-4 text-white placeholder:text-slate-800 outline-none text-xs min-h-[100px] resize-none" />
        ) : (
          <input {...props} className="w-full bg-transparent pl-12 pr-4 py-4 text-white placeholder:text-slate-800 outline-none text-xs" />
        )}
        <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-blue-500 group-focus-within:w-full transition-all duration-500" />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-950 pt-32 pb-20 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 text-blue-500 font-black text-[10px] uppercase tracking-[0.4em] mb-2">
              <ShieldCheck size={14} /> Verified Protocols
            </div>
            <h2 className="text-4xl lg:text-6xl font-black text-white uppercase tracking-tighter italic leading-none">
              Vetted <span className="text-blue-500">Success</span>
            </h2>
            <p className="text-slate-500 font-bold text-xs uppercase tracking-widest mt-4">
              Real Stories from the Tunisian Alliance
            </p>
          </div>

          <button 
            onClick={() => setIsOpen(true)}
            className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-black uppercase text-[10px] tracking-widest py-4 px-8 rounded-2xl shadow-lg shadow-blue-500/20 transition-all active:scale-95 group"
          >
            <Plus size={16} className="group-hover:rotate-90 transition-transform duration-300" /> 
            Add Feedback
          </button>
        </div>

        {/* Testimonial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative p-8 rounded-[2.5rem] bg-slate-900/40 border border-white/5 backdrop-blur-3xl hover:border-blue-500/30 transition-all group"
            >
              <div className="absolute top-8 right-8 text-blue-500/10 group-hover:text-blue-500/20 transition-colors">
                <Quote size={48} />
              </div>

              <div className="flex items-center gap-4 mb-8">
                <div className="h-14 w-14 rounded-2xl border border-white/10 overflow-hidden bg-slate-950 p-1">
                  <img src={t.image} alt={t.name} className="w-full h-full object-cover rounded-xl" />
                </div>
                <div>
                  <h4 className="text-white font-black text-sm uppercase tracking-tight">{t.name}</h4>
                  <p className="text-blue-500 text-[9px] font-black uppercase tracking-widest">{t.role}</p>
                </div>
              </div>

              <p className="text-slate-400 text-sm leading-relaxed mb-8 italic">"{t.text}"</p>

              <div className="flex gap-1.5 pt-6 border-t border-white/5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={10} className="fill-blue-600 text-blue-600" />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* FEEDBACK POPUP MODAL */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="w-full max-w-xl bg-slate-900 border border-white/10 rounded-[3rem] p-8 md:p-12 relative z-10 shadow-2xl"
            >
              <div className="flex justify-between items-start mb-10">
                <div>
                  <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter">Submit <span className="text-blue-500">Report</span></h3>
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-1">Share your experience</p>
                </div>
                <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/5 rounded-full transition-colors text-slate-500">
                  <X size={20}/>
                </button>
              </div>

              <form className="space-y-6">
                {/* Image Input */}
                <div className="flex flex-col items-center mb-6">
                  <div className="relative group cursor-pointer">
                    <div className="w-24 h-24 rounded-3xl bg-slate-950 border-2 border-dashed border-white/10 flex items-center justify-center overflow-hidden transition-all group-hover:border-blue-500/50">
                      {preview ? (
                        <img src={preview} className="w-full h-full object-cover" alt="Preview" />
                      ) : (
                        <Upload className="text-slate-700" size={24} />
                      )}
                      <input 
                        type="file" 
                        className="absolute inset-0 opacity-0 cursor-pointer" 
                        onChange={(e) => setPreview(URL.createObjectURL(e.target.files[0]))} 
                      />
                    </div>
                    <div className="absolute -bottom-2 -right-2 bg-blue-600 p-2 rounded-xl shadow-lg">
                      <Plus size={12} className="text-white" />
                    </div>
                  </div>
                  <span className="text-[9px] font-black text-slate-600 uppercase tracking-[0.2em] mt-3">Select Identity Image</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <EliteInput icon={User} label="Full Name" placeholder="Ahmed Aziz" />
                  <EliteInput icon={Mail} label="Email Protocol" placeholder="aziz@alliance.tn" />
                </div>

                <EliteInput area icon={MessageSquare} label="Your Feedback" placeholder="Briefly describe your success story..." />

                <button 
                  type="button"
                  className="w-full py-4 bg-blue-600 text-white font-black uppercase tracking-[0.2em] rounded-2xl shadow-xl shadow-blue-500/20 hover:bg-blue-500 transition-all flex items-center justify-center gap-2 group"
                >
                  Broadcast Intelligence <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform"/>
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Feedback;