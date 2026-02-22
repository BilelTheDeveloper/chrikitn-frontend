import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ShieldCheck, Rocket, Users, Eye, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const AdminCollectiveVerification = () => {
    // 1. Initialize as an empty array to prevent .length crashes
    const [pendingCollectives, setPendingCollectives] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchPending();
    }, []);

    const fetchPending = async () => {
        try {
            const backendUrl = "https://chrikitn-backend.onrender.com"; 
            const res = await axios.get(`${backendUrl}/api/admin/pending-collectives`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            
            // 2. Defensive check: Ensure we are setting an array
            if (res.data && res.data.data) {
                setPendingCollectives(res.data.data);
            } else {
                setPendingCollectives([]);
            }
            setLoading(false);
        } catch (err) {
            console.error("Error fetching collectives", err);
            setError("Failed to synchronize with Syndicate HQ");
            setLoading(false);
            setPendingCollectives([]); // Fallback to empty array
        }
    };

    const handleDeploy = async (id, name) => {
        if (!window.confirm(`Are you sure you want to deploy "${name}" to the Matrix?`)) return;

        try {
            const backendUrl = "https://chrikitn-backend.onrender.com";
            await axios.put(`${backendUrl}/api/admin/deploy-collective/${id}`, {}, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            setPendingCollectives(prev => prev.filter(c => c._id !== id));
            alert(`${name} is now LIVE.`);
        } catch (err) {
            alert("Deployment protocol failed.");
        }
    };

    // 3. Loading State Guard
    if (loading) return (
        <div className="p-20 text-center">
            <div className="w-10 h-10 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-amber-500 font-black uppercase tracking-widest text-xs">Scanning for Pending Syndicates...</p>
        </div>
    );

    if (error) return <div className="p-20 text-red-500 font-black text-center">{error}</div>;

    return (
        <div className="p-6 md:p-10 bg-slate-950 min-h-screen text-white">
            <div className="flex items-center gap-4 mb-10">
                <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-2xl">
                    <ShieldCheck className="text-amber-500" size={32} />
                </div>
                <div>
                    <h1 className="text-3xl font-black uppercase tracking-tighter">Syndicate Gates</h1>
                    <p className="text-slate-500 text-xs font-bold tracking-widest uppercase">Admin Deployment Protocol</p>
                </div>
            </div>

            {/* 4. SAFE CHECK: Only map if it's an array and has items */}
            {!pendingCollectives || pendingCollectives.length === 0 ? (
                <div className="bg-slate-900/50 border border-white/5 p-20 rounded-[2.5rem] text-center">
                    <CheckCircle className="mx-auto text-slate-700 mb-4" size={48} />
                    <p className="text-slate-500 font-black uppercase tracking-widest text-xs">No Collectives Awaiting Deployment</p>
                </div>
            ) : (
                <div className="grid gap-6">
                    {pendingCollectives.map((collective) => (
                        <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            key={collective._id}
                            className="group relative bg-slate-900/40 border border-white/5 hover:border-amber-500/30 rounded-[2rem] p-6 transition-all duration-500"
                        >
                            <div className="flex flex-wrap items-center justify-between gap-6">
                                <div className="flex items-center gap-6">
                                    <div className="relative w-20 h-20 rounded-2xl overflow-hidden border-2 border-amber-500/20 bg-black">
                                        <img 
                                            src={collective.logo} 
                                            alt="Logo" 
                                            className="w-full h-full object-cover"
                                            onError={(e) => e.target.src = 'https://via.placeholder.com/150'}
                                        />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-black uppercase tracking-tight text-white">{collective.name || "Unnamed Syndicate"}</h3>
                                        <p className="text-amber-500/60 text-[10px] font-black uppercase tracking-widest italic">{collective.slogan}</p>
                                        <div className="flex items-center gap-3 mt-2">
                                            <span className="flex items-center gap-1 text-[9px] font-black text-slate-400 uppercase">
                                                <Users size={12} /> {collective.members?.length || 0} Members Verified
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 ml-auto">
                                    <button 
                                        onClick={() => handleDeploy(collective._id, collective.name)}
                                        className="flex items-center gap-3 px-8 py-4 bg-amber-500 hover:bg-amber-400 text-black font-black uppercase text-xs tracking-[0.2em] rounded-2xl shadow-lg transition-all"
                                    >
                                        <Rocket size={18} />
                                        Deploy
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AdminCollectiveVerification;