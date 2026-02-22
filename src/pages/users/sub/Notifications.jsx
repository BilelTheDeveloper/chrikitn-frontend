import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { 
  Bell, 
  Zap, 
  Clock,
  Cpu,
  ShieldCheck,
  ShieldX,
  Target,
  FileText
} from 'lucide-react';

// ✅ CONFIG INTEGRATION:
import { API_BASE_URL, getImageUrl } from '../../../config/config';

// ✅ NEW CARD IMPORT
import CollectiveNotif from '../../../components/notifications/CollectiveNotif'

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. Fetch Transmissions
  const fetchSignals = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      const res = await axios.get(`${API_BASE_URL}/notifications`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      const incomingData = res.data.data || res.data || [];
      console.log("📡 SIGNAL SCAN COMPLETE:", incomingData);
      
      setNotifications(incomingData);
      setLoading(false);
    } catch (err) {
      console.error("Signal Interruption:", err);
      setNotifications([]); 
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSignals();
  }, []);

  // 2. Handle Mission Decisions (Accept/Reject)
  const handleDecision = async (id, action, requestId = null) => {
    try {
      const token = localStorage.getItem('token');
      
      // If it's a MISSION_REQUEST, we use the requestId stored in metadata
      const targetId = requestId || id;

      await axios.patch(`${API_BASE_URL}/requests/${targetId}/respond`, 
        { action: action }, 
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      // Remove from UI
      setNotifications(prev => prev.filter(n => n._id !== id));
      console.log(`PROTOCOL ${action.toUpperCase()}ED: Signal processed.`);
    } catch (err) {
      console.error("Action Error:", err.response?.data);
      alert(err.response?.data?.msg || "Action failed.");
    }
  };

  if (loading) return (
    <div className="p-20 flex flex-col items-center justify-center">
      <div className="w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full animate-spin mb-4" />
      <p className="text-amber-500 animate-pulse font-mono text-[10px] tracking-widest uppercase">Decrypting Signals...</p>
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-black text-white uppercase tracking-tighter italic flex items-center gap-3">
            <Bell size={24} className="text-amber-500" />
            Comms <span className="text-amber-500">Center</span>
          </h1>
          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">
            Active Scans: {notifications.length} transmissions detected
          </p>
        </div>
      </div>

      {/* NOTIFICATIONS / MISSIONS LIST */}
      <div className="space-y-4">
        <AnimatePresence mode='popLayout'>
          {notifications.length > 0 ? (
            notifications.map((item) => {
              const isCollective = item.type?.toUpperCase() === 'COLLECTIVE_INVITE';
              const isMissionRequest = item.type?.toUpperCase() === 'MISSION_REQUEST';

              // 🟢 TYPE A: COLLECTIVE INVITATIONS
              if (isCollective) {
                return (
                  <motion.div
                    key={item._id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                  >
                    <CollectiveNotif 
                      notification={item} 
                      onActionComplete={fetchSignals} 
                    />
                  </motion.div>
                );
              }

              // 🟡 TYPE B: MISSION REQUESTS (Handshake Protocol)
              return (
                <motion.div
                  key={item._id}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="relative group p-6 rounded-[2rem] border border-amber-500/30 bg-slate-900/60 shadow-[0_0_20px_rgba(245,158,11,0.05)] transition-all duration-300"
                >
                  <div className="absolute top-0 left-0 h-full w-1 bg-amber-500 rounded-l-2xl" />

                  <div className="flex flex-col gap-4">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center border border-amber-500/20 overflow-hidden">
                          {item.sender?.identityImage ? (
                             <img 
                              src={getImageUrl(item.sender.identityImage)} 
                              className="w-full h-full object-cover" 
                              alt="Sender" 
                             />
                          ) : (
                             <Cpu className="text-amber-400" size={20} />
                          )}
                        </div>
                        <div>
                          <h3 className="text-sm font-black uppercase tracking-tight text-white">
                            {isMissionRequest ? "New Mission Briefing" : `Briefing: ${item.relatedPost?.title || item.title || "Operational Intel"}`}
                          </h3>
                          <p className="text-[10px] text-amber-400 font-bold uppercase tracking-widest">
                            From Operative: {item.sender?.name || "Unknown"}
                          </p>
                        </div>
                      </div>
                      <span className="text-[9px] font-mono text-slate-500 flex items-center gap-1 uppercase">
                        <Clock size={10} /> {new Date(item.createdAt).toLocaleDateString()}
                      </span>
                    </div>

                    <div className="space-y-3 bg-black/30 p-4 rounded-xl border border-white/5">
                      <div className="flex items-start gap-3">
                         <Target size={14} className="text-amber-500 mt-1 flex-shrink-0" />
                         <div>
                            <p className="text-[9px] font-black text-amber-500/50 uppercase mb-1">Primary Objective</p>
                            <p className="text-xs text-slate-200 leading-relaxed font-medium">
                              {item.message}
                            </p>
                         </div>
                      </div>
                      
                      {isMissionRequest && (
                        <div className="flex items-center gap-2 mt-2 pt-2 border-t border-white/5">
                           <FileText size={12} className="text-slate-500" />
                           <p className="text-[9px] font-bold text-slate-500 uppercase italic">Detailed intelligence encrypted until handshake.</p>
                        </div>
                      )}
                    </div>

                    <div className="flex gap-3 pt-2">
                      <button 
                        onClick={() => handleDecision(item._id, 'accept', item.metadata?.requestId)}
                        className="flex-1 flex items-center justify-center gap-2 py-3 bg-amber-600 hover:bg-amber-500 text-black rounded-xl transition-all font-black text-[10px] uppercase tracking-widest active:scale-95 shadow-[0_4px_15px_rgba(217,119,6,0.2)]"
                      >
                        <ShieldCheck size={14} />
                        Establish Protocol
                      </button>
                      <button 
                        onClick={() => handleDecision(item._id, 'reject', item.metadata?.requestId)}
                        className="px-4 py-3 bg-transparent border border-red-500/20 hover:bg-red-500/10 text-red-500 rounded-xl transition-all active:scale-95"
                      >
                        <ShieldX size={16} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })
          ) : (
            <div className="py-20 text-center border border-dashed border-white/10 rounded-3xl">
              <Bell size={40} className="mx-auto text-slate-800 mb-4" />
              <p className="text-slate-500 font-bold uppercase text-xs tracking-widest">No Active Signals</p>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Notifications;