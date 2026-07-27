import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { customersData, suppliersData } from '../../data/mockData';
import { Clock, Send, Download, FileSpreadsheet, Printer, MessageSquare, AlertCircle, CheckCircle2 } from 'lucide-react';

export const OutstandingView: React.FC = () => {
  const { selectedCompany, selectedFY, addToast } = useApp();
  const [mode, setMode] = useState<'Receivable' | 'Payable'>('Receivable');

  const sendWhatsAppReminder = (name: string, phone: string, amount: number) => {
    addToast(`Automated WhatsApp payment reminder dispatched to ${name} (${phone}) for ₹${amount.toLocaleString('en-IN')}`, 'success');
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-xl">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-amber-600/20 text-amber-400 rounded-xl border border-amber-500/30">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center space-x-2 text-xs text-amber-400 font-semibold">
              <span>{selectedCompany}</span>
              <span>•</span>
              <span className="text-slate-400">{selectedFY}</span>
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight">Outstanding Aging Reports</h1>
            <p className="text-xs text-slate-400">Customer Debtors Aging (&lt;30d, 30-60d, 60-90d, 90+d) & WhatsApp Reminders</p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => addToast('Exported Outstanding Report to PDF', 'success')}
            className="flex items-center space-x-1.5 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700"
          >
            <Download className="w-3.5 h-3.5 text-blue-400" />
            <span>Export PDF</span>
          </button>
          <button
            onClick={() => addToast('Exported Outstanding Report to Excel', 'success')}
            className="flex items-center space-x-1.5 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
            <span>Export Excel</span>
          </button>
        </div>
      </div>

      {/* Mode Switcher */}
      <div className="flex items-center space-x-2 bg-slate-900 border border-slate-800 p-1.5 rounded-xl w-fit">
        <button
          onClick={() => setMode('Receivable')}
          className={`px-5 py-1.5 rounded-lg text-xs font-bold transition-all ${
            mode === 'Receivable' ? 'bg-amber-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
          }`}
        >
          Customer Debtors Receivables (10)
        </button>
        <button
          onClick={() => setMode('Payable')}
          className={`px-5 py-1.5 rounded-lg text-xs font-bold transition-all ${
            mode === 'Payable' ? 'bg-rose-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
          }`}
        >
          Supplier Creditors Payables (10)
        </button>
      </div>

      {/* Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-800/80 text-slate-300 font-bold uppercase tracking-wider border-b border-slate-700">
              <tr>
                <th className="py-3 px-4">{mode === 'Receivable' ? 'Customer Name' : 'Supplier Name'}</th>
                <th className="py-3 px-4">Contact Info</th>
                <th className="py-3 px-4 text-right">Total Due (₹)</th>
                <th className="py-3 px-4 text-right">0-30 Days</th>
                <th className="py-3 px-4 text-right">31-60 Days</th>
                <th className="py-3 px-4 text-right">61-90 Days</th>
                <th className="py-3 px-4 text-right">90+ Days</th>
                <th className="py-3 px-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {(mode === 'Receivable' ? customersData : suppliersData).map((item, idx) => {
                const due = item.balance;
                const d0_30 = Math.round(due * 0.45);
                const d31_60 = Math.round(due * 0.3);
                const d61_90 = Math.round(due * 0.15);
                const d90_plus = due - d0_30 - d31_60 - d61_90;

                return (
                  <tr key={item.id} className="hover:bg-slate-800/60 transition-colors">
                    <td className="py-3 px-4 font-bold text-slate-100">
                      {item.name}
                      <span className="block text-[10px] text-slate-400 font-normal">{item.gstin}</span>
                    </td>
                    <td className="py-3 px-4 text-slate-300">
                      {item.phone}
                      <span className="block text-[10px] text-slate-500">{item.email}</span>
                    </td>
                    <td className="py-3 px-4 text-right font-mono font-extrabold text-amber-400 text-sm">
                      ₹ {due.toLocaleString('en-IN')}
                    </td>
                    <td className="py-3 px-4 text-right font-mono text-emerald-400">
                      ₹ {d0_30.toLocaleString('en-IN')}
                    </td>
                    <td className="py-3 px-4 text-right font-mono text-blue-400">
                      ₹ {d31_60.toLocaleString('en-IN')}
                    </td>
                    <td className="py-3 px-4 text-right font-mono text-amber-400">
                      ₹ {d61_90.toLocaleString('en-IN')}
                    </td>
                    <td className="py-3 px-4 text-right font-mono text-rose-400 font-semibold">
                      ₹ {d90_plus.toLocaleString('en-IN')}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => sendWhatsAppReminder(item.name, item.phone, due)}
                        className="px-2.5 py-1.5 bg-emerald-600/20 hover:bg-emerald-600 text-emerald-400 hover:text-white rounded-lg font-semibold text-[11px] border border-emerald-500/30 flex items-center space-x-1 mx-auto transition-colors"
                      >
                        <MessageSquare className="w-3 h-3" />
                        <span>Send WhatsApp</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
