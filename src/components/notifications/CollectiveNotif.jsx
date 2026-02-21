import React, { useState } from 'react';
import { CheckCircle2, XCircle, Users, Clock } from 'lucide-react';
import api from '../../utils/api';
import { toast } from 'react-hot-toast';

const CollectiveNotif = ({ notification, onActionComplete }) => {
  const [loading, setLoading] = useState(false);
  const { metadata, ctaStatus, _id } = notification;

  const handleAccept = async () => {
    setLoading(true);
    try {
      // Points to our new PUT /api/collectives/accept/:id
      await api.put(`/collectives/accept/${metadata.collectiveId}`, {
        notificationId: _id
      });
      toast.success("Syndicate Handshake Confirmed");
      if (onActionComplete) onActionComplete(); // Refresh list
    } catch (err) {
      toast.error(err.response?.data?.msg || "Handshake Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-900 border border-white/5 rounded-3xl p-6 transition-all hover:border-amber-500/20">
      <div className="flex items-start gap-4">
        {/* ICON CIRCLE */}
        <div className="p-3 bg-amber-500/10 rounded-2xl">
          <Users className="text-amber-500" size={20} />
        </div>

        {/* CONTENT */}
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <h4 className="text-sm font-black uppercase italic text-white tracking-tight">
                {notification.title}
              </h4>
              <p className="text-[10px] font-bold text-amber-500/80 uppercase tracking-widest mt-1">
                Phase: Recruitment
              </p>
            </div>
            <span className="text-[8px] text-slate-600 font-black uppercase">
              {new Date(notification.createdAt).toLocaleDateString()}
            </span>
          </div>

          <p className="text-xs text-slate-400 mt-3 leading-relaxed">
            {notification.message}
          </p>

          {/* ACTION SECTION */}
          <div className="mt-6">
            {ctaStatus === 'Pending' ? (
              <div className="flex gap-3">
                <button
                  disabled={loading}
                  onClick={handleAccept}
                  className="flex-1 flex items-center justify-center gap-2 py-3 bg-white text-black text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-amber-500 transition-all disabled:opacity-50"
                >
                  {loading ? (
                    <div className="w-3 h-3 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                  ) : (
                    <>
                      <CheckCircle2 size={14} />
                      Accept Invite
                    </>
                  )}
                </button>
                
                <button
                  disabled={loading}
                  className="px-4 py-3 bg-white/5 text-slate-500 rounded-xl hover:bg-red-500/10 hover:text-red-500 transition-all"
                >
                  <XCircle size={14} />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-emerald-500 bg-emerald-500/5 w-max px-4 py-2 rounded-lg border border-emerald-500/10">
                <CheckCircle2 size={12} />
                <span className="text-[9px] font-black uppercase tracking-widest">Joined Syndicate</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollectiveNotif;