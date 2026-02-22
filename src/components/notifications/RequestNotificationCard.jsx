import React, { useState } from 'react';
import { Shield, Target, X, Check, ChevronDown, ChevronUp, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const RequestNotificationCard = ({ notification, onRespond }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const { metadata, sender, message } = notification;

    // We assume metadata contains the request details or we fetch them via the requestId
    // For this card, we'll use the data passed through the notification
    
    return (
        <motion.div 
            layout
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative overflow-hidden bg-slate-900/60 border border-amber-500/20 rounded-[2rem] p-5 mb-4 hover:border-amber-500/40 transition-all shadow-2xl"
        >
            {/* Top Glow Decor */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-[1px] bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />

            <div className="flex items-start gap-4">
                {/* Identity Image */}
                <div className="relative flex-shrink-0">
                    <div className="w-12 h-12 rounded-xl overflow-hidden border border-amber-500/30">
                        <img 
                            src={sender?.identityImage || '/default-avatar.png'} 
                            alt="Sender" 
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="absolute -bottom-1 -right-1 p-1 bg-amber-500 rounded-lg">
                        <Zap size={10} className="text-black fill-current" />
                    </div>
                </div>

                {/* Briefing Summary */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-500/70">Incoming Mission</p>
                        <span className="text-[9px] font-medium text-slate-500 uppercase">{new Date(notification.createdAt).toLocaleDateString()}</span>
                    </div>
                    <h4 className="text-white font-bold text-sm mt-1 truncate">
                        {sender?.name} <span className="text-slate-500 font-normal">sent a brief</span>
                    </h4>
                </div>
            </div>

            {/* Action Zone */}
            <div className="mt-4 flex items-center gap-2">
                <button 
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="flex-1 py-2 rounded-xl bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-white hover:bg-white/10 transition-all flex items-center justify-center gap-2"
                >
                    {isExpanded ? <ChevronUp size={14}/> : <ChevronDown size={14}/>}
                    {isExpanded ? "Close Intel" : "Review Briefing"}
                </button>
                
                <button 
                    onClick={() => onRespond(metadata.requestId, 'accept')}
                    className="p-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black transition-all shadow-lg shadow-amber-500/20"
                >
                    <Check size={18} strokeWidth={3} />
                </button>

                <button 
                    onClick={() => onRespond(metadata.requestId, 'reject')}
                    className="p-2.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20 transition-all"
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
                            <div className="flex items-start gap-3">
                                <Target size={14} className="text-amber-500 mt-1 flex-shrink-0" />
                                <div>
                                    <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Global Objective</p>
                                    <p className="text-xs text-slate-200 mt-1 leading-relaxed">
                                        {message} {/* Displaying the mission summary */}
                                    </p>
                                </div>
                            </div>
                            
                            <div className="bg-black/40 border border-white/5 rounded-2xl p-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <Shield size={12} className="text-amber-500" />
                                    <p className="text-[9px] font-black text-amber-500 uppercase tracking-[0.2em]">Encrypted Details</p>
                                </div>
                                <p className="text-[11px] text-slate-400 leading-relaxed italic">
                                    "Handshake required to unlock full operational logistics and establish secure chat line."
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