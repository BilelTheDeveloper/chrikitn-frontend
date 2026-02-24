import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import AdminSidebar from '../admin/AdminSidebar';
import UserVerification from './UserVerification';
import PostVerification from './PostVerification'; 
import VipVerification from './VipVerification'; 
import RoleVerification from './RoleVerification';
import AdminAccess from './AdminAccess'; 
import MainDashboard from './MainDashboard'; 
// ✅ NEW IMPORT: The Collective Deployment Page
import AdminCollectiveVerification from './AdminCollectiveVerification'; 
// ✅ NEW: D17 Payment Audit Module
import AdminPaymentAudit from './AdminPaymentAudit';

const AdminDashboard = () => {
  // Set default to 'MainDashboard' so you see your stats immediately on login
  const [activeTab, setActiveTab] = useState('MainDashboard');
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  // Helper function to render the active module
  const renderTabContent = () => {
    switch (activeTab) {
      // ✅ Main Visual Stats Module
      case 'MainDashboard': 
        return <MainDashboard />;

      case 'verification':
        return <UserVerification />;
      
      case 'roles': 
        return <RoleVerification />;

      case 'vip_verification': 
        return <VipVerification />;

      case 'postverification': 
        return <PostVerification />;

      case 'access_control': 
        return <AdminAccess />;

      // ✅ NEW CASE: The Syndicate Deployment Gate
      case 'collective_deployment': 
        return <AdminCollectiveVerification />;

      // ✅ NEW CASE: D17 Evidence Verification
      case 'payment_audit':
        return <AdminPaymentAudit />;
      
      default:
        return (
          <div className="h-[60vh] flex flex-col items-center justify-center border border-dashed border-white/5 rounded-[3rem]">
            <div className="w-12 h-12 bg-slate-900 rounded-full flex items-center justify-center mb-4 border border-white/5">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-ping" />
            </div>
            <p className="text-slate-600 uppercase text-[10px] font-black tracking-widest">
              Terminal Module Offline: {activeTab} 
            </p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 flex overflow-hidden">
      {/* MODULAR SIDEBAR */}
      <AdminSidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        isSidebarOpen={isSidebarOpen} 
      />

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 relative overflow-y-auto">
        {/* BACKGROUND GLOW EFFECTS */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 blur-[150px] pointer-events-none" />
        
        {/* DYNAMIC HEADER */}
        <header className="h-20 border-b border-white/5 flex items-center justify-between px-8 backdrop-blur-md sticky top-0 z-40 bg-slate-950/50">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setSidebarOpen(!isSidebarOpen)} 
              className="p-2 bg-white/5 rounded-lg text-slate-400 hover:text-white transition-all"
            >
              {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <h1 className="text-sm font-black uppercase tracking-[0.3em] text-white italic">
              System / <span className="text-blue-500">{activeTab.replace('_', ' ')}</span>
            </h1>
          </div>

          <div className="hidden md:flex items-center gap-2 px-4 py-1.5 bg-green-500/10 border border-green-500/20 rounded-full">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
            <span className="text-[10px] font-black text-green-500 uppercase tracking-widest">HQ Online</span>
          </div>
        </header>

        {/* PAGE CONTENT RENDERING */}
        <div className="p-8">
          {renderTabContent()}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;