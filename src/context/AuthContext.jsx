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
        // You can create a /api/auth/me route later to verify the token
        // For now, we trust the stored user data in localStorage
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) setUser(storedUser);
      } catch (err) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
      setLoading(false);
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