import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MainCollective from './MainCollective';
import CollectiveUniverse from './CollectiveUniverse';
import { LayoutGrid, Globe, Settings2, Cpu, ShieldCheck } from 'lucide-react';

const MotherCollective = ({ userRole, userSyndicateId }) => {
    const [viewMode, setViewMode] = useState('hub'); 

    return (
        <div className="min-h-screen bg-[#020617] text-white selection:bg-blue-500/30">
            {/* --- ELITE NAV BAR (Updated: Removed sticky classes) --- */}
            <header className="h-20 border-b border-white/5 bg-slate-950/40 px-4 md:px-10 flex items-center justify-between z-[100] relative">
                

                {/* --- CENTER TOGGLE: ELITE GLASSMORPHISM (Hidden on Mobile) --- */}
                {userRole === 'Freelancer' && (
                    <div className="hidden md:flex bg-black/60 p-1.5 rounded-2xl border border-white/10 shadow-2xl backdrop-blur-2xl">
                        <button 
                            onClick={() => setViewMode('hub')}
                            className={`relative flex items-center gap-3 px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-500 ${
                                viewMode === 'hub' ? 'text-white' : 'text-slate-500 hover:text-slate-300'
                            }`}
                        >
                            {viewMode === 'hub' && (
                                <motion.div layoutId="nav-pill" className="absolute inset-0 bg-blue-600 rounded-xl shadow-[0_0_20px_rgba(37,99,235,0.4)]" />
                            )}
                            <LayoutGrid className="relative z-10" size={16} />
                            <span className="relative z-10">Discovery_Hub</span>
                        </button>

                        <button 
                            onClick={() => setViewMode('universe')}
                            className={`relative flex items-center gap-3 px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-500 ${
                                viewMode === 'universe' ? 'text-white' : 'text-slate-500 hover:text-slate-300'
                            }`}
                        >
                            {viewMode === 'universe' && (
                                <motion.div layoutId="nav-pill" className="absolute inset-0 bg-indigo-600 rounded-xl shadow-[0_0_20px_rgba(79,70,229,0.4)]" />
                            )}
                            <Globe className="relative z-10" size={16} />
                            <span className="relative z-10">My_Universe</span>
                        </button>
                    </div>
                )}

               
            </header>

            {/* --- MAIN VIEWPORT WITH ANIMATION --- */}
            <main className="relative pb-24 md:pb-0">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={viewMode}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.4, ease: "circOut" }}
                    >
                        {viewMode === 'hub' ? (
                            <MainCollective />
                        ) : (
                            <CollectiveUniverse isEditMode={true} syndicateId={userSyndicateId} />
                        )}
                    </motion.div>
                </AnimatePresence>
            </main>

            {/* --- MOBILE DOCK (Bottom Navigation) --- */}
            {userRole === 'Freelancer' && (
                <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] z-[100]">
                    <div className="bg-slate-900/80 backdrop-blur-2xl border border-white/10 p-2 rounded-2xl flex items-center justify-around shadow-2xl">
                        <button 
                            onClick={() => setViewMode('hub')}
                            className={`p-4 rounded-xl flex flex-col items-center gap-1 transition-all ${viewMode === 'hub' ? 'text-blue-500 bg-blue-500/10' : 'text-slate-500'}`}
                        >
                            <LayoutGrid size={20} />
                            <span className="text-[8px] font-black uppercase tracking-tighter">Hub</span>
                        </button>
                        <button 
                            onClick={() => setViewMode('universe')}
                            className={`p-4 rounded-xl flex flex-col items-center gap-1 transition-all ${viewMode === 'universe' ? 'text-indigo-500 bg-indigo-500/10' : 'text-slate-500'}`}
                        >
                            <Globe size={20} />
                            <span className="text-[8px] font-black uppercase tracking-tighter">Universe</span>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MotherCollective;