import React from 'react';
// ✅ FIXED: Changed ShieldLock to ShieldCheck
import { User, ShieldCheck, Bell, Palette, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SettingsSidebar = ({ activeTab, setActiveTab }) => {
  const navigate = useNavigate();

  const menuItems = [
    { id: 'profile', label: 'Identity Info', icon: <User size={18} /> },
    { id: 'security', label: 'Access & Security', icon: <ShieldCheck size={18} /> }, // ✅ Fixed here
    { id: 'notifications', label: 'Transmissions', icon: <Bell size={18} /> },
    { id: 'appearance', label: 'UI Interface', icon: <Palette size={18} /> },
  ];

  return (
    <div className="w-full md:w-64 space-y-2">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-slate-500 hover:text-white text-[10px] font-black uppercase tracking-widest mb-8 transition-colors"
      >
        <ArrowLeft size={14} /> Back to Profile
      </button>

      {menuItems.map((item) => (
        <button
          key={item.id}
          onClick={() => setActiveTab(item.id)}
          className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 border ${
            activeTab === item.id 
            ? 'bg-blue-600/10 border-blue-500/50 text-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.1)]' 
            : 'bg-transparent border-transparent text-slate-500 hover:bg-white/5 hover:text-slate-300'
          }`}
        >
          {item.icon}
          <span className="text-[11px] font-black uppercase tracking-wider">{item.label}</span>
        </button>
      ))}
    </div>
  );
};

export default SettingsSidebar;