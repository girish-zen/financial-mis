import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Sparkles,
  Monitor,
  Building2,
  Shield,
  ArrowRight,
  CheckCircle2,
  Lock,
  Download,
  Zap,
  Globe,
  Users,
  PieChart,
  MessageSquare,
  FileCheck2,
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { setActiveView, addToast } = useApp();
  const [showDemoModal, setShowDemoModal] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-blue-600 selection:text-white">
      {/* Landing Navbar */}
      <nav className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/80 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-400 p-0.5 shadow-lg shadow-blue-500/20">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center font-black text-transparent bg-clip-text bg-gradient-to-tr from-blue-400 to-cyan-300 text-lg">
                VNV
              </div>
            </div>
            <span className="font-extrabold text-lg tracking-tight text-white">VNV Financial MIS</span>
          </div>

          <div className="hidden md:flex items-center space-x-8 text-xs font-semibold text-slate-300">
            <a href="#features" className="hover:text-blue-400 transition-colors">Features</a>
            <a href="#architecture" className="hover:text-blue-400 transition-colors">How It Works</a>
            <a href="#pricing" className="hover:text-blue-400 transition-colors">Pricing Plans</a>
            <button onClick={() => setActiveView('api-docs')} className="hover:text-blue-400 transition-colors">API Docs</button>
            <button onClick={() => setActiveView('windows-agent')} className="hover:text-blue-400 transition-colors">Windows Agent</button>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => setActiveView('login')}
              className="px-4 py-2 rounded-xl text-xs font-bold text-slate-300 hover:text-white hover:bg-slate-900 transition-all"
            >
              Sign In
            </button>
            <button
              onClick={() => setActiveView('dashboard')}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-lg shadow-blue-600/30 transition-all"
            >
              Launch Live Portal &rarr;
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-20 pb-16 px-6 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-5xl mx-auto text-center space-y-6 relative z-10">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Next-Gen Enterprise Tally Prime Cloud MIS Solution</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white leading-tight">
            Connect <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-cyan-300">Tally Prime</span> on Windows to Cloud Financial MIS
          </h1>

          <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Real-time background sync from client PCs. Instant Balance Sheet, Profit & Loss, Trial Balance, GST Compliance & AI Financial Insights anywhere on any device.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button
              onClick={() => setActiveView('dashboard')}
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm shadow-xl shadow-blue-500/25 transition-all flex items-center space-x-2"
            >
              <span>Explore Interactive Prototype</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setActiveView('windows-agent')}
              className="px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 font-bold text-sm border border-slate-800 transition-all flex items-center space-x-2"
            >
              <Monitor className="w-4 h-4 text-emerald-400" />
              <span>Preview Windows Agent UI</span>
            </button>
          </div>
        </div>
      </section>

      {/* Architecture Section */}
      <section id="architecture" className="py-16 px-6 bg-slate-900/50 border-y border-slate-800">
        <div className="max-w-6xl mx-auto space-y-10">
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Hybrid Cloud SaaS Architecture</h2>
            <p className="text-xs text-slate-400">Zero port-forwarding needed. Encrypted HTTPS background sync service.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center font-bold">1</div>
              <h3 className="text-base font-bold text-white">Client PC (Tally Prime)</h3>
              <p className="text-xs text-slate-400">Tally Prime running on Windows PC. VNV Windows Agent service connects locally on Port 9000.</p>
            </div>
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center font-bold">2</div>
              <h3 className="text-base font-bold text-white">HTTPS REST Sync Engine</h3>
              <p className="text-xs text-slate-400">Pushes XML/JSON vouchers, ledgers & stock entries to VNV Cloud Database with TLS 1.3 encryption.</p>
            </div>
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center font-bold">3</div>
              <h3 className="text-base font-bold text-white">Financial MIS Web Portal</h3>
              <p className="text-xs text-slate-400">Access multi-company financial dashboards, tree-view Balance Sheet, GSTR-1/3B & AI analytics 24/7.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-16 px-6">
        <div className="max-w-6xl mx-auto space-y-10">
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Transparent Commercial Pricing</h2>
            <p className="text-xs text-slate-400">Choose the ideal plan for your accounting operations</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
              <h3 className="text-lg font-bold text-white">Starter</h3>
              <div className="text-3xl font-black text-white">₹ 9,999<span className="text-xs text-slate-400 font-normal"> / year</span></div>
              <p className="text-xs text-slate-400">For small businesses with 1 Tally PC & 1 Company</p>
              <button onClick={() => setActiveView('subscription')} className="w-full py-2 bg-slate-800 text-slate-200 font-bold rounded-xl text-xs">Choose Starter</button>
            </div>
            <div className="bg-slate-900 border-2 border-blue-500 p-6 rounded-2xl space-y-4 relative">
              <span className="absolute -top-3 right-4 bg-blue-600 text-white text-[10px] font-extrabold px-3 py-1 rounded-full uppercase">Most Popular</span>
              <h3 className="text-lg font-bold text-white">Professional</h3>
              <div className="text-3xl font-black text-white">₹ 24,999<span className="text-xs text-slate-400 font-normal"> / year</span></div>
              <p className="text-xs text-slate-400">For growing SMBs with up to 5 Tally client PCs</p>
              <button onClick={() => setActiveView('subscription')} className="w-full py-2 bg-blue-600 text-white font-bold rounded-xl text-xs">Choose Professional</button>
            </div>
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
              <h3 className="text-lg font-bold text-white">Enterprise</h3>
              <div className="text-3xl font-black text-white">₹ 49,999<span className="text-xs text-slate-400 font-normal"> / year</span></div>
              <p className="text-xs text-slate-400">For multi-branch enterprise groups & CA firms</p>
              <button onClick={() => setActiveView('subscription')} className="w-full py-2 bg-slate-800 text-slate-200 font-bold rounded-xl text-xs">Choose Enterprise</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
