import React, { useState } from 'react';
import axios from 'axios';
import { Shield, Check, Upload, CreditCard, Clock } from 'lucide-react';

const SubscriptionPage = () => {
    const [step, setStep] = useState(1);
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const plans = [
        { name: 'Monthly', price: 29, duration: '30 Days', savings: 'Standard Access' },
        { name: 'Quarterly', price: 79, duration: '90 Days', savings: 'Save 8 DT' }
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
            await axios.post('/api/payments/submit', formData, {
                headers: { 
                    'Content-Type': 'multipart/form-data',
                    'x-auth-token': token 
                }
            });
            setStep(3);
        } catch (err) {
            setMessage(err.response?.data?.msg || "Submission failed.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-black text-white p-6 flex flex-col items-center justify-center">
            
            {/* STEP 1: PLAN SELECTION */}
            {step === 1 && (
                <div className="max-w-4xl w-full text-center">
                    <h1 className="text-3xl font-bold mb-2 tracking-widest text-cyan-500">SELECT YOUR CLEARANCE</h1>
                    <p className="text-gray-400 mb-10">Choose your duration to remain active in the Collective.</p>
                    
                    <div className="grid md:grid-cols-2 gap-8">
                        {plans.map((plan) => (
                            <div key={plan.name} className="border border-gray-800 bg-zinc-900/50 p-8 rounded-xl hover:border-cyan-500 transition-all group">
                                <h3 className="text-xl font-bold mb-2">{plan.name} Operative</h3>
                                <div className="text-4xl font-black mb-4 text-cyan-400">{plan.price} DT</div>
                                <ul className="text-left space-y-3 mb-8 text-gray-400">
                                    <li className="flex items-center gap-2"><Check size={16}/> {plan.duration} Active Status</li>
                                    <li className="flex items-center gap-2"><Check size={16}/> Full Collective Access</li>
                                    <li className="flex items-center gap-2 text-cyan-500"><Shield size={16}/> {plan.savings}</li>
                                </ul>
                                <button 
                                    onClick={() => handleNextStep(plan)}
                                    className="w-full py-3 bg-white text-black font-bold rounded-lg hover:bg-cyan-500 hover:text-white transition-colors"
                                >
                                    Select Protocol
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* STEP 2: D17 UPLOAD */}
            {step === 2 && (
                <div className="max-w-md w-full border border-gray-800 p-8 rounded-xl bg-zinc-900">
                    <button onClick={() => setStep(1)} className="text-gray-500 mb-4 hover:text-white transition-colors">← Back to plans</button>
                    <h2 className="text-2xl font-bold mb-6">SUBMIT EVIDENCE</h2>
                    
                    <div className="bg-cyan-900/20 border border-cyan-500/30 p-4 rounded-lg mb-6">
                        <p className="text-sm text-cyan-400 mb-1 font-bold">D17 RECIPIENT DETAILS:</p>
                        <p className="text-lg font-mono tracking-wider">NUMBER: 22 333 444</p> {/* Change to your actual RIB/Phone */}
                        <p className="text-xs text-gray-400 mt-2 italic">Transfer {selectedPlan.price} DT and upload the screenshot below.</p>
                    </div>

                    <form onSubmit={handleUpload} className="space-y-6">
                        <div className="border-2 border-dashed border-gray-700 p-6 rounded-lg text-center hover:border-cyan-500 transition-colors cursor-pointer relative">
                            <input 
                                type="file" 
                                accept="image/*"
                                onChange={(e) => setFile(e.target.files[0])}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            />
                            {file ? (
                                <p className="text-cyan-400 font-bold">{file.name}</p>
                            ) : (
                                <div className="flex flex-col items-center text-gray-500">
                                    <Upload size={32} className="mb-2" />
                                    <span>Click to upload screenshot</span>
                                </div>
                            )}
                        </div>

                        <button 
                            disabled={loading}
                            className="w-full py-4 bg-cyan-600 font-bold rounded-lg hover:bg-cyan-500 disabled:opacity-50 transition-all flex justify-center items-center gap-2"
                        >
                            {loading ? "Processing..." : "Complete Handshake"}
                        </button>
                    </form>
                </div>
            )}

            {/* STEP 3: SUCCESS / PENDING */}
            {step === 3 && (
                <div className="max-w-md w-full text-center p-10 border border-cyan-900 bg-zinc-900/80 rounded-2xl shadow-2xl shadow-cyan-500/10">
                    <div className="w-20 h-20 bg-cyan-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Clock size={40} className="text-cyan-400" />
                    </div>
                    <h2 className="text-2xl font-bold mb-4 uppercase tracking-tighter">Under Review</h2>
                    <p className="text-gray-400 leading-relaxed mb-8">
                        The Architect is verifying your evidence. Access to your Collective will be restored once the transaction is confirmed.
                    </p>
                    <div className="text-xs text-gray-600 font-mono">ESTIMATED TIME: ~2-6 HOURS</div>
                </div>
            )}
        </div>
    );
};

export default SubscriptionPage;