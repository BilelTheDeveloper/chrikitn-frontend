import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const MainDashboard = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                // ✅ MANUAL FIX: Replaced undefined variable with your actual Render URL
                // If your render URL is different, please update this string.
                const backendUrl = "https://chrikitn-backend.onrender.com"; 
                
                const res = await axios.get(`${backendUrl}/api/admin/dashboard-stats`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                });
                
                setStats(res.data.data);
                setLoading(false);
            } catch (err) {
                console.error("❌ Dashboard Sync Failed:", err);
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    if (loading || !stats) {
        return (
            <div className="h-[60vh] flex flex-col items-center justify-center">
                <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="text-slate-500 animate-pulse uppercase text-xs font-black tracking-widest">
                    Synchronizing HQ Data...
                </p>
            </div>
        );
    }

    const chartData = stats.users?.growthData?.map(item => ({
        name: `Month ${item._id.month}`,
        users: item.count
    })) || [];

    return (
        <div className="animate-in fade-in duration-500">
            <h1 className="text-2xl font-black mb-8 text-white tracking-tighter uppercase italic">
                Strategic <span className="text-blue-500">Overview</span>
            </h1>

            {/* --- TOP ROW: STAT CARDS --- */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
                <div className="bg-slate-900/40 border border-white/5 p-6 rounded-[2rem]">
                    <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-2">Active Members</p>
                    <h2 className="text-4xl font-black text-white italic">
                        {stats.users?.userCounts?.find(u => u._id === 'Active')?.count || 0}
                    </h2>
                </div>
                <div className="bg-slate-900/40 border border-white/5 p-6 rounded-[2rem]">
                    <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-2">Pending Verification</p>
                    <h2 className="text-4xl font-black text-yellow-500 italic">
                        {stats.users?.userCounts?.find(u => u._id === 'Pending')?.count || 0}
                    </h2>
                </div>
                <div className="bg-slate-900/40 border border-white/5 p-6 rounded-[2rem]">
                    <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-2">VIP Intel Queue</p>
                    <h2 className="text-4xl font-black text-blue-500 italic">
                        {stats.vipPosts?.find(v => v._id === false)?.count || 0}
                    </h2>
                </div>
                <div className="bg-slate-900/40 border border-white/5 p-6 rounded-[2rem] flex items-center justify-center">
                    <div className="text-center">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mx-auto mb-2" />
                        <p className="text-[10px] font-black text-green-500 uppercase tracking-widest">System Live</p>
                    </div>
                </div>
            </div>

            {/* --- MIDDLE ROW: CHARTS --- */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-slate-900/40 p-8 rounded-[3rem] border border-white/5">
                    <h3 className="text-xs font-black mb-8 text-slate-400 uppercase tracking-[0.2em]">Growth Protocol</h3>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                                <XAxis dataKey="name" stroke="#475569" fontSize={10} tickLine={false} axisLine={false} />
                                <YAxis stroke="#475569" fontSize={10} tickLine={false} axisLine={false} />
                                <Tooltip contentStyle={{ backgroundColor: '#020617', border: '1px solid #1e293b', borderRadius: '1rem' }} />
                                <Line type="monotone" dataKey="users" stroke="#3b82f6" strokeWidth={4} dot={{ r: 4, fill: '#3b82f6' }} activeDot={{ r: 8 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="bg-slate-900/40 p-8 rounded-[3rem] border border-white/5">
                    <h3 className="text-xs font-black mb-8 text-slate-400 uppercase tracking-[0.2em]">Force Composition</h3>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={stats.users?.roleBreakdown}>
                                <XAxis dataKey="_id" stroke="#475569" fontSize={10} tickLine={false} axisLine={false} />
                                <YAxis stroke="#475569" fontSize={10} tickLine={false} axisLine={false} />
                                <Tooltip cursor={{fill: 'transparent'}} contentStyle={{ backgroundColor: '#020617', border: '1px solid #1e293b', borderRadius: '1rem' }} />
                                <Bar dataKey="count" fill="#3b82f6" radius={[10, 10, 0, 0]} barSize={40} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MainDashboard;