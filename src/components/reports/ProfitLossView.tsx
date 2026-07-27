import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  PieChart as PieIcon,
  Download,
  FileSpreadsheet,
  Printer,
  ArrowUpRight,
  CheckCircle2,
  RefreshCw,
  Zap,
} from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export const ProfitLossView: React.FC = () => {
  const {
    selectedCompany,
    selectedFY,
    addToast,
    financialData,
    isSyncing,
    justSynced,
    syncProgressPercent,
    syncStageMessage,
    recentDeltaSales,
    recentDeltaPurchase,
    triggerSyncNow,
  } = useApp();

  const totalRevenue = financialData.totalSales;
  const directCost = financialData.totalPurchase;
  const grossProfit = totalRevenue - directCost;
  const netProfit = financialData.netProfit;

  const comparisonData = [
    { category: 'Gross Sales', current: totalRevenue, previous: 71000000 },
    { category: 'Direct Cost', current: directCost, previous: 32000000 },
    { category: 'Gross Profit', current: grossProfit, previous: 39000000 },
    { category: 'Indirect Exp', current: financialData.expenses, previous: 19500000 },
    { category: 'Net Profit', current: netProfit, previous: 19500000 },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Live Sync Progress Banner */}
      {isSyncing && (
        <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 border-2 border-blue-400 p-4 rounded-2xl shadow-2xl animate-pulse text-white space-y-2">
          <div className="flex items-center justify-between text-xs font-bold">
            <div className="flex items-center space-x-2">
              <RefreshCw className="w-4 h-4 animate-spin text-cyan-400" />
              <span>Updating Profit & Loss Statement from Tally... {syncStageMessage}</span>
            </div>
            <span className="font-mono text-cyan-300 font-black text-sm">{syncProgressPercent}%</span>
          </div>
          <div className="w-full bg-slate-950 h-2.5 rounded-full overflow-hidden border border-slate-700">
            <div
              className="bg-gradient-to-r from-cyan-400 to-emerald-400 h-full rounded-full transition-all duration-300"
              style={{ width: `${syncProgressPercent}%` }}
            ></div>
          </div>
        </div>
      )}

      {/* Just Synced Banner */}
      {justSynced && !isSyncing && (
        <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-950 border-2 border-emerald-500/60 p-4 rounded-2xl shadow-2xl flex items-center justify-between text-emerald-300 animate-bounce-short">
          <div className="flex items-center space-x-3">
            <Zap className="w-5 h-5 text-emerald-400" />
            <div>
              <h2 className="text-xs font-bold text-white">Profit & Loss Ingested from Tally Prime</h2>
              <p className="text-[11px] text-emerald-300">
                Gross Turnover updated to <span className="font-mono font-bold text-white">₹ {(totalRevenue / 100000).toFixed(1)}L</span> (+₹ {(recentDeltaSales / 100000).toFixed(1)}L) & Net Profit updated to <span className="font-mono font-bold text-white">₹ {(netProfit / 100000).toFixed(1)}L</span>.
              </p>
            </div>
          </div>
          <span className="text-[10px] bg-emerald-500/20 px-3 py-1 rounded-full text-emerald-200 font-extrabold uppercase">
            P&L Values Refreshed
          </span>
        </div>
      )}

      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-xl">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-purple-600/20 text-purple-400 rounded-xl border border-purple-500/30">
            <PieIcon className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center space-x-2 text-xs text-purple-400 font-semibold">
              <span>{selectedCompany}</span>
              <span>•</span>
              <span className="text-slate-400">{selectedFY}</span>
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight">Profit & Loss Statement</h1>
            <p className="text-xs text-slate-400">Statement of Operations & Comprehensive Net Income (Synced from Tally)</p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-2">
          <button
            onClick={triggerSyncNow}
            disabled={isSyncing}
            className="flex items-center space-x-1.5 px-3 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-md transition-all"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
            <span>Sync Now</span>
          </button>
          <button
            onClick={() => addToast('Exported Profit & Loss to PDF', 'success')}
            className="flex items-center space-x-1.5 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700"
          >
            <Download className="w-3.5 h-3.5 text-blue-400" />
            <span>Export PDF</span>
          </button>
          <button
            onClick={() => addToast('Exported Profit & Loss to Excel', 'success')}
            className="flex items-center space-x-1.5 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
            <span>Export Excel</span>
          </button>
        </div>
      </div>

      {/* Summary KPI Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className={`bg-slate-900 border p-4 rounded-xl transition-all ${justSynced ? 'border-emerald-400 ring-2 ring-emerald-500/50 scale-105' : 'border-slate-800'}`}>
          <span className="text-xs font-semibold text-slate-400">Total Revenue (Turnover)</span>
          <p className="text-xl font-extrabold text-white mt-1">₹ {totalRevenue.toLocaleString('en-IN')}</p>
          {justSynced ? (
            <span className="text-[10px] text-emerald-400 font-bold block mt-1">+₹ {(recentDeltaSales / 100000).toFixed(1)}L Tally Inflow</span>
          ) : (
            <span className="text-[10px] text-emerald-400 font-semibold flex items-center mt-1">
              <ArrowUpRight className="w-3 h-3 mr-0.5" /> +17.7% Growth YoY
            </span>
          )}
        </div>
        <div className={`bg-slate-900 border p-4 rounded-xl transition-all ${justSynced ? 'border-emerald-400 ring-2 ring-emerald-500/50 scale-105' : 'border-slate-800'}`}>
          <span className="text-xs font-semibold text-slate-400">Direct Cost of Goods Sold</span>
          <p className="text-xl font-extrabold text-rose-400 mt-1">₹ {directCost.toLocaleString('en-IN')}</p>
          {justSynced ? (
            <span className="text-[10px] text-emerald-400 font-bold block mt-1">+₹ {(recentDeltaPurchase / 100000).toFixed(1)}L Ingested</span>
          ) : (
            <span className="text-[10px] text-slate-400 mt-1 block">46.0% of Turnover</span>
          )}
        </div>
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
          <span className="text-xs font-semibold text-slate-400">Gross Profit</span>
          <p className="text-xl font-extrabold text-blue-400 mt-1">₹ {grossProfit.toLocaleString('en-IN')}</p>
          <span className="text-[10px] text-blue-400 font-semibold block mt-1">Gross Margin: {((grossProfit / totalRevenue) * 100).toFixed(1)}%</span>
        </div>
        <div className={`bg-slate-900 border p-4 rounded-xl bg-gradient-to-br from-slate-900 to-emerald-950/40 border-emerald-500/30 transition-all ${justSynced ? 'ring-2 ring-emerald-500/50 scale-105' : ''}`}>
          <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wide">Net Operating Profit</span>
          <p className="text-2xl font-black text-white mt-1">₹ {netProfit.toLocaleString('en-IN')}</p>
          <span className="text-[10px] text-emerald-400 font-semibold flex items-center mt-1">
            <CheckCircle2 className="w-3 h-3 mr-1" /> Net Profit Margin: {((netProfit / totalRevenue) * 100).toFixed(1)}%
          </span>
        </div>
      </div>

      {/* Main P&L Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-slate-800/80 px-5 py-3 border-b border-slate-700 flex justify-between items-center">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider">Statement Details (in INR)</h2>
          <span className="text-xs text-slate-400 font-medium">Period: 01-Apr-2025 to 31-Mar-2026</span>
        </div>
        <div className="divide-y divide-slate-800 text-xs">
          {/* Revenue Section */}
          <div className="bg-slate-800/30 p-3 font-bold text-blue-400 uppercase tracking-wide">
            1. REVENUE FROM OPERATIONS
          </div>
          <div className="flex justify-between py-2.5 px-6 text-slate-300">
            <span>SaaS License & Subscription Revenue</span>
            <span className="font-mono font-semibold">₹ {totalRevenue.toLocaleString('en-IN')}</span>
          </div>
          <div className="flex justify-between py-2.5 px-6 font-bold bg-slate-950/40 text-slate-100">
            <span>TOTAL REVENUE (A)</span>
            <span className="font-mono text-blue-400">₹ {totalRevenue.toLocaleString('en-IN')}</span>
          </div>

          {/* Direct Costs */}
          <div className="bg-slate-800/30 p-3 font-bold text-purple-400 uppercase tracking-wide">
            2. DIRECT EXPENSES & PROCUREMENT
          </div>
          <div className="flex justify-between py-2.5 px-6 text-slate-300">
            <span>Cloud Infrastructure & Hardware Ingestion</span>
            <span className="font-mono font-semibold">₹ {directCost.toLocaleString('en-IN')}</span>
          </div>
          <div className="flex justify-between py-2.5 px-6 font-bold bg-slate-950/40 text-slate-100">
            <span>GROSS PROFIT (A - B)</span>
            <span className="font-mono text-emerald-400">₹ {grossProfit.toLocaleString('en-IN')}</span>
          </div>

          {/* Net Profit Summary */}
          <div className="flex justify-between py-4 px-6 bg-gradient-to-r from-slate-900 via-emerald-950/60 to-slate-900 text-sm font-black text-white border-t border-emerald-500/50">
            <span className="uppercase tracking-wider">NET PROFIT BEFORE TAX (NPBT)</span>
            <span className="font-mono text-emerald-400 text-base">₹ {netProfit.toLocaleString('en-IN')}</span>
          </div>
        </div>
      </div>

      {/* YoY Comparison Chart */}
      <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-xl">
        <h2 className="text-base font-bold text-white mb-2">Year-over-Year (YoY) Financial Comparison</h2>
        <p className="text-xs text-slate-400 mb-4">Comparing FY 2025-26 vs FY 2024-25 figures (Synced Live)</p>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={comparisonData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="category" stroke="#64748b" tick={{ fontSize: 11 }} />
              <YAxis stroke="#64748b" tick={{ fontSize: 11 }} tickFormatter={(val) => `₹${val / 100000}L`} />
              <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px' }} />
              <Bar dataKey="current" name="FY 2025-26 (Current)" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              <Bar dataKey="previous" name="FY 2024-25 (Previous)" fill="#64748B" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
