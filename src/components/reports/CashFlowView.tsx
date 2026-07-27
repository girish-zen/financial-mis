import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  ArrowLeftRight,
  Download,
  FileSpreadsheet,
  Printer,
  Calendar,
  TrendingUp,
  CheckCircle2,
} from 'lucide-react';

export const CashFlowView: React.FC = () => {
  const { selectedCompany, selectedFY, addToast } = useApp();

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-xl">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-cyan-600/20 text-cyan-400 rounded-xl border border-cyan-500/30">
            <ArrowLeftRight className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center space-x-2 text-xs text-cyan-400 font-semibold">
              <span>{selectedCompany}</span>
              <span>•</span>
              <span className="text-slate-400">{selectedFY}</span>
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight">Cash Flow Statement</h1>
            <p className="text-xs text-slate-400">Direct & Indirect Cash Movements Across Operations, Investing & Financing</p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => addToast('Exported Cash Flow Statement to PDF', 'success')}
            className="flex items-center space-x-1.5 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700"
          >
            <Download className="w-3.5 h-3.5 text-blue-400" />
            <span>Export PDF</span>
          </button>
          <button
            onClick={() => addToast('Exported Cash Flow Statement to Excel', 'success')}
            className="flex items-center space-x-1.5 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
            <span>Export Excel</span>
          </button>
          <button
            onClick={() => window.print()}
            className="flex items-center space-x-1.5 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700"
          >
            <Printer className="w-3.5 h-3.5 text-slate-300" />
            <span>Print</span>
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
          <span className="text-xs font-semibold text-slate-400">Operating Activities</span>
          <p className="text-xl font-extrabold text-emerald-400 mt-1">+ ₹ 2,84,00,000</p>
          <span className="text-[10px] text-slate-400 mt-1 block">Inflows from Customers</span>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
          <span className="text-xs font-semibold text-slate-400">Investing Activities</span>
          <p className="text-xl font-extrabold text-rose-400 mt-1">- ₹ 42,00,000</p>
          <span className="text-[10px] text-slate-400 mt-1 block">CAPEX & Server Additions</span>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
          <span className="text-xs font-semibold text-slate-400">Financing Activities</span>
          <p className="text-xl font-extrabold text-amber-400 mt-1">- ₹ 35,00,000</p>
          <span className="text-[10px] text-slate-400 mt-1 block">Bank Debt Repayments</span>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl bg-gradient-to-br from-slate-900 to-cyan-950/40 border-cyan-500/30">
          <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wide">Net Change in Liquidity</span>
          <p className="text-2xl font-black text-white mt-1">+ ₹ 2,07,00,000</p>
          <span className="text-[10px] text-cyan-300 font-semibold block mt-1">Closing Cash: ₹ 1.34 Cr</span>
        </div>
      </div>

      {/* Cash Flow Statement Details Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-slate-800/80 px-5 py-3 border-b border-slate-700 flex justify-between items-center">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider">Cash Flow Particulars</h2>
          <span className="text-xs text-slate-400 font-medium">Period: FY 2025-26</span>
        </div>
        <div className="divide-y divide-slate-800 text-xs">
          {/* Operating */}
          <div className="bg-slate-800/30 p-3 font-bold text-emerald-400 uppercase tracking-wide">
            A. CASH FLOW FROM OPERATING ACTIVITIES
          </div>
          <div className="flex justify-between py-2.5 px-6 text-slate-300">
            <span>Net Profit before Tax & Adjustments</span>
            <span className="font-mono font-semibold">₹ 2,24,00,000</span>
          </div>
          <div className="flex justify-between py-2.5 px-6 text-slate-300">
            <span>Add: Non-Cash Depreciation & Amortization</span>
            <span className="font-mono font-semibold">₹ 24,00,000</span>
          </div>
          <div className="flex justify-between py-2.5 px-6 text-slate-300">
            <span>Decrease in Working Capital & Receivables</span>
            <span className="font-mono font-semibold">₹ 36,00,000</span>
          </div>
          <div className="flex justify-between py-2.5 px-6 font-bold bg-slate-950/40 text-emerald-400">
            <span>NET CASH FROM OPERATING ACTIVITIES (A)</span>
            <span className="font-mono text-sm">₹ 2,84,00,000</span>
          </div>

          {/* Investing */}
          <div className="bg-slate-800/30 p-3 font-bold text-rose-400 uppercase tracking-wide">
            B. CASH FLOW FROM INVESTING ACTIVITIES
          </div>
          <div className="flex justify-between py-2.5 px-6 text-slate-300">
            <span>Purchase of Fixed Assets & Servers</span>
            <span className="font-mono font-semibold text-rose-400">(₹ 42,00,000)</span>
          </div>
          <div className="flex justify-between py-2.5 px-6 font-bold bg-slate-950/40 text-rose-400">
            <span>NET CASH USED IN INVESTING ACTIVITIES (B)</span>
            <span className="font-mono text-sm">(₹ 42,00,000)</span>
          </div>

          {/* Financing */}
          <div className="bg-slate-800/30 p-3 font-bold text-amber-400 uppercase tracking-wide">
            C. CASH FLOW FROM FINANCING ACTIVITIES
          </div>
          <div className="flex justify-between py-2.5 px-6 text-slate-300">
            <span>Repayment of Long-Term Debt / Loan</span>
            <span className="font-mono font-semibold text-rose-400">(₹ 35,00,000)</span>
          </div>
          <div className="flex justify-between py-2.5 px-6 font-bold bg-slate-950/40 text-amber-400">
            <span>NET CASH USED IN FINANCING ACTIVITIES (C)</span>
            <span className="font-mono text-sm">(₹ 35,00,000)</span>
          </div>

          {/* Net Increase */}
          <div className="flex justify-between py-4 px-6 bg-slate-950 font-black text-white text-sm">
            <span>NET INCREASE IN CASH AND CASH EQUIVALENTS (A + B + C)</span>
            <span className="font-mono text-cyan-400 text-base">₹ 2,07,00,000</span>
          </div>
        </div>
      </div>
    </div>
  );
};
