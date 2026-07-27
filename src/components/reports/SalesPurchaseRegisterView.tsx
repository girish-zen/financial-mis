import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { vouchersList, Voucher } from '../../data/mockData';
import {
  Receipt,
  ShoppingBag,
  Search,
  Download,
  FileSpreadsheet,
  Printer,
  ChevronLeft,
  ChevronRight,
  Filter,
} from 'lucide-react';

export const SalesPurchaseRegisterView: React.FC = () => {
  const { selectedCompany, selectedFY, addToast } = useApp();
  const [activeTab, setActiveTab] = useState<'Sales' | 'Purchase'>('Sales');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  const filteredVouchers = vouchersList.filter(
    (v) =>
      v.type === activeTab &&
      (v.partyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        v.voucherNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (v.partyGstin && v.partyGstin.toLowerCase().includes(searchTerm.toLowerCase())))
  );

  const totalPages = Math.ceil(filteredVouchers.length / itemsPerPage);
  const paginatedVouchers = filteredVouchers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const totalTaxable = filteredVouchers.reduce((acc, curr) => acc + curr.taxableAmount, 0);
  const totalCGST = filteredVouchers.reduce((acc, curr) => acc + curr.cgst, 0);
  const totalSGST = filteredVouchers.reduce((acc, curr) => acc + curr.sgst, 0);
  const totalIGST = filteredVouchers.reduce((acc, curr) => acc + curr.igst, 0);
  const totalGross = filteredVouchers.reduce((acc, curr) => acc + curr.totalAmount, 0);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-xl">
        <div className="flex items-center space-x-3">
          <div className={`p-3 rounded-xl border ${activeTab === 'Sales' ? 'bg-teal-600/20 text-teal-400 border-teal-500/30' : 'bg-orange-600/20 text-orange-400 border-orange-500/30'}`}>
            {activeTab === 'Sales' ? <Receipt className="w-6 h-6" /> : <ShoppingBag className="w-6 h-6" />}
          </div>
          <div>
            <div className="flex items-center space-x-2 text-xs font-semibold text-slate-400">
              <span>{selectedCompany}</span>
              <span>•</span>
              <span>{selectedFY}</span>
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight">
              {activeTab === 'Sales' ? 'Sales Register & Invoices' : 'Purchase Register & Bills'}
            </h1>
            <p className="text-xs text-slate-400">Detailed Voucher Log with Itemized Tax Breakdowns (CGST/SGST/IGST)</p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => addToast(`Exported ${activeTab} Register to PDF`, 'success')}
            className="flex items-center space-x-1.5 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700"
          >
            <Download className="w-3.5 h-3.5 text-blue-400" />
            <span>Export PDF</span>
          </button>
          <button
            onClick={() => addToast(`Exported ${activeTab} Register to Excel`, 'success')}
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

      {/* Tabs & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-4 rounded-xl">
        <div className="flex items-center space-x-2 bg-slate-950 p-1 rounded-xl border border-slate-800 w-full sm:w-auto">
          <button
            onClick={() => {
              setActiveTab('Sales');
              setCurrentPage(1);
            }}
            className={`flex-1 sm:flex-initial px-5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'Sales' ? 'bg-teal-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            Sales Register (500)
          </button>
          <button
            onClick={() => {
              setActiveTab('Purchase');
              setCurrentPage(1);
            }}
            className={`flex-1 sm:flex-initial px-5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'Purchase' ? 'bg-orange-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            Purchase Register (500)
          </button>
        </div>

        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder={`Search ${activeTab} Party, Invoice No or GSTIN...`}
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-4 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-800/80 text-slate-300 font-bold uppercase tracking-wider border-b border-slate-700">
              <tr>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Voucher No</th>
                <th className="py-3 px-4">Party Name</th>
                <th className="py-3 px-4">GSTIN</th>
                <th className="py-3 px-4 text-right">Taxable (₹)</th>
                <th className="py-3 px-4 text-right">CGST (9%) (₹)</th>
                <th className="py-3 px-4 text-right">SGST (9%) (₹)</th>
                <th className="py-3 px-4 text-right">IGST (18%) (₹)</th>
                <th className="py-3 px-4 text-right">Total Invoice (₹)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {paginatedVouchers.map((v) => (
                <tr key={v.id} className="hover:bg-slate-800/60 transition-colors">
                  <td className="py-2.5 px-4 font-mono text-slate-400">{v.date}</td>
                  <td className="py-2.5 px-4 font-mono font-bold text-slate-100">{v.voucherNo}</td>
                  <td className="py-2.5 px-4 font-medium text-slate-200">{v.partyName}</td>
                  <td className="py-2.5 px-4 font-mono text-[11px] text-slate-400">{v.partyGstin}</td>
                  <td className="py-2.5 px-4 text-right font-mono text-slate-300">
                    {v.taxableAmount.toLocaleString('en-IN')}
                  </td>
                  <td className="py-2.5 px-4 text-right font-mono text-slate-400">
                    {v.cgst ? v.cgst.toLocaleString('en-IN') : '-'}
                  </td>
                  <td className="py-2.5 px-4 text-right font-mono text-slate-400">
                    {v.sgst ? v.sgst.toLocaleString('en-IN') : '-'}
                  </td>
                  <td className="py-2.5 px-4 text-right font-mono text-slate-400">
                    {v.igst ? v.igst.toLocaleString('en-IN') : '-'}
                  </td>
                  <td className="py-2.5 px-4 text-right font-mono font-bold text-emerald-400">
                    ₹ {v.totalAmount.toLocaleString('en-IN')}
                  </td>
                </tr>
              ))}
            </tbody>
            {/* Summary Footer */}
            <tfoot className="bg-slate-950 font-extrabold text-white border-t-2 border-slate-700">
              <tr>
                <td colSpan={4} className="py-3 px-4 uppercase tracking-wider text-blue-400">
                  Total Aggregate ({filteredVouchers.length} Vouchers)
                </td>
                <td className="py-3 px-4 text-right font-mono text-slate-200">
                  ₹ {totalTaxable.toLocaleString('en-IN')}
                </td>
                <td className="py-3 px-4 text-right font-mono text-slate-400">
                  ₹ {totalCGST.toLocaleString('en-IN')}
                </td>
                <td className="py-3 px-4 text-right font-mono text-slate-400">
                  ₹ {totalSGST.toLocaleString('en-IN')}
                </td>
                <td className="py-3 px-4 text-right font-mono text-slate-400">
                  ₹ {totalIGST.toLocaleString('en-IN')}
                </td>
                <td className="py-3 px-4 text-right font-mono text-emerald-400 text-sm">
                  ₹ {totalGross.toLocaleString('en-IN')}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Pagination Bar */}
        <div className="bg-slate-950 px-4 py-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <div>
            Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredVouchers.length)} of {filteredVouchers.length} vouchers
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
