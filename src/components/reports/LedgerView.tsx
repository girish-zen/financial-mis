import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { vouchersList, Voucher, ledgersData } from '../../data/mockData';
import {
  BookOpen,
  Search,
  Download,
  FileSpreadsheet,
  Printer,
  Calendar,
  Filter,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

export const LedgerView: React.FC = () => {
  const { selectedCompany, selectedFY, addToast } = useApp();
  const [selectedLedger, setSelectedLedger] = useState<string>('Apex Global Tech Solutions');
  const [startDate, setStartDate] = useState('2025-04-01');
  const [endDate, setEndDate] = useState('2026-03-31');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  const filteredVouchers = vouchersList.filter((v) => {
    return v.partyName.toLowerCase().includes(selectedLedger.toLowerCase()) || selectedLedger === 'All';
  });

  // Compute running balance
  let currentBalance = 425000;
  const vouchersWithRunningBalance = filteredVouchers.map((v) => {
    const change = v.type === 'Sales' || v.type === 'Receipt' ? v.totalAmount : -v.totalAmount;
    currentBalance += change;
    return { ...v, runningBalance: currentBalance };
  });

  const totalPages = Math.ceil(vouchersWithRunningBalance.length / itemsPerPage);
  const paginatedVouchers = vouchersWithRunningBalance.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="p-6 space-y-6">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-xl">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-rose-600/20 text-rose-400 rounded-xl border border-rose-500/30">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center space-x-2 text-xs text-rose-400 font-semibold">
              <span>{selectedCompany}</span>
              <span>•</span>
              <span className="text-slate-400">{selectedFY}</span>
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight">Ledger Account Statement</h1>
            <p className="text-xs text-slate-400">Detailed Voucher Register & Cumulative Running Balance</p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => addToast(`Exported Ledger ${selectedLedger} to PDF`, 'success')}
            className="flex items-center space-x-1.5 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700"
          >
            <Download className="w-3.5 h-3.5 text-blue-400" />
            <span>Export PDF</span>
          </button>
          <button
            onClick={() => addToast(`Exported Ledger ${selectedLedger} to Excel`, 'success')}
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

      {/* Selector & Date Filters Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-4 rounded-xl">
        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
          {/* Ledger Selector */}
          <div className="flex items-center space-x-2 bg-slate-950 border border-slate-800 px-3 py-1.5 rounded-lg text-xs">
            <span className="text-slate-400 font-medium">Select Ledger:</span>
            <select
              value={selectedLedger}
              onChange={(e) => {
                setSelectedLedger(e.target.value);
                setCurrentPage(1);
              }}
              className="bg-transparent text-slate-200 font-bold focus:outline-none cursor-pointer"
            >
              <option value="Apex Global" className="bg-slate-900">Apex Global Tech Solutions</option>
              <option value="Pinnacle Enterprise" className="bg-slate-900">Pinnacle Enterprise Systems</option>
              <option value="Zenith Retail" className="bg-slate-900">Zenith Retail & Logistics</option>
              <option value="Metro Raw Materials" className="bg-slate-900">Metro Raw Materials Pvt Ltd</option>
              <option value="TechWare Electronic" className="bg-slate-900">TechWare Electronic Components</option>
              <option value="HDFC Bank" className="bg-slate-900">HDFC Bank Enterprise AC</option>
              <option value="All" className="bg-slate-900">All Ledger Accounts</option>
            </select>
          </div>

          {/* Date Picker */}
          <div className="flex items-center space-x-2 bg-slate-950 border border-slate-800 px-3 py-1.5 rounded-lg text-xs text-slate-300">
            <Calendar className="w-3.5 h-3.5 text-rose-400" />
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="bg-transparent text-slate-200 focus:outline-none"
            />
            <span>to</span>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="bg-transparent text-slate-200 focus:outline-none"
            />
          </div>
        </div>

        {/* Balance Badge */}
        <div className="flex items-center space-x-2 bg-slate-800/80 px-4 py-1.5 rounded-lg border border-slate-700 text-xs">
          <span className="text-slate-400">Current Balance:</span>
          <span className="font-mono font-bold text-emerald-400 text-sm">
            ₹ {currentBalance.toLocaleString('en-IN')} Dr
          </span>
        </div>
      </div>

      {/* Voucher Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-800/80 text-slate-300 font-bold uppercase tracking-wider border-b border-slate-700">
              <tr>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Voucher No</th>
                <th className="py-3 px-4">Voucher Type</th>
                <th className="py-3 px-4">Particulars / Party</th>
                <th className="py-3 px-4 text-right">Debit (Dr) (₹)</th>
                <th className="py-3 px-4 text-right">Credit (Cr) (₹)</th>
                <th className="py-3 px-4 text-right">Running Balance (₹)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {paginatedVouchers.map((v) => {
                const isDebit = v.type === 'Sales' || v.type === 'Receipt';
                return (
                  <tr key={v.id} className="hover:bg-slate-800/60 transition-colors">
                    <td className="py-2.5 px-4 font-mono text-slate-400">{v.date}</td>
                    <td className="py-2.5 px-4 font-mono font-semibold text-slate-200">{v.voucherNo}</td>
                    <td className="py-2.5 px-4">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          v.type === 'Sales'
                            ? 'bg-blue-500/20 text-blue-400'
                            : v.type === 'Purchase'
                            ? 'bg-purple-500/20 text-purple-400'
                            : 'bg-emerald-500/20 text-emerald-400'
                        }`}
                      >
                        {v.type}
                      </span>
                    </td>
                    <td className="py-2.5 px-4 font-medium text-slate-100">{v.partyName}</td>
                    <td className="py-2.5 px-4 text-right font-mono text-emerald-400 font-semibold">
                      {isDebit ? v.totalAmount.toLocaleString('en-IN') : '-'}
                    </td>
                    <td className="py-2.5 px-4 text-right font-mono text-rose-400 font-semibold">
                      {!isDebit ? v.totalAmount.toLocaleString('en-IN') : '-'}
                    </td>
                    <td className="py-2.5 px-4 text-right font-mono font-bold text-white">
                      ₹ {v.runningBalance.toLocaleString('en-IN')}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
        <div className="bg-slate-950 px-4 py-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <div>
            Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, vouchersWithRunningBalance.length)} of {vouchersWithRunningBalance.length} vouchers
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-1 rounded bg-slate-800 hover:bg-slate-700 disabled:opacity-50"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="font-semibold text-slate-200">
              Page {currentPage} of {totalPages || 1}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-1 rounded bg-slate-800 hover:bg-slate-700 disabled:opacity-50"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
