import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Users, Briefcase, Globe, Lock, CheckCircle } from 'lucide-react';

const ServicesPage = () => {
  return (
    <div className="pt-32 pb-20 bg-slate-950 min-h-screen text-white font-sans">
      <div className="container mx-auto px-6">
        {/* --- TITLE --- */}
        <div className="mb-20">
          <h1 className="text-6xl lg:text-8xl font-black uppercase tracking-tighter mb-6 italic">
            THE <span className="text-blue-500 text-glow">ECOSYSTEM</span>
          </h1>
          <p className="text-gray-400 max-w-2xl text-xl leading-relaxed">
            Chriki TN is built on 100% trust. We created a safe space where 
            Tunisian talent and brands work together without fear of scams.
          </p>
        </div>

        <div className="space-y-32">
          
          {/* 01. SECURE ESCROW (THE GUARDIAN) */}
          <div className="grid lg:grid-cols-2 gap-12 items-center border-b border-white/5 pb-20">
            <div>
              <div className="flex items-center gap-2 text-blue-500 mb-4">
                <ShieldCheck size={24} />
                <span className="font-bold uppercase tracking-widest text-sm">Service 01</span>
              </div>
              <h2 className="text-4xl font-black mb-6 uppercase italic">Secure Payments (Escrow)</h2>
              <p className="text-gray-400 text-lg leading-relaxed mb-6">
                Say goodbye to "working for free" or "getting scammed." Chriki holds the money 
                safely in the middle. The freelancer knows the money is there, and the brand 
                knows the work will be delivered. Nobody gets paid until the job is done.
              </p>
              <div className="flex items-center gap-2 text-emerald-400 font-bold">
                <CheckCircle size={18} /> <span>100% Protection for both sides</span>
              </div>
            </div>
            <div className="h-80 bg-blue-600/5 rounded-3xl border border-blue-500/20 flex flex-col items-center justify-center relative overflow-hidden">
                <Lock size={64} className="text-blue-500 mb-4 opacity-50" />
                <span className="text-blue-500 font-black tracking-widest text-xl uppercase">Safe Vault Active</span>
                <div className="absolute bottom-0 left-0 h-1 bg-blue-500 w-full animate-pulse" />
            </div>
          </div>

          {/* 02. FOUNDERS SECTION */}
          <div className="grid lg:grid-cols-2 gap-12 items-center border-b border-white/5 pb-20">
            <div className="order-2 lg:order-1 h-80 bg-blue-900/10 rounded-3xl border border-blue-500/20 flex items-center justify-center">
               <Users size={64} className="text-blue-400 opacity-50" />
            </div>
            <div className="order-1 lg:order-2">
              <div className="flex items-center gap-2 text-blue-500 mb-4">
                <Briefcase size={24} />
                <span className="font-bold uppercase tracking-widest text-sm">Service 02</span>
              </div>
              <h2 className="text-4xl font-black mb-6 uppercase italic">Standard (Founders)</h2>
              <p className="text-gray-400 text-lg leading-relaxed">
                Have a big idea? Share it in the "Public Pitch Feed." You don't have to 
                worry about people stealing your ideas because every single user on Chriki 
                is biometric-verified. We know exactly who is watching.
              </p>
            </div>
          </div>

          {/* 03. FREELANCER SECTION */}
          <div className="grid lg:grid-cols-2 gap-12 items-center border-b border-white/5 pb-20">
            <div>
              <div className="flex items-center gap-2 text-blue-500 mb-4">
                <ShieldCheck size={24} />
                <span className="font-bold uppercase tracking-widest text-sm">Service 03</span>
              </div>
              <h2 className="text-4xl font-black mb-6 uppercase italic">Verified Freelancers</h2>
              <p className="text-gray-400 text-lg leading-relaxed">
                We only accept the best. We manually review your portfolio and check your 
                face-ID. Once you are "Chriki Verified," you get access to high-paying 
                jobs from top Tunisian and International brands.
              </p>
            </div>
            <div className="h-80 bg-indigo-600/10 rounded-3xl border border-indigo-500/20 flex items-center justify-center">
               <span className="text-indigo-500 font-black text-xl tracking-tighter uppercase border-2 border-indigo-500 px-6 py-2 rounded-full">Elite Status</span>
            </div>
          </div>

          {/* 04. THE COLLECTIVE (PAID SERVICE) */}
          <div className="grid lg:grid-cols-2 gap-12 items-center pb-20">
            <div className="order-2 lg:order-1 h-80 bg-slate-900 rounded-3xl border border-blue-500/30 flex flex-col items-center justify-center p-8 text-center group">
               <Globe size={48} className="text-blue-500 mb-4 group-hover:scale-110 transition-transform" />
               <p className="text-blue-400 font-bold uppercase tracking-[0.2em]">chriki.tn/yourname</p>
            </div>
            <div className="order-1 lg:order-2">
              <div className="flex items-center gap-2 text-blue-500 mb-4">
                <Globe size={24} />
                <span className="font-bold uppercase tracking-widest text-sm">Service 04</span>
              </div>
              <h2 className="text-4xl font-black mb-6 uppercase italic">The Collective</h2>
              <p className="text-gray-400 text-lg leading-relaxed mb-6">
                Your professional digital headquarters. Get a high-end portfolio page 
                to show your work to the world. It’s free for the first 3 months! After that, 
                keep your neural link active for a small monthly fee to stay in the syndicate.
              </p>
              <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl inline-block">
                <span className="text-blue-400 font-black tracking-widest text-xs uppercase italic">3-Month Trial Included</span>
              </div>
            </div>
          </div>

        </div>

        {/* --- BOTTOM CTA --- */}
        <div className="mt-32 p-12 lg:p-20 rounded-[3rem] bg-blue-600 text-center">
            <h2 className="text-4xl lg:text-6xl font-black uppercase italic mb-8">Ready to join the syndicate?</h2>
            <button className="bg-white text-blue-600 px-10 py-5 rounded-2xl font-black uppercase tracking-widest hover:scale-105 transition-transform">
                Apply for Access
            </button>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;