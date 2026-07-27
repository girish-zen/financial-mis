import React from 'react';
import { useApp } from '../../context/AppContext';
import { aiFinancialInsights, customersData, suppliersData, inventoryData } from '../../data/mockData';
import { Sparkles, TrendingUp, AlertTriangle, ShieldCheck, Info, CheckCircle2, ArrowRight, Zap } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export const AnalyticsView: React.FC = () => {
  const { selectedCompany, selectedFY, addToast } = useApp();

  const forecastData = [
    { month: 'Apr 26 (Forecast)', cash: 13200000, projected: 14500000 },
    { month: 'May 26 (Forecast)', cash: 14500000, projected: 16200000 },
    { month: 'Jun 26 (Forecast)', cash: 16200000, projected: 18100000 },
    { month: 'Jul 26 (Forecast)', cash: 18100000, projected: 20500000 },
    { month: 'Aug 26 (Forecast)', cash: 20500000, projected: 23200000 },
    { month: 'Sep 26 (Forecast)', cash: 23200000, projected: 26000000 },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-xl">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-gradient-to-tr from-emerald-600 to-teal-500 text-white rounded-xl shadow-lg shadow-emerald-500/20">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center space-x-2 text-xs text-emerald-400 font-semibold">
              <span>{selectedCompany}</span>
              <span>•</span>
              <span className="text-slate-400">{selectedFY}</span>
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight">AI Financial Analytics & Forecasting</h1>
            <p className="text-xs text-slate-400">Automated Financial Health Diagnostics & Predictive Cash Flow Modeling</p>
          </div>
        </div>

        <button
          onClick={() => addToast('AI Financial Analysis refreshed against latest Tally vouchers!', 'success')}
          className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-500/20"
        >
          <Zap className="w-4 h-4" />
          <span>Run AI Health Check</span>
        </button>
      </div>

      {/* AI Insights Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {aiFinancialInsights.map((insight, idx) => (
          <div
            key={idx}
            className={`p-5 rounded-2xl border transition-all ${
              insight.type === 'positive'
                ? 'bg-slate-900/90 border-emerald-500/30 hover:border-emerald-500/60'
                : insight.type === 'warning'
                ? 'bg-slate-900/90 border-amber-500/30 hover:border-amber-500/60'
                : 'bg-slate-900/90 border-blue-500/30 hover:border-blue-500/60'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-2">
                {insight.type === 'positive' ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                ) : insight.type === 'warning' ? (
                  <AlertTriangle className="w-5 h-5 text-amber-400" />
                ) : (
                  <Info className="w-5 h-5 text-blue-400" />
                )}
                <h2 className="text-sm font-bold text-white">{insight.title}</h2>
              </div>
              <span
                className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase ${
                  insight.impact === 'High' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-blue-500/20 text-blue-300'
                }`}
              >
                {insight.impact} Impact
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-2.5 leading-relaxed">{insight.description}</p>
          </div>
        ))}
      </div>

      {/* Predictive Cash Flow Chart */}
      <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-base font-bold text-white flex items-center space-x-2">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              <span>Predictive 6-Month Liquidity Forecast</span>
            </h2>
            <p className="text-xs text-slate-400">Machine learning projection based on historical sales velocity & payment behavior</p>
          </div>
          <span className="text-xs text-emerald-400 font-bold bg-emerald-500/10 px-3 py-1 rounded-lg border border-emerald-500/20">
            Confidence: 94.8%
          </span>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={forecastData}>
              <defs>
                <linearGradient id="colorForecast" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="month" stroke="#64748b" tick={{ fontSize: 11 }} />
              <YAxis stroke="#64748b" tick={{ fontSize: 11 }} tickFormatter={(val) => `₹${val / 100000}L`} />
              <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px' }} />
              <Area type="monotone" dataKey="projected" stroke="#10B981" strokeWidth={3} fillOpacity={1} fill="url(#colorForecast)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
