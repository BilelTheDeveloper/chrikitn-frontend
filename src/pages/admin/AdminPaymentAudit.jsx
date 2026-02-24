import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CheckCircle, XCircle, ExternalLink, User, CreditCard, Calendar } from 'lucide-react';

const AdminPaymentAudit = () => {
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState(null);

    useEffect(() => {
        fetchPendingPayments();
    }, []);

    const fetchPendingPayments = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await axios.get('/api/payments/pending', {
                headers: { 'x-auth-token': token }
            });
            setPayments(res.data);
            setLoading(false);
        } catch (err) {
            console.error("Failed to fetch payments", err);
            setLoading(false);
        }
    };

    const handleApprove = async (paymentId) => {
        if (!window.confirm("Confirm this D17 screenshot is valid?")) return;
        
        setActionLoading(paymentId);
        try {
            const token = localStorage.getItem('token');
            await axios.patch(`/api/payments/approve/${paymentId}`, {}, {
                headers: { 'x-auth-token': token }
            });
            // Remove approved payment from list
            setPayments(payments.filter(p => p._id !== paymentId));
        } catch (err) {
            alert("Approval failed. Check console.");
        } finally {
            setActionLoading(null);
        }
    };

    if (loading) return <div className="p-10 text-cyan-500 font-mono animate-pulse">SCANNING RECIPIENTS...</div>;

    return (
        <div className="min-h-screen bg-black text-white p-8">
            <div className="max-w-6xl mx-auto">
                <header className="mb-10 flex justify-between items-end border-b border-zinc-800 pb-6">
                    <div>
                        <h1 className="text-3xl font-black tracking-tighter">PAYMENT AUDIT PROTOCOL</h1>
                        <p className="text-gray-500 font-mono text-sm">ARCHITECT ACCESS ONLY // D17 VERIFICATION</p>
                    </div>
                    <div className="text-right">
                        <span className="text-cyan-500 font-bold text-2xl">{payments.length}</span>
                        <p className="text-xs text-gray-600 uppercase">Pending Handshakes</p>
                    </div>
                </header>

                {payments.length === 0 ? (
                    <div className="text-center py-20 border border-dashed border-zinc-800 rounded-2xl">
                        <p className="text-gray-600 italic">No pending evidence found in the database.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {payments.map((payment) => (
                            <div key={payment._id} className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden flex flex-col">
                                {/* SCREENSHOT PREVIEW */}
                                <div className="relative h-48 bg-black group">
                                    <img 
                                        src={payment.screenshot} 
                                        alt="D17 Evidence" 
                                        className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity"
                                    />
                                    <a 
                                        href={payment.screenshot} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="absolute top-2 right-2 bg-black/60 p-2 rounded-full hover:bg-cyan-500 transition-colors"
                                    >
                                        <ExternalLink size={16} />
                                    </a>
                                </div>

                                {/* USER DETAILS */}
                                <div className="p-5 flex-grow">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-cyan-500">
                                            <User size={20} />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-lg leading-tight">{payment.user?.name}</h3>
                                            <p className="text-xs text-gray-500 font-mono">{payment.user?.email}</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 py-4 border-t border-zinc-800">
                                        <div>
                                            <p className="text-[10px] text-gray-500 uppercase font-bold">Plan</p>
                                            <div className="flex items-center gap-1 text-cyan-400">
                                                <Calendar size={14} />
                                                <span className="text-sm font-bold">{payment.plan}</span>
                                            </div>
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-gray-500 uppercase font-bold">Amount</p>
                                            <div className="flex items-center gap-1 text-white">
                                                <CreditCard size={14} />
                                                <span className="text-sm font-bold">{payment.amount} DT</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* ACTION BUTTONS */}
                                <div className="p-4 bg-zinc-950 border-t border-zinc-800 flex gap-3">
                                    <button 
                                        onClick={() => handleApprove(payment._id)}
                                        disabled={actionLoading === payment._id}
                                        className="flex-1 bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-2 rounded flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
                                    >
                                        {actionLoading === payment._id ? "Processing..." : (
                                            <><CheckCircle size={18} /> Approve</>
                                        )}
                                    </button>
                                    <button 
                                        className="px-3 py-2 border border-zinc-800 hover:bg-red-900/20 hover:text-red-500 text-gray-500 rounded transition-all"
                                        title="Reject (Requires Manual Follow-up)"
                                    >
                                        <XCircle size={18} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminPaymentAudit;