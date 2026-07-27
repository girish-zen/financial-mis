import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  ChevronRight,
  ChevronDown,
  Download,
  FileSpreadsheet,
  Printer,
  Search,
  Calendar,
  Scale,
  RefreshCw,
  Zap,
} from 'lucide-react';

interface TreeNode {
  name: string;
  amount: number;
  badge?: string;
  children?: TreeNode[];
}

export const BalanceSheetView: React.FC = () => {
  const {
    selectedCompany,
    selectedFY,
    addToast,
    financialData,
    isSyncing,
    justSynced,
    syncProgressPercent,
    syncStageMessage,
    recentDeltaBank,
    triggerSyncNow,
  } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [expandedNodes, setExpandedNodes] = useState<Record<string, boolean>>({
    'Assets': true,
    'Current Assets': true,
    'Fixed Assets': true,
    'Liabilities & Equity': true,
    'Capital & Reserves': true,
    'Current Liabilities': true,
  });

  const toggleNode = (name: string) => {
    setExpandedNodes((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const currentAssetsTotal =
    financialData.cashBalance +
    financialData.bankBalance +
    financialData.receivable +
    financialData.inventoryValue +
    1900000;

  const fixedAssetsTotal = 19900000;
  const totalAssets = currentAssetsTotal + fixedAssetsTotal;

  const currentLiabilitiesTotal = financialData.payable + 6500000 + 2000000;
  const capitalReservesTotal = totalAssets - currentLiabilitiesTotal;

  const assetsTree: TreeNode = {
    name: 'Assets',
    amount: totalAssets,
    children: [
      {
        name: 'Current Assets',
        amount: currentAssetsTotal,
        children: [
          { name: 'Cash-in-hand', amount: financialData.cashBalance },
          {
            name: 'Bank Accounts (HDFC & ICICI)',
            amount: financialData.bankBalance,
            badge: justSynced ? `+₹ ${(recentDeltaBank / 100000).toFixed(1)}L Tally Inflow` : undefined,
          },
          { name: 'Accounts Receivable (Trade Debtors)', amount: financialData.receivable },
          { name: 'Inventory Closing Stock', amount: financialData.inventoryValue },
          { name: 'GST Input Tax Credit Balance', amount: 1900000 },
        ],
      },
      {
        name: 'Fixed Assets',
        amount: fixedAssetsTotal,
        children: [
          { name: 'Plant & Heavy Machinery', amount: 12000000 },
          { name: 'Computers & Server Racks', amount: 5500000 },
          { name: 'Office Furniture & Leasehold Improvements', amount: 2400000 },
        ],
      },
    ],
  };

  const liabilitiesTree: TreeNode = {
    name: 'Liabilities & Equity',
    amount: totalAssets,
    children: [
      {
        name: 'Capital & Reserves',
        amount: capitalReservesTotal,
        children: [
          { name: 'Shareholders Equity Capital', amount: 25000000 },
          { name: 'Retained Earnings & Net Profit', amount: capitalReservesTotal - 25000000, badge: justSynced ? `+₹ 14.2L Profit Gain` : undefined },
        ],
      },
      {
        name: 'Current Liabilities',
        amount: currentLiabilitiesTotal,
        children: [
          { name: 'Trade Payables (Suppliers)', amount: financialData.payable },
          { name: 'Bank Short Term Credit / OD', amount: 6500000 },
          { name: 'Statutory Taxes Payable (GST/TDS)', amount: 2000000 },
        ],
      },
    ],
  };

  const renderTree = (node: TreeNode, depth = 0) => {
    const isExpanded = expandedNodes[node.name] ?? false;
    const hasChildren = node.children && node.children.length > 0;

    if (
      searchTerm &&
      !node.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !node.children?.some((c) => c.name.toLowerCase().includes(searchTerm.toLowerCase()))
    ) {
      return null;
    }

    return (
      <div key={node.name} className="select-none">
        <div
          onClick={() => hasChildren && toggleNode(node.name)}
          style={{ paddingLeft: `${depth * 20 + 12}px` }}
          className={`flex items-center justify-between py-2.5 px-3 hover:bg-slate-800/60 border-b border-slate-800/60 transition-colors cursor-pointer ${
            depth === 0 ? 'bg-slate-800/40 font-bold text-white text-sm' : depth === 1 ? 'font-semibold text-slate-200 text-xs' : 'text-slate-300 text-xs'
          }`}
        >
          <div className="flex items-center space-x-2">
            {hasChildren ? (
              isExpanded ? (
                <ChevronDown className="w-4 h-4 text-blue-400" />
              ) : (
                <ChevronRight className="w-4 h-4 text-slate-500" />
              )
            ) : (
              <span className="w-4 h-4 inline-block"></span>
            )}
            <span>{node.name}</span>
            {node.badge && (
              <span className="ml-2 text-[9px] font-black text-emerald-300 bg-emerald-500/20 px-2 py-0.5 rounded-full animate-pulse">
                {node.badge}
              </span>
            )}
          </div>
          <span className={`font-mono font-bold transition-colors ${justSynced && node.badge ? 'text-emerald-300 text-sm' : 'text-slate-100'}`}>
            ₹ {node.amount.toLocaleString('en-IN')}
          </span>
        </div>
        {hasChildren && isExpanded && (
          <div>
            {node.children!.map((child) => renderTree(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="p-6 space-y-6">
      {/* Live Syncing Progress Banner */}
      {isSyncing && (
        <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 border-2 border-blue-400 p-4 rounded-2xl shadow-2xl animate-pulse text-white space-y-2">
          <div className="flex items-center justify-between text-xs font-bold">
            <div className="flex items-center space-x-2">
              <RefreshCw className="w-4 h-4 animate-spin text-cyan-400" />
              <span>Updating Balance Sheet Values from Tally... {syncStageMessage}</span>
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
              <h2 className="text-xs font-bold text-white">Balance Sheet Ingested from Tally Prime</h2>
              <p className="text-[11px] text-emerald-300">
                Bank Accounts updated to <span className="font-mono font-bold text-white">₹ {financialData.bankBalance.toLocaleString('en-IN')}</span> & Assets Total updated to <span className="font-mono font-bold text-white">₹ {totalAssets.toLocaleString('en-IN')}</span>.
              </p>
            </div>
          </div>
          <span className="text-[10px] bg-emerald-500/20 px-3 py-1 rounded-full text-emerald-200 font-extrabold uppercase">
            Tally Values Updated
          </span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-xl">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-blue-600/20 text-blue-400 rounded-xl border border-blue-500/30">
            <Scale className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center space-x-2 text-xs text-blue-400 font-semibold">
              <span>{selectedCompany}</span>
              <span>•</span>
              <span className="text-slate-400">{selectedFY}</span>
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight">Balance Sheet Statement</h1>
            <p className="text-xs text-slate-400">Hierarchical Tree View of Assets, Equity, and Liabilities (Synced from Tally)</p>
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
            onClick={() => addToast('Exported Balance Sheet to PDF', 'success')}
            className="flex items-center space-x-1.5 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700"
          >
            <Download className="w-3.5 h-3.5 text-blue-400" />
            <span>Export PDF</span>
          </button>
          <button
            onClick={() => addToast('Exported Balance Sheet to Excel', 'success')}
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
            placeholder="Search Assets or Liabilities..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-4 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <div className="flex items-center space-x-1.5 bg-slate-950 border border-slate-800 px-3 py-1.5 rounded-lg text-xs text-slate-300">
            <Calendar className="w-3.5 h-3.5 text-indigo-400" />
            <span>As on 31st March 2026</span>
          </div>
          <button
            onClick={() => setExpandedNodes({ Assets: true, 'Liabilities & Equity': true })}
            className="px-3 py-1.5 bg-slate-800 text-slate-300 hover:text-white rounded-lg text-xs font-medium"
          >
            Collapse All
          </button>
        </div>
      </div>

      {/* Balance Sheet Tree Cards (Side-by-side) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Assets Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-slate-800/80 px-4 py-3 border-b border-slate-700 flex items-center justify-between">
            <h2 className="text-sm font-bold text-blue-400 uppercase tracking-wider">ASSETS</h2>
            <span className={`text-xs font-mono font-black transition-colors ${justSynced ? 'text-emerald-300 text-sm' : 'text-white'}`}>
              Total: ₹ {totalAssets.toLocaleString('en-IN')}
            </span>
          </div>
          <div className="divide-y divide-slate-800 max-h-[600px] overflow-y-auto">
            {renderTree(assetsTree)}
          </div>
        </div>

        {/* Liabilities Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-slate-800/80 px-4 py-3 border-b border-slate-700 flex items-center justify-between">
            <h2 className="text-sm font-bold text-indigo-400 uppercase tracking-wider">LIABILITIES & EQUITY</h2>
            <span className={`text-xs font-mono font-black transition-colors ${justSynced ? 'text-emerald-300 text-sm' : 'text-white'}`}>
              Total: ₹ {totalAssets.toLocaleString('en-IN')}
            </span>
          </div>
          <div className="divide-y divide-slate-800 max-h-[600px] overflow-y-auto">
            {renderTree(liabilitiesTree)}
          </div>
        </div>
      </div>
    </div>
  );
};
