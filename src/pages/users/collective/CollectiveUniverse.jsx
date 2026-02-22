import React from 'react';
import { motion } from 'framer-motion';
import { 
  ExternalLink, Rocket, Fingerprint, Award, 
  Globe, Shield, Cpu, Zap, ArrowRight,
  Hexagon, Target
} from 'lucide-react';

const CollectiveUniverse = ({ data = {} }) => {
    // FALLBACK DATA (Merged with real data)
    const displayData = {
        name: data.name || "CHRIKI TEAM",
        slogan: data.slogan || "CREATIVE COLLECTIVE. DIGITAL IMPACT.",
        heroBackground: data.heroBackground || "https://images.unsplash.com/photo-1635776062127-d379bfcba9f8?auto=format&fit=crop&q=80",
        logo: data.logo || "https://via.placeholder.com/200",
        description: data.description || "We are a multidisciplinary elite force specialized in digital transformation. Our mission is to bridge the gap between imagination and execution through high-end design and robust engineering.",
        members: data.members || [
            { id: 1, name: "Alex Rover", role: "Lead Dev", badge: "Gold", img: "https://i.pravatar.cc/150?u=1" },
            { id: 2, name: "Sarah Zen", role: "UI Designer", badge: "Elite", img: "https://i.pravatar.cc/150?u=2" },
            { id: 3, name: "Mike Tech", role: "Fullstack", badge: "Pro", img: "https://i.pravatar.cc/150?u=3" },
        ],
        lastWorks: data.lastWorks || [
            { url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80" },
            { url: "https://images.unsplash.com/photo-1633167606207-d840b5070fc2?auto=format&fit=crop&q=80" },
            { url: "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&q=80" }
        ]
    };

    return (
        <div className="relative min-h-screen bg-[#020617] text-white selection:bg-amber-500/30 overflow-x-hidden font-sans">
            
            {/* --- STATIC NOISE OVERLAY --- */}
            <div className="fixed inset-0 z-[100] pointer-events-none opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

            {/* --- 1. HERO SECTION: THE MONOLITH --- */}
            <section className="relative h-[110vh] w-full flex items-center justify-center overflow-hidden">
                <motion.div 
                    initial={{ scale: 1.2, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 2, ease: "easeOut" }}
                    className="absolute inset-0 z-0"
                >
                    <img 
                        src={displayData.heroBackground} 
                        className="w-full h-full object-cover grayscale-[0.5] brightness-50" 
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
                        {/* THE LOGO RING */}
                        <div className="relative group mb-12">
                            <div className="absolute inset-0 rounded-[3rem] bg-amber-500 blur-2xl opacity-20 group-hover:opacity-40 transition-opacity" />
                            <div className="relative w-32 h-32 md:w-44 md:h-44 p-1 rounded-[3rem] bg-gradient-to-tr from-white/20 to-transparent backdrop-blur-3xl overflow-hidden shadow-2xl">
                                <img src={displayData.logo} className="w-full h-full object-cover rounded-[2.8rem]" alt="Logo" />
                            </div>
                        </div>

                        <h1 className="text-7xl md:text-[12rem] font-black uppercase tracking-tighter italic leading-[0.8] mb-6 drop-shadow-2xl">
                            {displayData.name.split(' ')[0]}
                            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-500 to-amber-800">
                                {displayData.name.split(' ')[1] || "SYNDICATE"}
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
                            <button className="px-12 py-6 rounded-2xl border border-white/10 backdrop-blur-md hover:bg-white/5 font-black uppercase text-xs tracking-widest transition-all">
                                Explore DNA
                            </button>
                        </div>
                    </motion.div>
                </div>
                
                {/* DECORATIVE HUD ELEMENTS */}
                <div className="absolute bottom-10 left-10 hidden lg:block">
                   <div className="flex flex-col gap-2">
                        <span className="text-[8px] font-black text-white/30 tracking-[0.4em] uppercase">System_Status</span>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                            <span className="text-[10px] font-bold text-green-500 uppercase tracking-widest">Active_Node</span>
                        </div>
                   </div>
                </div>
            </section>

            {/* --- 2. VISION CONTENT: THE DNA --- */}
            <div className="container mx-auto px-6 md:px-12 space-y-60 py-40">
                
                <section className="grid lg:grid-cols-2 gap-24 items-center">
                    <div className="order-2 lg:order-1">
                        <div className="relative rounded-[4rem] overflow-hidden group">
                            <div className="absolute inset-0 bg-amber-500/20 mix-blend-overlay group-hover:opacity-0 transition-opacity duration-700" />
                            <img src={displayData.lastWorks[1].url} className="w-full aspect-[4/5] object-cover scale-110 group-hover:scale-100 transition-transform duration-1000" />
                            <div className="absolute bottom-8 left-8 right-8 p-8 backdrop-blur-2xl bg-black/40 border border-white/10 rounded-[2rem]">
                                <div className="flex justify-between items-center">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-amber-500">Operation_Summary</p>
                                    <Target size={16} className="text-amber-500" />
                                </div>
                                <h3 className="text-2xl font-black uppercase italic mt-2">Precision_Execution</h3>
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
                            Elite <span className="text-transparent border-t-2 border-b-2 border-white px-2">Collective</span> DNA
                        </h2>
                        <p className="text-slate-400 text-xl leading-relaxed font-light">
                            {displayData.description}
                        </p>
                        
                        <div className="grid grid-cols-2 gap-6 pt-10">
                            {[
                                { icon: <Shield size={20}/>, label: "Security", val: "Lvl_9" },
                                { icon: <Cpu size={20}/>, label: "Logic", val: "Neural" },
                                { icon: <Zap size={20}/>, label: "Speed", val: "0.02ms" },
                                { icon: <Globe size={20}/>, label: "Region", val: "Global" }
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

                {/* --- 3. THE COUNCIL: OPERATIVES --- */}
                <section>
                    <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
                        <div>
                            <h2 className="text-6xl md:text-8xl font-black uppercase italic tracking-tighter">Council_Of_Three</h2>
                            <p className="text-amber-500 text-xs font-black uppercase tracking-[0.4em] mt-4">Verified High-Value Operatives</p>
                        </div>
                        <div className="px-6 py-3 border border-white/10 rounded-full text-[10px] font-black uppercase tracking-widest bg-white/5">
                            Status: Fully_Synchronized
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {displayData.members.map((member, i) => (
                            <motion.div 
                                whileHover={{ y: -20 }}
                                key={i} 
                                className="relative group"
                            >
                                <div className="absolute inset-0 bg-gradient-to-b from-amber-500 to-transparent opacity-0 group-hover:opacity-10 blur-3xl transition-opacity" />
                                <div className="relative bg-white/[0.02] border border-white/5 rounded-[3rem] p-10 overflow-hidden backdrop-blur-sm group-hover:border-amber-500/20 transition-all duration-500">
                                    
                                    <div className="relative w-32 h-32 mx-auto mb-8">
                                        <div className="absolute inset-0 border-2 border-dashed border-amber-500/30 rounded-full animate-[spin_10s_linear_infinite]" />
                                        <img src={member.img} className="absolute inset-2 w-[calc(100%-16px)] h-[calc(100%-16px)] object-cover rounded-full grayscale group-hover:grayscale-0 transition-all duration-700" />
                                    </div>

                                    <div className="text-center space-y-2">
                                        <div className="flex justify-center gap-1 mb-2">
                                            {[...Array(3)].map((_, i) => <div key={i} className="w-1 h-1 bg-amber-500 rounded-full" />)}
                                        </div>
                                        <h3 className="text-2xl font-black uppercase tracking-tight">{member.name}</h3>
                                        <p className="text-amber-500 text-[10px] font-black uppercase tracking-widest">{member.role}</p>
                                    </div>

                                    <div className="mt-10 pt-10 border-t border-white/5 flex justify-between items-center">
                                        <div className="flex items-center gap-2">
                                            <Award size={14} className="text-slate-500" />
                                            <span className="text-[9px] font-black text-slate-500 uppercase">{member.badge}_Rank</span>
                                        </div>
                                        <ArrowRight size={20} className="text-white/20 group-hover:text-amber-500 transition-colors" />
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* --- 4. THE VAULT: MISSION LOGS --- */}
                <section className="pb-40">
                    <div className="flex items-center gap-6 mb-16">
                        <h2 className="text-5xl font-black uppercase italic tracking-tighter">The_Vault</h2>
                        <div className="flex-1 h-px bg-gradient-to-r from-white/20 to-transparent" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Archive_v4.0</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {displayData.lastWorks.map((work, i) => (
                            <div key={i} className="group relative aspect-[4/3] rounded-[3rem] overflow-hidden border border-white/10 cursor-none">
                                <img src={work.url} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 brightness-75 group-hover:brightness-100" />
                                
                                {/* CUSTOM CURSOR EFFECT ON HOVER */}
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-amber-500/10 backdrop-blur-[2px] flex flex-col items-center justify-center pointer-events-none">
                                    <div className="p-5 bg-white text-black rounded-full scale-50 group-hover:scale-100 transition-transform duration-500">
                                        <ExternalLink size={24} />
                                    </div>
                                    <p className="mt-4 text-[10px] font-black uppercase tracking-[0.3em] text-white">Inspect_Entry</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>

            {/* --- FOOTER: THE SIGNAL --- */}
            <footer className="border-t border-white/5 py-20 bg-black/40 backdrop-blur-xl">
                <div className="container mx-auto px-6 text-center">
                    <p className="text-[10px] font-black uppercase tracking-[1em] text-slate-600 mb-8">End_Of_Transmission</p>
                    <div className="flex justify-center gap-12 text-slate-400">
                        <span className="hover:text-amber-500 cursor-pointer transition-colors text-[10px] font-black uppercase tracking-widest">Instagram</span>
                        <span className="hover:text-amber-500 cursor-pointer transition-colors text-[10px] font-black uppercase tracking-widest">Behance</span>
                        <span className="hover:text-amber-500 cursor-pointer transition-colors text-[10px] font-black uppercase tracking-widest">Dribbble</span>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default CollectiveUniverse;