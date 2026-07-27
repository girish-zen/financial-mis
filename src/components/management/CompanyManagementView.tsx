import React from 'react';
import { useApp } from '../../context/AppContext';
import { Building2, CheckCircle, Plus, Calendar, Monitor } from 'lucide-react';

export const CompanyManagementView: React.FC = () => {
  const { selectedCompany, setSelectedCompany, addToast } = useApp();

  const companies = [
    { name: 'VNV Tech Solutions Pvt Ltd', gstin: '27AAACV108311Z9', fy: 'FY 2025-26', status: 'Connected', lastSync: '10s ago' },
    { name: 'VNV Global Inc', gstin: '29BBBCV220111Z4', fy: 'FY 2025-26', status: 'Connected', lastSync: '5m ago' },
    { name: 'VNV Enterprises', gstin: '07CCCCV331111Z2', fy: 'FY 2024-25', status: 'Standby', lastSync: '1d ago' },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-xl">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-cyan-600/20 text-cyan-400 rounded-xl border border-cyan-500/30">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-white tracking-tight">Multi-Company Manager</h1>
            <p className="text-xs text-slate-400">Manage Connected Business Entities, Tally Sync Mappings & Financial Years</p>
          </div>
        </div>

        <button
          onClick={() => addToast('Add Company Modal opened', 'info')}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold shadow-lg"
        >
          <Plus className="w-4 h-4" />
          <span>Connect New Company</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {companies.map((c, i) => (
          <div
            key={i}
            className={`p-5 rounded-2xl border transition-all ${
              selectedCompany === c.name
                ? 'bg-slate-900 border-blue-500 ring-2 ring-blue-500/30 shadow-xl'
                : 'bg-slate-900/90 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="flex justify-between items-start">
              <h2 className="text-sm font-bold text-white leading-snug">{c.name}</h2>
              {selectedCompany === c.name && (
                <span className="px-2 py-0.5 rounded bg-blue-500 text-white text-[10px] font-extrabold uppercase">
                  Active
                </span>
              )}
            </div>
            <p className="text-xs text-slate-400 mt-1">{c.gstin}</p>

            <div className="space-y-2 pt-3 border-t border-slate-800 mt-3 text-xs">
              <div className="flex justify-between text-slate-300">
                <span>Default FY:</span>
                <span className="font-semibold">{c.fy}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Tally Status:</span>
                <span className="text-emerald-400 font-bold">{c.status}</span>
              </div>
            </div>

            <button
              onClick={() => {
                setSelectedCompany(c.name);
                addToast(`Switched active entity to ${c.name}`, 'success');
              }}
              className="w-full mt-4 py-2 bg-slate-800 hover:bg-slate-700 text-blue-400 rounded-xl text-xs font-bold transition-colors"
            >
              Set as Active Entity
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
