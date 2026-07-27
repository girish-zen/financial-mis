import React from 'react';
import { useApp } from '../../context/AppContext';
import { CreditCard, CheckCircle2, Download, Sparkles, ShieldCheck } from 'lucide-react';

export const SubscriptionView: React.FC = () => {
  const { addToast } = useApp();

  return (
    <div className="p-6 space-y-6 max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-xl">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-emerald-600/20 text-emerald-400 rounded-xl border border-emerald-500/30">
            <CreditCard className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-white tracking-tight">Subscription & Plan Billing</h1>
            <p className="text-xs text-slate-400">Enterprise Cloud License Tier, Expiration Timer & Tax Invoices</p>
          </div>
        </div>

        <button
          onClick={() => addToast('License renewed for 1 Year!', 'success')}
          className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-xl text-xs font-bold shadow-lg"
        >
          Renew Plan (1 Year)
        </button>
      </div>

      {/* Current Active Plan Card */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-emerald-950/40 border border-emerald-500/30 p-6 rounded-2xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 text-[10px] font-extrabold uppercase rounded-full tracking-wider">
            Active Subscription
          </span>
          <h2 className="text-2xl font-black text-white mt-2">Enterprise SaaS Unlimited Plan</h2>
          <p className="text-xs text-slate-400 mt-1">Includes Unlimited Tally Client PCs, AI Insights & Priority 24/7 SLA Support.</p>
        </div>
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-right min-w-[200px]">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Renews On</span>
          <p className="text-base font-extrabold text-white">31st March 2027</p>
          <span className="text-[11px] text-emerald-400 font-semibold block mt-1">253 Days Remaining</span>
        </div>
      </div>

      {/* Invoices Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-xl p-5 space-y-4">
        <h2 className="text-sm font-bold text-white uppercase tracking-wider">Billing Invoice History</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-800 text-slate-300 font-bold uppercase">
              <tr>
                <th className="py-2 px-3">Invoice No</th>
                <th className="py-2 px-3">Date</th>
                <th className="py-2 px-3">Plan Tier</th>
                <th className="py-2 px-3 text-right">Amount (₹)</th>
                <th className="py-2 px-3 text-center">Receipt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              <tr>
                <td className="py-2.5 px-3 font-mono font-bold text-white">INV-2026-9812</td>
                <td className="py-2.5 px-3 font-mono text-slate-400">01-Apr-2026</td>
                <td className="py-2.5 px-3 font-semibold text-emerald-400">Enterprise Annual</td>
                <td className="py-2.5 px-3 text-right font-mono font-bold text-white">₹ 49,999</td>
                <td className="py-2.5 px-3 text-center">
                  <button onClick={() => addToast('Downloaded Invoice INV-2026-9812 PDF', 'info')} className="p-1 hover:bg-slate-800 text-blue-400 rounded">
                    <Download className="w-4 h-4 mx-auto" />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
