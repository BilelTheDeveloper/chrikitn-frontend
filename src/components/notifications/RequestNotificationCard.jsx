import React, { useState } from 'react';
import { Shield, Target, X, Check, ChevronDown, ChevronUp, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// ✅ CONFIG INTEGRATION
import { getImageUrl } from '../../config/config';

const RequestNotificationCard = ({ notification, onRespond }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const { metadata, sender, message, createdAt } = notification;

    // ✅ EXTRACT REQUEST ID FROM METADATA
    // We check both keys to ensure the Handshake Protocol never fails.
    const requestId = metadata?.requestId || metadata?.missionId;

    return (
        <motion.div 
            layout
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative overflow-hidden bg-slate-900/60 border border-amber-500/20 rounded-[2rem] p-5 mb-4 hover:border-amber-500/40 transition-all shadow-2xl group"
        >
            {/* Top Glow Decor */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-[1px] bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />

            <div className="flex items-start gap-4">
                {/* Identity Image */}
                <div className="relative flex-shrink-0">
                    <div className="w-12 h-12 rounded-xl overflow-hidden border border-amber-500/30 bg-black">
                        {sender?.identityImage ? (
                            <img 
                                src={getImageUrl(sender.identityImage)} 
                                alt="Operative" 
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-slate-800">
                                <Zap size={16} className="text-amber-500" />
                            </div>
                        )}
                    </div>
                    <div className="absolute -bottom-1 -right-1 p-1 bg-amber-500 rounded-lg shadow-lg">
                        <Shield size={10} className="text-black fill-current" />
                    </div>
                </div>

                {/* Briefing Summary */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-500/70">Incoming Mission</p>
                        <span className="text-[9px] font-mono text-slate-500 uppercase">
                            {new Date(createdAt).toLocaleDateString()}
                        </span>
                    </div>
                    <h4 className="text-white font-bold text-sm mt-1 truncate">
                        {sender?.name || "Unknown Operative"} <span className="text-slate-500 font-normal italic ml-1 text-xs">transmitted a brief</span>
                    </h4>
                </div>
            </div>

            {/* Action Zone */}
            <div className="mt-4 flex items-center gap-2">
                <button 
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="flex-1 py-2.5 rounded-xl bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-white hover:bg-white/10 transition-all flex items-center justify-center gap-2"
                >
                    {isExpanded ? <ChevronUp size={14}/> : <ChevronDown size={14}/>}
                    {isExpanded ? "Close Intel" : "Review Briefing"}
                </button>
                
                <button 
                    onClick={() => onRespond(notification._id, 'accept', requestId)}
                    className="p-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black transition-all shadow-lg shadow-amber-500/40 active:scale-90"
                    title="Accept Mission"
                >
                    <Check size={18} strokeWidth={3} />
                </button>

                <button 
                    onClick={() => onRespond(notification._id, 'reject', requestId)}
                    className="p-2.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20 transition-all active:scale-90"
                    title="Decline Mission"
                >
                    <X size={18} strokeWidth={3} />
                </button>
            </div>

            {/* Expanded Intel: Mission Details */}
            <AnimatePresence>
                {isExpanded && (
                    <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                    >
                        <div className="mt-4 pt-4 border-t border-white/5 space-y-4">
                            <div className="flex items-start gap-3 bg-white/5 p-3 rounded-2xl">
                                <Target size={16} className="text-amber-500 mt-1 flex-shrink-0" />
                                <div>
                                    <p className="text-[9px] font-black text-amber-500/50 uppercase tracking-widest mb-1">Mission Objective</p>
                                    <p className="text-xs text-slate-200 leading-relaxed font-medium">
                                        {message} 
                                    </p>
                                </div>
                            </div>
                            
                            <div className="bg-black/40 border border-white/5 rounded-2xl p-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <Shield size={12} className="text-amber-500" />
                                    <p className="text-[9px] font-black text-amber-500 uppercase tracking-[0.2em]">Security Protocol</p>
                                </div>
                                <p className="text-[11px] text-slate-400 leading-relaxed italic">
                                    "Handshake required to unlock operational logistics and establish secure chat line."
                                </p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default RequestNotificationCard;