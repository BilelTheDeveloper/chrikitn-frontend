import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  Instagram, Linkedin, Twitter, ShieldCheck, 
  ExternalLink, Rocket, Fingerprint, Award, 
  Globe, Shield, Cpu, Zap, ArrowRight, Target, Briefcase,
  Terminal, Share2, Box, Activity
} from 'lucide-react';

// HELPER: Connects to your backend storage
const getImageUrl = (path) => {
  if (!path) return "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000&auto=format&fit=crop";
  if (path.startsWith('http')) return path;
  return `http://localhost:5000${path}`; 
};

const CollectiveUniverse = ({ data = {}, isEditMode = false, currentUserEmail = "" }) => {
    const navigate = useNavigate();
    const { id: collectiveId } = useParams(); // Get the ID from the URL for the mission link

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

        members: (() => {
            const list = [];
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
            return list.length > 0 ? list : [
                { id: 1, name: "Scanning Operative", role: "Searching...", badge: "Void", img: "https://i.pravatar.cc/150?u=1", portfolio: "#" }
            ];
        })(),

        lastWorks: data.lastWorks?.length > 0 ? data.lastWorks.map(p => ({
            url: getImageUrl(p.image),
            title: p.title,
            link: p.link || "#"
        })) : [
            { url: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?q=80&w=687&auto=format&fit=crop", title: "Project Alpha" },
            { url: "https://images.unsplash.com/photo-1633167606207-d840b5070fc2?auto=format&fit=crop", title: "Project Beta" }
        ]
    };

    const hasAdminAccess = isEditMode || currentUserEmail === "bilel.thedeveloper@gmail.com";

    // ✅ REDIRECTION LOGIC FOR MISSION
    const handleInitiateMission = () => {
        // Redirects to the request mission page with the collective ID
        navigate(`/main/request-mission/${collectiveId || data._id}`);
    };

    return (
        <div className="relative min-h-screen bg-[#020617] text-white selection:bg-amber-500/30 overflow-x-hidden font-sans">
            
            {/* --- GLOBAL FX LAYER --- */}
            <div className="fixed inset-0 z-[100] pointer-events-none opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
            <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_50%,rgba(245,158,11,0.05),transparent_70%)]" />

            {/* --- 1. THE MONOLITH HERO --- */}
            <section className="relative h-[115vh] w-full flex items-center justify-center overflow-hidden">
                <motion.div 
                    initial={{ scale: 1.4, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 2.5, ease: "easeOut" }}
                    className="absolute inset-0 z-0"
                >
                    <img 
                        src={displayData.heroBackground} 
                        className="w-full h-full object-cover grayscale-[0.5] brightness-[0.3] transition-all duration-1000 group-hover:scale-110" 
                        alt="Background"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#020617]/20 via-[#020617]/80 to-[#020617]" />
                </motion.div>

                {/* Animated HUD Grid */}
                <div className="absolute inset-0 opacity-10 pointer-events-none" 
                     style={{ backgroundImage: `linear-gradient(#ffffff0a 1px, transparent 1px), linear-gradient(90deg, #ffffff0a 1px, transparent 1px)`, backgroundSize: '80px 80px' }} />

                <div className="relative z-10 text-center px-4 max-w-7xl mx-auto">
                    <motion.div 
                        initial={{ opacity: 0, y: 100 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8, duration: 1 }}
                        className="flex flex-col items-center"
                    >
                        {/* Logo Node */}
                        <div className="relative group mb-16">
                            <div className="absolute inset-0 rounded-[3.5rem] bg-amber-500 blur-[80px] opacity-10 group-hover:opacity-30 transition-opacity duration-1000" />
                            <div className="relative w-40 h-40 md:w-56 md:h-56 p-2 rounded-[3.5rem] bg-gradient-to-tr from-white/10 via-white/5 to-transparent backdrop-blur-3xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/10">
                                <img src={displayData.logo} className="w-full h-full object-cover rounded-[3.2rem]" alt="Logo" />
                            </div>
                            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-amber-500 text-black text-[8px] font-black px-4 py-1 rounded-full tracking-[0.3em]">
                                SYNDICATE_ACTIVE
                            </div>
                        </div>

                        <h1 className="text-7xl md:text-[12rem] font-black uppercase tracking-tighter italic leading-[0.75] mb-8 drop-shadow-[0_20px_50px_rgba(0,0,0,1)]">
                            <span className="block opacity-90">{displayData.name.split(' ')[0]}</span>
                            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-500 to-amber-800 animate-pulse-slow">
                                {displayData.name.split(' ').slice(1).join(' ') || "ALLIANCE"}
                            </span>
                        </h1>

                        <div className="flex items-center gap-8 mb-16">
                            <div className="h-[1px] w-24 bg-gradient-to-r from-transparent to-amber-500/50" />
                            <p className="text-amber-500 font-black tracking-[1em] uppercase text-[10px] md:text-sm">
                                {displayData.slogan}
                            </p>
                            <div className="h-[1px] w-24 bg-gradient-to-l from-transparent to-amber-500/50" />
                        </div>

                        <div className="flex flex-col md:flex-row gap-8">
                            <button 
                                onClick={handleInitiateMission}
                                className="relative group px-16 py-8 overflow-hidden rounded-2xl bg-amber-500 text-black font-black uppercase text-xs tracking-[0.3em] transition-all hover:shadow-[0_0_50px_rgba(245,158,11,0.4)]"
                            >
                                <span className="relative z-10 flex items-center gap-4">
                                    Initiate Project <Rocket size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                </span>
                                <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                            </button>
                            
                            {hasAdminAccess && (
                                <button className="group px-10 py-8 rounded-2xl border border-white/10 text-white font-black text-[10px] uppercase tracking-[0.3em] hover:bg-white/5 transition-all">
                                    <span className="flex items-center gap-3">
                                        <Terminal size={16} className="text-amber-500" /> Admin Access
                                    </span>
                                </button>
                            )}
                        </div>
                    </motion.div>
                </div>
            </section>

            <div className="container mx-auto px-6 md:px-12 space-y-72 py-40">
                
                {/* --- 2. INTELLIGENCE (ABOUT) --- */}
                <section className="grid lg:grid-cols-2 gap-32 items-center">
                    <div className="relative order-2 lg:order-1">
                        <div className="absolute -inset-10 bg-amber-500/5 blur-[100px] rounded-full" />
                        <div className="relative rounded-[5rem] overflow-hidden group border border-white/10 shadow-2xl">
                            <div className="absolute inset-0 bg-gradient-to-tr from-[#020617] via-transparent to-transparent z-10 opacity-60" />
                            <img src={displayData.lastWorks[0]?.url} className="w-full aspect-[4/5] object-cover scale-110 group-hover:scale-100 transition-transform duration-[2s]" alt="HQ" />
                            <div className="absolute top-10 left-10 z-20">
                                <div className="bg-black/80 backdrop-blur-xl border border-white/10 p-4 rounded-2xl">
                                    <Activity size={20} className="text-amber-500" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="order-1 lg:order-2 space-y-12">
                        <div className="space-y-4">
                            <div className="flex items-center gap-6">
                                <Fingerprint className="text-amber-500" size={40} />
                                <div className="h-px w-24 bg-gradient-to-r from-amber-500/50 to-transparent" />
                                <span className="text-[11px] font-black uppercase tracking-[0.6em] text-slate-500">Universe_Intel</span>
                            </div>
                            <h2 className="text-6xl md:text-9xl font-black uppercase italic tracking-tighter leading-none text-white">
                                The Core
                            </h2>
                        </div>
                        
                        <p className="text-slate-400 text-2xl leading-relaxed font-light italic border-l-4 border-amber-500/20 pl-10">
                            {displayData.description}
                        </p>
                        
                        <div className="grid grid-cols-2 gap-8 pt-12">
                            {[
                                { icon: <Shield size={24}/>, label: "Security", val: "Quantum_Enc" },
                                { icon: <Cpu size={24}/>, label: "Efficiency", val: "Neural_Link" },
                                { icon: <Box size={24}/>, label: "Framework", val: "Syndicate" },
                                { icon: <Share2 size={24}/>, label: "Network", val: "Global_Ops" }
                            ].map((stat, i) => (
                                <motion.div key={i} whileHover={{ x: 10 }} className="flex items-center gap-6 p-8 bg-white/[0.03] border border-white/5 rounded-[2.5rem] hover:bg-white/[0.06] hover:border-amber-500/20 transition-all">
                                    <div className="p-4 bg-amber-500/10 rounded-2xl text-amber-500">{stat.icon}</div>
                                    <div>
                                        <p className="text-[9px] uppercase tracking-widest text-slate-500 mb-1">{stat.label}</p>
                                        <p className="text-xl font-black uppercase tracking-tight">{stat.val}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* --- 3. EXECUTION NODES (SERVICES) --- */}
                <section>
                    <div className="text-center mb-32 space-y-6">
                        <h2 className="text-7xl md:text-[10rem] font-black uppercase italic tracking-tighter leading-none opacity-20">Procedures</h2>
                        <p className="text-amber-500 text-sm font-black uppercase tracking-[0.8em]">Operational Specializations</p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {displayData.services.map((service, i) => (
                            <motion.div 
                                key={i}
                                whileHover={{ scale: 1.02 }}
                                className="group relative p-12 rounded-[4rem] bg-slate-900/40 border border-white/5 hover:border-amber-500/30 transition-all duration-700 backdrop-blur-3xl overflow-hidden"
                            >
                                <div className="absolute -top-10 -right-10 w-40 h-40 bg-amber-500/10 blur-[60px] group-hover:bg-amber-500/20 transition-all" />
                                
                                <div className="mb-12 w-20 h-20 bg-amber-500/10 rounded-3xl flex items-center justify-center text-amber-500 group-hover:bg-amber-500 group-hover:text-black transition-all duration-500">
                                    <Target size={32} />
                                </div>

                                <h3 className="text-3xl font-black italic uppercase tracking-tighter mb-6 text-white leading-none">
                                    {service.title}
                                </h3>

                                <p className="text-slate-400 text-lg leading-relaxed font-medium mb-12">
                                    {service.description}
                                </p>

                                <div className="flex items-center gap-4 text-white/20">
                                    <span className="text-[10px] font-black uppercase tracking-[0.4em]">Node_0{i+1}</span>
                                    <div className="flex-1 h-px bg-current" />
                                    <Zap size={14} className="group-hover:text-amber-500 transition-colors" />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* --- 4. THE SYNDICATE (TEAM) --- */}
                <section>
                    <div className="flex flex-col lg:flex-row justify-between items-end mb-32 gap-12">
                        <div className="space-y-4">
                            <h2 className="text-7xl md:text-9xl font-black uppercase italic tracking-tighter leading-none">Operatives</h2>
                            <p className="text-amber-500 text-sm font-black uppercase tracking-[0.6em]">Unified Intelligence Network</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                        {displayData.members.map((member, i) => (
                            <motion.div 
                                key={member.id || i} 
                                whileHover={{ y: -30 }}
                                onClick={() => navigate(`/main/profile/${member.id}`)}
                                className="relative group cursor-pointer"
                            >
                                <div className="absolute inset-0 bg-amber-500/10 blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                                
                                <div className="relative bg-white/[0.01] border border-white/5 rounded-[4rem] p-12 overflow-hidden backdrop-blur-3xl group-hover:border-amber-500/30 transition-all duration-500 shadow-2xl">
                                    
                                    <div className="relative w-48 h-48 mx-auto mb-12">
                                        <div className="absolute inset-0 border-[3px] border-dashed border-amber-500/20 rounded-full animate-[spin_20s_linear_infinite]" />
                                        <div className="absolute -inset-4 bg-amber-500/5 rounded-full scale-0 group-hover:scale-100 transition-transform duration-700" />
                                        <img 
                                            src={member.img} 
                                            className="absolute inset-4 w-[calc(100%-32px)] h-[calc(100%-32px)] object-cover rounded-full grayscale group-hover:grayscale-0 transition-all duration-700 shadow-2xl border-4 border-white/5" 
                                            alt={member.name} 
                                        />
                                    </div>

                                    <div className="text-center space-y-3">
                                        <h3 className="text-3xl font-black uppercase tracking-tight text-white">{member.name}</h3>
                                        <div className="inline-block px-4 py-1 bg-white/5 rounded-full">
                                            <p className="text-amber-500 text-[10px] font-black uppercase tracking-[0.2em]">{member.role}</p>
                                        </div>
                                    </div>

                                    <a 
                                        href={member.portfolio} 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        onClick={(e) => e.stopPropagation()} 
                                        className="mt-12 pt-12 border-t border-white/5 flex justify-between items-center group/link"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="w-2 h-2 rounded-full bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]" />
                                            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{member.badge} Access</span>
                                        </div>
                                        <div className="p-3 rounded-xl bg-white/5 group-hover/link:bg-amber-500 group-hover/link:text-black transition-all">
                                            <ArrowRight size={20} />
                                        </div>
                                    </a>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* --- 5. VISUAL ARCHIVE (WORKS) --- */}
                <section className="pb-60">
                    <div className="flex items-center gap-10 mb-24">
                        <h2 className="text-6xl font-black uppercase italic tracking-tighter">Mission_Logs</h2>
                        <div className="flex-1 h-[2px] bg-gradient-to-r from-amber-500/50 via-white/10 to-transparent" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {displayData.lastWorks.map((work, i) => (
                            <motion.a 
                                key={i} 
                                href={work.link} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                className="group relative aspect-[16/10] rounded-[4rem] overflow-hidden border border-white/10 cursor-none"
                            >
                                <img src={work.url} className="w-full h-full object-cover transition-transform duration-[3s] group-hover:scale-110 brightness-50 group-hover:brightness-100" alt="Log" />
                                
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-[2px] flex flex-col items-center justify-center">
                                    <motion.div 
                                        whileHover={{ scale: 1.2, rotate: 90 }}
                                        className="p-8 bg-amber-500 text-black rounded-full"
                                    >
                                        <ExternalLink size={32} />
                                    </motion.div>
                                    <h4 className="mt-8 text-2xl font-black uppercase tracking-tighter italic">{work.title || "PROJECT_LOG"}</h4>
                                    <p className="mt-2 text-[10px] font-black uppercase tracking-[0.5em] text-amber-500">Access_Full_Encryption</p>
                                </div>
                            </motion.a>
                        ))}
                    </div>
                </section>
            </div>

            {/* --- ULTIMATE FOOTER --- */}
            <footer className="relative border-t border-white/5 py-32 bg-slate-950 overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-amber-500 to-transparent" />
                
                <div className="container mx-auto px-6 flex flex-col items-center text-center">
                    <div className="w-24 h-24 mb-12 opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-700">
                        <img src={displayData.logo} alt="Footer Logo" className="w-full h-full object-contain" />
                    </div>

                    <div className="flex justify-center gap-10 mb-16">
                        {[
                            { icon: <Instagram size={22} />, label: "INSTA" },
                            { icon: <Twitter size={22} />, label: "X_SOC" },
                            { icon: <Linkedin size={22} />, label: "L_LINK" },
                            { icon: <Globe size={22} />, label: "WEB_0" }
                        ].map((social, i) => (
                            <a 
                                key={i}
                                href="#" 
                                className="flex flex-col items-center gap-3 group"
                            >
                                <div className="p-5 rounded-3xl bg-white/[0.03] border border-white/10 text-slate-500 group-hover:text-amber-500 group-hover:border-amber-500/50 group-hover:bg-amber-500/5 transition-all">
                                    {social.icon}
                                </div>
                                <span className="text-[8px] font-black tracking-widest text-slate-700 group-hover:text-white transition-colors">{social.label}</span>
                            </a>
                        ))}
                    </div>

                    <div className="flex items-center gap-4 px-10 py-4 bg-emerald-500/5 border border-emerald-500/20 rounded-full mb-12">
                        <ShieldCheck size={18} className="text-emerald-500 animate-pulse" />
                        <span className="text-[11px] font-black uppercase tracking-[0.4em] text-emerald-500/80">
                            Verified Universe <span className="text-white mx-2">#8829</span> <span className="text-slate-600">by Chriki Tn</span>
                        </span>
                    </div>

                    <div className="space-y-6">
                        <p className="text-[10px] font-black uppercase tracking-[0.8em] text-white/20">
                            Protocol Alpha <span className="text-amber-500/30 mx-4">|</span> Integrated Collective © 2026
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default CollectiveUniverse;