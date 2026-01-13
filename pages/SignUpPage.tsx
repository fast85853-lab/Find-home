
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Mail, Lock, Loader2, ArrowRight } from 'lucide-react';

interface SignUpPageProps {
  onLogin: () => void;
}

const SignUpPage: React.FC<SignUpPageProps> = ({ onLogin }) => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onLogin();
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row-reverse">
      {/* Side: Branding */}
      <div className="hidden md:flex md:w-1/2 bg-blue-600 p-12 flex-col justify-between relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-blue-700"></div>
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        
        <div className="relative z-10 text-white">
          <h2 className="text-4xl font-black italic">GetHome</h2>
          <p className="opacity-80 mt-2 font-medium">Join our growing community</p>
        </div>

        <div className="relative z-10 text-white">
          <h1 className="text-6xl font-black leading-tight mb-6">
            Start Your <br/> Real Estate <br/> Journey.
          </h1>
          <p className="text-lg opacity-80 max-w-sm font-medium">
            Post ads for free, connect with verified buyers, and manage everything from your professional dashboard.
          </p>
        </div>

        <div className="relative z-10 text-white/60 text-sm font-black uppercase tracking-widest">
          Trusted by 5,000+ Agents
        </div>
      </div>

      {/* Side: Form */}
      <div className="flex-1 flex flex-col justify-center items-center p-6 bg-white">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center md:text-left">
            <h2 className="text-4xl font-black text-slate-900 tracking-tight">Create Account</h2>
            <p className="text-slate-500 font-medium mt-2">Join GetHome and find your dream space</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Full Name</label>
              <div className="relative group">
                <User className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={20} />
                <input 
                  required
                  type="text" 
                  className="w-full pl-14 pr-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all font-medium text-slate-900"
                  placeholder="John Doe"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={20} />
                <input 
                  required
                  type="email" 
                  className="w-full pl-14 pr-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all font-medium text-slate-900"
                  placeholder="name@example.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Create Password</label>
              <div className="relative group">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={20} />
                <input 
                  required
                  type="password" 
                  className="w-full pl-14 pr-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all font-medium text-slate-900"
                  placeholder="Min 8 characters"
                />
              </div>
            </div>

            <button 
              disabled={loading}
              className="w-full bg-blue-600 text-white py-5 rounded-[2rem] font-black text-sm uppercase tracking-[0.2em] shadow-2xl shadow-blue-500/20 hover:bg-blue-700 transition-all flex items-center justify-center gap-3 disabled:opacity-70"
            >
              {loading ? <Loader2 className="animate-spin" /> : 'Register Now'}
              {!loading && <ArrowRight size={18} />}
            </button>
          </form>

          <div className="text-center">
            <p className="text-slate-500 font-medium">
              Already have an account? {' '}
              <Link to="/login" className="text-blue-600 font-black hover:underline">Login</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
