import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Shield, MessageSquare, Zap, Search, Lock, User, MoreVertical, ArrowLeft } from 'lucide-react';
import ChatRoom from './ChatRoom';

// ✅ CONFIG INTEGRATION:
import { API_BASE_URL } from '../../config/config';

const Connections = () => {
    const [connections, setConnections] = useState([]);
    const [selectedConnection, setSelectedConnection] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showChatMobile, setShowChatMobile] = useState(false);

    const token = localStorage.getItem('token');
    
    // Get current user and ensure we have an ID to compare against
    const currentUser = JSON.parse(localStorage.getItem('user')) || {};

    useEffect(() => {
        const fetchConnections = async () => {
            try {
                // ✅ UPDATED: Uses API_BASE_URL
                const res = await axios.get(`${API_BASE_URL}/connections`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setConnections(res.data.data);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching connections", err);
                setLoading(false);
            }
        };
        fetchConnections();
    }, [token]);

    // 🔥 LOGIC: Swaps identity so you always see the partner
    const getPartner = (participants) => {
        if (!participants || !Array.isArray(participants) || participants.length === 0) {
            return { name: "Unknown Operative" };
        }

        const partner = participants.find(p => {
            const pId = String(p._id || p);
            const currentId = String(currentUser._id || currentUser.id);
            return pId !== currentId;
        });

        if (!partner || String(partner._id) === String(currentUser._id)) {
             return participants.find(p => p.email !== currentUser.email) || participants[0];
        }

        return partner;
    };

    const handleSelect = (conn) => {
        setSelectedConnection(conn);
        setShowChatMobile(true);
    };

    return (
        <div className="h-[90vh] bg-slate-950 p-2 lg:p-4 overflow-hidden">
            <div className="max-w-[1600px] mx-auto h-full flex gap-4 relative">
                
                {/* --- LEFT SIDE: MISSION LIST --- */}
                <div className={`${showChatMobile ? 'hidden lg:flex' : 'flex'} w-full lg:w-[400px] flex-col bg-slate-900/40 border border-white/5 rounded-[2rem] lg:rounded-[2.5rem] overflow-hidden`}>
                    <div className="p-4 lg:p-6 border-b border-white/5">
                        <h1 className="text-xl lg:text-2xl font-black text-white uppercase italic tracking-tighter mb-4">
                            Active <span className="text-amber-500">Missions</span>
                        </h1>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                            <input 
                                type="text" 
                                placeholder="Search Operatives..." 
                                className="w-full bg-black/30 border border-white/5 rounded-xl py-2 pl-10 pr-4 text-xs text-white focus:outline-none focus:border-amber-500/50 transition-all"
                            />
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto custom-scrollbar p-2">
                        {loading ? (
                            <div className="p-10 text-center animate-pulse text-slate-500 text-[10px] uppercase font-bold">Scanning Frequencies...</div>
                        ) : connections.length > 0 ? (
                            connections.map((conn) => {
                                const partner = getPartner(conn.participants);
                                const isActive = selectedConnection?._id === conn._id;
                                
                                // ✅ UPDATED: Asset handling for partners
                                const partnerImage = partner.identityImage 
                                    ? partner.identityImage.startsWith('http')
                                        ? partner.identityImage
                                        : `${API_BASE_URL.replace('/api', '')}/${partner.identityImage.replace(/^\//, '')}` 
                                    : null;

                                return (
                                    <div 
                                        key={conn._id}
                                        onClick={() => handleSelect(conn)}
                                        className={`group relative flex items-center gap-4 p-4 mb-2 rounded-[1.5rem] cursor-pointer transition-all ${
                                            isActive 
                                            ? 'bg-amber-500 shadow-lg shadow-amber-500/10' 
                                            : 'hover:bg-white/5 border border-transparent hover:border-white/5'
                                        }`}
                                    >
                                        <div className="relative">
                                            <div className="w-12 h-12 rounded-full bg-slate-800 border-2 border-white/10 overflow-hidden">
                                                {partnerImage ? (
                                                    <img src={partnerImage} alt="Partner" className="w-full h-full object-cover" />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-slate-500"><User size={20} /></div>
                                                )}
                                            </div>
                                            <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-slate-900 rounded-full"></div>
                                        </div>
                                        
                                        <div className="flex-1 min-w-0">
                                            <div className="flex justify-between items-center mb-1">
                                                <h4 className={`text-sm font-black uppercase truncate ${isActive ? 'text-black' : 'text-white'}`}>
                                                    {partner.name || "Unknown"}
                                                </h4>
                                                <span className={`text-[8px] font-bold ${isActive ? 'text-black/60' : 'text-slate-500'}`}>
                                                    {conn.lastMessage ? new Date(conn.lastMessage.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ""}
                                                </span>
                                            </div>
                                            <p className={`text-[10px] truncate uppercase tracking-wider font-bold ${isActive ? 'text-black/70' : 'text-slate-500'}`}>
                                                {conn.lastMessage?.content || "Channel Established"}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <div className="p-10 text-center opacity-40 uppercase text-xs text-slate-500">No Handshakes Found</div>
                        )}
                    </div>
                </div>

                {/* --- RIGHT SIDE: SECURE CHANNEL --- */}
                <div className={`${showChatMobile ? 'flex' : 'hidden lg:flex'} flex-1 bg-slate-900/40 border border-white/5 rounded-[2rem] lg:rounded-[2.5rem] overflow-hidden relative`}>
                    {selectedConnection ? (
                        <div className="w-full h-full flex flex-col">
                            <div className="lg:hidden p-4 border-b border-white/5 bg-slate-900/80 flex items-center gap-3">
                                <button onClick={() => setShowChatMobile(false)} className="text-amber-500">
                                    <ArrowLeft size={20} />
                                </button>
                                <span className="text-white font-black uppercase text-xs tracking-widest">
                                    {getPartner(selectedConnection.participants).name}
                                </span>
                            </div>

                            <div className="flex-1">
                                <ChatRoom connectionId={selectedConnection._id} />
                            </div>
                        </div>
                    ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center text-center p-6 lg:p-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-900 to-slate-950">
                            <div className="w-16 h-16 lg:w-24 lg:h-24 bg-amber-500/5 rounded-full flex items-center justify-center mb-6 border border-amber-500/10 animate-pulse">
                                <Shield size={32} className="text-amber-500/20" />
                            </div>
                            <h2 className="text-white font-black uppercase tracking-[0.2em] italic text-lg lg:text-xl">
                                Secure <span className="text-amber-500">Terminal</span>
                            </h2>
                            <p className="text-slate-500 text-[10px] lg:text-xs mt-4 max-w-xs leading-relaxed uppercase tracking-widest font-bold">
                                Select a mission briefing to establish a live link.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Connections;