import React, { useState } from 'react';
import axios from 'axios';
import { Mail, Phone, Lock, Eye, EyeOff, ShieldCheck, AlertCircle, CheckCircle } from 'lucide-react';
import { API_BASE_URL } from '../../../config/config';

const SecuritySettings = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('token');

    const [formData, setFormData] = useState({
        email: user?.email || '',
        phone: user?.phone || '',
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const [showPass, setShowPass] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleUpdateSecurity = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ type: '', text: '' });

        if (formData.newPassword && formData.newPassword !== formData.confirmPassword) {
            setMessage({ type: 'error', text: 'New passwords do not match.' });
            setLoading(false);
            return;
        }

        try {
            const res = await axios.put(`${API_BASE_URL}/users/profile/update-security`, formData, {
                headers: { Authorization: `Bearer ${token}` }
            });

            // Update local storage with new email/phone if changed
            localStorage.setItem('user', JSON.stringify(res.data.user));
            setMessage({ type: 'success', text: 'Security credentials updated successfully.' });
            setFormData({ ...formData, currentPassword: '', newPassword: '', confirmPassword: '' });
        } catch (err) {
            setMessage({ type: 'error', text: err.response?.data?.message || 'Security protocol breach. Update failed.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-10">
            <div>
                <h2 className="text-2xl font-black text-white uppercase tracking-tighter italic">Access & Security</h2>
                <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.3em] mt-1">Manage your encrypted credentials</p>
            </div>

            <form onSubmit={handleUpdateSecurity} className="space-y-6">
                
                {/* 1. PRIMARY CONTACT INFO */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6 border-b border-white/5">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-2">Registry Email</label>
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={16} />
                            <input 
                                type="email" name="email" value={formData.email} onChange={handleChange}
                                className="w-full bg-slate-950 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white text-sm focus:border-blue-500/50 outline-none transition-all"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-2">Phone Number</label>
                        <div className="relative">
                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={16} />
                            <input 
                                type="text" name="phone" value={formData.phone} onChange={handleChange}
                                className="w-full bg-slate-950 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white text-sm focus:border-blue-500/50 outline-none transition-all"
                                placeholder="+216 -- --- ---"
                            />
                        </div>
                    </div>
                </div>

                {/* 2. PASSWORD MODIFICATION */}
                <div className="space-y-6">
                    <h3 className="text-[10px] font-black text-blue-500 uppercase tracking-[0.2em]">Change Password</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-2">New Password</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={16} />
                                <input 
                                    type={showPass ? "text" : "password"} name="newPassword" value={formData.newPassword} onChange={handleChange}
                                    className="w-full bg-slate-950 border border-white/5 rounded-2xl py-4 pl-12 pr-12 text-white text-sm focus:border-blue-500/50 outline-none transition-all"
                                    placeholder="Leave blank to keep current"
                                />
                                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-600 hover:text-white transition-colors">
                                    {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-2">Confirm New Password</label>
                            <div className="relative">
                                <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={16} />
                                <input 
                                    type={showPass ? "text" : "password"} name="confirmPassword" value={formData.confirmPassword} onChange={handleChange}
                                    className="w-full bg-slate-950 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white text-sm focus:border-blue-500/50 outline-none transition-all"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* 3. AUTHORIZATION BLOCK */}
                <div className="bg-blue-600/5 border border-blue-500/10 p-6 rounded-[2rem] space-y-4">
                    <div className="flex items-center gap-2 text-blue-500">
                        <ShieldCheck size={16} />
                        <span className="text-[10px] font-black uppercase tracking-widest">Authorization Required</span>
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2 text-xs">Current Password</label>
                        <input 
                            type="password" name="currentPassword" value={formData.currentPassword} onChange={handleChange} required
                            className="w-full bg-slate-950 border border-white/10 rounded-2xl py-4 px-6 text-white text-sm focus:border-blue-500 outline-none transition-all"
                            placeholder="Enter current password to save changes"
                        />
                    </div>
                </div>

                {message.text && (
                    <div className={`flex items-center gap-3 p-4 rounded-2xl border ${message.type === 'success' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500' : 'bg-rose-500/10 border-rose-500/20 text-rose-500'}`}>
                        {message.type === 'success' ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
                        <p className="text-[10px] font-black uppercase tracking-widest">{message.text}</p>
                    </div>
                )}

                <button 
                    disabled={loading}
                    className="w-full md:w-auto bg-white text-slate-950 hover:bg-slate-200 disabled:opacity-50 px-10 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all active:scale-95"
                >
                    {loading ? 'Validating...' : 'Apply Security Changes'}
                </button>
            </form>
        </div>
    );
};

export default SecuritySettings;