import React, { useState, useEffect } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios'; // ✅ Added Axios for fresh data sync
import { 
  Shield, 
  User, 
  Bell, 
  LayoutGrid, 
  Flame, 
  Inbox,
  Menu,
  X,
  LogOut,
  Target,
  Zap,
  Users // Added for Collectives
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// ✅ CONFIG INTEGRATION
import { getImageUrl, API_BASE_URL } from '../../config/config';

const Main = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('token');

    if (!storedUser || !token || storedUser.status !== 'Active') {
      navigate('/login');
      return;
    }
    
    // Set initial user from storage
    setUser(storedUser);

    // 🚀 FIX: Fetch fresh data from backend to get the profile picture correctly
    const syncProfile = async () => {
      try {
        const userId = storedUser?._id || storedUser?.id;
        const res = await axios.get(`${API_BASE_URL}/users/profile/${userId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.data.success) {
          setUser(res.data.user); // Update state with fresh DB data (image included)
        }
      } catch (err) {
        console.error("Profile image sync failed:", err);
      }
    };

    syncProfile();

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

  if (!user) return <div className="min-h-screen bg-slate-950" />;

  const isActive = (path) => location.pathname === path || (path !== '/main' && location.pathname.startsWith(path));

  const myProfilePath = user?._id 
    ? `/main/profile/${user._id}` 
    : user?.id 
      ? `/main/profile/${user.id}` 
      : '/main/profile';

  // ✅ UPDATED NAV ITEMS: Added Collectives
  const navItems = [
    { name: 'Feed', path: '/main', icon: <LayoutGrid size={18} /> },
    { name: 'VipFeed', path: '/main/vip', icon: <Flame size={18} /> },
    { name: 'Collectives', path: '/main/collective', icon: <Users size={18} /> },
    { name: 'Chat', path: '/main/Connections', icon: <Inbox size={18} /> }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 flex flex-col font-sans">
      
      {/* --- TOP NAV: ELITE DESIGN --- */}
      <nav className={`h-20 md:h-24 sticky top-0 z-[60] px-4 md:px-10 flex items-center justify-between transition-all duration-700 ${
        scrolled || mobileMenuOpen
        ? 'bg-slate-950/80 backdrop-blur-3xl border-b border-white/5 shadow-[0_10px_40px_rgba(0,0,0,0.7)]' 
        : 'bg-transparent border-b border-white/5'
      }`}>
        
        {/* LOGO SECTION */}
        <div className="flex items-center gap-4">
          <div className="relative group">
            <div className="absolute -inset-2 bg-blue-500/20 rounded-full blur-xl group-hover:bg-blue-500/40 transition duration-500"></div>
            <div className="relative w-11 h-11 bg-gradient-to-br from-slate-800 to-slate-950 border border-blue-500/40 rounded-2xl flex items-center justify-center shadow-2xl">
              <Shield size={24} className="text-blue-500" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-black text-white tracking-[0.1em] text-xl italic uppercase leading-none">
              Chriki <span className="text-blue-500">TN</span>
            </span>
            <span className="text-[8px] font-black uppercase tracking-[0.4em] text-slate-500 mt-1">Authorized Network</span>
          </div>
        </div>

        {/* DESKTOP NAV: UPGRADED UI */}
        <div className="hidden lg:flex items-center gap-2 bg-slate-900/40 p-1.5 border border-white/5 rounded-[2rem] backdrop-blur-md">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`relative px-6 py-2.5 rounded-[1.5rem] text-[10px] font-black uppercase tracking-[0.2em] transition-all flex items-center gap-2 ${
                isActive(item.path) ? 'text-white' : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              {isActive(item.path) && (
                <motion.div 
                  layoutId="activeTab" 
                  className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-500 rounded-[1.5rem] -z-10 shadow-[0_0_20px_rgba(59,130,246,0.5)]" 
                />
              )}
              <span className={isActive(item.path) ? 'text-white' : 'text-slate-600'}>{item.icon}</span>
              {item.name}
            </Link>
          ))}
        </div>

        {/* RIGHT SECTION: GOLD ALERT & ELITE PROFILE */}
        <div className="flex items-center gap-3 md:gap-6">
          
          {/* GOLD ALERT SYSTEM */}
          <Link 
            to="/main/notifications" 
            className={`flex p-2.5 rounded-2xl transition-all relative border border-transparent hover:border-amber-500/30 group ${
              isActive('/main/notifications') ? 'text-amber-500 bg-amber-500/10' : 'text-slate-500 hover:text-amber-500 bg-white/5'
            }`}
          >
            <Bell size={22} className={isActive('/main/notifications') ? 'animate-bounce' : 'group-hover:rotate-12 transition-transform'} />
            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-amber-500 rounded-full shadow-[0_0_10px_rgba(245,158,11,1)] animate-pulse" />
          </Link>
          
          {/* ELITE PROFILE WIDGET */}
          <Link to={myProfilePath} className="hidden sm:flex items-center gap-4 pl-4 border-l border-white/10 group">
            <div className="flex flex-col items-end">
              <span className="text-[11px] font-black text-white uppercase tracking-tighter italic group-hover:text-blue-400 transition-colors">
                {user?.name || "Operative"}
              </span>
              <div className="flex items-center gap-1.5 mt-0.5">
                 <Zap size={10} className="text-amber-500 fill-amber-500" />
                 <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">
                   {user?.role || "Agent"}
                 </span>
              </div>
            </div>
            
            <div className={`relative p-0.5 rounded-2xl border transition-all duration-500 overflow-hidden ${
              isActive('/main/profile') 
              ? 'border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.4)]' 
              : 'border-white/20 group-hover:border-blue-500/50'
            }`}>
              <div className="w-11 h-11 rounded-[0.9rem] overflow-hidden bg-slate-900">
                <img 
                   src={getImageUrl(user?.identityImage) || `https://ui-avatars.com/api/?name=${user?.name || 'U'}&background=0f172a&color=3b82f6&bold=true`}
                   className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                   alt="Profile"
                   onError={(e) => {
                     e.target.src = `https://ui-avatars.com/api/?name=${user?.name || 'U'}&background=0f172a&color=3b82f6&bold=true`;
                   }}
                />
              </div>
              <div className="absolute -bottom-1 -right-1 bg-amber-500 rounded-md p-0.5 border-2 border-slate-950">
                <Target size={10} className="text-black" />
              </div>
            </div>
          </Link>

          <button 
            onClick={handleLogout}
            className="hidden xl:flex items-center gap-2 px-5 py-2.5 bg-red-500/5 border border-red-500/20 text-red-500 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-red-500 hover:text-white transition-all shadow-lg hover:shadow-red-500/20"
          >
            <LogOut size={14} />
            Logout
          </button>

          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-3 text-white bg-slate-900/50 border border-white/10 rounded-2xl backdrop-blur-md"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* --- MOBILE DROPDOWN --- */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden fixed top-[80px] left-0 w-full bg-slate-950/95 border-b border-white/10 z-[55] backdrop-blur-2xl shadow-2xl overflow-hidden"
          >
            <div className="p-6 flex flex-col gap-3">
              <div className="flex items-center gap-4 mb-4 p-4 bg-white/5 rounded-[2rem] border border-white/5">
                <div className="w-12 h-12 rounded-2xl overflow-hidden border border-blue-500/30">
                  <img 
                    src={getImageUrl(user?.identityImage)} 
                    alt="U" 
                    className="w-full h-full object-cover" 
                    onError={(e) => { e.target.src = 'https://ui-avatars.com/api/?background=0D1117&color=3B82F6&name=U' }}
                  />
                </div>
                <div>
                  <h4 className="font-black text-white uppercase text-sm tracking-widest">{user?.name}</h4>
                  <p className="text-[10px] text-blue-500 font-bold uppercase tracking-[0.2em]">{user?.role}</p>
                </div>
              </div>

              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center gap-4 p-5 rounded-[1.5rem] font-black uppercase text-[10px] tracking-[0.2em] ${
                    isActive(item.path) ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'bg-white/5 text-slate-400 border border-white/5'
                  }`}
                >
                  {item.icon}
                  {item.name}
                </Link>
              ))}

              <Link
                to={myProfilePath}
                className={`flex items-center gap-4 p-5 rounded-[1.5rem] font-black uppercase text-[10px] tracking-[0.2em] ${
                  isActive('/main/profile') ? 'bg-blue-600 text-white' : 'bg-white/5 text-slate-400 border border-white/5'
                }`}
              >
                <User size={18} />
                Profile Dossier
              </Link>

              <button 
                onClick={handleLogout}
                className="flex items-center gap-4 p-5 rounded-[1.5rem] font-black uppercase text-[10px] tracking-[0.2em] bg-red-500/10 text-red-500 mt-2 border border-red-500/20"
              >
                <LogOut size={18} />
                End Session
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-1 w-full mx-auto max-w-7xl px-4 md:px-10 py-8 pb-32 lg:pb-12">
        <Outlet />
      </main>

      {/* --- MOBILE BOTTOM FLOATING ISLAND --- */}
      <div className="lg:hidden fixed bottom-8 left-1/2 -translate-x-1/2 z-[60] w-[92%] max-w-[440px]">
        <div className="bg-slate-900/80 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] p-3 flex justify-around items-center shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-t border-white/20">
          {navItems.map((item) => {
            const active = location.pathname === item.path;
            return (
              <Link key={item.name} to={item.path} className="relative p-4 group">
                {active && (
                  <motion.div 
                    layoutId="bottomTab" 
                    className="absolute inset-0 bg-blue-500/10 rounded-2xl -z-10 border border-blue-500/20" 
                  />
                )}
                <div className={`transition-all duration-300 ${active ? 'text-blue-500 scale-125' : 'text-slate-500 hover:text-slate-300'}`}>
                  {item.icon}
                </div>
              </Link>
            );
          })}
          <Link to={myProfilePath} className={`p-1 transition-all duration-300 ${isActive('/main/profile') ? 'scale-110' : ''}`}>
              <div className={`w-8 h-8 rounded-full overflow-hidden border-2 ${isActive('/main/profile') ? 'border-blue-500' : 'border-slate-700'}`}>
                <img 
                  src={getImageUrl(user?.identityImage)} 
                  className="w-full h-full object-cover" 
                  onError={(e) => { e.target.src = 'https://ui-avatars.com/api/?name=U' }}
                  alt=""
                />
              </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Main;