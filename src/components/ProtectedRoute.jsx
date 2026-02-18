import React, { useState, useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const ProtectedRoute = () => {
  const location = useLocation();
  const [isChecking, setIsChecking] = useState(true);

  // 1. Retrieve Credentials
  const token = localStorage.getItem('token');
  const userData = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    // Artificial delay or small tick to ensure storage is read correctly
    const timer = setTimeout(() => {
      setIsChecking(false);
    }, 10); 
    return () => clearTimeout(timer);
  }, []);

  // 🛡️ LAYER 1: LOADING SHIELD
  // This prevents the "Ghost Render" of your feed/profile while React initializes
  if (isChecking) {
    return <div className="min-h-screen bg-slate-950" />; 
  }

  // 🛡️ LAYER 2: SESSION & STATUS CHECK
  // Must have a token AND be 'Active' to pass this gate.
  const isAuthorized = token && userData?.status === 'Active';

  if (!isAuthorized) {
    console.error(`🛡️ SECURITY BREACH BLOCKED: Attempt to access ${location.pathname} without authorization.`);
    
    // If they have an account but are 'Pending', send them to /status
    if (token && userData?.status === 'Pending') {
      return <Navigate to="/status" replace />;
    }

    // Otherwise, total stranger -> Kick to Home
    return <Navigate to="/" replace />;
  }

  // ✅ LAYER 3: ACCESS GRANTED
  return <Outlet />;
};

export default ProtectedRoute;