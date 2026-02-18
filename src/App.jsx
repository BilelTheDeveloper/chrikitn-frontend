import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';

// 🛡️ IMPORT PROTECTED ROUTE BOUNCER
import ProtectedRoute from './components/ProtectedRoute';

// 1. Layout & Global Components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// 2. Public Content Pages
import Home from './pages/public/Home';
import AboutPage from './pages/public/AboutPage';
import ServicesPage from './pages/public/ServicesPage';
import FeedbackPage from './pages/public/FeedbackPage';

// 3. Authentication Pages
import Login from './pages/public/Login';
import Signup from './pages/public/Signup';
import ForgotPassword from './pages/public/ForgotPassword'; // ✅ ADDED

// 4. Admin & Protected Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import PostVerification from './pages/admin/PostVerification';
import UserVerification from './pages/admin/UserVerification'; 
import VipVerification from './pages/admin/VipVerification'; 
import RoleVerification from './pages/admin/RoleVerification'; 
import AdminAccess from './pages/admin/AdminAccess'; 

// 5. User Main Layout & Sub-pages
import Main from './pages/users/Mainn';
import UserFeed from './pages/users/sub/UserFeed';
import VipFeed from './pages/users/sub/VipFeed';

import Notifications from './pages/users/sub/Notifications'; 
import Profile from './pages/users/Profile'; 

// NEW: MISSION REQUEST PAGE
import RequestMissionPage from './pages/users/sub/RequestMissionPage'; 

// ✅ NEW: SECURE COMMUNICATION PAGES
import Connections from './pages/users/Connections'; 
import ChatRoom from './pages/users/ChatRoom'; 

// 6. VIP ACCESS CONTROL PAGES
import VipAccessDenied from './pages/users/sub/VipAccessDenied';
import VipApplicationForm from './pages/users/sub/VipApplicationForm'; 

// 7. Status Page (The Admin Gatekeeper)
const UnderReview = () => (
  <div className="h-screen bg-slate-950 flex flex-col items-center justify-center text-white p-10 text-center">
    <div className="h-2 w-24 bg-blue-600 animate-pulse mb-8 rounded-full" />
    <h1 className="text-2xl md:text-4xl font-black text-white uppercase tracking-tighter">
      Verification <span className="text-blue-500">In Progress</span>
    </h1>
    <p className="text-gray-400 mt-4 max-w-md leading-relaxed">
      Your biometric data and portfolio are being reviewed by the Chriki TN Admin. 
      You will gain access to the Alliance once verified.
    </p>
    <button onClick={() => window.location.reload()} className="mt-8 text-[10px] font-bold text-blue-500 uppercase tracking-[0.3em] border border-blue-500/20 px-6 py-2 rounded-lg hover:bg-blue-500/5 transition-all">
      Refresh Status
    </button>
  </div>
);

const AppContent = () => {
  const location = useLocation();
  
  // ✅ ENHANCED LOGIC: Hides Navbar/Footer if URL contains 'admin' OR starts with 'main'
  const isImmersivePath = location.pathname.toLowerCase().includes('admin') || location.pathname.startsWith('/main');

  // 🛡️ AUTHENTICATION LOGIC
  const userData = JSON.parse(localStorage.getItem('user')) || {}; 
  const userRole = userData?.role || 'Normal';

  // 🔒 ROLE GATEKEEPER (Now using the Whitelist flag from our backend login)
  const isAdmin = userData?.isAdmin === true && userData?.status === 'Active'; 
  const hasVipAccess = (userRole === 'Freelancer' || userRole === 'Brand' || isAdmin) && userData?.status === 'Active';

  return (
    <div className="bg-slate-950 min-h-screen font-sans selection:bg-blue-500 selection:text-white flex flex-col">
      {!isImmersivePath && <Navbar />} 

      <main className="flex-grow">
        <Routes>
          {/* PUBLIC ROUTES */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/feedback" element={<FeedbackPage />} />
          
          {/* AUTH ROUTES */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} /> {/* ✅ ADDED */}
          
          {/* GATEKEEPER ROUTE */}
          <Route path="/status" element={<UnderReview />} />

          {/* 🔒 PROTECTED USER ROUTES (Requires 'Active' status) */}
          <Route element={<ProtectedRoute />}>
              <Route path="/main" element={<Main />}>
                <Route index element={<UserFeed />} /> 
                <Route 
                  path="vip" 
                  element={hasVipAccess ? <VipFeed /> : <VipAccessDenied />} 
                />
                <Route path="apply-vip" element={<VipApplicationForm />} /> 
                <Route path="connections" element={<Connections />} />
                <Route path="chat/:connectionId" element={<ChatRoom />} />
                <Route path="request-mission/:postId" element={<RequestMissionPage />} />
                <Route path="notifications" element={<Notifications />} />
                <Route path="profile/:id" element={<Profile />} />
                <Route path="profile" element={<Profile />} />
              </Route>
          </Route>

          {/* 🔐 ADMIN ROUTES (Requires 'Active' status + Admin Whitelist) */}
          <Route element={<ProtectedRoute />}>
              <Route 
                path="/admin" 
                element={isAdmin ? <AdminDashboard /> : <Navigate to="/" />} 
              >
                <Route path="posts" element={isAdmin ? <PostVerification /> : <Navigate to="/" />} />
                <Route path="users" element={isAdmin ? <UserVerification /> : <Navigate to="/" />} /> 
                <Route path="access" element={isAdmin ? <AdminAccess /> : <Navigate to="/" />} />
                <Route path="vip-intel" element={isAdmin ? <VipVerification /> : <Navigate to="/" />} /> 
                <Route path="roles" element={isAdmin ? <RoleVerification /> : <Navigate to="/" />} />
              </Route>
          </Route>
          
          {/* FALLBACKS */}
          <Route path="/admin/*" element={isAdmin ? <AdminDashboard /> : <Navigate to="/" />} />
          <Route path="/profile/:id" element={<Profile />} /> 
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>

      {!isImmersivePath && <Footer />}
    </div>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;