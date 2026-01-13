
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Lock, Loader2, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface LoginPageProps {
  onLogin: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [loading, setLoading] = useState(false);
  const [showForgot, setShowForgot] = useState(false);
  const [forgotSent, setForgotSent] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onLogin();
    }, 1500);
  };

  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setForgotSent(true);
    }, 1200);
  };

  if (forgotSent) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-slate-900 to-indigo-900">
        <div className="w-full max-w-md bg-white/10 backdrop-blur-xl p-10 rounded-[2.5rem] border border-white/20 shadow-2xl text-center space-y-6 animate-in zoom-in-95 duration-300">
          <div className="inline-flex p-4 bg-green-500/20 text-green-400 rounded-3xl">
            <CheckCircle2 size={48} />
          </div>
          <h2 className="text-3xl font-black text-white italic">Check Your Inbox!</h2>
          <p className="text-slate-300 font-medium">We've sent a password reset link to your email address.</p>
          <button 
            onClick={() => {setForgotSent(false); setShowForgot(false);}}
            className="w-full bg-white text-slate-900 py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-slate-100 transition-all"
          >
            Back to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left side: Branding */}
      <div className="hidden md:flex md:w-1/2 bg-slate-900 p-12 flex-col justify-between relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-indigo-600/20"></div>
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        
        <div className="relative z-10">
          <h2 className="text-4xl font-black text-white italic">GetHome</h2>
          <p className="text-slate-400 mt-2 font-medium">Premium Rental Marketplace</p>
        </div>

        <div className="relative z-10">
          <h1 className="text-6xl font-black text-white leading-tight mb-6">
            Welcome <br/> Back to <br/> Your Space.
          </h1>
          <div className="flex items-center gap-4 text-slate-300">
            <div className="flex -space-x-3">
              {[1,2,3].map(i => <div key={i} className="w-10 h-10 rounded-full border-2 border-slate-900 bg-slate-700" />)}
            </div>
            <p className="text-sm font-bold uppercase tracking-wider">Joined by 10k+ Landlords</p>
          </div>
        </div>

        <div className="relative z-10 flex items-center gap-2 text-blue-400 text-sm font-black uppercase tracking-widest">
          <ShieldCheck size={20} /> Verified & Secure
        </div>
      </div>

      {/* Right side: Form */}
      <div className="flex-1 flex flex-col justify-center items-center p-6 bg-white">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center md:text-left">
            <h2 className="text-4xl font-black text-slate-900 tracking-tight">
              {showForgot ? 'Reset Password' : 'Sign In'}
            </h2>
            <p className="text-slate-500 font-medium mt-2">
              {showForgot ? 'Enter your email to receive a recovery link' : 'Access your listings and leads'}
            </p>
          </div>

          <form onSubmit={showForgot ? handleForgotSubmit : handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={20} />
                <input 
                  required
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-14 pr-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all font-medium text-slate-900"
                  placeholder="name@example.com"
                />
              </div>
            </div>

            {!showForgot && (
              <div className="space-y-2">
                <div className="flex justify-between items-center px-1">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-400">Password</label>
                  <button type="button" onClick={() => setShowForgot(true)} className="text-xs font-black text-blue-600 hover:text-blue-700 uppercase tracking-widest">Forgot?</button>
                </div>
                <div className="relative group">
                  <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={20} />
                  <input 
                    required
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-14 pr-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all font-medium text-slate-900"
                    placeholder="••••••••"
                  />
                </div>
              </div>
            )}

            <button 
              disabled={loading}
              className="w-full bg-slate-900 text-white py-5 rounded-[2rem] font-black text-sm uppercase tracking-[0.2em] shadow-2xl shadow-slate-900/20 hover:bg-slate-800 transition-all flex items-center justify-center gap-3 disabled:opacity-70"
            >
              {loading ? <Loader2 className="animate-spin" /> : (showForgot ? 'Send Link' : 'Login Now')}
              {!loading && <ArrowRight size={18} />}
            </button>

            {showForgot && (
              <button 
                type="button"
                onClick={() => setShowForgot(false)}
                className="w-full text-sm font-black text-slate-400 hover:text-slate-600 uppercase tracking-widest py-2"
              >
                Back to Login
              </button>
            )}
          </form>

          {!showForgot && (
            <div className="text-center">
              <p className="text-slate-500 font-medium">
                Don't have an account? {' '}
                <Link to="/signup" className="text-blue-600 font-black hover:underline">Sign Up</Link>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
