import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SettingsSidebar from './SettingsSidebar';
import ProfileSettings from './ProfileSettings'; 
import SecuritySettings from './SecuritySettings'; // ✅ NEW: IMPORTED ACTUAL COMPONENT

const SettingsMain = () => {
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row gap-12">
        
        {/* LEFT: Navigation Hub */}
        <aside className="md:sticky md:top-24 h-fit">
          <SettingsSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        </aside>

        {/* RIGHT: Content Node */}
        <main className="flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="bg-slate-900/40 border border-white/5 rounded-[3rem] p-8 md:p-12 backdrop-blur-xl shadow-2xl"
            >
              {/* Conditional Rendering based on Sidebar selection */}
              {activeTab === 'profile' && <ProfileSettings />}
              
              {/* ✅ UPDATED: NOW RENDERS THE ACTUAL SECURITY COMPONENT */}
              {activeTab === 'security' && <SecuritySettings />}
              
              {activeTab === 'notifications' && (
                <div className="py-20 text-center text-slate-600 uppercase text-[10px] font-black tracking-[0.4em]">
                  Notification Protocols Coming Soon
                </div>
              )}

              {activeTab === 'appearance' && (
                <div className="py-20 text-center text-slate-600 uppercase text-[10px] font-black tracking-[0.4em]">
                  UI Customization Coming Soon
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </main>

      </div>
    </div>
  );
};

export default SettingsMain;