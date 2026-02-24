import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Plus, Lock } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import api from '../../../utils/api';
import { toast } from 'react-hot-toast';
import CollectiveCard from './CollectiveCard'; 
import CollectiveUniverse from './CollectiveUniverse'; 
import SubscriptionPage from '../SubscriptionPage'; 

const MainCollective = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [collectives, setCollectives] = useState([]);
  const [fetching, setFetching] = useState(true);
  const [activeSyndicate, setActiveSyndicate] = useState(null);

  const isFreelancer = user?.role === 'Freelancer';
  const isAdminOperative = user?.email === 'bilel.thedeveloper@gmail.com';

  // ✅ THE GHOST PROTOCOL CALCULATION
  const now = Date.now();
  
  // Convert the string date from localStorage into a comparable number
  const expiryTimestamp = user?.accessUntil ? Date.parse(user.accessUntil) : (now + 86400000);
  
  // 1. Check if the date has passed (TunisiaSmart is 2025, so this is TRUE)
  const isExpired = now > expiryTimestamp;
  
  // 2. Check the manual Kill Switch (You set this to TRUE in DB)
  // We check for both boolean and string just in case of DB variations
  const isPaused = user?.isPaused === true || user?.isPaused === "true";
  
  // 3. Status check (Suspended accounts)
  const isSuspended = user?.status === 'Suspended';

  // 🛡️ THE FINAL GATE
  // If ANY of these are true, show the SubscriptionPage (Unless it's you, Bilel)
  const showSubscription = (isExpired || isPaused || isSuspended) && !isAdminOperative;

  // 📡 FETCH CONTROL
  useEffect(() => {
    if (showSubscription) return;

    const fetchCollectives = async () => {
      try {
        setFetching(true);
        const res = await api.get('/collectives');
        const allCollectives = res.data.data || [];
        setCollectives(allCollectives);
      } catch (err) {
        console.error("Discovery Error:", err);
        toast.error("Failed to sync with Syndicate Grid");
      } finally {
        setFetching(false);
      }
    };
    fetchCollectives();
  }, [user?._id, showSubscription]);

  // 🌑 GHOST UI REDIRECT
  if (showSubscription) {
    return <SubscriptionPage isExpiredMode={true} />;
  }

  // 🌌 UNIVERSE VIEW
  if (activeSyndicate) {
    return (
      <div className="relative">
        <button 
          onClick={() => setActiveSyndicate(null)}
          className="fixed top-8 left-8 z-[200] px-6 py-3 bg-black/50 backdrop-blur-xl border border-white/10 rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-white hover:bg-amber-500 hover:text-black transition-all"
        >
          ← Terminate Connection
        </button>
        <CollectiveUniverse 
          data={activeSyndicate} 
          isEditMode={isAdminOperative || activeSyndicate.owner?._id === user?._id}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white p-4 md:p-8 overflow-x-hidden">
      <header className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 mb-16 pt-4">
        <div className="space-y-2 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-3">
            <Users className="text-amber-500" size={24} />
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-amber-500/80">Syndicate Hub</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black italic tracking-tighter uppercase">
            THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600">COLLECTIVES</span>
          </h1>
        </div>

        <button 
          hidden={!isFreelancer}
          onClick={() => navigate('/main/create-collective')}
          className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-black uppercase text-[11px] tracking-widest transition-all
            ${isFreelancer 
              ? 'bg-white text-black hover:scale-105 shadow-[0_0_30px_rgba(255,255,255,0.1)]' 
              : 'bg-slate-900 text-slate-600 border border-white/5 cursor-not-allowed'
            }`}
        >
          {isFreelancer ? <Plus size={16} strokeWidth={3} /> : <Lock size={16} />}
          Initiate Collective
        </button>
      </header>

      <main className="max-w-7xl mx-auto">
        {fetching ? (
          <div className="col-span-full py-40 flex flex-col items-center justify-center border-2 border-dashed border-white/5 rounded-[4rem] bg-slate-900/20">
            <div className="w-12 h-12 border-4 border-amber-500/20 border-t-amber-500 rounded-full animate-spin mb-4" />
            <p className="text-slate-500 font-black uppercase tracking-[0.3em] text-xs">Decrypting Syndicate Data...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {collectives.map((col) => (
              <div key={col._id} onClick={() => setActiveSyndicate(col)} className="cursor-pointer">
                <CollectiveCard col={col} /> 
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default MainCollective;