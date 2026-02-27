import React, { useState } from 'react';
import axios from 'axios';
import { User, Camera, Globe, FileText, CheckCircle, AlertCircle } from 'lucide-react';
import { API_BASE_URL, SOCKET_URL } from '../../../config/config';

const ProfileSettings = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('token');

    // Form State
    const [formData, setFormData] = useState({
        name: user?.name || '',
        bio: user?.bio || '',
        portfolioUrl: user?.portfolioUrl || '',
    });

    const [imageFile, setImageFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(user?.identityImage ? `${SOCKET_URL}/${user.identityImage}` : null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    // Handle Input Changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle Image Preview
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    // Submit Logic
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ type: '', text: '' });

        const data = new FormData();
        data.append('name', formData.name);
        data.append('bio', formData.bio);
        data.append('portfolioUrl', formData.portfolioUrl);
        if (imageFile) data.append('identityImage', imageFile);

        try {
            const res = await axios.put(`${API_BASE_URL}/users/profile/update`, data, {
                headers: { 
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });

            // Update LocalStorage so the UI reflects changes immediately
            localStorage.setItem('user', JSON.stringify(res.data.user));
            setMessage({ type: 'success', text: 'Identity Intel Updated Successfully.' });
        } catch (err) {
            setMessage({ type: 'error', text: err.response?.data?.message || 'Update Protocol Failed.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-10">
            <div>
                <h2 className="text-2xl font-black text-white uppercase tracking-tighter italic">Identity Management</h2>
                <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.3em] mt-1">Modify your public operative profile</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                {/* Avatar Upload Section */}
                <div className="flex flex-col items-center md:items-start gap-6">
                    <div className="relative group">
                        <div className="w-32 h-32 rounded-[2rem] bg-slate-950 border border-white/10 overflow-hidden relative">
                            {previewUrl ? (
                                <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-slate-800">
                                    <User size={40} />
                                </div>
                            )}
                            <label className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                                <Camera size={20} className="text-white mb-1" />
                                <span className="text-[8px] font-black text-white uppercase">Upload</span>
                                <input type="file" className="hidden" onChange={handleImageChange} accept="image/*" />
                            </label>
                        </div>
                    </div>
                </div>

                {/* Input Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-2">Full Name</label>
                        <div className="relative">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={16} />
                            <input 
                                type="text" name="name" value={formData.name} onChange={handleChange}
                                className="w-full bg-slate-950 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white text-sm focus:border-blue-500/50 outline-none transition-all"
                                placeholder="Operative Name"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-2">Portfolio Link</label>
                        <div className="relative">
                            <Globe className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={16} />
                            <input 
                                type="url" name="portfolioUrl" value={formData.portfolioUrl} onChange={handleChange}
                                className="w-full bg-slate-950 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white text-sm focus:border-blue-500/50 outline-none transition-all"
                                placeholder="https://yourportfolio.com"
                            />
                        </div>
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-2">Biography</label>
                    <div className="relative">
                        <FileText className="absolute left-4 top-6 text-slate-600" size={16} />
                        <textarea 
                            name="bio" value={formData.bio} onChange={handleChange} rows="4"
                            className="w-full bg-slate-950 border border-white/5 rounded-[2rem] py-5 pl-12 pr-6 text-white text-sm focus:border-blue-500/50 outline-none transition-all resize-none"
                            placeholder="Write your operative background..."
                        />
                    </div>
                </div>

                {/* Feedback Messages */}
                {message.text && (
                    <div className={`flex items-center gap-3 p-4 rounded-2xl border ${message.type === 'success' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500' : 'bg-rose-500/10 border-rose-500/20 text-rose-500'}`}>
                        {message.type === 'success' ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
                        <p className="text-[10px] font-black uppercase tracking-widest">{message.text}</p>
                    </div>
                )}

                <button 
                    disabled={loading}
                    className="w-full md:w-auto bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white px-10 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all shadow-lg shadow-blue-600/20 active:scale-95"
                >
                    {loading ? 'Synchronizing...' : 'Update Identity'}
                </button>
            </form>
        </div>
    );
};

export default ProfileSettings;