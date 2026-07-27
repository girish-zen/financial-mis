import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Lock, Mail, Key, ShieldCheck, ArrowRight } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { setActiveView, addToast } = useApp();
  const [email, setEmail] = useState('admin@vnvfinancial.com');
  const [password, setPassword] = useState('••••••••••••');
  const [step, setStep] = useState<'credentials' | 'otp'>('credentials');
  const [otp, setOtp] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 'credentials') {
      setStep('otp');
      addToast('Security OTP sent to +91 98*** ***45', 'info');
    } else {
      addToast('Authentication successful! Welcome back Aditya.', 'success');
      setActiveView('dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 text-slate-100">
      <div className="bg-slate-900 border border-slate-800 w-full max-w-md rounded-2xl p-8 space-y-6 shadow-2xl relative overflow-hidden">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-400 p-0.5 mx-auto shadow-lg shadow-blue-500/20">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center font-black text-transparent bg-clip-text bg-gradient-to-tr from-blue-400 to-cyan-300 text-xl">
              VNV
            </div>
          </div>
          <h1 className="text-xl font-extrabold text-white tracking-tight">VNV Financial MIS Portal</h1>
          <p className="text-xs text-slate-400">Enterprise Cloud Login & Tally Sync Gateway</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4 text-xs">
          {step === 'credentials' ? (
            <>
              <div>
                <label className="block text-slate-400 font-semibold mb-1">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1">Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>
            </>
          ) : (
            <div>
              <label className="block text-slate-400 font-semibold mb-1">Enter 6-Digit 2FA OTP Code</label>
              <input
                type="text"
                placeholder="1 2 3 4 5 6"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-center text-lg font-mono tracking-widest text-emerald-400 focus:outline-none focus:border-emerald-500"
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold rounded-xl text-xs shadow-lg shadow-blue-500/25 transition-all flex items-center justify-center space-x-2"
          >
            <span>{step === 'credentials' ? 'Continue to 2FA Verification' : 'Authenticate & Open MIS'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
