import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ledgersData } from '../../data/mockData';
import {
  FileSpreadsheet,
  Search,
  Download,
  Printer,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  Zap,
} from 'lucide-react';

export const TrialBalanceView: React.FC = () => {
  const {
    selectedCompany,
    selectedFY,
    addToast,
    setActiveView,
    financialData,
    isSyncing,
    justSynced,
    syncProgressPercent,
    syncStageMessage,
    recentDeltaBank,
    recentDeltaSales,
    triggerSyncNow,
  } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGroup, setSelectedGroup] = useState<string>('All');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  // Dynamically map live Tally values into Trial Balance ledger accounts
  const dynamicLedgers = ledgersData.map((l) => {
    if (l.name.includes('HDFC Bank') || l.group === 'Bank Accounts') {
      return {
        ...l,
        debitAmount: financialData.bankBalance + 15200000,
        closingBalance: financialData.bankBalance,
        badge: justSynced ? `+₹ ${(recentDeltaBank / 100000).toFixed(1)}L Tally Ingested` : undefined,
      };
    }
    if (l.name.includes('License Revenue') || l.group === 'Direct Income') {
      return {
        ...l,
        creditAmount: financialData.totalSales,
        closingBalance: financialData.totalSales,
        badge: justSynced ? `+₹ ${(recentDeltaSales / 100000).toFixed(1)}L Tally Inflow` : undefined,
      };
    }
    if (l.name.includes('Cloud Infrastructure') || l.group === 'Direct Expenses') {
      return {
        ...l,
        debitAmount: financialData.totalPurchase,
        closingBalance: financialData.totalPurchase,
      };
    }
    return l;
  });

  const filteredLedgers = dynamicLedgers.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.group.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGroup = selectedGroup === 'All' || item.group === selectedGroup;
    return matchesSearch && matchesGroup;
  });

  const totalPages = Math.ceil(filteredLedgers.length / itemsPerPage);
  const paginatedLedgers = filteredLedgers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const totalOpening = dynamicLedgers.reduce((acc, curr) => acc + curr.openingBalance, 0);
  const totalDebit = dynamicLedgers.reduce((acc, curr) => acc + curr.debitAmount, 0);
  const totalCredit = dynamicLedgers.reduce((acc, curr) => acc + curr.creditAmount, 0);
  const totalClosing = dynamicLedgers.reduce((acc, curr) => acc + curr.closingBalance, 0);

  return (
    <div className="p-6 space-y-6">
      {/* Live Sync Progress Banner */}
      {isSyncing && (
        <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 border-2 border-blue-400 p-4 rounded-2xl shadow-2xl animate-pulse text-white space-y-2">
          <div className="flex items-center justify-between text-xs font-bold">
            <div className="flex items-center space-x-2">
              <RefreshCw className="w-4 h-4 animate-spin text-cyan-400" />
              <span>Updating Trial Balance Accounts from Tally... {syncStageMessage}</span>
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
              <h2 className="text-xs font-bold text-white">Trial Balance Updated from Tally Prime</h2>
              <p className="text-[11px] text-emerald-300">
                HDFC Bank Closing Ledger updated to <span className="font-mono font-bold text-white">₹ {financialData.bankBalance.toLocaleString('en-IN')}</span> & Revenue Ledger updated to <span className="font-mono font-bold text-white">₹ {financialData.totalSales.toLocaleString('en-IN')}</span>.
              </p>
            </div>
          </div>
          <span className="text-[10px] bg-emerald-500/20 px-3 py-1 rounded-full text-emerald-200 font-extrabold uppercase">
            Ledger Values Refreshed
          </span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-xl">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-amber-600/20 text-amber-400 rounded-xl border border-amber-500/30">
            <FileSpreadsheet className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center space-x-2 text-xs text-amber-400 font-semibold">
              <span>{selectedCompany}</span>
              <span>•</span>
              <span className="text-slate-400">{selectedFY}</span>
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight">Trial Balance</h1>
            <p className="text-xs text-slate-400">Opening, Periodic Debit/Credit, and Closing Balances (Synced from Tally)</p>
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
            onClick={() => addToast('Exported Trial Balance to PDF', 'success')}
            className="flex items-center space-x-1.5 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700"
          >
            <Download className="w-3.5 h-3.5 text-blue-400" />
            <span>Export PDF</span>
          </button>
          <button
            onClick={() => addToast('Exported Trial Balance to Excel', 'success')}
            className="flex items-center space-x-1.5 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
            <span>Export Excel</span>
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-4 rounded-xl">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search Ledger Name or Group..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-4 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-amber-500"
          />
        </div>
        <div className="flex items-center space-x-3 w-full sm:w-auto">
          <select
            value={selectedGroup}
            onChange={(e) => setSelectedGroup(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-200 focus:outline-none"
          >
            <option value="All">All Groups (100 Ledgers)</option>
            <option value="Bank Accounts">Bank Accounts</option>
            <option value="Current Assets">Current Assets</option>
            <option value="Fixed Assets">Fixed Assets</option>
            <option value="Capital Account">Capital Account</option>
            <option value="Current Liabilities">Current Liabilities</option>
            <option value="Direct Income">Direct Income</option>
            <option value="Indirect Expenses">Indirect Expenses</option>
          </select>
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-800/80 text-slate-300 font-bold uppercase tracking-wider border-b border-slate-700">
              <tr>
                <th className="py-3 px-4">Ledger Account</th>
                <th className="py-3 px-4">Group / Category</th>
                <th className="py-3 px-4 text-right">Opening Balance (₹)</th>
                <th className="py-3 px-4 text-right">Debit (Dr) (₹)</th>
                <th className="py-3 px-4 text-right">Credit (Cr) (₹)</th>
                <th className="py-3 px-4 text-right">Closing Balance (₹)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {paginatedLedgers.map((ledger) => (
                <tr
                  key={ledger.id}
                  onClick={() => setActiveView('ledger')}
                  className={`hover:bg-slate-800/60 transition-colors cursor-pointer group ${
                    justSynced && ledger.badge ? 'bg-emerald-950/20' : ''
                  }`}
                >
                  <td className="py-2.5 px-4 font-bold text-slate-100 group-hover:text-amber-400">
                    <div className="flex items-center space-x-2">
                      <span>{ledger.name}</span>
                      {ledger.badge && (
                        <span className="text-[9px] font-black text-emerald-300 bg-emerald-500/20 px-2 py-0.5 rounded-full animate-pulse">
                          {ledger.badge}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="py-2.5 px-4 text-slate-400">
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-[10px]">
                      {ledger.group}
                    </span>
                  </td>
                  <td className="py-2.5 px-4 text-right font-mono text-slate-400">
                    {ledger.openingBalance.toLocaleString('en-IN')}
                  </td>
                  <td className="py-2.5 px-4 text-right font-mono text-emerald-400 font-semibold">
                    {ledger.debitAmount.toLocaleString('en-IN')}
                  </td>
                  <td className="py-2.5 px-4 text-right font-mono text-rose-400 font-semibold">
                    {ledger.creditAmount.toLocaleString('en-IN')}
                  </td>
                  <td className={`py-2.5 px-4 text-right font-mono font-bold ${justSynced && ledger.badge ? 'text-emerald-300 text-sm' : 'text-white'}`}>
                    {ledger.closingBalance.toLocaleString('en-IN')}
                  </td>
                </tr>
              ))}
            </tbody>
            {/* Table Footer Aggregates */}
            <tfoot className="bg-slate-950 font-extrabold text-white border-t-2 border-slate-700">
              <tr>
                <td colSpan={2} className="py-3 px-4 text-amber-400 uppercase tracking-wider">
                  Grand Total (100 Accounts)
                </td>
                <td className="py-3 px-4 text-right font-mono text-slate-300">
                  ₹ {totalOpening.toLocaleString('en-IN')}
                </td>
                <td className="py-3 px-4 text-right font-mono text-emerald-400">
                  ₹ {totalDebit.toLocaleString('en-IN')}
                </td>
                <td className="py-3 px-4 text-right font-mono text-rose-400">
                  ₹ {totalCredit.toLocaleString('en-IN')}
                </td>
                <td className="py-3 px-4 text-right font-mono text-amber-400 text-sm">
                  ₹ {totalClosing.toLocaleString('en-IN')}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Pagination Bar */}
        <div className="bg-slate-950 px-4 py-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <div>
            Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredLedgers.length)} of {filteredLedgers.length} ledgers
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
