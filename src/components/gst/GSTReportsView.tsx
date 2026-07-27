import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { FileCheck2, Download, FileSpreadsheet, Printer, CheckCircle2, AlertTriangle, ShieldCheck } from 'lucide-react';

export const GSTReportsView: React.FC = () => {
  const { selectedCompany, selectedFY, addToast } = useApp();
  const [activeTab, setActiveTab] = useState<'GSTR-1' | 'GSTR-3B' | 'HSN Summary' | 'Tax Liability'>('GSTR-1');

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-xl">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-blue-600/20 text-blue-400 rounded-xl border border-blue-500/30">
            <FileCheck2 className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center space-x-2 text-xs text-blue-400 font-semibold">
              <span>{selectedCompany}</span>
              <span>•</span>
              <span className="text-slate-400">{selectedFY}</span>
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight">GST Compliance & Tax Reports</h1>
            <p className="text-xs text-slate-400">GSTR-1 Outward Supplies, GSTR-3B Summary Return & Tax Liability Reconciliation</p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => addToast(`Downloaded JSON File for ${activeTab} Portal Filing`, 'success')}
            className="flex items-center space-x-1.5 px-3 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download GST JSON</span>
          </button>
          <button
            onClick={() => addToast(`Exported ${activeTab} to Excel`, 'success')}
            className="flex items-center space-x-1.5 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
            <span>Export Excel</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center space-x-2 bg-slate-900 border border-slate-800 p-1.5 rounded-xl">
        {(['GSTR-1', 'GSTR-3B', 'HSN Summary', 'Tax Liability'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === tab ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Reconciliation Alert Banner */}
      <div className="bg-gradient-to-r from-emerald-950/60 via-slate-900 to-slate-900 border border-emerald-500/30 p-4 rounded-xl flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <ShieldCheck className="w-6 h-6 text-emerald-400" />
          <div>
            <h2 className="text-xs font-bold text-white">GSTR-2B vs Purchase Input Tax Credit Auto-Reconciled</h2>
            <p className="text-[11px] text-slate-400">98.4% match accuracy across 500 purchase vouchers. Unclaimed ITC: ₹1,42,500.</p>
          </div>
        </div>
        <button
          onClick={() => addToast('Initiating GST Portal Auto-Matching Sync...', 'info')}
          className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold"
        >
          Reconcile GSTR-2B
        </button>
      </div>

      {/* Details Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-xl overflow-hidden p-5 space-y-4">
        <h2 className="text-sm font-bold text-white uppercase tracking-wide">
          {activeTab} Detailed Tax Breakdown (March 2026 Return)
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-800/80 text-slate-300 font-bold uppercase tracking-wider border-b border-slate-700">
              <tr>
                <th className="py-3 px-4">Category / Section</th>
                <th className="py-3 px-4 text-right">Taxable Value (₹)</th>
                <th className="py-3 px-4 text-right">Integrated Tax (IGST) (₹)</th>
                <th className="py-3 px-4 text-right">Central Tax (CGST) (₹)</th>
                <th className="py-3 px-4 text-right">State Tax (SGST) (₹)</th>
                <th className="py-3 px-4 text-right">Total Tax Payable (₹)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              <tr className="hover:bg-slate-800/60">
                <td className="py-3 px-4 font-bold text-slate-100">B2B Inter-State Supplies (IGST @ 18%)</td>
                <td className="py-3 px-4 text-right font-mono">3,45,00,000</td>
                <td className="py-3 px-4 text-right font-mono text-emerald-400 font-semibold">62,10,000</td>
                <td className="py-3 px-4 text-right font-mono text-slate-500">0</td>
                <td className="py-3 px-4 text-right font-mono text-slate-500">0</td>
                <td className="py-3 px-4 text-right font-mono font-bold text-white">62,10,000</td>
              </tr>
              <tr className="hover:bg-slate-800/60">
                <td className="py-3 px-4 font-bold text-slate-100">B2B Intra-State Supplies (CGST + SGST @ 9% each)</td>
                <td className="py-3 px-4 text-right font-mono">4,91,00,000</td>
                <td className="py-3 px-4 text-right font-mono text-slate-500">0</td>
                <td className="py-3 px-4 text-right font-mono text-emerald-400 font-semibold">44,19,000</td>
                <td className="py-3 px-4 text-right font-mono text-emerald-400 font-semibold">44,19,000</td>
                <td className="py-3 px-4 text-right font-mono font-bold text-white">88,38,000</td>
              </tr>
            </tbody>
            <tfoot className="bg-slate-950 font-extrabold text-white border-t-2 border-slate-700">
              <tr>
                <td className="py-3 px-4 uppercase tracking-wider text-blue-400">Total Tax Liability</td>
                <td className="py-3 px-4 text-right font-mono text-slate-200">₹ 8,36,00,000</td>
                <td className="py-3 px-4 text-right font-mono text-emerald-400">₹ 62,10,000</td>
                <td className="py-3 px-4 text-right font-mono text-emerald-400">₹ 44,19,000</td>
                <td className="py-3 px-4 text-right font-mono text-emerald-400">₹ 44,19,000</td>
                <td className="py-3 px-4 text-right font-mono text-blue-400 text-sm">₹ 1,50,48,000</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
};
