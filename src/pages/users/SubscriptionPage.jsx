import React, { useState } from 'react';
import axios from 'axios';
// ✅ IMPORT YOUR CONFIG
import { API_BASE_URL } from '../../config/config'; 
import { Shield, Check, Upload, CreditCard, Clock, Star, Zap, ArrowLeft } from 'lucide-react';

const SubscriptionPage = () => {
    const [step, setStep] = useState(1);
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);

    const plans = [
        { 
            name: 'Monthly', 
            price: 29, 
            duration: '30 Days', 
            savings: 'Standard Access',
            recommended: false 
        },
        { 
            name: 'Quarterly', 
            price: 79, 
            duration: '90 Days', 
            savings: 'Save 8 DT',
            recommended: true 
        }
    ];

    const handleNextStep = (plan) => {
        setSelectedPlan(plan);
        setStep(2);
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        if (!file) return alert("Please upload the D17 screenshot.");

        setLoading(true);
        const formData = new FormData();
        formData.append('screenshot', file);
        formData.append('plan', selectedPlan.name);
        formData.append('amount', selectedPlan.price);

        try {
            const token = localStorage.getItem('token');
            
            // ✅ DIRECT HIT TO RENDER VIA YOUR CONFIG
            // We use /payments/submit because API_BASE_URL already includes '/api'
            await axios.post(`${API_BASE_URL}/payments/submit`, formData, {
                headers: { 
                    'Content-Type': 'multipart/form-data',
                    'x-auth-token': token,
                    'Authorization': `Bearer ${token}` 
                }
            });
            setStep(3);
        } catch (err) {
            console.error("Submission Error:", err);
            alert(err.response?.data?.msg || "Protocol Failure: Submission Rejected.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#020617] text-slate-200 p-6 flex flex-col items-center justify-center font-sans">
            
            {/* STEP 1: ELITE PLAN SELECTION */}
            {step === 1 && (
                <div className="max-w-5xl w-full text-center animate-in fade-in zoom-in duration-500">
                    <div className="mb-12">
                        <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tighter text-white uppercase italic">
                            Elevate Your <span className="text-blue-500">Clearance</span>
                        </h1>
                        <p className="text-slate-400 max-w-lg mx-auto font-medium">
                            Secure your position within the Next-Gen Alliance.
                        </p>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        {plans.map((plan) => (
                            <div 
                                key={plan.name} 
                                className={`relative group border ${
                                    plan.recommended 
                                    ? 'border-yellow-500/50 bg-gradient-to-b from-slate-900 to-[#0f172a] shadow-[0_0_40px_-15px_rgba(234,179,8,0.4)]' 
                                    : 'border-white/10 bg-slate-900/40'
                                } p-10 rounded-[2.5rem] transition-all duration-500 hover:scale-[1.02]`}
                            >
                                {plan.recommended && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-yellow-600 to-yellow-400 text-black text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-[0.2em] shadow-lg flex items-center gap-1">
                                        <Star size={12} fill="currentColor" /> Recommended Protocol
                                    </div>
                                )}

                                <h3 className={`text-2xl font-bold mb-1 ${plan.recommended ? 'text-yellow-500' : 'text-white'}`}>
                                    {plan.name} Access
                                </h3>
                                <div className="text-5xl font-black mb-6 text-white tracking-tight">
                                    {plan.price}<span className="text-lg ml-1 text-slate-500">DT</span>
                                </div>

                                <div className="space-y-4 mb-10 text-left">
                                    <div className="flex items-center gap-3 text-slate-300 bg-white/5 p-3 rounded-2xl border border-white/5">
                                        <div className="text-blue-500"><Zap size={18} /></div>
                                        <span className="text-sm font-semibold">{plan.duration} Operational Time</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-slate-300 px-3">
                                        <Check size={18} className="text-green-500" />
                                        <span className="text-sm">Priority Server Intel</span>
                                    </div>
                                    <div className={`flex items-center gap-3 px-3 font-bold italic ${plan.recommended ? 'text-yellow-500/80' : 'text-blue-500/80'}`}>
                                        <Shield size={18} />
                                        <span className="text-sm">{plan.savings}</span>
                                    </div>
                                </div>

                                <button 
                                    onClick={() => handleNextStep(plan)}
                                    className={`w-full py-4 rounded-2xl font-black uppercase tracking-widest transition-all shadow-xl ${
                                        plan.recommended 
                                        ? 'bg-yellow-500 text-black hover:bg-yellow-400' 
                                        : 'bg-blue-600 text-white hover:bg-blue-500'
                                    }`}
                                >
                                    Initialize Handshake
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* STEP 2: D17 UPLOAD (The Render Connection) */}
            {step === 2 && (
                <div className="max-w-md w-full animate-in slide-in-from-bottom-8 duration-500">
                    <button 
                        onClick={() => setStep(1)} 
                        className="flex items-center gap-2 text-slate-500 mb-6 hover:text-white transition-all font-bold uppercase text-[10px] tracking-widest"
                    >
                        <ArrowLeft size={14} /> Re-select Protocol
                    </button>
                    
                    <div className="bg-slate-900/80 border border-white/10 p-8 rounded-[2.5rem] shadow-2xl">
                        <h2 className="text-2xl font-black mb-2 text-white italic">TRANSFER EVIDENCE</h2>
                        
                        <div className="bg-blue-500/10 border border-blue-500/20 p-6 rounded-3xl mb-8">
                            <p className="text-[10px] text-blue-500 mb-2 font-black uppercase tracking-widest text-center text-center">D17 Recipient</p>
                            <div className="bg-black/40 p-4 rounded-2xl border border-white/5 text-center">
                                <p className="text-2xl font-mono tracking-[0.2em] text-white font-bold">22 333 444</p>
                            </div>
                        </div>

                        <form onSubmit={handleUpload} className="space-y-6">
                            <div className="group relative border-2 border-dashed border-slate-700 p-10 rounded-3xl text-center hover:border-blue-500 transition-all bg-black/20">
                                <input 
                                    type="file" 
                                    accept="image/*"
                                    onChange={(e) => setFile(e.target.files[0])}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                />
                                {file ? (
                                    <div className="flex flex-col items-center">
                                        <Check size={32} className="text-green-500 mb-2" />
                                        <p className="text-white text-xs font-bold truncate w-full px-4">{file.name}</p>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center text-slate-500">
                                        <Upload size={32} className="mb-3" />
                                        <span className="text-xs font-black uppercase tracking-tighter">Upload D17 Screenshot</span>
                                    </div>
                                )}
                            </div>

                            <button 
                                disabled={loading}
                                className="w-full py-4 bg-white text-black font-black rounded-2xl hover:bg-blue-600 hover:text-white disabled:opacity-50 transition-all flex justify-center items-center gap-3 uppercase tracking-widest text-sm"
                            >
                                {loading ? "Syncing..." : "Verify Transaction"}
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* STEP 3: SUCCESS */}
            {step === 3 && (
                <div className="max-w-md w-full text-center p-12 border border-white/5 bg-slate-900/60 rounded-[3rem] animate-in zoom-in duration-500 shadow-2xl">
                    <div className="w-24 h-24 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-blue-500/20">
                        <Clock size={40} className="text-blue-500 animate-pulse" />
                    </div>
                    <h2 className="text-3xl font-black mb-4 text-white uppercase italic tracking-tighter">Review <span className="text-blue-500">Initiated</span></h2>
                    <p className="text-slate-400 text-sm font-medium">
                        The Architect is reviewing your evidence via the D17 ledger.
                    </p>
                </div>
            )}
        </div>
    );
};

export default SubscriptionPage;