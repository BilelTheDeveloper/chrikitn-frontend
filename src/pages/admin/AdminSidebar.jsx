import React from 'react';
import { 
  ShieldCheck, 
  Users, 
  FileCheck, 
  Settings, 
  Crown, 
  Lock,
  LayoutDashboard,
  Rocket, // ✅ New Icon for Collective Deployment
  CreditCard // ✅ NEW: Icon for Payment Audit
} from 'lucide-react';

const AdminSidebar = ({ activeTab, setActiveTab, isSidebarOpen }) => {
  
  const menuItems = [
    // ✅ Main Dashboard (Command Center)
    {
      id: 'MainDashboard',
      label: 'Main Dashboard',
      icon: <LayoutDashboard size={18} />,
    },
    {
      id: 'verification',
      label: 'User Verification',
      icon: <ShieldCheck size={18} />,
    },
    {
      id: 'postverification',
      label: 'Post Approval',
      icon: <FileCheck size={18} />,
    },
    {
      id: 'vip_verification',
      label: 'VIP Intel',
      icon: <Crown size={18} />,
    },
    // ✅ NEW: Payment Audit Module
    {
      id: 'payment_audit',
      label: 'D17 Audit',
      icon: <CreditCard size={18} />,
    },
    // ✅ NEW: Collective Deployment Module
    {
      id: 'collective_deployment',
      label: 'Syndicate Gates',
      icon: <Rocket size={18} />,
    },
    {
      id: 'roles',
      label: 'Role Management',
      icon: <Settings size={18} />,
    },
    {
      id: 'access_control',
      label: 'Access Terminal',
      icon: <Lock size={18} />,
    },
  ];

  return (
    <aside 
      className={`${
        isSidebarOpen ? 'w-72' : 'w-0'
      } transition-all duration-300 bg-slate-950 border-r border-white/5 flex flex-col z-50`}
    >
      {/* SIDEBAR LOGO AREA */}
      <div className="h-20 flex items-center px-8 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <ShieldCheck className="text-white" size={20} />
          </div>
          {isSidebarOpen && (
            <span className="font-black text-white uppercase tracking-tighter text-lg">
              CHRIKI <span className="text-blue-500 text-xs">HQ</span>
            </span>
          )}
        </div>
      </div>

      {/* NAVIGATION LINKS */}
      <nav className="flex-1 p-6 space-y-2 overflow-y-auto">
        <p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.2em] mb-4 px-2">
          Admin Modules
        </p>
        
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 group ${
              activeTab === item.id 
                ? 'bg-blue-600/10 text-blue-500 border border-blue-500/20' 
                : 'text-slate-500 hover:bg-white/5 hover:text-slate-300 border border-transparent'
            }`}
          >
            <span className={`${activeTab === item.id ? 'text-blue-500' : 'text-slate-500 group-hover:text-slate-300'}`}>
              {item.icon}
            </span>
            {isSidebarOpen && (
              <span className="text-[11px] font-bold uppercase tracking-widest">
                {item.label}
              </span>
            )}
            {activeTab === item.id && (
              <div className="ml-auto w-1.5 h-1.5 bg-blue-500 rounded-full shadow-[0_0_10px_#3b82f6]" />
            )}
          </button>
        ))}
      </nav>

      {/* FOOTER INFO */}
      <div className="p-6 border-t border-white/5">
        <div className="bg-slate-900/50 rounded-2xl p-4 border border-white/5">
          <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">
            Security Status
          </p>
          <p className="text-[10px] text-blue-500 font-bold mt-1">
            ENCRYPTED CONNECTION
          </p>
        </div>
      </div>
    </aside>
  );
};

export default AdminSidebar;