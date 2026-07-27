import React from 'react';
import { useApp } from '../../context/AppContext';
import { Sparkles, Download, FileSpreadsheet, Printer } from 'lucide-react';

export const BudgetVsActualView: React.FC = () => {
  const { selectedCompany, selectedFY, addToast } = useApp();

  const budgets = [
    { head: 'SaaS License Sales', target: 60000000, actual: 61200000, variance: '+ 2.0%', isPositive: true },
    { head: 'Cloud AWS Hosting Cost', target: 15000000, actual: 18500000, variance: '+ 23.3%', isPositive: false },
    { head: 'Engineering Salaries', target: 22000000, actual: 21500000, variance: '- 2.2%', isPositive: true },
    { head: 'Sales & Marketing Ads', target: 5000000, actual: 4200000, variance: '- 16.0%', isPositive: true },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-xl">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-violet-600/20 text-violet-400 rounded-xl border border-violet-500/30">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center space-x-2 text-xs text-violet-400 font-semibold">
              <span>{selectedCompany}</span>
              <span>•</span>
              <span className="text-slate-400">{selectedFY}</span>
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight">Budget vs Actual Variance Analysis</h1>
            <p className="text-xs text-slate-400">Comparing Targeted Financial Allocations against Realized Performance</p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button onClick={() => addToast('Exported Budget Variance to PDF', 'success')} className="px-3 py-2 bg-slate-800 text-slate-200 rounded-lg text-xs font-semibold">
            Export PDF
          </button>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-xl overflow-hidden">
        <table className="w-full text-left text-xs text-slate-300">
          <thead className="bg-slate-800 text-slate-300 font-bold uppercase">
            <tr>
              <th className="py-3 px-4">Budget Ledger Head</th>
              <th className="py-3 px-4 text-right">Targeted Allocation (₹)</th>
              <th className="py-3 px-4 text-right">Actual Realized (₹)</th>
              <th className="py-3 px-4 text-right">Variance (%)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {budgets.map((b, i) => (
              <tr key={i} className="hover:bg-slate-800/60">
                <td className="py-3 px-4 font-bold text-slate-100">{b.head}</td>
                <td className="py-3 px-4 text-right font-mono text-slate-400">₹ {b.target.toLocaleString('en-IN')}</td>
                <td className="py-3 px-4 text-right font-mono font-bold text-white">₹ {b.actual.toLocaleString('en-IN')}</td>
                <td className={`py-3 px-4 text-right font-mono font-bold ${b.isPositive ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {b.variance}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
