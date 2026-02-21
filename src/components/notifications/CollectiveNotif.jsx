import React, { useState } from 'react';
import { CheckCircle2, XCircle, Users, Clock, ShieldCheck, Zap } from 'lucide-react';
import api from '../../utils/api';
import { toast } from 'react-hot-toast';
import { getImageUrl } from '../../../config/config';

const CollectiveNotif = ({ notification, onActionComplete }) => {
  const [loading, setLoading] = useState(false);
  const { metadata, ctaStatus, _id, sender } = notification;

  const handleAccept = async () => {
    setLoading(true);
    try {
      // Points to: PUT /api/collectives/accept/:id
      await api.put(`/collectives/accept/${metadata.collectiveId}`, {
        notificationId: _id
      });
      toast.success("SYNDICATE HANDSHAKE CONFIRMED");
      if (onActionComplete) onActionComplete(); 
    } catch (err) {
      toast.error(err.response?.data?.msg || "Handshake Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="group relative bg-slate-900/80 backdrop-blur-xl border border-white/5 rounded-[2.5rem] p-1 transition-all duration-500 hover:border-amber-500/40 hover:shadow-[0_0_40px_rgba(245,158,11,0.1)]">
      {/* GLOW DECORATOR */}
      <div className="absolute -top-px left-10 right-10 h-px bg-gradient-to-r from-transparent via-amber-500/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

      <div className="p-6">
        <div className="flex flex-col md:flex-row items-start gap-6">
          
          {/* LEFT: SENDER IDENTITY */}
          <div className="relative">
            <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-slate-800 bg-slate-950 group-hover:border-amber-500/50 transition-colors duration-500">
              {sender?.identityImage ? (
                <img 
                  src={getImageUrl(sender.identityImage)} 
                  alt="Sender" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Users className="text-slate-700" size={24} />
                </div>
              )}
            </div>
            <div className="absolute -bottom-2 -right-2 p-1.5 bg-amber-500 rounded-lg text-black">
              <Zap size={12} fill="currentColor" />
            </div>
          </div>

          {/* CENTER: INTEL CONTENT */}
          <div className="flex-1 space-y-2">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="space-y-1">
                <h4 className="text-lg font-black uppercase italic text-white tracking-tighter leading-none">
                  {notification.title}
                </h4>
                <div className="flex items-center gap-2">
                  <span className="text-[9px] font-black text-amber-500 uppercase tracking-[0.2em] bg-amber-500/10 px-2 py-0.5 rounded">
                    Syndicate Invite
                  </span>
                  <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1">
                    <Clock size={10} /> {new Date(notification.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-400 font-medium leading-relaxed max-w-lg">
              {notification.message}
            </p>
          </div>

          {/* RIGHT: ACTION ENGINE */}
          <div className="w-full md:w-auto self-center">
            {ctaStatus === 'Pending' ? (
              <div className="flex items-center gap-2">
                <button
                  disabled={loading}
                  onClick={handleAccept}
                  className="relative group/btn overflow-hidden flex items-center justify-center gap-3 px-8 py-4 bg-white hover:bg-amber-500 text-black rounded-2xl transition-all duration-300 disabled:opacity-50 active:scale-95"
                >
                  {loading ? (
                    <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                  ) : (
                    <>
                      <ShieldCheck size={18} strokeWidth={2.5} />
                      <span className="text-[11px] font-black uppercase tracking-[0.15em]">Join Syndicate</span>
                    </>
                  )}
                </button>
                
                <button
                  disabled={loading}
                  className="p-4 bg-slate-950 border border-white/5 text-slate-500 rounded-2xl hover:border-red-500/40 hover:text-red-500 transition-all active:scale-95"
                  title="Decline Protocol"
                >
                  <XCircle size={20} />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3 bg-emerald-500/10 border border-emerald-500/20 px-6 py-3 rounded-2xl">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">
                  Protocol Established
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* FOOTER DECORATOR */}
      <div className="h-1 w-full bg-gradient-to-r from-transparent via-white/5 to-transparent rounded-b-[2.5rem]" />
    </div>
  );
};

export default CollectiveNotif;