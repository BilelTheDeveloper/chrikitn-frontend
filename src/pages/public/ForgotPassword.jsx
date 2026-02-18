import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Mail, Key, Lock, ChevronRight, Loader2, RefreshCw } from 'lucide-react';
import { API_BASE_URL } from '../../config/config';

const ForgotPassword = () => {
    const navigate = useNavigate();
    
    // --- PROTOCOL STATE ---
    const [step, setStep] = useState(0); 
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [maskedEmail, setMaskedEmail] = useState('');
    
    // --- FORM DATA ---
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // --- VALIDATION LOGIC ---
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const isOtpValid = otp.length === 6;
    const isPasswordValid = password.length >= 6 && password === confirmPassword;

    useEffect(() => { setError(''); }, [email, otp, password, confirmPassword]);

    // 🛡️ STEP 1: Verify Identity & Send OTP
    const handleSendOTP = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            // ✅ FIX: Using API_BASE_URL to point to Render Backend
            const res = await axios.post(`${API_BASE_URL}/password/forgot`, { email });
            setMaskedEmail(res.data.maskedEmail);
            setStep(1);
        } catch (err) {
            setError(err.response?.data?.msg || "Identity not found in database.");
        } finally {
            setLoading(false);
        }
    };

    // 🛡️ STEP 2: Verify OTP
    const handleVerifyOTP = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.post(`${API_BASE_URL}/password/verify-otp`, { email, otp });
            setStep(2);
        } catch (err) {
            setError(err.response?.data?.msg || "Invalid challenge code.");
        } finally {
            setLoading(false);
        }
    };

    // 🛡️ STEP 3: Override Password
    const handleResetPassword = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.post(`${API_BASE_URL}/password/reset`, { email, otp, newPassword: password });
            setStep(3); // Success Step
            setTimeout(() => navigate('/login'), 3000);
        } catch (err) {
            setError(err.response?.data?.msg || "Final handshake failed.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 relative overflow-hidden">
            {/* Background Aesthetic */}
            <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/5 blur-[120px] rounded-full" />
            
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-md w-full relative z-10"
            >
                {/* ICON & TITLE */}
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600/10 border border-blue-500/20 rounded-2xl mb-6 shadow-[0_0_30px_rgba(59,130,246,0.1)]">
                        {step === 3 ? <Lock className="text-green-500" size={32} /> : <Shield className="text-blue-500" size={32} />}
                    </div>
                    <h2 className="text-3xl font-black text-white uppercase tracking-tighter italic">
                        Recovery <span className="text-blue-500">Protocol</span>
                    </h2>
                    <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.4em] mt-2 leading-relaxed">
                        {step === 0 && "Identify Operative Credentials"}
                        {step === 1 && `Verification sent to ${maskedEmail}`}
                        {step === 2 && "Secure Override Authorized"}
                        {step === 3 && "Access Re-established"}
                    </p>
                </div>

                <div className="bg-slate-900/40 border border-white/5 p-8 rounded-[3rem] backdrop-blur-3xl shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />

                    <AnimatePresence mode="wait">
                        {error && (
                            <motion.div 
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                className="mb-6 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] font-black uppercase tracking-widest text-center"
                            >
                                ⚠️ {error}
                            </motion.div>
                        )}

                        {step === 0 && (
                            <motion.form key="step0" onSubmit={handleSendOTP} className="space-y-6">
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black text-slate-500 uppercase ml-2 tracking-widest">Identity Email</label>
                                    <div className="relative">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                                        <input 
                                            type="email" required
                                            className="w-full bg-slate-950/50 border border-white/5 rounded-2xl pl-12 pr-4 py-4 text-white outline-none focus:border-blue-500/50 transition-all text-sm"
                                            placeholder="beji@chriki.tn"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <button 
                                    disabled={!isEmailValid || loading}
                                    className="w-full py-4 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 text-white font-black uppercase tracking-widest rounded-2xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20"
                                >
                                    {loading ? <Loader2 className="animate-spin" size={18} /> : <>Begin Scan <ChevronRight size={18}/></>}
                                </button>
                            </motion.form>
                        )}

                        {step === 1 && (
                            <motion.form key="step1" onSubmit={handleVerifyOTP} className="space-y-6">
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black text-slate-500 uppercase ml-2 tracking-widest text-center block">6-Digit Access Code</label>
                                    <div className="relative">
                                        <Key className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                                        <input 
                                            type="text" required maxLength="6"
                                            className="w-full bg-slate-950/50 border border-white/5 rounded-2xl pl-12 pr-4 py-4 text-white text-2xl tracking-[0.8em] font-mono outline-none focus:border-blue-500/50 transition-all"
                                            placeholder="000000"
                                            value={otp}
                                            onChange={(e) => setOtp(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <button 
                                    disabled={!isOtpValid || loading}
                                    className="w-full py-4 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 text-white font-black uppercase tracking-widest rounded-2xl transition-all flex items-center justify-center gap-2"
                                >
                                    {loading ? <Loader2 className="animate-spin" size={18} /> : <>Verify Identity <ChevronRight size={18}/></>}
                                </button>
                            </motion.form>
                        )}

                        {step === 2 && (
                            <motion.form key="step2" onSubmit={handleResetPassword} className="space-y-4">
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black text-slate-500 uppercase ml-2 tracking-widest text-center block">New Security Key</label>
                                    <input 
                                        type="password" required
                                        className="w-full bg-slate-950/50 border border-white/5 rounded-2xl p-4 text-white outline-none focus:border-blue-500/50 transition-all text-sm"
                                        placeholder="••••••••••••"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                                <input 
                                    type="password" required
                                    className="w-full bg-slate-950/50 border border-white/5 rounded-2xl p-4 text-white outline-none focus:border-blue-500/50 transition-all text-sm"
                                    placeholder="Confirm New Key"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                                <button 
                                    disabled={!isPasswordValid || loading}
                                    className="w-full py-4 bg-green-600 hover:bg-green-500 disabled:bg-slate-800 text-white font-black uppercase tracking-widest rounded-2xl transition-all shadow-lg shadow-green-500/20"
                                >
                                    {loading ? <Loader2 className="animate-spin" size={18} /> : "Override Credentials"}
                                </button>
                            </motion.form>
                        )}

                        {step === 3 && (
                            <motion.div key="step3" initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="text-center py-6">
                                <RefreshCw className="text-green-500 animate-spin mx-auto mb-4" size={40} />
                                <p className="text-white font-black uppercase tracking-widest">Protocol Success</p>
                                <p className="text-slate-500 text-xs mt-2">Redirecting to Login Terminal...</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>
        </div>
    );
};

export default ForgotPassword;