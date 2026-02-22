import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ShieldCheck, Rocket, Users, Eye, CheckCircle, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const AdminCollectiveVerification = () => {
    const [pendingCollectives, setPendingCollectives] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPending();
    }, []);

    const fetchPending = async () => {
        try {
            const res = await axios.get('/api/admin/pending-collectives');
            setPendingCollectives(res.data.data);
            setLoading(false);
        } catch (err) {
            console.error("Error fetching collectives", err);
            setLoading(false);
        }
    };

    const handleDeploy = async (id, name) => {
        if (!window.confirm(`Are you sure you want to deploy "${name}" to the Matrix?`)) return;

        try {
            await axios.put(`/api/admin/deploy-collective/${id}`);
            // Remove from list after deployment
            setPendingCollectives(prev => prev.filter(c => c._id !== id));
            alert(`${name} is now LIVE.`);
        } catch (err) {
            alert("Deployment failed.");
        }
    };

    if (loading) return <div className="text-amber-500 font-black p-10 uppercase animate-pulse">Scanning for Pending Syndicates...</div>;

    return (
        <div className="p-6 md:p-10 bg-slate-950 min-h-screen text-white">
            <div className="flex items-center gap-4 mb-10">
                <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-2xl">
                    <ShieldCheck className="text-amber-500" size={32} />
                </div>
                <div>
                    <h1 className="text-3xl font-black uppercase tracking-tighter">Collective Deployment Gate</h1>
                    <p className="text-slate-500 text-xs font-bold tracking-widest uppercase">Authorized Access: Admin Protocol Only</p>
                </div>
            </div>

            {pendingCollectives.length === 0 ? (
                <div className="bg-slate-900/50 border border-white/5 p-20 rounded-[2.5rem] text-center">
                    <CheckCircle className="mx-auto text-slate-700 mb-4" size={48} />
                    <p className="text-slate-500 font-black uppercase tracking-widest">No Collectives Awaiting Deployment</p>
                </div>
            ) : (
                <div className="grid gap-6">
                    {pendingCollectives.map((collective) => (
                        <motion.div 
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            key={collective._id}
                            className="group relative bg-slate-900/40 border border-white/5 hover:border-amber-500/30 rounded-[2rem] p-6 transition-all duration-500"
                        >
                            <div className="flex flex-wrap items-center justify-between gap-6">
                                {/* 1. Asset Preview */}
                                <div className="flex items-center gap-6">
                                    <div className="relative w-20 h-20 rounded-2xl overflow-hidden border-2 border-amber-500/20 bg-black">
                                        <img 
                                            src={collective.logo} 
                                            alt="Logo" 
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-black uppercase tracking-tight text-white">{collective.name}</h3>
                                        <p className="text-amber-500/60 text-[10px] font-black uppercase tracking-widest italic">{collective.slogan}</p>
                                        <div className="flex items-center gap-3 mt-2">
                                            <span className="flex items-center gap-1 text-[9px] font-black text-slate-400 uppercase">
                                                <Users size={12} /> {collective.members.length} Members Confirmed
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* 2. Metadata Info */}
                                <div className="hidden lg:block border-l border-white/5 pl-6">
                                    <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-1">Founding Member</p>
                                    <p className="text-sm font-bold text-slate-300">{collective.owner?.name}</p>
                                    <p className="text-[10px] text-slate-500 italic">{collective.owner?.email}</p>
                                </div>

                                {/* 3. Action Buttons */}
                                <div className="flex items-center gap-3 ml-auto">
                                    <button className="p-4 bg-white/5 hover:bg-white/10 text-slate-400 rounded-2xl transition-all">
                                        <Eye size={20} />
                                    </button>
                                    <button 
                                        onClick={() => handleDeploy(collective._id, collective.name)}
                                        className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-black font-black uppercase text-xs tracking-[0.2em] rounded-2xl shadow-lg shadow-amber-500/10 active:scale-95 transition-all"
                                    >
                                        <Rocket size={18} />
                                        Deploy Syndicate
                                    </button>
                                </div>
                            </div>

                            {/* Background Progress Bar (Member Consensus) */}
                            <div className="absolute bottom-0 left-10 right-10 h-[2px] bg-white/5 overflow-hidden rounded-full">
                                <div className="h-full bg-amber-500 w-full opacity-30"></div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AdminCollectiveVerification;