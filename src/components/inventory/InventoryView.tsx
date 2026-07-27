import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { inventoryData } from '../../data/mockData';
import {
  Package,
  Search,
  Download,
  FileSpreadsheet,
  Printer,
  Warehouse,
  Clock,
  Layers,
  TrendingUp,
} from 'lucide-react';

export const InventoryView: React.FC = () => {
  const { selectedCompany, selectedFY, addToast } = useApp();
  const [activeSubTab, setActiveSubTab] = useState<'Stock Summary' | 'Godown Wise' | 'Batch Wise'>('Stock Summary');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredItems = inventoryData.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.godown.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalValue = filteredItems.reduce((acc, curr) => acc + curr.totalValue, 0);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-xl">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-emerald-600/20 text-emerald-400 rounded-xl border border-emerald-500/30">
            <Package className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center space-x-2 text-xs text-emerald-400 font-semibold">
              <span>{selectedCompany}</span>
              <span>•</span>
              <span className="text-slate-400">{selectedFY}</span>
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight">Inventory & Stock Summary</h1>
            <p className="text-xs text-slate-400">Real-time Stock Quantity, Valuation, Godown Locations & Batch Expiry Logs</p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => addToast('Exported Inventory Report to PDF', 'success')}
            className="flex items-center space-x-1.5 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700"
          >
            <Download className="w-3.5 h-3.5 text-blue-400" />
            <span>Export PDF</span>
          </button>
          <button
            onClick={() => addToast('Exported Inventory Report to Excel', 'success')}
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

      {/* Sub Tabs & Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-4 rounded-xl">
        <div className="flex items-center space-x-2 bg-slate-950 p-1 rounded-xl border border-slate-800 w-full sm:w-auto">
          {(['Stock Summary', 'Godown Wise', 'Batch Wise'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveSubTab(tab)}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeSubTab === tab ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search Item Name, SKU or Godown..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-4 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
          />
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-800/80 text-slate-300 font-bold uppercase tracking-wider border-b border-slate-700">
              <tr>
                <th className="py-3 px-4">Item Name / Description</th>
                <th className="py-3 px-4">SKU / Code</th>
                <th className="py-3 px-4">HSN Code</th>
                <th className="py-3 px-4">Godown Location</th>
                <th className="py-3 px-4 text-right">Inward</th>
                <th className="py-3 px-4 text-right">Outward</th>
                <th className="py-3 px-4 text-right">Closing Qty</th>
                <th className="py-3 px-4 text-right">Rate (₹)</th>
                <th className="py-3 px-4 text-right">Total Valuation (₹)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {filteredItems.map((item) => (
                <tr key={item.id} className="hover:bg-slate-800/60 transition-colors">
                  <td className="py-3 px-4 font-bold text-slate-100">
                    {item.name}
                    <div className="text-[10px] text-slate-400 font-normal">
                      Batch: {item.batchNo} • Exp: {item.expiryDate}
                    </div>
                  </td>
                  <td className="py-3 px-4 font-mono text-slate-400">{item.sku}</td>
                  <td className="py-3 px-4 font-mono text-slate-400">{item.hsn}</td>
                  <td className="py-3 px-4 text-slate-300">
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-[10px] flex items-center w-fit space-x-1">
                      <Warehouse className="w-3 h-3 text-emerald-400 mr-1" />
                      {item.godown}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right font-mono text-emerald-400">+{item.inward} {item.unit}</td>
                  <td className="py-3 px-4 text-right font-mono text-rose-400">-{item.outward} {item.unit}</td>
                  <td className="py-3 px-4 text-right font-mono font-bold text-white text-sm">
                    {item.closingStock} {item.unit}
                  </td>
                  <td className="py-3 px-4 text-right font-mono text-slate-400">
                    ₹ {item.valuationRate.toLocaleString('en-IN')}
                  </td>
                  <td className="py-3 px-4 text-right font-mono font-extrabold text-emerald-400">
                    ₹ {item.totalValue.toLocaleString('en-IN')}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot className="bg-slate-950 font-extrabold text-white border-t-2 border-slate-700">
              <tr>
                <td colSpan={8} className="py-3 px-4 uppercase tracking-wider text-emerald-400">
                  Total Inventory Asset Value
                </td>
                <td className="py-3 px-4 text-right font-mono text-emerald-400 text-sm">
                  ₹ {totalValue.toLocaleString('en-IN')}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
};
