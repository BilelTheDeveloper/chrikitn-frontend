import React from 'react';
import { motion } from 'framer-motion';
import { 
  Edit3, ExternalLink, Users, Briefcase, Globe, 
  Shield, Rocket, ChevronRight, Fingerprint, Award 
} from 'lucide-react';

const CollectiveUniverse = ({ isEditMode = false }) => {
    // TEMPLATE DATA
    const displayData = {
        name: "CHRIKI TEAM",
        slogan: "Creative Collective. Digital Impact.",
        heroBackground: "https://images.unsplash.com/photo-1635776062127-d379bfcba9f8?auto=format&fit=crop&q=80",
        logo: "https://via.placeholder.com/200",
        description: "We are a multidisciplinary elite force specialized in digital transformation. Our mission is to bridge the gap between imagination and execution through high-end design and robust engineering.",
        members: [
            { id: 1, name: "Alex Rover", role: "Lead Dev", badge: "Gold", img: "https://i.pravatar.cc/150?u=1" },
            { id: 2, name: "Sarah Zen", role: "UI Designer", badge: "Elite", img: "https://i.pravatar.cc/150?u=2" },
            { id: 3, name: "Mike Tech", role: "Fullstack", badge: "Pro", img: "https://i.pravatar.cc/150?u=3" },
        ],
        lastWorks: [
            { url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80" },
            { url: "https://images.unsplash.com/photo-1633167606207-d840b5070fc2?auto=format&fit=crop&q=80" },
            { url: "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&q=80" }
        ]
    };

    return (
        <div className="relative min-h-screen bg-[#020617] text-white selection:bg-blue-500/30 overflow-x-hidden font-sans">
            
            {/* --- 1. HERO SECTION (Dynamic Background) --- */}
            <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img 
                        src={displayData.heroBackground} 
                        className="w-full h-full object-cover opacity-40 scale-105" 
                        alt="Hero Atmosphere"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-950/20 via-slate-950/60 to-[#020617]" />
                </div>

                <div className="relative z-10 text-center px-4">
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col items-center"
                    >
                        <div className="w-24 h-24 md:w-32 md:h-32 rounded-[2rem] border-2 border-white/10 overflow-hidden bg-slate-900 mb-8 shadow-2xl">
                            <img src={displayData.logo} className="w-full h-full object-cover" alt="Logo" />
                        </div>
                        <h1 className="text-6xl md:text-9xl font-black uppercase tracking-tighter italic leading-none mb-4">
                            {displayData.name}
                        </h1>
                        <p className="text-blue-500 font-black tracking-[0.5em] uppercase text-xs md:text-sm italic mb-10">
                            {displayData.slogan}
                        </p>
                        
                        <button className="group flex items-center gap-3 px-10 py-5 bg-white text-black font-black uppercase text-xs tracking-widest rounded-2xl hover:bg-blue-500 hover:text-white transition-all duration-500 shadow-xl shadow-white/5">
                            Work With Us
                            <Rocket size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </button>
                    </motion.div>
                </div>
            </section>

            <div className="container mx-auto px-6 md:px-12 space-y-40 py-20">
                
                {/* --- 2. INTEL CORE (About / Description) --- */}
                <section className="relative">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <div>
                            <div className="flex items-center gap-3 mb-6">
                                <Fingerprint className="text-blue-500" size={24} />
                                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500">Service_Identity</span>
                            </div>
                            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter italic mb-6">
                                The <span className="text-blue-500">Collective</span> Vision
                            </h2>
                            <p className="text-slate-400 text-lg leading-relaxed font-medium max-w-xl">
                                {displayData.description}
                            </p>
                            <div className="mt-8 flex gap-4">
                                <div className="p-4 bg-white/5 border border-white/10 rounded-2xl">
                                    <p className="text-2xl font-black">99%</p>
                                    <p className="text-[8px] uppercase tracking-widest text-slate-500">Precision</p>
                                </div>
                                <div className="p-4 bg-white/5 border border-white/10 rounded-2xl">
                                    <p className="text-2xl font-black">24/7</p>
                                    <p className="text-[8px] uppercase tracking-widest text-slate-500">Deployment</p>
                                </div>
                            </div>
                        </div>
                        <div className="relative aspect-square md:aspect-video rounded-[3rem] border border-white/5 overflow-hidden shadow-2xl">
                            <img src={displayData.lastWorks[0].url} className="w-full h-full object-cover opacity-60" alt="Process" />
                            <div className="absolute inset-0 bg-blue-600/10 backdrop-blur-[2px]" />
                        </div>
                    </div>
                </section>

                {/* --- 3. NEURAL TEAM (Our Team Section) --- */}
                <section>
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-black uppercase tracking-tighter italic">Neural_Operatives</h2>
                        <p className="text-blue-500 text-[10px] font-black uppercase tracking-[0.3em] mt-2">Verified Members of the Alliance</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {displayData.members.map((member) => (
                            <div key={member.id} className="group relative bg-slate-900/40 border border-white/5 p-8 rounded-[2.5rem] hover:border-blue-500/30 transition-all duration-500">
                                <div className="absolute top-6 right-6">
                                    <div className="flex items-center gap-1 bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-full">
                                        <Award size={10} className="text-blue-500" />
                                        <span className="text-[8px] font-black uppercase text-blue-500 tracking-widest">{member.badge}</span>
                                    </div>
                                </div>
                                
                                <div className="flex items-center gap-6">
                                    <div className="w-20 h-20 rounded-2xl border-2 border-white/10 overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700">
                                        <img src={member.img} alt={member.name} className="w-full h-full object-cover" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-black uppercase tracking-tight">{member.name}</h3>
                                        <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">{member.role}</p>
                                    </div>
                                </div>
                                
                                <button className="mt-8 w-full py-3 bg-white/5 border border-white/10 rounded-xl text-[9px] font-black uppercase tracking-widest group-hover:bg-blue-600 group-hover:border-blue-600 transition-all">
                                    View Intel_Link
                                </button>
                            </div>
                        ))}
                    </div>
                </section>

                {/* --- 4. MISSION ARCHIVE (Works) --- */}
                <section className="pb-20">
                    <div className="flex items-end justify-between mb-12">
                        <h2 className="text-4xl font-black uppercase tracking-tighter italic leading-none">Mission_Archive</h2>
                        <span className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.2em] border-b border-white/10 pb-2">All Deployments</span>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        {displayData.lastWorks.map((work, i) => (
                            <div key={i} className="group relative aspect-video rounded-[2.5rem] overflow-hidden border border-white/10">
                                <img src={work.url} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt="Work" />
                                <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                                    <div className="p-4 bg-white text-black rounded-full">
                                        <ExternalLink size={20} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default CollectiveUniverse;