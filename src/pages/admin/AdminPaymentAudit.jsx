import React, { useState, useEffect } from 'react';
import axios from 'axios';
// ✅ IMPORT YOUR CONFIG
import { API_BASE_URL } from '../../config/config'; 
import { 
  CheckCircle, 
  XCircle, 
  ExternalLink, 
  User, 
  CreditCard, 
  Calendar, 
  ShieldAlert, 
  RefreshCcw,
  Search,
  Zap
} from 'lucide-react';

const AdminPaymentAudit = () => {
    const [payments, setPayments] = useState([]); 
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        fetchPendingPayments();
    }, []);

    const fetchPendingPayments = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const res = await axios.get(`${API_BASE_URL}/payments/pending`, {
                headers: { 
                    'x-auth-token': token,
                    'Authorization': `Bearer ${token}` 
                }
            });

            // ✅ UPDATE: Backend now returns { success: true, data: [...] }
            if (res.data && res.data.success && Array.isArray(res.data.data)) {
                setPayments(res.data.data);
            } else if (Array.isArray(res.data)) {
                // Fallback for old structure
                setPayments(res.data);
            } else {
                console.error("Payload Error: Backend returned non-array data", res.data);
                setPayments([]); 
            }
        } catch (err) {
            console.error("Failed to fetch payments", err);
            setPayments([]);
        } finally {
            setLoading(false);
        }
    };

    const handleApprove = async (paymentId) => {
        if (!window.confirm("Confirm D17 validation? This will restore user access immediately.")) return;
        
        setActionLoading(paymentId);
        try {
            const token = localStorage.getItem('token');
            await axios.patch(`${API_BASE_URL}/payments/approve/${paymentId}`, {}, {
                headers: { 
                    'x-auth-token': token,
                    'Authorization': `Bearer ${token}`
                }
            });
            
            // ✅ Success: Filter out the approved payment from UI
            setPayments(prev => prev.filter(p => p._id !== paymentId));
        } catch (err) {
            alert("Protocol Failure: Could not finalize approval. Ensure you are an Admin.");
            console.error(err);
        } finally {
            setActionLoading(null);
        }
    };

    const filteredPayments = payments.filter(p => 
        p.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.user?.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return (
            <div className="h-[60vh] flex flex-col items-center justify-center space-y-4">
                <div className="w-12 h-12 border-2 border-blue-500/20 border-t-blue-500 rounded-full animate-spin" />
                <p className="text-[10px] font-black text-blue-500 uppercase tracking-[0.3em] animate-pulse">
                    Decrypting Ledger Data...
                </p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-transparent text-slate-300 animate-in fade-in duration-700 p-4 md:p-8">
            {/* ⚡ HEADER SECTION */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
                <div>
                    <h1 className="text-3xl font-black text-white tracking-tighter uppercase italic">
                        Payment <span className="text-blue-500">Audit</span>
                    </h1>
                    <div className="flex items-center gap-2 mt-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">D17 Verification Node Active</p>
                    </div>
                </div>

                <div className="flex items-center gap-4 w-full md:w-auto">
                    <div className="relative flex-1 md:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600" size={14} />
                        <input 
                            type="text" 
                            placeholder="Filter by operative name..."
                            className="w-full bg-white/5 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-xs focus:border-blue-500/50 outline-none transition-all text-white"
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <button 
                        onClick={fetchPendingPayments}
                        className="p-2.5 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all text-slate-400"
                    >
                        <RefreshCcw size={16} />
                    </button>
                </div>
            </div>

            {/* 📊 GRID SECTION */}
            {filteredPayments.length === 0 ? (
                <div className="h-[40vh] border border-dashed border-white/5 rounded-[2.5rem] flex flex-col items-center justify-center text-center p-10">
                    <div className="w-16 h-16 bg-slate-900 rounded-full flex items-center justify-center mb-6 border border-white/5 text-slate-700">
                        <Zap size={24} />
                    </div>
                    <h2 className="text-white font-bold uppercase tracking-widest text-sm">Clear Ledger</h2>
                    <p className="text-slate-500 text-xs mt-2 max-w-xs">No pending D17 evidence currently requires verification in this sector.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredPayments.map((payment) => (
                        <div key={payment._id} className="group relative bg-slate-900/40 border border-white/5 rounded-[2rem] overflow-hidden hover:border-blue-500/30 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/5">
                            {/* EVIDENCE IMAGE */}
                            <div className="relative h-56 bg-black overflow-hidden">
                                <img 
                                    src={payment.screenshot} 
                                    alt="Evidence" 
                                    className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
                                
                                <a 
                                    href={payment.screenshot} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="absolute top-4 right-4 w-10 h-10 bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center border border-white/10 hover:bg-blue-600 transition-all text-white"
                                >
                                    <ExternalLink size={16} />
                                </a>

                                <div className="absolute bottom-4 left-6">
                                    <span className="px-3 py-1 bg-blue-500 text-[10px] font-black text-white uppercase tracking-widest rounded-full">
                                        {payment.plan} Plan
                                    </span>
                                </div>
                            </div>

                            {/* USER INFO */}
                            <div className="p-6">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-white/5 flex items-center justify-center text-blue-500 shadow-inner">
                                        <User size={20} />
                                    </div>
                                    <div>
                                        <h3 className="text-white font-bold text-base tracking-tight">{payment.user?.name || "Unknown Operative"}</h3>
                                        <p className="text-[10px] text-slate-500 font-mono tracking-tighter truncate w-40">{payment.user?.email}</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-3 mb-6">
                                    <div className="bg-white/[0.02] border border-white/5 p-3 rounded-2xl">
                                        <p className="text-[9px] text-slate-500 uppercase font-black tracking-widest mb-1">Currency</p>
                                        <div className="flex items-center gap-2 text-white">
                                            <CreditCard size={12} className="text-blue-500" />
                                            <span className="text-xs font-bold">{payment.amount} <span className="text-blue-500">TND</span></span>
                                        </div>
                                    </div>
                                    <div className="bg-white/[0.02] border border-white/5 p-3 rounded-2xl">
                                        <p className="text-[9px] text-slate-500 uppercase font-black tracking-widest mb-1">Queue Date</p>
                                        <div className="flex items-center gap-2 text-white">
                                            <Calendar size={12} className="text-blue-500" />
                                            <span className="text-xs font-bold">{new Date(payment.createdAt).toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* ACTION HANDLERS */}
                                <div className="flex gap-2">
                                    <button 
                                        onClick={() => handleApprove(payment._id)}
                                        disabled={actionLoading === payment._id}
                                        className="flex-[3] h-12 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl flex items-center justify-center gap-3 transition-all duration-300 disabled:opacity-50 group/btn"
                                    >
                                        {actionLoading === payment._id ? (
                                            <RefreshCcw size={18} className="animate-spin" />
                                        ) : (
                                            <>
                                                <CheckCircle size={18} className="group-hover/btn:scale-110 transition-transform" />
                                                <span className="text-[11px] font-black uppercase tracking-widest">Authorize Access</span>
                                            </>
                                        )}
                                    </button>
                                    
                                    <button className="flex-1 h-12 border border-white/5 hover:bg-red-500/10 hover:border-red-500/20 text-slate-600 hover:text-red-500 rounded-2xl flex items-center justify-center transition-all">
                                        <XCircle size={20} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AdminPaymentAudit;