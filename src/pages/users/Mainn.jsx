import React, { useState, useEffect } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { 
  Shield, 
  User, 
  Bell, 
  LayoutGrid, 
  Flame, 
  Inbox,
  Menu,
  X,
  LogOut 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// ✅ CONFIG INTEGRATION (For consistency across the app)
import { API_BASE_URL } from '../../config/config';

const Main = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('token');

    // 🛡️ SECURITY KILL-SWITCH
    // If no token or status is not Active, force them out immediately
    if (!storedUser || !token || storedUser.status !== 'Active') {
      navigate('/login');
      return;
    }
    
    setUser(storedUser);

    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  // 🛡️ UI GUARD: If user state isn't set yet, return null to prevent "Authorized Operative" flicker
  if (!user) return <div className="min-h-screen bg-slate-950" />;

  // ✅ IMPROVED: Path matching logic
  const isActive = (path) => location.pathname === path || (path !== '/main' && location.pathname.startsWith(path));

  // ✅ DYNAMIC PROFILE PATH: Handles both _id (MongoDB) and id formats
  const myProfilePath = user?._id 
    ? `/main/profile/${user._id}` 
    : user?.id 
      ? `/main/profile/${user.id}` 
      : '/main/profile';

  const navItems = [
    { name: 'Feed', path: '/main', icon: <LayoutGrid size={20} /> },
    { name: 'VipFeed', path: '/main/vip', icon: <Flame size={20} /> },
    { name: 'Chat', path: '/main/Connections', icon: <Inbox size={20} /> }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 flex flex-col">
      
      {/* --- TOP NAV --- */}
      <nav className={`h-16 md:h-20 sticky top-0 z-[60] px-4 md:px-8 flex items-center justify-between transition-all duration-500 ${
        scrolled || mobileMenuOpen
        ? 'bg-slate-950/90 backdrop-blur-2xl border-b border-blue-500/20 shadow-[0_4px_30px_rgba(0,0,0,0.5)]' 
        : 'bg-transparent border-b border-white/5'
      }`}>
        
        {/* LOGO */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-slate-900 border border-blue-500/30 rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.2)]">
            <Shield size={20} className="text-blue-500" />
          </div>
          <div className="flex flex-col">
            <span className="font-black text-white tracking-tighter text-lg md:text-xl italic uppercase leading-none">
              Chriki <span className="text-blue-500">TN</span>
            </span>
          </div>
        </div>

        {/* DESKTOP NAV */}
        <div className="hidden md:flex items-center gap-1 bg-slate-900/40 p-1 border border-white/5 rounded-2xl">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`relative px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                isActive(item.path) ? 'text-white' : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              {isActive(item.path) && (
                <motion.div 
                  layoutId="activeTab" 
                  className="absolute inset-0 bg-blue-600 rounded-xl -z-10 shadow-[0_0_15px_rgba(59,130,246,0.4)]" 
                />
              )}
              {item.name}
            </Link>
          ))}
        </div>

        {/* RIGHT SECTION: Profile & Disconnect */}
        <div className="flex items-center gap-2 md:gap-4">
          <Link 
            to="/main/notifications" 
            className={`hidden sm:flex p-2 rounded-xl transition-colors relative ${
              isActive('/main/notifications') ? 'text-blue-500 bg-blue-500/10' : 'text-slate-500 hover:text-white'
            }`}
          >
            <Bell size={20} />
            <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
          </Link>
          
          <Link to={myProfilePath} className="flex items-center gap-2 group mr-2">
            <div className={`w-9 h-9 rounded-xl bg-slate-900 border transition-all shadow-inner flex items-center justify-center overflow-hidden ${
              isActive('/main/profile') 
              ? 'border-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.3)]' 
              : 'border-white/10 group-hover:border-blue-500/50'
            }`}>
              <User size={18} className={isActive('/main/profile') ? 'text-blue-500' : 'text-slate-400 group-hover:text-blue-500'} />
            </div>
          </Link>

          <button 
            onClick={handleLogout}
            className="hidden md:flex items-center gap-2 px-4 py-2 bg-red-500/10 border border-red-500/20 text-red-500 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-red-500 hover:text-white transition-all"
          >
            <LogOut size={14} />
            Disconnect
          </button>

          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-white bg-slate-900 border border-white/10 rounded-xl"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* --- MOBILE DROPDOWN --- */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden fixed top-16 left-0 w-full bg-slate-950 border-b border-white/10 z-[55] backdrop-blur-xl shadow-2xl"
          >
            <div className="p-4 flex flex-col gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center gap-4 p-4 rounded-2xl font-bold uppercase text-xs tracking-widest ${
                    isActive(item.path) ? 'bg-blue-600 text-white' : 'bg-white/5 text-slate-400'
                  }`}
                >
                  {item.icon}
                  {item.name}
                </Link>
              ))}

              <Link
                to="/main/notifications"
                className={`flex items-center gap-4 p-4 rounded-2xl font-bold uppercase text-xs tracking-widest ${
                  isActive('/main/notifications') ? 'bg-blue-600 text-white' : 'bg-white/5 text-slate-400'
                }`}
              >
                <Bell size={20} />
                Notifications
              </Link>

              <Link
                to={myProfilePath}
                className={`flex items-center gap-4 p-4 rounded-2xl font-bold uppercase text-xs tracking-widest ${
                  isActive('/main/profile') ? 'bg-blue-600 text-white' : 'bg-white/5 text-slate-400'
                }`}
              >
                <User size={20} />
                Profile Details
              </Link>

              <button 
                onClick={handleLogout}
                className="flex items-center gap-4 p-4 rounded-2xl font-bold uppercase text-xs tracking-widest bg-red-500/10 text-red-500 mt-2 border border-red-500/10"
              >
                <LogOut size={20} />
                Disconnect Session
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-1 w-full mx-auto max-w-7xl px-4 md:px-8 py-6 pb-28 md:pb-10">
        <Outlet />
      </main>

      {/* --- MOBILE BOTTOM TAB BAR --- */}
      <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-[60] w-[90%] max-w-[400px]">
        <div className="bg-slate-900/90 backdrop-blur-2xl border border-white/10 rounded-[2rem] p-2 flex justify-around items-center shadow-2xl shadow-blue-500/10">
          {navItems.map((item) => {
            const active = location.pathname === item.path;
            return (
              <Link key={item.name} to={item.path} className="relative p-3 flex flex-col items-center gap-1">
                <div className={`${active ? 'text-blue-500 scale-110' : 'text-slate-500'}`}>
                  {item.icon}
                </div>
              </Link>
            );
          })}
          <Link to={myProfilePath} className={`p-3 transition-all ${isActive('/main/profile') ? 'text-blue-500 scale-110' : 'text-slate-500'}`}>
            <User size={20} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Main;