import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🛡️ AUTH CHECK: Run once when the app starts
  useEffect(() => {
    const checkUserLoggedIn = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        // ✅ SECURE UPDATE: Call the new backend route to get FRESH data from DB
        // This ensures the 2025 expiration date is caught immediately
        const res = await axios.get('/api/auth/me', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (res.data.success) {
          const freshUserData = res.data.data;
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

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the Auth context easily
export const useAuth = () => useContext(AuthContext);