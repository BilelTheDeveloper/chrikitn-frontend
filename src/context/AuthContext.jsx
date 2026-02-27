import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useIdleTimer } from 'react-idle-timer'; // ✅ ADDED

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // ✅ INITIALIZE FROM LOCALSTORAGE: Prevents user being null on refresh
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [loading, setLoading] = useState(true);
  
  // ✅ IDLE STATE
  const [isIdleModalOpen, setIsIdleModalOpen] = useState(false);

  // 🛡️ AUTH CHECK: Run once when the app starts
  useEffect(() => {
    const checkUserLoggedIn = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        // ✅ FRESH DATA FETCH: Get latest status from DB
        const res = await axios.get('/api/auth/me', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (res.data.success) {
          const freshUserData = res.data.data;
          
          // ✅ SYNC STATE: Merge data ensuring subscription fields are present
          setUser(freshUserData);
          
          // Keep localStorage in sync with the latest DB status
          localStorage.setItem('user', JSON.stringify(freshUserData));
        }
      } catch (err) {
        console.error("Session Protocol Failure:", err);
        // If the token is invalid or expired, clear the local session
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkUserLoggedIn();
  }, []);

  // 🚀 LOGIN ACTION
  const login = (userData, token) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  // 🚪 LOGOUT ACTION
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    window.location.href = '/login';
  };

  // ⏳ IDLE TIMER LOGIC
  // Logic: 12 minutes of silence -> Open Modal -> 30 seconds wait -> Logout
  const onIdle = () => {
    setIsIdleModalOpen(false);
    logout();
  };

  const onPrompt = () => {
    // Only show the prompt if there is actually a user logged in
    if (user) {
        setIsIdleModalOpen(true);
    }
  };

  const { activate } = useIdleTimer({
    onIdle,
    onPrompt,
    timeout: 10 * 60 * 1000, // 12 Minutes
    promptTimeout: 30 * 1000, // 30 Seconds warning
    throttle: 500,
    crossTab: true // Syncs logout across all open browser tabs
  });

  const handleStayConnected = () => {
    setIsIdleModalOpen(false);
    activate(); // Resets the 12-minute timer
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, loading }}>
      {!loading && children}

      {/* ⚠️ IDLE WARNING MODAL */}
      {isIdleModalOpen && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-slate-950/90 backdrop-blur-xl p-4">
          <div className="bg-slate-900 border border-white/10 p-8 rounded-[2.5rem] max-w-sm w-full text-center space-y-6 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
            <div className="w-20 h-20 bg-amber-500/10 border border-amber-500/20 rounded-full flex items-center justify-center mx-auto">
              <span className="text-3xl animate-bounce">⏳</span>
            </div>
            
            <div className="space-y-2">
              <h2 className="text-white font-black uppercase tracking-tighter text-2xl italic">Session Timeout</h2>
              <p className="text-slate-400 text-xs font-medium leading-relaxed">
                Operative, you have been inactive for 10 minutes. We will terminate this connection in 30 seconds for your security.
              </p>
            </div>

            <button
              onClick={handleStayConnected}
              className="w-full py-4 bg-white text-black font-black uppercase text-[11px] tracking-[0.2em] rounded-2xl hover:bg-amber-500 transition-all active:scale-95"
            >
              Maintain Connection
            </button>
          </div>
        </div>
      )}
    </AuthContext.Provider>
  );
};

// Custom hook to use the Auth context easily
export const useAuth = () => useContext(AuthContext);