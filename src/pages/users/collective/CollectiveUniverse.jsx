import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, Linkedin, Twitter, ShieldCheck } from 'lucide-react';
import { 
  ExternalLink, Rocket, Fingerprint, Award, 
  Globe, Shield, Cpu, Zap, ArrowRight, Target, Briefcase
} from 'lucide-react';

// HELPER: Connects to your backend storage
const getImageUrl = (path) => {
  if (!path) return "https://via.placeholder.com/800";
  if (path.startsWith('http')) return path;
  return `http://localhost:5000${path}`; 
};

const CollectiveUniverse = ({ data = {}, isEditMode = false }) => {
    // --- BACKEND DATA MAPPING ---
    const displayData = {
        name: data.name || "CHRIKI TEAM",
        slogan: data.slogan || "CREATIVE COLLECTIVE. DIGITAL IMPACT.",
        heroBackground: getImageUrl(data.heroBackground),
        logo: getImageUrl(data.logo),
        description: data.description || "We are a multidisciplinary elite force specialized in digital transformation.",
        
        services: data.services?.length > 0 ? data.services : [
            { title: "NEURAL INTERFACE", description: "High-end digital experiences designed for the next generation of the web." },
            { title: "CYBER BRANDING", description: "Establishing dominant visual identities in the global digital landscape." },
            { title: "QUANTUM DEV", description: "Scalable architecture built with precision and futuristic logic." }
        ],

        // ✅ UPDATED TEAM LOGIC: Combine Owner + Members
        members: (() => {
            const list = [];
            
            // 1. Add Owner first
            if (data.owner) {
                list.push({
                    id: data.owner._id,
                    name: data.owner.name,
                    role: data.owner.speciality || "Founding Member",
                    badge: "Prime",
                    img: getImageUrl(data.owner.identityImage),
                    portfolio: data.owner.portfolioUrl || "#"
                });
            }

            // 2. Add Accepted Members
            if (data.members && data.members.length > 0) {
                data.members.forEach(m => {
                    if (m.user) {
                        list.push({
                            id: m.user._id,
                            name: m.user.name,
                            role: m.user.speciality || "Operative",
                            badge: m.status === 'Accepted' ? "Elite" : "Pending",
                            img: getImageUrl(m.user.identityImage),
                            portfolio: m.user.portfolioUrl || "#"
                        });
                    }
                });
            }

            // Fallback if empty
            return list.length > 0 ? list : [
                { id: 1, name: "Neural Operative", role: "Scanning...", badge: "Void", img: "https://i.pravatar.cc/150?u=1", portfolio: "#" }
            ];
        })(),

        lastWorks: data.lastWorks?.length > 0 ? data.lastWorks.map(p => ({
            url: getImageUrl(p.image),
            title: p.title,
            link: p.link || "#"
        })) : [
            { url: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?q=80&w=687&auto=format&fit=crop" },
            { url: "https://images.unsplash.com/photo-1633167606207-d840b5070fc2?auto=format&fit=crop" }
        ]
    };

    return (
        <div className="relative min-h-screen bg-[#020617] text-white selection:bg-amber-500/30 overflow-x-hidden font-sans">
            
            <div className="fixed inset-0 z-[100] pointer-events-none opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

            {/* --- 1. HERO SECTION --- */}
            <section className="relative h-[110vh] w-full flex items-center justify-center overflow-hidden">
                <motion.div 
                    initial={{ scale: 1.2, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 2, ease: "easeOut" }}
                    className="absolute inset-0 z-0"
                >
                    <img 
                        src={displayData.heroBackground} 
                        className="w-full h-full object-cover grayscale-[0.3] brightness-50" 
                        alt="Background"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#020617]/80 to-[#020617]" />
                </motion.div>

                <div className="relative z-10 text-center px-4 max-w-7xl mx-auto">
                    <motion.div 
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="flex flex-col items-center"
                    >
                        <div className="relative group mb-12">
                            <div className="absolute inset-0 rounded-[3rem] bg-amber-500 blur-2xl opacity-20 group-hover:opacity-40 transition-opacity" />
                            <div className="relative w-32 h-32 md:w-44 md:h-44 p-1 rounded-[3rem] bg-gradient-to-tr from-white/20 to-transparent backdrop-blur-3xl overflow-hidden shadow-2xl border border-white/10">
                                <img src={displayData.logo} className="w-full h-full object-cover rounded-[2.8rem]" alt="Logo" />
                            </div>
                        </div>

                        <h1 className="text-6xl md:text-[10rem] font-black uppercase tracking-tighter italic leading-[0.8] mb-6 drop-shadow-2xl">
                            {displayData.name.split(' ')[0]}
                            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-500 to-amber-800">
                                {displayData.name.split(' ').slice(1).join(' ') || "SYNDICATE"}
                            </span>
                        </h1>

                        <div className="flex items-center gap-4 mb-12">
                            <div className="h-[1px] w-12 bg-amber-500/50" />
                            <p className="text-amber-500 font-black tracking-[0.8em] uppercase text-[10px] md:text-xs">
                                {displayData.slogan}
                            </p>
                            <div className="h-[1px] w-12 bg-amber-500/50" />
                        </div>

                        <div className="flex flex-col md:flex-row gap-6">
                            <button className="relative group px-12 py-6 overflow-hidden rounded-2xl bg-white text-black font-black uppercase text-xs tracking-widest transition-all">
                                <span className="relative z-10 flex items-center gap-3">
                                    Initiate Project <Rocket size={16} />
                                </span>
                                <div className="absolute inset-0 bg-amber-500 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                            </button>
                            {isEditMode && (
                                <button className="px-8 py-4 rounded-xl border border-amber-500/50 text-amber-500 font-bold text-[10px] uppercase tracking-widest hover:bg-amber-500/10 transition-all">
                                    Admin Dashboard
                                </button>
                            )}
                        </div>
                    </motion.div>
                </div>
                
                <div className="absolute bottom-10 left-10 hidden lg:block">
                    <div className="flex flex-col gap-2">
                        <span className="text-[8px] font-black text-white/30 tracking-[0.4em] uppercase">Collective_Protocol</span>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                            <span className="text-[10px] font-bold text-amber-500 uppercase tracking-widest">Live_On_Grid</span>
                        </div>
                    </div>
                </div>
            </section>

            <div className="container mx-auto px-6 md:px-12 space-y-60 py-40">
                
                {/* --- 2. ABOUT US --- */}
                <section className="grid lg:grid-cols-2 gap-24 items-center">
                    <div className="order-2 lg:order-1">
                        <div className="relative rounded-[4rem] overflow-hidden group border border-white/5">
                            <div className="absolute inset-0 bg-amber-500/20 mix-blend-overlay group-hover:opacity-0 transition-opacity duration-700" />
                            <img src={displayData.lastWorks[0]?.url} className="w-full aspect-[4/5] object-cover scale-110 group-hover:scale-100 transition-transform duration-1000" alt="Process" />
                            <div className="absolute bottom-8 left-8 right-8 p-8 backdrop-blur-2xl bg-black/40 border border-white/10 rounded-[2rem]">
                                <div className="flex justify-between items-center">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-amber-500">Operation_Summary</p>
                                    <Target size={16} className="text-amber-500" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="order-1 lg:order-2 space-y-10">
                        <div className="flex items-center gap-4">
                            <Fingerprint className="text-amber-500" size={32} />
                            <div className="h-px w-20 bg-white/10" />
                            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-500">Syndicate_ID</span>
                        </div>
                        <h2 className="text-5xl md:text-8xl font-black uppercase italic tracking-tighter leading-none">
                            About Us
                        </h2>
                        <p className="text-slate-400 text-xl leading-relaxed font-light">
                            {displayData.description}
                        </p>
                        
                        <div className="grid grid-cols-2 gap-6 pt-10">
                            {[
                                { icon: <Shield size={20}/>, label: "Security", val: "Lvl_Prime" },
                                { icon: <Cpu size={20}/>, label: "Logic", val: "Neural" },
                                { icon: <Zap size={20}/>, label: "Speed", val: "Turbo" },
                                { icon: <Globe size={20}/>, label: "Region", val: "Decentralized" }
                            ].map((stat, i) => (
                                <div key={i} className="flex items-center gap-4 p-6 bg-white/5 border border-white/5 rounded-3xl hover:border-amber-500/30 transition-all">
                                    <div className="text-amber-500">{stat.icon}</div>
                                    <div>
                                        <p className="text-[8px] uppercase tracking-widest text-slate-500">{stat.label}</p>
                                        <p className="text-lg font-black uppercase italic">{stat.val}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* --- 3. SERVICES --- */}
                <section>
                    <div className="mb-24">
                        <h2 className="text-6xl md:text-8xl font-black uppercase italic tracking-tighter">Operational_Services</h2>
                        <p className="text-amber-500 text-xs font-black uppercase tracking-[0.4em] mt-4">Execution Frameworks & Strategic Delivery</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {displayData.services.map((service, i) => (
                            <motion.div 
                                key={i}
                                whileHover={{ y: -10 }}
                                className="group relative p-10 rounded-[3rem] bg-gradient-to-br from-white/[0.03] to-transparent border border-white/5 hover:border-amber-500/20 transition-all duration-500 backdrop-blur-3xl overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 blur-[50px] rounded-full -mr-16 -mt-16 group-hover:bg-amber-500/10 transition-colors" />
                                
                                <div className="mb-8 w-14 h-14 bg-amber-500/10 rounded-2xl flex items-center justify-center text-amber-500 group-hover:scale-110 transition-transform">
                                    <Briefcase size={24} />
                                </div>

                                <h3 className="text-2xl font-black italic uppercase tracking-tighter mb-4 text-white group-hover:text-amber-500 transition-colors">
                                    {service.title}
                                </h3>

                                <p className="text-slate-400 text-sm leading-relaxed font-medium">
                                    {service.description}
                                </p>

                                <div className="mt-8 flex items-center gap-2 text-white/20 group-hover:text-amber-500 transition-colors">
                                    <div className="h-px w-8 bg-current" />
                                    <span className="text-[9px] font-black uppercase tracking-widest">Protocol_0{i+1}</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* --- 4. THE TEAM (FIXED: OWNER + MEMBERS) --- */}
                <section>
                    <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
                        <div>
                            <h2 className="text-6xl md:text-8xl font-black uppercase italic tracking-tighter">Neural_Operatives</h2>
                            <p className="text-amber-500 text-xs font-black uppercase tracking-[0.4em] mt-4">Unified Strategic Syndicate</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {displayData.members.map((member, i) => (
                            <motion.div 
                                whileHover={{ y: -20 }}
                                key={member.id || i} 
                                className="relative group"
                            >
                                <div className="absolute inset-0 bg-gradient-to-b from-amber-500 to-transparent opacity-0 group-hover:opacity-10 blur-3xl transition-opacity" />
                                <div className="relative bg-white/[0.02] border border-white/5 rounded-[3rem] p-10 overflow-hidden backdrop-blur-sm group-hover:border-amber-500/20 transition-all duration-500">
                                    
                                    <div className="relative w-32 h-32 mx-auto mb-8">
                                        <div className="absolute inset-0 border-2 border-dashed border-amber-500/30 rounded-full animate-[spin_10s_linear_infinite]" />
                                        <img src={member.img} className="absolute inset-2 w-[calc(100%-16px)] h-[calc(100%-16px)] object-cover rounded-full grayscale group-hover:grayscale-0 transition-all duration-700 shadow-2xl" alt={member.name} />
                                    </div>

                                    <div className="text-center space-y-2">
                                        <h3 className="text-2xl font-black uppercase tracking-tight">{member.name}</h3>
                                        <p className="text-amber-500 text-[10px] font-black uppercase tracking-widest">{member.role}</p>
                                    </div>

                                    <a href={member.portfolio} target="_blank" rel="noopener noreferrer" className="mt-10 pt-10 border-t border-white/5 flex justify-between items-center group/link">
                                        <div className="flex items-center gap-2">
                                            <Award size={14} className="text-slate-500" />
                                            <span className="text-[9px] font-black text-slate-500 uppercase">{member.badge}</span>
                                        </div>
                                        <ArrowRight size={20} className="text-white/20 group-hover:text-amber-500 group-hover/link:translate-x-2 transition-all" />
                                    </a>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* --- 5. MISSION ARCHIVE --- */}
                <section className="pb-40">
                    <div className="flex items-center gap-6 mb-16">
                        <h2 className="text-5xl font-black uppercase italic tracking-tighter">Mission_Archive</h2>
                        <div className="flex-1 h-px bg-gradient-to-r from-white/20 to-transparent" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {displayData.lastWorks.map((work, i) => (
                            <a key={i} href={work.link} target="_blank" rel="noopener noreferrer" className="group relative aspect-[4/3] rounded-[3rem] overflow-hidden border border-white/10 cursor-crosshair">
                                <img src={work.url} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 brightness-75 group-hover:brightness-100" alt="Work" />
                                
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 backdrop-blur-[4px] flex flex-col items-center justify-center">
                                    <div className="p-5 bg-amber-500 text-black rounded-full scale-50 group-hover:scale-100 transition-transform duration-500">
                                        <ExternalLink size={24} />
                                    </div>
                                    <p className="mt-4 text-[10px] font-black uppercase tracking-[0.3em] text-amber-500">Decrypt_Project</p>
                                </div>
                            </a>
                        ))}
                    </div>
                </section>
            </div>

            {/* --- FOOTER --- */}
            <footer className="relative border-t border-white/5 py-24 bg-black/60 backdrop-blur-2xl overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />
        
                <div className="container mx-auto px-6 flex flex-col items-center">
                    <div className="flex justify-center gap-8 mb-12">
                        {[
                            { icon: <Instagram size={18} />, label: "Instagram" },
                            { icon: <Twitter size={18} />, label: "Twitter" },
                            { icon: <Linkedin size={18} />, label: "LinkedIn" },
                            { icon: <Globe size={18} />, label: "Network" }
                        ].map((social, i) => (
                            <a 
                                key={i}
                                href="#" 
                                className="p-3 rounded-full bg-white/5 border border-white/10 text-slate-400 hover:text-amber-500 hover:border-amber-500/50 hover:bg-amber-500/5 transition-all duration-300 group"
                            >
                                {social.icon}
                            </a>
                        ))}
                    </div>

                    <div className="flex items-center gap-3 px-6 py-2 bg-emerald-500/5 border border-emerald-500/20 rounded-full mb-8">
                        <ShieldCheck size={14} className="text-emerald-500 animate-pulse" />
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-500/80">
                            Verified by <span className="text-white">Chriki Tn</span>
                        </span>
                    </div>

                    <div className="space-y-4 text-center">
                        <p className="text-[9px] font-black uppercase tracking-[0.6em] text-white/30">
                            Authorized Access Only <span className="text-amber-500/50 mx-2">|</span> © 2026 {displayData.name}
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default CollectiveUniverse;