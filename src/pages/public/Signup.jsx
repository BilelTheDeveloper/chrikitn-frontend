import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios'; 
import { useAuth } from '../../context/AuthContext'; 
import { 
  Shield, Camera, Lock, Mail, Smartphone, User, 
  ChevronRight, Zap, ArrowLeft, Fingerprint, Link as LinkIcon, Upload, CheckCircle, Target, Edit3
} from 'lucide-react';

// ✅ CLOUDINARY & BASE_URL UPDATE:
import { API_BASE_URL } from '../../config/config';

const EliteInput = ({ icon: Icon, label, name, value, onChange, ...props }) => (
  <div className="space-y-1 group">
    <label className="text-[10px] font-black text-slate-500 uppercase ml-2 tracking-widest group-focus-within:text-blue-500 transition-colors">
      {label}
    </label>
    <div className="relative overflow-hidden rounded-2xl border border-white/5 bg-slate-950/50 group-focus-within:border-blue-500/50 transition-all">
      <Icon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-500 transition-colors" size={17} />
      <input 
        {...props} 
        name={name}
        value={value}
        onChange={onChange}
        className="w-full bg-transparent pl-12 pr-4 py-4 text-white placeholder:text-slate-800 outline-none text-sm" 
      />
      <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-blue-500 group-focus-within:w-full transition-all duration-500" />
    </div>
  </div>
);

const Signup = () => {
  const {login} = useAuth();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const videoRef = useRef(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'Simple',
    portfolioUrl: '',
    speciality: '', // 🏷️ New Badge Field
    customSpeciality: '', // 🏷️ New Custom Field
    password: '',
    confirmPassword: ''
  });
  const [identityFile, setIdentityFile] = useState(null);
  const [emailOtp, setEmailOtp] = useState(""); 

  // --- BADGE OPTIONS LIST ---
  const badgeOptions = [
    "Full-Stack Developer", "Frontend Developer", "Backend Developer",
    "Graphic Designer", "Video Editor", "Motion Designer", "3D Artist",
    "Copywriter", "SEO Specialist", "Social Media Manager", "Other"
  ];

  // Validation Logic
  const isStep1Complete = formData.name && formData.email && formData.phone && identityFile && (formData.role !== 'Freelancer' || formData.speciality);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if(statusMsg) setStatusMsg(''); 
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setIdentityFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // ✅ Trigger Real OTP from Backend using API_BASE_URL
  const triggerOTP = async () => {
    setLoading(true);
    setStatusMsg('');
    try {
      const res = await axios.post(`${API_BASE_URL}/auth/send-otp`, { email: formData.email });
      if (res.data.success) {
        setStep(2);
      }
    } catch (err) {
      setStatusMsg(err.response?.data?.msg || "Transmission Failure: Could not send OTP.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ NEW: Verify OTP using API_BASE_URL
  const handleVerifyOTP = async () => {
    setLoading(true);
    setStatusMsg('');
    try {
      const res = await axios.post(`${API_BASE_URL}/auth/verify-otp`, { 
        email: formData.email, 
        otp: emailOtp 
      });
      if (res.data.success) {
        setStep(3); // Only progress if backend confirms code is valid
      }
    } catch (err) {
      setStatusMsg(err.response?.data?.msg || "Invalid Protocol: Access Denied.");
    } finally {
      setLoading(false);
    }
  };

  const handleFinalize = async () => {
    if (formData.password !== formData.confirmPassword) {
      alert("Secret Keys do not match.");
      return;
    }
    setLoading(true);

    try {
      const data = new FormData();
      Object.keys(formData).forEach(key => data.append(key, formData[key]));
      
      data.append('otp', emailOtp); 

      if (identityFile) data.append('identityImage', identityFile);

      if (videoRef.current && videoRef.current.srcObject) {
        const canvas = document.createElement('canvas');
        canvas.width = videoRef.current.videoWidth;
        canvas.height = videoRef.current.videoHeight;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(videoRef.current, 0, 0);
        const biometricBlob = await new Promise(resolve => canvas.toBlob(resolve, 'image/jpeg', 0.9));
        data.append('biometricImage', biometricBlob, 'biometric_capture.jpg');
        videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      }

      // ✅ Finalize Signup using API_BASE_URL
      const res = await axios.post(`${API_BASE_URL}/auth/signup`, data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      if (res.data.success) {
        login(res.data.user, res.data.token);
        setStep(5);
      }
    } catch (err) {
      const errorMsg = err.response?.data?.msg || "Protocol Failure: Server Unreachable";
      setStatusMsg(errorMsg);
      
      if (errorMsg.includes("OTP")) {
        setStep(2);
      }
    } finally {
      setLoading(false);
    }
  };

  const renderStep1 = () => (
    <motion.div key="s1" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
      {statusMsg && <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-500 text-[9px] font-black uppercase text-center rounded-xl animate-pulse">{statusMsg}</div>}
      <div className="flex flex-col items-center mb-6">
        <div className="relative group">
          <div className="w-24 h-24 rounded-3xl bg-slate-950 border-2 border-dashed border-white/10 flex items-center justify-center overflow-hidden transition-all group-hover:border-blue-500/50">
            {imagePreview ? <img src={imagePreview} className="w-full h-full object-cover" alt="Avatar" /> : <Upload className="text-slate-700" />}
            <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleFileChange} />
          </div>
          <div className="absolute -bottom-2 -right-2 bg-blue-600 p-2 rounded-xl shadow-lg shadow-blue-500/40"><Camera size={12} className="text-white" /></div>
        </div>
        <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest mt-3">Upload Profile Identity</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <EliteInput icon={User} label="Full Name" name="name" placeholder="Beji Caid" value={formData.name} onChange={handleChange} />
        <EliteInput icon={Smartphone} label="Direct Line" name="phone" placeholder="+216 -- --- ---" value={formData.phone} onChange={handleChange} />
        <div className="md:col-span-2">
            <EliteInput icon={Mail} label="Email Protocol" name="email" placeholder="nexus@chriki.tn" value={formData.email} onChange={handleChange} />
        </div>
      </div>

      <div className="space-y-3">
        <label className="text-[10px] font-black text-slate-500 uppercase ml-2 tracking-widest">Select Alliance Role</label>
        <div className="grid grid-cols-3 gap-2">
          {['Simple', 'Freelancer', 'Brand'].map((r) => (
            <button key={r} type="button" onClick={() => setFormData({...formData, role: r})}
              className={`py-3 rounded-xl border transition-all text-[10px] font-black uppercase ${formData.role === r ? 'border-blue-500 bg-blue-500/10 text-white shadow-[0_0_15px_rgba(59,130,246,0.1)]' : 'border-white/5 bg-slate-950 text-slate-600 hover:border-white/10'}`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* 🏷️ ELITE BADGE SELECTION (Conditional) */}
      <AnimatePresence>
        {formData.role === 'Freelancer' && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="space-y-4">
            <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-500 uppercase ml-2 tracking-widest">Freelancer Badge (Speciality)</label>
              <div className="relative overflow-hidden rounded-2xl border border-white/5 bg-slate-950/50 focus-within:border-blue-500/50 transition-all">
                <Target className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={17} />
                <select 
                  name="speciality"
                  value={formData.speciality}
                  onChange={handleChange}
                  className="w-full bg-transparent pl-12 pr-4 py-4 text-white outline-none text-sm appearance-none cursor-pointer"
                >
                  <option value="" disabled className="bg-slate-950 text-slate-500">Choose your badge...</option>
                  {badgeOptions.map(opt => (
                    <option key={opt} value={opt} className="bg-slate-950 text-white">{opt}</option>
                  ))}
                </select>
              </div>
            </div>

            {formData.speciality === 'Other' && (
              <motion.div initial={{ x: -10, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
                <EliteInput icon={Edit3} label="Define Custom Badge" name="customSpeciality" placeholder="E.g. Drone Pilot, Cyber Consultant..." value={formData.customSpeciality} onChange={handleChange} />
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {(formData.role === 'Freelancer' || formData.role === 'Brand') && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
            <EliteInput icon={LinkIcon} label="Portfolio / Work Link" name="portfolioUrl" placeholder="https://behance.net/..." value={formData.portfolioUrl} onChange={handleChange} />
          </motion.div>
        )}
      </AnimatePresence>

      <button 
        type="button" 
        disabled={!isStep1Complete || loading}
        onClick={triggerOTP}
        className={`w-full py-4 font-black uppercase tracking-widest rounded-2xl mt-4 transition-all flex items-center justify-center gap-2 shadow-lg 
          ${isStep1Complete ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-500/20' : 'bg-slate-900 text-slate-600 cursor-not-allowed border border-white/5'}`}
      >
        {loading ? "Transmitting..." : <>Deploy OTP Protocol <ChevronRight size={18} /></>}
      </button>
    </motion.div>
  );

  const renderStep2 = () => (
    <motion.div key="s2" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="space-y-8 text-center">
      <div className="space-y-6">
        {statusMsg && <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-500 text-[9px] font-black uppercase text-center rounded-xl animate-pulse">{statusMsg}</div>}
        <div>
          <p className="text-[10px] font-black text-blue-500 uppercase tracking-[0.3em] mb-6">Verification Layer: Email OTP</p>
          <div className="relative group">
            <input 
              type="text" 
              maxLength="6"
              placeholder="000000"
              value={emailOtp}
              onChange={(e) => {
                setEmailOtp(e.target.value.replace(/[^0-9]/g, ''));
                if(statusMsg) setStatusMsg('');
              }}
              className="w-full bg-slate-950 border-2 border-white/5 group-focus-within:border-blue-500/50 rounded-3xl py-6 text-center text-4xl font-black text-white tracking-[0.4em] outline-none transition-all placeholder:text-slate-900" 
            />
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-4 py-1 bg-slate-900 rounded-full border border-white/10 text-[8px] font-black text-slate-500 uppercase tracking-widest">
                Exactly 6 Digits Required
            </div>
          </div>
        </div>
      </div>
      <button 
        type="button" 
        disabled={emailOtp.length !== 6 || loading}
        onClick={handleVerifyOTP} 
        className={`w-full py-5 font-black uppercase tracking-widest rounded-2xl shadow-xl transition-all
          ${emailOtp.length === 6 ? 'bg-blue-600 text-white shadow-blue-500/20 active:scale-95' : 'bg-slate-900 text-slate-700 cursor-not-allowed opacity-50'}`}
      >
        {loading ? "Checking Intelligence..." : "Authorize Access"}
      </button>
      <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest">Didn't receive code? <span onClick={triggerOTP} className="text-blue-500 cursor-pointer hover:underline">Resend Intel</span></p>
    </motion.div>
  );

  const renderStep3 = () => (
    <motion.div key="s3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
      <EliteInput icon={Lock} label="Secret Key" name="password" type="password" placeholder="••••••••••••" value={formData.password} onChange={handleChange} />
      <EliteInput icon={Shield} label="Confirm Key" name="confirmPassword" type="password" placeholder="••••••••••••" value={formData.confirmPassword} onChange={handleChange} />
      <div className="p-5 bg-slate-950 rounded-2xl border border-white/5 space-y-4">
        <div className="flex justify-between text-[8px] font-black uppercase text-blue-500">
          <span>Entropy Strength</span>
          <span className="animate-pulse">Analyzing...</span>
        </div>
        <div className="flex gap-1.5">
          {[1,2,3,4,5,6].map(i => <div key={i} className={`h-1 flex-1 rounded-full transition-all ${formData.password.length > i*2 ? 'bg-blue-600 shadow-[0_0_10px_rgba(59,130,246,0.5)]' : 'bg-white/5'}`} />)}
        </div>
      </div>
      <button 
        type="button" 
        disabled={!formData.password || formData.password !== formData.confirmPassword}
        onClick={() => setStep(4)} 
        className="w-full py-4 bg-blue-600 text-white font-black uppercase tracking-widest rounded-2xl disabled:bg-slate-900 disabled:text-slate-700"
      >
        Finalize Biometrics
      </button>
    </motion.div>
  );

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if(videoRef.current) videoRef.current.srcObject = stream;
    } catch (err) { alert("Access Denied"); }
  };

  const renderStep4 = () => (
    <motion.div key="s4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
      {statusMsg && <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-500 text-[9px] font-black uppercase text-center rounded-xl">{statusMsg}</div>}
      <div className="relative aspect-video bg-black rounded-[2.5rem] border border-white/10 overflow-hidden group">
        <video ref={videoRef} autoPlay className="w-full h-full object-cover scale-x-[-1]" />
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-40 h-56 border-2 border-blue-500/20 rounded-full border-dashed animate-pulse" />
          <motion.div animate={{ top: ['0%', '100%', '0%'] }} transition={{ duration: 4, repeat: Infinity }} className="absolute left-0 right-0 h-[1px] bg-blue-400 shadow-[0_0_15px_cyan]" />
        </div>
      </div>
      <div className="flex gap-4">
        <button type="button" onClick={startCamera} className="flex-1 py-4 bg-slate-900 border border-white/5 text-white font-black rounded-2xl uppercase text-[9px] tracking-widest hover:bg-slate-800 transition-all">Initialize Cam</button>
        <button 
          type="button" 
          onClick={handleFinalize} 
          disabled={loading}
          className="flex-1 py-4 bg-blue-600 text-white font-black rounded-2xl uppercase text-[9px] tracking-widest shadow-lg shadow-blue-500/40 flex items-center justify-center gap-2"
        >
          {loading ? <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" /> : <Fingerprint size={16} />} 
          {loading ? 'Processing...' : 'Finalize'}
        </button>
      </div>
    </motion.div>
  );

  const renderStep5 = () => (
    <motion.div key="s5" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center space-y-8 py-10">
      <div className="relative mx-auto w-24 h-24">
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }} className="absolute inset-0 border-2 border-dashed border-blue-500/30 rounded-full" />
        <div className="absolute inset-0 flex items-center justify-center">
          <CheckCircle className="text-blue-500 animate-pulse" size={48} />
        </div>
      </div>
      <div className="space-y-4">
        <h3 className="text-2xl font-black text-white uppercase tracking-tighter italic">Registration Logged</h3>
        <div className="inline-block px-4 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full">
            <span className="text-[10px] font-black text-blue-500 uppercase tracking-[0.3em] animate-pulse">Under Review</span>
        </div>
        <p className="text-slate-400 text-sm leading-relaxed max-w-xs mx-auto">
          Your credentials have been submitted to the <span className="text-white font-bold">Chriki Central Node</span>. Verification email pending.
        </p>
      </div>
      <button type="button" onClick={() => window.location.href = '/'} className="px-10 py-3 border border-white/5 bg-white/5 hover:bg-white/10 text-white text-[10px] font-black uppercase tracking-widest rounded-xl transition-all">
        Return to Terminal
      </button>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-slate-950 pt-24 pb-20 px-6 relative flex flex-col items-center justify-center">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-600/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-xl w-full relative z-10">
        <div className="flex items-center justify-between mb-8">
          <button type="button" onClick={() => setStep(Math.max(1, step - 1))} className={`p-3 bg-white/5 rounded-xl text-slate-400 ${step === 1 || step === 5 ? 'opacity-0 pointer-events-none' : ''}`}>
            <ArrowLeft size={20} />
          </button>
          <div className="text-center">
             <div className="inline-flex items-center gap-2 text-blue-500 mb-2 font-black uppercase text-[9px] tracking-[0.5em]"><Shield size={12} /> {step === 5 ? 'Security Status' : `Access Protocol 0${step}`}</div>
             <h2 className="text-3xl font-black text-white uppercase tracking-tighter italic">{step === 5 ? 'Submission' : 'Alliance'} <span className="text-blue-500">{step === 5 ? 'Success' : 'Join'}</span></h2>
          </div>
          <div className="w-10" />
        </div>

        <div className="bg-slate-900/40 border border-white/5 p-8 md:p-10 rounded-[3.5rem] backdrop-blur-3xl shadow-2xl min-h-[520px] flex flex-col justify-center overflow-hidden">
          <AnimatePresence mode="wait">
            {step === 1 && renderStep1()}
            {step === 2 && renderStep2()}
            {step === 3 && renderStep3()}
            {step === 4 && renderStep4()}
            {step === 5 && renderStep5()}
          </AnimatePresence>
        </div>

        <div className="mt-10 flex gap-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex-1">
              <div className={`h-1 rounded-full transition-all duration-700 ${step >= i ? 'bg-blue-600 shadow-[0_0_10px_rgba(59,130,246,0.4)]' : 'bg-white/5'}`} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Signup;